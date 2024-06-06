# sudoku-solver
This project is a web-based Sudoku solver and generator built using JavaScript, HTML, and CSS. It features an interactive grid interface where users can either generate new puzzles or load a preset puzzle, and solve them in real-time using a backtracking algorithm.

## Features:
* Generate Sudoku: Creates a new random Sudoku puzzle.
* Load Sudoku: Loads a predefined Sudoku puzzle layout.
* Solve Sudoku: Automatically solves the entire Sudoku puzzle.
* Clear Board: Clears the current Sudoku grid to start a new puzzle.
##
As of now, there is no way for users to enter their own boards on the html or validate their current progress. If you want to load your own custom board, you must change the board array returned under ```loadInitialPuzzle();```. Otherwise the way to interact is to **FIRST** generate a new puzzle or load the preset, **THEN** start filling in your answers.

This project was inspired by and borrows code from [isaksolheim's sudoku-solver-js](https://github.com/isaksolheim/sudoku-solver-js). I refactored and rewrote parts of the code to better understand it and added new features such as color coding and locking functionality for the grid.
##
![sudoku](https://github.com/msmith368/sudoku-solver/assets/94403504/c1456c8e-fd0a-4408-ac0b-63b3baacab01)
