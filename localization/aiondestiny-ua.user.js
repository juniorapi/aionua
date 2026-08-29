// ==UserScript==
// @name         Aion Destiny — українська локалізація
// @namespace    https://github.com/juniorapi/aionua
// @version      1.1.0
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

    const tidy = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

    function translateAchievement(value, dict) {
        const raw = tidy(value);
        if (!raw) return value;
        const hit = dict[raw];
        if (hit) return hit;
        if (/[а-яА-ЯёЁ]/.test(raw) && missingAchievements.size < 500) missingAchievements.add(raw);
        return value;
    }

    /* Перехоплюємо відповідь API — так українські назви бачить і сайт,
       і сторонній трекер досягнень, який ходить у той самий ендпоінт. */
    function hookAchievementsApi() {
        const original = window.fetch;
        if (!original || original.__uaHooked) return;

        const wrapped = async function (...args) {
            const response = await original.apply(this, args);
            try {
                const url = typeof args[0] === 'string' ? args[0] : args[0]?.url ?? '';
                if (!/\/api\/achiv\/char\//.test(url) || !enabled()) return response;

                const clone = response.clone();
                const data = await clone.json();
                if (!Array.isArray(data?.achiv_list)) return response;

                for (const a of data.achiv_list) {
                    if (a.title) a.title = translateAchievement(a.title, ACHIEVEMENTS);
                    if (a.description) a.description = translateAchievement(a.description, ACHIEVEMENT_DESCRIPTIONS);
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
        version: '1.1.0',
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
})();
