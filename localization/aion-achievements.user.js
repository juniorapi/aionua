// ==UserScript==
// @name         Aion Achievements — Premium UI
// @namespace    http://tampermonkey.net/
// @version      7.1
// @description  Трекер досягнень для Aion Destiny: прогрес, нагороди, скидання та статистика персонажів
// @author       juniorapi
// @match        https://aiondestiny.net/*
// @icon         https://aiondestiny.net/favicon.ico
// @homepageURL  https://juniorapi.github.io/aionua/localization/
// @downloadURL  https://juniorapi.github.io/aionua/localization/aion-achievements.user.js
// @updateURL    https://juniorapi.github.io/aionua/localization/aion-achievements.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const API = 'https://aiondestiny.net/api';
    let state = {};
    let collecting = false;
    let ranOnPage = false;

    // ─── API ─────────────────────────────────────────────────────────────────

    const req = async (url, opts = {}) => {
        const r = await fetch(API + url, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', lang: 'ru' },
            ...opts
        });
        if (r.status === 401) throw new Error('AUTH_401');
        if (r.status === 403) throw new Error('AUTH_403');
        if (!r.ok) throw new Error(`HTTP_${r.status}`);
        return r.json();
    };

    const post = (url, body) => req(url, { method: 'POST', body: JSON.stringify(body) });

    const api = {
        chars:    ()       => req('/account/chars'),
        season:   ()       => req('/season/time').then(d => d.remaining_time || 0).catch(() => 0),
        achiv:    (id)     => req(`/achiv/char/${id}`).then(d => ({ achievements: d.achiv_list || [], resets: d.remaining_reset_count || 0, charId: d.char_id })),
        stats:    (id)     => req(`/stat/${id}`),
        claim:    (c, a)   => post('/achiv/reward', { char_id: c, achiv_id: a }),
        reset:    (c, a)   => post('/achiv/reset',  { char_id: c, achiv_id: a }),
    };

    // ─── HELPERS ─────────────────────────────────────────────────────────────

    const n   = v => String(v ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
    const pt  = m => { const d=Math.floor(m/1440),h=Math.floor((m%1440)/60),mn=m%60; return d?`${d}д ${h}г`:h?`${h}г ${mn}хв`:`${mn}хв`; };
    const st  = s => { if(s<=0) return 'Завершено'; const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60); return d?`${d}д ${h}г`:h?`${h}г ${m}хв`:`${m}хв`; };
    const pct = a => {
        const pm = (a.progress||'').match(/(\d+)\s*\/\s*(\d+)/);
        const pp = (a.progress||'').match(/([\d,.]+)%/);
        if (pm) return Math.min(100, (parseInt(pm[1])/parseInt(pm[2]))*100);
        if (pp) return Math.min(100, parseFloat(pp[1].replace(',','.')));
        return a.status === 'COMPLETED' ? 100 : 0;
    };

    // ─── STYLES ──────────────────────────────────────────────────────────────

    function inject() {
        if (document.getElementById('_ach_css')) return;
        const s = document.createElement('style');
        s.id = '_ach_css';
        s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');

:root {
  --bg0:#07080c; --bg1:#0a0b0f; --bg2:#0f1117; --bg3:#161820; --bg4:#1c1e28;
  --bd0:#1e2030; --bd1:#272a38; --bd2:#343749;
  --t0:#e8eaf0; --t1:#8b8fa8; --t2:#4a4e62;
  --blue:#4f8ef7; --blue-dim:rgba(79,142,247,.14); --blue-b:rgba(79,142,247,.35);
  --gold:#e5a832; --gold-dim:rgba(229,168,50,.10); --gold-b:rgba(229,168,50,.45);
  --teal:#0ea5e9;
}

@keyframes _ach_in    { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
@keyframes _ach_hdr   { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
@keyframes _ach_pulse { 0%,100%{box-shadow:none} 50%{box-shadow:0 0 14px -3px rgba(229,168,50,.4)} }
@keyframes _ach_spin  { to{transform:rotate(360deg)} }
@keyframes _ach_bar   { from{width:0} to{width:var(--w)} }

._ach_wrap {
  position:fixed;inset:0;z-index:2147483647;
  display:flex;align-items:center;justify-content:center;padding:12px;
  background:rgba(7,8,12,.88);backdrop-filter:blur(3px);
  animation:_ach_in .15s ease;
}
._ach_panel {
  width:min(1200px,96vw);max-height:92vh;
  display:flex;flex-direction:column;overflow:hidden;
  background:var(--bg1);border:1px solid var(--bd1);border-radius:2px;
  box-shadow:0 0 0 1px rgba(255,255,255,.025) inset,0 28px 80px rgba(0,0,0,.75);
  font-family:'Inter',system-ui,sans-serif;color:var(--t0);
}

/* Header */
._ach_hdr {
  position:relative;padding:14px 20px 0;flex-shrink:0;
  background:linear-gradient(180deg,rgba(79,142,247,.04) 0%,transparent 100%);
}
._ach_hdr::before {
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,#4f8ef7,#7c3aed,#4f8ef7);
  background-size:200% 100%;animation:_ach_hdr 8s linear infinite;
}
._ach_hdr_top { display:flex;align-items:center;justify-content:space-between;margin-bottom:12px; }
._ach_hdr_left { display:flex;align-items:center;gap:10px; }
._ach_hdr_title { font-size:13px;font-weight:600;color:var(--t0);text-transform:uppercase;letter-spacing:.08em; }
._ach_badge {
  padding:2px 8px;border-radius:2px;font-size:10px;font-weight:500;
  background:var(--blue-dim);border:1px solid var(--blue-b);color:var(--blue);
  text-transform:uppercase;letter-spacing:.08em;
}
._ach_timer {
  display:flex;align-items:center;gap:8px;
  font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:var(--blue);
}
._ach_timer_lbl { font-family:'Inter',sans-serif;font-size:10px;font-weight:500;color:var(--t2);text-transform:uppercase;letter-spacing:.10em; }
._ach_close {
  width:28px;height:28px;border-radius:2px;background:transparent;
  border:1px solid var(--bd1);color:var(--t2);font-size:16px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:border-color .15s,color .15s,background .15s;line-height:1;
}
._ach_close:hover { border-color:rgba(239,68,68,.5);color:#f87171;background:rgba(239,68,68,.1); }

/* Tabs */
._ach_tabs {
  display:flex;align-items:flex-end;padding:0 20px;
  border-bottom:1px solid var(--bd0);background:var(--bg1);flex-shrink:0;
}
._ach_tab {
  position:relative;padding:9px 16px 8px;font-size:12px;font-weight:500;
  color:var(--t2);cursor:pointer;border:none;background:transparent;
  transition:color .15s;white-space:nowrap;letter-spacing:.03em;
}
._ach_tab:hover { color:var(--t1); }
._ach_tab._on { color:var(--t0); }
._ach_tab._on::after {
  content:'';position:absolute;bottom:-1px;left:16px;right:16px;
  height:2px;background:var(--blue);
}

/* Info bar */
._ach_bar {
  display:flex;align-items:center;padding:10px 20px;
  background:var(--bg2);border-bottom:1px solid var(--bd0);flex-shrink:0;gap:0;
}
._ach_stat {
  display:flex;flex-direction:column;padding:0 20px;
  border-right:1px solid var(--bd0);
}
._ach_stat:first-child { padding-left:0; }
._ach_stat_val {
  font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;
  color:var(--t0);line-height:1.1;font-variant-numeric:tabular-nums;
}
._ach_stat_lbl {
  font-size:10px;font-weight:500;color:var(--t2);
  text-transform:uppercase;letter-spacing:.12em;margin-top:3px;
}
._ach_stat_val._blue { color:var(--blue); }
._ach_stat_val._gold { color:var(--gold); }
._ach_sbtn {
  margin-left:auto;display:flex;align-items:center;gap:6px;
  padding:6px 14px;background:transparent;border:1px solid var(--bd1);
  color:var(--t1);font-size:11px;font-weight:500;text-transform:uppercase;
  letter-spacing:.08em;cursor:pointer;border-radius:2px;
  transition:border-color .15s,color .15s,background .15s;
}
._ach_sbtn:hover { border-color:var(--blue-b);color:var(--blue);background:var(--blue-dim); }
._ach_sbtn:disabled { opacity:.5;cursor:default; }

/* Grid */
._ach_body { flex:1;overflow:hidden; }
._ach_scroll {
  height:100%;overflow-y:auto;padding:14px 20px 20px;
  scrollbar-width:thin;scrollbar-color:var(--bd2) transparent;
}
._ach_scroll::-webkit-scrollbar { width:4px; }
._ach_scroll::-webkit-scrollbar-track { background:transparent; }
._ach_scroll::-webkit-scrollbar-thumb { background:var(--bd2);border-radius:2px; }
._ach_grid { display:grid;gap:6px; }

/* Card */
._ach_card {
  position:relative;background:var(--bg2);
  border:1px solid var(--bd0);border-left:2px solid transparent;
  padding:10px 10px 8px;display:flex;flex-direction:column;gap:5px;
  cursor:default;transition:background .15s,border-color .15s;min-height:88px;
}
._ach_card:hover { background:var(--bg3);border-color:var(--bd2); }
._ach_card._done {
  border-left-color:var(--gold-b);
  background:linear-gradient(90deg,rgba(229,168,50,.05) 0%,var(--bg2) 55%);
}
._ach_card._done:hover { background:linear-gradient(90deg,rgba(229,168,50,.08) 0%,var(--bg3) 55%); }
._ach_card._reward {
  border-left-color:var(--gold-b);
  background:linear-gradient(90deg,rgba(229,168,50,.07) 0%,var(--bg2) 55%);
  animation:_ach_pulse 2.5s ease-in-out infinite;
}
._ach_card._reset  { border-left-color:var(--blue-b); }
._ach_card._locked { opacity:.45; }

._ach_card_top { display:flex;justify-content:space-between;align-items:flex-start;gap:5px;flex:1; }
._ach_card_name {
  font-size:11px;font-weight:500;color:var(--t0);line-height:1.35;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
  overflow:hidden;flex:1;
}
._ach_card._done  ._ach_card_name { color:var(--gold); }
._ach_card._reward ._ach_card_name { color:var(--gold); }
._ach_card._locked ._ach_card_name { color:var(--t2); }

._ach_card_ico { font-size:12px;flex-shrink:0;line-height:1;margin-top:1px; }

._ach_prog_txt {
  font-family:'JetBrains Mono',monospace;font-size:11px;
  color:var(--t2);font-variant-numeric:tabular-nums;line-height:1;
}
._ach_card._done   ._ach_prog_txt { color:rgba(229,168,50,.6); }
._ach_card._reward ._ach_prog_txt { color:rgba(229,168,50,.6); }

._ach_track { width:100%;height:2px;background:var(--bg4);overflow:hidden; }
._ach_fill  { height:100%;animation:_ach_bar .4s ease forwards;width:var(--w); }

._ach_card_foot { display:flex;align-items:center;justify-content:flex-end;margin-top:1px; }
._ach_abtn {
  padding:2px 8px;font-size:9px;font-weight:700;text-transform:uppercase;
  letter-spacing:.08em;cursor:pointer;border-radius:2px;transition:background .15s,border-color .15s;
  white-space:nowrap;border:1px solid;
}
._ach_abtn._claim { background:var(--gold-dim);border-color:var(--gold-b);color:var(--gold); }
._ach_abtn._claim:hover { background:rgba(229,168,50,.2);border-color:rgba(229,168,50,.7); }
._ach_abtn._rst   { background:var(--blue-dim);border-color:var(--blue-b);color:var(--blue); }
._ach_abtn._rst:hover { background:rgba(79,142,247,.22); }
._ach_abtn:disabled { opacity:.4;cursor:default; }

/* Stats panel */
._ach_stats_wrap {
  position:absolute;inset:0;z-index:10;background:rgba(7,8,12,.82);
  display:flex;align-items:center;justify-content:center;
  animation:_ach_in .15s ease;
}
._ach_stats_box {
  width:min(700px,90%);background:var(--bg1);
  border:1px solid var(--bd1);border-radius:2px;
  box-shadow:0 24px 64px rgba(0,0,0,.7);overflow:hidden;
}
._ach_stats_hdr {
  display:flex;justify-content:space-between;align-items:center;
  padding:14px 18px;border-bottom:1px solid var(--bd0);
  background:linear-gradient(90deg,var(--blue-dim),transparent);
}
._ach_stats_title { font-size:13px;font-weight:600;color:var(--t0);text-transform:uppercase;letter-spacing:.08em; }
._ach_stats_grid  { display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--bd0);padding:1px; }
._ach_sc {
  background:var(--bg2);padding:14px 12px;display:flex;flex-direction:column;gap:4px;
  transition:background .15s;
}
._ach_sc:hover { background:var(--bg3); }
._ach_sc._feat { background:var(--blue-dim); }
._ach_sc_val {
  font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;
  color:var(--t0);line-height:1;font-variant-numeric:tabular-nums;
}
._ach_sc._feat ._ach_sc_val { color:var(--blue); }
._ach_sc_lbl { font-size:10px;font-weight:500;color:var(--t2);text-transform:uppercase;letter-spacing:.10em;margin-top:4px; }
._ach_sc_rank { font-size:10px;color:var(--t2); }
._ach_sc_rank b { color:var(--t1);font-weight:600; }

/* Error */
._ach_err_box {
  width:min(420px,90vw);background:var(--bg1);
  border:1px solid rgba(239,68,68,.2);border-radius:2px;
  padding:32px 28px;text-align:center;
  box-shadow:0 24px 60px rgba(239,68,68,.12);
  animation:_ach_in .15s ease;
}
._ach_err_ico   { font-size:48px;margin-bottom:16px;line-height:1; }
._ach_err_title { font-size:18px;font-weight:700;color:#f87171;margin-bottom:10px; }
._ach_err_msg   { font-size:13px;color:var(--t1);line-height:1.7;margin-bottom:22px;white-space:pre-line; }
._ach_err_btns  { display:flex;gap:8px;justify-content:center; }
._ach_btn_reload {
  padding:8px 20px;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);
  border-radius:2px;color:#f87171;font-size:12px;font-weight:700;cursor:pointer;
  text-transform:uppercase;letter-spacing:.06em;transition:background .15s;
}
._ach_btn_reload:hover { background:rgba(239,68,68,.28); }
._ach_btn_dismiss {
  padding:8px 20px;background:transparent;border:1px solid var(--bd1);
  border-radius:2px;color:var(--t1);font-size:12px;font-weight:600;cursor:pointer;
  text-transform:uppercase;letter-spacing:.06em;transition:background .15s,color .15s;
}
._ach_btn_dismiss:hover { background:var(--bg3);color:var(--t0); }

/* Spinner */
._ach_spin {
  width:28px;height:28px;border-radius:50%;
  border:2px solid rgba(79,142,247,.15);border-top-color:var(--blue);
  animation:_ach_spin .65s linear infinite;
  display:inline-block;vertical-align:middle;
}
._ach_loading {
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:60px 20px;gap:14px;color:var(--t2);font-size:12px;letter-spacing:.04em;text-transform:uppercase;
}
`;
        (document.head || document.documentElement).appendChild(s);
    }

    // ─── OVERLAYS ────────────────────────────────────────────────────────────

    function mkOverlay(id) {
        document.getElementById(id)?.remove();
        const el = document.createElement('div');
        el.id = id; el.className = '_ach_wrap';
        document.body.appendChild(el);
        el.addEventListener('click', e => { if (e.target === el) el.remove(); });
        document.addEventListener('keydown', function h(e) {
            if (e.key === 'Escape') { el.remove(); document.removeEventListener('keydown', h); }
        });
        return el;
    }

    function showError(title, msg, reload = false) {
        inject();
        const ov = mkOverlay('_ach_err');
        const box = document.createElement('div');
        box.className = '_ach_err_box';
        const ico = reload ? '🔐' : title.includes('VIP') ? '💎' : '⚠️';
        box.innerHTML = `
            <div class="_ach_err_ico">${ico}</div>
            <div class="_ach_err_title">${title}</div>
            <div class="_ach_err_msg">${msg}</div>
            <div class="_ach_err_btns">
                ${reload ? `<button class="_ach_btn_reload">🔄 Перезавантажити</button>` : ''}
                <button class="_ach_btn_dismiss">Закрити</button>
            </div>`;
        if (reload) box.querySelector('._ach_btn_reload').onclick = () => location.reload();
        box.querySelector('._ach_btn_dismiss').onclick = () => ov.remove();
        ov.appendChild(box);
    }

    function showStats(data, charName, parentPanel) {
        parentPanel.querySelector('._ach_stats_wrap')?.remove();
        const wrap = document.createElement('div');
        wrap.className = '_ach_stats_wrap';

        const cards = [
            { lbl:'Кінар',          val:n(data.total_kinah),        rank:data.total_kinah_pos},
            { lbl:'Вбито мобів',    val:n(data.npc_kill),           rank:data.npc_kill_pos },
            { lbl:'Час у грі',      val:pt(data.play_time),         rank:data.play_time_pos },
            { lbl:'AP',             val:n(data.total_ap),           rank:data.total_ap_pos},
            { lbl:'GP',             val:n(data.total_gp),           rank:data.total_gp_pos },
            { lbl:'Урон гравцям',   val:n(data.players_damage),     rank:data.players_damage_pos },
            { lbl:'Урон мобам',     val:n(data.npc_damage),         rank:data.npc_damage_pos },
            { lbl:'Боси',           val:n(data.boss_kill),          rank:data.boss_kill_pos },
            { lbl:'Блокувань',      val:n(data.block_count),        rank:data.block_count_pos },
            { lbl:'LFG',            val:n(data.lfg_message),        rank:data.lfg_message_pos },
        ];

        const box = document.createElement('div');
        box.className = '_ach_stats_box';
        box.innerHTML = `
            <div class="_ach_stats_hdr">
                <span class="_ach_stats_title">${charName} — Статистика</span>
                <button class="_ach_close">×</button>
            </div>
            <div class="_ach_stats_grid">
                ${cards.map(c => `
                    <div class="_ach_sc${c.feat ? ' _feat' : ''}">
                        <div class="_ach_sc_val">${c.val}</div>
                        <div class="_ach_sc_lbl">${c.lbl}</div>
                        <div class="_ach_sc_rank">Рейтинг <b>#${c.rank}</b></div>
                    </div>`).join('')}
            </div>`;
        box.querySelector('._ach_close').onclick = () => wrap.remove();
        wrap.onclick = e => { if (e.target === wrap) wrap.remove(); };
        wrap.appendChild(box);
        parentPanel.appendChild(wrap);
    }

    // ─── MAIN MODAL ──────────────────────────────────────────────────────────

    // charOrder — массив имён персонажей в порядке, который вернул сервер
    function render(seasonTime, charOrder) {
        inject();
        const ov    = mkOverlay('_ach_main');
        const panel = document.createElement('div');
        panel.className = '_ach_panel';

        // Header
        const hdr = document.createElement('div');
        hdr.className = '_ach_hdr';
        hdr.innerHTML = `
            <div class="_ach_hdr_top">
                <div class="_ach_hdr_left">
                    <span class="_ach_hdr_title">Досягнення</span>
                    <span class="_ach_badge">Season</span>
                </div>
                <div class="_ach_hdr_left" style="gap:16px">
                    <div class="_ach_timer">
                        <span class="_ach_timer_lbl">До кінця</span>
                        ${st(seasonTime)}
                    </div>
                    <button class="_ach_close">×</button>
                </div>
            </div>`;
        hdr.querySelector('._ach_close').onclick = () => ov.remove();

        // Tabs
        const tabStrip = document.createElement('div');
        tabStrip.className = '_ach_tabs';

        // Info bar
        const infoBar = document.createElement('div');
        infoBar.className = '_ach_bar';

        // Body
        const body   = document.createElement('div');
        body.className = '_ach_body';
        const scroll = document.createElement('div');
        scroll.className = '_ach_scroll';
        const grid   = document.createElement('div');
        grid.className = '_ach_grid';
        scroll.appendChild(grid);
        body.appendChild(scroll);

        panel.append(hdr, tabStrip, infoBar, body);
        ov.appendChild(panel);

        // Используем порядок из API, а не из Object.keys(state)
        const chars = charOrder ?? Object.keys(state);
        let active  = chars[0];

        chars.forEach(name => {
            const t = document.createElement('button');
            t.className = '_ach_tab' + (name === active ? ' _on' : '');
            t.textContent = name;
            t.dataset.c = name;
            t.onclick = () => show(name);
            tabStrip.appendChild(t);
        });

        function show(name) {
            active = name;
            tabStrip.querySelectorAll('._ach_tab').forEach(t => t.classList.toggle('_on', t.dataset.c === name));

            const { achievements: list = [], resets = 0, charId = 0 } = state[name] || {};
            const done    = list.filter(a => a.status === 'COMPLETED').length;
            const rewards = list.filter(a => a.status === 'REWARD_AVAILABLE').length;

            // Info bar
            infoBar.innerHTML = '';
            [
                { val: list.length, lbl: 'Ачівок',     cls: '' },
                { val: done,        lbl: 'Виконано',   cls: '_blue' },
                { val: resets,      lbl: 'Скидань',    cls: '_gold' },
            ].forEach(s => {
                const b = document.createElement('div');
                b.className = '_ach_stat';
                b.innerHTML = `<span class="_ach_stat_val ${s.cls}">${s.val}</span><span class="_ach_stat_lbl">${s.lbl}</span>`;
                infoBar.appendChild(b);
            });
            if (rewards > 0) {
                const b = document.createElement('div');
                b.className = '_ach_stat';
                b.innerHTML = `<span class="_ach_stat_val _gold">🎁 ${rewards}</span><span class="_ach_stat_lbl">Нагород</span>`;
                infoBar.appendChild(b);
            }

            const sbtn = document.createElement('button');
            sbtn.className = '_ach_sbtn';
            sbtn.innerHTML = '▲ Статистика';
            sbtn.onclick = async () => {
                sbtn.innerHTML = '<span class="_ach_spin"></span>';
                sbtn.disabled = true;
                try {
                    showStats(await api.stats(charId), name, panel);
                } catch (e) {
                    if (e.message.includes('403')) showError('💎 VIP', 'Статистика доступна тільки для VIP.');
                    else showError('Помилка', e.message);
                } finally {
                    sbtn.innerHTML = '▲ Статистика';
                    sbtn.disabled = false;
                }
            };
            infoBar.appendChild(sbtn);

            // Cards
            grid.innerHTML = '';
            if (!list.length) {
                grid.innerHTML = '<div style="color:var(--t2);padding:40px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Досягнень не знайдено</div>';
                return;
            }

            const maxLen = Math.max(...list.map(a => (a.title||'').length));
            const cols   = maxLen <= 18 ? 7 : maxLen <= 26 ? 6 : 5;
            grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;

            list.forEach(ach => {
                const p    = pct(ach);
                const done = ach.status === 'COMPLETED' || p >= 100;
                const barC = done
                    ? 'linear-gradient(90deg,var(--gold),#f7c948)'
                    : p > 55
                        ? 'linear-gradient(90deg,var(--blue),var(--teal))'
                        : p > 20
                            ? 'linear-gradient(90deg,#4f8ef7aa,#0ea5e988)'
                            : 'var(--bg4)';

                const cls = done
                    ? '_done'
                    : ach.status === 'REWARD_AVAILABLE'
                        ? '_reward'
                        : ach.status === 'RESET_AVAILABLE'
                            ? '_reset'
                            : ach.status === 'RESET_NOT_AVAILABLE'
                                ? '_locked'
                                : '';

                const ico = { COMPLETED:'✓', REWARD_AVAILABLE:'🎁', RESET_AVAILABLE:'↺', RESET_NOT_AVAILABLE:'🔒' }[ach.status] || '';

                const desc = (ach.description||'').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'').trim();

                const card = document.createElement('div');
                card.className = `_ach_card ${cls}`;
                card.title = desc || ach.title || '';

                card.innerHTML = `
                    <div class="_ach_card_top">
                        <div class="_ach_card_name">${ach.title||'Без назви'}</div>
                        <div class="_ach_card_ico">${ico}</div>
                    </div>
                    <div class="_ach_prog_txt">${ach.progress||'—'}</div>
                    <div class="_ach_track"><div class="_ach_fill" style="--w:${p}%;background:${barC}"></div></div>
                    <div class="_ach_card_foot"></div>`;

                const foot = card.querySelector('._ach_card_foot');

                if (ach.status === 'REWARD_AVAILABLE') {
                    const btn = document.createElement('button');
                    btn.className = '_ach_abtn _claim';
                    btn.textContent = 'Забрати';
                    btn.onclick = async () => {
                        const o = btn.textContent; btn.textContent = '...'; btn.disabled = true;
                        try {
                            const r = await api.claim(charId, ach.id);
                            if (r.result === 'REWARD_SUCCESS') {
                                btn.textContent = '✓';
                                setTimeout(async () => { state[name] = await api.achiv(charId); show(name); }, 700);
                            } else throw new Error(r.result);
                        } catch { btn.textContent = '✗'; setTimeout(() => { btn.textContent = o; btn.disabled = false; }, 1400); }
                    };
                    foot.appendChild(btn);
                }

                if (ach.status === 'RESET_AVAILABLE') {
                    const btn = document.createElement('button');
                    btn.className = '_ach_abtn _rst';
                    btn.textContent = 'Скинути';
                    btn.onclick = async () => {
                        if (!confirm('Скинути досягнення?')) return;
                        const o = btn.textContent; btn.textContent = '...'; btn.disabled = true;
                        try {
                            const r = await api.reset(charId, ach.id);
                            if (r.result === 'RESET_SUCCESS') {
                                btn.textContent = '✓';
                                setTimeout(async () => { state[name] = await api.achiv(charId); show(name); }, 700);
                            } else throw new Error(r.result);
                        } catch { btn.textContent = '✗'; setTimeout(() => { btn.textContent = o; btn.disabled = false; }, 1400); }
                    };
                    foot.appendChild(btn);
                }

                grid.appendChild(card);
            });
        }

        show(active);
    }

    // ─── COLLECT + SHOW ──────────────────────────────────────────────────────

    async function load() {
        if (collecting) return;
        collecting = true;
        inject();

        const ov = mkOverlay('_ach_main');
        const box = document.createElement('div');
        box.className = '_ach_panel';
        box.style.cssText = 'width:min(380px,90vw);max-height:unset;';
        box.innerHTML = `
            <div class="_ach_hdr" style="padding:14px 20px;">
                <div class="_ach_hdr_top" style="margin-bottom:0">
                    <span class="_ach_hdr_title">Завантаження</span>
                    <button class="_ach_close">×</button>
                </div>
            </div>
            <div class="_ach_loading"><div class="_ach_spin" style="width:36px;height:36px;"></div>Отримання даних...</div>`;
        box.querySelector('._ach_close').onclick = () => { ov.remove(); collecting = false; };
        ov.appendChild(box);

        try {
            state = {};
            const [chars, season] = await Promise.all([api.chars(), api.season()]);
            if (!chars?.length) throw new Error('Персонажів не знайдено');

            // Сохраняем порядок персонажей из API
            const charOrder = chars.map(c => c.char_name);

            await Promise.all(chars.map(async c => {
                try { state[c.char_name] = await api.achiv(c.char_id); }
                catch { state[c.char_name] = { achievements: [], resets: 0, charId: c.char_id }; }
            }));
            ov.remove();
            // Передаём порядок в render
            render(season, charOrder);
        } catch (e) {
            ov.remove();
            if (e.message.includes('403')) showError('💎 VIP ДОСТУП', 'Перегляд досягнень доступний тільки для VIP.');
            else if (e.message.includes('401')) showError('Помилка авторизації', 'Сесія закінчилась.\nПерезавантажте сторінку.', true);
            else showError('Помилка', e.message);
        } finally {
            collecting = false;
        }
    }

    // ─── ROUTING ─────────────────────────────────────────────────────────────

    const isAch = () => location.href.includes('/account/achievements');

    function init() {
        if (!isAch() || ranOnPage) return;
        ranOnPage = true;
        setTimeout(load, 800);
    }

    let lastUrl = location.href;
    function poll() {
        if (location.href !== lastUrl) {
            lastUrl = location.href; ranOnPage = false;
            if (isAch()) setTimeout(init, 500);
        }
    }

    const _ps = history.pushState.bind(history);
    const _rs = history.replaceState.bind(history);
    history.pushState    = (...a) => { _ps(...a);    ranOnPage = false; setTimeout(poll, 100); };
    history.replaceState = (...a) => { _rs(...a);    ranOnPage = false; setTimeout(poll, 100); };
    window.addEventListener('popstate', () => { ranOnPage = false; setTimeout(poll, 100); });
    setInterval(poll, 500);
    document.addEventListener('click', e => {
        if (e.target.closest('a')?.href?.includes('/account/achievements')) { ranOnPage = false; setTimeout(poll, 600); }
    }, true);

    function boot() {
        new MutationObserver(() => { if (isAch() && !ranOnPage) poll(); })
            .observe(document.body || document.documentElement, { childList: true, subtree: true });
        if (isAch()) init();
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', boot)
        : boot();

    setTimeout(() => { if (isAch() && !ranOnPage) init(); }, 2000);
})();
