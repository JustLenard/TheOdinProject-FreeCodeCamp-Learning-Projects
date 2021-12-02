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
var playerMarker = 'x';
const internalBoard = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

function printBoard(internalBoard) {
	console.log(internalBoard.slice(0, 3));
	console.log(internalBoard.slice(3, 6));
	console.log(internalBoard.slice(6, 9));
}
printBoard(internalBoard);

//Update the internal board for AI to work with
function updateInternalBoard() {
	console.log(internalBoard);
	for (var i = 0; i < 9; i++) {
		internalBoard[i] = playingField[i].textContent;
	}
	console.log(internalBoard);
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
		playerMarker = choice.textContent;
		console.log(playerMarker);
		restart();
	});
});

// Get all the legal moves
function getLegalMoves() {
	legalMoves = [];
	i = 0;
	playingField.forEach(choice => {
		if (choice.textContent === '') {
			legalMoves.push(i);
			i++;
		} else {
			i++;
		}
	});
	console.log(legalMoves);
	return legalMoves;
}

//Player move
playingField.forEach(choice => {
	choice.addEventListener('click', () => {
		playingField.forEach(choice => {
			choice.classList.remove('active');
		});
		if (choice.textContent === '') {
			xCounter++;
			choice.classList.add('active');
			choice.textContent = playerMarker;
			getLegalMoves();
			if (xCounter < 5) {
				aiMove();
			} else {
				callEndGameModal();
			}
		}
		checkWinner();
		console.log(`Here it is`);
		// console.log(
		// 	playingField[0].textContent +
		// 		playingField[1].textContent +
		// 		playingField[2].textContent
		// );
		updateInternalBoard();
	});
});

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

// Find who is the opponent
function getOpponent() {
	if (playerMarker === 'x') {
		opponent = '○';
	} else if (playerMarker === '○') {
		opponent = 'x';
	}
	return opponent;
}

//Ai logic Easy
function aiMove() {
	randNum = randomNumber();
	if (playingField[randNum].textContent === '') {
		console.log(playerMarker);
		switch (playerMarker) {
			case 'x':
				playingField[randNum].textContent = '○';
				break;
			case '○':
				playingField[randNum].textContent = 'x';
		}
		checkWinner();
	} else if (playingField[randNum].textContent !== '') {
		aiMove();
	}
}

function minimax_ai() {
	let bestMove = None;
	let bestScore = None;
}

//Check winner
function checkWinner() {
	winConditions.forEach(condition => {
		if (
			['xxx', '○○○'].includes(
				playingField[condition[0]].textContent +
					playingField[condition[1]].textContent +
					playingField[condition[2]].textContent
			)
		) {
			let winner = playingField[condition[0]].textContent;
			callEndGameModal(winner);
		}
	});
}

//Handle Game Over
function callEndGameModal(winner) {
	winningMessage.textContent = `The winner is ${winner}`;
	console.log(`The winner is ${winner}`);
	endGameModal.classList.add('show');
}

//Random number
function randomNumber() {
	return Math.floor(Math.random() * 9);
}
