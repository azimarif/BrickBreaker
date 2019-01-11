const LEFT_KEY = 37;
const RIGHT_KEY = 39;

const addSuffixPixel = function (value) {
  return value + 'px';
};

const drawPaddle = function (paddleDiv, paddle) {
  paddleDiv.className = 'paddle';
  paddleDiv.style.width = addSuffixPixel(paddle.width);
  paddleDiv.style.height = addSuffixPixel(paddle.height);
  paddleDiv.style.left = addSuffixPixel(paddle.left);
  paddleDiv.style.bottom = addSuffixPixel(paddle.bottom);
};

const createPaddle = function (document, paddle) {
  let paddleDiv = document.createElement('div');
  paddleDiv.id = 'paddleDiv';
  drawPaddle(paddleDiv, paddle);
  document.getElementById('gameScreen').appendChild(paddleDiv);
  document.getElementById('gameScreen').focus();
  return paddleDiv;
};

const handleEvent = function (paddleDiv, paddle) {
  if (event.keyCode == LEFT_KEY) {
    if (paddle.left > 0) {
      paddle.moveLeft();
      drawPaddle(paddleDiv, paddle);
    }
  }
  if (event.keyCode == RIGHT_KEY) {
    if (paddle.left <= 850) {
      paddle.moveRight();
      drawPaddle(paddleDiv, paddle);
    }
  }
};

const createScreen = function (document, screen) {
  let body = document.getElementsByTagName('body')[0];
  let screenElement = document.createElement('main');
  screenElement.id = 'gameScreen';
  screenElement.tabIndex = '0';
  screenElement.className = 'screen';
  screenElement.style.width = addSuffixPixel(screen.width);
  screenElement.style.height = addSuffixPixel(screen.height);
  body.appendChild(screenElement);

  return screenElement;
};

const drawBricks = function (bricks, screen) {
  bricks.forEach(brick => {
    let brickElement = document.createElement('div');
    brickElement.style.width = addSuffixPixel(brick.width);
    brickElement.style.height = addSuffixPixel(brick.height);
    brickElement.style.top = addSuffixPixel(brick.top);
    brickElement.style.left = addSuffixPixel(brick.left);
    brickElement.className = 'bricks';
    screen.appendChild(brickElement);
  });
};

const initialize = function () {
  let paddle = new Paddle(100, 20, 430, 5);
  let screen = new Screen(960, 600);
  let screenElement = createScreen(document, screen);
  let paddleDiv = createPaddle(document, paddle);
  let bricks = new Bricks(9, 6, 70, 25);

  drawBricks(bricks.createBricks(), screenElement);
  document.getElementById('gameScreen').onkeydown = () => {
    handleEvent(paddleDiv, paddle);
  };
};

window.onload = initialize;
