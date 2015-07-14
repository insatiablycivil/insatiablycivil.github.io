var GomokuGame = (function () {
    // Private Variables
    var GomokuGame = {};

    var valid = false;
    // Toggles if mouse is clicked when on canvas
    var menuVisible = true;
    // Toggles if menu is visible

    var IOCanvas = document.getElementById("canvasMenu");
    var IOContext = IOCanvas.getContext('2d');
    // Will take event listeners and host menu

    var headerCanvas = document.getElementById("canvasHeader");
    var headerContext = headerCanvas.getContext('2d');
    // Will host game status

    var piecesCanvas = document.getElementById("canvasPieces");
    var piecesContext = piecesCanvas.getContext('2d');
    // Will host game pieces

    var boardCanvas = document.getElementById("canvasBoard");
    var boardContext = boardCanvas.getContext('2d');
    // Will host game board

    GomokuGame.initialise = function() {
        IOCanvas.addEventListener('mousedown', GomokuGame.mouseDownListener, false);
        IOCanvas.addEventListener('mouseup', GomokuGame.mouseUpListener, false);
        headerCanvas.addEventListener('mousedown', GomokuGame.mouseDownListenerHeader, false);
        GomokuGame.header.initialise();
        GomokuGame.IO.menu("initialise");
        GomokuGame.game.initialise();
    };

    GomokuGame.setAttributes = function(element, attributes) {
        // Helper function
        var key;
        for (key in attributes) {
            element[key] = attributes[key];
        }
    };

    GomokuGame.getMenu = function() {
        return {
            canvas : IOCanvas,
            context : IOContext
        };
    };

    GomokuGame.getHeader = function() {
        return {
            canvas : headerCanvas,
            context : headerContext
        };
    };

    GomokuGame.getPieces = function() {
        return {
            canvas : piecesCanvas,
            context : piecesContext
        };
    };

    GomokuGame.getBoard = function() {
        return {
            canvas : boardCanvas,
            context : boardContext
        };
    };

    GomokuGame.getMouseLocation = function(e) {
        // Given event and returns mouse coordinates
        var x;
        var y;
        var rect = boardCanvas.getBoundingClientRect();
        if (e !== undefined) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            console.log("Clicked @:", x, y);
            return {x: x, y: y};
        } else {
            console.log("error");
        }
    };

    GomokuGame.getMouseLocationHeader = function(e) {
        // Given event and returns mouse coordinates
        var x;
        var y;
        var rect = headerCanvas.getBoundingClientRect();
        if (e !== undefined) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            console.log("Clicked @:", x, y);
            return {x: x, y: y};
        } else {
            console.log("error");
        }
    };


    GomokuGame.mouseDownListenerHeader = function(e) {
        //if (menuVisible === true) {
            GomokuGame.header.mouseDown(e);
        //} else {
            //GomokuGame.game.mouseDown(e);
        //}
    };

    GomokuGame.mouseDownListener = function(e) {
        if (menuVisible === true) {
            GomokuGame.IO.mouseDown(e);
        } else {
            GomokuGame.game.mouseDown(e);
        }
    };

    GomokuGame.mouseUpListener = function(e) {
        if (menuVisible === true) {
            GomokuGame.IO.mouseUp(e);
        } else {
            GomokuGame.game.mouseUp(e);
        }
    };

    GomokuGame.mouseMoveListener = function(e) {
        //if (menuVisible === true) {
        //    GomokuGame.IO.MouseMove(e);
        //} else {
            GomokuGame.game.mouseMove(e);
        //}
    };

    GomokuGame.setMouseMove = function(set) {
        if (set === true) {
            IOCanvas.addEventListener('mousemove', GomokuGame.mouseMoveListener, false);
        } else {
            IOCanvas.removeEventListener('mousemove', GomokuGame.mouseMoveListener, false);
        }
    };

    GomokuGame.setMenu = function(set) {
        // reason = start | end | pause
        if (set === true) {
            menuVisible = true;
        } else {
            menuVisible = false;
        }
    };

    GomokuGame.getMenuVisible = function() {
        return menuVisible;
    };
    return GomokuGame;
}());