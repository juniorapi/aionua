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
        blue: {
            name: "Древний синий кристалл",
            icon: "images/icon_item_al_combineskill_as_r_60a.png",
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

const ITEM_CRAFTING_DATA = { 
    types: {
        rod: {
            name: "Гибкий обработанный стержень",
            icon: "images/icon_item_ws_we_long_parts_n_e_60a.png",
            outputQuantity: 1,
            materials: [
                { id: 'rod', name: "Каталиумовый стержень", quantity: 20, icon: "images/icon_item_ws_we_parts_n_r_60a.png" },
				{ id: 'whetstone', name: "Священный точильный камень", quantity: 45, icon: "images/icon_item_ws_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Древний эфир III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священный камень оружия IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'catalium', name: "Хороший каталиум", quantity: 29, icon: "images/icon_item_metal_l_60a.png" }, 
                { id: 'crystal', name: "Древний красный кристалл", quantity: 16, icon: "images/icon_item_ta_combineskill_ws_r_60a.png" }
            ]
        },
        rod2: {
            name: "Обработанный каталиумовый стержень",
            icon: "images/icon_item_ws_we_long_parts_n_e_65a.png",
            outputQuantity: 1, 
            materials: [
                { id: 'expertweapon', name: "Сияющее оружие опытного эксперта", quantity: 1, icon: "images/weapon.png" }, 
				{ id: 'whetstone', name: "Священный точильный камень", quantity: 45, icon: "images/icon_item_ws_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Древний эфир III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священный камень оружия IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'catalium', name: "Хороший каталиум", quantity: 29, icon: "images/icon_item_metal_l_60a.png" }, 
                { id: 'crystal', name: "Древний красный кристалл", quantity: 16, icon: "images/icon_item_ta_combineskill_ws_r_60a.png" }
            ]
        },
		bar: {
            name: "Гибкий обработанный брус",
            icon: "images/icon_item_ha_we_long_parts_n_e_60a.png",
            outputQuantity: 1, 
            materials: [
                { id: 'pakirabar', name: "Пахировый брус", quantity: 20, icon: "images/icon_item_ha_we_parts_n_r_60a.png" }, 
				{ id: 'solysandpaper', name: "Священная наждачная бумага", quantity: 45, icon: "images/icon_item_ha_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Древний эфир III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священный камень оружия IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'pakirawood', name: "Хорошая пахира", quantity: 29, icon: "images/icon_item_tree_l_60a.png" }, 
                { id: 'greencrystal', name: "Древний зеленый кристалл", quantity: 16, icon: "images/icon_item_as_combineskill_ha_r_60a.png" }
            ]
        },
		bar2: {
            name: "Обработанный каталиумовый брус",
            icon: "images/icon_item_ha_we_long_parts_n_e_65a.png",
            outputQuantity: 1, 
            materials: [
                { id: 'staff', name: "Сияющий каталиумовый посох опытного эксперта", quantity: 1, icon: "images/weapon2.png" }, 
				{ id: 'solysandpaper', name: "Священная наждачная бумага", quantity: 45, icon: "images/icon_item_ha_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Древний эфир III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священный камень оружия IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'pakirawood', name: "Хорошая пахира", quantity: 29, icon: "images/icon_item_tree_l_60a.png" }, 
                { id: 'greencrystal', name: "Древний зеленый кристалл", quantity: 16, icon: "images/icon_item_as_combineskill_ha_r_60a.png" }
            ]
        },
       
    }
};
const RESOURCE_CRAFTING_DATA = { 
    types: {
        godstone: {
            name: "Контратака эксперта (10%)",
            icon: "images/icon_item_holystone_unique_fire_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия льда", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия мести", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний синий кристалл", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
        godstone2: {
            name: "Справедливость эксперта (10%)",
            icon: "images/icon_item_holystone_unique_earth_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия льда", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия мести", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний синий кристалл", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
		godstone3: {
            name: "Эгоизм эксперта (10%)",
            icon: "images/icon_item_holystone_unique_water_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия льда", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия мести", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний синий кристалл", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
		godstone4: {
            name: "Отзывчивость эксперта (10%)",
            icon: "images/icon_item_holystone_unique_air_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия льда", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия мести", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний синий кристалл", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
		godstone5: {
            name: "Ярость эксперта (1%)",
            icon: "images/icon_item_holystone_unique_fire_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия отчаяния", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний желтый кристалл", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
		godstone6: {
            name: "Сожаление эксперта (1%)",
            icon: "images/icon_item_holystone_unique_water_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия отчаяния", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний желтый кристалл", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
		godstone7: {
            name: "Разум эксперта (1%)",
            icon: "images/icon_item_holystone_unique_earth_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия отчаяния", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний желтый кристалл", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
		godstone8: {
            name: "Клятва эксперта (1%)",
            icon: "images/icon_item_holystone_unique_air_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Идиумовый кристалл времени", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Катализатор древнего преобразования", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Древний обломок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Энергия долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Энергия отчаяния", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древний желтый кристалл", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
        
    }
};

class BaseCalculator {
    constructor(config) {
        this.config = config;
        this.initializeElements();
        this.setupEventListeners();
        this.updateCalculator();
    }

    initializeElements() {
        this.type = document.getElementById(this.config.typeId);
        this.quantity = document.getElementById(this.config.quantityId);
        this.icon = document.querySelector(this.config.iconSelector);
        this.materialsList = document.getElementById(this.config.materialsListId);
        this.outputList = document.getElementById(this.config.outputListId);
        this.resetButton = document.getElementById(this.config.resetButtonId);
    }
        setupEventListeners() {
        this.type.addEventListener('change', () => this.updateCalculator());
        
        this.quantity.addEventListener('focus', (e) => {
            if (e.target.value === '1') {
                e.target.value = '';
            }
        });

        this.quantity.addEventListener('blur', (e) => {
            if (e.target.value === '') {
                e.target.value = '1';
                this.updateCalculator();
            }
        });

        this.quantity.addEventListener('input', () => this.validateAndUpdate());
        this.resetButton.addEventListener('click', () => this.resetCalculator());
    }
	
    validateAndUpdate() {
        let value = parseInt(this.quantity.value);
        if (isNaN(value) || value < 1) {
            this.quantity.value = 1;
        } else if (value > 100) {
            this.quantity.value = 100;
        }
        this.updateCalculator();
    }

    updateCalculator() {
		

        const type = this.type.value;
        const quantity = parseInt(this.quantity.value) || 1;
        const data = this.config.craftingData.types[type];

        this.icon.src = data.icon;
        this.icon.alt = data.name;

        this.materialsList.innerHTML = '';
        data.materials.forEach(material => {
            this.materialsList.appendChild(this.createMaterialRow(material, quantity));
        });

        this.outputList.innerHTML = '';
        this.outputList.appendChild(this.createMaterialRow({
            name: data.name,
            quantity: data.outputQuantity,
            icon: data.icon
        }, quantity));
    }

    createMaterialRow(material, quantity) {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        const icon = document.createElement('img');
        icon.src = material.icon;
        icon.alt = material.name;
        icon.width = 42;
        icon.height = 42;
        nameCell.appendChild(icon);
        nameCell.appendChild(document.createTextNode(material.name));

        const quantityCell = document.createElement('td');
        quantityCell.textContent = material.quantity * quantity;

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        return row;
    }

    resetCalculator() {
        this.quantity.value = 1;
        this.type.selectedIndex = 0;
        this.updateCalculator();
    }
}


const calculatorConfigs = {
    crystal: {
        typeId: 'crystal-type',
        quantityId: 'quantity',
        iconSelector: '#crystal-icon-container img',
        materialsListId: 'materials-list',
        outputListId: 'output-list',
        resetButtonId: 'reset-crystal',
        craftingData: CRAFTING_DATA
    },
    item: {
        typeId: 'item-type',
        quantityId: 'quantity-item',
        iconSelector: '#item-icon-container img',
        materialsListId: 'materials-list-item',
        outputListId: 'output-list-item',
        resetButtonId: 'reset-item',
        craftingData: ITEM_CRAFTING_DATA
    },
    resource: {
        typeId: 'resource-type',
        quantityId: 'quantity-resource',
        iconSelector: '#resource-icon-container img',
        materialsListId: 'materials-list-resource',
        outputListId: 'output-list-resource',
        resetButtonId: 'reset-resource',
        craftingData: RESOURCE_CRAFTING_DATA
    }
};

document.querySelector('.back-button').addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', () => {
    const calculators = {
        crystal: new BaseCalculator(calculatorConfigs.crystal),
        item: new BaseCalculator(calculatorConfigs.item),
        resource: new BaseCalculator(calculatorConfigs.resource)
    };
});
