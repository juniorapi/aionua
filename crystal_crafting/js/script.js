const ITEM_DESCRIPTIONS = {
    
    "red": "Кравецька справа",
    "white": "Збройова справа",
    "yellow": "Ювелірна справа",
    "green": "Ковальська справа",
    "blue": "Алхімія",
    "idium": "Кулінарія",

    
    "rod": "Збройова справа",
    "rod2": "Збройова справа",
    "bar": "Ювелірна справа",
    "bar2": "Ювелірна справа",

    
    "godstone": "Ковальська справа",
    "godstone2": "Ковальська справа",
    "godstone3": "Ковальська справа",
    "godstone4": "Ковальська справа",
    "godstone5": "Кравецька справа",
    "godstone6": "Кравецька справа",
    "godstone7": "Кравецька справа",
    "godstone8": "Кравецька справа"
};

const CRAFTING_DATA = { 
    types: {
        red: {
            name: "Давній червоний кристал",
            icon: "images/icon_item_ta_combineskill_ws_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок іделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Давній ефір III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
        },
        white: {
            name: "Давній білий кристал",
            icon: "images/icon_item_ws_combineskill_ar_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок іделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Давній ефір III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
        },
        yellow: {
            name: "Древній жовтий кристал",
            icon: "images/icon_item_ha_combineskill_ta_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок іделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Давній ефір III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
        },
        green: {
            name: "Давній зелений кристал",
            icon: "images/icon_item_as_combineskill_ha_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок іделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Давній ефір III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]
		},
        blue: {
            name: "Давній синій кристал",
            icon: "images/icon_item_al_combineskill_as_r_60a.png",
            outputQuantity: 5,
            materials: [
                { id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 40, icon: "images/icon_item_testtube01.png" },
                { id: 'shard', name: "Осколок іделла", quantity: 20, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Давній ефір III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" }
            ]	
        },
        idium: {
            name: "Ідіумовий кристал часу",
            icon: "images/icon_item_co_combineskill_all_r_60a.png",
            outputQuantity: 10,
            materials: [
                { id: 'powder', name: "Порошок часу", quantity: 10, icon: "images/icon_item_co_shopmaterial_c_60a.png" },
                { id: 'shard', name: "Осколок іделла", quantity: 10, icon: "images/icon_item_v5_n_cs_shopmaterial_c_60a.png" },
                { id: 'ether', name: "Давній ефір", quantity: 10, icon: "images/icon_item_od_all_c_60a.png" },
                { id: 'clemposil', name: "Клемпосиль", quantity: 10, icon: "images/icon_item_co_combineskill_material_r_60a.png" }
            ]
        }
    }
};

const ITEM_CRAFTING_DATA = { 
    types: {
        rod: {
            name: "Гнучкий оброблений стержень",
            icon: "images/icon_item_ws_we_long_parts_n_e_60a.png",
            outputQuantity: 1,
            materials: [
                { id: 'rod', name: "Каталієвий стержень", quantity: 20, icon: "images/icon_item_ws_we_parts_n_r_60a.png" },
				{ id: 'whetstone', name: "Священний точильний камінь", quantity: 45, icon: "images/icon_item_ws_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Давній ефір III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священний камінь зброї IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'catalium', name: "Добрий каталіум", quantity: 29, icon: "images/icon_item_metal_l_60a.png" }, 
                { id: 'crystal', name: "Давній червоний кристал", quantity: 16, icon: "images/icon_item_ta_combineskill_ws_r_60a.png" }
            ]
        },
        rod2: {
            name: "Оброблений каталіумовий стержень",
            icon: "images/icon_item_ws_we_long_parts_n_e_65a.png",
            outputQuantity: 1, 
            materials: [
                { id: 'expertweapon', name: "Сяюча зброя досвідченого експерта", quantity: 1, icon: "images/weapon.png" }, 
				{ id: 'whetstone', name: "Священний точильний камінь", quantity: 45, icon: "images/icon_item_ws_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Давній ефір III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священний камінь зброї IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'catalium', name: "Добрий каталіум", quantity: 29, icon: "images/icon_item_metal_l_60a.png" }, 
                { id: 'crystal', name: "Давній червоний кристал", quantity: 16, icon: "images/icon_item_ta_combineskill_ws_r_60a.png" }
            ]
        },
		bar: {
            name: "Гнучкий оброблений брус",
            icon: "images/icon_item_ha_we_long_parts_n_e_60a.png",
            outputQuantity: 1, 
            materials: [
                { id: 'pakirabar', name: "Пахировий брус", quantity: 20, icon: "images/icon_item_ha_we_parts_n_r_60a.png" }, 
				{ id: 'solysandpaper', name: "Священна наждачна папір", quantity: 45, icon: "images/icon_item_ha_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Давній ефір III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священний камінь зброї IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'pakirawood', name: "Добра пахіра", quantity: 29, icon: "images/icon_item_tree_l_60a.png" }, 
                { id: 'greencrystal', name: "Давній зелений кристал", quantity: 16, icon: "images/icon_item_as_combineskill_ha_r_60a.png" }
            ]
        },
		bar2: {
            name: "Оброблений каталіумовий брус",
            icon: "images/icon_item_ha_we_long_parts_n_e_65a.png",
            outputQuantity: 1, 
            materials: [
                { id: 'staff', name: "Сяючий каталіумовий посох досвідченого експерта", quantity: 1, icon: "images/weapon2.png" }, 
				{ id: 'solysandpaper', name: "Священна наждачна папір", quantity: 45, icon: "images/icon_item_ha_shopcmaterial_c_60a.png" },
				{ id: 'aether', name: "Давній ефір III", quantity: 14, icon: "images/icon_item_od_all_l_60a.png" }, 
				{ id: 'flux', name: "Священний камінь зброї IV", quantity: 14, icon: "images/icon_item_crystalball01c_l.png" }, 
				{ id: 'pakirawood', name: "Добра пахіра", quantity: 29, icon: "images/icon_item_tree_l_60a.png" }, 
                { id: 'greencrystal', name: "Давній зелений кристал", quantity: 16, icon: "images/icon_item_as_combineskill_ha_r_60a.png" }
            ]
        },
       
    }
};
const RESOURCE_CRAFTING_DATA = { 
    types: {
        godstone: {
            name: "Контратака експерта (10%)",
            icon: "images/icon_item_holystone_unique_fire_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія льоду", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія помсти", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Давній синій кристал", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
        godstone2: {
            name: "Справедливість експерта (10%)",
            icon: "images/icon_item_holystone_unique_earth_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія льоду", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія помсти", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Давній синій кристал", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
		godstone3: {
            name: "Егоїзм експерта (10%)",
            icon: "images/icon_item_holystone_unique_water_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія льоду", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія помсти", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Давній синій кристал", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
		godstone4: {
            name: "Відгукливість експерта (10%)",
            icon: "images/icon_item_holystone_unique_air_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія льоду", quantity: 11, icon: "images/icon_item_ldf5a_e_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія помсти", quantity: 11, icon: "images/icon_item_ldf5under_a_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Давній синій кристал", quantity: 2, icon: "images/icon_item_al_combineskill_as_r_60a.png" }
            ]
        },
		godstone5: {
            name: "Ярість експерта (1%)",
            icon: "images/icon_item_holystone_unique_fire_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія відчаю", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древній жовтий кристал", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
		godstone6: {
            name: "Жаль експерта (1%)",
            icon: "images/icon_item_holystone_unique_water_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія відчаю", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древній жовтий кристал", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
		godstone7: {
            name: "Розум експерта (1%)",
            icon: "images/icon_item_holystone_unique_earth_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія відчаю", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древній жовтий кристал", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
		godstone8: {
            name: "Клятва експерта (1%)",
            icon: "images/icon_item_holystone_unique_air_demage.png",
            outputQuantity: 1, 
            materials: [
                { id: 'idium', name: "Ідіумовий кристал часу", quantity: 20, icon: "images/icon_item_co_combineskill_all_r_60a.png" },
				{ id: 'catalyst', name: "Каталізатор давнього перетворення", quantity: 83, icon: "images/icon_item_testtube01.png" },
				{ id: 'ceraniumfragment', name: "Частинка серамиума", quantity: 10, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" },
				{ id: 'ancientfragment', name: "Давній уламок", quantity: 10, icon: "images/icon_item_ldf5under_all_material_u_60a.png" },
				{ id: 'essenceice', name: "Енергія долин", quantity: 11, icon: "images/icon_item_ldf5b_f_material_60_r_60a.png" },
                { id: 'essencerevenge', name: " Енергія відчаю", quantity: 11, icon: "images/icon_item_ldf5under_b_material_60_r_60a.png" },
				{ id: 'bluecrystal', name: "Древній жовтий кристал", quantity: 2, icon: "images/icon_item_ha_combineskill_ta_r_60a.png" }
            ]
        },
        
    }
};

function showCraftingResultTooltip(event, typeId) {
    const description = ITEM_DESCRIPTIONS[typeId] || "Немає опису для цього предмета";
   
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
  
    let itemName = "";

    if (CRAFTING_DATA.types[typeId]) {
        itemName = CRAFTING_DATA.types[typeId].name;
    } else if (ITEM_CRAFTING_DATA.types[typeId]) {
        itemName = ITEM_CRAFTING_DATA.types[typeId].name;
    } else if (RESOURCE_CRAFTING_DATA.types[typeId]) {
        itemName = RESOURCE_CRAFTING_DATA.types[typeId].name;
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
        { tableId: 'output-list', typeId: 'crystal-type' },
        { tableId: 'output-list-item', typeId: 'item-type' },
        { tableId: 'output-list-resource', typeId: 'resource-type' }
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


document.addEventListener('DOMContentLoaded', () => {
    const calculators = {
        crystal: new BaseCalculator(calculatorConfigs.crystal),
        item: new BaseCalculator(calculatorConfigs.item),
        resource: new BaseCalculator(calculatorConfigs.resource)
    };
    
    
    setupCraftingResultTooltips();
    
    
    const originalUpdateCalculator = BaseCalculator.prototype.updateCalculator;
    
    BaseCalculator.prototype.updateCalculator = function() {
        originalUpdateCalculator.call(this);
        setupCraftingResultTooltips();
    };
});
