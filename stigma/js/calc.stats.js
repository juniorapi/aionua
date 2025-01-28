Calc.getCharPassive = function(clname, lvl) {	
	var t = {};
	var skills = {};
	for (var ind in Aion.passiveSkills) {
		var s = Aion.passiveSkills[ind];
		var parent = Aion.classesData[clname] ? Aion.classesData[clname].parent : undefined;
		if (!(s.cl[clname] && s.cl[clname] < lvl || s.cl[parent] && s.cl[parent] < lvl))
			continue;
			
		if (skills[s.eid]) {
			if (skills[s.eid].lvl < s.elvl) {
				skills[s.eid] = {lvl: s.elvl, data : {}};
				skills[s.eid].data[s.bonus] = s.value;
			}
		} else {
			skills[s.eid] = {lvl: s.elvl, data : {}};
			skills[s.eid].data[s.bonus] = s.value;
		}
	}
	
	for (var eid in skills) {
		t = bonussum(t, skills[eid].data, false);
	}
	
	var tp = {};
	for (var i in t) {
		if (i == 'elementaldefendall') {
			t.elementaldefendair   = t.elementaldefendall;
			t.elementaldefendearth = t.elementaldefendall;
			t.elementaldefendfire  = t.elementaldefendall;
			t.elementaldefendwater = t.elementaldefendall;
			delete t.elementaldefendall;
		}
		if (i == 'pvpdefendratio') {
			t.pvpdefendratio_physical = t.pvpdefendratio;
			t.pvpdefendratio_magical = t.pvpdefendratio;
			delete t.pvpdefendratio;
		}
		if (res = /^(.*)_percent$/.exec(i)) {
			tp[res[1]] = t[i]/100;
			delete t[i];
		}
	}
	
	return {
		bonuses : t,
		multipliers : tp
	}
}

Calc.getCharBase = function(clname, lvl) {
	if (!clname)
		return {};
		
	lvl = parseInt(lvl, 10);
	
	var result = {};
	var options = Aion.classesData[clname].options;
	var stats = Aion.classesData[clname].stats;
	
	result.magicalhitaccuracy = Math.floor(lvl * 14.25);
	if (clname == 'priest' || clname == 'wizard' || clname == 'elementalist' || clname == 'bard') {
		result.magicalcriticalreducerate = 50;
	} else {
		result.magicalcriticalreducerate = 0;
	}
	result.magicalcritical = 50;
	result.physicalcriticalreducerate = Math.max(0, (lvl-50)*6);
	
	if (clname == 'priest' || clname == 'chanter') {
		result.critical = 1;
	} else if (clname == 'assassin' || clname == 'ranger') {
		result.critical = 3;
	} else {
		result.critical = 2;
	}
	
	result.hitaccuracy = Math.floor(stats.acc*2 - 10 + 8*lvl);
	result.dodge = result.parry = result.block = Math.floor( stats.agi*3.1 - 248 + 12.4*lvl );
	if (options.mpfactor) {
		result.maxmp = Math.floor(lvl*lvl*options.mpfactor[0] + lvl*options.mpfactor[1] + options.mpfactor[2]);
	} else {
		result.maxmp = Math.floor((stats.wis*6 - 423 + 106*lvl) * (options.mpmul ? options.mpmul : 1));
	}
	result.maxhp = Math.floor(lvl*lvl*options.hpfactor[0] + lvl*options.hpfactor[1] + options.hpfactor[2]);
	result.maxfp = 60;

	return result;
}

Calc.getItemsStats = function(item) {
	var result = {primary:{},secondary:{}};
	if (!item)
		return result;
		
	result.primary = bonussum(item.bonuses.primary, item.bonuses.enchant, false);
	result.secondary = bonussum(item.bonuses.secondary, item.bonuses.random, item.bonuses.manastones, item.bonuses.authorize, false);
	
	if (item.augmentValue > 0)
		result.secondary = bonussum(result.secondary, item.bonuses.godench1, false);
	if (item.augmentValue > 1)
		result.secondary = bonussum(result.secondary, item.bonuses.godench2, false);
		
	if (item.min_damage || item.max_damage) {
		if (item.is_magical) {
			result.primary.magicalattack = item.min_damage +' - '+ item.max_damage;
		} else {
			result.primary.phyattack = item.min_damage +' - '+ item.max_damage;
		}
	}

	if (item.attack_delay)
		result.primary.attackdelay = item.attack_delay.toFixed(1);
		
	return result;
}

Calc.calcItem = function(slot, clname, lvl) {
	if (!slot)
		slot = Calc.selectedSlot;
		
	var item = Calc.items[slot];	
	var result = {primary:{},secondary:{},passive:{}};
	
	if (!item || ! item.isValid)
		return result;
		
	var godench = {};
	if (item.augmentValue > 0)
		godench = bonussum(godench, item.bonuses.godench1, false);
	if (item.augmentValue > 1)
		godench = bonussum(godench, item.bonuses.godench2, false);
		
	if (item.authorizeValue > 1)
		godench = bonussum(godench, item.bonuses.authorize, false);
		
	// primary
	if (item.min_damage) {
		if (item.is_magical) {
			result.primary['magicalattack'] = Math.floor((item.min_damage + item.max_damage)/2);
		} else {
			result.primary['phyattack'] = Math.floor((item.min_damage + item.max_damage)/2);
		}
		
		if (slot == 'shield' && clname == 'gunner' && Calc.items.weapon) {
			result.primary['magicalattack'] = Math.floor(result.primary['magicalattack'] * 0.82);
		}
	}
	
	if (slot == 'weapon' && item.armfusion) {
		result.primary =  bonussum(result.primary, {
			magicalskillboost: Math.floor(item.armfusion.bonuses.primary.magicalskillboost/10) || 0,
			magicalattack : item.armfusion.is_magical ? Math.floor((item.armfusion.min_damage + item.armfusion.max_damage)/20) : 0,
			phyattack: item.armfusion.is_magical ? 0 : Math.floor((item.armfusion.min_damage + item.armfusion.max_damage)/20)
		}, false);
	}
	
	result.primary = bonussum(result.primary, item.bonuses.primary, item.bonuses.enchant, false);
	
	// secondary
	if (slot == 'weapon' && item.armfusion && item.armfusion.isValid) {
		var armgodench = {};
		if (item.armfusion.augmentValue > 0)
			armgodench = bonussum(armgodench, item.armfusion.bonuses.godench1, false);
		if (item.armfusion.augmentValue > 1)
			armgodench = bonussum(armgodench, item.armfusion.bonuses.godench2, false);
		if (item.armfusion.authorizeValue > 1)
			armgodench = bonussum(armgodench, item.armfusion.bonuses.authorize, false);
		result.secondary = bonussum(result.secondary,
				bonussum(
						bonussum(item.bonuses.secondary, item.bonuses.random, false),
						bonussum(item.armfusion.bonuses.secondary, item.armfusion.bonuses.random, false),
					'armfusion'),
				item.bonuses.manastones,
				item.armfusion.bonuses.manastones,
				bonussum(godench, armgodench, 'godench'),
			false);
	} else if (slot == 'weapon' && Calc.items.shield && Calc.items.shield.min_damage && Calc.items.shield.isValid) {
		var dualgodench = {};
		if (Calc.items.shield.augmentValue > 0)
			dualgodench = bonussum(dualgodench, Calc.items.shield.bonuses.godench1, false);
		if (Calc.items.shield.augmentValue > 1)
			dualgodench = bonussum(dualgodench, Calc.items.shield.bonuses.godench2, false);
		if (Calc.items.shield.authorizeValue > 1)
			dualgodench = bonussum(dualgodench, Calc.items.shield.bonuses.authorize, false);
		result.secondary = bonussum(result.secondary,
				bonussum(
						bonussum(item.bonuses.secondary, item.bonuses.random, false),
						bonussum(Calc.items.shield.bonuses.secondary, Calc.items.shield.bonuses.random, false),
					'dual'),
				item.bonuses.manastones,
				Calc.items.shield.bonuses.manastones,
				bonussum(godench, dualgodench, 'dual'),
			false);
	} else {
		result.secondary = bonussum(result.secondary, item.bonuses.secondary, item.bonuses.random, item.bonuses.manastones, godench, false);
	}
	
	// passive
	var skills = {};
	for (var ind in Aion.passiveEquipment) {
		var s = Aion.passiveEquipment[ind];
		if (!s.cl[clname] || s.cl[clname] > lvl || s.type != item.equipment_type)
			continue;
			
		if (!skills[s.eid] || skills[s.eid].elvl < s.elvl) {
			skills[s.eid] = s;
		}
	}
	
	for (var ind in skills) {
		var stat = skills[ind].bonus;
		if (! result.primary[stat])
			result.primary[stat] = 0;
		if (! result.passive[stat])
			result.passive[stat] = 0;

		var val = 0;
		if (skills[ind].abs) {
			val = skills[ind].value;
		} else {
			val = Math.floor(result.primary[stat] * skills[ind].value / 100);
		}
		result.passive[stat] += val;
	}
	
	// attributes
	if (clname) {
		if (result.primary['phyattack'] > 0)
			result.primary['phyattack'] = Math.floor(result.primary['phyattack'] * Aion.classesData[clname].stats.str/100);
		if (result.primary['magicalattack'] > 0)
			result.primary['magicalattack'] = Math.floor(result.primary['magicalattack'] * Aion.classesData[clname].stats['int']/100);
	}
	
	return result;
	
}

Calc.allBonuses = function(clname, lvl) {
	if (!lvl)
		lvl = Calc.classLevel;
	if (!clname)
		clname = Calc.className;

	var base = Calc.getCharBase(clname, lvl);
	var total = {
		primary: base,
		secondary:{},
		mhbonus: 0
	};
	
	var setids = {};
	
	for (var slot in Aion.slotData) {
		var item = Calc.items[slot];
		if (!item || !item.isValid || slot == 'armfusion' || (slot == 'shield' && Calc.isArmfusion))
			continue;
			
		if (Calc.items2set[item.id])
			setids[Calc.items2set[item.id]] = 1;
		
		var b = Calc.calcItem(slot, clname, lvl);
		// var b = Calc.equipmentBonuses(slot);
		if (slot == 'shield' && item.min_damage > 0 && Calc.items.weapon) {
			total.isdual = true;
			total.dualstats = {secondary:{phyattack:0,magicalattack:0}};
			total.dualstats.primary = bonussum(b.primary, base, false);
			total.dualstats.secondary = bonussum(total.dualstats.secondary, b.passive, false);
		} else {
			total.primary = bonussum(total.primary, b.primary, false);
			total.secondary = bonussum(total.secondary, b.secondary, b.passive, false);
			if (slot == 'weapon') {
				if (b.passive.phyattack) {
					total.mhbonus = b.passive.phyattack;
				} else if (b.passive.magicalattack) {
					total.mhbonus = b.passive.magicalattack;
				}
			}
		}
	}
	
	var passive = Calc.getCharPassive(clname, lvl);
	total.secondary = bonussum(total.secondary, passive.bonuses, false);
	for (var attr in passive.multipliers) {
		if (total.primary[attr]) {
			if (! total.secondary[attr])
				total.secondary[attr] = 0;
			total.secondary[attr] += Math.floor(total.primary[attr]*passive.multipliers[attr]);
		}
	}

	if (! Calc.items.weapon) {
		if (Calc.className) {
			total.primary.phyattack = Math.floor(18 * Aion.classesData[Calc.className].stats.str/100);
		} else {
			// total.primary.phyattack = 18;
		}
	}
	
	for (var i in setids) {
		var sb = Calc.getSetBonuses(i);
		total.secondary = bonussum(total.secondary, sb, false);
	}
	
	var slots = {30:0,40:0,50:0,60:0,70:0,80:0};
	for (var slot in Aion.slotData) {
		var item = Calc.items[slot];
		if (!item || !item.isValid || (slot == 'shield' && Calc.isArmfusion) || !Aion.slotData[slot].allowManastone)
			continue;
		
		if (item.manastones && item.manastones.stones) {
			for (var i=0; i < item.manastones.stones.length; ++i) {
				if (!item.manastones.stones[i]) {
					if (!slots[item.manastones.level])
						slots[item.manastones.level] = 0;
					slots[item.manastones.level]++;
				}
			}
		}
	}
	
	total.all = bonussum(total.primary, total.secondary, false);
	
	for (var attr in Aion.bonusesData) {
		if (total.all[attr] && Aion.bonusesData[attr].capValue && total.all[attr] > Aion.bonusesData[attr].capValue) {
			total.secondary[attr] = total.secondary[attr] - (total.all[attr] - Aion.bonusesData[attr].capValue);
			total.all[attr] = Aion.bonusesData[attr].capValue;
		}
	}
	
	total.price = Calc.itemsPrice();
	total.slots = slots;
	return total;
}

Calc.itemsPrice = function() {
	var sum = {};
	for (var slot in Aion.slotData) {
		var item = Calc.items[slot];
		if (!item || !item.isValid || (slot == 'shield' && Calc.isArmfusion))
			continue;
		
		if (item.currency) {
			sum = bonussum(sum, item.currency, false);
		}
	}
	return sum;
}

Calc.getSetBonuses = function(setid) {		
	var bonuses = {};
	var cnteq = 0;
	var total = 0;
	var set = Calc.setData[setid];
	for (ind in set.ids) {
		++total;
		if (Calc.isEquipped(set.ids[ind]))
			++cnteq;
	}
	for (var i = 1; i <= cnteq; ++i) {
		if (set['b'+i]) {
			for (atr in set['b'+i]) {
				if (!bonuses[atr])
					bonuses[atr] = 0;
				bonuses[atr] += parseInt(set['b'+i][atr],10);
			}
		}
	}
	if (total == cnteq && set['ba']) {
		for (atr in set['ba']) {
			if (!bonuses[atr])
				bonuses[atr] = 0;
			bonuses[atr] += parseInt(set['ba'][atr],10);
		}
	}
	
	if (bonuses.pvpattackratio) {
		bonuses.pvpattackratio_physical = bonuses.pvpattackratio;
		bonuses.pvpattackratio_magical = bonuses.pvpattackratio;
		delete bonuses.pvpattackratio;
	}
	if (bonuses.pvpdefendratio) {
		bonuses.pvpdefendratio_physical = bonuses.pvpdefendratio;
		bonuses.pvpdefendratio_magical = bonuses.pvpdefendratio;
		delete bonuses.pvpdefendratio;
	}
	return bonuses;
}

Calc.showBonuses = function() {
	Calc.displayBonuses = {};
	function round(val, m) {
		if (!m)
			m = 1;
		return Math.floor(val*10*m)/(m*10);
	}
	
	var total = Calc.allBonuses();
	var result = {};
	
	for (var stat in Aion.bonusesData) {
		var display = '&nbsp;';
		if (!total.primary[stat])
			total.primary[stat] = 0;
		if (!total.secondary[stat])
			total.secondary[stat] = 0;
		if (!total.all[stat])
			total.all[stat] = 0;
			
		if (Calc.items.weapon && Calc.items.weapon.is_magical || Calc.items.shield && Calc.items.shield.is_magical) {
			$(".stat-magicalweapon").show();
			$(".stat-phyweapon").hide();
		} else {
			$(".stat-magicalweapon").hide();
			$(".stat-phyweapon").show();
		}
		
		if (stat == 'speed') {
			if (total.all['speed']) {
				display = Math.min(12, round(6.0 *(1+ total.all['speed']/100)));
			} else {
				display = '6.0';
			}
		} else if (stat == 'flyspeed') {
			if (total.all['flyspeed']) {
				display = Math.min(16, round(9.0 *(1+ total.all['flyspeed']/100)));
			} else {
				display = '9.0';
			}
		} else if (stat == 'boostcastingtime') {
			if (total.all['boostcastingtime']) {
				var res = round(1.0 - total.all['boostcastingtime']/100, 10);
				// var dif = round(1.0 - res, 10);
				display = res;
			} else {
				display = '1.0';
			}
		} else if (stat == 'attackdelay') {
			var atkdel = 1.5;
			if (Calc.items.weapon && Calc.items.weapon.attack_delay > 0) {
				atkdel = Calc.items.weapon.attack_delay;
			}
			if (total.isdual) {
				if (Calc.items.weapon && Calc.items.shield && Aion.aspdDual[Calc.items.weapon.equipment_type] && Aion.aspdDual[Calc.items.weapon.equipment_type][Calc.items.shield.equipment_type]) {
					atkdel = Aion.aspdDual[Calc.items.weapon.equipment_type][Calc.items.shield.equipment_type];
				}
			}
			if (atkdel) {
				var res = Math.round((atkdel - atkdel * total.all['attackdelay']/100)*100)/100;
				var dif = round(atkdel - res);
				display = res;
				Calc.displayBonuses[stat] = res + (dif > 0 ? ' ('+ atkdel +' - <span class="item-rank-2">'+ dif +'</span>)' : '');
			} else {
				display = '0.0';
			}
		} else {
			display = formatBonus(stat, total.all[stat]);
			Calc.displayBonuses[stat] = formatBonus(stat, total.all[stat]) +' ('+ formatBonus(stat, total.primary[stat])
				+ (total.secondary[stat] >= 0 ? ' + <span class="item-rank-2">' : ' <span class="value_negative">')+ formatBonus(stat, total.secondary[stat]) +'</span>)';
			if (Aion.bonusesData[stat].showAsSum) {
				display = Calc.displayBonuses[stat];
			}
		}
		
		if (!Calc.displayBonuses[stat])
			Calc.displayBonuses[stat] = display;
		
		if (total.all[stat])
			result[stat] = total.all[stat];
			
		$('#stat_'+ stat).html(display);
	}
	
	var currencycnt = 0;
	var pricehtml = '<table border="0">';
	
	var sortedCur = [];
	for (var item in total.price) {
		sortedCur.push(item);
	}
	
	sortedCur.sort(function(a,b){
		if (a == 'abyss') return -1;
		if (b == 'abyss') return 1;
		return (Calc.currencies[a].label >= Calc.currencies[b].label ? 1 : -1)
	});
		
	for (var j=0; j < sortedCur.length; ++j) {
		var item = sortedCur[j];
		++ currencycnt;
		var icon = Calc.currencies[item] ? Calc.currencies[item].icon : 'none';
		var label = Calc.currencies[item] ? Calc.currencies[item].label : item;
		if (Calc.currencies[item] && Calc.currencies[item].rank)
			label = '<span class="item-rank-'+ Calc.currencies[item].rank +'">'+ label +'</span>';
		if (icon == 'abyss')
			pricehtml += '<tr><td class="price_amount">'+ addCommas(total.price[item]) +'</td><td class="price_image" align="center"><div class="itembox_c" style="width:16px;height:16px;background-image:url(/icons/items/'+ icon +'.png)"></div></td><td class="price_text">'+ label +'</td></tr>';
		else
			pricehtml += '<tr><td class="price_amount">'+ addCommas(total.price[item]) +'</td><td class="price_image"><div class="itembox_c" style="background-image:url(/icons/items/'+ icon +'.png)"></div></td><td class="price_text">'+ label +'</td></tr>';
	}
	pricehtml += '</table>';
	
	if (currencycnt > 0) {
		$("#cost_tooltip .tooltipborder").html(pricehtml);
		$("#cost_info").show();
	} else {
		$("#cost_info").hide();
	}
	
	if (total.isdual) {
		$('.stat-dualinfo').show();
		var sum = total.dualstats.primary.phyattack + total.dualstats.secondary.phyattack + total.secondary.phyattack - total.mhbonus;
		var sum_mag = total.dualstats.primary.magicalattack + (total.dualstats.secondary.magicalattack || 0) + (total.secondary.magicalattack || 0) - total.mhbonus;

		$('#stat_phyattack2').html(formatBonus('phyattack', sum));
		$('#stat_magicalattack2').html(formatBonus('magicalattack', sum_mag));
		$('#stat_hitaccuracy2').html(formatBonus('hitaccuracy', total.dualstats.primary.hitaccuracy + total.secondary.hitaccuracy));
		$('#stat_critical2').html(formatBonus('critical', total.dualstats.primary.critical + total.secondary.critical));
		
		Calc.displayBonuses['magicalattack2'] = formatBonus(stat, sum_mag) +' ('+ formatBonus(stat, total.dualstats.primary.magicalattack) +' + <span class="item-rank-2">'+ formatBonus(stat, sum_mag - total.dualstats.primary.magicalattack) +'</span>)';
		Calc.displayBonuses['phyattack2'] = formatBonus(stat, sum) +' ('+ formatBonus(stat, total.dualstats.primary.phyattack) +' + <span class="item-rank-2">'+ formatBonus(stat, sum - total.dualstats.primary.phyattack) +'</span>)';
		Calc.displayBonuses['hitaccuracy2'] = formatBonus(stat, total.dualstats.primary.hitaccuracy + total.secondary.hitaccuracy) +' ('+ formatBonus(stat, total.dualstats.primary.hitaccuracy) +' + <span class="item-rank-2">'+ formatBonus(stat, total.secondary.hitaccuracy) +'</span>)';
		Calc.displayBonuses['critical2'] = formatBonus(stat, total.dualstats.primary.critical + total.secondary.critical) +' ('+ formatBonus(stat, total.dualstats.primary.critical) +' + <span class="item-rank-2">'+ formatBonus(stat, total.secondary.critical) +'</span>)';
		
	} else {
		$('.stat-dualinfo').hide();
	}
	
	// var attrs = [];
	// var rescopy = result;
	// for (var a in result) {
		// attrs.push(a);
	// }
	
	// attrs.sort(function(a,b){return (getLang('bonusnames', a) >= getLang('bonusnames', b) ? 1 : -1)});
	// result = {};
	// for (var i = 0; i < attrs.length; ++i) {
		// result[attrs[i]] = rescopy[attrs[i]];
	// }
	
	for (var l in total.slots) {
		if (total.slots[l] > 0)
			result['manastones_'+l] = total.slots[l];
	}
	
	return {
		bonuses : result,
		price : total.price
	}
}
