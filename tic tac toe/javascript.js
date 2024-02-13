// Game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// DOM elements
const boardElement = document.getElementById('board');
const resultElement = document.getElementById('result');

// Event listener for cell clicks
function cellClick(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    updateBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Update the game board on the DOM
function updateBoard() {
  boardElement.innerHTML = '';
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = value;
    cell.addEventListener('click', () => cellClick(index));
    boardElement.appendChild(cell);
  });
}

// Check for a winner or a tie
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]             
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      resultElement.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    resultElement.textContent = 'It\'s a tie!';
  }
}

// Reset the game
function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  resultElement.textContent = '';
  updateBoard();
}

// Initialize the board
updateBoard();
