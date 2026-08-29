// ==UserScript==
// @name         Origin Aion — українська локалізація
// @name:uk      Origin Aion — українська локалізація
// @namespace    https://github.com/juniorapi/aionua
// @version      1.5.0
// @description  Перекладає сайт originaion.com українською: усі сторінки, крамниця, рейтинги, розклад.
// @author       juniorapi
// @match        https://originaion.com/*
// @match        https://www.originaion.com/*
// @icon         https://originaion.com/favicon.ico
// @homepageURL  https://juniorapi.github.io/aionua/localization/
// @downloadURL  https://juniorapi.github.io/aionua/localization/originaion-ua.user.js
// @updateURL    https://juniorapi.github.io/aionua/localization/originaion-ua.user.js
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  'use strict';

  /* ═══════════════════════════ НАЛАШТУВАННЯ ═══════════════════════════ */

  const STORAGE_KEY = 'originaion_ua_enabled';
  const SHOW_TOGGLE = true; // плаваюча кнопка UA/EN у правому нижньому куті

  /* ═══════════════════════════ СЛОВНИК UI ═════════════════════════════
     Ключі — нормалізовані (нижній регістр, стиснуті пробіли).
     Регістр підбирається автоматично: ALL CAPS в оригіналі → ALL CAPS у
     перекладі. Верхній регістр більшості заголовків дає CSS text-transform,
     тому в DOM текст лежить у звичайному регістрі.
  ═════════════════════════════════════════════════════════════════════ */

  const UI = {
    /* ── Навігація та шапка ── */
    'origin aion home': 'Origin Aion — головна',
    'home': 'Головна',
    'news': 'Новини',
    'schedule': 'Розклад',
    'ranks': 'Рейтинг',
    'rankings': 'Рейтинги',
    'download': 'Завантажити',
    'register': 'Реєстрація',
    'login': 'Увійти',
    'log in': 'Увійти',
    'logout': 'Вийти',
    'log out': 'Вийти',
    'shop': 'Крамниця',
    'toggle navigation': 'Меню',
    'online': 'Онлайн',
    'account': 'Акаунт',
    'profile': 'Профіль',
    'settings': 'Налаштування',

    /* ── Підвал ── */
    'community': 'Спільнота',
    'wiki': 'Вікі',
    'codex': 'Кодекс',
    'get started': 'З чого почати',
    'explore': 'Розділи',
    'legal': 'Правова інформація',
    'rules': 'Правила',
    'faq': 'Часті питання',
    'privacy policy': 'Політика конфіденційності',
    'terms of service': 'Умови користування',
    "can't verify? message @originaion": 'Не вдається підтвердити? Напишіть @originaion',
    '4.6 - hosted in western europe': '4.6 — сервер у Західній Європі',
    'website copyright © 2026 - originaion.com': 'Копірайт сайту © 2026 — OriginAion.com',

    /* ── Головна сторінка ── */
    'from the project manager of elden aion': 'Від керівника проєкту Elden Aion',
    'introducing': 'Представляємо',
    'no pay-to-win • 4.6 • no new classes': 'Без pay-to-win • 4.6 • Без нових класів',
    'welcome': 'Вітаємо',
    'why choose origin aion?': 'Чому саме Origin Aion?',
    'classic 4.6': 'Класика 4.6',
    'no pay-to-win': 'Без pay-to-win',
    'fair progression': 'Чесний розвиток',
    'balanced pvp': 'Збалансований PvP',
    'high performance': 'Висока продуктивність',
    'anti cheat & security': 'Античит і безпека',
    'custom content': 'Власний контент',
    'active community': 'Активна спільнота',
    'active support': 'Активна підтримка',
    'latest news': 'Останні новини',
    'view all news': 'Усі новини',
    'frequent questions': 'Часті питання',
    'frequently asked questions': 'Часті запитання',
    'new player guide': 'Гід для новачка',

    'experience aion 4.6 at its peak, without newer classes. enjoy the authentic and balanced gameplay that made this version memorable.':
      'Aion 4.6 на піку форми, без пізніших класів. Автентичний і збалансований геймплей, який зробив цю версію легендарною.',
    'shop currency is earned exclusively through gameplay, and every character receives a free eternity pass with unique seasonal rewards.':
      'Валюта крамниці здобувається виключно грою, а кожен персонаж отримує безкоштовний Eternity Pass з унікальними сезонними нагородами.',
    'free starter gear, medals can be obtained from pve instances, accessories cannot be enchanted, rates are improved and the eternity pass offers generous seasonal rewards. we respect your time and effort.':
      'Безкоштовне стартове спорядження, медалі з PvE-інстансів, аксесуари не заточуються, підвищені рейти, а Eternity Pass дає щедрі сезонні нагороди. Ми поважаємо ваш час і зусилля.',
    'without later 4.x classes and with all faction skills available to both sides, pvp remains fair, competitive, and skill-based.':
      'Без пізніших класів 4.x і з доступом обох фракцій до всіх умінь PvP лишається чесним, змагальним і залежить від навички.',
    'built on the stable retail c++ server core with client fixes for mouse issues and flickering, ensuring a smooth and stable experience.':
      'Побудовано на стабільному ретейл-ядрі C++ із виправленнями клієнта для проблем із мишею та мерехтіння — заради плавної та стабільної гри.',
    'advanced client-side and server-side anti-cheat systems, regular enforcement, and active monitoring to help maintain a fair environment for everyone.':
      'Просунутий античит на боці клієнта й сервера, регулярні покарання та активний моніторинг допомагають підтримувати чесне середовище для всіх.',
    'custom quests, unique items, higher patch skins and more content added specifically for our server.':
      'Власні квести, унікальні предмети, скіни зі старших патчів та інший контент, доданий спеціально для нашого сервера.',
    'join a vibrant, helpful, and friendly community of dedicated aion players.':
      'Долучайтеся до живої, дружньої та відкритої спільноти відданих гравців Aion.',
    'our team provides prompt, professional, and helpful support whenever you need assistance.':
      'Наша команда надає швидку, професійну та дієву підтримку, щойно вона вам знадобиться.',

    /* ── Гід для новачка ── */
    'download the client': 'Завантажте клієнт',
    'get the game client and launcher installer to start playing.':
      'Отримайте ігровий клієнт та інсталятор лаунчера, щоб почати гру.',
    'create your account': 'Створіть акаунт',
    'register an account to access the game and our services.':
      'Зареєструйте акаунт, щоб отримати доступ до гри та наших сервісів.',
    'join our discord': 'Приєднуйтеся до Discord',
    'connect with the community, get support, and stay informed.':
      'Спілкуйтеся зі спільнотою, отримуйте підтримку та будьте в курсі новин.',
    'visit the wiki': 'Завітайте до вікі',
    'explore guides, maps, and detailed game information.':
      'Гайди, мапи та докладна інформація про гру.',

    /* ── FAQ ── */
    'what is origin aion?': 'Що таке Origin Aion?',
    'what are the server rates?': 'Які на сервері рейти?',
    'where is the server hosted and what languages are supported?':
      'Де розміщено сервер і які мови підтримуються?',
    'is origin aion pay-to-win?': 'Чи є Origin Aion pay-to-win?',
    'what are cosmic fragments and cosmic gems?':
      'Що таке Cosmic Fragments і Cosmic Gems?',
    'what is the eternity pass?': 'Що таке Eternity Pass?',
    'what makes origin aion different from other servers?':
      'Чим Origin Aion відрізняється від інших серверів?',
    'how can i get help or connect with the community?':
      'Як отримати допомогу або долучитися до спільноти?',

    /* ── Новини ── */
    'latest announcements, updates, and event notes from the origin aion team.':
      'Останні анонси, оновлення та нотатки про події від команди Origin Aion.',
    'new': 'Нове',
    'read more': 'Читати далі',
    'back to news': 'Назад до новин',
    'patch notes': 'Список змін',

    /* ── Розклад ── */
    'all times are based on the server time (gmt +2)':
      'Час указано за серверним (GMT +2)',
    'pvp instances': 'PvP-інстанси',
    'arenas': 'Арени',
    'siege': 'Облоги',
    'sieges': 'Облоги',
    'rifts': 'Розломи',
    'today': 'Сьогодні',
    'weekly': 'На тиждень',
    'monday': 'Понеділок',
    'tuesday': 'Вівторок',
    'wednesday': 'Середа',
    'thursday': 'Четвер',
    'friday': "П'ятниця",
    'saturday': 'Субота',
    'sunday': 'Неділя',

    /* ── Локації та інстанси ── */
    'terath dredgion': 'Дредгіон Терату',
    'dredgion': 'Дредгіон',
    'engulfed ophidan bridge': 'Поглинутий міст Офідан',
    'kamar battlefield': 'Поле бою Камар',
    'arena of discipline': 'Арена Дисципліни',
    'arena of chaos': 'Арена Хаосу',
    'arena of harmony': 'Арена Гармонії',
    'arena of glory': 'Арена Слави',

    /* ── Рейтинги ── */
    'pvp rankings': 'PvP-рейтинг',
    'previous': 'Назад',
    'next': 'Далі',
    'rank': 'Місце',
    'name': "Ім'я",
    'legion': 'Легіон',
    'level': 'Рівень',
    'race': 'Раса',
    'class': 'Клас',
    'rating': 'Рейтинг',
    'wins': 'Перемоги',
    'losses': 'Поразки',
    'no results found': 'Нічого не знайдено',
    'loading...': 'Завантаження…',

    /* ── Завантаження ── */
    'download origin aion': 'Завантажити Origin Aion',
    'installation guide': 'Інструкція зі встановлення',
    'download game client': 'Завантажте ігровий клієнт',
    'download client': 'Завантажити клієнт',
    'download launcher installer': 'Завантажте інсталятор лаунчера',
    'required to install the launcher. run the launcher installer and let it install the launcher.':
      'Потрібен для встановлення лаунчера. Запустіть інсталятор і дочекайтеся завершення.',
    'download installer': 'Завантажити інсталятор',
    'run & play': 'Запустіть і грайте',
    'start the launcher, let it update your client, and enter the world of atreia!':
      'Запустіть лаунчер, дочекайтеся оновлення клієнта — і вирушайте у світ Атреї!',
    'system requirements': 'Системні вимоги',
    'minimum requirements': 'Мінімальні вимоги',
    'minimum': 'Мінімальні',
    'recommended': 'Рекомендовані',
    'os': 'ОС',
    'processor': 'Процесор',
    'memory': "Пам'ять",
    'graphics': 'Відеокарта',
    'storage': 'Диск',

    /* ── Реєстрація та вхід ── */
    'join the server and start playing with one account.':
      'Приєднуйтеся до сервера та грайте з одним акаунтом.',
    'username': "Ім'я користувача",
    'email address': 'Електронна пошта',
    'email': 'Ел. пошта',
    'password': 'Пароль',
    'confirm password': 'Підтвердіть пароль',
    'current password': 'Поточний пароль',
    'new password': 'Новий пароль',
    'i accept the rules and privacy policy':
      'Я приймаю Правила та Політику конфіденційності',
    'create account': 'Створити акаунт',
    'or': 'або',
    'already have an account?': 'Вже маєте акаунт?',
    'login now!': 'Увійдіть!',
    "don't have an account?": 'Ще немає акаунта?',
    'register now!': 'Зареєструйтеся!',
    'forgot password?': 'Забули пароль?',
    'remember me': "Запам'ятати мене",
    'submit': 'Надіслати',
    'cancel': 'Скасувати',
    'confirm': 'Підтвердити',
    'close': 'Закрити',
    'save': 'Зберегти',
    'copy': 'Копіювати',
    'copied': 'Скопійовано',
    'click to copy': 'Натисніть, щоб скопіювати',

    /* ── Крамниця: інтерфейс ── */
    'origin shop': 'Крамниця Origin',
    'categories': 'Категорії',
    'category': 'Категорія',
    'all': 'Усі',
    'sale': 'Знижка',
    'on sale': 'Зі знижкою',
    'filters': 'Фільтри',
    'favorites': 'Обране',
    'search shop items': 'Пошук товарів',
    'name, id, description, etc.': 'назва, ID, опис тощо',
    'clear': 'Очистити',
    'log in to purchase or gift items': 'Увійдіть, щоб купувати або дарувати предмети',
    'buy': 'Купити',
    'purchase': 'Придбати',
    'gift': 'Подарувати',
    'add to favorites': 'Додати в обране',
    'remove from favorites': 'Прибрати з обраного',
    'price': 'Ціна',
    'quantity': 'Кількість',
    'total': 'Разом',
    'description': 'Опис',
    'item id': 'ID предмета',
    'no items found': 'Предметів не знайдено',
    'featured': 'Рекомендоване',
    'limited': 'Обмежено',
    // «cosmics» окремо відмінюється за числом поруч — див. cosmicsForm().
    'cosmics': 'Косміки',
    'cosmic fragments': 'Cosmic Fragments',
    'cosmic gems': 'Cosmic Gems',

    /* ── Сторінка предмета ── */
    'return to shop': 'Назад до крамниці',
    'back to shop': 'Назад до крамниці',
    'not stackable': 'Не стакається',
    'stackable': 'Стакається',
    'deliver to character': 'Кому доставити',
    'this item is not stackable, so delivery quantity is fixed to 1.':
      'Предмет не стакається, тож кількість доставки — завжди 1.',
    'current balance': 'Поточний баланс',
    'balance after purchase': 'Баланс після покупки',
    'sign in to buy, gift, or favorite items.':
      'Увійдіть, щоб купувати, дарувати чи додавати в обране.',
    'open login': 'Увійти',
    'insufficient balance': 'Недостатньо косміків',
    'not enough cosmics': 'Недостатньо косміків',
    'select a character': 'Оберіть персонажа',
    'purchase successful': 'Покупку здійснено',
    'item delivered': 'Предмет доставлено',

    /* ── Модалка входу ── */
    'sign in to your account': 'Вхід в акаунт',
    'use your origin aion credentials to continue.':
      'Введіть свої дані Origin Aion, щоб продовжити.',
    'forgot your password?': 'Забули пароль?',
    'need an account?': 'Ще немає акаунта?',
    'sign in': 'Увійти',
    'sign up': 'Зареєструватися',

    /* ── Конвертація Cosmic Fragments ── */
    'convert cosmic fragments': 'Конвертація Cosmic Fragments',
    'turn your in-game cosmic fragments into cosmics':
      'Перетворіть ігрові cosmic fragments на косміки',
    'character': 'Персонаж',
    'characters': 'Персонажі',
    'available fragments': 'Доступно фрагментів',
    'your cosmics': 'Ваші косміки',
    'max': 'Макс',
    'convert': 'Конвертувати',
    'convert more': 'Конвертувати ще',
    'close dialog': 'Закрити',
    'conversion complete!': 'Конвертацію завершено!',
    'conversion failed': 'Конвертація не вдалася',

    /* ── Eternity Pass ── */
    'eternity pass': 'Eternity Pass',
    'sign in to select a character and load your pass progression.':
      'Увійдіть, щоб обрати персонажа й завантажити прогрес пасу.',
    'free': 'Безкоштовно',
    'premium': 'Преміум',
    'claim': 'Забрати',
    'claimed': 'Отримано',
    'locked': 'Закрито',
    'unlocked': 'Відкрито',
    'reward': 'Нагорода',
    'rewards': 'Нагороди',
    'tier': 'Рівень',
    'tiers': 'Рівні',
    'progress': 'Прогрес',
    'season': 'Сезон',
    'quests': 'Завдання',
    'daily': 'Щоденні',
    'weekly quests': 'Тижневі завдання',
    'season rewards': 'Сезонні нагороди',
    // Назви ігрових сутностей лишаємо англійськими — так вони звуться в грі.
    'exchange your eternity comets for xp in the pass. once you have completed the pass, exchanging comets will turn them into eternity cores, that you may spend in the eternity shop.':
      'Обмінюйте свої eternity comets на досвід у пасі. Коли пас завершено, обмін комет перетворює їх на eternity cores, які можна витратити в eternity shop.',
    'character must be offline before exchanging comets.':
      'Перед обміном комет персонаж має бути офлайн.',
    'tokens in inventory': 'Жетонів в інвентарі',
    'current / max level': 'Поточний / макс. рівень',
    'max level': 'Макс. рівень',
    'in progress': 'У процесі',
    'not started': 'Не розпочато',
    'completed': 'Завершено',
    'exchange': 'Обміняти',
    'exchange comets': 'Обміняти комети',
    'eternity comets': 'Eternity Comets',
    'eternity cores': 'Eternity Cores',
    'eternity shop': 'Eternity Shop',
    'xp': 'Досвід',

    /* ── Профіль і покупки ── */
    'my profile': 'Мій профіль',
    'my account': 'Мій акаунт',
    'purchases': 'Покупки',
    'purchase history': 'Історія покупок',
    'my purchases': 'Мої покупки',
    'order': 'Замовлення',
    'orders': 'Замовлення',
    'date': 'Дата',
    'item': 'Предмет',
    'status': 'Статус',
    'amount': 'Сума',
    'delivered': 'Доставлено',
    'pending': 'В обробці',
    'failed': 'Помилка',
    'refunded': 'Повернено',
    'recipient': 'Отримувач',
    'no purchases yet': 'Покупок ще немає',
    'account profile': 'Профіль акаунта',
    'back to profile': 'Назад до профілю',
    'shop purchase history': 'Історія покупок',
    'view your past shop transactions and gifts.':
      'Ваші минулі покупки та подарунки.',
    'receiver': 'Отримувач',
    'sender': 'Відправник',
    'cost': 'Вартість',
    'refresh': 'Оновити',
    'checking...': 'Перевіряємо…',
    'transaction': 'Транзакція',
    'transactions': 'Транзакції',
    'gifted': 'Подаровано',
    'primary navigation': 'Основна навігація',
    'account overview': 'Огляд акаунта',
    'your characters': 'Ваші персонажі',
    'loading your profile...': 'Завантажуємо профіль…',
    'refresh profile info': 'Оновити дані профілю',
    'change email': 'Змінити пошту',
    'member since': 'Учасник з',
    'verified': 'Підтверджено',
    'not verified': 'Не підтверджено',
    'currency': 'Валюта',
    'kinah': 'Кінари',
    'lv.': 'Рів.',
    'lvl': 'Рів.',

    /* ── Назви предметів, які не даються композиційним правилам ──
       «Administrator's Boon» уже є вище, серед підкатегорій крамниці. ── */
    'tea of repose': 'Чай спокою',
    'change password': 'Змінити пароль',
    'security': 'Безпека',
    'linked accounts': "Прив'язані акаунти",
    'created': 'Створено',
    'last login': 'Останній вхід',

    /* ── Крамниця: категорії ── */
    'skins': 'Скіни',
    'skin sets': 'Набори скінів',
    'weapon skins': 'Скіни зброї',
    'mounts': 'Маунти',
    'motions & emotes': 'Рухи та емоції',
    'consumables': 'Витратні',
    'candy': 'Цукерки',
    'pets & sidekicks': 'Улюбленці та помічники',
    'tickets': 'Квитки',
    'titles': 'Титули',
    'dyes': 'Барвники',
    'hairstyles': 'Зачіски',
    'housing': 'Житло',
    'other': 'Інше',

    /* ── Крамниця: підкатегорії ── */
    'costumes': 'Костюми',
    'hats': 'Головні убори',
    'wings': 'Крила',
    'chest': 'Нагрудник',
    'pants': 'Штани',
    'shoes': 'Взуття',
    'shoulders': 'Наплічники',
    'gloves': 'Рукавиці',
    'greatsword': 'Дворучний меч',
    'polearm': 'Спис',
    'sword': 'Меч',
    'dagger': 'Кинджал',
    'mace': 'Булава',
    'bow': 'Лук',
    'spellbook': 'Книга заклять',
    'orb': 'Сфера',
    'shield': 'Щит',
    'staff': 'Посох',
    'motions': 'Рухи',
    'private shop': 'Приватна крамниця',
    'dances': 'Танці',
    'emotes': 'Емоції',
    'xp amulets, charms & tea': 'Амулети досвіду, шарми та чай',
    "administrator's boon": 'Благословення адміністратора',
    'scrolls': 'Сувої',
    'elemental rings': 'Стихійні персні',
    'miscellaneous': 'Різне',
    'physical asmo': 'Фізичні (асмодіанці)',
    'magical asmo': 'Магічні (асмодіанці)',
    'physical elyos': 'Фізичні (елійці)',
    'magical elyos': 'Магічні (елійці)',
    'buff pets': 'Улюбленці з баффами',
    'utility': 'Корисні',
    'inventory and storage expansion': 'Розширення інвентаря та сховища',
    'rename and reskin tickets': 'Квитки на перейменування та зміну зовнішності',
    'achromatic': 'Ахроматичні',
    'blue': 'Синій',
    'purple': 'Фіолетовий',
    'pink': 'Рожевий',
    'red': 'Червоний',
    'orange': 'Помаранчевий',
    'yellow': 'Жовтий',
    'green': 'Зелений',
    'asmodian': 'Асмодіанці',
    'elyos': 'Елійці',
    'outdoor': "Екстер'єр",
    'furniture': 'Меблі',
    'paint': 'Фарба',

    /* ── Заголовки вкладок (document.title) ── */
    'origin aion': 'Origin Aion',
    'pvp rankings | origin aion': 'PvP-рейтинг | Origin Aion',
  };

  /* ── Раси та класи: лише для відповідних колонок таблиці рейтингу,
        щоб не зачепити нікнейми гравців (є, наприклад, гравець «Paladin»). ── */

  /* Назви звірено з client_strings_ui.xml вивіреної бази локалізації гри
     (STR_CLASS_NAME_*), щоб сайт збігався з українським клієнтом.
     Виняток — chanter: у базі він «Чарівник», як і sorcerer, тож у таблиці
     рейтингу два класи стали б нерозрізненними; вжито «Чародій». */
  const RACES = {
    'elyos': 'Елієць',
    'asmodian': 'Асмодіанець',
  };

  const CLASSES = {
    'templar': 'Охоронець',
    'gladiator': 'Гладіатор',
    'assassin': 'Вбивця',
    'ranger': 'Стрілець',
    'sorcerer': 'Чарівник',
    'spiritmaster': 'Заклинач',
    'cleric': 'Жрець',
    'chanter': 'Чародій',
    'gunner': 'Пілот',
    'bard': 'Бард',
    'rider': 'Вершник',
    'aethertech': 'Етертех',
    'warrior': 'Воїн',
    'scout': 'Слідопит',
    'mage': 'Маг',
    'priest': 'Цілитель',
    'technist': 'Технолог',
    'muse': 'Муза',
  };

  /* ═══════════════════ КОМПОЗИЦІЙНИЙ ПЕРЕКЛАД НАЗВ ══════════════════════
     Предметів у крамниці тисячі, тож замість повного словника працюють
     правила: тег у дужках + тип предмета в кінці назви.
     «[Event] Audron Helmet» → «[Івент] Шолом «Audron»»
  ═════════════════════════════════════════════════════════════════════ */

  const ITEM_TAGS = {
    'event': 'Івент',
    'limited': 'Ліміт',
    'new': 'Нове',
    'sale': 'Знижка',
    'male': 'Чол.',
    'female': 'Жін.',
    'elyos': 'Елійці',
    'asmodian': 'Асмодіанці',
    'all classes': 'Усі класи',
  };

  // Порядок важливий: складені типи мають стояти перед простими.
  const ITEM_TYPES = [
    ['skin set', 'Набір скінів'],
    ['weapon skin', 'Скін зброї'],
    ['hair style', 'Зачіска'],
    ['hairstyle', 'Зачіска'],
    ['great sword', 'Дворучний меч'],
    ['greatsword', 'Дворучний меч'],
    ['spell book', 'Книга заклять'],
    ['spellbook', 'Книга заклять'],
    ['sunglasses', 'Сонцезахисні окуляри'],
    ['pauldrons', 'Наплічники'],
    ['shoulders', 'Наплічники'],
    ['headband', "Пов'язка"],
    ['bracelet', 'Браслет'],
    ['necklace', 'Намисто'],
    ['earrings', 'Сережки'],
    ['scouter', 'Візор'],
    ['costume', 'Костюм'],
    ['glasses', 'Окуляри'],
    ['helmet', 'Шолом'],
    ['amulet', 'Амулет'],
    ['jacket', 'Куртка'],
    ['skirt', 'Спідниця'],
    ['shirt', 'Сорочка'],
    ['armor', 'Обладунок'],
    ['emote', 'Емоція'],
    ['motion', 'Рух'],
    ['dance', 'Танець'],
    ['crown', 'Корона'],
    ['dress', 'Сукня'],
    ['gown', 'Сукня'],
    ['coat', 'Пальто'],
    ['charm', 'Шарм'],
    ['chest', 'Скриня'],
    ['ring', 'Перстень'],
    ['belt', 'Пояс'],
    ['key', 'Ключ'],
    ['tea', 'Чай'],
    ['polearm', 'Спис'],
    ['dagger', 'Кинджал'],
    ['scroll', 'Сувій'],
    ['potion', 'Зілля'],
    ['ticket', 'Квиток'],
    ['bundle', 'Набір'],
    ['shield', 'Щит'],
    ['staff', 'Посох'],
    ['gloves', 'Рукавиці'],
    ['boots', 'Чоботи'],
    ['shoes', 'Взуття'],
    ['pants', 'Штани'],
    ['wings', 'Крила'],
    ['title', 'Титул'],
    ['mount', 'Маунт'],
    ['tunic', 'Туніка'],
    ['robe', 'Роба'],
    ['mask', 'Маска'],
    ['sword', 'Меч'],
    ['mace', 'Булава'],
    ['staff', 'Посох'],
    ['dye', 'Барвник'],
    ['box', 'Скриня'],
    ['pack', 'Набір'],
    ['pet', 'Улюбленець'],
    ['hat', 'Капелюх'],
    ['cap', 'Кепка'],
    ['bow', 'Лук'],
    ['orb', 'Сфера'],
    ['skin', 'Скін'],
  ];

  /* ═══════════════════════ ШАБЛОНИ (regex) ════════════════════════════ */

  const MONTHS = {
    jan: 'січ.', feb: 'лют.', mar: 'бер.', apr: 'квіт.', may: 'трав.',
    jun: 'черв.', jul: 'лип.', aug: 'серп.', sep: 'вер.', oct: 'жовт.',
    nov: 'лист.', dec: 'груд.',
  };

  const PATTERNS = [
    // «Online · 805»
    [/^online\s*·\s*([\d,\s]+)$/i, (m) => `Онлайн · ${m[1].trim()}`],

    // «3 items in the current result set»
    [/^(\d[\d,\s]*)\s+items?\s+in\s+the\s+current\s+result\s+set$/i,
      (m) => {
        const n = toInt(m[1]);
        return `${m[1].trim()} ${plural(n, ['предмет', 'предмети', 'предметів'])} у поточній вибірці`;
      }],

    // «1,488 views»
    [/^([\d,\s]+)\s+views?$/i,
      (m) => `${m[1].trim()} ${plural(toInt(m[1]), ['перегляд', 'перегляди', 'переглядів'])}`],

    // «Page 1 of 9»
    [/^page\s+(\d+)\s+of\s+(\d+)$/i, (m) => `Сторінка ${m[1]} з ${m[2]}`],

    // «Ends in 1d 4h 10m»
    [/^ends\s+in\s+(.+)$/i, (m) => `Закінчується через ${duration(m[1])}`],
    [/^starts\s+in\s+(.+)$/i, (m) => `Починається через ${duration(m[1])}`],
    [/^(\d+d\s*)?(\d+h\s*)?(\d+m\s*)?(\d+s)?$/i, (m, s) => (
      /\d/.test(s) && /[dhms]/i.test(s) ? duration(s) : null
    )],

    // «Aug 26, 2026»
    [/^([a-z]{3})[a-z]*\s+(\d{1,2}),\s*(\d{4})$/i,
      (m) => {
        const mon = MONTHS[m[1].toLowerCase()];
        return mon ? `${toInt(m[2])} ${mon} ${m[3]}` : null;
      }],

    // Системні вимоги
    [/^approx\.\s*([\d.,]+)\s*GB$/i, (m) => `прибл. ${m[1]} ГБ`],
    [/^(\d+)\s*GB\s+RAM$/i, (m) => `${m[1]} ГБ ОЗП`],
    [/^version\s+(.+)$/i, (m) => `Версія ${m[1]}`],
    [/^(\d+)\s*GB\s+available\s+space$/i, (m) => `${m[1]} ГБ вільного місця`],
    [/^(\d+)\s*GB\s*\(SSD\s+Recommended\)$/i, (m) => `${m[1]} ГБ (бажано SSD)`],
    [/^windows\s+(\d+)\s+(\d+)-bit$/i, (m) => `Windows ${m[1]} ${m[2]}-біт`],

    /* ── Модалка конвертації Cosmic Fragments ── */
    [/^you['’]ll\s+receive:\s*([\d\s,]+)\s*cosmics?$/i,
      (m) => `Ви отримаєте: ${m[1].trim()} ${cosmicWord(m[1])}`],
    [/^new\s+balance:\s*([-\d\s,]+)\s*cosmics?$/i,
      (m) => `Новий баланс: ${m[1].trim()} ${cosmicWord(m[1])}`],
    [/^new\s+cosmic\s+balance:\s*([-\d\s,]+)$/i,
      (m) => `Новий баланс косміків: ${m[1].trim()}`],
    [/^remaining\s+fragments:\s*([\d\s,]+)$/i,
      (m) => `Залишилось фрагментів: ${m[1].trim()}`],
    [/^([\d\s,]+)\s*fragments?\s*(?:→|->)\s*([\d\s,]+)\s*cosmics?$/i,
      (m) => `${m[1].trim()} ${plural(toInt(m[1]), ['фрагмент', 'фрагменти', 'фрагментів'])}` +
             ` → ${m[2].trim()} ${cosmicWord(m[2])}`],
    [/^amount\s+to\s+convert\s*\(([\d\s,]+)\s*maximum\)$/i,
      (m) => `Скільки конвертувати (максимум ${m[1].trim()})`],

    /* ── Історія покупок ── */
    [/^found\s+([\d\s,]+)\s+transactions?$/i,
      (m) => `Знайдено ${m[1].trim()} ` +
             `${plural(toInt(m[1]), ['транзакцію', 'транзакції', 'транзакцій'])}`],

    /* ── Предмети на строк: «Administrator's Boon IV – 30-Day Pass» ── */
    [/^(.+?)\s+([IVXLC]+)\s*[–—-]\s*(\d+)-day\s+pass$/i, (m) => {
      const base = UI[norm(m[1])];
      return base ? `${base} ${m[2]} — ${m[3]}-денний пас` : null;
    }],
    [/^(.+?)\s*[–—-]\s*(\d+)-day\s+pass$/i, (m) => {
      const base = UI[norm(m[1])];
      return base ? `${base} — ${m[2]}-денний пас` : null;
    }],

    /* ── Баланс: «215 Cosmics», «-65 Cosmics» ── */
    [/^([-\d\s,]+)\s*cosmics?$/i, (m) => `${m[1].trim()} ${cosmicWord(m[1])}`],

    /* ── Персонаж і рівень; нікнейм лишається недоторканим ── */
    [/^(.+?)\s*\(\s*Lv\.?\s*(\d+)\s*\)$/i, (m) => `${m[1]} (${m[2]} рів.)`],
    [/^(.+?)\s*·\s*Lv\.?\s*(\d+)$/i, (m) => `${m[1]} · ${m[2]} рів.`],

    // «-60%» лишається як є; «SALE» вже у словнику.
  ];

  /* ═══════════════════════════ УТИЛІТИ ════════════════════════════════ */

  // Типографські апострофи зводимо до звичайного, інакше «Administrator’s»
  // не збігся б із ключем «administrator's».
  const norm = (s) => s
    .replace(/[‘’ʼ´`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  const toInt = (s) => parseInt(String(s).replace(/[^\d]/g, ''), 10) || 0;

  function plural(n, forms) {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return forms[0];
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return forms[1];
    return forms[2];
  }

  const COSMIC_FORMS = ['космік', 'косміки', 'косміків'];

  /* Форма слова за числом у тому ж рядку: «1 космік», «3 косміки», «215 косміків». */
  function cosmicWord(numStr) {
    return plural(Math.abs(toInt(numStr)), COSMIC_FORMS);
  }

  /* React часто тримає число й слово «Cosmics» в окремих вузлах, тож число
     доводиться шукати в тексті найближчих предків. */
  function cosmicsFormFromContext(node) {
    let el = node.parentElement;
    for (let depth = 0; el && depth < 3; depth++, el = el.parentElement) {
      const text = el.textContent || '';
      if (text.length > 200) break;
      const nums = text.match(/-?\d[\d\s,]*/g);
      if (nums) {
        const word = plural(Math.abs(toInt(nums[nums.length - 1])), COSMIC_FORMS);
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
    return null;
  }

  function duration(s) {
    return s
      .replace(/(\d+)\s*d/gi, '$1 д')
      .replace(/(\d+)\s*h/gi, '$1 год')
      .replace(/(\d+)\s*m(?!s)/gi, '$1 хв')
      .replace(/(\d+)\s*s/gi, '$1 с')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const isAllCaps = (s) => {
    const letters = s.replace(/[^a-zA-ZЀ-ӿ]/g, '');
    return letters.length > 1 && letters === letters.toUpperCase();
  };

  const matchCase = (src, out) => (isAllCaps(src) ? out.toUpperCase() : out);

  /* ═════════════════════ ПЕРЕКЛАД ОДНОГО РЯДКА ════════════════════════ */

  // Англійські рядки, для яких перекладу не знайшлося: __originaionUA.missing()
  const missing = new Set();

  /* Власні назви й технічні позначки: не перекладаємо і не показуємо
     в діагностиці, щоб список неперекладеного лишався коротким. */
  const KEEP_AS_IS = new Set([
    'discord', 'youtube', 'twitch', 'telegram', 'cloudflare', 'tampermonkey',
    'aion', 'origin aion', 'originaion.com', 'origin', 'pvp', 'pve', 'pvpve',
    'id', 'gmt', 'directx', 'ssd', 'hdd', 'ram', 'nvidia', 'amd', 'intel',
    'ati', 'windows', 'ok', 'vs',
    // «cosmic» / «cosmics» сюди не додавати: вони мають власну гілку
    // з відмінюванням за числом, і цей список її б перекрив.
  ]);

  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  function translateString(raw, node) {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.length > 600) return null;
    if (!/[a-zA-Z]/.test(trimmed)) return null; // самі цифри/символи

    const key = norm(trimmed);

    if (KEEP_AS_IS.has(key) || isEmail(trimmed)) return null;

    // «Cosmics» окремим вузлом: форму диктує число, яке лежить поруч.
    // Сайт вживає і однину («1 Cosmic»), тож ловимо обидві форми.
    if (key === 'cosmics' || key === 'cosmic') {
      const form = node && cosmicsFormFromContext(node);
      return matchCase(trimmed, form || UI['cosmics']);
    }

    // Класи й раси трапляються не лише в таблиці рейтингу (ще й у списку
    // персонажів на сторінці профілю), тож вони працюють і як загальний
    // словник. Нікнейми в самій таблиці від цього захищені окремо — вміст
    // її комірок рушій не чіпає.
    const exact = UI[key] || CLASSES[key] || RACES[key];
    if (exact) return matchCase(trimmed, exact);

    for (const [re, fn] of PATTERNS) {
      const m = trimmed.match(re);
      if (m) {
        const out = fn(m, trimmed);
        if (out) return matchCase(trimmed, out);
      }
    }

    const item = translateItemName(trimmed);
    if (item) return item;

    if (missing.size < 500) missing.add(trimmed);
    return null;
  }

  /* Назви предметів крамниці: теги в дужках + тип предмета в кінці. */
  const SIZE_WORDS = {
    large: 'великий', big: 'великий', medium: 'середній',
    small: 'малий', mini: 'міні',
  };

  function translateItemName(src) {
    let rest = src;
    const tags = [];
    let suffix = '';
    let changed = false;

    // Провідні теги: [Event], [Male] …
    const tagRe = /^\s*\[([^\]]+)\]\s*/;
    let m;
    while ((m = rest.match(tagRe))) {
      const ua = ITEM_TAGS[norm(m[1])];
      tags.push(ua ? `[${ua}]` : `[${m[1]}]`);
      if (ua) changed = true;
      rest = rest.slice(m[0].length);
    }

    // Розмір у дужках наприкінці: «(Large)» → «(великий)».
    const sizeM = rest.match(/\s*\(([^)]+)\)\s*$/);
    if (sizeM) {
      const ua = SIZE_WORDS[norm(sizeM[1])];
      if (ua) {
        suffix = ` (${ua})`;
        rest = rest.slice(0, sizeM.index).trim();
        changed = true;
      }
    }

    // Римські цифри наприкінці — ранг предмета, лишаємо як є.
    const romanM = rest.match(/\s+([IVX]{1,5})$/);
    if (romanM) {
      suffix = ` ${romanM[1]}${suffix}`;
      rest = rest.slice(0, romanM.index).trim();
    }

    const baseUA = UI[norm(rest)];
    if (baseUA) {
      rest = baseUA;
      changed = true;
    } else {
      // Тип предмета в кінці назви → виносимо наперед, власну назву в лапки.
      const restNorm = norm(rest);
      for (const [en, ua] of ITEM_TYPES) {
        if (restNorm === en) {
          rest = ua;
          changed = true;
          break;
        }
        if (restNorm.endsWith(' ' + en)) {
          const proper = rest.slice(0, rest.length - en.length).trim()
            .replace(/['‘’ʼ]s$/i, ''); // «Venerable Elim's» → «Venerable Elim»
          rest = proper ? `${ua} «${proper}»` : ua;
          changed = true;
          break;
        }
      }
    }

    if (!changed) return null;
    return ([...tags, rest].join(' ').trim() + suffix).trim();
  }

  /* ═══════════════════════ ОБХІД І ЗАСТОСУВАННЯ ═══════════════════════ */

  const SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE', 'SVG', 'CANVAS', 'IFRAME',
  ]);

  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];

  // node → { src, out } — щоб не перекладати двічі й уміти відкотити.
  const seen = new WeakMap();
  const seenAttrs = new WeakMap();

  // WeakMap не перебирається, тож для відкату тримаємо ще й перелік змінених
  // вузлів. Відключені від документа прибираємо, щоб перелік не ріс без меж.
  const touched = new Set();
  const touchedAttrs = new Set();

  function pruneTouched() {
    if (touched.size > 3000) {
      for (const n of touched) if (!n.isConnected) touched.delete(n);
    }
    if (touchedAttrs.size > 1000) {
      for (const el of touchedAttrs) if (!el.isConnected) touchedAttrs.delete(el);
    }
  }

  /* Повертає сторінці англійський текст, не перезавантажуючи її: зайві
     перезавантаження сайту швидко впираються в rate limit Cloudflare. */
  function revertAll() {
    for (const node of touched) {
      const rec = seen.get(node);
      if (rec && node.nodeValue === rec.out) node.nodeValue = rec.src;
    }
    touched.clear();

    for (const el of touchedAttrs) {
      const store = seenAttrs.get(el);
      if (!store) continue;
      for (const attr of ATTRS) {
        const rec = store[attr];
        if (rec && el.getAttribute(attr) === rec.out) el.setAttribute(attr, rec.src);
      }
    }
    touchedAttrs.clear();
  }

  function skipNode(node) {
    for (let el = node.parentElement; el; el = el.parentElement) {
      if (SKIP_TAGS.has(el.tagName)) return true;
      if (el.isContentEditable) return true;
      if (el.hasAttribute('data-no-l10n')) return true;
      // Нікнейми гравців у таблиці рейтингу — не чіпаємо.
      if (el.tagName === 'TD' && el.closest('[data-l10n-ranking]')) return true;
    }
    return false;
  }

  /* Баланс змінюється («215 Cosmics» → «1 Cosmic»), а слово вже перекладене,
     тож форму треба перерахувати з початкового тексту вузла. */
  function refreshCosmics(node, rec, raw) {
    const form = cosmicsFormFromContext(node);
    if (!form) return;
    const next = raw.match(/^\s*/)[0] + matchCase(rec.src.trim(), form) + raw.match(/\s*$/)[0];
    if (next === raw) return;
    node.nodeValue = next;
    seen.set(node, { src: rec.src, out: next, kind: 'cosmics' });
  }

  function applyToTextNode(node) {
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;

    const rec = seen.get(node);
    if (rec && rec.out === raw) { // вже перекладено нами
      if (rec.kind === 'cosmics') refreshCosmics(node, rec, raw);
      return;
    }

    if (skipNode(node)) return;

    const out = translateString(raw, node);
    if (!out) return;

    // Зберігаємо початкові/кінцеві пробіли: React часто розбиває рядок на
    // кілька вузлів, і втрата пробілу склеїла б сусідні слова.
    const finalText = raw.match(/^\s*/)[0] + out + raw.match(/\s*$/)[0];
    if (finalText === raw) return;

    seen.set(node, {
      src: raw,
      out: finalText,
      kind: (norm(raw) === 'cosmics' || norm(raw) === 'cosmic') ? 'cosmics' : null,
    });
    node.nodeValue = finalText;
    touched.add(node);
  }

  function applyToAttrs(el) {
    for (const attr of ATTRS) {
      if (!el.hasAttribute(attr)) continue;
      const raw = el.getAttribute(attr);
      if (!raw || !raw.trim()) continue;

      const store = seenAttrs.get(el) || {};
      if (store[attr] && store[attr].out === raw) continue;

      const out = translateString(raw);
      if (!out || out === raw) continue;

      store[attr] = { src: raw, out };
      seenAttrs.set(el, store);
      el.setAttribute(attr, out);
      touchedAttrs.add(el);
    }
  }

  /* Таблиці рейтингу: позначаємо, перекладаємо лише колонки Race і Class. */
  function handleRankingTables(root) {
    const tables = root.querySelectorAll ? root.querySelectorAll('table') : [];
    for (const table of tables) {
      const heads = [...table.querySelectorAll('thead th, thead td')];
      if (!heads.length) continue;

      const idx = {};
      heads.forEach((th, i) => { idx[norm(th.textContent)] = i; });

      const isRanking = 'legion' in idx || 'легіон' in idx;
      if (!isRanking) continue;
      table.setAttribute('data-l10n-ranking', '1');

      const cols = [
        [idx['race'] ?? idx['раса'], RACES],
        [idx['class'] ?? idx['клас'], CLASSES],
      ];

      for (const tr of table.querySelectorAll('tbody tr')) {
        for (const [i, dict] of cols) {
          if (i == null) continue;
          const cell = tr.children[i];
          if (!cell) continue;
          const raw = cell.textContent.trim();
          const ua = dict[norm(raw)];
          if (ua && raw !== ua) {
            const tn = [...cell.childNodes].find((n) => n.nodeType === 3 && n.nodeValue.trim());
            if (tn) {
              seen.set(tn, { src: tn.nodeValue, out: matchCase(raw, ua) });
              tn.nodeValue = matchCase(raw, ua);
              touched.add(tn); // інакше відкат оминув би раси й класи
            }
          }
        }
      }
    }
  }

  function walk(root) {
    if (!root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      applyToTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

    handleRankingTables(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) applyToTextNode(n);

    if (root.querySelectorAll) {
      const sel = ATTRS.map((a) => `[${a}]`).join(',');
      for (const el of root.querySelectorAll(sel)) applyToAttrs(el);
      if (root.nodeType === Node.ELEMENT_NODE) applyToAttrs(root);
    }
  }

  function translateTitle() {
    const out = translateString(document.title);
    if (out && out !== document.title) document.title = out;
  }

  /* ═══════════════════════════ ЗАПУСК ═════════════════════════════════ */

  let enabled = loadState();
  let observer = null;
  let queued = false;

  function loadState() {
    try {
      if (typeof GM_getValue === 'function') return GM_getValue(STORAGE_KEY, true);
      const v = localStorage.getItem(STORAGE_KEY);
      return v === null ? true : v === '1';
    } catch (e) {
      return true;
    }
  }

  function saveState(v) {
    try {
      if (typeof GM_setValue === 'function') GM_setValue(STORAGE_KEY, v);
      else localStorage.setItem(STORAGE_KEY, v ? '1' : '0');
    } catch (e) { /* приватний режим — просто ігноруємо */ }
  }

  function scheduleRun() {
    if (queued || !enabled) return;
    queued = true;
    // Саме setTimeout, а не requestAnimationFrame: у фоновій або прихованій
    // вкладці кадри не компонуються, і rAF-колбек не викликається — переклад
    // динамічного вмісту завис би до моменту, коли вкладку відкриють.
    setTimeout(() => {
      queued = false;
      run();
    }, 0);
  }

  /* Сторінки блокування та перевірки Cloudflare (помилка 1015, «Checking your
     browser») чіпати не можна: це не сайт, а службова сторінка. */
  function isCloudflarePage() {
    return !!document.querySelector(
      '#cf-wrapper, #cf-error-details, .cf-error-details, #challenge-running, #challenge-form'
    );
  }

  function run() {
    if (!enabled || !document.body) return;
    if (isCloudflarePage()) { stopObserver(); return; }
    pruneTouched();
    walk(document.body);
    translateTitle();
    // Відкидаємо мутації, породжені щойно нами, щоб не запускати зайвий прохід.
    // Чужі зміни з цього ж такту вже враховані обходом усього документа вище.
    if (observer) observer.takeRecords();
  }

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver((records) => {
      if (!enabled) return;
      for (const r of records) {
        if (r.type === 'characterData') { scheduleRun(); return; }
        if (r.addedNodes.length) { scheduleRun(); return; }
        if (r.type === 'attributes') { scheduleRun(); return; }
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    });
  }

  function stopObserver() {
    if (!observer) return;
    observer.disconnect();
    observer = null;
  }

  function setEnabled(v) {
    enabled = v;
    saveState(v);
    if (v) {
      startObserver();
      run();
    } else {
      stopObserver();
      revertAll();
    }
    updateToggle();
  }

  /* ── Плаваючий перемикач UA / EN ── */

  let toggleEl = null;

  function updateToggle() {
    if (!toggleEl) return;
    toggleEl.textContent = enabled ? 'UA' : 'EN';
    toggleEl.title = enabled
      ? 'Українська увімкнена — натисніть, щоб повернути оригінал'
      : 'Оригінал — натисніть, щоб увімкнути українську';
  }

  function mountToggle() {
    if (!SHOW_TOGGLE || toggleEl || !document.body || isCloudflarePage()) return;
    toggleEl = document.createElement('button');
    toggleEl.setAttribute('data-no-l10n', '1');
    toggleEl.style.cssText = [
      'position:fixed', 'right:16px', 'bottom:16px', 'z-index:2147483647',
      'width:44px', 'height:44px', 'border-radius:50%',
      'border:1px solid rgba(255,255,255,.25)',
      'background:rgba(15,18,28,.85)', 'color:#e8ddb5',
      'font:600 13px/1 system-ui,sans-serif', 'letter-spacing:.5px',
      'cursor:pointer', 'backdrop-filter:blur(6px)',
      'box-shadow:0 4px 14px rgba(0,0,0,.45)',
    ].join(';');
    toggleEl.addEventListener('click', () => setEnabled(!enabled));
    document.body.appendChild(toggleEl);
    updateToggle();
  }

  /* ── Разове сповіщення після автооновлення ──
     Tampermonkey оновлює скрипт тихо, тож при першому запуску нової версії
     показуємо тост. Версія береться з GM_info (доступний без @grant),
     попередня — з localStorage; збіг або перше встановлення — тиша. */
  function notifyUpdate() {
    if (!enabled || !document.body || isCloudflarePage()) return;
    let current = '';
    try { current = GM_info.script.version; } catch (e) { return; }
    const KEY = STORAGE_KEY + '_version';
    let prev = null;
    try {
      prev = localStorage.getItem(KEY);
      localStorage.setItem(KEY, current);
    } catch (e) { return; }
    if (!prev || prev === current) return;

    const toast = document.createElement('div');
    toast.setAttribute('data-no-l10n', '1');
    toast.textContent = 'Українську локалізацію оновлено до версії ' + current;
    toast.style.cssText = [
      'position:fixed', 'left:50%', 'bottom:72px', 'transform:translateX(-50%)',
      'z-index:2147483647', 'padding:10px 18px', 'border-radius:8px',
      'background:rgba(15,18,28,.95)', 'color:#e8ddb5',
      'font:500 13px/1.4 system-ui,sans-serif',
      'border:1px solid rgba(255,215,0,.35)',
      'box-shadow:0 6px 20px rgba(0,0,0,.5)', 'cursor:pointer',
      'max-width:90vw', 'text-align:center',
    ].join(';');
    toast.addEventListener('click', () => toast.remove());
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 8000);
  }

  function boot() {
    if (enabled) {
      startObserver();
      run();
    }
    mountToggle();
    notifyUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
    // Спостерігач стартує одразу, щоб перехопити перший рендер React.
    if (enabled) startObserver();
  } else {
    boot();
  }

  /* ═══════════════════════════ ДІАГНОСТИКА ════════════════════════════
     Показує англійські рядки, яким ще бракує перекладу — щоб зібрати тексти
     зі сторінок, доступних лише після входу (профіль, покупки, пас).

     Найпростіше: меню Tampermonkey → «Показати неперекладені рядки»
     (список одразу лягає в буфер обміну).

     У консолі F12 працює __originaionUA.missingText(), але через @grant
     скрипт живе в пісочниці Tampermonkey, і його window — не той, що бачить
     консоль. Тому об'єкт кладемо ще й в unsafeWindow, тобто у справжнє вікно
     сторінки. Якщо консоль усе одно каже «is not defined», перемкніть у ній
     контекст із «top» на Tampermonkey — або просто скористайтеся меню.
  ═════════════════════════════════════════════════════════════════════ */

  const api = {
    version: '1.3.0',
    missing: () => [...missing].sort(),
    missingText: () => [...missing].sort().join('\n'),
  };

  try {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow) unsafeWindow.__originaionUA = api;
  } catch (e) { /* доступ до вікна сторінки закритий — лишається меню */ }

  if (typeof window !== 'undefined') window.__originaionUA = api;

  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('Увімкнути / вимкнути українську', () => setEnabled(!enabled));
    GM_registerMenuCommand('Показати неперекладені рядки', () => {
      const list = api.missingText();
      console.log('[UA] Без перекладу (' + missing.size + '):\n' + (list || '(порожньо)'));
      if (list && typeof GM_setClipboard === 'function') {
        GM_setClipboard(list);
        console.log('[UA] Список скопійовано в буфер обміну.');
      }
    });
  }

  // Експорт для офлайн-тестів у Node; у браузері гілка неактивна.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translateString, translateItemName, plural, duration, norm };
  }
})();
