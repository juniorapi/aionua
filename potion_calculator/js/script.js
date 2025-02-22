const materialsData = {
    ring: {
        magic: [
            { material: "Люпин", quantity: 1 },
            { material: "Аир", quantity: 1 },
            { material: "Сильный стихийный порошок", quantity: 3 },
			{ material: "Стеклянная бутылка", quantity: 3 },
            
			
        ],
        
    },
    earring: {
        magic: [
            { material: "Фолиата", quantity: 2 },
            { material: "Рико", quantity: 2 },
            { material: "Элитная стихийная вода", quantity: 3 },
			{ material: "Стеклянная бутылка", quantity: 3 },
           
        ],
        
    },
    necklace: {
        magic: [
            { material: "Свежая фолиата", quantity: 1 },
            { material: "Свежий рико", quantity: 1 },
            { material: "Элитная стихийная вода", quantity: 3 },
			{ material: "Стеклянная бутылка", quantity: 3 },
           
        ],
       
    },
	critical: {
        magic: [
            { material: "Серин", quantity: 1 },
            { material: "Мензе", quantity: 1 },
            { material: "Бренди", quantity: 6 },
			{ material: "Свежие сливки", quantity: 6 },
			
           
        ],
        
    },
    belt: {
        magic: [
            { material: "Магический эфир", quantity: 1 },
            { material: "Элитная стихийная вода", quantity: 3 },
            { material: "Стеклянная бутылка", quantity: 3 },
			
			
        ],
          },
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
	"Коктейль из серина": "images/icon_item_drink01.png",
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
        ring: { name: "Сильное зелье исцеления", quantity: 3 },
        earring: { name: "Зелье восстановления VI", quantity: 3 },
        necklace: { name: "Редкое зелье восстановления VI", quantity: 3 },
        belt: { name: "Редкое зелье ветра V", quantity: 3 },
        critical: { name: "Коктейль из серина", quantity: 2 },
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
