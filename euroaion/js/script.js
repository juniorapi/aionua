document.addEventListener('DOMContentLoaded', function () {
    const SERVER_OFFSET = 2; // EuroAion fixed UTC+2
    const userTimeZone = moment.tz.guess();

    // --- Clocks ---
    function updateClocks() {
        const now = moment().utcOffset(SERVER_OFFSET * 60);
        const local = moment().tz(userTimeZone);
        document.getElementById('current-time').innerHTML =
            '<span class="time-local">Ваш час: ' + local.format('dddd, HH:mm:ss') + '</span>' +
            ' &nbsp;|&nbsp; ' +
            '<span class="time-server">Сервер (UTC+2): ' + now.format('dddd, HH:mm:ss') + '</span>';
    }
    setInterval(updateClocks, 1000);
    updateClocks();

    // --- Load schedule ---
    fetch('../schedule.json')
        .then(r => r.json())
        .then(data => buildAll(data))
        .catch(() => {
            // fallback: use static table if JSON not available
            buildFromTable();
        });

    function buildAll(data) {
        const events = data.events || [];
        // dayShorts from EuroAion: index 0=Mon … 6=Sun
        const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

        // Populate hidden table so timezone conversion works
        const tbody = document.querySelector('.schedule-table tbody');
        tbody.innerHTML = '';

        const CAT_CLASS = {
            siege: 'ev-tiamara',
            fortress: 'ev-sirka',
            dredgion: 'ev-deradikon',
            ophidian: 'ev-iormund',
            battlefield: 'ev-kamara',
            arena: 'ev-arenas',
        };

        // Group events by name for deduplication
        events.forEach(ev => {
            const tr = document.createElement('tr');
            tr.className = CAT_CLASS[ev.cat] || '';

            const label = document.createElement('td');
            label.className = 'schedule-label';
            label.textContent = ev.names.join(' / ');
            tr.appendChild(label);

            // Build time slots string per day (0=Mon…6=Sun)
            for (let d = 0; d < 7; d++) {
                const td = document.createElement('td');
                td.className = 'schedule-time';
                if (ev.days.includes(d)) {
                    td.innerHTML = ev.times.map(t =>
                        pad(t.s) + ':00-' + pad(t.e === 24 ? 0 : t.e) + ':00'
                    ).join('<br>');
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });

        applyTimezoneConversion();
        buildDayCards();
        highlightToday();
    }

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function buildFromTable() {
        applyTimezoneConversion();
        buildDayCards();
        highlightToday();
    }

    // --- Timezone conversion (server UTC+2 → user local) ---
    function applyTimezoneConversion() {
        document.querySelectorAll('.schedule-time').forEach(cell => {
            const html = cell.innerHTML;
            const lines = html.split(/<br\s*\/?>/i);
            const converted = lines.map(line => {
                line = line.replace(/<[^>]*>/g, '').trim();
                if (!line) return '';
                const m = line.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
                if (!m) return line;
                const today = moment().utcOffset(SERVER_OFFSET * 60).format('YYYY-MM-DD');
                let start = moment.tz(today + ' ' + m[1], 'YYYY-MM-DD HH:mm', 'Etc/GMT-2');
                let end   = moment.tz(today + ' ' + m[2], 'YYYY-MM-DD HH:mm', 'Etc/GMT-2');
                if (end.isBefore(start)) end.add(1, 'day');
                return start.clone().tz(userTimeZone).format('HH:mm') + '-' +
                       end.clone().tz(userTimeZone).format('HH:mm');
            });
            cell.innerHTML = converted.filter(Boolean).join('<br>');
        });
    }

    // --- Build cards from table ---
    function buildDayCards() {
        const dayLists = document.querySelectorAll('.day-events');
        const rows = document.querySelectorAll('.schedule-table tbody tr');

        dayLists.forEach(list => {
            const dayIdx = parseInt(list.getAttribute('data-day-index'), 10);
            list.innerHTML = '';
            const fragment = document.createDocumentFragment();

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const cell = cells[dayIdx];
                if (!cell || !cell.textContent.trim()) return;

                const labelCell = row.querySelector('.schedule-label');
                const labelText = labelCell ? labelCell.textContent.trim() : '';
                const isAccent = labelCell && labelCell.classList.contains('text-red');
                const evClass = Array.from(row.classList).find(c => c.startsWith('ev-')) || '';

                const li = document.createElement('li');
                li.className = 'event-item ' + evClass + (isAccent ? ' event-item--accent' : '');

                const name = document.createElement('div');
                name.className = 'event-item__name';
                name.textContent = labelText;
                li.appendChild(name);

                const times = document.createElement('div');
                times.className = 'event-item__times';
                cell.innerHTML.split(/<br\s*\/?>/i).forEach(slot => {
                    const t = slot.replace(/<[^>]*>/g, '').trim();
                    if (!t) return;
                    const span = document.createElement('span');
                    span.className = 'event-item__slot';
                    span.textContent = t;
                    times.appendChild(span);
                });
                li.appendChild(times);
                fragment.appendChild(li);
            });

            if (!fragment.childNodes.length) {
                const empty = document.createElement('li');
                empty.className = 'event-item event-item--empty';
                empty.textContent = 'Тиша. Жодних подій цього дня.';
                fragment.appendChild(empty);
            }
            list.appendChild(fragment);
        });
    }

    // --- Highlight today ---
    function highlightToday() {
        // Use server UTC+2 day to match EuroAion
        const serverDay = moment().utcOffset(SERVER_OFFSET * 60).day(); // 0=Sun, 1=Mon…
        const dayIdx = serverDay === 0 ? 7 : serverDay; // our cards: 1=Mon…7=Sun
        const todayCard = document.querySelector('.day-card[data-day="' + dayIdx + '"]');
        if (todayCard) {
            todayCard.classList.add('day-card--today');
            todayCard.setAttribute('aria-current', 'date');
        }

        // Highlight column in hidden table
        const rows = document.querySelectorAll('.schedule-table tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells[dayIdx]) cells[dayIdx].classList.add('highlight');
        });
    }

    document.querySelector('.back-button').addEventListener('click', () => {
        window.history.back();
    });
});
