// PotentJS Adventure Creation Framework v20250708
// (c) 2025 Cyborg Unicorn Pty Ltd.
// This software is released under MIT License.

$("#aclib-title").html(Game.Title);
$("#aclib-subtitle").html(Game.SubTitle);

var ACLib = new ACLib();

// set the title
ACLib.properties.inputElement = "#aclib-input";
ACLib.properties.outputElement = "#aclib-output";

ACLib.properties.cli = new BasicCLI();		// create a CLI
ACLib.properties.game = Game;				// assign the initialised game

// initialise the game
Game.Initialise();

ACLib.properties.cli.Play(ACLib);			// start the game

