var charater = 'gladiator';
var skill = [];
// Draining Sword
skill.push({"id":"none","name":"DrainSword","name_l10n":"Draining Sword","skill_tag":"Attack","lvl":"3","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATKDrain_Instant.MinDamage] - [%e1.SkillATKDrain_Instant.MaxDamage] physical damage on a target and has a chance to absorb [%e1.SkillATKDrain_Instant.HPHeal]%% of the damage as HP.","action":"target","prepare":"instance","cd":"60000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"60","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":758,"[%e1.SkillATKDrain_Instant.MaxDamage]":762,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-2","param":"cost"}},{"cost":{"type":"MP","value":"117","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":802,"[%e1.SkillATKDrain_Instant.MaxDamage]":806,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-3","param":"cost"}},{"cost":{"type":"MP","value":"175","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":847,"[%e1.SkillATKDrain_Instant.MaxDamage]":851,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-5","param":"cost"}}]});

// Whirling Strike
skill.push({"id":"none","name":"JumpAttack","name_l10n":"Whirling Strike","skill_tag":"Attack","lvl":"3","type":"default","condition":";melee","desc":"Inflicts [%e1.DashATK.MinDamage]~[%e1.DashATK.MaxDamage] physical damage by dashing to a target within [%First_Target_Valid_Distance]m.","action":"target","prepare":"instance","cd":"60600","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"29","timer":0},"rules":{"[%e1.DashATK.MinDamage]":858,"[%e1.DashATK.MaxDamage]":862,"[%First_Target_Valid_Distance]":"17"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"57","timer":0},"rules":{"[%e1.DashATK.MinDamage]":908,"[%e1.DashATK.MaxDamage]":912,"[%First_Target_Valid_Distance]":"17"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"85","timer":0},"rules":{"[%e1.DashATK.MinDamage]":959,"[%e1.DashATK.MaxDamage]":963,"[%First_Target_Valid_Distance]":"17"},"lv_up":{"type":"cd","value":"-600","param":"cd"}}]});

// Tendon Slice
skill.push({"id":"none","name":"KneeCrash","name_l10n":"Tendon Slice","skill_tag":"Abnormal Condition","lvl":"6","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage]~[%e1.SkillATK_Instant.MaxDamage] physical damage on a target and immobilizes it for [%e2.Root.RemainTime].","action":"target","prepare":"instance","cd":"122400","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"37","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":603,"[%e1.SkillATK_Instant.MaxDamage]":607,"[%e2.Root.RemainTime]":"8 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"75","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":645,"[%e1.SkillATK_Instant.MaxDamage]":649,"[%e2.Root.RemainTime]":"8 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"113","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":686,"[%e1.SkillATK_Instant.MaxDamage]":690,"[%e2.Root.RemainTime]":"8 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"151","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":727,"[%e1.SkillATK_Instant.MaxDamage]":731,"[%e2.Root.RemainTime]":"8 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"189","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":769,"[%e1.SkillATK_Instant.MaxDamage]":773,"[%e2.Root.RemainTime]":"8 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"227","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":810,"[%e1.SkillATK_Instant.MaxDamage]":814,"[%e2.Root.RemainTime]":"8 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}}]});

// Spite Strike
skill.push({"id":"none","name":"TechnicalCounter","name_l10n":"Spite Strike","skill_tag":"Stun","lvl":"6","type":"default","condition":";melee","desc":"After a successful parry, inflicts [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage on a target and puts it in the [%e1.SkillATK_Instant.AddEffect] state.","action":"target","prepare":"instance","cd":"16000","skill_type":"Magical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"58","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":404,"[%e1.SkillATK_Instant.MaxDamage]":408,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-2","param":"cost"}},{"cost":{"type":"MP","value":"115","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":432,"[%e1.SkillATK_Instant.MaxDamage]":436,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-3","param":"cost"}},{"cost":{"type":"MP","value":"173","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":459,"[%e1.SkillATK_Instant.MaxDamage]":463,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-5","param":"cost"}},{"cost":{"type":"MP","value":"231","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":486,"[%e1.SkillATK_Instant.MaxDamage]":490,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-7","param":"cost"}},{"cost":{"type":"MP","value":"288","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":513,"[%e1.SkillATK_Instant.MaxDamage]":517,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-8","param":"cost"}},{"cost":{"type":"MP","value":"346","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":541,"[%e1.SkillATK_Instant.MaxDamage]":545,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-10","param":"cost"}}]});

// Severe Precision Cut
skill.push({"id":"none","name":"ChargingShock","name_l10n":"Severe Precision Cut","skill_tag":"Area of Effect","lvl":"6","type":"default","condition":";2hsword;polearm","desc":"Swings your weapon widely to inflict [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] unavoidable physical damage on up to 6 targets within 7m. There is a chance to inflict the [%e1.SkillATK_Instant.AddEffect] state.","action":"around","prepare":"instance","cd":"90000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"50","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1422,"[%e1.SkillATK_Instant.MaxDamage]":1426,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"129","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1521,"[%e1.SkillATK_Instant.MaxDamage]":1525,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-4","param":"cost"}},{"cost":{"type":"MP","value":"207","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1620,"[%e1.SkillATK_Instant.MaxDamage]":1624,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-6","param":"cost"}},{"cost":{"type":"MP","value":"285","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1719,"[%e1.SkillATK_Instant.MaxDamage]":1723,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-8","param":"cost"}},{"cost":{"type":"MP","value":"364","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1818,"[%e1.SkillATK_Instant.MaxDamage]":1822,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-11","param":"cost"}},{"cost":{"type":"MP","value":"442","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1916,"[%e1.SkillATK_Instant.MaxDamage]":1920,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"MP","value":"-13","param":"cost"}}]});

// Sure Strike
skill.push({"id":"none","name":"BurserkLance","name_l10n":"Sure Strike","skill_tag":"Attack","lvl":"6","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage]~[%e1.SkillATK_Instant.MaxDamage] unavoidable physical damage.","action":"target","prepare":"instance","cd":"30000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"75","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1881,"[%e1.SkillATK_Instant.MaxDamage]":1885},"lv_up":{"type":"MP","value":"-2","param":"cost"}},{"cost":{"type":"MP","value":"127","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":2012,"[%e1.SkillATK_Instant.MaxDamage]":2016},"lv_up":{"type":"MP","value":"-4","param":"cost"}},{"cost":{"type":"MP","value":"179","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":2143,"[%e1.SkillATK_Instant.MaxDamage]":2147},"lv_up":{"type":"MP","value":"-6","param":"cost"}},{"cost":{"type":"MP","value":"231","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":2274,"[%e1.SkillATK_Instant.MaxDamage]":2278},"lv_up":{"type":"MP","value":"-8","param":"cost"}},{"cost":{"type":"MP","value":"283","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":2405,"[%e1.SkillATK_Instant.MaxDamage]":2409},"lv_up":{"type":"MP","value":"-11","param":"cost"}},{"cost":{"type":"MP","value":"335","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":2535,"[%e1.SkillATK_Instant.MaxDamage]":2539},"lv_up":{"type":"MP","value":"-13","param":"cost"}}]});

// Sharp Strike
skill.push({"id":"none","name":"SharpnessHit","name_l10n":"Sharp Strike","skill_tag":"Attack","lvl":"6","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage on the target.\nRepeat Activation Twice.","action":"target","prepare":"instance","cd":"16000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"38","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":238,"[%e1.SkillATK_Instant.MaxDamage]":242},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"65","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":253,"[%e1.SkillATK_Instant.MaxDamage]":257},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"92","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":269,"[%e1.SkillATK_Instant.MaxDamage]":273},"lv_up":{"type":"MP","value":"-2","param":"cost"}},{"cost":{"type":"MP","value":"119","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":284,"[%e1.SkillATK_Instant.MaxDamage]":288},"lv_up":{"type":"MP","value":"-3","param":"cost"}},{"cost":{"type":"MP","value":"146","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":300,"[%e1.SkillATK_Instant.MaxDamage]":304},"lv_up":{"type":"MP","value":"-4","param":"cost"}},{"cost":{"type":"MP","value":"173","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":316,"[%e1.SkillATK_Instant.MaxDamage]":320},"lv_up":{"type":"MP","value":"-5","param":"cost"}}]});

// Exhausting Wave
skill.push({"id":"none","name":"WhirlDrain","name_l10n":"Exhausting Wave","skill_tag":"Area of Effect","lvl":"6","type":"default","condition":";2hsword;polearm","desc":"Inflicts [%e1.SkillATKDrain_Instant.MinDamage] - [%e1.SkillATKDrain_Instant.MaxDamage] physical damage on enemies within 7m and absorbs [%e1.SkillATKDrain_Instant.HPHeal]%% damage as HP.\nRepeat Activation 3 times.","action":"around","prepare":"instance","cd":"122400","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"19","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":53,"[%e1.SkillATKDrain_Instant.MaxDamage]":57,"[%e1.SkillATKDrain_Instant.HPHeal]":"25"},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"37","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":55,"[%e1.SkillATKDrain_Instant.MaxDamage]":59,"[%e1.SkillATKDrain_Instant.HPHeal]":"25"},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"55","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":58,"[%e1.SkillATKDrain_Instant.MaxDamage]":62,"[%e1.SkillATKDrain_Instant.HPHeal]":"25"},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"73","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":60,"[%e1.SkillATKDrain_Instant.MaxDamage]":64,"[%e1.SkillATKDrain_Instant.HPHeal]":"25"},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"91","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":63,"[%e1.SkillATKDrain_Instant.MaxDamage]":67,"[%e1.SkillATKDrain_Instant.HPHeal]":"25"},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"109","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":66,"[%e1.SkillATKDrain_Instant.MaxDamage]":70,"[%e1.SkillATKDrain_Instant.HPHeal]":"25"},"lv_up":{"type":"cd","value":"-2400","param":"cd"}}]});

// Siegebreaker
skill.push({"id":"none","name":"GateCrush","name_l10n":"Siegebreaker","skill_tag":"Attack","lvl":"8","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage on a target, and deals [%e1.SkillATK_Instant.AddDamage] additional physical damage if the target is a castle gate.","action":"target","prepare":"instance","cd":"12000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"5 300"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"5 800"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"6 300"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"6 800"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"7 300"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"7 800"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"8 300"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":16,"[%e1.SkillATK_Instant.MaxDamage]":20,"[%e1.SkillATK_Instant.AddDamage]":"8 800"},"lv_up":{"type":"GateCrush","value":"200","param":"[%e1.SkillATK_Instant.AddDamage]"}}]});

// Ankle Snare
skill.push({"id":"none","name":"AnkleGrab","name_l10n":"Ankle Snare","skill_tag":"Abnormal Condition","lvl":"1","type":"default","condition":"null","desc":"Immobilizes a target within [%First_Target_Valid_Distance]m for [%e1.Root.RemainTime] and decreases its [%e2.StatDown.StatName] by [%e2.StatDown.Value].","action":"target","prepare":"instance","cd":"122400","skill_type":"Magical","skill_sub_type":"Debuff","lvls":[{"cost":{"type":"MP","value":"69","timer":0},"rules":{"[%First_Target_Valid_Distance]":"25","[%e2.StatDown.StatName]":"Evasion","[%e2.StatDown.Value]":"1 000","[%e1.Root.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}}]});

// Magical Defense
skill.push({"id":"none","name":"MagicalBarrier","name_l10n":"Magical Defense","skill_tag":"Buff","lvl":"1","type":"default","condition":"null","desc":"Increases your Spell Debuff by [%e1.StatUp.Value] and decreases your Magical Resistance by [%e2.StatDown.Value] for [%e1.StatUp.RemainTime].","action":"self","prepare":"instance","cd":"90900","skill_type":"Magical","skill_sub_type":"Buff","lvls":[{"cost":{"type":"MP","value":"110","timer":0},"rules":{"[%e1.StatUp.Value]":"1 000","[%e2.StatDown.Value]":"100","[%e1.StatUp.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-900","param":"cd"}}]});

// Crippling Cut
skill.push({"id":"none","name":"CripplingCut","name_l10n":"Crippling Cut","skill_tag":"Stun","lvl":"8","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage]~[%e1.SkillATK_Instant.MaxDamage] physical damage on a fallen enemy.","action":"target","prepare":"instance","cd":"18000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"17","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":414,"[%e1.SkillATK_Instant.MaxDamage]":418},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"30","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":489,"[%e1.SkillATK_Instant.MaxDamage]":493},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"45","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":564,"[%e1.SkillATK_Instant.MaxDamage]":568},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"60","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":638,"[%e1.SkillATK_Instant.MaxDamage]":642},"lv_up":{"type":"MP","value":"-2","param":"cost"}},{"cost":{"type":"MP","value":"74","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":713,"[%e1.SkillATK_Instant.MaxDamage]":717},"lv_up":{"type":"MP","value":"-2","param":"cost"}},{"cost":{"type":"MP","value":"89","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":788,"[%e1.SkillATK_Instant.MaxDamage]":792},"lv_up":{"type":"MP","value":"-3","param":"cost"}},{"cost":{"type":"MP","value":"103","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":863,"[%e1.SkillATK_Instant.MaxDamage]":867},"lv_up":{"type":"MP","value":"-3","param":"cost"}},{"cost":{"type":"MP","value":"117","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":938,"[%e1.SkillATK_Instant.MaxDamage]":942},"lv_up":{"type":"MP","value":"-3","param":"cost"}}]});

// Draining Blow
skill.push({"id":"none","name":"Stigma_DrainCut","name_l10n":"Draining Blow","skill_tag":"Stun","lvl":"8","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATKDrain_Instant.MinDamage] - [%e1.SkillATKDrain_Instant.MaxDamage] physical damage on a stumbled target and absorbs [%e1.SkillATKDrain_Instant.HPHeal]%% of the inflicted damage as HP.","action":"target","prepare":"instance","cd":"30000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"22","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":259,"[%e1.SkillATKDrain_Instant.MaxDamage]":263,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"43","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":304,"[%e1.SkillATKDrain_Instant.MaxDamage]":308,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-1","param":"cost"}},{"cost":{"type":"MP","value":"65","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":350,"[%e1.SkillATKDrain_Instant.MaxDamage]":354,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-2","param":"cost"}},{"cost":{"type":"MP","value":"87","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":395,"[%e1.SkillATKDrain_Instant.MaxDamage]":399,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-3","param":"cost"}},{"cost":{"type":"MP","value":"108","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":441,"[%e1.SkillATKDrain_Instant.MaxDamage]":445,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-3","param":"cost"}},{"cost":{"type":"MP","value":"130","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":487,"[%e1.SkillATKDrain_Instant.MaxDamage]":491,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-4","param":"cost"}},{"cost":{"type":"MP","value":"151","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":532,"[%e1.SkillATKDrain_Instant.MaxDamage]":536,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-4","param":"cost"}},{"cost":{"type":"MP","value":"173","timer":0},"rules":{"[%e1.SkillATKDrain_Instant.MinDamage]":578,"[%e1.SkillATKDrain_Instant.MaxDamage]":582,"[%e1.SkillATKDrain_Instant.HPHeal]":"100"},"lv_up":{"type":"MP","value":"-5","param":"cost"}}]});

// Dauntless Spirit
skill.push({"id":"none","name":"Ragespirit","name_l10n":"Dauntless Spirit","skill_tag":"Special","lvl":"8","type":"default","condition":"null","desc":"For [%e1.Shield.RemainTime], creates a protective shield that has a [%e1.Shield.ConditionProb]%% chance to block damage each time you receive [%e1.Shield.Condition]. The protective shield blocks up to [%e1.Shield.CoverValue] damage.","action":"self","prepare":"instance","cd":"60600","skill_type":"Magical","skill_sub_type":"Buff","lvls":[{"cost":{"type":"MP","value":"18","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"518"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"36","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"615"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"54","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"713"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"72","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"810"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"90","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"907"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"108","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"1 005"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"126","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"1 102"},"lv_up":{"type":"cd","value":"-600","param":"cd"}},{"cost":{"type":"MP","value":"144","timer":0},"rules":{"[%e1.Shield.ConditionProb]":100,"[%e1.Shield.Condition]":"all attack","[%e1.Shield.RemainTime]":"10 sec ","[%e1.Shield.CoverValue]":"1 199"},"lv_up":{"type":"cd","value":"-600","param":"cd"}}]});

// Earthquake Wave
skill.push({"id":"none","name":"HeavyImpact","name_l10n":"Earthquake Wave","skill_tag":"Abnormal Condition","lvl":"8","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage on enemies within 10m and decreases their movement speed for [%e2.Snare.RandomTime] - [%e2.Snare.RemainTime].","action":"around","prepare":"instance","cd":"122400","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"19","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":161,"[%e1.SkillATK_Instant.MaxDamage]":165,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"32","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":188,"[%e1.SkillATK_Instant.MaxDamage]":192,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"45","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":216,"[%e1.SkillATK_Instant.MaxDamage]":220,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"58","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":243,"[%e1.SkillATK_Instant.MaxDamage]":247,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"71","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":270,"[%e1.SkillATK_Instant.MaxDamage]":274,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"84","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":297,"[%e1.SkillATK_Instant.MaxDamage]":301,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"97","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":325,"[%e1.SkillATK_Instant.MaxDamage]":329,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}},{"cost":{"type":"MP","value":"110","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":352,"[%e1.SkillATK_Instant.MaxDamage]":356,"[%e2.Snare.RandomTime]":8,"[%e2.Snare.RemainTime]":"10 sec "},"lv_up":{"type":"cd","value":"-2400","param":"cd"}}]});

// Howl
skill.push({"id":"none","name":"Howling","name_l10n":"Howl","skill_tag":"Abnormal Condition","lvl":"8","type":"default","condition":"null","desc":"Decreases [%e1.StatDown.StatName] of enemies within 7m by [%e1.StatDown.Value] for [%e1.StatDown.RemainTime].","action":"around","prepare":"instance","cd":"306000","skill_type":"Magical","skill_sub_type":"Debuff","lvls":[{"cost":{"type":"MP","value":"19","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"80","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}},{"cost":{"type":"MP","value":"39","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"120","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}},{"cost":{"type":"MP","value":"59","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"160","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}},{"cost":{"type":"MP","value":"79","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"200","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}},{"cost":{"type":"MP","value":"99","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"240","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}},{"cost":{"type":"MP","value":"119","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"280","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}},{"cost":{"type":"MP","value":"139","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"320","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}},{"cost":{"type":"MP","value":"159","timer":0},"rules":{"[%e1.StatDown.StatName]":"Physical Attack","[%e1.StatDown.Value]":"360","[%e1.StatDown.RemainTime]":"15 sec "},"lv_up":{"type":"cd","value":"-6000","param":"cd"}}]});

// Lockdown
skill.push({"id":"none","name":"LockdownImpact","name_l10n":"Lockdown","skill_tag":"Abnormal Condition","lvl":"8","type":"default","condition":";melee","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage on the target. Binds the target for [%e2.Bind.RemainTime].","action":"target","prepare":"instance","cd":"12000","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":45,"[%e1.SkillATK_Instant.MaxDamage]":49,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":51,"[%e1.SkillATK_Instant.MaxDamage]":55,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":57,"[%e1.SkillATK_Instant.MaxDamage]":61,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":63,"[%e1.SkillATK_Instant.MaxDamage]":67,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":69,"[%e1.SkillATK_Instant.MaxDamage]":73,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":75,"[%e1.SkillATK_Instant.MaxDamage]":79,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":81,"[%e1.SkillATK_Instant.MaxDamage]":85,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}},{"cost":"none","rules":{"[%e1.SkillATK_Instant.MinDamage]":87,"[%e1.SkillATK_Instant.MaxDamage]":91,"[%e2.Bind.RemainTime]":"3 sec "},"lv_up":{"type":"dmg","value":"3","param":["[%e1.SkillATK_Instant.MinDamage]","[%e1.SkillATK_Instant.MaxDamage]"]}}]});

// Unraveling Assault
skill.push({"id":"none","name":"movewhirl","name_l10n":"Unraveling Assault","skill_tag":"Area of Effect","lvl":"3","type":"default","condition":";2hsword;polearm","desc":"Inflicts [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage on a target within 7m.\nRepeat Activation 3 times.","action":"around","prepare":"instance","cd":"90900","skill_type":"Physical","skill_sub_type":"Attack","lvls":[{"cost":{"type":"MP","value":"187","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":816,"[%e1.SkillATK_Instant.MaxDamage]":820},"lv_up":{"type":"cd","value":"-900","param":"cd"}},{"cost":{"type":"MP","value":"207","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":866,"[%e1.SkillATK_Instant.MaxDamage]":870},"lv_up":{"type":"cd","value":"-900","param":"cd"}},{"cost":{"type":"MP","value":"227","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":916,"[%e1.SkillATK_Instant.MaxDamage]":920},"lv_up":{"type":"cd","value":"-900","param":"cd"}}]});

// Wind Lance
skill.push({"id":"none","name":"BladeShock","name_l10n":"Wind Lance","skill_tag":"Stun","lvl":"3","type":"charge","condition":";melee","cd":"60600","skill_type":"Physical","skill_sub_type":"Attack","stage_1":{"desc":"Swings your weapon widely to inflict [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage on a target within 25m.","action":"target","prepare":"1900"},"lvls":{"lvl_1":{"stage_1":{"cost":{"type":"MP","value":"160","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":786,"[%e1.SkillATK_Instant.MaxDamage]":790},"lv_up":{"type":"cd","value":"-600"}},"lv_up":{"param":"cd"},"stage_2":{"cost":{"type":"MP","value":"371","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1716,"[%e1.SkillATK_Instant.MaxDamage]":1720,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"cd","value":"-600"}}},"lvl_2":{"stage_1":{"cost":{"type":"MP","value":"180","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":986,"[%e1.SkillATK_Instant.MaxDamage]":990},"lv_up":{"type":"cd","value":"-600"}},"lv_up":{"param":"cd"},"stage_2":{"cost":{"type":"MP","value":"401","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1916,"[%e1.SkillATK_Instant.MaxDamage]":1920,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"cd","value":"-600"}}},"lvl_3":{"stage_1":{"cost":{"type":"MP","value":"200","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":1086,"[%e1.SkillATK_Instant.MaxDamage]":1090},"lv_up":{"type":"cd","value":"-600"}},"lv_up":{"param":"cd"},"stage_2":{"cost":{"type":"MP","value":"461","timer":0},"rules":{"[%e1.SkillATK_Instant.MinDamage]":2116,"[%e1.SkillATK_Instant.MaxDamage]":2120,"[%e1.SkillATK_Instant.AddEffect]":"Stumbled"},"lv_up":{"type":"cd","value":"-600"}}}},"stage_2":{"desc":"Swings your weapon widely to inflict [%e1.SkillATK_Instant.MinDamage] - [%e1.SkillATK_Instant.MaxDamage] physical damage without a miss on a target within 25m, and there is a chance to put the target in the [%e1.SkillATK_Instant.AddEffect] state.","action":"target","prepare":"7000"}});


// Battle Banner
skill.push({"id":"none","name":"Dark_Warflag","name_l10n":"Battle Banner","skill_tag":"Special","lvl":"3","type":"default","condition":"null","desc":"Summons a Battle Banner within [%First_Target_Valid_Distance]m. Reduces the movement speed and PC damage of hostile targets within 8m of the standard.","action":"point","prepare":"instance","cd":"183600","skill_type":"Magical","skill_sub_type":"Summon","lvls":[{"cost":{"type":"MP","value":"279","timer":0},"rules":{"[%First_Target_Valid_Distance]":"20"},"lv_up":{"type":"cd","value":"-3600","param":"cd"}},{"cost":{"type":"MP","value":"319","timer":0},"rules":{"[%First_Target_Valid_Distance]":"20"},"lv_up":{"type":"cd","value":"-3600","param":"cd"}},{"cost":{"type":"MP","value":"359","timer":0},"rules":{"[%First_Target_Valid_Distance]":"20"},"lv_up":{"type":"cd","value":"-3600","param":"cd"}}]});
