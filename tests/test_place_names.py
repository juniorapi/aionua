"""Назви місць у розкладі мають бути однакові для всіх трьох серверів.

Джерело правди — PLACE_NAMES в assets/js/schedule-model.js (звірено з паком клієнта).
destiny_schedule.py тримає копію для schedule.json, а скрипт перекладу originaion.com —
свою. Ці тести не дають копіям тихо розійтися, як було, коли один Ophidan Bridge на
сайті мав три різні назви.
"""
import re
import unittest
from pathlib import Path

import destiny_schedule

ROOT = Path(__file__).resolve().parent.parent
MODEL = ROOT / 'assets' / 'js' / 'schedule-model.js'
ORIGIN_SCRIPT = ROOT / 'localization' / 'originaion-ua.user.js'

# Ключі скрипту Origin (нижній регістр) -> ключ спільного словника.
ORIGIN_SCRIPT_KEYS = {
    'engulfed ophidan bridge': 'Engulfed Ophidan Bridge',
    'kamar battlefield': 'Kamar Battlefield',
    'arena of chaos': 'Arena of Chaos',
    'arena of discipline': 'Arena of Discipline',
    'arena of harmony': 'Arena of Harmony',
    'arena of glory': 'Arena of Glory',
    'recharger': 'Recharger',
    'terath dredgion': 'Terath Dredgion',
    'iron wall warfront': 'Iron Wall Warfront',
    'temple of scales': 'Temple of Scales',
    'vorgaltem citadel': 'Vorgaltem Citadel',
    'altar of avarice': 'Altar of Avarice',
    'crimson temple': 'Crimson Temple',
}


def _js_object(source, name):
    """Пари "ключ": "значення" з Object.freeze({...}) у JS-файлі."""
    block = re.search(rf'{name}\s*=\s*Object\.freeze\(\{{(.*?)\n\}}\);', source, re.DOTALL)
    if not block:
        raise AssertionError(f'{name} не знайдено в {MODEL.name}')
    return dict(re.findall(r'^\s*"([^"]+)":\s*"([^"]+)",?\s*$', block.group(1), re.MULTILINE))


def _script_pairs(source):
    return dict(re.findall(r"^\s*'([^']+)':\s*'([^']+)',?\s*$", source, re.MULTILINE))


class PlaceNamesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.places = _js_object(MODEL.read_text(encoding='utf-8'), 'PLACE_NAMES')
        cls.script = _script_pairs(ORIGIN_SCRIPT.read_text(encoding='utf-8'))

    def test_dictionary_was_parsed(self):
        self.assertGreater(len(self.places), 30)

    def test_destiny_copy_matches_shared_dictionary(self):
        differ = {
            english: (ukrainian, self.places[english])
            for english, ukrainian in destiny_schedule.UKRAINIAN_NAMES.items()
            if english in self.places and self.places[english] != ukrainian
        }
        self.assertEqual(differ, {}, 'destiny_schedule.py розійшовся зі schedule-model.js')

    def test_origin_script_matches_shared_dictionary(self):
        differ = {}
        for script_key, english in ORIGIN_SCRIPT_KEYS.items():
            self.assertIn(script_key, self.script, f'у скрипті Origin немає «{script_key}»')
            if self.script[script_key] != self.places[english]:
                differ[script_key] = (self.script[script_key], self.places[english])
        self.assertEqual(differ, {}, 'originaion-ua.user.js розійшовся зі schedule-model.js')

    def test_names_verified_against_the_client(self):
        # Звірено з паком 07.10.2026 за ID рядка — див. коментар над PLACE_NAMES.
        expected = {
            'Arena of Chaos': 'Бойова арена хаосу',             # STR_ZONE_NAME_IDArena_pvp01
            'Arena of Discipline': 'Бойова арена доблесті',     # STR_ZONE_NAME_IDArena_pvp02
            'Arena of Harmony': 'Арена покровительства',        # STR_ZONE_NAME_IDArena_team01
            'Arena of Glory': 'Арена слави',                    # STR_ZONE_NAME_IDArena_Glory
            'Kamar Battlefield': 'Поле битви Камара',           # STR_ZONE_NAME_IDKamar
            'Engulfed Ophidan Bridge': 'Тунель Йормунганда',    # STR_ZONE_NAME_IDLDF5_Under_01_War
            'Kysis Fortress': 'Фортеця Ткісас',                 # STR_DIC_W_AB1_37
            'Miren Fortress': 'Фортеця Ра-Мірен',               # STR_DIC_W_AB1_30
            'Krotan Refuge': 'Фортеця Кротан',                  # STR_DIC_W_AB1_33
            'Recharger': 'Підзарядник',                         # STR_ZONE_NAME_IDTiamat_Solo_2
            'Terath Dredgion': 'Дерадикон Садх',                # STR_ZONE_NAME_IDDreadgion_03
        }
        self.assertEqual({key: self.places.get(key) for key in expected}, expected)


if __name__ == '__main__':
    unittest.main()
