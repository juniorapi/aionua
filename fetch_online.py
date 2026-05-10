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
    import re as _re
    resp2 = scraper.get('https://euroaion.com/en-US/Tools/Schedule', timeout=15)
    match = _re.search(
        r'<script[^>]+id=["\']schedule-data["\'][^>]*>(.*?)</script>',
        resp2.text, _re.DOTALL
    )
    if match:
        schedule = json.loads(match.group(1))
        with open('euroaion/schedule.json', 'w', encoding='utf-8') as f:
            json.dump(schedule, f, ensure_ascii=False)
        print(f"Schedule saved: {len(schedule.get('events', []))} events")
    else:
        print("Schedule: script tag not found")
except Exception as e:
    print(f"Schedule error: {e}")
