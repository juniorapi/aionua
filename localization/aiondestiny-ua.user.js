// ==UserScript==
// @name         Aion Destiny — українська локалізація
// @namespace    https://github.com/juniorapi/aionua
// @version      1.3.0
// @description  Перекладає сайт aiondestiny.net українською (з прапором у перемикачі мов) і містить вбудований трекер досягнень
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

        auth: {
            badEmail: 'Email не відповідає вимогам',
            badNewPassword: 'Новий пароль не відповідає вимогам',
            changeEmail: 'Зміна email',
            changePassword: 'Зміна пароля',
            codeLengthError: 'Код має містити 8 символів',
            codeSent: 'Код надіслано',
            codeSentToEmail: 'Код надіслано на вашу пошту',
            codeSentToNewEmail: 'Код надіслано на нову пошту',
            confirmNewPassword: 'Підтвердіть новий пароль',
            confirmPassword: 'Підтвердіть пароль',
            confirmTwoFactorAction: 'ПІДТВЕРДИТИ',
            confirmationCode: 'Код підтвердження',
            currentEmailLabel: 'Ваш поточний email:',
            currentPassword: 'Поточний пароль',
            disableTwoFactor: 'ВИМКНУТИ',
            email: 'Email',
            emailAlreadyUsed: 'Ця пошта вже використовується',
            emailChangeBlocked: 'Зміну пошти для вашого акаунта заблоковано',
            emailChanged: 'Email успішно змінено',
            enableTwoFactor: 'УВІМКНУТИ',
            forgotPassword: 'Забули пароль?',
            getCode: 'Отримати',
            login: 'Увійти',
            loginError: 'Помилка входу',
            loginRestore: 'Відновити логін',
            loginRestoreSubtitle: 'Вкажіть email, на який ми надішлемо інформацію про акаунт',
            loginRestoreSuccess: 'Інформацію про акаунт надіслано на вашу пошту',
            loginSubtitle: 'Вкажіть свої дані, щоб увійти в особистий кабінет',
            loginSuccess: 'Вхід виконано',
            loginToAccount: 'Увійти в акаунт',
            loginTwoFactorDescription: 'Щоб увійти, введіть код із листа, надісланого на адресу:',
            loginTwoFactorTab: 'Код',
            loginTwoFactorTitle: 'Підтвердження входу',
            logout: 'Вийти',
            logoutAllDevices: 'Вийти на всіх пристроях',
            logoutAllDevicesDescription: 'Завершує всі активні сесії',
            logoutAllDevicesSuccess: 'Усі активні сесії завершено',
            newEmail: 'Новий email',
            newEmailCode: 'Код нової пошти',
            newPassword: 'Новий пароль',
            oldEmailCode: 'Код старої пошти',
            password: 'Пароль',
            passwordChangeDescription: 'Код відновлення надішлемо на вказаний email',
            passwordChanged: 'Пароль успішно змінено',
            passwordReset: 'Відновити пароль',
            passwordResetSubtitle: 'Вкажіть логін і email, на які ми надішлемо лист зі скиданням пароля',
            passwordResetSuccess: 'Новий пароль надіслано на вашу пошту',
            passwordRestored: 'Пароль успішно відновлено',
            passwordsDoNotMatchError: 'Паролі не збігаються',
            register: 'Реєстрація',
            registerError: 'Помилка реєстрації',
            registerSubtitle: 'Створіть новий акаунт для доступу до гри',
            registerSuccess: 'Реєстрація успішна',
            rememberMe: "Запам'ятати мене",
            repeatPassword: 'Повторіть пароль',
            resetLogin: 'ВІДНОВИТИ ЛОГІН',
            resetPassword: 'СКИНУТИ ПАРОЛЬ',
            restoreLogin: 'Відновити логін',
            restorePassword: 'Відновити пароль',
            saveChanges: 'ЗБЕРЕГТИ ЗМІНИ',
            secureAuthAlreadyEnabled: 'Двофакторну автентифікацію вже увімкнено',
            secureAuthNotEnabled: 'Двофакторну автентифікацію вимкнено',
            security: 'Безпека',
            securityDescription: 'Керування двофакторною автентифікацією та сесіями',
            sending: 'Надсилання…',
            twoFactorAuth: 'Двофакторна автентифікація',
            twoFactorAuthDescription: 'Підтвердження входу електронною поштою',
            twoFactorDisabledSuccess: 'Двофакторну автентифікацію вимкнено',
            twoFactorEnabledSuccess: 'Двофакторну автентифікацію увімкнено',
            username: 'Логін',
            wrongAccessCode: 'Неправильний код підтвердження',
            wrongCurrentAccessCode: 'Неправильний код підтвердження для поточної пошти',
            wrongNewAccessCode: 'Неправильний код підтвердження для нової пошти',
            wrongPassword: 'Введено неправильний пароль',
        },

        notifications: {
            authErrors: {
                accountAlreadyExists: 'Акаунт із таким логіном уже зареєстровано',
                accountNotFound: 'Акаунта з таким логіном і поштою не існує',
                authError: 'Помилка авторизації',
                badEmail: 'Email не відповідає вимогам',
                badLogin: 'Логін не відповідає вимогам',
                badPassword: 'Пароль не відповідає вимогам',
                emailAlreadyExists: 'Акаунт із такою поштою вже зареєстровано',
                emailNotFound: 'Акаунта з такою поштою не існує',
                emailSendTimeout: 'Зачекайте, перш ніж надсилати листи знову',
                loginRestoreError: 'Помилка відновлення логіна',
                passwordRestoreError: 'Помилка відновлення пароля',
                registerError: 'Помилка реєстрації',
                unknownError: 'Невідома помилка',
                wrongCaptcha: 'Капчу пройдено неправильно',
                wrongLoginOrPassword: 'Неправильний логін або пароль',
            },
            cloudPaymentsLoadError: 'Не вдалося завантажити CloudPayments',
            cloudPaymentsNotInitialized: 'CloudPayments не ініціалізувався',
            cloudPaymentsNotLoaded: 'CloudPayments не завантажено',
            cloudPaymentsWidgetError: 'Помилка ініціалізації віджета CloudPayments',
            codeSendError: 'Помилка надсилання коду',
            contexts: {
                authorization: 'авторизації',
                registration: 'реєстрації',
            },
            dataChangeError: 'Помилка під час зміни даних',
            emailSendError: 'Помилка під час надсилання листа',
            errors: { sessionRestoreError: 'Помилка під час відновлення сесії' },
            gameShopPurchaseError: 'Помилка під час покупки предмета ігрової крамниці',
            loading: 'Завантаження…',
            loginRestoreError: 'Помилка відновлення логіна',
            minPaymentSumError: 'Мінімальна сума для обраного способу оплати — {minSum}',
            passwordResetError: 'Помилка відновлення пароля',
            paymentCreationError: 'Сталася помилка під час створення платежу',
            paymentFail: 'Помилка під час виконання платежу',
            paymentRedirectError: 'Помилка під час переходу на сторінку оплати',
            paymentRedirectSuccess: 'Переходимо на сторінку оплати…',
            paymentSuccess: 'Платіж успішно виконано!',
            paymentSystem: 'платіжної системи',
            paymentWidgetError: 'Помилка під час завантаження платіжного віджета',
            seasonShopPurchaseError: 'Помилка під час покупки предмета сезонної крамниці',
            shop: {
                badCharLevel: 'Замалий рівень персонажа',
                buySuccess: 'Покупка успішна!',
                charLimitExceeded: 'Досягнуто ліміт покупки на персонажа',
                charNotFound: 'Персонажа не знайдено',
                charOffline: 'Персонаж не в мережі',
                itemNotFound: 'Предмет не знайдено',
                notEnoughMoney: 'Недостатньо кінарів',
                serverLimitExceeded: 'Досягнуто ліміт покупки на сервер',
                shopClosed: 'Крамницю зачинено',
                wrongTitle: 'Некоректно введений титул',
            },
            shopPurchaseError: 'Помилка під час покупки предмета',
            // Форми множини: vue-i18n обирає one/few/many за числом
            time: {
                days: { one: 'день', few: 'дні', many: 'днів' },
                hours: { one: 'година', few: 'години', many: 'годин' },
                minutes: { one: 'хвилина', few: 'хвилини', many: 'хвилин' },
                seconds: { one: 'секунда', few: 'секунди', many: 'секунд' },
                short: { day: 'д.', hour: 'год.', minute: 'хв.', second: 'с.' },
            },
            unknownError: 'Невідома помилка',
        },

        validation: {
            codeRequired: "Код підтвердження обов'язковий",
            email: 'Введіть коректний email',
            emailRequired: "Email обов'язковий",
            invalidEmail: 'Введіть коректний email',
            loginMinLength: 'Логін має містити щонайменше 3 символи',
            loginRequired: "Логін обов'язковий",
            maxLength: 'Максимальна довжина: {max} символів',
            minLength: 'Мінімальна довжина: {min} символів',
            newPasswordSameAsOld: 'Новий пароль не має збігатися зі старим',
            passwordMatch: 'Паролі не збігаються',
            passwordMinLength: 'Пароль має містити щонайменше 6 символів',
            passwordRequired: "Пароль обов'язковий",
            passwordsDoNotMatch: 'Паролі не збігаються',
            recaptchaExpired: 'Термін перевірки reCAPTCHA минув, пройдіть її ще раз',
            recaptchaRequired: 'Будь ласка, пройдіть перевірку reCAPTCHA',
            repeatPasswordRequired: 'Повторіть пароль',
            required: "Поле обов'язкове для заповнення",
        },

        seo: {
            blog: {
                description: 'Гайди та корисна інформація про сервер Aion 4.6 Aion Destiny: система сезонів, досягнення, PvP-активності та посібник для новачків.',
                keywords: 'гайд aion 4.6, статті aion, aion destiny блог',
                title: 'Корисні статті — Aion Destiny',
            },
            download: {
                description: 'Завантажте клієнт Aion 4.6 і почніть гру на Aion Destiny за кілька хвилин. Швидке встановлення, автооновлення та підтримка 24/7.',
                keywords: 'завантажити aion 4.6, клієнт aion, встановити aion, aion destiny',
                title: 'Завантажити клієнт Aion 4.6 — Aion Destiny',
            },
            home: {
                description: 'Сервер Aion 4.6. Стабільність, якість, високий онлайн, швидка підтримка та багато приємних бонусів. Приєднуйтесь!',
                keywords: 'aion, aion 4.6, сервер aion, aion destiny, mmorpg, aion classic',
                title: 'Aion Destiny — сервер Aion 4.6',
            },
            premium: {
                description: 'Преміум-акаунт на сервері Aion 4.6 Aion Destiny: пришвидшене прокачування, підвищений дроп та інші бонуси. Оберіть відповідний період.',
                keywords: 'преміум aion, преміум акаунт aion 4.6, бонуси aion destiny',
                title: 'Преміум-акаунт — Aion Destiny',
            },
            siteName: 'Aion Destiny',
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
                    factions: { asmodians: 'Асмодіанці', elians: 'Елійці' },
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
                    // Назви звірено з client_strings_ui.xml проєкту translate_aion,
                    // щоб термінологія сайту збігалася з локалізацією клієнта.
                    classes: {
                        assassin: 'Вбивця',
                        bard: 'Бард',
                        chanter: 'Чародій',
                        cleric: 'Цілитель',
                        gladiator: 'Гладіатор',
                        guardian: 'Охоронець',
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
                    kinahEarned: 'Зароблено кінарів',
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

    /* ═════════════════════ ДОСЯГНЕННЯ (дані з API) ═════════════════════
       Ці рядки не належать до i18n: їх віддає /api/achiv/char/{id} під
       конкретний акаунт. Список сезонний і змінюється, тому переклад іде
       ТІЛЬКИ за точним збігом: незнайома назва лишається як є, а не ламається.
       Нові назви збирає __destinyUA.missingAchievements().

       Назви локацій і босів звірено з client_strings_quest/npc/monster.xml
       вивіреної бази (sources/euroaion).
    ═══════════════════════════════════════════════════════════════════ */

    const ACHIEVEMENTS = {
        'Стальная роза': 'Сталева троянда',
        'УЗЫ': 'УЗИ',
        'Башня Испытаний': 'Вежа випробувань',
        'Автоивенты': 'Автоівенти',
        'Камар/Твердыня': 'Камар/Твердиня',
        'Примите участие в осаде МКАДа и Каталамов': 'Візьміть участь в облозі МКАДу та Каталамів',
        'Обитель повелительницы балауров': 'Оселя повелительки балаурів',
        'Тоннель Йормунганда/Рунаториум': 'Тунель Йормунганда/Рунаторіум',
        'Тоннель Йормунганда': 'Тунель Йормунганда',
        'Уровень': 'Рівень',
        'Дерадикон': 'Дерадикон',
        'Военная база Сауро': 'Військова база Сауро',
        'Ранг Бездны': 'Ранг Безодні',
        'Каталамадж': 'Каталамадж',
        'Рунадиум': 'Рунадіум',
        'Тахабата': 'Тахабата',
        'Храм Пхасумандир': 'Храм Пхасумандир',
    };

    const ACHIEVEMENT_DESCRIPTIONS = {
        'Пройдите любую стальную розу. Каждая роза засчитывается отдельно. В день можно получить +3 к достижению':
            'Пройдіть будь-яку сталеву троянду. Кожна троянда зараховується окремо. За день можна отримати +3 до досягнення',
        'Соберите 2100 уз. С 01.08 до 01.09 откат заданий на узы происходит два раза в неделю: среда/воскресенье':
            'Зберіть 2100 уз. З 01.08 до 01.09 відкат завдань на узи відбувається двічі на тиждень: середа/неділя',
        'Пройдите в общей сложности 250 этапов в башне испытаний.':
            'Пройдіть загалом 250 етапів у вежі випробувань.',
        'Примите участие. Достижение засчитывается, если ваша команда набрала 10000 очков и более':
            'Візьміть участь. Досягнення зараховується, якщо ваша команда набрала 10000 очок або більше',
        'Достижение засчитывается, если вы набрали более 1000 очков бездны в осадной зоне и состояли в союзе от 50 игроков до конца осады.':
            'Досягнення зараховується, якщо ви набрали понад 1000 очок безодні в облоговій зоні та були в союзі від 50 гравців до кінця облоги.',
        'Убейте Тиамат': 'Убийте Тіамат',
        'Одержите победу': 'Здобудьте перемогу',
        'Примите участие': 'Візьміть участь',
        'Получите уровень': 'Отримайте рівень',
        'Примите участие в дерадиконе': 'Візьміть участь у Дерадиконі',
        'Убейте Шитху': 'Убийте Шитху',
        'Воин 1 ранга': 'Воїн 1 рангу',
        'Убейте Гипериона': 'Убийте Гіперіона',
        'Убейте Грендаль': 'Убийте Грендаль',
        'Убейте тахабату в ФТТ': 'Убийте Тахабату у ФТТ',
        'Убейте Рудру': 'Убийте Рудру',
    };

    const missingAchievements = new Set();

    /* Ключ порівняння: без HTML-тегів і зайвих пробілів — описи з API
       містять <br> та посилання, а словник збудований на чистому тексті. */
    const normKey = (s) => String(s ?? '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const ACH_TITLES = new Map(Object.entries(ACHIEVEMENTS).map(([k, v]) => [normKey(k), v]));
    const ACH_DESCS  = new Map(Object.entries(ACHIEVEMENT_DESCRIPTIONS).map(([k, v]) => [normKey(k), v]));

    function translateAchievement(value, dict) {
        const key = normKey(value);
        if (!key) return value;
        const hit = dict.get(key);
        if (hit) return hit;
        if (/[а-яА-ЯёЁ]/.test(key) && missingAchievements.size < 500) missingAchievements.add(key);
        return value;
    }

    /* Сервер локалізує досягнення за заголовком lang. Української він не
       знає: з lang=uk (його шле сайт при нашій локалі) все приходить
       АНГЛІЙСЬКОЮ, і словник з російськими ключами не збігається. Тому в
       запиті примусово ставимо lang=ru, а відповідь перекладаємо самі. */
    function forceRuLang(args) {
        // Мова може їхати заголовком lang, Accept-Language або параметром
        // в URL — перекриваємо всі три канали, щоб не вгадувати, який
        // саме використовує сайт.
        const rewriteUrl = (u) => String(u).replace(/([?&]lang=)uk\b/i, '$1ru');
        const forceHeaders = (h) => {
            const headers = new Headers(h || {});
            headers.set('lang', 'ru');
            headers.set('Accept-Language', 'ru');
            return headers;
        };
        if (args[0] instanceof Request) {
            const moved = new Request(rewriteUrl(args[0].url), args[0]);
            args[0] = new Request(moved, { headers: forceHeaders(moved.headers) });
        } else {
            args[0] = rewriteUrl(args[0]);
            const init = Object.assign({}, args[1]);
            init.headers = forceHeaders(init.headers);
            args[1] = init;
        }
        return args;
    }

    /* Перехоплюємо відповідь API — так українські назви бачить і сайт,
       і сторонній трекер досягнень, який ходить у той самий ендпоінт. */
    function hookAchievementsApi() {
        const original = window.fetch;
        if (!original || original.__uaHooked) return;

        const wrapped = async function (...args) {
            let isAchiv = false;
            try {
                const reqUrl = typeof args[0] === 'string' ? args[0] : args[0]?.url ?? '';
                isAchiv = /\/api\/achiv\//.test(reqUrl);
                if (isAchiv && enabled()) args = forceRuLang(args);
            } catch (e) { /* запит іде як був */ }

            const response = await original.apply(this, args);
            try {
                const url = typeof args[0] === 'string' ? args[0] : args[0]?.url ?? '';
                if (!/\/api\/achiv\/char\//.test(url) || !enabled()) return response;

                const clone = response.clone();
                const data = await clone.json();
                if (!Array.isArray(data?.achiv_list)) return response;

                for (const a of data.achiv_list) {
                    if (a.title) a.title = translateAchievement(a.title, ACH_TITLES);
                    if (a.description) a.description = translateAchievement(a.description, ACH_DESCS);
                }
                return new Response(JSON.stringify(data), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers,
                });
            } catch (e) {
                return response; // будь-який збій — віддаємо оригінальну відповідь
            }
        };

        wrapped.__uaHooked = true;
        window.fetch = wrapped;
    }

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
        '<svg data-ua-flag="1" width="25" height="17" viewBox="0 0 25 17" fill="none" ' +
        'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<rect width="25" height="8.5" fill="#0057B7"/>' +
        '<rect y="8.5" width="25" height="8.5" fill="#FFD700"/></svg>';

    /* Ознакою слугує сам вставлений svg, а не атрибут на контейнері: Vue
       перемальовує вміст кнопки й повертає туди свій прапор, лишаючи наш
       підпис. Перевірка «чи всередині вже наш svg» це переживає. */
    function ensureUaFlag(iconEl) {
        if (!iconEl || iconEl.querySelector('svg[data-ua-flag]')) return;
        iconEl.innerHTML = FLAG_UA;
    }

    // Пункт російської підміняємо українським: код, прапор і мова разом.
    function patchSwitcher() {
        const selector = document.querySelector('.language-selector');
        if (!selector) return;

        // Кнопка (згорнутий стан): поки активна українська — там завжди UA.
        // Її треба чинити окремо, бо підпис уже не «RU» і під умову нижче
        // вона більше не потрапляє.
        if (currentLocale() === LOCALE) {
            const selected = selector.querySelector('.selected-option');
            if (selected) {
                const label = selected.querySelector('span');
                if (label && label.textContent.trim() !== 'UA') label.textContent = 'UA';
                ensureUaFlag(selected.querySelector('.iconBase') || selected.querySelector('svg')?.parentElement);
            }
        }

        // Пункти випадного списку. «UA» тут може бути лише нашим перейменованим
        // рядком, тож прапор гарантуємо і для нього: Vue при перемальовуванні
        // часом повертає свій прапор, лишаючи наш підпис, — виходив російський
        // прапор із написом UA.
        for (const span of selector.querySelectorAll('span')) {
            const code = span.textContent.trim();
            if (code !== 'RU' && code !== 'UA') continue;

            if (code === 'RU') span.textContent = 'UA';

            const row = span.parentElement;
            ensureUaFlag(row?.querySelector('.iconBase') || row?.querySelector('svg')?.parentElement);

            // Клік по цьому пункту має вмикати українську, а не російську.
            const clickable = row?.closest('li,button,[role="option"],.option') || row;
            if (clickable && clickable.dataset.uaBound !== '1') {
                clickable.dataset.uaBound = '1';
                clickable.addEventListener('click', () => setTimeout(() => setLocale(LOCALE), 60), true);
            }
        }
    }

    /* Список розкривається кліком, і його вміст малюється щойно тоді.
       MutationObserver спрацьовує ще до того, як браузер перемалює кадр,
       тому «RU» не встигає з'явитися навіть на мить — затримки за таймером
       такого не гарантували, і при швидких кліках слово проскакувало.
       Патч пише в DOM лише коли щось не так, тож цикл observer→patch→observer
       не розкручується; прапорець — додатковий запобіжник. */
    let patchingSwitcher = false;

    function watchSwitcher() {
        const selector = document.querySelector('.language-selector');
        if (selector && !selector.__uaObserved) {
            selector.__uaObserved = true;
            new MutationObserver(() => {
                if (patchingSwitcher) return;
                patchingSwitcher = true;
                try { patchSwitcher(); } finally { patchingSwitcher = false; }
            }).observe(selector, { childList: true, subtree: true, characterData: true });
        }

        // Якщо Vue замінить сам елемент перемикача, спостерігач помре разом
        // із ним — клік тоді і чинить одразу, і чіпляє спостерігач наново.
        if (!document.__uaSwitcherWatched) {
            document.__uaSwitcherWatched = true;
            document.addEventListener('click', (e) => {
                if (!e.target.closest?.('.language-selector')) return;
                patchSwitcher();
                watchSwitcher();
            }, true);
        }
    }

    /* ═══════════════════════════ ЗАПУСК ════════════════════════════════ */

    function enabled() {
        try {
            const v = localStorage.getItem(STORAGE_KEY);
            return v === null ? true : v === '1';
        } catch (e) { return true; }
    }

    /* ── Разове сповіщення після автооновлення ──
       Tampermonkey оновлює скрипт тихо, тож при першому запуску нової версії
       показуємо тост. Перше встановлення або та сама версія — тиша. */
    let updateNotified = false;

    function notifyUpdate() {
        if (updateNotified || !document.body) return;
        updateNotified = true;
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
        toast.textContent = 'Українську локалізацію оновлено до версії ' + current;
        toast.style.cssText = [
            'position:fixed', 'left:50%', 'bottom:24px', 'transform:translateX(-50%)',
            'z-index:2147483647', 'padding:10px 18px', 'border-radius:8px',
            'background:rgba(10,11,15,.95)', 'color:#e8eaf0',
            'font:500 13px/1.4 Inter,system-ui,sans-serif',
            'border:1px solid rgba(79,142,247,.45)',
            'box-shadow:0 6px 20px rgba(0,0,0,.5)', 'cursor:pointer',
            'max-width:90vw', 'text-align:center',
        ].join(';');
        toast.addEventListener('click', () => toast.remove());
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 8000);
    }

    function tick() {
        if (!enabled()) return;

        if (!i18n) i18n = findI18n();
        if (!i18n) return;

        if (!applied) apply();
        notifyUpdate();

        // Vue перемальовує шапку — прапор доводиться ставити повторно.
        watchSwitcher();
        patchSwitcher();

        // Після переходів сайт іноді повертає свою локаль.
        const now = currentLocale();
        if (applied && now !== LOCALE && now === FALLBACK) setLocale(LOCALE);
    }

    // Перехоплення ставимо одразу на document-start: трекер досягнень —
    // окремий скрипт — робить свій запит уже за секунду після завантаження.
    hookAchievementsApi();

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
        version: '1.3.0',
        get locale() { return currentLocale(); },
        missing: () => [...missing].sort(),
        missingText: () => [...missing].sort().join('\n'),
        count: () => missing.size,
        // Назви й описи досягнень, яких ще немає в словнику. Список сезонний,
        // тож після зміни сезону тут з'являться нові рядки.
        missingAchievements: () => [...missingAchievements].sort(),
        missingAchievementsText: () => [...missingAchievements].sort().join('\n'),
        on: () => { try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {} location.reload(); },
        off: () => { try { localStorage.setItem(STORAGE_KEY, '0'); } catch (e) {} location.reload(); },
    };

    /* ═══════════════ ТРЕКЕР ДОСЯГНЕНЬ (вбудований) ═══════════════
       Той самий трекер, що жив окремим скриптом aion-achievements.
       Живе у власному IIFE, тож імена з перекладом не перетинаються.
       Його запити проходять крізь перехоплений fetch вище, тому назви
       досягнень у вікні трекера теж українською.
       Подвійне встановлення (окремий трекер + цей скрипт) не дублює
       вікно: обидва використовують id "_ach_main", і пізніший просто
       замінює модалку раннього. ═══════════════════════════════════ */

    (function () {
        'use strict';
    
        const API = 'https://aiondestiny.net/api';
        let state = {};
        let collecting = false;
        let ranOnPage = false;
    
        // ─── API ─────────────────────────────────────────────────────────────────
    
        const req = async (url, opts = {}) => {
            const r = await fetch(API + url, {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', lang: 'ru' },
                ...opts
            });
            if (r.status === 401) throw new Error('AUTH_401');
            if (r.status === 403) throw new Error('AUTH_403');
            if (!r.ok) throw new Error(`HTTP_${r.status}`);
            return r.json();
        };
    
        const post = (url, body) => req(url, { method: 'POST', body: JSON.stringify(body) });
    
        const api = {
            chars:    ()       => req('/account/chars'),
            season:   ()       => req('/season/time').then(d => d.remaining_time || 0).catch(() => 0),
            achiv:    (id)     => req(`/achiv/char/${id}`).then(d => ({ achievements: d.achiv_list || [], resets: d.remaining_reset_count || 0, charId: d.char_id })),
            stats:    (id)     => req(`/stat/${id}`),
            claim:    (c, a)   => post('/achiv/reward', { char_id: c, achiv_id: a }),
            reset:    (c, a)   => post('/achiv/reset',  { char_id: c, achiv_id: a }),
        };
    
        // ─── HELPERS ─────────────────────────────────────────────────────────────
    
        const n   = v => String(v ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
        const pt  = m => { const d=Math.floor(m/1440),h=Math.floor((m%1440)/60),mn=m%60; return d?`${d}д ${h}г`:h?`${h}г ${mn}хв`:`${mn}хв`; };
        const st  = s => { if(s<=0) return 'Завершено'; const d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60); return d?`${d}д ${h}г`:h?`${h}г ${m}хв`:`${m}хв`; };
        const pct = a => {
            const pm = (a.progress||'').match(/(\d+)\s*\/\s*(\d+)/);
            const pp = (a.progress||'').match(/([\d,.]+)%/);
            if (pm) return Math.min(100, (parseInt(pm[1])/parseInt(pm[2]))*100);
            if (pp) return Math.min(100, parseFloat(pp[1].replace(',','.')));
            return a.status === 'COMPLETED' ? 100 : 0;
        };
    
        // ─── STYLES ──────────────────────────────────────────────────────────────
    
        function inject() {
            if (document.getElementById('_ach_css')) return;
            const s = document.createElement('style');
            s.id = '_ach_css';
            s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
    
    :root {
      --bg0:#07080c; --bg1:#0a0b0f; --bg2:#0f1117; --bg3:#161820; --bg4:#1c1e28;
      --bd0:#1e2030; --bd1:#272a38; --bd2:#343749;
      --t0:#e8eaf0; --t1:#8b8fa8; --t2:#4a4e62;
      --blue:#4f8ef7; --blue-dim:rgba(79,142,247,.14); --blue-b:rgba(79,142,247,.35);
      --gold:#e5a832; --gold-dim:rgba(229,168,50,.10); --gold-b:rgba(229,168,50,.45);
      --teal:#0ea5e9;
    }
    
    @keyframes _ach_in    { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
    @keyframes _ach_hdr   { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
    @keyframes _ach_pulse { 0%,100%{box-shadow:none} 50%{box-shadow:0 0 14px -3px rgba(229,168,50,.4)} }
    @keyframes _ach_spin  { to{transform:rotate(360deg)} }
    @keyframes _ach_bar   { from{width:0} to{width:var(--w)} }
    
    ._ach_wrap {
      position:fixed;inset:0;z-index:2147483647;
      display:flex;align-items:center;justify-content:center;padding:12px;
      background:rgba(7,8,12,.88);backdrop-filter:blur(3px);
      animation:_ach_in .15s ease;
    }
    ._ach_panel {
      width:min(1200px,96vw);max-height:92vh;
      display:flex;flex-direction:column;overflow:hidden;
      background:var(--bg1);border:1px solid var(--bd1);border-radius:2px;
      box-shadow:0 0 0 1px rgba(255,255,255,.025) inset,0 28px 80px rgba(0,0,0,.75);
      font-family:'Inter',system-ui,sans-serif;color:var(--t0);
    }
    
    /* Header */
    ._ach_hdr {
      position:relative;padding:14px 20px 0;flex-shrink:0;
      background:linear-gradient(180deg,rgba(79,142,247,.04) 0%,transparent 100%);
    }
    ._ach_hdr::before {
      content:'';position:absolute;top:0;left:0;right:0;height:2px;
      background:linear-gradient(90deg,#4f8ef7,#7c3aed,#4f8ef7);
      background-size:200% 100%;animation:_ach_hdr 8s linear infinite;
    }
    ._ach_hdr_top { display:flex;align-items:center;justify-content:space-between;margin-bottom:12px; }
    ._ach_hdr_left { display:flex;align-items:center;gap:10px; }
    ._ach_hdr_title { font-size:13px;font-weight:600;color:var(--t0);text-transform:uppercase;letter-spacing:.08em; }
    ._ach_badge {
      padding:2px 8px;border-radius:2px;font-size:10px;font-weight:500;
      background:var(--blue-dim);border:1px solid var(--blue-b);color:var(--blue);
      text-transform:uppercase;letter-spacing:.08em;
    }
    ._ach_timer {
      display:flex;align-items:center;gap:8px;
      font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:var(--blue);
    }
    ._ach_timer_lbl { font-family:'Inter',sans-serif;font-size:10px;font-weight:500;color:var(--t2);text-transform:uppercase;letter-spacing:.10em; }
    ._ach_close {
      width:28px;height:28px;border-radius:2px;background:transparent;
      border:1px solid var(--bd1);color:var(--t2);font-size:16px;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      transition:border-color .15s,color .15s,background .15s;line-height:1;
    }
    ._ach_close:hover { border-color:rgba(239,68,68,.5);color:#f87171;background:rgba(239,68,68,.1); }
    
    /* Tabs */
    ._ach_tabs {
      display:flex;align-items:flex-end;padding:0 20px;
      border-bottom:1px solid var(--bd0);background:var(--bg1);flex-shrink:0;
    }
    ._ach_tab {
      position:relative;padding:9px 16px 8px;font-size:12px;font-weight:500;
      color:var(--t2);cursor:pointer;border:none;background:transparent;
      transition:color .15s;white-space:nowrap;letter-spacing:.03em;
    }
    ._ach_tab:hover { color:var(--t1); }
    ._ach_tab._on { color:var(--t0); }
    ._ach_tab._on::after {
      content:'';position:absolute;bottom:-1px;left:16px;right:16px;
      height:2px;background:var(--blue);
    }
    
    /* Info bar */
    ._ach_bar {
      display:flex;align-items:center;padding:10px 20px;
      background:var(--bg2);border-bottom:1px solid var(--bd0);flex-shrink:0;gap:0;
    }
    ._ach_stat {
      display:flex;flex-direction:column;padding:0 20px;
      border-right:1px solid var(--bd0);
    }
    ._ach_stat:first-child { padding-left:0; }
    ._ach_stat_val {
      font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;
      color:var(--t0);line-height:1.1;font-variant-numeric:tabular-nums;
    }
    ._ach_stat_lbl {
      font-size:10px;font-weight:500;color:var(--t2);
      text-transform:uppercase;letter-spacing:.12em;margin-top:3px;
    }
    ._ach_stat_val._blue { color:var(--blue); }
    ._ach_stat_val._gold { color:var(--gold); }
    ._ach_sbtn {
      margin-left:auto;display:flex;align-items:center;gap:6px;
      padding:6px 14px;background:transparent;border:1px solid var(--bd1);
      color:var(--t1);font-size:11px;font-weight:500;text-transform:uppercase;
      letter-spacing:.08em;cursor:pointer;border-radius:2px;
      transition:border-color .15s,color .15s,background .15s;
    }
    ._ach_sbtn:hover { border-color:var(--blue-b);color:var(--blue);background:var(--blue-dim); }
    ._ach_sbtn:disabled { opacity:.5;cursor:default; }
    
    /* Grid */
    ._ach_body { flex:1;overflow:hidden; }
    ._ach_scroll {
      height:100%;overflow-y:auto;padding:14px 20px 20px;
      scrollbar-width:thin;scrollbar-color:var(--bd2) transparent;
    }
    ._ach_scroll::-webkit-scrollbar { width:4px; }
    ._ach_scroll::-webkit-scrollbar-track { background:transparent; }
    ._ach_scroll::-webkit-scrollbar-thumb { background:var(--bd2);border-radius:2px; }
    ._ach_grid { display:grid;gap:6px; }
    
    /* Card */
    ._ach_card {
      position:relative;background:var(--bg2);
      border:1px solid var(--bd0);border-left:2px solid transparent;
      padding:10px 10px 8px;display:flex;flex-direction:column;gap:5px;
      cursor:default;transition:background .15s,border-color .15s;min-height:88px;
    }
    ._ach_card:hover { background:var(--bg3);border-color:var(--bd2); }
    ._ach_card._done {
      border-left-color:var(--gold-b);
      background:linear-gradient(90deg,rgba(229,168,50,.05) 0%,var(--bg2) 55%);
    }
    ._ach_card._done:hover { background:linear-gradient(90deg,rgba(229,168,50,.08) 0%,var(--bg3) 55%); }
    ._ach_card._reward {
      border-left-color:var(--gold-b);
      background:linear-gradient(90deg,rgba(229,168,50,.07) 0%,var(--bg2) 55%);
      animation:_ach_pulse 2.5s ease-in-out infinite;
    }
    ._ach_card._reset  { border-left-color:var(--blue-b); }
    ._ach_card._locked { opacity:.45; }
    
    ._ach_card_top { display:flex;justify-content:space-between;align-items:flex-start;gap:5px;flex:1; }
    ._ach_card_name {
      font-size:11px;font-weight:500;color:var(--t0);line-height:1.35;
      display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;
      overflow:hidden;flex:1;
    }
    ._ach_card._done  ._ach_card_name { color:var(--gold); }
    ._ach_card._reward ._ach_card_name { color:var(--gold); }
    ._ach_card._locked ._ach_card_name { color:var(--t2); }
    
    ._ach_card_ico { font-size:12px;flex-shrink:0;line-height:1;margin-top:1px; }
    
    ._ach_prog_txt {
      font-family:'JetBrains Mono',monospace;font-size:11px;
      color:var(--t2);font-variant-numeric:tabular-nums;line-height:1;
    }
    ._ach_card._done   ._ach_prog_txt { color:rgba(229,168,50,.6); }
    ._ach_card._reward ._ach_prog_txt { color:rgba(229,168,50,.6); }
    
    ._ach_track { width:100%;height:2px;background:var(--bg4);overflow:hidden; }
    ._ach_fill  { height:100%;animation:_ach_bar .4s ease forwards;width:var(--w); }
    
    ._ach_card_foot { display:flex;align-items:center;justify-content:flex-end;margin-top:1px; }
    ._ach_abtn {
      padding:2px 8px;font-size:9px;font-weight:700;text-transform:uppercase;
      letter-spacing:.08em;cursor:pointer;border-radius:2px;transition:background .15s,border-color .15s;
      white-space:nowrap;border:1px solid;
    }
    ._ach_abtn._claim { background:var(--gold-dim);border-color:var(--gold-b);color:var(--gold); }
    ._ach_abtn._claim:hover { background:rgba(229,168,50,.2);border-color:rgba(229,168,50,.7); }
    ._ach_abtn._rst   { background:var(--blue-dim);border-color:var(--blue-b);color:var(--blue); }
    ._ach_abtn._rst:hover { background:rgba(79,142,247,.22); }
    ._ach_abtn:disabled { opacity:.4;cursor:default; }
    
    /* Stats panel */
    ._ach_stats_wrap {
      position:absolute;inset:0;z-index:10;background:rgba(7,8,12,.82);
      display:flex;align-items:center;justify-content:center;
      animation:_ach_in .15s ease;
    }
    ._ach_stats_box {
      width:min(700px,90%);background:var(--bg1);
      border:1px solid var(--bd1);border-radius:2px;
      box-shadow:0 24px 64px rgba(0,0,0,.7);overflow:hidden;
    }
    ._ach_stats_hdr {
      display:flex;justify-content:space-between;align-items:center;
      padding:14px 18px;border-bottom:1px solid var(--bd0);
      background:linear-gradient(90deg,var(--blue-dim),transparent);
    }
    ._ach_stats_title { font-size:13px;font-weight:600;color:var(--t0);text-transform:uppercase;letter-spacing:.08em; }
    ._ach_stats_grid  { display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--bd0);padding:1px; }
    ._ach_sc {
      background:var(--bg2);padding:14px 12px;display:flex;flex-direction:column;gap:4px;
      transition:background .15s;
    }
    ._ach_sc:hover { background:var(--bg3); }
    ._ach_sc._feat { background:var(--blue-dim); }
    ._ach_sc_val {
      font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;
      color:var(--t0);line-height:1;font-variant-numeric:tabular-nums;
    }
    ._ach_sc._feat ._ach_sc_val { color:var(--blue); }
    ._ach_sc_lbl { font-size:10px;font-weight:500;color:var(--t2);text-transform:uppercase;letter-spacing:.10em;margin-top:4px; }
    ._ach_sc_rank { font-size:10px;color:var(--t2); }
    ._ach_sc_rank b { color:var(--t1);font-weight:600; }
    
    /* Error */
    ._ach_err_box {
      width:min(420px,90vw);background:var(--bg1);
      border:1px solid rgba(239,68,68,.2);border-radius:2px;
      padding:32px 28px;text-align:center;
      box-shadow:0 24px 60px rgba(239,68,68,.12);
      animation:_ach_in .15s ease;
    }
    ._ach_err_ico   { font-size:48px;margin-bottom:16px;line-height:1; }
    ._ach_err_title { font-size:18px;font-weight:700;color:#f87171;margin-bottom:10px; }
    ._ach_err_msg   { font-size:13px;color:var(--t1);line-height:1.7;margin-bottom:22px;white-space:pre-line; }
    ._ach_err_btns  { display:flex;gap:8px;justify-content:center; }
    ._ach_btn_reload {
      padding:8px 20px;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);
      border-radius:2px;color:#f87171;font-size:12px;font-weight:700;cursor:pointer;
      text-transform:uppercase;letter-spacing:.06em;transition:background .15s;
    }
    ._ach_btn_reload:hover { background:rgba(239,68,68,.28); }
    ._ach_btn_dismiss {
      padding:8px 20px;background:transparent;border:1px solid var(--bd1);
      border-radius:2px;color:var(--t1);font-size:12px;font-weight:600;cursor:pointer;
      text-transform:uppercase;letter-spacing:.06em;transition:background .15s,color .15s;
    }
    ._ach_btn_dismiss:hover { background:var(--bg3);color:var(--t0); }
    
    /* Spinner */
    ._ach_spin {
      width:28px;height:28px;border-radius:50%;
      border:2px solid rgba(79,142,247,.15);border-top-color:var(--blue);
      animation:_ach_spin .65s linear infinite;
      display:inline-block;vertical-align:middle;
    }
    ._ach_loading {
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      padding:60px 20px;gap:14px;color:var(--t2);font-size:12px;letter-spacing:.04em;text-transform:uppercase;
    }
    `;
            (document.head || document.documentElement).appendChild(s);
        }
    
        // ─── OVERLAYS ────────────────────────────────────────────────────────────
    
        function mkOverlay(id) {
            document.getElementById(id)?.remove();
            const el = document.createElement('div');
            el.id = id; el.className = '_ach_wrap';
            document.body.appendChild(el);
            el.addEventListener('click', e => { if (e.target === el) el.remove(); });
            document.addEventListener('keydown', function h(e) {
                if (e.key === 'Escape') { el.remove(); document.removeEventListener('keydown', h); }
            });
            return el;
        }
    
        function showError(title, msg, reload = false) {
            inject();
            const ov = mkOverlay('_ach_err');
            const box = document.createElement('div');
            box.className = '_ach_err_box';
            const ico = reload ? '🔐' : title.includes('VIP') ? '💎' : '⚠️';
            box.innerHTML = `
                <div class="_ach_err_ico">${ico}</div>
                <div class="_ach_err_title">${title}</div>
                <div class="_ach_err_msg">${msg}</div>
                <div class="_ach_err_btns">
                    ${reload ? `<button class="_ach_btn_reload">🔄 Перезавантажити</button>` : ''}
                    <button class="_ach_btn_dismiss">Закрити</button>
                </div>`;
            if (reload) box.querySelector('._ach_btn_reload').onclick = () => location.reload();
            box.querySelector('._ach_btn_dismiss').onclick = () => ov.remove();
            ov.appendChild(box);
        }
    
        function showStats(data, charName, parentPanel) {
            parentPanel.querySelector('._ach_stats_wrap')?.remove();
            const wrap = document.createElement('div');
            wrap.className = '_ach_stats_wrap';
    
            const cards = [
                { lbl:'Кінар',          val:n(data.total_kinah),        rank:data.total_kinah_pos},
                { lbl:'Вбито мобів',    val:n(data.npc_kill),           rank:data.npc_kill_pos },
                { lbl:'Час у грі',      val:pt(data.play_time),         rank:data.play_time_pos },
                { lbl:'AP',             val:n(data.total_ap),           rank:data.total_ap_pos},
                { lbl:'GP',             val:n(data.total_gp),           rank:data.total_gp_pos },
                { lbl:'Урон гравцям',   val:n(data.players_damage),     rank:data.players_damage_pos },
                { lbl:'Урон мобам',     val:n(data.npc_damage),         rank:data.npc_damage_pos },
                { lbl:'Боси',           val:n(data.boss_kill),          rank:data.boss_kill_pos },
                { lbl:'Блокувань',      val:n(data.block_count),        rank:data.block_count_pos },
                { lbl:'LFG',            val:n(data.lfg_message),        rank:data.lfg_message_pos },
            ];
    
            const box = document.createElement('div');
            box.className = '_ach_stats_box';
            box.innerHTML = `
                <div class="_ach_stats_hdr">
                    <span class="_ach_stats_title">${charName} — Статистика</span>
                    <button class="_ach_close">×</button>
                </div>
                <div class="_ach_stats_grid">
                    ${cards.map(c => `
                        <div class="_ach_sc${c.feat ? ' _feat' : ''}">
                            <div class="_ach_sc_val">${c.val}</div>
                            <div class="_ach_sc_lbl">${c.lbl}</div>
                            <div class="_ach_sc_rank">Рейтинг <b>#${c.rank}</b></div>
                        </div>`).join('')}
                </div>`;
            box.querySelector('._ach_close').onclick = () => wrap.remove();
            wrap.onclick = e => { if (e.target === wrap) wrap.remove(); };
            wrap.appendChild(box);
            parentPanel.appendChild(wrap);
        }
    
        // ─── MAIN MODAL ──────────────────────────────────────────────────────────
    
        // charOrder — массив имён персонажей в порядке, который вернул сервер
        function render(seasonTime, charOrder) {
            inject();
            const ov    = mkOverlay('_ach_main');
            const panel = document.createElement('div');
            panel.className = '_ach_panel';
    
            // Header
            const hdr = document.createElement('div');
            hdr.className = '_ach_hdr';
            hdr.innerHTML = `
                <div class="_ach_hdr_top">
                    <div class="_ach_hdr_left">
                        <span class="_ach_hdr_title">Досягнення</span>
                        <span class="_ach_badge">Season</span>
                    </div>
                    <div class="_ach_hdr_left" style="gap:16px">
                        <div class="_ach_timer">
                            <span class="_ach_timer_lbl">До кінця</span>
                            ${st(seasonTime)}
                        </div>
                        <button class="_ach_close">×</button>
                    </div>
                </div>`;
            hdr.querySelector('._ach_close').onclick = () => ov.remove();
    
            // Tabs
            const tabStrip = document.createElement('div');
            tabStrip.className = '_ach_tabs';
    
            // Info bar
            const infoBar = document.createElement('div');
            infoBar.className = '_ach_bar';
    
            // Body
            const body   = document.createElement('div');
            body.className = '_ach_body';
            const scroll = document.createElement('div');
            scroll.className = '_ach_scroll';
            const grid   = document.createElement('div');
            grid.className = '_ach_grid';
            scroll.appendChild(grid);
            body.appendChild(scroll);
    
            panel.append(hdr, tabStrip, infoBar, body);
            ov.appendChild(panel);
    
            // Используем порядок из API, а не из Object.keys(state)
            const chars = charOrder ?? Object.keys(state);
            let active  = chars[0];
    
            chars.forEach(name => {
                const t = document.createElement('button');
                t.className = '_ach_tab' + (name === active ? ' _on' : '');
                t.textContent = name;
                t.dataset.c = name;
                t.onclick = () => show(name);
                tabStrip.appendChild(t);
            });
    
            function show(name) {
                active = name;
                tabStrip.querySelectorAll('._ach_tab').forEach(t => t.classList.toggle('_on', t.dataset.c === name));
    
                const { achievements: list = [], resets = 0, charId = 0 } = state[name] || {};
                const done    = list.filter(a => a.status === 'COMPLETED').length;
                const rewards = list.filter(a => a.status === 'REWARD_AVAILABLE').length;
    
                // Info bar
                infoBar.innerHTML = '';
                [
                    { val: list.length, lbl: 'Ачівок',     cls: '' },
                    { val: done,        lbl: 'Виконано',   cls: '_blue' },
                    { val: resets,      lbl: 'Скидань',    cls: '_gold' },
                ].forEach(s => {
                    const b = document.createElement('div');
                    b.className = '_ach_stat';
                    b.innerHTML = `<span class="_ach_stat_val ${s.cls}">${s.val}</span><span class="_ach_stat_lbl">${s.lbl}</span>`;
                    infoBar.appendChild(b);
                });
                if (rewards > 0) {
                    const b = document.createElement('div');
                    b.className = '_ach_stat';
                    b.innerHTML = `<span class="_ach_stat_val _gold">🎁 ${rewards}</span><span class="_ach_stat_lbl">Нагород</span>`;
                    infoBar.appendChild(b);
                }
    
                const sbtn = document.createElement('button');
                sbtn.className = '_ach_sbtn';
                sbtn.innerHTML = '▲ Статистика';
                sbtn.onclick = async () => {
                    sbtn.innerHTML = '<span class="_ach_spin"></span>';
                    sbtn.disabled = true;
                    try {
                        showStats(await api.stats(charId), name, panel);
                    } catch (e) {
                        if (e.message.includes('403')) showError('💎 VIP', 'Статистика доступна тільки для VIP.');
                        else showError('Помилка', e.message);
                    } finally {
                        sbtn.innerHTML = '▲ Статистика';
                        sbtn.disabled = false;
                    }
                };
                infoBar.appendChild(sbtn);
    
                // Cards
                grid.innerHTML = '';
                if (!list.length) {
                    grid.innerHTML = '<div style="color:var(--t2);padding:40px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Досягнень не знайдено</div>';
                    return;
                }
    
                const maxLen = Math.max(...list.map(a => (a.title||'').length));
                const cols   = maxLen <= 18 ? 7 : maxLen <= 26 ? 6 : 5;
                grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    
                list.forEach(ach => {
                    const p    = pct(ach);
                    const done = ach.status === 'COMPLETED' || p >= 100;
                    const barC = done
                        ? 'linear-gradient(90deg,var(--gold),#f7c948)'
                        : p > 55
                            ? 'linear-gradient(90deg,var(--blue),var(--teal))'
                            : p > 20
                                ? 'linear-gradient(90deg,#4f8ef7aa,#0ea5e988)'
                                : 'var(--bg4)';
    
                    const cls = done
                        ? '_done'
                        : ach.status === 'REWARD_AVAILABLE'
                            ? '_reward'
                            : ach.status === 'RESET_AVAILABLE'
                                ? '_reset'
                                : ach.status === 'RESET_NOT_AVAILABLE'
                                    ? '_locked'
                                    : '';
    
                    const ico = { COMPLETED:'✓', REWARD_AVAILABLE:'🎁', RESET_AVAILABLE:'↺', RESET_NOT_AVAILABLE:'🔒' }[ach.status] || '';
    
                    const desc = (ach.description||'').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'').trim();
    
                    const card = document.createElement('div');
                    card.className = `_ach_card ${cls}`;
                    card.title = desc || ach.title || '';
    
                    card.innerHTML = `
                        <div class="_ach_card_top">
                            <div class="_ach_card_name">${ach.title||'Без назви'}</div>
                            <div class="_ach_card_ico">${ico}</div>
                        </div>
                        <div class="_ach_prog_txt">${ach.progress||'—'}</div>
                        <div class="_ach_track"><div class="_ach_fill" style="--w:${p}%;background:${barC}"></div></div>
                        <div class="_ach_card_foot"></div>`;
    
                    const foot = card.querySelector('._ach_card_foot');
    
                    if (ach.status === 'REWARD_AVAILABLE') {
                        const btn = document.createElement('button');
                        btn.className = '_ach_abtn _claim';
                        btn.textContent = 'Забрати';
                        btn.onclick = async () => {
                            const o = btn.textContent; btn.textContent = '...'; btn.disabled = true;
                            try {
                                const r = await api.claim(charId, ach.id);
                                if (r.result === 'REWARD_SUCCESS') {
                                    btn.textContent = '✓';
                                    setTimeout(async () => { state[name] = await api.achiv(charId); show(name); }, 700);
                                } else throw new Error(r.result);
                            } catch { btn.textContent = '✗'; setTimeout(() => { btn.textContent = o; btn.disabled = false; }, 1400); }
                        };
                        foot.appendChild(btn);
                    }
    
                    if (ach.status === 'RESET_AVAILABLE') {
                        const btn = document.createElement('button');
                        btn.className = '_ach_abtn _rst';
                        btn.textContent = 'Скинути';
                        btn.onclick = async () => {
                            if (!confirm('Скинути досягнення?')) return;
                            const o = btn.textContent; btn.textContent = '...'; btn.disabled = true;
                            try {
                                const r = await api.reset(charId, ach.id);
                                if (r.result === 'RESET_SUCCESS') {
                                    btn.textContent = '✓';
                                    setTimeout(async () => { state[name] = await api.achiv(charId); show(name); }, 700);
                                } else throw new Error(r.result);
                            } catch { btn.textContent = '✗'; setTimeout(() => { btn.textContent = o; btn.disabled = false; }, 1400); }
                        };
                        foot.appendChild(btn);
                    }
    
                    grid.appendChild(card);
                });
            }
    
            show(active);
        }
    
        // ─── COLLECT + SHOW ──────────────────────────────────────────────────────
    
        async function load() {
            if (collecting) return;
            collecting = true;
            inject();
    
            const ov = mkOverlay('_ach_main');
            const box = document.createElement('div');
            box.className = '_ach_panel';
            box.style.cssText = 'width:min(380px,90vw);max-height:unset;';
            box.innerHTML = `
                <div class="_ach_hdr" style="padding:14px 20px;">
                    <div class="_ach_hdr_top" style="margin-bottom:0">
                        <span class="_ach_hdr_title">Завантаження</span>
                        <button class="_ach_close">×</button>
                    </div>
                </div>
                <div class="_ach_loading"><div class="_ach_spin" style="width:36px;height:36px;"></div>Отримання даних...</div>`;
            box.querySelector('._ach_close').onclick = () => { ov.remove(); collecting = false; };
            ov.appendChild(box);
    
            try {
                state = {};
                const [chars, season] = await Promise.all([api.chars(), api.season()]);
                if (!chars?.length) throw new Error('Персонажів не знайдено');
    
                // Сохраняем порядок персонажей из API
                const charOrder = chars.map(c => c.char_name);
    
                await Promise.all(chars.map(async c => {
                    try { state[c.char_name] = await api.achiv(c.char_id); }
                    catch { state[c.char_name] = { achievements: [], resets: 0, charId: c.char_id }; }
                }));
                ov.remove();
                // Передаём порядок в render
                render(season, charOrder);
            } catch (e) {
                ov.remove();
                if (e.message.includes('403')) showError('💎 VIP ДОСТУП', 'Перегляд досягнень доступний тільки для VIP.');
                else if (e.message.includes('401')) showError('Помилка авторизації', 'Сесія закінчилась.\nПерезавантажте сторінку.', true);
                else showError('Помилка', e.message);
            } finally {
                collecting = false;
            }
        }
    
        // ─── ROUTING ─────────────────────────────────────────────────────────────
    
        const isAch = () => location.href.includes('/account/achievements');
    
        function init() {
            if (!isAch() || ranOnPage) return;
            ranOnPage = true;
            setTimeout(load, 800);
        }
    
        let lastUrl = location.href;
        function poll() {
            if (location.href !== lastUrl) {
                lastUrl = location.href; ranOnPage = false;
                if (isAch()) setTimeout(init, 500);
            }
        }
    
        const _ps = history.pushState.bind(history);
        const _rs = history.replaceState.bind(history);
        history.pushState    = (...a) => { _ps(...a);    ranOnPage = false; setTimeout(poll, 100); };
        history.replaceState = (...a) => { _rs(...a);    ranOnPage = false; setTimeout(poll, 100); };
        window.addEventListener('popstate', () => { ranOnPage = false; setTimeout(poll, 100); });
        setInterval(poll, 500);
        document.addEventListener('click', e => {
            if (e.target.closest('a')?.href?.includes('/account/achievements')) { ranOnPage = false; setTimeout(poll, 600); }
        }, true);
    
        function boot() {
            new MutationObserver(() => { if (isAch() && !ranOnPage) poll(); })
                .observe(document.body || document.documentElement, { childList: true, subtree: true });
            if (isAch()) init();
        }
    
        document.readyState === 'loading'
            ? document.addEventListener('DOMContentLoaded', boot)
            : boot();
    
        setTimeout(() => { if (isAch() && !ranOnPage) init(); }, 2000);
    })();

})();
