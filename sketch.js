let board;
let cols, rows;
let scaler = 25;
let resolution = 10;
function setup() {
  createCanvas(500, 500);
  scaler = floor(windowWidth / 45);
  cols = floor(windowWidth / 45);
  rows = floor(windowWidth / 45);
  randomize();
  neighbors();
  //frameRate(1);
}

function draw() {
  background(220);
  //mouse listener that generates new board
  if (mouseIsPressed) {
    newGeneration();
  } else {
    //randomize();
  }
  
  drawGeneration();
  frameRate(24);
}

function newGeneration() {
  let liveNeighbors = neighbors();
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {}
  }
}

function drawGeneration() {
  let index = 0;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if (board[index] == 0) {
        fill(0, 0, 220); //0 MEANS BLUE MEANS DEAD
      } else {
        fill(255); //1 MEANS WHITE MEANS ALIVE
      }
      square(x * scaler, y * scaler, scaler);
      index++;
    }
  }
}

function neighbors() {
  let innerArr = [];
  let index = cols + 1;
  for (let col = 1; col < cols - 1; col++) {
    for (let row = 1; row < rows - 1; row++) {
      let sum = 0;
      sum += board[index - cols - 1]; //t l
      sum += board[index - cols]; //t m
      sum += board[index - cols + 1]; //t r

      sum += board[index - 1]; //m l
      sum += board[index + 1]; //m l

      sum += board[index + cols - 1]; //b l
      sum += board[index + cols]; //b m
      sum += board[index + cols + 1]; //b r
      if(board[index] == 1 && (sum == 2 || sum == 3)) {
        board[index] = 1;
      } else if(board[index] == 0 && sum == 3) {
        board[index] = 1;
      } else {
        board[index] = 0;
      }
      innerArr.push(board[index]);
      index++;
    }
    index += 2;
  }
  return innerArr;
}

function randomize() {
  board = [];
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let randomy = random([0, 1, 0, 0, 0, 0, 0, 0, 0]);
      board.push(randomy);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scaler = floor(windowWidth / 45);
  cols = floor(windowWidth / 45);
  rows = floor(windowWidth / 45);
  randomize();
  console.log('resize');
}
