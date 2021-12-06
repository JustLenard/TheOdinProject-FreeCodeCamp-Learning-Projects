const dificultyChoices = document.querySelectorAll('[data-dificutly]');
const markerChoices = document.querySelectorAll('[data-marker]');
const playingField = document.querySelectorAll('[data-position]');
const restartBtn = document.querySelectorAll('.restart');
const endGameModal = document.querySelector('.end-game-modal');
const winningMessage = document.querySelector('[data-winning-message-text]');
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
];

var xCounter = 0;
var player = 'x';
var ai = '○';
const internalBoard = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

function printBoard(internalBoard) {
	console.log(internalBoard.slice(0, 3));
	console.log(internalBoard.slice(3, 6));
	console.log(internalBoard.slice(6, 9));
}

//Update the internal board for AI to work with
function updateInternalBoard(internalBoard) {
	for (var i = 0; i < 9; i++) {
		if (playingField[i].textContent === '') {
			internalBoard[i] = '_';
		} else {
			internalBoard[i] = playingField[i].textContent;
		}
	}
}

//Difficulty choice
dificultyChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		dificultyChoices.forEach(choice => {
			choice.classList.remove('active');
		});
		choice.classList.add('active');
	});
});

//Marker choice
markerChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		markerChoices.forEach(choice => {
			choice.classList.remove('active');
		});
		choice.classList.add('active');
		player = choice.textContent;
		ai = getOpponent(player);
		console.log(player);
		restart();
	});
});

// Get all the legal moves
function getLegalMoves(board) {
	legalMoves = [];
	for (var i = 0; i < 9; i++) {
		if (board[i] === '_') {
			legalMoves.push(i);
		}
	}
	return legalMoves;
}

function checkWinner(board) {
	var points = 0;
	winConditions.forEach(condition => {
		if (
			board[condition[0]] + board[condition[1]] + board[condition[2]] ===
			ai + ai + ai
		) {
			points = 10;
		} else if (
			board[condition[0]] + board[condition[1]] + board[condition[2]] ===
			player + player + player
		) {
			points = -10;
		}
	});
	return points;
}

//Player move
playingField.forEach(choice => {
	choice.addEventListener('click', () => {
		playingField.forEach(choice => {
			choice.classList.remove('active');
		});
		if (choice.textContent === '') {
			choice.classList.add('active');
			choice.textContent = player;
			updateInternalBoard(internalBoard);
			// aiMove = minimaxAi(internalBoard, ai);
			// playingField[minim/xAi(internalBoard, ai)].textContent = ai;
			easyAiMove();
			updateInternalBoard(internalBoard);
			// printBoard(internalBoard);
		}
	});
});

// Find who is the opponent
function getOpponent(currentPlayer) {
	if (currentPlayer === '○') {
		return 'x';
	} else if (currentPlayer === 'x') {
		return '○';
	}
}

// Easy Ai
function easyAiMove() {
	updateInternalBoard(internalBoard);
	console.log(internalBoard);
	legalMoves = getLegalMoves(internalBoard);
	console.log(legalMoves);
	let randNum = randomNumber(legalMoves.length);
	console.log(randNum);
	playingField[legalMoves[randNum]].textContent = ai;
}

function makeMove(board, currentPlayer, position) {
	board[position] = currentPlayer;
	return board;
}

// Impossible Ai
function minimaxAi(board, currentPlayer) {
	let bestMove = undefined;
	let bestScore = undefined;
	legalMoves = getLegalMoves(board);
	legalMoves.forEach(legalMove => {
		newBoard = makeMove(board, currentPlayer, legalMove);
		opponet = getOpponent(currentPlayer);
		score = minimax(newBoard, opponet);
		board[legalMove] = '_';

		if (bestScore === undefined || score > bestScore) {
			bestScore = score;
			bestMove = legalMove;
		}
	});
	return bestMove;
}

function minimax(board, currentPlayer) {
	legalMoves = getLegalMoves(board);
	winnerScore = checkWinner(board);
	if (winnerScore !== 0) {
		return checkWinner(board);
	}
	if (legalMoves.length === 0) {
		return 0;
	}

	var scores = [];

	legalMoves.forEach(legalMove => {
		newBoard = makeMove(board, currentPlayer, legalMove);
		opponet = getOpponent(currentPlayer);
		score = minimax(newBoard, opponet);

		scores.push(score);
		board[legalMove] = '_';
	});
	if (currentPlayer === player) {
		return Math.min(...scores);
	} else {
		return Math.max(...scores);
	}
}

//Handle Game Over
function callEndGameModal(winner) {
	winningMessage.textContent = `The winner is ${winner}`;
	console.log(`The winner is ${winner}`);
	endGameModal.classList.add('show');
}

//Restart
restart();
function restart() {
	restartBtn.forEach(button => {
		button.addEventListener('click', () => {
			playingField.forEach(choice => {
				choice.classList.remove('active');
				choice.textContent = '';
			});
			xCounter = 0;
			endGameModal.classList.remove('show');
		});
		xCounter = 0;
		playingField.forEach(choice => {
			choice.classList.remove('active');
			choice.textContent = '';
		});
	});
}

//Random number
function randomNumber(length) {
	return Math.floor(Math.random() * length);
}
