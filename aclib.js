// Adventure Creator

// Sample adventure:
//
// 		2 rooms with a door between them.
//
// 		One room is where the player starts with a sword and a backpack. On the floor is a box, 
//		inside the box is a key.
//
// 		The other room contains a sorcerer, the sorcerer is holding 50 gold pieces which can only 
//		be obtained if you kill the sorcerer.

// to do:
//
// 		verify code ACBLib.assign
// 		verify code ACBLib.has
// 		verify code ACBLib.is
// 		verify code ACBLib.states
//		incorporate the command line to enter commands
//		splitting and joining of objects of same type to allow qty > 1
//		some inbuilt verbs, inventory, examine? go? take, pickup, drop
//		a way to check current state
//		change inline ACLib.output statements to assign to a LastError property and return false and be silent
//		
//		
function ACLib() {}

ACLib.properties =
{
	element: "#game",
	game: null
};

ACLib.output = function(str_a)
{
	var str = '<div>' + str_a + '</div><br />';
	$(ACLib.properties.element).append(str);
};

// obj1_a could be a Player, NPC, Object, Fixture, location
// obj2_a could be a Player, NPC, Object, Fixture (unlikely), location (unlikely)
// eg: a player could pickup an NPC but they could also pickup a sword

// traverse Game.Players to find obj2_a if not yet found
// traverse Game.NPCs to find obj2_a if not yet found
// traverse Game.Objects to find obj2_a if not yet found
// traverse Game.Fixtures to find obj2_a if not yet found
// traverse Game.Locations to find obj2_a if not yet found
// if found the obj2_a, then add it to the inventory of obj1_a but remove it from where it was previously found
ACLib.assign = function(obj1_a, obj2_a)
{
	// Check if obj2_a is already in obj1_a's inventory
	if (obj1_a.objects.includes(obj2_a)) 
	{
		ACLib.output(obj2_a.name + " is already in " + obj1_a.name + "'s inventory.");
		return;
	}

	// Traverse Game objects to find obj2_a
	var blnFound = false;
	var objContainer = null;
	
	for (var objkey in Game) 
	{
		if (Game.hasOwnProperty(objkey)) 
		{
			var obj = Game[objkey];
			if (obj.objects.includes(obj2_a) || obj.fixtures.includes(obj2_a)) 
			{
				objContainer = obj;
				blnFound = true;
				break;
			} 
			else if (obj.objects.includes(obj1_a) || obj.fixtures.includes(obj1_a)) 
			{
				objContainer = obj1_a;
			}
		}
	}

	if (!blnFound) 
	{
		ACLib.output(obj2_a.name + " is not in the game world.");
		return;
	}

	// Remove obj2_a from its current container
	if (objContainer.objects.includes(obj2_a)) 
	{
		objContainer.objects.splice(objContainer.objects.indexOf(obj2_a), 1);
	} 
	else if (objContainer.fixtures.includes(obj2_a)) 
	{
		objContainer.fixtures.splice(objContainer.fixtures.indexOf(obj2_a), 1);
	}

	// Add obj2_a to obj1_a's inventory
	obj1_a.objects.push(obj2_a);

	// Update obj2_a's location
	obj2_a.location = "in " + obj1_a.name;
};

ACLib.fixture = function(objContainer_a, obj_a)
{
	// Fixtures should be only in one location (I guess it could be a magical one in multiple locations).
	// Since fixtures don't move, no need to traverse existing containers.
	
	objContainer_a.fixtures.push(obj_a);
};

// tests if obj1_a has obj_2
ACLib.has = function(obj1_a, obj2_a) 
{
	var blnFound = false;

	// Check if obj2_a is in the `objects` array of obj1_a
	if (obj1_a.objects.includes(obj2_a)) 
	{
		blnFound = true;
	}

	// If obj2_a was not found in the `objects` array, check if it's in the `fixtures` array of obj1_a
	if (!blnFound) 
	{
		for (var intI = 0; intI < obj1_a.fixtures.length; intI++) 
		{
			if (obj1_a.fixtures[intI].objects.includes(obj2_a)) 
			{
				blnFound = true;
				break;
			}
		}
	}

	return blnFound;
};

// outputs the current inventory (objects & fixtures) of the provided object
ACLib.inventory = function(obj_a) 
{
	var intI = 0;
	var intJ = 0;
	var objInventory = [];
	var obj;

	// Loop through all objects in the provided object's `objects` array
	for (intI = 0; intI < obj_a.objects.length; intI++) 
	{
		obj = obj_a.objects[intI];
		
		if (!obj.location) 
		{
			objInventory.push(obj.name);
		}
	}

	// Loop through all fixtures in the provided object's `fixtures` array
	for (intI = 0; intI < obj_a.fixtures.length; intI++) 
	{
		// Check if the fixture contains any objects that are currently in the inventory
		var objFixture = obj_a.fixtures[intI];
		
		for (intJ = 0; intJ < objFixture.objects.length; intJ++) 
		{
			obj = objFixture.objects[intJ];
			
			if (!obj.location) 
			{
				objInventory.push(obj.name + " (inside " + objFixture.name + ")");
			}
		}
	}


	// Output the final inventory list
	if (objInventory.length > 0) 
	{
		ACLib.output("You are carrying:");
		for (intI = 0; intI < objInventory.length; intI++) 
		{
			ACLib.output("- " + objInventory[intI]);
		}
	} 
	else 
	{
		ACLib.output("You are not carrying anything.");
	}
};

// tests if object has provided state
ACLib.is = function(obj_a, strState_a)
{
    // Check if the state exists in the object's current_states array
    if (obj_a.current_states.includes(strState_a)) 
	{
        return true;
    } 
	else 
	{
        return false;
    }
};

// for changing states
ACLib.states = function(obj_a, arrAdd_a, arrRemove_a)
{
    // Add new states
    if (Array.isArray(arrAdd_a)) 
	{
        arrAdd_a.forEach(function(strState) 
		{
            if (!obj_a.current_states.includes(strState)) 
			{
                obj_a.current_states.push(strState);
                ACLib.output(obj_a.name + " is now " + strState);
            }
        });
    }
  
    // Remove states
    if (Array.isArray(arrRemove_a)) 
	{
        arrRemove_a.forEach(function(strState) 
		{
            var intIndex = obj_a.current_states.indexOf(strState);
            if (intIndex >= 0) 
			{
                obj_a.current_states.splice(intIndex, 1);
                ACLib.output(obj_a.name + " is no longer " + strState);
            }
        });
    }
};

ACLib.Play = function(obj_a)
{
	ACLib.properties.game = obj_a;
};

function Game() {}

// contains type 'player'
Game.Players = 
{
	talon: 
	{
		description: "Very hansome if I do say so myself",
		name: "Talon",
		location: "in a room",
		type: "player",

		current_states: [ "alive" ],
		states: 
		{ 
			alive: "You are alive.",
			dead: "You are dead.",
			undead: "You are undead."
		},
		language:
		{
			articles: [ "myself" ],
			verbs: 
			{ 
				examine: null,
				inventory: null
			}
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
		description: "The sorcerer Xusia of Delos",
		name: "Xuxia",
		location: "in a room",
		type: "npc",

		current_states: [ "alive" ],
		states: 
		{ 
			alive: "Xusia is alive.",
			dead: "Xusia is dead.",
		},
		language:
		{
			articles: [ "the", "xusia" ],
			verbs: 
			{ 
				examine: null,
				kill: null,
			}
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
		location: "on your back",
		type: "object",

		current_states: [ "closed" ],
		states: 
		{ 
			closed: "The back pack is closed.",
			open: "The back pack is open.",
		},
		language:
		{
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				open: null
			}
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
		location: "on the floor",
		type: "object",

		current_states: [ "closed" ],
		states: 
		{ 
			closed: "The black box is closed.",
			open: "The black box is open.",
		},
		language:
		{
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				open: null
			}
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
		name: "gold",
		location: "in a gold pouch",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null
			}
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
		location: "xusia has it",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null
			}
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
		location: "in a black box",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null
			}
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
		location: "in your right hand",
		type: "object",

		current_states: [ ],
		states: 
		{ 
		},
		language:
		{
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null
			}
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
		location: "to the north",
		type: "object",

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
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				lock: null,
				open: null,
				unlock: null,
				enter: null
			}
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
		location: "to the south",
		type: "object",

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
			articles: [ "a", "the" ],
			verbs: 
			{
				examine: null,
				close: null,
				lock: null,
				open: null,
				unlock: null,
				enter: null
			}
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
		fixtures: [ ],
		objects: [ ]
	},
	
	north_room: 
	{
		description: "You are in a room with a red door to the south.",
		name: "The North Room",
		fixtures: [ ],
		objects: [ ]
	}
};

// verb logic (players)
Game.Players.talon.language.verbs.examine = function() 
{ 
	ACLib.output("Handsome, just like your mother always says."); 
};

Game.Players.talon.language.verbs.inventory = function() 
{ 
	ACLib.output("You are carrying the following.");
	// TODO: show inventory
};

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
	}
};

Game.NPCs.xusia.language.verbs.kill = function() 
{ 
	if (ACLib.is(Game.NPCs.xusia, "alive"))
	{
		ACLib.output("After a long and hard-fought battle, you kill Xusia with your tri-sword."); 
		ACLib.states(Game.Objects.back_pack, [ "dead" ], [ "alive" ]); 
	}
	else
	{
		ACLib.output("After a long and hard-fought battle, Xusia managed to hold ground against you."); 
	}
};

// verb logic (objects)
Game.Objects.back_pack.language.verbs.examine = function() 
{ 
	ACLib.output("The back pack is a typical nylon type used by mose school students."); 
};

Game.Objects.back_pack.language.verbs.close = function() 
{ 
	ACLib.output("You close the back pack."); 
	ACLib.states(Game.Objects.back_pack, [ "closed" ], [ "open" ]); 
};

Game.Objects.back_pack.language.verbs.open = function() 
{ 
	ACLib.output("You open the back pack."); 
	ACLib.states(Game.Objects.back_pack, [ "open" ], [ "closed" ]); 
};

Game.Objects.black_box.language.verbs.examine = function() 
{ 
	ACLib.output("The box is made of wood and painted black, it feels quite strong."); 
};

Game.Objects.black_box.language.verbs.close = function() 
{ 
	ACLib.output("You close the black box."); 
	ACLib.states(black_box, [ "closed" ], [ "open" ]); 
};

Game.Objects.black_box.language.verbs.open = function() 
{ 
	ACLib.output("You open the black box."); 
	ACLib.states(black_box, [ "open" ], [ "closed" ]); 
};

Game.Objects.gold50.language.verbs.examine = function() 
{ 
	ACLib.output("Oooh, nice and shiney.");
};

Game.Objects.xusias_gold_pouch.language.verbs.examine = function() 
{ 
	ACLib.output("The pouch is very old and worn.");
};

Game.Objects.red_key.language.verbs.examine = function() 
{ 
	ACLib.output("The key is bright red like the ripe tomatoes your grandmother used to grow.");
};

// verb logic (fixed objects)
Game.Fixtures.south_room_red_door.language.verbs.examine = function() 
{ 
	ACLib.output("The door is red."); 
};

Game.Fixtures.south_room_red_door.language.verbs.close = function() 
{ 
	ACLib.output("You close the red door."); 
	ACLib.states(south_room_red_door, [ "closed" ], [ "open" ]); 
};

Game.Fixtures.south_room_red_door.language.verbs.lock = function() 
{ 
	ACLib.output("You make sure the red door is closed properly and lock it."); 
	ACLib.states(south_room_red_door, [ "locked" ], [ "closed", "unlocked" ]); 
};

Game.Fixtures.south_room_red_door.language.verbs.open = function() 
{ 
	ACLib.output("You open the red door."); 
	ACLib.states(south_room_red_door, [ "open" ], [ "closed" ]); 
};

Game.Fixtures.south_room_red_door.language.verbs.unlock = function() 
{ 
	ACLib.output("You unlock the red door."); 
	ACLib.states(south_room_red_door, [ "unlocked" ], [ "locked" ]); 
};

Game.Fixtures.south_room_red_door.language.verbs.enter = function() 
{ 
	ACLib.output("You enter the red door."); 
	// TODO: change locations to the north room
};

Game.Fixtures.north_room_red_door.language.verbs.examine = function() 
{ 
	ACLib.output("The door is red."); 
};

Game.Fixtures.north_room_red_door.language.verbs.close = function() 
{ 
	ACLib.output("You close the red door."); 
	ACLib.states(north_room_red_door, [ "closed" ], [ "open" ]); 
};

Game.Fixtures.north_room_red_door.language.verbs.lock = function() 
{ 
	ACLib.output("You make sure the red door is closed properly and lock it."); 
	ACLib.states(north_room_red_door, [ "locked" ], [ "closed", "unlocked" ]); 
};

Game.Fixtures.north_room_red_door.language.verbs.open = function() 
{ 
	ACLib.output("You open the red door."); 
	ACLib.states(north_room_red_door, [ "open" ], [ "closed" ]); 
};

Game.Fixtures.north_room_red_door.language.verbs.unlock = function() 
{ 
	ACLib.output("You unlock the red door."); 
	ACLib.states(north_room_red_door, [ "unlocked" ], [ "locked" ]); 
};

Game.Fixtures.north_room_red_door.language.verbs.enter = function() 
{ 
	ACLib.output("You enter the red door."); 
	// TODO: change locations to the south room
};

Game.Initialise = function()
{
	ACLib.output("Initialising."); 
	
	// initialise locations of objects on players
	ACLib.assign(Game.Players.talon, Game.Objects.back_pack);
	ACLib.assign(Game.Players.talon, Game.Objects.sword);

	// initialise locations of objects on npcs
	ACLib.assign(Game.NPCs.xusia, Game.Objects.xusias_gold_pouch);
	
	// initialise locations of objects within objects
	ACLib.assign(Game.Objects.black_box, Game.Objects.red_key);
	ACLib.assign(Game.Objects.xusias_gold_pouch, Game.Objects.gold50);
	
	// initialise locations of fixtures & objects within locations - south room
	ACLib.fixture(Game.Locations.south_room, Game.Fixtures.south_room_red_door);
	ACLib.assign(Game.Locations.south_room, Game.Objects.black_box);
	ACLib.assign(Game.Locations.south_room, Game.Players.talon);
	
	// initialise locations of fixtures & objects within locations - north room
	ACLib.fixture(Game.Locations.north_room, Game.Fixtures.north_room_red_door);
	ACLib.assign(Game.Locations.north_room, Game.NPCs.xusia);
		
	ACLib.output("Ready."); 
};

// game starts here
Game.Initialise();
ACLib.Play(Game);
