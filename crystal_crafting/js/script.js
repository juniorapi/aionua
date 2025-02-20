const CRAFTING_DATA = {
    crystals: {
        materials: [
            { id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 40, icon: "images/icon_item_testtube01.png" },
            { id: 'shard', name: "Осколок иделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
            { id: 'ether', name: "Древний эфир III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
        ],
        types: {
            red: {
                name: "Древний красный кристалл",
                icon: "images/icon_item_ta_combineskill_ws_r_60a.png",
                outputQuantity: 5
            },
            white: {
                name: "Древний белый кристалл",
                icon: "images/icon_item_ws_combineskill_ar_r_60a.png",
                outputQuantity: 5
            },
            yellow: {
                name: "Древний желтый кристалл",
                icon: "images/icon_item_ha_combineskill_ta_r_60a.png",
                outputQuantity: 5
            },
            green: {
                name: "Древний зеленый кристалл",
                icon: "images/icon_item_as_combineskill_ha_r_60a.png",
                outputQuantity: 5
            }
        }
    },
    idium: {
        name: "Идиумовый кристалл времени",
        icon: "images/icon_item_co_combineskill_all_r_60a.png",
        outputQuantity: 10,
        materials: [
            { id: 'powder', name: "Порошок времени", quantity: 10, icon: "images/icon_item_co_shopmaterial_c_60a.png" },
            { id: 'shard', name: "Осколок иделла", quantity: 10, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
            { id: 'ether', name: "Древний эфир", quantity: 10, icon: "images/icon_item_od_all_c_60a.png" },
            { id: 'clemposil', name: "Клемпосиль", quantity: 10, icon: "images/icon_item_co_combineskill_material_r_60a.png" }
        ]
    }
};

class Calculator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.updateAll();
    }

    initializeElements() {
    
        this.crystalType = document.getElementById('crystal-type');
        this.crystalQuantity = document.getElementById('quantity');
        this.crystalIcon = document.querySelector('#crystal-icon-container img');
        this.materialsList = document.getElementById('materials-list');
        this.outputList = document.getElementById('output-list');

        
        this.idiumQuantity = document.getElementById('quantity-idium');
        this.idiumMaterialsList = document.getElementById('materials-list-idium');
        this.idiumOutputList = document.getElementById('output-list-idium');

        
        this.resetCrystal = document.getElementById('reset-crystal');
        this.resetIdium = document.getElementById('reset-idium');
    }

    setupEventListeners() {
     
        this.crystalType.addEventListener('change', () => this.updateCrystalCalculator());
        this.crystalQuantity.addEventListener('input', () => this.validateAndUpdate(this.crystalQuantity));

       
        this.idiumQuantity.addEventListener('input', () => this.validateAndUpdate(this.idiumQuantity));

        
        this.resetCrystal.addEventListener('click', () => this.resetCalculator('crystal'));
        this.resetIdium.addEventListener('click', () => this.resetCalculator('idium'));
    }

    validateAndUpdate(input) {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) {
            input.value = 1;
        } else if (value > 100) {
            input.value = 100;
        }
        this.updateAll();
    }

    updateAll() {
        this.updateCrystalCalculator();
        this.updateIdiumCalculator();
    }

    updateCrystalCalculator() {
        const type = this.crystalType.value;
        const quantity = parseInt(this.crystalQuantity.value) || 1;
        const crystalData = CRAFTING_DATA.crystals.types[type];

      
        this.crystalIcon.src = crystalData.icon;
        this.crystalIcon.alt = crystalData.name;

      
        this.materialsList.innerHTML = '';
        CRAFTING_DATA.crystals.materials.forEach(material => {
            this.materialsList.appendChild(this.createMaterialRow(material, quantity));
        });

       
        this.outputList.innerHTML = '';
        this.outputList.appendChild(this.createMaterialRow({
            name: crystalData.name,
            quantity: crystalData.outputQuantity,
            icon: crystalData.icon
        }, quantity));
    }

    updateIdiumCalculator() {
        const quantity = parseInt(this.idiumQuantity.value) || 1;
        const idiumData = CRAFTING_DATA.idium;

        
        this.idiumMaterialsList.innerHTML = '';
        idiumData.materials.forEach(material => {
            this.idiumMaterialsList.appendChild(this.createMaterialRow(material, quantity));
        });

        
        this.idiumOutputList.innerHTML = '';
        this.idiumOutputList.appendChild(this.createMaterialRow({
            name: idiumData.name,
            quantity: idiumData.outputQuantity,
            icon: idiumData.icon
        }, quantity));
    }

    createMaterialRow(material, quantity) {
        const row = document.createElement('tr');
        
        
        const nameCell = document.createElement('td');
        const icon = document.createElement('img');
        icon.src = material.icon;
        icon.alt = material.name;
        icon.style.width = "16px";
        icon.style.height = "16px";
        nameCell.appendChild(icon);
        nameCell.appendChild(document.createTextNode(material.name));
        
        
        const quantityCell = document.createElement('td');
        quantityCell.textContent = material.quantity * quantity;
        
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        return row;
    }

    resetCalculator(type) {
        if (type === 'crystal') {
            this.crystalQuantity.value = 1;
            this.crystalType.selectedIndex = 0;
        } else if (type === 'idium') {
            this.idiumQuantity.value = 1;
        }
        this.updateAll();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
});
