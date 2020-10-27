/*jshint esversion: 6 */
var canvas;
var canvasContext;
var Player1Points = 0;
var Player2Points = 0;
var Paddle1YPoints = [];
var Paddle2YPoints = [];
const Paddle1X = 0;
var Paddle1Y = 0;
const Paddle2X = 780;
var Paddle2Y = 0;
const PaddleWidth = 20;
const PaddleHeight = 100;
const BallRadius = 20;
var BallX;
var BallY;
var Slope = 2;
const unit = 10;
const BallSpeed = 2;
var n = 0;
var Direction = "Right";
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    setInterval(game, 100 / 3);
    setInterval(game, 100 / 3);

    BallX = canvas.width / 2;
    BallY = canvas.height / 2;
    canvasContext.beginPath();
    canvasContext.setLineDash([5, 15]);
    canvasContext.moveTo(canvas.width / 2, 0);
    canvasContext.lineTo(canvas.width / 2, canvas.height);
    canvasContext.stroke();
    canvasContext.fillStyle = "white";

    canvasContext.fill();
};

function changeValues(event) {
    switch (event.key) {
        case "w":
            //Go up
            if (Paddle1Y >= unit) {
                Paddle1Y -= unit;
            }
            break;
        case "s":
            //Go down
            if (Paddle1Y <= (canvas.height - unit - PaddleHeight)) {
                Paddle1Y += unit;
            }
            break;
        case "ArrowUp":
            //Go up
            if (Paddle2Y >= unit) {
                Paddle2Y -= unit;
            }
            break;
        case "ArrowDown":
            //Go up
            if (Paddle2Y <= (canvas.height - unit - PaddleHeight)) {
                Paddle2Y += unit;
            }
            break;
    }
}

function game() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(Paddle1X, Paddle1Y, PaddleWidth, PaddleHeight);
    canvasContext.fillRect(Paddle2X, Paddle2Y, PaddleWidth, PaddleHeight);
    for (let i = 0; i < PaddleHeight; i++) {
        Paddle1YPoints[i] = Paddle1Y + i;
        Paddle2YPoints[i] = Paddle2Y + i;
    }
    canvasContext.beginPath();
    canvasContext.arc(BallX, BallY, BallRadius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.fillStyle = 'white';
    canvasContext.fill();
    istouchingpaddle();
    istouchingwall();
    changeBallValues();
}

function istouchingpaddle() {
    if (BallX + BallRadius >= canvas.width - PaddleWidth && Paddle2YPoints.includes(BallY - BallRadius)) {
        Slope = Slope / -1;
        Direction = "Left";
    } else if (BallX - BallRadius <= PaddleWidth && Paddle1YPoints.includes(BallY - BallRadius)) {
        Slope = Slope / -1;
        Direction = "Right";
    }
}

function istouchingwall() {
    if (BallY - BallRadius <= 0) {
        Slope = Slope / -1;
    } else if (BallY + BallRadius >= canvas.height) {
        Slope = Slope / -1;
    } else if (BallX - BallRadius == 0) {
        Player2Points++;
        score.innerText = Player1Points + "-" + Player2Points;
        BallX = canvas.width / 2;
        BallY = canvas.height / 2;
        Slope = 2;
    } else if (BallX + BallRadius >= canvas.width) {
        Player1Points++;
        score.innerText = Player1Points + "-" + Player2Points;
        BallX = canvas.width / 2;
        BallY = canvas.height / 2;
        Slope = 2;
    }
}

function changeBallValues() {
    if (Direction == "Right") {
        BallX += BallSpeed;
        BallY -= BallSpeed * Slope;
    } else {
        BallX -= BallSpeed;
        BallY += BallSpeed * Slope;
    }
}
document.addEventListener("keydown", changeValues);