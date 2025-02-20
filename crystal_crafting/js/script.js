const CRAFTING_DATA = {
    types: {
        red: {
            name: "Древний красный кристалл",
            icon: "images/icon_item_ta_combineskill_ws_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок иделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Древний эфир III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
        },
        white: {
            name: "Древний белый кристалл",
            icon: "images/icon_item_ws_combineskill_ar_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок иделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Древний эфир III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
        },
        yellow: {
            name: "Древний желтый кристалл",
            icon: "images/icon_item_ha_combineskill_ta_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок иделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Древний эфир III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
        },
        green: {
            name: "Древний зеленый кристалл",
            icon: "images/icon_item_as_combineskill_ha_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок иделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Древний эфир III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
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
    }
};

class Calculator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.updateCalculator();
    }

    initializeElements() {
        this.crystalType = document.getElementById('crystal-type');
        this.crystalQuantity = document.getElementById('quantity');
        this.crystalIcon = document.querySelector('#crystal-icon-container img');
        this.materialsList = document.getElementById('materials-list');
        this.outputList = document.getElementById('output-list');
        this.resetButton = document.getElementById('reset-crystal');
    }

    setupEventListeners() {
        this.crystalType.addEventListener('change', () => this.updateCalculator());
        this.crystalQuantity.addEventListener('input', () => this.validateAndUpdate());
        this.resetButton.addEventListener('click', () => this.resetCalculator());
    }

    validateAndUpdate() {
        let value = parseInt(this.crystalQuantity.value);
        if (isNaN(value) || value < 1) {
            this.crystalQuantity.value = 1;
        } else if (value > 100) {
            this.crystalQuantity.value = 100;
        }
        this.updateCalculator();
    }

    updateCalculator() {
        const type = this.crystalType.value;
        const quantity = parseInt(this.crystalQuantity.value) || 1;
        const crystalData = CRAFTING_DATA.types[type];

        // Update icon
        this.crystalIcon.src = crystalData.icon;
        this.crystalIcon.alt = crystalData.name;

        // Update materials list
        this.materialsList.innerHTML = '';
        crystalData.materials.forEach(material => {
            this.materialsList.appendChild(this.createMaterialRow(material, quantity));
        });

        // Update output
        this.outputList.innerHTML = '';
        this.outputList.appendChild(this.createMaterialRow({
            name: crystalData.name,
            quantity: crystalData.outputQuantity,
            icon: crystalData.icon
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

    resetCalculator() {
        this.crystalQuantity.value = 1;
        this.crystalType.selectedIndex = 0;
        this.updateCalculator();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
});
