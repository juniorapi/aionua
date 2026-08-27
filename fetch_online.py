import requests
import re
import json
import os
from datetime import datetime, timezone

ORIGIN_SCHEDULE_URL = 'https://originaion.com/schedule'
ORIGIN_BASE_URL = 'https://originaion.com'
ORIGIN_DAYS = (
    'monday', 'tuesday', 'wednesday', 'thursday',
    'friday', 'saturday', 'sunday',
)


def _origin_number(value):
    """Keep whole-hour values compact while supporting future half-hour slots."""
    hours, minutes = (int(part) for part in value.split(':', 1))
    number = hours + minutes / 60
    return int(number) if number.is_integer() else number


def _origin_event_name(chunks, key):
    pattern = re.compile(rf'(?<![\w$]){re.escape(key)}:"([^"\\]*(?:\\.[^"\\]*)*)"')
    for chunk in chunks:
        match = pattern.search(chunk)
        if match:
            return json.loads(f'"{match.group(1)}"')
    return re.sub(r'(?<!^)([A-Z])', r' \1', key).title()


def _parse_origin_schedule_chunk(chunk, all_chunks, source_asset):
    category_markers = {
        'pvp': 'r={pvp:{',
        'arenas': '},arenas:{',
        'siege': '},siege:{',
        'rifts': '},rifts:{',
    }
    positions = {category: chunk.find(marker) for category, marker in category_markers.items()}
    if any(position < 0 for position in positions.values()):
        raise ValueError('Origin schedule category markers not found')

    category_ranges = {}
    ordered = list(category_markers)
    for index, category in enumerate(ordered):
        start = positions[category]
        end = positions[ordered[index + 1]] if index + 1 < len(ordered) else chunk.find('}},y="today"', start)
        if end < 0:
            raise ValueError(f'Origin schedule end marker not found for {category}')
        category_ranges[category] = chunk[start:end]

    event_pattern = re.compile(
        r'\[d\.(?:pvpInstances|siegeInstances|riftInstances)\.(?P<key>[A-Za-z0-9_]+)\]:'
        r'\{image:t\("(?P<image>[^"]+)"\),schedule:\{(?P<schedule>.*?)\}\}',
        re.DOTALL,
    )
    day_pattern = re.compile(
        r'\[d\.daysShort\.(?P<day>' + '|'.join(ORIGIN_DAYS) + r')\]:\[(?P<slots>[^\]]*)\]'
    )
    slot_pattern = re.compile(r'"(?P<start>\d{2}:\d{2})-(?P<end>\d{2}:\d{2})"')

    records = []
    source_event_count = 0
    for category in ordered:
        for match in event_pattern.finditer(category_ranges[category]):
            schedule = {day: [] for day in ORIGIN_DAYS}
            for day_match in day_pattern.finditer(match.group('schedule')):
                schedule[day_match.group('day')] = [
                    {
                        's': _origin_number(slot.group('start')),
                        'e': _origin_number(slot.group('end')),
                    }
                    for slot in slot_pattern.finditer(day_match.group('slots'))
                ]

            if not any(schedule.values()):
                continue

            source_event_count += 1
            grouped_days = {}
            for day_index, day in enumerate(ORIGIN_DAYS):
                slots_key = tuple((slot['s'], slot['e']) for slot in schedule[day])
                if slots_key:
                    grouped_days.setdefault(slots_key, []).append(day_index)

            event_name = _origin_event_name(all_chunks, match.group('key'))
            for slots_key, days in grouped_days.items():
                records.append({
                    'names': [event_name],
                    'key': match.group('key'),
                    'cat': category,
                    'days': days,
                    'times': [{'s': start, 'e': end} for start, end in slots_key],
                })

    if source_event_count < 20 or len(records) < source_event_count:
        raise ValueError(
            f'Origin schedule validation failed: {source_event_count} events, {len(records)} records'
        )

    return {
        'serverOffset': 2,
        'eventCount': source_event_count,
        'events': records,
        'sourceUrl': ORIGIN_SCHEDULE_URL,
        'sourceAsset': source_asset,
        'fetchedAt': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
    }


def fetch_origin_schedule():
    headers = {'User-Agent': 'Mozilla/5.0 AionUA schedule collector'}
    response = requests.get(ORIGIN_SCHEDULE_URL, headers=headers, timeout=20)
    response.raise_for_status()
    script_sources = list(dict.fromkeys(re.findall(r'<script[^>]+src="([^"]+\.js)"', response.text)))
    if not script_sources:
        raise ValueError('Origin schedule scripts not found')

    cached_asset = None
    try:
        with open('originaion/schedule.json', encoding='utf-8') as cached_file:
            cached_asset = json.load(cached_file).get('sourceAsset')
    except (FileNotFoundError, json.JSONDecodeError, OSError):
        pass
    if cached_asset in script_sources:
        script_sources.remove(cached_asset)
        script_sources.insert(0, cached_asset)

    chunks = []
    schedule_chunk = None
    schedule_asset = None
    for source in script_sources:
        asset_url = source if source.startswith('http') else ORIGIN_BASE_URL + source
        chunk_response = requests.get(asset_url, headers=headers, timeout=20)
        chunk_response.raise_for_status()
        chunks.append(chunk_response.text)
        if 'r={pvp:{' in chunk_response.text and 'mirenKrotanKysis' in chunk_response.text:
            schedule_chunk = chunk_response.text
            schedule_asset = source
            break

    if schedule_chunk is None:
        raise ValueError('Origin schedule data chunk not found')

    # Translation strings can live in a later chunk than the schedule itself.
    known_keys = set(re.findall(
        r'\[d\.(?:pvpInstances|siegeInstances|riftInstances)\.([A-Za-z0-9_]+)\]',
        schedule_chunk,
    ))
    translated_keys = {
        key for key in known_keys if any(re.search(rf'(?<![\w$]){re.escape(key)}:"', chunk) for chunk in chunks)
    }
    if translated_keys != known_keys:
        fetched_sources = set(script_sources[:len(chunks)])
        for source in script_sources:
            if source in fetched_sources:
                continue
            asset_url = source if source.startswith('http') else ORIGIN_BASE_URL + source
            chunk_response = requests.get(asset_url, headers=headers, timeout=20)
            chunk_response.raise_for_status()
            chunks.append(chunk_response.text)
            translated_keys = {
                key for key in known_keys if any(re.search(rf'(?<![\w$]){re.escape(key)}:"', chunk) for chunk in chunks)
            }
            if translated_keys == known_keys:
                break

    return _parse_origin_schedule_chunk(schedule_chunk, chunks, schedule_asset)

data = {}

# --- AionDestiny ---
try:
    resp = requests.get('https://aiondestiny.net/api/online', timeout=10)
    d = resp.json()
    data['destiny'] = {
        'total': d.get('total', 0),
        'light': d.get('light', 0),
        'dark':  d.get('dark', 0),
    }
    print(f"Destiny: {data['destiny']}")
except Exception as e:
    data['destiny'] = {'total': 0, 'light': 0, 'dark': 0}
    print(f"Destiny error: {e}")

# --- Origin Aion ---
try:
    resp = requests.get('https://originaion.com/api/server-status', timeout=10)
    resp.raise_for_status()
    origin_status = resp.json()
    player_count = origin_status.get('playerCount') or {}
    data['origin'] = {
        'total': int(player_count.get('total') or 0),
        'is_online': bool(origin_status.get('isOnline')),
    }
    print(f"Origin: {data['origin']}")
except Exception as e:
    data['origin'] = {'total': 0, 'is_online': False}
    print(f"Origin error: {e}")

# --- EuroAion ---
try:
    import cloudscraper
    scraper = cloudscraper.create_scraper()
    resp = scraper.get('https://euroaion.com/en-US', timeout=15)
    html = resp.text

    online_match    = re.search(r"<strong>ONLINE</strong>\s*(\d+)", html)
    elyos_match     = re.search(r"status-race--elyos\b.*?(\d+)%", html, re.DOTALL)
    asmodians_match = re.search(r"status-race--asmo\b.*?(\d+)%", html, re.DOTALL)

    data['euro'] = {
        'total':      int(online_match.group(1))    if online_match    else 0,
        'elyos_pct':  int(elyos_match.group(1))     if elyos_match     else 0,
        'asmo_pct':   int(asmodians_match.group(1)) if asmodians_match else 0,
    }
    print(f"Euro: {data['euro']}")
except Exception as e:
    data['euro'] = {'total': 0, 'elyos_pct': 0, 'asmo_pct': 0}
    print(f"Euro error: {e}")

data['updated_at'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

with open('data.json', 'w') as f:
    json.dump(data, f)

print(f"Saved: {data}")

# --- EuroAion Schedule ---
try:
    import cloudscraper as _cloudscraper

    schedule_url = 'https://euroaion.com/ru-RU/Tools/Schedule'
    schedule_scraper = _cloudscraper.create_scraper()
    resp2 = schedule_scraper.get(schedule_url, timeout=15)
    resp2.raise_for_status()
    match = re.search(
        r'<script[^>]+id=["\']schedule-data["\'][^>]*>(.*?)</script>',
        resp2.text, re.DOTALL
    )
    if not match:
        raise ValueError('schedule-data script tag not found')

    schedule = json.loads(match.group(1))
    events = schedule.get('events') if isinstance(schedule, dict) else None
    if not isinstance(events, list) or not events:
        raise ValueError('schedule contains no events')

    schedule['sourceUrl'] = schedule_url
    schedule['fetchedAt'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    with open('euroaion/schedule.json', 'w', encoding='utf-8') as f:
        json.dump(schedule, f, ensure_ascii=False)
    print(f"Schedule saved: {len(events)} events")
except Exception as e:
    print(f"Schedule error: {e}")

# --- Origin Aion Schedule ---
try:
    origin_schedule = fetch_origin_schedule()
    os.makedirs('originaion', exist_ok=True)
    with open('originaion/schedule.json', 'w', encoding='utf-8') as f:
        json.dump(origin_schedule, f, ensure_ascii=False)
    print(
        f"Origin schedule saved: {origin_schedule['eventCount']} events, "
        f"{len(origin_schedule['events'])} records"
    )
except Exception as e:
    # Keep the last successfully collected file when Origin changes or is unavailable.
    print(f"Origin schedule error: {e}")
