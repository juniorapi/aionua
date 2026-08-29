// ==UserScript==
// @name         Aion Destiny — українська локалізація
// @namespace    https://github.com/juniorapi/aionua
// @version      0.9.0
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
        version: '0.9.0',
        get locale() { return currentLocale(); },
        missing: () => [...missing].sort(),
        missingText: () => [...missing].sort().join('\n'),
        count: () => missing.size,
        on: () => { try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {} location.reload(); },
        off: () => { try { localStorage.setItem(STORAGE_KEY, '0'); } catch (e) {} location.reload(); },
    };
})();
