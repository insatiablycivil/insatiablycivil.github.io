var GomokuGame = (function() {
    var GomokuGame = {};

    GomokuGame.initialise = function() {
        GomokuGame.backgroundLayer.initialise();
        GomokuGame.contentLayer.initialise();
        GomokuGame.uiLayer.initialise();
    };

    return GomokuGame;
}());

GomokuGame.backgroundLayer = (function() {
    var backgroundLayer = {};
    var backgroundCanvas = document.getElementById("backgroundLayer");
    var backgroundContext = backgroundCanvas.getContext('2d');

    var createHeader = (function () {
        backgroundContext.fillStyle = 'rgba(255, 152, 0, 1)';
        backgroundContext.fillRect(0, 0, backgroundCanvas.width, 40);
    });

    var createBanner = (function() {
        backgroundContext.fillStyle = 'rgba(255, 224, 178, 1)';
        backgroundContext.fillRect(0, 40, backgroundCanvas.width, 60);
    });

    var createBody = (function() {
        backgroundContext.fillStyle = 'rgba(250, 250, 250, 1)';
        backgroundContext.fillRect(0, 100, backgroundCanvas.width,
            backgroundCanvas.height - 160);
    });

    var createFooter = (function() {
        backgroundContext.fillStyle = 'rgba(255, 243, 224, 1)';
        backgroundContext.fillRect(0, backgroundCanvas.height - 60,
            backgroundCanvas.width, 60);
    });

    var createBoard = (function() {
        backgroundContext.strokeStyle = 'rgba(0, 0, 0, 1)';
        backgroundContext.fillStyle = 'rgba(255, 255, 255, 1)';
        backgroundContext.fillRect(20, 120, 340, 340);
        backgroundContext.strokeRect(20, 120, 340, 340);
    });

    var createGrid = (function() {
        backgroundContext.strokeStyle = 'rgba(0, 0, 0, 1)';
        backgroundContext.beginPath();
        for (x = 50; x <= 330; x += 20) {
            backgroundContext.moveTo(x, 150);
            backgroundContext.lineTo(x, 430);
        }
        for (y = 150; y <= 430; y += 20) {
            backgroundContext.moveTo(50, y);
            backgroundContext.lineTo(330, y);
        }
        backgroundContext.stroke();
    });

    backgroundLayer.initialise = (function() {
        createHeader();
        createBanner();
        createBody();
        createFooter();
        createBoard();
        createGrid();
    });

    return backgroundLayer;
}());