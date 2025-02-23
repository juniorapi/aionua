const SCROLL_CRAFTING_DATA = { 
    types: {
        courage: {
            name: "Свиток отваги III",
            icon: "images/icon_item_scroll_speed_atk_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Эфир", quantity: 1, icon: "images/icon_item_od01.png" },
                { id: 'shard', name: "Рубиновый порошок", quantity: 5, icon: "images/icon_item_gempoder02.png" },
                { id: 'ether', name: "Асватовая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]
        },
        courage2: {
            name: "Свиток отваги III",
            icon: "images/icon_item_scroll_speed_atk_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" },
                { id: 'shard', name: "Турмалиновый порошок", quantity: 4, icon: "images/icon_item_gempoder02.png" },
                { id: 'ether', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]
        },
        rebirth: {
            name: "Свиток перерождения III",
            icon: "images/icon_item_scroll_speed_casting_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Эфир", quantity: 1, icon: "images/icon_item_od01.png" },
                { id: 'shard', name: "Сапфировый порошок", quantity: 5, icon: "images/icon_item_gempoder01.png" },
                { id: 'ether', name: "Асватовая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]
        },
        rebirth2: {
            name: "Свиток перерождения III",
            icon: "images/icon_item_scroll_speed_casting_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" },
                { id: 'shard', name: "Порошок из бирюзы", quantity: 4, icon: "images/icon_item_gempoder01.png" },
                { id: 'ether', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]
		},
        acceleration: {
            name: "Свиток ускорения III",
            icon: "images/icon_item_scroll_speed_run_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Эфир", quantity: 1, icon: "images/icon_item_od01.png" },
                { id: 'shard', name: "Алмазный порошок", quantity: 5, icon: "images/icon_item_gempoder03.png" },
                { id: 'ether', name: "Асватовая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
        acceleration2: {
            name: "Свиток ускорения III",
            icon: "images/icon_item_scroll_speed_run_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" },
                { id: 'shard', name: "Кельфаратовый порошок", quantity: 4, icon: "images/icon_item_gempoder03.png" },
                { id: 'ether', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
        wind: {
            name: "Свиток яростного ветра",
            icon: "images/icon_item_scroll_speed_fly_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Эфир", quantity: 1, icon: "images/icon_item_od01.png" },
                { id: 'shard', name: "Сапфировый порошок", quantity: 5, icon: "images/icon_item_gempoder01.png" },
                { id: 'ether', name: "Асватовая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
	    wind2: {
            name: "Свиток яростного ветра",
            icon: "images/icon_item_scroll_speed_fly_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" },
                { id: 'shard', name: "Порошок из бирюзы", quantity: 4, icon: "images/icon_item_gempoder01.png" },
                { id: 'clemposil', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
        critical: {
            name: "Свиток ф/м крит IV/V",
            icon: "images/icon_item_scroll_critical_phy_mag.png",
            outputQuantity: 5,
            materials: [
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" },
                { id: 'shard', name: "Элитный стихийный порошок", quantity: 5, icon: "images/icon_item_dust01f.png" },
                { id: 'clemposil', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]
        }
    }
};

const POTION_CRAFTING_DATA = { 
    types: {
        cure: {
            name: "Сильное зелье исцеления",
            icon: "images/icon_item_potion_cure01a.png",
            outputQuantity: 3,
            materials: [
                { id: 'neunan', name: "Люпин", quantity: 1, icon: "images/icon_item_herb07.png" },
				{ id: 'calamot', name: "Аир", quantity: 1, icon: "images/icon_item_herb09.png" },
				{ id: 'greater_powder', name: "Сильный стихийный порошок", quantity: 3, icon: "images/icon_item_dust01e.png" }, 
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" }
            ]
        },
        recovery_potion: {
            name: "Зелье восстановления VI",
            icon: "images/icon_item_potion_hpmp02_5.png",
            outputQuantity: 3, 
            materials: [
                { id: 'plia', name: "Фолиата", quantity: 2, icon: "images/icon_item_herb02.png" }, 
				{ id: 'liconsis', name: "Рико", quantity: 2, icon: "images/icon_item_herb05.png" },
				{ id: 'elemental_water', name: "Элитная стихийная вода", quantity: 3, icon: "images/icon_item_elementalwater01f.png" }, 
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" } 
	       ]
        },
		recovery_serum: {
            name: "Редкое зелье восстановления VI",
            icon: "images/icon_item_potion_hpmp03_5.png",
            outputQuantity: 3, 
            materials: [
                { id: 'fresh_plia', name: "Свежая фолиата", quantity: 1, icon: "images/icon_item_herb02_r.png" }, 
				{ id: 'fresh_liconsis', name: "Свежий рико", quantity: 1, icon: "images/icon_item_herb05_r.png" },
				{ id: 'elemental_water', name: "Элитная стихийная вода", quantity: 3, icon: "images/icon_item_elementalwater01f.png" }, 
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" }				
            ]
        },
		fine_life_potion: {
            name: "Зелье жизни VI",
            icon: "images/icon_item_potion_hp02_5.png",
            outputQuantity: 3, 
            materials: [
                { id: 'plia', name: "Фолиата", quantity: 3, icon: "images/icon_item_herb02.png" }, 
				{ id: 'elemental_water', name: "Элитная стихийная вода", quantity: 3, icon: "images/icon_item_elementalwater01f.png" },
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" } 
				
            ]
        },
       fine_mana_potion: {
            name: "Зелье маны VI",
            icon: "images/icon_item_potion_mp02_5.png",
            outputQuantity: 3, 
            materials: [
                { id: 'liconsis', name: "Рико", quantity: 3, icon: "images/icon_item_herb05.png" }, 
				{ id: 'elemental_water', name: "Элитная стихийная вода", quantity: 3, icon: "images/icon_item_elementalwater01f.png" },
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" } 
				
            ]
        },
		fine_life_serum: {
            name: "Редкое зелье жизни VI",
            icon: "images/icon_item_potion_hp03_5.png",
            outputQuantity: 3, 
            materials: [
                { id: 'fresh_plia', name: "Свежая фолиата", quantity: 1, icon: "images/icon_item_herb02_r.png" }, 
				{ id: 'elemental_water', name: "Элитная стихийная вода", quantity: 3, icon: "images/icon_item_elementalwater01f.png" },
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" } 
				
            ]
        },
		fine_mana_serum: {
            name: "Редкое зелье маны VI",
            icon: "images/icon_item_potion_mp03_5.png",
            outputQuantity: 3, 
            materials: [
                { id: 'fresh_liconsis', name: "Свежий рико", quantity: 1, icon: "images/icon_item_herb05_r.png" }, 
				{ id: 'elemental_water', name: "Элитная стихийная вода", quantity: 3, icon: "images/icon_item_elementalwater01f.png" },
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" } 
				
            ]
        },
		fine_wind_serum: {
            name: "Редкое зелье ветра V",
            icon: "images/icon_item_potion_cure04d.png",
            outputQuantity: 3, 
            materials: [
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }, 
				{ id: 'elemental_water', name: "Элитная стихийная вода", quantity: 3, icon: "images/icon_item_elementalwater01f.png" },
				{ id: 'bottle', name: "Стеклянная бутылка", quantity: 3, icon: "images/icon_item_flask04.png" } 
				
            ]
        },
    }
};
const POWDERS_CRAFTING_DATA = { 
    types: {
        powders1: {
            name: "Алмазный порошок",
            icon: "images/icon_item_gempoder03.png",
            outputQuantity: 10,
            materials: [
                { id: 'diamond', name: "Неграненый алмаз", quantity: 1, icon: "images/icon_item_gemstone02e.png" }
            ]
        },
        powders2: {
            name: "Кельфаратовый порошок",
            icon: "images/icon_item_gempoder03.png",
            outputQuantity: 10, 
            materials: [
                { id: 'elatrite', name: "Неграненый кельфарат", quantity: 1, icon: "images/icon_item_gemstone02e.png" }
	       ]
        },
		powders3: {
            name: "Порошок из бирюзы",
            icon: "images/icon_item_gempoder01.png",
            outputQuantity: 10, 
            materials: [
                { id: 'turquoise', name: "Неграненая бирюза", quantity: 1, icon: "images/icon_item_gemstone02b.png" }		
            ]
        },
		powders4: {
            name: "Рубиновый порошок",
            icon: "images/icon_item_gempoder02.png",
            outputQuantity: 10, 
            materials: [
                { id: 'ruby', name: "Неграненый рубин", quantity: 1, icon: "images/icon_item_gemstone02c.png" }
            ]
        },
       powders5: {
            name: "Сапфировый порошок",
            icon: "images/icon_item_gempoder01.png",
            outputQuantity: 10, 
            materials: [
                { id: 'sapphire', name: "Неграненый сапфир", quantity: 1, icon: "images/icon_item_gemstone02b.png" },
            ]
        },
		powders6: {
            name: "Турмалиновый порошок",
            icon: "images/icon_item_gempoder02.png",
            outputQuantity: 10, 
            materials: [
                { id: 'corundum', name: "Неграненый турмалин", quantity: 1, icon: "images/icon_item_gemstone02c.png" },
            ]
        },
		powders7: {
            name: "Сильный стихийный порошок",
            icon: "images/icon_item_dust01e.png",
            outputQuantity: 2, 
            materials: [
                { id: 'greater_elemental_stone', name: "Сильный стихийный камень", quantity: 1, icon: "images/icon_item_elementalstone02c.png" },
            ]
        },
		powders8: {
            name: "Элитный стихийный порошок",
            icon: "images/icon_item_dust01f.png",
            outputQuantity: 2, 
            materials: [
                { id: 'fine_elemental_stone', name: "Элитный стихийный камень", quantity: 1, icon: "images/icon_item_elementalstone02e.png" },
            ]
        },
		water9: {
            name: "Элитная стихийная вода",
            icon: "images/icon_item_elementalwater01f.png",
            outputQuantity: 5, 
            materials: [
                { id: 'fine_elemental_stone', name: "Элитный стихийный камень", quantity: 1, icon: "images/icon_item_elementalstone02e.png" },
				
            ]
        },
    }
};

const FOOD_CRAFTING_DATA = { 
    types: {
        food: {
            name: "Полезные пельмени с тифабом",
            icon: "images/icon_item_dish25.png",
            outputQuantity: 2, 
            materials: [
                { id: 'poma', name: "Тифаб", quantity: 1, icon: "images/icon_item_seefood02.png" },
				{ id: 'jurak', name: "Джирака", quantity: 1, icon: "images/icon_item_vegetable09.png" },
				{ id: 'fresh_liconsis', name: "Свежий рико", quantity: 1, icon: "images/icon_item_herb05_r.png" },
				{ id: 'wine', name: "Киршевое вино", quantity: 4, icon: "images/icon_item_bottle02.png" },
				{ id: 'salt', name: "Морская соль", quantity: 8, icon: "images/icon_item_powder02.png" },
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
            ]
        },
        food1: {
            name: "Полезный жареный тифаб",
            icon: "images/icon_item_dish30.png",
            outputQuantity: 2, 
            materials: [
                { id: 'poma', name: "Тифаб", quantity: 1, icon: "images/icon_item_seefood02.png" },
				{ id: 'ralloc', name: "Рабено", quantity: 1, icon: "images/icon_item_vegetable08.png" },
				{ id: 'fresh_liconsis', name: "Свежий рико", quantity: 1, icon: "images/icon_item_herb05_r.png" },
				{ id: 'spice', name: "Острые специи", quantity: 8, icon: "images/icon_item_dust01c.png" },
				{ id: 'essenceice', name: "Соевый соус", quantity: 8, icon: "images/icon_item_ink01a.png" },
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
            ]
        },
		food2: {
            name: "Полезные суши с налимом",
            icon: "images/icon_item_dish10.png",
            outputQuantity: 2, 
            materials: [
                { id: 'nokara', name: "Налим", quantity: 1, icon: "images/icon_item_fish05.png" },
				{ id: 'stria', name: "Сибас", quantity: 1, icon: "images/icon_item_fish04.png" },
				{ id: 'fresh_plia', name: "Свежая фолиата", quantity: 1, icon: "images/icon_item_herb02_r.png" },
				{ id: 'vinegar', name: "Рейдамовый уксус", quantity: 8, icon: "images/icon_item_bottle01.png" },
				{ id: 'essenceice', name: "Соевый соус", quantity: 8, icon: "images/icon_item_ink01a.png" },
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
            ]
        },
		food3: {
            name: "Салат императора ужасных драконов",
            icon: "images/icon_item_dish20.png",
            outputQuantity: 2, 
            materials: [
                { id: 'meat', name: "Блестящее мясо балаура", quantity: 1, icon: "images/icon_item_meat03.png" },
				{ id: 'plia', name: "Фолиата", quantity: 1, icon: "images/icon_item_herb02.png" }, 
				{ id: 'fresh_liconsis', name: "Свежий рико", quantity: 1, icon: "images/icon_item_herb05_r.png" },
				{ id: 'vinegar', name: "Рейдамовый уксус", quantity: 12, icon: "images/icon_item_bottle01.png" },
				{ id: 'egg', name: "Яйцо коко", quantity: 16, icon: "images/icon_item_egg01.png" },
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
            ]
        },
		food4: {
            name: "Мясо императора ужасных драконов в кляре",
            icon: "images/icon_item_dish11.png",
            outputQuantity: 2, 
            materials: [
                { id: 'meat', name: "Блестящее мясо балаура", quantity: 1, icon: "images/icon_item_meat03.png" },
				{ id: 'ralloc', name: "Рабено", quantity: 1, icon: "images/icon_item_vegetable08.png" },
				{ id: 'fresh_plia', name: "Свежая фолиата", quantity: 1, icon: "images/icon_item_herb02_r.png" },
				{ id: 'briga_powder', name: "Тыквенная мука", quantity: 8, icon: "images/icon_item_flour01.png" },
				{ id: 'salt', name: "Морская соль", quantity: 8, icon: "images/icon_item_powder02.png" },
                { id: 'powder', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
            ]
        },
		jelly: {
            name: "Эфирное желе с кано",
            icon: "images/icon_item_jelly01.png",
            outputQuantity: 2, 
            materials: [
                { id: 'catalyst', name: "Эфир", quantity: 1, icon: "images/icon_item_od01.png" },
				{ id: 'cippo', name: "Кано", quantity: 1, icon: "images/icon_item_vegetable04.png" },
				{ id: 'sugar', name: "Белый сахар", quantity: 15, icon: "images/icon_item_powder02.png" }
            ]
        },
		cocktail: {
            name: "Коктейль из серина",
            icon: "images/icon_item_drink01.png",
            outputQuantity: 2, 
            materials: [
                { id: 'drupa', name: "Серин", quantity: 1, icon: "images/icon_item_fruit07.png" },
				{ id: 'manzu', name: "Мензе", quantity: 1, icon: "images/icon_item_fruit02.png" },
				{ id: 'brandy', name: "Бренди", quantity: 6, icon: "images/icon_item_bottle03.png" },
				{ id: 'cream', name: "Свежие сливки", quantity: 6, icon: "images/icon_item_sac01.png" }
            ]
        },
		cocktail2: {
            name: "Сок чико",
            icon: "images/icon_item_drink_hpmp02.png",
            outputQuantity: 2, 
            materials: [
                { id: 'leaf', name: "Ядовитый лист Каспара", quantity: 6, icon: "images/icon_item_leaf02.png" },
				{ id: 'kuvano', name: "Чико", quantity: 1, icon: "images/icon_item_fruit08.png" },
				{ id: 'oil', name: "Масло из чико", quantity: 1, icon: "images/icon_item_ink01a.png" }
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

    formatNumber(number) {
        return number.toLocaleString('ua-UA');
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
    let value = parseInt(this.quantity.value) || 1;
    value = Math.min(Math.max(value, 1), 99999);
    this.quantity.value = value;
    this.updateCalculator();
}
    updateCalculator() {
        const type = this.type.value;
        const quantity = parseInt(this.quantity.value.replace(/\s+/g, '')) || 1;
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
        quantityCell.textContent = this.formatNumber(material.quantity * quantity);

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        return row;
    }

    resetCalculator() {
        this.quantity.value = '1';
        this.type.selectedIndex = 0;
        this.updateCalculator();
    }
}

const calculatorConfigs = {
    scroll: {
        typeId: 'scroll-type',
        quantityId: 'quantity-scroll',
        iconSelector: '#scroll-icon-container img',
        materialsListId: 'materials-list-scroll',
        outputListId: 'output-list-scroll',
        resetButtonId: 'reset-scroll',
        craftingData: SCROLL_CRAFTING_DATA
    },
    potion: {
        typeId: 'potion-type',
        quantityId: 'quantity-potion',
        iconSelector: '#potion-icon-container img',
        materialsListId: 'materials-list-potion',
        outputListId: 'output-list-potion',
        resetButtonId: 'reset-potion',
        craftingData: POTION_CRAFTING_DATA
    },
	 powders: {
        typeId: 'powders-type',
        quantityId: 'quantity-powders',
        iconSelector: '#powders-icon-container img',
        materialsListId: 'materials-list-powders',
        outputListId: 'output-list-powders',
        resetButtonId: 'reset-powders',
        craftingData: POWDERS_CRAFTING_DATA
    },
    food: {
        typeId: 'food-type',
        quantityId: 'quantity-food',
        iconSelector: '#food-icon-container img',
        materialsListId: 'materials-list-food',
        outputListId: 'output-list-food',
        resetButtonId: 'reset-food',
        craftingData: FOOD_CRAFTING_DATA
    }
};

document.querySelector('.back-button').addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', () => {
    const calculators = {
        scroll: new BaseCalculator(calculatorConfigs.scroll),
        potion: new BaseCalculator(calculatorConfigs.potion),
		powders: new BaseCalculator(calculatorConfigs.powders),
        food: new BaseCalculator(calculatorConfigs.food)
    };
});
