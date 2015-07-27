GomokuGame.backgroundLayer = (function() {
    var backgroundLayer = {};
    var backgroundCanvas = document.getElementById("backgroundLayer");
    var backgroundContext = backgroundCanvas.getContext('2d');
    var backgroundElements = [];

    var drawGrid = (function() {
        // Creates grid of the game board
        backgroundContext.strokeStyle = 'rgba(0, 0, 0, 1)';
        backgroundContext.lineWidth = 1;
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
        // Creates visual elements of background layer
        var length;
        var i;

        backgroundElements.push(
            Globals.createDecor('Header', 'rectangle', backgroundContext,
            0, 0, backgroundCanvas.width, 40,
            'rgba(255, 152, 0, 1)', 1, 'rgba(0, 0, 0, 0.87)'));

        backgroundElements.push(
            Globals.createDecor('Banner', 'rectangle', backgroundContext,
            0, 40, backgroundCanvas.width, 60,
            'rgba(255, 224, 178, 1)', 1, 'rgba(0, 0, 0, 0.87)'));

        backgroundElements.push(
            Globals.createDecor('Body', 'rectangle', backgroundContext,
            0, 100, backgroundCanvas.width, backgroundCanvas.height - 160,
            'rgba(250, 250, 250, 1)', 1, 'rgba(0, 0, 0, 0.87)'));

        backgroundElements.push(
            Globals.createDecor('Footer', 'rectangle', backgroundContext,
            0, backgroundCanvas.height - 60, backgroundCanvas.width,
            60,'rgba(255, 243, 224, 1)', 1, 'rgba(0, 0, 0, 0.87)'));

        backgroundElements.push(
            Globals.createDecor('Board', 'rectangle', backgroundContext,
            20, 120, 340, 340,
            'rgba(255, 255, 255, 1)', 3, 'rgba(0, 0, 0, 0.87)'));

        length = backgroundElements.length;
        for (i = 0; i < length; i += 1) {
            Globals.draw(backgroundElements[i]);
        }

        drawGrid();
    });

    return backgroundLayer;
}());