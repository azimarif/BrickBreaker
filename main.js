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

const handleEvent = function(paddleDiv, paddle) {
  if (event.keyCode == LEFT_KEY) {
    paddle.moveLeft();
  }
  if (event.keyCode == RIGHT_KEY) {
    paddle.moveRight();
  }
  setElementDimension(paddleDiv, paddle.width, paddle.height);
  setElementPosition(paddleDiv, paddle);
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

const drawBricks = function (document, bricks, screen) {
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

const updateBallPosition = function (ballDiv, game) {
  game.ball.moveBall(game.velocity.dx, game.velocity.dy);

  if (game.isGameOver(game.ball, game.paddle)) {
    window.location.reload();
  }

  game.updateXVelocity();
  game.updateYVelocity();

  setElementDimension(ballDiv, game.ball.radius, game.ball.radius);
  setElementPosition(ballDiv, game.ball);
}

const breakBricks = function (bricks, ball, document, velocity) {
  bricks.map((brick) => {
    if (brick.status) {
      let currentBrickElement = document.getElementById(`brick_${brick.left}_${brick.bottom}`);
      let sameColumn = ball.left > brick.left && ball.left < brick.left + brick.width;
      let sameRow = ball.bottom > brick.bottom - brick.height && ball.bottom < brick.bottom + brick.height;
      if (sameColumn && sameRow) {
        velocity.dy = -velocity.dy;
        brick.status = false;
        currentBrickElement.parentElement.removeChild(currentBrickElement);
      }
    }
  });
}

const initialize = function () {
  let game = new Game();
  let screenElement = createScreen(document, game.screen);
  let paddleDiv = createPaddle(document, game.paddle);
  let bricks = game.bricksDetail.createBricks();
  let velocity = game.velocity;

  drawBricks(document,bricks, screenElement);
  getGameScreen(document).onkeydown =  handleEvent.bind(null, paddleDiv, game.paddle);
  let ballDiv = drawBall(screenElement, game.ball);
  setInterval(() => {
    breakBricks(bricks, game.ball, document, velocity);
    updateBallPosition(ballDiv, game);
  }, 10);
};

window.onload = initialize;