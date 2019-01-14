class Paddle {
  constructor(width, height, left, bottom, speed = 10) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
    this.speed = speed;
  }

  moveLeft() {
    this.left = Math.max(this.left - this.speed, 0);
  }

  moveRight() {
    this.left = Math.min(this.left + this.speed, 960 - this.width);
  }

  isYCoordinateMatch(yPosition) {
    return yPosition < this.height;
  }

  isXCoordinateMatch(xPosition) {
    return xPosition >= this.left && xPosition <= this.left + this.width;
  }

  isHitPeddle(xPosition, yPosition) {
    return this.isXCoordinateMatch(xPosition) && this.isYCoordinateMatch(yPosition);
  }
}

class Brick {
  constructor(width, height, left, bottom, status) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
    this.status = status;
  }
}

class Bricks {
  constructor(rows, columns, width, height, horizontalMargin = 32, verticalMargin = 15) {
    this.numberOfBricksPerRow = rows;
    this.numberOfBricksRow = columns;
    this.width = width;
    this.height = height;
    this.horizontalMargin = horizontalMargin;
    this.verticalMargin = verticalMargin;
  }

  createBricks() {
    let bricks = [];
    for (let row = 0; row < this.numberOfBricksRow; row++) {
      bricks = bricks.concat(this.createBricksByRow(row));
    }
    return bricks;
  }

  createBricksByRow(row) {
    let bricks = [];
    for (let column = 0; column < this.numberOfBricksPerRow; column++) {
      let left = column * (this.width + this.horizontalMargin) + this.horizontalMargin;
      let bottom = 550 - row * (this.height + this.verticalMargin) + this.verticalMargin;
      bricks.push(new Brick(this.width, this.height, left, bottom, true));
    }
    return bricks;
  }
}

class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  isHitSideScreen(xPosition, width) {
    return xPosition > this.width - width || xPosition < 0;
  }

  isHitTopScreen(yPosition, height) {
    return yPosition > this.height - height;
  }

  isHitBottom(yPosition) {
    return yPosition < 0;
  }
}

class Ball {
  constructor(radius, left, bottom) {
    this.radius = radius;
    this.left = left;
    this.bottom = bottom;
  }

  moveBall(dx, dy){
    this.left = this.left + dx;
    this.bottom = this.bottom + dy;
  }
}

class Velocity {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  toggleDx() {
    this.dx = -this.dx;
  }

  toggleDy() {
    this.dy = -this.dy;
  }
}

class Game {
  constructor() {
    this.screen = new Screen(960, 600);
    this.paddle = new Paddle(100, 25, 430, 5);
    this.bricksDetail = new Bricks(9, 6, 70, 25);
    this.ball = new Ball(30, 465, 30);
    this.velocity = new Velocity(2, 2);
  }

  isGameOver() {
    return this.screen.isHitBottom(this.ball.bottom);
  }

  updateXVelocity() {
    if (this.screen.isHitSideScreen(this.ball.left, this.ball.radius)) {
      this.velocity.toggleDx();
    }
  }

  updateYVelocity() {
    if (this.screen.isHitTopScreen(this.ball.bottom, this.ball.radius, this.velocity.dy) ||
      this.paddle.isHitPeddle(this.ball.left, this.ball.bottom, this.velocity.dy)) {
      this.velocity.toggleDy();
    }
  }
}