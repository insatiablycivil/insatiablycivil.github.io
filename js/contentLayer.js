GomokuGame.contentLayer = (function() {
    var contentLayer = {};
    var contentCanvas = document.getElementById("contentLayer");
    var contentContext = contentCanvas.getContext('2d');
    var uiCanvas = document.getElementById("uiLayer");
    var uiContext = uiCanvas.getContext('2d');
    var contentElements = [];
    var pieces = [];
    var moves = [];
    var black = 'rgba(38, 50, 56, 1)';
    var orange = 'rgba(245, 124, 0, 1)';

    var createDividers = (function () {
        // Creates lines the segment the gui
        contentContext.strokeStyle = 'rgba(255, 255, 255, 0.87)';
        contentContext.beginPath();
        contentContext.moveTo(190, 50);
        contentContext.lineTo(190, 100);
        // Seperates two opponent status
        contentContext.moveTo(380, 40);
        contentContext.lineTo(380, 100);
        // Seperates status with right status section
        contentContext.stroke();
        contentContext.beginPath();
        contentContext.strokeStyle = 'rgba(0, 0, 0, 0.87)';
        contentContext.moveTo(380, 100);
        contentContext.lineTo(380, contentCanvas.height - 60);
        // Seperates status with right body section
        contentContext.stroke();
        contentContext.strokeRect(1, 1, contentCanvas.width - 2,
            contentCanvas.height - 2);
        // Outlining whole thing
        });

    var checkEnd = function (piece, column, row) {
        var xDir;
        var yDir;
        var steps;
        var locationX;
        var locationY;
        var modifier = 0;
        var chain = 0;

        console.log("\n\nPlace at: " + column + ", " + row);

        for (xDir = -1; xDir <= 1; xDir += 1) {
            // Cycling through x direction
            for (yDir = 0; yDir <= 1; yDir += 1) {
                // Cycling through y direction
                console.log("Direction is: " + xDir + ", " + yDir);
                if (!(xDir === 0 && yDir === 0) && !(xDir === -1 && yDir === 0)) {
                    // Skip 0 and 0 case
                    for (steps = 1; steps <= 4; steps += 1) {
                        // Cycling through steps
                        locationX = column + (xDir * (steps + modifier));
                        locationY = row + (yDir * (steps + modifier));
                        console.log("Looking at: " + locationX + ", " + locationY);
                        // Getting next location
                        if (locationX >= 0 && locationX <= 14 &&
                            locationY >= 0 && locationY <= 14) {
                            // Check if on board
                            console.log("Checked: On Board");
                            if (pieces[locationX][locationY] !== null) {
                                // Check piece exists there
                                console.log("Checked: Piece Exists");
                                if ((pieces[locationX][locationY].colour === pieces[column][row].colour)) {
                                    // Check it is right colour
                                console.log("Checked: Right Colour");
                                    chain += 1;
                                    console.log("Chain Incremented. Now at: " + chain);
                                    if (chain === 4) {
                                        console.log("Game Over: " + pieces[column][row].colour + " Wins!");
                                        return true;
                                    }
                                    continue;
                                }
                            }
                        }
                        // Trigger modifier
                        modifier -= 5;
                        steps -= 1;
                        console.log("Modifier Triggered");
                        if (modifier !== -5) {
                            // Check if triggered already
                            modifier = 0;
                            chain = 0;
                            console.log("Chain Cancelled");
                            break;
                        }
                    }
                }
            }
        }
    };

    contentLayer.checkCollision = function(mouse) {
        var i;
        var length;
        var pieceHit = false;
        var colour;
        var bounds = {
            x: 50 - 9,
            y: 150 - 9,
            w: 330 + 9,
            h: 430 + 9
        };
        var column;
        var row;

        console.log("check Collision");

        if (mouse.x >= bounds.x && mouse.x <= bounds.w &&
            mouse.y >= bounds.y && mouse.y <= bounds.h) {
            length = moves.length;
            for (i = 0; i < length; i += 1) {
                if (Globals.checkCollision(moves[i], mouse) === true) {
                    console.log("You Hit: " + moves[i].name);
                    pieceHit = true;
                }
            }
            if (pieceHit === false) {
                column = Math.round((mouse.x - 50) / 20);
                row = Math.round((mouse.y - 150) / 20);
                contentLayer.makeMove(column,row);
            }
        }
    };

    contentLayer.makeMove = function(column, row) {
        if (Globals.blacktoMove === true) {
            colour = black;
            } else {
                colour = orange;
            }

            pieces[column][row] =
                Globals.createPiece(
                    "x" + column + " y" + row,
                    (column * 20 + 50), (row * 20 + 150),
                    9, 9, colour, 1, 'rgba(0, 0, 0, 0.87)',
                    (column * 20 + 40), (row * 20 + 140), 20,20);
            moves.push(pieces[column][row]);
            Globals.draw(pieces[column][row]);

            if (moves.length >= 9) {
                if (checkEnd(pieces[column][row], column, row) === true) {
                    Globals.gameActive = false;
                    GomokuGame.uiLayer.gameOver(pieces[column][row].colour);
                }
            }
            
            Globals.blacktoMove = !Globals.blacktoMove;
            if ((Globals.blacktoMove === true && Globals.aiSide[0] === true) ||
                (Globals.blacktoMove === false && Globals.aiSide[1] === true)) {
                    console.log(column, row);
                    Globals.promptAI(column, row);
            }
    };

    contentLayer.initialise = (function() {
        // Creates visual elements of content layer
        var length;
        var i;
        var j;
        var column = [];

        contentContext.fillStyle = 'rgba(255, 255, 255, 1)';
        contentContext.font = '30px "Roboto"';
        contentContext.fillText("Gomoku", 10, 30);

        contentElements.push(
            Globals.createDecor('SideLeft', 'circle', contentContext,
            25, 65, 12, -1,
            black, 1, 'rgba(0, 0, 0, 0.87)'));

        contentContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        contentContext.font = '18px "Roboto"';
        contentContext.fillText("Player One", 50, 68);

        contentContext.fillStyle = 'rgba(0, 0, 0, 0.71)';
        contentContext.font = '14px "Roboto"';
        contentContext.fillText("Black", 50, 86);

        contentElements.push(
            Globals.createDecor('SideRight', 'circle', contentContext,
            355, 65, 12, -1,
            orange, 1, 'rgba(0, 0, 0, 0.87)'));

        contentContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        contentContext.font = '18px "Roboto"';
        contentContext.textAlign = "right";
        contentContext.fillText("Player Two", 330, 68);

        contentContext.fillStyle = 'rgba(0, 0, 0, 0.71)';
        contentContext.font = '14px "Roboto"';
        contentContext.fillText("Orange", 330, 86);

        length = contentElements.length;
        for (i = 0; i < length; i += 1) {
            Globals.draw(contentElements[i]);
        }
                   
        createDividers();

        for (i = 0; i < 15; i +=1 ) {
            pieces.push(column);
            for (j = 0; j < 15; j += 1) {
                column.push(null);
            }
            column = [];
        }
    });

    contentLayer.restart = function() {
        var i;
        var j;
        var column = [];

        pieces = [];
        moves = [];
        for (i = 0; i < 15; i +=1 ) {
            pieces.push(column);
            for (j = 0; j < 15; j += 1) {
                column.push(null);
            }
            column = [];
        }

        contentContext.clearRect(0, 100, 380, contentCanvas.height - 160);
    };

    return contentLayer;
}());