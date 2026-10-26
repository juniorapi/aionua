"""Зсув часу сервера Origin Aion.

Окремий модуль, бо fetch_online.py починає збір даних просто під час імпорту,
і тести не можуть узяти з нього функцію, не запустивши весь збирач.
"""
import re
from datetime import datetime, timezone

# Підпис під розкладом: «Час указано за серверним (GMT +2)», англійською — «…server time (GMT +2)».
OFFSET_LABEL = re.compile(r'\((?:GMT|UTC)\s*([+\-−])\s*(\d{1,2})(?::([0-5]\d))?\)')


def last_sunday_utc(year, month):
    """Остання неділя місяця, 01:00 UTC — момент переведення годинників у ЄС."""
    day = 31
    while True:
        try:
            moment = datetime(year, month, day, 1, tzinfo=timezone.utc)
        except ValueError:
            day -= 1
            continue
        if moment.weekday() == 6:
            return moment
        day -= 1


def central_europe_offset(now=None):
    """Зсув центральноєвропейського часу: +2 улітку (CEST), +1 узимку (CET).

    Рахуємо правило самі, без tzdata: на Windows модуль zoneinfo без нього не працює.
    """
    now = now or datetime.now(timezone.utc)
    summer_starts = last_sunday_utc(now.year, 3)
    summer_ends = last_sunday_utc(now.year, 10)
    return 2 if summer_starts <= now < summer_ends else 1


def origin_server_offset(texts, now=None):
    """Зсув сервера Origin — за центральноєвропейським часом, а не з підпису на сторінці.

    У ніч на 25.10.2026, коли закінчився літній час, адміністратор Origin оголосив
    перехід сервера на UTC+1. Підпис на сторінці розкладу й клієнт при цьому ще писали
    GMT+2 — адміністратор попередив, що клієнт оновлять пізніше. Тож підпис лише
    звіряємо й повідомляємо про розбіжність, а зсув беремо з правила.
    """
    actual = central_europe_offset(now)
    labels = set()
    for text in texts:
        for sign, hours, minutes in OFFSET_LABEL.findall(text):
            offset = int(hours) + int(minutes or 0) / 60
            labels.add(offset if sign == '+' else -offset)
    labels = {offset for offset in labels if -12 <= offset <= 14}
    if labels != {actual}:
        shown = ', '.join(f'GMT{offset:+g}' for offset in sorted(labels)) or 'not found'
        print(f"Origin schedule: page label says {shown}, using GMT{actual:+d} (Central European time)")
    return actual
