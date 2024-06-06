var cells = []; // Array to store all cell elements

// Loads an initial Sudoku puzzle with a new valid preset board
function loadInitialPuzzle() {
    return [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
}

// Creates the Sudoku grid and initializes the cells
function createSudokuGUI() {
    var table = document.getElementById("gui");

    for (var r = 0; r < 9; r++) {
        var row = document.createElement("tr");

        for (var c = 0; c < 9; c++) {
            var input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.row = r;
            input.column = c;
            input.square = getSquareNumber(r, c);
            input.addEventListener('input', restrictInput);

            var cell = document.createElement("td");
            cell.appendChild(input);

            row.appendChild(cell);
            cells.push(input);
        }
        table.appendChild(row);
    }
}

// Restricts input to numeric values only (1-9) and applies the light blue color to user inputs
function restrictInput(event) {
    var value = event.target.value;
    if (!/^[1-9]$/.test(value)) {
        event.target.value = '';
        event.target.classList.remove('light-blue');
    } else {
        event.target.classList.add('light-blue');
    }
}

// Determines the square number for a given cell based on its row and column
function getSquareNumber(row, column) {
    return Math.floor(row / 3) * 3 + Math.floor(column / 3);
}

// Checks if a value is valid for a given cell based on Sudoku rules
function isValidValue(cell, value) {
    return cells.every(c => (
        (c.row !== cell.row || c.value != value) &&
        (c.column !== cell.column || c.value != value) &&
        (c.square !== cell.square || c.value != value)
    ));
}

// Solves the Sudoku puzzle
function solveSudoku() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(numbers);

    function solve(index) {
        if (index >= cells.length) return true;
        if (!cells[index].editable) return solve(index + 1);

        for (let value of numbers) {
            if (isValidValue(cells[index], value)) {
                cells[index].value = value;
                cells[index].classList.add('light-blue');
                if (solve(index + 1)) return true;
                cells[index].value = '';
                cells[index].classList.remove('light-blue');
            }
        }
        return false;
    }
    return solve(0);
}

// Generates a completely solved Sudoku board
function generateSolvedBoard() {
    clearBoard();
    solveSudoku();
    return cells.map(cell => cell.value);
}

// Generates a new Sudoku puzzle by creating a solved puzzle first, then removing some cells
function generateSudoku() {
    clearBoard();

    let solvedBoard = generateSolvedBoard();

    cells.forEach((cell, i) => {
        cell.value = solvedBoard[i];
        cell.editable = false;
        cell.readOnly = true;
        cell.classList.add('red');
    });

    let removeCount = 40;
    while (removeCount > 0) {
        let index = Math.floor(Math.random() * cells.length);
        if (cells[index].value !== '') {
            cells[index].value = '';
            cells[index].editable = true;
            cells[index].readOnly = false;
            cells[index].classList.remove('red', 'light-blue');
            removeCount--;
        }
    }

    solvedBoard.forEach((value, index) => {
        cells[index].solvedValue = value;
    });
}

// Loads a predefined Sudoku puzzle
function loadSudoku() {
    var puzzle = loadInitialPuzzle();
    cells.forEach((cell, i) => {
        var value = puzzle[Math.floor(i / 9)][i % 9];
        cell.value = value || '';
        cell.editable = value === 0;
        cell.readOnly = value !== 0;
        cell.classList.remove('red', 'light-blue');
        if (value !== 0) {
            cell.classList.add('red');
        }
    });
}

// Clears the Sudoku grid
function clearBoard() {
    cells.forEach(cell => {
        cell.value = '';
        cell.editable = true;
        cell.readOnly = false;
        cell.classList.remove('red', 'light-blue');
        delete cell.solvedValue;
    });
}

// Initialize the Sudoku GUI
createSudokuGUI(); // Initialize the Sudoku GUI
