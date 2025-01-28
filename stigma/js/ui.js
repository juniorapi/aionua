(function($) {
	$.fn.itemContainer = function(options) {
		var defaults = {
			level : 0,
			rank : 1,
			border : 1,
			slotRight : 0,
			modify : 0,
			randomize : 0,
			armfusion: 0,
			minimize: 0,
			inactive: 0,
			readOnly : 0
		};
		var opts = $.extend(defaults, options);
		
		if (opts.readOnly) {
			opts.randomize = 0;
			opts.modify = 0;
		}
		
		var html = '<div class="slot-active-area">';
		
		var res = /^slot-(.*)$/.exec($(this).attr('id'));
		var slot = res[1];
		
		if (opts['minimize']) {
			if (opts['inactive']) {
				html += '<div class="slot-min-inactive"></div>';
			}
			if (opts['icon']) {
				html += '<div class="slot-icon"><img class="img-armfusion" src="/stigma/icons/items/'+ opts['icon'] +'.png" /></div>';
			} else {
				html += '<div class="slot-icon"><img class="img-armfusion" src="/stigma/img/slots_armfusion.png" /></div>';
			}
		} else {
			if (opts['inactive']) {
				html += '<div class="slot-border-inactive"></div>';
			}
			if (opts['icon']) {
				html += '<div class="slot-icon" style="background-image: url(/icons/items/'+ opts['icon'] +'.png)"></div>';
			} else {
				html += '<div class="slot-icon"></div>';
			}
		}
		
		if (opts['minimize']) {
			html += '<div class="slot-min-border-hover"></div>';
			html += '</div>';
		} else if (opts['border']) {
			html += '<div class="slot-border-hover"></div>';
			html += '</div>';
			if (opts['armfusion']) {
				html += '<div class="slot-border slot-border-armfusion"></div>';
			} else {
				html += '<div class="slot-border"></div>';
			}
		} else {
			html += '</div>';
		}
		
		if (opts['level']) {
			if (opts['slotRight']) {
				html += '<div class="slot-text slot-text-right">';
				html += '<table border="0" cellpadding="0" cellspacing="0"><tr>';
				html += '<td class="td-item-name td-right item-rank-'+ opts['rank'] +'">'+ opts['name'] +'</td>';
				html += '<td class="td-item-level">'+ opts['level'] +'</td>';
				html += '</tr></table>';
				html += '</div>';
				html += '<div class="slot-toolbar-right">';
				if (! opts.readOnly)
					html += '<div class="slot-toolbar-delete" id="delete_button_for_'+ slot +'"></div>';
				if (opts.modify && !opts['inactive'])
					html += '<div class="slot-toolbar-modify" id="modify_button_for_'+ slot +'"></div>';
				if (opts.randomize && !opts['inactive'])
					html += '<div class="slot-toolbar-randomize" id="randomize_button_for_'+ slot +'"></div>';
				html += '</div>';
			} else {
				html += '<div class="slot-text slot-text-left">';
				html += '<table border="0" cellpadding="0" cellspacing="0"><tr>';
				html += '<td class="td-item-level">'+ opts['level'] +'</td>';
				html += '<td class="td-item-name item-rank-'+ opts['rank'] +'">'+ opts['name'] +'</td>';
				html += '</tr></table>';
				html += '</div>';
				html += '<div class="slot-toolbar-left">';
				if (! opts.readOnly)
					html += '<div class="slot-toolbar-delete" id="delete_button_for_'+ slot +'"></div>';
				if (opts.modify && !opts['inactive'])
					html += '<div class="slot-toolbar-modify" id="modify_button_for_'+ slot +'"></div>';
				if (opts.randomize && !opts['inactive'])
					html += '<div class="slot-toolbar-randomize" id="randomize_button_for_'+ slot +'"></div>';
				html += '</div>';
			}
		}
					
		$(this).empty().html(html);
		
		$('#tooltip_for_delete_button_for_'+ slot).remove();
		$('#tooltip_for_modify_button_for_'+ slot).remove();
		$('#tooltip_for_randomize_button_for_'+ slot).remove();
		
		$(this).find('.slot-toolbar-delete').tooltip(getLang('tooltips', 'deleteitem'));
		$(this).find('.slot-toolbar-randomize').tooltip(getLang('tooltips', 'randomizeitem'));
		$(this).find('.slot-toolbar-modify').tooltip(getLang('tooltips', 'modifyitem'));
		
		var area = $(this).children('.slot-active-area');
		
		if (!opts.readOnly) {
			$(this).find('.slot-toolbar-delete').click(function(e){
				var id = $(this).parents('.equipment-slot').attr('id');
				var res = /-([^-]+)$/.exec(id);
				if (res && res[1]) {
					Calc.removeItem(res[1], checkKey(e) ? true : false);
				}
			});
			
			$(this).find('.slot-toolbar-modify').click(function(){
				var id = $(this).parents('.equipment-slot').attr('id');
				var res = /-([^-]+)$/.exec(id);
				if (res && res[1]) {
					Calc.modifyItem(res[1]);
				}
			});
			
			$(this).find('.slot-toolbar-randomize').click(function(){
				var id = $(this).parents('.equipment-slot').attr('id');
				var res = /-([^-]+)$/.exec(id);
				if (res && res[1]) {
					Calc.randomizeItem(res[1]);
				}
			});

			area.click(function(){
				var id = $(this).parent('.equipment-slot').attr('id');
				var res = /-([^-]+)$/.exec(id);
				if (res && res[1]) {
					Calc.itemInteract(res[1]);
				}
			});
		}
		
		if (opts['minimize']) {
			area.mouseenter(function(){$(this).children('.slot-min-border-hover').css('display', 'block')});
			area.mouseleave(function(){$(this).children('.slot-min-border-hover').css('display', 'none')});
		} else {
			area.mouseenter(function(){$(this).children('.slot-border-hover').css('display', 'block')});
			area.mouseleave(function(){$(this).children('.slot-border-hover').css('display', 'none')});
		}
		
		if (opts.id) {
			area.mouseenter(function(){
				var id = $(this).parent('.equipment-slot').attr('id');
				var res = /-([^-]+)$/.exec(id);
				if (res && res[1] && Calc.items[res[1]]) {
					$("#tooltip").html(UI.makeItem(Calc.items[res[1]]));
					
					var pr = makePrice(Calc.items[res[1]]);
					if (pr)
						$("#price_tooltip").html(pr).show();
						
					pr = makeprice2(Calc.items[res[1]]);
					if (pr)
						$("#price_tooltip2").html(pr).show();

					$("#tooltip").show();
				}
			});
			area.mousemove(function(e){
				UI.reposWindow("#tooltip", e);
				$("#price_tooltip").css("left", parseInt($("#tooltip").css('left'), 10) + 2 + $("#tooltip").width());
				$("#price_tooltip").css("top", $("#tooltip").css('top'));
				$("#price_tooltip2").css("left", $("#price_tooltip").css("left"));
				$("#price_tooltip2").css("top", $("#price_tooltip").height() + 2 + parseInt($("#tooltip").css('top'),10));
			});
			area.mouseleave(function(){
				$("#tooltip").hide();
				$("#price_tooltip").empty().hide();
				$("#price_tooltip2").empty().hide();
			});
		}
	};
	
	$.fn.makeWindow = function(options) {
		var defaults = {
			closable: 1
		};
		var opts = $.extend(defaults, options);
		
		var old = $(this).html();
		var html = '<div class="window-modal"></div>';
		html += '<div class="window-top-left"></div>';
		html += '<div class="window-top-right"></div>';
		html += '<div class="window-top"></div>';
		html += '<div class="window-left"></div>';
		html += '<div class="window-right"></div>';
		html += '<div class="window-center"></div>';
		html += '<div class="window-bottom-left"></div>';
		html += '<div class="window-bottom-right"></div>';
		html += '<div class="window-bottom"></div>';
		html += '<div class="window-content">'+ old +'</div>';
		if (opts.closable)
			html += '<div class="window-close"></div>';
		$(this).html(html);
		
		if (opts.closable) {
			$(this).children(".window-modal").click(function() {
				var id=$(this).parent().attr('id');
				$(this).parent().hide();
				$(".related-" + id).hide();
				return false;
			});
			$(this).children(".window-close").click(function() {
				var id=$(this).parent().attr('id');
				$(this).parent().hide();
				$(".related-" + id).hide();
				return false;
			});
		}
	}
	
	$.fn.makeSelect = function(options) {
		var defaults = {
			items : [],
			firstAlways : 1,
			classRow : '',
			classIcon : '',
			classLabel : '',
			icons: 1,
			keepSort: 1,
			sortByName : 0,
			hideTimeout: 1000,
			hideSpeed: 200,
			showSpeed: 300
		};
		var opts = $.extend(defaults, options);
		
		if (! window.selectTimeouts) {
			selectTimeouts = {};
		}
		
		var reshtml = '<input class="select-input" type="hidden" name="'+ $(this).attr('inputname') +'"';
		if (opts.items.length > 0) {
			reshtml += ' value="'+ opts.items[0].value +'" />';
		} else {
			reshtml += ' value="" />';
		}
		var cnt = 0;
		for (var i in opts.items) {
			var item = opts.items[i];
			if (cnt == 1) {
				reshtml += '<br clear="all" /><div class="select-hidden">';
			}
			reshtml += '<div class="'+ opts.classRow +'" order="'+ cnt +'" value="'+ item.value +'" id="'+ item.name +'">';
			if (opts.icons)
				reshtml += '<div class="'+ opts.classIcon +'"></div>';
			reshtml += '<div><table class="'+ opts.classLabel +'"><tr><td>'+ item.label +'</td></tr></table></div>';
			reshtml += '</div>';
			++cnt;
		}
		if (cnt > 1)
			reshtml += '</div>';
		
		$(this).html(reshtml);

		$(this).find("."+ opts.classRow).mouseover(function() {
			var parent = $(this).parents(".class-select");
			clearTimeout(selectTimeouts[parent.attr('id')]);
		});
		$(this).find("."+ opts.classRow).mouseleave(opts, function(e) {
			var parent = $(this).parents(".class-select");
			var obj = {
				element: parent.children(".select-hidden"),
				func : function() {this.element.hide(e.data.hideSpeed)}
			};
			selectTimeouts[parent.attr('id')] = setTimeout(function() {obj.func()}, e.data.hideTimeout);
		});
		
		$(this).find("."+ opts.classRow).click(opts, function(e) {
			var classRow = e.data.classRow;
			var parent = $(this).parents(".class-select");
			if (parent.find(".select-hidden").css('display') == 'none') {
				var hidden = parent.find(".select-hidden")
				hidden.show(e.data.showSpeed);
			} else {
				parent.children(".select-hidden").prepend( parent.children('.'+ classRow).detach() );
				parent.prepend($(this).detach());

				if (e.data.keepSort || e.data.sortByName) {
					var items = parent.find(".select-hidden ."+ classRow).sort(function(a,b) {
						var vA = e.data.sortByName ? $(a).text() : parseInt($(a).attr('order'), 10);
						var vB = e.data.sortByName ? $(b).text() : parseInt($(b).attr('order'), 10);
						return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
					}).detach();
					parent.find(".select-hidden").append(items);
				}
				
				parent.find(".select-hidden").hide(e.data.hideSpeed);
				parent.find('input').attr('value', $(this).attr('value')).trigger('change');
			}
		});
	}
	
	$.fn.tooltip = function(tooltip) {
		if ($(this).length > 1) {
			$(this).each(function() {$(this).tooltip(tooltip)});
			return;
		}
		
		var id = $(this).attr('id');
		if (! id)
			return;
			
		id = "tooltip_for_"+id;
		
		$('#'+id).remove();
		
		var res = '<div class="tooltip" id="'+ id +'">'+ tooltip + '</div>';
		$('body').append(res);
		
		$('#'+id).css('top', $(this).offset().top + $(this).height() + 4)
		         .css('left', $(this).offset().left);
						 
		$(this).mouseenter(function() {
			$('#'+id).css('top', $(this).offset().top + $(this).height() + 4)
		         .css('left', $(this).offset().left);
			$('.tooltip').hide();
			$('#'+id).fadeIn('200');
		}).mouseleave(function() { $('#'+id).stop().hide() });
	}
	
})(jQuery);

//************************************************
//
//************************************************

var UI = {};

UI.reposWindow = function(selector, pos, offset) {
	var x, newX, y, newY;
	if (pos) {
		y = pos.pageY
		x = pos.pageX
	} else {
		x = $(selector).css('left') - 5;
		y = $(selector).css('top') - 5;
	}
	newX = x;
	newY = y;
	
	var offY = $(document).scrollTop();
	var offX = $(document).scrollLeft();
	
	var bottom = y + $(selector).height() + 20;
	var right = x + $(selector).width() + 10;
	
	if (bottom > $(window).height() + offY) {
		newY = y + ($(window).height() + offY - bottom);
	}
	
	if (right > $(window).width() + offX) {
		newX = x - $(selector).width() - 20;
	}
	
	$(selector).css('left', Math.max(newX, 0) + 5)
	$(selector).css('top', Math.max(newY, 0) + 5)
}


UI.makeItem = function(i) {
	var reshtml = '<div class="tooltipborder"><table class="itemtooltip-container">';
	reshtml += '<div class="version-'+ i.version +'" id="version_info"></div>';
	reshtml += '<tr><td colspan="2" class="tooltip_name item-rank-'+ i.rank +'">'+ (i.enchantValue ? '+'+i.enchantValue+' ' : '')+ i.name +'</td></tr>';
	
	reshtml += '<tr><td class="itemtooltip-iconpane">';
	reshtml += '<div class="itemtooltip-icon" style="background-image: url(/icons/items/'+ i.icon +'.png)"></div>';
	reshtml += '</td><td class="itemtooltip-descpane">';
	
	var active = Calc.activePage;
	var base = '';
	var setdata = '';
	var page1 = '';

	if (i.equipment_type && i.equipment_type != 'no_armor')
		base += '<p class="tooltip_info">'+ getLang('equipment_types', i.equipment_type) +'</p>'
		
	if (i.item_rank && i.item_rank != 'normal')
		base += '<p class="tooltip_info">'+ getLang('item_ranks', i.item_rank) +'</p>'
	
	if (i.hit_count) {
		var str = 'hitcount_normal';
		if (i.attack_delay >= 2.4)
			str = 'hitcount_veryslow';
		else if (i.attack_delay >= 2.0)
			str = 'hitcount_slow';
		else if (i.attack_delay <= 1.3)
			str = 'hitcount_fast';
		base += '<p class="tooltip_info">'+ getLang('iteminfo', str, i.hit_count) +'</p>'
	}
	
	if (i.classes) {
		if (i.classes.all) {
			base += '<p class="tooltip_info">'+ getLang('interface', 'all_req', i.classes.all) +'</p>'
		} else {
			var str = [];
			for (var cl in Aion.classesData) {
				if (i.classes[cl])
					str.push( getLang('interface', 'class_req', getLang('classes', cl), i.classes[cl]) );
			}
			if (str.length > 0)
				base += '<p class="tooltip_info">'+ str.join(', ') +'</p>'
		}
	}
	if (i.classesMax) {
		if (i.classesMax.all) {
			base += '<p class="tooltip_info">'+ getLang('interface', 'all_req_max', i.classesMax.all) +'</p>'
		} else {
			var str = [];
			for (var cl in Aion.classesData) {
				if (i.classesMax[cl])
					str.push( getLang('interface', 'class_req_max', getLang('classes', cl), i.classesMax[cl]) );
			}
			if (str.length > 0)
				base += '<p class="tooltip_info">'+ str.join(', ') +'</p>'
		}
	}
	
	if (i.usable_rank_min > 0) {
		base += '<p class="tooltip_info">'+ getLang('abyssranks', 'rank_min', getLang('abyssranks', 'rank'+i.usable_rank_min)) +'</p>'
	}
	if (i.usable_rank_max > 0) {
		base += '<p class="tooltip_info">'+ getLang('abyssranks', 'rank_max', getLang('abyssranks', 'rank'+i.usable_rank_max)) +'</p>'
	}
	
	if (!i.tradable) {
		base += '<p class="tooltip_info">'+ getLang('iteminfo', 'untradable') +'</p>'
	}
	
	if (i.icons.length) {
		page1 += '<div>';
		for (var j=0; j < i.icons.length; ++j) {
			page1 += '<div class="itemtooltip-status itemtooltip-status-'+ i.icons[j] +'"></div>';
		}
		page1 += '</div><br class="clear">';
	}
	
	page1 += '<hr />';
	
	page1 += '<table><col width="50%"><col width="50%">';
	var enchantpassed = {};
	
	var bonuses = Calc.getItemsStats(i);
	
	
	for (var prim in Aion.prim2sec) {
		var attr = Aion.prim2sec[prim];
		var value = bonuses.primary[attr] || 0;
		if (! value)
			continue;
		
		if (attr != 'attackdelay')
			value = formatBonus(attr, value);
		if (bonuses.secondary[attr])
			value += '&nbsp;&nbsp;<span class="tooltip_green">'+ formatBonus(attr, bonuses.secondary[attr], true) +'</span>';
		enchantpassed[attr] = 1;
		
		page1 += '<tr><td class="tooltip_info">'+ getLang('bonusnames', attr) +'</td><td class="tooltip_value">'+ value +'</td></tr>'
	}
	
	for (var attr in Aion.bonusesData) {
		if (enchantpassed[attr])
			continue;
		var value = bonuses.secondary[attr];
		
		if (! value)
			continue;
		value = formatBonus(attr, bonuses.secondary[attr], true);
		page1 += '<tr><td class="tooltip_info">'+ getLang('bonusnames', attr) +'</td><td class="tooltip_value"><span class="tooltip_green">'+ value +'</span></td></tr>';
	}

	page1 += '</table>';
	
	if (i.manastones.stones.length) {
		page1 += '<hr />'
		page1 += '<table style="width:100%"><col width="30%"><col width="20%"><col width="30%"><col width="20%">';
		for (p=0; p < i.manastones.stones.length; ++p) {
			if (p % 2 == 0)	page1 += '<tr>'
			if (i.manastones.stones[p]) {
				var ancient = p < i.manaspec;
				var stone = Calc.manastoneDecode(i.manastones.stones[p], ancient);
				if (ancient) {
					page1 += '<td colspan="2" class="tooltip-manastone-ancient ancient-'+ stone.rank +'">'+ stone.text +'</td>';
				} else {
					page1 += '<td colspan="2" class="tooltip-manastone-'+ stone.rank +'">'+ stone.text +'</td>';
				}
			} else {
				if (p < i.manaspec) {
					page1 += '<td colspan="2" class="tooltip_manastone_special">&nbsp;</td>'
				} else if (p >= i.manastones.stones.length - i.manabonus) {
					page1 += '<td colspan="2" class="tooltip_manastone_optional">&nbsp;</td>'
				} else {
					page1 += '<td colspan="2" class="tooltip_manastone_empty">&nbsp;</td>'
				}
			}
			if (p % 2 == 2)	page1 += '</tr>'
		}
		if (p % 2 == 2)	page1 += '<td colspan="2">&nbsp;</td></tr>'
		
		page1 += '</tr></table>';
	}
	
	if (i.max_enchant_value > 0) {
		page1 += '<hr /><p class="tooltip_info">'+ getLang('interface', 'enchantment') +' '+ i.enchantValue +' / '+ (i.max_enchant_value) +'</p>'
	}
	
	if (Calc.items2set && Calc.items2set[i.id] > 0) {
		var set = Calc.setData[Calc.items2set[i.id]];
		page1 += '<hr /><p class="tooltip_info">'+ set.label +' ('+ Calc.getEquippedItemsCnt(Calc.items2set[i.id]) +' / '+ set.ids.length +')</p>'
	}
	
	if (i.chargelevel > 0) {
		page1 += '<hr /><p class="tooltip_info">'+ getLang(i.chargeway == 1 ? 'godench' : 'magench', 'name', i.augmentValue, i.chargelevel) +'</p>'
		page1 += '<div class="enchant-bar';
		if (i.augmentValue > 0) {
			if (i.chargeway == 1) {
				page1 += ' enchant-bar-god'+ i.augmentValue;
			} else {
				page1 += ' enchant-bar-mag'+ i.augmentValue;
			}
		}
		page1 += '"><div class="enchant-bar-left"></div><div class="enchant-bar-right"></div></div>';
	}
	
	if (i.telescopic) {
		page1 += '<hr /><p class="tooltip_info">'+ getLang('interface', 'telescopic') +'</p>'
	}
	
	var page2 = '';
	
	page2 += '<table><col width="30%"><col width="20%"><col width="30%"><col width="20%">';

	
	if (i.display.primary.length > 0) {
		i.enchantpassed = {};
		for (var p=0; p < i.display.primary.length; p+=2) {
			var value = i.display.primary[p+1];
			var attr = i.display.primary[p];
			attr = Aion.prim2sec[attr] ? Aion.prim2sec[attr] : attr;
			
			if (i.bonuses.enchant) {
				if (attr == 'magicalskillboost' && i.armfusion && i.armfusion.bonuses.primary.magicalskillboost > 0)
					value += ' ('+ Math.floor(Calc.items.armfusion.bonuses.primary.magicalskillboost/10) +')';
				if (i.bonuses.enchant[attr] > 0)
					value += ' (+'+ i.bonuses.enchant[attr] +')';
				i.enchantpassed[attr] = 1;
			}
				
			if (p % 4 == 0)	page2 += '<tr>'
			page2 += '<td class="tooltip_desc">'+ getLang('bonusnames', i.display.primary[p]) +'</td><td class="tooltip_value">'+ value +'</td>'
			if (p % 4 == 2)	page2 += '</tr>'
		}
		if (i.bonuses.enchant) {
			for (var at in i.bonuses.enchant) {
				if (i.enchantpassed[at] > 0)
					continue;
				if (at != 'phyattack' && i.bonuses.enchant[at] > 0) {
					if (p % 4 == 0)	page2 += '<tr>'
					page2 += '<td class="tooltip_desc">'+ getLang('bonusnames', at) +'</td><td class="tooltip_value">0 (+'+ i.bonuses.enchant[at] +')</td>'	
					if (p % 4 == 2)	page2 += '</tr>'
					p += 2;
				}
			}
		}
		delete i.enchantpassed;
		if (p % 4 == 2)	page2 += '<td class="tooltip_desc">&nbsp;</td><td class="tooltip_value">&nbsp;</td></tr>'
		page2 += '<tr><td colspan="4"><hr /></td></tr>';
	}
	if (i.display.secondary) {
		for (p=0; p < i.display.secondary.length; p+=2) {
			if (p % 4 == 0)	page2 += '<tr>'
			page2 += '<td class="tooltip_desc">'+ getLang('bonusnames', i.display.secondary[p]) +'</td><td class="tooltip_value">'+ i.display.secondary[p+1] +'</td>'
			if (p % 4 == 2)	page2 += '</tr>'
		}
		if (p % 4 == 2)	page2 += '<td class="tooltip_desc">&nbsp;</td><td class="tooltip_value">&nbsp;</td></tr>'
	}
	
	if (i.manastones.stones.length) {
		page2 += '<tr><td colspan="4"><hr /></td></tr>'
		page2 += '<tr><td colspan="4" class="tooltip_info">'+ getLang('manalevels', 'level', i.manastones.level) +'</td></tr>'
		for (p=0; p < i.manastones.stones.length; ++p) {
			if (p % 2 == 0)	page2 += '<tr>'
			if (i.manastones.stones[p]) {
				var ancient = p < i.manaspec;
				var stone = Calc.manastoneDecode(i.manastones.stones[p], ancient);
				if (ancient) {
					page2 += '<td colspan="2" class="tooltip-manastone-ancient ancient-'+ stone.rank +'">'+ stone.text +'</td>';
				} else {
					page2 += '<td colspan="2" class="tooltip-manastone-'+ stone.rank +'">'+ stone.text +'</td>';
				}
			} else {
				if (p < i.manaspec) {
					page2 += '<td colspan="2" class="tooltip_manastone_special">&nbsp;</td>'
				} else if (p >= i.manastones.stones.length - i.manabonus) {
					page2 += '<td colspan="2" class="tooltip_manastone_optional">&nbsp;</td>'
				} else {
					page2 += '<td colspan="2" class="tooltip_manastone_empty">&nbsp;</td>'
				}
			}
			if (p % 2 == 2)	page2 += '</tr>'
		}
		if (p % 2 == 2)	page2 += '<td colspan="2">&nbsp;</td></tr>'
	}
	
	if (i.display.godench1.length > 0) {
		page2 += '<tr><td colspan="4"><hr /></td></tr>';
		page2 += '<tr><td colspan="4" class="tooltip_info">'+ getLang(i.chargeway == 1 ? 'godench' : 'magench', 'lvl1') +'</td></tr>';
		for (p=0; p < i.display.godench1.length; p+=2) {
			if (p % 4 == 0)	page2 += '<tr'+ (i.augmentValue < 1 ? ' class="tooltip-inactive"' : '') +'>'
			page2 += '<td class="tooltip_desc">'+ getLang('bonusnames', i.display.godench1[p]) +'</td><td class="tooltip_value">'+ i.display.godench1[p+1] +'</td>'
			if (p % 4 == 2)	page2 += '</tr>'
		}
		if (p % 4 == 2)	page2 += '<td class="tooltip_desc">&nbsp;</td><td class="tooltip_value">&nbsp;</td></tr>'
	}
	
	if (i.display.godench2.length > 0) {
		page2 += '<tr><td colspan="4"><hr /></td></tr>';
		page2 += '<tr'+ (i.augmentValue < 2 ? ' class="tooltip-inactive"' : '') +'><td colspan="4" class="tooltip_info">'+ getLang(i.chargeway == 1 ? 'godench' : 'magench', 'lvl2') +'</td></tr>';
		for (p=0; p < i.display.godench2.length; p+=2) {
			if (p % 4 == 0)	page2 += '<tr'+ (i.augmentValue < 2 ? ' class="tooltip-inactive"' : '') +'>'
			page2 += '<td class="tooltip_desc">'+ getLang('bonusnames', i.display.godench2[p]) +'</td><td class="tooltip_value">'+ i.display.godench2[p+1] +'</td>'
			if (p % 4 == 2)	page2 += '</tr>'
		}
		if (p % 4 == 2)	page2 += '<td class="tooltip_desc">&nbsp;</td><td class="tooltip_value">&nbsp;</td></tr>'
	}
	page2 += '</table>';
	
	if (i.randomset) {
		if (page2)
			page2 += '<hr />'
		page2 += '<p class="tooltip_info tooltip_centered">'+ getLang('interface', 'hasrandomset') +'</p>'
		page2 += '<p class="tooltip_centered">' + Calc.getRandomOptionSet(i.randomset, i.selectedRandomSet) +'</p>'
	}

	var page3 = '';
	
	if (Calc.items2set && Calc.items2set[i.id] > 0) {
		// if (page3)
			// page3 += '<hr />'
			
		var set = Calc.setData[Calc.items2set[i.id]];
		for (var ind in set.ids) {
			setdata += '<p class="'+ (Calc.isEquipped(set.ids[ind], true) ? 'setitem_active' : 'setitem_inactive') +'">'+ Calc.getSetItemName(set.ids[ind]) +'</p>';
			
		}
		setdata += '<hr />'
		var cnteq = Calc.getEquippedItemsCnt(Calc.items2set[i.id]);
		var total = Calc.setData[Calc.items2set[i.id]].ids.length;
		setdata += '<table><col width="30%"><col width="20%"><col width="30%"><col width="20%">';
		for (k = 1; k <= 6; ++k) {
			if (set['b'+k]) {
				setdata += '<tr><td colspan="4" class="'+ (cnteq >= k ? 'setitem_active' : 'setitem_inactive') +'">'+ getLang('set', 'bonus_'+k) + '</td></tr>';
				var cnt = 0;
				for (atr in set['b'+k]) {
					if (cnt % 2 == 0)
						setdata += '<tr>'
					setdata += '<td class="tooltip_desc">'+ getLang('bonusnames', atr) +'</td><td class="tooltip_value">'+ formatBonus(atr, set['b'+k][atr], true) +'</td>'
					if (cnt % 2 == 2)
						setdata += '</tr>'
					++cnt;
				}
				if (cnt % 2 == 2)
					setdata += '<td colspan="2">&nbsp;</td></tr>'
			}
		}
		if (set['ba']) {
			setdata += '<tr><td colspan="4" class="'+ (cnteq >= total ? 'setitem_active' : 'setitem_inactive') +'">'+ getLang('set', 'bonus_full') + '</td></tr>';
			var cnt = 0;
			for (atr in set['ba']) {
				if (cnt % 2 == 0)
					setdata += '<tr>'
				setdata += '<td class="tooltip_desc">'+ getLang('bonusnames', atr) +'</td><td class="tooltip_value">'+ formatBonus(atr, set['ba'][atr], true) +'</td>'
				if (cnt % 2 == 2)
					setdata += '</tr>'
				++cnt;
			}
			if (cnt % 2 == 2)
				setdata += '<td colspan="2">&nbsp;</td></tr>'
		}
		setdata += '</table>';
	}
	
	if (i.icons.length) {
		if (page3)
			page3 += '<hr />'
		page3 += '<table class="emptytable">';
		for (var j=0; j < i.icons.length; ++j) {
			page3 += '<tr><td class="itemtooltip-status itemtooltip-status-'+ i.icons[j] +'"></td><td class="tooltip_info">'+ getLang('itemicons', i.icons[j]) + '</td></tr>';
		}
		page3 += '</table>';
	}
	
	if (i.nopages) {
		reshtml += base +'<hr>'+ page2;
		if (setdata)
			reshtml += '<hr>'+setdata;
	} else {
		reshtml += '<div class="item-stat-page" id="item_page_1" style="display:'+ (active == 1 ? 'block' : 'none')	+'">';
		reshtml += base + page1;
		reshtml += '</div><div class="item-stat-page" id="item_page_2" style="display:'+ (active == 2 ? 'block' : 'none')	+'">';
		reshtml += page2;
		reshtml += '</div><div class="item-stat-page" id="item_page_3" style="display:'+ (active == 3 ? 'block' : 'none')	+'">';
		reshtml += page3;
		if (setdata)
			reshtml += (page3 ? '<hr>' : '') + setdata;
		reshtml += '</div>';
	}
	
	reshtml += '</td></tr>';
	reshtml += '</table>';
	
	if (!i.nopages) {
		reshtml += '<hr /><div id="pager-wrapper">';
		for (var j = 1; j <= 3; ++j) {
			reshtml += '<div class="page-selector'+ (j == active ? ' active' : '') +'" id="page_'+ j +'"></div>';
		}
		reshtml += '</div>'
	}
	
	if (i.beta) {
		reshtml += '<hr /><p class="tooltip_name item_warning">'+ getLang('interface', 'beta') +'</p>'
	}
	
	reshtml += '</div>';
	return reshtml;
}
 