const dificultyChoices = document.querySelectorAll('[data-dificutly]');
const markerChoices = document.querySelectorAll('[data-marker]');
const playingField = document.querySelectorAll('[data-position]');
const restart = document.querySelector('.restart');

dificultyChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		dificultyChoices.forEach(choice => {
			choice.classList.remove('active');
		});
		choice.classList.add('active');
	});
});

markerChoices.forEach(choice => {
	choice.addEventListener('click', () => {
		markerChoices.forEach(choice => {
			choice.classList.remove('active');
		});
		choice.classList.add('active');
	});
});

playingField.forEach(choice => {
	choice.addEventListener('click', () => {
		playingField.forEach(choice => {
			choice.classList.remove('active');
		});
		choice.classList.add('active');
		choice.textContent = 'x';
		aiMove();
	});
});

restart.addEventListener('click', () => {
	playingField.forEach(choice => {
		choice.classList.remove('active');
		choice.textContent = '';
	});
});

function aiMove() {
	randNum = randomNumber();
	console.log(playingField[randNum].textContent);
	if (playingField[randNum].textContent === '') {
		playingField[randNum].textContent = 'o';
	} else if (playingField[randNum].textContent !== '') {
		aiMove();
	}
}

function randomNumber() {
	return Math.floor(Math.random() * 10);
}
