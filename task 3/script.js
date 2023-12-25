const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];

    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusDisplay.textContent = `${gameState[a]} wins!`;
      gameActive = false;
      highlightWinningCells([a, b, c]);
      return;
    }
  }
}

function checkDraw() {
  if (!gameState.includes('') && gameActive) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  }
}

function highlightWinningCells(cells) {
  cells.forEach(cellIndex => {
    const cell = document.querySelector(`.cell[data-cell="${cellIndex}"]`);
    cell.style.backgroundColor = '#27ae60';
    cell.style.color = '#fff';
  });
}

function handleReset() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusDisplay.textContent = `${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#f4b9b9';
    cell.style.color = '#fff';

    
    cell.removeEventListener('click', handleCellClick);
    cell.addEventListener('click', handleCellClick);

   
    cell.removeEventListener('mouseenter', handleCellHover);
    cell.removeEventListener('mouseleave', handleCellHoverReset);
    cell.addEventListener('mouseenter', handleCellHover);
    cell.addEventListener('mouseleave', handleCellHoverReset);
  });
}


function handleCellHover(event) {
  const cell = event.target;
  if (cell.textContent === '' && gameActive) {
    cell.style.backgroundColor = '#2980b9';
  }
}

function handleCellHoverReset(event) {
  const cell = event.target;
  if (cell.textContent === '' && gameActive) {
    cell.style.backgroundColor = '#f4b9b9';
  }
}



gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', handleReset);
statusDisplay.textContent = `${currentPlayer}'s turn`;
