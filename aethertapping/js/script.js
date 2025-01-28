document.addEventListener("DOMContentLoaded", function () {
    // Находимо всі кнопки спойлерів
    const spoilerButtons = document.querySelectorAll(".bbCodeSpoiler-button");

    spoilerButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Находимо контент поруч з кнопкою
            const content = this.nextElementSibling;
            if (content) {
                // Перемикаємо відображення блоку
                if (content.style.display === "none" || !content.style.display) {
                    content.style.display = "block"; // Показуємо
                } else {
                    content.style.display = "none"; // Сховуємо
                }
            }
        });
    });
});
