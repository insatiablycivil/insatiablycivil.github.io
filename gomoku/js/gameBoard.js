//"use strict";




// var haha = {}

// haha["uh"] = (function() {
//     console.log("huh")
//     return "huh"
// })

// console.log(haha.uh)


var zzz
var yyy = 10

for (zzz = 0; zzz < yyy; zzz++) {
    console.log(zzz)
}



var boardCanvas = document.getElementById("canvasBoard");
var boardContext = boardCanvas.getContext('2d');
var piecesCanvas = document.getElementById("canvasPieces");
var piecesContext = piecesCanvas.getContext('2d');
var menuCanvas = document.getElementById("canvasMenu");
var menuContext = menuCanvas.getContext('2d');



var turn = 'black';
var moves = []; // Contains list of pieces that have been moved upon
var pieces = []; // Contains list of all pieces
var winningPieces = [];
var options = [];
var valid = false; // Toggles if mouse is clicked when on canvas
var menuVisible = false; // Toggles if menu is visible

populateGame();
populateMenu();
//generateMenu();


menuCanvas.addEventListener('mousedown', mouseDownListener, false);
menuCanvas.addEventListener('mouseup', mouseUpListener, false);








function getPiece(named) {
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

function piece(named, x, y, w, h, defaultState, ownedBy, active) {
    // piece constructor
    this.named = named;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.defaultState = defaultState;
    this.ownedBy = ownedBy;
    this.active = active;
    // Active is whether the mouse is currently downpressed upon the piece
}

piece.prototype.checkColliding = function (mouseLocation) {
    // Is given mouseLocation and checks whether it is touching the piece
    if (mouseLocation.x >= this.x && mouseLocation.x <= this.x + this.w &&
            mouseLocation.y >= this.y && mouseLocation.y <= this.y + this.h) {
        return true;
    } else {
        return false;
    }
};

function populateGame() {
    // Creates the board with pieces
    var column;
    var row;
    //var defaultState = 'red';
    var i;
    for (row = 0; row < 15; row += 1) {
        for (column = 0; column < 15; column += 1) {
            //if (defaultState === 'red') {
            //    defaultState = 'grey';
            //} else {
            //    defaultState = 'red';
            //}
            pieces.push(new piece(column.toString() + "," + row.toString(),
                    column * 50, row * 50, 49, 49, null, null, false));
        }
    }
    for (i = 0; i < pieces.length; i += 1) {
        fillPiece(pieces[i]);
    }
    fillGrid(null);
}

function fillGrid(piece) {
    var x;
    var y;

    var bufferX;
    var bufferY;

    if (piece === null) {
        boardContext.fillStyle = '#FAFAFA';
        boardContext.fillRect(0, 0, 750, 750);
        boardContext.lineWidth = 2;
        boardContext.strokeStyle = 'orange';
        boardContext.beginPath();
        for (x = 25; x < 726; x += 50) {
            boardContext.moveTo(x, 25);
            boardContext.lineTo(x, 725);
        }
        for (y = 25; y < 726; y += 50) {
            boardContext.moveTo(25, y);
            boardContext.lineTo(725, y);
        }
    }
    // else {
    //     boardContext.lineWidth = 2;
    //     boardContext.strokeStyle = 'orange';
    //     boardContext.beginPath();

    //     if (piece.x === 0) {
    //         bufferX = 25;
    //     } else if (piece.x === 700) {
    //         bufferX = 0;
    //     }
    //     if (bufferX !== undefined) {
    //         boardContext.moveTo(piece.x + bufferX, piece.y + 25);
    //         boardContext.lineTo(piece.x + bufferX + 25, piece.y + 25);
    //     } else {
    //         boardContext.moveTo(piece.x, piece.y + 25);
    //         boardContext.lineTo(piece.x + 50, piece.y + 25);
    //     }

    //     if (piece.y === 0) {
    //         bufferY = 25;
    //     } else if (piece.y === 700) {
    //         bufferY = 0;
    //     }
    //     if (bufferY !== undefined) {
    //         boardContext.moveTo(piece.x + 25, piece.y + bufferY);
    //         boardContext.lineTo(piece.x + 25, piece.y + bufferY + 25);
    //     } else {
    //         boardContext.moveTo(piece.x + 25, piece.y);
    //         boardContext.lineTo(piece.x + 25, piece.y + 50);
    //     }
    //   }
    boardContext.stroke();
}

function fillPiece(piece) {
    // Is given a piece and will draw it on canvas
    if (piece.defaultState === "win") {
        piecesContext.shadowOffsetX=0;
        piecesContext.shadowOffsetY=0;
        piecesContext.shadowBlur=28;
        piecesContext.shadowSpread=0;
        piecesContext.shadowColor= 'green';
    } else {
        piecesContext.shadowOffsetX=0;
        piecesContext.shadowOffsetY=0;
        piecesContext.shadowBlur=0;
        piecesContext.shadowSpread=0;
        piecesContext.shadowColor= '';
    }
    piecesContext.beginPath();
    piecesContext.arc(piece.x + piece.w / 2, piece.y + piece.w / 2, piece.w / 2, 0, 2 * Math.PI, false);
    if (piece.ownedBy !== null) {
        piecesContext.fillStyle = piece.ownedBy;
        piecesContext.fill();
    } else if (piece.active === true) {
        piecesContext.fillStyle = 'yellow';
        piecesContext.fill();
    } else {
        piecesContext.clearRect(piece.x, piece.y, piece.w, piece.h);
    }
}

function resetPieces() {
    // Resets attributes of all pieces
    var i;
    for (i = 0; i < moves.length; i += 1) {
        setAttributes(moves[i], {defaultState: 'null', ownedBy: null, active: 'false'});
    }
    piecesContext.clearRect(0, 0, piecesCanvas.width, piecesCanvas.height);
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
    // NOT WORKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var x;
    var y;
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    x -= menuCanvas.offsetLeft;
    y -= menuCanvas.offsetTop;
    console.log("Clicked @:", x, y);
    x -= 10;
    y -= 60;
    console.log("Fudged to:", x, y);
    return {x: x, y: y};
}

function checkEnd(piece) {
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
}

function makeMove(piece) {
    // Given piece that user selected and processes the move
    var i;
    piece.active = false;
    piece.ownedBy = turn;
    moves.push(piece);
    fillPiece(piece);
    console.log(moves.length);
    if (moves.length > 8) {
        if (checkEnd(piece) === true) {
            menuVisible = true
            generateMenu()
            for (i = 0; i < winningPieces.length; i += 1) {
                console.log(i)
                winningPieces[i].defaultState = "win"
                console.log(winningPieces.length)
                fillPiece(winningPieces[i])
            }
            turn = 'orange'
            console.log(piece.ownedBy + " WON!");
        } else {
            console.log("Game On...");
        }
    }
    turn = ((turn === 'black') ? 'orange' : 'black');
}

function populateMenu() {
    options.push(new piece('header', 0, 0, 750, 150, 'z1', '#F5F5F5', true));
    var i;
    for (i = 0; i < 3; i += 1) {
        options.push(new piece(i, 125, 225 + (175 * i), 500, 100, 'z2', '#FFF', true));
    }
}

function fillMenu(option) {
    // Is given an option and will draw it on canvas

    switch (option.defaultState) {
        case 'z1':
            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=2;
            menuContext.shadowBlur=10;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.16)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);

            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=2;
            menuContext.shadowBlur=5;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.26)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);           
            break;
        case 'z2':
            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=6;
            menuContext.shadowBlur=20;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.19)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);

            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=8;
            menuContext.shadowBlur=17;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.2)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);
            break;
        case 'z3':
            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=17;
            menuContext.shadowBlur=50;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.19)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);

            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=12;
            menuContext.shadowBlur=15;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.24)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);
            break;
        case 'z4':
            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=25;
            menuContext.shadowBlur=55;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.21)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);

            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=16;
            menuContext.shadowBlur=28;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.22)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);
            break;
        case 'z5':
            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=40;
            menuContext.shadowBlur=77;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.22)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);

            menuContext.shadowOffsetX=0;
            menuContext.shadowOffsetY=27;
            menuContext.shadowBlur=24;
            menuContext.shadowSpread=0;
            menuContext.shadowColor= 'rgba(0,0,0,.2)';

            menuContext.fillStyle = option.ownedBy;
            console.log(option.ownedBy)
            menuContext.fillRect(option.x, option.y, option.w, option.h);
            break;
    }
}

function generateMenu() {
    var menu;
    var option;
    menuContext.clearRect(0,0,menuCanvas.width,menuCanvas.height);
    if (menuVisible === true) {
        for (option = 0; option < options.length; option += 1) {
            if (options[option].active === true || options[option].named === 'header') {
                fillMenu(options[option]);
            }
        }
    }
}




function mouseDownListener(e) {
    if (menuVisible === true) {
        menuMouseDown(e);
    } else {
        gameMouseDown(e);
    }
}

function mouseUpListener(e) {
    if (menuVisible === true) {
        menuMouseUp(e);
    } else {
        gameMouseUp(e);
    }
}

function mouseMoveListener(e) {
    if (menuVisible === true) {
        menuMouseMove(e);
    } else {
        gameMouseMove(e);
    }
}

function menuMouseDown(e) {
    var mouseLocation;
    var i;
    var pieceHit = false;
    mouseLocation = getMouseLocation(e);
    //console.log(mouseLocation.x + ", " + mouseLocation.y)
    for (i = 0; i < options.length; i += 1) {
        //boogey = options[i].x + options[i].w
        //yegoob = options[i].y + options[i].h
        //console.log(options[i].x + ", " + options[i].y)
        //console.log(boogey +  ", " + yegoob)
        //console.log("")
        if (options[i].checkColliding(mouseLocation) === true && options[i].active === true) {
            pieceHit = true;
            console.log("You Hit : ", options[i].named);
            options[i].defaultState = 'z5';
            menuVisible = false;
            resetPieces()
            options[i].defaultState = 'z2';
            generateMenu()
        } 

    }
    if (pieceHit === false) {
        console.log("You Missed!");
    }
    //
}

function menuMouseUp(e) {
    //
}

function menuMouseMove(e) {
    //
}



function gameMouseDown(e) {
    var mouseLocation;
    var i;
    var pieceHit = false;
    mouseLocation = getMouseLocation(e);
    valid = true;
    menuCanvas.addEventListener('mousemove', mouseMoveListener, false);
    for (i = 0; i < pieces.length; i += 1) {
        if (pieces[i].checkColliding(mouseLocation) === true && pieces[i].ownedBy === null) {
            pieceHit = true;
            console.log("You Hit : ", pieces[i].named);
            pieces[i].active = true;
            fillPiece(pieces[i]);
        } else if (pieces[i].active === true) {
            pieces[i].active = false;
            fillPiece(pieces[i]);
        }
    }
    if (pieceHit === false) {
        console.log("You Missed!");
    }
}

function gameMouseUp(e) {
    var mouseLocation;
    var i;
    if (valid === true) {
        mouseLocation = getMouseLocation(e);
        menuCanvas.removeEventListener('mousemove', mouseMoveListener, false);
        for (i = 0; i < pieces.length; i += 1) {
            if (pieces[i].checkColliding(mouseLocation) === true && pieces[i].ownedBy === null) {
                makeMove(pieces[i]);
            } else if (pieces[i].active === true) {
                pieces[i].active = false;
                fillPiece(pieces[i]);
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
    var pieceHit = false;
    mouseLocation = getMouseLocation(e);
    console.log("you moved!");
    for (i = 0; i < pieces.length; i += 1) {
        if (pieces[i].checkColliding(mouseLocation) === true) {
            if (pieces[i].defaultState !== 'black') {
                pieceHit = true;
                if (pieces[i].active === false) {
                    console.log("You Hit : ", pieces[i].named);
                    pieces[i].active = true;
                    fillPiece(pieces[i]);
                }
            } else {
                pieceHit = true;
                console.log("Space Taken Already!");
            }
        } else if (pieces[i].active === true) {
            pieces[i].active = false;
            fillPiece(pieces[i]);
        }
    }
    if (pieceHit === false) {
        console.log("You Missed!");
    }
}