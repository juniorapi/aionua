  // Підсвічування поточного дня
        const currentDate = new Date(); // отримуємо поточну дату
        const currentDay = currentDate.getDay(); // отримуємо день тижня (0 - Нд, 1 - Пн, ..., 6 - Сб)

        const highlightIndex = currentDay === 0 ? 6 : currentDay - 1;

        const cells = document.querySelectorAll('.schedule-table td');
        cells.forEach((cell, index) => {
            if (index % 8 === highlightIndex + 1) {
                cell.classList.add('highlight'); // підсвічуємо відповідний день
            }
        });

        // Виведення поточного часу в київському часі
        function formatTime(date) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                timeZone: 'Europe/Kiev'
            };
            return new Intl.DateTimeFormat('uk-UA', options).format(date);
        }

        function updateTime() {
            const timeElement = document.getElementById('current-time');
            const now = new Date();
            timeElement.textContent = formatTime(now); // Виводимо поточний час
        }

        setInterval(updateTime, 1000);
