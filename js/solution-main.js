const raceCanvas = document.getElementById("canvas");
const context = raceCanvas.getContext("2d");


document.getElementById("game-board").style.display = "none";
document.getElementById('start-button').onclick = () => {
    document.getElementById("game-board").style.display = "block";
    startGame();
};

let currentGame;

function startGame() {
    //Instantiate a new game
    currentGame = new Game();
    currentGame.car = new Car();
    currentGame.car.draw();
    cancelAnimationFrame(currentGame.animationId);
    updateCanvas();
}

function drawObstacles() {
    currentGame.obstaclesFrequency++;
    if (currentGame.obstaclesFrequency % 100 === 1) {
        const randomObstacleX = Math.floor(Math.random() * 450);
        const randomObstacleY = 0;
        const randomObstacleWidth = Math.floor(Math.random() * (50 - 20 + 1) + 20);
        const randomObstacleHeight = Math.floor(Math.random() * (50 - 20 + 1) + 20);

        const newObstacle = new Obstacle(
            randomObstacleX,
            randomObstacleY,
            randomObstacleWidth,
            randomObstacleHeight,
        );

        currentGame.obstacles.push(newObstacle);
    }

    currentGame.obstacles.forEach((obstacle, index) => {
        obstacle.y += 1;
        obstacle.draw();

        //Check collision
        if (detectCollision(obstacle)) {
            currentGame.gameOver = true;
            currentGame.obstaclesFrequency = 0;
            currentGame.score = 0;
            currentGame.obstacles = [];
            document.getElementById("score").innerText = 0;
            document.getElementById("game-board").style.display = "none";
            cancelAnimationFrame(currentGame.animationId)
            alert("BOOOM! GAME OVER!")
        }

        if (obstacle.y > raceCanvas.height) {
            currentGame.score ++;
            document.getElementById("score").innerText = currentGame.score;
            currentGame.obstacles.splice(index, 1);
        }
    });
}

function detectCollision(obstacle) {
    return !(
        currentGame.car.left() > obstacle.right() ||
        currentGame.car.right() < obstacle.left() ||
        currentGame.car.top() > obstacle.bottom()
    );
}

function updateCanvas() {
    context.clearRect(0, 0, raceCanvas.clientWidth, raceCanvas.clientHeight);
    currentGame.car.draw();
    drawObstacles();
    if (!currentGame.gameOver) {
        currentGame.animationId = requestAnimationFrame(updateCanvas);
    }
}

document.addEventListener("keydown", (e) => {
    currentGame.car.moveCar(e.key);
});