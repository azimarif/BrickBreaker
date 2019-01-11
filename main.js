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
}

const createPaddle = function (document, paddle) {
  let paddleDiv = document.createElement('div');
  paddleDiv.id = 'paddleDiv'
  drawPaddle(paddleDiv, paddle);
  document.getElementById('gameScreen').appendChild(paddleDiv);
  document.getElementById('gameScreen').focus();
  return paddleDiv;
};

const handleEvent = function (paddleDiv, paddle) {
  if (event.keyCode == LEFT_KEY) {
    paddle.moveLeft();
    if (paddle.left >= 0) {
      drawPaddle(paddleDiv, paddle);
    }
  }
  if (event.keyCode == RIGHT_KEY) {
    paddle.moveRight();
    if (paddle.left <= 860) {
      console.log(paddle.left);
      drawPaddle(paddleDiv, paddle);
    }
  }
}

const initialize = function () {
  let paddle = new Paddle(100, 20, 430, 5);
  let paddleDiv = createPaddle(document, paddle);
  document.getElementById('gameScreen').onkeydown = () => { handleEvent(paddleDiv, paddle); }
};

window.onload = initialize;