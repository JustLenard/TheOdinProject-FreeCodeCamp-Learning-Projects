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

var player = 'x';
var ai = '○';
const internalBoard = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

// function printBoard(internalBoard) {
// 	console.log(internalBoard.slice(0, 3));
// 	console.log(internalBoard.slice(3, 6));
// 	console.log(internalBoard.slice(6, 9));
// }

//Difficulty choice (just the visual part)
dificultyChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		dificultyChoices.forEach(choice => {
			choice.classList.remove('active');
		});
		choice.classList.add('active');
		restart();
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
		restart();
	});
});

//Player move
playingField.forEach(emptySqaure => {
	emptySqaure.addEventListener('click', () => {
		playingField.forEach(emptySqaure => {
			emptySqaure.classList.remove('active');
		});
		if (emptySqaure.textContent === '') {
			emptySqaure.classList.add('active');
			emptySqaure.textContent = player;
			checkEndGame(internalBoard);
			if (getLegalMoves(internalBoard).length !== 0) {
				aiMove = useCorrectAiDifficulty();
				playingField[aiMove].textContent = ai;
				checkEndGame(internalBoard);
			}
		}
	});
});

// Get the ai with the correct dificulty
function useCorrectAiDifficulty() {
	if (dificultyChoices[0].classList.contains('active')) {
		return easyAi();
	} else if (dificultyChoices[1].classList.contains('active')) {
		return normalAi(internalBoard, ai);
	} else if (dificultyChoices[2].classList.contains('active')) {
		return minimaxAi(internalBoard, ai);
	}
}

// Easy Ai
function easyAi() {
	legalMoves = getLegalMoves(internalBoard);
	let randNum = randomNumber(legalMoves.length);
	return legalMoves[randNum];
}

// Normal Ai
function normalAi(board, currentPlayer) {
	if (randomNumber(10) > 3) {
		return minimaxAi(board, currentPlayer);
	} else {
		return easyAi();
	}
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

// Get all the legal moves
function getLegalMoves(board) {
	legalMoves = [];
	for (let i = 0; i < 9; i++) {
		if (board[i] === '_') {
			legalMoves.push(i);
		}
	}
	return legalMoves;
}

function makeMove(board, currentPlayer, position) {
	board[position] = currentPlayer;
	return board;
}

// Find who is the opponent
function getOpponent(currentPlayer) {
	if (currentPlayer === '○') {
		return 'x';
	} else if (currentPlayer === 'x') {
		return '○';
	}
}

// Look for winner
function checkWinner(board) {
	let points = 0;
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

//Check for end game
function checkEndGame(board) {
	updateInternalBoard(internalBoard);
	if (checkWinner(board) !== 0) {
		if (checkWinner(board) === 10) {
			callEndGameModal(ai);
		} else {
			callEndGameModal(player);
		}
	} else if (getLegalMoves(board).length === 0) {
		callEndGameModal('tie');
	}
}

//Handle Game Over
function callEndGameModal(winner) {
	if (winner === 'tie') {
		winningMessage.textContent = `The game is a Tie`;
	} else {
		winningMessage.textContent = `The winner is ${winner}`;
	}
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
