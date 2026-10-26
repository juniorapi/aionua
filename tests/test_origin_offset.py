"""Зсув часу сервера Origin.

25.10.2026 адміністратор Origin оголосив перехід сервера на UTC+1 — у ту саму ніч,
коли в Європі закінчився літній час. Підпис на сторінці розкладу й клієнт ще писали
GMT+2, тож зсув рахуємо за центральноєвропейським часом, а не з підпису.

Імпортуємо origin_time, а не fetch_online: той запускає збирач під час імпорту.
"""
import unittest
from datetime import datetime, timezone

import origin_time

UTC = timezone.utc
LABEL_GMT2 = '…schedule are in server time (GMT +2)…'


class OriginOffsetTest(unittest.TestCase):
    def test_summer_is_utc_plus_2(self):
        self.assertEqual(origin_time.central_europe_offset(datetime(2026, 7, 1, 12, tzinfo=UTC)), 2)

    def test_winter_is_utc_plus_1(self):
        self.assertEqual(origin_time.central_europe_offset(datetime(2026, 12, 1, 12, tzinfo=UTC)), 1)
        self.assertEqual(origin_time.central_europe_offset(datetime(2027, 2, 1, 12, tzinfo=UTC)), 1)

    def test_switch_moments_2026(self):
        # Літній час 2026: з 29.03 01:00 UTC до 25.10 01:00 UTC.
        offset = origin_time.central_europe_offset
        self.assertEqual(offset(datetime(2026, 3, 29, 0, 59, tzinfo=UTC)), 1)
        self.assertEqual(offset(datetime(2026, 3, 29, 1, 0, tzinfo=UTC)), 2)
        self.assertEqual(offset(datetime(2026, 10, 25, 0, 59, tzinfo=UTC)), 2)
        self.assertEqual(offset(datetime(2026, 10, 25, 1, 0, tzinfo=UTC)), 1)

    def test_last_sunday_handles_31_day_months(self):
        self.assertEqual(origin_time.last_sunday_utc(2027, 3).day, 28)
        self.assertEqual(origin_time.last_sunday_utc(2027, 10).day, 31)

    def test_stale_page_label_does_not_win(self):
        # 26.10.2026: сторінка пише GMT+2, а сервер уже на UTC+1.
        now = datetime(2026, 10, 26, 18, 30, tzinfo=UTC)
        self.assertEqual(origin_time.origin_server_offset([LABEL_GMT2], now), 1)

    def test_matching_label_in_summer(self):
        now = datetime(2026, 8, 1, 12, tzinfo=UTC)
        self.assertEqual(origin_time.origin_server_offset([LABEL_GMT2], now), 2)

    def test_missing_label(self):
        now = datetime(2026, 10, 26, 18, 30, tzinfo=UTC)
        self.assertEqual(origin_time.origin_server_offset(['no label here'], now), 1)


if __name__ == '__main__':
    unittest.main()
