const itemLevel = document.getElementById("slItemLevel");
const itemEnchantmentLevel = document.getElementById("slEnchLevel");

const table = document.querySelector(".calculator-output__list");
const itemTypeRadios = document.querySelectorAll('input[name="item-type"]');

const MAX_ITEM_LEVEL = 65;
const MAX_ENCH_LEVEL = 15;

function updateSelectOptions() {
  itemLevel.innerHTML = "";
  itemEnchantmentLevel.innerHTML = "";

  for (let i = MAX_ITEM_LEVEL; i > 0; i--) {
    itemLevel.innerHTML += `<option value="${i}">${i}</option>`;
  }

  for (let i = 0; i < MAX_ENCH_LEVEL; i++) {
    itemEnchantmentLevel.innerHTML += `<option value="${i}">${i}</option>`;
  }
}

updateSelectOptions();

generateTable();

document.getElementById("slEnchLevel").addEventListener("change", () => {
  generateTable();
});

document.getElementById("slItemLevel").addEventListener("change", () => {
  generateTable();
});

for (const radioButton of itemTypeRadios) {
  radioButton.addEventListener("change", () => {
    itemLevel.firstElementChild.selected = true;
    itemEnchantmentLevel.firstElementChild.selected = true;

    generateTable();
  });
}

document.querySelector('.back-button')?.addEventListener('click', () => {
        // history.back() має сенс лише тоді, коли попередня сторінка — наша.
        // Інакше (прямий захід, перехід із пошуку) повертаємося на головну.
        let cameFromSite = false;
        try {
            cameFromSite = Boolean(document.referrer)
                && new URL(document.referrer).origin === window.location.origin;
        } catch (e) { /* некоректний referrer — вважаємо, що зайшли напряму */ }

        if (cameFromSite && window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../';
        }
    });

function generateTable() {
  table.innerHTML = "";

  const itemType = document.querySelector('input[name="item-type"]:checked');

  maxStone = Number(itemLevel.value) + Number(itemType.value) + Number(itemEnchantmentLevel.value);

  for (let difference = 40; difference >= 0; difference--) {
    table.innerHTML += `<div class="calculator-output__list-item">
                                <div>L${maxStone--}</div>
                                <div>${difference * 2}%</div>
                            </div>`;
  }
}
