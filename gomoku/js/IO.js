// // var UMBRELLA = (function (my) {
// // 	my.anotherMethod = function () {
// // 		// added method...
// // 		console.log("another")
// // 	};
// // 	console.log(my.privateVariable)
// // 	return my;
// // }(UMBRELLA));

// // UMBRELLA.anotherMethod()
// // console.log(UMBRELLA.privateVariable)

// // console.log(UMBRELLA.moduleProperty)















// var GomokuGame = (function () {
//     // Private Variables
//     var GomokuGame = {};
    
//     var menuCanvas = document.getElementById("canvasMenu");
//     var menuContext = menuCanvas.getContext('2d');
//     // Will take event listeners and host menu

//     var piecesCanvas = document.getElementById("canvasPieces");
//     var piecesContext = piecesCanvas.getContext('2d');
//     // Will host game pieces

//     var boardCanvas = document.getElementById("canvasBoard");
//     var boardContext = boardCanvas.getContext('2d');
//     // Will host game board

//     var turn = 'black';

//     var squares = [];
//     // Contains list of all squares
//     var pieces = [];
//     // Contains list of all pieces placed
//     var winningPieces = [];
//     // Contains list of the winning string of pieces
//     var valid = false;
//     // Toggles if mouse is clicked when on canvas
//     var menuVisible = true;
//     // Toggles if menu is visible

//     var piece = function(named, x, y, w, h, defaultState, ownedBy, active) {
//         // Piece constructure
//         this.named = named;
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.defaultState = defaultState;
//         this.ownedBy = ownedBy;
//         this.active = active;
//         // Active is whether the mouse is currently downpressed upon the piece
//         return this;
//     };

//     piece.prototype.checkColliding = function (mouseLocation) {
//         // Is given mouseLocation and checks whether it is touching the piece
//         if (mouseLocation.x >= this.x && mouseLocation.x <= this.x + this.w &&
//                 mouseLocation.y >= this.y && mouseLocation.y <= this.y + this.h) {
//             return true;
//         } else {
//             return false;
//         }
//     };

//     // // Public Properties
//     // GomokuGame.menuCanvas = document.getElementById("canvasMenu");
//     // GomokuGame.menuContext = GomokuGame.menuCanvas.getContext('2d');
//     // // Will take event listeners and host menu

//     // GomokuGame.piecesCanvas = document.getElementById("canvasPieces");
//     // GomokuGame.piecesContext = GomokuGame.piecesCanvas.getContext('2d');
//     // // Will host game pieces

//     // GomokuGame.boardCanvas = document.getElementById("canvasBoard");
//     // GomokuGame.boardContext = GomokuGame.boardCanvas.getContext('2d');
//     // // Will host game board

//     GomokuGame.createPiece = function (named, x, y, w, h, defaultState, ownedBy, active) {
//         var createdPiece = new piece(named, x, y, w, h, defaultState, ownedBy, active);
//         return createdPiece;
//     };

//     // GomokuGame.turn = 'black';
//     // GomokuGame.squares = []; // Contains list of all squares
//     // GomokuGame.pieces = []; // Contains list of all pieces placed
//     // GomokuGame.winningPieces = []; // Contains list of the winning string of pieces
//     // GomokuGame.valid = false; // Toggles if mouse is clicked when on canvas
//     // GomokuGame.menuVisible = true; // Toggles if menu is visible

//     GomokuGame.getPiece = function(named) {
//         // Is given a named and cycles through moves searching for a match
//         var i;
//         var length = moves.length;
//         for (i = 0; i < length; i += 1) {
//             if (named === moves[i].named) {
//                 return moves[i];
//             }
//         }
//         return null;
//     };

//     GomokuGame.resetPieces = function() {
//         // Resets attributes of all pieces
//         var i;
//         for (i = 0; i < moves.length; i += 1) {
//             setAttributes(moves[i], {defaultState: 'null', ownedBy: null, active: 'false'});
//         }
//         piecesContext.clearRect(0, 0, piecesCanvas.width, piecesCanvas.height);
//     }

//     return GomokuGame;
// }());