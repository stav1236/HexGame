const BOARD_SIZE = 7;

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
printMatrix(BOARD);

const isEmptyCell = (board, i, j) => board[i][j] == EMPTY_CELL;

const isOutOfTheBoard = (i, j) =>
  i < 0 || j < 0 || i >= BOARD_SIZE || j >= BOARD_SIZE;

const isLegalMove = (board, i, j) => {
  return !isOutOfTheBoard(i, j) && isEmptyCell(board, i, j);
};

const Game = (board) => {};

Game(BOARD);
