GomokuGame.ai = (function() {
    var ai = {};

    var board = [];
    depth = 0;

    var updateBoard = function(move) {
        // This function will update the board to include the move being inputted
        console.log("Entering updateBoard.\nCurrent move is: " +
            move.row + ", " + move.column + "\n" +  board[move.row][move.column]);

        var direction;  // This stores the index of directions
        var steps;      // This stores how many 'steps' away from the central piece
        var side;       // This stores which side from the central piece to take steps in

        var row;        // This will store the new row
        var column;     // This will store the new column
        var spot;       // This will store the new spot

        var directions = [[-1, 1, 1, -1], // direction: /
                         [-1, 0, 1, 0],  // direction: __
                         [-1, -1, 1, 1], // direction: \
                         [0, -1, 0, 1]]; // direction: |

        if (board[move.row][move.column] !== undefined &&
            board[move.row][move.column][4] !== null) {
            // Check that spot exists && it is not already filled
            board[move.row][move.column][5] = null;

            for (direction = 0; direction <= 3; direction += 1) {
                // Looping through directions and accessing correct array direction
                for (steps = 1; steps <= 2; steps += 1) {
                    // Looping through steps and accessing correct modifier value
                    for (side = -1; side <= 1; side += 1) {
                        // Looping through left, central, and right side of direction

                        if (!(steps === 2 && side === 0)) {
                            row = move.row + (Math.abs(side) *
                                (directions[direction][side + 2] * steps));
                            column = move.column + (Math.abs(side) *
                                (directions[direction][side + 1] * steps));

                            if (board[row] !== undefined &&
                                board[row][column] !== undefined) {
                                // Check that spot exists && it is not already filled

                                spot = board[row][column];
                                
                                console.log("Updating Spot: " +
                                    row + ", " + column + "\n" +  spot);

                                // Following if clause updates value array holding pieces
                                if (spot[direction][0] < 0 ||
                                    ((spot[direction][0] % 2 === 1 || spot[direction][0] === 4 ||
                                         spot[direction][0] === 10 || spot[direction][0] === 12 ||
                                         spot[direction][0] === 28 || spot[direction][0] === 30 ||
                                         spot[direction][0] === 36 || spot[direction][0] === 82 ||
                                         spot[direction][0] === 84 || spot[direction][0] === 108) &&
                                         move.colour === 1) ||
                                    (spot[direction][0] !== 0 && move.colour === 0)) {
                                    // Check for polluted chain
                                    // <0 || ((odd || set value) && colour) || (!0 && colour)
                                    
                                    spot[direction][0] = (-Math.abs(spot[direction][0])) -
                                        (Math.pow(3,(2 - side * steps)) * (1 + move.colour));
                                    // Negative value means that the spot is polluted

                                    console.log("Polluted Chain");

                                } else {
                                    spot[direction][0] +=
                                        (Math.pow(3,(2 - side * steps)) * (1 + move.colour));


                                    console.log("Unpolluted Chain");
                                }

                                spot[direction][1][0] = calcScore(spot[direction][0]);

                                if (spot[direction][0] === 121 || spot[direction][0] === 242) {
                                    // GAME HAS ENDED
                                }

                            }
                        }

                    }
                }
            }
        } else {
            console.log("Error: The move was invalid:\n" +
                "Either the place does not exist or it is occupied");
        }
    };

    var calcScore = function(pieces) {
        // Converts the array of piece arrangements into a score

        if (pieces < 0) {
            // A polluted chain
            return 0;
        } else if (pieces === 0) {
            return 1;
        } else if (pieces === 1 || pieces === 3 ||
                   pieces === 9 || pieces === 27 ||
                   pieces === 81) {
            // A chain of 1 black
            return 35;
        } else if (pieces === 2 || pieces === 6 ||
                   pieces === 18 || pieces === 54 ||
                   pieces === 162) {
            // A chain of 1 white
            return 15;
        } else if (pieces === 4 || pieces === 10 ||
                   pieces === 28 || pieces === 82 ||
                   pieces === 12 || pieces === 30 ||
                   pieces === 84 || pieces === 36 ||
                   pieces === 90 || pieces === 108) {
            // A chain of 2 black
            return 800;
        } else if (pieces === 8 || pieces === 20 ||
                   pieces === 56 || pieces === 164 ||
                   pieces === 24 || pieces === 60 ||
                   pieces === 168 || pieces === 72 ||
                   pieces === 180 || pieces === 216) {
            // A chain of 2 white
            return 400;
        } else if (pieces === 13 || pieces === 31 ||
                   pieces === 85 || pieces === 37 ||
                   pieces === 91 || pieces === 109 ||
                   pieces === 39 || pieces === 93 ||
                   pieces === 127) {
            // A chain of 3 black
            return 15000;
        } else if (pieces === 26 || pieces === 62 ||
                   pieces === 170 || pieces === 74 ||
                   pieces === 182 || pieces === 218 ||
                   pieces === 78 || pieces === 186 ||
                   pieces === 254) {
            // A chain of 3 white
            return 1800;
        } else if (pieces === 40 || pieces === 94 ||
                   pieces === 112 || pieces === 118 ||
                   pieces === 120) {
            // A chain of 4 black
            return 800000;
        } else if (pieces === 80 || pieces === 188 ||
                   pieces === 224 || pieces === 236 ||
                   pieces === 240) {
            // A chain of 4 white
            return 100000;
        } else {
            console.log("Error: The input was invalid");
                return null;
        }
    };

    var getScore = function(row, column) {
        if (board[row][column][5] !== null) {
            board[row][column][4][4] = Math.abs(board[row][column][4][0][0][0]) +
                                       Math.abs(board[row][column][4][0][1][0]) +
                                       Math.abs(board[row][column][4][0][2][0]) +
                                       Math.abs(board[row][column][4][0][3][0]) +
                                       Math.abs(board[row][column][4][0][4][0]) +

                                       Math.abs(board[row][column][4][1][0][0]) +
                                       Math.abs(board[row][column][4][1][1][0]) +
                                       Math.abs(board[row][column][4][1][2][0]) +
                                       Math.abs(board[row][column][4][1][3][0]) +
                                       Math.abs(board[row][column][4][1][4][0]) +

                                       Math.abs(board[row][column][4][2][0][0]) +
                                       Math.abs(board[row][column][4][2][1][0]) +
                                       Math.abs(board[row][column][4][2][2][0]) +
                                       Math.abs(board[row][column][4][2][3][0]) +
                                       Math.abs(board[row][column][4][2][4][0]) +

                                       Math.abs(board[row][column][4][3][0][0]) +
                                       Math.abs(board[row][column][4][3][1][0]) +
                                       Math.abs(board[row][column][4][3][2][0]) +
                                       Math.abs(board[row][column][4][3][3][0]) +
                                       Math.abs(board[row][column][4][3][4][0]);
        } else {
            board[row][column][4][4] = 0;
        }
    };

    ai.makeMove = function(column, row, colour) {
        // This is the external-facing function called to place a move
        // and to receive the AI's response to the move.
        console.log("entering makeMove.\ncolumn: " + column +
            "\nrow: " + row);
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
        // The +2 is to compensate for the padding applied.

        updateBoard(move);


        for (i = 2; i <= height - 2; i += 1) {
            line = "| ";
            for (j = 2; j <= width - 2; j += 1) {
                getScore(i, j);
                currentScore = board[i][j][4][4];
                line += currentScore;
                //line += i
                //line += j
                line += " | ";
                if (currentScore > topScores[0][0] && currentScore !== "NA") {
                    topScores = [];
                    topScores[0] = ([currentScore, j, i]);
                } else if (currentScore === topScores[0][0]) {
                    topScores.push([currentScore, j, i]);
                }
            }
            console.log(line);
        }
        console.log("The Highest Score(s):");
        console.log(topScores);
        console.log("making move");

        if (colour === 1) {
            colour = 0;
        } else {
            colour = 1;
        }

        move = {
            column: topScores[0][1],
            row: topScores[0][2] ,
            colour: colour
        };

        updateBoard(move);

        console.log(move.column, move.row, colour);



        return {column: move.column - 2, row: move.row - 2, colour: colour};
    };

    ai.initialise = function(columns, rows, depth) {
        // Sets up the board to specified size
        // Each cell will contain an array containing the arrangement
        // of pieces in each direction, is well the score corresponding
        // to said arrangement in the given direction.
        // Finally, each cell also contains a total score for said cell.
        var i;
        var square = 0;
        var row = [];
        var score;

        for (i = 0; i <= rows + 4; i += 1) {
            row =  [];
            for (j = 0; j <= columns + 4; j += 1) {
                row.push([[0, [0]], [0, [0]], [0, [0]], [0, [0]],
                          [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
                           [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], 0], 0]);
                // Directions and Scores:
                // ([/, [score]], [__, [sc]], [\, [sc]], [|, [sc]], scTotal)
            }
            board.push(row);
        }

        // Defining Score:
        for (i = 2; i <= rows + 2; i += 1) {
            for (j = 2; j <= columns + 2; j += 1) {

                board[i][j][4][0][0] = board[i - 2][j + 2][0][1];
                board[i][j][4][0][1] = board[i - 1][j + 1][0][1];
                board[i][j][4][0][2] = board[i][j][0][1];
                board[i][j][4][0][3] = board[i + 1][j - 1][0][1];
                board[i][j][4][0][4] = board[i + 2][j - 2][0][1];
                // Direction: /

                board[i][j][4][1][0] = board[i][j - 2][1][1];
                board[i][j][4][1][1] = board[i][j - 1][1][1];
                board[i][j][4][1][2] = board[i][j][1][1];
                board[i][j][4][1][3] = board[i][j + 1][1][1];
                board[i][j][4][1][4] = board[i][j + 2][1][1];
                // Direction: __

                board[i][j][4][2][0] = board[i - 2][j - 2][2][1];
                board[i][j][4][2][1] = board[i - 1][j - 1][2][1];
                board[i][j][4][2][2] = board[i][j][2][1];
                board[i][j][4][2][3] = board[i + 1][j + 1][2][1];
                board[i][j][4][2][4] = board[i + 2][j + 2][2][1];
                // Direction: \

                board[i][j][4][3][0] = board[i - 2][j][3][1];
                board[i][j][4][3][1] = board[i - 1][j][3][1];
                board[i][j][4][3][2] = board[i][j][3][1];
                board[i][j][4][3][3] = board[i + 1][j][3][1];
                board[i][j][4][3][4] = board[i + 2][j][3][1];
                // Direction |
            }
        }

    };

    return ai;
}());
