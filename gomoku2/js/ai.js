// DO SCORE - SUM UP VALUES

GomokuGame.ai = (function() {
    var ai = {};
    var board = [];
    var scores = [];
    var moves = [];

    var updateBoard = function(move) {
        board[move.column][move.row] = null;
        
        var xDir;
        var yDir;
        var steps;

        for (xDir = -1; xDir <= 1; xDir += 1) {
            // Cycling through x direction
            for (yDir = -1; yDir <= 1; yDir += 1) {
                // Cycling through y direction
                if (!(xDir === 0 && yDir === 0)) {
                    // Skip 0 and 0 case
                    for (steps = 1; steps <= 2; steps += 1) {
                        // Cycling through steps
                        updateSquare(move, xDir, yDir, steps);
                        updateScore(move);
                    }
                }
            }
        }
    // This is a loop to check everything is in bounds each time
    };

    var updateSquare = function(move, xDir, yDir, steps) {

        var locationX;
        var locationY;

        locationX = move.column + (xDir * steps);
        locationY = move.row + (yDir * steps);

        console.log("Looking at: " + locationX + ", " + locationY);

        if (locationX >= 0 && locationX <= 14 &&
            locationY >= 0 && locationY <= 14) {
            // Check if on board
                            
            if (board[locationX][locationY] !== null) {
                // Check piece exists there
                
                if (xDir === -1 && yDir === -1) {
                    if (board[locationX][locationY][3] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][3][1] === null) {
                            // Check if blank
                            board[locationX][locationY][3][1] = move.colour;
                        } else if (board[locationX][locationY][3][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][3] = null;
                        }
                        if (board[locationX][locationY][3][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][3][0] += (8 * steps);
                        }
                    }
                } else

                if (xDir === -1 && yDir === 1) {
                    if (board[locationX][locationY][1] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][1][1] === null) {
                            // Check if blank
                            board[locationX][locationY][1][1] = move.colour;
                        } else if (board[locationX][locationY][1][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][1] = null;
                        }
                        if (board[locationX][locationY][1][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][1][0] += (8 * steps);
                        }
                    }
                } else

                if (xDir === 1 && yDir === 1) {
                    if (board[locationX][locationY][1] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][1][1] === null) {
                            // Check if blank
                            board[locationX][locationY][1][1] = move.colour;
                        } else if (board[locationX][locationY][1][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][1] = null;
                        }
                        if (board[locationX][locationY][1][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][1][0] += (2 / steps);
                        }
                    }
                } else

                if (xDir === 1 && yDir === -1) {
                    if (board[locationX][locationY][3] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][3][1] === null) {
                            // Check if blank
                            board[locationX][locationY][3][1] = move.colour;
                        } else if (board[locationX][locationY][3][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][3] = null;
                        }
                        if (board[locationX][locationY][3][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][3][0] += (2 / steps);
                        }
                    }
                } else

                if (xDir === -1 && yDir === 0) {
                    if (board[locationX][locationY][2] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][2][1] === null) {
                            // Check if blank
                            board[locationX][locationY][2][1] = move.colour;
                        } else if (board[locationX][locationY][2][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][2] = null;
                        }
                        if (board[locationX][locationY][2][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][2][0] += (8 * steps);
                        }
                    }
                } else

                if (xDir === 0 && yDir === -1) {
                    if (board[locationX][locationY][0] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][0][1] === null) {
                            // Check if blank
                            board[locationX][locationY][0][1] = move.colour;
                        } else if (board[locationX][locationY][0][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][0] = null;
                        }
                        if (board[locationX][locationY][0][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][0][0] += (8 * steps);
                        }
                    }
                } else

                if (xDir === 1 && yDir === 0) {
                    if (board[locationX][locationY][2] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][2][1] === null) {
                            // Check if blank
                            board[locationX][locationY][2][1] = move.colour;
                        } else if (board[locationX][locationY][2][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][2] = null;
                        }
                        if (board[locationX][locationY][2][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][2][0] += (2 / steps);
                        }
                    }
                } else

                if (xDir === 0 && yDir === 1) {
                    if (board[locationX][locationY][0] !== null) {
                        // Check for pre-pollution or out of bounds
                        if (board[locationX][locationY][0][1] === null) {
                            // Check if blank
                            board[locationX][locationY][0][1] = move.colour;
                        } else if (board[locationX][locationY][0][1] !== move.colour) {
                            // Check if polluted
                            board[locationX][locationY][0] = null;
                        }
                        if (board[locationX][locationY][0][1] === move.colour) {
                            // Check right colour
                            board[locationX][locationY][0][0] += (2 / steps);
                        }
                    }
                }
            }
        }

    };

    var updateScore = function(move, xDir, yDir, steps) {

        var locationX;
        var locationY;

        locationX = move.column + (xDir * steps);
        locationY = move.row + (yDir * steps);

        if (locationX >= 0 && locationX <= 14 &&
            locationY >= 0 && locationY <= 14) {

            scores[locationX][locationY] = board[locationX][locationY][0] +
                                           board[locationX][locationY][1] +
                                           board[locationX][locationY][2] +
                                           board[locationX][locationY][3];
            console.log("hiya " + scores[locationX][locationY]);
        }
    };

    var printScores = function() {
        var column;
        var row;
        var line;
        for (column = 0; column < 15; column += 1) {
            line = "";
            for (row = 0; row < 15; row += 1) {
                line += "| " + scores[column][row] + " |";
            }
            console.log(line);
        }
    };

    var assessThreats = function(move) {
        var xDir;
        var yDir;
        var steps;
        var locationX;
        var locationY;
        var chain = 0;

        //console.log("\n\nPlace at: " + column + ", " + row);

        for (xDir = -1; xDir <= 1; xDir += 1) {
            // Cycling through x direction
            for (yDir = -1; yDir <= 1; yDir += 1) {
                // Cycling through y direction
                console.log("Direction is: " + xDir + ", " + yDir);
                if (!(xDir === 0 && yDir === 0)) {
                    // Skip 0 and 0 case
                    for (steps = 1; steps < 5; steps += 1) {
                        // Cycling through steps
                        locationX = move.column + (xDir * steps);
                        locationY = move.row + (yDir * steps);
                        console.log("Looking at: " + locationX + ", " + locationY);
                        // Getting next location
                        if (locationX >= 0 && locationX <= 14 &&
                            locationY >= 0 && locationY <= 14) {
                            // Check if on board
                            console.log("Checked: On Board");
                            if (board[locationX][locationY] !== null) {
                                // Check piece exists there
                                console.log("Checked: Piece Exists");
                                if ((board[locationX][locationY].colour === move.colour)) {
                                    // Check it is right colour
                                console.log("Checked: Right Colour");
                                    chain += 1;
                                    console.log("Chain Incremented. Now at: " + chain);
                                    continue;
                                }
                            }
                        }
                        console.log("chain ended at: " + chain);
                    }
                }
            }
        }

    };

    ai.makeMove = function(column, row, colour) {
        var move = {
            column: column,
            row: row,
            colour: colour
        };

        updateBoard(move);
        printScores();
        console.log("making move");
    };

    ai.initialise = function(columns, rows) {
        var i;
        var column = [];
        var columnScore = [];

        for (i = 0; i <= columns; i +=1 ) {
            board.push(column);
            scores.push(columnScore);
            for (j = 0; j <= rows; j += 1) {

                //columnScore.push(null);

                if ((i <= 1 && j <= 1) ||
                    (i >= columns - 2 && j >= rows - 2) ||
                    (i >= columns - 2 && j <= 1) ||
                    (i <= 1 && j >= rows - 2)) {
                    column.push(null);
                    continue;
                } else
                // Corner Cases

                if ((i <= 1 && j <= rows - 2) ||
                    ((i >= columns - 2 && j <= rows - 2))) {
                    column.push([[0, null], null, null, null, null]);
                    continue;
                } else
                // Vertical Edge

                if ((i <= columns - 2 && j <= 1) ||
                    ((i <= columns - 2 && j >= rows - 2))) {
                    column.push([null, null, [0,null], null, null]);
                    continue;
                } else
                // Horizontal Edge

                {
                    column.push([[0,null], [0,null], [0,null], [0,null], null]);
                    // (X Y) = (0 1) (1 1) (1 0) (1 -1)
                    // [0, null] = number of pieces, colour of pieces
                }

            }
            column = [];
            columnScore = [];
        }
    };

    return ai;
}());