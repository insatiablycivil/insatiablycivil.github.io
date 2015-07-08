$(function() {
    init();
    printBoard();
});

function initBoard() {
    var square;
    for (square = 0; square < 226; square++) {
        BOARD.push([-1,-1]);
        // Each board square will have a [Colour, MoveNum]
        // -1 is the undefined. 0 for black, 1 for white.
    }
}

function printBoard() {
    var line;
    var row;
    var column;
    square = 0;
    for (row = 1; row < 16; row++) {
        line = "";
        for (column = 1; column < 16; column++) {
            square += 1;
            if (BOARD[square][1] === -1) {
                line += " " + ".";
            }
            else if (BOARD[square][1] === 0) {
                line += " " + "O";
            }
            else if (BOARD[square][1] === 1) {
                line += " " + "X";
            }
            else {
                line += " " + "?";
            }
        }
        console.log(line);
    }
}

function init() {
    console.log("init() called");
    initBoard();
}