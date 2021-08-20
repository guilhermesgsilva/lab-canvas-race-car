class Obstacle {
    constructor(x, y, width, height) {
        this.x= x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        context.fillStyle = "orange";
        context.fillRect(this.x, this.y, this.width, this.height)
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