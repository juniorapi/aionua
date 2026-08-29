// ==UserScript==
// @name         Aion Destiny — українська локалізація
// @namespace    https://github.com/juniorapi/aionua
// @version      0.9.5
// @description  Перекладає сайт aiondestiny.net українською та ставить український прапор у перемикачі мов
// @author       juniorapi
// @match        https://aiondestiny.net/*
// @icon         https://aiondestiny.net/favicon.ico
// @homepageURL  https://juniorapi.github.io/aionua/localization/
// @downloadURL  https://juniorapi.github.io/aionua/localization/aiondestiny-ua.user.js
// @updateURL    https://juniorapi.github.io/aionua/localization/aiondestiny-ua.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

/*
  Як це працює
  ────────────
  Сайт побудований на Vue + vue-i18n і вже містить вісім локалей. Тому переклад
  не чіпає DOM: у сам i18n додається локаль «uk», і Vue перемальовує сторінку
  своїми силами — з правильною плюралізацією та підстановками {name}.

  fallbackLocale = 'ru' означає, що ключ, якого ще немає в нашому словнику,
  береться з російської. Завдяки цьому словник можна наповнювати поступово,
  і сайт ніколи не лишається з порожніми написами.

  Що НЕ покривається i18n:
   • назви й описи досягнень — їх віддає API за заголовком lang, це серверні
     дані, і вони змінюються разом із сезоном;
   • пошта та юридичні реквізити в підвалі — вони захардкожені в шаблоні.
*/

(function () {
    'use strict';

    const LOCALE = 'uk';
    const FALLBACK = 'ru';
    const STORAGE_KEY = 'aiondestiny_ua_enabled';

    /* ═════════════════════════════ СЛОВНИК ═════════════════════════════
       Ключі збігаються з ключами сайту. Чого тут немає — показується
       російською через fallback, тож додавати можна частинами.
    ═══════════════════════════════════════════════════════════════════ */

    const UA = {
        navigation: {
            home: 'Головна',
            shop: 'Крамниця',
            roulette: 'Рулетка',
            account: 'Акаунт',
            premium: 'Преміум',
            download: 'Завантажити',
            rating: 'Рейтинг',
            achievements: 'Досягнення',
            sets: 'Набори',
            admin: 'Адмін',
        },

        common: {
            back: 'Назад',
            cancel: 'Скасувати',
            close: 'Закрити',
            confirm: 'Підтвердити',
            delete: 'Видалити',
            edit: 'Редагувати',
            error: 'Помилка',
            filter: 'Фільтр',
            info: 'Інформація',
            language: 'Мова',
            loading: 'Завантаження…',
            menu: 'Меню',
            next: 'Далі',
            notification: 'Сповіщення',
            previous: 'Назад',
            refresh: 'Оновити',
            retry: 'Повторити',
            save: 'Зберегти',
            search: 'Пошук',
            sort: 'Сортування',
            success: 'Успішно',
            warning: 'Попередження',
        },

        balance: {
            balance: 'Баланс',
            currency: 'Валюта',
            deposit: 'Поповнити',
            withdraw: 'Вивести',
        },

        shop: {
            buy: 'Купити',
            category: 'Категорія',
            description: 'Опис',
            price: 'Ціна',
            inStock: 'У наявності',
            outOfStock: 'Немає в наявності',
        },

        roulette: {
            spin: 'Крутити',
            prize: 'Приз',
            jackpot: 'Джекпот',
            win: 'Виграш',
            lose: 'Програш',
        },

        premium: {
            vip: 'VIP',
            active: 'Активний',
            expired: 'Завершився',
            subscribe: 'Підписатися',
            benefits: 'Переваги',
        },

        errors: {
            forbidden: 'Доступ заборонено',
            networkError: 'Помилка мережі',
            notFound: 'Не знайдено',
            serverError: 'Помилка сервера',
            timeout: 'Час очікування вичерпано',
            unauthorized: 'Не авторизовано',
            validationError: 'Помилка перевірки',
        },

        pages: {
            accountView: {
                activate: 'Активувати',
                allBonusesList: 'Весь список бонусів',
                balance: 'Баланс:',
                bonusesForDeposit: 'Бонуси за поповнення',
                bonusesForMmotop: 'Бонуси за MMOTOP',
                credited: 'Зараховано:',
                deposit: 'ПОПОВНИТИ',
                enterAmount: 'Введіть суму',
                enterPromocode: 'Введіть промокод',
                errors: {
                    characterNotFound: 'Персонажа не знайдено',
                    enterAmount: 'Введіть суму для поповнення',
                    getRewardError: 'Сталася помилка під час отримання нагороди',
                    noVoteBonuses: 'Немає доступних бонусів за голосування',
                    notAllRewardsGiven: 'Не всі нагороди отримано',
                    packNameNotFound: 'Назву набору не знайдено',
                    resetError: 'Сталася помилка під час скидання нагороди',
                    resetNotAvailable: 'Скидання недоступне',
                    rewardAlreadyReceived: 'Нагороду вже отримано',
                    rewardNotAvailable: 'Нагорода недоступна',
                    rewardNotFound: 'Нагороду не знайдено',
                    rewardSent: 'Нагороду надіслано персонажу {charName}',
                    rewardsReset: 'Нагороди скинуто',
                    voteError: 'Сталася помилка під час отримання бонусів за голосування',
                    voteRewardReceived: 'Отримано {amount} toll за голосування!',
                },
                exchangeRate: 'Курс 1 Toll = 1 рубль',
                promocodeNotFound: 'Промокод не знайдено',
                promocodes: 'Промокоди',
                received: 'Отримано',
                reset: 'Скинути',
                socialNetworks: 'Соціальні мережі',
                status: {
                    available: 'Доступно до отримання',
                    received: 'Отримано',
                    unavailable: 'Недоступно',
                },
                take: 'Забрати',
                totalDeposited: 'Усього поповнено на:',
                vote: 'Проголосувати',
            },

            achievements: {
                event: 'ІВЕНТ ДО {date}',
                getReward: 'Отримати',
                new: 'NEW',
                reset: 'Скинути',
                reward: 'Нагорода',
                rewardFor: 'Нагорода за {progress}',
                rewardReceived: 'Нагороду отримано',
                seasonal: 'СЕЗОННЕ ДО {date}',
                unavailable: 'Недоступно',
                vip: 'VIP',
            },

            achievementsView: {
                achievementBlock: {
                    resetTooltip: 'Це досягнення можна скинути після виконання',
                },
                confirmReward: {
                    cancelButton: 'Скасувати',
                    confirmButton: 'Отримати нагороду',
                    messagePrefix: 'Ви впевнені, що хочете отримати нагороду за досягнення для персонажа ',
                    messageSuffix: '?',
                    title: 'Підтвердження отримання нагороди',
                },
                errors: {
                    claimError: 'Помилка під час отримання нагороди',
                    loadError: 'Помилка під час завантаження досягнень',
                    resetError: 'Помилка під час скидання досягнення',
                },
                messages: {
                    achievementReset: 'Досягнення скинуто',
                    allRewardsRequired: 'Щоб скинути, потрібно отримати всі нагороди',
                    noReward: 'Немає нагороди до отримання',
                    resetNotAvailable: 'Скидання недоступне',
                    rewardSentToEmail: 'Нагороду надіслано на пошту',
                    unknownStatus: 'Невідомий статус відповіді',
                    vipRequired: 'Щоб отримати нагороду, потрібен VIP',
                },
                noAchievements: 'Немає досягнень',
                subtitle: 'Доступно скидань: {count}',
                title: 'Досягнення',
            },

            blog: {
                back: 'Назад до блогу',
                backToList: 'Повернутися до списку статей',
                notFoundText: 'На жаль, запитану статтю не знайдено.',
                notFoundTitle: 'Статтю не знайдено',
                readMore: 'Докладніше',
                subtitle: 'Гайди та корисна інформація про сервер',
                title: 'Корисні статті',
                videoUnsupported: 'Ваш браузер не підтримує відтворення відео.',
            },

            blogInfoModal: {
                goToBlog: 'Перейти',
                imageAlt: 'Зображення інформаційного банера блогу',
                title: 'Ознайомтеся з корисними статтями',
            },

            common: {
                balance: 'Баланс:',
                cancel: 'Скасувати',
                character: 'Персонаж',
                deposit: {
                    amount: 'Сума поповнення: {amount}',
                    depositButton: 'ПОПОВНИТИ',
                    errors: {
                        invalidAmount: 'Введіть коректну суму для поповнення',
                        paymentError: 'Сталася помилка під час створення платежу',
                        selectMethod: 'Оберіть спосіб оплати',
                    },
                    methods: {
                        crypto: 'CRYPTO',
                        euCards: 'Картки ЄС і СНД',
                        ruCards: 'Картки РФ і СБП',
                    },
                    title: 'Оберіть спосіб оплати',
                },
                getReward: 'Отримати нагороду',
                menu: {
                    account: 'Акаунт і баланс',
                    achievements: 'Досягнення',
                    admin: 'Адмін',
                    logout: 'Вийти',
                    premium: 'Преміум',
                    rating: 'Рейтинг',
                    seasonalRating: 'Сезонний рейтинг',
                    sets: 'Набори',
                    shop: 'Крамниця',
                    wheel: 'Колесо фортуни',
                },
                selectCharacter: 'Оберіть персонажа',
            },

            download: {
                downloadButton: 'Завантажити',
                title: 'МОВА КЛІЄНТА ЗАЛЕЖИТЬ ВІД МОВИ САЙТУ',
                // torrentlink навмисно не перекладаємо — це URL
            },

            footer: {
                forum: 'Форум',
                paymentSecurity: 'Безпека платежів',
                privacyPolicy: 'Політика конфіденційності',
                userAgreement: 'Угода користувача',
            },

            header: {
                blog: 'Статті',
                db: 'База знань',
                home: 'Головна',
                install: 'Встановити',
                moreDetails: 'ДОКЛАДНІШЕ',
                online: 'У мережі:',
                personalAccount: 'Особистий кабінет',
                premium: 'Преміум',
                seasonEnd: 'До кінця сезону',
                support: 'Підтримка',
            },

            home: {
                installButton: 'Встановити',
                personalAccountButton: 'Особистий кабінет',
                version: '- 4.6 -',
            },

            itemDisplay: { loadingDescription: 'Завантаження опису…' },
            loadingTable: { loadingData: 'Завантаження даних…' },

            premium: {
                benefits: 'Переваги',
                benefitsList: {
                    abyssPoints: 'Очки безодні в PvP і PvE',
                    achievements: 'Система досягнень',
                    arenaSigns: 'Отримання знаків арени',
                    craftingExp: 'Прокачування ремесла',
                    deathDebuff: 'Дебаф після смерті',
                    flight: 'Переліт',
                    gatheringExp: 'Прокачування збирання',
                    itemDrop: 'Випадання предметів',
                    monsterExp: 'Досвід з монстрів',
                    questExp: 'Досвід з місій і завдань',
                    resourceBreakdown: 'Розбір ресурсів',
                    salesLimit: 'Збільшений ліміт продажів',
                },
                benefitsValues: {
                    absent: 'Відсутня',
                    extended: 'Розширена',
                    free: 'Безкоштовно',
                    oneSecond: '1 сек',
                },
                buy: 'КУПИТИ',
                commandDescriptionButton: 'Опис команд',
                commandDescriptionModal: {
                    cancel: 'Знімає вигляд цукерки. Щоб скасувати дію, введіть команду повторно',
                    dmg: 'Показує шкоду, завдану всіма учасниками групи чи альянсу по мобу або рейд-босу. Візьміть потрібну ціль у таргет і введіть команду',
                    rem: 'Ви можете змінювати вигляд броні незалежно від її типу',
                    set: 'Щоб створити сет, введіть у чат команду .set save 1 (де 1 — номер сета); зберігаються всі вдягнені на персонажа предмети.\n' +
                         '- Щоб застосувати сет, введіть у чат команду .set 1 (де 1 — номер збереженого сета).\n' +
                         '- Щоб додати новий сет, зробіть те саме, але замініть цифру 1 на будь-яку іншу від 2 до 10.\n' +
                         'Максимальна кількість сетів — 10',
                    title: 'Опис команд',
                },
                commands: 'Команди',
                commandsList: {
                    cancelCandy: 'Знімає вигляд цукерки',
                    changeAppearance: 'Ремодел без обмежень',
                    changeSet: 'Зміна сета',
                    showDamage: 'Показує шкоду по монстру',
                },
                subtitle: 'Пакет VIP діє на весь акаунт',
                title: 'VIP-привілеї',
                vip14: 'VIP (14 днів)',
                vip30: 'VIP (30 днів)',
            },

            rating: {
                roulette: {
                    attemptCost: '1 спроба = {price}',
                    errors: {
                        notEnoughToll: 'Недостатньо toll для прокручування',
                        spinError: 'Сталася помилка під час прокручування рулетки',
                        unavailable: 'Колесо зараз недоступне',
                    },
                    getReward: 'ОТРИМАТИ',
                    giftInfo: 'Подарунок надійде на пошту персонажа',
                    spin: 'Крутити',
                    title: 'Колесо фортуни',
                    untilEnd: 'До кінця акції:',
                    untilStart: 'До початку акції:',
                },
                seasonRating: {
                    dungeons: { bastion: 'Бастіон', katalamandj: 'Каталамандж', sauro: 'Сауро' },
                    factions: { asmodians: 'Асмодіани', elians: 'Елійці' },
                    fastest: 'Найшвидші',
                    leaders: 'Лідери',
                    nickname: 'Нікнейм',
                    noData: 'Немає даних',
                    oc: 'ОС',
                    pvp: 'PVP',
                    pvpSubtitle: 'Облік поєдинків на аренах',
                    rating: 'Рейтинг',
                    resetTime: 'Скидання та видача нагород через:',
                    reward: 'Нагорода',
                    seasonShop: {
                        availableFor: 'ДОСТУПНИЙ ЩЕ {time}',
                        availableIn: 'ДОСТУПНИЙ ЧЕРЕЗ {time}',
                        description: 'Унікальні товари, доступні лише цього сезону',
                        loading: 'Завантаження…',
                        title: 'Сезонна крамниця',
                    },
                    time: 'Час',
                    title: 'Сезонний рейтинг',
                },
                towerRating: {
                    classes: {
                        assassin: 'Убивця',
                        bard: 'Бард',
                        chanter: 'Чародій',
                        cleric: 'Цілитель',
                        gladiator: 'Гладіатор',
                        guardian: 'Страж',
                        gunner: 'Пілот',
                        ranger: 'Стрілець',
                        sniper: 'Снайпер',
                        sorcerer: 'Чарівник',
                        spiritmaster: 'Заклинач',
                    },
                    floor: 'Поверх',
                    nickname: 'Нікнейм',
                    noData: 'Немає даних',
                    resetTime: 'Скидання та видача нагород через:',
                    reward: 'Нагорода',
                    time: 'Час',
                    title: 'Рейтинг вежі випробувань',
                    totalFloors: 'Усього поверхів',
                },
            },

            roulette: {
                infoModal: {
                    description: 'Опис',
                    items: {
                        chanceIncrease: 'Шанс дістати унікальний предмет зростає щоразу на другій спробі (Х)',
                        chanceReset: 'Коли ви отримуєте унікальний предмет, шанс (Х) скидається',
                        consumableWarning: 'Якщо ви випадково використали витратний предмет, відновити його неможливо',
                        cost: 'Вартість 1 спроби: {price} TOLL',
                        itemClick: 'Якщо натиснути на унікальний предмет на колесі, відкриється вікно з його зображенням',
                        maxChance: 'Максимальний шанс: х5',
                        purpleItems: 'Фіолетовий колір — звичайні предмети (витратні)',
                        transferable: 'Усі предмети передавані',
                        yellowItems: 'Жовтий колір — унікальні предмети (зовнішній вигляд)',
                    },
                    title: 'Як працює колесо фортуни?',
                    understand: 'Зрозуміло',
                },
                itemModal: { close: 'Закрити' },
                rewardsModal: {
                    availableRewards: 'Доступні нагороди:',
                    getReward: 'Отримати',
                    messages: {
                        alreadyTaken: 'Предмет уже отримано',
                        characterNotFound: 'Персонажа не знайдено',
                        itemNotFound: 'Предмет не знайдено',
                        itemSentToMail: 'Предмет надіслано на пошту',
                        itemsReceived: 'Отримано предметів: {count}',
                        loadRewardsError: 'Помилка під час завантаження списку нагород',
                        takeItemError: 'Помилка під час отримання предмета',
                        takeRewardsError: 'Помилка під час отримання нагород',
                        unknownError: 'Невідома помилка',
                    },
                    noRewards: 'Немає доступних нагород',
                    takeAll: 'Отримати всі',
                    title: 'Отримати нагороди',
                },
            },

            sets: { buy: 'Купити', newbieSet: 'Набір новачка' },
            setsView: { title: 'Набори' },

            shop: {
                emptyCategory: 'У цій категорії поки немає предметів',
                foundItems: 'Знайдено предметів: {count}',
                noResults: 'За запитом «{query}» нічого не знайдено',
                searchPlaceholder: 'Пошук за ID або назвою предмета',
                searchResults: 'Результати пошуку за запитом: «{query}»',
                title: 'Крамниця',
            },

            shopItem: {
                characterLimit: 'Ліміт на персонажа: {limit}',
                details: 'Докладніше',
                new: 'NEW',
                pieces: 'шт.',
                serverLimit: 'Ліміт на сервер: {remain}/{total}',
            },

            shopItemModal: {
                buyAsGift: 'Купити в подарунок',
                buyAsGiftButton: 'Купити в подарунок',
                buyButton: 'Купити',
                cancelButton: 'Скасувати',
                characterLimit: 'Ліміт на персонажа:',
                confirmGiftButton: 'Так, купити в подарунок',
                confirmGiftMessage: 'Ви впевнені, що хочете купити «{itemTitle}» у подарунок для персонажа «{recipientName}»?',
                confirmGiftPurchase: 'Підтвердження покупки в подарунок',
                enterTitle: 'Введіть титул:',
                errors: {
                    badRace: 'Предмет не підходить расі персонажа',
                    buyError: 'Сталася помилка під час покупки предмета',
                    buyLimitExceeded: 'Перевищено ліміт покупки для цього предмета',
                    charNotFound: 'Персонажа не знайдено',
                    giftPurchaseError: 'Сталася помилка під час покупки в подарунок',
                    itemNotFound: 'Предмет не знайдено',
                    loadItemError: 'Не вдалося завантажити інформацію про предмет',
                    notEnoughMoney: 'Недостатньо toll',
                    purchaseError: 'Сталася помилка під час покупки предмета',
                    unknownError: 'Невідома помилка',
                },
                giftRecipientName: "Ім'я отримувача подарунка:",
                giftRecipientPlaceholder: "Введіть ім'я персонажа-отримувача",
                purchasing: 'Купуємо…',
                serverLimit: 'Ліміт на сервер:',
                shopClosed: 'Крамницю зачинено',
                titlePlaceholder: 'Введіть бажаний титул',
            },

            statisticModal: {
                accessRestricted: 'Статистика доступна лише для VIP-користувачів',
                hours: 'хвилин',
                place: 'Місце #{place}',
                players: 'гравців',
                statisticsBlocked: 'Статистику заблоковано',
                stats: {
                    abyssPoints: 'Отримано очок безодні',
                    blockedPlayers: 'Додано в ЧС',
                    bossesKilled: 'Убито босів',
                    gloryPoints: 'Отримано очок слави',
                    kinahEarned: 'Зароблено кінару',
                    lfgMessages: 'Повідомлень у ЛФГ',
                    mobDamage: 'Шкода по мобах',
                    mobsKilled: 'Убито мобів',
                    playTime: 'Проведено часу в грі',
                    playerDamage: 'Шкода по гравцях',
                },
                title: 'Статистика',
            },
        },
    };

    /* ═══════════════════════ ПОШУК i18n-ІНСТАНСУ ═══════════════════════ */

    function findI18n() {
        const app = document.querySelector('#app')?.__vue_app__;
        if (!app?._context?.provides) return null;
        const provides = app._context.provides;
        for (const sym of Object.getOwnPropertySymbols(provides)) {
            const v = provides[sym];
            if (v && (v.global || v.messages)) {
                const i18n = v.global || v;
                if (i18n.setLocaleMessage && i18n.locale) return i18n;
            }
        }
        return null;
    }

    /* ═══════════════════════ ЗАСТОСУВАННЯ ЛОКАЛІ ═══════════════════════ */

    let i18n = null;
    let applied = false;

    // Ключі, яких у словнику ще немає: __destinyUA.missing()
    const missing = new Set();

    function setLocale(value) {
        if (!i18n) return;
        if (i18n.locale && typeof i18n.locale === 'object' && 'value' in i18n.locale) {
            i18n.locale.value = value;
        } else {
            i18n.locale = value;
        }
    }

    function currentLocale() {
        if (!i18n) return null;
        return i18n.locale?.value ?? i18n.locale;
    }

    function apply() {
        if (applied || !i18n) return false;

        // Неперекладене має падати на російську, а не на порожнечу.
        try {
            if (i18n.fallbackLocale && typeof i18n.fallbackLocale === 'object'
                && 'value' in i18n.fallbackLocale) {
                i18n.fallbackLocale.value = FALLBACK;
            } else {
                i18n.fallbackLocale = FALLBACK;
            }
        } catch (e) { /* лишиться типовий fallback сайту */ }

        i18n.setLocaleMessage(LOCALE, UA);
        setLocale(LOCALE);
        applied = true;
        collectMissing();
        return true;
    }

    /* Порівнюємо наші ключі з російськими — так видно, що ще не перекладено. */
    function collectMissing() {
        try {
            const msgs = i18n.messages?.value ?? i18n.messages;
            const base = msgs?.[FALLBACK];
            if (!base) return;
            const walk = (src, mine, prefix) => {
                for (const k in src) {
                    const key = prefix ? prefix + '.' + k : k;
                    const sv = src[k];
                    const mv = mine?.[k];
                    if (sv && typeof sv === 'object' && sv.t === undefined) walk(sv, mv, key);
                    else if (mv === undefined && missing.size < 3000) missing.add(key);
                }
            };
            walk(base, UA, '');
        } catch (e) { /* діагностика не критична */ }
    }

    /* ═══════════════════ ПРАПОР І ПІДПИС У ПЕРЕМИКАЧІ ══════════════════ */

    const FLAG_UA =
        '<svg width="25" height="17" viewBox="0 0 25 17" fill="none" ' +
        'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<rect width="25" height="8.5" fill="#0057B7"/>' +
        '<rect y="8.5" width="25" height="8.5" fill="#FFD700"/></svg>';

    // Пункт російської підміняємо українським: код, прапор і мова разом.
    function patchSwitcher() {
        const selector = document.querySelector('.language-selector');
        if (!selector) return;

        for (const span of selector.querySelectorAll('span')) {
            if (span.textContent.trim() !== 'RU') continue;

            span.textContent = 'UA';
            span.dataset.uaPatched = '1';

            const row = span.parentElement;
            const icon = row?.querySelector('.iconBase') || row?.querySelector('svg')?.parentElement;
            if (icon && icon.dataset.uaFlag !== '1') {
                icon.innerHTML = FLAG_UA;
                icon.dataset.uaFlag = '1';
            }

            // Клік по цьому пункту має вмикати українську, а не російську.
            const clickable = row?.closest('li,button,[role="option"],.option') || row;
            if (clickable && clickable.dataset.uaBound !== '1') {
                clickable.dataset.uaBound = '1';
                clickable.addEventListener('click', () => setTimeout(() => setLocale(LOCALE), 60), true);
            }
        }
    }

    /* ═══════════════════════════ ЗАПУСК ════════════════════════════════ */

    function enabled() {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            return v === null ? true : v === '1';
        } catch (e) { return true; }
    }

    function tick() {
        if (!enabled()) return;

        if (!i18n) i18n = findI18n();
        if (!i18n) return;

        if (!applied) apply();

        // Vue перемальовує шапку — прапор доводиться ставити повторно.
        patchSwitcher();

        // Після переходів сайт іноді повертає свою локаль.
        const now = currentLocale();
        if (applied && now !== LOCALE && now === FALLBACK) setLocale(LOCALE);
    }

    // SPA вантажиться поступово, тож спершу шукаємо i18n часто, а щойно
    // локаль застосована — переходимо на рідкий цикл, який лише повертає
    // прапор і локаль після перемальовувань Vue.
    let fast = setInterval(function probe() {
        tick();
        if (!applied) return;
        clearInterval(fast);
        fast = null;
        setInterval(tick, 1500);
    }, 400);

    // Якщо i18n так і не знайшовся (сторінка без Vue) — не крутимо цикл вічно.
    setTimeout(() => { if (fast && !applied) { clearInterval(fast); fast = null; } }, 30000);

    document.addEventListener('DOMContentLoaded', tick);
    window.addEventListener('load', tick);

    /* ═════════════════════════ ДІАГНОСТИКА ═════════════════════════════
       __destinyUA.missingText() — ключі, яких ще немає в словнику.
    ═══════════════════════════════════════════════════════════════════ */

    window.__destinyUA = {
        version: '0.9.5',
        get locale() { return currentLocale(); },
        missing: () => [...missing].sort(),
        missingText: () => [...missing].sort().join('\n'),
        count: () => missing.size,
        on: () => { try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {} location.reload(); },
        off: () => { try { localStorage.setItem(STORAGE_KEY, '0'); } catch (e) {} location.reload(); },
    };
})();
