"""Розклад AionDestiny з API сайту db.aiondestiny.net.

Сторінка https://db.aiondestiny.net/schedule/ — застосунок без даних у HTML;
розклад віддають два POST-запити з порожнім тілом:
  /api/schedule/siege       — облоги (лише година початку, тривалості немає);
  /api/schedule/matchmaker  — PvP-інстанси, арени й автоматичні турніри.

Мову задає нестандартний заголовок `lang`; української немає, тож беремо
англійську (вона ж — originalName) і перекладаємо назви самі.

Кожне значення в `times` — день × 65536 + година за часом сервера (МСК, UTC+3
без літнього часу). День рахується з неділі, як getDay() у JavaScript.
"""
import json
import re
from datetime import datetime, timezone

import requests

SCHEDULE_PAGE = 'https://db.aiondestiny.net/schedule/'
SCHEDULE_API = 'https://db.aiondestiny.net/api/schedule/'
SCHEDULE_FILE = 'aiondestiny/schedule.json'
SERVER_OFFSET = 3
# Розклад міняється з патчами, тож частіше ніж раз на годину сайт не питаємо.
MAX_AGE_SECONDS = 60 * 60
TIMESTAMP_FORMAT = '%Y-%m-%dT%H:%M:%SZ'

# Ідентифікатори з /matchmaker. Невідомі id до 1000 вважаємо PvP-інстансами,
# від 1000 — автоматичними турнірами: так їх нумерує сам сайт.
PVP_IDS = {1, 107, 108, 109, 111}
ARENA_IDS = {39, 40, 41, 42}
# Дерадикони Джантри й Садх мають ті самі години, що й звичайний; сторінка сайту їх не показує.
HIDDEN_MATCHMAKER_IDS = {2, 3}
# Чотири Серця Тіамаранти йдуть одночасно, сайт показує їх одним рядком.
TIAMARANTA_IDS = {4011, 4021, 4031, 4041}
TIAMARANTA_NAME = ('Серця Тіамаранти', "Tiamaranta's Hearts")

# Мінімум записів у відповіді: менше означає, що сайт змінив формат або віддав огризок.
MIN_SIEGES = 10
MIN_MATCHMAKERS = 10

UKRAINIAN_NAMES = {
    'Divine Fortress': 'Божественна фортеця',
    "Siel's Western Fortress": 'Західна фортеця Сіеля',
    "Siel's Eastern Fortress": 'Східна фортеця Сіеля',
    'Sulfur Fortress': 'Сірчана фортеця',
    'Roah Fortress': 'Фортеця Роа',
    'Krotan Refuge': 'Прихисток Кротана',
    'Kysis Fortress': 'Фортеця Кісіс',
    'Miren Fortress': 'Фортеця Мірен',
    'Asteria Fortress': 'Фортеця Астерія',
    'Temple of Scales': 'Храм Терезів',
    'Altar of Avarice': 'Вівтар Жадібності',
    'Vorgaltem Citadel': 'Цитадель Ворґальтема',
    'Crimson Temple': 'Багряний храм',
    'Sillus Fortress': 'Фортеця Сіллус',
    'Silona Fortress': 'Фортеця Сілона',
    'Pradeth Fortress': 'Фортеця Прадет',
    'Dredgion': 'Дерадикон',
    'Arena of Chaos': 'Арена Хаосу',
    'Arena of Discipline': 'Арена Дисципліни',
    'Arena of Harmony': 'Арена Гармонії',
    'Arena of Glory': 'Арена Слави',
    'Kamar Battlefield': 'Поле битви Камара',
    'Engulfed Ophidan Bridge': 'Затоплений міст Офідана',
    'Iron Wall Warfront': 'Передова Залізної стіни',
    'Runatorium': 'Рунаторіум',
    'Event 1x1': '1×1',
    'Event 2x2 (Round)': '2×2 — раунди',
    'Event 2x2 (Kill Count)': '2×2 — за кількістю вбивств',
    'Event 3x3 (Round)': '3×3 — раунди',
    'Event 3x3 (Kill Count)': '3×3 — за кількістю вбивств',
    'Event FFA': 'Кожен за себе',
    'Event FFA(2x2)': 'Кожен за себе 2×2',
    'Event FFA(3x3)': 'Кожен за себе 3×3',
}


def _name_key(name):
    # Сайт уже пише то «FFA(2x2)», то «2x2 (Round)» — пробіли й дужки не рахуємо.
    return re.sub(r'[^a-z0-9]', '', name.lower())


_NAMES_BY_KEY = {_name_key(english): ukrainian for english, ukrainian in UKRAINIAN_NAMES.items()}


def ukrainian_name(original):
    name = _NAMES_BY_KEY.get(_name_key(original))
    if name is None:
        # Нова подія без перекладу: показуємо англійську назву, а не ховаємо подію.
        print(f"Destiny schedule: no Ukrainian name for {original!r}, keeping English")
        return original
    return name


def _number(value):
    value = round(value, 4)
    return int(value) if value == int(value) else value


def _is_int(value):
    return isinstance(value, int) and not isinstance(value, bool)


def decode_times(times):
    """[день × 65536 + година] -> {день (0 — понеділок): {години}}."""
    if not isinstance(times, list):
        raise ValueError(f'Destiny schedule: times is not a list: {times!r}')
    days = {}
    for value in times:
        if not _is_int(value) or value < 0:
            raise ValueError(f'Destiny schedule: unexpected time value {value!r}')
        day, hour = value >> 16, value & 0xFFFF
        if day > 6 or hour > 23:
            raise ValueError(f'Destiny schedule: time out of range {value}')
        days.setdefault((day + 6) % 7, set()).add(hour)
    return days


def intervals(hours, start_minute, end_minute):
    """Години -> проміжки. Сусідні повні години склеюємо, як це робить сторінка сайту.

    Кінець опівночі записуємо як 0: у schedule.json кінець, менший за початок,
    означає перехід через північ.
    """
    spans = []
    for hour in sorted(hours):
        start, end = hour + start_minute / 60, hour + end_minute / 60
        if spans and start_minute == 0 and end_minute == 60 and spans[-1][1] == start:
            spans[-1][1] = end
        else:
            spans.append([start, end])
    return [{'s': _number(start), 'e': _number(end % 24)} for start, end in spans]


def _records(name, original, category, day_hours, to_slots):
    """Дні з однаковим набором часу стають одним записом, як у решті schedule.json."""
    grouped = {}
    for day, hours in day_hours.items():
        slots = to_slots(hours)
        grouped.setdefault(json.dumps(slots), (slots, []))[1].append(day)
    return [
        {'name': name, 'originalName': original, 'cat': category, 'days': sorted(days), 'times': slots}
        for slots, days in sorted(grouped.values(), key=lambda entry: min(entry[1]))
    ]


def _item(entry, *, matchmaker):
    if not isinstance(entry, dict):
        raise ValueError(f'Destiny schedule: unexpected entry {entry!r}')
    if not _is_int(entry.get('id')) or not isinstance(entry.get('desc'), str) or not entry['desc'].strip():
        raise ValueError(f'Destiny schedule: entry without id or name: {entry!r}')
    if matchmaker:
        start, end = entry.get('startMinute'), entry.get('endMinute')
        if not (_is_int(start) and _is_int(end) and 0 <= start < end <= 60):
            raise ValueError(f'Destiny schedule: bad minutes in {entry!r}')
    return entry['id'], entry['desc'].strip(), decode_times(entry.get('times'))


def build_schedule(sieges, matchmakers, fetched_at=None):
    """Відповіді /siege і /matchmaker (lang: en) -> вміст aiondestiny/schedule.json."""
    if not isinstance(sieges, list) or not isinstance(matchmakers, list):
        raise ValueError('Destiny schedule: sieges and matchmakers must be lists')
    if len(sieges) < MIN_SIEGES or len(matchmakers) < MIN_MATCHMAKERS:
        raise ValueError(
            f'Destiny schedule: too few entries ({len(sieges)} sieges, {len(matchmakers)} matchmakers)'
        )

    events = []
    activities = 0
    tiamaranta = {}
    for entry in sieges:
        entry_id, original, day_hours = _item(entry, matchmaker=False)
        if entry_id in TIAMARANTA_IDS:
            for day, hours in day_hours.items():
                tiamaranta.setdefault(day, set()).update(hours)
            continue
        if not day_hours:
            continue
        activities += 1
        events += _records(
            ukrainian_name(original), original, 'siege', day_hours,
            lambda hours: [{'at': hour} for hour in sorted(hours)],
        )
    if tiamaranta:
        activities += 1
        events += _records(
            *TIAMARANTA_NAME, 'siege', tiamaranta,
            lambda hours: [{'at': hour} for hour in sorted(hours)],
        )

    for entry in matchmakers:
        entry_id, original, day_hours = _item(entry, matchmaker=True)
        if entry_id in HIDDEN_MATCHMAKER_IDS or not day_hours:
            continue
        if entry_id in PVP_IDS:
            category = 'pvp'
        elif entry_id in ARENA_IDS:
            category = 'arenas'
        else:
            category = 'tournaments' if entry_id >= 1000 else 'pvp'
        start_minute, end_minute = entry['startMinute'], entry['endMinute']
        activities += 1
        events += _records(
            ukrainian_name(original), original, category, day_hours,
            lambda hours, start=start_minute, end=end_minute: intervals(hours, start, end),
        )

    schedule = {
        'serverOffset': SERVER_OFFSET,
        'eventCount': activities,
        'events': events,
        'sourceUrl': SCHEDULE_PAGE,
    }
    if fetched_at:
        schedule['fetchedAt'] = fetched_at
    return schedule


def _post(endpoint, key):
    response = requests.post(
        SCHEDULE_API + endpoint,
        headers={'lang': 'en', 'User-Agent': 'Mozilla/5.0 AionUA schedule collector'},
        timeout=15,
    )
    response.raise_for_status()
    payload = response.json()
    if not isinstance(payload, dict) or not isinstance(payload.get(key), list):
        raise ValueError(f'Destiny schedule: /{endpoint} has no {key!r} list')
    return payload[key]


def fetch_schedule():
    return build_schedule(
        _post('siege', 'sieges'),
        _post('matchmaker', 'matchmakers'),
        datetime.now(timezone.utc).strftime(TIMESTAMP_FORMAT),
    )


def is_due(path=SCHEDULE_FILE, max_age=MAX_AGE_SECONDS, now=None):
    """Чи пора перепитати сайт: файлу немає, він без позначки часу або старший за max_age."""
    try:
        with open(path, encoding='utf-8') as cached:
            fetched = datetime.strptime(json.load(cached)['fetchedAt'], TIMESTAMP_FORMAT)
    except (OSError, ValueError, KeyError, TypeError):
        return True
    age = (now or datetime.now(timezone.utc)) - fetched.replace(tzinfo=timezone.utc)
    return age.total_seconds() >= max_age
