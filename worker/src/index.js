/**
 * Live online counters for the three Aion servers.
 *
 * Collects on request and caches the result, so upstream servers see at most
 * one round of requests per TTL window no matter how many visitors there are.
 * Replaces the GitHub Actions cron, which delivered only 9-21% of its schedule.
 *
 * Response shape stays byte-compatible with the committed data.json so the page
 * can fall back to that file whenever this worker is unreachable.
 */

const TTL_SECONDS = 60;
const STALE_MAX_AGE_SECONDS = 15 * 60;
const UPSTREAM_TIMEOUT_MS = 8000;

const DESTINY_URL = 'https://aiondestiny.net/api/online';
const ORIGIN_URL = 'https://originaion.com/api/server-status';
const EURO_URL = 'https://euroaion.com/en-US';

// Last values committed by the GitHub Actions collector. EuroAion sits behind a
// Cloudflare JS challenge that only cloudscraper is known to pass, so whichever
// source the worker cannot reach live is filled in from here instead of going blank.
const FALLBACK_URL = 'https://juniorapi.github.io/aionua/data.json';

const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const ALLOWED_ORIGINS = new Set([
  'https://juniorapi.github.io',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
]);

const EURO_ONLINE_RE = /<strong>ONLINE<\/strong>\s*(\d+)/;
const EURO_ELYOS_RE = /status-race--elyos\b[\s\S]*?(\d+)%/;
const EURO_ASMO_RE = /status-race--asmo\b[\s\S]*?(\d+)%/;

/** Survives between requests on the same isolate, so the Cache API is never the only guard. */
let memoryCache = null;

/**
 * Age of a cached payload in seconds, read from the data itself.
 * Timing it from when this isolate stored the copy would restart the clock on
 * every edge-cache hit, letting a body live well past TTL_SECONDS.
 */
function bodyAge(body) {
  try {
    const updatedAt = Date.parse(JSON.parse(body).updated_at);
    return Number.isFinite(updatedAt) ? Math.max(0, Math.round((Date.now() - updatedAt) / 1000)) : Infinity;
  } catch {
    return Infinity;
  }
}

async function fetchUpstream(url, accept) {
  const response = await fetch(url, {
    headers: { 'User-Agent': BROWSER_USER_AGENT, Accept: accept },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    cf: { cacheTtl: 0 },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

async function collectDestiny() {
  const response = await fetchUpstream(DESTINY_URL, 'application/json');
  const payload = await response.json();
  return {
    total: Number(payload.total) || 0,
    light: Number(payload.light) || 0,
    dark: Number(payload.dark) || 0,
  };
}

/**
 * Origin stopped publishing its player count on 2026-08-27: the API still
 * answers with isOnline: true but sends playerCount: null. Coercing that to 0
 * put a false "0 online" on the page, which is worse than saying nothing, so
 * an absent count stays null and the page renders it as a state, not a number.
 *
 * playerCount is read both as a bare number and as the old { total } object —
 * the field has changed shape once already.
 */
function originPlayerCount(payload) {
  const raw = payload?.playerCount;
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;
  const total = Number(raw?.total);
  return Number.isFinite(total) ? total : null;
}

/** Ціле число або null — щоб «немає даних» не перетворилося на нуль. */
function intOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

async function collectOrigin() {
  const response = await fetchUpstream(ORIGIN_URL, 'application/json');
  const payload = await response.json();
  const count = payload?.playerCount ?? {};
  const race = payload?.racePercent ?? {};

  // Коли лічильник доступний, він містить і розбивку по расах у людях —
  // її показуємо так само, як у Destiny. Відсотки лишаються запасним
  // варіантом: вони приходять навіть тоді, коли playerCount порожній.
  return {
    total: originPlayerCount(payload),
    is_online: Boolean(payload?.isOnline),
    elyos: intOrNull(count.elyos),
    asmo: intOrNull(count.asmodian),
    // null, а не 0: якщо racePercent зникне, нуль був би невідрізнюваний від
    // справжніх 0% і бот показав би «(Asm:0%/Ely:0%)» на робочому сервері.
    elyos_pct: intOrNull(race.elyosPercent),
    asmo_pct: intOrNull(race.asmodianPercent),
  };
}

async function collectEuro() {
  const response = await fetchUpstream(EURO_URL, 'text/html');
  const html = await response.text();

  const online = EURO_ONLINE_RE.exec(html);
  const elyos = EURO_ELYOS_RE.exec(html);
  const asmo = EURO_ASMO_RE.exec(html);

  // A layout change would silently zero the counters, so treat it as a failure
  // and let the previous value stay on screen instead.
  if (!online) throw new Error('ONLINE marker not found (page layout changed?)');

  return {
    total: Number(online[1]),
    elyos_pct: elyos ? Number(elyos[1]) : 0,
    asmo_pct: asmo ? Number(asmo[1]) : 0,
  };
}

async function collect() {
  const collectors = [
    ['destiny', collectDestiny],
    ['origin', collectOrigin],
    ['euro', collectEuro],
  ];

  const settled = await Promise.allSettled(collectors.map(([, run]) => run()));

  const data = { sources: {} };
  const missing = [];
  settled.forEach((result, index) => {
    const [name] = collectors[index];
    if (result.status === 'fulfilled') {
      data[name] = result.value;
      data.sources[name] = 'ok';
    } else {
      missing.push(name);
      data.sources[name] = String(result.reason?.message || result.reason).slice(0, 120);
    }
  });

  if (missing.length) await fillFromFallback(data, missing);

  data.updated_at = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  return data;
}

async function fillFromFallback(data, missing) {
  try {
    const response = await fetchUpstream(FALLBACK_URL, 'application/json');
    const previous = await response.json();

    for (const name of missing) {
      if (!previous[name]) continue;
      data[name] = previous[name];
      data.sources[name] = `fallback: ${data.sources[name]}`;
    }
    data.fallback_updated_at = previous.updated_at ?? null;
  } catch (error) {
    // Nothing to fall back on: the missing keys stay absent and the page keeps
    // whatever it was already showing.
    data.sources.fallback = String(error?.message || error).slice(0, 120);
  }
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    Vary: 'Origin',
  };
}

function jsonResponse(request, body, { age = 0, stale = false } = {}) {
  return new Response(body, {
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=${TTL_SECONDS}`,
      'X-Aionua-Age': String(age),
      ...(stale ? { 'X-Aionua-Stale': '1' } : {}),
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders(request) });
    }

    const age = memoryCache ? bodyAge(memoryCache.body) : Infinity;
    if (age < TTL_SECONDS) {
      return jsonResponse(request, memoryCache.body, { age });
    }

    // The Cache API is a no-op on *.workers.dev, hence the memory cache above.
    const cache = caches.default;
    const cacheKey = new Request(new URL(request.url).origin + '/online', { method: 'GET' });
    const cached = await cache.match(cacheKey);
    if (cached) {
      const body = await cached.text();
      const cachedAge = bodyAge(body);
      if (cachedAge < TTL_SECONDS) {
        memoryCache = { body };
        return jsonResponse(request, body, { age: cachedAge });
      }
    }

    let data;
    try {
      data = await collect();
    } catch (error) {
      data = null;
    }

    // Fallback-filled servers still count as usable data, so check the payload
    // itself rather than the per-source status strings.
    const everySourceFailed =
      !data || !['destiny', 'origin', 'euro'].some((name) => data[name]);

    if (everySourceFailed && memoryCache && age < STALE_MAX_AGE_SECONDS) {
      return jsonResponse(request, memoryCache.body, { age, stale: true });
    }
    if (everySourceFailed) {
      return new Response(JSON.stringify({ error: 'all upstreams unavailable' }), {
        status: 503,
        headers: { ...corsHeaders(request), 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    const body = JSON.stringify(data);
    memoryCache = { body };
    ctx.waitUntil(
      cache.put(
        cacheKey,
        new Response(body, {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': `public, max-age=${TTL_SECONDS}`,
          },
        }),
      ),
    );

    return jsonResponse(request, body, { age: 0 });
  },
};
