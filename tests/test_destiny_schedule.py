"""Розбір розкладу AionDestiny на знімку відповідей API від 26.09.2026.

Запуск із кореня репозиторію: python3 -m unittest tests/test_destiny_schedule.py
"""
import json
import sys
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import destiny_schedule  # noqa: E402

FIXTURES = ROOT / 'tests' / 'fixtures'


def load(name):
    return json.loads((FIXTURES / name).read_text(encoding='utf-8'))


class DestinyScheduleTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.sieges = load('aiondestiny-api-siege.json')['sieges']
        cls.matchmakers = load('aiondestiny-api-matchmaker.json')['matchmakers']
        cls.schedule = destiny_schedule.build_schedule(cls.sieges, cls.matchmakers, '2026-09-26T12:00:00Z')

    def records(self, original):
        return [event for event in self.schedule['events'] if event['originalName'] == original]

    def test_matches_the_table_on_the_site(self):
        # Еталон — таблиця зі сторінки db.aiondestiny.net, звірена клітинка в клітинку.
        # Автоматичні події сайт показує окремою вкладкою, у нас вони — турніри.
        expected = load('aiondestiny-page-expected.json')['events']
        category = {'other': 'tournaments'}
        want = sorted(
            (event['originalName'], category.get(event['category'], event['category']),
             tuple(event['days']), json.dumps(event['times']))
            for event in expected
        )
        got = sorted(
            (event['originalName'], event['cat'], tuple(event['days']), json.dumps(event['times']))
            for event in self.schedule['events']
        )
        self.assertEqual(got, want)

    def test_file_fields_match_the_other_schedules(self):
        self.assertEqual(self.schedule['serverOffset'], 3)
        self.assertEqual(self.schedule['eventCount'], 34)
        self.assertEqual(self.schedule['sourceUrl'], 'https://db.aiondestiny.net/schedule/')
        self.assertEqual(self.schedule['fetchedAt'], '2026-09-26T12:00:00Z')
        self.assertEqual({event['cat'] for event in self.schedule['events']}, {'pvp', 'arenas', 'siege', 'tournaments'})
        self.assertNotIn('fetchedAt', destiny_schedule.build_schedule(self.sieges, self.matchmakers))

    def test_every_event_has_a_ukrainian_name(self):
        english = [event['name'] for event in self.schedule['events'] if event['name'] == event['originalName']]
        self.assertEqual(english, [])
        self.assertEqual(self.records('Event FFA(2x2)')[0]['name'], 'Кожен за себе 2×2')
        self.assertEqual(self.records('Krotan Refuge')[0]['name'], 'Прихисток Кротана')

    def test_days_start_on_monday(self):
        # У API [20, 196628]: неділя 20:00 і середа 20:00.
        self.assertEqual(self.records('Divine Fortress'), [{
            'name': 'Божественна фортеця', 'originalName': 'Divine Fortress', 'cat': 'siege',
            'days': [2, 6], 'times': [{'at': 20}],
        }])

    def test_tiamaranta_hearts_are_one_row(self):
        hearts = self.records("Tiamaranta's Hearts")
        self.assertEqual(len(hearts), 1)
        self.assertEqual(hearts[0]['name'], 'Серця Тіамаранти')
        self.assertEqual(hearts[0]['days'], [0, 1, 2, 3, 4, 5, 6])
        self.assertEqual(hearts[0]['times'], [{'at': 13}, {'at': 18}])
        self.assertEqual(self.records('Heart of Wrath'), [])

    def test_hidden_dredgions_are_skipped(self):
        self.assertEqual(self.records('Chantra Dredgion') + self.records('Terath Dredgion'), [])
        self.assertEqual(self.records('Dredgion')[0]['times'], [{'s': 0, 'e': 2}, {'s': 12, 'e': 14}, {'s': 20, 'e': 22}])

    def test_evening_arena_ends_at_midnight(self):
        weekdays = next(event for event in self.records('Arena of Chaos') if event['days'] == [0, 1, 2, 3, 4])
        self.assertEqual(weekdays['times'], [{'s': 0, 'e': 2}, {'s': 12, 'e': 14}, {'s': 18, 'e': 0}])

    def test_short_events_keep_their_minutes(self):
        self.assertEqual(
            [(event['days'], event['times']) for event in self.records('Event FFA(2x2)')],
            [([0], [{'s': 23.5, 'e': 23.8167}]), ([5], [{'s': 17.5, 'e': 17.8167}])],
        )

    def test_unknown_events_are_kept_in_english(self):
        extra = [
            {'id': 777, 'desc': 'New Battlefield', 'startMinute': 0, 'endMinute': 60, 'times': [65556]},
            {'id': 1200, 'desc': 'Event 4x4', 'startMinute': 0, 'endMinute': 30, 'times': [65556]},
        ]
        schedule = destiny_schedule.build_schedule(self.sieges, self.matchmakers + extra)
        added = {event['originalName']: event for event in schedule['events']}
        self.assertEqual(added['New Battlefield']['name'], 'New Battlefield')
        self.assertEqual(added['New Battlefield']['cat'], 'pvp')
        self.assertEqual(added['Event 4x4']['cat'], 'tournaments')
        self.assertEqual(added['Event 4x4']['times'], [{'s': 20, 'e': 20.5}])
        self.assertEqual(schedule['eventCount'], 36)

    def test_broken_answers_are_rejected(self):
        bad_time = dict(self.matchmakers[0], times=[7 * 65536])
        bad_minutes = dict(self.matchmakers[0], startMinute=40, endMinute=20)
        for sieges, matchmakers in [
            (self.sieges[:3], self.matchmakers),
            (self.sieges, {'matchmakers': self.matchmakers}),
            (self.sieges, [bad_time] + self.matchmakers[1:]),
            (self.sieges, [bad_minutes] + self.matchmakers[1:]),
            (self.sieges, [{'id': 1}] + self.matchmakers[1:]),
        ]:
            with self.assertRaises(ValueError):
                destiny_schedule.build_schedule(sieges, matchmakers)

    def test_site_is_asked_at_most_hourly(self):
        now = datetime(2026, 9, 26, 12, 30, tzinfo=timezone.utc)
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'schedule.json'
            self.assertTrue(destiny_schedule.is_due(path, now=now))
            path.write_text(json.dumps({'fetchedAt': '2026-09-26T12:00:00Z'}), encoding='utf-8')
            self.assertFalse(destiny_schedule.is_due(path, now=now))
            path.write_text(json.dumps({'fetchedAt': '2026-09-26T11:00:00Z'}), encoding='utf-8')
            self.assertTrue(destiny_schedule.is_due(path, now=now))
            path.write_text(json.dumps({'events': []}), encoding='utf-8')
            self.assertTrue(destiny_schedule.is_due(path, now=now))
            path.write_text('не json', encoding='utf-8')
            self.assertTrue(destiny_schedule.is_due(path, now=now))


if __name__ == '__main__':
    unittest.main()
