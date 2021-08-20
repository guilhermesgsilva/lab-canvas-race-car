class Car {
    constructor() {
        this.x= 225;
        this.y = 650;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        const image = new Image();
        image.src = "./images/car.png";
        context.drawImage(image, this.x, this.y, this.width, this.height)
    }

    moveCar(key) {
        context.clearRect(this.x, this.y, this.width, this.height);
        switch (key) {
            case "ArrowLeft":
                if (this.x > this.width) {
                    this.x -= 10;
                }
                break;
            case "ArrowRight":
                if (this.x < canvas.clientWidth - this.width) {
                    this.x += 10;
                }
                break;
        }
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.height;
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.width;
    }
}