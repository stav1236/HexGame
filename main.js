const prompt = require("prompt-sync")(); //npm install prompt-sync

const BOARD_SIZE = 7;

const EXIT_CODE = -999;
const EMPTY_CELL = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;

const createingNewBoard = () => {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(EMPTY_CELL)
  );
};

const printMatrix = (matrix) => {
  for (let row of matrix) {
    console.log(row.join(" "));
  }
};

const BOARD = createingNewBoard();

const isEmptyCell = (board, i, j) => board[i][j] == EMPTY_CELL;

const isOutOfTheBoard = (i, j) =>
  i < 0 || j < 0 || i >= BOARD_SIZE || j >= BOARD_SIZE;

const isLegalMove = (board, i, j) => {
  return !isOutOfTheBoard(i, j) && isEmptyCell(board, i, j);
};

const checkIsNumber = (num) => {
  if (Number.isNaN(num)) {
    console.log("Invalid input. Please enter a valid integer.");
  }
};

const inputMove = () => {
  let isIlegalInput = false;
  let i, j;
  while (!isIlegalInput) {
    while (!i) {
      i = parseInt(prompt("Enter the value of i: "));
      checkIsNumber(i);
    }
    if (i == EXIT_CODE) return EXIT_CODE;
    console.log("i value is: " + i);

    while (!j) {
      j = parseInt(prompt("Enter the value of j: "));
      checkIsNumber(j);
    }
    if (j == EXIT_CODE) return EXIT_CODE;
    console.log("j value is: " + j);

    isIlegalInput = true;
  }

  console.log(`your move is + [${i}, ${j}]`);

  return { i: Number(i), j: Number(j) };
};

const printStartGameMessage = () => {
  console.log("Welcome to HEX Game");
  console.log("Each turn you have to chose a cell to color");
  console.log("a cell is couple of [i,j]");
  console.log(`for exit enter ${EXIT_CODE}`);
};

const printEndMessage = (winner) => {
  if (winner == EXIT_CODE) {
    console.log("EXIT");
  } else {
    console.log(
      `game over and the winner is Player${winner == PLAYER_1 ? "1" : "2"}`
    );
  }
};

const Game = (board) => {
  printStartGameMessage();

  let winner = 0;
  while (winner == 0) {
    const mover = inputMove();
    if (mover == EXIT_CODE) {
      winner = EXIT_CODE;
      break;
    }

    winner = PLAYER_1;
  }

  printEndMessage(winner);
};

Game(BOARD);
