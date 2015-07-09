




var BOARD = []; // ?? Forgot


// var GomokuGame = (function() {
// 	// Attempt at 'Modern' Module Pattern
// 	var gameCanvas = document.getElementById("canvasBoard");
// 	var gameContext = gameCanvas.getContext('2d');
// 	var menuCanvas = document.getElementById("canvasMenu");
// 	var menuContext = menuCanvas.getContext('2d');

// 	var turn = 'black';
// 	var moves = []; // Contains list of squares that have been moved upon
// 	var squares = []; // Contains list of all squares
// 	var valid = false; // Toggles if mouse is clicked when on canvas
// 	var menuVisible = true; // Toggles if menu is visible
// 	var BOARD = []; // ?? Forgot

// 	var Initialise = (function() {
// 		populate();
// 		generateMenu();
// 	});

// 	gameCanvas.addEventListener('mousedown', mouseDownListener, false);
// 	gameCanvas.addEventListener('mouseup', mouseUpListener, false);

// 	var publicAPI = {
// 		doThis: function() {
// 			publicAPI.doThat();
// 		},
// 		doThat: function() {
// 			console.log("doThis");
// 		}
// 	};
// 	return publicAPI;
// }());
//
//GomokuGame.doThis();