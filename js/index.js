console.log("JS connected");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

document.getElementById("game-board").style.display = "none";
document.getElementById('start-button').onclick = () => {
  document.getElementById("game-board").style.display = "block";
  startGame();
};

function startGame() {}


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  document.querySelector("#game-board").style.display = 'block';
});

let interval;

//GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME GAME

const game = {
  frames: 0,
  obstacles: [],
  start: () => {
    interval = setInterval(() => {
      updateCanvas();
    }, 10);
  },
  stop: () => {
      clearInterval(interval);
  },
  clear: () => {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  },
  // score: () => {
  //     const points = Math.floor(game.frames / 5);
  //     context.font = "10px Arial";
  //     context.fillStyle = "black";
  //     context.fillText(`Score: ${points}`, 200, 50);
  // },
};

//CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR CAR 

class Car {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 100;

      const img = new Image();
      img.src = "./images/car.png"
      img.onload = () => {
          this.image = img;
          this.draw();
      };
  };

  draw() {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  moveLeft() {
    if (this.x > 50) {
      this.x -= 25
    }
  }

  moveRight() {
    if (this.x < canvas.clientWidth - this.width - 50) {
      this.x += 25
    }
  }
}

const blueCar = new Car (225, 550);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
      case "ArrowLeft":
      case "a":
          blueCar.moveLeft();
          break;
      case "ArrowRight":
      case "d":
          blueCar.moveRight();
          break;
  };

  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  blueCar.draw();
});

//OBSTACLES OBSTACLES OBSTACLES OBSTACLES OBSTACLES OBSTACLES OBSTACLES OBSTACLES OBSTACLES OBSTACLES

class Component {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedY = 0;
    this.speedX = 0;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  // crashWith(component) {
  //   return !(
  //     this.bottom() < component.top() ||
  //     this.top() > component.bottom() ||
  //     this.right() < component.left() ||
  //     this.left() > component.right()
  //   );
  // }
}

function drawObstacles() {
  game.obstacles.forEach((obstacle) => {
    obstacle.y -= 1;
    obstacle.draw();
  });

  game.frames++;

  if (game.frames % 120 === 0) {
    const minWidth = 50;
    const maxWidth = 300;
    const randomWidth = Math.floor(
      Math.random() * (maxWidth - minWidth + 1) + minWidth
    );

    const minX = 75;
    const maxX = 425;
    const randomX = Math.floor(
      Math.random() * (maxX - minX + 1) + minX
    );;

    if (randomX + randomWidth > 425) {
      randomX = 425 - randomWidth;
    }

    const obstacle = new Component(
      randomX,
      0,
      randomWidth,
      20,
      "red"
    );
    
    game.obstacles.push(obstacle);

    console.log(game.obstacles);
  }
}


//CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS CANVAS 

function updateCanvas() {
  game.clear();
  blueCar.draw();
  blueCar.move();
  // drawObstacles();
  // checkGameOver();
  // game.score();
}


