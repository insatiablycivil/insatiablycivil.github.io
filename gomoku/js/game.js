GomokuGame.game = (function () {

    var game = {};

    var getPieces = GomokuGame.getPieces();

    var getBoard = GomokuGame.getBoard();

    var turn = 'black';
    // Stores current turn

    var squares = [];
    // Contains list of all squares on board

    var pieces = [];
    // Contains list of all pieces placed

    var winningPieces = [];
    // Contains list of the winning string of pieces 

    var valid = false;

    var piece = function(named, x, y, w, h, defaultState, ownedBy, active) {
    // Piece constructor
    this.named = named;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.defaultState = defaultState;
    this.ownedBy = ownedBy;
    this.active = active;
    // Active is whether the mouse is currently downpressed upon the piece
    return this;
    };

    piece.prototype.checkColliding = function(mouseLocation) {
        // Is given mouseLocation and checks whether it is touching the piece
        if (mouseLocation.x >= this.x && mouseLocation.x <= this.x + this.w &&
                mouseLocation.y >= this.y && mouseLocation.y <= this.y + this.h) {
            return true;
        } else {
            return false;
        }
    };

    piece.prototype.fillPiece = function() {
        // Is given a piece and will draw it on pieces canvas
        getPieces.context.beginPath();
        getPieces.context.arc(this.x + this.w / 2, this.y + this.w / 2, this.w / 2, 0, 2 * Math.PI, false);
        if (this.ownedBy !== null) {
            getPieces.context.fillStyle = this.ownedBy;
            getPieces.context.fill();
        } else if (this.active === true) {
            getPieces.context.fillStyle = 'yellow';
            getPieces.context.fill();
        } else {
            getPieces.context.clearRect(this.x, this.y, this.w, this.h);
        }
    };

    var createPiece = function (named, x, y, w, h, defaultState, ownedBy, active) {
        var createdPiece = new piece(named, x, y, w, h, defaultState, ownedBy, active);
        return createdPiece;
    };

    var getPiece = function(named) {
        // Is given a named and cycles through moves searching for a match
        var i;
        var length = pieces.length;
        for (i = 0; i < length; i += 1) {
            if (named === pieces[i].named) {
                return pieces[i];
            }
        }
        return null;
    };

    var resetPieces = function() {
        // Resets attributes of all pieces
        var i;
        for (i = 0; i < pieces.length; i += 1) {
            GomokuGame.setAttributes(pieces[i], {defaultState: 'null', ownedBy: null, active: 'false'});
        }
        getPieces.context.clearRect(0, 0, getPieces.canvas.width, getPieces.canvas.height);
    };

    var populateGame = function() {
        // Creates the board with pieces
        var column;
        var row;
        var i;
        for (row = 0; row < 15; row += 1) {
            for (column = 0; column < 15; column += 1) {
                pieces.push(createPiece(column.toString() + "," + row.toString(),
                        column * 50, row * 50, 49, 49, null, null, false));
            }
        }
        for (i = 0; i < pieces.length; i += 1) {
            pieces[i].fillPiece();
        }
        fillGrid(null);
    };

    var checkEnd = function(piece) {
        // Given the latest move and returns whether game has just ended
        var xDir;
        var yDir;
        var steps;
        var location;
        var modifier = 0;
        var x;
        var y;
        var named;
        var chain = 1;
        var i;
        winningPieces.push(piece);
        console.log("length " + winningPieces.length)
        location = piece.named.split(",");
        for (xDir = -1; xDir < 2; xDir += 1) {
            // Cycling through x directions
            for (yDir = -1; yDir < 2; yDir += 1) {
                // Cycling through y directions
                if (!(xDir === 0 && yDir === 0)) {
                    for (steps = 1; steps < 5; steps += 1) {
                        // Cycling through steps in given directions
                        
                        x = parseInt(location[0], 10) + xDir * (steps + modifier);
                        y = parseInt(location[1], 10) + yDir * (steps + modifier);
                        named = x.toString() + "," + y.toString();
                        // Assembles name of the desired piece
                        named = getPiece(named);
                        // Returns with a) null (not found) b) piece object (if found)
                        if (named !== null && named.ownedBy === piece.ownedBy) {
                            // Checks if there was a piece and if it was of same colour
                            chain += 1;
                            winningPieces.push(named);
                            console.log("length " + winningPieces.length)
                            if (chain > 4) {
                                console.log("GAMEOVER! {" + xDir + "," + yDir + "}");
                                return true;
                            }
                        } else {
                                            // **NOT WORKING** // if (named !== null && chain === 3) {
                                            // **NOT WORKING** //   console.log("end is nigh")
                                            // **NOT WORKING** // }
                            modifier -= 5;
                            steps -= 1;
                            // Goes back 5 steps along same direction if it reaches dead end
                            if (modifier !== -5) {
                                // If it has already gone back once, it ends here and moves to next direction
                                modifier = winningPieces.length;
                                chain = 1;
                                for (i = 1; i < modifier; i += 1) {
                                    winningPieces.pop();
                                }
                                modifier = 0;
                                console.log("Cancelled");
                                break;
                            }
                        }
                    }
                }
            }
        }
        winningPieces.pop();
        return false;
    };

    game.newGame = function() {
        turn = 'black';
        GomokuGame.header.updateTurn(turn);
        resetPieces();
    };

    game.initialise = function() {
        populateGame();
    };
    //GomokuGame.game.undoMove


    var makeMove = function(piece) {
        // Given piece that user selected and processes the move
        var i;
        piece.active = false;
        piece.ownedBy = turn;
        pieces.push(piece);
        piece.fillPiece();
        console.log(pieces.length);
        if (pieces.length > 8) {
            if (checkEnd(piece) === true) {
                menuVisible = true;
                GomokuGame.IO.menu("endGame");
                for (i = 0; i < winningPieces.length; i += 1) {
                    console.log(i);
                    winningPieces[i].defaultState = "win";
                    console.log(winningPieces.length);
                    winningPieces[i].fillPiece();
                }
                GomokuGame.header.updateTurn(turn);
                turn = 'orange';
                console.log(piece.ownedBy + " WON!");
            } else {
                console.log("Game On...");
            }
        }
        turn = ((turn === 'black') ? 'orange' : 'black');
        GomokuGame.header.updateTurn(turn);
    };

    var fillGrid = function() {
        // Draws grid on the board canvas
        var x;
        var y;
        var bufferX;
        var bufferY;
        getBoard.context.fillStyle = '#FAFAFA';
        getBoard.context.fillRect(0, 0, 750, 750);
        getBoard.context.lineWidth = 2;
        getBoard.context.strokeStyle = 'orange';
        getBoard.context.beginPath();
        for (x = 25; x < 726; x += 50) {
            getBoard.context.moveTo(x, 25);
            getBoard.context.lineTo(x, 725);
        }
        for (y = 25; y < 726; y += 50) {
            getBoard.context.moveTo(25, y);
            getBoard.context.lineTo(725, y);
        }
        getBoard.context.stroke();
    };

    game.mouseDown = function(e) {
        var mouseLocation = GomokuGame.getMouseLocation(e);
        var i;
        var pieceHit = false;
        valid = true;
        console.log(pieces.length)
        GomokuGame.setMouseMove(true);
        for (i = 0; i < pieces.length; i += 1) {
            if (pieces[i].checkColliding(mouseLocation) === true && pieces[i].ownedBy === null) {
                pieceHit = true;
                console.log("You Hit : ", pieces[i].named);
                pieces[i].active = true;
                pieces[i].fillPiece();
            } else if (pieces[i].active === true) {
                pieces[i].active = false;
                pieces[i].fillPiece();
            }
        }
        if (pieceHit === false) {
            console.log("You Missed!");
        }
    };

    game.mouseUp = function(e) {
        var mouseLocation;
        var i;
        if (valid === true) {
            mouseLocation = GomokuGame.getMouseLocation(e);
            GomokuGame.setMouseMove(false);
            for (i = 0; i < pieces.length; i += 1) {
                if (pieces[i].checkColliding(mouseLocation) === true && pieces[i].ownedBy === null) {
                    makeMove(pieces[i]);
                } else if (pieces[i].active === true) {
                    pieces[i].active = false;
                    pieces[i].fillPiece();
                }
            }
            valid = false;
        } else {
            console.log("huh?");
        }
    };

    game.mouseMove = function(e) {
        var mouseLocation;
        var i;
        var pieceHit = false;
        mouseLocation = GomokuGame.getMouseLocation(e);
        console.log("you moved!");
        for (i = 0; i < pieces.length; i += 1) {
            if (pieces[i].checkColliding(mouseLocation) === true) {
                if (pieces[i].defaultState !== 'black') {
                    pieceHit = true;
                    if (pieces[i].active === false) {
                        console.log("You Hit : ", pieces[i].named);
                        pieces[i].active = true;
                        pieces[i].fillPiece();
                    }
                } else {
                    pieceHit = true;
                    console.log("Space Taken Already!");
                }
            } else if (pieces[i].active === true) {
                pieces[i].active = false;
                pieces[i].fillPiece();
            }
        }
        if (pieceHit === false) {
            console.log("You Missed!");
        }
    };

    return game;
}());

   






    // GomokuGame.getTurn = function() {
    //     // Is given a named and cycles through moves searching for a match
    //     return turn;
    // };

    // GomokuGame.setTurn = function(newTurn) {
    //     // Is given a named and cycles through moves searching for a match
    //     turn = newTurn;
    //     return;
    // };