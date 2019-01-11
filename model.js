class Paddle {
  constructor(width, height, left, bottom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
  }

  moveLeft() {
    this.left = this.left - 10;
  }

  moveRight() {
    this.left = this.left + 10;
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
      this.createBricksByRow(row, bricks);
    }
    return bricks;
  }

  createBricksByRow(row, bricks) {
    for (let column = 0; column < this.numberOfBricksPerRow; column++) {
      let left = column * (this.width + this.horizontalMargin) + this.horizontalMargin;
      let top = row * (this.height + this.verticalMargin) + this.verticalMargin;
      bricks.push(new Brick(this.width, this.height, left, top, true));
    }
  }
}

class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}
