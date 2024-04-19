const BOARD_SIZE = 7;

const EMPTY_CELL = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;

const createingNewBoard = (boardSize) => {
    return Array.from({ length: boardSize }, () => Array(boardSize).fill(EMPTY_CELL));
};

const printMatrix = (matrix) => {
    for (let row of matrix) {
        console.log(row.join(" "));
    }
}

const BOARD = createingNewBoard(BOARD_SIZE);
printMatrix(BOARD);
