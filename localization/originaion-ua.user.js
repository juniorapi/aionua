// ==UserScript==
// @name         Origin Aion — українська локалізація
// @name:uk      Origin Aion — українська локалізація
// @namespace    https://github.com/juniorapi/aionua
// @version      1.9.0
// @description  Перекладає сайт originaion.com українською: усі сторінки, крамниця, рейтинги, розклад.
// @author       juniorapi
// @match        https://originaion.com/*
// @match        https://www.originaion.com/*
// @icon         https://originaion.com/favicon.ico
// @homepageURL  https://juniorapi.github.io/aionua/localization/
// @downloadURL  https://raw.githubusercontent.com/juniorapi/aionua/main/localization/originaion-ua.user.js
// @updateURL    https://raw.githubusercontent.com/juniorapi/aionua/main/localization/originaion-ua.user.js
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
    // «Enchantment Calculator» — як «Калькулятор чар» на сайті aionua.
    'gear calculator': 'Калькулятор спорядження',
    'enchantment calculator': 'Калькулятор чар',
    'translator': 'Перекладач',
    'dps meter': 'DPS-лічильник',
    'social media': 'Соцмережі',
    'earn cosmics': 'Заробити косміки',

    /* ── Сторінка «Заробити» (/earn) — голосування за сервер. Назви сайтів-топів
       (TopG, Arena-Top100…) — власні назви, їх не перекладаємо. ── */
    'earn rewards': 'Отримуйте нагороди',
    'free rewards for playing and helping origin aion grow.':
      'Безкоштовні нагороди за гру й допомогу в розвитку Origin Aion.',
    'vote for origin aion': 'Голосуйте за Origin Aion',
    'every vote raises our ranking and helps new players find us. each site rewards one vote every 12 hours.':
      'Кожен голос підіймає нас у рейтингу й допомагає новим гравцям нас знайти. Кожен сайт нагороджує за один голос раз на 12 годин.',
    'log in to earn': 'Увійдіть, щоб отримати нагороду',
    'also vote here': 'Голосуйте й тут',
    'no reward, but every vote helps.': 'Без нагороди, але кожен голос допомагає.',

    /* ── Головна сторінка ── */
    'from the project manager of elden aion': 'Від керівника проєкту Elden Aion',
    'introducing': 'Представляємо',
    'no pay-to-win • 4.6 • high quality': 'Без pay-to-win • 4.6 • Висока якість',
    'shugo imperial tomb': 'Мавзолей імператорів шиго',
    'browse the codex': 'Переглянути Кодекс',
    'look up items, quests, npcs, and other game database entries.':
      'Шукайте предмети, завдання, NPC та інші записи ігрової бази.',
    'explore our other tools': 'Інші наші інструменти',
    'track your damage with the dps meter, plan your build, check enchantment rates, and translate chat between factions.':
      'Стежте за своєю шкодою в DPS-лічильнику, плануйте збірку, перевіряйте шанси на чари й перекладайте чат між фракціями.',
    'origin aion banner': 'Банер Origin Aion',
    'scroll to features': 'До можливостей',
    'previous slide': 'Попередній слайд',
    'next slide': 'Наступний слайд',
    'page sections': 'Розділи сторінки',
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
    'what are cosmic fragments and cosmics?':
      'Що таке космічні фрагменти й косміки?',
    'what is the eternity pass?': 'Що таке Вічний пас?',
    'everything you need to know about origin aion before you start playing.':
      'Усе, що варто знати про Origin Aion, перш ніж почати грати.',

    /* ── Відповіді FAQ. Їх показують і на /faq, і в блоці на головній.
       Класи названо так само, як у таблиці CLASSES (за клієнтом). ── */
    'origin aion is a 4.6 retail build server delivering a high-quality and authentic experience; without the unbalanced new classes such as gunslinger, aethertech, and bard, while keeping the classic katalam and danaria endgame.':
      'Origin Aion — сервер на оригінальній збірці 4.6, що дає якісний і автентичний досвід: без розбалансованих нових класів — Снайпера, Пілота й Барда, — але з класичним ендгеймом Каталаму й Данарії.',
    'the server rates are: x3 exp, x2 gather and craft, x1.5 ap, x1 drop, and x1 kinah. this provides a healthy progression pace for all players.':
      'Рейти сервера: досвід x3, збирання й ремесло x2, AP x1.5, дроп x1, кинари x1. Це дає здоровий темп розвитку для всіх гравців.',
    'the server is hosted in the netherlands. the game client is available in the following languages: english, german, french, spanish, polish, russian, turkish and chinese.':
      'Сервер розміщено в Нідерландах. Ігровий клієнт доступний такими мовами: англійська, німецька, французька, іспанська, польська, російська, турецька й китайська.',
    'no. origin aion is completely free-to-play with no vip systems or donation-based advantages. all webshop currency is earned exclusively through gameplay, no real money required.':
      'Ні. Origin Aion повністю безкоштовний: жодних VIP-систем чи переваг за донат. Уся валюта вебкрамниці здобувається виключно грою, реальні гроші не потрібні.',
    'cosmic fragments are the in-game currency earned through gameplay. they are obtained as mob loot, special quests, voting, and other activities. they can be converted into cosmics via the webshop, which are then used to purchase cosmetics, mounts, and other available items.':
      'Космічні фрагменти — ігрова валюта, яку здобувають грою: з монстрів, за особливі завдання, голосування та інші активності. У вебкрамниці їх можна обміняти на косміки, а за косміки — купувати косметику, транспорт та інші предмети.',
    'the eternity pass is a seasonal battle pass that rewards in-game activity. eternity comets, earned through quests and bosses, are converted into the pass via the website. every character receives a free eternity pass with unique seasonal rewards.':
      'Вічний пас — сезонний бойовий пропуск, що винагороджує за активність у грі. Комети вічності, здобуті за завдання й босів, переносяться в пас через сайт. Кожен персонаж отримує безкоштовний Вічний пас з унікальними сезонними нагородами.',
    'origin aion runs on a stable retail c++ server core with client-side fixes, ensuring high performance and stability. pvp stays balanced without later classes, and faction skills are available to both sides. our anti-cheat systems actively protect fair play, and we add custom quests, unique items, and higher-patch skins. with improved progression rates, free starter gear, and generous seasonal rewards, we respect your time while delivering an authentic 4.6 experience.':
      'Origin Aion працює на стабільному оригінальному серверному ядрі C++ із виправленнями клієнта — це висока продуктивність і стабільність. PvP лишається збалансованим без пізніших класів, а фракційні вміння доступні обом сторонам. Античит-системи активно захищають чесну гру, а ще ми додаємо власні завдання, унікальні предмети й скіни з новіших патчів. Підвищені рейти, безкоштовне стартове спорядження й щедрі сезонні нагороди — ми цінуємо ваш час і даємо автентичний досвід 4.6.',
    'join our discord to connect with a vibrant community of dedicated aion players, get support from our team, and stay informed about events and updates. our staff provides prompt, professional-like assistance whenever you need it.':
      'Приєднуйтеся до нашого Discord, щоб спілкуватися з живою спільнотою відданих гравців Aion, отримувати підтримку від команди й бути в курсі подій та оновлень. Команда швидко й професійно допоможе, щойно це знадобиться.',

    /* ── Новини ── */
    'load more': 'Показати ще',
    // Empyrean Lords у паку — боги («Притулок богів»)
    'empyrean lord motions': 'Рухи богів',
    'empyrean lord motions available in the empyrean lord motion chest!':
      'Рухи богів уже доступні в Скрині рухів богів!',
    'what makes origin aion different from other servers?':
      'Чим Origin Aion відрізняється від інших серверів?',
    'how can i get help or connect with the community?':
      'Як отримати допомогу або долучитися до спільноти?',

    /* ── Новини ── */
    'latest announcements, updates, and event notes from the origin aion team.':
      'Останні анонси, оновлення та нотатки про події від команди Origin Aion.',
    'new': 'Нове',
    'read more': 'Читати далі',
    'read article': 'Читати статтю',
    'loading more articles...': 'Завантаження інших статей…',
    'back to news': 'Назад до новин',
    'patch notes': 'Список змін',

    /* ── Розклад ── */
    // Узимку сайт пише «(CET/CEST)», а не «(GMT +2)»: сервер переходить на зимовий час.
    'all times are based on the server time (gmt +2)':
      'Час указано за серверним (GMT +2)',
    'all times are based on the server time (cet/cest)':
      'Час указано за серверним (CET/CEST)',
    'schedule tabs': 'Вкладки розкладу',
    'schedule view mode': 'Режим перегляду розкладу',
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
    // Шапка тижневої таблиці
    'time': 'Час',
    'mon': 'Пн',
    'tue': 'Вт',
    'wed': 'Ср',
    'thu': 'Чт',
    'fri': 'Пт',
    'sat': 'Сб',
    'sun': 'Нд',

    /* ── Локації розкладу: вкладки «Облоги» й «Розломи» та інстанси.
       Назви — з паку («зони й місця»), щоб збігалися з клієнтом. На сайті
       фортеці підписані коротко («Sulfur»), у паку — повністю, тож беремо
       повну назву: коротка без слова «фортеця» часом нічого не означає
       («Divine» → «Фортеця святості»). ── */
    // Зона між аренами. «Зарядний пристрій» у клієнті — обʼєкт у Повітряній фортеці, не зона.
    'recharger': 'Підзарядник',
    'sulfur': 'Фортеця сірчаного дерева',
    'temple of scales': 'Храм давнього дракона',
    'vorgaltem citadel': 'Запечатана вежа',
    'tiamaranta': 'Тіамаранта',
    'sillus': 'Фортеця Сіллус',
    'silona': 'Фортеця Базен',
    'pradeth': 'Фортеця Парадес',
    'eltnen': 'Елтенен',
    // У паку Heiron — «Інтердика», як у російському клієнті; лишаємо як у грі.
    'heiron': 'Інтердика',
    'inggison': 'Інгісон',
    'morheim': 'Морхейм',
    'gelkmaros': 'Келькмарос',
    'beluslan': 'Белуслан',
    'iron wall warfront': 'Неприступна твердиня',
    "siel's western": 'Західна фортеця Сієлі',
    "siel's eastern": 'Східна фортеця Сієлі',
    'roah': 'Фортеця древнього міста Ру',
    'asteria': 'Фортеця Астерія',
    'altar of avarice': 'Вівтар жадоби',
    'crimson temple': 'Храм червоної землі',
    'miren/krotan/kysis': 'Ра-Мірен/Кротан/Ткісас',
    'divine': 'Фортеця святості',

    /* ── Локації та інстанси ── */
    'terath dredgion': 'Дерадикон Садх',
    'dredgion': 'Дерадикон',
    // Назви з паку, звірені з англійським клієнтом за ID рядка (07.10.2026) — ті самі,
    // що на сторінці розкладу aionua. Не плутати з Ophidan Bridge — «Міст Йормунганда».
    'engulfed ophidan bridge': 'Тунель Йормунганда',
    'kamar battlefield': 'Поле битви Камара',
    'arena of discipline': 'Бойова арена доблесті',
    'arena of chaos': 'Бойова арена хаосу',
    'arena of harmony': 'Арена покровительства',
    'arena of glory': 'Арена слави',

    /* ── Рейтинги ── */
    'pvp rankings': 'PvP-рейтинг',
    'loading rankings...': 'Завантаження рейтингу…',
    // Вкладка рейтингу; звичайний Ophidan Bridge у паку — «Міст Йормунганда».
    'ophidan bridge': 'Міст Йормунганда',
    'weekly kills': 'Убивства за тиждень',
    'ratings reset and arena tickets are removed when the season ends.':
      'Коли сезон закінчується, рейтинг обнуляється, а квитки на арену зникають.',
    'all classes': 'Усі класи',
    'all races': 'Усі раси',
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
    // Тепер те саме речення розбите посиланнями: «I accept the <Rules> and <Privacy Policy>».
    'i accept the': 'Я приймаю',
    'and': 'та',
    'max 14 characters': 'Не більше 14 символів',
    '8-16 characters': '8–16 символів',
    'repeat your password': 'Повторіть пароль',
    'toggle password visibility': 'Показати або сховати пароль',
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
    'seasonal': 'Сезонне',
    'per page': 'На сторінці',
    'items per page': 'Товарів на сторінці',
    'pagination': 'Сторінки',
    'previous page': 'Попередня сторінка',
    'next page': 'Наступна сторінка',
    'page…': 'Сторінка…',
    'page number': 'Номер сторінки',
    'click to add this item to your favorites': 'Додати товар до обраного',
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
    // За FAQ Cosmic Gems — це й є валюта крамниці, тобто ті самі косміки.
    'cosmic fragments': 'Космічні фрагменти',
    'cosmic gems': 'Косміки',

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
    'eternity pass': 'Вічний пас',
    'sign in to select a character and load your pass progression.':
      'Увійдіть, щоб обрати персонажа й завантажити прогрес пасу.',
    'free': 'Безкоштовно',
    'premium': 'Преміум',
    'claim': 'Забрати',
    'claim reward': 'Забрати нагороду',
    'claim rewards': 'Забрати нагороди',
    'claim all': 'Забрати все',
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
    'exchange your eternity comets for xp in the pass. once you have completed the pass, exchanging comets will turn them into eternity cores, that you may spend in the eternity shop.':
      'Обмінюйте свої вічні комети на досвід у пасі. Коли пас завершено, обмін комет перетворює їх на вічні ядра, які можна витратити в крамниці вічності.',
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
    'eternity comets': 'Вічні комети',
    'eternity cores': 'Вічні ядра',
    'eternity shop': 'Крамниця вічності',
    'xp': 'Досвід',
    'track season progression, claim unlocked rewards, and exchange comets.':
      'Стежте за прогресом сезону, забирайте відкриті нагороди й обмінюйте комети.',
    'unlock': 'Відкрити',

    /* ── Нагороди пасу. Назви звірені з паком: «Greater Supplements» там
       зветься посилювачем каменів, а Ceramium — сераміумом. Ранги предметів —
       за англійськими словами, як у калькуляторі чар: Heroic — героїчний,
       Fabled — легендарний, Eternal — вічний, Mythic — міфічний. ── */
    'ceramium medal': 'Сераміумова медаль',
    'greater supplements (eternal)': 'Посилювач каменів III (вічн.)',
    'greater supplements (fabled)': 'Посилювач каменів III (легенд.)',
    'greater supplements (mythic)': 'Посилювач каменів III (міфіч.)',
    'greater supplements (heroic or less)': 'Посилювач каменів III (героїч. і нижче)',
    'stigma shard': 'Уламок стигми',
    'blood mark': 'Знак крові',
    'agrint candy': 'Цукерки огринта',
    "saam king's herbs": 'Королівський корінь женьшеню',
    'solorius wine': 'Вино Соллоріуса',
    'seed of detection': 'Насіння виявлення',
    'vinna juice': 'Виноградний сік',
    'illuminary obelisk idian pouch': 'Мішечок з ідіаном захисної башти рунів',
    'stormwing egg (30 days)': 'Ембріон Рудри (30 дн.)',
    'elite divine life serum': 'Особливе зілля слави',
    'sublime mana serum': 'Особливе зілля мани V',
    'strange ide crystal': 'Загадковий кристал іда',
    'tasty harvest revel cookie': 'Смачне печиво до Хелловіну',
    'summoning stone: soul healer (group)': 'Ніка: Цілитель душ (група)',
    'summoning stone: stigma master (group)': 'Ніка: Майстер стигм (група)',
    'summoning stone: warehouse manager (group)': 'Ніка: Завідувач складом (група)',
    'kadomatsu enchantment stone bundles': 'Мішечки з магічними каменями Кадомач',
    'armor wrapping scroll (eternal/lv. 65 and lower)':
      'Сяючий сувій упаковки вічних обладунків',
    'weapon wrapping scroll (eternal/lv. 65 and lower)':
      'Сяючий сувій упаковки вічної зброї',

    /* Нагороди, яких у паку немає — це предмети самого сервера. */
    'premium recovery serum': 'Преміум-зілля відновлення',
    'ancient golem': 'Стародавній голем',
    'cosmic fragments chest [100 cosmic fragments]':
      'Скриня космічних фрагментів [100 фрагментів]',
    '[title] legendary - 30-day pass': '[Титул] Легендарний — 30-денний пас',
    "shining sea dragon king's wing feather":
      'Сяюче перо крила Короля морських драконів',

    /* Складені назви: скрипт лишав власну назву латинкою, бо не знав її.
       Ключ — назва без рангу («… II»), саме її шукає складач назв. */
    'venerable elim amulet': 'Амулет шанованого Еліма',
    'terath dredgion bonus entry scroll': 'Сувій входу в Дерадикон Садх',
    'sauro supply base bonus entry scroll': 'Сувій входу на військову базу Сауро',
    "fortuneer's godstone pack": 'Згорток з божественними каменями гільдії авантюристів',
    "leader's recovery scroll": 'Відновлювальний сувій правителя',
    'mythic armor tuning scroll': 'Сувій медитації міфічних обладунків',
    'mythic weapon tuning scroll': 'Сувій медитації міфічної зброї',
    'ancient coin pack': 'Мішечок з давніми монетами',
    'ancient coin bundle': 'Мішечок з давніми монетами',
    'elemental defence pack': 'Набір захисту від стихій',
    'major ancient crown': 'Безцінна давня корона',
    'noble idian pack': 'Набір шляхетних ідіанів',
    "water dragon king's weapon skin chest":
      'Скриня зі скінами зброї Короля водяних драконів',

    /* ── Уламки рядків із підстановкою ──
       React рендерить «Level {n}/{max} - Total EXP: {exp}» кількома текстовими
       вузлами, тож цілого рядка в DOM немає і шаблон по ньому не спрацьовує.
       Тому перекладаємо сталі шматки окремо. Шаблони на весь рядок лишаються
       на випадок, коли вузол усе-таки один. ── */
    // «level» уже є вище, серед загальних слів.
    'lv': 'рів.',
    '- total exp:': '— усього досвіду:',
    '• exp to next:': '• до наступного:',
    // Число лежить в іншому вузлі, тож відміняти за ним не можемо:
    // «переглядів» пасує до переважної більшості чисел.
    'views': 'переглядів',
    'view': 'перегляд',

    /* ═══════════════════════ ПРАВИЛА СЕРВЕРА ════════════════════════════
       Розмітка тут — <li><strong>Заголовок:</strong> текст</li>, тобто
       заголовок і текст лежать в окремих вузлах. Тому на кожне правило два
       ключі: сам заголовок із двокрапкою і окремо його текст.

       Англійський оригінал лишається головним: якщо адміни змінять
       формулювання, ключ просто не збіжиться й покажеться англійський
       текст — це безпечно.
    ═════════════════════════════════════════════════════════════════════ */

    'server rules': 'Правила сервера',
    'please read and follow these rules to ensure a fair and enjoyable experience for everyone.':
      'Прочитайте ці правила й дотримуйтеся їх, щоб гра була чесною та приємною для всіх.',
    'zero tolerance policy': 'Політика нульової терпимості',
    'the following behaviours are never acceptable and will result in immediate suspension or a permanent ban, depending on severity and history. ignorance of the rules is not an excuse.':
      'Наведена нижче поведінка неприпустима й тягне за собою негайне призупинення або довічне блокування — залежно від тяжкості порушення та попередніх випадків. Незнання правил не є виправданням.',
    'severe harassment, hate speech, threats, or targeted bullying.':
      'Тяжке цькування, мова ворожнечі, погрози або адресне переслідування.',
    'use of bots, hacks, or other cheating software.':
      'Використання ботів, хаків чи іншого шахрайського програмного забезпечення.',
    'real money trading (rmt), account selling, or account sharing for advantage.':
      'Торгівля за реальні гроші (RMT), продаж акаунтів або передавання доступу до них заради переваги.',
    'ddos threats or attacks, doxxing, or similar real-life threats.':
      'Погрози чи DDoS-атаки, оприлюднення особистих даних та подібні загрози в реальному житті.',
    'chargeback fraud or other intentional abuse of our payment systems.':
      'Шахрайство з поверненням платежів та інші умисні зловживання нашими платіжними системами.',

    'general rules': 'Загальні правила',
    'friendly atmosphere:': 'Дружня атмосфера:',
    'please treat everyone with respect and avoid offensive language to help maintain a welcoming community. toxic behavior, including spamming, excessive use of capital letters or emojis, and deliberately provoking other players or staff members, is not allowed.':
      'Ставтеся до всіх з повагою й уникайте образливих висловів, щоб спільнота лишалася привітною. Токсична поведінка — спам, надмірний капс чи емодзі, навмисне провокування інших гравців або команди — заборонена.',
    'language guidelines:': 'Мовні правила:',
    'speak english in the general english chat, and other languages in their respective channels. use the correct language in the appropriate channel for clear communication.':
      'У загальному англійському чаті спілкуйтеся англійською, іншими мовами — у відповідних каналах. Використовуйте правильну мову у відповідному каналі, щоб спілкування було зрозумілим.',
    'no discrimination:': 'Без дискримінації:',
    'bullying, harassment, or any form of discrimination based on race, gender, religion, or any other characteristic will not be tolerated. ensure your discord username and profile are appropriate. your in-game character name and legion name and emblem must also be non-offensive and respectful.':
      'Цькування, переслідування чи будь-яка дискримінація за расою, статтю, релігією або іншою ознакою неприпустимі. Ваш нік і профіль у Discord мають бути доречними. Ім’я персонажа, назва легіону та емблема теж не повинні нікого ображати.',
    'all player names and profiles must comply with our server rules at all times, both in-game and on discord. this includes, but is not limited to:':
      'Імена гравців і профілі мають завжди відповідати правилам сервера — і в грі, і в Discord. Це стосується, зокрема:',
    '• hate speech, slurs, or any discriminatory language':
      '• мови ворожнечі, образливих прізвиськ і будь-яких дискримінаційних висловів',
    '• names or references to hate groups, offensive historical figures, or similarly inappropriate content':
      '• назв і згадок про групи ненависті, одіозних історичних постатей та подібного недоречного вмісту',
    '• sexually explicit or obscene references':
      '• відвертих сексуальних чи непристойних згадок',
    '• impersonation of staff members or other players':
      '• видавання себе за команду сервера чи інших гравців',
    '• deliberately disruptive, offensive, or misleading content':
      '• навмисно деструктивного, образливого чи оманливого вмісту',
    '• suspicious or harmful profile links':
      '• підозрілих або шкідливих посилань у профілі',
    '• inappropriate media such as offensive pictures, gifs, avatars, or banners':
      '• недоречних медіа: образливих зображень, GIF, аватарів чи банерів',
    'on-topic focus:': 'За темою:',
    'keep conversations and content related to gaming. avoid off-topic discussions and use the appropriate channels for different topics or games.':
      'Тримайтеся ігрової теми. Уникайте офтопу й використовуйте відповідні канали для інших тем чи ігор.',
    'protect your privacy:': 'Бережіть приватність:',
    'refrain from sharing personal information or private content. protect both your own privacy and the privacy of others.':
      'Не діліться особистою інформацією чи приватним вмістом. Бережіть і власну приватність, і чужу.',
    'no nsfw content:': 'Без NSFW-вмісту:',
    'to maintain a safe and inclusive environment, any form of explicit, inappropriate, or nsfw content is strictly prohibited.':
      'Щоб середовище лишалося безпечним і відкритим для всіх, будь-який відвертий, недоречний чи NSFW-вміст суворо заборонено.',
    'no unauthorised promotion:': 'Без несанкціонованої реклами:',
    'do not promote or advertise contents, products, services, or other aion private servers without prior authorisation from the staff. advertising other private aion servers within the official origin aion discord server is strictly prohibited. we provide a free service and want to maintain a quality experience for all members.':
      'Не рекламуйте вміст, товари, послуги чи інші приватні сервери Aion без попереднього дозволу команди. Реклама інших приватних серверів Aion в офіційному Discord Origin Aion суворо заборонена. Ми надаємо безкоштовний сервіс і хочемо зберегти якість для всіх учасників.',
    'no sharing private content:': 'Без оприлюднення приватного:',
    'players are not allowed to publicly share private messages, images, screenshots, files, videos, or any other media on our platforms that is sensitive, private, or may offend, expose, or harm others.':
      'Гравцям заборонено публічно поширювати на наших майданчиках приватні повідомлення, зображення, знімки екрана, файли, відео чи інші медіа, які є конфіденційними, приватними або можуть образити, викрити чи зашкодити іншим.',
    'faction chat conduct (in-game megaphones & lfg):':
      'Поведінка у фракційному чаті (мегафони та LFG):',
    'faction chat and lfg are intended for faction-related communication only. do not use them to insult others or to negatively call out players by name, including through in-game megaphones, lfg, or any other communication channels.':
      'Фракційний чат і LFG призначені лише для спілкування в межах фракції. Не використовуйте їх, щоб ображати інших або негативно згадувати гравців поіменно — ні через мегафони, ні через LFG, ні через будь-які інші канали.',
    'no unnecessary tagging:': 'Без зайвих згадок:',
    'do not unnecessarily tag players or staff members in chat. if you need staff assistance, please open a support ticket or ask in general chat.':
      'Не згадуйте гравців чи команду в чаті без потреби. Якщо потрібна допомога, створіть тикет підтримки або запитайте в загальному чаті.',
    'respect towards staff:': 'Повага до команди:',
    'never insult any staff member, whether on discord (especially in tickets), in game, or anywhere else. every staff member volunteers their time and does their best for all of you. staff will always remain neutral, and you are expected to respect and follow their instructions.':
      'Ніколи не ображайте членів команди — ні в Discord (особливо в тикетах), ні в грі, ні деінде. Кожен із них витрачає свій час добровільно й робить усе можливе для вас. Команда завжди лишається нейтральною, а ви маєте поважати й виконувати її вказівки.',
    'loyalty policy:': 'Лояльність:',
    "if you disagree with a staff decision or action, please address it directly with the team by creating a ticket, rather than publicly damaging the server's reputation. origin aion is a volunteer-driven free project, and the staff is committed to doing their best for the community. we're open to feedback and will always try to find a fair solution through respectful communication.":
      'Якщо ви не згодні з рішенням команди, зверніться до неї напряму через тикет, а не шкодьте репутації сервера публічно. Origin Aion — безкоштовний проєкт на волонтерських засадах, і команда робить усе можливе для спільноти. Ми відкриті до відгуків і завжди шукатимемо справедливе рішення через шанобливу розмову.',
    'no refunding or account adjustments:': 'Без повернень і змін акаунта:',
    'adding or removing items, ap, or any other in-game stuff for players is not supported. no refunds, exchanges, or downgrades will be issued under any circumstances. changing race or other account-related changes are not offered, so please make sure to choose carefully before finalising your character.':
      'Ми не додаємо й не видаляємо предмети, AP чи будь-що інше в грі на прохання гравців. Повернень, обмінів чи знижень не буде за жодних обставин. Зміна раси та інші зміни акаунта не надаються, тож добре подумайте, перш ніж остаточно створити персонажа.',
    'enforcement:': 'Покарання:',
    'any violation of our rules may result in warnings, temporary mutes, kicks, or bans, depending on the severity and recurrence of the offense.':
      'Будь-яке порушення правил може призвести до попереджень, тимчасового блокування чату, виключення або бану — залежно від тяжкості та повторюваності.',

    /* ── Правила, переписані в листопаді 2026: дискримінація за вірою, реклама,
       повернення, спільні акаунти й RMT. Старі абзаци вище лишаються, якщо
       сайт поверне давнє формулювання. «Kinah» — «кинари», як у FAQ. ── */
    'real money trading (rmt), including buying or selling accounts, kinah, or items.':
      'Торгівля за реальні гроші (RMT), зокрема купівля чи продаж акаунтів, кинарів або предметів.',
    'bullying, harassment, or any form of discrimination based on race, ethnicity, religion, religious beliefs, gender, or any other characteristic will not be tolerated. religious intolerance, hate speech targeting any religion, and the deliberate mocking or harassment of individuals based on their faith are strictly prohibited. ensure your discord username and profile are appropriate. your in-game character name, legion name, and emblem must also be non-offensive and respectful.':
      "Цькування, переслідування чи будь-яка дискримінація за расою, етнічним походженням, релігією, релігійними переконаннями, статтю або іншою ознакою неприпустимі. Суворо заборонено релігійну нетерпимість, мову ворожнечі щодо будь-якої релігії та навмисне висміювання чи переслідування людей через їхню віру. Стежте, щоб ваше ім'я користувача й профіль у Discord були пристойними. Ім'я персонажа, назва легіону та емблема в грі теж мають бути шанобливими й нікого не ображати.",
    '• hate speech, slurs, or discriminatory language targeting any race, religion, belief, or group':
      '• мови ворожнечі, образливих прізвиськ чи дискримінаційних висловів щодо будь-якої раси, релігії, переконань або групи',
    '• mocking, insulting, or promoting hatred against any religion or religious belief':
      '• висміювання, образ чи розпалювання ненависті до будь-якої релігії або релігійних переконань',
    'to maintain a safe, respectful, and inclusive environment, all forms of explicit, inappropriate, or nsfw content are strictly prohibited. this includes, but is not limited to, gifs, images, videos, links, profile pictures, banners, usernames, and any other content shared in-game or on discord. content that is sexually explicit, graphic, offensive, or otherwise unsuitable for the community is not permitted.':
      'Щоб середовище лишалося безпечним, шанобливим і відкритим для всіх, будь-який відвертий, недоречний чи NSFW-вміст суворо заборонено. Це стосується, зокрема, GIF, зображень, відео, посилань, аватарів, банерів, імен користувачів та будь-якого іншого вмісту в грі чи в Discord. Відверто сексуальний, жорстокий, образливий чи іншим чином недоречний для спільноти вміст не допускається.',
    'do not promote or advertise content, products, services, or other aion private servers without prior staff authorisation. deliberate advertising of other private aion servers within the official origin aion discord is strictly prohibited. unintentional mentions without the intention to advertise are allowed. we provide a free service and want to maintain a quality experience for all members.':
      'Не рекламуйте вміст, товари, послуги чи інші приватні сервери Aion без попереднього дозволу команди. Навмисна реклама інших приватних серверів Aion в офіційному Discord Origin Aion суворо заборонена. Випадкові згадки без наміру рекламувати дозволено. Ми надаємо безкоштовний сервіс і хочемо, щоб усім учасникам було якісно й комфортно.',
    'faction chat conduct (lfg):': 'Поведінка у фракційному чаті (LFG):',
    'faction chats, including lfg, are intended for faction-related communication only. insults, harassment, or publicly calling out players by name in a negative manner are prohibited across all communication channels.':
      "Фракційні чати, зокрема LFG, призначені лише для спілкування в межах фракції. Образи, переслідування й публічне негативне згадування гравців на ім'я заборонені в усіх каналах спілкування.",
    'do not unnecessarily tag players or staff members. for staff assistance, open a support ticket in #ticket. if you have questions for the community, please ask in #origin-chat.':
      'Не згадуйте гравців чи команду без потреби. По допомогу команди звертайтеся через тикет підтримки в #ticket. Запитання до спільноти ставте в #origin-chat.',
    "insulting, harassing, spreading false rumours, making baseless accusations or false assumptions, attempting to damage staff members' reputations, or displaying hateful behaviour towards staff is strictly prohibited, whether on discord (especially in support tickets), in-game, or elsewhere.":
      'Суворо заборонено ображати й переслідувати членів команди, поширювати неправдиві чутки, висувати безпідставні звинувачення чи хибні припущення, намагатися зашкодити їхній репутації або виявляти до них ненависть — у Discord (особливо в тикетах підтримки), у грі чи деінде.',
    'if you have concerns or disagreements, address them respectfully through the appropriate channels or create a support ticket. staff members volunteer their time and do their best to support the community. all players are expected to treat staff respectfully and follow their instructions.':
      'Якщо маєте зауваження чи незгоду, висловлюйте їх шанобливо у відповідних каналах або створіть тикет підтримки. Члени команди витрачають свій час добровільно й роблять усе, щоб підтримати спільноту. Від усіх гравців очікуємо шанобливого ставлення до команди й дотримання її вказівок.',
    'those who fail to do so may face disciplinary action and will not be welcome in our community.':
      'Хто цього не дотримується, може бути покараний і не буде бажаним гостем у нашій спільноті.',
    'no refunding, compensation, or account adjustments:': 'Без повернень, компенсацій і змін акаунта:',
    'adding or removing items, ap, or any other in-game items for players is not supported. no refunds, exchanges, downgrades, compensation, or account adjustments will be issued under any circumstances. this includes entry resets and any requests to reset, restore, or reimburse entries for any reason.':
      'Ми не додаємо й не видаляємо предмети, AP чи будь-що інше в грі на прохання гравців. Повернень, обмінів, знижень, компенсацій чи змін акаунта не буде за жодних обставин. Це стосується й скидання входів, а також будь-яких прохань скинути, відновити чи відшкодувати входи з будь-якої причини.',
    'this does not apply to eligible shop purchases, which you can refund yourself from your purchase history within 24 hours.':
      'Це не стосується покупок у крамниці, які можна повернути: їх ви повертаєте самі в історії покупок протягом 24 годин.',
    'changes to race or other account-related details are not offered, so please make your choices carefully before finalising your character.':
      'Зміни раси чи інших даних акаунта не передбачено, тож добре зважте свій вибір, перш ніж остаточно створити персонажа.',
    'pvp instance participation (afk policy):': 'Участь у PvP-інстансах (правила щодо AFK):',
    'account sharing:': 'Спільне користування акаунтом:',
    'account sharing is punishable. accounts flagged by our detection system will receive a temporary ban while the case is reviewed. if there is no conclusive evidence of rmt, the account will receive a 1-day temporary ban. if there is conclusive evidence of rmt, the account will be permanently banned.':
      'Спільне користування акаунтом карається. Акаунти, позначені нашою системою виявлення, тимчасово блокуються на час розгляду. Якщо переконливих доказів RMT немає, акаунт отримує тимчасовий бан на 1 день. Якщо докази RMT переконливі, акаунт блокується назавжди.',
    'rmt (real money trading):': 'RMT (торгівля за реальні гроші):',
    'buying or selling accounts, kinah, or items for real money across any origin platform, including origin game, origin web, and official origin community channels, is strictly prohibited and remains permanently bannable. this also applies to attempts to buy or sell through other rmt servers or platforms. accounts suspected of rmt may be flagged and temporarily banned while the case is investigated.':
      'Купівля чи продаж акаунтів, кинарів або предметів за реальні гроші на будь-якому майданчику Origin — у грі, на сайті та в офіційних каналах спільноти — суворо заборонені й караються довічним баном. Це стосується й спроб купити чи продати через інші RMT-сервери або майданчики. Акаунти, підозрювані в RMT, можуть бути позначені й тимчасово заблоковані на час розслідування.',
    'account sharing vs. rmt:': 'Спільне користування акаунтом і RMT:',
    'if the login credentials remain unchanged, the case will be treated as account sharing rather than rmt, unless additional evidence proves otherwise. however, if an account was shared and the login credentials are changed in the following months, the account will be permanently banned.':
      'Якщо дані для входу лишилися незмінними, випадок вважають спільним користуванням, а не RMT, — хіба що додаткові докази свідчать про інше. Проте якщо акаунтом користувалися спільно, а в наступні місяці дані для входу змінили, акаунт блокується назавжди.',
    'evidence & investigations:': 'Докази й розслідування:',
    'our account-flagging system detects suspicious activity and applies temporary restrictions. staff will investigate each case before deciding on further action. players accused of rmt will have the opportunity to provide evidence. permanent rmt bans require conclusive evidence of real-money trading.':
      'Наша система позначення акаунтів виявляє підозрілу активність і накладає тимчасові обмеження. Перш ніж ухвалити подальше рішення, команда розслідує кожен випадок. Гравці, звинувачені в RMT, матимуть змогу надати докази. Для довічного бану за RMT потрібні переконливі докази торгівлі за реальні гроші.',
    'repeated account-sharing violations will result in progressively longer temporary bans and may ultimately lead to a permanent ban.':
      'За повторне спільне користування акаунтом тимчасові бани ставатимуть дедалі довшими, а зрештою можливий і довічний бан.',
    'these rules exist to protect fairness, account security, and the integrity of the origin community. we are not responsible for issues arising from shared accounts, including lost access, stolen items, or compromised security. accounts involved in sharing will not receive support.':
      'Ці правила захищають чесність, безпеку акаунтів і цілісність спільноти Origin. Ми не відповідаємо за проблеми, спричинені спільним користуванням акаунтом, зокрема втрату доступу, викрадені предмети чи порушену безпеку. Акаунти, причетні до спільного користування, не отримують підтримки.',

    'gameplay rules': 'Ігрові правила',
    'afk policy:': 'Правила щодо AFK:',
    'when solo queueing for a pvp instance, you are required to accept the entry request and actively participate once inside. going afk or intentionally leaving the instance is only permitted if the entire group agrees or if you are participating in a solo pvp instance.':
      'Ставши в чергу на PvP-інстанс поодинці, ви маєте прийняти запит на вхід і активно грати всередині. Піти в AFK чи навмисно залишити інстанс можна лише за згодою всієї групи або якщо це одиночний PvP-інстанс.',
    'dual client & multi-account rules:':
      'Правила щодо другого клієнта та кількох акаунтів:',
    'what you can do with dual client:': 'Що можна робити з другим клієнтом:',
    '• use dual clients for pve, events, and afk activity.':
      '• Використовувати другий клієнт для PvE, івентів та AFK-активності.',
    '• join or create pve groups or open-world groups, provided the group agrees beforehand.':
      '• Вступати в PvE-групи чи групи у відкритому світі або створювати їх, якщо група заздалегідь згодна.',
    '• power-level your own characters.': '• Прокачувати власних персонажів.',
    '• stay afk on dual clients to earn rewards.':
      '• Лишати другий клієнт в AFK заради нагород.',
    '• join solo or group events if the party agrees.':
      '• Брати участь в одиночних чи групових івентах, якщо група згодна.',
    '• you can participate in sieges. if you join an alliance, make sure the alliance leaders agree.':
      '• Брати участь в облогах. Якщо вступаєте в альянс, переконайтеся, що лідери альянсу не проти.',
    '• when using a spiritmaster for teleportation, the spiritmaster must remain online and visible for at least 1 minute afterward to avoid being mistaken for a cheater by staff or another player.':
      '• Якщо телепортуєтеся за допомогою заклинача, він має лишатися онлайн і видимим щонайменше 1 хвилину після цього, щоб команда чи інший гравець не сплутали вас із шахраєм.',
    'what you cannot do with dual client:': 'Чого не можна робити з другим клієнтом:',
    '• use dual clients for pvp against your own characters, regardless of faction or activity (open world, dredgion, siege, arena, etc).':
      '• Використовувати другий клієнт для PvP проти власних персонажів — незалежно від фракції та активності (відкритий світ, Дерадикон, облога, арена тощо).',
    '• control or use skills on both characters simultaneously during pvp. you must wait until the first character dies before controlling the second.':
      '• Керувати обома персонажами чи застосовувати їхні вміння одночасно під час PvP. Перш ніж керувати другим, дочекайтеся смерті першого.',
    '• complete quests, trade ap, or exploit mechanics between dual client accounts.':
      '• Виконувати завдання, передавати AP чи зловживати механіками між акаунтами другого клієнта.',
    'account sharing & rmt policy:':
      'Правила щодо передавання акаунтів і RMT:',
    '• account sharing is strictly prohibited. players must not share, lend, trade, or provide access to their accounts on any origin platform, including the origin game, origin web, or any official origin community channels.':
      '• Передавати акаунт суворо заборонено. Гравці не мають ділитися акаунтом, позичати, обмінювати чи надавати до нього доступ на жодному майданчику Origin — ні в грі, ні на сайті, ні в офіційних каналах спільноти.',
    '• rmt (real money trade) is forbidden. selling or buying accounts, kinah, or items, for real money is not allowed.':
      '• RMT (торгівля за реальні гроші) заборонена. Продавати чи купувати акаунти, кинари або предмети за реальні гроші не можна.',
    'any account found guilty of sharing or rmt will be permanently banned. evidence from all platforms is welcome. we will then conduct further investigations until we are 100% certain before banning any account.':
      'Акаунт, викритий у передаванні чи RMT, блокується назавжди. Ми вітаємо докази з будь-яких майданчиків. Перед блокуванням проводимо додаткову перевірку, доки не будемо впевнені на 100%.',
    'these rules exist to protect fairness, security, and the integrity of the origin community. we do not take responsibility for any issues arising from shared accounts, including lost access, stolen items, or compromised security. accounts involved in sharing will not receive support under any circumstances.':
      'Ці правила захищають чесність, безпеку й цілісність спільноти Origin. Ми не відповідаємо за наслідки передавання акаунта — втрату доступу, викрадені предмети чи зламану безпеку. Акаунти, причетні до передавання, не отримують підтримки за жодних обставин.',
    'exploiting and cheating software:': 'Зловживання й шахрайське ПЗ:',
    'using bugs, glitches, unintended mechanics, or any cheating software that provide an unfair advantage is strictly prohibited on our server. any player found abusing such issues or using cheating software, whether by using, sharing, or discussing exploits or cheats publicly or privately, will face immediate and permanent bans without warning.':
      'Використання багів, збоїв, непередбачених механік чи будь-якого шахрайського ПЗ, що дає нечесну перевагу, на нашому сервері суворо заборонено. Гравець, викритий у зловживанні ними або у використанні, поширенні чи обговоренні експлойтів і читів — публічно чи приватно — отримує негайний довічний бан без попередження.',
    'we maintain a zero-tolerance policy towards all forms of cheating. players who choose to exploit bugs or use unauthorised software should understand that this server is not the place for cheaters. all offenders will be thoroughly investigated and caught without exception. if you discover any bugs, exploits, or suspect cheating software usage, you are required to report it immediately via a ticket. maintaining a fair and competitive environment is a responsibility we all share.':
      'Ми дотримуємося нульової терпимості до будь-якого шахрайства. Хто зловживає багами чи використовує недозволене ПЗ, має розуміти: цей сервер не для шахраїв. Кожного порушника буде ретельно перевірено й викрито без винятків. Якщо ви знайшли баг, експлойт або підозрюєте використання читів, негайно повідомте про це через тикет. Чесне й змагальне середовище — спільна відповідальність.',
    'cheating undermines fair play, damages the community, and will never be tolerated here. report any issues to staff and avoid engaging in suspicious behaviour.':
      'Шахрайство руйнує чесну гру та шкодить спільноті — тут його ніколи не терпітимуть. Повідомляйте команді про проблеми й не вдавайтеся до підозрілих дій.',
    'use of approved third-party software and macros':
      'Дозволене стороннє ПЗ та макроси',
    'the following third-party tools are allowed:':
      'Дозволено такі сторонні інструменти:',
    '• approved macros': '• Схвалені макроси',
    'if you are unsure whether a specific tool or macro is permitted, please contact staff by making a ticket for clarification before use.':
      'Якщо ви не впевнені, чи дозволений певний інструмент або макрос, перед використанням створіть тикет і запитайте команду.',
    "players are responsible for ensuring that any software or macros they use comply with the server's fair play principles and do not violate any other server rules. any violation of this rule will result in immediate ban without warning.":
      'Гравці самі відповідають за те, щоб їхнє ПЗ і макроси відповідали принципам чесної гри та не порушували інших правил сервера. Порушення цього правила призводить до негайного бану без попередження.',

    /* ═════════════ ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ ════════════════════════════
       Розмітка така сама, як у правилах: <li><strong>Заголовок:</strong>
       текст</li>, тож ключів теж по два на пункт. Англійський оригінал
       лишається головним — це юридичний текст, і якщо адміни змінять
       формулювання, покажеться англійська, а не застарілий переклад.
    ═════════════════════════════════════════════════════════════════════ */

    'how we collect, use, and protect your personal information.':
      'Як ми збираємо, використовуємо та захищаємо ваші персональні дані.',
    'overview': 'Огляд',
    'origin aion ("we", "us", or "our") is committed to protecting your privacy. this privacy policy explains what information we collect when you use our services, how we use it, and the choices you have. by registering an account or using our website you agree to the practices described here.':
      'Origin Aion («ми», «нас», «наш») дбає про захист вашої приватності. Ця політика пояснює, які дані ми збираємо, коли ви користуєтеся нашими послугами, як ми їх використовуємо та який вибір маєте ви. Реєструючи акаунт або користуючись нашим сайтом, ви погоджуєтеся з описаними тут практиками.',

    'information we collect': 'Які дані ми збираємо',
    'account information:': 'Дані акаунта:',
    'when you register, we collect your username, email address, and a hashed version of your password. we never store passwords in plaintext.':
      'Під час реєстрації ми збираємо ваш нік, адресу електронної пошти та хешовану версію пароля. Ми ніколи не зберігаємо паролі у відкритому вигляді.',
    'technical data:': 'Технічні дані:',
    'we may log your ip address for security purposes such as detecting login abuse, enforcing rate limits, and preventing fraudulent activity.':
      'Ми можемо записувати вашу IP-адресу з міркувань безпеки: щоб виявляти зловживання входом, обмежувати частоту запитів і запобігати шахрайству.',
    'in-game data:': 'Ігрові дані:',
    'character names, progress, purchases, and other gameplay-related information are stored to operate the game service.':
      'Імена персонажів, прогрес, покупки та інші пов’язані з грою відомості зберігаються для роботи ігрового сервісу.',
    'communication data:': 'Дані листування:',
    'if you contact us via email or discord we retain those communications to respond to your enquiry and improve our support.':
      'Якщо ви пишете нам електронною поштою чи в Discord, ми зберігаємо це листування, щоб відповісти на ваш запит і покращити підтримку.',

    'how we use your information': 'Як ми використовуємо ваші дані',
    'to create and manage your account.': 'Щоб створювати ваш акаунт і керувати ним.',
    'to provide and maintain the game service.':
      'Щоб надавати й підтримувати ігровий сервіс.',
    'to process purchases and send transactional emails (e.g. email verification, password change confirmations).':
      'Щоб обробляти покупки й надсилати службові листи (підтвердження пошти, зміна пароля тощо).',
    'to detect and prevent abuse, cheating, or fraudulent activity.':
      'Щоб виявляти зловживання, читерство та шахрайство й запобігати їм.',
    'to communicate service updates, maintenance notices, and important announcements.':
      'Щоб повідомляти про оновлення сервісу, технічні роботи та важливі анонси.',

    'data sharing': 'Передавання даних',
    'we do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:':
      'Ми не продаємо, не обмінюємо й не передаємо ваші персональні дані третім сторонам, окрім таких випадків:',
    'when required by law or to comply with a legal obligation.':
      'Коли цього вимагає закон або потрібно виконати юридичний обов’язок.',
    'to protect the rights, safety, or property of origin aion, its users, or the public.':
      'Щоб захистити права, безпеку чи майно Origin Aion, його користувачів або громадськості.',
    'with service providers who assist us in operating our website under strict confidentiality agreements (e.g. email delivery services).':
      'З постачальниками послуг, які допомагають нам підтримувати роботу сайту за суворими угодами про конфіденційність (наприклад, служби доставки пошти).',

    'data retention': 'Зберігання даних',
    'we retain your account data for as long as your account is active or as needed to provide our services. if you wish to have your account and associated data deleted, please contact us through our discord support channel.':
      'Ми зберігаємо дані вашого акаунта, доки він активний або доки це потрібно для надання послуг. Якщо ви хочете видалити акаунт і пов’язані з ним дані, зверніться до нас у каналі підтримки в Discord.',

    'cookies': 'Файли cookie',
    'we use session cookies solely to keep you logged in during your visit. we do not use tracking, advertising, or analytics cookies. session cookies are removed when you close your browser or log out.':
      'Ми використовуємо сеансові файли cookie лише для того, щоб ви лишалися в акаунті під час візиту. Ми не використовуємо cookie для стеження, реклами чи аналітики. Сеансові cookie видаляються, коли ви закриваєте браузер або виходите з акаунта.',

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
    'orb': 'Орб',
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

  /* Назви — з STR_CLASS_NAME_* українських паків Origin, Riftshade і Destiny
     (у всіх трьох однакові), щоб сайт збігався з клієнтом. Ключі тут — англійські
     назви з сайту, а не ключі клієнта: у клієнті CLERIC і PRIEST переставлені
     (STR_CLASS_NAME_CLERIC — «Priest», Жрець; STR_CLASS_NAME_PRIEST — «Cleric», Цілитель). */
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
    'cleric': 'Цілитель',
    'chanter': 'Чародій',
    'gunner': 'Снайпер',
    'bard': 'Бард',
    'rider': 'Пілот',
    'aethertech': 'Пілот',
    'warrior': 'Воїн',
    'scout': 'Слідопит',
    'mage': 'Маг',
    'priest': 'Жрець',
    'technist': 'Інженер',
    'muse': 'Артист',
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
    ['orb', 'Орб'],
    ['skin', 'Скін'],
  ];

  /* ═══════════════════════ ШАБЛОНИ (regex) ════════════════════════════ */

  const MONTHS = {
    jan: 'січ.', feb: 'лют.', mar: 'бер.', apr: 'квіт.', may: 'трав.',
    jun: 'черв.', jul: 'лип.', aug: 'серп.', sep: 'вер.', oct: 'жовт.',
    nov: 'лист.', dec: 'груд.',
  };

  // Повні назви в родовому відмінку: «Востаннє оновлено 24 червня 2026».
  const MONTHS_GEN = {
    january: 'січня', february: 'лютого', march: 'березня', april: 'квітня',
    may: 'травня', june: 'червня', july: 'липня', august: 'серпня',
    september: 'вересня', october: 'жовтня', november: 'листопада',
    december: 'грудня',
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

    // «2 509 items» — лічильник над крамницею (число з вузьким пробілом).
    [/^(\d[\d,\s]*)\s+items?$/i,
      (m) => `${m[1].trim()} ${plural(toInt(m[1]), ['товар', 'товари', 'товарів'])}`],

    // Пагінація крамниці й слайдер головної: «Go to page 168», «Go to slide 2».
    [/^go\s+to\s+page\s+(\d+)$/i, (m) => `Перейти на сторінку ${m[1]}`],
    [/^go\s+to\s+slide\s+(\d+)$/i, (m) => `Перейти до слайда ${m[1]}`],

    /* ── Сезони: «Season II • FROSTFALL», «Season 2 Event lasting until 30/11/26.»,
       «Season 2: Frostfall is Now Live!». Назва сезону — власна, її не перекладаємо. ── */
    [/^season\s+([ivx]+|\d+)\s*•\s*(.+)$/i, (m) => `Сезон ${m[1].toUpperCase()} • ${m[2]}`],
    [/^season\s+(\d+)\s+event\s+lasting\s+until\s+(\d{1,2})\/(\d{1,2})\/(\d{2,4})\.?$/i,
      // День і місяць: якщо друге число > 12, сайт написав по-американськи (місяць/день) — міняємо місцями.
      (m) => { const [d, mo] = +m[3] > 12 ? [m[3], m[2]] : [m[2], m[3]];
        return `Подія ${m[1]}-го сезону триває до ${d.padStart(2, '0')}.${mo.padStart(2, '0')}.${m[4]}.`; }],
    [/^(origin\s+aion\s*[-–—]\s*)?season\s+(\d+):\s*(.+?)\s+is\s+now\s+live!?$/i,
      (m) => `${m[1] ? 'Origin Aion — ' : ''}Сезон ${m[2]}: ${m[3]} уже стартував!`],
    [/^season\s+(\d+):\s*([\d\/.]+)\s+([\d:]+)\s+(gmt\s*[+-]\s*\d+)\s+maintenance$/i,
      (m) => `Сезон ${m[1]}: ${m[2]} ${m[3]} ${m[4].toUpperCase().replace(/\s+/g, '')} — технічні роботи`],

    /* ── Новини: заголовки патчноутів і час техробіт мають сталий вигляд,
       тож шаблон перекладає й ті патчі, яких ще не було. ── */
    [/^origin\s+aion\s+([\d.]+)\s+patch\s+notes$/i,
      (m) => `Origin Aion ${m[1]} — нотатки оновлення`],
    [/^([\d\/.]+)\s+([\d:]+)\s+(gmt\s*[+-]\s*\d+)\s+maintenance$/i,
      (m) => `${m[1]} ${m[2]} ${m[3].toUpperCase().replace(/\s+/g, '')} — технічні роботи`],

    /* ── «Last updated 24 June 2026» і «Last updated March 24, 2026»:
       правила й політика конфіденційності пишуть дату по-різному. ── */
    [/^last\s+updated\s+(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i, (m) => {
      const mon = MONTHS_GEN[m[2].toLowerCase()];
      return mon ? `Востаннє оновлено ${toInt(m[1])} ${mon} ${m[3]}` : null;
    }],
    [/^last\s+updated\s+([a-z]+)\s+(\d{1,2}),\s*(\d{4})$/i, (m) => {
      const mon = MONTHS_GEN[m[1].toLowerCase()];
      return mon ? `Востаннє оновлено ${toInt(m[2])} ${mon} ${m[3]}` : null;
    }],

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
    // Без тире: «Administrator's Boon 7-Day Pass»
    [/^(.+?)\s+(\d+)-day\s+pass$/i, (m) => {
      const base = UI[norm(m[1])];
      return base ? `${base} — ${m[2]}-денний пас` : null;
    }],

    /* ── Eternity Pass: заголовок нагород, смуга досвіду й підписи шкали ── */
    [/^rewards\s*\(level\s*(\d+)\s*[–—-]\s*(\d+)\)$/i,
      (m) => `Нагороди (рівні ${m[1]}–${m[2]})`],
    [/^level\s+(\d+)\/(\d+)\s*[–—-]\s*total\s+exp:\s*([\d\s,]+)\s*•\s*exp\s+to\s+next:\s*([\d\s,]+)$/i,
      (m) => `Рівень ${m[1]}/${m[2]} — усього досвіду: ${m[3].trim()}` +
             ` • до наступного: ${m[4].trim()}`],
    [/^lv\.?\s*(\d+)$/i, (m) => `${m[1]} рів.`],

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
    const mo = new MutationObserver((records) => {
      if (!enabled) return;
      for (const r of records) {
        if (r.type === 'characterData') { scheduleRun(); return; }
        if (r.addedNodes.length) { scheduleRun(); return; }
        if (r.type === 'attributes') { scheduleRun(); return; }
      }
    });
    // На document-start <html> може ще не існувати — тоді стежимо за самим
    // документом. Присвоюємо observer лише після успіху: інакше boot() вирішив
    // би, що спостерігач уже працює, і після гідрації React (яка перемальовує
    // сторінку англійською) перекладу більше не було б.
    mo.observe(document.documentElement || document, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    });
    observer = mo;
  }

  function stopObserver() {
    if (!observer) return;
    observer.disconnect();
    observer = null;
  }

  function setEnabled(v) {
    enabled = v;
    saveState(v);
    // У крамниці назви прийшли з API й лежать у стані React — самим лише
    // поверненням тексту в DOM їх не змінити, тому перезавантажуємо.
    if (/^\/shop(\/|$)/.test(location.pathname)) { location.reload(); return; }
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

  /* ═════════════════ КРАМНИЦЯ: назви й описи товарів ══════════════════
     Картки крамниці React малює з відповіді /api/shop/items, тож підміняємо
     рядки саме там: далі сторінка сама малює вже український текст. Через
     DOM довелося б вгадувати будову картки й змагатися з перемальовуванням.

     Ключ — gameItemId, значення — [назва] або [назва, опис].
     Назви звірено з українським паком Origin (листопад 2026, 2509 товарів):
     якщо предмет є в паку, назва така сама, як у грі, крім виправлених
     русизмів, помилок роду й неперекладених рядків. Решту перекладено окремо;
     з 778 товарів листопада 2026 так складено 226 — за будовою паку й назвами
     сусідніх предметів того ж набору. Описи крамниці пише адміністрація сервера, у грі їх немає,
     тож їх перекладено з нуля.
  ══════════════════════════════════════════════════════════════════════ */

  const SHOP_ITEMS = {"100001114":["Солодка льодяник","Унікальний меч для зміни вигляду зброї."],"100001145":["Меч звичайного NPC"],"100001148":["Драконічний меч NPC (3.0)"],"100001149":["Меч Безодні NPC (3.0)"],"100001345":["Меч дикого кота"],"100001365":["Меч Тахабати (зовнішній вигляд)"],"100001366":["Меч табору Насан (зовнішній вигляд)"],"100001367":["Меч Атина (зовнішній вигляд)"],"100001368":["Меч Сурами (зовнішній вигляд)"],"100001376":["Унікальний меч NPC Тіамат"],"100001389":["Примарна катана"],"100001414":["Меч Шилліона (зовнішній вигляд)"],"100001416":["Меч бійця арени (зовнішній вигляд)"],"100001418":["Міфічний меч NPC Тіамат"],"100001423":["Нагородний меч божества NPC"],"100001462":["Атомарний розсікач"],"100001463":["Золотий меч"],"100001466":["Меч звичайної Безодні NPC"],"100001473":["Меч NPC давніх реліквій"],"100001516":["Меч NPC Тринієль"],"100001563":["[Івент] Кристал снігу - Меч","Зимовий меч. Змінити його вигляд можна в майстрів зовнішності у Святилищі чи Пандемоніумі."],"100001605":["Меч Камари (зовнішній вигляд)"],"100001609":["NPC 4.5 Меч звичайної Безодні"],"100001611":["NPC 4.5 Меч захисту підземелля"],"100001640":["Меч чуткої Марісси (зовнішній вигляд)"],"100001652":["Священний меч особливого командира стражників"],"100001656":["Меч вартового Тіамат (зовнішній вигляд)"],"100001659":["Світловий меч Даснайдера"],"100001665":["Світловий меч Йони"],"100001675":["Меч NPC посилення Рунадіума"],"100001683":["Меч Кунакса"],"100001684":["Дивовижний меч Атракси"],"100001685":["Вишуканий меч Грендаля"],"100001689":["Вишуканий меч Дайнатума"],"100001696":["Неперевершений меч Йормунганда"],"100001697":["Каталіумовий меч професіонала"],"100001708":["Трофейний меч вторгнення"],"100001717":["Меч великого серця"],"100001724":["[Івент] Меч Белонтайна"],"100001725":["[Івент] Меч Білого дня"],"100001754":["Бейсбольна бита"],"100001796":["Меч легата 55-го легіону"],"100001800":["Меч лорда Бритри"],"100001807":["Меч пісні шторму"],"100001814":["Сліпучий меч посланника"],"100001893":["Меч захисника Кайсинеля"],"100001937":["Глибоководний меч"],"100002052":["Меч радісного фонгоса"],"100002082":["Східний клинок"],"100002128":["Шляхетний меч Келіса"],"100002344":["Довгий меч стратника Каея"],"100009447":["Довгий меч полум'яного спасіння"],"100009448":["Булава полум'яного спасіння"],"100009449":["Кинджал полум'яного спасіння"],"100009450":["Орб полум'яного спасіння"],"100009451":["Гримуар полум'яного спасіння"],"100009452":["Дворучний меч полум'яного спасіння"],"100009453":["Спис полум'яного спасіння"],"100009454":["Посох полум'яного спасіння"],"100009455":["Лук полум'яного спасіння"],"100009950":["Гоблінський довгий меч"],"100009951":["Гоблінський кинджал"],"100009952":["Гоблінський дворучний меч"],"100009953":["Гоблінський спис"],"100009955":["Гоблінський посох"],"100009956":["Гоблінський гримуар"],"100009957":["Гоблінський орб"],"100009958":["Гоблінська булава"],"100009959":["Гоблінський лук"],"100009970":["Осяйний церемоніальний довгий меч командувача флоту Акана"],"100009971":["Осяйний церемоніальний лук командувача флоту Акана"],"100009972":["Осяйний церемоніальний посох командувача флоту Акана"],"100009973":["Осяйний церемоніальний спис командувача флоту Акана"],"100009974":["Осяйний церемоніальний дворучний меч командувача флоту Акана"],"100009975":["Осяйний церемоніальний гримуар командувача флоту Акана"],"100009976":["Осяйний церемоніальний орб командувача флоту Акана"],"100009977":["Осяйний церемоніальний кинджал командувача флоту Акана"],"100009978":["Осяйна церемоніальна булава командувача флоту Акана"],"100050033":["Легендарний довгий меч танцюючого багряного полум'я"],"100050106":["Піксельний меч"],"100050324":["Меч визволителя"],"100050326":["Холодна похмура лють"],"100099001":["Меч Чезуча"],"100099002":["Меч командира елітних аканів-стражів"],"100099003":["Меч Ракші"],"100099004":["Сяючий меч короля мудрих драконів"],"100099005":["Меч Татра"],"100099009":["Сяючий меч імператора крилатих драконів"],"100099011":["Меч короля білих драконів"],"100099013":["Меч короля темних драконів"],"100099014":["Прикраса Макрона"],"100099015":["Дорогоцінна прикраса Макрона"],"100099016":["Рідкісна прикраса Макрона"],"100099018":["Меч білої лілії"],"100099019":["Простий меч верховного магістра арени"],"100099020":["Меч Кешаса"],"100099021":["Меч Макиї"],"100099022":["Меч Ракші"],"100099024":["Меч Анурати"],"100099026":["Клинок Рудри"],"100099027":["Меч шурака-біженця"],"100099028":["Довгий меч Шепітної пані"],"100100405":["Бойовий молот генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100100406":["Бойовий молот генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100100613":["Закуска Сатьяна","Преміум-булава для зміни вигляду зброї."],"100100830":["Булава NPC стражів святості"],"100100853":["Срібний дзвоник","Унікальна булава для зміни вигляду зброї."],"100101024":["Булава дикого кота"],"100101043":["Бойовий молот Тахабати (зовнішній вигляд)"],"100101044":["Бойовий молот табору Насан (зовнішній вигляд)"],"100101045":["Бойовий молот Атина (зовнішній вигляд)"],"100101046":["Булава Сурами (зовнішній вигляд)"],"100101070":["Примарна секира"],"100101091":["Булава Шилліона (зовнішній вигляд)"],"100101093":["Булава бійця арени (зовнішній вигляд)"],"100101095":["Міфічна булава NPC Тіамат"],"100101108":["Нейтронний жезл"],"100101109":["Золота булава"],"100101112":["Булава звичайної Безодні NPC"],"100101118":["Булава підземного NPC"],"100101201":["[Івент] Кристал снігу - Булава","Зимова булава. Змінити її вигляд можна в майстрів зовнішності у Святилищі чи Пандемоніумі."],"100101224":["Біла булава NPC Бритри"],"100101233":["Булава Григоля (зовнішній вигляд)"],"100101236":["NPC 4.5 Булава звичайної Безодні"],"100101238":["NPC 4.5 Булава захисту підземелля"],"100101239":["Булава пірата"],"100101258":["Бойовий молот чуткої Марісси (зовнішній вигляд)"],"100101264":["Священний бойовий молот особливого командира стражників"],"100101268":["Бойовий молот вартового Тіамат (зовнішній вигляд)"],"100101273":["Булава NPC посилення Рунадіума"],"100101282":["Булава Кунакса"],"100101283":["Дивовижна булава Атракси"],"100101284":["Вишукана булава Грендаля"],"100101288":["Вишукана булава Дайнатума"],"100101295":["Відмінна булава Йормунганда"],"100101296":["Каталіумова булава професіонала"],"100101307":["Трофейна булава вторгнення"],"100101318":["[Івент] Булава Белонтайна"],"100101321":["[Івент] Булава Білого дня"],"100101387":["Булава легата 55-го легіону"],"100101389":["Мерехтлива насолода лорда балаурів"],"100101392":["Булава лорда Бритри"],"100101396":["Булава пісні шторму"],"100101400":["Сліпуча булава посланника"],"100101420":["Булава захисника Кайсинеля"],"100101534":["Булава радісного фонгоса"],"100101755":["Булава стратника Каея"],"100101764":["Піксельна булава"],"100101999":["Глибоководна булава"],"100150033":["Легендарна булава танцюючого багряного полум'я"],"100150080":["Лицарський кий"],"100150319":["Булава визволителя"],"100150321":["Холодна похмура радість"],"100199001":["Бойовий молот командира елітних аканів-стражів"],"100199003":["Булава шурака-біженця"],"100199005":["Булава білої лілії"],"100199006":["Булава Ракші"],"100199007":["Сяюча булава короля мудрих драконів"],"100199008":["Бойовий молот Татра"],"100199010":["Іграшка Кашурона"],"100199011":["Дорогоцінна іграшка Кашурона"],"100199012":["Рідка іграшка Кашурона"],"100199013":["Проста булава верховного магістра арени"],"100199014":["Булава Кешаса"],"100199015":["Булава Макиї"],"100199017":["Молот Девількарима"],"100199018":["Бойовий молот Рудри"],"100199019":["Бойовий молот спокою"],"100199020":["Булава Шепітної пані"],"100199021":["Сяюча булава імператора крилатих драконів"],"100199022":["Булава короля білих драконів"],"100199023":["Булава короля темних драконів"],"100200086":["Кинджал душі монстра"],"100200510":["Ніж генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100200511":["Ніж генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100200803":["Делікатес Ашкрима","Преміум-кинджал для зміни вигляду зброї."],"100200982":["Новий рік жах","Унікальний кинджал для зміни вигляду зброї."],"100201020":["Ніж звичайного NPC"],"100201023":["Драконічний ніж NPC (3.0)"],"100201024":["Ніж Безодні NPC (3.0)"],"100201186":["Кинджал дикого кота"],"100201211":["Кинджал Тахабати (зовнішній вигляд)"],"100201212":["Кинджал табору Насан (зовнішній вигляд)"],"100201214":["Кинджал Сурами (зовнішній вигляд)"],"100201232":["Примарний клинок"],"100201253":["Кинджал Шилліона (зовнішній вигляд)"],"100201255":["Кинджал бійця арени (зовнішній вигляд)"],"100201257":["Міфічний кинджал NPC Тіамат"],"100201258":["Нагородний кинджал божества NPC"],"100201271":["Нуклеотидний стилет"],"100201272":["Золотий кинджал"],"100201275":["Ніж звичайної Безодні NPC"],"100201281":["Ніж підземного NPC"],"100201282":["Ніж NPC давніх реліквій"],"100201367":["[Івент] Кристал снігу - Великий дворукий меч","Зимовий кинджал. Змінити його вигляд можна в майстрів зовнішності у Святилищі чи Пандемоніумі."],"100201407":["Кинджал Григоля (зовнішній вигляд)"],"100201412":["NPC 4.5 Кинджал звичайної Безодні"],"100201414":["NPC 4.5 Кинджал захисту підземелля"],"100201415":["Ніж пірата"],"100201433":["Кинджал чуткої Марісси (зовнішній вигляд)"],"100201439":["Священний кинджал особливого командира стражників"],"100201443":["Кинджал вартового Тіамат (зовнішній вигляд)"],"100201448":["Кинджал NPC посилення Рунадіума"],"100201453":["Кинджал NPC монстра Chapire 01"],"100201456":["Ніж Кунакса"],"100201457":["Дивний ніж Атракси"],"100201458":["Вишуканий ніж Грендаля"],"100201460":["Вишуканий ніж Дайнатума"],"100201467":["Відмінний кинджал Йормунганда"],"100201468":["Каталіумовий кинджал професіонала"],"100201479":["Трофейний кинджал вторгнення"],"100201481":["Ніж великого серця"],"100201488":["[Івент] Кинджал Белонтайна"],"100201489":["[Івент] Кинджал Білого дня"],"100201561":["Ніж легата 55-го легіону"],"100201562":["Мерехтлива жага вбивства лорда балаурів"],"100201565":["Ніж лорда Бритри"],"100201568":["Ніж пісні шторму"],"100201600":["Кинджал захисника Кайсинеля"],"100201639":["Величний кинджал Даєваніона"],"100201715":["Кинджал радісного фонгоса"],"100201767":["Шляхетний кинджал Келіса"],"100201937":["Кинджал стратника Каея"],"100201973":["Глибоководний кинджал"],"100250033":["Легендарний кинджал танцюючого багряного полум'я"],"100250104":["Піксельний кинджал"],"100250319":["Кинджал визволителя"],"100250321":["Холодна похмура кровожерливість"],"100299001":["Ніж командира елітних аканів-стражів"],"100299002":["Кинджал Ракші"],"100299003":["Сяючий ніж короля мудрих драконів"],"100299004":["Ніж Татра"],"100299007":["Сяючий кинджал імператора крилатих драконів"],"100299008":["Ніж короля білих драконів"],"100299009":["Кинджал короля темних драконів"],"100299010":["Закуска Снірона"],"100299011":["Дорогоцінна закуска Снірона"],"100299012":["Рідка закуска Снірона"],"100299014":["Ніж білої лілії"],"100299015":["Простий кинджал верховного магістра арени"],"100299016":["Ніж Кешаса"],"100299017":["Ніж Макиї"],"100299018":["Кинджал Ракші"],"100299020":["Кинджал Анурати"],"100299022":["Кинджал Рудри"],"100299023":["Кинджал шурака-біженця"],"100299024":["Кинджал Шепітної пані"],"100500007":["Орб душі монстра"],"100500401":["Орб генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100500402":["Орб генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100500867":["Райдужне новорічне різнобарв'я","Унікальний орб для зміни вигляду зброї."],"100500897":["Орб Безодні NPC (3.0)"],"100501053":["Орб Кромед (зовнішній вигляд)"],"100501054":["Орб Тахабати (зовнішній вигляд)"],"100501055":["Орб табору Насан (зовнішній вигляд)"],"100501056":["Орб Атина (зовнішній вигляд)"],"100501057":["Орб Сурами (зовнішній вигляд)"],"100501062":["Унікальний орб NPC Тіамат"],"100501081":["Примарний сюрикен"],"100501099":["Орб Шилліона (зовнішній вигляд)"],"100501101":["Орб бійця арени (зовнішній вигляд)"],"100501103":["Міфічний орб NPC Тіамат"],"100501104":["Нагородний орб божества NPC"],"100501115":["Геном деструкції"],"100501116":["Золотий орб"],"100501124":["Орб NPC Бритри"],"100501196":["[Івент] Кристал снігу - Орб","Зимовий орб. Змінити його вигляд можна в майстрів зовнішності у Святилищі чи Пандемоніумі."],"100501214":["Білий орб NPC Бритри"],"100501224":["Орб Рати (зовнішній вигляд)"],"100501226":["NPC 4.5 Орб звичайної Безодні"],"100501228":["NPC 4.5 Орб захисту підземелля"],"100501229":["Орб пірата"],"100501240":["Орб дикого кота"],"100501248":["Лютий самоцвіт Падмарашки"],"100501254":["Священний орб особливого командира варти"],"100501258":["Орб вартового Тіамат (зовнішній вигляд)"],"100501263":["Орб NPC посилення Рунадіума"],"100501269":["Орб Кунакса"],"100501270":["Дивовижний орб Атракси"],"100501271":["Вишуканий орб Грендаля"],"100501274":["Вишуканий орб Дайнатума"],"100501281":["Неперевершений орб Йормунганда"],"100501282":["Каталіумовий орб професіонала"],"100501293":["Трофейний орб вторгнення"],"100501295":["Орб великого серця"],"100501302":["[Івент] Орб Белонтайна"],"100501303":["[Івент] Орб Білого дня"],"100501354":["Орб легата 55-го легіону"],"100501355":["Мерехтлива зарозумілість лорда балаурів"],"100501356":["Орб лорда Бритри"],"100501360":["Орб пісні шторму"],"100501364":["Сліпучий орб посланника"],"100501380":["Орб захисника Кайсинеля"],"100501545":["Шляхетний орб Келіса"],"100501719":["Орб стратника Каея"],"100501911":["Глибоководний орб"],"100550033":["Легендарний орб танцюючого багряного полум'я"],"100550101":["Піксельний орб"],"100550315":["Орб визволителя"],"100550317":["Холодна похмура зверхність"],"100599002":["Орб Гуллара"],"100599003":["Орб Татра"],"100599004":["Орб Рудри"],"100599005":["Орб Ракші"],"100599006":["Орб Девількарима"],"100599007":["Сяючий орб короля мудрих драконів"],"100599008":["Орб командира елітних аканів-стражів"],"100599010":["Сяючий орб імператора крилатих драконів"],"100599011":["Орб короля білих драконів"],"100599012":["Орб короля темних драконів"],"100599014":["Брошка Дукірона"],"100599015":["Дорогоцінна брошка Дукірона"],"100599016":["Рідка брошка Дукірона"],"100599018":["Орб білої лілії"],"100599019":["Простий орб верховного магістра арени"],"100599020":["Орб Кешаса"],"100599023":["Орб спокою"],"100599024":["Орб радісного фонгоса"],"100599025":["Орб Шепітної пані"],"100600008":["Гримуар душі монстра"],"100600432":["Гримоар генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100600433":["Гримоар генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100600920":["Плита Монсе","Унікальний фоліант для зміни вигляду зброї."],"100600923":["Новорічна карта","Унікальний фоліант для зміни вигляду зброї."],"100600951":["Гримуар звичайного NPC"],"100601089":["Гримуар дикого кота"],"100601110":["Гримуар Тахабати (зовнішній вигляд)"],"100601111":["Гримуар табору Насан (зовнішній вигляд)"],"100601112":["Гримуар Атина (зовнішній вигляд)"],"100601113":["Гримуар Сурами (зовнішній вигляд)"],"100601118":["Унікальний гримуар NPC Тіамат"],"100601137":["Примарний манускрипт"],"100601155":["Гримуар Шилліона (зовнішній вигляд)"],"100601157":["Гримуар бійця арени (зовнішній вигляд)"],"100601159":["Міфічний гримуар NPC Тіамат"],"100601160":["Нагородний гримуар божества NPC"],"100601196":["Радіоактивний фоліант"],"100601197":["Золотий гримуар"],"100601205":["Гримуар NPC Бритри"],"100601286":["[Івент] Кристал снігу - Гримуар","Зимовий фоліант. Змінити його вигляд можна в майстрів зовнішності у Святилищі чи Пандемоніумі."],"100601306":["Білий гримуар NPC Бритри"],"100601329":["NPC 4.5 Гримуар звичайної Безодні"],"100601331":["NPC 4.5 Гримуар захисту підземелля"],"100601332":["Гримоар пірата"],"100601352":["Гримуар чуткої Марісси (зовнішній вигляд)"],"100601368":["Гримуар вартового Тіамат (зовнішній вигляд)"],"100601373":["Гримуар NPC посилення Рунадіума"],"100601379":["Гримуар Кунакса"],"100601380":["Дивний гримуар Атракси"],"100601381":["Вишуканий гримуар Грендаля"],"100601384":["Вишуканий гримуар Дайнатума"],"100601391":["Неперевершений гримуар Йормунганда"],"100601392":["Каталіумовий гримуар професіонала"],"100601405":["Трофейний гримуар вторгнення"],"100601411":["Гримуар великого серця"],"100601417":["[Івент] Гримуар Белонтайна"],"100601420":["[Івент] Гримуар Білого дня"],"100601471":["Гримуар легата 55-го легіону"],"100601472":["Мерехтлива недовіра лорда балаурів"],"100601473":["Гримуар лорда Бритри"],"100601477":["Гримуар пісні шторму"],"100601481":["Сліпучий гримуар посланника"],"100601499":["Гримуар захисника Кайсинеля"],"100601610":["Гримуар радісного фонгоса"],"100601657":["Шляхетний гримуар Келіса"],"100601823":["Гримуар стратника Каея"],"100601965":["Глибоководний гримуар"],"100650033":["Легендарний гримуар танцюючого багряного полум'я"],"100650102":["Піксельний гримуар"],"100650316":["Гримуар визволителя"],"100650318":["Холодна похмура недовіра"],"100699001":["Гримуар Гуллара"],"100699002":["Гримуар Рудри"],"100699003":["Гримуар Ракші"],"100699004":["Гримуар Девількарима"],"100699005":["Сяючий гримуар короля мудрих драконів"],"100699006":["Гримуар Татра"],"100699007":["Гримуар командира елітних аканів-стражів"],"100699010":["Сяючий гримуар імператора крилатих драконів"],"100699011":["Гримуар короля білих драконів"],"100699012":["Гримуар короля темних драконів"],"100699013":["Щоденник Тайрона"],"100699014":["Дорогоцінний щоденник Тайрона"],"100699015":["Рідкий щоденник Тайрона"],"100699017":["Гримуар білої лілії"],"100699018":["Простий гримуар верховного магістра арени"],"100699019":["Гримуар Кешаса"],"100699022":["Гримуар спокою"],"100699023":["Гримуар Шепітної пані"],"100900011":["Дворучний меч душі монстра"],"100900395":["Двосічний меч генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100900396":["Двосічний меч генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"100900681":["Інструмент Моошу","Преміум-дворучний меч для зміни вигляду зброї."],"100900850":["Новорічна ялинка","Унікальний дворучний меч для зміни вигляду зброї."],"100900876":["Дворучний меч звичайного NPC"],"100901037":["Дворучний меч дикого кота"],"100901057":["Дворучний меч Кромед (зовнішній вигляд)"],"100901059":["Дворучний меч Тахабати (зовнішній вигляд)"],"100901060":["Дворучний меч табору Насан (зовнішній вигляд)"],"100901061":["Дворучний меч Атина (зовнішній вигляд)"],"100901062":["Дворучний меч Сурами (зовнішній вигляд)"],"100901069":["Унікальний дворучний меч NPC Тіамат"],"100901088":["Примарний одати"],"100901107":["Дворучний меч Шилліона (зовнішній вигляд)"],"100901109":["Дворучний меч бійця арени (зовнішній вигляд)"],"100901111":["Міфічний дворучний меч NPC Тіамат"],"100901112":["Нагородний дворукий меч божества NPC"],"100901124":["Резонуючий палаш"],"100901125":["Золотий дворучний меч"],"100901134":["Дворучний меч підземного NPC"],"100901215":["[Івент] Кристал снігу - Дворукий меч","Зимовий дворучний меч."],"100901236":["Білий двосічний меч NPC Бритри"],"100901246":["Дворучний меч Рати (зовнішній вигляд)"],"100901248":["NPC 4.5 Двоствольний меч звичайної Безодні"],"100901250":["NPC 4.5 Дворучний меч захисту підземелля"],"100901253":["Піратський тесак-щогла"],"100901276":["Дворучний меч чуткої Марісси (зовнішній вигляд)"],"100901282":["Священний дворукий меч особливого командира варти"],"100901286":["Дворучний меч вартового Тіамат (зовнішній вигляд)"],"100901295":["Двосторонній меч NPC посилення Рунадіума"],"100901303":["Двосторонній меч NPC монстра Chapire 01"],"100901306":["Двосторонній меч Кунакса"],"100901312":["Дивний двосторонній меч Атракси"],"100901313":["Вишуканий двосторонній меч Грендаля"],"100901315":["Вишуканий двосторонній меч Дайнатума"],"100901322":["Відмінний двосічний меч Йормунганда"],"100901323":["Каталіумовий двосічний меч професіонала"],"100901342":["Трофейний дворучний меч вторгнення"],"100901353":["Двосторонній меч великого серця"],"100901360":["[Івент] Дворучний меч Белонтайна"],"100901363":["[Івент] Дворучний меч Білого дня"],"100901423":["Двосторонній меч легата 55-го легіону"],"100901424":["Мерехтлива ненависть лорда балаурів"],"100901427":["Похмура ненависть лорда балаурів"],"100901429":["Двосторонній меч пісні шторма"],"100901434":["Сліпучий дворучний меч посланника"],"100901455":["Дворучний меч захисника Кайсинеля"],"100901569":["Дворучний меч радісного фонгоса"],"100901626":["Шляхетний дворучний меч Келіса"],"100901771":["Дворучний меч стратника Каея"],"100901908":["Глибоководний дворучний меч"],"100950033":["Легендарний дворучний меч танцюючого багряного полум'я"],"100950101":["Піксельний дворучний меч"],"100950317":["Дворучний меч визволителя"],"100950319":["Холодна похмура ненависть"],"100999001":["Двосторонній меч командира елітних аканів-стражів"],"100999002":["Двосторонній меч Девількарима"],"100999003":["Двосторонній меч Рудри"],"100999004":["Дворучний меч Ракші"],"100999005":["Сяючий дворучний меч короля мудрих драконів"],"100999006":["Двосторонній меч Татра"],"100999009":["Сяючий дворукий меч імператора крилатих драконів"],"100999010":["Двосторонній меч короля білих драконів"],"100999011":["Дворучний меч короля темних драконів"],"100999012":["Акваріумна рибка Лурона"],"100999013":["Дорогоцінна рибка Лурона"],"100999014":["Рідка рибка Лурона"],"100999016":["Двосторонній меч білої лілії"],"100999017":["Простий дворучний меч верховного магістра арени"],"100999018":["Дворучний меч Кешаса"],"100999019":["Двосічний меч Макиї"],"100999022":["Дворучний меч шурака-біженця"],"100999024":["Дворучний меч Шепітної пані"],"101300007":["Спис душі монстра"],"101300387":["Спис генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"101300388":["Спис генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"101300652":["Знаряддя Антиана","Преміум-спис для зміни вигляду зброї."],"101300817":["Сяюча зірка","Унікальний спис для зміни вигляду зброї."],"101300980":["Спис дикого кота"],"101300991":["Сяюча зірка зі снігу","Спис незвичайного вигляду. Змінити вигляд зброї можна в майстрів зовнішності у Святилищі та Пандемоніумі."],"101300997":["Спис Тахабати (зовнішній вигляд)"],"101300998":["Спис табору Насан (зовнішній вигляд)"],"101301000":["Спис Сурами (зовнішній вигляд)"],"101301006":["Унікальне спис NPC Тіамат"],"101301025":["Примарне яри"],"101301044":["Спис Шилліона (зовнішній вигляд)"],"101301046":["Спис бійця арени (зовнішній вигляд)"],"101301048":["Міфічне Спис NPC Тіамат"],"101301049":["Нагородне Спис божества NPC"],"101301060":["Заряджений протазан"],"101301061":["Золоте спис"],"101301142":["[Івент] Кристал снігу - Спис","Зимовий спис. Змінити його вигляд можна в майстрів зовнішності у Святилищі чи Пандемоніумі."],"101301162":["Біле спис NPC Бритри"],"101301172":["NPC 4.5 Спис звичайної Безодні"],"101301174":["NPC 4.5 Спис захисту підземелля"],"101301175":["Спис пірата"],"101301191":["Спис чуткої Марісси (зовнішній вигляд)"],"101301193":["Зброя лева пекла"],"101301198":["Священне списо особливого командира стражників"],"101301202":["Спис вартового Тіамат (зовнішній вигляд)"],"101301207":["Спис NPC посилення Рунадіума"],"101301216":["Спис Кунакса"],"101301217":["Дивовижний спис Атракси"],"101301218":["Вишуканий спис Грендаля"],"101301220":["Вишуканий спис Дайнатума"],"101301227":["Видатне спис Йормунганда"],"101301228":["Каталіумове спис професіонала"],"101301245":["Трофейне спис вторгнення"],"101301247":["Спис великого серця"],"101301254":["[Івент] Коп'я Білого дня"],"101301312":["Спис легата 55-го легіону"],"101301313":["Мерехтлива жадібність лорда балаурів"],"101301316":["Спис лорда Бритри"],"101301319":["Спис пісні шторму"],"101301324":["Сліпучий спис посланника"],"101301343":["Спис захисника Кайсинеля"],"101301453":["Спис радісного фонгоса"],"101301470":["Східний ятаган"],"101301506":["Шляхетний спис Келіса"],"101301658":["Спис стратника Каея"],"101301955":["Глибоководний спис"],"101350033":["Легендарний спис танцюючого багряного полум'я"],"101350102":["Піксельне спис"],"101350317":["Спис визволителя"],"101350319":["Холодна похмура жадоба"],"101399001":["Спис командира елітних аканів-стражів"],"101399002":["Спис Ракші"],"101399003":["Коп'я Рудри"],"101399004":["Спис Девількарима"],"101399005":["Сяючий спис короля мудрих драконів"],"101399006":["Спис Татра"],"101399009":["Сяюче спис імператора крилатих драконів"],"101399010":["Спис короля білих драконів"],"101399011":["Спис короля темних драконів"],"101399012":["Вилка Еурона"],"101399013":["Дорогоцінне спис Еурона"],"101399014":["Рідкісне спис Еурона"],"101399016":["Спис білої лілії"],"101399017":["Простий спис верховного магістра арени"],"101399018":["Спис Кешаса"],"101399019":["Спис Макиї"],"101399022":["Спис спокою"],"101399023":["Спис Шепітної пані"],"101500008":["Палиця душі монстра"],"101500403":["Палиця генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"101500404":["Палиця генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"101500695":["Іграшка Дембера","Преміум-посох для зміни вигляду зброї."],"101500866":["Палиця NPC стражів святині"],"101500876":["Новорічний посох","Унікальний посох для зміни вигляду зброї."],"101500902":["Палиця звичайного NPC"],"101500906":["Палиця Безодні NPC (3.0)"],"101501052":["Палиця дикого кота"],"101501073":["Посох Кромед (зовнішній вигляд)"],"101501075":["Посох Тахабати (зовнішній вигляд)"],"101501076":["Посох табору Насан (зовнішній вигляд)"],"101501077":["Посох Атина (зовнішній вигляд)"],"101501078":["Посох Сурами (зовнішній вигляд)"],"101501084":["Унікальний посох NPC Тіамат"],"101501106":["Примарний бо"],"101501125":["Посох Шилліона (зовнішній вигляд)"],"101501127":["Посох бійця арени (зовнішній вигляд)"],"101501129":["Міфічний посох NPC Тіамат"],"101501130":["Нагородний посох божества NPC"],"101501141":["Розсіювач частинок"],"101501142":["Золотий посох"],"101501145":["Палиця звичайної Безодні NPC"],"101501151":["Посох підземного NPC"],"101501225":["[Івент] Кристал снігу - Палиця","Зимовий посох."],"101501250":["Білий посох NPC Бритри"],"101501258":["Посох Рати (зовнішній вигляд)"],"101501260":["NPC 4.5 Посох звичайної Безодні"],"101501262":["NPC 4.5 Посох захисту підземелля"],"101501263":["Палиця пірата"],"101501280":["Посох чуткої Марісси (зовнішній вигляд)"],"101501286":["Священний посох особливого командира стражників"],"101501290":["Посох вартового Тіамат (зовнішній вигляд)"],"101501295":["Посох NPC посилення Рунадіума"],"101501303":["Палиця NPC монстра Chapire 01"],"101501305":["Палиця Кунакса"],"101501306":["Дивовижна палиця Атракси"],"101501308":["Вишукана магічна палиця Грендаля"],"101501311":["Вишукана палиця Дайнатума"],"101501318":["Відмінний посох Йормунганда"],"101501319":["Каталіумовий посох професіонала"],"101501336":["Трофейний посох вторгнення"],"101501338":["Посох великого серця"],"101501345":["[Івент] Посох Белонтайна"],"101501346":["[Івент] Посох Білого дня"],"101501403":["Жезл легата 55-го легіону"],"101501404":["Мерехтлива гординя лорда балаурів"],"101501407":["Посох лорда Бритри"],"101501412":["Посох пісні шторма"],"101501417":["Сліпучий посох посланника"],"101501427":["Палиця господаря шторму"],"101501438":["Посох захисника Кайсинеля"],"101501555":["Посох радісного фонгоса"],"101501606":["Шляхетний посох Келіса"],"101501629":["Глибоководний посох"],"101501773":["Посох стратника Каея"],"101550033":["Легендарний посох танцюючого багряного полум'я"],"101550104":["Піксельний посох"],"101550320":["Посох визволителя"],"101550322":["Холодна похмура пиха"],"101599001":["Палиця командира елітних аканів-стражів"],"101599002":["Посох Рудри"],"101599003":["Квіти Псайрона"],"101599004":["Сяюча палиця короля мудрих драконів"],"101599005":["Сяюча палиця короля темних драконів"],"101599006":["Палиця білої лілії"],"101599007":["Палиця короля білих драконів"],"101599008":["Сяючий посох імператора крилатих драконів"],"101599009":["Рідкісні квіти Псайрона"],"101599010":["Дорогоцінні квіти Псайрона"],"101599011":["Посох Ракші"],"101599012":["Палиця Девількарима"],"101599013":["Палиця Татра"],"101599017":["Простий посох верховного магістра арени"],"101599018":["Палиця Кешаса"],"101599019":["Палиця Макиї"],"101599022":["Палиця спокою"],"101599023":["Посох Шепітної пані"],"101700020":["Лук душі монстра"],"101700416":["Довгий лук генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"101700417":["Довгий лук генерала асмодіан"],"101700719":["Опудало Шашрима","Преміум-лук для зміни вигляду зброї."],"101700723":["Лук NPC"],"101700726":["Лук юна NPC 01"],"101700892":["Новорічна вішалка","Унікальний лук для зміни вигляду зброї."],"101701061":["Лук дикого кота"],"101701073":["[Івент] Новорічна вішалка зі снігу","Лук незвичайного вигляду. Змінити вигляд зброї можна в майстрів зовнішності у Святилищі та Пандемоніумі."],"101701088":["Довгий лук Кромед (зовнішній вигляд)"],"101701089":["Довгий лук Тахабати (зовнішній вигляд)"],"101701090":["Лук табору Насан (зовнішній вигляд)"],"101701091":["Лук Афіна (зовнішній вигляд)"],"101701092":["Лук Сурами (зовнішній вигляд)"],"101701118":["Примарний юми"],"101701136":["Лук Шилліона (зовнішній вигляд)"],"101701138":["Лук бійця арени (зовнішній вигляд)"],"101701140":["Міфічний лук NPC Тіамат"],"101701141":["Нагородний лук божества NPC"],"101701159":["Біомеханічний самостріл"],"101701160":["Золотий лук"],"101701163":["Лук звичайної Безодні NPC"],"101701169":["Лук підземного NPC"],"101701247":["[Івент] Кристал снігу - Лук","Зимовий лук. Змінити його вигляд можна в майстрів зовнішності у Святилищі чи Пандемоніумі."],"101701273":["Лук Рати (зовнішній вигляд)"],"101701275":["Лук звичайної Безодні NPC 4.5"],"101701277":["NPC 4.5 Лук захисту підземелля"],"101701278":["Піратський лук-перевертень"],"101701299":["Лук чуткої Марісси (зовнішній вигляд)"],"101701305":["Священний лук особливого командира варти"],"101701309":["Довгий лук вартового Тіамат (зовнішній вигляд)"],"101701314":["Лук NPC посилення Рунадіума"],"101701320":["Лук Кунакса"],"101701321":["Дивовижний лук Атракси"],"101701322":["Вишуканий лук Грендаля"],"101701325":["Вишуканий лук Дайнатума"],"101701332":["Відмінний лук Йормунганда"],"101701333":["Каталіумовий лук професіонала"],"101701344":["Трофейний лук вторгнення"],"101701348":["Лук великого серця"],"101701355":["[Івент] Лук Белонтайна"],"101701358":["[Івент] Лук Білого дня"],"101701407":["Лук легата 55-го легіону"],"101701408":["Мерехтливі ревнощі лорда балаурів"],"101701409":["Лук лорда Бритри"],"101701413":["Лук пісні шторму"],"101701419":["Сліпучий лук посланника"],"101701436":["Лук захисника Кайсинеля"],"101701550":["Лук радісного фонгоса"],"101701574":["Східний лук"],"101701609":["Шляхетний лук Келіса"],"101701756":["Лук стратника Каея"],"101701946":["Глибоководний лук"],"101750033":["Легендарний лук танцюючого багряного полум'я"],"101750102":["Піксельний лук"],"101750316":["Лук визволителя"],"101750318":["Холодні похмурі ревнощі"],"101799001":["Довгий лук командира елітних аканів-стражів"],"101799002":["Сяючий лук короля мудрих драконів"],"101799003":["Довгий лук Рудри"],"101799004":["Довгий лук Ракші"],"101799005":["Довгий лук Девількарима"],"101799006":["Довгий лук Татра"],"101799010":["Сяючий лук імператора крилатих драконів"],"101799011":["Лук короля білих драконів"],"101799012":["Лук короля темних драконів"],"101799013":["Інструмент Хударона"],"101799014":["Дорогоцінний інструмент Хударона"],"101799015":["Рідкісний інструмент Хударона"],"101799017":["Лук білої лілії"],"101799018":["Простий лук верховного магістра арени"],"101799019":["Лук Кешаса"],"101799022":["Лук шурака-біженця"],"101799023":["Довгий лук спокою"],"101799024":["Лук Шепітної пані"],"110000018":["Нагрудник лісового фофоку"],"110000050":["Куртка радісного фонгоса"],"110000062":["Куртка зоряного кролика"],"110101253":["Тканинний нагрудник скарбниці Балауреї (NPC)"],"110101285":["Тканинний нагрудник Балік 3.0 (NPC)"],"110101286":["Тканинний нагрудник Безодні 3.0 (NPC)"],"110101288":["Тканинний нагрудник реянців (NPC)"],"110101370":["Тканинний нагрудник героя Другого Вознесіння (NPC)"],"110101464":["Тканинний нагрудник домашньої туніки (NPC)"],"110101491":["Тканинний нагрудник Вейл"],"110101492":["Тканинний нагрудник Мастаріуса"],"110101493":["Тканинний нагрудник Берітри 01A (NPC)"],"110101506":["Тканинний нагрудник Берітри (NPC)"],"110101696":["Нагрудник Сновиди"],"110101737":["Тканинний нагрудник польоту Асеріона"],"110101816":["Тканинний нагрудник великого вторгнення"],"110101896":["Тканинний нагрудник чорного полум'я"],"110101927":["Тканинний нагрудник NPC 65 Даєваніона"],"110102320":["Тканинна туніка майстра-жнеця"],"110107487":["Міцний нагрудник запеклої вирішальної битви"],"110107488":["Нагрудник запеклої вирішальної битви"],"110111491":["Нагрудник Люмінес","Лише для жінок."],"110199001":["Тканинний нагрудник старійшини юнів"],"110199002":["Тканинний нагрудник мудрого радника"],"110199003":["Величний тканинний нагрудник Йормунганда"],"110199004":["Тканинний нагрудник нефіліма"],"110301185":["Шкіряний нагрудник скарбниці Балауреї (NPC)"],"110301212":["Шкіряний нагрудник Балік 3.0 (NPC)"],"110301213":["Шкіряний нагрудник Безодні 3.0 (NPC)"],"110301215":["Шкіряний нагрудник реянців (NPC)"],"110301297":["Шкіряний нагрудник героя Другого Вознесіння (NPC)"],"110301374":["Шкіряний нагрудник домашньої туніки (NPC)"],"110301399":["Шкіряний нагрудник Вейл"],"110301400":["Шкіряний нагрудник Мастаріуса"],"110301401":["Шкіряний нагрудник Берітри 01A (NPC)"],"110301407":["Шкіряний нагрудник Берітри (NPC)"],"110301739":["Шкіряна куртка польоту Асеріона"],"110301796":["Шкіряний нагрудник великого вторгнення"],"110301889":["Шкіряний нагрудник чорного полум'я"],"110301924":["Шкіряний нагрудник NPC 65 Даєваніона"],"110399001":["Шкіряний нагрудник нефіліма"],"110399002":["Шкіряний нагрудник мудрого радника"],"110399003":["Величний шкіряний нагрудник Йормунганда"],"110501159":["Кольчужний нагрудник скарбниці Балауреї (NPC)"],"110501190":["Кольчужний нагрудник Балік 3.0 (NPC)"],"110501191":["Кольчужний нагрудник Безодні 3.0 (NPC)"],"110501193":["Кольчужний нагрудник реянців (NPC)"],"110501275":["Кольчужний нагрудник героя Другого Вознесіння (NPC)"],"110501349":["Кольчужний нагрудник домашньої туніки (NPC)"],"110501374":["Кольчужний нагрудник Вейл"],"110501375":["Кольчужний нагрудник Мастаріуса"],"110501376":["Кольчужний нагрудник Берітри 01A (NPC)"],"110551069":["Кольчужний нагрудник великого вторгнення"],"110551076":["Кольчужний нагрудник польоту Асеріона"],"110551222":["Кольчужний нагрудник чорного полум'я"],"110551265":["Кольчужний нагрудник NPC 65 Даєваніона"],"110599001":["Кольчужний нагрудник мудрого радника"],"110599002":["Величний кольчужний нагрудник Йормунганда"],"110599003":["Кольчужний нагрудник нефіліма"],"110601132":["Латний нагрудник скарбниці Балауреї (NPC)"],"110601159":["Латний нагрудник Балік 3.0 (NPC)"],"110601160":["Латний нагрудник Безодні 3.0 (NPC)"],"110601162":["Латний нагрудник реянців (NPC)"],"110601245":["Латний нагрудник героя Другого Вознесіння (NPC)"],"110601322":["Латний нагрудник домашньої туніки (NPC)"],"110601348":["Латний нагрудник Вейл"],"110601349":["Латний нагрудник Мастаріуса"],"110601350":["Латний нагрудник Берітри 01A (NPC)"],"110601541":["Латний нагрудник польоту Асеріона"],"110601599":["Латний нагрудник великого вторгнення"],"110601680":["Латний нагрудник чорного полум'я"],"110601717":["Латний нагрудник NPC 65 Даєваніона"],"110699001":["Величний латний нагрудник Йормунганда"],"110699003":["Латний нагрудник мудрого радника"],"110699004":["Латний нагрудник нефіліма"],"110900083":["Костюм дебра","Костюм у вигляді рібіта. Вдягніть його в комірку куртки. Предмет можна фарбувати."],"110900112":["Нагрудник блазня"],"110900113":["Нагрудник кулуса"],"110900116":["Милий купальник","Милий і чарівний купальничок."],"110900117":["Бікіні","Гарячий купальник для спекотного дня біля гарячих джерел — чи будь-де, де вам хочеться жару."],"110900118":["Красивий купальник","Звабливий і розкішний купальник."],"110900119":["Зухвала джинсова сукня","Ефектна джинсова сукня, яку вдягали Сонє та Лім у танцювальному номері «2DT» гурту Wonder Girls."],"110900120":["Переливна джинсова сукня","Яскрава джинсова сукня, яку вдягала Єин у танцювальному номері «2DT» гурту Wonder Girls."],"110900121":["Мила джинсова сукня","Мила джинсова сукня, яку вдягали Сохі та Юбін у танцювальному номері «2DT» гурту Wonder Girls."],"110900122":["Комплект Tell Me","Мила сорочка та спідниця з рюшами з танцю «Tell Me» гурту Wonder Girls."],"110900123":["Сукня Nobody","Сукня в ретростилі з танцю «Nobody» гурту Wonder Girls."],"110900124":["Блискучий брючний комплект","Лише для чоловіків"],"110900135":["Благословенна весільна сукня"],"110900136":["Шорти з лисим хвостом","Лише для жінок"],"110900137":["Смугаста балетна пачка","Смугаста балетна сукня гурту Miss A."],"110900138":["Костюм крутого хлопця","Лише для чоловіків"],"110900139":["Костюм мага","Мантія, яку полюбляють чарівники."],"110900140":["Святкове вбрання","Святковий костюм до Дня дев."],"110900166":["Нагрудник зі срібного хутра тару"],"110900171":["Нагрудник мага"],"110900177":["Новорічна туніка","Обмежена серія! Ця туніка — саме те, що треба на Новорічне свято."],"110900190":["Біла матроска","Поверніться в найкращі дні дитинства в цьому милому костюмі матроски."],"110900211":["Корейське вбрання","Гарне церемоніальне вбрання."],"110900212":["Костюм забороненого кохання","Вбрання для тих, хто в забороненому коханні."],"110900213":["Костюм розлуки","Вбрання для тих, у кого розбите серце."],"110900215":["Вишукана шкільна форма","Шикарне вбрання для вельми освічених."],"110900216":["Акуратна шкільна форма","Вбрання для справді вишуканої деви."],"110900223":["Спортивний костюм","Спортивний костюм для тренувань, кепка в комплекті."],"110900230":["Охайний морський костюм","Охайний морський образ."],"110900231":["Модний морський костюм","Свіжий морський образ."],"110900232":["Фестивальне вбрання до Дня дітей","Відсвяткуйте Коїнобори в цьому святковому костюмі."],"110900242":["Футболка «Моя любов»","Парна сорочка для закоханих."],"110900243":["Футболка «Люблю тебе»","Парна сорочка для закоханих."],"110900244":["Футболка «Я належу тобі»"],"110900245":["NPC Вбрання помічника елійського дому рангу S","Лише для елійців; лише для жінок."],"110900246":["NPC Вбрання помічника асмодійського дому рангу S","Лише для асмодіан; лише для жінок."],"110900247":["NPC Вбрання помічника елійського дому рангу A","Лише для елійців; лише для чоловіків."],"110900248":["NPC Вбрання помічника асмодійського дому рангу A","Лише для асмодіан; лише для чоловіків."],"110900249":["NPC Вбрання помічника елійського дому рангу B","Лише для елійців; лише для чоловіків."],"110900250":["NPC Вбрання помічника асмодійського дому рангу B","Лише для асмодіан; лише для чоловіків."],"110900251":["NPC Вбрання вищого ґатунку для елійського дому","Лише для елійців."],"110900252":["NPC Вбрання вищого ґатунку для асмодійського дому","Лише для асмодіан."],"110900253":["NPC Звичайне вбрання для елійського дому","Лише для елійців."],"110900254":["NPC Звичайне вбрання для асмодійського дому","Лише для асмодіан."],"110900256":["Одяг_NPC_Гарнон","Лише для елійців; лише для жінок."],"110900260":["Нагрудник барда (NPC)"],"110900267":["Нагрудник з Дивокраю"],"110900318":["Новорічна туніка","Охайне новорічне вбрання без зайвих прикрас."],"110900326":["NPC_Костюм_Ривар","Лише для елійців; лише для чоловіків."],"110900335":["Вбрання торговця (NPC)"],"110900340":["Вбрання солодкої парочки","Приголомшливе вбрання, яке деви часто вдягають зі своєю половинкою."],"110900342":["Вбрання щасливої пари","Чудове святкове вбрання для щасливих пар."],"110900344":["Морський костюм","Куртка, яка, подейкують, виконує бажання."],"110900348":["Вбрання для вечірки","Особлива сукня чи костюм для ефектних наречених."],"110900353":["Охайна уніформа слуги","Охайна форма кафе «Бракс»."],"110900357":["Мила уніформа слуги","Модне вбрання для таверни."],"110900368":["Водолазний костюм","Водолазний костюм, що витримує найбільші глибини."],"110900382":["Кавалерійський мундир: нагрудник"],"110900384":["Примарний бойовий костюм","Форма для дев, які мріють стати Тіньовим привидом."],"110900386":["Латний нагрудник Драконових пут"],"110900387":["Кольчужний нагрудник Драконових пут"],"110900388":["Шкіряний нагрудник Драконових пут"],"110900389":["Тканинний нагрудник Драконових пут"],"110900399":["Дзеркальний комбінезон"],"110900400":["Латний обладунок величі"],"110900401":["Шкіряний обладунок величі"],"110900402":["Мантия величі"],"110900403":["Золоті обладунки"],"110900404":["Леопардовий костюм"],"110900405":["Спокусливий костюм медсестри","Лише для жінок"],"110900406":["Костюм медсестри","Лише для жінок"],"110900407":["Костюм лікаря"],"110900408":["Утончений зимовий стиль"],"110900412":["Футболка Тіамат"],"110900413":["Футболка Ракші"],"110900414":["Футболка милого перевертня"],"110900420":["Відвертий костюмчик"],"110900431":["Костюм кролика"],"110900432":["Костюм єнота"],"110900433":["Рожевий костюм кішки"],"110900434":["Сірий костюм кішки"],"110900435":["Рожевий костюм кролика"],"110900436":["Сірий костюм кролика"],"110900437":["Рожевий костюм єнота"],"110900438":["Сірий костюм єнота"],"110900439":["Костюм кішки"],"110900447":["Красиве бікіні","Відпочивайте на пляжі в доречному вбранні."],"110900448":["Стильне бікіні","Відпочивайте на пляжі в доречному вбранні."],"110900452":["Прозоре вбрання","Розкішне легке вбрання."],"110900469":["Модна білизна","Костюм для сну «Світанок»."],"110900476":["Темне білизна","Костюм для сну «Сутінки»."],"110900482":["[Івент] Форма 'NC Дино'","Форма команди NC Dinos."],"110900484":["Розкішне вбрання","Ефектне святкове вбрання для стильних самітників."],"110900485":["Романтичне вбрання","Ошатне святкове вбрання для самотніх дев."],"110900486":["Вбрання в горошок","Костюм плямистої змії"],"110900487":["Примхливий кринак","Костюм райдужної змії"],"110900488":["Смужки і жала","Костюм бірюзової змії"],"110900505":["Костюм на Іванов день","Легке вбрання роботи Іванкупали."],"110900507":["Красиве вбрання Аріате","Лише для жінок"],"110900508":["Танцювальне вбрання"],"110900509":["Клубний костюм","Блискучий одяг."],"110900523":["Вбрання капітана піратів","Вбрання капітана піратів."],"110900530":["Вбрання піратської команди","Гардероб члена піратської команди."],"110900537":["Викликаючі леопардові лосини","Леопардовий костюм на спеку."],"110900538":["Леопардове одягання","Леопардовий костюм на мороз."],"110900551":["Леопардовий купальник","Купальник із леопардовим принтом."],"110900552":["Смугастий купальник","Модний купальний одяг на літній сезон."],"110900558":["Костюм небесного лева"],"110900559":["Костюм лева пекла"],"110900560":["Латний нагрудник Забутої Безодні"],"110900561":["Кольчужний нагрудник Забутої Безодні"],"110900562":["Шкіряний нагрудник Забутої Безодні"],"110900563":["Тканинний нагрудник Забутої Безодні"],"110900564":["Латний нагрудник Первісного Духа"],"110900565":["Кольчужний нагрудник Первісного Духа"],"110900566":["Шкіряний нагрудник Первісного Духа"],"110900567":["Тканинний нагрудник Первісного Духа"],"110900569":["Нове корейське вбрання принца/принцеси"],"110900571":["Костюм капітана Харлока","Вбрання капітана Харлока."],"110900578":["Костюм Кей","Вбрання Кей."],"110900584":["Латний нагрудник вартового Тіамат"],"110900585":["Кольчужний нагрудник вартового Тіамат"],"110900586":["Шкіряний нагрудник вартового Тіамат"],"110900587":["Тканинний нагрудник вартового Тіамат"],"110900589":["Елегантна весільна сукня","Елегантне вбрання для особливого дня"],"110900596":["Чудова весільна сукня","Розкішне вбрання для особливого дня."],"110900603":["Звичайна форма поліцейського","Форма охоронця закону."],"110900610":["Костюм сноубордиста"],"110900630":["Симпатичний костюм сноубордиста"],"110900638":["Чарівна шкільна форма","Чарівна форма."],"110900645":["Плащ","Простий плащ."],"110900652":["Спортивний костюм майстра кунг-фу","Костюм для тренувань із бойових мистецтв."],"110900659":["Костюм майстра кунг-фу","Бойовий костюм для двобоїв."],"110900666":["Стильний костюм Діда Мороза","Вишуканий плащ до свята. Веселих свят!"],"110900673":["Розкішний костюм"],"110900682":["Бальне вбрання","Сукня або костюм на згадку про бал"],"110900688":["Миле новорічне вбрання","Пухкий костюм сніговика."],"110900696":["Костюм вершника"],"110900703":["Вбрання з квітковим візерунком"],"110900710":["Вбрання кольору хакі"],"110900717":["[Перевтілення] Костюм великого серця"],"110900731":["Стимпанковий костюм"],"110900737":["Червона зимова куртка"],"110900738":["Синя зимова куртка"],"110900739":["[Івент] Корейське традиційне вбрання"],"110900740":["[Івент] Костюм Белонтайна"],"110900742":["Чарівна сукня"],"110900748":["Костюм моряка"],"110900762":["Сукня з корсетом"],"110900763":["Охайне вбрання дворянина"],"110900764":["Сучасне вбрання"],"110900771":["Клубний ретро-костюм"],"110900830":["Розкішне космічне вбрання"],"110900842":["Відверта форма покоївки"],"110900863":["Костюм дорогого гостя"],"110900864":["Миле традиційне вбрання"],"110900865":["Вбрання дорогого гостя"],"110900866":["Гарбуз до Хелловіну"],"110900867":["Вбрання місячного кролика"],"110900869":["Вбрання павича"],"110900870":["Вбрання милого кролика"],"110900873":["Спокуслива сорочка","Лише для жінок."],"110900876":["Мила сумка шиго"],"110900882":["Броня безсмертного лицаря"],"110900900":["Вбрання хіпстера Гонрьонпо"],"110900901":["Яскравий купальник"],"110900905":["Костюм для пробіжки"],"110900906":["Костюм Червоної Шапочки","Що ж, вирушаємо до бабусиної хати... Змінює вигляд під час бою."],"110900908":["[Івент] Звірина піжама","Комплект милої піжами!"],"110900909":["Одяг «Пісня хвилі»"],"110900958":["Одеяние господаря шторму"],"110900989":["Душа ченця"],"110901000":["Одяг у Країні чудес","Лише для жінок."],"110901002":["Костюм заколдованого демона"],"110901008":["Костюм лісника"],"110901011":["Сукня з пелюсток","Лише для жінок."],"110901014":["Костюм похмурого жнеця"],"110901017":["Костюм легіону"],"110901020":["Відвертий халатик"],"110901021":["Одяг чорного лебедя"],"110901022":["Стимпанковий костюм"],"110901024":["Шипасте вбрання"],"110901025":["Костюм модної акули"],"110901026":["Костюм капелюшника","Лише для чоловіків."],"110901041":["Повсякденний костюм"],"110901047":["Вінтажна джинсовка"],"110901053":["Яскравий літній костюм"],"110901057":["Одяг від кутюр"],"110901058":["Акуратна шкільна форма"],"110901060":["Залізне тіло"],"110901063":["Легендарний костюм боксера"],"110901066":["Товстий светр"],"110901069":["Красивий спортивний костюм"],"110901072":["Корейське придворне вбрання"],"110901076":["Непромокаємий плащ жаби"],"110901080":["Мила піжама"],"110901081":["[Жакунерк] Стильна шкільна уніформа"],"110901082":["[Івент] Матроський купальник"],"110901083":["Костюм гонщика"],"110901084":["Готичний парний костюм"],"110901085":["Стильний костюм Діда Мороза"],"110901086":["[Івент] Однострій APL"],"110901087":["Сукня для щасливого весілля"],"110901089":["Лис"],"110901090":["Милий лис (фарбується)"],"110901091":["Милий кремовий лис (фарбується)"],"110901092":["Милий бурий лис (фарбується)"],"110901093":["Накидка Безсмертного Охоронця Храму"],"110901101":["Сліпучий літній купальник (фарбується)","Сліпучий літній купальник, який можна фарбувати в різні кольори."],"110901103":["Одяг вічного бійця"],"110901106":["Костюм динозавра"],"110901115":["Триколірний кіт"],"110901116":["Сіамський кіт"],"110901120":["Татуйований купальник"],"110901128":["Затишний ханбок"],"110901129":["Елегантний ханбок дев'ятихвостого лиса","Елегантний ханбок дев'ятихвостої лисиці."],"110901130":["Синій дівочий ханбок"],"110901132":["[Івент] Шкільна форма «Літній бриз»"],"110901133":["Ковбойський одяг"],"110901134":["Вбрання синьої пташки"],"110901135":["Вантажний одяг"],"110901136":["[Івент] Статечний однострій вартового"],"110901137":["Одяг чарівника з країни Оз","Лише для жінок."],"110901138":["Милий одяг дворецького"],"110901139":["Яскравий одяг сукаджан"],"110901390":["Мундир адмірала","Стильний мундир адмірала."],"110901391":["Елегантний купальник"],"110901392":["Ханбок у вуличному стилі"],"110901393":["Шурхотливий ханбок"],"110901396":["Костюм дихання осені"],"110901475":["Костюм чумного лікаря"],"110901878":["Клітчастий комбінезон"],"110901879":["Вбрання милого хлопця","Лише для чоловіків."],"110901880":["Костюм водного фестивалю"],"110901881":["Вражаючий купальник","Легке струмливе шифонове вбрання, у якому ви — зірка пляжу"],"110901882":["Сміливий шкіряний одяг"],"110901886":["Готичний костюм лоліти","Вигадливе вбрання готичної лоліти, що змінює вигляд у спокої та в бою."],"110901900":["Ведмежий одяг (гавайський)"],"110901901":["Ведмежий одяг (крижаний)"],"110901902":["Ведмежий одяг (желейний)"],"110901903":["Ведмежий одяг (панда)"],"110901904":["Ведмежий одяг (панда в капелюсі)"],"110901905":["Ведмежий одяг (ведмедик)"],"110901920":["Пінгвінячий одяг «Гаваї»"],"110901921":["Пінгвінячий одяг «Татуювання»"],"110901923":["Пінгвінячий одяг «Блискучий білий»"],"110901925":["Пінгвінячий одяг «Блискуче золото»"],"110901928":["Вогняний пінгвін (назавжди)"],"110901929":["Вогняний кіт (назавжди)"],"110901930":["Вбрання милої дівчини","Лише для жінок."],"110901931":["Вбрання зоряного кролика"],"110901932":["Одяг для захопливої подорожі"],"110901933":["Костюм «Хіп-хоп»"],"110901934":["Пустотливий костюм кита"],"110901935":["Вбрання для балу Люмінарі"],"110901936":["Вбрання таємничої школи магії"],"110901937":["Чорна злоба"],"110901938":["Костюм архангела"],"110901939":["Подаруночок"],"110901940":["Костюм «Зухвала танцівниця»","Лише для жінок."],"110901943":["Костюм країни чудес"],"110901950":["Крижаний пінгвін (назавжди)"],"110901951":["Крижаний кіт (назавжди)"],"110901962":["Повсякденне осіннє вбрання"],"110901963":["Ведмежий одяг"],"110901964":["Тихий перлинно-чорний кіт"],"110901965":["[Івент] Одяг із вишневим цвітом, пофарбований у рожевий"],"110901992":["Одяг «Сяйво білизни»"],"110901996":["Чорне вбрання для червоної доріжки"],"110901997":["Сукня-сніжинка"],"110901998":["Одяг «Пісня моря»"],"110901999":["Одяг «Морок темряви»"],"110905228":["Нагрудник темного володаря драконів (чарівник)"],"110905229":["Нагрудник темного володаря драконів (стрілець)"],"110905230":["Нагрудник темного володаря драконів (цілитель)"],"110905231":["Нагрудник темного володаря драконів (гладіатор)"],"110905295":["Тканинний нагрудник вбивці Кунакса"],"110905296":["Шкіряний нагрудник вбивці Кунакса"],"110905297":["Кольчужний нагрудник вбивці Кунакса"],"110905298":["Латний нагрудник вбивці Кунакса"],"110905430":["Толстовка з капюшоном"],"110910266":["Казкова сукня"],"110910273":["Сукня ілюзій"],"110910317":["Вбрання смертоносного чорного тигра"],"110910323":["Золотий костюм героя"],"110910324":["Вбрання панка"],"110910339":["Витончене вбрання павича"],"110910341":["Костюм невидимого детектива"],"110910345":["Зірковий костюм відьми"],"110910367":["Костюм Еллі","Лише для жінок."],"110910398":["Облачення Веди","Лише для жінок."],"110910418":["Костюм хороброго ведмедя"],"110999001":["Чарівне арабське вбрання"],"110999002":["Костюм даева-рейнджера"],"111000010":["Рукавички дебра","Предмет можна фарбувати."],"111000012":["Рукавиці блазня"],"111000013":["Рукавиці кулуса"],"111000020":["Рукавиці зі срібного хутра тару"],"111000025":["Рукавиці мага"],"111000032":["Рукавиці барда (NPC)"],"111000039":["Рукавиці з Дивокраю"],"111000049":["Латні рукавиці Драконових пут"],"111000050":["Кольчужні рукавиці Драконових пут"],"111000051":["Шкіряні рукавиці Драконових пут"],"111000052":["Тканинні рукавиці Драконових пут"],"111000060":["Латні рукавиці Забутої Безодні"],"111000061":["Кольчужні рукавиці Забутої Безодні"],"111000062":["Шкіряні рукавиці Забутої Безодні"],"111000063":["Тканинні рукавиці Забутої Безодні"],"111000064":["Латні рукавиці Первісного Духа"],"111000065":["Кольчужні рукавиці Первісного Духа"],"111000066":["Шкіряні рукавиці Первісного Духа"],"111000067":["Тканинні рукавиці Первісного Духа"],"111000068":["Латні рукавиці вартового Тіамат"],"111000069":["Кольчужні рукавиці вартового Тіамат"],"111000070":["Шкіряні рукавиці вартового Тіамат"],"111000071":["Тканинні рукавиці вартового Тіамат"],"111000072":["Рукавиці лісового фофоку"],"111000093":["Рукавички радісного фонгоса"],"111000103":["Рукавички зоряного кролика"],"111050125":["Тканинні рукавички Кунакса Різника"],"111050126":["Шкіряні рукавиці вбивці Кунакса"],"111050127":["Кольчужні рукавиці вбивці Кунакса"],"111050128":["Латні рукавиці вбивці Кунакса"],"111101134":["Тканинні рукавиці скарбниці Балауреї (NPC)"],"111101160":["Тканинні рукавиці Балік 3.0 (NPC)"],"111101161":["Тканинні рукавиці Безодні 3.0 (NPC)"],"111101163":["Тканинні рукавиці реянців (NPC)"],"111101245":["Тканинні рукавиці героя Другого Вознесіння (NPC)"],"111101322":["Тканинні рукавиці домашньої туніки (NPC)"],"111101345":["Тканинні рукавиці Вейл"],"111101346":["Тканинні рукавиці Мастаріуса"],"111101347":["Тканинні рукавиці Берітри 01A (NPC)"],"111101353":["Тканинні рукавиці Берітри (NPC)"],"111101526":["Рукавички Аріате"],"111101561":["Тканинні рукавиці польоту Асеріона"],"111101634":["Тканинні рукавиці великого вторгнення"],"111101711":["Тканинні рукавиці чорного полум'я"],"111101743":["Рукавички NPC 65 Даєваніона"],"111102118":["Давні тканинні рукавички жнеця"],"111107341":["Міцні рукавички запеклої вирішальної битви"],"111107342":["Рукавички запеклої вирішальної битви"],"111111361":["Рукавички Люмінес","Лише для жінок."],"111199001":["Величні тканинні рукавиці Йормунганда"],"111199002":["Тканинні рукавиці Маліки"],"111199003":["Тканинні рукавиці старійшини юнів"],"111199004":["Тканинні рукавиці мудрого радника"],"111301130":["Шкіряні рукавиці скарбниці Балауреї (NPC)"],"111301155":["Шкіряні рукавиці Балік 3.0 (NPC)"],"111301156":["Шкіряні рукавиці Безодні 3.0 (NPC)"],"111301158":["Шкіряні рукавиці реянців (NPC)"],"111301240":["Шкіряні рукавиці героя Другого Вознесіння (NPC)"],"111301317":["Шкіряні рукавиці домашньої туніки (NPC)"],"111301340":["Шкіряні рукавиці Вейл"],"111301341":["Шкіряні рукавиці Мастаріуса"],"111301342":["Шкіряні рукавиці Берітри 01A (NPC)"],"111301348":["Шкіряні рукавиці Берітри (NPC)"],"111301677":["Шкіряні рукавиці польоту Асеріона"],"111301734":["Шкіряні рукавиці великого вторгнення"],"111301827":["Шкіряні рукавиці чорного полум'я"],"111301863":["Шкіряні рукавички NPC 65 Даєваніона"],"111399001":["Шкіряні рукавиці мудрого радника"],"111399002":["Величні шкіряні рукавиці Йормунганда"],"111399003":["Шкіряні рукавиці Маліки"],"111501120":["Кольчужні рукавиці скарбниці Балауреї (NPC)"],"111501149":["Кольчужні рукавиці Балік 3.0 (NPC)"],"111501150":["Кольчужні рукавиці Безодні 3.0 (NPC)"],"111501152":["Кольчужні рукавиці реянців (NPC)"],"111501234":["Кольчужні рукавиці героя Другого Вознесіння (NPC)"],"111501309":["Кольчужні рукавиці домашньої туніки (NPC)"],"111501332":["Кольчужні рукавиці Вейл"],"111501333":["Кольчужні рукавиці Мастаріуса"],"111501334":["Кольчужні рукавиці Берітри 01A (NPC)"],"111501626":["Кольчужні рукавиці великого вторгнення"],"111501635":["Кольчужні рукавиці польоту Асеріона"],"111501781":["Кольчужні рукавиці чорного полум'я"],"111501825":["Рукавиці NPC 65 Даєваніона"],"111599001":["Кольчужні рукавиці мудрого радника"],"111599002":["Величні кольчужні рукавиці Йормунганда"],"111599003":["Кольчужні рукавиці Маліки"],"111601103":["Латні рукавиці скарбниці Балауреї (NPC)"],"111601128":["Латні рукавиці Балік 3.0 (NPC)"],"111601129":["Латні рукавиці Безодні 3.0 (NPC)"],"111601131":["Латні рукавиці реянців (NPC)"],"111601213":["Латні рукавиці героя Другого Вознесіння (NPC)"],"111601287":["Латні рукавиці домашньої туніки (NPC)"],"111601311":["Латні рукавиці Вейл"],"111601312":["Латні рукавиці Мастаріуса"],"111601313":["Латні рукавиці Берітри 01A (NPC)"],"111601504":["Латні рукавиці польоту Асеріона"],"111601562":["Латні рукавиці великого вторгнення"],"111601643":["Латні рукавиці чорного полум'я"],"111601681":["Латні рукавиці NPC 65 Даєваніона"],"111650209":["Рукавиці темного володаря драконів (чарівник)"],"111650210":["Рукавиці темного володаря драконів (стрілець)"],"111650211":["Рукавиці темного володаря драконів (цілитель)"],"111650212":["Рукавиці темного володаря драконів (гладіатор)"],"111699001":["Латні рукавиці мудрого радника"],"111699002":["Величні латні рукавиці Йормунганда"],"111699003":["Латні рукавиці Маліки"],"112000001":["Наплічники барда (NPC)"],"112000005":["Кавалерійський мундир: наплічники"],"112000008":["Латні наплічники Драконових пут"],"112000009":["Кольчужні наплічники Драконових пут"],"112000010":["Шкіряні наплічники Драконових пут"],"112000011":["Тканинні наплічники Драконових пут"],"112000018":["Латні наплічники Забутої Безодні"],"112000019":["Кольчужні наплічники Забутої Безодні"],"112000020":["Шкіряні наплічники Забутої Безодні"],"112000021":["Тканинні наплічники Забутої Безодні"],"112000022":["Латні наплічники Первісного Духа"],"112000023":["Кольчужні наплічники Первісного Духа"],"112000024":["Шкіряні наплічники Первісного Духа"],"112000025":["Тканинні наплічники Первісного Духа"],"112000026":["Латні наплічники вартового Тіамат"],"112000027":["Кольчужні наплічники вартового Тіамат"],"112000028":["Шкіряні наплічники вартового Тіамат"],"112000029":["Тканинні наплічники вартового Тіамат"],"112000031":["Наплічники лісового фофоку"],"112000052":["Наплічники радісного фонгоса"],"112000059":["Еполети архангела"],"112000063":["Наплічники зоряного кролика"],"112050120":["Досконалий хвіст куміхо"],"112050125":["Тканинні наплічники вбивці Кунакса"],"112050126":["Шкіряні наплічники вбивці Кунакса"],"112050127":["Кольчужні наплічники вбивці Кунакса"],"112050128":["Латні наплічники вбивці Кунакса"],"112101091":["Тканинні наплічники скарбниці Балауреї (NPC)"],"112101118":["Тканинні наплічники Балік 3.0 (NPC)"],"112101119":["Тканинні наплічники Безодні 3.0 (NPC)"],"112101121":["Тканинні наплічники реянців (NPC)"],"112101203":["Тканинні наплічники героя Другого Вознесіння (NPC)"],"112101279":["Тканинні наплічники домашньої туніки (NPC)"],"112101302":["Тканинні наплічники Вейл"],"112101303":["Тканинні наплічники Мастаріуса"],"112101304":["Тканинні наплічники Берітри 01A (NPC)"],"112101310":["Тканинні наплічники Берітри (NPC)"],"112101479":["Наплічники Сновиди"],"112101511":["Тканинні наплічники польоту Асеріона"],"112101584":["Тканинні наплічники великого вторгнення"],"112101660":["Тканинні наплічники чорного полум'я"],"112101689":["Тканинні наплічники NPC 65 Даєваніона"],"112102056":["Давні тканинні наплічники жнеця"],"112107298":["Міцний наплічник запеклої вирішальної битви"],"112107299":["Наплічник запеклої вирішальної битви"],"112111316":["Наплічники Люмінес","Лише для жінок."],"112199001":["Тканинні наплічники мудрого радника"],"112199002":["Величні тканинні наплічники Йормунганда"],"112199003":["Тканинні наплічники Маліки"],"112301074":["Шкіряні наплічники скарбниці Балауреї (NPC)"],"112301101":["Шкіряні наплічники Балік 3.0 (NPC)"],"112301102":["Шкіряні наплічники Безодні 3.0 (NPC)"],"112301104":["Шкіряні наплічники реянців (NPC)"],"112301186":["Шкіряні наплічники героя Другого Вознесіння (NPC)"],"112301260":["Шкіряні наплічники домашньої туніки (NPC)"],"112301283":["Шкіряні наплічники Вейл"],"112301284":["Шкіряні наплічники Мастаріуса"],"112301285":["Шкіряні наплічники Берітри 01A (NPC)"],"112301291":["Шкіряні наплічники Берітри (NPC)"],"112301616":["Шкіряні наплічники польоту Асеріона"],"112301673":["Шкіряні наплічники великого вторгнення"],"112301766":["Шкіряні наплічники чорного полум'я"],"112301801":["Шкіряні наплічники NPC 65 Даєваніона"],"112399001":["Шкіряні наплічники мудрого радника"],"112399002":["Величні шкіряні наплічники Йормунганда"],"112399003":["Шкіряні наплічники Маліки"],"112501067":["Кольчужні наплічники скарбниці Балауреї (NPC)"],"112501094":["Кольчужні наплічники Балік 3.0 (NPC)"],"112501095":["Кольчужні наплічники Безодні 3.0 (NPC)"],"112501097":["Кольчужні наплічники реянців (NPC)"],"112501179":["Кольчужні наплічники героя Другого Вознесіння (NPC)"],"112501249":["Кольчужні наплічники домашньої туніки (NPC)"],"112501272":["Кольчужні наплічники Вейл"],"112501273":["Кольчужні наплічники Мастаріуса"],"112501274":["Кольчужні наплічники Берітри 01A (NPC)"],"112501567":["Кольчужні наплічники великого вторгнення"],"112501574":["Кольчужні наплічники польоту Асеріона"],"112501720":["Кольчужні наплічники чорного полум'я"],"112501761":["Кольчужні наплічники NPC 65 Даєваніона"],"112599001":["Кольчужні наплічники мудрого радника"],"112599002":["Величні кольчужні наплічники Йормунганда"],"112599003":["Кольчужні наплічники Маліки"],"112601079":["Латні наплічники скарбниці Балауреї (NPC)"],"112601106":["Латні наплічники Балік 3.0 (NPC)"],"112601107":["Латні наплічники Безодні 3.0 (NPC)"],"112601109":["Латні наплічники реянців (NPC)"],"112601191":["Латні наплічники героя Другого Вознесіння (NPC)"],"112601267":["Латні наплічники домашньої туніки (NPC)"],"112601291":["Латні наплічники Вейл"],"112601292":["Латні наплічники Мастаріуса"],"112601293":["Латні наплічники Берітри 01A (NPC)"],"112601486":["Латні наплічники польоту Асеріона"],"112601544":["Латні наплічники великого вторгнення"],"112601625":["Латні наплічники чорного полум'я"],"112601662":["Латні наплічники NPC 65 Даєваніона"],"112650209":["Наплічники темного володаря драконів (чарівник)"],"112650210":["Наплічники темного володаря драконів (стрілець)"],"112650211":["Наплічники темного володаря драконів (цілитель)"],"112650212":["Наплічники темного володаря драконів (гладіатор)"],"112699001":["Латні наплічники мудрого радника"],"112699002":["Величні латні наплічники Йормунганда"],"112699003":["Латні наплічники Маліки"],"113000007":["Штани зі срібного хутра тару"],"113000009":["Штани барда (NPC)"],"113000018":["Кавалерійський мундир: штани"],"113000020":["Латні штани Драконових пут"],"113000021":["Кольчужні штани Драконових пут"],"113000022":["Шкіряні штани Драконових пут"],"113000023":["Тканинні штани Драконових пут"],"113000030":["Латні штани Забутої Безодні"],"113000031":["Кольчужні штани Забутої Безодні"],"113000032":["Шкіряні штани Забутої Безодні"],"113000033":["Тканинні штани Забутої Безодні"],"113000034":["Латні штани Первісного Духа"],"113000035":["Кольчужні штани Первісного Духа"],"113000036":["Шкіряні штани Первісного Духа"],"113000037":["Тканинні штани Первісного Духа"],"113000038":["Латні штани вартового Тіамат"],"113000039":["Кольчужні штани вартового Тіамат"],"113000040":["Шкіряні штани вартового Тіамат"],"113000041":["Тканинні штани вартового Тіамат"],"113000042":["Штани лісового фофоку"],"113000060":["Штани радісного фонгоса"],"113000067":["Штани зоряного кролика"],"113050023":["Штани темного володаря драконів (чарівник)"],"113050024":["Штани темного володаря драконів (стрілець)"],"113050025":["Штани темного володаря драконів (цілитель)"],"113050026":["Штани темного володаря драконів (гладіатор)"],"113050132":["Тканинні штани вбивці Кунакса"],"113050133":["Шкіряні штани вбивці Кунакса"],"113050134":["Кольчужні штани вбивці Кунакса"],"113050135":["Латні штани вбивці Кунакса"],"113101150":["Тканинні штани скарбниці Балауреї (NPC)"],"113101179":["Тканинні штани Балік 3.0 (NPC)"],"113101180":["Тканинні штани Безодні 3.0 (NPC)"],"113101182":["Тканинні штани реянців (NPC)"],"113101264":["Тканинні штани героя Другого Вознесіння (NPC)"],"113101339":["Тканинні штани домашньої туніки (NPC)"],"113101362":["Тканинні штани Вейл"],"113101363":["Тканинні штани Мастаріуса"],"113101364":["Тканинні штани Берітри 01A (NPC)"],"113101373":["Тканинні штани Берітри (NPC)"],"113101541":["Штани Сновиди"],"113101573":["Тканинні поножі польоту Асеріона"],"113101646":["Тканинні штани великого вторгнення"],"113101722":["Тканинні штани чорного полум'я"],"113101754":["Ткані набедреники NPC 65 Даєваніона"],"113102117":["Тканинні поножі майстра-жнеця"],"113107358":["Міцні штани запеклої вирішальної битви"],"113107359":["Штани запеклої вирішальної битви"],"113111379":["Штани Люмінес","Лише для жінок."],"113199001":["Тканинні штани мудрого радника"],"113199002":["Величні тканинні штани Йормунганда"],"113199003":["Тканинні штани нефіліма"],"113199004":["Тканинні штани старійшини юнів"],"113301153":["Шкіряні штани скарбниці Балауреї (NPC)"],"113301181":["Шкіряні штани Балік 3.0 (NPC)"],"113301182":["Шкіряні штани Безодні 3.0 (NPC)"],"113301184":["Шкіряні штани реянців (NPC)"],"113301266":["Шкіряні штани героя Другого Вознесіння (NPC)"],"113301341":["Шкіряні штани домашньої туніки (NPC)"],"113301364":["Шкіряні штани Вейл"],"113301365":["Шкіряні штани Мастаріуса"],"113301366":["Шкіряні штани Берітри 01A (NPC)"],"113301372":["Шкіряні штани Берітри (NPC)"],"113301708":["Шкіряні поножі польоту Асеріона"],"113301765":["Шкіряні штани великого вторгнення"],"113301858":["Шкіряні штани чорного полум'я"],"113301894":["Шкіряні наколінники NPC 65 Даєваніона"],"113399001":["Шкіряні штани мудрого радника"],"113399002":["Величні шкіряні штани Йормунганда"],"113399003":["Шкіряні штани нефіліма"],"113501134":["Кольчужні штани скарбниці Балауреї (NPC)"],"113501166":["Кольчужні штани Балік 3.0 (NPC)"],"113501167":["Кольчужні штани Безодні 3.0 (NPC)"],"113501169":["Наколінники реянів із бази Рентаса (NPC)"],"113501251":["Кольчужні штани героя Другого Вознесіння (NPC)"],"113501324":["Кольчужні штани домашньої туніки (NPC)"],"113501347":["Кольчужні штани Вейл"],"113501348":["Кольчужні штани Мастаріуса"],"113501349":["Кольчужні штани Берітри 01A (NPC)"],"113501646":["Кольчужні штани великого вторгнення"],"113501653":["Кольчужні поножі польоту Асеріона"],"113501799":["Кольчужні штани чорного полум'я"],"113501844":["Набедреники NPC 65 Даєваніона"],"113599001":["Кольчужні штани мудрого радника"],"113599002":["Величні кольчужні штани Йормунганда"],"113599003":["Кольчужні штани нефіліма"],"113601092":["Латні штани скарбниці Балауреї (NPC)"],"113601119":["Латні штани Балік 3.0 (NPC)"],"113601120":["Латні штани Безодні 3.0 (NPC)"],"113601122":["Латні штани реянців (NPC)"],"113601204":["Латні штани героя Другого Вознесіння (NPC)"],"113601276":["Латні штани домашньої туніки (NPC)"],"113601300":["Латні штани Вейл"],"113601301":["Латні штани Мастаріуса"],"113601302":["Латні штани Берітри 01A (NPC)"],"113601487":["Латні поножі польоту Асеріона"],"113601545":["Латні штани великого вторгнення"],"113601626":["Латні штани чорного полум'я"],"113601664":["Латні наколінники NPC 65 Даєваніона"],"113699001":["Латні штани мудрого радника"],"113699002":["Величні латні штани Йормунганда"],"113699003":["Латні штани нефіліма"],"114000010":["Чоботи дебра","Предмет можна фарбувати."],"114000012":["Взуття блазня"],"114000013":["Взуття кулуса"],"114000020":["Взуття мага"],"114000026":["Взуття зі срібного хутра тару"],"114000033":["Взуття барда (NPC)"],"114000040":["Взуття з Дивокраю"],"114000054":["Кавалерійський мундир: взуття"],"114000056":["Латне взуття Драконових пут"],"114000057":["Кольчужне взуття Драконових пут"],"114000058":["Шкіряне взуття Драконових пут"],"114000059":["Тканинне взуття Драконових пут"],"114000067":["Латне взуття Забутої Безодні"],"114000068":["Кольчужне взуття Забутої Безодні"],"114000069":["Шкіряне взуття Забутої Безодні"],"114000070":["Тканинне взуття Забутої Безодні"],"114000071":["Латне взуття Первісного Духа"],"114000072":["Кольчужне взуття Первісного Духа"],"114000073":["Шкіряне взуття Первісного Духа"],"114000074":["Тканинне взуття Первісного Духа"],"114000075":["Латне взуття вартового Тіамат"],"114000076":["Кольчужне взуття вартового Тіамат"],"114000077":["Шкіряне взуття вартового Тіамат"],"114000078":["Тканинне взуття вартового Тіамат"],"114000098":["Черевики радісного фонгоса"],"114000105":["Чоботи зоряного кролика"],"114050128":["Тканинні черевики Кунакса Різника"],"114050129":["Шкіряні черевики Кунакса Різника"],"114050130":["Кольчужне взуття вбивці Кунакса"],"114050131":["Латне взуття вбивці Кунакса"],"114101179":["Тканинне взуття скарбниці Балауреї (NPC)"],"114101206":["Тканинне взуття Балік 3.0 (NPC)"],"114101207":["Тканинне взуття Безодні 3.0 (NPC)"],"114101209":["Тканинне взуття реянців (NPC)"],"114101291":["Тканинне взуття героя Другого Вознесіння (NPC)"],"114101368":["Тканинне взуття домашньої туніки (NPC)"],"114101393":["Тканинне взуття Вейл"],"114101394":["Тканинне взуття Мастаріуса"],"114101395":["Тканинне взуття Берітри 01A (NPC)"],"114101401":["Тканинне взуття Берітри (NPC)"],"114101575":["Взуття Сновиди"],"114101607":["Тканинні чоботи польоту Асеріона"],"114101663":["Взуття лісового фофоку"],"114101680":["Тканинне взуття великого вторгнення"],"114101756":["Тканинне взуття чорного полум'я"],"114101788":["Черевики NPC 65 Даєваніона"],"114102163":["Тканинні черевики майстра-жнеця"],"114107389":["Міцні черевики запеклої вирішальної битви"],"114107390":["Черевики запеклої вирішальної битви"],"114111409":["Взуття Люмінес","Лише для жінок."],"114199001":["Тканинне взуття мудрого радника"],"114199002":["Величне тканинне взуття Йормунганда"],"114199003":["Тканинне взуття Маліки"],"114199004":["Тканинне взуття старійшини юнів"],"114301186":["Шкіряне взуття скарбниці Балауреї (NPC)"],"114301212":["Шкіряне взуття Балік 3.0 (NPC)"],"114301213":["Шкіряне взуття Безодні 3.0 (NPC)"],"114301215":["Шкіряне взуття реянців (NPC)"],"114301297":["Шкіряне взуття героя Другого Вознесіння (NPC)"],"114301374":["Шкіряне взуття домашньої туніки (NPC)"],"114301399":["Шкіряне взуття Вейл"],"114301400":["Шкіряне взуття Мастаріуса"],"114301401":["Шкіряне взуття Берітри 01A (NPC)"],"114301407":["Шкіряне взуття Берітри (NPC)"],"114301745":["Шкіряні чоботи польоту Асеріона"],"114301802":["Шкіряне взуття великого вторгнення"],"114301895":["Шкіряні чоботи чорного полум'я"],"114301931":["Черевики NPC 65 Даєваніона"],"114399001":["Шкіряні чоботи мудрого радника"],"114399002":["Величні шкіряні чоботи Йормунганда"],"114399003":["Шкіряні чоботи Маліки"],"114501140":["Кольчужне взуття скарбниці Балауреї (NPC)"],"114501170":["Кольчужне взуття Балік 3.0 (NPC)"],"114501171":["Кольчужне взуття Безодні 3.0 (NPC)"],"114501173":["Кольчужне взуття реянців (NPC)"],"114501255":["Кольчужне взуття героя Другого Вознесіння (NPC)"],"114501330":["Кольчужне взуття домашньої туніки (NPC)"],"114501355":["Кольчужне взуття Вейл"],"114501356":["Кольчужне взуття Мастаріуса"],"114501357":["Кольчужне взуття Берітри 01A (NPC)"],"114501655":["Кольчужне взуття великого вторгнення"],"114501663":["Кольчужні чоботи польоту Асеріона"],"114501809":["Кольчужне взуття чорного полум'я"],"114501852":["Ланцюгові черевики NPC 65 Даєваніона"],"114599001":["Кольчужне взуття мудрого радника"],"114599002":["Величне кольчужне взуття Йормунганда"],"114599003":["Кольчужне взуття Маліки"],"114601087":["Латне взуття скарбниці Балауреї (NPC)"],"114601112":["Латне взуття Балік 3.0 (NPC)"],"114601113":["Латне взуття Безодні 3.0 (NPC)"],"114601115":["Латне взуття реянців (NPC)"],"114601197":["Латне взуття героя Другого Вознесіння (NPC)"],"114601271":["Латне взуття домашньої туніки (NPC)"],"114601297":["Латне взуття Вейл"],"114601298":["Латне взуття Мастаріуса"],"114601299":["Латне взуття Берітри 01A (NPC)"],"114601494":["Латні чоботи польоту Асеріона"],"114601552":["Латне взуття великого вторгнення"],"114601633":["Латне взуття чорного полум'я"],"114601670":["Латні черевики NPC 65 Даєваніона"],"114650209":["Взуття темного володаря драконів (чарівник)"],"114650210":["Взуття темного володаря драконів (стрілець)"],"114650211":["Взуття темного володаря драконів (цілитель)"],"114650212":["Взуття темного володаря драконів (гладіатор)"],"114699001":["Латне взуття мудрого радника"],"114699002":["Величне латне взуття Йормунганда"],"114699003":["Латне взуття Маліки"],"115000044":["Щит наги"],"115000129":["Щит стража Безодні"],"115000678":["Щит генерала елійців","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"115000679":["Щит генерала асмодіан","Предмет для зміни вигляду. Майстер зовнішності в місті може надати іншому предмету такий самий вигляд."],"115000959":["Кристал Нухина","Преміум-щит для зміни вигляду зброї."],"115000968":["Щит NPC"],"115001097":["Щит NPC підземелля Кромед"],"115001144":["Щит Хамеруна (NPC)"],"115001157":["Щит NPC стражів святості"],"115001186":["Новорічний сніговик","Унікальний щит для зміни вигляду зброї."],"115001225":["Щит звичайного NPC"],"115001229":["Щит Безодні NPC (3.0)"],"115001383":["Щит дикого кота"],"115001424":["Героїчний щит NPC Тіамат"],"115001426":["Унікальний щит NPC Тіамат"],"115001442":["Примарний щит"],"115001464":["Щит бійця арени (зовнішній вигляд)"],"115001466":["Міфічний щит NPC Тіамат"],"115001467":["Нагородний щит божества NPC"],"115001481":["Клітинний відбивач"],"115001482":["Золотий щит"],"115001492":["Щит NPC Бритри"],"115001602":["Прозорий маленький щит"],"115001603":["Прозорий щит"],"115001634":["Білий щит NPC Бритри"],"115001656":["NPC 4.5 Щит захисту Безодні"],"115001657":["Гримаса пірата"],"115001680":["Щит чуткої Марісси (зовнішній вигляд)"],"115001682":["Забутий щит хаосу (зовнішній вигляд)"],"115001683":["Щит давнього елементаля (зовнішній вигляд)"],"115001696":["Щит NPC посилення Рунадіума"],"115001703":["Щит Кунакса"],"115001704":["Дивовижний щит Атракси"],"115001705":["Вишуканий щит Грендаля"],"115001707":["Вишуканий щит Дайнатума"],"115001714":["Неперевершений щит Йормунганда"],"115001716":["Каталіумовий щит професіонала"],"115001733":["Трофейний щит вторгнення"],"115001743":["Щит великого серця"],"115001750":["[Івент] Щит Белонтайна"],"115001751":["[Івент] Щит Білого дня"],"115001827":["Щит легата 55-го легіону"],"115001831":["Щит лорда Бритри"],"115001834":["Сяюча агонія лорда балаурів"],"115001841":["Сліпучий щит посланника"],"115001864":["Щит пісні шторму «Сяючий крижаний кристал»"],"115001877":["Лускатий щит захисника Кайсинеля"],"115001900":["Щит-зірка"],"115001903":["Кристальний щит"],"115002023":["Щит радісного фонгоса"],"115002175":["Блискучий магічний щит"],"115002343":["Щит стратника Каея"],"115011365":["Щит пухнастого кота"],"115011366":["Щит пухнастого кролика"],"115050064":["Легендарний бойовий щит танцюючого багряного полум'я"],"115050136":["Щит Шепітної пані"],"115050142":["Лицарський щит"],"115050313":["Довершений бойовий щит запеклої битви"],"115050469":["Парасоль-щит з мордочкою шиго"],"115050487":["Піксельний щит"],"115050494":["Щит найвищого бойового духу"],"115099003":["Щит командира елітних аканів-стражів"],"115099004":["Сталевий щит легіонера Араки"],"115099005":["Священний щит верховного магістра арени"],"115099007":["Щит Ракші"],"115099008":["Сяючий щит короля мудрих драконів"],"115099009":["Щит Татра"],"115099011":["Сяючий щит імператора крилатих драконів"],"115099012":["Щит короля білих драконів"],"115099013":["Щит короля темних драконів"],"115099014":["Тарілка Мікарона"],"115099015":["Дорогоцінна тарілка Мікарона"],"115099016":["Рідка тарілка Мікарона"],"115099017":["Щит білої лілії"],"115099018":["Щит Кешаса"],"115099019":["Щит Макиї"],"115099020":["Дреніумовий щит Октарона"],"115099021":["Щит Рудри"],"115099022":["Щит спокою"],"125002611":["Драконічний обруч NPC (3.0)"],"125002621":["Драконічний шолом NPC (3.0)"],"125002631":["Драконічний шолом NPC (3.0)"],"125002641":["Драконічний латний шолом NPC (3.0)"],"125002642":["Латний шолом Безодні NPC (3.0)"],"125003781":["Заколка Аріате"],"125003842":["NPC 4.5 Звичайний обруч Безодні"],"125003843":["NPC 4.5 Звичайний обруч музиканта Безодні"],"125003844":["NPC 4.5 Обруч захисту підземелля"],"125003845":["NPC 4.5 Обруч музиканта захисту підземелля"],"125003846":["NPC 4.5 Звичайний шолом зі шкіри музиканта Безодні"],"125003847":["NPC 4.5 Звичайний шолом стрільця Безодні"],"125003848":["NPC 4.5 Шкіряний шолом захисту підземелля"],"125003849":["NPC 4.5 Шолом стрільця захисту підземелля"],"125003850":["NPC 4.5 Шолом стрільця Безодні"],"125003851":["NPC 4.5 Шолом захисту підземелля"],"125003852":["NPC 4.5 Латний шолом музиканта Безодні"],"125003853":["NPC 4.5 Латний шолом музиканта захисту підземелля"],"125003945":["Розкішний ободок з коштовностями","Модна сучасна весільна фата."],"125003948":["Добра шапка кота"],"125003949":["Мила шапка кота","Маска, що ховає обличчя й додає загадковості."],"125004794":["Капелюх радісного фонгоса"],"125005118":["Капелюх зоряного кролика"],"125005217":["Бандана жнеця"],"125013027":["Куля «1»"],"125013028":["Куля «2»"],"125013029":["Куля «3»"],"125013030":["Куля «4»"],"125013031":["Куля «5»"],"125013032":["Куля «6»"],"125013033":["Куля «7»"],"125013034":["Куля «8»"],"125013035":["Куля «9»"],"125013036":["Куля «10»"],"125013037":["Куля «11»"],"125013038":["Куля «12»"],"125013039":["Куля «13»"],"125013040":["Куля «14»"],"125013041":["Куля «15»"],"125040013":["Виноградний берет","Капелюх, схожий на апетитне гроно винограду."],"125040024":["[Івент] Капелюх"],"125040031":["[Івент] Вушка ведмедя"],"125040032":["[Івент] Вушка кролика"],"125040033":["[Івент] Ободок-підсолнух"],"125040034":["[Івент] Ободок-тюльпан"],"125040036":["[Івент] Шапка мандри"],"125040039":["[Івент] Чорні окуляри даєва","Дзеркальні сонцезахисні окуляри для стильних дев."],"125040040":["[Івент] Палаюча голова","Діти, не повторюйте цього вдома."],"125040042":["Сонцезахисні окуляри","Сонцезахисні окуляри, у яких вигляд важливіший за користь."],"125040043":["Бали для плавання","Окуляри для захисту очей під водою."],"125040044":["Шапочка для купання","Мила шапочка для плавання."],"125040046":["Пляжний капелюшок","Капелюх, що захищає від сонця."],"125040048":["[Івент] Новогодня шапка оленя","Шапка з ріжками, зроблена спеціально до Новорічного свята."],"125040055":["Прогулянковий капелюх"],"125040056":["Тіара"],"125040057":["Ангельський ободок"],"125040074":["Дияволячий ободок даєва","Обідок у формі демонських рогів."],"125040081":["Східний головний убір","Незвичайна прикраса для голови."],"125040083":["Старовинний аксесуар для волосся","Традиційна корейська прикраса для голови."],"125040084":["Чоловіча капелюх/жіноча шапка","Ця накидка неодмінно впадає в око й гріє в м'якому кліматі."],"125040107":["Широкополий капелюх","Капелюх-федора, що довершує образ у стилі Miss A."],"125040108":["Фуражка","Кепка, що довершує образ у стилі Miss A."],"125040124":["[Івент] Новорічна шапочка","Грайлива новорічна шапочка."],"125040132":["[Івент] Капелюх до Дня дітей","Особлива шапка для грайливих дев."],"125040138":["[Івент] Дитяча безкозирка","М'яка шапочка з грайливою стрічкою позаду."],"125040143":["[Івент] Ошатний дитячий солом'яний капелюшок","Простий капелюх на всі випадки."],"125040148":["[Івент] Пілотка","Капелюх, що сидить на голові, наче промінь світла."],"125040158":["[Івент] Капелюх мага","Вдягніть цей капелюх мага — і станете чарівно звабливими. Ось вона, сила вечора."],"125040161":["[Івент] Капелюх з гарбуза","Капелюх у вигляді лиховісного гарбуза Джека."],"125040167":["[Івент] Ошатний новорічний головний убір","Обмежена серія! Вражайте тонкою роботою."],"125040172":["Прикраса для балу вічного кохання","Світна заколка, яку носять закохані деви."],"125040175":["[Івент] Тепла сумна шапка","Хутряна шапка, щоб не мерзнути вночі, коли всі збираються надворі заради дарувальника ефіру."],"125040180":["Спортивна кепка","Спортивна кепка для тренувань із довгим козирком."],"125040182":["Морський капелюх","Капелюх, у якому почуваєшся капітаном корабля."],"125040186":["Шолом аквалангіста/Красивий бандана","Аксесуар для розваг на воді!"],"125040204":["[Івент] Особливий новорічний берет","Стильний берет, без якого не обійтися на Новорічне свято."],"125040229":["Шапка з вовни тару","Розкішна шапка з м'якого срібного хутра з хвоста тару."],"125040238":["Шапка клоуна"],"125040244":["[Івент] Шапка алхіміка","Такі капелюхи часто носять алхіміки."],"125040246":["Шапка кавуна","Капелюх у формі кавуна."],"125040247":["Шапка ананаса","Капелюх у формі ананаса."],"125040250":["Шапка лимона","Шпилька, оздоблена прикрасою у формі лимона."],"125040313":["Шапочка для милої піжами"],"125040347":["Шолом гонщика"],"125040371":["Маска динозавра"],"125040390":["Головний убір до елегантного купальника"],"125040395":["[Івент] Матроська безкозирка"],"125040411":["Головний убір воїна-докебі"],"125040437":["Заколка для щасливого весілля"],"125040630":["Прикраса для волосся до синього дівочого ханбока"],"125040631":["Прикраса для волосся «Котячі вушка»"],"125040632":["Мила прикраса покоївки для волосся","Лише для жінок."],"125040634":["Прості офісні окуляри"],"125040636":["Ковбойський капелюх"],"125040637":["[Івент] Шкільна прикраса для волосся «Літній бриз»"],"125040645":["Рожева прикраса для волосся з вишневим цвітом"],"125040646":["Прикраса для волосся пляжного героя"],"125040995":["Адміральський капелюх"],"125045029":["Яскравий морський капелюх"],"125045030":["Милий морський капелюх"],"125045047":["Маска з розкішних пір'їв"],"125045048":["Розкішний капелюх аристократа"],"125045067":["Пов'язка на око"],"125045071":["Квіткова заколка для волосся"],"125045073":["Водолазний шолом"],"125045076":["Модна шапочка для плавання"],"125045086":["Шапка кавалериста"],"125045089":["Річна маска"],"125045090":["Маска лева"],"125045091":["Нелепа треугольна зачіска"],"125045092":["Нелепа чотирикутна зачіска"],"125045093":["Нелепа зіркова зачіска"],"125045094":["Нелепа кругла зачіска"],"125045095":["Маска коня"],"125045104":["Чарівний бант"],"125045105":["Пов'язка з легковажним бантом"],"125045117":["Мила шапка кішки"],"125045118":["Мила шапка кролика"],"125045119":["Мила шапка єнота"],"125045123":["Золота капелюх"],"125045125":["Спокуслива шапочка медсестри"],"125045126":["Шапочка медсестри"],"125045137":["Сіра шапка кішки"],"125045139":["Сіра шапка кролика"],"125045141":["Сіра шапка єнота"],"125045153":["[Івент] Шапка фогуса","Капелюх із персонажем-кулусом."],"125045154":["[Івент] Шапка лимона","Шпилька, оздоблена прикрасою у формі меона."],"125045155":["[Івент] Шапка яйця","Шпилька, оздоблена прикрасою у формі яйця."],"125045156":["[Івент] Шапка яблука","Шпилька, оздоблена прикрасою у формі вінни."],"125045157":["[Івент] Шапка ківі","Шпилька, оздоблена прикрасою у формі вікі."],"125045159":["[Івент] Ободок-серце","Обідок у формі кульки-серця."],"125045161":["[Івент] Шапка кота","[Івент] Шапка кота"],"125045162":["Літня квітка"],"125045163":["Кепка від сонця"],"125045168":["[Івент] Елітний латний шолом Йормунганда (зовнішній вигляд)"],"125045169":["[Івент] Елітний шолом Йормунганда (зовнішній вигляд)"],"125045170":["[Івент] Елітний шкіряний шолом Йормунганда (зовнішній вигляд)"],"125045171":["[Івент] Елітний обруч Йормунганда (зовнішній вигляд)"],"125045172":["[Івент] Латний шолом давнього елементаля (зовнішній вигляд)"],"125045173":["[Івент] Шолом давнього елементаля (зовнішній вигляд)"],"125045174":["[Івент] Шкіряний шолом давнього елементаля (зовнішній вигляд)"],"125045175":["[Івент] Обруч давнього елементаля (зовнішній вигляд)"],"125045191":["[Івент] Кепка 'NC Дино'","Бейсболка команди NC Dinos."],"125045227":["Зухвала леопардова шапка"],"125045228":["Леопардова шапочка"],"125045241":["Модні сонячні окуляри"],"125045245":["Примарний шолом"],"125045246":["Примарна бандана"],"125045247":["[Івент] Інтелектуальний пневмошолом"],"125045248":["[Івент] Нейронний берет"],"125045249":["[Івент] Квантові окуляри"],"125045261":["Весільна вуаль"],"125045268":["Шапка щеняти"],"125045275":["Шапка кота"],"125045289":["Особливий капелюх поліцейського"],"125045297":["Звичайні сонцезахисні окуляри поліцейського"],"125045303":["Теплий шолом сноубордиста"],"125045317":["Бали маленького лорда"],"125045324":["Шапка детектива"],"125045345":["Розкішний капелюх"],"125045359":["Розкішний берет маленького лорда"],"125045366":["Шолом сноубордиста"],"125045387":["Міцний шолом-молот"],"125045394":["Шолом-кувалда"],"125045415":["Шолом вершника"],"125045422":["[Перевтілення] Зачіска великого серця"],"125045430":["Стимпанковський головний убір"],"125045437":["Синя зимова шапка"],"125045446":["Чорна стрічка для волосся"],"125045448":["Модний головний убір"],"125045491":["Заколка чорного лебедя"],"125045544":["Головний убір місячного кролика"],"125045561":["Пов'язка глибоководного зафіра (зовнішній вигляд)"],"125045571":["Зачіска господаря шторму","Дає змогу перенести вигляд цього предмета на інший предмет."],"125045580":["Зачіска з білою пасмою/Заколка метелика"],"125045603":["Тіара архангела"],"125045925":["Капелюх чумного лікаря"],"125045984":["Кепка зухвалого дракона"],"125045985":["Вражаюча заколка даєва"],"125045989":["Шпилька «Медовий кролик»"],"125046026":["Досконалі вуха кумихо"],"125050013":["[Івент] Шапка вовка"],"125050014":["[Івент] Шолом вікінга"],"125050015":["[Івент] Пілотка"],"125050016":["[Івент] Шапка хайка"],"125050018":["[Івент] Шапка фесиллота"],"125050021":["[Івент] Шапка мюти"],"125050022":["[Івент] Шапка припайлама"],"125050023":["[Івент] Шапка дебра"],"125050024":["[Івент] Шапка фонгоса"],"125050025":["[Івент] Шапка спарки"],"125050026":["[Івент] Шапка мінкса"],"125050027":["Головний убір солодкої парочки","Гарний святковий капелюх для дев, які мають половинку."],"125050029":["Капелюшок щасливої парочки","Гарний святковий капелюх для щасливих пар."],"125050030":["Розкішний капелюшок","Гарний святковий капелюх для стильних самітників."],"125050038":["Капелюх лікаря"],"125050224":["Шолом шиго-рейнджера"],"125050226":["Яскравий традиційний головний убір"],"125050239":["Головний убір «Солодке морозиво»"],"125050306":["Головний убір хороброго ведмедя"],"125050469":["Маска чумного лікаря"],"125060190":["Сяйлива літня прикраса для волосся (фарбується)"],"125060191":["Сяйлива літня прикраса для волосся (веселка/фарбується)"],"125060192":["Вічна маска","Лише для чоловіків."],"125099002":["шолом занедбаного храму"],"125099003":["Діадема мудрого радника"],"125099004":["Шкіряний шолом мудрого радника"],"125099005":["Шолом мудрого радника"],"125099006":["Броньований шолом мудрого радника"],"125099008":["Латний шолом Рунаторіуму"],"160010176":["Цукерка перевтілення: непереможний червоний інквін (фізична)","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010177":["Цукерка перевтілення: непереможний червоний інквін (фізична)","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010178":["Цукерка перевтілення: непереможний золотий інквін (фізична)","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010179":["Цукерка перевтілення: непереможний золотий інквін (фізична)","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010182":["Цукерка перевтілення: непереможний зелений інквін (фізична)","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010183":["Цукерка перевтілення: непереможний зелений інквін (фізична)","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010184":["Цукерка перевтілення: непереможний фіолетовий інквін (фізична)","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010185":["Цукерка перевтілення: непереможний фіолетовий інквін (фізична)","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010186":["Цукерка перевтілення: найсильніший червоний інквін (магічна)","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, макс. HP +220, швидк. магії +3%, швидк. руху +3%."],"160010187":["Цукерка перевтілення: найсильніший золотий інквін (магічна)","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010188":["Цукерка перевтілення: найсильніший золотий інквін (магічна)","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, макс. HP +220, швидк. магії +3%, швидк. руху +3%."],"160010189":["Цукерка перевтілення: найсильніший золотий інквін (магічна)","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010192":["Цукерка перевтілення: найсильніший зелений інквін (магічна)","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, макс. HP +220, швидк. магії +3%, швидк. руху +3%."],"160010193":["Цукерка перевтілення: найсильніший зелений інквін (магічна)","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010194":["Цукерка перевтілення: найсильніший фіолетовий інквін (магічна)","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, макс. HP +220, швидк. магії +3%, швидк. руху +3%."],"160010195":["Цукерка перевтілення: найсильніший фіолетовий інквін (магічна)","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010204":["Цукерка перевтілення: величний віверн (фізична)","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +3%, швидк. руху +3%."],"160010205":["Цукерка перевтілення: мудрий віверн (магічна)","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010206":["Цукерка перевтілення: величний віверн (фізична)","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010207":["Цукерка перевтілення: мудрий віверн (магічна)","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010273":["Цукерка перевтілення: надійний данді (фізична)","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +3%, швидк. руху +3%."],"160010274":["Цукерка перевтілення: розумний данді (магічна)","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010275":["Цукерка перевтілення: надійний данді (фізична)","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, макс. HP +220, швидк. атаки +3%, швидк. руху +3%."],"160010276":["Цукерка перевтілення: розумний данді (магічна)","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. магії +3%, швидк. руху +3%."],"160010303":["Цукерка перевтілення: відважний песик (фізична)","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010304":["Цукерка перевтілення: відважний песик (фізична)","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010305":["Цукерка перевтілення: мудрий песик (магічна)","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010306":["Цукерка перевтілення: мудрий песик (магічна)","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010315":["Цукерки ледачої залізяки Айона","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010316":["Цукерки ледачої залізяки Айона","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010317":["Цукерки мудрої залізяки Айона","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010318":["Цукерки мудрої залізяки Айона","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010377":["Цукерки ледачого жовтого тигра","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010378":["Цукерки ледачого жовтого тигра","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010379":["Цукерки мудрого жовтого тигра","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010380":["Цукерки мудрого жовтого тигра","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010433":["Цукерки відважної овечки","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010434":["Цукерки відважної овечки","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010435":["Цукерки розумної овечки","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010436":["Цукерки розумної овечки","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010477":["Цукерка хороброго перевтілення: Лис","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010478":["Цукерка хороброго перевтілення: Лис","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010479":["Цукерка мудрого перевтілення: Лис","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010480":["Цукерка мудрого перевтілення: Лис","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010490":["Цукерка перевтілення: відважний козирний аристокролик","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010491":["Цукерки розумного кролика-гвардійця","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010492":["Цукерка перевтілення: відважний козирний аристокролик","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010493":["Цукерки розумного кролика-гвардійця","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010495":["Цукерка перевтілення: відважний годинникар-аристокролик","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010496":["Цукерки розумного кролика-капелюшника","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010497":["Цукерка перевтілення: відважний годинникар-аристокролик","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010498":["Цукерки розумного кролика-капелюшника","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010590":["Цукерка перевтілення: відважний лавовий пінгвін","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010591":["Цукерка перевтілення в мудрого лавового пінгвіна","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010592":["Цукерка перевтілення: відважний лавовий пінгвін","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010593":["Цукерка перевтілення в мудрого лавового пінгвіна","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010921":["Цукерка перевтілення: відважний оранжад","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010922":["Цукерки розумного апельсинового лимонаду","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010923":["Цукерка перевтілення: відважний оранжад","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010924":["Цукерки розумного апельсинового лимонаду","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010930":["Цукерка перевтілення: відважна прозорість","Для асмодіан і елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010931":["Цукерка перевтілення: мудра прозорість","Лише для асмодіан і елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010942":["Цукерка хороброго перевтілення: Панда","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010943":["Цукерка мудрого перевтілення: Панда","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010944":["Цукерка хороброго перевтілення: Панда","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160010945":["Цукерка мудрого перевтілення: Панда","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021550":["Цукерка хороброго перевтілення: Піксель у ханбоку A","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021551":["Цукерка хороброго перевтілення: Піксель у ханбоку A","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021552":["Цукерка мудрого перевтілення: Піксель у ханбоку A","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021553":["Цукерка мудрого перевтілення: Піксель у ханбоку A","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021562":["Цукерка хороброго перевтілення: Лимонад","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021563":["Цукерка хороброго перевтілення: Лимонад","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021564":["Цукерка мудрого перевтілення: Лимонад","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021565":["Цукерка мудрого перевтілення: Лимонад","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021566":["Цукерка хороброго перевтілення: Панда","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021567":["Цукерка хороброго перевтілення: Панда","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021568":["Цукерка мудрого перевтілення: Панда","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021569":["Цукерка мудрого перевтілення: Панда","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021570":["Цукерка хороброго перевтілення: Морська панда","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021571":["Цукерка хороброго перевтілення: Морська панда","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021572":["Цукерка мудрого перевтілення: Морська панда","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021573":["Цукерка мудрого перевтілення: Морська панда","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021598":["Цукерка хороброго перевтілення: Залізний Кобальт","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021599":["Цукерка хороброго перевтілення: Залізний Кобальт","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021600":["Цукерка мудрого перевтілення: Залізний Кобальт","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021601":["Цукерка мудрого перевтілення: Залізний Кобальт","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021602":["Цукерка хороброго перевтілення: Чорний Тедді","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021603":["Цукерка хороброго перевтілення: Чорний Тедді","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021604":["Цукерка мудрого перевтілення: Чорний Тедді","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021605":["Цукерка мудрого перевтілення: Чорний Тедді","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021606":["Цукерка хороброго перевтілення: Білий Тедді","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021607":["Цукерка хороброго перевтілення: Білий Тедді","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021608":["Цукерка мудрого перевтілення: Білий Тедді","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021609":["Цукерка мудрого перевтілення: Білий Тедді","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021610":["Цукерка хороброго перевтілення: Лавовий Тедді","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021611":["Цукерка хороброго перевтілення: Лавовий Тедді","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021612":["Цукерка мудрого перевтілення: Лавовий Тедді","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021613":["Цукерка мудрого перевтілення: Лавовий Тедді","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021614":["Цукерка хороброго перевтілення: Гімалайський Тедді","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021615":["Цукерка хороброго перевтілення: Гімалайський Тедді","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021616":["Цукерка мудрого перевтілення: Гімалайський Тедді","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021617":["Цукерка мудрого перевтілення: Гімалайський Тедді","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021618":["Цукерка хороброго перевтілення: Гавайський Тедді","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021619":["Цукерка хороброго перевтілення: Гавайський Тедді","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021620":["Цукерка мудрого перевтілення: Гавайський Тедді","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021621":["Цукерка мудрого перевтілення: Гавайський Тедді","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021774":["Цукерка хороброго перевтілення: Попоку","Лише для елійців. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021775":["Цукерка хороброго перевтілення: Попоку","Лише для асмодіан. Перевтілення на 60 хв. Фізична атака +3, точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021776":["Цукерка мудрого перевтілення: Попоку","Лише для елійців. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"160021777":["Цукерка мудрого перевтілення: Попоку","Лише для асмодіан. Перевтілення на 60 хв. Сила магії +15, маг. точність +60, швидк. атаки +4%, швидк. магії +4%, швидк. руху +4%."],"162001022":["Великий освіжний чай","Відновлює 100% енергії спокою"],"164002222":["Пільги управителя (1 година)","Одноразовий пропуск. Після смерті ви не дістаєте слабкості душі й не втрачаєте досвід. Політ і телепортація коштують лише 1 кинар. Ефект триває 1 год. Доступно персонажам рів. 65 і нижче."],"164002223":["Пільги управителя (7 днів)","Пропуск на 7 днів. Після смерті ви не дістаєте слабкості душі й не втрачаєте досвід. Політ і телепортація коштують лише 1 кинар. Ефект триває 1 год. Доступно персонажам рів. 65 і нижче."],"164002224":["Пільги управителя (15 днів)","Пропуск на 15 днів. Після смерті ви не дістаєте слабкості душі й не втрачаєте досвід. Політ і телепортація коштують лише 1 кинар. Ефект триває 1 год. Доступно персонажам рів. 65 і нижче."],"164002225":["Пільги управителя (30 днів)","Пропуск на 30 днів. Після смерті ви не дістаєте слабкості душі й не втрачаєте досвід. Політ і телепортація коштують лише 1 кинар. Ефект триває 1 год. Доступно персонажам рів. 65 і нижче."],"164005001":["[Івент] Давнє кільце вогню","Захист від вогню +10. Час дії: 1 год. Відкат: 1 год."],"164005002":["[Івент] Давнє кільце води","Захист від води +10. Час дії: 1 год. Відкат: 1 год."],"164005003":["[Івент] Давнє кільце вітру","Захист від повітря +10. Час дії: 1 год. Відкат: 1 год."],"164005004":["[Івент] Давнє кільце землі","Захист від землі +10. Час дії: 1 год. Відкат: 1 год."],"164005005":["[Івент] Давнє кільце магії","Маг. опір +10. Час дії: 1 год. Відкат: 1 год."],"164009999":["Самознищення","Використайте, щоб миттєво знищити свого персонажа. Діє лише в Раксангу, Рентусі, Вічному бастіоні, на Залізному фронті та полі бою Камар."],"165020008":["Сувій упаковки героїчного озброєння","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020009":["Сувій упаковки героїчних обладунків","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020010":["Сувій упаковки героїчних прикрас","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020011":["Сувій упаковки унікальної зброї","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020012":["Сувій упаковки унікальних броні","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020013":["Сувій упаковки унікальних прикрас","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020016":["Сяючий сувій упаковки героїчних прикрас","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020017":["Сяючий сувій упаковки унікального зброї","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020018":["Сяючий сувій упаковки унікальних обладунків","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"165020019":["Сяючий сувій упаковки унікальних прикрас","Запакувавши цим сувоєм предмет, який можна запакувати, ви робите його придатним до обміну."],"166030005":["Свята вода аугментації","Полийте цією святою водою придатну прикрасу, щоб підсилити її властивості."],"166200011":["Сувій перенастройки (героїчне озброєння)","Можна використовувати необмежену кількість разів, навіть коли всі переналаштування предмета вичерпано. Не змінює ні гнізда, ні рівень зачарування — лише додаткові характеристики. Нові характеристики застосовуються автоматично, і повернути попередні не можна."],"166200012":["Сувій перенастройки (героїчні обладунки)","Можна використовувати необмежену кількість разів, навіть коли всі переналаштування предмета вичерпано. Не змінює ні гнізда, ні рівень зачарування — лише додаткові характеристики. Нові характеристики застосовуються автоматично, і повернути попередні не можна."],"166200013":["Сувій перенастройки (міфіч. зброя)","Можна використовувати необмежену кількість разів, навіть коли всі переналаштування предмета вичерпано. Не змінює ні гнізда, ні рівень зачарування — лише додаткові характеристики. Нові характеристики застосовуються автоматично, і повернути попередні не можна."],"166200014":["Сувій перенастройки (міфіч. броня)","Можна використовувати необмежену кількість разів, навіть коли всі переналаштування предмета вичерпано. Не змінює ні гнізда, ні рівень зачарування — лише додаткові характеристики. Нові характеристики застосовуються автоматично, і повернути попередні не можна."],"166200017":["Сувій медитації Точиро (героїч. зброя)","Можна використати лише 3 рази на предметі вічного ґатунку. Крім додаткових характеристик, змінює також кількість гнізд і рівень зачарування. Після переналаштування нові характеристики можна прийняти або скасувати, але лічильник переналаштувань зменшується в обох випадках."],"166200018":["Сувій медитації Точиро (героїч. броня)","Можна використати лише 3 рази на предметі вічного ґатунку. Крім додаткових характеристик, змінює також кількість гнізд і рівень зачарування. Після переналаштування нові характеристики можна прийняти або скасувати, але лічильник переналаштувань зменшується в обох випадках."],"168310017":["Благословений хороший камінь божественного зачарування (ур. 2)","Надає ефект налаштування 2 рівня всім придатним надітим предметам. (усі надіті предмети)"],"168310019":["Благословенний камінь магічного зачарування II (ур. 2)","Надає ефект підсилення 2 рівня всім придатним надітим предметам. (усі надіті предмети)"],"169100000":["Засіб для зняття фарби","Знімає фарбу з предмета й повертає початковий колір."],"169200001":["Темно-зелена фарба","Фарбує предмет у синьо-зелений."],"169200002":["Блакитна фарба","Фарбує предмет у синій."],"169200003":["Коричнева фарба","Фарбує предмет у коричневий."],"169200004":["Фіолетова фарба","Фарбує предмет у пурпуровий."],"169200005":["Червона фарба","Фарбує спорядження в чистий червоний."],"169200006":["Біла фарба","Фарбує спорядження в чистий білий."],"169200007":["Чорна фарба","Фарбує спорядження в чистий чорний."],"169220004":["Помаранчева фарба","Фарбує предмет у яскраво-помаранчевий."],"169220005":["Пурпурна фарба","Фарбує предмет у яскраво-пурпуровий."],"169220006":["Рожева фарба","Фарбує предмет у яскраво-рожевий."],"169220007":["Жовта фарба","Фарбує предмет у гірчичний."],"169220008":["Світло-зелена фарба","Фарбує предмет у колір зеленого чаю."],"169220009":["Зелена фарба","Фарбує предмет в оливковий."],"169220010":["Синя фарба","Фарбує предмет у темно-синій."],"169220011":["Особлива червона фарба","Фарбує предмет у червоний тхегик."],"169230011":["Рідка сиренева фарба","Фарбує предмет у романтичний пурпуровий."],"169231016":["Яскраво-рожева фарба","Фарбує спорядження в панківський рожевий."],"169231017":["Блідо-рожева фарба","Фарбує спорядження в індійський рожевий."],"169231018":["Ніжно-рожева фарба","Фарбує спорядження в романтичний рожевий."],"169231019":["Блідо-жовта фарба","Фарбує спорядження в ніжно-жовтий."],"169231020":["Ніжно-оранжева фарба","Фарбує спорядження в пастельно-помаранчевий."],"169231022":["Блідо-зелена фарба","Фарбує спорядження в індійський зелений."],"169231023":["Блакитна фарба","Фарбує спорядження в індійський синій."],"169231024":["Небесно-блакитний фарба","Фарбує спорядження в блакитний."],"169231025":["Ніжно-фіолетова фарба","Фарбує спорядження в пастельно-фіолетовий."],"169231026":["Світло-кобальтова фарба","Фарбує спорядження у світло-кобальтовий."],"169231027":["Сіро-фіолетова фарба","Фарбує спорядження в сіро-фіолетовий."],"169231112":["Приглушено-м'ятна фарба","Фарбує предмет у блідо-м'ятний."],"169231113":["Приглушено-блакитна фарба","Фарбує предмет у блакитний."],"169240001":["Пелюстка кестала","Фарбує предмет у лаймовий колір пелюсток вікі."],"169240002":["Пелюстка хомбеля","Фарбує предмет у кораловий червоний колір пелюсток омбліка."],"169240003":["Пелюстка лепи","Фарбує предмет у жовто-зелений колір пелюсток меона."],"169240004":["Пелюстка рума","Фарбує предмет у бурштиновий колір пелюсток ормеї."],"169240005":["Пелюстка ласи","Фарбує предмет у фіолетовий колір пелюсток танге."],"169240006":["Пелюстка оккі","Фарбує предмет у морський синій колір пелюсток ервіо."],"169240007":["Пелюстка руниме","Фарбує предмет у золотий колір пелюсток луніма."],"169240008":["Пелюстка винограду","Фарбує предмет в ультрамариновий колір пелюсток вінни."],"169240009":["Пелюстка кирша","Фарбує предмет у лавандовий колір пелюсток кірки."],"169240010":["Лепесток личі","Фарбує предмет у золотий колір пелюсток бромеля."],"169240011":["Лепесток фрески","Фарбує предмет у помаранчевий колір пелюсток пресси."],"169240012":["Пелюстка мелоне","Фарбує предмет у блідо-зелений колір пелюсток мерона."],"169240013":["Лепесток вишні","Фарбує предмет у світло-жовтий колір пелюсток кукара."],"169240014":["Лепесток леофіса","Фарбує предмет у бірюзовий колір пелюсток леопіса."],"169600030":["[Сувій емоції] Указати пальцем","Відкриває емоцію."],"169600039":["[Сувій емоції] Бульбашка з жувальної гумки","Відкриває емоцію."],"169600042":["[Сувій емоції] Ножиці","Відкриває емоцію."],"169600043":["[Сувій емоції] Камінь","Відкриває емоцію."],"169600044":["[Сувій емоції] Папір","Відкриває емоцію."],"169600045":["[Сувій емоції] Знак O"],"169600046":["[Сувій емоції] Знак X","Відкриває емоцію."],"169600047":["[Сувій емоції] Знак 0","Відкриває емоцію «Знак 0»."],"169600048":["[Сувій емоції] Знак 1","Відкриває емоцію «Знак 1»."],"169600049":["[Сувій емоції] Знак 2","Відкриває емоцію «Знак 2»."],"169600050":["[Сувій емоції] Знак 3","Відкриває емоцію «Знак 3»."],"169600051":["[Сувій емоції] Знак 4","Відкриває емоцію «Знак 4»."],"169600052":["[Сувій емоції] Знак 5","Відкриває емоцію «Знак 5»."],"169600053":["[Сувій емоції] Знак 6","Відкриває емоцію «Знак 6»."],"169600054":["[Сувій емоції] Знак 7","Відкриває емоцію «Знак 7»."],"169600055":["[Сувій емоції] Знак 8","Відкриває емоцію «Знак 8»."],"169600056":["[Сувій емоції] Знак 9","Відкриває емоцію «Знак 9»."],"169600058":["[Сувій емоції] Білий прапорець","Відкриває емоцію."],"169600062":["[Сувій емоції] Серенада","Відкриває емоцію."],"169600063":["[Сувій емоції] Гра на саксофоні","Відкриває емоцію."],"169600065":["[Сувій емоції] Пісня","Відкриває емоцію."],"169600067":["[Сувій емоції] Підняти два прапорці","Відкриває емоцію."],"169600073":["[Сувій емоції] Запальне диско","Відкриває емоцію."],"169600074":["[Сувій емоції] Хіп-хоп манія","Відкриває емоцію."],"169600075":["[Сувій емоції] Хвиля спокуси","Відкриває емоцію."],"169600076":["[Сувій емоції] Принц попси","Відкриває емоцію."],"169600077":["[Сувій емоції] Пристрасний латино","Відкриває емоцію."],"169600078":["[Сувій емоції] Танок Wonder Girls 2DT (ч.1)","Дає змогу отримати емоцію «Танець „2DT“, частина 1» з музичним супроводом."],"169600079":["[Сувій емоції] Танок Wonder Girls 2DT (ч.2)","Дає змогу отримати емоцію «Танець „2DT“, частина 2» з музичним супроводом."],"169600080":["[Сувій емоції] Танок Wonder Girls 2DT (ч.3)","Дає змогу отримати емоцію «Танець „2DT“, частина 3» з музичним супроводом."],"169600081":["[Сувій емоції] Танок Tell Me","Дає змогу отримати емоцію «Танець „Tell Me“» з музичним супроводом."],"169600082":["[Сувій емоції] Танок Nobody","Дає змогу отримати емоцію «Танець „Nobody“» з музичним супроводом."],"169600086":["[Сувій емоції] Танок Shut off","Ви можете вивчити емоцію гурту Miss A."],"169600087":["[Сувій емоції] Танок 'Погана дівчинка'","Ви можете вивчити емоцію гурту Miss A."],"169600088":["[Сувій емоції] Танок 'Через тебе'","Ви можете вивчити емоцію гурту Miss A."],"169600089":["[Сувій емоції] Танок 'Крабові клешні'","Ви можете вивчити емоцію гурту Miss A."],"169600090":["[Сувій емоції] Танок 'Безвідповідне кохання'","Ви можете вивчити емоцію гурту Miss A."],"169600091":["[Сувій емоції] Танок 'Тук-тук'","Ви можете вивчити емоцію гурту Miss A."],"169600092":["[Сувій емоції] Канкан","Відкриває емоцію."],"169600093":["[Сувій емоції] Гра на барабані","Відкриває емоцію."],"169600095":["[Сувій емоції] Лепестки","Відкриває емоцію."],"169600096":["[Сувій емоції] Мильні бульбашки","Відкриває емоцію."],"169600097":["[Сувій емоції] Валяти дурака","Відкриває емоцію."],"169600098":["[Сувій емоції] Обійми мене","Відкриває емоцію."],"169600099":["[Сувій емоції] Жонглювання","Відкриває емоцію."],"169600100":["[Сувій емоції] Паперова пташка","Відкриває емоцію."],"169600101":["[Сувій емоції] Сервіровка омлету","Відкриває емоцію."],"169600102":["[Сувій емоції] Підмести підлогу","Відкриває емоцію."],"169600103":["[Сувій емоції] Занурення","Відкриває емоцію."],"169600186":["[Сувій емоції] Пісня 'Гарний день'","Відкриває емоцію IU."],"169600187":["[Сувій емоції] Пісня 'Ти і я'","Відкриває емоцію IU."],"169600188":["[Сувій емоції] Танок 'Навертаються сльози'","Відкриває емоцію: танець IU «Tearful»."],"169600189":["[Сувій емоції] Танок 'Ти мені подобаєшся'","Відкриває емоцію: танець IU «Can't Get Enough of Him»."],"169600190":["[Сувій емоції] Танок 'Поклич мене'","Відкриває емоцію: танець IU «Call My Name»."],"169600191":["[Сувій емоції] Танок 'Зачарування'","Відкриває емоцію: танець IU «I Put a Spell On You»."],"169600192":["[Сувій емоції] Танок 'Ти і я'","Відкриває емоцію: танець IU «You and I»."],"169600193":["[Сувій емоції] Підтримати когось","Відкриває емоцію."],"169600194":["[Сувій емоції] Головна пісня","Відкриває емоцію."],"169600195":["[Сувій емоції] Кетчер","Відкриває емоцію."],"169600196":["[Сувій емоції] Пітчер","Відкриває емоцію."],"169600197":["[Сувій емоції] Беттер","Відкриває емоцію."],"169600201":["[Сувій емоції] Низький уклін","Навчає емоції."],"169600202":["[Сувій емоції] Жартівливий уклін","Навчає емоції."],"169600206":["[Сувій емоції] Сніговик","Відкриває емоцію."],"169600300":["[Сувій емоції] Надувний птах"],"169600301":["[Сувій емоції] Надувна райдуга"],"169601063":["[Сувій емоції] Хелловінський переляк"],"169610040":["[Сувій титулу] Найкращий клієнт Гупрінга (15 дн.)","Швидк. руху +5%, швидк. польоту +4%, швидк. атаки +2%. Діє 15 дн."],"169610041":["[Сувій титулу] Найкращий клієнт Джієлінліна (15 дн.)","Швидк. руху +5%, швидк. польоту +4%, швидк. магії +2%. Діє 15 дн."],"169610052":["[Титул] Ваше сяйво (30 дн.)","Швидк. руху +4%, швидк. атаки +4%, швидк. магії +4%. Діє 30 дн."],"169610075":["[Сувій титула] Молниеносний даєв (7 дн.)","Швидк. руху +5%, швидк. польоту +5%. Діє 7 дн."],"169610097":["[Титул] Бігун","Швидк. руху +3%, швидк. атаки +2%, швидк. магії +2%, атака +3. Постійний титул."],"169610098":["[Титул] Лавчач","Швидк. атаки +2%, ф. крит. +8, атака +3. Постійний титул."],"169610099":["[Титул] Умниця","Швидк. магії +2%, м. крит. +4, сила магії +17. Постійний титул."],"169610137":["[Сувій титулу] Друг Мунина","Макс. HP +500, швидк. руху +5%, швидк. атаки +3%, швидк. магії +3%. Постійний титул."],"169610138":["[Сувій титулу] Друг Мунина (7 дн.)","Макс. HP +500, швидк. руху +5%, швидк. атаки +3%, швидк. магії +3%. Діє 7 дн."],"169610139":["[Сувій титулу] Друг Мунина (15 дн.)","Макс. HP +500, швидк. руху +5%, швидк. атаки +3%, швидк. магії +3%. Діє 15 дн."],"169610140":["[Сувій титулу] Друг Мунина (30 дн.)","Макс. HP +500, швидк. руху +5%, швидк. атаки +3%, швидк. магії +3%. Діє 30 дн."],"169620062":["Амулет очок Безодні +50%","Поки амулет активний, ви отримуєте на 50% більше очок Безодні в PvE та PvP. Час дії: 1 год. Відкат: 1 год."],"169620067":["Сувій збільшення очок Безодні II (50%)","Поки амулет активний, ви отримуєте на 50% більше очок Безодні в PvE та PvP. Час дії: 2 год. Відкат: 10 год."],"169620075":["Сувій збільшення очок збирання I","Навички видобутку есенції та ефіру опановуються на 200% швидше. Час дії: 1 год. Відкат: 1 год."],"169620120":["Амулет +100% досвіду (ур. 65)","Поки діє амулет досвіду Бердіна IV (100%), ви отримуєте на 100% більше досвіду за збирання, ремесло та здолання істот. Час дії: 1 год. Відкат: 1 год."],"169620128":["Амулет успіху III","Поки діє ефект, ви отримуєте на 200% більше досвіду за полювання на істот, а шанс випадіння предметів із монстрів зростає на 50%. Ефект триває 1 год."],"169620138":["Сувій збільшення очок ремесел I (500%)","Прискорює здобуття навичок ремесла та будівництва на 500%. Час дії: 1 год. Відкат: 1 год."],"169630007":["[Сувій розширення] Розширення куба (ур. 4)","Розширює куб на 1 ряд, максимум до 4 додаткових рядів разом із раніше використаними купонами. Можна використати до 4 разів."],"169640007":["[Сувій розширення] Розширення складу (ур. 4)","Розширює сховище на 1 ряд, максимум до 4 додаткових рядів разом із раніше використаними купонами. Можна використати до 4 разів."],"169650000":["Купон на зміну зовнішності","Ви можете змінити обличчя та статуру. Щоб змінити зовнішність, зверніться до деви зовнішності в «Ангельських оздобах»."],"169660000":["Купон на зміну статі","Ви можете змінити стать, а також обличчя та статуру. Елійці міняють стать у Еврипіда в таверні Зовнішньої гавані, асмодіани — у Йотунмодра в завулках площі Пандемоніуму."],"169661000":["Купон на зміну зовнішнього вигляду резиденції"],"169661001":["Купон на зміну зовнішнього вигляду елітного будинку"],"169661002":["Купон на зміну зовнішнього вигляду хорошого будинку"],"169661003":["Купон на зміну зовнішнього вигляду звичайного будинку"],"169661004":["Купон на зміну зовнішнього вигляду резиденції"],"169661005":["Купон на зміну зовнішнього вигляду елітного будинку"],"169661006":["Купон на зміну зовнішнього вигляду хорошого будинку"],"169661007":["Купон на зміну зовнішнього вигляду звичайного будинку"],"169670000":["Купон на зміну імені персонажа","Дає змогу змінити ім'я персонажа."],"169680000":["Купон на зміну назви легіону","Дає змогу змінити назву легіону."],"169800171":["[Купон на зачіску] Двохкольорові локони","Лише для жінок-елійців."],"169800172":["[Купон на зачіску] Довгий хвостик","Лише для жінок-елійців."],"169800173":["[Купон на зачіску] Два хвостика","Лише для жінок-елійців."],"169800174":["[Купон на зачіску] Довгі прямі волосся","Лише для жінок-елійців."],"169800175":["[Купон на зачіску] Модно укладені довгі волосся","Лише для жінок-елійців."],"169800472":["[Купон на зачіску] Двохкольорові локони","Лише для жінок-асмодіан."],"169800473":["[Купон на зачіску] Довгий хвостик","Лише для жінок-асмодіан."],"169800474":["[Купон на зачіску] Два хвостика","Лише для жінок-асмодіан."],"169800475":["[Купон на зачіску] Довгі прямі волосся","Лише для жінок-асмодіан."],"169800476":["[Купон на зачіску] Модно укладені довгі волосся","Лише для жінок-асмодіан."],"169801501":["Купон на зачіску №01","Лише для чоловіків-елійців."],"169801506":["Купон на зачіску №06","Лише для чоловіків-елійців."],"169801507":["Купон на зачіску №07","Лише для чоловіків-елійців."],"169801519":["Купон на зачіску №19","Лише для жінок-елійців."],"169801523":["Купон на зачіску №23","Лише для жінок-елійців."],"169801525":["Купон на зачіску №25","Лише для жінок-елійців."],"169801528":["Купон на зачіску №28","Лише для жінок-елійців."],"169801530":["Купон на зачіску №30","Лише для чоловіків-асмодіан."],"169801535":["Купон на зачіску №35","Лише для чоловіків-асмодіан."],"169801536":["Купон на зачіску №36","Лише для чоловіків-асмодіан."],"169801549":["Купон на зачіску №49","Лише для жінок-асмодіан."],"169801553":["Купон на зачіску №53","Лише для жінок-асмодіан."],"169801555":["Купон на зачіску №55","Лише для жінок-асмодіан."],"169801558":["Купон на зачіску №58","Лише для жінок-асмодіан."],"169801990":["Купон на зачіску №74","Лише для жінок-асмодіан."],"169801991":["Купон на зачіску №81","Лише для жінок-елійців."],"169801994":["Купон на зачіску №107","Лише для жінок-асмодіан."],"169801995":["Купон на зачіску №107","Лише для жінок-елійців."],"169801996":["Купон на зачіску №108","Лише для жінок-асмодіан."],"169801997":["Купон на зачіску №108","Лише для жінок-елійців."],"169801998":["Купон на зачіску №110","Лише для жінок-асмодіан."],"169801999":["Купон на зачіску №110","Лише для жінок-елійців."],"169802000":["Купон на зачіску №111","Лише для жінок-асмодіан."],"169802001":["Купон на зачіску №111","Лише для жінок-елійців."],"169802002":["Купон на зачіску №118","Лише для жінок-асмодіан."],"169802003":["Купон на зачіску №118","Лише для жінок-елійців."],"169802004":["Купон на зачіску №119","Лише для жінок-асмодіан."],"169802005":["Купон на зачіску №119","Лише для жінок-елійців."],"169802006":["Купон на зачіску №120","Лише для жінок-асмодіан."],"169802007":["Купон на зачіску №120","Лише для жінок-елійців."],"169802008":["Купон на зачіску №121","Лише для жінок-асмодіан."],"169802009":["Купон на зачіску №121","Лише для жінок-елійців."],"169802010":["Купон на зачіску №122","Лише для жінок-асмодіан."],"169802011":["Купон на зачіску №122","Лише для жінок-елійців."],"169802014":["Купон на зачіску №89","Лише для жінок-асмодіан."],"169802015":["Купон на зачіску №89","Лише для жінок-елійців."],"169802016":["Купон на зачіску №69","Лише для чоловіків-асмодіан."],"169802017":["Купон на зачіску №69","Лише для чоловіків-елійців."],"170030048":["Настінна прикраса з солодкого шоколаду"],"170030049":["Настінна прикраса з льодяників"],"170030050":["Настінна прикраса «Романтика»"],"170030051":["Настінна прикраса «Цукрова мрія»"],"170100023":["Гарбузовий комод","Тумба, оздоблена гарбузами. У ній можна зберігати речі."],"170100024":["Дерев'яний комод","Тумба-дерево до Свята врожаю. У ній можна зберігати речі."],"170100025":["Комод з витонченими метеликами","Тумба, оздоблена витонченими метеликами. У ній можна зберігати речі, як у сховищі."],"170100026":["Комод пори року","Барвиста панельна тумба. У ній можна зберігати речі, як у сховищі."],"170100027":["Практичний дерев'яний комод","Проста, але практична дерев'яна тумба. У ній можна зберігати речі, як у сховищі."],"170100037":["[Івент] Ящик сніговика Дідморозинга","Цю тумбу на три шухляди зроблено до Новорічного свята. У ній можна зберігати речі, як у сховищі."],"170120016":["Ліжко з хмар","Ліжко у формі хмаринки для оздоблення інтер'єру."],"170120025":["Ліжко з солодкого шоколаду"],"170120026":["Ліжко з льодяників"],"170120027":["Ліжко «Романтика»"],"170120028":["Ліжко «Цукрова мрія»"],"170120033":["Новорічне ліжко","Затишне ліжко якраз до Новорічного свята."],"170120034":["Ліжко до Хелловіну","Затишне ліжко якраз для Свята врожаю."],"170120035":["Східне ліжко","Розкішне ліжко."],"170125012":["Ліжко з хмар","Ліжко у формі хмаринки для оздоблення інтер'єру."],"170130015":["Крісло з хмар","Диван у формі хмаринки для оздоблення інтер'єру."],"170130039":["Крісло з солодкого шоколаду"],"170130040":["Крісло з льодяників"],"170130041":["Крісло «Романтика»"],"170130042":["Крісло «Цукрова мрія»"],"170130052":["Новорічний диван","Диван із подушками «Червоний ніс», якраз до Новорічного свята."],"170130053":["Диван до Хелловіну","Моторошний диван, що якнайкраще пасує до Свята врожаю."],"170135014":["Крісло з хмар","Диван у формі хмаринки для оздоблення інтер'єру."],"170140000":["Стіл з хмар","Стіл у формі хмаринки для оздоблення інтер'єру."],"170140001":["Стіл з солодкого шоколаду"],"170140002":["Стіл з льодяників"],"170140003":["Стіл «Романтика»"],"170140004":["Стіл «Цукрова мрія»"],"170145000":["Стіл з хмар","Стіл у формі хмаринки для оздоблення інтер'єру."],"170150000":["Ліхтар з хмар","Світильник у формі хмаринки для оздоблення інтер'єру."],"170150001":["Гарбузова лампа до Хелловіну","Гарбузовий світильник якраз до Свята врожаю."],"170150002":["Гарбузова настінна лампа до Хелловіну","Настінний світильник якраз до Свята врожаю."],"170150004":["Новорічна свічка","Новорічна свічка. Для оздоблення інтер'єру."],"170150005":["Східний торшер","Торшер із теплим сяйвом."],"170150006":["Східний світильник","Настільна лампа з теплим сяйвом."],"170155000":["Ліхтар з хмар","Світильник у формі хмаринки для оздоблення інтер'єру."],"170160011":["Ширма до Хелловіну","Перегородка до Свята врожаю, щоб розділити дім."],"170160012":["Витончений дерев'яний ширм","Елегантна ґратчаста ширма."],"170410031":["Східний диван","Зручний диван із ґратчастою спинкою."],"170420039":["Східний обідній стіл","Простий елегантний обідній стіл."],"187000080":["Унікальні крила NPC легіону","Доступно з рів. 60. Не передається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187000108":["Крила на кожен день околиць NPC","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187000117":["Крила начальника фортеці NPC","Доступно з рів. 60. Не передається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187000119":["Героїчні крила NPC посилювач","Доступно з рів. 60. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187000120":["Крила NPC Айю","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187000142":["Блискучі крила","Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187000183":["Крила небесного провісника"],"187000278":["Найкращі бойові крила з тихого чорного пір'я"],"187000953":["Крила короля темних драконів"],"187000954":["Крила зухвалого дракона"],"187000955":["Крила кролика мрійливої зірки"],"187000957":["Крила-щит"],"187000958":["Крило кита нічного неба"],"187000959":["Крило сяйного небесного кита"],"187000960":["Рожеве крило небесного кита"],"187000961":["Призахідне крило небесного кита"],"187000962":["Фіолетове крило небесного кита"],"187000963":["Крило мрійливого небесного кита"],"187000964":["Крила білого дракона"],"187005006":["Блискавичні крила","Доступно з рів. 10. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187050040":["Крила короля грозових драконів","Доступно з рів. 10. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187055004":["Крила забуття","Доступно з рів. 10. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060078":["Крила драмати","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060081":["Кістяні крила драмати","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060091":["Сяючі крила світла","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060120":["Крила Удві","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе. Лише для асмодіан."],"187060125":["Крила джина","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060126":["Чорні крила ангела","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060127":["Червоні крила ангела","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060128":["Стихійні крила ангела","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060129":["Білі крила ангела","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060133":["Крила Рудри","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060134":["Крила давнього елементаля","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060136":["Чорні стимпанковські крила","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060148":["Срібні стимпанковські крила","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060188":["[Івент] Крила розкішної жар-птиці"],"187060192":["Лазурні крила"],"187060195":["Крила магми"],"187060199":["Крила архангела","Доступно з рів. 30. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060204":["Крила чорного дракона","Доступно з рів. 30. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060207":["Крила червоного дракона","Доступно з рів. 30. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060234":["Золоті стимпанковські крила","Доступно з рів. 10. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060278":["Скляні крила (зовнішній вигляд)"],"187060315":["Білосніжні крила"],"187060321":["Крила нічного неба","Доступно з рів. 30. Не продається. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187060353":["Крила пляжної зірки"],"187060372":["Крила палкого курчати"],"187060378":["Крила курчати"],"187060494":["Крила хіпстера Гонрьонпо"],"187060495":["Крила мафіозі"],"187060913":["Цвірінь-цвірінь крильця"],"187065000":["Чорна енергія","Доступно з рів. 10. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187065001":["Квіткові крила","Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187065003":["Крила-краплини","Доступно з рів. 10. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187065006":["Крила фенікса"],"187065020":["Крила крижаного полум’я"],"187065024":["Крила лорда-заступника балаурів","Доступно з рів. 10. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187065030":["Піксельні крила","Доступно з рів. 10. Не передається. Не продається. Не зберігається у сховищі облікового запису. Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187065031":["Крила Четвертого Володаря Драконів","Не зберігається у сховищі легіону. Можна використати лише раз для зміни вигляду. Покращення неможливе."],"187065059":["Золоті крила героя"],"187065060":["Крила-дискокуля"],"187070089":["Крила котика-віяла"],"187070091":["Крила Фестоса"],"187070096":["Крила для балу Люмінарі"],"187070097":["Стилізовані традиційні крила"],"187079020":["Крила вампіра"],"188051641":["Безкінечний купон на зміну зовнішності (1 дн.)","Дає змогу отримати купон на зміну обличчя та статури. Діє 1 дн."],"188051642":["Безкінечний купон на зміну зовнішності (3 дн.)","Дає змогу отримати купон на зміну обличчя та статури. Діє 3 дн."],"188052558":["Велика скринька гарантованого вставляння (героїчний)","Містить велике гарантоване знаряддя вдалого вставляння (героїчний) для спорядження героїчного ґатунку рів. 65 і нижче."],"188052559":["Велика скринька гарантованого вставляння (вічний)","Містить велике гарантоване знаряддя вдалого вставляння (вічний) для спорядження вічного ґатунку рів. 65 і нижче."],"188052560":["Велика скринька гарантованого вставляння (міфічний)","Містить велике гарантоване знаряддя вдалого вставляння (міфічний) для спорядження міфічного ґатунку рів. 65 і нижче."],"188057910":["Скриня початкового спорядження","Скринька стартового спорядження."],"188057921":["Скринька вибору стартової зброї","Скринька вибору стартової зброї"],"188500009":["Стильна вивіска для лавки","Новенька вивіска для реклами приватної крамниці."],"188500014":["[Сувій дій] Набір майстра кунг-фу","Дає змогу стояти, бігати, стрибати й відпочивати, як майстер кунг-фу."],"188500027":["[Сувій дій] Зачекай, дзвонить!","Змінює лише дію очікування."],"188500061":["[Сувій дій] Міні-вентилятор","Змінює лише дію очікування."],"188500064":["[Сувій дій] Обійми з тигром","Змінює лише дію відпочинку."],"188500068":["[Сувій дій] Пірнання","Змінює лише дію відпочинку."],"188500079":["[Сувій дій] Феєрверк","Змінює лише дію очікування."],"188500083":["[Сувій дій] Роздуми","Змінює лише дію відпочинку."],"188500093":["[Сувій дій] Відпочинок у воді","Змінює лише дію відпочинку."],"188500213":["[Сувій дій] Мрія про політ","Змінює лише дію очікування."],"188501006":["[Сувій дій] Хороша прогулянка","Змінює лише дію очікування."],"188501012":["[Сувій дій] Чемпіон із боксу","Змінює лише дію очікування."],"188501017":["[Сувій дій] Вічна тиша","Змінює лише дію відпочинку."],"188501026":["[Сувій дій] Єнот біля багаття","Змінює лише дію відпочинку."],"188501050":["[Сувій дій] Концентрація енергії","Змінює лише дію очікування."],"188501051":["[Сувій дій] Дивовижна подорож","Змінює лише дію очікування."],"188501054":["[Сувій дій] Перекид","Змінює лише дію стрибка."],"188501066":["[Сувій дій] Приємна прогулянка","Змінює лише дію очікування."],"188501091":["[Сувій дій] Катання на роликах","Змінює дії очікування, бігу, стрибків і відпочинку на катання на роликах."],"188501092":["[Сувій дій] Весняна лавка"],"188508005":["[Сувій дій] Сучасне життя","Змінює лише дію очікування."],"188508017":["[Сувій дій] Господар шторму","Змінює дії очікування, бігу, стрибків і відпочинку на дії Царя мавп."],"188508028":["[Сувій дій] Летюча кульбаба","Змінює лише дію очікування."],"188508035":["[Сувій дій] Котись, ведмедику!","Змінює дії бігу та стрибків."],"188508036":["[Сувій дій] Біжи, ведмедику!","Змінює дії бігу та стрибків."],"188508051":["[Сувій дій] Катання на ковзанах","Змінює дії очікування, бігу, стрибків і відпочинку на катання на ковзанах."],"188508055":["[Сувій дій] Енергійний танець","Змінює лише дію очікування."],"188508086":["[Сувій дій] Дева-рейнджер №1","Змінює лише дію відпочинку."],"188508087":["[Сувій дій] Дева-рейнджер №2","Змінює лише дію відпочинку."],"188508088":["[Сувій дій] Дева-рейнджер №3","Змінює лише дію відпочинку."],"188508089":["[Сувій дій] Дева-рейнджер №4","Змінює лише дію відпочинку."],"188508090":["[Сувій дій] Дева-рейнджер №5","Змінює лише дію відпочинку."],"188509002":["[Сувій дій] Гість на весіллі","Змінює лише дію очікування."],"188509022":["[Сувій дій] Кулька","Змінює лише дію очікування."],"188509027":["[Сувій дій] Сердечко","Змінює лише дію очікування."],"188509029":["[Сувій дій] Зимовий відпочинок","Змінює лише дію відпочинку."],"188600266":["[Івент] Сувій входу в мавзолей імператорів шиго","Сувій скидання входів у мавзолей імператорів шиго. Можна купити не більше 2 шт."],"188920022":["Талісман досвіду Роана I","Витрачає 40% вашого досвіду."],"190000000":["Сибірський тигр (багатофункціональний тип)","Використовує страви та 6 сувоїв; сповіщає про ворогів; автоматично збирає здобич."],"190000001":["Сибірський тигр (для прикраси)","Сповіщає про ворогів; автоматично збирає здобич."],"190000009":["Сибірський тигр (продуктивний тип - 6)","Носить 6 предметів; сповіщає про ворогів; автоматично збирає здобич."],"190000010":["Червоноокий лірейл"],"190000011":["Швидкий керука"],"190000012":["Довгодзьобий вівіан"],"190000013":["Мовчазний муто"],"190000014":["Синій дебр"],"190000015":["Смугастий ельрок"],"190000016":["Рокан"],"190000017":["Золотистий патрас"],"190000018":["Сірий ослик","Носить 6 предметів."],"190000019":["Рудий ослик","Носить 6 предметів."],"190000020":["Оката тука","Дає в'язку самоцвітів, коли нагодований"],"190000021":["Сумчастий басиліт","Дає в'язку руди, коли нагодований."],"190000022":["Пухнастий барашек","Дає в'язку пелюсток (фарба), коли нагодований."],"190000023":["Прожерливий кулус (різне)","Дає різні предмети, коли нагодований."],"190000024":["Дикий кошеня","Рудий кіт"],"190000025":["Білий щеня"],"190000026":["Лисий фонгос"],"190000030":["Піщана наєда","Сповіщає про ворогів."],"190000031":["Пухкий кулус (різне)","Дає різні предмети, коли нагодований."],"190000033":["Безтурботний мандри"],"190000034":["Метушливий мандри"],"190000035":["Синьоухий сприг","Носить 12 предметів."],"190000036":["Червонорукий керубим","Носить 12 предметів."],"190000045":["Сріблястий патрас","Сповіщає про ворогів."],"190000046":["Золотогривий трирог","Носить 12 предметів."],"190000047":["Золотий дракі (12 комірок)","Носить 12 предметів."],"190000048":["Золотистий кюд","Сповіщає про ворогів."],"190000049":["Рожевий кюд","Автоматично збирає здобич."],"190000050":["Сивий мандри","Використовує страви, сувоїв не витрачає"],"190000051":["Сприг-капелюшник","Використовує страви та 1 сувій."],"190000053":["Біловухий ельрок"],"190000054":["Аквамариновий дрейкін","Дає в'язку балік-матеріалів, коли нагодований."],"190000055":["Пурпурний дебр"],"190000056":["Зелений дебр"],"190000057":["Ізумрудний дебр"],"190000058":["Синій дебр"],"190000059":["Сріблястий дебр"],"190000060":["Червоний дебр"],"190000061":["Помаранчевий дебр"],"190000062":["Фіолетовий дебр"],"190000063":["Золотистий дебр"],"190000064":["Чорний дебр"],"190000075":["Втеча Поппі","Дає різні предмети, коли нагодований."],"190000076":["Золотий дракі (18 комірок)","Носить 18 предметів."],"190000077":["Ембріон сталевого наркі","Використовує страви та 2 сувої"],"190000078":["Ембріон бродячого теріона","Носить 18 предметів."],"190000090":["Ембріон міні-Гіперіона","Використовує приготовані страви та 6 сувоїв; збирає здобич; сповіщає про ворогів"],"190000091":["Ембріон палкого шугоста","Використовує приготовані страви та 6 сувоїв; збирає здобич; сповіщає про ворогів"],"190000092":["Ембріон синьоокого сприга","Використовує приготовані страви та 6 сувоїв; збирає здобич; сповіщає про ворогів"],"190000093":["Ембріон Данді","Використовує приготовані страви та 6 сувоїв; збирає здобич; сповіщає про ворогів"],"190010000":["Ізумрудний дрейкін"],"190010007":["Акуратний шиго","Носить 24 предмети."],"190020001":["Ембріон кралла в масці"],"190020002":["Носатий тион"],"190020003":["Довговусий тион"],"190020006":["Стрибучий шуго (сповіщення)","Сповіщає про ворогів."],"190020007":["Пильний шуго (збирання здобичі)","Сповіщає про ворогів."],"190020010":["Божевільний мандри","Сповіщає про ворогів."],"190020012":["Синій стерен","Сповіщає про ворогів."],"190020013":["Рожевий стерен","Сповіщає про ворогів."],"190020015":["Синьогривий трирог","Носить 12 предметів."],"190020017":["Старійшина му-му","Носить 18 предметів."],"190020018":["Вождь му-му","Носить 18 предметів."],"190020020":["Дотошний шиго","Носить 24 предмети."],"190020021":["Товстий фогус","Дає в'язку мана-каменів, коли нагодований."],"190020022":["Капризний форок","Дає в'язку мана-каменів, коли нагодований."],"190020023":["Ембріон впертого форока","Дає в'язку зібраних матеріалів, коли нагодований."],"190020026":["Керубим-боксер","Носить 12 предметів; сповіщає про ворогів."],"190020027":["Сталевогривий нарки","Носить 12 предметів; дає в'язку ефіру, коли нагодований."],"190020028":["Рожевий грифон","Носить 12 предметів; дає в'язку ефіру, коли нагодований."],"190020031":["Синій грифон","Носить 18 предметів; сповіщає про ворогів; дає в'язку ефіру, коли нагодований."],"190020032":["Пурпурний дрейкін","Носить 18 предметів; сповіщає про ворогів; дає в'язку балік-матеріалів, коли нагодований."],"190020033":["Персидське кошеня","Тепло-білий кіт; турецька ангора"],"190020034":["Сіамський кошеня","Сіамський кіт"],"190020035":["Русський кошеня","Чорний кіт"],"190020036":["Рудий щеня"],"190020047":["Плямистий айлу (12 комірок)","Носить 12 предметів."],"190020049":["Шиго"],"190020050":["Дівчинка-шиго"],"190020057":["Довгоногий страус"],"190020058":["Кігтистий страус","Дає в'язку мана-каменів, коли нагодований; сповіщає про ворогів."],"190020059":["Дракоша"],"190020060":["Горинич","Сповіщає про ворогів; дає в'язку зібраних матеріалів, коли нагодований."],"190020061":["Сніжна радама"],"190020062":["Золота радама","Носить 12 предметів; дає в'язку ефіру, коли нагодований."],"190020063":["Товстий теріон"],"190020064":["Могутній теріон","Сповіщає про ворогів."],"190020065":["Прожерливий кулус","Дає в'язку мана-каменів, коли нагодований."],"190020068":["Стрибучий шуго (підсилення)","Використовує страви та 2 сувої."],"190020069":["Пильний шуго (підсилення)","Використовує страви та 2 сувої."],"190020070":["Столітній золотий женьшень"],"190020071":["Тисячолітній золотий женьшень","Використовує страви та 2 сувої; дає в'язку ефіру, коли нагодований"],"190020072":["Колючий фонгос"],"190020073":["Пухнастий фонгос","Сповіщає про ворогів."],"190020074":["Огнекрил","Автоматично збирає здобич."],"190020075":["Світлокрил"],"190020076":["Червоний краб","Носить 12 предметів."],"190020077":["Зелений краб"],"190020078":["Липкий коробок"],"190020079":["Склизький коробок","Сповіщає про ворогів."],"190020080":["Косматий вовк","Автоматично збирає здобич."],"190020081":["Гривастий вовк"],"190020082":["Жовтий бульдозер","Автоматично збирає здобич."],"190020083":["Синій бульдозер"],"190020084":["Колобок у синій бандані"],"190020086":["Червоний діабол (підсилення)","Використовує страви та 2 сувої; сповіщає про ворогів."],"190020087":["Зелений диявол"],"190020089":["Синій мерек"],"190020092":["Місячний фагос","Носить 12 предметів; автоматично збирає здобич."],"190020104":["Велика шуго-дівчинка (30 дн.)","Носить 30 предметів; залишається 30 днів."],"190020105":["Великий шуго-хлопчик (30 дн.)","Носить 30 предметів; залишається 30 днів."],"190020109":["Сантарунг","Носить 24 предмети; використовує страви та 2 сувої."],"190020114":["Котеня в ковпаку","На ньому мила святкова шапочка!"],"190020116":["Кобушка в червоній шапці (30 дн.)","Використовує страви та 2 сувої; дає невідому в'язку, коли нагодований. Залишається 30 днів"],"190020122":["Лукешунерк (30 дн.)","Дає подарунки, коли нагодований; залишається 30 днів."],"190020131":["Рожевий радама (30 дн.)","Дає в'язку ефіру, коли нагодований; залишається 30 днів."],"190020133":["Рудра бурі","Використовує страви та 2 сувої; автоматично збирає здобич"],"190020135":["Посилений плямистий теріон","Носить 18 предметів; автоматично збирає здобич."],"190020136":["Посилений кунг-фу мандри","Використовує страви, сувоїв не витрачає; сповіщає про ворогів"],"190020137":["Посилений насмішливий джеффі","Сповіщає про ворогів; автоматично збирає здобич."],"190020147":["Невинний мерек (30 дн.)","Використовує страви та 2 сувої; дає приріст досвіду, коли нагодований"],"190020151":["Пекельний діабол (30 дн.)","Використовує страви та 2 сувої; дає амулет очок Безодні, коли нагодований"],"190020155":["Величний айлу (30 дн.)","Носить 30 предметів; сповіщає про ворогів; залишається 30 днів."],"190020156":["Шиго-переможець","Використовує страви та 2 сувої."],"190020158":["Акарун із золотою короною (7 дн.)","Дає в'язку мана-каменів, коли нагодований."],"190020161":["Червоний бульдозер","Сповіщає про ворогів; автоматично збирає здобич."],"190020164":["Діно"],"190020165":["Шуго-прапороносець: Туреччина","Використовує страви та 2 сувої."],"190020166":["Шуго-прапороносець: США","Використовує страви та 2 сувої."],"190020167":["Шуго-прапороносець: Канада","Використовує страви та 2 сувої."],"190020168":["Шуго-прапороносець: Австралія","Використовує страви та 2 сувої."],"190020169":["Шуго-прапороносець: Бразилія","Використовує страви та 2 сувої."],"190020170":["Шуго-прапороносець: Аргентина","Використовує страви та 2 сувої."],"190020171":["Шуго-прапороносець: Німеччина","Використовує страви та 2 сувої."],"190020172":["Шуго-прапороносець: Франція","Використовує страви та 2 сувої."],"190020173":["Шуго-прапороносець: Велика Британія","Використовує страви та 2 сувої."],"190020174":["Ручний сіамський кошеня","Носить 26 предметів."],"190020175":["Тахабата","Носить 30 предметів."],"190020176":["Шуго-прапороносець: Китай","Використовує страви та 2 сувої."],"190020177":["Шуго-прапороносець: Тайвань","Використовує страви та 2 сувої."],"190020178":["Шуго-прапороносець: Японія","Використовує страви та 2 сувої."],"190020179":["Шуго-прапороносець: Росія","Використовує страви та 2 сувої."],"190020180":["Плодючий золотий женьшень","Носить 32 предмети."],"190020181":["Шуго-прапороносець: Італія","Використовує страви та 2 сувої."],"190020182":["Шуго-прапороносець: Іспанія","Використовує страви та 2 сувої."],"190020183":["Шуго-прапороносець: Польща","Використовує страви та 2 сувої."],"190020184":["Шуго-прапороносець: Сінгапур","Використовує страви та 2 сувої."],"190020185":["Шуго-прапороносець: Таїланд","Використовує страви та 2 сувої."],"190020186":["Шуго-прапороносець: Філіппіни","Використовує страви та 2 сувої."],"190020187":["Шуго-прапороносець: Індонезія","Використовує страви та 2 сувої."],"190020188":["Шуго-прапороносець: Малайзія","Використовує страви та 2 сувої."],"190020189":["Шуго-прапороносець: В'єтнам","Використовує страви та 2 сувої."],"190020192":["Веселий кобушка (15 дн.)","Дає в'язку зіль, коли нагодований. Залишається 15 днів"],"190020197":["Золотий кулус (7 дн.)","Дає в'язку мана-каменів, коли нагодований."],"190020198":["Мудрий дракон","Використовує страви та 3 сувої."],"190020199":["Почесний диявол (30 дн.)","Використовує страви та 3 сувої; автоматично збирає здобич; залишається 30 днів."],"190020200":["Почесний янгол (30 дн.)","Використовує страви та 3 сувої; автоматично збирає здобич; залишається 30 днів."],"190020201":["Тисячолітній золотий женьшень","Носить 30 предметів; сповіщає про ворогів."],"190020203":["Панда Мурим","Носить 34 предмети; сповіщає про ворогів."],"190020208":["Ембріон маленької Тіамат","Використовує приготовані страви та 3 сувої; збирає здобич"],"190020214":["Ембріон королеви кішок","Використовує приготовані страви та 3 сувої"],"190020219":["Ембріон носатого тіона","Використовує приготовані страви та 3 сувої"],"190020223":["Ембріон небесного бубенчика","Використовує приготовані страви та 3 сувої"],"190020230":["Ембріон західного бубенчика","Використовує приготовані страви та 3 сувої"],"190020242":["Ембріон дьяволенка Святилища вогню","Використовує приготовані страви та 2 сувої"],"190070004":["Охоронець Кім Су Ро (30 дн.)","Використовує страви та 2 сувої; залишається 30 днів."],"190070005":["Охоронець Кім Сін Єн (30 дн.)","Сповіщає про ворогів; автоматично збирає здобич; залишається 30 днів."],"190070010":["Охоронець Аріате","Використовує страви та 2 сувої; сповіщає про ворогів."],"190070016":["Охоронець Юме (30 дн.)","Використовує страви та 4 сувої; сповіщає про ворогів"],"190070017":["Лампа дияволенка","Використовує приготовані страви та 5 сувоїв; сповіщає про ворогів"],"190100000":["Хмарка поривчастого вітру"],"190100003":["Біжучий пагатті"],"190100004":["Стрімкий фергатті"],"190100008":["Швидкісний байкрон"],"190100009":["Сверхшвидкі байкрон"],"190100012":["Ловкий юфррин"],"190100023":["Швидкий байкрон"],"190100032":["Стрибучий ферматті"],"190100037":["Проворний юфой"],"190100049":["Швидкісний страус"],"190100051":["Швидкісний пагатті"],"190100052":["Сверхшвидкісний байкион"],"190100053":["Сверхзвуковий байкіон"],"190100065":["Байкрон одрона"],"190100072":["Рожеве хмаринка зорі"],"190100078":["Жовте хмаринка полудня"],"190100084":["Синє хмаринка сутінків"],"190100090":["Червоне хмарка заходу"],"190100107":["Елітний страус"],"190100109":["Бойовий кінь"],"190100115":["Резвий кінь"],"190100121":["Стимпанківський байкрон"],"190100127":["Ширяючий сноуборд"],"190100131":["Небесний єдиноріг"],"190100134":["Надсвітловий байкрон"],"190100136":["Летючий сноуборд"],"190100143":["Морський сноуборд"],"190100146":["Кінь безсмертного лицаря"],"190100150":["Летючий апарат шиго"],"190100154":["Стрімкий страус"],"190100156":["Стрімкий припайлам"],"190100164":["Квочка"],"190100172":["Небесний винторіг"],"190100178":["Єдиноріг"],"190100182":["Кінь похмурого жнеця"],"190100197":["Рожевий велосипед Кітті"],"190100201":["Ручний білий тигр"],"190100223":["Ручний лев"],"190100231":["Особлива ракета злодіїв"],"190100254":["Скутер"],"190100262":["Світлошвидкісний айронфанг"],"190100265":["Кабріолет у вигляді панди"],"190100273":["Лютого тигра"],"190100281":["Хмарна овечка"],"190100283":["Швидкі рейси"],"190100300":["Піксельний кролик"],"190100302":["Примарний скакун"],"190100344":["Смугастик у шапці зайця"],"190100349":["Золота свинка"],"190100354":["Бегемотик"],"190100359":["Кролик у шапочці"],"190100364":["Гідроцикл"],"190100374":["Бланко"],"190100379":["Коко"],"190100710":["Чорний кінь"],"190100711":["Білий кінь"],"190100712":["Строкатий кінь"],"190100719":["Кінь-скелет"],"190100767":["Пагатті"],"190100799":["Адський хижак"],"190100820":["Чорний киллос Інь"],"190100821":["Білий кіррус Їнь"],"190100850":["Лютововк Кудлатий"],"190100851":["Лютововк Сірий Вітер"],"190100852":["Лютововк Німерія"],"190100853":["Лютововк Літо"],"190100854":["Лютововк Леді"],"190100855":["Лютововк Привид"],"190100900":["Єдиноріг Юнов"],"190101030":["Кривава Мері"],"190101050":["Охоронець неба"],"190101051":["Охоронець ночі"],"190101052":["Охоронець сутінків"],"190101053":["Охоронець зорі"],"190101102":["Фантомний тигр"],"190101112":["Кіллос нежить"],"190101130":["Велика панда"],"190101131":["Новорічний ведмедик"],"190101190":["Отруєний слизневик"],"190120093":["Сирний кіт"],"190120109":["Іграшкова машинка"],"190120115":["Чарівний килим"],"190120121":["Машинка"],"190120122":["Чорна машинка"],"190120148":["Легендарний килим дракона"],"190120167":["НЛО"],"190120171":["Цукровий кіт"],"190120187":["Снігохід"],"190120287":["Ховерборд"],"190120300":["Тигреня"],"190120303":["Приборканий чорний тигр"],"190160078":["Багряний байкрон-мародер"]};
  /* Сайт бере товари двома формами: список {items:[…]} і поодинокий товар. */
  function translateShopItem(it) {
    const t = it && SHOP_ITEMS[it.gameItemId];
    if (!t) return;
    if (t[0]) it.itemName = t[0];
    if (t[1] && it.itemDescription) it.itemDescription = t[1];
  }

  function patchShopApi() {
    // @grant тримає скрипт у пісочниці, тому патчити треба fetch справжнього
    // вікна сторінки, а не свій.
    const w = (typeof unsafeWindow !== 'undefined' && unsafeWindow) || window;
    const orig = w.fetch;
    if (typeof orig !== 'function' || orig.__uaPatched) return;

    const patched = function (...args) {
      return orig.apply(this, args).then((res) => {
        if (!enabled || !res || !res.ok) return res;
        const url = String((args[0] && args[0].url) || args[0] || '');
        if (!/\/api\/shop\/items/.test(url)) return res;
        return res.clone().json().then((data) => {
          if (data && Array.isArray(data.items)) data.items.forEach(translateShopItem);
          else if (data && data.gameItemId) translateShopItem(data);
          else return res;
          return new w.Response(JSON.stringify(data), {
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
          });
        // Не JSON, уже прочитане тіло абощо — віддаємо відповідь як є.
        }).catch(() => res);
      });
    };
    patched.__uaPatched = true;
    w.fetch = patched;
  }

  patchShopApi();

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
