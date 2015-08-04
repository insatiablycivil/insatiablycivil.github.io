// FIX PADDING
// GET DEPTH OF 1 SORTED BY TUESDAY

GomokuGame.ai = (function() {
    var ai = {};

    var board = [];

    var getScore = function(move) {
        var i;

        if (board[move.column][move.row] !== null) {
            //console.log(move.column, move.row)
            //console.log(board[move.column][move.row] )
            if (board[move.column][move.row][4] !== null) {

                board[move.column][move.row][4] = 0;

                for (i = 0; i <= 3; i += 1) {
                    if (Math.abs(board[move.column][move.row][i]) === 4 ||
                        Math.abs(board[move.column][move.row][i]) === 5 ||
                        Math.abs(board[move.column][move.row][i]) === 6 ||
                        Math.abs(board[move.column][move.row][i]) === 12 ||
                        Math.abs(board[move.column][move.row][i]) === 20 ||
                        Math.abs(board[move.column][move.row][i]) === 7 ||
                        Math.abs(board[move.column][move.row][i]) === 14 ||
                        Math.abs(board[move.column][move.row][i]) === 28 ||
                        Math.abs(board[move.column][move.row][i]) === 15 ||
                        Math.abs(board[move.column][move.row][i]) === 30) {
                        board[move.column][move.row][4] = null;
                    } else if (board[move.column][move.row][i] === 0 ) {
                        board[move.column][move.row][4] += 7;
                    } else if (Math.abs(board[move.column][move.row][i]) === 1 ||
                        Math.abs(board[move.column][move.row][i]) === 2 ||
                        Math.abs(board[move.column][move.row][i]) === 8 ||
                        Math.abs(board[move.column][move.row][i]) === 16) {
                        if (board[move.column][move.row][i] > 0) {
                            board[move.column][move.row][4] += 35;
                        } else {
                            board[move.column][move.row][4] += 15;
                        }
                    } else if (Math.abs(board[move.column][move.row][i]) === 3 ||
                        Math.abs(board[move.column][move.row][i]) === 9 ||
                        Math.abs(board[move.column][move.row][i]) === 17 ||
                        Math.abs(board[move.column][move.row][i]) === 10 ||
                        Math.abs(board[move.column][move.row][i]) === 18 ||
                        Math.abs(board[move.column][move.row][i]) === 24) {
                        if (board[move.column][move.row][i] > 0) {
                            board[move.column][move.row][4] += 800;
                        } else {
                            board[move.column][move.row][4] += 400;
                        }
                    } else if (Math.abs(board[move.column][move.row][i]) === 11 ||
                        Math.abs(board[move.column][move.row][i]) === 19 ||
                        Math.abs(board[move.column][move.row][i]) === 26) {
                        if (board[move.column][move.row][i] > 0) {
                            board[move.column][move.row][4] += 15000;
                        } else {
                            board[move.column][move.row][4] += 1800;
                        }
                    } else if (board[move.column][move.row][i] === 27) {
                        board[move.column][move.row][4] += 800000;
                    } else if (board[move.column][move.row][i] === -27) {
                        board[move.column][move.row][4] += 100000;
                    } 
                }
            }
            return board[move.column][move.row][4];
        }
        return "NA";
    };

    var updateBoard = function(move) {

        // [/,--,\,|,col]
        var direction = [[-1, 1, 1, -1], [-1, 0, 1, 0],
            [-1, -1, 1, 1], [0, -1, 0, 1]];

        var modifiers = [8, 16, 2, 1];
        // MAKE THIS 5
        // CHECK IF FILLED


        var i;
        var j;

        console.log("MOVE: " + move.column + ", " + move.row);
        console.log("CONTENTS: " + board[move.column][move.row]);
        console.log("CONTENTS: " + board[move.column][move.row][0]);
        console.log("CONTENTS: " + board[move.column][move.row][1]);
        console.log("CONTENTS: " + board[move.column][move.row][2]);
        console.log("CONTENTS: " + board[move.column][move.row][3]);

        if (board[move.column][move.row] !== null) {

            for (i = 0; i <= 3; i += 1) {
                if (board[move.column][move.row][i] !== null) {
                    if (board[move.column][move.row][i] <= 0 && move.colour === 1) {
                        // Orange
                        board[move.column][move.row][i] -= 4;
                    } else if (board[move.column][move.row][i] >= 0 && move.colour === 0) {
                        // Black
                        board[move.column][move.row][i] += 4;
                    } else {
                        board[move.column][move.row][i] = null;
                    }
                    if (Math.abs(board[move.column][move.row][i]) === 31) {
                        console.log("GAME ENDED");
                    }
                }
            }
            // Adds score to square's own spot (middle spot)

            for (i = 0; i <= 3; i += 1) {
                for (j = 1; j <= 2; j += 1) {
                    if (board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)] !== null) {
                        // Check if spot is polluted
                        if (board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] !== null) {
                            // Check if spot's chain in given direction is polluted
                            if (board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] <= 0 &&
                                move.colour === 1) {
                                // Check if move matches chain's colour
                                board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] -= modifiers[j - 1];
                                if (board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] === -31) {
                                    // Check if chain is full
                                    console.log("GAME ENDED: BLACK WIN");
                                }
                            } else if (board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] >= 0 &&
                                move.colour === 0) {
                                // Check if spot's chain in given direction is polluted
                                board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] += modifiers[j - 1];
                                if (board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] === 31) {
                                    // Check if chain is full
                                    console.log("GAME ENDED: WHITE WIN");
                                }
                            } else {
                                board[move.column + (direction[i][0] * j)][move.row + (direction[i][1] * j)][i] = null;
                            }
                        }
                        if (board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] !== null) {
                            // Check if spot's chain in given direction is polluted
                            if (board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] <= 0 &&
                                move.colour === 1) {
                                // Check if spot's chain in given direction is polluted
                                board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] -= modifiers[j + 1];
                                if (board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] === -31) {
                                    // Check if chain is full
                                    console.log("GAME ENDED: BLACK WIN");
                                }
                            } else if (board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] >= 0 &&
                                move.colour === 0) {
                                // Check if spot's chain in given direction is polluted
                                board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] += modifiers[j + 1];
                                if (board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] === 31) {
                                    // Check if chain is full
                                    console.log("GAME ENDED: WHITE WIN");
                                }
                            } else {
                                board[move.column + (direction[i][2] * j)][move.row + (direction[i][3] * j)][i] = null;
                            }
                        }
                    }
                }
            }
        } else {
            console.log("INVALID MOVE");
        }
    };

    ai.makeMove = function(column, row, colour) {
        var i;
        var j;
        var height = board.length - 1;
        var width = board[0].length - 1;
        var line;
        var currentScore;
        var topScores = [[0]];
        var move = {
            column: column + 2,
            row: row + 2,
            colour: colour
        };

        updateBoard(move);

        for (i = 0; i <= height; i += 1) {
            line = "| ";
            for (j = 0; j <= width; j += 1) {
                move = {
                    row: i,
                    column: j,
                    colour: colour
                };
                currentScore = getScore(move);
                line += currentScore;
                line += " | ";
                if (currentScore > topScores[0][0] && currentScore !== "NA") {
                    topScores = [];
                    topScores[0] = ([currentScore, i, j]);
                } else if (currentScore === topScores[0][0]) {
                    topScores.push([currentScore, i, j]);
                }
            }
            console.log(line);
        }
        console.log("The Highest Score(s):");
        console.log(topScores);
        console.log("making move");
    };

    ai.initialise = function(columns, rows) {
        var i;
        var square = 0;
        var row = [];

        for (i = 0; i <= rows + 4; i += 1) {

            row = [];

            for (j = 0; j <= columns + 4; j += 1) {

                // if ((i <= 1 || i >= (columns + 2)) ||
                //     (j <= 1 || j >= (rows + 2)) ||
                //     ((i <= 3 && j <= 3) || (i >= columns && j >= rows)) ||
                //     ((i <= 3 && j >= rows) || (i >= columns && j <= 3))) {
                //     column.push(null);
                // } else if (i <= 3 || i >= columns) {
                //     column.push([null, null, null, 0, 0]);
                // } else if (j <= 3 || j >= rows) {
                //     column.push([null, 0, null, null, 0]);
                // } else {
                //     column.push([0, 0, 0, 0, 0]);
                //     // [/,--,\,|]
                // }
                if ((i <= 1 || i >= (rows + 3)) ||
                    (j <= 1 || j >= (columns + 3))) {
                    row.push(null);
                } else {
                    row.push([0, 0, 0, 0, 0]);
                }
            }

            board.push(row);

        }
    };

    return ai;
}());