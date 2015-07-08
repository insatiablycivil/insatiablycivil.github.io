//"use strict";
var gameCanvas2 = document.getElementById("canvasMenu");
var gameContext2 = gameCanvas2.getContext('2d');
gameContext2.fillStyle = 'orange';
gameContext2.fillRect(0, 0, 750, 750);




var gameCanvas = document.getElementById("canvas");
var gameContext = gameCanvas.getContext('2d');

var turn = 'black';
var moves = []; // Contains list of squares that have been moved upon
var squares = []; // Contains list of all squares
var valid = false; // Toggles if mouse is clicked when on canvas
var menuUp = true;

function getSquare(named) {
    // Is given a named and cycles through moves searching for a match
    var i;
    var length = moves.length;
    for (i = 0; i < length; i += 1) {
        if (named === moves[i].named) {
            return moves[i];
        }
    }
    return null;
}

function square(named, x, y, w, h, defaultState, ownedBy, active) {
    // Square constructor
    this.named = named;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.defaultState = defaultState;
    this.ownedBy = ownedBy;
    this.active = active;
    // Active is whether the mouse is currently downpressed upon the square
}

square.prototype.checkColliding = function (mouseLocation) {
    // Is given mouseLocation and checks whether it is touching the square
    if (mouseLocation.x >= this.x && mouseLocation.x <= this.x + this.w &&
            mouseLocation.y >= this.y && mouseLocation.y <= this.y + this.h) {
        return true;
    } else {
        return false;
    }
};

function populate() {
    // Creates the board with squares
    var column;
    var row;
    var defaultState = 'red';
    var i;
    for (row = 0; row < 15; row += 1) {
        for (column = 0; column < 15; column += 1) {
            if (defaultState === 'red') {
                defaultState = 'grey';
            } else {
                defaultState = 'red';
            }
            squares.push(new square(column.toString() + "," + row.toString(),
                    column * 50, row * 50, 49, 49, defaultState, null, false));
        }
    }
    for (i = 0; i < squares.length; i += 1) {
        fillSquare(squares[i]);
    }
    fillGrid(null);
}

function fillGrid(square) {
    var x;
    var y;

    var bufferX;
    var bufferY;

    if (square === null) {
        gameContext.fillStyle = 'brown';
        gameContext.fillRect(0, 0, 750, 750);
        gameContext.lineWidth = 2;
        gameContext.strokeStyle = 'white';
        gameContext.beginPath();
        for (x = 25; x < 726; x += 50) {
            gameContext.moveTo(x, 25);
            gameContext.lineTo(x, 725);
        }
        for (y = 25; y < 726; y += 50) {
            gameContext.moveTo(25, y);
            gameContext.lineTo(725, y);
        }
    } else {
        gameContext.lineWidth = 2;
        gameContext.strokeStyle = 'white';
        gameContext.beginPath();

        if (square.x === 0) {
            bufferX = 25;
        } else if (square.x === 700) {
            bufferX = 0;
        }
        if (bufferX !== undefined) {
            gameContext.moveTo(square.x + bufferX, square.y + 25);
            gameContext.lineTo(square.x + bufferX + 25, square.y + 25);
        } else {
            gameContext.moveTo(square.x, square.y + 25);
            gameContext.lineTo(square.x + 50, square.y + 25);
        }

        if (square.y === 0) {
            bufferY = 25;
        } else if (square.y === 700) {
            bufferY = 0;
        }
        if (bufferY !== undefined) {
            gameContext.moveTo(square.x + 25, square.y + bufferY);
            gameContext.lineTo(square.x + 25, square.y + bufferY + 25);
        } else {
            gameContext.moveTo(square.x + 25, square.y);
            gameContext.lineTo(square.x + 25, square.y + 50);
        }
    }
    gameContext.stroke();
}

function fillSquare(square) {
    // Is given a square and will draw it on canvas
    gameContext.beginPath();
    gameContext.arc(square.x + square.w / 2, square.y + square.w / 2, square.w / 2, 0, 2 * Math.PI, false);
    if (square.ownedBy !== null) {
        gameContext.fillStyle = square.ownedBy;
        gameContext.fill();
    } else if (square.active === true) {
        gameContext.fillStyle = 'yellow';
        gameContext.fill();
    } else {
        gameContext.fillStyle = 'brown';
        gameContext.fill();
        fillGrid(square);
    }
}

function resetSquares() {
    // Resets attributes of all squares
    var i;
    for (i = 0; i < moves.length; i += 1) {
        setAttributes(moves[i], {defaultState: 'grey', ownedBy: null, active: 'false'});
        fillSquare(moves[i]);
    }
}

function setAttributes(element, attributes) {
    // Helper function
    var key;
    for (key in attributes) {
        element[key] = attributes[key];
    }
}


function getMouseLocation(e) {
    // Given event and returns mouse coordinates
    var x;
    var y;
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    x -= gameCanvas.offsetLeft;
    y -= gameCanvas.offsetTop;
    console.log("Clicked @:", x, y);
    return {x: x, y: y};
}

function checkEnd(square) {
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
    for (xDir = -1; xDir < 2; xDir += 1) {
        // Cycling through x directions
        for (yDir = -1; yDir < 2; yDir += 1) {
            // Cycling through y directions
            if (!(xDir === 0 && yDir === 0)) {
                for (steps = 1; steps < 5; steps += 1) {
                    // Cycling through steps in given directions
                    location = square.named.split(",");
                    x = parseInt(location[0], 10) + xDir * (steps + modifier);
                    y = parseInt(location[1], 10) + yDir * (steps + modifier);
                    named = x.toString() + "," + y.toString();
                    // Assembles name of the desired square
                    named = getSquare(named);
                    // Returns with a) null (not found) b) square object (if found)
                    if (named !== null && named.ownedBy === square.ownedBy) {
                        // Checks if there was a square and if it was of same colour
                        chain += 1;
                        if (chain > 3) {
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
                            modifier = 0;
                            chain = 0;
                            console.log("Cancelled");
                            break;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function makeMove(square) {
    // Given square that user selected and processes the move
    square.active = false;
    square.ownedBy = turn;
    moves.push(square);
    fillSquare(square);
    console.log(moves.length);
    if (moves.length > 8) {
        if (checkEnd(square) === true) {
            console.log(square.ownedBy + " WON!");
        } else {
            console.log("Game On...");
        }
    }
    turn = ((turn === 'black') ? 'white' : 'black');
}

function generateMenu() {
    gameContext.fillStyle = 'rgba(0,0,0,0.7)';
    gameContext.fillRect(0, 0, 750, 750);

    gameContext.fillStyle = 'rgba(0,0,0,0.2)';
    gameContext.fillRect(0, 150, 750, 25);
    gameContext.fillStyle = 'purple';
    gameContext.fillRect(0, 0, 750, 150);

    gameContext.fillStyle = 'rgba(0,0,0,0.2)';
    gameContext.fillRect(150, 250, 500, 100);
    gameContext.fillStyle = 'white';
    gameContext.fillRect(125, 225, 500, 100);

    gameContext.fillStyle = 'rgba(0,0,0,0.2)';
    gameContext.fillRect(150, 425, 500, 100);
    gameContext.fillStyle = 'white';
    gameContext.fillRect(125, 400, 500, 100);

    gameContext.fillStyle = 'rgba(0,0,0,0.2)';
    gameContext.fillRect(150, 600, 500, 100);
    gameContext.fillStyle = 'white';
    gameContext.fillRect(125, 575, 500, 100);
}

populate();
generateMenu();

gameCanvas.addEventListener('mousedown', mouseDownListener, false);
gameCanvas.addEventListener('mouseup', mouseUpListener, false);

function mouseDownListener(e) {
    if (menuUp === true) {
        menuMouseDown(e);
    } else {
        gameMouseDown(e);
    }
}

function mouseUpListener(e) {
    if (menuUp === true) {
        menuMouseUp(e);
    } else {
        gameMouseUp(e);
    }
}

function mouseMoveListener(e) {
    if (menuUp === true) {
        menuMouseMove(e);
    } else {
        gameMouseMove(e);
    }
}




function gameMouseDown(e) {
    var mouseLocation;
    var i;
    var squareHit = false;
    mouseLocation = getMouseLocation(e);
    valid = true;
    gameCanvas.addEventListener('mousemove', mouseMoveListener, false);
    for (i = 0; i < squares.length; i += 1) {
        if (squares[i].checkColliding(mouseLocation) === true && squares[i].ownedBy === null) {
            squareHit = true;
            console.log("You Hit : ", squares[i].named);
            squares[i].active = true;
            fillSquare(squares[i]);
        } else if (squares[i].active === true) {
            squares[i].active = false;
            fillSquare(squares[i]);
        }
    }
    if (squareHit === false) {
        console.log("You Missed!");
    }
}

function gameMouseUp(e) {
    var mouseLocation;
    var i;
    if (valid === true) {
        mouseLocation = getMouseLocation(e);
        gameCanvas.removeEventListener('mousemove', mouseMoveListener, false);
        for (i = 0; i < squares.length; i += 1) {
            if (squares[i].checkColliding(mouseLocation) === true && squares[i].ownedBy === null) {
                makeMove(squares[i]);
            } else if (squares[i].active === true) {
                squares[i].active = false;
                fillSquare(squares[i]);
            }
        }
        valid = false;
    } else {
        console.log("huh?");
    }
}

function gameMouseMove(e) {
    var mouseLocation;
    var i;
    var squareHit = false;
    mouseLocation = getMouseLocation(e);
    console.log("you moved!");
    for (i = 0; i < squares.length; i += 1) {
        if (squares[i].checkColliding(mouseLocation) === true) {
            if (squares[i].defaultState !== 'black') {
                squareHit = true;
                if (squares[i].active === false) {
                    console.log("You Hit : ", squares[i].named);
                    squares[i].active = true;
                    fillSquare(squares[i]);
                }
            } else {
                squareHit = true;
                console.log("Space Taken Already!");
            }
        } else if (squares[i].active === true) {
            squares[i].active = false;
            fillSquare(squares[i]);
        }
    }
    if (squareHit === false) {
        console.log("You Missed!");
    }
}