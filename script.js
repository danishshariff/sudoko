
document.addEventListener('DOMContentLoaded', () => {
    let board = generateSudoku(); 

    const sudokuBoard = document.getElementById('sudoku-board');
    let selectedCell = null;

    function generateSudoku() {
        const emptyBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        solveSudoku(emptyBoard); 
        for (let i = 0; i < 40; i++) { 
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            while (emptyBoard[row][col] === 0) {
                row = Math.floor(Math.random() * 9);
                col = Math.floor(Math.random() * 9);
            }
            emptyBoard[row][col] = 0;
        }

        return emptyBoard;
    }

    function createBoard() {
        sudokuBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (board[i][j] !== 0) {
                    cell.textContent = board[i][j];
                    cell.classList.add('fixed');
                }
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', () => selectCell(cell));
                sudokuBoard.appendChild(cell);
            }
        }
    }

    function selectCell(cell) {
        if (selectedCell) {
            selectedCell.classList.remove('selected');
        }
        selectedCell = cell;
        cell.classList.add('selected');
    }

    document.getElementById('number-inputs').addEventListener('click', (e) => {
        if (!selectedCell || e.target.classList.contains('number') === false) return;
        const number = e.target.textContent;
        const row = selectedCell.dataset.row;
        const col = selectedCell.dataset.col;
        if (number === 'X') {
            board[row][col] = 0;
            selectedCell.textContent = '';
        } else {
            board[row][col] = parseInt(number);
            selectedCell.textContent = number;
        }
    });

    document.getElementById('new-game').addEventListener('click', () => {
        board = generateSudoku(); 
        createBoard();
    });

    document.getElementById('solve').addEventListener('click', () => {
        if (solveSudoku(board)) {
            createBoard();
        } else {
            alert('No solution exists!');
        }
    });

    function isValid(board, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                return false;
            }
        }
        return true;
    }

    function solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    createBoard();
});
