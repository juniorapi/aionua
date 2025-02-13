document.addEventListener('DOMContentLoaded', function() {
    const userTimeZone = moment.tz.guess(); // Визначаємо часову зону користувача

    // Функція для оновлення поточного часу в локальній часовій зоні
    function updateTime() {
        const now = moment().tz(userTimeZone);
        document.getElementById('current-time').textContent = now.format('dddd, LL, HH:mm:ss'); // Формат без зони
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Підсвічуємо поточний день
    const currentDay = moment().tz(userTimeZone).day(); // Отримуємо поточну дату і час в локальній часовій зоні
    const highlightIndex = currentDay; // Видаляємо зайвий зсув індексу

    // Підсвічуємо відповідну клітинку в таблиці
    const cells = document.querySelectorAll('.schedule-table td');
    cells.forEach((cell, index) => {
        if (index % 8 === highlightIndex) {
            cell.classList.add('highlight'); // Підсвічуємо відповідний день
        }
    });

    // Обробка часу в таблиці
    document.querySelectorAll('.schedule-time').forEach(function(cell) {
        const originalHTML = cell.innerHTML;
        const lines = originalHTML.split(/<br\s*\/?>/); // Розділяємо по кожному часу
        const convertedLines = lines.map(function(line) {
            line = line.trim();
            if (!line) return "";

            // Перевірка часу у форматі HH:mm - HH:mm
            const match = line.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})(.*)/);
            if (match) {
                const startStr = match[1];
                const endStr = match[2];
                const extra = match[3] || "";

                // Отримуємо сьогоднішню дату в новій часовій зоні для конвертації
                const todayNewZone = moment().tz("Europe/Kiev").format("YYYY-MM-DD"); 
                let startNewZone = moment.tz(`${todayNewZone} ${startStr}`, "YYYY-MM-DD HH:mm", "Europe/Kiev");
                let endNewZone = moment.tz(`${todayNewZone} ${endStr}`, "YYYY-MM-DD HH:mm", "Europe/Kiev");

                // Якщо час завершення менший за початковий – припускаємо, що подія триває до наступного дня
                if (endNewZone.isBefore(startNewZone)) {
                    endNewZone.add(1, 'day');
                }

                // Конвертуємо у часову зону користувача
                const startLocal = startNewZone.clone().tz(userTimeZone).format("HH:mm");
                const endLocal = endNewZone.clone().tz(userTimeZone).format("HH:mm");

                // Повертаємо відформатований час
                return `${startLocal}-${endLocal}${extra}`;
            } else {
                return line;
            }
        });

        // Оновлюємо HTML клітинки
        cell.innerHTML = convertedLines.join('<br>');
    });
});
