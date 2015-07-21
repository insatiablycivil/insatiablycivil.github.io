GomokuGame.contentLayer = (function() {
    var contentLayer = {};
    var contentCanvas = document.getElementById("contentLayer");
    var contentContext = contentCanvas.getContext('2d');

    var createHeader = (function() {
        contentContext.fillStyle = 'rgba(255, 255, 255, 1)';
        contentContext.font = '30px Roboto';
        contentContext.fillText("Gomoku", 10, 30);

    });

    var createColourIcons = (function() {
        contentContext.fillStyle = 'rgba(250, 250, 250, 1)';
        contentContext.beginPath();
        contentContext.arc(25, 65, 12, 0, 2 * Math.PI, false);
        contentContext.arc(355, 65, 12, 0, 2 * Math.PI, false);
        contentContext.fill();
    });

    var createDividers = (function () {
        contentContext.strokeStyle = 'rgba(255, 255, 255, 1)';
        contentContext.beginPath();
        contentContext.moveTo(190, 50);
        contentContext.lineTo(190, 100);
        contentContext.moveTo(380, 40);
        contentContext.lineTo(380, 100);
        contentContext.stroke();
        contentContext.beginPath();
        contentContext.strokeStyle = 'rgba(0, 0, 0, 1)';
        contentContext.moveTo(380, 100);
        contentContext.lineTo(380, contentCanvas.height - 60);
        contentContext.stroke();
        contentContext.strokeRect(1, 1, contentCanvas.width - 2,
            contentCanvas.height - 2);
        });

    contentLayer.initialise = (function() {
        createHeader();
        createColourIcons();
        createDividers();
    });

    return contentLayer;
}());