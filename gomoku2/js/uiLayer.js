GomokuGame.uiLayer = (function() {
    var uiLayer = {};
    var uiCanvas = document.getElementById("uiLayer");
    var uiContext = uiCanvas.getContext('2d');
    var uiElements = {};
    var uiButtons = {};

    var createHowToPlay = (function() {
        // Creates how to play section on right side
        createHowToPlayHeader();
        createHowToPlaySlider();
        createHowToPlayPages(1);
    });

    var createHowToPlayHeader = (function() {
        // Creates header of the how to play section
        uiContext.fillStyle = 'rgba(0, 0, 0, 1)';
        uiContext.font = '30px Roboto';
        uiContext.textAlign = "center";
        uiContext.fillText("How To Play", 530, 80);
    });

    var createHowToPlayPages = (function(page) {
        // Creates the page number given
        uiContext.clearRect(380, 100, 300, uiCanvas.height - 100);
        switch(page) {
            case 1:
                createHowToPlayPage1();
                break;
            case 2:
                createHowToPlayPage2();
                break;
            case 3:
                createHowToPlayPage3();
                break;
            case 4:
                createHowToPlayPage4();
                break;
            case 5:
                createHowToPlayPage5();
                break;
            default:
                console.log("Invalid Page Ordered");
                return;
        }
        createHowToPlaySlider(page);
    });

    var createHowToPlayPage1 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(1/5) Background:", 400, 130);

        uiContext.strokeStyle = 'rgba(0, 0, 0, 1)';
        uiContext.fillStyle = 'rgba(255, 255, 255, 1)';
        uiContext.fillRect(445, 145, 170, 170);
        uiContext.strokeRect(445, 145, 170, 170);
        // Draws mini-board

        uiContext.strokeStyle = 'rgba(0, 0, 0, 1)';
        uiContext.beginPath();
        for (x = 460; x <= 600; x += 10) {
            uiContext.moveTo(x, 160);
            uiContext.lineTo(x, 300);
        }
        for (y = 160; y <= 300; y += 10) {
            uiContext.moveTo(460, y);
            uiContext.lineTo(600, y);
        }
        uiContext.stroke();
        // Draws mini-grid for board

        uiContext.font = '14px Roboto';
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.fillText("Gomoko is an abstract strategy", 400, 345);
        uiContext.fillText("game. Also called GoBang or Five", 400, 365);
        uiContext.fillText("in a Row, it is traditionally", 400, 385);
        uiContext.fillText("played with Go pieces (black and", 400, 405);
        uiContext.fillText("white stones).", 400, 425);
        uiContext.font = 'italic 16px Consolas';
        uiContext.textAlign = "right";
        uiContext.fillText("~ Wikipedia", 660, 445);
    });

    var createHowToPlayPage2 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(2/5) Test:", 400, 130);
    });

    var createHowToPlayPage3 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(3/5) Test:", 400, 130);
    });

    var createHowToPlayPage4 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(4/5) Test:", 400, 130);
    });

    var createHowToPlayPage5 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(5/5) Test:", 400, 130);
    });

    var createHowToPlaySlider = (function(page) {
        // Creates the ui that allows switching of pages
        var pages;
        var spacer = ((300 - ((5 * (5 * 2)) + (4 * 20))) / 2) + 5;
        // (total width - ((number of pages * diameter of circles) 
        // + (number of spaces * spacing)) / 2) + diameter of circle

        var length;
        var i;

        if (page === undefined) {
            for (pages = 1; pages <= 5; pages += 1) {
                uiButtons['sliderB' + pages] = Globals.createButton(
                    'sliderB' + pages, 'circle', uiContext,
                    380 + spacer + (20 * pages), uiCanvas.height - 80, 5, -1,
                    'rgba(0, 0, 0, 0)', 2, 'rgba(0, 0, 0, 0.54)',
                    380 + spacer + (20 * pages) - 8, uiCanvas.height - 80 - 8,
                    16, 16, true);
                uiButtons['sliderB' + pages]['action'] = (function() {
                    var page = pages;
                    return function() {
                        console.log(page);
                        createHowToPlayPages(page);
                    };
                }());
            }
        } else {
            length = uiButtons.length;
            Globals.draw(uiButtons['sliderB1']);
            Globals.draw(uiButtons['sliderB2']);
            Globals.draw(uiButtons['sliderB3']);
            Globals.draw(uiButtons['sliderB4']);
            Globals.draw(uiButtons['sliderB5']);

            Globals.draw(
                Globals.createDecor('sliderSelected', 'circle',
                    uiContext, 380 + spacer + (20 * page),
                    uiCanvas.height - 80, 3, -1,
                    'rgba(0, 0, 0, 0.70)', 0, 'rgba(0, 0, 0, 0)'));
       }
    });

    var startGame = function() {
        uiButtons['continue'].active = false;

        uiContext.clearRect(0, 100, 380, uiCanvas.height - 160);

        Globals.gameActive = true;
    };

    var displayEndGame = function() {
        Globals.draw(uiElements['greyOut']);
    };

    var displayWelcome = function() {
        Globals.draw(uiElements['greyOut']);
        Globals.draw(uiElements['nameHeader']);
        Globals.draw(uiElements['nameBg']);

        Globals.draw(uiButtons['continue']);

        uiContext.font = '20px Roboto';
        uiContext.textAlign = 'left';
        uiContext.fillStyle = 'rgba(255, 255, 255, 1)';
        uiContext.fillText("Welcome!", 35, 243);

        uiContext.font = 'bold 14px Roboto';
        uiContext.textAlign = 'right';
        uiContext.fillStyle = 'rgba(255, 152, 0, 1)';
        uiContext.fillText("CONTINUE", 340, 345);
    };

    uiLayer.checkCollision = function(mouse) {
        var length;
        var i;

        for (var property in uiButtons) {
            if (uiButtons.hasOwnProperty(property)) {
                if (uiButtons[property]['active'] === true) {
                    if (Globals.checkCollision(uiButtons[property],mouse) === true) {
                        console.log(uiButtons[property]['name']);
                        uiButtons[property]['action']();
                    }
                }
            }
        }
    };

    uiLayer.gameOver = function() {
        // Creates Game Over message
        displayWelcome();
    };

    uiLayer.initialise = function() {
        // Creates visual elements of ui layer
        uiElements['greyOut'] = Globals.createDecor(
            'greyOut', 'rectangle', uiContext,
            0, 100, 380, uiCanvas.height - 160,
            'rgba(0, 0, 0, 0.46)', 0, 'rgba(0, 0, 0, 0.87)');

        uiElements['nameHeader'] = Globals.createDecor(
            'nameHeader', 'rectangle', uiContext,
            20, 215, 340, 40,
            'rgba(245, 124, 0, 1)', 1, 'rgba(0, 0, 0, 0.87)');

        uiElements['nameBg'] = Globals.createDecor(
            'nameBg', 'rectangle', uiContext,
            20, 255, 340, 110,
            'rgba(255, 255, 255, 1)', 1, 'rgba(0, 0, 0, 0.87)');

        uiButtons['continue'] = Globals.createButton(
            'continue', 'rectangle', uiContext, 260, 325, 90, 30,
            'rgba(0, 0, 0, 0)', 1, 'rgba(0, 0, 0, 0.54)',
            260, 325, 90, 30, true);

        uiButtons['continue']['action'] = function() {
            var length;
            var i;
            uiContext.clearRect(0, 100, 380, uiCanvas.height - 160);
            Globals.gameActive = true;
        };

        // uiButtons['undo'] = Globals.createButton(
        //     'undo', 'rectangle', uiContext, 260, 380, 90, 30,
        //     'rgba(0, 0, 0, 0)', 1, 'rgba(0, 0, 0, 0.54)',
        //     260, 325, 90, 30, true);
        
        // uiButtons['undo']['action'] = function() {
        //     var length;
        //     var i;
        //     uiContext.clearRect(0, 100, 380, uiCanvas.height - 160);
        //     Globals.gameActive = true;
        // };

        // Globals.draw(uiButtons['undo']);

        displayWelcome();

        createHowToPlay();
    };

    return uiLayer;
}());