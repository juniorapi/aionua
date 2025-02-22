const materialsData = {
    ring: {
        magic: [
            { material: "Эфир", quantity: 1 },
            { material: "Рубиновый порошок", quantity: 5 },
            { material: "Асватовая бумага", quantity: 5 },
        ],
        physical: [
            { material: "Магический эфир", quantity: 1 },
            { material: "Турмалиновый порошок", quantity: 4 },
            { material: "Макиновая бумага", quantity: 5 },
        ]
    },
    earring: {
        magic: [
            { material: "Эфир", quantity: 1 },
            { material: "Сапфировый порошок", quantity: 5 },
            { material: "Асватовая бумага", quantity: 5 },
        ],
        physical: [
            { material: "Магический эфир", quantity: 1 },
            { material: "Порошок из бирюзы", quantity: 4 },
            { material: "Макиновая бумага", quantity: 5 },
        ]
    },
    necklace: {
        magic: [
            { material: "Эфир", quantity: 1 },
            { material: "Алмазный порошок", quantity: 5 },
            { material: "Асватовая бумага", quantity: 5 },
        ],
        physical: [
            { material: "Магический эфир", quantity: 1 },
            { material: "Кельфаратовый порошок", quantity: 4 },
            { material: "Макиновая бумага", quantity: 5 },
        ]
    },
    critical: {
        magic: [
            { material: "Магический эфир", quantity: 1 },
            { material: "Элитный стихийный порошок", quantity: 5 },
            { material: "Макиновая бумага", quantity: 5 },
        ],
    },
    belt: {
        magic: [
            { material: "Эфир", quantity: 1 },
            { material: "Сапфировый порошок", quantity: 5 },
            { material: "Асватовая бумага", quantity: 5 },
        ],
        physical: [
            { material: "Магический эфир", quantity: 1 },
            { material: "Порошок из бирюзы", quantity: 4 },
            { material: "Макиновая бумага", quantity: 5 },
        ],
    }
};

const materialIcons = {
    "Эфир": "images/icon_item_od01.png",
    "Магический эфир": "images/icon_item_od05.png",
    "Асватовая бумага": "images/icon_item_paper01.png",
    "Макиновая бумага": "images/icon_item_paper01.png",
    "Рубиновый порошок": "images/icon_item_gempoder02.png",
    "Турмалиновый порошок": "images/icon_item_gempoder02.png",
    "Сапфировый порошок": "images/icon_item_gempoder01.png",
    "Порошок из бирюзы": "images/icon_item_gempoder01.png",
    "Кельфаратовый порошок": "images/icon_item_gempoder03.png",
    "Алмазный порошок": "images/icon_item_gempoder03.png",
    "Свиток отваги III": "images/icon_item_scroll_speed_atk_01.png",
    "Свиток перерождения III": "images/icon_item_scroll_speed_casting_01.png",
    "Свиток ускорения III": "images/icon_item_scroll_speed_run_01.png",
    "Свиток яростного ветра": "images/icon_item_scroll_speed_fly_01.png",
    "Элитный стихийный порошок": "images/icon_item_dust01f.png",
    "Свиток ф/м крит IV/V": "images/icon_item_scroll_critical_mag_01.png",
};

const outputItems = {
    ring: { name: "Свиток отваги III", quantity: 5 },
    earring: { name: "Свиток перерождения III", quantity: 5 },
    necklace: { name: "Свиток ускорения III", quantity: 5 },
    belt: { name: "Свиток яростного ветра", quantity: 5 },
    critical: { name: "Свиток ф/м крит IV/V", quantity: 5 },
};

function formatNumber(number) {
    return number.toLocaleString('ua-UA');
}

function createTableRow(material, quantity, isOutput = false) {
    const row = document.createElement('tr');
    const itemCell = document.createElement('td');
    const quantityCell = document.createElement('td');

    const icon = document.createElement('img');
    icon.src = materialIcons[material] || "images/default_icon.png";
    icon.alt = material;
    icon.style.width = "30px";
    icon.style.height = "30px";
    icon.style.marginRight = "5px";
    icon.style.verticalAlign = "middle";

    itemCell.appendChild(icon);
    itemCell.appendChild(document.createTextNode(material));
    quantityCell.textContent = formatNumber(quantity);

    row.appendChild(itemCell);
    row.appendChild(quantityCell);
    
    return row;
}

function fillMaterials(calculatorId, type = 'magic', quantity = 1) {
    const materialsList = materialsData[calculatorId]?.[type];
    if (!materialsList) return;

    const tableBody = document.getElementById(`materials-list_${calculatorId}`);
    const outputList = document.getElementById(`output-list_${calculatorId}`);
    
    if (!tableBody || !outputList) return;

    tableBody.innerHTML = '';
    outputList.innerHTML = '';

    materialsList.forEach(material => {
        const row = createTableRow(material.material, material.quantity * quantity);
        tableBody.appendChild(row);
    });

    const outputData = outputItems[calculatorId];
    if (outputData) {
        const row = createTableRow(outputData.name, outputData.quantity * quantity, true);
        outputList.appendChild(row);
    }
}

function validateQuantityInput(input) {
    let value = parseInt(input.value, 10);
    
    if (isNaN(value) || value < 1) {
        value = 1;
    } else if (value > 99999) {
        value = 99999;
    }
    
    input.value = value;
    return value;
}

function resetCalculator(calculatorId) {
    const quantityInput = document.getElementById(`quantity1_${calculatorId}`);
    const typeSelect = document.getElementById(`type1_${calculatorId}`);
    
    if (quantityInput && typeSelect) {
        quantityInput.value = 1;
        typeSelect.selectedIndex = 0;
        fillMaterials(calculatorId, typeSelect.value, 1);
    }
}

function updateMaterials(calculatorId, quantityInput) {
    let quantity = validateQuantityInput(quantityInput);
    const typeSelect = document.getElementById(`type1_${calculatorId}`);
    if (!typeSelect) return;

    const type = typeSelect.value;
    fillMaterials(calculatorId, type, quantity);
}

document.addEventListener('DOMContentLoaded', () => {
    const calculators = ['ring', 'earring', 'necklace', 'belt', 'critical'];

    calculators.forEach(calculatorId => {
        const quantityInput = document.getElementById(`quantity1_${calculatorId}`);
        const typeSelect = document.getElementById(`type1_${calculatorId}`);
        const resetButton = document.querySelector(`.calculator:has(#quantity1_${calculatorId}) .reset-button`);

        if (!quantityInput || !typeSelect) return;

        updateMaterials(calculatorId, quantityInput);

        quantityInput.addEventListener('input', () => updateMaterials(calculatorId, quantityInput));
        
        quantityInput.addEventListener('blur', () => {
            validateQuantityInput(quantityInput);
        });

        typeSelect.addEventListener('change', () => {
            updateMaterials(calculatorId, quantityInput);
        });

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                resetCalculator(calculatorId);
            });
        }

        if (calculatorId === 'critical') {
            typeSelect.disabled = true;
        }
    });
});
