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
// console.log(playingField[0].textContent === '');

//Update the internal board for AI to work with
function updateInternalBoard(internalBoard) {
	// console.log(internalBoard);

	for (var i = 0; i < 9; i++) {
		// console.log(playingField[i].textContent);
		if (playingField[i].textContent === '') {
			internalBoard[i] = '_';
		} else {
			internalBoard[i] = playingField[i].textContent;
		}
	}
	// console.log(internalBoard);
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
	// console.log(legalMoves);
	// console.log(`Here are the legal moves ${legalMoves}`);

	return legalMoves;
}

function checkWinner(board) {
	// console.log(opp);
	let score = 0;
	winConditions.forEach(condition => {
		// console.log(condition[0]);

		if (
			board[condition[0]] + board[condition[1]] + board[condition[2]] ===
			ai + ai + ai
		) {
			score = 10;
		} else if (
			board[condition[0]] + board[condition[1]] + board[condition[2]] ===
			player + player + player
		) {
			score = -10;
		}
	});
	// console.log('fucing finished the loop	');
	// console.log(score);
	return score;
}

// console.log(checkWinner(['○', '○', '○', '_', '_', '_', '_', '_', '_']));
// console.log(Math.min(...[1, -2, 3, 4]));

//Player move
playingField.forEach(choice => {
	choice.addEventListener('click', () => {
		playingField.forEach(choice => {
			choice.classList.remove('active');
		});
		if (choice.textContent === '') {
			xCounter++;
			choice.classList.add('active');
			choice.textContent = player;
			updateInternalBoard(internalBoard);
			// printBoard(internalBoard);
			aiMove = minimaxAi(internalBoard, ai);
			console.log(`The best move is ${aiMove}`);
			playingField[aiMove].textContent = ai;
			updateInternalBoard(internalBoard);
		}
	});
});

// Find who is the opponent
function getOpponent(currentPlayer) {
	if (currentPlayer === player) {
		return ai;
	} else if (currentPlayer === ai) {
		return player;
	}
}

//Ai logic Easy
// function EasyAiMove() {
// 	randNum = randomNumber();
// 	if (playingField[randNum].textContent === '') {
// 		console.log(playerMarker);
// 		switch (playerMarker) {
// 			case 'x':
// 				playingField[randNum].textContent = '○';
// 				break;
// 			case '○':
// 				playingField[randNum].textContent = 'x';
// 		}
// 		checkWinner();
// 	} else if (playingField[randNum].textContent !== '') {
// 		EasyAiMove();
// 	}
// }

function makeMove(board, currentPlayer, position) {
	board[position] = currentPlayer;
	return board;
}

function minimaxAi(board, currentPlayer) {
	let bestMove = undefined;
	let bestScore = undefined;

	legalMoves = getLegalMoves(board);
	// console.log(`this is legal Moves in minimax ${legalMoves}`);
	legalMoves.forEach(legalMove => {
		newBoard = makeMove(board, currentPlayer, legalMove);
		opponet = getOpponent(currentPlayer);

		// printBoard(newBoard);
		score = minimax(newBoard, opponet);
		// console.log(`The new score for the current board: ${score}`);

		board[legalMove] = '_';

		if (bestScore === undefined || score > bestScore) {
			bestScore = score;
			bestMove = legalMove;
		}
	});
	console.log(`The best move is ${bestMove} with a score of ${bestScore}`);
	return bestMove;
}

function minimax(board, currentPlayer) {
	legalMoves = getLegalMoves(board);
	// console.log(legalMoves.length);
	// console.log(`Here is the length of legal moves: ${legalMoves.length}`);

	if (checkWinner(board) !== 0) {
		return checkWinner(board);
	}

	if (legalMoves.length === 0) {
		// console.log(`Here is the length of legal moves: ${legalMoves.length}`);
		return 0;
	}

	scores = [];

	legalMoves.forEach(legalMove => {
		newBoard = makeMove(board, currentPlayer, legalMove);
		// printBoard(newBoard);
		opponet = getOpponent(currentPlayer);
		// console.log(opponet);
		score = minimax(newBoard, opponet);

		// console.log(`The new score for the current board: ${score}`);
		// printBoard(newBoard);
		// console.log(`The board and the score ${score}`);
		// console.log(
		// 	`Here is currentPlayer: ${currentPlayer} and scores: ${scores}`
		// );
		scores.push(score);
		// console.log(score);
		board[legalMove] = '_';
	});
	if (currentPlayer === ai) {
		return Math.max(...scores);
	} else {
		return Math.min(...scores);
	}
}

// def minimax(board, current_player):
//     legal_moves = get_legal_moves(board)

//     if check_win(board) != 0:
//         return check_win(board)

//     if len(legal_moves) == 0:
//         return 0

//     scores = []

//     for legal_move in legal_moves:
//         new_board = make_move(board, current_player, legal_move)
//         print_board(new_board)
//         opponet = get_opponent(current_player)
//         score = minimax(new_board, opponet)
//         scores.append(score)
//         board[legal_move] = "_"
//     if current_player == ai:
//         return max(scores)
//     else:
//         return min(scores)

//Check winner
// function checkWinner() {
// 	winConditions.forEach(condition => {
// 		if (
// 			['xxx', '○○○'].includes(
// 				playingField[condition[0]].textContent +
// 					playingField[condition[1]].textContent +
// 					playingField[condition[2]].textContent
// 			)
// 		) {
// 			let winner = playingField[condition[0]].textContent;
// 			callEndGameModal(winner);
// 		}
// 	});
// }

// def check_win(board):
//     for condition in win_conditions:
//         if board[condition[0]] + board[condition[1]] + board[condition[2]] == ai * 3:
//             return 10
//         elif (
//             board[condition[0]] + board[condition[1]] + board[condition[2]]
//             == hu_player * 3
//         ):
//             return -10
//     return 0

//Handle Game Over
function callEndGameModal(winner) {
	winningMessage.textContent = `The winner is ${winner}`;
	console.log(`The winner is ${winner}`);
	endGameModal.classList.add('show');
}

//Restart
// restart();
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
function randomNumber() {
	return Math.floor(Math.random() * 9);
}
