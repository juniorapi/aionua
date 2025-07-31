const ITEM_DESCRIPTIONS = {
    "courage": "Швидк. атаки +9%. Час дії: 5хв. Не можна використовувати разом зі сувоєм переродження.",
    "courage2": "Швидк. атаки +9%. Час дії: 5хв. Не можна використовувати разом зі сувоєм переродження.",
    "rebirth": "Швидк. магії +9%. Час дії: 5хв. Не можна використовувати разом зі сувоєм відваги.",
    "rebirth2": "Швидк. магії +9%. Час дії: 5хв. Не можна використовувати разом зі сувоєм відваги.",
    "acceleration": "Швидк. руху +30%. Час дії: 5хв.",
    "acceleration2": "Швидк. руху +30%. Час дії: 5хв.",
	"wind": "Швидк. польоту +30%. Час дії: 5хв.",
	"wind2": "Швидк. польоту +30%. Час дії: 5хв.",
	"critical": "Ф. крит. +120/М. крит. +40. Час дії: 5 хв. Неможливо використовувати разом зі свитком критичного удару іншого типу.",
	"regist_wind": "Захист від повітря +100. Час дії: 10хв.",
	"regist_water": "Захист від води +100. Час дії: 10хв.",
	"regist_fire": "Захист від вогню +100. Час дії: 10хв.",
	"regist_earth": "Захист від землі +100. Час дії: 10хв.",

    "cure": "Знімає негативні ефекти.",
    "recovery_potion": "Відновлює по 212 HP і 183 MP кожні 2с. Час дії: 20с.",
    "recovery_serum": "Відновлює 1940 HP і 1680 MP.",
    "fine_life_potion": "Відновлює по 212 HP кожні 2с. Час дії: 20с.",
	"fine_mana_potion": "Відновлює по 183 MP кожні 2с. Час дії: 20с.",
	"fine_life_serum": "Відновлює 1940 HP.",
	"fine_mana_serum": "Відновлює 1680 MP.",
	"fine_wind_serum": "Збільшує час польоту на 60 сек.",
   
    "food": "Ф. крит. +60. Точність +60. Ухилення +30. Час польоту +15 сек. Час дії: 30хв.",
    "food1": "Фізична атака +12. Точн. магії +60. HP +240. Час польоту +15 сек. Час дії: 30 хв.",
    "food2": "Сила магії +60. Точн. магії +60. HP +240. Час польоту +15 сек. Час дії: 30 хв.",
	"food3": "Ухилення +30. Захист від стихій +60. Маг. захист +60. Час польоту +15 сек. Час дії: 30 хв.",
    "food4": "HP +240. Захист від стихій +60. MP +240. Час польоту +15 сек. Час дії: 30 хв.",
    "jelly": "Відновлює 4000 DP.",
    "cocktail": "Швидкість відновл. HP +12. Швидкість відновл. MP +18. Час дії: 30 хв.",
    "cocktail2": "Швидкість відновл. HP +14. Швидкість відновл. MP +21. Час дії: 30м. Через отруту Каспара може заболіти живіт, але ймовірність отруєння дуже мала.",
   
    "powders1": "Порошок, отриманий з необробленого алмаза.",
	"powders2": "Порошок, отриманий з необробленого кельфарату.",
	"powders3": "Порошок, отриманий з необробленої бірюзи.",
	"powders4": "Порошок, отриманий з необробленого рубіна.",
	"powders5": "Порошок, отриманий з необробленого сапфіра.",
	"powders6": "Порошок, отриманий з необробленого турмаліну.",
	"powders7": "Порошок, який отримують з сильного стихійного каменю.",
	"powders8": "Порошок, який отримують з елітного стихійного каменю.",
	"water9": "Магічна вода з елітного стихійного каменю.",
	
};
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
            name: "Свиток яростного ветра III",
            icon: "images/icon_item_scroll_speed_fly_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Эфир", quantity: 1, icon: "images/icon_item_od01.png" },
                { id: 'shard', name: "Сапфировый порошок", quantity: 5, icon: "images/icon_item_gempoder01.png" },
                { id: 'ether', name: "Асватовая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
	    wind2: {
            name: "Свиток яростного ветра III",
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
        },
		
	    regist_wind: {
            name: "Свиток воздуха V",
            icon: "images/icon_item_scroll_regist_wind_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'shard', name: "Кельфаратовый порошок", quantity: 5, icon: "images/icon_item_gempoder03.png" },
                { id: 'elemental_water', name: "Элитная стихийная вода", quantity: 5, icon: "images/icon_item_elementalwater01f.png" },
                { id: 'clemposil', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
		
	   regist_water: {
            name: "Свиток воды V",
            icon: "images/icon_item_scroll_regist_water_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'shard', name: "Порошок из бирюзы", quantity: 5, icon: "images/icon_item_gempoder01.png" },
                { id: 'elemental_water', name: "Элитная стихийная вода", quantity: 5, icon: "images/icon_item_elementalwater01f.png" },
                { id: 'clemposil', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
		
	    regist_fire: {
            name: "Свиток огня V",
            icon: "images/icon_item_scroll_regist_fire_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'shard', name: "Турмалиновый порошок", quantity: 5, icon: "images/icon_item_gempoder02.png" },
                { id: 'elemental_water', name: "Элитная стихийная вода", quantity: 5, icon: "images/icon_item_elementalwater01f.png" },
                { id: 'clemposil', name: "Макиновая бумага", quantity: 5, icon: "images/icon_item_paper01.png" }
            ]	
        },
        regist_earth: {
            name: "Свиток земли V",
            icon: "images/icon_item_scroll_regist_earth_01.png",
            outputQuantity: 5,
            materials: [
                { id: 'shard', name: "Элитный стихийный порошок", quantity: 5, icon: "images/icon_item_dust01f.png" },
                { id: 'elemental_water', name: "Элитная стихийная вода", quantity: 5, icon: "images/icon_item_elementalwater01f.png" },
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
		 convert1: {
            name: "Аир",
            icon: "images/icon_item_herb09.png",
            outputQuantity: 3,
            materials: [
                { id: 'material1', name: "Осколок эфира", quantity: 1, icon: "images/icon_item_od02.png" }
            ]
        },
		convert2: {
            name: "Джирака",
            icon: "images/icon_item_vegetable09.png",
            outputQuantity: 3,
            materials: [
                { id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
            ]
        },
		convert3: {
			name: "Кано",
			icon: "images/icon_item_vegetable04.png",
			outputQuantity: 3,
			materials: [
				{ id: 'material1', name: "Эфир", quantity: 1, icon: "images/icon_item_od01.png" }
			]
		},
		convert4: {
			name: "Люпин",
			icon: "images/icon_item_herb07.png",
			outputQuantity: 3,
			materials: [
				{ id: 'material1', name: "Осколок эфира", quantity: 1, icon: "images/icon_item_od02.png" }
			]
		},
		
		convert5: {
			name: "Мензе",
			icon: "images/icon_item_fruit02.png",
			outputQuantity: 3,
			materials: [
				{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
			]
		},
		convert6: {
		name: "Налим",
		icon: "images/icon_item_fish05.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
		]
	},
	convert7: {
		name: "Огромный неграненый кельфарат",
		icon: "images/icon_item_gemstone01e.png",
		outputQuantity: 1,
		materials: [
			{ id: 'material1', name: "Очищенный магический эфир", quantity: 2, icon: "images/icon_item_od05_r.png" }
		]
	},
	convert8: {
		name: "Огромный неграненый турмалин",
		icon: "images/icon_item_gemstone01c.png",
		outputQuantity: 1,
		materials: [
			{ id: 'material1', name: "Очищенный магический эфир", quantity: 2, icon: "images/icon_item_od05_r.png" }
		]
	},
	convert9: {
		name: "Рабено",
		icon: "images/icon_item_vegetable08.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
		]
	},
	convert10: {
		name: "Рико",
		icon: "images/icon_item_herb05.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
		]
	},
	convert11: {
		name: "Свежая фолиата",
		icon: "images/icon_item_herb02_r.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Очищенный магический эфир", quantity: 1, icon: "images/icon_item_od05_r.png" }
		]
	},
	convert12: {
		name: "Свежий рико",
		icon: "images/icon_item_herb05_r.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Очищенный магический эфир", quantity: 1, icon: "images/icon_item_od05_r.png" }
		]
	},
	convert13: {
		name: "Сибас",
		icon: "images/icon_item_fish04.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
		]
	},
	convert14: {
		name: "Сильный стихийный камень",
		icon: "images/icon_item_elementalstone02c.png",
		outputQuantity: 2,
		materials: [
			{ id: 'material1', name: "Осколок эфира", quantity: 1, icon: "images/icon_item_od02.png" }
		]
	},
	convert15: {
		name: "Тифаб",
		icon: "images/icon_item_seefood02.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
		]
	},
	convert16: {
		name: "Фолиата",
		icon: "images/icon_item_herb02.png",
		outputQuantity: 3,
		materials: [
			{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
		]
	},
	convert17: {
		name: "Элитный стихийный камень",
		icon: "images/icon_item_elementalstone02e.png",
		outputQuantity: 2,
		materials: [
			{ id: 'material1', name: "Магический эфир", quantity: 1, icon: "images/icon_item_od05.png" }
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



function showCraftingResultTooltip(event, typeId) {
   
    const description = ITEM_DESCRIPTIONS[typeId] || "Немає опису для цього предмета";
   
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
  
    let itemName = "";

    if (SCROLL_CRAFTING_DATA.types[typeId]) {
        itemName = SCROLL_CRAFTING_DATA.types[typeId].name;
    } else if (POTION_CRAFTING_DATA.types[typeId]) {
        itemName = POTION_CRAFTING_DATA.types[typeId].name;
    } else if (POWDERS_CRAFTING_DATA.types[typeId]) {
        itemName = POWDERS_CRAFTING_DATA.types[typeId].name;
	} else if (FOOD_CRAFTING_DATA.types[typeId]) {
        itemName = FOOD_CRAFTING_DATA.types[typeId].name;
    }
  
    tooltip.innerHTML = `
        <div style="font-weight: bold; color: #ffd700; margin-bottom: 6px;">${itemName}</div>
        <div>${description}</div>
    `;
  
    tooltip.style.backgroundColor = "#2a2a3e";
    tooltip.style.border = "1px solid #4a4a5e";
    tooltip.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
    tooltip.style.padding = "10px 12px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "0.85rem";
    tooltip.style.color = "#f0f0f0";
    tooltip.style.maxWidth = "300px";
    tooltip.style.zIndex = "1000";
    tooltip.style.position = "fixed";
  
    tooltip.style.top = (event.clientY + 15) + "px";
    tooltip.style.left = (event.clientX + 15) + "px";
 
    document.body.appendChild(tooltip);
 
    event.currentTarget.tooltip = tooltip;

    event.currentTarget.addEventListener('mousemove', updateTooltipPosition);
}

function updateTooltipPosition(event) {
    if (event.currentTarget.tooltip) {
        event.currentTarget.tooltip.style.top = (event.clientY + 15) + "px";
        event.currentTarget.tooltip.style.left = (event.clientX + 15) + "px";

        const tooltipRect = event.currentTarget.tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (tooltipRect.right > viewportWidth) {
            event.currentTarget.tooltip.style.left = (viewportWidth - tooltipRect.width - 10) + "px";
        }
        
        if (tooltipRect.bottom > viewportHeight) {
            event.currentTarget.tooltip.style.top = (viewportHeight - tooltipRect.height - 10) + "px";
        }
    }
}

function hideCraftingResultTooltip(event) {
    if (event.currentTarget.tooltip) {

        event.currentTarget.removeEventListener('mousemove', updateTooltipPosition);

        event.currentTarget.tooltip.remove();
        event.currentTarget.tooltip = null;
    }
}

function setupCraftingResultTooltips() {

    const outputTables = [
        { tableId: 'output-list-scroll', typeId: 'scroll-type' },
        { tableId: 'output-list-potion', typeId: 'potion-type' },
        { tableId: 'output-list-food', typeId: 'food-type' },
		{ tableId: 'output-list-powders', typeId: 'powders-type' }
    ];

    outputTables.forEach(({ tableId, typeId }) => {
        const table = document.getElementById(tableId);
        const typeSelect = document.getElementById(typeId);
        
        if (table && typeSelect) {
         
            const observer = new MutationObserver(() => {
      
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
               
                    if (!row.hasResultTooltipListeners) {
                        row.hasResultTooltipListeners = true;
            
                        row.addEventListener('mouseenter', (e) => {
                            showCraftingResultTooltip(e, typeSelect.value);
                        });
                 
                        row.addEventListener('mouseleave', hideCraftingResultTooltip);
                   
                        row.style.cursor = 'help';
                        row.style.transition = 'background-color 0.2s ease';
               
                        row.addEventListener('mouseenter', () => {
                            row.style.backgroundColor = '#4D4D5F';
                        });
                        
                        row.addEventListener('mouseleave', () => {
                            row.style.backgroundColor = '';
                        });
                    }
                });
            });
   
            observer.observe(table, { childList: true, subtree: true });
 
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                if (!row.hasResultTooltipListeners) {
                    row.hasResultTooltipListeners = true;
                    
                    row.addEventListener('mouseenter', (e) => {
                        showCraftingResultTooltip(e, typeSelect.value);
                    });
                    
                    row.addEventListener('mouseleave', hideCraftingResultTooltip);
                    
                    row.style.cursor = 'help';
                    row.style.transition = 'background-color 0.2s ease';
                    
                    row.addEventListener('mouseenter', () => {
                        row.style.backgroundColor = '#4D4D5F';
                    });
                    
                    row.addEventListener('mouseleave', () => {
                        row.style.backgroundColor = '';
                    });
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    setupCraftingResultTooltips();

    const originalUpdateCalculator = BaseCalculator.prototype.updateCalculator;
    
    BaseCalculator.prototype.updateCalculator = function() {
        originalUpdateCalculator.call(this);
  
        setupCraftingResultTooltips();
    };
});

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
        function calculateTotal() {
            const ether1 = parseInt(document.getElementById('ether1').value) || 0;
            const ether2 = parseInt(document.getElementById('ether2').value) || 0;
            const ether3 = parseInt(document.getElementById('ether3').value) || 0;
            const ether4 = parseInt(document.getElementById('ether4').value) || 0;

            
            const result1 = ether1 * 27;
            const result2 = ether2 * 9;
            const result3 = ether3 * 3;
            const result4 = ether4 * 1;

            
            document.getElementById('result1').textContent = result1.toLocaleString('ua-UA');
            document.getElementById('result2').textContent = result2.toLocaleString('ua-UA');
            document.getElementById('result3').textContent = result3.toLocaleString('ua-UA');
            document.getElementById('result4').textContent = result4.toLocaleString('ua-UA');

           
            const total = result1 + result2 + result3 + result4;
            document.getElementById('totalResult').textContent = total.toLocaleString('ua-UA');
        }

        function resetCalculator() {
            document.getElementById('ether1').value = '0';
            document.getElementById('ether2').value = '0';
            document.getElementById('ether3').value = '0';
            document.getElementById('ether4').value = '0';
            calculateTotal();
        }

        
        document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('input[type="number"]');
            
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    let value = parseInt(this.value) || 0;
                    value = Math.min(Math.max(value, 0), 9999);
                    this.value = value;
                    calculateTotal();
                });

                input.addEventListener('focus', function() {
                    if (this.value === '0') {
                        this.value = '';
                    }
                });

                input.addEventListener('blur', function() {
                    if (this.value === '') {
                        this.value = '0';
                        calculateTotal();
                    }
                });
            });

            
            calculateTotal();
        });
