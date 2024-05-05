# HexGame

## Overview

A hex game is a strategic board game played on a hexagonal grid. Players take turns placing pieces to create a connected path from one side to the other. It's a challenging game of tactics and planning.

## Description

This project implements a hex game using a Disjoint-Set data structure to achieve efficiency way for detecting a winner. The program is written in JavaScript (JS) language and achieves a complexity of O(log n) to detect a winner when the game board is NxN.

## Usage

### Prerequisites

Before running the project, ensure you have the following installed:

[Node.js](https://nodejs.org/) (includes npm)

### Running the Project

#### Clone the repository:

```bash
git clone https://github.com/stav1236/HexGame.git
```

#### Navigate to the HexGame folder:

```bash
cd HexGame
```

#### Install dependencies:

```bash
npm i
```

#### Run the project:

```bash
node main.js
```

Follow the on-screen instructions to play the game.

## Implementation

### consts.js

This file contains important constants used throughout the game implementation.

#### Constants:

- `BOARD_SIZE`: Defines the size of the game board. Adjust this constant to change the dimensions of the game board.
- `EXIT_CODE`: Represents the exit condition for the game loop. Modify this constant to change the exit condition.
- `EMPTY_CELL`: Represents an empty cell on the game board.
- `PLAYER_1`: Represents player 1.
- `PLAYER_2`: Represents player 2.

These constants are essential for setting up the game environment and defining player states.

### DisjointSet Class

#### Variables:

- `parent`: Object that represents the parent of each element in the disjoint set.
- `size`: Object that stores the size of each disjoint set (number of elements).
- `edges`: Object that indicates the position of each element relative to the edges of the game board.

#### Functions:

- `constructor(elems)`: Initializes the DisjointSet object with the given elements, setting up the parent, size, and edges.
- `makeSet(x)`: Creates a new set with element `x`, initializing its parent, size, and edges.
- `find(x)`: Finds the representative element (root) of the set containing `x`.
- `union(x, y)`: Unites the sets containing elements `x` and `y`, updating their parent pointers, sizes, and edge information.

**Note:** In this project, every item in the set follows the structure '[i,j]', representing its position on the game board.

### main.js

This file contains the main program logic for the HEX game. It handles most of the game's functionality, including board setup, player turns, and winner detection.

#### Board Representation:

The board is represented by a matrix of size n x n, where each cell can have one of three values:

- 0: Empty cell
- 1: Player 1's piece
- 2: Player 2's piece

#### Hex Shape Neighbors:

Each cell [i, j] considers its neighbors to be:

- (i+1, j)
- (i+1, j-1)
- (i, j+1)
- (i, j-1)
- (i-1, j)
- (i-1, j+1)

#### Functions:

- `createingNewBoard(n)`: Creates a new game board of size n x n with all cells initialized to empty.
- `printMatrix(matrix)`: Prints the current state of the game board.
- `isEmptyCell(board, i, j)`: Checks if a cell on the board is empty.
- `isOutOfTheBoard(i, j)`: Checks if a cell is out of the bounds of the board.
- `isLegalMove(board, i, j)`: Checks if a move is legal (within the board bounds and on an empty cell).
- `intInput(message)`: Prompts the user to enter an integer input.
- `inputMove()`: Prompts the user to input the coordinates of their move.
- `printStartGameMessage()`: Prints the start game message with instructions.
- `printEndMessage(winner)`: Prints the end game message, including the winner or exit status.
- `getAdjacentCells(i, j)`: Gets the adjacent cells of a given cell [i, j].
- `checkForWinner(board, disjointSet, i, j)`: Checks if a player has won the game after placing their piece.
- `Game()`: Initializes and runs the game loop, alternating player turns until there's a winner or the game is exited.

This file serves as the core of the HEX game, orchestrating the game flow and ensuring the rules are enforced during gameplay.

#### `checkForWinner(board, disjointSet, i, j)`

This function is responsible for determining if a player has won the game after placing their piece on the board at position [i, j].

#### Parameters:

- `board`: The current state of the game board, represented as a matrix.
- `disjointSet`: An instance of the DisjointSet class used for tracking connected components.
- `i`: The row index of the cell where the latest piece was placed.
- `j`: The column index of the cell where the latest piece was placed.

#### Functionality:

- **Get Adjacent Cells**: Get the adjacent cells of the cell at position [i, j].
- **Check for Connected Components**: For each adjacent cell, if it belongs to the same player as the latest placed piece, union the cells to the same disjoint set.
- **Check for Winning Condition**: After updating the disjoint set, check if the current player has formed a winning path from one edge of the board to the opposite edge.
  - For Player 1: Check if the connected component reaches both the left and right edges of the board.
  - For Player 2: Check if the connected component reaches both the top and bottom edges of the board.
- **Return Winner**: If a winning path is found, return the player number. Otherwise, return 0 to indicate no winner yet.

#### Complexity:

- The function iterates over the adjacent cells, which can be at most 6 cells.
- The disjoint set operations (union and find) have a time complexity of O(log n), where n is the number of elements in the disjoint set.
- Overall, the time complexity of this function is O(log n) due to the constant number of adjacent cells and the efficient disjoint set operations.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
