import Prompt from "prompt-sync"; //npm install prompt-sync

import {
  BOARD_SIZE,
  EXIT_CODE,
  EMPTY_CELL,
  PLAYER_1,
  PLAYER_2,
} from "./consts.js";
import { DisjointSet } from "./DisjointSet.js";

const prompt = Prompt();

export const extractNumbersFromString = (str) => str.match(/\d+/g).map(Number);

const getIJstring = (i, j) => `[${i},${j}]`;

const createingNewBoard = (n) => {
  const matrix = [];
  const elements = [];

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(0);
      elements.push(getIJstring(i, j));
    }
    matrix.push(row);
  }

  return [matrix, elements];
};

const printMatrix = (matrix) => {
  for (let row of matrix) {
    console.log(row.join(" "));
  }
};

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

const getAdjacentCells = (i, j) => {
  const adjacentCells = [
    [i + 1, j],
    [i + 1, j - 1],
    [i, j + 1],
    [i, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
  ];

  return adjacentCells.filter((cell) => !isOutOfTheBoard(cell[0], cell[1]));
};

//O(log(n))
const checkForWinner = (board, disjointSet, i, j) => {
  const adjacentCells = getAdjacentCells(i, j); //6 items maxium

  const player = board[i][j];
  const currIJstring = getIJstring(i, j);
  for (const adjacentCell of adjacentCells) {
    //six iterates maximum O(1)
    const [iValue, jValue] = adjacentCell;
    if (player == board[iValue][jValue]) {
      disjointSet.union(currIJstring, getIJstring(iValue, jValue)); //O(log(n))
      const groupKey = disjointSet.find(currIJstring); //O(log(n))
      const edges = disjointSet.edges[groupKey];
      if (player == PLAYER_1 && edges.isRight && edges.isLeft) {
        return PLAYER_1;
      }
      if (player == PLAYER_2 && edges.isTop && edges.isBottom) {
        return PLAYER_2;
      }
    }
  }

  return 0;
};

const Game = () => {
  const [board, elements] = createingNewBoard(BOARD_SIZE);
  const disjointSet = new DisjointSet(elements);
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

    const { i, j } = move;

    board[i][j] = player == PLAYER_1 ? PLAYER_1 : PLAYER_2;

    winner = checkForWinner(board, disjointSet, i, j);

    player = (player % 2) + 1;
  }

  printEndMessage(winner);
};

Game();
