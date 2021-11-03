let rows = document.querySelector('.height-value').value;
let columns = document.querySelector('.width-value').value;
currentColor = '#000';

const playingField = document.querySelector('.playing-field');
const button = document.querySelector('.container');
const reset = document.querySelector('.reset-btn');
const penColor = document.querySelector('.pen-color');

rows.addEventListener('change', () => {
	console.log('works');
});

rows.onchange = (e) => {
	rows = e.target.value;
	createDivs(rows, columns);
	console.log(rows);
};

function setPenColor(newColor) {
	currentColor = newColor;
}

penColor.onchange = (e) => setPenColor(e.target.value);

function createDivs(rows, columns) {
	for (let i = 1; i <= rows * columns; i++) {
		console.log(i);
		playingField.insertAdjacentHTML('beforeend', `<div class="box"></div>`);
	}
}

createDivs(rows, columns);
const boxes = document.querySelectorAll('.box');

const boxWidth = 100 / columns;
const boxHeight = 100 / rows;

boxes.forEach((box) => {
	box.style.width = `${boxWidth}%`;
	box.style.height = `${boxHeight}%`;

	// box.addEventListener('mouseover', () => {
	// 	box.classList.add('color');
	// });
	box.addEventListener('mouseover', () => {
		box.style.backgroundColor = `${currentColor}`;
	});
	// box.addEventListener('mouseover', () => {
	// 	box.style.backgroundColor = `rgb(${rn()},${rn()},${rn()})`;
	// 	box.classList.add('color');
	// });
});

reset.addEventListener('click', () => {
	boxes.forEach((box) => {
		box.classList.remove('color');
		box.style.backgroundColor = 'white';
	});
});

function rn() {
	return Math.floor(Math.random() * 256 + 1);
}
