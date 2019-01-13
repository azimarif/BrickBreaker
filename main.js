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

const styleBricks = function (brickElement, brick) {
  if (brick.status) {
    brickElement.style.width = addSuffixPixel(brick.width);
    brickElement.style.height = addSuffixPixel(brick.height);
    brickElement.style.bottom = addSuffixPixel(brick.bottom);
    brickElement.style.left = addSuffixPixel(brick.left);
    brickElement.className = 'bricks';
  }
}

const drawBricks = function (bricks, screen) {
  let brickElement;
  bricks.forEach(brick => {
    if (brick.status) {
      brickElement = document.createElement('div');
      styleBricks(brickElement, brick);
      screen.appendChild(brickElement);
    }
  });
  return brickElement;
};

const styleBall = function (ballDiv, ball) {
  ballDiv.style.width = addSuffixPixel(ball.radius);
  ballDiv.style.height = addSuffixPixel(ball.radius);
  ballDiv.style.bottom = addSuffixPixel(ball.bottom);
  ballDiv.style.left = addSuffixPixel(ball.left);
}

const drawBall = function (screen, ball) {
  let ballDiv = document.createElement('div');
  ballDiv.className = 'ball';
  ballDiv.id = 'ball_1';
  styleBall(ballDiv, ball);
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

  styleBall(ballDiv, ball);
  return ballVelocity;
}

const breakBricks = function (bricks, ball, screenElement, velocity) {
  let ballVelocity = velocity;
  bricks.forEach((brick) => {
    if (brick.status) {
      let sameColumn = ball.left > brick.left && ball.left < brick.left + brick.width;
      let sameRow = ball.bottom > brick.bottom - brick.height && ball.bottom < brick.bottom + brick.height;
      if (sameColumn && sameRow) {
        ballVelocity.dy = -ballVelocity.dy;
        brick.status = false;
      }
    }
  });
  let elements = document.getElementsByClassName('bricks');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  drawBricks(bricks, screenElement);
  return ballVelocity;
}

const initialize = function () {
  let screen = new Screen(960, 600);
  let screenElement = createScreen(document, screen);

  let paddle = new Paddle(100, 25, 430, 5);
  let paddleDiv = createPaddle(document, paddle);

  let bricks = new Bricks(9, 6, 70, 25);
  a = bricks.createBricks();

  drawBricks(a, screenElement);
  let ball = new Ball(30, 465, 30);
  let ballDiv = drawBall(screenElement, ball);
  document.getElementById('gameScreen').onkeydown = () => {
    handleEvent(paddleDiv, paddle);
  };

  let velocity = new Velocity(2, 2);
  setInterval(() => {
    velocity = updateBall(ballDiv, ball, screen, paddle, velocity);
    velocity = breakBricks(a, ball, screenElement, velocity);
  }, 10);
};

window.onload = initialize;