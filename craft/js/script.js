const ITEM_DESCRIPTIONS = {
    "ring": "",
 
};
const JEWELRY_CRAFTING_DATA = { 
    types: {
        ring: {
            name: "Дарритовое кольцо специалиста",
            icon: "images/icon_item_ring_m01.png",
            outputQuantity: 1,
            materials: [
                { id: 'flux2', name: "Священный камень украшений II", quantity: 9, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 9, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 5, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 9, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 9, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 5, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'darite', name: "Обычный даррит", quantity: 3, icon: "images/icon_item_jewelry_r_60s.png" },
				{ id: 'darite2', name: "Хороший даррит", quantity: 2, icon: "images/icon_item_jewelry_l_60s.png" },
				{ id: 'ceranium', name: "Обычный серамиум", quantity: 12, icon: "images/icon_item_noblemetal_r_60a.png" },
				{ id: 'ceranium2', name: "Хороший серамиум", quantity: 6, icon: "images/icon_item_noblemetal_l_60a.png" },
				{ id: 'knife', name: "Священный нож ручной работы", quantity: 39, icon: "images/icon_item_ha_shopcmaterial_c_60b.png" },
				{ id: 'crystal', name: "Древний блестящий кристалл", quantity: 8, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 4, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'jewellery', name: "Дарритовое украшение", quantity: 1, icon: "images/icon_item_ha_ac_parts_n_r_60s.png" },
				{ id: 'waterfragment', name: "Частица воды", quantity: 1, icon: "images/icon_item_ac_material_id_s_n_e_60a.png" }
            ]
        },
        ring2: {
            name: "Опаловое кольцо специалиста",
            icon: "images/icon_item_ring_m01.png",
            outputQuantity: 1,
            materials: [
                { id: 'flux2', name: "Священный камень украшений II", quantity: 9, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 9, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 5, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 9, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 9, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 5, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'opal', name: "Обычный опал", quantity: 3, icon: "images/icon_item_jewelry_r_60a.png" },
				{ id: 'opal2', name: "Хороший опал", quantity: 2, icon: "images/icon_item_jewelry_l_60a.png" },
				{ id: 'ceranium', name: "Обычный серамиум", quantity: 12, icon: "images/icon_item_noblemetal_r_60a.png" },
				{ id: 'ceranium2', name: "Хороший серамиум", quantity: 6, icon: "images/icon_item_noblemetal_l_60a.png" },
				{ id: 'knife', name: "Священный нож ручной работы", quantity: 39, icon: "images/icon_item_ha_shopcmaterial_c_60b.png" },
				{ id: 'crystal', name: "Древний блестящий кристалл", quantity: 8, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 4, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'jewellery', name: "Опаловое украшение", quantity: 1, icon: "images/icon_item_ha_ac_parts_n_r_60a.png" },
				{ id: 'waterfragment', name: "Частица воды", quantity: 1, icon: "images/icon_item_ac_material_id_s_n_e_60a.png" }
            ]
        },
        earring: {
            name: "Дарритовая серьга специалиста",
            icon: "images/icon_item_earring_m01.png",
            outputQuantity: 1,
            materials: [
			    { id: 'flux2', name: "Священный камень украшений II", quantity: 13, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 13, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 7, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 13, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 13, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 7, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'darite', name: "Обычный даррит", quantity: 5, icon: "images/icon_item_jewelry_r_60s.png" },
				{ id: 'darite2', name: "Хороший даррит", quantity: 3, icon: "images/icon_item_jewelry_l_60s.png" },
				{ id: 'ceranium', name: "Обычный серамиум", quantity: 15, icon: "images/icon_item_noblemetal_r_60a.png" },
				{ id: 'ceranium2', name: "Хороший серамиум", quantity: 8, icon: "images/icon_item_noblemetal_l_60a.png" },
				{ id: 'knife', name: "Священный нож ручной работы", quantity: 61, icon: "images/icon_item_ha_shopcmaterial_c_60b.png" },
				{ id: 'crystal', name: "Древний блестящий кристалл", quantity: 12, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 6, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'jewellery', name: "Дарритовое украшение", quantity: 2, icon: "images/icon_item_ha_ac_parts_n_r_60s.png" },
				{ id: 'waterfragment', name: "Частица воды", quantity: 2, icon: "images/icon_item_ac_material_id_s_n_e_60a.png" }
            ]
        },
        earring2: {
            name: "Опаловая серьга специалиста",
            icon: "images/icon_item_earring_m01.png",
            outputQuantity: 1,
            materials: [
                { id: 'flux2', name: "Священный камень украшений II", quantity: 13, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 13, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 7, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 13, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 13, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 7, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'opal', name: "Обычный опал", quantity: 5, icon: "images/icon_item_jewelry_r_60a.png" },
				{ id: 'opal2', name: "Хороший опал", quantity: 3, icon: "images/icon_item_jewelry_l_60a.png" },
				{ id: 'ceranium', name: "Обычный серамиум", quantity: 15, icon: "images/icon_item_noblemetal_r_60a.png" },
				{ id: 'ceranium2', name: "Хороший серамиум", quantity: 8, icon: "images/icon_item_noblemetal_l_60a.png" },
				{ id: 'knife', name: "Священный нож ручной работы", quantity: 61, icon: "images/icon_item_ha_shopcmaterial_c_60b.png" },
				{ id: 'crystal', name: "Древний блестящий кристалл", quantity: 12, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 6, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'jewellery', name: "Опаловое украшение", quantity: 2, icon: "images/icon_item_ha_ac_parts_n_r_60a.png" },
				{ id: 'waterfragment', name: "Частица воды", quantity: 2, icon: "images/icon_item_ac_material_id_s_n_e_60a.png" }
            ]
		},
        necklace: {
            name: "Дарритовое ожерелье специалиста",
            icon: "images/icon_item_necklace_m01.png",
            outputQuantity: 1,
            materials: [
                { id: 'flux2', name: "Священный камень украшений II", quantity: 19, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 19, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 10, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 19, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 19, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'darite', name: "Обычный даррит", quantity: 8, icon: "images/icon_item_jewelry_r_60s.png" },
				{ id: 'darite2', name: "Хороший даррит", quantity: 5, icon: "images/icon_item_jewelry_l_60s.png" },
				{ id: 'ceranium', name: "Обычный серамиум", quantity: 20, icon: "images/icon_item_noblemetal_r_60a.png" },
				{ id: 'ceranium2', name: "Хороший серамиум", quantity: 11, icon: "images/icon_item_noblemetal_l_60a.png" },
				{ id: 'knife', name: "Священный нож ручной работы", quantity: 83, icon: "images/icon_item_ha_shopcmaterial_c_60b.png" },
				{ id: 'crystal', name: "Древний блестящий кристалл", quantity: 16, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 8, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'jewellery', name: "Дарритовое украшение", quantity: 3, icon: "images/icon_item_ha_ac_parts_n_r_60s.png" },
				{ id: 'waterfragment', name: "Частица воды", quantity: 3, icon: "images/icon_item_ac_material_id_s_n_e_60a.png" }
            ]	
        },
        necklace2: {
            name: "Опаловое ожерелье специалиста",
            icon: "images/icon_item_necklace_m01.png",
            outputQuantity: 1,
            materials: [
                { id: 'flux2', name: "Священный камень украшений II", quantity: 19, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 19, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 10, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 19, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 19, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 10, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'opal', name: "Обычный опал", quantity: 8, icon: "images/icon_item_jewelry_r_60a.png" },
				{ id: 'opal2', name: "Хороший опал", quantity: 5, icon: "images/icon_item_jewelry_l_60a.png" },
				{ id: 'ceranium', name: "Обычный серамиум", quantity: 20, icon: "images/icon_item_noblemetal_r_60a.png" },
				{ id: 'ceranium2', name: "Хороший серамиум", quantity: 11, icon: "images/icon_item_noblemetal_l_60a.png" },
				{ id: 'knife', name: "Священный нож ручной работы", quantity: 83, icon: "images/icon_item_ha_shopcmaterial_c_60b.png" },
				{ id: 'crystal', name: "Древний блестящий кристалл", quantity: 16, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 8, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'jewellery', name: "Опаловое украшение", quantity: 3, icon: "images/icon_item_ha_ac_parts_n_r_60a.png" },
				{ id: 'waterfragment', name: "Частица воды", quantity: 3, icon: "images/icon_item_ac_material_id_s_n_e_60a.png" }
            ]	
        },
        belt: {
            name: "Каталиумовый пояс специалиста",
            icon: "images/icon_item_belt_m01.png",
            outputQuantity: 1,
            materials: [
                { id: 'flux2', name: "Священный камень украшений II", quantity: 9, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 9, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 5, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 9, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 9, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 5, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'opal', name: "Обычный стебель фоники", quantity: 19, icon: "images/icon_item_plant_r_60a.png" },
				{ id: 'opal2', name: "Хороший стебель фоники", quantity: 10, icon: "images/icon_item_plant_l_60a.png" },
				{ id: 'thread', name: "Священный клубок ниток", quantity: 40, icon: "images/icon_item_ta_shopcmaterial_c_60b.png" },
			    { id: 'crystal', name: "Древний блестящий кристалл", quantity: 8, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 4, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'ponicaweaving', name: "Фониковая ткань", quantity: 1, icon: "images/icon_item_ta_rb_parts_n_r_60a.png" },
				{ id: 'windfragment', name: "Частица ветра", quantity: 1, icon: "images/icon_item_ar_material_id_s_n_e_60a.png" }
            ]	
        },
	    belt2: {
            name: "Каталиумовый ремень специалиста",
            icon: "images/icon_item_belt_m01.png",
            outputQuantity: 1,
            materials: [
                { id: 'flux2', name: "Священный камень украшений II", quantity: 9, icon: "images/icon_item_crystalball01e.png" },
                { id: 'flux3', name: "Священный камень украшений III", quantity: 9, icon: "images/icon_item_crystalball01e_r.png" },
                { id: 'flux4', name: "Священный камень украшений IV", quantity: 5, icon: "images/icon_item_crystalball01e_l.png" },
				{ id: 'ether', name: "Древний эфир", quantity: 9, icon: "images/icon_item_od_all_c_60a.png" },
				{ id: 'ether2', name: "Древний эфир II", quantity: 9, icon: "images/icon_item_od_all_r_60a.png" },
				{ id: 'ether3', name: "Древний эфир III", quantity: 5, icon: "images/icon_item_od_all_l_60a.png" },
				{ id: 'opal', name: "Простая священная недубленая кожа", quantity: 19, icon: "images/icon_item_rawhide01e_r.png" },
				{ id: 'opal2', name: "Хорошая священная недубленая кожа", quantity: 10, icon: "images/icon_item_rawhide01f_r.png" },
				{ id: 'thread', name: "Священный кожаный шнур", quantity: 40, icon: "images/icon_item_ta_shopcmaterial_c_60a.png" },
			    { id: 'crystal', name: "Древний блестящий кристалл", quantity: 8, icon: "images/icon_item_ac_shopcmaterial_s_pve_m_60a.png" },
				{ id: 'water', name: "Вечность воды", quantity: 4, icon: "images/icon_item_ac_material_id_s_pve_m_60a.png" },
				{ id: 'ponicaweaving', name: "Священная кожа", quantity: 1, icon: "images/icon_item_ta_rt_parts_n_r_60a.png" },
				{ id: 'windfragment', name: "Частица ветра", quantity: 1, icon: "images/icon_item_ar_material_id_s_n_e_60a.png" }
            ]	
        },
    }
};
const MATERIAL_CRAFTING_DATA = { 
    types: {
        daritejewellery: {
            name: "Дарритовое украшение",
            icon: "images/icon_item_ha_ac_parts_n_r_60s.png",
            outputQuantity: 10,
            materials: [
                { id: 'holypreciousmetalacid', name: "Священный драгоценный сплав", quantity: 4, icon: "images/icon_item_ha_shopmaterial_c_60b.png" },
                { id: 'idiumjewellery', name: "Идиумовое украшение", quantity: 20, icon: "images/icon_item_v6_n_ac_shopmaterial_c_60a.png" },
				{ id: 'ceranium', name: "Серамиум", quantity: 25, icon: "images/icon_item_noblemetal_c_60a.png" },
                { id: 'darite', name: "Даррит", quantity: 25, icon: "images/icon_item_jewelry_c_60s.png" },
				{ id: 'steppeessence', name: "Энергия лугов", quantity: 4, icon: "images/icon_item_ldf5a_b_material_60_r_60a.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 4, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" }
            ]
        },
        opaljewellery: {
            name: "Опаловое украшение",
            icon: "images/icon_item_ha_ac_parts_n_r_60a.png",
            outputQuantity: 10,
            materials: [
                { id: 'holypreciousmetalacid', name: "Священный драгоценный сплав", quantity: 4, icon: "images/icon_item_ha_shopmaterial_c_60b.png" },
                { id: 'idiumjewellery', name: "Идиумовое украшение", quantity: 20, icon: "images/icon_item_v6_n_ac_shopmaterial_c_60a.png" },
				{ id: 'ceranium', name: "Серамиум", quantity: 25, icon: "images/icon_item_noblemetal_c_60a.png" },
                { id: 'opal', name: "Опал", quantity: 25, icon: "images/icon_item_jewelry_c_60a.png" },
				{ id: 'mysteriousessence', name: "Загадочная энергия", quantity: 4, icon: "images/icon_item_ldf5b_c_material_60_r_60a.png" },
				{ id: 'ceraniumfragment', name: "Частица серамиума", quantity: 4, icon: "images/icon_item_ldf5ab_all_material_u_60a.png" }
            ]
        },
        holyleather: {
            name: "Священная кожа",
            icon: "images/icon_item_ta_rt_parts_n_r_60a.png",
            outputQuantity: 10,
            materials: [
			    { id: 'holyleatherhardener', name: "Священный кожаный усилитель", quantity: 4, icon: "images/icon_item_ta_shopmaterial_c_60a.png" },
                { id: 'idieleather', name: "Идиевая кожа", quantity: 20, icon: "images/icon_item_v16_n_lt_shopmaterial_c_60a.png" },
                { id: 'holyrawhide', name: "Священная недубленая кожа", quantity: 50, icon: "images/icon_item_rawhide01f.png" },
				{ id: 'plateauessence', name: "Энергия равнин", quantity: 1, icon: "images/icon_item_ldf5b_a_material_60_r_60a.png" },
				{ id: 'essenceofambition', name: "Энергия честолюбия", quantity: 1, icon: "images/icon_item_ldf5under_d_material_60_r_60a.png" }
            ]
        },
        ponicaweaving: {
            name: "Фониковая ткань",
            icon: "images/icon_item_ta_rb_parts_n_r_60a.png",
            outputQuantity: 10,
            materials: [
                { id: 'hardener', name: "Священный усилитель волокон", quantity: 4, icon: "images/icon_item_ta_shopmaterial_c_60b.png" },
                { id: 'idastextile', name: "Идиевая ткань", quantity: 20, icon: "images/icon_item_v18_n_rb_shopmaterial_c_60a.png" },
                { id: 'ponicafibre', name: "Стебель фоники", quantity: 50, icon: "images/icon_item_plant_c_60a.png" },
				{ id: 'woodsessence', name: "Энергия лесов", quantity: 1, icon: "images/icon_item_ldf5b_b_material_60_r_60a.png" },
				{ id: 'essenceofregret', name: "Энергия раскаяния", quantity: 1, icon: "images/icon_item_ldf5under_f_material_60_r_60a.png" }
		]
        },
        
    }
};


function showCraftingResultTooltip(event, typeId) {
   
    const description = ITEM_DESCRIPTIONS[typeId] || "Немає опису для цього предмета";
   
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
  
    let itemName = "";

    if (JEWELRY_CRAFTING_DATA.types[typeId]) {
        itemName = JEWELRY_CRAFTING_DATA.types[typeId].name;
    } else if (MATERIAL_CRAFTING_DATA.types[typeId]) {
        itemName = MATERIAL_CRAFTING_DATA.types[typeId].name;
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
        { tableId: 'output-list-jewelry', typeId: 'jewelry-type' },
		{ tableId: 'output-list-craftmaterials', typeId: 'craftmaterials-type' }
       
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
    icon.width = 24; 
    icon.height = 24;
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
    jewelry: {
        typeId: 'jewelry-type',
        quantityId: 'quantity-jewelry',
        iconSelector: '#jewelry-icon-container img',
        materialsListId: 'materials-list-jewelry',
        outputListId: 'output-list-jewelry',
        resetButtonId: 'reset-jewelry',
        craftingData: JEWELRY_CRAFTING_DATA
    },
	craftmaterials: {
        typeId: 'craftmaterials-type',
        quantityId: 'quantity-craftmaterials',
        iconSelector: '#craftmaterials-icon-container img',
        materialsListId: 'materials-list-craftmaterials',
        outputListId: 'output-list-craftmaterials',
        resetButtonId: 'reset-craftmaterials',
        craftingData: MATERIAL_CRAFTING_DATA
    }
};

document.querySelector('.back-button').addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', () => {
    const calculators = {
        jewelry: new BaseCalculator(calculatorConfigs.jewelry),
		craftmaterials: new BaseCalculator(calculatorConfigs.craftmaterials),
      
    };
});
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');
    
    
    const raceSelect = document.getElementById('race-select');
    
    
    document.querySelectorAll('.popup-name').forEach(function(element) {
        element.addEventListener('click', function() {
            const popupId = element.getAttribute('data-popup');
            openPopup(popupId);
        });
    });

   
    function openPopup(id) {
    const popupTitle = document.getElementById('popup-title');
    const popupTextarea = document.getElementById('popup-textarea');

    const selectedRace = raceSelect.value; 

       
        switch (id) {
            case 'Nolan':
                popupTitle.textContent = 'Даррит';
                if (selectedRace === 'elyos') {
                    popupTextarea.value = '[pos:Nolan;0 600050000 2192.9 2431.7 0.0 0] [pos:Nolan;0 600050000 2368.8 2278.0 0.0 0] [pos:Nolan;0 600050000 1898.3 2290.0 0.0 0] [pos:Nolan;0 600050000 2280.1 2404.6 0.0 0] [pos:Nolan;0 600050000 1848.8 849.5 0.0 0] [pos:Nolan;0 600050000 2224.1 821.8 0.0 0] [pos:Nolan;0 600050000 2279.1 2482.6 0.0 0] [pos:Nolan;0 600050000 2418.3 834.3 0.0 0] [pos:Nolan;0 600050000 1995.5 2266.6 0.0 0] [pos:Nolan;0 600050000 2089.7 2237.8 0.0 0] [pos:Nolan;0 600050000 2220.3 979.8 0.0 0] [pos:Nolan;0 600050000 2039.8 1002.9 0.0 0] [pos:Nolan;0 600050000 1951.1 2388.2 0.0 0] [pos:Nolan;0 600050000 1946.7 2471.5 0.0 0] [pos:Nolan;0 600050000 2396.8 2294.3 0.0 0] [pos:Nolan;0 600050000 2259.6 977.4 0.0 0] [pos:Nolan;0 600050000 2350.4 794.2 0.0 0] [pos:Nolan;0 600050000 2098.5 2132.7 0.0 0] [pos:Nolan;0 600050000 1921.3 2304.7 0.0 0] [pos:Nolan;0 600050000 2474.3 725.6 0.0 0] [pos:Nolan;0 600050000 1926.9 2339.0 0.0 0] [pos:Nolan;0 600050000 2016.8 839.4 0.0 0] [pos:Nolan;0 600050000 2193.5 894.8 0.0 0] [pos:Nolan;0 600050000 2375.3 2406.5 0.0 0] [pos:Nolan;0 600050000 2319.8 780.8 0.0 0] [pos:Nolan;0 600050000 2024.4 2417.5 0.0 0] [pos:Nolan;0 600050000 1990.1 2402.8 0.0 0] [pos:Nolan;0 600050000 2348.7 735.6 0.0 0] [pos:Nolan;0 600050000 2406.4 669.8 0.0 0] [pos:Nolan;0 600050000 1978.5 922.2 0.0 0] [pos:Nolan;0 600050000 2223.6 2411.2 0.0 0] [pos:Nolan;0 600050000 1949.2 883.6 0.0 0] [pos:Nolan;0 600050000 2109.3 877.9 0.0 0] [pos:Nolan;0 600050000 2242.4 2268.5 0.0 0] [pos:Nolan;0 600050000 2224.3 2367.7 0.0 0] [pos:Nolan;0 600050000 1948.3 969.7 0.0 0] [pos:Nolan;0 600050000 1808.2 907.8 0.0 0] [pos:Nolan;0 600050000 2281.6 873.6 0.0 0] [pos:Nolan;0 600050000 2156.3 2248.7 0.0 0] [pos:Nolan;0 600050000 2435.8 639.4 0.0 0] [pos:Nolan;0 600050000 2474.3 725.6 0.0 0] [pos:Nolan;0 600050000 2406.4 669.8 0.0 0] [pos:Nolan;0 600050000 2418.3 834.3 0.0 0] [pos:Nolan;0 600050000 2350.4 794.2 0.0 0] [pos:Nolan;0 600050000 2319.8 780.8 0.0 0] [pos:Nolan;0 600050000 2348.7 735.6 0.0 0] [pos:Nolan;0 600050000 2281.6 873.6 0.0 0] [pos:Nolan;0 600050000 2224.1 821.8 0.0 0] [pos:Nolan;0 600050000 2193.5 894.8 0.0 0] [pos:Nolan;0 600050000 2109.3 877.9 0.0 0] [pos:Nolan;0 600050000 2039.8 1003.0 0.0 0] [pos:Nolan;0 600050000 1978.5 922.2 0.0 0] [pos:Nolan;0 600050000 1948.3 969.7 0.0 0] [pos:Nolan;0 600050000 1949.2 883.6 0.0 0] [pos:Nolan;0 600050000 1848.8 849.5 0.0 0] [pos:Nolan;0 600050000 1808.2 907.8 0.0 0] [pos:Nolan;0 600050000 1990.1 2402.8 0.0 0] [pos:Nolan;0 600050000 2024.4 2417.5 0.0 0] [pos:Nolan;0 600050000 1926.9 2339.0 0.0 0] [pos:Nolan;0 600050000 1921.3 2304.7 0.0 0] [pos:Nolan;0 600050000 1898.3 2290.0 0.0 0] [pos:Nolan;0 600050000 1995.5 2266.6 0.0 0] [pos:Nolan;0 600050000 1951.1 2388.2 0.0 0] [pos:Nolan;0 600050000 1946.7 2471.5 0.0 0] [pos:Nolan;0 600050000 2089.7 2237.8 0.0 0] [pos:Nolan;0 600050000 2156.3 2248.7 0.0 0] [pos:Nolan;0 600050000 2242.4 2268.5 0.0 0] [pos:Nolan;0 600050000 2224.3 2367.7 0.0 0] [pos:Nolan;0 600050000 2223.6 2411.2 0.0 0] [pos:Nolan;0 600050000 2192.9 2431.7 0.0 0] [pos:Nolan;0 600050000 2280.1 2404.6 0.0 0] [pos:Nolan;0 600050000 2279.1 2482.7 0.0 0] [pos:Nolan;0 600050000 2375.3 2406.5 0.0 0] [pos:Nolan;0 600050000 2368.8 2278.0 0.0 0] [pos:Nolan;0 600050000 2396.8 2294.3 0.0 0] [pos:Nolan;0 600050000 2016.8 839.4 0.0 0] [pos:Nolan;0 600050000 2220.4 979.8 0.0 0] [pos:Nolan;0 600050000 2259.6 977.4 0.0 0] [pos:Nolan;0 600050000 2098.5 2132.7 0.0 0] ';
                } else if (selectedRace === 'asmodian') {
                    popupTextarea.value = '[pos:Nolan;1 600050000 2192.9 2431.7 0.0 0] [pos:Nolan;1 600050000 2368.8 2278.0 0.0 0] [pos:Nolan;1 600050000 1898.3 2290.0 0.0 0] [pos:Nolan;1 600050000 2280.1 2404.6 0.0 0] [pos:Nolan;1 600050000 1848.8 849.5 0.0 0] [pos:Nolan;1 600050000 2224.1 821.8 0.0 0] [pos:Nolan;1 600050000 2279.1 2482.6 0.0 0] [pos:Nolan;1 600050000 2418.3 834.3 0.0 0] [pos:Nolan;1 600050000 1995.5 2266.6 0.0 0] [pos:Nolan;1 600050000 2089.7 2237.8 0.0 0] [pos:Nolan;1 600050000 2220.3 979.8 0.0 0] [pos:Nolan;1 600050000 2039.8 1002.9 0.0 0] [pos:Nolan;1 600050000 1951.1 2388.2 0.0 0] [pos:Nolan;1 600050000 1946.7 2471.5 0.0 0] [pos:Nolan;1 600050000 2396.8 2294.3 0.0 0] [pos:Nolan;1 600050000 2259.6 977.4 0.0 0] [pos:Nolan;1 600050000 2350.4 794.2 0.0 0] [pos:Nolan;1 600050000 2098.5 2132.7 0.0 0] [pos:Nolan;1 600050000 1921.3 2304.7 0.0 0] [pos:Nolan;1 600050000 2474.3 725.6 0.0 0] [pos:Nolan;1 600050000 1926.9 2339.0 0.0 0] [pos:Nolan;1 600050000 2016.8 839.4 0.0 0] [pos:Nolan;1 600050000 2193.5 894.8 0.0 0] [pos:Nolan;1 600050000 2375.3 2406.5 0.0 0] [pos:Nolan;1 600050000 2319.8 780.8 0.0 0] [pos:Nolan;1 600050000 2024.4 2417.5 0.0 0] [pos:Nolan;1 600050000 1990.1 2402.8 0.0 0] [pos:Nolan;1 600050000 2348.7 735.6 0.0 0] [pos:Nolan;1 600050000 2406.4 669.8 0.0 0] [pos:Nolan;1 600050000 1978.5 922.2 0.0 0] [pos:Nolan;1 600050000 2223.6 2411.2 0.0 0] [pos:Nolan;1 600050000 1949.2 883.6 0.0 0] [pos:Nolan;1 600050000 2109.3 877.9 0.0 0] [pos:Nolan;1 600050000 2242.4 2268.5 0.0 0] [pos:Nolan;1 600050000 2224.3 2367.7 0.0 0] [pos:Nolan;1 600050000 1948.3 969.7 0.0 0] [pos:Nolan;1 600050000 1808.2 907.8 0.0 0] [pos:Nolan;1 600050000 2281.6 873.6 0.0 0] [pos:Nolan;1 600050000 2156.3 2248.7 0.0 0] [pos:Nolan;1 600050000 2435.8 639.4 0.0 0] [pos:Nolan;1 600050000 2474.3 725.6 0.0 0] [pos:Nolan;1 600050000 2406.4 669.8 0.0 0] [pos:Nolan;1 600050000 2418.3 834.3 0.0 0] [pos:Nolan;1 600050000 2350.4 794.2 0.0 0] [pos:Nolan;1 600050000 2319.8 780.8 0.0 0] [pos:Nolan;1 600050000 2348.7 735.6 0.0 0] [pos:Nolan;1 600050000 2281.6 873.6 0.0 0] [pos:Nolan;1 600050000 2224.1 821.8 0.0 0] [pos:Nolan;1 600050000 2193.5 894.8 0.0 0] [pos:Nolan;1 600050000 2109.3 877.9 0.0 0] [pos:Nolan;1 600050000 2039.8 1003.0 0.0 0] [pos:Nolan;1 600050000 1978.5 922.2 0.0 0] [pos:Nolan;1 600050000 1948.3 969.7 0.0 0] [pos:Nolan;1 600050000 1949.2 883.6 0.0 0] [pos:Nolan;1 600050000 1848.8 849.5 0.0 0] [pos:Nolan;1 600050000 1808.2 907.8 0.0 0] [pos:Nolan;1 600050000 1990.1 2402.8 0.0 0] [pos:Nolan;1 600050000 2024.4 2417.5 0.0 0] [pos:Nolan;1 600050000 1926.9 2339.0 0.0 0] [pos:Nolan;1 600050000 1921.3 2304.7 0.0 0] [pos:Nolan;1 600050000 1898.3 2290.0 0.0 0] [pos:Nolan;1 600050000 1995.5 2266.6 0.0 0] [pos:Nolan;1 600050000 1951.1 2388.2 0.0 0] [pos:Nolan;1 600050000 1946.7 2471.5 0.0 0] [pos:Nolan;1 600050000 2089.7 2237.8 0.0 0] [pos:Nolan;1 600050000 2156.3 2248.7 0.0 0] [pos:Nolan;1 600050000 2242.4 2268.5 0.0 0] [pos:Nolan;1 600050000 2224.3 2367.7 0.0 0] [pos:Nolan;1 600050000 2223.6 2411.2 0.0 0] [pos:Nolan;1 600050000 2192.9 2431.7 0.0 0] [pos:Nolan;1 600050000 2280.1 2404.6 0.0 0] [pos:Nolan;1 600050000 2279.1 2482.7 0.0 0] [pos:Nolan;1 600050000 2375.3 2406.5 0.0 0] [pos:Nolan;1 600050000 2368.8 2278.0 0.0 0] [pos:Nolan;1 600050000 2396.8 2294.3 0.0 0] [pos:Nolan;1 600050000 2016.8 839.4 0.0 0] [pos:Nolan;1 600050000 2220.4 979.8 0.0 0] [pos:Nolan;1 600050000 2259.6 977.4 0.0 0] [pos:Nolan;1 600050000 2098.5 2132.7 0.0 0] ';
                }
                break;
            case 'Opal':
                popupTitle.textContent = 'Опал';
                if (selectedRace === 'elyos') {
                    popupTextarea.value = '[pos:Opal;0 600060000 348.2 2747.9 0.0 0] [pos:Opal;0 600060000 185.1 1003.0 0.0 0] [pos:Opal;0 600060000 1087.9 1741.5 0.0 0] [pos:Opal;0 600060000 499.9 1985.0 0.0 0] [pos:Opal;0 600060000 384.1 464.1 0.0 0] [pos:Opal;0 600060000 978.6 1508.2 0.0 0] [pos:Opal;0 600060000 467.3 684.2 0.0 0] [pos:Opal;0 600060000 723.5 1561.9 0.0 0] [pos:Opal;0 600060000 126.9 2743.7 0.0 0] [pos:Opal;0 600060000 291.5 1555.6 0.0 0] [pos:Opal;0 600060000 431.9 1973.1 0.0 0] [pos:Opal;0 600060000 688.2 2919.1 0.0 0] [pos:Opal;0 600060000 438.1 993.5 0.0 0] [pos:Opal;0 600060000 182.3 2020.9 0.0 0] [pos:Opal;0 600060000 560.3 2633.1 0.0 0] [pos:Opal;0 600060000 448.8 2719.9 0.0 0] [pos:Opal;0 600060000 810.3 1813.1 0.0 0] [pos:Opal;0 600060000 422.4 2054.0 0.0 0] [pos:Opal;0 600060000 199.5 689.3 0.0 0] [pos:Opal;0 600060000 436.3 77.4 0.0 0] [pos:Opal;0 600060000 150.4 2637.2 0.0 0] [pos:Opal;0 600060000 435.3 1610.5 0.0 0] [pos:Opal;0 600060000 492.1 208.6 0.0 0] [pos:Opal;0 600060000 823.6 1514.5 0.0 0] [pos:Opal;0 600060000 527.1 1852.5 0.0 0] [pos:Opal;0 600060000 328.9 459.8 0.0 0] [pos:Opal;0 600060000 696.4 1627.0 0.0 0] [pos:Opal;0 600060000 842.7 1560.4 0.0 0] [pos:Opal;0 600060000 249.9 2637.1 0.0 0] [pos:Opal;0 600060000 364.1 558.3 0.0 0] [pos:Opal;0 600060000 237.8 2045.8 0.0 0] [pos:Opal;0 600060000 228.2 2894.6 0.0 0] [pos:Opal;0 600060000 317.4 332.3 0.0 0] [pos:Opal;0 600060000 543.4 1667.2 0.0 0] [pos:Opal;0 600060000 344.5 2137.7 0.0 0] [pos:Opal;0 600060000 382.6 1768.0 0.0 0] [pos:Opal;0 600060000 810.3 1813.1 0.0 0] [pos:Opal;0 600060000 543.4 1667.2 0.0 0] [pos:Opal;0 600060000 435.3 1610.5 0.0 0] [pos:Opal;0 600060000 382.6 1768.0 0.0 0] [pos:Opal;0 600060000 291.5 1555.6 0.0 0] [pos:Opal;0 600060000 527.1 1852.5 0.0 0] [pos:Opal;0 600060000 1087.9 1741.5 0.0 0] [pos:Opal;0 600060000 696.4 1627.0 0.0 0] [pos:Opal;0 600060000 723.5 1561.9 0.0 0] [pos:Opal;0 600060000 842.7 1560.5 0.0 0] [pos:Opal;0 600060000 823.6 1514.5 0.0 0] [pos:Opal;0 600060000 978.6 1508.2 0.0 0] [pos:Opal;0 600060000 228.2 2894.6 0.0 0] [pos:Opal;0 600060000 126.9 2743.7 0.0 0] [pos:Opal;0 600060000 150.4 2637.2 0.0 0] [pos:Opal;0 600060000 249.9 2637.1 0.0 0] [pos:Opal;0 600060000 182.3 2020.9 0.0 0] [pos:Opal;0 600060000 237.8 2045.8 0.0 0] [pos:Opal;0 600060000 344.5 2137.7 0.0 0] [pos:Opal;0 600060000 422.4 2054.0 0.0 0] [pos:Opal;0 600060000 431.9 1973.2 0.0 0] [pos:Opal;0 600060000 499.9 1985.1 0.0 0] [pos:Opal;0 600060000 438.1 993.5 0.0 0] [pos:Opal;0 600060000 364.1 558.3 0.0 0] [pos:Opal;0 600060000 328.9 459.8 0.0 0] [pos:Opal;0 600060000 384.1 464.1 0.0 0] [pos:Opal;0 600060000 317.4 332.3 0.0 0] [pos:Opal;0 600060000 492.1 208.6 0.0 0] [pos:Opal;0 600060000 199.5 689.3 0.0 0] [pos:Opal;0 600060000 348.2 2747.9 0.0 0] [pos:Opal;0 600060000 448.8 2719.9 0.0 0] [pos:Opal;0 600060000 560.3 2633.1 0.0 0] [pos:Opal;0 600060000 688.2 2919.1 0.0 0] [pos:Opal;0 600050000 2858.7 413.2 0.0 0] [pos:Opal;0 600050000 2631.8 373.1 0.0 0] [pos:Opal;0 600050000 784.9 313.1 0.0 0] [pos:Opal;0 600050000 2820.6 675.8 0.0 0] [pos:Opal;0 600050000 2828.9 1096.7 0.0 0] [pos:Opal;0 600050000 2652.2 2432.0 0.0 0] [pos:Opal;0 600050000 2557.4 2494.8 0.0 0] [pos:Opal;0 600050000 2791.9 2562.5 0.0 0] [pos:Opal;0 600050000 2528.0 2924.1 0.0 0] [pos:Opal;0 600050000 2731.8 2766.6 0.0 0] [pos:Opal;0 600050000 211.6 2352.1 0.0 0] [pos:Opal;0 600050000 2844.1 991.3 0.0 0] [pos:Opal;0 600050000 877.9 2802.3 0.0 0] [pos:Opal;0 600050000 517.4 2413.3 0.0 0] [pos:Opal;0 600050000 2850.7 2318.8 0.0 0] [pos:Opal;0 600050000 773.4 575.1 0.0 0] [pos:Opal;0 600050000 2689.8 2394.1 0.0 0] [pos:Opal;0 600050000 2948.3 1197.9 0.0 0] [pos:Opal;0 600050000 658.0 276.8 0.0 0] [pos:Opal;0 600050000 2805.8 1950.1 0.0 0] [pos:Opal;0 600050000 2840.4 850.3 0.0 0] [pos:Opal;0 600050000 850.8 2908.2 0.0 0] [pos:Opal;0 600050000 362.4 1146.2 0.0 0] [pos:Opal;0 600050000 2747.5 1825.6 0.0 0] [pos:Opal;0 600050000 840.1 173.7 0.0 0] [pos:Opal;0 600050000 2723.3 465.1 0.0 0] [pos:Opal;0 600050000 2679.8 384.9 0.0 0] [pos:Opal;0 600050000 2988.3 2132.7 0.0 0] [pos:Opal;0 600050000 2636.3 2741.7 0.0 0] [pos:Opal;0 600050000 2801.4 401.1 0.0 0] [pos:Opal;0 600050000 2507.4 2581.1 0.0 0] [pos:Opal;0 600050000 2687.5 2611.7 0.0 0] [pos:Opal;0 600050000 2760.1 1688.5 0.0 0] [pos:Opal;0 600050000 331.5 2103.6 0.0 0] [pos:Opal;0 600050000 2717.5 341.8 0.0 0] [pos:Opal;0 600050000 2598.7 2546.3 0.0 0] [pos:Opal;0 600050000 2892.4 2232.3 0.0 0] [pos:Opal;0 600050000 718.1 2812.8 0.0 0] [pos:Opal;0 600050000 675.6 2530.1 0.0 0] [pos:Opal;0 600050000 2777.1 2695.6 0.0 0] [pos:Opal;0 600050000 2859.8 1605.5 0.0 0] [pos:Opal;0 600050000 2495.5 2856.2 0.0 0] [pos:Opal;0 600050000 2836.5 281.8 0.0 0] [pos:Opal;0 600050000 623.1 749.3 0.0 0] [pos:Opal;0 600050000 169.1 1168.6 0.0 0] [pos:Opal;0 600050000 347.8 925.8 0.0 0] [pos:Opal;0 600050000 630.3 640.6 0.0 0] [pos:Opal;0 600050000 563.4 2433.0 0.0 0] [pos:Opal;0 600050000 171.3 2108.8 0.0 0] [pos:Opal;0 600050000 718.1 2812.8 0.0 0] [pos:Opal;0 600050000 877.9 2802.4 0.0 0] [pos:Opal;0 600050000 850.8 2908.2 0.0 0] [pos:Opal;0 600050000 2892.4 2232.3 0.0 0] [pos:Opal;0 600050000 2805.8 1950.1 0.0 0] [pos:Opal;0 600050000 2747.5 1825.6 0.0 0] [pos:Opal;0 600050000 2760.1 1688.5 0.0 0] [pos:Opal;0 600050000 2859.8 1605.5 0.0 0] [pos:Opal;0 600050000 211.6 2352.1 0.0 0] [pos:Opal;0 600050000 171.3 2108.8 0.0 0] [pos:Opal;0 600050000 2495.5 2856.2 0.0 0] [pos:Opal;0 600050000 2528.0 2924.1 0.0 0] [pos:Opal;0 600050000 2636.3 2741.7 0.0 0] [pos:Opal;0 600050000 2731.8 2766.6 0.0 0] [pos:Opal;0 600050000 2687.5 2611.7 0.0 0] [pos:Opal;0 600050000 2777.1 2695.6 0.0 0] [pos:Opal;0 600050000 2791.9 2562.6 0.0 0] [pos:Opal;0 600050000 2836.5 281.8 0.0 0] [pos:Opal;0 600050000 331.5 2103.6 0.0 0] [pos:Opal;0 600050000 362.4 1146.2 0.0 0] [pos:Opal;0 600050000 347.8 925.8 0.0 0] [pos:Opal;0 600050000 840.1 173.7 0.0 0] [pos:Opal;0 600050000 784.9 313.1 0.0 0] [pos:Opal;0 600050000 658.0 276.8 0.0 0] [pos:Opal;0 600050000 517.4 2413.3 0.0 0] [pos:Opal;0 600050000 563.4 2433.0 0.0 0] [pos:Opal;0 600050000 675.6 2530.2 0.0 0] [pos:Opal;0 600050000 2717.5 341.8 0.0 0] [pos:Opal;0 600050000 2679.8 384.9 0.0 0] [pos:Opal;0 600050000 2801.4 401.1 0.0 0] [pos:Opal;0 600050000 2858.7 413.2 0.0 0] [pos:Opal;0 600050000 2820.6 675.8 0.0 0] [pos:Opal;0 600050000 2840.4 850.3 0.0 0] [pos:Opal;0 600050000 2844.1 991.3 0.0 0] [pos:Opal;0 600050000 2828.9 1096.7 0.0 0] [pos:Opal;0 600050000 2948.3 1197.9 0.0 0] [pos:Opal;0 600050000 2850.7 2318.8 0.0 0] [pos:Opal;0 600050000 2689.8 2394.1 0.0 0] [pos:Opal;0 600050000 2652.2 2432.0 0.0 0] [pos:Opal;0 600050000 2557.4 2494.8 0.0 0] [pos:Opal;0 600050000 2598.7 2546.3 0.0 0] [pos:Opal;0 600050000 2507.4 2581.1 0.0 0] [pos:Opal;0 600050000 169.1 1168.6 0.0 0] [pos:Opal;0 600050000 2631.8 373.1 0.0 0] [pos:Opal;0 600050000 2723.3 465.1 0.0 0] ';
                } else if (selectedRace === 'asmodian') {
                    popupTextarea.value = '[pos:Opal;1 600060000 348.2 2747.9 0.0 0] [pos:Opal;1 600060000 185.1 1003.0 0.0 0] [pos:Opal;1 600060000 1087.9 1741.5 0.0 0] [pos:Opal;1 600060000 499.9 1985.0 0.0 0] [pos:Opal;1 600060000 384.1 464.1 0.0 0] [pos:Opal;1 600060000 978.6 1508.2 0.0 0] [pos:Opal;1 600060000 467.3 684.2 0.0 0] [pos:Opal;1 600060000 723.5 1561.9 0.0 0] [pos:Opal;1 600060000 126.9 2743.7 0.0 0] [pos:Opal;1 600060000 291.5 1555.6 0.0 0] [pos:Opal;1 600060000 431.9 1973.1 0.0 0] [pos:Opal;1 600060000 688.2 2919.1 0.0 0] [pos:Opal;1 600060000 438.1 993.5 0.0 0] [pos:Opal;1 600060000 182.3 2020.9 0.0 0] [pos:Opal;1 600060000 560.3 2633.1 0.0 0] [pos:Opal;1 600060000 448.8 2719.9 0.0 0] [pos:Opal;1 600060000 810.3 1813.1 0.0 0] [pos:Opal;1 600060000 422.4 2054.0 0.0 0] [pos:Opal;1 600060000 199.5 689.3 0.0 0] [pos:Opal;1 600060000 436.3 77.4 0.0 0] [pos:Opal;1 600060000 150.4 2637.2 0.0 0] [pos:Opal;1 600060000 435.3 1610.5 0.0 0] [pos:Opal;1 600060000 492.1 208.6 0.0 0] [pos:Opal;1 600060000 823.6 1514.5 0.0 0] [pos:Opal;1 600060000 527.1 1852.5 0.0 0] [pos:Opal;1 600060000 328.9 459.8 0.0 0] [pos:Opal;1 600060000 696.4 1627.0 0.0 0] [pos:Opal;1 600060000 842.7 1560.4 0.0 0] [pos:Opal;1 600060000 249.9 2637.1 0.0 0] [pos:Opal;1 600060000 364.1 558.3 0.0 0] [pos:Opal;1 600060000 237.8 2045.8 0.0 0] [pos:Opal;1 600060000 228.2 2894.6 0.0 0] [pos:Opal;1 600060000 317.4 332.3 0.0 0] [pos:Opal;1 600060000 543.4 1667.2 0.0 0] [pos:Opal;1 600060000 344.5 2137.7 0.0 0] [pos:Opal;1 600060000 382.6 1768.0 0.0 0] [pos:Opal;1 600060000 810.3 1813.1 0.0 0] [pos:Opal;1 600060000 543.4 1667.2 0.0 0] [pos:Opal;1 600060000 435.3 1610.5 0.0 0] [pos:Opal;1 600060000 382.6 1768.0 0.0 0] [pos:Opal;1 600060000 291.5 1555.6 0.0 0] [pos:Opal;1 600060000 527.1 1852.5 0.0 0] [pos:Opal;1 600060000 1087.9 1741.5 0.0 0] [pos:Opal;1 600060000 696.4 1627.0 0.0 0] [pos:Opal;1 600060000 723.5 1561.9 0.0 0] [pos:Opal;1 600060000 842.7 1560.5 0.0 0] [pos:Opal;1 600060000 823.6 1514.5 0.0 0] [pos:Opal;1 600060000 978.6 1508.2 0.0 0] [pos:Opal;1 600060000 228.2 2894.6 0.0 0] [pos:Opal;1 600060000 126.9 2743.7 0.0 0] [pos:Opal;1 600060000 150.4 2637.2 0.0 0] [pos:Opal;1 600060000 249.9 2637.1 0.0 0] [pos:Opal;1 600060000 182.3 2020.9 0.0 0] [pos:Opal;1 600060000 237.8 2045.8 0.0 0] [pos:Opal;1 600060000 344.5 2137.7 0.0 0] [pos:Opal;1 600060000 422.4 2054.0 0.0 0] [pos:Opal;1 600060000 431.9 1973.2 0.0 0] [pos:Opal;1 600060000 499.9 1985.1 0.0 0] [pos:Opal;1 600060000 438.1 993.5 0.0 0] [pos:Opal;1 600060000 364.1 558.3 0.0 0] [pos:Opal;1 600060000 328.9 459.8 0.0 0] [pos:Opal;1 600060000 384.1 464.1 0.0 0] [pos:Opal;1 600060000 317.4 332.3 0.0 0] [pos:Opal;1 600060000 492.1 208.6 0.0 0] [pos:Opal;1 600060000 199.5 689.3 0.0 0] [pos:Opal;1 600060000 348.2 2747.9 0.0 0] [pos:Opal;1 600060000 448.8 2719.9 0.0 0] [pos:Opal;1 600060000 560.3 2633.1 0.0 0] [pos:Opal;1 600060000 688.2 2919.1 0.0 0] [pos:Opal;1 600060000 348.2 2747.9 0.0 0] [pos:Opal;1 600060000 185.1 1003.0 0.0 0] [pos:Opal;1 600060000 1087.9 1741.5 0.0 0] [pos:Opal;1 600060000 499.9 1985.0 0.0 0] [pos:Opal;1 600060000 384.1 464.1 0.0 0] [pos:Opal;1 600060000 978.6 1508.2 0.0 0] [pos:Opal;1 600060000 467.3 684.2 0.0 0] [pos:Opal;1 600060000 723.5 1561.9 0.0 0] [pos:Opal;1 600060000 126.9 2743.7 0.0 0] [pos:Opal;1 600060000 291.5 1555.6 0.0 0] [pos:Opal;1 600060000 431.9 1973.1 0.0 0] [pos:Opal;1 600060000 688.2 2919.1 0.0 0] [pos:Opal;1 600060000 438.1 993.5 0.0 0] [pos:Opal;1 600060000 182.3 2020.9 0.0 0] [pos:Opal;1 600060000 560.3 2633.1 0.0 0] [pos:Opal;1 600060000 448.8 2719.9 0.0 0] [pos:Opal;1 600060000 810.3 1813.1 0.0 0] [pos:Opal;1 600060000 422.4 2054.0 0.0 0] [pos:Opal;1 600060000 199.5 689.3 0.0 0] [pos:Opal;1 600060000 436.3 77.4 0.0 0] [pos:Opal;1 600060000 150.4 2637.2 0.0 0] [pos:Opal;1 600060000 435.3 1610.5 0.0 0] [pos:Opal;1 600060000 492.1 208.6 0.0 0] [pos:Opal;1 600060000 823.6 1514.5 0.0 0] [pos:Opal;1 600060000 527.1 1852.5 0.0 0] [pos:Opal;1 600060000 328.9 459.8 0.0 0] [pos:Opal;1 600060000 696.4 1627.0 0.0 0] [pos:Opal;1 600060000 842.7 1560.4 0.0 0] [pos:Opal;1 600060000 249.9 2637.1 0.0 0] [pos:Opal;1 600060000 364.1 558.3 0.0 0] [pos:Opal;1 600060000 237.8 2045.8 0.0 0] [pos:Opal;1 600060000 228.2 2894.6 0.0 0] [pos:Opal;1 600060000 317.4 332.3 0.0 0] [pos:Opal;1 600060000 543.4 1667.2 0.0 0] [pos:Opal;1 600060000 344.5 2137.7 0.0 0] [pos:Opal;1 600060000 382.6 1768.0 0.0 0] [pos:Opal;1 600060000 810.3 1813.1 0.0 0] [pos:Opal;1 600060000 543.4 1667.2 0.0 0] [pos:Opal;1 600060000 435.3 1610.5 0.0 0] [pos:Opal;1 600060000 382.6 1768.0 0.0 0] [pos:Opal;1 600060000 291.5 1555.6 0.0 0] [pos:Opal;1 600060000 527.1 1852.5 0.0 0] [pos:Opal;1 600060000 1087.9 1741.5 0.0 0] [pos:Opal;1 600060000 696.4 1627.0 0.0 0] [pos:Opal;1 600060000 723.5 1561.9 0.0 0] [pos:Opal;1 600060000 842.7 1560.5 0.0 0] [pos:Opal;1 600060000 823.6 1514.5 0.0 0] [pos:Opal;1 600060000 978.6 1508.2 0.0 0] [pos:Opal;1 600060000 228.2 2894.6 0.0 0] [pos:Opal;1 600060000 126.9 2743.7 0.0 0] [pos:Opal;1 600060000 150.4 2637.2 0.0 0] [pos:Opal;1 600060000 249.9 2637.1 0.0 0] [pos:Opal;1 600060000 182.3 2020.9 0.0 0] [pos:Opal;1 600060000 237.8 2045.8 0.0 0] [pos:Opal;1 600060000 344.5 2137.7 0.0 0] [pos:Opal;1 600060000 422.4 2054.0 0.0 0] [pos:Opal;1 600060000 431.9 1973.2 0.0 0] [pos:Opal;1 600060000 499.9 1985.1 0.0 0] [pos:Opal;1 600060000 438.1 993.5 0.0 0] [pos:Opal;1 600060000 364.1 558.3 0.0 0] [pos:Opal;1 600060000 328.9 459.8 0.0 0] [pos:Opal;1 600060000 384.1 464.1 0.0 0] [pos:Opal;1 600060000 317.4 332.3 0.0 0] [pos:Opal;1 600060000 492.1 208.6 0.0 0] [pos:Opal;1 600060000 199.5 689.3 0.0 0] [pos:Opal;1 600060000 348.2 2747.9 0.0 0] [pos:Opal;1 600060000 448.8 2719.9 0.0 0] [pos:Opal;1 600060000 560.3 2633.1 0.0 0] [pos:Opal;1 600060000 688.2 2919.1 0.0 0] [pos:Opal;1 600050000 2858.7 413.2 0.0 0] [pos:Opal;1 600050000 2631.8 373.1 0.0 0] [pos:Opal;1 600050000 784.9 313.1 0.0 0] [pos:Opal;1 600050000 2820.6 675.8 0.0 0] [pos:Opal;1 600050000 2828.9 1096.7 0.0 0] [pos:Opal;1 600050000 2652.2 2432.0 0.0 0] [pos:Opal;1 600050000 2557.4 2494.8 0.0 0] [pos:Opal;1 600050000 2791.9 2562.5 0.0 0] [pos:Opal;1 600050000 2528.0 2924.1 0.0 0] [pos:Opal;1 600050000 2731.8 2766.6 0.0 0] [pos:Opal;1 600050000 211.6 2352.1 0.0 0] [pos:Opal;1 600050000 2844.1 991.3 0.0 0] [pos:Opal;1 600050000 877.9 2802.3 0.0 0] [pos:Opal;1 600050000 517.4 2413.3 0.0 0] [pos:Opal;1 600050000 2850.7 2318.8 0.0 0] [pos:Opal;1 600050000 773.4 575.1 0.0 0] [pos:Opal;1 600050000 2689.8 2394.1 0.0 0] [pos:Opal;1 600050000 2948.3 1197.9 0.0 0] [pos:Opal;1 600050000 658.0 276.8 0.0 0] [pos:Opal;1 600050000 2805.8 1950.1 0.0 0] [pos:Opal;1 600050000 2840.4 850.3 0.0 0] [pos:Opal;1 600050000 850.8 2908.2 0.0 0] [pos:Opal;1 600050000 362.4 1146.2 0.0 0] [pos:Opal;1 600050000 2747.5 1825.6 0.0 0] [pos:Opal;1 600050000 840.1 173.7 0.0 0] [pos:Opal;1 600050000 2723.3 465.1 0.0 0] [pos:Opal;1 600050000 2679.8 384.9 0.0 0] [pos:Opal;1 600050000 2988.3 2132.7 0.0 0] [pos:Opal;1 600050000 2636.3 2741.7 0.0 0] [pos:Opal;1 600050000 2801.4 401.1 0.0 0] [pos:Opal;1 600050000 2507.4 2581.1 0.0 0] [pos:Opal;1 600050000 2687.5 2611.7 0.0 0] [pos:Opal;1 600050000 2760.1 1688.5 0.0 0] [pos:Opal;1 600050000 331.5 2103.6 0.0 0] [pos:Opal;1 600050000 2717.5 341.8 0.0 0] [pos:Opal;1 600050000 2598.7 2546.3 0.0 0] [pos:Opal;1 600050000 2892.4 2232.3 0.0 0] [pos:Opal;1 600050000 718.1 2812.8 0.0 0] [pos:Opal;1 600050000 675.6 2530.1 0.0 0] [pos:Opal;1 600050000 2777.1 2695.6 0.0 0] [pos:Opal;1 600050000 2859.8 1605.5 0.0 0] [pos:Opal;1 600050000 2495.5 2856.2 0.0 0] [pos:Opal;1 600050000 2836.5 281.8 0.0 0] [pos:Opal;1 600050000 623.1 749.3 0.0 0] [pos:Opal;1 600050000 169.1 1168.6 0.0 0] [pos:Opal;1 600050000 347.8 925.8 0.0 0] [pos:Opal;1 600050000 630.3 640.6 0.0 0] [pos:Opal;1 600050000 563.4 2433.0 0.0 0] [pos:Opal;1 600050000 171.3 2108.8 0.0 0] [pos:Opal;1 600050000 718.1 2812.8 0.0 0] [pos:Opal;1 600050000 877.9 2802.4 0.0 0] [pos:Opal;1 600050000 850.8 2908.2 0.0 0] [pos:Opal;1 600050000 2892.4 2232.3 0.0 0] [pos:Opal;1 600050000 2805.8 1950.1 0.0 0] [pos:Opal;1 600050000 2747.5 1825.6 0.0 0] [pos:Opal;1 600050000 2760.1 1688.5 0.0 0] [pos:Opal;1 600050000 2859.8 1605.5 0.0 0] [pos:Opal;1 600050000 211.6 2352.1 0.0 0] [pos:Opal;1 600050000 171.3 2108.8 0.0 0] [pos:Opal;1 600050000 2495.5 2856.2 0.0 0] [pos:Opal;1 600050000 2528.0 2924.1 0.0 0] [pos:Opal;1 600050000 2636.3 2741.7 0.0 0] [pos:Opal;1 600050000 2731.8 2766.6 0.0 0] [pos:Opal;1 600050000 2687.5 2611.7 0.0 0] [pos:Opal;1 600050000 2777.1 2695.6 0.0 0] [pos:Opal;1 600050000 2791.9 2562.6 0.0 0] [pos:Opal;1 600050000 2836.5 281.8 0.0 0] [pos:Opal;1 600050000 331.5 2103.6 0.0 0] [pos:Opal;1 600050000 362.4 1146.2 0.0 0] [pos:Opal;1 600050000 347.8 925.8 0.0 0] [pos:Opal;1 600050000 840.1 173.7 0.0 0] [pos:Opal;1 600050000 784.9 313.1 0.0 0] [pos:Opal;1 600050000 658.0 276.8 0.0 0] [pos:Opal;1 600050000 517.4 2413.3 0.0 0] [pos:Opal;1 600050000 563.4 2433.0 0.0 0] [pos:Opal;1 600050000 675.6 2530.2 0.0 0] [pos:Opal;1 600050000 2717.5 341.8 0.0 0] [pos:Opal;1 600050000 2679.8 384.9 0.0 0] [pos:Opal;1 600050000 2801.4 401.1 0.0 0] [pos:Opal;1 600050000 2858.7 413.2 0.0 0] [pos:Opal;1 600050000 2820.6 675.8 0.0 0] [pos:Opal;1 600050000 2840.4 850.3 0.0 0] [pos:Opal;1 600050000 2844.1 991.3 0.0 0] [pos:Opal;1 600050000 2828.9 1096.7 0.0 0] [pos:Opal;1 600050000 2948.3 1197.9 0.0 0] [pos:Opal;1 600050000 2850.7 2318.8 0.0 0] [pos:Opal;1 600050000 2689.8 2394.1 0.0 0] [pos:Opal;1 600050000 2652.2 2432.0 0.0 0] [pos:Opal;1 600050000 2557.4 2494.8 0.0 0] [pos:Opal;1 600050000 2598.7 2546.3 0.0 0] [pos:Opal;1 600050000 2507.4 2581.1 0.0 0] [pos:Opal;1 600050000 169.1 1168.6 0.0 0] [pos:Opal;1 600050000 2631.8 373.1 0.0 0] [pos:Opal;1 600050000 2723.3 465.1 0.0 0] ';
                }
                break;
            case 'Ceramium':
                popupTitle.textContent = 'Серамиум';
                if (selectedRace === 'elyos') {
                    popupTextarea.value = '[pos:Ceramium;0 600060000 993.8 1130.2 0.0 0] [pos:Ceramium;0 600060000 2085.6 285.5 0.0 0] [pos:Ceramium;0 600060000 716.6 371.3 0.0 0] [pos:Ceramium;0 600060000 982.2 1219.5 0.0 0] [pos:Ceramium;0 600060000 837.4 436.5 0.0 0] [pos:Ceramium;0 600060000 1871.6 231.0 0.0 0] [pos:Ceramium;0 600060000 899.7 1143.7 0.0 0] [pos:Ceramium;0 600060000 2211.7 417.9 0.0 0] [pos:Ceramium;0 600060000 800.9 1117.8 0.0 0] [pos:Ceramium;0 600060000 701.4 1170.2 0.0 0] [pos:Ceramium;0 600060000 1771.6 173.8 0.0 0] [pos:Ceramium;0 600060000 897.2 448.8 0.0 0] [pos:Ceramium;0 600060000 1417.1 412.2 0.0 0] [pos:Ceramium;0 600060000 1800.3 255.2 0.0 0] [pos:Ceramium;0 600060000 1031.5 451.0 0.0 0] [pos:Ceramium;0 600060000 855.3 1222.4 0.0 0] [pos:Ceramium;0 600060000 1953.6 155.9 0.0 0] [pos:Ceramium;0 600060000 963.3 355.8 0.0 0] [pos:Ceramium;0 600060000 2330.6 282.3 0.0 0] [pos:Ceramium;0 600060000 740.4 302.5 0.0 0] [pos:Ceramium;0 600060000 2004.7 447.8 0.0 0] [pos:Ceramium;0 600060000 1650.8 307.4 0.0 0] [pos:Ceramium;0 600060000 2014.4 240.6 0.0 0] [pos:Ceramium;0 600060000 1809.8 125.2 0.0 0] [pos:Ceramium;0 600060000 1494.8 286.0 0.0 0] [pos:Ceramium;0 600060000 839.6 1131.4 0.0 0] [pos:Ceramium;0 600060000 2200.9 308.5 0.0 0] [pos:Ceramium;0 600060000 1967.3 101.4 0.0 0] [pos:Ceramium;0 600060000 2072.9 110.6 0.0 0] [pos:Ceramium;0 600060000 755.3 1216.5 0.0 0] [pos:Ceramium;0 600060000 2277.0 403.6 0.0 0] [pos:Ceramium;0 600060000 971.4 1247.3 0.0 0] [pos:Ceramium;0 600060000 799.6 415.4 0.0 0] [pos:Ceramium;0 600060000 1945.1 284.8 0.0 0] [pos:Ceramium;0 600060000 1907.6 99.6 0.0 0] [pos:Ceramium;0 600060000 1356.8 316.8 0.0 0] [pos:Ceramium;0 600060000 2066.1 414.1 0.0 0] [pos:Ceramium;0 600060000 2074.6 177.8 0.0 0] [pos:Ceramium;0 600060000 834.2 348.1 0.0 0] [pos:Ceramium;0 600060000 1828.3 173.7 0.0 0] [pos:Ceramium;0 600060000 755.3 1216.5 0.0 0] [pos:Ceramium;0 600060000 855.3 1222.4 0.0 0] [pos:Ceramium;0 600060000 971.4 1247.3 0.0 0] [pos:Ceramium;0 600060000 899.7 1143.7 0.0 0] [pos:Ceramium;0 600060000 982.2 1219.5 0.0 0] [pos:Ceramium;0 600060000 993.8 1130.3 0.0 0] [pos:Ceramium;0 600060000 839.6 1131.4 0.0 0] [pos:Ceramium;0 600060000 800.9 1117.9 0.0 0] [pos:Ceramium;0 600060000 701.4 1170.2 0.0 0] [pos:Ceramium;0 600060000 2211.7 417.9 0.0 0] [pos:Ceramium;0 600060000 2277.0 403.6 0.0 0] [pos:Ceramium;0 600060000 740.4 302.5 0.0 0] [pos:Ceramium;0 600060000 834.2 348.1 0.0 0] [pos:Ceramium;0 600060000 716.6 371.3 0.0 0] [pos:Ceramium;0 600060000 2330.6 282.3 0.0 0] [pos:Ceramium;0 600060000 799.6 415.4 0.0 0] [pos:Ceramium;0 600060000 837.4 436.5 0.0 0] [pos:Ceramium;0 600060000 897.2 448.8 0.0 0] [pos:Ceramium;0 600060000 963.3 355.8 0.0 0] [pos:Ceramium;0 600060000 1031.5 451.0 0.0 0] [pos:Ceramium;0 600060000 1356.8 316.8 0.0 0] [pos:Ceramium;0 600060000 2200.9 308.5 0.0 0] [pos:Ceramium;0 600050000 730.2 343.3 0.0 0] [pos:Ceramium;0 600050000 1706.6 1431.0 0.0 0] [pos:Ceramium;0 600050000 1840.2 1348.0 0.0 0] [pos:Ceramium;0 600050000 1758.0 1323.2 0.0 0] [pos:Ceramium;0 600050000 791.7 291.1 0.0 0] [pos:Ceramium;0 600050000 2267.7 1934.2 0.0 0] [pos:Ceramium;0 600050000 709.8 2686.1 0.0 0] [pos:Ceramium;0 600050000 1909.6 1254.6 0.0 0] [pos:Ceramium;0 600050000 624.6 661.0 0.0 0] [pos:Ceramium;0 600050000 205.9 2123.4 0.0 0] [pos:Ceramium;0 600050000 1746.9 1508.5 0.0 0] [pos:Ceramium;0 600050000 1907.3 1598.5 0.0 0] [pos:Ceramium;0 600050000 2413.7 2040.1 0.0 0] [pos:Ceramium;0 600050000 2414.7 1850.3 0.0 0] [pos:Ceramium;0 600050000 2175.4 1902.0 0.0 0] [pos:Ceramium;0 600050000 198.5 1219.3 0.0 0] [pos:Ceramium;0 600050000 1950.1 1206.8 0.0 0] [pos:Ceramium;0 600050000 2423.5 1915.0 0.0 0] [pos:Ceramium;0 600050000 2238.7 1821.2 0.0 0] [pos:Ceramium;0 600050000 246.5 2236.3 0.0 0] [pos:Ceramium;0 600050000 797.7 514.5 0.0 0] [pos:Ceramium;0 600050000 357.7 1184.0 0.0 0] [pos:Ceramium;0 600050000 2270.0 1893.6 0.0 0] [pos:Ceramium;0 600050000 2203.8 1980.5 0.0 0] [pos:Ceramium;0 600050000 1970.0 1629.2 0.0 0] [pos:Ceramium;0 600050000 2279.9 1841.6 0.0 0] [pos:Ceramium;0 600050000 498.6 1116.4 0.0 0] [pos:Ceramium;0 600050000 425.3 2413.7 0.0 0] [pos:Ceramium;0 600050000 1795.8 1512.1 0.0 0] [pos:Ceramium;0 600050000 583.8 2558.9 0.0 0] [pos:Ceramium;0 600050000 1730.6 1373.1 0.0 0] [pos:Ceramium;0 600050000 723.1 571.1 0.0 0] [pos:Ceramium;0 600050000 2142.6 1844.3 0.0 0] [pos:Ceramium;0 600050000 1846.1 1485.8 0.0 0] [pos:Ceramium;0 600050000 169.2 2373.9 0.0 0] [pos:Ceramium;0 600050000 1787.3 1422.5 0.0 0] [pos:Ceramium;0 600050000 2351.3 1877.2 0.0 0] [pos:Ceramium;0 600050000 2141.8 1880.8 0.0 0] [pos:Ceramium;0 600050000 642.0 2865.6 0.0 0] [pos:Ceramium;0 600050000 800.4 2675.6 0.0 0] [pos:Ceramium;0 600050000 409.4 2412.6 0.0 0] [pos:Ceramium;0 600050000 921.2 146.7 0.0 0] [pos:Ceramium;0 600050000 2220.4 1866.5 0.0 0] [pos:Ceramium;0 600050000 1875.6 1500.1 0.0 0] [pos:Ceramium;0 600050000 642.0 2865.6 0.0 0] [pos:Ceramium;0 600050000 800.4 2675.6 0.0 0] [pos:Ceramium;0 600050000 2279.9 1841.6 0.0 0] [pos:Ceramium;0 600050000 2414.7 1850.3 0.0 0] [pos:Ceramium;0 600050000 2351.3 1877.2 0.0 0] [pos:Ceramium;0 600050000 2423.5 1915.0 0.0 0] [pos:Ceramium;0 600050000 2413.7 2040.1 0.0 0] [pos:Ceramium;0 600050000 169.2 2373.9 0.0 0] [pos:Ceramium;0 600050000 246.5 2236.3 0.0 0] [pos:Ceramium;0 600050000 205.9 2123.5 0.0 0] [pos:Ceramium;0 600050000 2270.0 1893.6 0.0 0] [pos:Ceramium;0 600050000 1950.1 1206.8 0.0 0] [pos:Ceramium;0 600050000 1909.6 1254.6 0.0 0] [pos:Ceramium;0 600050000 1970.0 1629.2 0.0 0] [pos:Ceramium;0 600050000 1907.3 1598.6 0.0 0] [pos:Ceramium;0 600050000 1875.6 1500.1 0.0 0] [pos:Ceramium;0 600050000 1846.1 1485.8 0.0 0] [pos:Ceramium;0 600050000 1795.9 1512.1 0.0 0] [pos:Ceramium;0 600050000 1787.3 1422.5 0.0 0] [pos:Ceramium;0 600050000 1746.9 1508.5 0.0 0] [pos:Ceramium;0 600050000 2142.6 1844.3 0.0 0] [pos:Ceramium;0 600050000 2141.8 1880.8 0.0 0] [pos:Ceramium;0 600050000 2175.4 1902.0 0.0 0] [pos:Ceramium;0 600050000 2238.7 1821.2 0.0 0] [pos:Ceramium;0 600050000 2220.4 1866.5 0.0 0] [pos:Ceramium;0 600050000 2267.7 1934.2 0.0 0] [pos:Ceramium;0 600050000 1706.6 1431.0 0.0 0] [pos:Ceramium;0 600050000 1730.6 1373.1 0.0 0] [pos:Ceramium;0 600050000 1840.2 1348.0 0.0 0] [pos:Ceramium;0 600050000 1758.0 1323.2 0.0 0] [pos:Ceramium;0 600050000 198.5 1219.3 0.0 0] [pos:Ceramium;0 600050000 357.7 1184.0 0.0 0] [pos:Ceramium;0 600050000 498.6 1116.4 0.0 0] [pos:Ceramium;0 600050000 921.2 146.7 0.0 0] [pos:Ceramium;0 600050000 791.7 291.1 0.0 0] [pos:Ceramium;0 600050000 730.2 343.3 0.0 0] [pos:Ceramium;0 600050000 409.4 2412.6 0.0 0] [pos:Ceramium;0 600050000 425.3 2413.7 0.0 0] [pos:Ceramium;0 600050000 583.8 2558.9 0.0 0] [pos:Ceramium;0 600050000 709.8 2686.1 0.0 0] [pos:Ceramium;0 600050000 2203.8 1980.6 0.0 0] ';
                } else if (selectedRace === 'asmodian') {
                    popupTextarea.value = '[pos:Ceramium;1 600060000 993.8 1130.2 0.0 0] [pos:Ceramium;1 600060000 2085.6 285.5 0.0 0] [pos:Ceramium;1 600060000 716.6 371.3 0.0 0] [pos:Ceramium;1 600060000 982.2 1219.5 0.0 0] [pos:Ceramium;1 600060000 837.4 436.5 0.0 0] [pos:Ceramium;1 600060000 1871.6 231.0 0.0 0] [pos:Ceramium;1 600060000 899.7 1143.7 0.0 0] [pos:Ceramium;1 600060000 2211.7 417.9 0.0 0] [pos:Ceramium;1 600060000 800.9 1117.8 0.0 0] [pos:Ceramium;1 600060000 701.4 1170.2 0.0 0] [pos:Ceramium;1 600060000 1771.6 173.8 0.0 0] [pos:Ceramium;1 600060000 897.2 448.8 0.0 0] [pos:Ceramium;1 600060000 1417.1 412.2 0.0 0] [pos:Ceramium;1 600060000 1800.3 255.2 0.0 0] [pos:Ceramium;1 600060000 1031.5 451.0 0.0 0] [pos:Ceramium;1 600060000 855.3 1222.4 0.0 0] [pos:Ceramium;1 600060000 1953.6 155.9 0.0 0] [pos:Ceramium;1 600060000 963.3 355.8 0.0 0] [pos:Ceramium;1 600060000 2330.6 282.3 0.0 0] [pos:Ceramium;1 600060000 740.4 302.5 0.0 0] [pos:Ceramium;1 600060000 2004.7 447.8 0.0 0] [pos:Ceramium;1 600060000 1650.8 307.4 0.0 0] [pos:Ceramium;1 600060000 2014.4 240.6 0.0 0] [pos:Ceramium;1 600060000 1809.8 125.2 0.0 0] [pos:Ceramium;1 600060000 1494.8 286.0 0.0 0] [pos:Ceramium;1 600060000 839.6 1131.4 0.0 0] [pos:Ceramium;1 600060000 2200.9 308.5 0.0 0] [pos:Ceramium;1 600060000 1967.3 101.4 0.0 0] [pos:Ceramium;1 600060000 2072.9 110.6 0.0 0] [pos:Ceramium;1 600060000 755.3 1216.5 0.0 0] [pos:Ceramium;1 600060000 2277.0 403.6 0.0 0] [pos:Ceramium;1 600060000 971.4 1247.3 0.0 0] [pos:Ceramium;1 600060000 799.6 415.4 0.0 0] [pos:Ceramium;1 600060000 1945.1 284.8 0.0 0] [pos:Ceramium;1 600060000 1907.6 99.6 0.0 0] [pos:Ceramium;1 600060000 1356.8 316.8 0.0 0] [pos:Ceramium;1 600060000 2066.1 414.1 0.0 0] [pos:Ceramium;1 600060000 2074.6 177.8 0.0 0] [pos:Ceramium;1 600060000 834.2 348.1 0.0 0] [pos:Ceramium;1 600060000 1828.3 173.7 0.0 0] [pos:Ceramium;1 600060000 755.3 1216.5 0.0 0] [pos:Ceramium;1 600060000 855.3 1222.4 0.0 0] [pos:Ceramium;1 600060000 971.4 1247.3 0.0 0] [pos:Ceramium;1 600060000 899.7 1143.7 0.0 0] [pos:Ceramium;1 600060000 982.2 1219.5 0.0 0] [pos:Ceramium;1 600060000 993.8 1130.3 0.0 0] [pos:Ceramium;1 600060000 839.6 1131.4 0.0 0] [pos:Ceramium;1 600060000 800.9 1117.9 0.0 0] [pos:Ceramium;1 600060000 701.4 1170.2 0.0 0] [pos:Ceramium;1 600060000 2211.7 417.9 0.0 0] [pos:Ceramium;1 600060000 2277.0 403.6 0.0 0] [pos:Ceramium;1 600060000 740.4 302.5 0.0 0] [pos:Ceramium;1 600060000 834.2 348.1 0.0 0] [pos:Ceramium;1 600060000 716.6 371.3 0.0 0] [pos:Ceramium;1 600060000 2330.6 282.3 0.0 0] [pos:Ceramium;1 600060000 799.6 415.4 0.0 0] [pos:Ceramium;1 600060000 837.4 436.5 0.0 0] [pos:Ceramium;1 600060000 897.2 448.8 0.0 0] [pos:Ceramium;1 600060000 963.3 355.8 0.0 0] [pos:Ceramium;1 600060000 1031.5 451.0 0.0 0] [pos:Ceramium;1 600060000 1356.8 316.8 0.0 0] [pos:Ceramium;1 600060000 2200.9 308.5 0.0 0] [pos:Ceramium;1 600050000 730.2 343.3 0.0 0] [pos:Ceramium;1 600050000 1706.6 1431.0 0.0 0] [pos:Ceramium;1 600050000 1840.2 1348.0 0.0 0] [pos:Ceramium;1 600050000 1758.0 1323.2 0.0 0] [pos:Ceramium;1 600050000 791.7 291.1 0.0 0] [pos:Ceramium;1 600050000 2267.7 1934.2 0.0 0] [pos:Ceramium;1 600050000 709.8 2686.1 0.0 0] [pos:Ceramium;1 600050000 1909.6 1254.6 0.0 0] [pos:Ceramium;1 600050000 624.6 661.0 0.0 0] [pos:Ceramium;1 600050000 205.9 2123.4 0.0 0] [pos:Ceramium;1 600050000 1746.9 1508.5 0.0 0] [pos:Ceramium;1 600050000 1907.3 1598.5 0.0 0] [pos:Ceramium;1 600050000 2413.7 2040.1 0.0 0] [pos:Ceramium;1 600050000 2414.7 1850.3 0.0 0] [pos:Ceramium;1 600050000 2175.4 1902.0 0.0 0] [pos:Ceramium;1 600050000 198.5 1219.3 0.0 0] [pos:Ceramium;1 600050000 1950.1 1206.8 0.0 0] [pos:Ceramium;1 600050000 2423.5 1915.0 0.0 0] [pos:Ceramium;1 600050000 2238.7 1821.2 0.0 0] [pos:Ceramium;1 600050000 246.5 2236.3 0.0 0] [pos:Ceramium;1 600050000 797.7 514.5 0.0 0] [pos:Ceramium;1 600050000 357.7 1184.0 0.0 0] [pos:Ceramium;1 600050000 2270.0 1893.6 0.0 0] [pos:Ceramium;1 600050000 2203.8 1980.5 0.0 0] [pos:Ceramium;1 600050000 1970.0 1629.2 0.0 0] [pos:Ceramium;1 600050000 2279.9 1841.6 0.0 0] [pos:Ceramium;1 600050000 498.6 1116.4 0.0 0] [pos:Ceramium;1 600050000 425.3 2413.7 0.0 0] [pos:Ceramium;1 600050000 1795.8 1512.1 0.0 0] [pos:Ceramium;1 600050000 583.8 2558.9 0.0 0] [pos:Ceramium;1 600050000 1730.6 1373.1 0.0 0] [pos:Ceramium;1 600050000 723.1 571.1 0.0 0] [pos:Ceramium;1 600050000 2142.6 1844.3 0.0 0] [pos:Ceramium;1 600050000 1846.1 1485.8 0.0 0] [pos:Ceramium;1 600050000 169.2 2373.9 0.0 0] [pos:Ceramium;1 600050000 1787.3 1422.5 0.0 0] [pos:Ceramium;1 600050000 2351.3 1877.2 0.0 0] [pos:Ceramium;1 600050000 2141.8 1880.8 0.0 0] [pos:Ceramium;1 600050000 642.0 2865.6 0.0 0] [pos:Ceramium;1 600050000 800.4 2675.6 0.0 0] [pos:Ceramium;1 600050000 409.4 2412.6 0.0 0] [pos:Ceramium;1 600050000 921.2 146.7 0.0 0] [pos:Ceramium;1 600050000 2220.4 1866.5 0.0 0] [pos:Ceramium;1 600050000 1875.6 1500.1 0.0 0] [pos:Ceramium;1 600050000 642.0 2865.6 0.0 0] [pos:Ceramium;1 600050000 800.4 2675.6 0.0 0] [pos:Ceramium;1 600050000 2279.9 1841.6 0.0 0] [pos:Ceramium;1 600050000 2414.7 1850.3 0.0 0] [pos:Ceramium;1 600050000 2351.3 1877.2 0.0 0] [pos:Ceramium;1 600050000 2423.5 1915.0 0.0 0] [pos:Ceramium;1 600050000 2413.7 2040.1 0.0 0] [pos:Ceramium;1 600050000 169.2 2373.9 0.0 0] [pos:Ceramium;1 600050000 246.5 2236.3 0.0 0] [pos:Ceramium;1 600050000 205.9 2123.5 0.0 0] [pos:Ceramium;1 600050000 2270.0 1893.6 0.0 0] [pos:Ceramium;1 600050000 1950.1 1206.8 0.0 0] [pos:Ceramium;1 600050000 1909.6 1254.6 0.0 0] [pos:Ceramium;1 600050000 1970.0 1629.2 0.0 0] [pos:Ceramium;1 600050000 1907.3 1598.6 0.0 0] [pos:Ceramium;1 600050000 1875.6 1500.1 0.0 0] [pos:Ceramium;1 600050000 1846.1 1485.8 0.0 0] [pos:Ceramium;1 600050000 1795.9 1512.1 0.0 0] [pos:Ceramium;1 600050000 1787.3 1422.5 0.0 0] [pos:Ceramium;1 600050000 1746.9 1508.5 0.0 0] [pos:Ceramium;1 600050000 2142.6 1844.3 0.0 0] [pos:Ceramium;1 600050000 2141.8 1880.8 0.0 0] [pos:Ceramium;1 600050000 2175.4 1902.0 0.0 0] [pos:Ceramium;1 600050000 2238.7 1821.2 0.0 0] [pos:Ceramium;1 600050000 2220.4 1866.5 0.0 0] [pos:Ceramium;1 600050000 2267.7 1934.2 0.0 0] [pos:Ceramium;1 600050000 1706.6 1431.0 0.0 0] [pos:Ceramium;1 600050000 1730.6 1373.1 0.0 0] [pos:Ceramium;1 600050000 1840.2 1348.0 0.0 0] [pos:Ceramium;1 600050000 1758.0 1323.2 0.0 0] [pos:Ceramium;1 600050000 198.5 1219.3 0.0 0] [pos:Ceramium;1 600050000 357.7 1184.0 0.0 0] [pos:Ceramium;1 600050000 498.6 1116.4 0.0 0] [pos:Ceramium;1 600050000 921.2 146.7 0.0 0] [pos:Ceramium;1 600050000 791.7 291.1 0.0 0] [pos:Ceramium;1 600050000 730.2 343.3 0.0 0] [pos:Ceramium;1 600050000 409.4 2412.6 0.0 0] [pos:Ceramium;1 600050000 425.3 2413.7 0.0 0] [pos:Ceramium;1 600050000 583.8 2558.9 0.0 0] [pos:Ceramium;1 600050000 709.8 2686.1 0.0 0] [pos:Ceramium;1 600050000 2203.8 1980.6 0.0 0] ';
                }
                break;
            case 'Aether':
                popupTitle.textContent = 'Древний эфир';
                if (selectedRace === 'elyos') {
                    popupTextarea.value = '[pos:Ancient Aether;0 600060000 1757.4 1057.7 0.0 0] [pos:Ancient Aether;0 600060000 1738.0 885.5 0.0 0] [pos:Ancient Aether;0 600060000 1476.7 1009.1 0.0 0] [pos:Ancient Aether;0 600060000 1640.4 1067.5 0.0 0] [pos:Ancient Aether;0 600060000 1888.4 867.2 0.0 0] [pos:Ancient Aether;0 600060000 1646.1 980.1 0.0 0] [pos:Ancient Aether;0 600060000 1785.1 645.0 0.0 0] [pos:Ancient Aether;0 600060000 1608.4 1014.8 0.0 0] [pos:Ancient Aether;0 600060000 1633.6 826.9 0.0 0] [pos:Ancient Aether;0 600060000 1589.4 777.4 0.0 0] [pos:Ancient Aether;0 600060000 1508.2 965.4 0.0 0] [pos:Ancient Aether;0 600060000 1432.2 1130.3 0.0 0] [pos:Ancient Aether;0 600060000 1691.4 1000.5 0.0 0] [pos:Ancient Aether;0 600060000 1756.8 724.8 0.0 0] [pos:Ancient Aether;0 600060000 1472.2 1080.5 0.0 0] [pos:Ancient Aether;0 600060000 1357.8 997.1 0.0 0] [pos:Ancient Aether;0 600060000 1611.2 1058.8 0.0 0] [pos:Ancient Aether;0 600060000 1655.2 725.9 0.0 0] [pos:Ancient Aether;0 600060000 1803.2 844.1 0.0 0] [pos:Ancient Aether;0 600060000 1610.1 870.1 0.0 0] [pos:Ancient Aether;0 600060000 1462.8 910.1 0.0 0] [pos:Ancient Aether;0 600060000 1574.2 1100.3 0.0 0] [pos:Ancient Aether;0 600060000 1675.2 805.3 0.0 0] [pos:Ancient Aether;0 600060000 1574.3 1100.5 0.0 0] [pos:Ancient Aether;0 600060000 1502.0 888.8 0.0 0] [pos:Ancient Aether;0 600060000 1343.4 1045.0 0.0 0] [pos:Ancient Aether;0 600060000 1519.7 1107.6 0.0 0] [pos:Ancient Aether;0 600060000 1668.7 947.2 0.0 0] [pos:Ancient Aether;0 600060000 1614.1 935.3 0.0 0] [pos:Ancient Aether;0 600060000 1501.3 1055.1 0.0 0] [pos:Ancient Aether;0 600060000 1526.9 894.7 0.0 0] [pos:Ancient Aether;0 600060000 1732.7 795.6 0.0 0] [pos:Ancient Aether;0 600060000 1698.2 926.7 0.0 0] [pos:Ancient Aether;0 600060000 1867.7 769.1 0.0 0] [pos:Ancient Aether;0 600060000 1562.7 811.8 0.0 0] [pos:Ancient Aether;0 600060000 1835.3 669.4 0.0 0] [pos:Ancient Aether;0 600060000 1435.9 1038.7 0.0 0] [pos:Ancient Aether;0 600060000 1920.0 804.3 0.0 0] [pos:Ancient Aether;0 600060000 1858.9 705.5 0.0 0] [pos:Ancient Aether;0 600060000 1632.0 915.9 0.0 0] [pos:Ancient Aether;0 600060000 1814.3 900.7 0.0 0] [pos:Ancient Aether;0 600060000 1555.4 1068.9 0.0 0] [pos:Ancient Aether;0 600060000 1585.9 881.7 0.0 0] [pos:Ancient Aether;0 600060000 1551.5 970.8 0.0 0] [pos:Ancient Aether;0 600060000 1801.4 727.5 0.0 0] [pos:Ancient Aether;0 600060000 1803.2 844.1 0.0 0] [pos:Ancient Aether;0 600060000 1698.2 926.7 0.0 0] [pos:Ancient Aether;0 600060000 1738.0 885.5 0.0 0] [pos:Ancient Aether;0 600060000 1632.0 915.9 0.0 0] [pos:Ancient Aether;0 600060000 1585.9 881.7 0.0 0] [pos:Ancient Aether;0 600060000 1610.1 870.1 0.0 0] [pos:Ancient Aether;0 600060000 1562.7 811.8 0.0 0] [pos:Ancient Aether;0 600060000 1502.0 888.8 0.0 0] [pos:Ancient Aether;0 600060000 1633.6 826.9 0.0 0] [pos:Ancient Aether;0 600060000 1589.4 777.4 0.0 0] [pos:Ancient Aether;0 600060000 1675.2 805.3 0.0 0] [pos:Ancient Aether;0 600060000 1756.8 724.8 0.0 0] [pos:Ancient Aether;0 600060000 1814.3 900.7 0.0 0] [pos:Ancient Aether;0 600060000 1668.7 947.2 0.0 0] [pos:Ancient Aether;0 600060000 1614.1 935.3 0.0 0] [pos:Ancient Aether;0 600060000 1646.1 980.1 0.0 0] [pos:Ancient Aether;0 600060000 1691.4 1000.5 0.0 0] [pos:Ancient Aether;0 600060000 1608.4 1014.8 0.0 0] [pos:Ancient Aether;0 600060000 1611.2 1058.9 0.0 0] [pos:Ancient Aether;0 600060000 1640.4 1067.5 0.0 0] [pos:Ancient Aether;0 600060000 1526.9 894.7 0.0 0] [pos:Ancient Aether;0 600060000 1462.8 910.1 0.0 0] [pos:Ancient Aether;0 600060000 1508.2 965.4 0.0 0] [pos:Ancient Aether;0 600060000 1655.2 725.9 0.0 0] [pos:Ancient Aether;0 600060000 1732.7 795.6 0.0 0] [pos:Ancient Aether;0 600060000 1555.4 1068.9 0.0 0] [pos:Ancient Aether;0 600060000 1574.3 1100.3 0.0 0] [pos:Ancient Aether;0 600060000 1574.3 1100.5 0.0 0] [pos:Ancient Aether;0 600060000 1519.7 1107.6 0.0 0] [pos:Ancient Aether;0 600060000 1472.2 1080.5 0.0 0] [pos:Ancient Aether;0 600060000 1757.4 1057.7 0.0 0] [pos:Ancient Aether;0 600060000 1435.9 1038.7 0.0 0] [pos:Ancient Aether;0 600060000 1476.7 1009.1 0.0 0] [pos:Ancient Aether;0 600060000 1888.4 867.2 0.0 0] [pos:Ancient Aether;0 600060000 1867.7 769.1 0.0 0] [pos:Ancient Aether;0 600060000 1801.4 727.5 0.0 0] [pos:Ancient Aether;0 600060000 1858.9 705.5 0.0 0] [pos:Ancient Aether;0 600060000 1835.3 669.4 0.0 0] [pos:Ancient Aether;0 600060000 1785.2 645.0 0.0 0] [pos:Ancient Aether;0 600060000 1920.0 804.3 0.0 0] [pos:Ancient Aether;0 600060000 1501.3 1055.1 0.0 0] [pos:Ancient Aether;0 600060000 1343.4 1045.0 0.0 0] [pos:Ancient Aether;0 600060000 1357.8 997.1 0.0 0] [pos:Ancient Aether;0 600050000 219.4 2637.0 0.0 0] [pos:Ancient Aether;0 600050000 334.3 2588.6 0.0 0] [pos:Ancient Aether;0 600050000 245.6 265.1 0.0 0] [pos:Ancient Aether;0 600050000 281.4 2806.8 0.0 0] [pos:Ancient Aether;0 600050000 397.3 2659.4 0.0 0] [pos:Ancient Aether;0 600050000 263.5 277.6 0.0 0] [pos:Ancient Aether;0 600050000 177.1 244.5 0.0 0] [pos:Ancient Aether;0 600050000 286.7 274.1 0.0 0] [pos:Ancient Aether;0 600050000 316.6 2661.5 0.0 0] [pos:Ancient Aether;0 600050000 244.8 435.7 0.0 0] [pos:Ancient Aether;0 600050000 230.1 311.9 0.0 0] [pos:Ancient Aether;0 600050000 194.3 407.8 0.0 0] [pos:Ancient Aether;0 600050000 162.4 287.0 0.0 0] [pos:Ancient Aether;0 600050000 201.6 326.4 0.0 0] [pos:Ancient Aether;0 600050000 396.0 2746.2 0.0 0] [pos:Ancient Aether;0 600050000 178.4 279.7 0.0 0] [pos:Ancient Aether;0 600050000 314.1 244.8 0.0 0] [pos:Ancient Aether;0 600050000 125.5 2878.2 0.0 0] [pos:Ancient Aether;0 600050000 238.8 360.3 0.0 0] [pos:Ancient Aether;0 600050000 216.0 2753.8 0.0 0] [pos:Ancient Aether;0 600050000 235.4 234.3 0.0 0] [pos:Ancient Aether;0 600050000 234.8 2668.1 0.0 0] [pos:Ancient Aether;0 600050000 189.3 452.9 0.0 0] [pos:Ancient Aether;0 600050000 441.5 2716.4 0.0 0] [pos:Ancient Aether;0 600050000 234.4 2845.3 0.0 0] [pos:Ancient Aether;0 600050000 272.2 2739.8 0.0 0] [pos:Ancient Aether;0 600050000 181.2 346.5 0.0 0] [pos:Ancient Aether;0 600050000 247.9 2949.4 0.0 0] [pos:Ancient Aether;0 600050000 424.6 2870.0 0.0 0] [pos:Ancient Aether;0 600050000 416.7 2687.2 0.0 0] [pos:Ancient Aether;0 600050000 397.3 2659.4 0.0 0] [pos:Ancient Aether;0 600050000 416.7 2687.2 0.0 0] [pos:Ancient Aether;0 600050000 441.5 2716.4 0.0 0] [pos:Ancient Aether;0 600050000 396.0 2746.2 0.0 0] [pos:Ancient Aether;0 600050000 316.6 2661.6 0.0 0] [pos:Ancient Aether;0 600050000 272.2 2739.8 0.0 0] [pos:Ancient Aether;0 600050000 234.8 2668.1 0.0 0] [pos:Ancient Aether;0 600050000 281.4 2806.8 0.0 0] [pos:Ancient Aether;0 600050000 424.6 2870.0 0.0 0] [pos:Ancient Aether;0 600050000 334.3 2588.6 0.0 0] [pos:Ancient Aether;0 600050000 234.4 2845.4 0.0 0] [pos:Ancient Aether;0 600050000 216.0 2753.8 0.0 0] [pos:Ancient Aether;0 600050000 125.5 2878.2 0.0 0] [pos:Ancient Aether;0 600050000 219.4 2637.0 0.0 0] [pos:Ancient Aether;0 600050000 247.9 2949.4 0.0 0] [pos:Ancient Aether;0 600050000 314.1 244.8 0.0 0] [pos:Ancient Aether;0 600050000 189.3 452.9 0.0 0] [pos:Ancient Aether;0 600050000 194.3 407.8 0.0 0] [pos:Ancient Aether;0 600050000 244.8 435.7 0.0 0] [pos:Ancient Aether;0 600050000 238.8 360.3 0.0 0] [pos:Ancient Aether;0 600050000 286.7 274.1 0.0 0] [pos:Ancient Aether;0 600050000 263.5 277.6 0.0 0] [pos:Ancient Aether;0 600050000 245.6 265.1 0.0 0] [pos:Ancient Aether;0 600050000 230.1 311.9 0.0 0] [pos:Ancient Aether;0 600050000 201.6 326.4 0.0 0] [pos:Ancient Aether;0 600050000 235.4 234.3 0.0 0] [pos:Ancient Aether;0 600050000 178.4 279.7 0.0 0] [pos:Ancient Aether;0 600050000 181.2 346.5 0.0 0] [pos:Ancient Aether;0 600050000 177.1 244.5 0.0 0] [pos:Ancient Aether;0 600050000 162.4 287.0 0.0 0] ';
                } else if (selectedRace === 'asmodian') {
                    popupTextarea.value = '[pos:Ancient Aether;1 600060000 1757.4 1057.7 0.0 0] [pos:Ancient Aether;1 600060000 1738.0 885.5 0.0 0] [pos:Ancient Aether;1 600060000 1476.7 1009.1 0.0 0] [pos:Ancient Aether;1 600060000 1640.4 1067.5 0.0 0] [pos:Ancient Aether;1 600060000 1888.4 867.2 0.0 0] [pos:Ancient Aether;1 600060000 1646.1 980.1 0.0 0] [pos:Ancient Aether;1 600060000 1785.1 645.0 0.0 0] [pos:Ancient Aether;1 600060000 1608.4 1014.8 0.0 0] [pos:Ancient Aether;1 600060000 1633.6 826.9 0.0 0] [pos:Ancient Aether;1 600060000 1589.4 777.4 0.0 0] [pos:Ancient Aether;1 600060000 1508.2 965.4 0.0 0] [pos:Ancient Aether;1 600060000 1432.2 1130.3 0.0 0] [pos:Ancient Aether;1 600060000 1691.4 1000.5 0.0 0] [pos:Ancient Aether;1 600060000 1756.8 724.8 0.0 0] [pos:Ancient Aether;1 600060000 1472.2 1080.5 0.0 0] [pos:Ancient Aether;1 600060000 1357.8 997.1 0.0 0] [pos:Ancient Aether;1 600060000 1611.2 1058.8 0.0 0] [pos:Ancient Aether;1 600060000 1655.2 725.9 0.0 0] [pos:Ancient Aether;1 600060000 1803.2 844.1 0.0 0] [pos:Ancient Aether;1 600060000 1610.1 870.1 0.0 0] [pos:Ancient Aether;1 600060000 1462.8 910.1 0.0 0] [pos:Ancient Aether;1 600060000 1574.2 1100.3 0.0 0] [pos:Ancient Aether;1 600060000 1675.2 805.3 0.0 0] [pos:Ancient Aether;1 600060000 1574.3 1100.5 0.0 0] [pos:Ancient Aether;1 600060000 1502.0 888.8 0.0 0] [pos:Ancient Aether;1 600060000 1343.4 1045.0 0.0 0] [pos:Ancient Aether;1 600060000 1519.7 1107.6 0.0 0] [pos:Ancient Aether;1 600060000 1668.7 947.2 0.0 0] [pos:Ancient Aether;1 600060000 1614.1 935.3 0.0 0] [pos:Ancient Aether;1 600060000 1501.3 1055.1 0.0 0] [pos:Ancient Aether;1 600060000 1526.9 894.7 0.0 0] [pos:Ancient Aether;1 600060000 1732.7 795.6 0.0 0] [pos:Ancient Aether;1 600060000 1698.2 926.7 0.0 0] [pos:Ancient Aether;1 600060000 1867.7 769.1 0.0 0] [pos:Ancient Aether;1 600060000 1562.7 811.8 0.0 0] [pos:Ancient Aether;1 600060000 1835.3 669.4 0.0 0] [pos:Ancient Aether;1 600060000 1435.9 1038.7 0.0 0] [pos:Ancient Aether;1 600060000 1920.0 804.3 0.0 0] [pos:Ancient Aether;1 600060000 1858.9 705.5 0.0 0] [pos:Ancient Aether;1 600060000 1632.0 915.9 0.0 0] [pos:Ancient Aether;1 600060000 1814.3 900.7 0.0 0] [pos:Ancient Aether;1 600060000 1555.4 1068.9 0.0 0] [pos:Ancient Aether;1 600060000 1585.9 881.7 0.0 0] [pos:Ancient Aether;1 600060000 1551.5 970.8 0.0 0] [pos:Ancient Aether;1 600060000 1801.4 727.5 0.0 0] [pos:Ancient Aether;1 600060000 1803.2 844.1 0.0 0] [pos:Ancient Aether;1 600060000 1698.2 926.7 0.0 0] [pos:Ancient Aether;1 600060000 1738.0 885.5 0.0 0] [pos:Ancient Aether;1 600060000 1632.0 915.9 0.0 0] [pos:Ancient Aether;1 600060000 1585.9 881.7 0.0 0] [pos:Ancient Aether;1 600060000 1610.1 870.1 0.0 0] [pos:Ancient Aether;1 600060000 1562.7 811.8 0.0 0] [pos:Ancient Aether;1 600060000 1502.0 888.8 0.0 0] [pos:Ancient Aether;1 600060000 1633.6 826.9 0.0 0] [pos:Ancient Aether;1 600060000 1589.4 777.4 0.0 0] [pos:Ancient Aether;1 600060000 1675.2 805.3 0.0 0] [pos:Ancient Aether;1 600060000 1756.8 724.8 0.0 0] [pos:Ancient Aether;1 600060000 1814.3 900.7 0.0 0] [pos:Ancient Aether;1 600060000 1668.7 947.2 0.0 0] [pos:Ancient Aether;1 600060000 1614.1 935.3 0.0 0] [pos:Ancient Aether;1 600060000 1646.1 980.1 0.0 0] [pos:Ancient Aether;1 600060000 1691.4 1000.5 0.0 0] [pos:Ancient Aether;1 600060000 1608.4 1014.8 0.0 0] [pos:Ancient Aether;1 600060000 1611.2 1058.9 0.0 0] [pos:Ancient Aether;1 600060000 1640.4 1067.5 0.0 0] [pos:Ancient Aether;1 600060000 1526.9 894.7 0.0 0] [pos:Ancient Aether;1 600060000 1462.8 910.1 0.0 0] [pos:Ancient Aether;1 600060000 1508.2 965.4 0.0 0] [pos:Ancient Aether;1 600060000 1655.2 725.9 0.0 0] [pos:Ancient Aether;1 600060000 1732.7 795.6 0.0 0] [pos:Ancient Aether;1 600060000 1555.4 1068.9 0.0 0] [pos:Ancient Aether;1 600060000 1574.3 1100.3 0.0 0] [pos:Ancient Aether;1 600060000 1574.3 1100.5 0.0 0] [pos:Ancient Aether;1 600060000 1519.7 1107.6 0.0 0] [pos:Ancient Aether;1 600060000 1472.2 1080.5 0.0 0] [pos:Ancient Aether;1 600060000 1757.4 1057.7 0.0 0] [pos:Ancient Aether;1 600060000 1435.9 1038.7 0.0 0] [pos:Ancient Aether;1 600060000 1476.7 1009.1 0.0 0] [pos:Ancient Aether;1 600060000 1888.4 867.2 0.0 0] [pos:Ancient Aether;1 600060000 1867.7 769.1 0.0 0] [pos:Ancient Aether;1 600060000 1801.4 727.5 0.0 0] [pos:Ancient Aether;1 600060000 1858.9 705.5 0.0 0] [pos:Ancient Aether;1 600060000 1835.3 669.4 0.0 0] [pos:Ancient Aether;1 600060000 1785.2 645.0 0.0 0] [pos:Ancient Aether;1 600060000 1920.0 804.3 0.0 0] [pos:Ancient Aether;1 600060000 1501.3 1055.1 0.0 0] [pos:Ancient Aether;1 600060000 1343.4 1045.0 0.0 0] [pos:Ancient Aether;1 600060000 1357.8 997.1 0.0 0] [pos:Ancient Aether;1 600050000 219.4 2637.0 0.0 0] [pos:Ancient Aether;1 600050000 334.3 2588.6 0.0 0] [pos:Ancient Aether;1 600050000 245.6 265.1 0.0 0] [pos:Ancient Aether;1 600050000 281.4 2806.8 0.0 0] [pos:Ancient Aether;1 600050000 397.3 2659.4 0.0 0] [pos:Ancient Aether;1 600050000 263.5 277.6 0.0 0] [pos:Ancient Aether;1 600050000 177.1 244.5 0.0 0] [pos:Ancient Aether;1 600050000 286.7 274.1 0.0 0] [pos:Ancient Aether;1 600050000 316.6 2661.5 0.0 0] [pos:Ancient Aether;1 600050000 244.8 435.7 0.0 0] [pos:Ancient Aether;1 600050000 230.1 311.9 0.0 0] [pos:Ancient Aether;1 600050000 194.3 407.8 0.0 0] [pos:Ancient Aether;1 600050000 162.4 287.0 0.0 0] [pos:Ancient Aether;1 600050000 201.6 326.4 0.0 0] [pos:Ancient Aether;1 600050000 396.0 2746.2 0.0 0] [pos:Ancient Aether;1 600050000 178.4 279.7 0.0 0] [pos:Ancient Aether;1 600050000 314.1 244.8 0.0 0] [pos:Ancient Aether;1 600050000 125.5 2878.2 0.0 0] [pos:Ancient Aether;1 600050000 238.8 360.3 0.0 0] [pos:Ancient Aether;1 600050000 216.0 2753.8 0.0 0] [pos:Ancient Aether;1 600050000 235.4 234.3 0.0 0] [pos:Ancient Aether;1 600050000 234.8 2668.1 0.0 0] [pos:Ancient Aether;1 600050000 189.3 452.9 0.0 0] [pos:Ancient Aether;1 600050000 441.5 2716.4 0.0 0] [pos:Ancient Aether;1 600050000 234.4 2845.3 0.0 0] [pos:Ancient Aether;1 600050000 272.2 2739.8 0.0 0] [pos:Ancient Aether;1 600050000 181.2 346.5 0.0 0] [pos:Ancient Aether;1 600050000 247.9 2949.4 0.0 0] [pos:Ancient Aether;1 600050000 424.6 2870.0 0.0 0] [pos:Ancient Aether;1 600050000 416.7 2687.2 0.0 0] [pos:Ancient Aether;1 600050000 397.3 2659.4 0.0 0] [pos:Ancient Aether;1 600050000 416.7 2687.2 0.0 0] [pos:Ancient Aether;1 600050000 441.5 2716.4 0.0 0] [pos:Ancient Aether;1 600050000 396.0 2746.2 0.0 0] [pos:Ancient Aether;1 600050000 316.6 2661.6 0.0 0] [pos:Ancient Aether;1 600050000 272.2 2739.8 0.0 0] [pos:Ancient Aether;1 600050000 234.8 2668.1 0.0 0] [pos:Ancient Aether;1 600050000 281.4 2806.8 0.0 0] [pos:Ancient Aether;1 600050000 424.6 2870.0 0.0 0] [pos:Ancient Aether;1 600050000 334.3 2588.6 0.0 0] [pos:Ancient Aether;1 600050000 234.4 2845.4 0.0 0] [pos:Ancient Aether;1 600050000 216.0 2753.8 0.0 0] [pos:Ancient Aether;1 600050000 125.5 2878.2 0.0 0] [pos:Ancient Aether;1 600050000 219.4 2637.0 0.0 0] [pos:Ancient Aether;1 600050000 247.9 2949.4 0.0 0] [pos:Ancient Aether;1 600050000 314.1 244.8 0.0 0] [pos:Ancient Aether;1 600050000 189.3 452.9 0.0 0] [pos:Ancient Aether;1 600050000 194.3 407.8 0.0 0] [pos:Ancient Aether;1 600050000 244.8 435.7 0.0 0] [pos:Ancient Aether;1 600050000 238.8 360.3 0.0 0] [pos:Ancient Aether;1 600050000 286.7 274.1 0.0 0] [pos:Ancient Aether;1 600050000 263.5 277.6 0.0 0] [pos:Ancient Aether;1 600050000 245.6 265.1 0.0 0] [pos:Ancient Aether;1 600050000 230.1 311.9 0.0 0] [pos:Ancient Aether;1 600050000 201.6 326.4 0.0 0] [pos:Ancient Aether;1 600050000 235.4 234.3 0.0 0] [pos:Ancient Aether;1 600050000 178.4 279.7 0.0 0] [pos:Ancient Aether;1 600050000 181.2 346.5 0.0 0] [pos:Ancient Aether;1 600050000 177.1 244.5 0.0 0] [pos:Ancient Aether;1 600050000 162.4 287.0 0.0 0] ';
                }
                break;
            case 'Ponica':
                popupTitle.textContent = 'Стебель фоники';
                if (selectedRace === 'elyos') {
                    popupTextarea.value = '[pos:Ponica;0 600060000 2910.7 554.0 0.0 0] [pos:Ponica;0 600060000 2801.9 467.2 0.0 0] [pos:Ponica;0 600060000 2573.2 433.6 0.0 0] [pos:Ponica;0 600060000 2881.6 440.5 0.0 0] [pos:Ponica;0 600060000 2778.3 427.0 0.0 0] [pos:Ponica;0 600060000 2691.6 459.2 0.0 0] [pos:Ponica;0 600060000 2856.2 408.1 0.0 0] [pos:Ponica;0 600060000 2694.8 387.3 0.0 0] [pos:Ponica;0 600060000 2774.7 472.6 0.0 0] [pos:Ponica;0 600060000 2659.4 427.1 0.0 0] [pos:Ponica;0 600060000 2756.3 517.8 0.0 0] [pos:Ponica;0 600060000 2661.4 457.0 0.0 0] [pos:Ponica;0 600060000 2855.6 440.0 0.0 0] [pos:Ponica;0 600060000 2790.3 403.0 0.0 0] [pos:Ponica;0 600060000 2762.5 445.7 0.0 0] [pos:Ponica;0 600060000 2477.9 473.5 0.0 0] [pos:Ponica;0 600060000 2665.5 372.2 0.0 0] [pos:Ponica;0 600060000 2754.6 398.1 0.0 0] [pos:Ponica;0 600060000 2862.0 543.9 0.0 0] [pos:Ponica;0 600060000 2846.7 482.6 0.0 0] [pos:Ponica;0 600060000 2614.7 357.5 0.0 0] [pos:Ponica;0 600060000 2687.5 521.4 0.0 0] [pos:Ponica;0 600060000 2557.9 472.4 0.0 0] [pos:Ponica;0 600060000 2592.4 298.9 0.0 0] [pos:Ponica;0 600060000 2694.5 429.0 0.0 0] [pos:Ponica;0 600060000 2797.5 354.2 0.0 0] [pos:Ponica;0 600060000 2830.9 333.2 0.0 0] [pos:Ponica;0 600060000 2519.7 471.5 0.0 0] [pos:Ponica;0 600060000 2477.9 473.5 0.0 0] [pos:Ponica;0 600060000 2519.7 471.5 0.0 0] [pos:Ponica;0 600060000 2557.9 472.4 0.0 0] [pos:Ponica;0 600060000 2573.2 433.6 0.0 0] [pos:Ponica;0 600060000 2614.8 357.5 0.0 0] [pos:Ponica;0 600060000 2665.5 372.2 0.0 0] [pos:Ponica;0 600060000 2659.4 427.1 0.0 0] [pos:Ponica;0 600060000 2661.4 457.0 0.0 0] [pos:Ponica;0 600060000 2694.8 387.3 0.0 0] [pos:Ponica;0 600060000 2694.5 429.0 0.0 0] [pos:Ponica;0 600060000 2691.6 459.2 0.0 0] [pos:Ponica;0 600060000 2754.6 398.1 0.0 0] [pos:Ponica;0 600060000 2762.5 445.7 0.0 0] [pos:Ponica;0 600060000 2790.3 403.0 0.0 0] [pos:Ponica;0 600060000 2778.3 427.0 0.0 0] [pos:Ponica;0 600060000 2797.5 354.2 0.0 0] [pos:Ponica;0 600060000 2830.9 333.2 0.0 0] [pos:Ponica;0 600060000 2774.7 472.6 0.0 0] [pos:Ponica;0 600060000 2856.2 408.1 0.0 0] [pos:Ponica;0 600060000 2801.9 467.2 0.0 0] [pos:Ponica;0 600060000 2855.6 440.0 0.0 0] [pos:Ponica;0 600060000 2846.7 482.6 0.0 0] [pos:Ponica;0 600060000 2881.6 440.5 0.0 0] [pos:Ponica;0 600060000 2756.3 517.8 0.0 0] [pos:Ponica;0 600060000 2862.0 543.9 0.0 0] [pos:Ponica;0 600060000 2910.7 554.0 0.0 0] [pos:Ponica;0 600060000 2592.4 298.9 0.0 0] [pos:Ponica;0 600060000 2687.5 521.4 0.0 0] [pos:Ponica;0 600050000 252.0 2296.8 0.0 0] [pos:Ponica;0 600050000 740.3 632.2 0.0 0] [pos:Ponica;0 600050000 1281.8 1426.5 0.0 0] [pos:Ponica;0 600050000 1665.4 932.9 0.0 0] [pos:Ponica;0 600050000 1537.8 1126.6 0.0 0] [pos:Ponica;0 600050000 687.3 2865.4 0.0 0] [pos:Ponica;0 600050000 678.5 2786.3 0.0 0] [pos:Ponica;0 600050000 596.4 1255.5 0.0 0] [pos:Ponica;0 600050000 1328.8 2172.4 0.0 0] [pos:Ponica;0 600050000 1442.6 1231.7 0.0 0] [pos:Ponica;0 600050000 1379.0 1936.1 0.0 0] [pos:Ponica;0 600050000 826.0 1841.6 0.0 0] [pos:Ponica;0 600050000 1689.4 988.0 0.0 0] [pos:Ponica;0 600050000 530.8 1212.5 0.0 0] [pos:Ponica;0 600050000 1604.2 1046.0 0.0 0] [pos:Ponica;0 600050000 364.3 1059.2 0.0 0] [pos:Ponica;0 600050000 1510.7 812.7 0.0 0] [pos:Ponica;0 600050000 1249.4 872.3 0.0 0] [pos:Ponica;0 600050000 1645.4 872.6 0.0 0] [pos:Ponica;0 600050000 505.7 2458.2 0.0 0] [pos:Ponica;0 600050000 933.7 1204.9 0.0 0] [pos:Ponica;0 600050000 1414.9 795.5 0.0 0] [pos:Ponica;0 600050000 660.7 712.4 0.0 0] [pos:Ponica;0 600050000 1334.6 709.0 0.0 0] [pos:Ponica;0 600050000 923.1 982.6 0.0 0] [pos:Ponica;0 600050000 976.1 2281.5 0.0 0] [pos:Ponica;0 600050000 651.8 2012.9 0.0 0] [pos:Ponica;0 600050000 461.6 2393.8 0.0 0] [pos:Ponica;0 600050000 307.1 1155.6 0.0 0] [pos:Ponica;0 600050000 1038.0 219.6 0.0 0] [pos:Ponica;0 600050000 1726.6 2199.4 0.0 0] [pos:Ponica;0 600050000 894.2 958.7 0.0 0] [pos:Ponica;0 600050000 820.0 1145.5 0.0 0] [pos:Ponica;0 600050000 597.8 2483.7 0.0 0] [pos:Ponica;0 600050000 619.1 707.8 0.0 0] [pos:Ponica;0 600050000 807.2 1705.5 0.0 0] [pos:Ponica;0 600050000 1326.8 1335.4 0.0 0] [pos:Ponica;0 600050000 1756.1 2386.8 0.0 0] [pos:Ponica;0 600050000 182.8 2140.4 0.0 0] [pos:Ponica;0 600050000 1533.5 1883.4 0.0 0] [pos:Ponica;0 600050000 385.8 908.9 0.0 0] [pos:Ponica;0 600050000 1074.5 2138.6 0.0 0] [pos:Ponica;0 600050000 1233.6 1299.7 0.0 0] [pos:Ponica;0 600050000 210.2 2198.5 0.0 0] [pos:Ponica;0 600050000 762.7 2692.6 0.0 0] [pos:Ponica;0 600050000 894.7 201.0 0.0 0] [pos:Ponica;0 600050000 806.5 1365.9 0.0 0] [pos:Ponica;0 600050000 1005.7 352.5 0.0 0] [pos:Ponica;0 600050000 1791.7 2285.8 0.0 0] [pos:Ponica;0 600050000 1570.1 2016.5 0.0 0] [pos:Ponica;0 600050000 1357.4 1545.3 0.0 0] [pos:Ponica;0 600050000 1274.5 2215.4 0.0 0] [pos:Ponica;0 600050000 915.3 1164.1 0.0 0] [pos:Ponica;0 600050000 1497.7 667.0 0.0 0] [pos:Ponica;0 600050000 989.9 2183.4 0.0 0] [pos:Ponica;0 600050000 1665.4 932.9 0.0 0] [pos:Ponica;0 600050000 1689.5 988.0 0.0 0] [pos:Ponica;0 600050000 1645.4 872.6 0.0 0] [pos:Ponica;0 600050000 1604.2 1046.0 0.0 0] [pos:Ponica;0 600050000 1537.8 1126.6 0.0 0] [pos:Ponica;0 600050000 1791.7 2285.8 0.0 0] [pos:Ponica;0 600050000 1756.1 2386.8 0.0 0] [pos:Ponica;0 600050000 1726.6 2199.4 0.0 0] [pos:Ponica;0 600050000 1570.1 2016.5 0.0 0] [pos:Ponica;0 600050000 1533.5 1883.4 0.0 0] [pos:Ponica;0 600050000 1357.4 1545.3 0.0 0] [pos:Ponica;0 600050000 678.5 2786.3 0.0 0] [pos:Ponica;0 600050000 687.3 2865.4 0.0 0] [pos:Ponica;0 600050000 762.7 2692.6 0.0 0] [pos:Ponica;0 600050000 252.0 2296.8 0.0 0] [pos:Ponica;0 600050000 210.2 2198.5 0.0 0] [pos:Ponica;0 600050000 182.8 2140.4 0.0 0] [pos:Ponica;0 600050000 1442.6 1231.7 0.0 0] [pos:Ponica;0 600050000 1249.4 872.3 0.0 0] [pos:Ponica;0 600050000 1334.6 709.0 0.0 0] [pos:Ponica;0 600050000 1414.9 795.5 0.0 0] [pos:Ponica;0 600050000 1497.7 667.0 0.0 0] [pos:Ponica;0 600050000 1510.7 812.7 0.0 0] [pos:Ponica;0 600050000 1005.8 352.5 0.0 0] [pos:Ponica;0 600050000 1038.0 219.6 0.0 0] [pos:Ponica;0 600050000 307.1 1155.7 0.0 0] [pos:Ponica;0 600050000 364.3 1059.2 0.0 0] [pos:Ponica;0 600050000 385.8 908.9 0.0 0] [pos:Ponica;0 600050000 894.7 201.0 0.0 0] [pos:Ponica;0 600050000 461.6 2393.8 0.0 0] [pos:Ponica;0 600050000 505.7 2458.2 0.0 0] [pos:Ponica;0 600050000 597.8 2483.7 0.0 0] [pos:Ponica;0 600050000 530.8 1212.5 0.0 0] [pos:Ponica;0 600050000 596.4 1255.5 0.0 0] [pos:Ponica;0 600050000 806.5 1365.9 0.0 0] [pos:Ponica;0 600050000 1233.7 1299.7 0.0 0] [pos:Ponica;0 600050000 1281.8 1426.6 0.0 0] [pos:Ponica;0 600050000 1326.8 1335.4 0.0 0] [pos:Ponica;0 600050000 1379.0 1936.1 0.0 0] [pos:Ponica;0 600050000 1328.8 2172.4 0.0 0] [pos:Ponica;0 600050000 1274.5 2215.4 0.0 0] [pos:Ponica;0 600050000 933.7 1204.9 0.0 0] [pos:Ponica;0 600050000 915.3 1164.1 0.0 0] [pos:Ponica;0 600050000 820.0 1145.5 0.0 0] [pos:Ponica;0 600050000 1074.5 2138.6 0.0 0] [pos:Ponica;0 600050000 989.9 2183.4 0.0 0] [pos:Ponica;0 600050000 976.1 2281.5 0.0 0] ';
                } else if (selectedRace === 'asmodian') {
                    popupTextarea.value = '[pos:Ponica;1 600060000 2910.7 554.0 0.0 0] [pos:Ponica;1 600060000 2801.9 467.2 0.0 0] [pos:Ponica;1 600060000 2573.2 433.6 0.0 0] [pos:Ponica;1 600060000 2881.6 440.5 0.0 0] [pos:Ponica;1 600060000 2778.3 427.0 0.0 0] [pos:Ponica;1 600060000 2691.6 459.2 0.0 0] [pos:Ponica;1 600060000 2856.2 408.1 0.0 0] [pos:Ponica;1 600060000 2694.8 387.3 0.0 0] [pos:Ponica;1 600060000 2774.7 472.6 0.0 0] [pos:Ponica;1 600060000 2659.4 427.1 0.0 0] [pos:Ponica;1 600060000 2756.3 517.8 0.0 0] [pos:Ponica;1 600060000 2661.4 457.0 0.0 0] [pos:Ponica;1 600060000 2855.6 440.0 0.0 0] [pos:Ponica;1 600060000 2790.3 403.0 0.0 0] [pos:Ponica;1 600060000 2762.5 445.7 0.0 0] [pos:Ponica;1 600060000 2477.9 473.5 0.0 0] [pos:Ponica;1 600060000 2665.5 372.2 0.0 0] [pos:Ponica;1 600060000 2754.6 398.1 0.0 0] [pos:Ponica;1 600060000 2862.0 543.9 0.0 0] [pos:Ponica;1 600060000 2846.7 482.6 0.0 0] [pos:Ponica;1 600060000 2614.7 357.5 0.0 0] [pos:Ponica;1 600060000 2687.5 521.4 0.0 0] [pos:Ponica;1 600060000 2557.9 472.4 0.0 0] [pos:Ponica;1 600060000 2592.4 298.9 0.0 0] [pos:Ponica;1 600060000 2694.5 429.0 0.0 0] [pos:Ponica;1 600060000 2797.5 354.2 0.0 0] [pos:Ponica;1 600060000 2830.9 333.2 0.0 0] [pos:Ponica;1 600060000 2519.7 471.5 0.0 0] [pos:Ponica;1 600060000 2477.9 473.5 0.0 0] [pos:Ponica;1 600060000 2519.7 471.5 0.0 0] [pos:Ponica;1 600060000 2557.9 472.4 0.0 0] [pos:Ponica;1 600060000 2573.2 433.6 0.0 0] [pos:Ponica;1 600060000 2614.8 357.5 0.0 0] [pos:Ponica;1 600060000 2665.5 372.2 0.0 0] [pos:Ponica;1 600060000 2659.4 427.1 0.0 0] [pos:Ponica;1 600060000 2661.4 457.0 0.0 0] [pos:Ponica;1 600060000 2694.8 387.3 0.0 0] [pos:Ponica;1 600060000 2694.5 429.0 0.0 0] [pos:Ponica;1 600060000 2691.6 459.2 0.0 0] [pos:Ponica;1 600060000 2754.6 398.1 0.0 0] [pos:Ponica;1 600060000 2762.5 445.7 0.0 0] [pos:Ponica;1 600060000 2790.3 403.0 0.0 0] [pos:Ponica;1 600060000 2778.3 427.0 0.0 0] [pos:Ponica;1 600060000 2797.5 354.2 0.0 0] [pos:Ponica;1 600060000 2830.9 333.2 0.0 0] [pos:Ponica;1 600060000 2774.7 472.6 0.0 0] [pos:Ponica;1 600060000 2856.2 408.1 0.0 0] [pos:Ponica;1 600060000 2801.9 467.2 0.0 0] [pos:Ponica;1 600060000 2855.6 440.0 0.0 0] [pos:Ponica;1 600060000 2846.7 482.6 0.0 0] [pos:Ponica;1 600060000 2881.6 440.5 0.0 0] [pos:Ponica;1 600060000 2756.3 517.8 0.0 0] [pos:Ponica;1 600060000 2862.0 543.9 0.0 0] [pos:Ponica;1 600060000 2910.7 554.0 0.0 0] [pos:Ponica;1 600060000 2592.4 298.9 0.0 0] [pos:Ponica;1 600060000 2687.5 521.4 0.0 0] [pos:Ponica;1 600050000 252.0 2296.8 0.0 0] [pos:Ponica;1 600050000 740.3 632.2 0.0 0] [pos:Ponica;1 600050000 1281.8 1426.5 0.0 0] [pos:Ponica;1 600050000 1665.4 932.9 0.0 0] [pos:Ponica;1 600050000 1537.8 1126.6 0.0 0] [pos:Ponica;1 600050000 687.3 2865.4 0.0 0] [pos:Ponica;1 600050000 678.5 2786.3 0.0 0] [pos:Ponica;1 600050000 596.4 1255.5 0.0 0] [pos:Ponica;1 600050000 1328.8 2172.4 0.0 0] [pos:Ponica;1 600050000 1442.6 1231.7 0.0 0] [pos:Ponica;1 600050000 1379.0 1936.1 0.0 0] [pos:Ponica;1 600050000 826.0 1841.6 0.0 0] [pos:Ponica;1 600050000 1689.4 988.0 0.0 0] [pos:Ponica;1 600050000 530.8 1212.5 0.0 0] [pos:Ponica;1 600050000 1604.2 1046.0 0.0 0] [pos:Ponica;1 600050000 364.3 1059.2 0.0 0] [pos:Ponica;1 600050000 1510.7 812.7 0.0 0] [pos:Ponica;1 600050000 1249.4 872.3 0.0 0] [pos:Ponica;1 600050000 1645.4 872.6 0.0 0] [pos:Ponica;1 600050000 505.7 2458.2 0.0 0] [pos:Ponica;1 600050000 933.7 1204.9 0.0 0] [pos:Ponica;1 600050000 1414.9 795.5 0.0 0] [pos:Ponica;1 600050000 660.7 712.4 0.0 0] [pos:Ponica;1 600050000 1334.6 709.0 0.0 0] [pos:Ponica;1 600050000 923.1 982.6 0.0 0] [pos:Ponica;1 600050000 976.1 2281.5 0.0 0] [pos:Ponica;1 600050000 651.8 2012.9 0.0 0] [pos:Ponica;1 600050000 461.6 2393.8 0.0 0] [pos:Ponica;1 600050000 307.1 1155.6 0.0 0] [pos:Ponica;1 600050000 1038.0 219.6 0.0 0] [pos:Ponica;1 600050000 1726.6 2199.4 0.0 0] [pos:Ponica;1 600050000 894.2 958.7 0.0 0] [pos:Ponica;1 600050000 820.0 1145.5 0.0 0] [pos:Ponica;1 600050000 597.8 2483.7 0.0 0] [pos:Ponica;1 600050000 619.1 707.8 0.0 0] [pos:Ponica;1 600050000 807.2 1705.5 0.0 0] [pos:Ponica;1 600050000 1326.8 1335.4 0.0 0] [pos:Ponica;1 600050000 1756.1 2386.8 0.0 0] [pos:Ponica;1 600050000 182.8 2140.4 0.0 0] [pos:Ponica;1 600050000 1533.5 1883.4 0.0 0] [pos:Ponica;1 600050000 385.8 908.9 0.0 0] [pos:Ponica;1 600050000 1074.5 2138.6 0.0 0] [pos:Ponica;1 600050000 1233.6 1299.7 0.0 0] [pos:Ponica;1 600050000 210.2 2198.5 0.0 0] [pos:Ponica;1 600050000 762.7 2692.6 0.0 0] [pos:Ponica;1 600050000 894.7 201.0 0.0 0] [pos:Ponica;1 600050000 806.5 1365.9 0.0 0] [pos:Ponica;1 600050000 1005.7 352.5 0.0 0] [pos:Ponica;1 600050000 1791.7 2285.8 0.0 0] [pos:Ponica;1 600050000 1570.1 2016.5 0.0 0] [pos:Ponica;1 600050000 1357.4 1545.3 0.0 0] [pos:Ponica;1 600050000 1274.5 2215.4 0.0 0] [pos:Ponica;1 600050000 915.3 1164.1 0.0 0] [pos:Ponica;1 600050000 1497.7 667.0 0.0 0] [pos:Ponica;1 600050000 989.9 2183.4 0.0 0] [pos:Ponica;1 600050000 1665.4 932.9 0.0 0] [pos:Ponica;1 600050000 1689.5 988.0 0.0 0] [pos:Ponica;1 600050000 1645.4 872.6 0.0 0] [pos:Ponica;1 600050000 1604.2 1046.0 0.0 0] [pos:Ponica;1 600050000 1537.8 1126.6 0.0 0] [pos:Ponica;1 600050000 1791.7 2285.8 0.0 0] [pos:Ponica;1 600050000 1756.1 2386.8 0.0 0] [pos:Ponica;1 600050000 1726.6 2199.4 0.0 0] [pos:Ponica;1 600050000 1570.1 2016.5 0.0 0] [pos:Ponica;1 600050000 1533.5 1883.4 0.0 0] [pos:Ponica;1 600050000 1357.4 1545.3 0.0 0] [pos:Ponica;1 600050000 678.5 2786.3 0.0 0] [pos:Ponica;1 600050000 687.3 2865.4 0.0 0] [pos:Ponica;1 600050000 762.7 2692.6 0.0 0] [pos:Ponica;1 600050000 252.0 2296.8 0.0 0] [pos:Ponica;1 600050000 210.2 2198.5 0.0 0] [pos:Ponica;1 600050000 182.8 2140.4 0.0 0] [pos:Ponica;1 600050000 1442.6 1231.7 0.0 0] [pos:Ponica;1 600050000 1249.4 872.3 0.0 0] [pos:Ponica;1 600050000 1334.6 709.0 0.0 0] [pos:Ponica;1 600050000 1414.9 795.5 0.0 0] [pos:Ponica;1 600050000 1497.7 667.0 0.0 0] [pos:Ponica;1 600050000 1510.7 812.7 0.0 0] [pos:Ponica;1 600050000 1005.8 352.5 0.0 0] [pos:Ponica;1 600050000 1038.0 219.6 0.0 0] [pos:Ponica;1 600050000 307.1 1155.7 0.0 0] [pos:Ponica;1 600050000 364.3 1059.2 0.0 0] [pos:Ponica;1 600050000 385.8 908.9 0.0 0] [pos:Ponica;1 600050000 894.7 201.0 0.0 0] [pos:Ponica;1 600050000 461.6 2393.8 0.0 0] [pos:Ponica;1 600050000 505.7 2458.2 0.0 0] [pos:Ponica;1 600050000 597.8 2483.7 0.0 0] [pos:Ponica;1 600050000 530.8 1212.5 0.0 0] [pos:Ponica;1 600050000 596.4 1255.5 0.0 0] [pos:Ponica;1 600050000 806.5 1365.9 0.0 0] [pos:Ponica;1 600050000 1233.7 1299.7 0.0 0] [pos:Ponica;1 600050000 1281.8 1426.6 0.0 0] [pos:Ponica;1 600050000 1326.8 1335.4 0.0 0] [pos:Ponica;1 600050000 1379.0 1936.1 0.0 0] [pos:Ponica;1 600050000 1328.8 2172.4 0.0 0] [pos:Ponica;1 600050000 1274.5 2215.4 0.0 0] [pos:Ponica;1 600050000 933.7 1204.9 0.0 0] [pos:Ponica;1 600050000 915.3 1164.1 0.0 0] [pos:Ponica;1 600050000 820.0 1145.5 0.0 0] [pos:Ponica;1 600050000 1074.5 2138.6 0.0 0] [pos:Ponica;1 600050000 989.9 2183.4 0.0 0] [pos:Ponica;1 600050000 976.1 2281.5 0.0 0] ';
                }
                break;
        }

        popup.style.display = 'flex'; 
    }

    
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

   
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const copyBtn = document.getElementById('copy-btn');
    const popupTextarea = document.getElementById('popup-textarea');
    const notificationContainer = document.getElementById('notification-container');
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
    
    copyBtn.addEventListener('click', function () {
        // Make sure these elements exist before trying to use them
        if (!popupTextarea || !notificationContainer) {
            console.error('Required elements not found');
            return;
        }
        
        // Select the text
        popupTextarea.select();
        popupTextarea.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            // Use only the execCommand method since it works on your other page
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification('Текст успішно скопійовано!');
            } else {
                showNotification('Помилка під час копіювання');
            }
        } catch (err) {
            console.error('Copy failed:', err);
            showNotification('Помилка під час копіювання: ' + err);
        }
    });
});

const copyButton = document.getElementById('copyButton');
const coordinatesTextarea = document.getElementById('coordinatesTextarea');
const copyMessage = document.getElementById('copyMessage');

function copyText() {
  
    coordinatesTextarea.select();
    coordinatesTextarea.setSelectionRange(0, 99999); 

 
    document.execCommand('copy');


    copyMessage.classList.add('show');


    setTimeout(() => {
        copyMessage.classList.remove('show');
    }, 2000);
}

copyButton.addEventListener('click', copyText);

copyBtn.addEventListener('click', function () {
    popupTextarea.select(); 
    navigator.clipboard.writeText(popupTextarea.value)
        .then(() => {
            console.log('Текст успішно скопійовано!');
            showNotification('Текст успішно скопійовано!');
        })
        .catch(err => {
            console.log('Помилка при копіюванні:', err);
            showNotification('Помилка під час копіювання: ' + err);
        });
});
