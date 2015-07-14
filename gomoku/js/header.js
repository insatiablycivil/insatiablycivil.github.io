GomokuGame.header = (function () {
    var header = {};

    var statuses = [];

    var getHeader = GomokuGame.getHeader();

    var status = function(named, x, y, w, h, style, text, action, active) {
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

    status.prototype.checkColliding = function(mouseLocation) {
        // Is given mouseLocation and checks whether it is touching the piece
        if (mouseLocation.x >= this.x && mouseLocation.x <= this.x + this.w &&
                mouseLocation.y >= this.y && mouseLocation.y <= this.y + this.h) {
            return true;
        } else {
            return false;
        }
    };


    status.prototype.fillStatus = function() {
        getHeader.context.shadowOffsetX=0;
        getHeader.context.shadowOffsetY=2;
        getHeader.context.shadowBlur=10;
        getHeader.context.shadowSpread=0;
        getHeader.context.shadowColor= 'rgba(0,0,0,.16)';

        getHeader.context.fillStyle = '#FAFAFA';
        console.log(this.text);
        getHeader.context.fillRect(this.x, this.y, this.w, this.h);

        getHeader.context.shadowOffsetX=0;
        getHeader.context.shadowOffsetY=2;
        getHeader.context.shadowBlur=5;
        getHeader.context.shadowSpread=0;
        getHeader.context.shadowColor= 'rgba(0,0,0,.26)';

        getHeader.context.fillStyle = this.ownedBy;
        console.log(this.ownedBy);
        getHeader.context.fillRect(this.x, this.y, this.w, this.h);

        getHeader.context.fillStyle = 'black';
        getHeader.context.font = "25px Georgia";
        getHeader.context.textAlign = "center";
        getHeader.context.shadowOffsetX=0;
        getHeader.context.shadowOffsetY=0;
        getHeader.context.shadowBlur=0;
        getHeader.context.shadowSpread=0;
        getHeader.context.fillText(this.text, this.x + (this.w / 2), this.y + (this.h / 2) + 10, 400);
    };

    var populateStatuses = function() {
        statuses.push(createStatus('black', 0, 0, 250, 100, 'z1',
            'Black', 'closeMenu()', true));
        statuses.push(createStatus('Menu', 250, 0, 250, 100, 'z1',
            'Menu', 'closeMenu()', true));
        statuses.push(createStatus('orange', 500, 0, 250, 100, 'z1',
            'Orange', 'newGame()', true));
    };

    var createStatus = function(named, x, y, w, h, style, text, action, active) {
        var createdOption = new status(named, x, y, w, h, style, text, action, active);
        return createdOption;
    };

    var generateStatuses = function() {
        var menu;
        var status;
        clearStatuses();
        for (status = 0; status < statuses.length; status += 1) {
            statuses[status].fillStatus();
        }
    };

    var clearStatuses = function() {
        getHeader.context.clearRect(0, 0, getHeader.canvas.width, getHeader.canvas.height);
    };

    header.initialise = function() {
        populateStatuses();
        generateStatuses();
    };

    header.mouseDown = function(e) {
        var mouseLocation;
        var i;
        var pieceHit = false;
        mouseLocation = GomokuGame.getMouseLocationHeader(e);
        //console.log(mouseLocation.x + ", " + mouseLocation.y)
        //for (i = 0; i < options.length; i += 1) {
            if (statuses[1].checkColliding(mouseLocation) === true && statuses[1].active === true) {
                pieceHit = true;
                console.log("You Hit : ", statuses[1].named);
                statuses[1].defaultState = 'z5';
                GomokuGame.IO.menu("pauseGame");
                statuses[1].defaultState = 'z2';
            }
        //}
        if (pieceHit === false) {
            console.log("You Missed!");
        }
        //
    };

    header.updateTurn = function(turn) {
        getHeader.context.fillStyle = '#FAFAFA';
        getHeader.context.fillRect(40, 40, 20, 20);
        getHeader.context.fillRect(540, 40, 20, 20);

        getHeader.context.fillStyle = turn;
        if (turn === 'black') {
            getHeader.context.fillRect(40, 40, 20, 20);
        } else {
            getHeader.context.fillRect(540, 40, 20, 20);
        }
    };

    return header;
}());