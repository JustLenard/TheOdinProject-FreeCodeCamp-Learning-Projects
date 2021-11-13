const choices = ['rock', 'paper', 'scissors'];
const win = ['rock-scissors', 'paper-rock', 'scissors-paper'];
const lose = ['scissors-rock', 'rock-paper', 'paper-scissors'];

const hands = document.querySelectorAll('.hand-box');
const humanChoiceBox = document.querySelector('.human-choice');
const robotChoiceBox = document.querySelector('.robot-choice');
const figto = document.querySelector('#fighto');
const roundWinner = document.querySelector('.round-winner');
const endgameModal = document.querySelector('#modal');
const overlay = document.querySelector('#overlay');
const tryAgainBtn = document.querySelector('#try-again-btn');
const score = document.querySelector('.score');
const gameResults = document.querySelector('#game-results');
const choiceVsChoice = document.querySelector('.choice-vs-choice');

let robotPoints = (humanPoints = 0);
score.textContent = `${humanPoints} : ${robotPoints}`;

var humanChoice;

hands.forEach(hand =>
	hand.addEventListener('click', () => {
		hands.forEach(nothand => nothand.classList.remove('click'));

		humanChoice = hand.getAttribute('id');

		humanChoiceBox.classList.remove(
			`fa-hand-paper`,
			'fa-hand-scissors',
			'fa-hand-rock'
		);
		humanChoiceBox.classList.add('far', `fa-hand-${humanChoice}`, `hand-box`);

		hand.classList.add('click');
	})
);

figto.addEventListener('click', () => {
	gameLogic();
	score.textContent = `${humanPoints} : ${robotPoints}`;

	if (humanPoints === 3 || robotPoints === 3) {
		openEndgameModal();
	}
});

tryAgainBtn.addEventListener('click', () => {
	choiceVsChoice.textContent = '';
	tryAgain();
});

function openEndgameModal() {
	endgameModal.classList.add('active');
	overlay.classList.add('active');
	if (humanPoints > robotPoints) {
		gameResults.textContent = 'VICTORY!!!';
	} else {
		gameResults.textContent = 'DEFEAT!!!';
	}
}

function tryAgain() {
	endgameModal.classList.remove('active');
	overlay.classList.remove('active');
	robotChoiceBox.classList.remove(
		`hand-box`,
		`fa-hand-paper`,
		'fa-hand-scissors',
		'fa-hand-rock'
	);
	humanChoiceBox.classList.remove(
		`hand-box`,
		`fa-hand-paper`,
		'fa-hand-scissors',
		'fa-hand-rock'
	);
	hands.forEach(hand => hand.classList.remove('click'));
	humanPoints = robotPoints = 0;
	humanChoice = undefined;
	roundWinner.textContent = '';
	score.textContent = `${humanPoints} : ${robotPoints}`;
}

function gameLogic() {
	robotChoice = choices[Math.floor(Math.random() * choices.length)];
	robotChoiceBox.classList.remove(
		`fa-hand-paper`,
		'fa-hand-scissors',
		'fa-hand-rock'
	);
	robotChoiceBox.classList.add(
		'far',
		'hand-box',
		`fa-hand-${robotChoice}`,
		'robot-hand'
	);
	if (humanChoice === robotChoice) {
		choiceVsChoice.textContent = `${humanChoice} vs ${robotChoice}`;
		roundWinner.textContent = `Tie round.`;
	} else if (win.includes(humanChoice + '-' + robotChoice)) {
		humanPoints++;
		choiceVsChoice.textContent = `${humanChoice} vs ${robotChoice}`;
		roundWinner.textContent = `Human wins round.`;
	} else if (lose.includes(humanChoice + '-' + robotChoice)) {
		robotPoints++;
		choiceVsChoice.textContent = `${humanChoice} vs ${robotChoice}`;
		roundWinner.textContent = `Computer wins round.`;
	} else {
		robotChoiceBox.classList.remove(
			`hand-box`,
			`fa-hand-paper`,
			'fa-hand-scissors',
			'fa-hand-rock'
		);
		roundWinner.textContent = 'Please make your choice.';
	}
}

//Fancy matrix
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	canvas2 = document.getElementById('canvas2'),
	ctx2 = canvas2.getContext('2d'),
	cw = window.innerWidth,
	ch = window.innerHeight,
	charArr = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	],
	maxCharCount = 100,
	fallingCharArr = [],
	fontSize = 10,
	maxColums = cw / fontSize;
canvas.width = canvas2.width = cw;
canvas.height = canvas2.height = ch;

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.draw = function (ctx) {
	this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
	this.speed = randomFloat(1, 5);

	ctx2.fillStyle = 'rgba(255,255,255,0.8)';
	ctx2.font = fontSize + 'px san-serif';
	ctx2.fillText(this.value, this.x, this.y);

	ctx.fillStyle = '#0F0';
	ctx.font = fontSize + 'px san-serif';
	ctx.fillText(this.value, this.x, this.y);

	this.y += this.speed;
	if (this.y > ch) {
		this.y = randomFloat(-100, 0);
		this.speed = randomFloat(2, 5);
	}
};

for (var i = 0; i < maxColums; i++) {
	fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
}

var update = function () {
	ctx.fillStyle = 'rgba(0,0,0,0.05)';
	ctx.fillRect(0, 0, cw, ch);

	ctx2.clearRect(0, 0, cw, ch);

	var i = fallingCharArr.length;

	while (i--) {
		fallingCharArr[i].draw(ctx);
		var v = fallingCharArr[i];
	}

	requestAnimationFrame(update);
};

update();
