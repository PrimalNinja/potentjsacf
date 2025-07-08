// PotentJS Adventure Creation Framework v20250708
// (c) 2025 Cyborg Unicorn Pty Ltd.
// This software is released under MIT License.

function BasicCLI() 
{
    var m_objThis = this;
    this.objACLib = null;

	// use chuck and alias it to throw because throw is a reserved word
	function cmdChuck(strVerb_a, strObject1_a, strPreposition_a, strObject2_a)
	{
		if (!ACLib.is(Game.Players.myself, "alive"))
		{
			m_objThis.objACLib.output("You are dead!");
		}
		else
		{
			// Find the object to throw
			var objItem = m_objThis.objACLib.findObjectByName(strObject1_a);
			
			if (!objItem) 
			{
				m_objThis.objACLib.output("You don't have that.");
			}
			else if (!m_objThis.objACLib.has(m_objThis.objACLib.properties.game.Players.myself, objItem))
			{
				m_objThis.objACLib.output("You're not carrying that.");
			}
			else
			{
				// Find the target
				var objTarget = m_objThis.objACLib.findObjectByName(strObject2_a);
				
				if (!objTarget) 
				{
					m_objThis.objACLib.output("I don't see that here.");
				}
				else
				{
					var strActualVerb = findActualVerb(objItem, strVerb_a);

					// Check for custom or default behavior
					if (objItem.language && objItem.language.verbs && objItem.language.verbs[strActualVerb]) 
					{
						objItem.language.verbs[strActualVerb](strPreposition_a, objTarget);
					} 
					else 
					{
						// Default behavior - drop the item in current location after throwing
						var objLocation = m_objThis.objACLib.playerLocation(m_objThis.objACLib.properties.game.Players.myself);
						
						if (objLocation) 
						{
							if (m_objThis.objACLib.assign(objLocation, objItem))
							{
								m_objThis.objACLib.output("You " + htmlEncode(strVerb_a) + " the " + htmlEncode(objItem.name) + " at " + htmlEncode(objTarget.name) + " and it falls to the ground.");
							}
						}
						else
						{
							m_objThis.objACLib.output("You can't " + htmlEncode(strVerb_a) + " that here.");
						}
					}
				}
			}
		}
	}

	function cmdCLS()
	{
		m_objThis.objACLib.cls();
	}
	
	function cmdDebug(obj_a)
	{
		if (!obj_a) 
		{
			m_objThis.objACLib.output("Not Found.");
		} 
		else
		{
			m_objThis.objACLib.output(JSON.stringify(obj_a));
		}
	}
	
	function cmdDebugN(obj_a)
	{
		cmdDebug(m_objThis.objACLib.findNPCByName(obj_a));
	}
	
	function cmdDebugO(obj_a)
	{
		cmdDebug(m_objThis.objACLib.findObjectByName(obj_a));
	}
	
	function cmdDebugP(obj_a)
	{
		cmdDebug(m_objThis.objACLib.findPlayerByName(obj_a));
	}
	
	function cmdDrop(strVerb_a, obj_a)
	{
		if (!ACLib.is(Game.Players.myself, "alive"))
		{
			m_objThis.objACLib.output("You are dead!");
		}
		else
		{
			var objTarget = m_objThis.objACLib.findObjectByName(obj_a);
			
			if (!objTarget) 
			{
				m_objThis.objACLib.output("You don't have that.");
			}
			else if (!m_objThis.objACLib.has(m_objThis.objACLib.properties.game.Players.myself, objTarget))
			{
				m_objThis.objACLib.output("You're not carrying that.");
			}
			else
			{
				// Find current location and drop it there
				var objLocation = m_objThis.objACLib.playerLocation(m_objThis.objACLib.properties.game.Players.myself);
				
				if (objLocation) 
				{
					if (m_objThis.objACLib.assign(objLocation, objTarget))
					{
						m_objThis.objACLib.output("You " + htmlEncode(strVerb_a) + " the " + htmlEncode(objTarget.name) + ".");
					}
				}
				else
				{
					m_objThis.objACLib.output("You can't " + htmlEncode(strVerb_a) + " that here.");
				}
			}
		}
	}
	
	function cmdGive(strVerb_a, strObject1_a, strPreposition_a, strObject2_a)
	{
		if (!ACLib.is(Game.Players.myself, "alive"))
		{
			m_objThis.objACLib.output("You are dead!");
		}
		else
		{
			// Find the object to give
			var objItem = m_objThis.objACLib.findObjectByName(strObject1_a);
			
			if (!objItem) 
			{
				m_objThis.objACLib.output("You don't have that.");
			}
			else if (!m_objThis.objACLib.has(m_objThis.objACLib.properties.game.Players.myself, objItem))
			{
				m_objThis.objACLib.output("You're not carrying that.");
			}
			else
			{
				// Find the recipient
				var objRecipient = m_objThis.objACLib.findObjectByName(strObject2_a);
				
				if (!objRecipient) 
				{
					m_objThis.objACLib.output("I don't see that here.");
				}
				else if (!objRecipient.properties.is_container)
				{
					m_objThis.objACLib.output("You can't give anything to the " + htmlEncode(objRecipient.name) + ".");
				}
				else
				{
					var strActualVerb = findActualVerb(objItem, strVerb_a);

					// Check for custom or default behavior
					if (objItem.language && objItem.language.verbs && objItem.language.verbs[strActualVerb]) 
					{
						objItem.language.verbs[strActualVerb](strPreposition_a, objRecipient);
					} 
					else 
					{
						// Default behavior
						if (m_objThis.objACLib.assign(objRecipient, objItem))
						{
							m_objThis.objACLib.output("You give the " + htmlEncode(objItem.name) + " to " + htmlEncode(objRecipient.name) + ".");
						}
					}
				}
			}
		}
	}
	
    function cmdHelp() 
	{
        m_objThis.objACLib.output("Available commands:");
        m_objThis.objACLib.output("note: items, players, NPCs, locations fixters are all objects.");
		
        m_objThis.objACLib.output("cls - Clear screen");

        m_objThis.objACLib.output("discard/drop/chuck/throw [object] - Discard an object");
        m_objThis.objACLib.output("get/pickup [object] - Pickup an object");
        
		m_objThis.objACLib.output("give [object1] to [object2] - Give an object to another");
		m_objThis.objACLib.output("put [object1] in/on/into/onto [object2] - Put an object to another");
		m_objThis.objACLib.output("take [object2] from [object1] - Take an object from another");
		m_objThis.objACLib.output("chuck/throw [object1] at [object2] - Throw an object at another");

        m_objThis.objACLib.output("examine [object] - Examine an object");
        m_objThis.objACLib.output("inventory, i - Check inventory");

        m_objThis.objACLib.output("open [object] - Open an object");
        m_objThis.objACLib.output("close [object] - Close an object");
        m_objThis.objACLib.output("enter [object] - Enter through a door");

        m_objThis.objACLib.output("kill [object] - Attack a target");

        m_objThis.objACLib.output("[object] - Switch to another character");
        m_objThis.objACLib.output("who - Who are you?");
        m_objThis.objACLib.output("where - Where are you?");
        m_objThis.objACLib.output("help - Show this help");
    }
	
	function cmdInventory()
	{
		m_objThis.objACLib.inventory(m_objThis.objACLib.properties.game.Players.myself);
	}
	
	function cmdLook()
	{
		m_objThis.objACLib.look();
	}

	function cmdPickup(strVerb_a, obj_a)
	{
		if (!ACLib.is(Game.Players.myself, "alive"))
		{
			m_objThis.objACLib.output("You are dead!");
		}
		else
		{
			var objTarget = m_objThis.objACLib.findObjectByName(obj_a);
			
			if (!objTarget) 
			{
				m_objThis.objACLib.output("I don't see that here.");
			}
			else if (!objTarget.properties.is_movable)
			{
				m_objThis.objACLib.output("You can't " + htmlEncode(strVerb_a) + " the " + htmlEncode(objTarget.name) + ".");
			}
			else if (m_objThis.objACLib.has(m_objThis.objACLib.properties.game.Players.myself, objTarget))
			{
				m_objThis.objACLib.output("You have the " + htmlEncode(objTarget.name) + " already.");
			}
			else
			{
				if (m_objThis.objACLib.assign(m_objThis.objACLib.properties.game.Players.myself, objTarget))
				{
					m_objThis.objACLib.output("You " + htmlEncode(strVerb_a) + " the " + htmlEncode(objTarget.name) + ".");
				}
			}
		}
	}
	
	function cmdPut(strVerb_a, strObject1_a, strPreposition_a, strObject2_a)
	{
		if (!ACLib.is(Game.Players.myself, "alive"))
		{
			m_objThis.objACLib.output("You are dead!");
		}
		else
		{
			// Find the object to put
			var objItem = m_objThis.objACLib.findObjectByName(strObject1_a);
			
			if (!objItem) 
			{
				m_objThis.objACLib.output("You don't have that.");
			}
			else if (!m_objThis.objACLib.has(m_objThis.objACLib.properties.game.Players.myself, objItem))
			{
				m_objThis.objACLib.output("You're not carrying that.");
			}
			else
			{
				// Find the container
				var objContainer = m_objThis.objACLib.findObjectByName(strObject2_a);
				
				if (!objContainer) 
				{
					m_objThis.objACLib.output("I don't see that here.");
				}
				else if (!objContainer.properties.is_container)
				{
					m_objThis.objACLib.output("You can't put anything " + htmlEncode(strPreposition_a) + " the " + htmlEncode(objContainer.name) + ".");
				}
				else if (m_objThis.objACLib.is(objContainer, "closed"))
				{
					m_objThis.objACLib.output("The " + htmlEncode(objContainer.name) + " is closed.");
				}
				else
				{
					var strActualVerb = findActualVerb(objItem, strVerb_a);

					// Check for custom or default behavior
					if (objItem.language && objItem.language.verbs && objItem.language.verbs[strActualVerb]) 
					{
						objItem.language.verbs[strActualVerb](strPreposition_a, objContainer);
					} 
					else 
					{
						// Default behavior
						if (m_objThis.objACLib.assign(objContainer, objItem))
						{
							m_objThis.objACLib.output("You put the " + htmlEncode(objItem.name) + " " + htmlEncode(strPreposition_a) + " the " + htmlEncode(objContainer.name) + ".");
						}
					}
				}
			}
		}
	}
	
	function cmdSwap(obj_a)
	{
		var objTarget = m_objThis.objACLib.findPlayerByName(obj_a);
		
		if (!objTarget) 
		{
			m_objThis.objACLib.output("They are not here.");
		} 
		else
		{
			m_objThis.objACLib.switchTo(objTarget);
		}
	}
	
	function findItemInNestedContainers(objContainer_a, strItemName_a) 
	{
		var objFoundItem = null;
		
		// Search through all objects in the container
		for (var intI = 0; intI < objContainer_a.objects.length && !objFoundItem; intI++) 
		{
			var obj = objContainer_a.objects[intI];
			
			// Check if this object matches what we're looking for
			if (obj.name.toLowerCase() === strItemName_a.toLowerCase() ||
				obj.alias.toLowerCase() === strItemName_a.toLowerCase()) 
			{
				objFoundItem = obj;
			}
			else if (obj.properties.is_container && obj.objects.length > 0) 
			{
				// If this object is a container AND it's open, search inside it recursively
				var blnCanSearch = true;
				
				// Check if container needs to be open
				if (obj.current_states && (obj.current_states.includes("open") || obj.current_states.includes("closed"))) 
				{
					blnCanSearch = !obj.current_states.includes("closed");
				}
				
				if (blnCanSearch) 
				{
					objFoundItem = findItemInNestedContainers(obj, strItemName_a);
				}
			}
		}
		
		return objFoundItem;
	}

	function buildPath(objItem_a, objTopContainer_a) 
	{
		var strFinalResult = "the " + objTopContainer_a.name;
		
		function findPath(objCurrentContainer_a, objTarget_a, arrCurrentPath_a) 
		{
			var arrResult = null;
			
			// Check direct objects in current container
			for (var intI = 0; intI < objCurrentContainer_a.objects.length && !arrResult; intI++) 
			{
				var obj = objCurrentContainer_a.objects[intI];
				
				if (obj === objTarget_a) 
				{
					// Found it! Return the complete path
					arrResult = arrCurrentPath_a.concat([objCurrentContainer_a.name]);
				}
				else if (obj.properties.is_container) 
				{
					// If this is a container, search deeper
					arrResult = findPath(obj, objTarget_a, arrCurrentPath_a.concat([objCurrentContainer_a.name]));
				}
			}
			
			return arrResult;
		}
		
		var arrPathArray = findPath(objTopContainer_a, objItem_a, []);
		if (arrPathArray && arrPathArray.length > 1) 
		{
			// Remove the top container since we already mention it
			arrPathArray.shift();
			strFinalResult = "the " + arrPathArray.join(" in the ");
		}
		
		return strFinalResult;
	}

	function cmdTake(strVerb_a, strObject1_a, strPreposition_a, strObject2_a)
	{
		if (!ACLib.is(Game.Players.myself, "alive"))
		{
			m_objThis.objACLib.output("You are dead!");
		}
		else
		{
			var objContainer = m_objThis.objACLib.findObjectByName(strObject2_a);
			var objItem = null;
			var strActualVerb = "";
			var strPathDescription = "";
			var blnHandled = false;
			
			if (!objContainer) 
			{
				m_objThis.objACLib.output("I don't see that here.");
			}
			else if (!objContainer.properties.is_container)
			{
				m_objThis.objACLib.output("You can't take anything from the " + htmlEncode(objContainer.name) + ".");
			}
			else if (m_objThis.objACLib.is(objContainer, "closed"))
			{
				if (objContainer.type === "player" || objContainer.type === "npc")
				{
					m_objThis.objACLib.output("You can't do that.");
				}
				else
				{
					m_objThis.objACLib.output("The " + htmlEncode(objContainer.name) + " is closed.");
				}
			}
			else
			{
				// Find the object inside the container
				for (var intI = 0; intI < objContainer.objects.length && !objItem; intI++) 
				{
					if (objContainer.objects[intI].name.toLowerCase() === strObject1_a.toLowerCase() ||
						objContainer.objects[intI].alias.toLowerCase() === strObject1_a.toLowerCase()) 
					{
						objItem = objContainer.objects[intI];
					}
				}

				// If not found in direct container, search recursively
				// BUT only if the container belongs to the player
				if (!objItem && m_objThis.objACLib.has(m_objThis.objACLib.properties.game.Players.myself, objContainer)) 
				{
					objItem = findItemInNestedContainers(objContainer, strObject1_a);
					if (objItem) 
					{
						// Found it deeper - extract it
						strPathDescription = buildPath(objItem, objContainer);
						
						// Move item to player using assign
						if (m_objThis.objACLib.assign(m_objThis.objACLib.properties.game.Players.myself, objItem))
						{
							m_objThis.objACLib.output("You take the " + htmlEncode(objItem.name) + " from " + strPathDescription + ".");
							blnHandled = true;
						}
					}
				}
				
				if (!blnHandled)
				{
					if (!objItem) 
					{
						m_objThis.objACLib.output("There is no " + htmlEncode(strObject1_a) + " in the " + htmlEncode(objContainer.name) + ".");
					}
					else if (!objItem.properties.is_movable)
					{
						m_objThis.objACLib.output("You can't take the " + htmlEncode(objItem.name) + ".");
					}
					else
					{
						strActualVerb = findActualVerb(objItem, strVerb_a);

						// Check for custom or default behavior
						if (objItem.language && objItem.language.verbs && objItem.language.verbs[strActualVerb]) 
						{
							objItem.language.verbs[strActualVerb](strPreposition_a, objContainer);
						} 
						else 
						{
							// Default behavior
							if (m_objThis.objACLib.assign(m_objThis.objACLib.properties.game.Players.myself, objItem))
							{
								m_objThis.objACLib.output("You take the " + htmlEncode(objItem.name) + " from the " + htmlEncode(objContainer.name) + ".");
							}
						}
					}
				}
			}
		}
	}
	
	function cmdVerb(strVerb_a, strObject1_a, strPreposition_a, strObject2_a)
	{
		// Check if strVerb_a is a player name (for direct player switching)
		var objTarget = m_objThis.objACLib.findPlayerByName(strVerb_a);
		
		if (objTarget && strPreposition_a.length === 0) 
		{
			m_objThis.objACLib.switchTo(objTarget);
		}
		else 
		{
			if (!ACLib.is(Game.Players.myself, "alive"))
			{
				m_objThis.objACLib.output("You are dead!");
			}
			else
			{
				var objItem = null;
				
				// Find the target object and verb using ACLib function
				objTarget = m_objThis.objACLib.findObjectByName(strObject1_a);
				
				if (!objTarget) 
				{
					m_objThis.objACLib.output("I don't see that here.");
				} 
				else 
				{
					if (strPreposition_a.toLowerCase() === "with")
					{
						objItem = m_objThis.objACLib.findObjectByName(strObject2_a);
					}
					
					// Check if the object has the verb
					if (objTarget.language && objTarget.language.verbs) 
					{
						var strActualVerb = findActualVerb(objTarget, strVerb_a);

						// Check if the actual verb exists
						if (objTarget.language && objTarget.language.verbs && objTarget.language.verbs[strActualVerb]) 
						{
							objTarget.language.verbs[strActualVerb](strPreposition_a, objItem);
						} 
						else 
						{
							m_objThis.objACLib.output("You can't " + htmlEncode(strVerb_a) + " the " + htmlEncode(objTarget.name) + ".");
						}
					}
				}
			}
		}
	}
	
	function cmdWhere()
	{
		m_objThis.objACLib.output("You are " + htmlEncode(m_objThis.objACLib.properties.game.Players.myself.location) + ".");
	}
	
	function cmdWho()
	{
		m_objThis.objACLib.output("You are " + htmlEncode(m_objThis.objACLib.properties.game.Players.myself.name) + ".");
	}

	function findActualVerb(obj_a, strVerb_a)
	{
		var strActualVerb = strVerb_a; // Start with the original verb

		// Check if the verb is an alias
		if (obj_a.language.verb_aliases) 
		{
			for (var intI = 0; intI < obj_a.language.verb_aliases.length; intI++) 
			{
				var objAlias = obj_a.language.verb_aliases[intI];
				if (objAlias[strActualVerb]) 
				{
					strActualVerb = objAlias[strActualVerb];
					break;
				}
			}
		}
		
		return strActualVerb;
	}
	
    function processCommand(strInput_a, blnSupressCommand_a) 
	{
		var blnSupressCommand = blnSupressCommand_a;
		if (blnSupressCommand === undefined) { blnSupressCommand = false; }
        
		var intI;
        
        if (strInput_a && strInput_a.trim() !== '') 
		{
            var strCommand = strInput_a.trim().toLowerCase();
            
			if (!blnSupressCommand)
			{
				m_objThis.objACLib.output('> ' + htmlEncode(strInput_a));
			}
            
            // Split command into words
			var arrWords = strCommand.split(/\s+/);
			var strVerb = arrWords[0] || "";
			var strObject1 = "";
			var strObject2 = "";
			var strPreposition = "";

			// Check for multi-object commands with prepositions
			var intPrepositionIndex = -1;
			var arrPrepositions = ["from", "to", "in", "on", "into", "onto", "at", "with"];

			for (intI = 1; intI < arrWords.length; intI++) 
			{
				if (arrPrepositions.includes(arrWords[intI])) 
				{
					intPrepositionIndex = intI;
					strPreposition = arrWords[intI];
					break;
				}
			}

			if (intPrepositionIndex > 0) 
			{
				// Multi-object command: "take key from box"
				strObject1 = arrWords.slice(1, intPrepositionIndex).join(' ');
				strObject2 = arrWords.slice(intPrepositionIndex + 1).join(' ');
			} 
			else 
			{
				// Single object command: "get sword" or "examine key"
				strObject1 = arrWords.slice(1).join(' ');
			}
            
            // Handle special commands
			// no specified objects
            if (strVerb === 'cls') { m_objThis.objACLib.cls(); } 
            else if (strVerb === 'help') { cmdHelp(); } 
			else if (strVerb === 'inventory' || strVerb === 'i') { cmdInventory(); } 
			else if ((strVerb === 'look' || strVerb === 'l') && (strObject1.length === 0)) { cmdLook(); }
			else if (strVerb === 'where') { cmdWhere(); }
			else if (strVerb === 'who') { cmdWho(); }

			// one specified object
			else if (strVerb === 'debugn') { cmdDebugN(strObject1); }
			else if (strVerb === 'debugo') { cmdDebugO(strObject1); }				
			else if (strVerb === 'debugp') { cmdDebugP(strObject1); }
			else if ((strVerb === 'discard' || strVerb === 'drop' || strVerb === 'chuck' || strVerb === 'throw') && strPreposition.length === 0) { cmdDrop(strVerb, strObject1); }
			else if ((strVerb === 'get' || strVerb === 'pickup' || strVerb === 'take') && strPreposition.length === 0) { cmdPickup(strVerb, strObject1); }
			else if (strVerb === 'swap' || strVerb === 'switch') { cmdSwap(strObject1); }

			// two specified objects
			else if ((strVerb === 'chuck' || strVerb === 'throw') && strPreposition === 'at') { cmdChuck(strVerb, strObject1, strPreposition, strObject2); }
			else if (strVerb === 'give' && strPreposition === 'to') { cmdGive(strVerb, strObject1, strPreposition, strObject2); }
			else if (strVerb === 'put' && (strPreposition === 'in' || strPreposition === 'on' || strPreposition === 'into' || strPreposition === 'onto')) { cmdPut(strVerb, strObject1, strPreposition, strObject2); }
			else if (strVerb === 'get' || strVerb === 'take' && strPreposition === 'from') { cmdTake(strVerb, strObject1, strPreposition, strObject2); }
			else { cmdVerb(strVerb, strObject1, strPreposition, strObject2); }
        }
    }

    this.Play = function(objACLib_a) 
	{
        m_objThis.objACLib = objACLib_a;
        
		$(ACLib.properties.inputElement).bind('keydown', function(e) 
		{
			if (e.key === 'Enter') 
			{
				var strInput = $(ACLib.properties.inputElement).val();
				
				try
				{
					processCommand(strInput);
				}
				catch(err)
				{
					alert(err);
				}
				
				$(ACLib.properties.inputElement).val('');
			}
		});
    };
}
