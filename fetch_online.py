import requests
import re
import json
import os
from datetime import datetime, timezone

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
