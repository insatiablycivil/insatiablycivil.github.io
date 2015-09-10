GomokuGame.uiLayer = (function() {
    var uiLayer = {};
    var uiCanvas = document.getElementById("uiLayer");
    var uiContext = uiCanvas.getContext('2d');
    var uiElements = {};
    var uiButtons = {};
    var flag = false;

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

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 250, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 260, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 270, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 260, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 230, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        // Draws some black pieces for board

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 250, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 240, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 240, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 280, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        // Draws some orange pieces for board

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
        uiContext.fillText("(2/5) Instructions:", 400, 130);

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

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 230, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        // Draws some black pieces for board

        uiContext.font = '14px Roboto';
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.fillText("Blacks move first.", 400, 345);
        uiContext.fillText("Stones are placed on the intersections", 400, 375);
        uiContext.fillText("of the grid lines of the board.", 400, 395);
        uiContext.fillText("One piece is placed at a time and once", 400, 425);
        uiContext.fillText("placed, cannot be moved.", 400, 445);
    });

    var createHowToPlayPage3 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(3/5) Instructions (Cont.):", 400, 130);

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

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 230, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        // Draws some black pieces for board

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 520, 230, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        // Draws some orange pieces for board

        uiContext.font = '14px Roboto';
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.fillText("Orange moves second.", 400, 345);
        uiContext.fillText("", 400, 355);
        uiContext.fillText("Stones cannot be placed on top of", 400, 375);
        uiContext.fillText("another.", 400, 395);
    });

    var createHowToPlayPage4 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(4/5) How to Win:", 400, 130);

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

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 470, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 480, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 490, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 250, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 260, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 270, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 280, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 290, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 470, 250, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 480, 260, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 490, 270, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 280, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 290, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 580, 180, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 570, 190, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 560, 200, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 550, 210, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        // Draws some orange pieces for board

        uiContext.font = '14px Roboto';
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.fillText("Place 5 pieces consecutively to win.", 400, 345);
        uiContext.fillText("They can be placed in any order and", 400, 375);
        uiContext.fillText("any orientation.", 400, 395);
        uiContext.font = 'italic 14px Roboto';
        uiContext.fillText("Please note: this version does not", 400, 435);
        uiContext.fillText("include overlines nor the rule of four", 400, 455);
        uiContext.fillText("and four.", 400, 475);
    });

    var createHowToPlayPage5 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px "Roboto"';
        uiContext.textAlign = "left";
        uiContext.fillText("(5/5) Counterplay:", 400, 130);

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

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 470, 170, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 480, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 490, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 250, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 260, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 270, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 280, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 290, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 470, 250, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 480, 260, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 490, 270, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 500, 280, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 510, 290, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));

        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 590, 170, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 580, 180, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 570, 190, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 560, 200, 4, 4,
            'rgba(38, 50, 56, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        Globals.draw(Globals.createDecor("junk", "circle", uiContext, 550, 210, 4, 4,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0.87)'));
        // Draws some orange and black pieces for board

        uiContext.font = '14px Roboto';
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.fillText("The opponent can block victory by", 400, 345);
        uiContext.fillText("occupying squares that would have", 400, 365);
        uiContext.fillText("enabled a player to create a string.", 400, 385);
        uiContext.fillText("of 5 pieces.", 400, 405);
        uiContext.font = 'italic 14px Roboto';
        uiContext.fillText("Think Tic-tac-toe, but here the goal", 400, 435);
        uiContext.fillText("is to connect 5, not just 3.", 400, 455);
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

    var displayEndGame = function(colour) {
        Globals.draw(uiElements['greyOut']);
        Globals.draw(uiElements['nameHeader']);
        Globals.draw(uiElements['nameBg']);

        Globals.draw(uiButtons['again']);
        uiButtons['again'].active = true;
        Globals.draw(uiButtons['change']);
        uiButtons['change'].active = true;

        uiContext.font = '20px Roboto';
        uiContext.textAlign = 'left';
        uiContext.fillStyle = 'rgba(255, 255, 255, 1)';

        if (colour === 'rgba(38, 50, 56, 1)') {
            colour = 'Black Side';
        } else {
            colour = 'Orange Side';
        }

        uiContext.fillText("Congratulations " + colour + "!", 35, 243);

        uiContext.font = '14px Roboto';
        uiContext.textAlign = 'left';
        uiContext.fillStyle = 'rgba(0, 0, 0, .54)';
        uiContext.fillText("You Win!", 60, 290);
        uiContext.fillText("Click New Game to change settings", 60, 315);

        uiContext.font = '14px Roboto';
        uiContext.textAlign = 'right';
        uiContext.fillStyle = 'rgba(255, 152, 0, 1)';
        uiContext.fillText("New Game", 110, 355);
        uiContext.fillText("Play Again", 340, 355);
        Globals.blacktoMove = true;
    };

    var displayWelcome = function() {
        Globals.draw(uiElements['greyOut']);
        Globals.draw(uiElements['nameHeader']);
        Globals.draw(uiElements['nameBigBg']);
        Globals.draw(uiElements['AIrOff']);
        Globals.draw(uiElements['AIcOffa']);
        Globals.draw(uiElements['AIcOffb']);

        Globals.draw(uiButtons['continue']);
        uiButtons['continue'].active = true;
        Globals.draw(uiButtons['AI']);
        uiButtons['AI'].active = true;

        uiContext.font = '20px Roboto';
        uiContext.textAlign = 'left';
        uiContext.fillStyle = 'rgba(255, 255, 255, 1)';
        uiContext.fillText("Welcome!", 35, 243);
        
        uiContext.font = '14px Roboto';
        uiContext.textAlign = 'left';
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.54)';
        uiContext.fillText("Hello!", 40, 290);
        uiContext.fillText("Please choose your opponent:", 40, 320);
        uiContext.fillText("Play Against AI:", 40, 360);
        uiContext.fillText("Press Continue when ready to begin", 40, 400);

        uiContext.font = '14px Roboto';
        uiContext.textAlign = 'right';
        uiContext.fillStyle = 'rgba(255, 152, 0, 1)';
        uiContext.fillText("CONTINUE", 340, 445);
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

    uiLayer.gameOver = function(colour) {
        // Creates Game Over message
        displayEndGame(colour);
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
            20, 255, 340, 120,
            'rgba(255, 255, 255, 1)', 1, 'rgba(0, 0, 0, 0.87)');

        uiElements['nameBigBg'] = Globals.createDecor(
            'nameBg', 'rectangle', uiContext,
            20, 255, 340, 210,
            'rgba(255, 255, 255, 1)', 1, 'rgba(0, 0, 0, 0.87)');

        uiElements['AIrOn'] = Globals.createDecor(
            'AIrOn', 'rectangle', uiContext,
            290, 350, 30, 10,
            'rgba(275, 154, 30, 1)', 0, 'rgba(0, 0, 0, 0)');

        uiElements['AIcOna'] = Globals.createDecor(
            'AIcOna', 'circle', uiContext,
            320, 355, 5, 5,
            'rgba(275, 154, 30, 1)', 0, 'rgba(0, 0, 0, 0)');

        uiElements['AIcOnb'] = Globals.createDecor(
            'AIcOnb', 'circle', uiContext,
            290, 355, 10, 10,
            'rgba(245, 124, 0, 1)', 0, 'rgba(0, 0, 0, 0)');

        uiElements['AIrOff'] = Globals.createDecor(
            'AIrOff', 'rectangle', uiContext,
            290, 350, 30, 10,
            'rgba(150, 150, 150, 1)', 0, 'rgba(0, 0, 0, 0)');

        uiElements['AIcOffa'] = Globals.createDecor(
            'AIa', 'circle', uiContext,
            290, 355, 5, 5,
            'rgba(150, 150, 150, 1)', 0, 'rgba(0, 0, 0, 0)');

        uiElements['AIcOffb'] = Globals.createDecor(
            'AIb', 'circle', uiContext,
            320, 355, 10, 10,
            'rgba(120, 120, 120, 1)', 0, 'rgba(0, 0, 0, 0)');

        uiButtons['AI'] = Globals.createButton(
            'AI', 'rectangle', uiContext, 270, 340, 70, 30,
            'rgba(0, 0, 0, 0)', 0, 'rgba(0, 0, 0, 0)',
            260, 340, 90, 30, true);

        uiButtons['AI']['action'] = function() {
            uiContext.fillStyle= "white";
            uiContext.fillRect(272, 343, 65, 22);
            if (flag === false) {
                Globals.draw(uiElements['AIrOn']);
                Globals.draw(uiElements['AIcOna']);
                Globals.draw(uiElements['AIcOnb']);
                Globals.aiSide = [false, true];
                flag = true;
            } else {
                Globals.draw(uiElements['AIrOff']);
                Globals.draw(uiElements['AIcOffa']);
                Globals.draw(uiElements['AIcOffb']);
                Globals.aiSide = [false, false];
                flag = false;
            }
        };

        uiButtons['continue'] = Globals.createButton(
            'continue', 'rectangle', uiContext, 260, 425, 90, 30,
            'rgba(0, 0, 0, 0)', 1, 'rgba(0, 0, 0, 0.54)',
            260, 425, 90, 30, true);

        uiButtons['continue']['action'] = function() {
            uiButtons['continue'].active = false;
            uiButtons['AI'].active = false;
            var length;
            var i;
            uiContext.clearRect(0, 100, 380, uiCanvas.height - 160);
            Globals.gameActive = true;
        };

        uiButtons['again'] = Globals.createButton(
            'Play Again?', 'rectangle', uiContext, 260, 335, 90, 30,
            'rgba(0, 0, 0, 0)', 1, 'rgba(0, 0, 0, 0.54)',
            260, 335, 90, 30, false);

        uiButtons['again']['action'] = function() {
            uiButtons['again'].active = false;
            var length;
            var i;
            GomokuGame.restart();
            uiContext.clearRect(0, 100, 380, uiCanvas.height - 160);
            Globals.gameActive = true;
        };

        uiButtons['change'] = Globals.createButton(
            'change', 'rectangle', uiContext, 30, 335, 90, 30,
            'rgba(0, 0, 0, 0)', 1, 'rgba(0, 0, 0, 0.54)',
            30, 335, 90, 30, false);

        uiButtons['change']['action'] = function() {
            Globals.aiSide = [false, false];
            flag = false;
            uiButtons['change'].active = false;
            uiButtons['again'].active = false;
            uiContext.clearRect(0, 100, 380, uiCanvas.height - 160);
            GomokuGame.restart();
            displayWelcome();
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
