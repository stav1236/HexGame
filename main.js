const prompt = require("prompt-sync")(); //npm install prompt-sync

const BOARD_SIZE = 11;

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
  if (isOutOfTheBoard(i, j)) {
    console.log("Cannot select a cell outside the board");
    return false;
  }
  if (!isEmptyCell(board, i, j)) {
    console.log("A full cell cannot be selected");
    return false;
  }

  return true;
};

const checkIsNumber = (num) => {
  if (Number.isNaN(num)) {
    console.log("Invalid input. Please enter a valid integer.");
  }
};

const intInput = (message = "enter integer") => {
  let i;
  while (!i && i != 0) {
    i = parseInt(prompt(message));
    checkIsNumber(i);
  }
  console.log("value is: " + i);

  return i;
};

const inputMove = () => {
  let isIlegalInput = false;
  let i, j;
  while (!isIlegalInput) {
    i = intInput("Enter the value of i: ");
    if (i == EXIT_CODE) return EXIT_CODE;

    j = intInput("Enter the value of j: ");
    if (j == EXIT_CODE) return EXIT_CODE;

    isIlegalInput = true;
  }

  console.log(`your move is [${i}, ${j}]`);

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

  let player = PLAYER_1;
  let winner = 0;
  while (winner == 0) {
    console.log(`Is Player${player} Turn`);
    console.log("The current board is:");
    printMatrix(board);

    let move;
    let isValidMove = false;
    while (!isValidMove) {
      move = inputMove();
      if (move == EXIT_CODE) {
        winner = EXIT_CODE;
        printEndMessage(winner);
        return;
      } else {
        isValidMove = isLegalMove(board, move.i, move.j);
      }
    }

    board[move.i][move.j] = player == PLAYER_1 ? PLAYER_1 : PLAYER_2;
    player = (player % 2) + 1;
  }

  printEndMessage(winner);
};

Game(BOARD);
