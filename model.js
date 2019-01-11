class Paddle {
  constructor(width, height, left, bottom, speed = 10) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
    this.speed = speed;
  }

  moveLeft() {
    this.left = this.left - this.speed;
  }

  moveRight() {
    this.left = this.left + this.speed;
  }
}

class Brick {
  constructor(width, height, left, top, status) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
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
      let top = row * (this.height + this.verticalMargin) + this.verticalMargin;
      bricks.push(new Brick(this.width, this.height, left, top, true));
    }
    return bricks;
  }
}

class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Ball {
  constructor(width, height, left, bottom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
  }
}
