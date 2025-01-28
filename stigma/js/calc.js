var Calc = {
	items : {},
	itemSets : [],
	currentItemSet : 0,
	className : '',
	classLevel : 65,
	selectedSlot : '',
	searchResults : {},
	currencies : {},
	setData : {},
	allSetItems : {},
	randomData : {},
	items2set : {},
	items2name : {},
	orderField : '',
	isArmfusion : 0,
	armfusionType: '',
	armfusionLevel: 0,
	armfusionWay: 0,
	manastoneLevel : 0,
	manastoneType : '',
	manastoneSlot : 0,
	manastoneRank : 3,
	ajaxId : 0,
	searchTimeOut : 0,
	levelTimeOut : 0,
	filters : {},
	activePage : 1,
	backgrounds : {
		all : ['tank-01', 'glad-01', 'mage-01', 'heal-01', 'heal-02', 'sin-01', 'rang-01', 'sm-01', 'bard-01', 'gu-01'],
		priest : ['heal-02'],
		chanter : ['heal-01'],
		wizard : ['mage-01'],
		elementalist : ['sm-01'],
		ranger : ['rang-01'],
		assassin : ['sin-01'],
		fighter : ['glad-01'],
		knight : ['tank-01'],
		bard : ['bard-01'],
		gunner : ['gu-01']
	},
	MAX_ITEM_SETS : 5,
	MAX_ITEM_SET_NAME : 13
};

Calc.showLoading = function(opt) {
	if (opt && opt.noBlock)
		$("#loading .window-modal").hide();
	else
		$("#loading .window-modal").show();
	$("#loading").show();
}
Calc.hideLoading = function() {
	$("#loading").hide();
}

Calc.init = function() {
	$("#item-picker").makeWindow();
	$("#item-modify").makeWindow();
	$("#item-randomize").makeWindow();
	$("#item-compare").makeWindow();
	$("#share-link").makeWindow();
	$("#beta_info").makeWindow();
	$("#loading").makeWindow({closable:false});
	
	Calc.changeBackground();
	
	for (var i in Aion.slotData) {
		Calc.refreshItem(i);
	}
	
	$("#item-picker input[type=text]").keyup(function(e) {
		if (e.altKey || e.ctrlKey && e.which != 86 || e.which >= 16 && e.which <= 18)
			return;
		Calc.changed();
	}).change(function(){Calc.changed()});
	$("#item-picker input[type=checkbox]").click(function(){Calc.changed()});
	// $("#item-picker select").change(function(){Calc.changed()});
	
	Calc.classPicker();
	
	$("#class-picker input.select-input").change(function(){
		Calc.classChanged($(this).attr('value'));
	});
	
	$("#class-level").attr('value', Aion.MAX_CHAR_LEVEL);
	$("#class-level").keyup(function(){
		clearTimeout(Calc.levelTimeOut);
		levelTimeOut = setTimeout(function(){Calc.classSetLevel($("#class-level").attr('value'))}, 500);
	}).click(function(){$(this).select()});
	
	Calc.initManastones();
	
	for (var stat in Aion.bonusesData) {
		$(".ifacestring-"+ stat).html(getLang('bonusnames', stat));
	}
	Calc.showBonuses();
	
	$("#bookmark_allstats .window-close").click(function(){
		$("#bookmark_allstats").hide();
		$("#right_buttons").show();
	});
	$("#stat_open").click(function(){
		$("#bookmark_allstats").show();
		Calc.showBonuses();
		$("#right_buttons").hide();
	});
	$("#link_open").click(function(){
		var hash = Calc.getHash();
		
		if (!hash) {
			Calc.showHashLink('');
		} else {
			Calc.showHashLink(hash);
			Calc.showLoading();
			$.ajax({
				url: 'itemsearch.php',
				data: {'savehash': hash},
				success: function(data){Calc.showHashLink(hash, data)},
				error: function(data){Calc.hideLoading()},
				dataType: 'json'
			});
		}
		
		$("#share-link").show();
		$("#equipment_link").select().focus();
	});
	
	$("#comapre_open").click(function(){Calc.compare()});
	
	$("#share-link input").keydown(function(){$(this).select();});
	$("#share-link input").click(function(){$(this).select();return false;});
	
	$(".lang-icon").click(function() {
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.langChange(res[1]);
		}
	});
	
	$('#item-picker input[type="checkbox"], #item-picker input[type="checkbox"] + label').click(function(e){
		if (checkKey(e)) {
			$(this).parents('table').first().find('input[type="checkbox"]').attr('checked', false);
			$(this).attr('checked', true);
			Calc.changed();
			return false;
		}
	});
	
	$('#item-picker label').click(function(e){
		if (checkKey(e)) {
			$(this).parents('table').first().find('input[type="checkbox"]').attr('checked', false);
			var id = $(this).attr('for');
			$('#'+id).attr('checked', true);
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	});
	
	$('.stat-tooltip-value').mouseenter(function(){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			var h = '<div class="tooltipborder">';
			if (Calc.displayBonuses[res[1]]) {
				h += Calc.displayBonuses[res[1]] + '</div>';
			} else {
				h += '0 (0 + <span class="item-rank-2">0</span>)</div>';
			}
			$('#stat_detail').html(h);
			$('#stat_detail').show();
		}
	});
	$('.stat-tooltip-value').mousemove(function(e){
		UI.reposWindow("#stat_detail", e);
	});
	$('.stat-tooltip-value').mouseleave(function(){
		$('#stat_detail').hide();
	});
	
	Calc.itemSets[0] = {
		name: getLang('interface', 'set')+' 1',
		items : Calc.items
	};
	
	Calc.refreshSets();

	$("#cost_info").mouseenter(function(){$("#cost_tooltip").show()});
	$("#cost_info").mouseleave(function(){$("#cost_tooltip").hide()});
	
	if (location.hash) {
		var a = location.hash.split('#');
		if (!a[0] && a.length > 0) {
			a.shift();
		}
		if (a[0])
			Calc.loadFromHash(a.join('#'));
	}
	
	Calc.loadFilters();
	
	$(".lang-icon").toggleClass('lang-incative', true);
	$("#lang_"+ Calc.lang).toggleClass('lang-incative', false);
	
	$(document).mousewheel(function(event, delta) {
		if ($('#tooltip').is(':visible') && (checkKey(event) || event.altKey)) {
			Calc.switchPage(event, delta);
			return false;
		}
	});
	
	$(document).keyup(function(e){
		if ($('#tooltip').is(':visible') && checkKey(e)) {
			if (e.keyCode == 39) {
				Calc.switchPage(undefined, 1);
			} else if (e.keyCode == 37) {
				Calc.switchPage(undefined, -1);
			}
		}
	});
	
	$("span.inputbox input").focus(function() {
		$(this).parent().toggleClass('focused', true);
	});
	$("span.inputbox input").blur(function() {
		$(this).parent().toggleClass('focused', false);
	});
	
	if (Calc.lang == 'ru') {
		$('#filter_403').show();
	}
}

Calc.showHashLink = function(hash, data) {
	var link = hash;
	if (data && data.shortlink) {
		link = '!'+data.shortlink;
	}
	link = location.protocol +'//'+ location.hostname + (location.pathname ? location.pathname : '/') + (link ? '#'+ link : '');
	$("#equipment_link").attr('value', link);
	$("#equipment_bblink").attr('value', '[url="'+ link +'"]'+ getLang('interface', 'equipment') +'[/url]');
	Calc.hideLoading();
}

Calc.changed = function(){
	if (Calc.searchTimeOut)
		clearTimeout(Calc.searchTimeOut);
	Calc.searchTimeOut = setTimeout(function(){Calc.itemSearchStart()}, 500)
}

Calc.classSetLevel = function(lvl) {
	if (lvl < Aion.MIN_CHAR_LEVEL) {
		lvl = Aion.MIN_CHAR_LEVEL;
		$("#class-level").attr('value', lvl);
	} else if (lvl > Aion.MAX_CHAR_LEVEL) {
		lvl = Aion.MAX_CHAR_LEVEL;
		$("#class-level").attr('value', lvl);
	}
	$("#class-level").blur();
	this.classLevel = parseInt(lvl, 10);
	Calc.checkAllValid();
}

Calc.classChanged = function(clname) {
	this.className = clname ? clname : '';
	Calc.checkAllValid();
	Calc.changeBackground();
}

Calc.changeBackground = function() {
	var b;
	if (Calc.backgrounds[this.className]) {
		b = Calc.backgrounds[this.className];
	} else {
		b = Calc.backgrounds.all;
	}
	var item = b[Math.floor(Math.random()*b.length)];
	$("#bookmarks").attr('class', 'background-' + item);
}

Calc.itemInteract = function(slot) {
	var fslot = Calc.getFilterSlot();
		
	Calc.currentOrderField = Calc.filters[fslot];
	this.selectedSlot = slot;
	
	fslot = Calc.getFilterSlot();
		
	if (Calc.filters[fslot])
		Calc.currentOrderField = Calc.filters[fslot];
	if (! Calc.currentOrderField)
		Calc.currentOrderField = {};
	
	$("#item-picker").show();	
	$("#item_wptype").hide();
	$("#item_eqtype").hide();
	
	var types = Calc.getEquipmentTypes();
	
	if (Aion.slotData[this.selectedSlot].filterWeaponType) {
		if (types.length > 2) {
			// types.unshift({value: 0, label: getLang('equipment_types', 'all')})
			$("#item_wptype").makeSelect({
				classRow : 'order-field-row',
				classLabel : 'order-field-label',
				icons : 0,
				firstAlways: 0,
				items: types 
			});
			$("#item_wptype").show();
			$("#item_wptype .select-input").change(Calc.changed);
		} else if (types.length > 0) {
			$("#item_wptype .select-input").attr('value', 0);
		}
	} else if (Aion.slotData[this.selectedSlot].filterEquipType) {
		if (types.length > 2) {
			// types.unshift({value: 0, label: getLang('equipment_types', 'all')})
			$("#item_eqtype").makeSelect({
				classRow : 'order-field-row',
				classLabel : 'order-field-label',
				icons : 0,
				firstAlways: 0,
				items: types 
			});
			$("#item_eqtype").show();
			$("#item_eqtype .select-input").change(Calc.changed);
		} else if (types.length > 0) {
			$("#item_eqtype .select-input").attr('value', 0);
		}
	}
	
	var bonuses = [];
	var bonusesF = [];
	var ord = '';
	var names = [];
	for (var attr in Aion.bonusesData) {
		if (Aion.bonusesData[attr].flags & Aion.slotData[this.selectedSlot].slotFlag && !Aion.bonusesData[attr].hidden) {
			names.push(attr);
		}
	}
	
	names.sort(function(a,b){return (getLang('bonusnames', a) >= getLang('bonusnames', b) ? 1 : -1)});
	
	var filterattr = '';
	for (var i in names) {
		var attr = names[i];
		if (! ord || attr == Calc.currentOrderField.order) {
			ord = attr;
			bonuses.unshift({label: getLang('bonusnames', attr), value: attr});
		} else {
			bonuses.push({label: getLang('bonusnames', attr), value: attr});
		}
		if (attr == Calc.currentOrderField.filter && (Aion.bonusesData[attr].flags & Aion.slotData[slot].slotFlag)) {
			// ord = attr;
			filterattr = attr;
		}
		bonusesF.push({label: getLang('bonusnames', attr), value: attr});
	}
	
	Calc.orderField = ord;
			
	$("#order-field").makeSelect({
		classRow : 'order-field-row',
		classLabel : 'order-field-label',
		icons : 0,
		firstAlways: 0,
		items: bonuses,
		sortByName : 1 
	});
	
	$("#order-field .select-input").change(function() {
		Calc.orderField = $(this).attr('value');
		// Calc.currentOrderField[Calc.selectedSlot] = Calc.orderField;
		Calc.changed();
	});
	
	bonusesF.unshift({label: getLang('bonusnames', 'level'), value: 'level'});
	if (filterattr) {
		bonusesF.unshift({label: getLang('bonusnames', filterattr), value: filterattr});
	} else {
		filterattr = 'level';
	}
		
	$("#stat-filter").makeSelect({
		classRow : 'order-field-row',
		classLabel : 'order-field-label',
		icons : 0,
		firstAlways: 0,
		items: bonusesF
	});
	
	$("#stat-filter .select-input").change(function() {Calc.changed()});
	
	$("#itemsearch").focus().select();
	Calc.itemSearchStart();
}

Calc.modifyItem = function(slot) {
	var item = Calc.items[slot];
	if (! item)
		return false;
	
	this.selectedSlot = slot;
	var reshtml = '';
	if (Aion.slotData[slot].allowGrade && item.max_enchant_value > 0) {
		
		reshtml += '<br clear="all" /><table class="enchant-wrapper"><tr><td>'+ getLang('interface', 'enchantitem') + '&nbsp;&nbsp;</td>';
		for (var i = 0; i <= item.max_enchant_value; ++i) {
			reshtml += '<td id="enchantValue_'+ i +'" class="enchant-box'+ (item.enchantValue == i ? ' enchant-box-checked' : '') + (item.max_enchant_value - item.max_enchant_bonus < i ? ' enchant-box-optional' : '') +'">'+ (i > 0 ? '+' : '') + i +'</td>';
		}
		reshtml += '</tr></table>';
	}
	
	if (item.max_authorize > 0) {
		reshtml += '<br clear="all" /><table class="enchant-wrapper"><tr><td>'+ getLang('interface', 'authorize') + '&nbsp;&nbsp;</td>';
		for (var i = 0; i <= item.max_authorize; ++i) {
			reshtml += '<td id="max_authorizeValue_'+ i +'" class="authorize-box'+ (item.authorizeValue == i ? ' authorize-box-checked' : '') +'">'+ (i > 0 ? '+' : '') + i +'</td>';
		}
		reshtml += '</tr></table>';
	}
	
	if (item.chargelevel) {
		reshtml += '<br clear="all" /><table class="enchant-wrapper"><tr>';
		for (var i=0; i <= item.chargelevel; ++i) {
			reshtml += '<td id="augment_level_'+ i +'" class="augment-box'+ (item.augmentValue == i ? ' augment-box-checked' : '') +'">' + getLang(item.chargeway == 1 ? 'godench' : 'magench', 'lvl'+i) +'</td>';
		}
		reshtml += '</tr></table>';
	}
	
	if (item.manastones && item.manastones.stones.length > 0) {
		reshtml += '<br clear="all" /><table class="enchant-wrapper">';
		for (var i=0; i < item.manastones.stones.length; i+= 2) {
			reshtml += '<tr>';
			for (var j=0; j <= 1; ++j) {
				if (i+j < item.manastones.stones.length) {
					var ancient = i+j < item.manaspec;
					if (item.manastones.stones[i+j]) {
						var stone = Calc.manastoneDecode(item.manastones.stones[i+j], ancient);
						if (ancient) {
							reshtml += '<td id="manastone_'+ (i+j) +'" class="manastone-slot-icon manastone-slot-icon-ancient-rank-'+ (stone.rank) +'"><div class="manastone-delete" id="manastone_delete_'+ (i+j) +'"></div></td><td class="manastone-slot-name">'+ stone.text + '</td>';
						} else {
							reshtml += '<td id="manastone_'+ (i+j) +'" class="manastone-slot-icon manastone-slot-icon-rank-'+ (stone.rank+1) +'"><div class="manastone-delete" id="manastone_delete_'+ (i+j) +'"></div></td><td class="manastone-slot-name">'+ stone.text + '</td>';
						}
					} else {
						if (ancient) {
							reshtml += '<td id="manastone_'+ (i+j) +'" class="manastone-slot-icon manastone-slot-icon-ancient"></td><td class="manastone-slot-name">'+ getLang('interface', 'nomanastone') + '</td>';
						} else {
							reshtml += '<td id="manastone_'+ (i+j) +'" class="manastone-slot-icon"></td><td class="manastone-slot-name">'+ getLang('interface', 'nomanastone') + '</td>';
						}
					}
				} else {
					reshtml += '<td>&nbsp</td><td>&nbsp</td>';
				}
			}
			reshtml += '</tr>';
		}		
		reshtml += '</table>';
	}
	
	reshtml += '<table class="table-button-big"><tr><td id="close_modify_window">'+ getLang('interface', 'close') +'</td></tr></table>';
	
	reshtml = '<div id="modify_container">'+ reshtml +'</div>';
	
	$("#item-modify .window-content").empty().html(reshtml);
	$("#item-modify").show();
	
	var h = 30 + $("#item-modify #modify_container").height();
	$("#item-modify").height(h);
	$("#item-modify").css('top', 20 + (500 - h)/2 );
	
	$(".tooltip").hide();
	$("#item-modify").find('.enchant-box').tooltip(getLang('tooltips', 'enchant'));
	// $("#item-modify").find('.enchant-box').tooltip(getLang('tooltips', 'enchant'));
	// $("#item-modify").find('.enchant-box').tooltip(getLang('tooltips', 'enchant'));

	// $("#item-modify").find('.augment-box').tooltip(getLang('tooltips', item.chargeway == 1 ? 'conditioning' : 'augment'));
	// $("#item-modify").find('.manastone-slot-icon').tooltip(getLang('tooltips', 'manastone'));
	$("#item-modify").find('.manastone-delete').tooltip(getLang('tooltips', 'deletemanastone'));
			
	$("#item-modify").find(".enchant-box").click(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setEnchantValue(res[1], checkKey(e));
			$(this).parents("#item-modify").find(".enchant-box").toggleClass('enchant-box-checked', false);
			$(this).toggleClass('enchant-box-checked', true);
		}
	});
	
	$("#item-modify").find(".authorize-box").click(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setAuthorizeValue(res[1], checkKey(e));
			$(this).parents("#item-modify").find(".authorize-box").toggleClass('authorize-box-checked', false);
			$(this).toggleClass('authorize-box-checked', true);
		}
	});

	$("#item-modify").find(".augment-box").click(function(){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setAugmentValue(res[1]);
			$(this).parents("#item-modify").find(".augment-box").toggleClass('augment-box-checked', false);
			$(this).toggleClass('augment-box-checked', true);
		}
	});
	
	$("#item-modify").find(".manastone-slot-icon").click(function(){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.openManastoneWindow(res[1]);
		}
	});
	
	$("#item-modify").find(".manastone-delete").click(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.deleteManastone(res[1], 0, checkKey(e), e.altKey);
		}
		return false;
	});
	
	$("#close_modify_window").click(function(){$("#item-modify").hide()});
}

Calc.setEnchantValue = function(val, all) {
	var slots = {};
	if (all) {
		slots = Aion.slotData;
	} else {
		slots[this.selectedSlot] = 1;
	}
	
	for (var slot in slots) {
		var item = this.items[slot];
		if (!item || !Aion.slotData[slot].allowGrade || !item.max_enchant_value)
			continue;
		
		var curval = val;
		if (curval > item.max_enchant_value)
			curval = item.max_enchant_value;
			
		item.enchantValue = parseInt(curval, 10);
		
		item.bonuses.enchant = {};
		if (item.enchantValue && item.enchantValue > 0) {
			if (slot == 'weapon' || slot == 'shield') {
				for (var j in Aion.enchantments[item.equipment_type]) {
					item.bonuses.enchant[j] = Calc.getGradeVal(item.equipment_type, j, item.enchantValue);
				}
			} else {
				if (Aion.armorEnch[item.equipment_type]) {
					var ench_obj = Aion.armorEnch[item.equipment_type][slot] || Aion.armorEnch[item.equipment_type].other;
					for (var j in Aion.armorEnch[item.equipment_type]) {
						for(var j in ench_obj) {
							item.bonuses.enchant[j] = item.enchantValue * ench_obj[j];
						}
					}
				}
			}
		}
		Calc.refreshItem(slot);
	}
}

Calc.setAuthorizeValue = function(val, all) {
	var slots = {};
	if (all) {
		slots = Aion.slotData;
	} else {
		slots[this.selectedSlot] = 1;
	}
	
	for (var slot in slots) {
		var item = this.items[slot];
		if (!item || !item.max_authorize)
			continue;
		
		var curval = val;
		if (curval > item.max_authorize)
			curval = item.max_authorize;
			
		item.authorizeValue = parseInt(curval, 10);
		
		item.bonuses.authorize = {};
		if (item.authorizeValue && item.authorizeValue > 0 && Aion.authorize[item.equipment_type]) {
			var data = Aion.authorize[item.equipment_type];
			for (var i=0; i < data.length; ++i) {
				// console.log(data[i].stat, data[i].values[Math.min(item.authorizeValue, data[i].values.length) - 1])
				item.bonuses.authorize[data[i].stat] = data[i].values[Math.min(item.authorizeValue, data[i].values.length) - 1];
			}
		}
		Calc.refreshItem(slot);
	}
}

Calc.setAugmentValue = function(val) {
	var item = this.items[this.selectedSlot];
	if (!item)
		return false;
		
	if (val > item.chargelevel)
		val = item.chargelevel;
		
	item.augmentValue = val;

	Calc.refreshItem(this.selectedSlot);
}

Calc.randomizeItem = function(slot) {
	var item = this.items[slot];
	if (!item.randomset)
		return false;
	
	var set = Calc.randomData[item.randomset];
	if (!set)
		return '';
		
	this.selectedSlot = slot;
			
	
	var totalprob = 0;
	for (var ind in set) {
		totalprob += parseInt(set[ind].prob, 10);
	}
	
	// var reshtml = '<div>'+ getLang('interface', 'selectrandomset') +'</div><br />';
	var reshtml = '';
	for (var ind in set) {
		var bonuses = set[ind].data;
		var prob = Math.floor(set[ind].prob * 1000 / totalprob)/10;
		reshtml += '<div class="random-row '+ (item.selectedRandomSet == ind ? ' random-row-checked' : '') +'" id="random_set_'+ ind +'">';
		reshtml += '<table cellpadding="0" cellspacing="0"><tr><td class="random-prob">'+ prob +'%</td>';
		reshtml += '<td class="random-stats">'+Calc.getRandomOptionSet(item.randomset, ind) +'</td>';
		reshtml += '</tr></table></div>';
	}
	
	reshtml = '<div id="randomize_container">'+ reshtml +'</div>';
	$("#item-randomize .window-content").empty().html(reshtml);
	
	$("#item-randomize .window-content").find(".random-row").click(function(){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setRandomIndex(res[1]);
			$(this).parents("#item-randomize").hide();
		}
	});
	$("#item-randomize").show();
	
	var h = 50 + $("#item-randomize #randomize_container").height();
	$("#item-randomize").height(h);
	$("#item-randomize").css('top', 20 + (500 - h)/2 );
	
}

Calc.setRandomIndex = function(num, item) {
	if (!item)
		item = this.items[this.selectedSlot];
	
	if (! item)
		return false;
	
	var set = Calc.randomData[item.randomset];
	if (! set)
		return false;
		
	item.selectedRandomSet = num;
	item.bonuses.random = $.extend({}, set[num].data);
	if (this.selectedSlot)
		Calc.refreshItem(this.selectedSlot);
}

Calc.itemSearchStart = function() {
	var text = $('#itemsearch').attr('value');

	var searchObject = {
		slot: this.selectedSlot,
		order: Calc.orderField,
		ajaxid : ++Calc.ajaxId,
		item : text,
		'class' : this.className,
		level : this.classLevel,
		lang : Calc.lang,
		rnd : Math.random()
	};
	
	var fslot = Calc.getFilterSlot();
	
	Calc.filters[fslot] = {
		order  : $("#order-field .select-input").attr('value'),
		weapon : $("#item_wptype .select-input").attr('value'),
		armor  : $("#item_eqtype .select-input").attr('value'),
		filter : $("#stat-filter .select-input").attr('value')
	};
	
	Calc.saveFilters();
	
	if ($("#item_wptype .select-input").attr('value') != 0 && Aion.slotData[this.selectedSlot].filterWeaponType) {
		searchObject.itemtype = $("#item_wptype .select-input").attr('value');
	} else if ($("#item_eqtype .select-input").attr('value') != 0 && Aion.slotData[this.selectedSlot].filterEquipType) {
		searchObject.itemtype = $("#item_eqtype .select-input").attr('value');
	}
	
	if (this.isArmfusion && this.selectedSlot == 'armfusion') {
		searchObject.maxlevel = this.armfusionLevel;
		searchObject.itemtype = this.armfusionType;
		searchObject.chargeway = this.armfusionWay;
	}

	var attr = $("#stat-filter .select-input").attr('value');
	if (attr) {
		var from = parseFloat($('#stat_from').attr('value'), 10);
		var to = parseFloat($('#stat_to').attr('value'), 10);
		if (Aion.bonusesData[attr] && Aion.bonusesData[attr].divide) {
			from *= Aion.bonusesData[attr].divide;
			to *= Aion.bonusesData[attr].divide;
		}
		searchObject.attribute = attr;
		searchObject.from = from;
		searchObject.to = to;
	}

	var ranks = Array();
	for (var i = 3; i <= 6; ++i) {
		if ($('#item_quality_'+ i).attr('checked'))
			ranks.push(i);
	}
		
	var types = Array();
	if ($('#item-rank-normal').attr('checked'))
		types.push('normal');
	if ($('#item-rank-draconic').attr('checked'))
		types.push('draconic');
	if ($('#item-rank-abyss').attr('checked'))
		types.push('abyss');
		
	if ($('#version_40').attr('checked'))
		searchObject.is40 = 1;
	if ($('#version_403').attr('checked'))
		searchObject.is403 = 1;
	if ($('#version_45').attr('checked'))
		searchObject.is45 = 1;
	
	searchObject.ranks = ranks.join(',');
	searchObject.types = types.join(',');
		
	// clear previous results
	$("#tooltip").hide();
	$("#price_tooltip").empty().hide();
	$("#price_tooltip2").empty().hide();
	$("#items-list").empty();
	this.searchResults = {};
	
	Calc.showLoading({noBlock:true});
	
	$.ajax({
		url: 'itemsearch.php',
		data: searchObject,
		success: function(data){
			Calc.itemSearchResults(data)
		},
		error: function(data){Calc.itemSearchError()},
		dataType: 'json'
	});
}

Calc.itemSearchError = function() {
	alert('error');
	Calc.hideLoading();
}

Calc.itemSearchResults = function(data) {
	var res = '<table id="items-list">';
	
	if (Calc.ajaxId != data.ajaxid)
		return false;
		
	Calc.loadAjaxData(data);

	for (var i in data.items) {
		var item = data.items[i];
		Calc.prepareItem(item);
		this.searchResults[item.id] = item;
		
		var val = '';
		if (Calc.orderField) {
			if (Calc.orderField == 'phyattack') {
				if (! item.is_magical && item.min_damage > 0) {
					var t = item['bonus_'+ Calc.orderField] - (parseInt(item.min_damage, 10) + parseInt(item.max_damage, 10))/2;
					val = item.min_damage +' - '+ item.max_damage + (t ? ' (+'+ t +')' : '');
				} else {
					val = formatBonus(Calc.orderField, Math.floor(item['bonus_'+ Calc.orderField]), false);
				}
			} else if (Calc.orderField == 'magicalattack') {
				if (item.is_magical && item.min_damage > 0) {
					var t = item['bonus_'+ Calc.orderField] - (parseInt(item.min_damage, 10) + parseInt(item.max_damage, 10))/2;
					val = item.min_damage +' - '+ item.max_damage + (t ? ' (+'+ t +')' : '');
				} else {
					val = formatBonus(Calc.orderField, Math.floor(item['bonus_'+ Calc.orderField]), false);
				}
			} else if (item['bonus_'+ Calc.orderField]) {
				val = formatBonus(Calc.orderField, item['bonus_'+ Calc.orderField], false);
			}
		}
		
		res += '<tr class="items-list-row item-rank-'+ item.rank +'" id="item_'+ item.id +'">';
		res += '<td class="items-list-lvl">'+ item.level +'</td>';
		res += '<td class="items-list-name">';
		
		res += '<table class="no-border"><tr><td width="*">'+ item.name +'</td><td width="41"><div class="items-list-icon-container">';
		
		if (item.tradable) {
			res += '<div id="tooltip_trade" class="items-list-info items-list-info-tradable"></div>';
		} else if (item.can_deposit_to_account_warehouse) {
			res += '<div id="tooltip_accountbound" class="items-list-info items-list-info-accountbound"></div>';
		}
		if (item.telescopic)
			res += '<div id="tooltip_ext" class="items-list-info items-list-info-extend"></div>';
		if (Calc.items2set && Calc.items2set[item.id] > 0)
			res += '<div id="tooltip_set" class="items-list-info items-list-info-set"></div>';
		if (item.is_pvp)
			res += '<div id="tooltip_pvp" class="items-list-info items-list-info-pvp"></div>';
		if (item.randomset)
			res += '<div id="tooltip_rand" class="items-list-info items-list-info-random"></div>';
		
		res += '</div></td></tr></table>';
		res +='</td>';
		res += '<td class="items-list-stat">'+ val +'</td>';
		res += '</tr>';
	}
	res += '</table>';
	
	$("#item-list-wrapper").html(res).scrollTop(0);
	
	$(".items-list-row").mouseenter(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			$("#tooltip").empty().html(UI.makeItem(Calc.searchResults[res[1]]));
			
			var pr = makePrice(Calc.searchResults[res[1]]);
			if (pr)
				$("#price_tooltip").html(pr).show();
				
			pr = makeprice2(Calc.searchResults[res[1]]);
			if (pr)
				$("#price_tooltip2").html(pr).show();
			
			$("#tooltip").show();
			UI.reposWindow("#tooltip", e);
			$(this).trigger('mousemove');
		}
	});
	$(".items-list-row").mousemove(function(e){
		UI.reposWindow("#tooltip", e);
		$("#price_tooltip").css("left", parseInt($("#tooltip").css('left'), 10) + 2 + $("#tooltip").width());
		$("#price_tooltip").css("top", $("#tooltip").css('top'));
		
		$("#price_tooltip2").css("left", $("#price_tooltip").css("left"));
		$("#price_tooltip2").css("top", $("#price_tooltip").height() + 2 + parseInt($("#tooltip").css('top'),10));
	});
	$(".items-list-row").mouseleave(function(){
		$("#tooltip").hide();
		$("#price_tooltip").empty().hide();
		$("#price_tooltip2").empty().hide();
	});
	
	$(".items-list-row").click(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.useItem(res[1], checkKey(e) ? true : false);
			Calc.closePicker();
		}
	});
	
	$("#item-list-wrapper").find(".items-list-info-tradable").tooltip(getLang('interface', 'tradable'));
	$("#item-list-wrapper").find(".items-list-info-random").tooltip(getLang('interface', 'hasrandomset'));
	$("#item-list-wrapper").find(".items-list-info-extend").tooltip(getLang('interface', 'telescopic'));
	$("#item-list-wrapper").find(".items-list-info-accountbound").tooltip(getLang('interface', 'accountbound'));
	$("#item-list-wrapper").find(".items-list-info-set").tooltip(getLang('interface', 'isset'));
	$("#item-list-wrapper").find(".items-list-info-pvp").tooltip(getLang('interface', 'ispvp'));
	
	Calc.hideLoading();
}

Calc.putItemInto = function(slot, item) {
	if (item.randomset)
		Calc.setRandomIndex(item.selectedRandomSet || 0, item);

	this.items[slot] = item;
	
	if (slot == 'weapon') {
		if (item.equipment_type == '2h_orb' || item.equipment_type == '2h_book'
				|| item.equipment_type == '2h_sword' || item.equipment_type == '2h_polearm'
				|| item.equipment_type == '2h_staff' || item.equipment_type == 'bow'
				|| item.equipment_type == '2h_harp' || item.equipment_type == '2h_cannon'
				|| item.equipment_type == '2h_keyblade') {
			Calc.setArmfusion(true);
		} else {
			Calc.setArmfusion(false);
		}
		Calc.checkArmfusion();
	} else if (slot == 'armfusion') {
		Calc.setArmfusion(true);
	}

	this.refreshItem(slot);
}

Calc.useItem = function(id, allset) {
	var slot = this.selectedSlot;
	var item = this.searchResults[id];
	this.putItemInto(slot, item);
	
	if (allset && Calc.items2set[item.id] > 0) {
		var set = Calc.setData[Calc.items2set[item.id]];
		
		for (var ind in set.ids) {
			var id = set.ids[ind];
			if (Calc.isEquipped(id)) {
				continue;
			}
			
			var newitem = Calc.allSetItems[id];
			var newslot = Calc.getSuitableSlot(newitem.slot, slot);

			if (! newslot)
				continue;
			
			this.searchResults[id] = newitem;
			this.putItemInto(newslot, newitem);
		}
	}
}

Calc.getSuitableSlot = function(slotid, eqslot, ignoreEquipped) {
	var usedSlots = {};
	usedSlots[eqslot] = 1;
	var newslot;
	
	for (var s in Aion.slotData) {
		if (Calc.isArmfusion) {
			if (s == 'shield')
				continue;
		} else {
			if (s == 'armfusion')
				continue;
		}
		
		if (ignoreEquipped || !Calc.items[s]) {	
			if ((Aion.slotData[s].slotId == slotid || Aion.slotData[s].altSlotId == slotid) && !usedSlots[s]) {
				newslot = s;
				usedSlots[s] = 1;
				break;
			}
		}
	}
	
	if (!newslot && !ignoreEquipped) {
		return Calc.getSuitableSlot(slotid, eqslot, true);
	}
	
	return newslot;
}

Calc.removeItem = function(slot, allitems) {
	if (allitems) {
		this.items = [];
		for (var ind in Aion.slotData) {
			this.refreshItem(ind);
		}
		Calc.setArmfusion(false);
	} else {
		delete this.items[slot];
		if (slot == 'weapon') {
			Calc.removeItem('armfusion');
			Calc.isArmfusion = false;
		}
		Calc.setArmfusion(Calc.isArmfusion);
		this.refreshItem(slot);
	}
}

Calc.refreshItem = function() {
	for (var ind = 0; ind < arguments.length; ++ind) {
		var slot = arguments[ind];
		if (this.items[slot]) {
			var item = this.items[slot];
			item.isValid = Calc.checkValid(slot);
			
			var name = (item.enchantValue ? '+'+ item.enchantValue +'' : '');
			name += (item.authorizeValue ? (Aion.slotData[slot].allowGrade ? (name ? '/' : '+0/') : '') + '+'+ item.authorizeValue +'' : '');
			if (name)
				name += ' ';
			name += item.name;
			$("#slot-"+ slot).itemContainer({
				icon : item.icon,
				level : item.level,
				rank : item.rank,
				name : name,
				id : item.id,
				modify : (Aion.slotData[slot].allowGrade && item.max_enchant_value > 0) || (Aion.slotData[slot].allowManastone && item.manastones.stones.length > 0) || item.chargelevel ? 1 : 0 || item.max_authorize > 0,
				randomize : item.randomset ? 1 : 0,
				slotRight : Aion.slotData[slot].slotRight ? 1 : 0,
				armfusion : (slot == 'weapon' && Calc.isArmfusion > 0) ? 1 : 0,
				minimize : slot == 'armfusion' ? 1 : 0,
				inactive : ! item.isValid
			});
		} else {
			$("#slot-"+ slot).itemContainer({
				slotRight : Aion.slotData[slot].slotRight ? 1 : 0,
				armfusion : (slot == 'weapon' && Calc.isArmfusion > 0) ? 1 : 0,
				minimize : slot == 'armfusion' ? 1 : 0
			});
		}
	}
	Calc.showBonuses();
}

Calc.closePicker = function() {
	$("#item-picker").hide();
}

Calc.setArmfusion = function(val) {
	Calc.isArmfusion = val;
	
	if (val) {
		$("#slot-shield").hide();
		$("#slot-armfusion").show();
		$("#slot-weapon").toggleClass('armfusion', true);
		if (this.items.weapon) {
			this.armfusionType = this.items.weapon.equipment_type;
			this.armfusionLevel = this.items.weapon.level;
			this.armfusionWay = this.items.weapon.chargeway;
			this.items.weapon.armfusion = this.items.armfusion;
		}
	} else {
		$("#slot-shield").show();
		$("#slot-armfusion").hide();
		$("#slot-weapon").toggleClass('armfusion', false);
	}
	
	Calc.refreshItem('weapon', 'shield', 'armfusion');
}

Calc.getEquipmentTypes = function() {
	var types = [];
	var all = false;
	
	if (Aion.slotData[this.selectedSlot].filterWeaponType) {
	
		var arr = [];
		if (this.selectedSlot == 'weapon') {
			arr = Calc.className && Aion.classesData[Calc.className] ? Aion.classesData[Calc.className].weapons : Aion.equipTypes.weapons;
		} else if (this.selectedSlot == 'shield') {
			arr = Calc.className && Aion.classesData[Calc.className] ? Aion.classesData[Calc.className].leftHand : Aion.equipTypes.leftHand;
		}

		for (var i in arr) {
			var wp = arr[i];
			if (wp == Calc.currentOrderField.weapon) {
				types.unshift({value: 0, label: getLang('equipment_types', 'all')})
				types.unshift({value: wp, label: getLang('equipment_types', wp)})
				all = true;
			} else {
				types.push({value: wp, label: getLang('equipment_types', wp)});
			}
		}
			
	} else if (Aion.slotData[this.selectedSlot].filterEquipType) {
		var arr = Calc.className && Aion.classesData[Calc.className] ? Aion.classesData[Calc.className].armors : Aion.equipTypes.equipment;
		for (var i in arr) {
			var eq = arr[i];
			if (eq == Calc.currentOrderField.armor) {
				types.unshift({value: 0, label: getLang('equipment_types', 'all')})
				types.unshift({value: eq, label: getLang('equipment_types', eq)})
				all = true;
			} else {
				types.push({value: eq, label: getLang('equipment_types', eq)});
			}
		}
	}
	if (!all)
		types.unshift({value: 0, label: getLang('equipment_types', 'all')})
	
	return types;
}

Calc.checkAllValid = function() {
	for (var i in Aion.slotData) {
		// if (! Calc.checkValid(i)) {
			// Calc.removeItem(i);
			Calc.refreshItem(i);
		// }
	}
}

Calc.checkValid = function(slot) {
	if (!slot)
		return true;
		
	var data = Aion.classesData[Calc.className];
	var item = Calc.items[slot];
	
	if (! item)
		return true;
	
	if (slot == 'armfusion' && !Calc.checkArmfusion(true)) {
			return false
	}
	
	if (slot == 'shield' && Calc.items.weapon 
			&& (Calc.items.weapon.equipment_type == '1h_gun'|| item.equipment_type == '1h_gun')
			&& Calc.items.weapon.equipment_type != item.equipment_type) {
		return false;
	}
	
	if (Calc.className) {
		var slotData = Aion.slotData[slot];
		var classData = Aion.classesData[Calc.className];
		if (slotData.filterWeaponType) {
			var arr = Array();
			if (slot == 'shield') {
				arr = classData.leftHand;
			} else {
				arr = classData.weapons;
			}

			if ($.inArray(item.equipment_type, arr) < 0) {
				return false;
			}
				
		} else if (slotData.filterEquipType) {
			if ($.inArray(item.equipment_type, classData.armors) < 0) {
				return false;
			}
		}
		
		if (item.classesMax.all) {
			if (item.classesMax.all < Calc.classLevel)
				return false;
		} else if (item.classesMax[Calc.className]) {
			if (item.classesMax[Calc.className] < Calc.classLevel) {
				return false;
			}
		}	
		
		if (item.classes.all) {
			if (item.classes.all > Calc.classLevel)
				return false;
		} else if (item.classes[Calc.className]) {
			if (item.classes[Calc.className] > Calc.classLevel) {
				return false;
			}
		} else {
			return false;
		}
	} else {
		if (item.classesMax.all) {
			if (item.classesMax.all < Calc.classLevel)
				return false;
		}
		if (item.classes.all) {
			if (item.classes.all > Calc.classLevel)
				return false;
		} else if (Calc.classLevel < item.level) {
			return false;
		}
	}
	
	return true;
	
}

Calc.checkArmfusion = function(ret) {
	if (!Calc.items.weapon || !Calc.items.armfusion)
		return true;
		
	if (Calc.items.weapon.equipment_type != Calc.items.armfusion.equipment_type || Calc.items.weapon.level < Calc.items.armfusion.level
			|| Calc.items.weapon.chargeway && Calc.items.armfusion.chargeway && Calc.items.weapon.chargeway != Calc.items.armfusion.chargeway) {
		if (! ret)
			Calc.refreshItem('armfusion');
		return false;
	}
	
	return true;
}


Calc.isEquipped = function(itemid, ignoreArmfusion) {
	for (var slot in Calc.items) {
		if (ignoreArmfusion && slot == 'armfusion')
			continue;
		if (Calc.items[slot] !== undefined) {
			if (Calc.items[slot].id == itemid)
				return slot;
		}
	}
	return false;
}

Calc.getSetItemName = function(id) {
	return Calc.items2name[id];
}

Calc.getEquippedItemsCnt = function(setid) {
	var cnteq = 0;
	for (ind in Calc.setData[setid].ids) {
		if (Calc.isEquipped(Calc.setData[setid].ids[ind], true))
			++cnteq;
	}
	return cnteq;
}

Calc.getRandomOptionSet = function(setname, index) {

	var set = Calc.randomData[setname];
	if (!set)
		return '';
		
	var bonuses = set[index];
	if (! bonuses)
		return '';
	
	var res = '';	
	var comma = '';
	
	for (var b in bonuses.data) {
		res += comma + '<span class="nowrap"><span class="tooltip_desc">' + getLang('bonusnames', b) +'</span> <span class="tooltip_value">'+ formatBonus(b, bonuses.data[b], true) +'</span></span>';
		comma = ', ';
	}
	return res;
}

Calc.initManastones = function() {
	var manastones = [];
	var names = Aion.manaListNormal;
	names = names.sort(function(a,b){return (getLang('bonusnames', a) >= getLang('bonusnames', b) ? 1 : -1)});
	for (var i in names) {
		manastones.push({value: names[i], label: getLang('bonusnames', names[i])});
	}
	
	var nameshtml = '';
	for (var i in names) {
		if ($.inArray(names[i], Aion.manastoneOther) >= 0)
			continue;
		nameshtml += '<table class="manastone-stat" id="manastone_stat_'+ names[i] +'"><tr><td>'+ getLang('bonusnames', names[i]) +'</td></tr></table>';
	}
	nameshtml += '<table class="manastone-stat" id="manastone_stat_other"><tr><td>'+ getLang('bonusnames', 'other') +'</td></tr></table>';
	
	$("#manastone-picker-wrapper").html(nameshtml);
	
	$(".manastone-stat").click(function(){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setManastoneType(res[1]);
		}
	});
	
	$(".manarank-box").click(function(){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setManastoneRank(res[1]);
		}
	});
	
	Calc.setManastoneLevel(70);
	Calc.setManastoneType(names[0]);
	Calc.setManastoneRank(3);
	
	$("#manastone_picker .window-close").click(function(){$("#manastone_picker").hide()});
	
	// $("#manastone_picker").mouseenter(function() {clearTimeout(selectTimeouts[$(this).attr('id')])});
	// $("#manastone_picker").mouseleave({hideTimeout : 1000}, function(e) {
		// var obj = {
			// element: $(this),
			// func : function() {this.element.hide(e.data.hideSpeed)}
		// };
		// selectTimeouts[$(this).attr('id')] = setTimeout(function() {obj.func()}, e.data.hideTimeout);
	// });
}

Calc.openManastoneWindow = function(num) {
	var item = Calc.items[Calc.selectedSlot];
	
	if (!item || !item.manastones)
		return false;
	if (num >= item.manastones.stones.length)
		num = item.manastones.stones.length - 1;

	$("#manastone_picker").show();
		
	Calc.manastoneSlot = num;
	Calc.ancientManastone = num < item.manaspec;
	Calc.setManastoneLevel(item.manastones.level);
}

Calc.setManastoneType = function(type) {
	if (Aion.manaLetters[type] || type == 'other') {
		Calc.manastoneType = type;
	}
	
	$(".manastone-stat").toggleClass('manastone-stat-checked', false);
	$("#manastone_stat_"+ type).toggleClass('manastone-stat-checked', true);
	
	Calc.refreshManastonesList();
}

Calc.setManastoneRank = function(rank) {
	if (rank < 1)
		rank = 1;
	if (rank > 3)
		rank = 3;
		
	Calc.manastoneRank = rank;
	$(".manarank-box").toggleClass('manarank-box-checked', false);
	$("#manastone_rank_"+rank).toggleClass('manarank-box-checked', true);
	Calc.refreshManastonesList();
}

Calc.setManastoneLevel = function(lvl) {
	if (lvl < 30)
		lvl = 30;
	if (lvl > 70)
		lvl = 70;
	
	Calc.maxManastoneLevel = lvl;
	if (! Calc.manastoneLevel) {
		Calc.manastoneLevel = lvl;
	}
	
	if (Calc.manastoneLevel > Calc.maxManastoneLevel)
		Calc.manastoneLevel = Calc.maxManastoneLevel;
	
	var manalevels = '<table class="manalevel-wrapper"><tr>';
	for (var i = 30; i <= lvl; i+= 10) {
		manalevels += '<td id="manastone_level_'+ i +'" class="manalevel-box'+ (Calc.manastoneLevel == i ? ' manalevel-box-checked' : '') +'">' + i +'</td>';
	}
	manalevels += '</tr></table>';
	
	$("#manastone_levels").html(manalevels);
	
	$(".manalevel-box").click(function(){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.manastoneLevel = res[1];
			Calc.setManastoneLevel(Calc.maxManastoneLevel);
			Calc.refreshManastonesList();
		}
	});
	
	Calc.refreshManastonesList();
}

Calc.refreshAncientManastonesList = function() {
	var reshtml = '';
	
	$('#manastone-picker-wrapper').hide();
	$('#manastone_levels').hide();
	$('#manastone_names').hide();
	$('#ancient_manastone_names').show();
	$('#ancient_manastone_ranks').show();
	$('#manastone_picker').toggleClass('manastone_picker-ancient', true);
	
	var stats = [];
	for (var i in Aion.ancientManastones[70][Calc.manastoneRank]) {
		stats.push(i);
	}
	stats.sort(function(a,b){return (getLang('bonusnames', a) >= getLang('bonusnames', b) ? 1 : -1)});
	
	for (var i=0; i< stats.length; ++i) {
		var code = Calc.manastoneEncodeAncient(Calc.manastoneRank, stats[i]);
		var stone = Calc.manastoneDecodeAncient(code);
		reshtml += '<div class="manastone-picker-item" id="manastone_'+ code +'"><div class="manastone-slot-icon manastone-slot-icon-ancient-rank-'+ Calc.manastoneRank+'"></div><table class="manastone-slot-name item-rank-'+ (Calc.manastoneRank+1) +'"><tr><td>'+ stone.text +'</td></tr></table></div>';
	}
	
	$("#ancient_manastone_names").html(reshtml);
	
	$("#ancient_manastone_names").find('.manastone-picker-item').tooltip(getLang('tooltips', 'pickmanastone'));
	
	$(".manastone-picker-item").click(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setManastone(res[1], checkKey(e) ? 1 : 0, e.altKey ? 1 : 0, true);
		}
	});
}

Calc.refreshManastonesList = function() {
	var item = Calc.items[Calc.selectedSlot];
	if (item && Calc.manastoneSlot < item.manaspec)
		return Calc.refreshAncientManastonesList();

	if (! Calc.manastoneLevel || !Calc.manastoneType)
		return false;
		
	$('#manastone-picker-wrapper').show();
	$('#manastone_levels').show();
	$('#manastone_names').show();
	$('#ancient_manastone_names').hide();
	$('#ancient_manastone_ranks').hide();
	$('#manastone_picker').toggleClass('manastone_picker-ancient', false);
	
	var reshtml = '';
	var data = Aion.manaData[Calc.manastoneLevel];
	
	if (Calc.manastoneType == 'other') {
		for (var i = 0; i < Aion.manastoneOther.length; ++i) {
			var type = Aion.manastoneOther[i];
			var cur = data[type];
			if (cur) {
				if (cur[0] > 0) {
					reshtml += '<div class="manastone-picker-item" id="manastone_'+ Calc.manastoneEncode(Calc.manastoneLevel, 0, type) +'"><div class="manastone-slot-icon manastone-slot-icon-rank-1"></div><table class="manastone-slot-name item-rank-1"><tr><td>'+ getLang('bonusnames', type) +' +'+ cur[0] +'</td></tr></table></div>';
				}
				if (cur[1] > 0) {
					reshtml += '<div class="manastone-picker-item" id="manastone_'+ Calc.manastoneEncode(Calc.manastoneLevel, 1, type) +'"><div class="manastone-slot-icon manastone-slot-icon-rank-2"></div><table class="manastone-slot-name item-rank-2"><tr><td>'+ getLang('bonusnames', type) +' +'+ cur[1] +'</td></tr></table></div>';
				}
			}
		}
	} else {
		
		var type = Calc.manastoneType;
		var cur = data[type];
		
		if (cur) {
			if (cur[0] > 0) {
				reshtml += '<div class="manastone-picker-item" id="manastone_'+ Calc.manastoneEncode(Calc.manastoneLevel, 0, Calc.manastoneType) +'"><div class="manastone-slot-icon manastone-slot-icon-rank-1"></div><table class="manastone-slot-name item-rank-1"><tr><td>'+ getLang('bonusnames', type) +' +'+ cur[0] +'</td></tr></table></div>';
			}
			if (cur[1] > 0) {
				reshtml += '<div class="manastone-picker-item" id="manastone_'+ Calc.manastoneEncode(Calc.manastoneLevel, 1, Calc.manastoneType) +'"><div class="manastone-slot-icon manastone-slot-icon-rank-2"></div><table class="manastone-slot-name item-rank-2"><tr><td>'+ getLang('bonusnames', type) +' +'+ cur[1] +'</td></tr></table></div>';
			}
			if (cur[2] > 0) {
				for (var i in data) {
					if (i == type || !data[i][3])
						continue;

					var stone = Calc.manastoneEncode(Calc.manastoneLevel, 2, Calc.manastoneType, i);
					if (!Calc.checkManastone(stone))
						continue;
						
					reshtml += '<div class="manastone-picker-item" id="manastone_'+ stone +'"><div class="manastone-slot-icon manastone-slot-icon-rank-3"></div><table class="manastone-slot-name item-rank-3"><tr><td>'+ getLang('bonusnames', type) +' +'+ cur[2] +'<br>'+ getLang('bonusnames', i) +' +'+ data[i][3] +'</td></tr></table></div>';
				}
			} else if (cur[3]) {
				// for (var i in {'phyattack':0, 'critical':0, 'magicalskillboost':0, 'magicalhitaccuracy':0}) {
					// if (!data[i] || !data[i][1])
						// continue;
				for (var ms in data) {
					if (!data[ms][2])
						continue;
			
					var stone = Calc.manastoneEncode(Calc.manastoneLevel, 2, ms, Calc.manastoneType);
					if (!Calc.checkManastone(stone))
						continue;
						
					reshtml += '<div class="manastone-picker-item" id="manastone_'+ stone +'"><div class="manastone-slot-icon manastone-slot-icon-rank-3"></div><table class="manastone-slot-name item-rank-3"><tr><td>'+ getLang('bonusnames', ms) +' +'+ data[ms][2] +'<br>'+ getLang('bonusnames', type) +' +'+ cur[3] +'</td></tr></table></div>';
				}
			}
		}
	}
	
	$("#manastone_names").html(reshtml);
	
	$("#manastone_names").find('.manastone-picker-item').tooltip(getLang('tooltips', 'pickmanastone'));
	
	$(".manastone-picker-item").click(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			Calc.setManastone(res[1], checkKey(e) ? 1 : 0, e.altKey ? 1 : 0);
		}
	});
}

Calc.setManastone = function(stone, all, cur, ancient) {
	var item = Calc.items[Calc.selectedSlot];
	if (!item || !item.manastones)
		return false;
		
	if (all) {
		for (var s in Aion.slotData) {
			var item = Calc.items[s];
			if (Aion.slotData[s].allowManastone && item) {
				for (var i=0; i < item.manastones.stones.length; ++i) {
					Calc.putManastoneInto(stone, item, i, ancient);
				}
			}
			Calc.calcManastones(s);
		}
	} else if (cur) {
		for (var i=0; i < item.manastones.stones.length; ++i) {
			Calc.putManastoneInto(stone, item, i, ancient);
		}
		Calc.calcManastones();
	} else {
		Calc.putManastoneInto(stone, item, Calc.manastoneSlot, ancient);
		Calc.calcManastones();
	}
	Calc.modifyItem(Calc.selectedSlot);
	$("#manastone_picker").hide();
}

Calc.deleteManastone = function(pos, slot, all, cur) {
	var slots = {};
	if (all) {
		cur = 1;
		slots = Aion.slotData;
	} else {
		if (!slot)
			slot = Calc.selectedSlot;
		slots[slot] = 1;
	}
	
	for (var slot in slots) {
		var item = Calc.items[slot];
		if (!item || !item.manastones)
			continue;
		
		if (cur) {
			for (var i = 0; i < item.manastones.stones.length; ++i)
				item.manastones.stones[i] = undefined;
		} else {
			item.manastones.stones[pos] = undefined;
		}

		Calc.calcManastones(slot);
	}
	Calc.modifyItem(Calc.selectedSlot);
}

Calc.putManastoneInto = function(stone, item, pos, ancient) {
	if (! ancient)
		ancient = false;
	var a2 = pos < item.manaspec;
	if (ancient != a2)
		return false;
	
	if (pos >= item.manastones.stones.length || !Calc.checkManastone(stone, ancient))
		return false;

	var s = Calc.manastoneDecode(stone, ancient);
	if (s.level > item.manastones.level)
		return false;
	
	item.manastones.stones[pos] = stone;
}

Calc.calcManastones = function(slot) {
	if (! slot)
		slot = Calc.selectedSlot;

	var item = Calc.items[slot];
	if (!item || !item.manastones)
		return false;
		
	item.bonuses.manastones = {};
	if (item.manastones) {
		for (var i = 0; i < item.manastones.stones.length; ++i) {
			var stone = item.manastones.stones[i];
			if (stone) {
				stone = Calc.manastoneDecode(stone, i < item.manaspec);
				var stats = {};
				stats[stone.stat1] = stone.value1;
				if (stone.stat2)
					stats[stone.stat2] = stone.value2;
				item.bonuses.manastones = bonussum(item.bonuses.manastones, stats, false);
			}
		}
	}
	Calc.refreshItem(slot);
}
Calc.checkManastoneAncient = function(code) {
	var r = code.substr(0, 1);
	var s = code.substr(1, 1);
	var l = code.substr(2, 1);
	var data = {};
	for (var ind in Aion.manaLetters) {
		if (s == Aion.manaLetters[ind])
			data.stat1 = ind;
	}
	if (! data.stat1)
		return false;
	data.rank = $.inArray(r, Aion.manaAncientRanks)+1;
	if (data.rank < 1 || data.rank > 3)
		return false;
	data.level = $.inArray(l, Aion.manaLevels);
	data.level = 30 + (data.level)*5;
	if (data.level != 70)
		return false;
	data.value1 = Aion.ancientManastones[data.level][data.rank][data.stat1];
	if (! data.value1)
		return false;
	return true;
} 

Calc.checkManastone = function(code, ancient) {
	if (ancient)
		return Calc.checkManastoneAncient(code);
	var stone = Calc.manastoneDecode(code);
	var data = Aion.manaData[stone.level];
	
	if ($.inArray(code.substr(0, code.length -1).toLowerCase(), Aion.manastoneRestriction) >= 0)
		return false;
	
	if (!data[stone.stat1] || (!data[stone.stat1][0] && !data[stone.stat1][1] && !data[stone.stat1][2]))
		return false;
	if (stone.stat2) {
		if (stone.stat1 == stone.stat2)
			return false;
		if (!data[stone.stat2] || !data[stone.stat2][3])
			return false;
	}
	
	return true;
} 

Calc.manastoneDecodeAncient = function(code) {
	var data = {
		stat1: '',
		stat2: '',
		rank: 0,
		level: 0
	};
	var r = code.substr(0, 1);
	var s = code.substr(1, 1);
	var l = code.substr(2, 1);
	
	for (var ind in Aion.manaLetters) {
		if (s == Aion.manaLetters[ind])
			data.stat1 = ind;
	}
	data.rank = $.inArray(r, Aion.manaAncientRanks)+1;
	data.level = $.inArray(l, Aion.manaLevels);
	data.level = 30 + (data.level)*5;
	data.value1 = Aion.ancientManastones[data.level][data.rank][data.stat1];
		
	data.text = getLang('bonusnames', data.stat1) +' +'+ data.value1;
	data.text = '<span class="item-rank-'+ (data.rank+1) +'">'+ data.text +'</span>';
		
	return data;
}

Calc.manastoneDecode = function(code, ancient) {
	if (ancient)
		return Calc.manastoneDecodeAncient(code);
	
	var data = {
		stat1: '',
		stat2: '',
		rank: 0,
		level: 0
	};
	
	var s1 = code.substr(0, 1);
	var s2 = '';
	var l = 0;
	
	if (s1 == s1.toUpperCase()) {
		++ind;
		s2 = code.substr(1, 1);
		l = code.substr(2, 1);
	} else {
		l = code.substr(1, 1);
	}
	
	s1 = s1.toLowerCase();
	
	for (var ind in Aion.manaLetters) {
		if (s1 == Aion.manaLetters[ind])
			data.stat1 = ind;
		if (s2 == Aion.manaLetters[ind])
			data.stat2 = ind;
	}
	
	data.level = $.inArray(l, Aion.manaLevels);
	if (data.stat2)
		data.rank = 2;
	else if (data.level % 2)
		data.rank = 1;
		
	data.level = 30 + (data.level - (data.rank ? 1 : 0))*5;
	
	if (! data.stat2) {
		data.value1 = Aion.manaData[data.level][data.stat1][data.rank ? 1 : 0];
	} else {
		data.value1 = Aion.manaData[data.level][data.stat1][2];
	}
	data.text = getLang('bonusnames', data.stat1) +' +'+ data.value1;
	
	if (data.stat2) {
		data.value2 = Aion.manaData[data.level][data.stat2][3]
		data.text += '<br>'+ getLang('bonusnames', data.stat2) +' +'+ data.value2;
	}
	
	data.text = '<span class="item-rank-'+ (data.rank+1) +'">'+ data.text +'</span>';
	
	return data;
}

Calc.manastoneEncodeAncient = function(rank, stat1, level) {
	if (!level)
		level = 70;
	
	var num = (level-30)/5;
	return Aion.manaAncientRanks[rank-1] + Aion.manaLetters[stat1] + Aion.manaLevels[num];
}

Calc.manastoneEncode = function(level, rank, stat1, stat2) {
	var code = Aion.manaLetters[stat1];
	if (stat2) {
		rank = 2;
		code = code.toUpperCase();
		code += Aion.manaLetters[stat2];
	}
	var num = (level-30)/5 + (rank ? 1 : 0);
	
	return code + Aion.manaLevels[num];
}

Calc.loadAjaxData = function(data) {
	if (data.currency) {
		for (var i in data.currency) {
			Calc.currencies[i] = data.currency[i];
		}
	}
	
	if (data.setdata) {
		for (var i in data.setdata) {
			Calc.setData[i] = data.setdata[i];
			for (var j in data.setdata[i].ids) {
				Calc.items2set[ data.setdata[i].ids[j] ] = i;
				Calc.items2name[ data.setdata[i].ids[j] ] = data.setdata[i].labels[j];
			}
		}
	}
	
	if (data.setitems) {
		for (var i in data.setitems) {
			Calc.prepareItem(data.setitems[i]);
			Calc.allSetItems[i] = data.setitems[i];
		}
	}
	
	if (data.randomoption) {
		for (var i in data.randomoption) {
			Calc.randomData[i] = data.randomoption[i];
		}
	}
}

Calc.loadFromHash = function(hash) {
	Calc.showLoading();
	
	if (hash.substr(0,1) == '!') {
		$.ajax({
			url: 'itemsearch.php',
			data: {
				shortlink: hash.substr(1),
				rnd: Math.random(),
				lang : Calc.lang
			},
			success: function(data){
				Calc.loadHashData(data, data.hash)
			},
			error: function(){Calc.hideLoading()},
			dataType: 'json'
		});
	} else {
		hash = unescape(hash);
		var data = hash.split('#');
		var ids = new Array('-1'); 
		var format = 0;
				
		for (var ind in data) {
			var res = data[ind].split('|');
			res = res[0].split(';');
			for (var i=0; i < res.length; ++i) {
				var id = parseInt(res[i].substr(0,6),36);
				if (id > 0)
					ids.push(id);
			}
		}
		var str = ids.join(';');
		
		$.ajax({
			url: 'itemsearch.php',
			data: {
				ids: str,
				rnd: Math.random(),
				hashstr : location.hash,
				lang : Calc.lang
			},
			success: function(data){
				Calc.loadHashData(data, hash)
			},
			error: function(){Calc.hideLoading()},
			dataType: 'json'
		});
	}
}

Calc.loadHashData = function(data, orig) {
	Calc.loadAjaxData(data)
	
	// var parts = orig.split('$');
	// var itemsets = parts[0].split('#');
	var itemsets = orig.split('#');
	
	// if (parts[1]) {
		// var lvl = parseInt(parts[1].substr(0,2),16);
		// var cl = parts[1].substr(2);
		// Calc.classSetLevel(lvl);
		// $("#class-level").attr('value', Calc.classLevel);
		// if (cl && Aion.classesData[cl]) {
			// $("#class-picker .select-hidden").show();
			// $("#class-icon-"+ cl).trigger('click');
		// }
	// }
	
	Calc.itemSets = [];
	Calc.currentItemSet = 0;
	
	for (var setn=0; setn < Math.min(Calc.MAX_ITEM_SETS, itemsets.length); ++setn) {
		Calc.items = {};
		var clinfo = itemsets[setn].split('$');
		var d = clinfo[0].split('|');
		var setname = getLang('interface', 'set') +' '+ (setn+1);
		if (d[1])
			setname = d[1];
		
		var itemsdata = d[0].split(';');
		
		var ids = [];
		var grades = [];
		var auth = [];
		var stones = [];	
		var options = [];	
		
		for (var ind in itemsdata) {
			var res = itemsdata[ind].split(':');
			var s = itemsdata[ind].split('!');
			var id = parseInt(s[0].substr(0,6),36)
			var item = data.items[id];
			ids.push(id);
			grades.push(parseInt(s[0].substr(6,1),36));
			if (item.max_authorize > 0) {
				auth.push(parseInt(s[0].substr(7,1),36));
				stones.push(s[0].substr(8));
			} else {
				auth.push(0);
				stones.push(s[0].substr(7));
			}
			
			options.push(s[1] ? s[1] : '');
		}
		
		for (var iid = 0; iid < ids.length; ++iid) { 
			if (!ids[iid])
				continue;
			
			var item = $.extend({}, data.items[ ids[iid] ]);
			var slot = Calc.getSuitableSlot(item.slot);
			if (! slot)
				continue;
			Calc.prepareItem(item);
			var ms;
			var ind = $.inArray(item.id, ids);
			ids[ind] = -1;
			if (ind >= 0) {
				if (Aion.slotData[slot].allowGrade)
					item.enchantValue = grades[ind];
				if (item.max_authorize > 0)
					item.authorizeValue = auth[ind];
				if (item.randomset && options[ind]) {
					item.selectedRandomSet = parseInt(options[ind].substr(0,1), 10);
				}
				if (item.chargeway && options[ind]) {
					item.augmentValue = parseInt(options[ind].substr(0,1), 10);
				}

				if (stones[ind]) {
					ms = stones[ind].split('');
				} else {
					ms = '';
				}
					
				if (ms && Aion.slotData[slot].allowManastone) {
					var sampl = '';
					var cnt = 0;
					
					for (var i = 0; i < ms.length; ++i) {
						var s = 1;
						var read = 1;
						if ( (sampl = parseInt(ms[i])) > 0) {
							s = sampl;
							++i;
						}
						
						var stone;
						if (ms[i] == ms[i].toUpperCase()) {
							stone = ms[i]+ms[i+1]+ms[i+2];
							read += 1;
						} else {
							stone = ms[i]+ms[i+1];
						}
							
						for (var k=0; k < s; ++k) {
							var ancient = cnt < item.manaspec;
							Calc.putManastoneInto(stone, item, cnt++, ancient);
						}
						i += read;
					}
				}
			}
			Calc.putItemInto(slot, item);
			// Calc.items[slot] = item;
			Calc.calcManastones(slot);
			Calc.selectedSlot = slot;
			Calc.setEnchantValue(item.enchantValue);
			Calc.setAuthorizeValue(item.authorizeValue);
			// Calc.refreshItem(slot);
		}
		
		var level = Aion.MAX_CHAR_LEVEL;
		var clname = '';
		
		if (clinfo[1]) {
			level = parseInt(clinfo[1].substr(0,2),16);
			clname = clinfo[1].substr(2);
		}
		
		Calc.className = clname;
		Calc.classLevel = level;
	
		var b = Calc.showBonuses();
		Calc.itemSets.push({
			items : clone(Calc.items),
			name : setname,
			bonuses : b.bonuses,
			price : b.price,
			level : level,
			level : level,
			'class' : clname
		});
	}
	// Calc.refreshSets();
	Calc.items = Calc.itemSets[0].items;
	Calc.className = Calc.itemSets[0]['class'];
	Calc.classLevel = Calc.itemSets[0].level;
	Calc.useItemSet(0, true);
	Calc.hideLoading();
}

Calc.getHash = function() {
	var hashes = [];
	var result = '';
	var cnt = 0;
	
	Calc.updateCurrentItemsSet();
	
	for (var j =0; j < Calc.itemSets.length; ++j) {
		var hash = '';
		var items = Calc.itemSets[j].items;
		for (var i in Aion.slotData) {
			var id = 0;

			if (items[i] && items[i].id) {
				if (hash)
					hash += ';';
					
				id = items[i].id;
				++cnt;
				hash += id.toString(36);
				var grade = '';
				var manastones = '';
				var ma = Array();
				if (items[i].enchantValue > 0)
					grade += items[i].enchantValue.toString(36);
				for (var n =0; n < items[i].manastones.stones.length; ++n) {
					if (items[i].manastones.stones[n]) {
						// manastones += items[i].manastones.stones[n];
						ma.push(items[i].manastones.stones[n]);
					} else if (n < items[i].manaspec) {
						ma.push('Ax7'); // dummy
					}
				}
				
				// ma.sort();
				var counter = 0;
				var lastm = '';
				for (var ind in ma) {
					if (!lastm) {
						lastm = ma[ind];
					} else if (lastm != ma[ind]) {
						manastones = manastones + (counter > 1 ? counter : '') + lastm;
						lastm = ma[ind];
						counter = 0;
					}
					++counter;
				}
				if (counter > 0)
					manastones = manastones + (counter > 1 ? counter : '') + lastm;
				
				if (! grade)
					grade = '0';
				
				if (items[i].max_authorize)
					grade += items[i].authorizeValue.toString(36);
				
				if (manastones)
					hash += grade + manastones;
				else if (grade)
					hash += grade
					
				var options = '';
				if (items[i].randomset) {
					if (items[i].chargeway || items[i].selectedRandomSet > 0)
						options += items[i].selectedRandomSet;
				}
				if (items[i].chargeway && items[i].augmentValue != items[i].chargelevel)
					options += items[i].augmentValue;
					
				if (options)
					hash += '!'+options;
			}

		}

		var ch = '';
		ch += '$'+ Calc.itemSets[j].level.toString(16);
		ch += Calc.itemSets[j]['class'];
		
		if (hash) {
			if (Calc.itemSets.length > 1 && getLang('interface', 'set') +' '+ (j+1) != Calc.itemSets[j].name)
				hash += '|'+Calc.itemSets[j].name;
			hashes.push(hash + ch);
		}
	
	}
	result = hashes.join('#');
	// var ch = '';
	// if (Calc.classLevel != 60 || Calc.className) {
		// ch += '$'+ Calc.classLevel.toString(16);
	// }
		
	// if (Calc.className) {
		// ch += Calc.className;
	// }
	// result += ch;
	
	return result;
}


Calc.classPicker = function(cl) {
	var cllist = [{name: 'class-icon-all', label : getLang('classes', 'all'), value : ''},];
	
	for (var name in Aion.classesData) {
		if (Aion.classesData[name].hidden)
			continue;
		cllist.push({name: 'class-icon-'+ name, label : getLang('classes', name), value : name})
	}
	
	$("#class-picker").makeSelect({
		classRow : 'class-picker-row',
		classIcon : 'class-picker-icon',
		classLabel : 'class-picker-label',
		items : cllist
	});
}

Calc.updateCurrentItemsSet = function() {
	Calc.itemSets[Calc.currentItemSet].items = $.extend({}, Calc.items);
	var b = Calc.showBonuses();
	Calc.itemSets[Calc.currentItemSet].bonuses = b.bonuses;
	Calc.itemSets[Calc.currentItemSet].price = b.price;
	Calc.itemSets[Calc.currentItemSet]['class'] = Calc.className;
	Calc.itemSets[Calc.currentItemSet].level = Calc.classLevel;
}

Calc.useItemSet = function(set, force) {
	if (!Calc.itemSets[set])
		return false;
	
	Calc.showLoading();
	Calc.updateCurrentItemsSet();

	Calc.currentItemSet = set;
	Calc.items = Calc.itemSets[set].items;
	
	if (Calc.itemSets[set].level != Calc.classLevel || force) {
		Calc.classSetLevel(Calc.itemSets[set].level);
		$("#class-level").attr('value', Calc.itemSets[set].level);
	}
	if (Calc.itemSets[set]['class'] != Calc.className || force) {
		var cl = Calc.itemSets[set]['class'];
		if (!cl || Aion.classesData[cl]) {
			if (!cl)
				cl = 'all';
			$("#class-picker .select-hidden").show();
			$("#class-icon-"+ cl).trigger('click');
		}
	}
	// Calc.itemSets[set]['class']
	
	if (Calc.items.weapon && $.inArray(Calc.items.weapon.equipment_type, ['2h_orb','2h_book','2h_sword','2h_polearm','2h_staff','bow','2h_harp','2h_cannon','2h_keyblade']) >= 0) {
		Calc.setArmfusion(true);
	} else {
		Calc.setArmfusion(false);
	}
	// Calc.checkAllValid();
	
	for (var slot in Aion.slotData) {
		Calc.refreshItem(slot);
	}
	Calc.refreshSets();
	Calc.hideLoading();
}

Calc.deleteItemsSet = function(ind) {
	if (!Calc.itemSets[ind])
		return;
	
	Calc.itemSets.splice(ind, 1);
	if (Calc.itemSets.length == 0) {
		Calc.createSet(getLang('interface', 'set')+' 1');
		Calc.useItemSet(0, true);
		return;
	} else if (ind <= Calc.currentItemSet || Calc.currentItemSet >= Calc.itemSets.length) {
		--Calc.currentItemSet;
	}
	if (Calc.currentItemSet < 0)
		Calc.currentItemSet = 0;
	Calc.items = Calc.itemSets[Calc.currentItemSet].items;
	Calc.useItemSet(Calc.currentItemSet, true);
}

Calc.createSet = function(name, copy) {
	if (Calc.itemSets.length >= Calc.MAX_ITEM_SETS)
		return false;
	
	var items = {};
	if (copy)
		items = clone(Calc.items);
	Calc.itemSets.push({name : name, items : items, bonuses : {}, 'class' : Calc.className, level : Calc.classLevel});
	Calc.refreshSets()
}

Calc.refreshSets = function() {
	var html = "";
	for (var i = 0; i < Calc.itemSets.length; ++i) {
		var dispname = Calc.itemSets[i].name;
		if (dispname.length > Calc.MAX_ITEM_SET_NAME) {
			dispname = dispname.substr(0, Calc.MAX_ITEM_SET_NAME-2)+'..';
		}
		html += '<table class="main-button itemset-button'+ (i == Calc.currentItemSet ? ' active' : '') +'" id="itemsset_'+ i +'"><tr><td></div>'+ dispname +'</td></tr></table>';
		// <div class="delete-set-button">
	}
	if (Calc.itemSets.length < Calc.MAX_ITEM_SETS)
		html += '<table class="plus-button"><tr><td><div id="add_set_button"></div></td></tr></table>';
	
	$("#left_buttons").html(html);
	
	$(".itemset-button").tooltip(getLang('tooltips', 'setbutton'));
	$("#add_set_button").tooltip(getLang('tooltips', 'setadd'));
	
	$("#add_set_button").click(function(e) {
		var name = prompt(getLang('interface', 'entersetname'), getLang('interface', 'set') +' '+ (Calc.itemSets.length+1));
		name = name.replace(/[\$\|\;\!\#\&\*\@\^\:]/g, '');
		if (name) {
			Calc.createSet(name, checkKey(e));
		}
	});
	
	$(".itemset-button").click(function(e){
		var res = /_([^_]+)$/.exec($(this).attr('id'));
		if (res && res[1]) {
			if (checkKey(e)) {
				var name = prompt(getLang('interface', 'entersetname'), Calc.itemSets[res[1]].name);
				name = name.replace(/[\$\|\;\!\#\&\*\@\^\:]/g, '');
				if (name) {
					Calc.itemSets[res[1]].name = name;
					Calc.refreshSets();
				}
			} else if (res[1] != Calc.currentItemSet) {
				Calc.useItemSet(res[1]);
			}
		}
	});
}

Calc.langChange = function(lang) {
	document.location = '?lang='+lang+'#'+ escape(Calc.getHash());
}

Calc.compare = function() {
	$("#item-compare").show();
	
	Calc.updateCurrentItemsSet();
	
	var stats = {};
	var currencies = {};
	var hascur = 0;
	var res = '<div class="compare-wrapper"><table id="table_compare"><tr><td id="toggle_diff" class="tooltip_info">';
	if (Calc.compareBase) {
		res += getLang('interface', 'hidediff');
	} else {
		res += getLang('interface', 'showdiff');
	}
	res += '</td>';
	
	for (var i =0; i < Calc.itemSets.length; ++i) {
		var set = Calc.itemSets[i];
		
		for (var bonus in set.bonuses) {
			if (! stats[bonus]) {
					stats[bonus] = {min: set.bonuses[bonus], max: set.bonuses[bonus]};
			} else {
				if (set.bonuses[bonus] < stats[bonus].min)
					stats[bonus].min = set.bonuses[bonus];
				if (set.bonuses[bonus] > stats[bonus].max)
					stats[bonus].max = set.bonuses[bonus];
			}
			
			if (i == Calc.currentItemSet) {
				stats[bonus].base = set.bonuses[bonus] ? set.bonuses[bonus] : 0;
			} else {
				if (! stats[bonus].base)
					stats[bonus].base = 0;
			}
		}

		for (var name in set.price) {
			++hascur;
			if (! currencies[name]) {
				currencies[name] = {min: set.price[name], max: set.price[name]};
			} else {
				if (set.price[name] < currencies[name].min)
					currencies[name].min = set.price[name];
				if (set.price[name] > currencies[name].max)
					currencies[name].max = set.price[name];
			}
		}
		res += '<td class="tooltip_info tooltip_centered" colspan="2"><span class="compare-set-change" id="compare_set_'+ i +'">'+ set.name +'</span></td>';
	}
	res += '</tr>';
	
	for (var i =0; i < Calc.itemSets.length; ++i) {
		var set = Calc.itemSets[i];
		for (var name in currencies) {
			if (! set.price[name])
				currencies[name].min = 0;
		}
	}
	
	var attrs = [];
	var slots = [];
	for (var bonus in stats) {
		var m = /manastones_(\d+)/.exec(bonus);
		if (m && m[1]) {
			slots.push(bonus);
		} else {
			attrs.push(bonus);
		}
	}
	
	attrs.sort(function(a,b){return (getLang('bonusnames', a) >= getLang('bonusnames', b) ? 1 : -1)});
	slots.sort();
	for (var i =0; i < slots.length; ++i) {
		attrs.push(slots[i]);
	}
	
	for (var i in attrs) {
		var bonus = attrs[i];
		var data = stats[bonus];
		var m = /manastones_(\d+)/.exec(bonus);
		if (m && m[1]) {
			res += '<tr><td class="tooltip_desc">'+ getLang('manalevels', 'common', m[1]) +'</td>';
		} else {
			res += '<tr><td class="tooltip_desc">'+ getLang('bonusnames', bonus) +'</td>';
		}
		
		for (var i =0; i < Calc.itemSets.length; ++i) {
			var val = Calc.itemSets[i].bonuses[bonus];
			if (! val)
				val = 0;
				
			var iscol = 0;
			if (val == data.base || !Calc.compareBase)
				iscol = 1;
			
			res += '<td class="tooltip_value tooltip_centered'+ (i > 0 ? ' tooltip-border-left' : '') +'"'+ (iscol ? ' colspan="2"' : '') +'>'+ formatBonus(bonus, val, false) +'</td>';
			
			if (! iscol) {
				res += '<td class="tooltip_value tooltip_centered"><div class="value_'+ (val > data.base ? 'positive' : 'negative') +'">'+ formatBonus(bonus, val - data.base, true) +'</div></td>';
			}
			
		}
		res += '</tr>';
	}

	if (hascur) {
		res += '<tr><td class="tooltip_info tooltip_centered">'+ getLang('interface', 'price') +'</td></tr>';
		var sortedCur = [];
		for (var item in currencies) {
			sortedCur.push(item);
		}
		
		sortedCur.sort(function(a,b){
			if (a == 'abyss') return -1;
			if (b == 'abyss') return 1;
			return (Calc.currencies[a].label >= Calc.currencies[b].label ? 1 : -1)
		});
		
		// for (var item in currencies) {
		for (var j=0; j < sortedCur.length; ++j) {
			var item = sortedCur[j];
			var data = currencies[item];
			var label = Calc.currencies[item] ? Calc.currencies[item].label : item;
			res += '<tr><td class="tooltip_desc">'+ label +'</td>';
			for (var i =0; i < Calc.itemSets.length; ++i) {
				var val = Calc.itemSets[i].price[item];
				if (! val)
					val = 0;
				res += '<td class="tooltip_value tooltip_centered" colspan="2"><span class="value_'+ (val == data.min ? 'positive' : 'negative') +'">'+ addCommas(val) +'</span></td>';
			}
			res += '</tr>';
		}
	}
	
	res += '<tr><td></td>';
	for (var i =0; i < Calc.itemSets.length; ++i) {
		res += '<td class="compare-delete" id="compare_'+ i +'" colspan="2">'+ getLang('interface', 'delete') +'</td>';
	}
	res += '</tr>';
	
	res += '</table></div>';
	
	$("#item-compare .window-content").empty().html(res);
	$("#item-compare .compare-delete").click(function() {
		var res = /_(\d+)$/.exec($(this).attr('id'));
		if (res && res[1] >= 0) {
			Calc.deleteItemsSet(res[1]);
			Calc.compare();
		}
	});
	
	$(".compare-set-change").click(function() {
		var res = /_(\d+)$/.exec($(this).attr('id'));
		if (res) {
			Calc.useItemSet(res[1]);
			Calc.compare();
		}
	});
	
	$("#toggle_diff").click(function() {
		Calc.compareBase = ! Calc.compareBase;
		Calc.compare();
	});
}

Calc.getFilterSlot = function() {
	var res = this.selectedSlot;
	
	if ($.inArray(res, ['armor','legs','shoulder','gloves','boots']) >= 0)
		res = 'armor';
	if ($.inArray(res, ['necklace','earring_r','earring_l','ring_r','ring_l']) >= 0)
		res = 'necklace';
		
	return res;
}

Calc.saveFilters = function() {
	var fdata = {weapon:1,shield:1,armfusion:1,armor:2,necklace:0,belt:0,headgear:0,wing:0};
	var res = '';
	for (var s in fdata) {
		if (!Calc.filters[s])
			continue;
			
		if (res)
			res += ';';
			
		res += s+':';
		
		if (fdata[s] == 1) {
			res += Calc.filters[s].weapon+',';
		} else if (fdata[s] == 2) {
			res += Calc.filters[s].armor+',';
		}
		
		res += Calc.filters[s].order+',';
		res += Calc.filters[s].filter;
		
	}
	setCookie('savedFilters', res, '01/01/2099 00:00:00');
}

Calc.loadFilters = function() {
	var f = getCookie('savedFilters');
	if (!f)
		return;
	f = f.split(';');
	var fdata = {weapon:1,shield:1,armfusion:1,armor:2,necklace:0,belt:0,headgear:0,wing:0};
	for (var i=0; i < f.length; ++i) {
		var v = f[i].split(':');
		var vals = v[1].split(',');
		Calc.filters[v[0]] = {};
		if (fdata[v[0]] == 1) {
			Calc.filters[v[0]].weapon = vals.shift();
		} else if (fdata[v[0]] == 2) {
			Calc.filters[v[0]].armor = vals.shift();
		}
		Calc.filters[v[0]].order = vals.shift();
		Calc.filters[v[0]].filter = vals.shift();
	}
}

Calc.prepareItem = function (i) {
	i.id = parseInt(i.id, 10);
	
	if (!i.version)
		i.version = 37;

	if (i.manaslots || i.manabonus) {
		i.manastones = {
			level: ((i.level % 10 ? 2 : 1) + Math.floor(i.level / 10))*10,
			stones: Array(parseInt(i.manaslots, 10) + parseInt(i.manabonus, 10))
		};
		i.manaspec = parseInt(i.manaspec, 10);
		delete i.manaslots;
	} else {
		i.manastones = {level:0,stones:[]};
	}

	i.bonuses = {primary:{},secondary:{},godench1:{},godench2:{},enchant:{},random:{}};
	i.display = {primary:[],secondary:[],godench1:[],godench2:[],random:[]};
	
	if (i.min_damage)
		i.min_damage = parseInt(i.min_damage,10);
	if (i.max_damage)
		i.max_damage = parseInt(i.max_damage,10);
		
	if (i.min_damage || i.max_damage) {
		if (i.is_magical) {
			i.display.primary.push('magicalattack', i.min_damage +' - '+ i.max_damage, '', '');
		} else {
			i.display.primary.push('phyattack', i.min_damage +' - '+ i.max_damage, '', '');
		}
	}
	
	if (i.attack_delay) {
		i.attack_delay = parseFloat(i.attack_delay);
		i.display.primary['attackdelay'] = i.attack_delay.toFixed(1);
	}
	
	if (i.hit_count) {
		i.hit_count = parseInt(i.hit_count, 10);
	}
	
	// delete i['bonus_'+ sortfield];
	
	for (ind in Aion.primaryStats) {
		if (i[Aion.primaryStats[ind]]) {
			var stat = Aion.primaryStats[ind];
			if (Aion.prim2sec[stat])
				stat = Aion.prim2sec[stat];
			i.display.primary.push(stat, formatBonus(stat, parseInt(i[Aion.primaryStats[ind]],10), false));
			i.bonuses.primary[stat] = parseInt(i[Aion.primaryStats[ind]],10);
		}
		delete i[Aion.primaryStats[ind]];
	}

	for (ind in Aion.secondaryStats) {
		index = Aion.secondaryStats[ind];
		if (i[index]) {
			var res = /^(.+) (.+)$/.exec(i[index])
			
			if (res && res[1] && res[2]) {
				res[1] = res[1].toLowerCase();
				var val = parseInt(res[2],10)
				if (res[1] == 'pvpattackratio') {
					i.display.secondary.push('pvpattackratio_physical', formatBonus(res[1], val, true));
					i.display.secondary.push('pvpattackratio_magical', formatBonus(res[1], val, true));
					i.bonuses.secondary.pvpattackratio_physical = val;
					i.bonuses.secondary.pvpattackratio_magical = val;
				} else if (res[1] == 'pvpdefendratio') {
					i.display.secondary.push('pvpdefendratio_physical', formatBonus(res[1], val, true));
					i.display.secondary.push('pvpdefendratio_magical', formatBonus(res[1], val, true));
					i.bonuses.secondary.pvpdefendratio_physical = val;
					i.bonuses.secondary.pvpdefendratio_magical = val;
				} else {
					i.display.secondary.push(res[1], formatBonus(res[1], val, true));
					i.bonuses.secondary[res[1]] = val;
				}
			}

			delete i[index];
		}
	}
	if (i.chargelevel > 0) {
		i.augmentValue = i.chargelevel;
		for (ind in Aion.godench1Stats) {
			index = Aion.godench1Stats[ind];
			if (i[index]) {
				var res = /^(.+) (.+)$/.exec(i[index])
				if (res && res[1] && res[2]) {
					res[1] = res[1].toLowerCase();
					var val = parseInt(res[2])
					if (res[1] == 'pvpattackratio') {
						i.display.godench1.push('pvpattackratio_physical', formatBonus(res[1], val, true));
						i.display.godench1.push('pvpattackratio_magical', formatBonus(res[1], val, true));
						i.bonuses.godench1.pvpattackratio_physical = val;
						i.bonuses.godench1.pvpattackratio_magical = val;
					} else if (res[1] == 'pvpdefendratio') {
						i.display.godench1.push('pvpdefendratio_physical', formatBonus(res[1], val, true));
						i.display.godench1.push('pvpdefendratio_magical', formatBonus(res[1], val, true));
						i.bonuses.godench1.pvpdefendratio_physical = val;
						i.bonuses.godench1.pvpdefendratio_magical = val;
					} else {
						i.display.godench1.push(res[1], formatBonus(res[1], val, true));
						i.bonuses.godench1[res[1]] = val;
					}
				}
				delete i[index];
			}
		}
	}
	
	if (i.max_authorize > 0) {
		i.max_authorize = parseInt(i.max_authorize, 10);
		i.authorizeValue = 0;
	}
	
	if (i.chargelevel > 1) {
		for (ind in Aion.godench2Stats) {
			index = Aion.godench2Stats[ind];
			if (i[index]) {
				var res = /^(.+) (.+)$/.exec(i[index])
				if (res && res[1] && res[2]) {
					res[1] = res[1].toLowerCase();
					var val = parseInt(res[2])
					if (res[1] == 'pvpattackratio') {
						i.display.godench2.push('pvpattackratio_physical', formatBonus(res[1], val, true));
						i.display.godench2.push('pvpattackratio_magical', formatBonus(res[1], val, true));
						i.bonuses.godench2.pvpattackratio_physical = val;
						i.bonuses.godench2.pvpattackratio_magical = val;
					} else if (res[1] == 'pvpdefendratio') {
						i.display.godench2.push('pvpdefendratio_physical', formatBonus(res[1], val, true));
						i.display.godench2.push('pvpdefendratio_magical', formatBonus(res[1], val, true));
						i.bonuses.godench2.pvpdefendratio_physical = val;
						i.bonuses.godench2.pvpdefendratio_magical = val;
					} else {
						i.display.godench2.push(res[1], formatBonus(res[1], val, true));
						i.bonuses.godench2[res[1]] = val;
					}
				}
				delete i[index];
			}
		}
	}
	
	if (i.cuurency2 && ! i.currency) {
		i.currency = i.currency2;
		i.currency2 = '';
	}
	
	if (i.currency) {
		var currency_items = i.currency.split(',');
		i.currency = {};
		for (var ind in currency_items) {
			var d = currency_items[ind].split('=');
			i.currency[d[0]] = parseInt(d[1], 10);
		}
		if (i.version == 45 && i.usable_rank_min >= 9 && i.currency.abyss)
			i.currency.abyss = Math.floor(i.currency.abyss * 1.35);
	} else
		i.currency = '';
	
	if (i.currency2) {
		var currency2_items = i.currency2.split(',');
		i.currency2 = {};
		for (var ind in currency2_items) {
			var d = currency2_items[ind].split('=');
			i.currency2[d[0]] = parseInt(d[1], 10);
		}
		if (i.version == 45 && i.usable_rank_min >= 10 && i.currency2.abyss)
			i.currency2.abyss = Math.floor(i.currency2.abyss * 1.35);
	} else
		i.currency2 = '';
		
	i.bonuses.total = bonussum(i.bonuses.primary, i.bonuses.secondary, i.bonuses.godench1, i.bonuses.godench2, false);
	
	var allEq = 1;
	var firstLvl = -1;
	i.classes = {};
	
	if (i.randomset)
		i.selectedRandomSet = 0;
	
	for (var cl in Aion.classesData) {
		if (i[cl]) {
			var lvl = parseInt(i[cl], 10);
			if (firstLvl < 0)
				firstLvl = lvl;
			if (lvl > 0)
				i.classes[cl] = lvl;
			delete i[cl];
		} else {
			allEq = 0;
		}
	}
	
	if (allEq && firstLvl > 0) {
		i.classes = {all : firstLvl};
	}
	
	allEq = 1;
	firstLvl = -1;
	i.classesMax = {};
	for (var cl in Aion.classesData) {
		cl += '_max';
		if (i[cl]) {
			var lvl = parseInt(i[cl], 10);
			if (firstLvl < 0)
				firstLvl = lvl;
			if (lvl > 0)
				i.classesMax[cl] = lvl;
			delete i[cl];
		} else {
			allEq = 0;
		}
	}
	
	if (allEq && firstLvl > 0) {
		i.classesMax = {all : firstLvl};
	}
	
	if (i.max_enchant_value) {
		i.max_enchant_value = parseInt(i.max_enchant_value, 10);
		i.enchantValue = 0;
		if (i.max_enchant_bonus) {
			i.max_enchant_bonus = parseInt(i.max_enchant_bonus, 10);
			i.max_enchant_value += i.max_enchant_bonus;
		}
	}
	
	i.icons = [];
	if (!i.can_sell_to_npc)
		i.icons.push('cannotsale');
	if (!i.can_deposit_to_character_warehouse)
		i.icons.push('depositchar');
	if (!i.can_deposit_to_account_warehouse)
		i.icons.push('depositaccount');
	if (!i.can_deposit_to_guild_warehouse)
		i.icons.push('depositguild');
	if (i.cannot_modify) {
		i.icons.push('nomodify');
	} else if (i.cannot_enchant) {
		i.icons.push('noenchant');
	}
	if (i.cannot_extraction)
		i.icons.push('noextract');
	if (i.can_ap_extraction)
		i.icons.push('apextract');
	if (i.cannot_changeskin)
		i.icons.push('noskin');
	if (i.extract_skin_type >= 2)
		i.icons.push('nomultiskin');	
	if (!i.can_composite_weapon && $.inArray(i.equipment_type, ['2h_orb', '2h_book', '2h_sword', '2h_polearm', '2h_staff', '2h_cannon', '2h_harp','bow', '2h_keyblade']) >= 0)
		i.icons.push('noarmfusion');
		
	if ($.inArray(i.equipment_type, ['no_armor', 'clothes', '']) >= 0) {
		i.nopages = 1;
	}
}

Calc.getGradeVal = function(type, bonus, lvl) {
	if (lvl > 10) {
		return 10 * Aion.enchantments[type][bonus] + (lvl-10)*Aion.enchantments_15[type][bonus];
	} else {
		return lvl * Aion.enchantments[type][bonus];
	}
}

Calc.switchPage = function(event, delta) {
	Calc.activePage += delta/Math.abs(delta);
	if (Calc.activePage < 1)
		Calc.activePage = 3;
	if (Calc.activePage > 3)
		Calc.activePage = 1;
		
	$('.page-selector').toggleClass('active', false);
	$('#page_'+ Calc.activePage).toggleClass('active', true);
	
	$('.item-stat-page').hide();
	$('#item_page_'+ Calc.activePage).show();
	
	UI.reposWindow("#tooltip", event);
}

//####################################################

function setCookie (name, value, expires, path, domain, secure) {
	document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + escape(path) : "") +
		((domain) ? "; domain=" + escape(domain) : "") +
		((secure) ? "; secure" : "");
}

function getCookie(name) {
	var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	if (results)
		return unescape(results[2]);
	else
		return null;
}

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function checkKey(e) {
	return e.ctrlKey || e.metaKey;
}
