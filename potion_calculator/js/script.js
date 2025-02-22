const recipesData = {
    potion1: {  
        materials: [
            { material: "Люпин", quantity: 1 },
            { material: "Аир", quantity: 1 },
            { material: "Сильный стихийный порошок", quantity: 3 },
            { material: "Стеклянная бутылка", quantity: 3 }
        ],
        output: {
            name: "Сильное зелье исцеления",
            quantity: 3
        }
    },
    potion2: {  
        materials: [
            { material: "Фолиата", quantity: 2 },
            { material: "Рико", quantity: 2 },
            { material: "Элитная стихийная вода", quantity: 3 },
            { material: "Стеклянная бутылка", quantity: 3 }
        ],
        output: {
            name: "Зелье восстановления VI",
            quantity: 3
        }
    },
    potion3: {  
        materials: [
            { material: "Свежая фолиата", quantity: 1 },
            { material: "Свежий рико", quantity: 1 },
            { material: "Элитная стихийная вода", quantity: 3 },
            { material: "Стеклянная бутылка", quantity: 3 }
        ],
        output: {
            name: "Редкое зелье восстановления VI",
            quantity: 3
        }
    },
    potion4: { 
        materials: [
            { material: "Магический эфир", quantity: 1 },
            { material: "Элитная стихийная вода", quantity: 3 },
            { material: "Стеклянная бутылка", quantity: 3 }
        ],
        output: {
            name: "Редкое зелье ветра V",
            quantity: 3
        }
    },
    potion5: { 
        materials: [
            { material: "Серин", quantity: 1 },
            { material: "Мензе", quantity: 1 },
            { material: "Бренди", quantity: 6 },
            { material: "Свежие сливки", quantity: 6 }
        ],
        output: {
            name: "Коктейль из серина",
            quantity: 6
        }
    }
};

const materialIcons = {
    "Люпин": "images/icon_item_herb07.png",
    "Аир": "images/icon_item_herb09.png",
    "Сильный стихийный порошок": "images/icon_item_dust01e.png",
    "Фолиата": "images/icon_item_herb02.png",
    "Рико": "images/icon_item_herb05.png",
    "Элитная стихийная вода": "images/icon_item_elementalwater01f.png",
    "Стеклянная бутылка": "images/icon_item_flask04.png",
    "Свежая фолиата": "images/icon_item_herb02_r.png",
    "Свежий рико": "images/icon_item_herb05_r.png",
    "Магический эфир": "images/icon_item_od05.png",
    "Серин": "images/icon_item_fruit07.png",
    "Мензе": "images/icon_item_fruit02.png",
    "Бренди": "images/icon_item_bottle03.png",
    "Свежие сливки": "images/icon_item_sac01.png",
    "Сильное зелье исцеления": "images/icon_item_potion_cure01a.png",
    "Зелье восстановления VI": "images/icon_item_potion_hpmp02_5.png",
    "Редкое зелье восстановления VI": "images/icon_item_potion_hpmp03_5.png",
    "Редкое зелье ветра V": "images/icon_item_potion_cure04d.png",
    "Коктейль из серина": "images/icon_item_drink01.png"
};

function formatNumber(number) {
    return number.toLocaleString('uk-UA');
}

function createTableRow(material, quantity) {
    const row = document.createElement('tr');
    const itemCell = document.createElement('td');
    const quantityCell = document.createElement('td');

    const icon = document.createElement('img');
    icon.src = materialIcons[material] || "images/default_icon.png";
    icon.alt = material;
    icon.className = 'material-icon';
    
    itemCell.appendChild(icon);
    itemCell.appendChild(document.createTextNode(material));
    quantityCell.textContent = formatNumber(quantity);

    row.appendChild(itemCell);
    row.appendChild(quantityCell);
    
    return row;
}

function updateCalculator(calculatorNumber, quantity = 1) {
    const potionData = recipesData[`potion${calculatorNumber}`];
    if (!potionData) return;

    const materialsTableBody = document.getElementById(`materials-list${calculatorNumber}`);
    const outputTableBody = document.getElementById(`output-list${calculatorNumber}`);
    
    if (!materialsTableBody || !outputTableBody) return;

    materialsTableBody.innerHTML = '';
    outputTableBody.innerHTML = '';

    potionData.materials.forEach(item => {
        const row = createTableRow(item.material, item.quantity * quantity);
        materialsTableBody.appendChild(row);
    });

    const outputRow = createTableRow(
        potionData.output.name, 
        potionData.output.quantity * quantity
    );
    outputTableBody.appendChild(outputRow);
}

function validateQuantity(value) {
    value = parseInt(value) || 1;
    return Math.max(1, Math.min(value, 99999));
}

document.querySelector('.back-button').addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 5; i++) {
        const calculator = document.getElementById(`quantity${i}`);
        const resetButton = document.querySelector(`.calculator:nth-child(${i}) .reset-button`);

        if (calculator) {
            calculator.addEventListener('input', (e) => {
                const quantity = validateQuantity(e.target.value);
                e.target.value = quantity;
                updateCalculator(i, quantity);
            });

            updateCalculator(i, 1);
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (calculator) {
                    calculator.value = 1;
                    updateCalculator(i, 1);
                }
            });
        }
    }
});
