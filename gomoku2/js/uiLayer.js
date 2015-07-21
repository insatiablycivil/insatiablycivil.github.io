GomokuGame.uiLayer = (function() {
    var uiLayer = {};
    var uiCanvas = document.getElementById("uiLayer");
    var uiContext = uiCanvas.getContext('2d');

    var createBackground = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.46)';
        uiContext.fillRect(0, 100, 380,
            uiCanvas.height - 160);
    });

    var createWelcome = (function() {
        createWelcomeBackground();
        createWelcomeHeader();
    });

    var createWelcomeBackground = (function() {
        uiContext.fillStyle = 'rgba(255, 255, 255, 1)';
        uiContext.fillRect(20, 215, 340, 150);
    });

    var createWelcomeHeader = (function() {
        uiContext.fillStyle = 'rgba(245, 124, 0, 1)';
        uiContext.fillRect(20, 215, 340, 40);
    });

    var createHowToPlay = (function() {
        createHowToPlayHeader();
        createHowToPlayPages(1);
    });

    var createHowToPlayPages = (function(page) {
        uiContext.clearRect(380, 100, 
            uiCanvas.height - 60, 40);
        switch(page) {
            case 1:
                createHowToPlayPage1();
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                console.log("Invalid Page Ordered");
                return;
        }
        createHowToPlaySlider(page);
    });

    var createHowToPlayPage1 = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.font = '18px Roboto';
        uiContext.textAlign = "left";
        uiContext.fillText("(1/5) Background:", 400, 130);

        uiContext.strokeStyle = 'rgba(0, 0, 0, 1)';
        uiContext.fillStyle = 'rgba(255, 255, 255, 1)';
        uiContext.fillRect(445, 145, 170, 170);
        uiContext.strokeRect(445, 145, 170, 170);

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
        uiContext.font = '14px Roboto';
        uiContext.fillStyle = 'rgba(0, 0, 0, 0.87)';
        uiContext.fillText("Gomoko is an abstract strategy", 400, 345);
        uiContext.fillText("game. Also called GoBang or Five", 400, 360);
        uiContext.fillText("in a Row, it is traditionally", 400, 375);
        uiContext.fillText("played with Go pieces (black and", 400, 390);
        uiContext.fillText("white stones).", 400, 405);
        uiContext.font = 'italic 16px Consolas';
        uiContext.textAlign = "right";
        uiContext.fillText("~ Wikipedia", 660, 420);
    });

    var createHowToPlayPage2 = (function() {

    });

    var createHowToPlaySlider = (function(page) {
        uiContext.fillStyle = 'rgba(0, 0, 0, 1)';
        uiContext.fillRect(380, uiCanvas.height - 100, 300, 40);
        uiContext.fillStyle = 'rgba(158, 158, 158, 1)';
        uiContext.beginPath();
        uiContext.arc(25, 65, 3, 0, 2 * Math.PI, false);
        uiContext.fill();
        uiContext.beginPath();
        uiContext.arc(25, 65, 5, 0, 2 * Math.PI, false);
        uiContext.stroke();
    });

    var createHowToPlayHeader = (function() {
        uiContext.fillStyle = 'rgba(0, 0, 0, 1)';
        uiContext.font = '30px Roboto';
        uiContext.textAlign = "center";
        uiContext.fillText("How To Play", 530, 80);
    });

    uiLayer.initialise = (function() {
        createBackground();
        createWelcome();
        createHowToPlay();
    });

    return uiLayer;
}());