GomokuGame.IO = (function () {

    var IO = {};

    var getMenu = GomokuGame.getMenu();

    var options = [];
    // Contains list of options 

    var option = function(named, x, y, w, h, style, text, action, active) {
        // Piece constructor
        this.named = named;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.style = style;
        this.text = text;
        this.action = action;
        this.active = active;
        // Active is whether the mouse is currently downpressed upon the piece
        return this;
    };

    option.prototype.checkColliding = function(mouseLocation) {
        // Is given mouseLocation and checks whether it is touching the piece
        if (mouseLocation.x >= this.x && mouseLocation.x <= this.x + this.w &&
                mouseLocation.y >= this.y && mouseLocation.y <= this.y + this.h) {
            return true;
        } else {
            return false;
        }
    };

    option.prototype.fillOption = function() {
        // Is given an option and will draw it on canvas

        switch (this.style) {
            case 'z1':
                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=2;
                getMenu.context.shadowBlur=10;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.16)';

                getMenu.context.fillStyle = '#FAFAFA';
                console.log(this.text);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);

                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=2;
                getMenu.context.shadowBlur=5;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.26)';

                getMenu.context.fillStyle = this.ownedBy;
                console.log(this.ownedBy);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);
                break;
            case 'z2':
                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=6;
                getMenu.context.shadowBlur=20;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.19)';

                getMenu.context.fillStyle = '#FFF';
                console.log(this.text);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);

                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=8;
                getMenu.context.shadowBlur=17;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.2)';

                getMenu.context.fillStyle = this.ownedBy;
                console.log(this.ownedBy);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);
                break;
            case 'z3':
                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=17;
                getMenu.context.shadowBlur=50;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.19)';

                getMenu.context.fillStyle = '#FFF';
                console.log(this.text);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);

                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=12;
                getMenu.context.shadowBlur=15;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.24)';

                getMenu.context.fillStyle = this.ownedBy;
                console.log(this.ownedBy);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);
                break;
            case 'z4':
                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=25;
                getMenu.context.shadowBlur=55;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.21)';

                getMenu.context.fillStyle = '#FFF';
                console.log(this.text);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);

                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=16;
                getMenu.context.shadowBlur=28;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.22)';

                getMenu.context.fillStyle = this.ownedBy;
                console.log(this.ownedBy);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);
                break;
            case 'z5':
                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=40;
                getMenu.context.shadowBlur=77;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.22)';

                getMenu.context.fillStyle = '#FFF';
                console.log(this.text);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);

                getMenu.context.shadowOffsetX=0;
                getMenu.context.shadowOffsetY=27;
                getMenu.context.shadowBlur=24;
                getMenu.context.shadowSpread=0;
                getMenu.context.shadowColor= 'rgba(0,0,0,.2)';

                getMenu.context.fillStyle = this.ownedBy;
                console.log(this.ownedBy);
                getMenu.context.fillRect(this.x, this.y, this.w, this.h);
                break;
        }
        getMenu.context.fillStyle = 'black';
        getMenu.context.font = "25px Georgia";
        getMenu.context.textAlign = "center";
        getMenu.context.shadowOffsetX=0;
        getMenu.context.shadowOffsetY=0;
        getMenu.context.shadowBlur=0;
        getMenu.context.shadowSpread=0;
        getMenu.context.fillText(this.text, this.x + (this.w / 2), this.y + (this.h / 2) + 10, 400);
    };

    var populateNewGameOptions = function() {
        options.push(createOption('header', 0, 0, 750, 150, 'z1',
            'Menu', 'closeMenu()', true));
        options.push(createOption('new', 125, 225, 500, 100, 'z2',
            'New Game', 'newGame()', true));
        // var i;
        // for (i = 0; i < 3; i += 1) {
        //     options.push(createOption(i, 125, 225 + (175 * i), 500, 100, 'z2', '#FFF', true));
        // }
    };

    var populateEndGameOptions = function() {
        options.push(createOption('header', 0, 0, 750, 150, 'z1',
            'Menu', 'closeMenu()', true));
        options.push(createOption('new', 125, 225, 500, 100, 'z2',
            'New Game', 'newGame()', true));
    };

    var populatePauseGameOptions = function() {
        options.push(createOption('header', 0, 0, 750, 150, 'z1',
            'Menu', 'closeMenu()', true));
        options.push(createOption('resume', 125, 225, 500, 100, 'z2',
            'Resume Game', 'closeMenu()', true));
        options.push(createOption('new', 125, 400, 500, 100, 'z2',
            'New Game', 'newGame()', true));
    };

    var createOption = function(named, x, y, w, h, style, text, action, active) {
        var createdOption = new option(named, x, y, w, h, style, text, action, active);
        return createdOption;
    };

    var generateMenu = function() {
        var menu;
        var option;
        clearMenu();
        for (option = 0; option < options.length; option += 1) {
            options[option].fillOption();
        }
    };

    var clearMenu = function() {
        getMenu.context.clearRect(0, 0, getMenu.canvas.width, getMenu.canvas.height);
    };

    IO.menu = function(reason) {
        if ( reason === "initialise") {
            GomokuGame.setMenu(true);
            populateNewGameOptions();
        }
        if (reason === "endGame") {
            GomokuGame.setMenu(true);
            populateEndGameOptions();
        }
        if (reason === "pauseGame") {
            GomokuGame.setMenu(true);
            populatePauseGameOptions();
        }
        generateMenu();
    };

    GomokuGame.setMenu(true, "endGame");

    IO.mouseDown = function(e) {
        var mouseLocation;
        var i;
        var pieceHit = false;
        mouseLocation = GomokuGame.getMouseLocation(e);
        //console.log(mouseLocation.x + ", " + mouseLocation.y)
        for (i = 0; i < options.length; i += 1) {
            if (options[i].checkColliding(mouseLocation) === true && options[i].active === true) {
                pieceHit = true;
                console.log("You Hit : ", options[i].named);
                options[i].defaultState = 'z5';
                clearMenu();
                GomokuGame.setMenu(false);
                if (options[i].named === 'new') {
                    GomokuGame.game.newGame();
                }
                options[i].defaultState = 'z2';
                options = [];
                break;
            }
        }
        if (pieceHit === false) {
            console.log("You Missed!");
        }
        //
    };

    IO.mouseUp = function(e) {
        //
    };

    IO.mouseMove = function(e) {
        //
    };

    return IO;
}());