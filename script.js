document.body.addEventListener('keydown', keyDown);
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
let speed = 7;
let tileCount = 20;
let tileSize = canvas.clientWidth / tileCount - 2;
let headX = 10;
let headY = 10;
let xDirection = 0;
let yDirection = 0;
let appleX = 5;
let appleY = 5;
let score = 0;
const snakeParts = [];
class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let tailLength = 1;
function drawSnake() {
    context.fillStyle = 'orange';
    context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    context.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    context.fillStyle = 'orange';
    context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function keyDown(event) {
    if (event.keyCode == 38) {
        yDirection = -1;
        xDirection = 0;
    }
    if (event.keyCode == 40) {
        yDirection = 1;
        xDirection = 0;
    }

    if (event.keyCode == 37) {
        yDirection = 0;
        xDirection = -1;
    }
    if (event.keyCode == 39) {
        yDirection = 0;
        xDirection = 1;
    }
}
function keyDown(event) {
    if (event.keyCode == 38) {
        if (yDirection == 1)
            return;
        yDirection = -1;
        xDirection = 0;
    }

    if (event.keyCode == 40) {
        if (yDirection == -1)
            return;
        yDirection = 1;
        xDirection = 0;
    }
    if (event.keyCode == 37) {
        if (xDirection == 1)
            return;
        yDirection = 0;
        xDirection = -1;
    }
    if (event.keyCode == 39) {
        if (xDirection == -1)
            return;
        yDirection = 0;
        xDirection = 1;
    }
}

function drawScore() {
    context.fillStyle = 'white';
    context.font = "10px verdana";
    context.fillText("Счёт: " + score, canvas.clientWidth - 50, 10);
}

function drawApple() {
    context.fillStyle = 'red';
    context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xDirection;
    headY = headY + yDirection;
}

function checkCollision() {
    if (appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

function drawGame() {

 

    clearScreen();
    drawSnake();
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    drawApple();
    checkCollision();
    drawScore();

    setTimeout(drawGame, 1000 / speed);
}
function clearScreen() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}

function isGameOver() {
    let gameOver = false;
    if (yDirection === 0 && xDirection === 0) {
        return false;
    }
    if (headX < 0) {
        gameOver = true;
    }
    else if (headX === tileCount) {
        gameOver = true;
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY === tileCount) {
        gameOver = true;
    }
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        context.fillStyle = 'white';
        context.font = "50px verdana";
        context.fillText(`   Счет ${score} ` , canvas.clientWidth / 6.5, canvas.clientHeight / 2);
        setTimeout(() => {
            location.reload()    
        }, 2000);
    
    }

    return gameOver;
}

drawGame();