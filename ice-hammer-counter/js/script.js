document.addEventListener('DOMContentLoaded', () => {
    const countElement = document.getElementById('count');
    const incrementBtn = document.getElementById('incrementBtn');
    const inputCount = document.getElementById('inputCount');
    const setCountBtn = document.getElementById('setCountBtn');
    const uaFlag = document.getElementById('uaFlag');
    const enFlag = document.getElementById('enFlag');
    const deFlag = document.getElementById('deFlag');
    const esFlag = document.getElementById('esFlag');
    
    const titleElement = document.getElementById('title');

    let count = parseInt(localStorage.getItem('hammerCount')) || 0;
    let currentLang = 'en';

    countElement.textContent = count;

    incrementBtn.addEventListener('click', () => {
        count++;
        countElement.textContent = count;
        localStorage.setItem('hammerCount', count);
    });

    setCountBtn.addEventListener('click', () => {
        count = parseInt(inputCount.value) || 0;
        countElement.textContent = count;
        localStorage.setItem('hammerCount', count);
    });

    uaFlag.addEventListener('click', () => {
        if (currentLang !== 'ua') {
            currentLang = 'ua';
            titleElement.textContent = 'Лічильник Луту';
            incrementBtn.textContent = 'Лут +1';
            inputCount.placeholder = 'Введіть кількість';
            setCountBtn.textContent = 'Встановити кількість';
            uaFlag.style.opacity = 1;
            enFlag.style.opacity = 0.5;
            if (deFlag) deFlag.style.opacity = 0.5;
            if (esFlag) esFlag.style.opacity = 0.5;
        }
    });

    enFlag.addEventListener('click', () => {
        if (currentLang !== 'en') {
            currentLang = 'en';
            titleElement.textContent = 'Loot Counter';
            incrementBtn.textContent = 'Loot +1';
            inputCount.placeholder = 'Enter count';
            setCountBtn.textContent = 'Set Count';
            uaFlag.style.opacity = 0.5;
            enFlag.style.opacity = 1;
            if (deFlag) deFlag.style.opacity = 0.5;
            if (esFlag) esFlag.style.opacity = 0.5;
        }
    });

    deFlag.addEventListener('click', () => {
        if (currentLang !== 'de') {
            currentLang = 'de';
            titleElement.textContent = 'Beutezähler';
            incrementBtn.textContent = 'Beute +1';
            inputCount.placeholder = 'Geben Sie die Anzahl ein';
            setCountBtn.textContent = 'Festlegen';
            uaFlag.style.opacity = 0.5;
            enFlag.style.opacity = 0.5;
            if (deFlag) deFlag.style.opacity = 1;
            if (esFlag) esFlag.style.opacity = 0.5;
        }
    });

    esFlag.addEventListener('click', () => {
        if (currentLang !== 'es') {
            currentLang = 'es';
            titleElement.textContent = 'Contador de Botín';
            incrementBtn.textContent = 'Botín +1';
            inputCount.placeholder = 'Introduce la cantidad';
            setCountBtn.textContent = 'Establecer cantidad';
            uaFlag.style.opacity = 0.5;
            enFlag.style.opacity = 0.5;
            if (deFlag) deFlag.style.opacity = 0.5;
            esFlag.style.opacity = 1;
        }
    });

    // Початкова налаштування для мови
    if (currentLang === 'en') {
        enFlag.style.opacity = 1;
        uaFlag.style.opacity = 0.5;
        if (deFlag) deFlag.style.opacity = 0.5;
        if (esFlag) esFlag.style.opacity = 0.5;
    } else if (currentLang === 'ua') {
        enFlag.style.opacity = 0.5;
        uaFlag.style.opacity = 1;
        if (deFlag) deFlag.style.opacity = 0.5;
        if (esFlag) esFlag.style.opacity = 0.5;
    } else if (currentLang === 'de') {
        enFlag.style.opacity = 0.5;
        uaFlag.style.opacity = 0.5;
        if (deFlag) deFlag.style.opacity = 1;
        if (esFlag) esFlag.style.opacity = 0.5;
    } else if (currentLang === 'es') {
        enFlag.style.opacity = 0.5;
        uaFlag.style.opacity = 0.5;
        if (deFlag) deFlag.style.opacity = 0.5;
        esFlag.style.opacity = 1;
    }
});
