// PotentJS Adventure Creation Framework v20250708
// (c) 2025 Cyborg Unicorn Pty Ltd.
// This software is released under MIT License.

// future:
//
//		prevent container A from being put into container B into Container A
//		implement splitting and joining countable items (like 50 gold pieces)
//		implement support for the quantity, weight and weight_limit
//		implement battling
//		implement images
//		
function ACLib() 
{
	var m_objThis = this;

	this.properties =
	{
		inputElement: "",
		outputElement: "",
		cli: null,
		game: null
	};

	this.cls = function()
	{
		$(m_objThis.properties.outputElement).html("");
	};

	this.output = function(var_a, blnBR_a, blnEscape_a)
	{
		var blnBR = blnBR_a;
		if (blnBR === undefined) { blnBR = true; }
		
		var blnEscape = blnEscape_a;
		if (blnEscape === undefined) { blnEscape = true; }
		
		var str = "";
		
		if (Array.isArray(var_a))
		{
			var_a.forEach(function(str_a) 
			{
				str = str_a;
				if (blnEscape)
				{
					str = htmlEncode(str);
				}
				str = '<div>' + str + '</div>';
				if (blnBR)
				{
					str += '<br />';
				}
				$(m_objThis.properties.outputElement).append(str);
			});
		}
		else
		{
			str = var_a;
			if (blnEscape)
			{
				str = htmlEncode(str);
			}
			str = '<div>' + str + '</div>';
			if (blnBR)
			{
				str += '<br />';
			}
			$(m_objThis.properties.outputElement).append(str);
		}
	};

	// obj1_a could be a Player, NPC, Object, Fixture, location
	// obj2_a could be a Player, NPC, Object, Fixture (unlikely), location (unlikely)
	// eg: a player could pickup an NPC but they could also pickup a sword

	// traverse Game.Players to find obj2_a
	// if not yet found traverse Game.NPCs to find obj2_a
	// if not yet found traverse Game.Objects to find obj2_a if not yet found
	// if not yet found traverse Game.Fixtures to find obj2_a
	// if not yet found traverse Game.Locations to find obj2_a
	// if found the obj2_a, then add it to the inventory of obj1_a but remove it from where it was previously found
	this.assign = function(obj1_a, obj2_a, blnInitialise_a)
	{
		var blnInitialise = blnInitialise_a;
		if (blnInitialise === undefined) 
		{
			blnInitialise = false;
		}
		
		var objGame = m_objThis.properties.game;
		
		if (obj1_a === obj2_a)
		{
			m_objThis.output("You cannot put an item into itself.");
			return false;
		}

		// Check if obj2_a is already in obj1_a's inventory
		if (obj1_a.objects.includes(obj2_a)) 
		{
			m_objThis.output(obj2_a.name + " is already in " + obj1_a.name + "'s inventory.");
			return false;
		}

		// Traverse Game objects to find obj2_a
		var blnFound = false;
		var objContainer = null;

		// Define the collections that can contain objects
		var arrCollections = [objGame.Players, objGame.NPCs, objGame.Objects, objGame.Locations, objGame.Fixtures];

		for (var intI = 0; intI < arrCollections.length && !blnFound; intI++) 
		{
			var objCollection = arrCollections[intI];
			for (var strKey in objCollection) 
			{
				if (objCollection.hasOwnProperty(strKey)) 
				{
					var obj = objCollection[strKey];
					if (obj.objects && obj.objects.includes(obj2_a)) 
					{
						objContainer = obj;
						blnFound = true;
						break;
					} 
					else if (obj.fixtures && obj.fixtures.includes(obj2_a)) 
					{
						objContainer = obj;
						blnFound = true;
						break;
					}
					// are these required?
					// else if (obj.objects && obj.objects.includes(obj1_a)) 
					// {
						// objContainer = obj1_a;
					// }
					// else if (obj.fixtures && obj.fixtures.includes(obj1_a)) 
					// {
						// objContainer = obj1_a;
					// }
				}
			}
		}

		if (!blnInitialise && !blnFound)
		{
			m_objThis.output(obj2_a.name + " is not in a game world container.");
			return false;
		}

		if (objContainer !== null)
		{
			// Remove obj2_a from its current container
			if (objContainer.objects.includes(obj2_a)) 
			{
				objContainer.objects.splice(objContainer.objects.indexOf(obj2_a), 1);
			} 
			else if (objContainer.fixtures.includes(obj2_a)) 
			{
				objContainer.fixtures.splice(objContainer.fixtures.indexOf(obj2_a), 1);
			}
		}

		// Add obj2_a to obj1_a's inventory
		obj1_a.objects.push(obj2_a);

		// Update obj2_a's location
		obj2_a.location = "in " + obj1_a.name;
		
		return true;
	};

	this.findNPCByName = function(strNPCName_a) 
	{
		var objFound = null;
		var objGame = m_objThis.properties.game;
		var strNPCName = strNPCName_a.trim();

		if (strNPCName) 
		{
			for (var strNPCKey in objGame.NPCs) 
			{
				var objNPC = objGame.NPCs[strNPCKey]; 
				if ((objNPC.name.toLowerCase() === strNPCName.toLowerCase()) ||
					(objNPC.alias.toLowerCase() === strNPCName.toLowerCase()))
				{
					objFound = objNPC;
				}
			}
		}

		return objFound;
	};

	this.findObjectByName = function(strObjectName_a) 
	{
		var intI;
		var objFound = null;
		var objGame = m_objThis.properties.game;
		var strObjectName = strObjectName_a.trim();
		var objPlayer = m_objThis.properties.game.Players.myself;

		if (strObjectName) 
		{
			// Helper function to check if object name matches
			function matchesName(objItem, strSearchName_a) 
			{
				var strSearchName = strSearchName_a.toLowerCase();
				var intI;
				var blnMatches = false;

				if (objItem.language && objItem.language.articles) 
				{
					// Check each article combination
					for (intI = 0; intI < objItem.language.articles.length && !blnMatches; intI++) 
					{
						var strArticle = objItem.language.articles[intI];
						var strFullName = strArticle + ' ' + objItem.name.toLowerCase();
						var strFullAlias = strArticle + ' ' + objItem.alias.toLowerCase();
						if (strFullName === strSearchName || strFullAlias === strSearchName || objItem.name.toLowerCase() === strSearchName || objItem.alias.toLowerCase() === strSearchName)
						{
							blnMatches = true;
						}
					}
				}

				if (!blnMatches) 
				{
					blnMatches = objItem.name.toLowerCase() === strSearchName || objItem.alias.toLowerCase() === strSearchName;
				}

				return blnMatches;
			}

			function searchInContainer(objContainer_a, strSearchName_a) 
			{
				var objResult = null;
				
				// Check direct objects in this container
				for (var intJ = 0; intJ < objContainer_a.objects.length && !objResult; intJ++) 
				{
					var obj = objContainer_a.objects[intJ];
					
					if (matchesName(obj, strSearchName_a)) 
					{
						objResult = obj;
					}
					else if (obj.properties.is_container && obj.objects.length > 0) 
					{
						// If this object is a container, search inside it recursively
						objResult = searchInContainer(obj, strSearchName_a);
					}
				}
				
				return objResult;
			}

			// Check player's inventory
			for (intI = 0; intI < objPlayer.objects.length && !objFound; intI++) 
			{
				if (matchesName(objPlayer.objects[intI], strObjectName)) 
				{
					objFound = objPlayer.objects[intI];
				}
				else if (objPlayer.objects[intI].properties.is_container && objPlayer.objects[intI].objects.length > 0)
				{
					objFound = searchInContainer(objPlayer.objects[intI], strObjectName);
				}
			}

			// Find current location
			var objCurrentLocation = m_objThis.playerLocation(objPlayer);

			// Check current location objects
			if (!objFound && objCurrentLocation) 
			{
				for (intI = 0; intI < objCurrentLocation.objects.length && !objFound; intI++) 
				{
					if (matchesName(objCurrentLocation.objects[intI], strObjectName)) 
					{
						objFound = objCurrentLocation.objects[intI];
					}
				}

				// Check current location fixtures
				if (!objFound) 
				{
					for (intI = 0; intI < objCurrentLocation.fixtures.length && !objFound; intI++) 
					{
						if (matchesName(objCurrentLocation.fixtures[intI], strObjectName)) 
						{
							objFound = objCurrentLocation.fixtures[intI];
						}
					}
				}
			}

			// Check NPCs in current location
			if (!objFound && objCurrentLocation) 
			{
				for (var strNPCKey in objGame.NPCs) 
				{
					if (objGame.NPCs.hasOwnProperty(strNPCKey) && !objFound) 
					{
						var objNPC = objGame.NPCs[strNPCKey];
						if (objCurrentLocation.objects.indexOf(objNPC) !== -1) 
						{
							if (matchesName(objNPC, strObjectName)) 
							{
								objFound = objNPC;
							}
						}
					}
				}
			}

			// Check if looking for the current location itself
			if (!objFound && objCurrentLocation) 
			{
				if (matchesName(objCurrentLocation, strObjectName)) 
				{
					objFound = objCurrentLocation;
				}
			}
		}

		return objFound;
	};

	this.findPlayerByName = function(strPlayerName_a) 
	{
		var objFound = null;
		var objGame = m_objThis.properties.game;
		var strPlayerName = strPlayerName_a.trim();

		if (strPlayerName) 
		{
			for (var strPlayerKey in objGame.Players) 
			{
				var objPlayer = objGame.Players[strPlayerKey]; 
				if ((objPlayer.name.toLowerCase() === strPlayerName.toLowerCase()) ||
					(objPlayer.alias.toLowerCase() === strPlayerName.toLowerCase()))
				{
					objFound = objPlayer;
				}
			}
		}

		return objFound;
	};

	this.fixture = function(objContainer_a, obj_a)
	{
		// Fixtures should be only in one location (I guess it could be a magical one in multiple locations).
		// Since fixtures don't move, no need to traverse existing containers.
		
		objContainer_a.fixtures.push(obj_a);
	};

	// tests if obj1_a has obj_2
	this.has = function(obj1_a, obj2_a) 
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
	this.inventory = function(obj_a, strContained_a, strEmpty_a)
	{
		var strContained = strContained_a;
		if (strContained === undefined) { strContained = "You are carrying:"; }
		
		var strEmpty = strEmpty_a;
		if (strEmpty === undefined) { strEmpty = "You are not carrying anything."; }
		
		var intI = 0;
		var intJ = 0;
		var objInventory = [];
		var obj;

		function addObjectRecursively(obj_a, strPrefix_a, blnLast_a) 
		{
			var strConnector = blnLast_a ? "└─&nbsp;" : "├─&nbsp;";
			var strNextPrefix = strPrefix_a + (blnLast_a ? "&nbsp;&nbsp;&nbsp;" : "│&nbsp;&nbsp;");
			
			objInventory.push(strPrefix_a + strConnector + obj_a.name);
			
			// If this object is a container, recursively add its contents
			// BUT only if the container is open (or doesn't have open/closed states)
			if (obj_a.properties.is_container && obj_a.objects.length > 0)
			{
				var blnCanSeeInside = true;
				
				// Check if this container has open/closed states
				if (obj_a.current_states && (obj_a.current_states.includes("open") || obj_a.current_states.includes("closed")))
				{
					// Only show contents if it's open - use direct state check instead of m_objThis.objACLib.is()
					blnCanSeeInside = !obj_a.current_states.includes("closed");
				}
				
				if (blnCanSeeInside)
				{
					for (var intK = 0; intK < obj_a.objects.length; intK++)
					{
						var blnLastChild = (intK === obj_a.objects.length - 1);
						addObjectRecursively(obj_a.objects[intK], strNextPrefix, blnLastChild);
					}
				}
			}
		}

		// Loop through all objects in the provided object's `objects` array
		for (intI = 0; intI < obj_a.objects.length; intI++) 
		{
			obj = obj_a.objects[intI];
			
			if (obj_a === m_objThis.properties.game.Players.myself) 
			{
				// I'm checking MY OWN inventory - show everything recursively
				var isLastObject = (intI === obj_a.objects.length - 1);
				addObjectRecursively(obj, "", isLastObject);
			}
			else 
			{
				// I'm checking SOMEONE ELSE'S inventory (like a room) - exclude myself
				if (obj !== m_objThis.properties.game.Players.myself)
				{
					objInventory.push(obj.name);
				}
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
			m_objThis.output(strContained);
			for (intI = 0; intI < objInventory.length; intI++) 
			{
				var strLine = objInventory[intI];
				if (strLine.indexOf("├─") !== -1 || strLine.indexOf("└─") !== -1 || strLine.indexOf("│") !== -1) 
				{
					// Tree format - output as-is
					m_objThis.output(strLine, false, false);
				} 
				else 
				{
					// Regular format - add dash
					m_objThis.output("- " + strLine);
				}
			}
		} 
		else 
		{
			m_objThis.output(strEmpty);
		}
	};

	// tests if object has provided state
	this.is = function(obj_a, strState_a)
	{
		// Check if the state exists in the object's current_states array
		return (obj_a.current_states.includes(strState_a));
	};

	this.look = function()
	{
		var objCurrentLocation = m_objThis.playerLocation(m_objThis.properties.game.Players.myself);

		if (objCurrentLocation) 
		{
			m_objThis.output(objCurrentLocation.description);

			// Show objects in the room
			var arrVisibleObjects = [];
			for (var intI = 0; intI < objCurrentLocation.objects.length; intI++) 
			{
				var objItem = objCurrentLocation.objects[intI];
				if (objItem !== m_objThis.properties.game.Players.myself) 
				{
					arrVisibleObjects.push(objItem.name);
				}
			}

			if (arrVisibleObjects.length > 0) 
			{
				m_objThis.output("You can see: " + arrVisibleObjects.join(", "));
			}
		}
	};
	
	this.playerLocation = function(objPlayer_a)
	{
		var objCurrentLocation = null;
		
		for (var strLocationKey in m_objThis.properties.game.Locations)  // <- FIXED
		{
			var objLocation = m_objThis.properties.game.Locations[strLocationKey];  // <- FIXED
			if (objLocation.objects && objLocation.objects.indexOf(objPlayer_a) !== -1) 
			{
				objCurrentLocation = objLocation;
				break;
			}
		}
		
		return objCurrentLocation;
	};

	// for changing states
	this.states = function(obj_a, arrAdd_a, arrRemove_a)
	{
		// Add new states
		if (Array.isArray(arrAdd_a)) 
		{
			arrAdd_a.forEach(function(strState) 
			{
				if (!obj_a.current_states.includes(strState)) 
				{
					obj_a.current_states.push(strState);
					//m_objThis.output(obj_a.name + " is now " + strState);
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
					//m_objThis.output(obj_a.name + " is no longer " + strState);
				}
			});
		}
	};
	
	this.switchTo = function(objPlayer_a)
	{
		m_objThis.properties.game.Players.myself.alias = m_objThis.properties.game.Players.myself.name;
		m_objThis.properties.game.Players.myself = objPlayer_a;
		m_objThis.properties.game.Players.myself.alias = "myself";
		m_objThis.output("You are now " + m_objThis.properties.game.Players.myself.name + ".");
		
		if (m_objThis.properties.game.Players.myself.prologue.length > 0)
		{
			m_objThis.output(m_objThis.properties.game.Players.myself.prologue); 
			m_objThis.properties.game.Players.myself.prologue = "";
		}
	};
}
