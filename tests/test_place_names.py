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
    'sulfur': 'Sulfur Fortress',
    'asteria': 'Asteria Fortress',
    'roah': 'Roah Fortress',
    "siel's western": "Siel's Western Fortress",
    "siel's eastern": "Siel's Eastern Fortress",
    'sillus': 'Sillus Fortress',
    'silona': 'Silona Fortress',
    'pradeth': 'Pradeth Fortress',
    'divine': 'Divine Fortress',
    'dredgion': 'Dredgion',
    'heiron': 'Heiron',
    'eltnen': 'Eltnen',
    'morheim': 'Morheim',
    'beluslan': 'Beluslan',
    'inggison': 'Inggison',
    'gelkmaros': 'Gelkmaros',
    'tiamaranta': 'Tiamaranta',
}


def _js_object(source, name):
    """Пари "ключ": "значення" з Object.freeze({...}) у JS-файлі."""
    block = re.search(rf'{name}\s*=\s*Object\.freeze\(\{{(.*?)\n\}}\);', source, re.DOTALL)
    if not block:
        raise AssertionError(f'{name} не знайдено в {MODEL.name}')
    return dict(re.findall(r'^\s*"([^"]+)":\s*"([^"]+)",?\s*$', block.group(1), re.MULTILINE))


def _script_pairs(source):
    # Ключі з апострофом («siel's western») у скрипті взято в подвійні лапки.
    pairs = re.findall(r"""^\s*(?:'([^']+)'|"([^"]+)"):\s*'([^']+)',?\s*$""", source, re.MULTILINE)
    return {single or double: value for single, double, value in pairs}


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
        # Звірено з паками Origin, Riftshade і Destiny за ID рядка (07.10 і 12.10.2026) —
        # див. коментар над PLACE_NAMES. У всіх трьох паках назви однакові.
        expected = {
            'Arena of Chaos': 'Бойова арена хаосу',             # STR_ZONE_NAME_IDArena_pvp01
            'Arena of Discipline': 'Бойова арена доблесті',     # STR_ZONE_NAME_IDArena_pvp02
            'Arena of Harmony': 'Арена покровительства',        # STR_ZONE_NAME_IDArena_team01
            'Arena of Glory': 'Арена слави',                    # STR_ZONE_NAME_IDArena_Glory
            'Kamar Battlefield': 'Поле битви Камара',           # STR_ZONE_NAME_IDKamar
            'Engulfed Ophidan Bridge': 'Тунель Йормунганда',    # STR_ZONE_NAME_IDLDF5_Under_01_War
            'Ophidan Bridge': 'Міст Йормунганда',               # STR_ZONE_NAME_IDLDF5_Under_01
            'Iron Wall Warfront': 'Неприступна твердиня',       # STR_ZONE_NAME_IDF5_TD_War
            'Runatorium': 'Рунаторіум',                         # STR_ZONE_NAME_IDLDF5_Fortress_Re
            'Recharger': 'Підзарядник',                         # STR_ZONE_NAME_IDTiamat_Solo_2, лише Origin
            'Baranath Dredgion': 'Дерадикон',                   # STR_ZONE_NAME_IDAb1_Dreadgion
            'Chantra Dredgion': 'Дерадикон Джантри',            # STR_ZONE_NAME_IDDreadgion_02
            'Terath Dredgion': 'Дерадикон Садх',                # STR_ZONE_NAME_IDDreadgion_03
            'Sulfur Fortress': 'Фортеця сірчаного дерева',      # STR_DIC_W_AB1_13
            'Asteria Fortress': 'Фортеця Астерія',              # STR_DIC_W_AB1_43
            'Roah Fortress': 'Фортеця древнього міста Ру',      # STR_DIC_W_AB1_49
            "Siel's Western Fortress": 'Західна фортеця Сієлі', # STR_DIC_W_AB1_23, у паку поки «Сіелі»
            "Siel's Eastern Fortress": 'Східна фортеця Сієлі',  # STR_DIC_W_AB1_20, у паку поки «Сіелі»
            'Vorgaltem Citadel': 'Запечатана вежа',             # STR_DIC_W_DF4_SZ_3011_A
            'Temple of Scales': 'Храм давнього дракона',        # STR_DIC_W_LF4_SZ_2011_A
            'Altar of Avarice': 'Вівтар жадоби',                # STR_DIC_W_LF4_SZ_2021_A
            'Crimson Temple': 'Храм червоної землі',            # STR_DIC_W_DF4_SZ_3021_A
            'Sillus Fortress': 'Фортеця Сіллус',                # STR_DIC_W_LDF5a_SV_5011
            'Silona Fortress': 'Фортеця Базен',                 # STR_DIC_W_LDF5b_SV_6011
            'Pradeth Fortress': 'Фортеця Парадес',              # STR_DIC_W_LDF5b_SV_6021
            'Divine Fortress': 'Фортеця святості',              # STR_DIC_W_AB1_46
            'Kysis Fortress': 'Фортеця Ткісас',                 # STR_DIC_W_AB1_37
            'Miren Fortress': 'Фортеця Ра-Мірен',               # STR_DIC_W_AB1_30
            'Krotan Refuge': 'Фортеця Кротан',                  # STR_DIC_W_AB1_33
            'Heiron': 'Інтердика',                              # STR_ZONE_NAME_LF3
            'Eltnen': 'Елтенен',                                # STR_ZONE_NAME_LF2
            'Morheim': 'Морхейм',                               # STR_ZONE_NAME_DF2
            'Beluslan': 'Белуслан',                             # STR_ZONE_NAME_DF3
            'Inggison': 'Інгісон',                              # STR_ZONE_NAME_LF4
            'Gelkmaros': 'Келькмарос',                          # STR_ZONE_NAME_DF4
            'Tiamaranta': 'Тіамаранта',                         # STR_ZONE_NAME_LDF4b
        }
        self.assertEqual({key: self.places.get(key) for key in expected}, expected)


if __name__ == '__main__':
    unittest.main()
