const LEFT_KEY = 37;
const RIGHT_KEY = 39;

const getBody = document => document.getElementsByTagName('body')[0];
const getGameScreen = document => document.getElementById('gameScreen');

const addSuffixPixel = value => value + 'px';

const setElementPosition = function (element, position) {
  element.style.left = addSuffixPixel(position.left);
  element.style.bottom = addSuffixPixel(position.bottom);
}

const setElementDimension = function (element, width, height) {
  element.style.width = addSuffixPixel(width);
  element.style.height = addSuffixPixel(height);
}

const setElementIDAndClass = function (element, id, className) {
  element.id = id;
  element.className = className;
}

const createPaddle = function (document, paddle) {
  let paddleDiv = document.createElement('div');
  setElementIDAndClass(paddleDiv, 'paddleDiv', 'paddle');
  setElementDimension(paddleDiv, paddle.width, paddle.height);
  setElementPosition(paddleDiv, paddle);
  let gameScreen = getGameScreen(document);
  gameScreen.appendChild(paddleDiv);
  gameScreen.focus();
  return paddleDiv;
};

const handleEvent = function (paddleDiv, paddle) {
  if (event.keyCode == LEFT_KEY) {
    if (paddle.left > 0) {
      paddle.moveLeft();
      setElementDimension(paddleDiv, paddle.width, paddle.height);
      setElementPosition(paddleDiv, paddle);
    }
  }
  if (event.keyCode == RIGHT_KEY) {
    if (paddle.left <= 850) {
      paddle.moveRight();
      setElementDimension(paddleDiv, paddle.width, paddle.height);
      setElementPosition(paddleDiv, paddle);
    }
  }
};

const createScreen = function (document, screen) {
  let body = getBody(document);
  let screenElement = document.createElement('main');
  screenElement.tabIndex = '0';
  setElementIDAndClass(screenElement, 'gameScreen', 'screen');
  setElementDimension(screenElement, screen.width, screen.height);
  body.appendChild(screenElement);
  return screenElement;
};

const drawBricks = function (bricks, screen) {
  let brickElement;
  bricks.forEach(brick => {
    if (brick.status) {
      brickElement = document.createElement('div');
      setElementIDAndClass(brickElement, `brick_${brick.left}_${brick.bottom}`, 'bricks');
      setElementDimension(brickElement, brick.width, brick.height);
      setElementPosition(brickElement, brick);
      screen.appendChild(brickElement);
    }
  });
  return brickElement;
};

const drawBall = function (screen, ball) {
  let ballDiv = document.createElement('div');
  setElementIDAndClass(ballDiv, 'ball_1', 'ball');
  setElementDimension(ballDiv, ball.radius, ball.radius);
  setElementPosition(ballDiv, ball);
  screen.appendChild(ballDiv);
  return ballDiv;
}

const updateBall = function (ballDiv, ball, screen, paddle, velocity) {
  let ballVelocity = velocity;
  ball.left = ball.left + ballVelocity.dx;
  ball.bottom = ball.bottom + ballVelocity.dy;

  if (isHitSideWall(ball, screen)) {
    ballVelocity.dx = -ballVelocity.dx;
  }

  if (isHitTopWall(ball, screen) || isHitPeddle(ball, paddle)) {
    ballVelocity.dy = -ballVelocity.dy;
  }

  if (isGameOver(ball, paddle)) {
    window.location.reload();
  }

  setElementDimension(ballDiv, ball.radius, ball.radius);
  setElementPosition(ballDiv, ball);
  return ballVelocity;
}

const breakBricks = function (bricks, ball, screenElement, velocity) {
  let brokenBricks = bricks.filter(brick => brick.status != true);
  let ballVelocity = velocity;
  bricks.map((brick) => {
    if (brick.status) {
      let sameColumn = ball.left > brick.left && ball.left < brick.left + brick.width;
      let sameRow = ball.bottom > brick.bottom - brick.height && ball.bottom < brick.bottom + brick.height;
      if (sameColumn && sameRow) {
        ballVelocity.dy = -ballVelocity.dy;
        brick.status = false;
      }
    }
  });
  let currentBrokenBricks = bricks.filter(brick => brick.status != true);
  if (brokenBricks != currentBrokenBricks) {
    let brickElement = document.getElementsByClassName('bricks');
    brickElement.forEach(brick => { brick.parentNode.removeChild(brick) });
    drawBricks(bricks, screenElement);
  }
  return ballVelocity;
}

const initialize = function () {
  let screen = new Screen(960, 600);
  let screenElement = createScreen(document, screen);

  let paddle = new Paddle(100, 25, 430, 5);
  let paddleDiv = createPaddle(document, paddle);

  let bricksDetail = new Bricks(9, 6, 70, 25);
  let bricks = bricksDetail.createBricks();

  drawBricks(bricks, screenElement);
  let ball = new Ball(30, 465, 30);
  let ballDiv = drawBall(screenElement, ball);
  getGameScreen(document).onkeydown = () => { handleEvent(paddleDiv, paddle); };

  let velocity = new Velocity(2, 2);
  setInterval(() => {
    velocity = updateBall(ballDiv, ball, screen, paddle, velocity);
    velocity = breakBricks(bricks, ball, screenElement, velocity);
  }, 10);
};

window.onload = initialize;