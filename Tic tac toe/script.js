
const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner(winner) {
    for (let combination of winningCombination) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            setTimeout(() => {
                statusDisplay.textContent = `${winner} wins!`;
                statusDisplay.style.color = winner === 'X' ? '#e74c3c' : '#4169E1';
            }, 100);
            return;
        }
    }
    if (!boardState.includes('')) {
        gameActive = false;
        setTimeout(() => {
            statusDisplay.textContent = 'It\'s a draw!';
            statusDisplay.style.color = '#95a5a6'; // Grey for draw
        }, 100);
    }
}
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell');
    if (boardState[cellIndex] || !gameActive) return;
    const currentPlayerBeforeSwitch = currentPlayer;
    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());
    checkWinner(currentPlayerBeforeSwitch);
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click',resetGame);
