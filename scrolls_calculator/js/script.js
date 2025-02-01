// script.js
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

function fillMaterials(calculatorId, type = 'magic', quantity = 1) {
    let materialsList = materialsData[calculatorId][type];
    const tableBody = document.getElementById(`materials-list_${calculatorId}`);
    tableBody.innerHTML = '';

    materialsList.forEach(material => {
        const row = document.createElement('tr');
        const materialCell = document.createElement('td');
        const quantityCell = document.createElement('td');

        const icon = document.createElement('img');
        icon.src = materialIcons[material.material] || "images/default_icon.png";
        icon.alt = material.material;
        icon.style.width = "16px";
        icon.style.height = "16px";
        icon.style.marginRight = "5px";
        icon.style.verticalAlign = "middle";

        materialCell.appendChild(icon);
        materialCell.appendChild(document.createTextNode(material.material));

        quantityCell.textContent = material.quantity * quantity;

        row.appendChild(materialCell);
        row.appendChild(quantityCell);
        tableBody.appendChild(row);
    });

    const outputList = document.getElementById(`output-list_${calculatorId}`);
    outputList.innerHTML = '';

    const outputItem = {
        ring: { name: "Свиток отваги III", quantity: 5 },
        earring: { name: "Свиток перерождения III", quantity: 5 },
        necklace: { name: "Свиток ускорения III", quantity: 5 },
        belt: { name: "Свиток яростного ветра", quantity: 5 },
        critical: { name: "Свиток ф/м крит IV/V", quantity: 5 },
    };

    const outputData = outputItem[calculatorId];

    if (outputData) {
        const row = document.createElement('tr');
        const itemCell = document.createElement('td');
        const quantityCell = document.createElement('td');

        const icon = document.createElement('img');
        icon.src = materialIcons[outputData.name] || "images/default_icon.png";
        icon.alt = outputData.name;
        icon.style.width = "16px";
        icon.style.height = "16px";
        icon.style.marginRight = "5px";
        icon.style.verticalAlign = "middle";

        itemCell.appendChild(icon);
        itemCell.appendChild(document.createTextNode(outputData.name));
        quantityCell.textContent = outputData.quantity * quantity;

        row.appendChild(itemCell);
        row.appendChild(quantityCell);
        outputList.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const quantityInputRing = document.getElementById('quantity1_ring');
    const quantityInputEarring = document.getElementById('quantity1_earring');
    const quantityInputNecklace = document.getElementById('quantity1_necklace');
    const quantityInputBelt = document.getElementById('quantity1_belt');
    const quantityInputCritical = document.getElementById('quantity1_critical');

    function updateMaterials(calculatorId, quantityInput, resetQuantity = false) {
        let quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
        }

        if (resetQuantity) {
            quantity = 1;
            quantityInput.value = 1;
        }

        const typeSelect = document.getElementById(`type1_${calculatorId}`);
        const type = typeSelect.value;
        fillMaterials(calculatorId, type, quantity);
    }

    updateMaterials('ring', quantityInputRing);
    updateMaterials('earring', quantityInputEarring);
    updateMaterials('necklace', quantityInputNecklace);
    updateMaterials('belt', quantityInputBelt);
    updateMaterials('critical', quantityInputCritical);

    const calculators = [
        { id: 'ring', input: quantityInputRing },
        { id: 'earring', input: quantityInputEarring },
        { id: 'necklace', input: quantityInputNecklace },
        { id: 'belt', input: quantityInputBelt },
        { id: 'critical', input: quantityInputCritical }
    ];

    calculators.forEach(calc => {
        calc.input.addEventListener('input', function () {
            updateMaterials(calc.id, this);
        });

        document.getElementById(`type1_${calc.id}`).addEventListener('change', function () {
            updateMaterials(calc.id, calc.input, true);
        });
    });
});
