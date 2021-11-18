const dificultyChoices = document.querySelectorAll('[data-dificutly]');
const markerChoices = document.querySelectorAll('[data-marker]');
const playingField = document.querySelectorAll('[data-position]');
const restartBtn = document.querySelector('.restart');

var xCounter = 0;
var playerMarker = 'x';

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
			if (xCounter < 5) {
				aiMove();
			} else {
				endGameModal();
			}
		}
	});
});

//Restart
restart();
function restart() {
	restartBtn.addEventListener('click', () => {
		playingField.forEach(choice => {
			choice.classList.remove('active');
			choice.textContent = '';
		});
		xCounter = 0;
	});
	xCounter = 0;
	playingField.forEach(choice => {
		choice.classList.remove('active');
		choice.textContent = '';
	});
}

//Ai logic Easy
function aiMove() {
	randNum = randomNumber();
	console.log(randNum);
	console.log(playingField[randNum].textContent);
	if (playingField[randNum].textContent === '') {
		console.log(playerMarker);
		switch (playerMarker) {
			case 'x':
				console.log('I am in x');
				playingField[randNum].textContent = '○';
				break;
			case '○':
				console.log('I am in o');
				playingField[randNum].textContent = 'x';
		}
	} else if (playingField[randNum].textContent !== '') {
		aiMove();
	}
}

//Handled Game Over
function endGameModal() {
	console.log('Game Over');
}

//Random number
function randomNumber() {
	return Math.floor(Math.random() * 9);
}
