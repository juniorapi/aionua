function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const options = { timeZone: 'Europe/Kiev', hour12: false };
    const time = new Date().toLocaleString('uk-UA', options);
    currentTimeElement.textContent = `Поточний час (Київ): ${time}`;
}

document.addEventListener('DOMContentLoaded', function() {
    updateTime(); // Оновлюємо час після завантаження сторінки
    setInterval(updateTime, 1000); // Оновлюємо час кожну секунду
});
