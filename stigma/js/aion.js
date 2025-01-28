var Aion = {
	SF_WEAPON   : 0x01,
	SF_SHIELD   : 0x02,
	SF_HEAD     : 0x04,
	SF_NECK     : 0x08,
	SF_EAR      : 0x10,
	SF_ARMOR    : 0x20,
	SF_SHOULDER : 0x40,
	SF_LEGS     : 0x80,
	SF_GLOVES   : 0x100,
	SF_RING     : 0x200,
	SF_BOOTS    : 0x400,
	SF_BELT     : 0x800,
	SF_WING     : 0x1000,
	MAX_CHAR_LEVEL : 65,
	MIN_CHAR_LEVEL : 20
};

Aion.primaryStats = Array('hit_accuracy','parry','critical','magicalcritical','magical_hit_accuracy','magical_skill_boost','dodge','physical_defend','magical_resist','block','damage_reduce','magical_skill_boost_resist','magical_defend','max_hp', 'physical_critical_reduce_rate');
Aion.secondaryStats = Array('bonus_attr1','bonus_attr2','bonus_attr3','bonus_attr4','bonus_attr5','bonus_attr6','bonus_attr7','bonus_attr8','bonus_attr9','bonus_attr10','bonus_attr11','bonus_attr12');
Aion.godench1Stats = Array('bonus_attr_a1','bonus_attr_a2','bonus_attr_a3','bonus_attr_a4');
Aion.godench2Stats = Array('bonus_attr_b1','bonus_attr_b2','bonus_attr_b3','bonus_attr_b4');

Aion.prim2sec = {
	phyattack : 'phyattack',
	magicalattack : 'magicalattack',
	attackdelay : 'attackdelay',
	hit_accuracy : 'hitaccuracy',
	critical: 'critical',
	magicalcritical: 'magicalcritical',
	parry: 'parry',
	magical_hit_accuracy : 'magicalhitaccuracy',
	magical_skill_boost : 'magicalskillboost',
	dodge: 'dodge',
	
	block:'block',
	damage_reduce:'damage_reduce',
	physical_defend : 'physicaldefend',
	magical_resist : 'magicalresist',
	magical_skill_boost_resist : 'magicalskillboostresist',
	magical_defend : 'magicaldefend',
	max_hp : 'maxhp',
	physical_critical_reduce_rate : 'physicalcriticalreducerate'
};

Aion.enchantments = {
	'1h_sword' : {phyattack : 2},
	'1h_mace' : {phyattack : 3, magicalskillboost : 20},
	'1h_dagger' : {phyattack : 2},
	'1h_gun' : {magicalattack : 2, magicalskillboost : 20},
	'2h_orb' : {magicalattack : 4, magicalskillboost : 20},
	'2h_book' : {magicalattack : 3, magicalskillboost : 20},
	'2h_sword' : {phyattack : 4},
	'2h_polearm' : {phyattack : 4},
	'2h_staff' : {phyattack : 3, magicalskillboost : 20},
	'2h_cannon' : {magicalattack : 4, magicalskillboost : 20},
	'2h_keyblade' : {attack : 4, magicalskillboost : 20},
	'2h_harp' : {magicalattack : 4, magicalskillboost : 20},
	'bow' : {phyattack : 4},
	'shield' : {damage_reduce: 2, block : 0}
}
Aion.enchantments_15 = {};
$.extend(Aion.enchantments_15, Aion.enchantments);
Aion.enchantments_15.shield = {damage_reduce: 0, block : 30};

Aion.armorEnch = {
	robe : {
		armor : {physicaldefend:3, maxhp: 14, physicalcriticalreducerate : 4, magicaldefend: 3},
		legs : {physicaldefend:2, maxhp: 12, physicalcriticalreducerate : 3, magicaldefend: 2},
		other : {physicaldefend:1, maxhp: 10, physicalcriticalreducerate : 2, magicaldefend: 2}
	},
	leather : {
		armor : {physicaldefend:4, maxhp: 12, physicalcriticalreducerate : 4, magicaldefend: 3},
		legs : {physicaldefend:3, maxhp: 10, physicalcriticalreducerate : 3, magicaldefend: 2},
		other : {physicaldefend:2, maxhp: 8, physicalcriticalreducerate : 2, magicaldefend: 2}
	},
	chain : {
		armor : {physicaldefend:5, maxhp: 10, physicalcriticalreducerate : 4, magicaldefend: 3},
		legs : {physicaldefend:4, maxhp: 8, physicalcriticalreducerate : 3, magicaldefend: 2},
		other : {physicaldefend:3, maxhp: 6, physicalcriticalreducerate : 2, magicaldefend: 2}
	},
	plate : {
		armor : {physicaldefend:6, maxhp: 8, physicalcriticalreducerate : 4, magicaldefend: 3},
		legs : {physicaldefend:5, maxhp: 6, physicalcriticalreducerate : 3, magicaldefend: 2},
		other : {physicaldefend:4, maxhp: 4, physicalcriticalreducerate : 2, magicaldefend: 2}
	},
	clothes : {}
}

Aion.authorize = {
	head: [
		{stat: 'pvpattackratio_physical', values: [2,7,12,17,25,35,47,62,77,97]},
		{stat: 'pvpattackratio_magical', values: [2,7,12,17,25,35,47,62,77,97]}
	],
	necklace: [
		{stat: 'pvpattackratio_physical', values: [2,7,12,17,25,35,47,62,77,97]},
		{stat: 'pvpattackratio_magical', values: [2,7,12,17,25,35,47,62,77,97]}
	],
	earring: [
		{stat: 'pvpattackratio_physical', values: [2,7,12,17,25,35,47,62,77,97]},
		{stat: 'pvpattackratio_magical', values: [2,7,12,17,25,35,47,62,77,97]}
	],
	ring: [
		{stat: 'pvpdefendratio_physical', values: [3,9,15,21,31,45,63,83,103,129]},
		{stat: 'pvpdefendratio_magical', values: [3,9,15,21,31,45,63,83,103,129]}
	],
	belt: [
		{stat: 'pvpdefendratio_physical', values: [3,9,15,21,31,45,63,83,103,129]},
		{stat: 'pvpdefendratio_magical', values: [3,9,15,21,31,45,63,83,103,129]}
	]
}

Aion.slotData = {
	weapon : {
		slotFlag: Aion.SF_WEAPON,
		allowGrade: 1,
		allowManastone: 1,
		slotId : 1,
		filterWeaponType : 1,
		slotRight : 1
	},
	shield : {
		slotFlag: Aion.SF_SHIELD,
		allowGrade: 1,
		allowManastone: 1,
		slotId : 2,
		altSlotId : 1,
		filterWeaponType : 1,
		slotRight : 1
	},
	armfusion : {
		slotFlag: Aion.SF_WEAPON,
		// allowGrade: 1,
		allowManastone: 1,
		slotId : 1,
		filterWeaponType : 1,
		slotRight : 1
	},
	headgear : {
		slotFlag: Aion.SF_HEAD,
		slotId : 3
	},
	armor : {
		slotFlag: Aion.SF_ARMOR,
		allowGrade: 1,
		allowManastone: 1,
		slotId : 6,
		filterEquipType : 1,
		slotRight : 1
	},
	legs : {
		slotFlag: Aion.SF_LEGS,
		allowGrade: 1,
		allowManastone: 1,
		slotId : 8,
		filterEquipType : 1,
		slotRight : 1
	},
	shoulder : {
		slotFlag: Aion.SF_SHOULDER,
		allowGrade: 1,
		allowManastone: 1,
		slotId : 7,
		filterEquipType : 1,
		slotRight : 1
	},
	gloves : {
		slotFlag: Aion.SF_GLOVES,
		allowGrade: 1,
		allowManastone: 1,
		slotId : 9,
		filterEquipType : 1,
		slotRight : 1
	},
	boots : {
		slotFlag: Aion.SF_BOOTS,
		allowGrade: 1,
		allowManastone: 1,
		slotId : 11,
		filterEquipType : 1,
		slotRight : 1
	},
	necklace : {
		slotFlag: Aion.SF_NECK,
		slotId : 4
	},
	earring_l : {
		slotFlag: Aion.SF_EAR,
		slotId : 5
	},
	earring_r : {
		slotFlag: Aion.SF_EAR,
		slotId : 5
	},
	ring_l : {
		slotFlag: Aion.SF_RING,
		slotId : 10
	},
	ring_r : {
		slotFlag: Aion.SF_RING,
		slotId : 10
	},
	belt : {
		slotFlag: Aion.SF_BELT,
		slotId : 12
	},
	wing : {
		slotFlag: Aion.SF_WING,
		slotId : 13
	}
}

Aion.bonusesData = {
	damage_reduce : {
		flags : Aion.SF_SHIELD,
		format : 'percent'
	},
	dodge : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT
	},
	parry : {
		flags : Aion.SF_WEAPON | Aion.SF_HEAD | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_BOOTS | Aion.SF_BELT,
		dual_mhonly : 1
	},
	block : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT
	},
	hitaccuracy : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING,
		dual_primary : 1
	},
	critical : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING,
		dual_primary : 1
	},
	attackdelay : {
		armfusionmax : 1,
		dual_max : 1,
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_GLOVES,
		format : 'percent',
		signed : true
	},
	boostcastingtime : {
		armfusionmax : 1,
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_GLOVES,
		format : 'percent',
		signed : true
	},
	boosthate : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_BOOTS,
		format : 'percent',
		divide : 10,
		signed : true
	},
	concentration : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT
	},
	elementaldefendair : {
		flags : Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT
	},
	elementaldefendearth : {
		flags : Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT
	},
	elementaldefendfire : {
		flags : Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT
	},
	elementaldefendwater : {
		flags : Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT
	},
	flyspeed : {
		flags : Aion.SF_HEAD | Aion.SF_ARMOR | Aion.SF_LEGS,
		format : 'percent',
		signed : true
	},
	healskillboost : {
		flags : Aion.SF_WEAPON | Aion.SF_HEAD | Aion.SF_SHIELD | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_BOOTS | Aion.SF_WING | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING
	},
	magicalattack : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_SHOULDER | Aion.SF_BELT
	},
	magicalcritical : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_WING
	},
	magicalcriticaldamagereduce : {
		flags : Aion.SF_HEAD
	},
	magicalcriticalreducerate : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_WING
	},
	magicalhitaccuracy : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING,
		dual_mhonly : 1
	},
	magicalresist : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT
	},
	magicalskillboost : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING
	},
	// magical_resist : {
		// flags : Aion.SF_WING
	// },
	maxfp : {
		flags : Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_LEGS | Aion.SF_RING | Aion.SF_BELT | Aion.SF_WING
	},
	maxhp : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING,
		showAsSum : 1
	},
	maxmp : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING,
		showAsSum : 1
	},
	phyattack : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING
	},
	physicalcriticaldamagereduce : {
		flags : Aion.SF_HEAD | Aion.SF_BELT | Aion.SF_WING
	},
	physicalcriticalreducerate : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_WING,
		capValue : 700
	},
	physicaldefend : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING
	},
	pvpattackratio : {
		armfusionmax : 1,
		// godenchmax : 1,
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT,
		format : 'percent',
		divide : 10,
		signed : true
	},
	pvpattackratio_physical : {
		armfusionmax : 1,
		// flags : Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT,
		format : 'percent',
		divide : 10,
		signed : true,
		hidden : true
	},
	pvpattackratio_magical : {
		armfusionmax : 1,
		// flags : Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT,
		format : 'percent',
		divide : 10,
		signed : true,
		hidden : true
	},
	pvpdefendratio : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_BOOTS,
		format : 'percent',
		divide : 10,
		signed : true
	},
	pvpdefendratio_physical : {
		format : 'percent',
		divide : 10,
		signed : true
	},
	pvpdefendratio_magical : {
		format : 'percent',
		divide : 10,
		signed : true
	},
	speed : {
		flags : Aion.SF_BOOTS,
		format : 'percent',
		signed : true
	},
	paralyze_arp : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT | Aion.SF_WING
	},
	silence_arp : {
		flags : Aion.SF_WEAPON | Aion.SF_SHIELD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_RING | Aion.SF_BELT | Aion.SF_WING
	},
	arparalyze : {
		flags : Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING
	},
	arsilence : {
		flags : Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT | Aion.SF_WING
	},
	magicalskillboostresist : {
		flags : Aion.SF_SHIELD | Aion.SF_HEAD | Aion.SF_NECK | Aion.SF_EAR | Aion.SF_ARMOR | Aion.SF_SHOULDER | Aion.SF_LEGS | Aion.SF_GLOVES | Aion.SF_RING | Aion.SF_BOOTS | Aion.SF_BELT
	},
	magicaldefend : {}
}

Aion.equipTypes = {
	weapons : ['1h_sword', '1h_mace', '1h_dagger', '2h_orb', '2h_book', '2h_sword', '2h_polearm', '2h_staff', 'bow', '1h_gun', '2h_cannon', '2h_harp', '2h_keyblade'],
	leftHand : ['1h_sword', '1h_mace', '1h_dagger', 'shield', '1h_gun'],
	equipment : ['robe', 'leather', 'chain', 'plate']
};


Aion.aspdDual = {
	'1h_dagger' : {
		'1h_dagger' : 1.5,
		'1h_sword'  : 1.55,
		'1h_mace'   : 1.6
	},
	'1h_sword' : {
		'1h_dagger' : 1.7,
		'1h_sword'  : 1.75,
		'1h_mace'   : 1.8
	},
	'1h_mace' : {
		'1h_dagger' : 1.8,
		'1h_sword'  : 1.85,
		'1h_mace'   : 1.9
	},
	'1h_gun' : {
		'1h_gun' : 2.3
	}
};

Aion.classesData = {
	priest : {
		weapons : ['1h_mace', '2h_staff'],
		leftHand : ['shield'],
		armors : ['robe', 'leather', 'chain'],
		stats : {str : 105, vit: 110, acc: 90, agi : 90, 'int': 105, wis: 110},
		options : {
			mpfactor: [0.0075, 105, 207],
			hpfactor: [0.92, 34.4, 192]
		},
		ord : 1,
		parent: 'cleric'
	},
	chanter : {
		weapons : ['1h_mace', '2h_staff'],
		leftHand : ['shield'],
		armors : ['robe', 'leather', 'chain'],
		stats : {str : 110, vit: 105, acc: 90, agi : 90, 'int': 105, wis: 110},
		options : {
			mpfactor: [0.0075, 105, 207],
			hpfactor: [1.035, 38.7, 198]
		},
		ord : 2,
		parent: 'cleric'
	},
	fighter : {
		weapons : ['1h_mace', '1h_dagger', '1h_sword', '2h_sword', '2h_polearm', 'bow'],
		leftHand : ['1h_mace', '1h_dagger', '1h_sword', 'shield'],
		armors : ['robe', 'leather', 'chain', 'plate'],
		stats : {str : 115, vit: 115, acc: 100, agi : 100, 'int': 90, wis: 90},
		options : {
			mpfactor: [0.005, 70, 100],
			hpfactor: [1.265, 47.3, 286]
		},
		ord : 3,
		parent: 'warrior'
	},
	knight : {
		weapons : ['1h_mace', '1h_sword', '2h_sword'],
		leftHand : ['shield'],
		armors : ['robe', 'leather', 'chain', 'plate'],
		stats : {str : 115, vit: 100, acc: 100, agi : 100, 'int': 90, wis: 105},
		options : {
			mpfactor: [0.005, 70, 160],
			hpfactor: [1.3225, 49.45, 230]
		},
		ord : 4,
		parent: 'warrior'
	},
	ranger : {
		weapons : ['1h_dagger', '1h_sword', 'bow'],
		leftHand : ['1h_dagger', '1h_sword'],
		armors : ['robe', 'leather'],
		stats : {str : 100, vit: 100, acc: 115, agi : 115, 'int': 90, wis: 90},
		options : {
			mpfactor: [0.005, 70, 100],
			hpfactor: [0.805, 30.1, 140]
		},
		ord : 5,
		parent: 'scout'
	},
	assassin : {
		weapons : ['1h_dagger', '1h_sword', 'bow'],
		leftHand : ['1h_dagger', '1h_sword'],
		armors : ['robe', 'leather'],
		stats : {str : 110, vit: 100, acc: 110, agi : 110, 'int': 90, wis: 90},
		options : {
			mpfactor: [0.005, 70, 100],
			hpfactor: [1.035, 38.7, 180]
		},
		ord : 6,
		parent: 'scout'
	},
	wizard : {
		weapons : ['2h_book', '2h_orb'],
		leftHand : [],
		armors : ['robe'],
		stats : {str : 90, vit: 90, acc: 100, agi : 100, 'int': 120, wis: 110},
		options : {
			mpfactor: [0.0075, 105, 270],
			hpfactor: [0.74625, 28.075, 101]
		},
		ord : 7,
		parent: 'mage'
	},
	elementalist : {
		weapons : ['2h_book', '2h_orb'],
		leftHand : [],
		armors : ['robe'],
		stats : {str : 90, vit: 90, acc: 100, agi : 100, 'int': 115, wis: 115},
		options : {
			mpfactor: [0.0075, 105, 300],
			hpfactor: [0.805, 30.1, 112]
		},
		ord : 8,
		parent: 'mage'
	},
	gunner : {
		weapons : ['1h_gun', '2h_cannon'],
		leftHand : ['1h_gun'],
		armors : ['robe','leather'],
		stats : {str : 100, vit: 105, acc: 100, agi : 105, 'int': 100, wis: 100},
		options : {
			mpfactor: [0.005, 70, 140],
			hpfactor: [1.035, 38.7, 198]
		},
		ord : 9,
		parent: 'engineer'
	},
	rider : {
		weapons : ['1h_gun', '2h_keyblade'],
		leftHand : [],
		armors : ['robe','leather','chain'],
		stats : {str : 100, vit: 100, acc: 100, agi : 100, 'int': 105, wis: 105},
		options : {
			mpfactor: [0.01, 83.7, 197],
			hpfactor: [1.215, 44.55, 221]
		},
		ord : 11,
		parent: 'engineer'
	},
	bard : {
		weapons : ['2h_harp'],
		leftHand : [],
		armors : ['robe'],
		stats : {str : 90, vit: 100, acc: 100, agi : 100, 'int': 110, wis: 110},
		options : {
			mpfactor: [0.00625, 91.025, 233],
			hpfactor: [0.92, 34.4, 160]
		},
		ord : 10,
		parent: 'artist'
	},
	rider : {
		weapons : ['1h_gun', '2h_keyblade'],
		leftHand : [],
		armors : ['robe','leather','chain'],
		stats : {str : 100, vit: 100, acc: 100, agi : 100, 'int': 105, wis: 105},
		options : {
			mpfactor: [0.01, 83.7, 197],
			hpfactor: [1.215, 44.55, 221]
		},
		ord : 11
	}
};

Aion.passiveSkills = [
	{id:102,cl:{knight:13,fighter:13,rider:13},eid:101021,elvl:0,bonus:'boosthate',value:10},
	{id:103,cl:{priest:25,bard:25},eid:101031,elvl:0,bonus:'boosthate',value:-10},
	{id:104,cl:{fighter:37},eid:103081,elvl:0,bonus:'stumble_arp',value:200},
	{id:105,cl:{mage:5},eid:105001,elvl:0,bonus:'concentration',value:25},
	{id:111,cl:{fighter:25,knight:16},eid:103051,elvl:0,bonus:'block',value:100},
	{id:112,cl:{scout:9},eid:101521,elvl:0,bonus:'dodge',value:20},
	{id:113,cl:{fighter:40,knight:40,scout:5},eid:101131,elvl:0,bonus:'hitaccuracy',value:20},
	{id:114,cl:{priest:16,chanter:16},eid:107031,elvl:0,bonus:'arstagger',value:100},
	{id:114,cl:{priest:16,chanter:16},eid:107032,elvl:0,bonus:'arstumble',value:100},
	{id:114,cl:{priest:16,chanter:16},eid:107033,elvl:0,bonus:'arspin',value:100},
	{id:116,cl:{assassin:16},eid:106041,elvl:0,bonus:'magicalresist',value:20},
	{id:117,cl:{wizard:10,bard:10},eid:109011,elvl:0,bonus:'magicalskillboost',value:20},
	{id:119,cl:{wizard:16,bard:16},eid:109021,elvl:0,bonus:'maxmp_percent',value:3},
	{id:120,cl:{warrior:9,ranger:16},eid:102011,elvl:0,bonus:'parry',value:80},
	{id:121,cl:{warrior:5},eid:101011,elvl:0,bonus:'maxhp_percent',value:3},
	{id:121,cl:{warrior:5},eid:101212,elvl:0,bonus:'hpregen',value:4},
	{id:122,cl:{warrior:1,chanter:25},eid:103041,elvl:0,bonus:'phyattack',value:7},
	{id:123,cl:{knight:22,chanter:10},eid:104051,elvl:0,bonus:'elementaldefendall',value:20},
	{id:125,cl:{elementalist:31},eid:105001,elvl:20,bonus:'concentration',value:50},
	{id:129,cl:{assassin:25},eid:101251,elvl:0,bonus:'critical',value:50},
	{id:130,cl:{assassin:40},eid:101251,elvl:20,bonus:'critical',value:75},
	{id:131,cl:{fighter:51,knight:51,ranger:19,assassin:31},eid:101131,elvl:20,bonus:'hitaccuracy',value:40},
	{id:132,cl:{knight:55,ranger:37,assassin:41,fighter:55},eid:101131,elvl:40,bonus:'hitaccuracy',value:60},
	{id:133,cl:{ranger:31,assassin:19,gunner:31},eid:101521,elvl:20,bonus:'dodge',value:40},
	{id:134,cl:{ranger:41,assassin:34,gunner:41},eid:101521,elvl:40,bonus:'dodge',value:60},
	{id:135,cl:{assassin:37},eid:106041,elvl:20,bonus:'magicalresist',value:30},
	{id:138,cl:{fighter:28,knight:51},eid:103041,elvl:60,bonus:'phyattack',value:28},
	{id:139,cl:{wizard:50,bard:50},eid:109011,elvl:40,bonus:'magicalskillboost',value:180},
	{id:140,cl:{wizard:19,elementalist:19,bard:19},eid:101401,elvl:0,bonus:'elementaldefendall',value:100},
	{id:141,cl:{priest:30,wizard:30,elementalist:30,bard:30},eid:101411,elvl:0,bonus:'magicalcriticalreducerate',value:20},
	{id:142,cl:{priest:51,wizard:51,elementalist:51,bard:51},eid:101411,elvl:20,bonus:'magicalcriticalreducerate',value:40},
	{id:143,cl:{knight:50,rider:50},eid:101021,elvl:40,bonus:'boosthate',value:30},
	{id:358,cl:{fighter:10,knight:25,chanter:49},eid:103041,elvl:20,bonus:'phyattack',value:14},
	{id:359,cl:{fighter:34,knight:13},eid:101011,elvl:20,bonus:'maxhp_percent',value:6},
	{id:359,cl:{fighter:34,knight:13},eid:101212,elvl:20,bonus:'hpregen',value:10},
	{id:361,cl:{fighter:19,knight:41},eid:103041,elvl:40,bonus:'phyattack',value:21},
	{id:366,cl:{fighter:41,knight:45,rider:45},eid:101021,elvl:20,bonus:'boosthate',value:20},
	{id:367,cl:{fighter:45,knight:56},eid:103041,elvl:80,bonus:'phyattack',value:35},
	{id:496,cl:{fighter:49,knight:25},eid:101011,elvl:40,bonus:'maxhp_percent',value:9},
	{id:496,cl:{fighter:49,knight:25},eid:101212,elvl:40,bonus:'hpregen',value:20},
	{id:497,cl:{knight:28},eid:103051,elvl:20,bonus:'block',value:150},
	{id:498,cl:{knight:40,chanter:41},eid:104051,elvl:20,bonus:'elementaldefendall',value:30},
	{id:499,cl:{knight:40},eid:101011,elvl:60,bonus:'maxhp_percent',value:12},
	{id:499,cl:{knight:40},eid:101212,elvl:60,bonus:'hpregen',value:38},
	{id:526,cl:{knight:47},eid:101011,elvl:80,bonus:'maxhp_percent',value:15},
	{id:526,cl:{knight:47},eid:101212,elvl:80,bonus:'hpregen',value:48},
	{id:548,cl:{knight:31},eid:105481,elvl:0,bonus:'pvpdefendratio',value:100},
	{id:795,cl:{ranger:47},eid:101131,elvl:60,bonus:'hitaccuracy',value:80},
	{id:922,cl:{assassin:44},eid:101521,elvl:60,bonus:'dodge',value:80},
	{id:923,cl:{assassin:49},eid:101251,elvl:40,bonus:'critical',value:100},
	{id:1172,cl:{chanter:45,priest:41},eid:107031,elvl:20,bonus:'arstagger',value:200},
	{id:1172,cl:{priest:41,chanter:45},eid:107032,elvl:20,bonus:'arstumble',value:200},
	{id:1172,cl:{priest:41,chanter:45},eid:107033,elvl:20,bonus:'arspin',value:200},
	{id:1173,cl:{priest:45,bard:45},eid:101031,elvl:20,bonus:'boosthate',value:-20},
	{id:1578,cl:{wizard:41,bard:41},eid:109011,elvl:20,bonus:'magicalskillboost',value:100},
	{id:1579,cl:{wizard:45,bard:45},eid:109021,elvl:20,bonus:'maxmp_percent',value:6},
	{id:1775,cl:{elementalist:43},eid:105001,elvl:40,bonus:'concentration',value:75},
	{id:2674,cl:{ranger:56},eid:101131,elvl:80,bonus:'hitaccuracy',value:100},
	{id:2675,cl:{assassin:56},eid:101521,elvl:80,bonus:'dodge',value:100},
	{id:2676,cl:{assassin:60},eid:101251,elvl:60,bonus:'critical',value:125},
	{id:2677,cl:{wizard:56,bard:56},eid:109021,elvl:40,bonus:'maxmp_percent',value:7},
	{id:2678,cl:{elementalist:56},eid:105001,elvl:60,bonus:'concentration',value:100},
	{id:2679,cl:{wizard:10,elementalist:10,priest:10},eid:117751,elvl:0,bonus:'magicalskillboostresist',value:100},
	{id:2680,cl:{wizard:22,elementalist:22,priest:34},eid:117751,elvl:20,bonus:'magicalskillboostresist',value:120},
	{id:2681,cl:{wizard:34,elementalist:34,priest:60},eid:117751,elvl:40,bonus:'magicalskillboostresist',value:140},
	{id:2682,cl:{wizard:48,elementalist:48},eid:117751,elvl:60,bonus:'magicalskillboostresist',value:160},
	{id:2683,cl:{elementalist:60,wizard:60},eid:117751,elvl:80,bonus:'magicalskillboostresist',value:180},
	{id:-1,cl:{assassin:25,ranger:25,elementalist:25,wizard:25,fighter:25,knight:25,chanter:25,priest:25},eid:111533,elvl:80,bonus:'flyspeed',value:33}
];

Aion.passiveEquipment = [
	{id:1,cl:{warrior:1,scout:1},eid:101,elvl:1,type:'1h_sword',bonus:'phyattack',value:16},
	{id:3,cl:{warrior:1,cleric:1},eid:103,elvl:1,type:'1h_mace',bonus:'phyattack',value:20},
	{id:8,cl:{fighter:9,knight:9,ranger:9,assassin:9},eid:101,elvl:2,type:'1h_sword',bonus:'phyattack',value:24},
	{id:9,cl:{ranger:9,assassin:9,fighter:9},eid:102,elvl:2,type:'1h_dagger',bonus:'phyattack',value:30},
	{id:10,cl:{fighter:9,knight:9,priest:9,chanter:9},eid:103,elvl:2,type:'1h_mace',bonus:'phyattack',value:28},
	{id:15,cl:{fighter:9,knight:9},eid:104,elvl:1,type:'2h_sword',bonus:'phyattack',value:4},
	{id:16,cl:{fighter:9},eid:105,elvl:0,type:'2h_polearm',bonus:'phyattack',value:4},
	{id:17,cl:{fighter:9,ranger:9,assassin:9},eid:109,elvl:2,type:'bow',bonus:'phyattack',value:2},
	{id:30,cl:{scout:1},eid:102,elvl:1,type:'1h_dagger',bonus:'phyattack',value:20},
	{id:53,cl:{priest:9,chanter:9},eid:106,elvl:2,type:'2h_staff',bonus:'phyattack',value:10},
	{id:64,cl:{mage:1},eid:107,elvl:1,type:'2h_book',bonus:'magicalattack',value:0},
	{id:71,cl:{wizard:9,elementalist:9},eid:107,elvl:2,type:'2h_book',bonus:'magicalattack',value:2},
	{id:75,cl:{wizard:9,elementalist:9},eid:108,elvl:2,type:'2h_orb',bonus:'magicalattack',value:28},
	{id:79,cl:{rider:9},eid:113,elvl:1,type:'2h_keyblade',bonus:'magicalattack',value:16},
	{id:336,cl:{knight:25,ranger:25,assassin:25,fighter:25},eid:101,elvl:3,type:'1h_sword',bonus:'phyattack',value:30},
	{id:337,cl:{fighter:25,ranger:25,assassin:25},eid:102,elvl:3,type:'1h_dagger',bonus:'phyattack',value:35},
	{id:338,cl:{fighter:25,knight:25,priest:25,chanter:25},eid:103,elvl:3,type:'1h_mace',bonus:'phyattack',value:34},
	{id:339,cl:{fighter:25,knight:25},eid:104,elvl:3,type:'2h_sword',bonus:'phyattack',value:8},
	{id:340,cl:{fighter:25},eid:105,elvl:3,type:'2h_polearm',bonus:'phyattack',value:8},
	{id:341,cl:{fighter:25,ranger:25,assassin:25},eid:109,elvl:3,type:'bow',bonus:'phyattack',value:4},
	{id:342,cl:{fighter:40,knight:40,ranger:40,assassin:40},eid:101,elvl:4,type:'1h_sword',bonus:'phyattack',value:34},
	{id:343,cl:{fighter:40,ranger:40,assassin:40},eid:102,elvl:4,type:'1h_dagger',bonus:'phyattack',value:40},
	{id:344,cl:{priest:40,chanter:40,fighter:40,knight:40},eid:103,elvl:4,type:'1h_mace',bonus:'phyattack',value:38},
	{id:345,cl:{fighter:40,knight:40},eid:104,elvl:4,type:'2h_sword',bonus:'phyattack',value:12},
	{id:346,cl:{fighter:40},eid:105,elvl:4,type:'2h_polearm',bonus:'phyattack',value:12},
	{id:347,cl:{fighter:40,ranger:40,assassin:40},eid:109,elvl:4,type:'bow',bonus:'phyattack',value:6},
	{id:368,cl:{ranger:50,assassin:50,fighter:50,knight:50},eid:101,elvl:5,type:'1h_sword',bonus:'phyattack',value:38},
	{id:369,cl:{fighter:50,ranger:50,assassin:50},eid:102,elvl:5,type:'1h_dagger',bonus:'phyattack',value:45},
	{id:370,cl:{fighter:50,knight:50,priest:50,chanter:50},eid:103,elvl:5,type:'1h_mace',bonus:'phyattack',value:42},
	{id:371,cl:{fighter:50,knight:50},eid:104,elvl:5,type:'2h_sword',bonus:'phyattack',value:15},
	{id:372,cl:{fighter:50},eid:105,elvl:5,type:'2h_polearm',bonus:'phyattack',value:15},
	{id:373,cl:{fighter:50,ranger:50,assassin:50},eid:109,elvl:5,type:'bow',bonus:'phyattack',value:8},
	{id:1157,cl:{priest:25,chanter:25},eid:106,elvl:3,type:'2h_staff',bonus:'phyattack',value:15},
	{id:1159,cl:{priest:40,chanter:40},eid:106,elvl:4,type:'2h_staff',bonus:'phyattack',value:20},
	{id:1175,cl:{priest:50,chanter:50},eid:106,elvl:5,type:'2h_staff',bonus:'phyattack',value:25},
	{id:1551,cl:{wizard:25,elementalist:25},eid:107,elvl:3,type:'2h_book',bonus:'magicalattack',value:4},
	{id:1552,cl:{wizard:40,elementalist:40},eid:107,elvl:4,type:'2h_book',bonus:'magicalattack',value:6},
	{id:1580,cl:{wizard:50,elementalist:50},eid:107,elvl:5,type:'2h_book',bonus:'magicalattack',value:8},
	{id:1743,cl:{wizard:25,elementalist:25},eid:108,elvl:3,type:'2h_orb',bonus:'magicalattack',value:34},
	{id:1745,cl:{wizard:40,elementalist:40},eid:108,elvl:4,type:'2h_orb',bonus:'magicalattack',value:38},
	{id:1777,cl:{wizard:50,elementalist:50},eid:108,elvl:5,type:'2h_orb',bonus:'magicalattack',value:44},
	// {id:4,cl:{warrior:1,scout:1,cleric:1,mage:1},eid:121,elvl:1,type:'clothes',bonus:'physicaldefend',value:10},
	// {id:5,cl:{cleric:1,warrior:1,scout:1},eid:122,elvl:1,type:'leather',bonus:'physicaldefend',value:10},
	// {id:6,cl:{warrior:1},eid:123,elvl:1,type:'chain',bonus:'physicaldefend',value:10},
	{id:7,cl:{warrior:1},eid:126,elvl:1,type:'shield',bonus:'damage_reduce',value:0},
	// {id:12,cl:{assassin:9,priest:9,chanter:9,fighter:9,knight:9,ranger:9,gunner:10},eid:122,elvl:2,type:'leather',bonus:'physicaldefend',value:10},
	// {id:13,cl:{fighter:9,knight:9,priest:9,chanter:9},eid:123,elvl:2,type:'chain',bonus:'physicaldefend',value:10},
	{id:14,cl:{fighter:9,knight:9,priest:9,chanter:9},eid:126,elvl:2,type:'shield',bonus:'damage_reduce',value:5,abs:1},
	// {id:18,cl:{fighter:9,knight:9},eid:124,elvl:2,type:'plate',bonus:'physicaldefend',value:10},
	// {id:67,cl:{warrior:1,scout:1,cleric:1,mage:1},eid:125,elvl:1,type:'robe',bonus:'physicaldefend',value:10},
	// {id:70,cl:{priest:9,chanter:9,wizard:9,elementalist:9, bard:10},eid:125,elvl:2,type:'robe',bonus:'physicaldefend',value:10},
	
	{id:83,cl:{gunner:10},eid:110,elvl:2,type:'1h_gun',bonus:'magicalattack',value:24},
	{id:84,cl:{gunner:25},eid:110,elvl:3,type:'1h_gun',bonus:'magicalattack',value:30},
	{id:85,cl:{gunner:40},eid:110,elvl:4,type:'1h_gun',bonus:'magicalattack',value:34},
	{id:86,cl:{gunner:50},eid:110,elvl:5,type:'1h_gun',bonus:'magicalattack',value:38},
	{id:77,cl:{gunner:25},eid:111,elvl:1,type:'2h_cannon',bonus:'magicalattack',value:0},
	{id:87,cl:{gunner:40},eid:111,elvl:2,type:'2h_cannon',bonus:'magicalattack',value:6},
	{id:88,cl:{gunner:50},eid:111,elvl:3,type:'2h_cannon',bonus:'magicalattack',value:8},
	{id:89,cl:{gunner:60},eid:111,elvl:4,type:'2h_cannon',bonus:'magicalattack',value:12},
	
	{id:92,cl:{bard:10},eid:112,elvl:2,type:'2h_harp',bonus:'magicalattack',value:20},
	{id:93,cl:{bard:25},eid:112,elvl:3,type:'2h_harp',bonus:'magicalattack',value:24},
	{id:94,cl:{bard:40},eid:112,elvl:4,type:'2h_harp',bonus:'magicalattack',value:28},
	{id:95,cl:{bard:50},eid:112,elvl:5,type:'2h_harp',bonus:'magicalattack',value:32}
];

Aion.manaData = {
	30 : {
		phyattack : [2, 4],
		maxhp : [40, 65],
		maxmp : [40, 65],
		block : [16, 21],
		parry : [16, 21],
		hitaccuracy : [16, 21],
		magicalskillboost : [16, 21],
		maxfp : [0, 4],
		dodge : [8, 11],
		critical : [8, 11]
	},
	40 : {
		phyattack : [0, 0, 4, 2],
		maxhp : [50, 75, 75, 37],
		maxmp : [50, 75, 75, 37],
		block : [18, 23, 0, 11],
		parry : [18, 23, 23, 11],
		hitaccuracy : [18, 23, 0, 11],
		magicalskillboost : [18, 23, 23, 11],
		magicalhitaccuracy : [0, 10, 10, 5],
		magicalresist : [0, 10, 0, 5],
		maxfp : [0, 5, 0, 0],
		dodge : [10, 13, 13, 11],
		critical : [10, 13, 13, 6]
	},
	50 : {
		maxhp : [60, 85, 85, 42],
		maxmp : [60, 85, 85, 42],
		phyattack : [3, 5, 5, 2],
		block : [20, 25, 0, 12],
		parry : [20, 25, 25, 12],
		hitaccuracy : [20, 25, 0, 12],
		magicalskillboost : [20, 25, 25, 12],
		magicalhitaccuracy : [0, 12, 12, 6],
		magicalresist : [0, 12, 0, 6],
		maxfp : [0, 6, 0, 0],
		dodge : [12, 15, 15, 12],
		critical : [12, 15, 15, 7]
	},
	60 : {
		phyattack : [0, 0, 5, 2],
		maxhp : [70, 95, 95, 47],
		maxmp : [70, 95, 95, 47],
		block : [22, 27, 0, 13],
		parry : [22, 27, 27, 13],
		hitaccuracy : [22, 27, 0, 13],
		magicalskillboost : [22, 27, 27, 13],
		magicalhitaccuracy : [0, 14, 14, 7],
		magicalresist : [0, 14, 0, 7],
		maxfp : [0, 7, 0, 0],
		dodge : [14, 17, 17, 13],
		critical : [14, 17, 17, 8],
		healskillboost: [0, 3, 0, 0]
	},
	70 : {
		phyattack : [0, 0, 5, 2],
		maxhp : [80, 100, 0, 50],
		maxmp : [80, 100, 0, 50],
		block : [24, 29, 0, 14],
		parry : [24, 29, 0, 14],
		hitaccuracy : [24, 29, 0, 14],
		magicalskillboost : [24, 28, 27, 14],
		magicalhitaccuracy : [0, 16, 16, 8],
		magicalresist : [0, 16, 0, 8],
		dodge : [16, 19, 0, 14],
		critical : [16, 19, 19, 9],
		magicalcritical : [0, 5, 0, 0]
	}
};

Aion.ancientManastones = {
	70 : {
		3 : {
			hitaccuracy: 33,
			dodge : 23,
			parry : 33,
			block : 33,
			physicalcriticalreducerate : 22,
			magicalcriticalreducerate : 9,
			physicaldefend : 80,
			phyattack : 7,
			magicalhitaccuracy : 20,
			magicalskillboost : 32
			// pvpdefendratio : 3,
			// pvpdefendratio : 5
		},
		2 : {
			maxhp : 105,
			maxmp : 120,
			hitaccuracy: 31,
			dodge : 21,
			parry : 31,
			block : 31,
			critical : 20,
			physicalcriticalreducerate : 21,
			magicalcriticalreducerate : 8,
			magicalcritical : 7,
			physicaldefend : 70,
			magicalresist : 19,
			phyattack : 6,
			magicalhitaccuracy : 18,
			magicalskillboost : 30,
			magicalskillboostresist : 40,
			healskillboost : 5		
		},
		1 : {
			hitaccuracy : 29,
			dodge : 19,
			parry : 29,
			block : 29,
			critical : 18,
			physicalcriticalreducerate : 20,
			magicalcritical : 6,
			magicalcriticalreducerate : 7,
			physicaldefend : 60,
			magicalresist : 17,
			phyattack : 5,
			magicalhitaccuracy : 16,
			magicalskillboost : 28,
			magicalskillboostresist : 30,
			healskillboost : 4
		}
	}
};

Aion.manaLetters = {
	maxhp : 'h',
	maxmp : 'm',
	phyattack : 'a',
	block : 'b',
	parry : 'p',
	hitaccuracy : 'i',
	magicalskillboost : 'o',
	magicalhitaccuracy : 'y',
	magicalresist : 'r',
	maxfp : 'f',
	dodge : 'd',
	critical : 'c',
	healskillboost : 'w',
	magicalcritical : 'u',
	magicalcriticalreducerate : 'v',
	physicalcriticalreducerate : 'l',
	physicaldefend : 'q',
	magicalskillboostresist : 'z'
	// egjknstx
};

Aion.manaListNormal = [
	'maxhp','maxmp','phyattack','block','parry','hitaccuracy','magicalskillboost',
	'magicalhitaccuracy','magicalresist','maxfp','dodge','critical','healskillboost'
];

Aion.manaAncientRanks = ['A','B','C'];
Aion.manaLevels = ['9','0','1','2','3','4','5','6','7','8'];
Aion.manastoneRestriction = ['co', 'do', 'ho', 'mo', 'ao', 'po', 'da', 'oa', 'ha', 'ma', 'pa'];

Aion.manastoneOther = ['maxfp', 'healskillboost', 'magicalcritical'];

function getRandomOptions(slot) {
	if (! items[slot] || ! items[slot].randomset)
		return '';
		
	var set = randomOptions[items[slot].randomset];
	if (!set)
		return '';
	
	var reshtml = '<table width="100%"><col align="left" width="*" /><col width="95%" align="left" /><tbody>';
	for (var ind in set) {
		var bonuses = set[ind];
		var p=0;
		if (ind > 0)
			reshtml += '<tr><td colspan="2"><hr /></td></tr>';
		if (! items[slot].selectedRandomSet)
			items[slot].selectedRandomSet= '0';
		reshtml += '<tr class="random-row" id="random-row_'+ ind +'"><td><input type="radio"'+ (items[slot].selectedRandomSet == ind ? ' checked' : '') +' /></td><td>';
		reshtml += getRandomOptionSet(items[slot].randomset, ind);
		reshtml += '</td></tr>'
	}
	reshtml += '</table>';
	return reshtml;
}

function addCommas(nStr) {
	nStr += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + ' ' + '$2');
	}
	return nStr;
}

function makePrice(i) {
	if (! i.currency)
		return '';
	var reshtml = '<div class="tooltipborder"><table border="0">';
	for (var item in i.currency) {
		var icon = Calc.currencies[item] ? Calc.currencies[item].icon : 'none';
		var label = Calc.currencies[item] ? Calc.currencies[item].label : item;
		if (Calc.currencies[item] && Calc.currencies[item].rank)
			label = '<span class="item-rank-'+ Calc.currencies[item].rank +'">'+ label +'</span>';
		if (icon == 'abyss')
			reshtml += '<tr><td class="price_amount">'+ addCommas(i.currency[item]) +'</td><td class="price_image" align="center"><div class="itembox_c" style="width:16px;height:16px;background-image:url(/icons/items/'+ icon +'.png)"></div></td><td class="price_text">'+ label +'</td></tr>';
		else
			reshtml += '<tr><td class="price_amount">'+ addCommas(i.currency[item]) +'</td><td class="price_image"><div class="itembox_c" style="background-image:url(/icons/items/'+ icon +'.png)"></div></td><td class="price_text">'+ label +'</td></tr>';
	}
	reshtml += '</table></div>';
	return reshtml;
}
function makeprice2(i) {
	if (! i.currency2)
		return '';
	var reshtml = '<div class="tooltipborder"><table border="0">';
	for (var item in i.currency2) {
		var icon = Calc.currencies[item] ? Calc.currencies[item].icon : 'none';
		var label = Calc.currencies[item] ? Calc.currencies[item].label : item;
		if (Calc.currencies[item] && Calc.currencies[item].rank)
			label = '<span class="item-rank-'+ Calc.currencies[item].rank +'">'+ label +'</span>';
		if (icon == 'abyss')
			reshtml += '<tr><td class="price_amount">'+ addCommas(i.currency2[item]) +'</td><td class="price_image" align="center"><div class="itembox_c" style="width:16px;height:16px;background-image:url(/icons/items/'+ icon +'.png)"></div></td><td class="price_text">'+ currencies2[item].label +'</td></tr>';
		else
			reshtml += '<tr><td class="price_amount">'+ addCommas(i.currency2[item]) +'</td><td class="price_image"><div class="itembox_c" style="background-image:url(/icons/items/'+ icon +'.png)"></div></td><td class="price_text">'+ label +'</td></tr>';
	}
	reshtml += '</table></div>';
	return reshtml;
}

function formatBonus(attr, val, signed) {
	if (val === undefined)
		return '';
		
	if (val+'' == '0.00')
		val = 0;
	
	if (Aion.bonusesData[attr] === undefined || Aion.bonusesData[attr].format === undefined)
		return signed ? (val > 0 ? '+' + val : val) : val;
	
	var res = val;
	
	if (Aion.bonusesData[attr].divide > 0)
		res = res / Aion.bonusesData[attr].divide;
	if (Aion.bonusesData[attr].signed)
		signed = true;

	res = signed ? (val > 0 ? '+' + res : res) : res;
	if (Aion.bonusesData[attr].format == 'percent') {
		res += '%';
	}
	return res;
}

function bonussum() {
	var result = {};
	var usemax = 0;
	var type = false;
	
	if (arguments.length < 2)
		return {};
	
	type = arguments[arguments.length-1];
		
	for (var i=0; i < arguments.length - 1; i++) {
		for (var bonus in arguments[i]) {
			if (type == 'armfusion' && Aion.bonusesData[bonus].armfusionmax) {
				result[bonus] = Math.max((result[bonus] || 0), arguments[i][bonus]);
			} else if (type == 'godench' && Aion.bonusesData[bonus].godenchmax) {
				result[bonus] = Math.max((result[bonus] || 0), arguments[i][bonus]);
			} else if (type == 'dual' && Aion.bonusesData[bonus].dual_max) {
				result[bonus] = Math.max((result[bonus] || 0), arguments[i][bonus]);
			} else if (type == 'offhand' && (Aion.bonusesData[bonus].dual_primary || Aion.bonusesData[bonus].dual_mhonly)) {
				//do nothing
			} else
				result[bonus] = (result[bonus] || 0) + arguments[i][bonus];
		}
	}
	return result;
}

function getLang(category, name) {
	if (lang[category] && lang[category][name]) {
		var result = lang[category][name];
		for (var i = 1; i < arguments.length -1; ++i) {
			var re = new RegExp('%'+i, 'g');
			result = result.replace(re, arguments[i+1]);
		}
		return result;
	}
	// return '&lt;'+ category +' - '+ name +'&gt;';
	return name;
}