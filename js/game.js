// PotentJS Adventure Creation Framework v20250708
// (c) 2025 Cyborg Unicorn Pty Ltd.
// This software is released under MIT License.

function Game() {}

Game.Title = "The Sorcerer and the Sword";
Game.SubTitle = "A tribute to Albert Pyun based on his movie The Sword and the Sorcerer.";

Game.Overview = [ "In the shadow-shrouded realm of Delos, where the moon dipped into darkness and the wind whispered secrets to " +
				"the trees, Xusia, the evil sorcerer, wove a web of deceit and malice. With a cackle that sent shivers " +
				"through the land, he snatched Alana, the radiant starlight maiden, destined to be Talon's bride in mere days." ];

// contains type 'player'
Game.Players = 
{
	alana: 
	{
		description: "Such a beautiful lass.",
		name: "Alana",
		alias: "Alana",
		location: "in a room",
		type: "player",

		prologue: [ "I lie captive in the darkness of Xusia's lair, the cold stone beneath me a harsh reminder of my fate. You " +
					"took me, Xusia, but why? What purpose do I serve in your twisted games? The hours tick by, each one a slow " +
					"crawl of uncertainty. My thoughts are consumed by Talon, the one I'm to marry in just a few short days. " +
					"Will he come for me? Does he even know I'm trapped here? I scan my prison, searching for any weakness, any " +
					"chance to escape. The iron bars, the locked door, the guards patrolling outside... but I won't give up. I " +
					"have to hold on to hope, to the thought of Talon's strong arms and his gentle touch. Maybe, just maybe, " +
					"he'll find a way to rescue me before our wedding day. Until then, I'll plot, I'll plan, and I'll wait... " +
					"for Talon, or for my chance to break free." ],

		epilogue: [ "I gaze into Talon's eyes, still shining with the thrill of battle, and smile. The darkness of Xusia's lair " +
					"is behind us, and the warmth of the sunlight on our skin is a welcome respite. Talon's strong arms wrap " +
					"around me, holding me close as if he'll never let me go. I don't mind; I'm safe with him.",

					"As we walk hand in hand, the world around us comes alive with color and sound. The trees sway gently in the " +
					"breeze, and the birds sing sweet melodies. It's as if nature itself is rejoicing in our freedom.",

					"Our wedding day is still ahead of us, and I'm eager to start our new life together. Talon saved me from the " +
					"depths of Xusia's lair, and I'll never forget the bravery and selflessness he showed. I look up at him, and he smiles, his eyes crinkling at the corners.",

					"'I'll always be here for you, Alana,' he says, his voice low and husky.",

					"I believe him. I know that with Talon by my side, we can face anything life throws our way. Together, we'll " +
					"build a life filled with love, laughter, and adventure. And as we walk towards our future, I know that our " +
					"happily ever after is just beginning." ],

		current_states: [ "alive", "closed" ],
		states: 
		{ 
			alive: "You are alive.",
			closed: "You are closed for pillaging.",
			dead: "You are dead.",
			open: "You are open for pillaging.",
			undead: "You are undead."
		},
		language:
		{
			articles: [ "myself" ],
			verbs: 
			{ 
				examine: null,
				inventory: null,
				kill: null,
				kiss: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: false,
			weight: 0,
			weight_limit: 60
		}
	},
	talon: 
	{
		description: "Very handsome if I do say so myself.",
		name: "Talon",
		alias: "Talon",
		location: "in a room",
		type: "player",

		prologue: [ "You burst through the door, expecting to be greeted by Alana's warm smile, but instead, you're met with " +
					"an eerie silence. You call out, 'Honey, I'm home!' but there's no response. That's when you see Alana's " + 
					"little brother, his face frantic with worry, running towards you. 'Help! Help! Alana's been kidnapped by " +
					"Xusia!' he cries, tugging at your leg.",

					"Without hesitation, you grip your trusty Tri-Sword, its familiar weight a comfort in the face of danger. " +
					"Our wedding is just a few days away, and you won't let Xusia ruin it. You set off towards Xusia's lair, " +
					"determination burning within you. As you enter the dark, foreboding caverns, you feel a sudden, searing " +
					"pain in the back of your neck. Everything goes dark, and you crumple to the ground.",

					"When you come to, your head throbs, and your vision blurs. You're disoriented, but as your senses return, " +
					"you realize you're in Xusia's lair, and... where's Alana? You struggle against your restraints, a growing " +
					"sense of urgency and fear driving you. What has Xusia done to her? You need to find out, and fast. You " +
					"glance around, taking stock of your surroundings, searching for any opportunity to escape and rescue your " +
					"beloved Alana before it's too late." ],

		epilogue: [ "I hold Alana's hand tight, feeling her warmth and love radiating towards me. The memory of Xusia's defeat " +
					"still fresh in my mind, I'm grateful to have saved the woman I love. As we walk towards our future, I glance " +
					"at Alana, her beauty and strength captivating me.",

					"With Xusia's darkness vanquished, our path is clear. Our wedding awaits, and I'm eager to start our life " +
					"together. Alana's smile lights up the world, and I'm honored to be her partner, her protector, and her love. ",

					"I look into her eyes, and she sees the sincerity in mine. 'I'll always protect you, Alana,' I promise, my " +
					"voice filled with conviction. 'Together, we'll face whatever comes next, side by side.'",

					"With Alana by my side, I know we'll conquer any challenge. Our love will flourish, and our bond will grow " +
					"stronger with each passing day. As we step into our new life, I'm excited to see what the future holds for " +
					"us, together." ],
					
		epilogue2: [ "I stand over Alana's lifeless body, my sword still trembling with the force of the blow. I feel a wave of horror wash " +
					"over me as I realize what I've done. I meant to save her, to protect her, but instead I've taken her life. I'm " +
					"consumed by grief and regret, my mind replaying the moments leading up to this tragedy. I'll never forgive myself " +
					"for this. I'll carry the weight of her death with me for the rest of my life, and I'll likely rot in hell for " +
					"eternity, tormented by the memories of what I've done."],

		current_states: [ "alive", "closed" ],
		states: 
		{ 
			alive: "You are alive.",
			closed: "You are closed for pillaging.",
			dead: "You are dead.",
			open: "You are open for pillaging.",
			undead: "You are undead."
		},
		language:
		{
			articles: [ "myself" ],
			verbs: 
			{ 
				examine: null,
				inventory: null,
				kiss: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: false,
			weight: 0,
			weight_limit: 60
		}
	}
};

// contains type 'npc'
Game.NPCs = 
{
	xusia: 
	{
		description: "The sorcerer Xusia of Delos.",
		name: "Xusia",
		alias: "Xusia",
		location: "in a room",
		type: "npc",

		current_states: [ "alive", "closed" ],
		states: 
		{ 
			alive: "Xusia is alive.",
			closed: "Xusia is closed for pillaging.",
			dead: "Xusia is dead.",
			open: "Xusia is open for pillaging."
		},
		language:
		{
			articles: [ "the", "xusia" ],
			verbs: 
			{ 
				examine: null,
				kill: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: false,
			weight: 0,
			weight_limit: 60
		}
	}
};

// contains type 'object'
Game.Objects = 
{
	back_pack: 
	{
		description: "back pack",
		name: "back pack",
		alias: "backpack",
		location: "on your back",
		type: "object",

		current_states: [ "closed" ],
		states: 
		{ 
			closed: "The back pack is closed.",
			open: "The back pack is open."
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				open: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: true,
			weight: 1,
			weight_limit: 40
		}
	},
	
	black_box: 
	{
		description: "black box",
		name: "black box",
		alias: "box",
		location: "on the floor",
		type: "object",

		current_states: [ "closed" ],
		states: 
		{ 
			closed: "The black box is closed.",
			open: "The black box is open."
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				open: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: true,
			weight: 1,
			weight_limit: 5
		}
	},
	
	gold50: 
	{
		description: "50 gold pieces",
		name: "gold pieces",
		alias: "gold",
		location: "in a gold pouch",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 50,
			is_container: false,
			is_movable: true,
			weight: 0,
			weight_limit: 0
		}
	},

	xusias_gold_pouch: 
	{
		description: "a gold pouch",
		name: "gold pouch",
		alias: "pouch",
		location: "xusia has it",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: true,
			weight: 0,
			weight_limit: 0
		}
	},

	red_key: 
	{
		description: "red key",
		name: "red key",
		alias: "key",
		location: "in a black box",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: false,
			is_movable: true,
			weight: 0,
			weight_limit: 0
		}
	},

	dagger: 
	{
		description: "a golden dagger",
		name: "dagger",
		alias: "knife",
		location: "in your right hand",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: false,
			is_movable: true,
			weight: 0,
			weight_limit: 0
		}
	},

	rock: 
	{
		description: "a rock",
		name: "rock",
		alias: "rock",
		location: "on the ground",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				chuck: null,
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" },
							{ "toss": "chuck" }, 
							{ "throw": "chuck" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: false,
			is_movable: true,
			weight: 0,
			weight_limit: 0
		}
	},
	
	sword: 
	{
		description: "tri-sword",
		name: "sword",
		alias: "tri sword",
		location: "in your right hand",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: false,
			is_movable: true,
			weight: 0,
			weight_limit: 0
		}
	}
};

// contains type 'fixture' (objects that can't move)
Game.Fixtures = 
{
	south_room_red_door: 
	{
		description: "red door",
		name: "red door",
		alias: "door",
		location: "to the north",
		type: "fixture",

		current_states: [ "closed", "locked" ],
		states: 
		{
			closed: "The red door is closed.",
			locked: "The red door is locked.",
			open: "The red door is open.",
			unlocked: "The red door is unlocked."
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				lock: null,
				open: null,
				unlock: null,
				enter: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: false,
			is_movable: false,
			weight: 0,
			weight_limit: 0
		}
	},
	
	north_room_red_door: 
	{
		description: "red door",
		name: "red door",
		alias: "door",
		location: "to the south",
		type: "fixture",

		current_states: [ "closed", "locked" ],
		states: 
		{
			closed: "The red door is closed.",
			locked: "The red door is locked.",
			open: "The red door is open.",
			unlocked: "The red door is unlocked."
		},
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				lock: null,
				open: null,
				unlock: null,
				enter: null
			},
			verb_aliases: [ { "inspect": "examine" } ]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: false,
			is_movable: false,
			weight: 0,
			weight_limit: 0
		}
	}
};

// game locations
Game.Locations = 
{
	south_room: 
	{
		description: "You are in a room with a red door to the north.",
		name: "The South Room",
		alias: "room",
		type: "location",
		
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" },
							{ "look": "examine" }]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: false
		}
	},
	
	north_room: 
	{
		description: "You are in a room with a red door to the south.",
		name: "The North Room",
		alias: "room",
		type: "location", 
		
		language:
		{
			articles: [ "the" ],
			verbs: 
			{
				examine: null
			},
			verb_aliases: [ { "inspect": "examine" },
							{ "look": "examine" }]
		},

		fixtures: [ ],
		objects: [ ],

		properties: 
		{ 
			quantity: 1,
			is_container: true,
			is_movable: false
		}
	}
};

Game.Players.myself = Game.Players.alana;
Game.Players.myself.alias = "myself";

// ====================================================================================================

// verb logic (players)
Game.Players.alana.language.verbs.examine = function() 
{ 
	if (ACLib.is(Game.Players.alana, "alive"))
	{
		ACLib.output(Game.Players.alana.description); 
	}
	else
	{
		ACLib.output("Alana is dead, there is nothing you can do about it."); 
		ACLib.inventory(Game.Players.alana, "The following are on her life-less body:", "She has nothing of value.");
	}
};

Game.Players.alana.language.verbs.kill = function() 
{ 
	if (ACLib.is(Game.Players.alana, "alive"))
	{
		var objSword = ACLib.findObjectByName("sword");
		if (objSword && ACLib.has(Game.Players.myself, objSword))
		{
			ACLib.output("With the slip of your sword, you killed Alana."); 
			ACLib.states(Game.Players.alana, [ "dead", "open" ], [ "alive", "closed" ]); 
			
			ACLib.output(Game.Players.myself.epilogue2); 
		}
		else
		{
			ACLib.output("You thought about it hard, but without a sword you couldn't go through with it."); 
		}
	}
	else
	{
		ACLib.output("Alana is already dead."); 
	}
};

Game.Players.alana.language.verbs.kiss = function() 
{ 
	if (ACLib.is(Game.Players.alana, "alive"))
	{
		if (Game.Players.myself === Game.Players.alana)
		{
			ACLib.output("Yeah right."); 
		}
		else if (Game.Players.myself === Game.Players.talon)
		{
			ACLib.output("You put your hands on Alana's hips and give her a long intimate kiss."); 
		}
	}
	else
	{
		ACLib.output("She is dead, that wouldn't be right."); 
	}
};

// ----------------------------------------------------------------------------------------------------

Game.Players.talon.language.verbs.examine = function() 
{ 
	ACLib.output(Game.Players.talon.description); 
};

Game.Players.talon.language.verbs.kiss = function() 
{ 
	if (Game.Players.myself === Game.Players.alana)
	{
		ACLib.output("You put your arms around Talon and give him a long intimate kiss."); 
	}
	else if (Game.Players.myself === Game.Players.talon)
	{
		ACLib.output("Yeah right."); 
	}
};

// ----------------------------------------------------------------------------------------------------

Game.Players.myself.language.verbs.inventory = function() 
{ 
	ACLib.inventory(Game.Players.myself, "You are carrying the following.");
};

// ====================================================================================================

// verb logic (npcs)
Game.NPCs.xusia.language.verbs.examine = function() 
{ 
	if (ACLib.is(Game.NPCs.xusia, "alive"))
	{
		ACLib.output("Xusia is very scary."); 
	}
	else
	{
		ACLib.output("Xusia is dead."); 
		ACLib.inventory(Game.NPCs.xusia, "The following catches your attention:", "He has nothing of value.");
	}
};

Game.NPCs.xusia.language.verbs.kill = function() 
{ 
	if (ACLib.is(Game.NPCs.xusia, "alive"))
	{
		var objSword = ACLib.findObjectByName("sword");
		if (objSword && ACLib.has(Game.Players.myself, objSword))
		{
			ACLib.output("After a long and hard-fought battle, you kill Xusia with the Tri-Sword."); 
			ACLib.states(Game.NPCs.xusia, [ "dead", "open" ], [ "alive", "closed" ]); 
			
			if (ACLib.is(Game.Players.alana, "alive"))
			{
				ACLib.output(Game.Players.myself.epilogue); 
			}
		}
		else
		{
			ACLib.output("After a long and hard-fought battle, Xusia managed to hold ground against you."); 
		}
	}
	else
	{
		ACLib.output("Xusia is already dead."); 
	}
};

Game.NPCs.xusia.language.verbs.kiss = function() 
{ 
	ACLib.output("Yuk! That's gross."); 
};

// ====================================================================================================

// verb logic (objects)
Game.Objects.back_pack.language.verbs.examine = function() 
{ 
	ACLib.output("The back pack is a typical nylon type used by most school students."); 
	if (ACLib.is(Game.Objects.back_pack, "closed"))
	{
		ACLib.output("It is closed.");
	}
	else if (ACLib.is(Game.Objects.back_pack, "open"))
	{
		ACLib.output("It is open.");
		ACLib.inventory(Game.Objects.back_pack, "It contains:", "It is empty.");
	}
};

Game.Objects.back_pack.language.verbs.close = function() 
{ 
    if (ACLib.is(Game.Objects.back_pack, "open")) 
	{
		ACLib.output("You close the back pack."); 
		ACLib.states(Game.Objects.back_pack, [ "closed" ], [ "open" ]); 
	}
	else
	{
		ACLib.output("The back pack is already closed."); 
	}
};

Game.Objects.back_pack.language.verbs.open = function() 
{ 
    if (ACLib.is(Game.Objects.back_pack, "closed")) 
	{
		ACLib.output("You open the back pack."); 
		ACLib.states(Game.Objects.back_pack, [ "open" ], [ "closed" ]); 
	}
	else
	{
		ACLib.output("The back pack is already open."); 
	}
};

// ----------------------------------------------------------------------------------------------------

Game.Objects.black_box.language.verbs.examine = function() 
{ 
	ACLib.output("The box is made of wood and painted black, it feels quite strong."); 
	if (ACLib.is(Game.Objects.black_box, "closed"))
	{
		ACLib.output("It is closed.");
	}
	else if (ACLib.is(Game.Objects.black_box, "open"))
	{
		ACLib.output("It is open.");
		ACLib.inventory(Game.Objects.black_box, "It contains:", "It is empty.");
	}
};

Game.Objects.black_box.language.verbs.close = function() 
{ 
    if (ACLib.is(Game.Objects.black_box, "open")) 
	{
		ACLib.output("You close the black box."); 
		ACLib.states(Game.Objects.black_box, [ "closed" ], [ "open" ]); 
	}
	else
	{
		ACLib.output("The black box is already closed."); 
	}
};

Game.Objects.black_box.language.verbs.open = function() 
{ 
    if (ACLib.is(Game.Objects.black_box, "closed")) 
	{
		ACLib.output("You open the black box."); 
		ACLib.states(Game.Objects.black_box, [ "open" ], [ "closed" ]); 
	}
	else
	{
		ACLib.output("The black box is already open."); 
	}
};

// ----------------------------------------------------------------------------------------------------

Game.Objects.gold50.language.verbs.examine = function() 
{ 
	if (ACLib.is(Game.NPCs.xusia, "alive"))
	{
		ACLib.output("You cannot get close enough to examine it fully.");
	}
	else
	{
		if (ACLib.is(Game.Players.alana, "alive"))
		{
			ACLib.output("Oooh, nice and shiny.  Now you can afford a fantastic honeymoon!");
		}
		else
		{
			ACLib.output("Oooh, nice and shiny.  If Alana was alive, you could have had a fantastic honeymoon!");
		}
	}
};

// ----------------------------------------------------------------------------------------------------

Game.Objects.xusias_gold_pouch.language.verbs.examine = function() 
{ 
	if (ACLib.is(Game.NPCs.xusia, "alive"))
	{
		ACLib.output("You cannot get close enough to examine it fully.");
	}
	else
	{
		ACLib.output("The pouch is very old and worn.");
		ACLib.inventory(Game.Objects.xusias_gold_pouch, "It contains:", "It is empty.");
	}
};

// ----------------------------------------------------------------------------------------------------

Game.Objects.red_key.language.verbs.examine = function() 
{ 
	ACLib.output("The key is bright red like the ripe tomatoes your grandmother used to grow.");
};

// ----------------------------------------------------------------------------------------------------

Game.Objects.dagger.language.verbs.examine = function() 
{ 
    ACLib.output("The golden dagger is beautifully crafted with intricate engravings along the blade.");
};

// ----------------------------------------------------------------------------------------------------

Game.Objects.rock.language.verbs.chuck = function(strPreposition_a, objTarget_a) 
{ 
	if (objTarget_a === Game.NPCs.xusia)
	{
		ACLib.output("You throw the rock at Xusia, he makes a loud roar but that is all. The rock falls to the ground.");
	}
	else
	{
		ACLib.output("You throw the rock at " + htmlEncode(objTarget_a.name) + " and it falls to the ground.");
	}
	
	ACLib.assign(ACLib.playerLocation(ACLib.properties.game.Players.myself), Game.Objects.rock);
};

Game.Objects.rock.language.verbs.examine = function() 
{ 
    ACLib.output("The rock is about the size of a large apple with sharp edges.");
};

// ----------------------------------------------------------------------------------------------------

Game.Objects.sword.language.verbs.examine = function() 
{ 
    ACLib.output("The Tri-Sword gleams with three sharp blades and feels perfectly balanced in your hand.");
};

// ====================================================================================================

// verb logic (fixed objects)
Game.Fixtures.south_room_red_door.language.verbs.examine = function() 
{ 
	ACLib.output("The door is red."); 
	if (ACLib.is(Game.Fixtures.south_room_red_door, "closed"))
	{
		ACLib.output("It is closed.");
	}
	else if (ACLib.is(Game.Fixtures.south_room_red_door, "open"))
	{
		ACLib.output("It is open.");
	}
};

Game.Fixtures.south_room_red_door.language.verbs.close = function() 
{ 
	if (ACLib.is(Game.Fixtures.south_room_red_door, "open"))
	{
		ACLib.output("You close the door."); 
		ACLib.states(Game.Fixtures.north_room_red_door, [ "closed" ], [ "open" ]); 
		ACLib.states(Game.Fixtures.south_room_red_door, [ "closed" ], [ "open" ]); 
	}
	else
	{
		ACLib.output("The door is already closed."); 
	}
};

Game.Fixtures.south_room_red_door.language.verbs.lock = function() 
{ 
    var objKey = ACLib.findObjectByName("red key");
    if (objKey && ACLib.has(Game.Players.myself, objKey))
    {
        ACLib.output("You lock the door."); 
        ACLib.states(Game.Fixtures.north_room_red_door, [ "locked" ], [ "unlocked" ]); 
        ACLib.states(Game.Fixtures.south_room_red_door, [ "locked" ], [ "unlocked" ]); 
    }
    else
    {
        ACLib.output("You don't have the key to this door.");
    }
};

Game.Fixtures.south_room_red_door.language.verbs.open = function() 
{ 
    if (ACLib.is(Game.Fixtures.south_room_red_door, "locked"))
    {
        ACLib.output("The door is locked.");
    }
    else
    {
		if (ACLib.is(Game.Fixtures.south_room_red_door, "closed"))
		{
			ACLib.output("You open the door."); 
			ACLib.states(Game.Fixtures.north_room_red_door, [ "open" ], [ "closed" ]); 
			ACLib.states(Game.Fixtures.south_room_red_door, [ "open" ], [ "closed" ]); 
		}
		else
		{
			ACLib.output("The door is already open."); 
		}
    }
};

Game.Fixtures.south_room_red_door.language.verbs.unlock = function() 
{ 
    var objKey = ACLib.findObjectByName("red key");
    if (objKey && ACLib.has(Game.Players.myself, objKey))
    {
        ACLib.output("You unlock the door."); 
        ACLib.states(Game.Fixtures.north_room_red_door, [ "unlocked" ], [ "locked" ]); 
        ACLib.states(Game.Fixtures.south_room_red_door, [ "unlocked" ], [ "locked" ]); 
    }
    else
    {
        ACLib.output("You don't have the key to this door.");
    }
};

Game.Fixtures.south_room_red_door.language.verbs.enter = function() 
{ 
    if (ACLib.is(Game.Fixtures.south_room_red_door, "open")) 
    {
        ACLib.output("You enter the red door."); 
        ACLib.assign(Game.Locations.north_room, Game.Players.myself);
    }
    else if (ACLib.is(Game.Fixtures.south_room_red_door, "locked"))
    {
        ACLib.output("The door is locked.");
    }
    else 
    {
        ACLib.output("The door is closed.");
    }
};

// ----------------------------------------------------------------------------------------------------

Game.Fixtures.north_room_red_door.language.verbs.examine = function() 
{ 
	ACLib.output("The door is red."); 
	if (ACLib.is(Game.Fixtures.north_room_red_door, "closed"))
	{
		ACLib.output("It is closed.");
	}
	else if (ACLib.is(Game.Fixtures.north_room_red_door, "open"))
	{
		ACLib.output("It is open.");
	}
};

Game.Fixtures.north_room_red_door.language.verbs.close = function() 
{ 
	if (ACLib.is(Game.Fixtures.north_room_red_door, "open"))
	{
		ACLib.output("You close the door."); 
		ACLib.states(Game.Fixtures.north_room_red_door, [ "closed" ], [ "open" ]); 
		ACLib.states(Game.Fixtures.south_room_red_door, [ "closed" ], [ "open" ]); 
	}
	else
	{
		ACLib.output("The door is already closed."); 
	}
};

Game.Fixtures.north_room_red_door.language.verbs.lock = function() 
{ 
    var objKey = ACLib.findObjectByName("red key");
    if (objKey && ACLib.has(Game.Players.myself, objKey))
    {
        ACLib.output("You lock the door."); 
        ACLib.states(Game.Fixtures.north_room_red_door, [ "locked" ], [ "unlocked" ]); 
        ACLib.states(Game.Fixtures.south_room_red_door, [ "locked" ], [ "unlocked" ]); 
    }
    else
    {
        ACLib.output("You don't have the key to this door.");
    }
};

Game.Fixtures.north_room_red_door.language.verbs.open = function() 
{ 
    if (ACLib.is(Game.Fixtures.north_room_red_door, "locked"))
    {
        ACLib.output("The door is locked.");
    }
    else
    {
		if (ACLib.is(Game.Fixtures.north_room_red_door, "closed"))
		{
			ACLib.output("You open the door."); 
			ACLib.states(Game.Fixtures.north_room_red_door, [ "open" ], [ "closed" ]); 
			ACLib.states(Game.Fixtures.south_room_red_door, [ "open" ], [ "closed" ]); 
		}
		else
		{
			ACLib.output("The door is already open."); 
		}
    }
};

Game.Fixtures.north_room_red_door.language.verbs.unlock = function() 
{ 
    var objKey = ACLib.findObjectByName("red key");
    if (objKey && ACLib.has(Game.Players.myself, objKey))
    {
        ACLib.output("You unlock the door."); 
        ACLib.states(Game.Fixtures.north_room_red_door, [ "unlocked" ], [ "locked" ]); 
        ACLib.states(Game.Fixtures.south_room_red_door, [ "unlocked" ], [ "locked" ]); 
    }
    else
    {
        ACLib.output("You don't have the key to this door.");
    }
};

Game.Fixtures.north_room_red_door.language.verbs.enter = function() 
{ 
    if (ACLib.is(Game.Fixtures.north_room_red_door, "open")) 
    {
        ACLib.output("You enter the red door."); 
        ACLib.assign(Game.Locations.south_room, Game.Players.myself);
    }
    else if (ACLib.is(Game.Fixtures.north_room_red_door, "locked"))
    {
        ACLib.output("The door is locked.");
    }
    else 
    {
        ACLib.output("The door is closed.");
    }
};

// ====================================================================================================

Game.Locations.south_room.language.verbs.examine = function() 
{ 
	ACLib.output(Game.Locations.south_room.description); 
	ACLib.inventory(Game.Locations.south_room, "You can see:", "It is empty.");
};

Game.Locations.north_room.language.verbs.examine = function() 
{ 
	ACLib.output(Game.Locations.north_room.description); 
	ACLib.inventory(Game.Locations.north_room, "You can see:", "It is empty.");
};

// ====================================================================================================

Game.Initialise = function()
{
	ACLib.output("Initialising."); 
	
	// initialise locations of objects on players
	ACLib.assign(Game.Players.alana, Game.Objects.back_pack, true);
	ACLib.assign(Game.Players.alana, Game.Objects.dagger, true);

	// initialise locations of objects on npcs
	ACLib.assign(Game.NPCs.xusia, Game.Objects.xusias_gold_pouch, true);
	
	// initialise locations of objects within objects
	ACLib.assign(Game.Objects.back_pack, Game.Objects.rock, true);
	ACLib.assign(Game.Objects.black_box, Game.Objects.red_key, true);
	ACLib.assign(Game.Objects.xusias_gold_pouch, Game.Objects.gold50, true);
	
	// initialise locations of fixtures & objects within locations - south room
	ACLib.fixture(Game.Locations.south_room, Game.Fixtures.south_room_red_door);
	ACLib.assign(Game.Locations.south_room, Game.Objects.black_box, true);
	ACLib.assign(Game.Locations.south_room, Game.Objects.sword, true);
	ACLib.assign(Game.Locations.south_room, Game.Players.talon, true);
	
	// initialise locations of fixtures & objects within locations - north room
	ACLib.fixture(Game.Locations.north_room, Game.Fixtures.north_room_red_door);
	ACLib.assign(Game.Locations.north_room, Game.Players.alana, true);
	ACLib.assign(Game.Locations.north_room, Game.NPCs.xusia, true);
		
	ACLib.output("Ready."); 

	ACLib.output(Game.Overview); 
	ACLib.output("You are " + Game.Players.myself.name + ".");
	ACLib.output(Game.Players.myself.prologue); 
	Game.Players.myself.prologue = "";
};
