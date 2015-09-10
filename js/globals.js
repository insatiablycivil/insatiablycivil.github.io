// / directions is not working well
// deal with 4 in a row   _0000 will not work since it cannot tell it apart from _0_00

var really = 20;

var Globals = (function() {
    var Globals = {};

    var backgroundCanvas = document.getElementById("backgroundLayer");
    var backgroundContext = backgroundCanvas.getContext('2d');
    var contentCanvas = document.getElementById("contentLayer");
    var contentContext = contentCanvas.getContext('2d');
    var uiCanvas = document.getElementById("uiLayer");
    var uiContext = uiCanvas.getContext('2d');

    var getMouseLocation = function(e) {
        // Given event and returns mouse coordinates
        var x;
        var y;
        var rect = uiCanvas.getBoundingClientRect();
        if (e !== undefined) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            console.log("Clicked @:", x, y);
            return {x: x, y: y};
        } else {
            console.log("error");
        }
    };

    Globals.gameActive = false;
    Globals.blacktoMove = true;
    Globals.aiSide = [false, true];

    Globals.initialise = function() {

        uiCanvas.addEventListener('mousedown', Globals.mouseDownListener, false);
        uiCanvas.addEventListener('mouseup', Globals.mouseUpListener, false);
        uiCanvas.addEventListener('mouseout', Globals.temp, false);

        var loadFont = (function() {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'css';
            link.href = 'http://fonts.googleapis.com/css?family=Roboto';
            document.getElementsByTagName('head')[0].appendChild(link);
        }());
        setTimeout("GomokuGame.initialise()", 5);
        GomokuGame.ai.initialise(14, 14);
    };

    Globals.mouseDownListener = function(e) {
        var mouse = getMouseLocation(e);
        uiCanvas.addEventListener('mousemove', Globals.mouseMoveListener, false);
    };

    Globals.mouseUpListener = function(e) {
        var mouse = getMouseLocation(e);
        uiCanvas.removeEventListener('mousemove', Globals.mouseMoveListener, false);
        if (Globals.gameActive === true &&
            mouse.x >= 40 && mouse.x <= 340 &&
            mouse.y >= 140 && mouse.y <= 440 ) {
            GomokuGame.contentLayer.checkCollision(mouse);
        }
        GomokuGame.uiLayer.checkCollision(mouse);
    };

    Globals.temp = function(e) {
        uiCanvas.removeEventListener('mousemove', Globals.mouseMoveListener, false);
    };

    Globals.mouseMoveListener = function(e) {
        var mouse = getMouseLocation(e);
    };

    Globals.checkCollision = function(item, mouse) {
        if (isNaN(item.hbx) || isNaN(item.hby) || isNaN(item.hbw) || isNaN(item.hbh)) {
            console.log("Error: Invalid Hitbox Dimensions\n\'hbx\', \'hby\', \'hbw\' and \'hbh\' must all be numbers.");
        }
        if (isNaN(mouse.x) || isNaN(mouse.y)) {
            console.log("Error: Invalid Mouse Location\n\'mouse.x\' and \'mouse.y\' must be numbers.");
            return null;
        }
        if (mouse.x >=  item.hbx && mouse.x <= item.hbx + item.hbw &&
            mouse.y >=  item.hby && mouse.y <= item.hby + item.hbh) {
            return true;
        }
        return false;
    };

    Globals.createDecor = function(name, shape, context, x, y, w, h, colour, linew, lineColour) {
        var item = {};
        
        if (shape !== "rectangle" && shape !== "circle") {
            console.log("Error: Invalid Shape\nMust be either: \'rectangle\', \'circle\'.");
        }
        if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h) || isNaN(linew)) {
            console.log("Error: Invalid Dimensions\n\'x\', \'y\', \'w\', \'h\' and \'linew\' must all be numbers.");
            return;
        }

        item.name = name;
        item.shape = shape;
        item.context = context;
        item.x = x;
        item.y = y;
        item.w = w;
        item.h = h;
        item.colour = colour;
        item.linew = linew;
        item.lineColour = lineColour;

        return item;
    };

    Globals.createPiece = function(name, x, y, w, h, colour, linew, lineColour, hbx, hby, hbw, hbh) {
        var item = Globals.createDecor(name, "circle", contentContext, x, y, w, h, colour, linew, lineColour);

        if (isNaN(hbx) || isNaN(hby) || isNaN(hbw) || isNaN(hbh)) {
            console.log("Error: Invalid Dimensions\n\'hbx\', \'hby\', \'hbw\' and \'hbh\' must all be numbers.");
            return;
        }

        item.hbx = hbx;
        item.hby = hby;
        item.hbw = hbw;
        item.hbh = hbh;
        
        return item;
    };

    Globals.createButton = function(name, shape, context, x, y, w, h, colour, linew, lineColour, hbx, hby, hbw, hbh, active) {
        var item = Globals.createDecor(name, shape, context, x, y, w, h, colour, linew, lineColour);

        if (isNaN(hbx) || isNaN(hby) || isNaN(hbw) || isNaN(hbh)) {
            console.log("Error: Invalid Dimensions\n\'hbx\', \'hby\', \'hbw\' and \'hbh\' must all be numbers.");
            return;
        }
        if (typeof active !== 'boolean') {
            console.log("Error: Invalid State\n\'active\' must be a boolean.");
            return;
        }

        item.hbx = hbx;
        item.hby = hby;
        item.hbw = hbw;
        item.hbh = hbh;
        item.active = active;
        
        return item;
    };

    Globals.draw = function(item) {
        console.log(item.name)
        item.context.fillStyle = item.colour;
        item.context.lineWidth = item.linew;
        item.context.strokeStyle = item.lineColour;

        if (item.shape === "rectangle") {
            item.context.fillRect(item.x, item.y, item.w, item.h);
            item.context.strokeRect(item.x, item.y, item.w, item.h);
        } else if (item.shape === "circle") {
            item.context.beginPath();
            item.context.arc(item.x, item.y, item.w, 0, 2 * Math.PI, false);
            item.context.fill();
            item.context.stroke();
        } else {
            console.log("Error: Invalid Shape\nMust be either: \'rectangle\', \'circle\'.");
            return;
        }
    };

    Globals.promptAI = function(column, row) {
        var move;
        if (Globals.blacktoMove === true) {
            move = GomokuGame.ai.makeMove(column, row, 0);
            GomokuGame.contentLayer.makeMove(move.column, move.row);
        } else {
            move = GomokuGame.ai.makeMove(column, row, 1);
            GomokuGame.contentLayer.makeMove(move.column, move.row);
        }
    };

    return Globals;
}());

var GomokuGame = (function() {
    var GomokuGame = {};

    GomokuGame.initialise = function() {
        GomokuGame.backgroundLayer.initialise();
        GomokuGame.contentLayer.initialise();
        GomokuGame.uiLayer.initialise();
    };

    GomokuGame.restart = function() {
        GomokuGame.contentLayer.restart();
        GomokuGame.ai.restart();
    };

    return GomokuGame;
}());