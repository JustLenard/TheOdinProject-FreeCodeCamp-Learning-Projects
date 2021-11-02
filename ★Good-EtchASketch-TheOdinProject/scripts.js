const rows = 100;
const columns = 100;
console.log('herro');

const playingField = document.querySelector('.playing-field');
const button = document.querySelector('.container');
const reset = document.querySelector('#reset-btn');

console.log(button);
console.log(playingField);

for (let i = 1; i <= rows * columns; i++) {
	console.log(i);
	playingField.insertAdjacentHTML('beforeend', `<div class="box"></div>`);
}

const boxes = document.querySelectorAll('.box');

const boxWidth = 100 / columns;
const boxHeight = 100 / rows;

boxes.forEach((box) => {
	box.style.width = `${boxWidth}%`;
	box.style.height = `${boxHeight}%`;
	// box.style.backgroundColor = `rgba(${Math.floor(
	// 	Math.random() * 256 + 1,
	// 	0
	// )},${Math.floor(Math.random() * 256 + 1, 0)},${Math.floor(
	// 	Math.random() * 256 + 1,
	// 	0
	// )}`;
	// box.addEventListener('mouseover', () => {
	// 	box.classList.add('color');
	// });
	box.style.backgroundColor = `rgba(${rn()},${rn()},${rn()})`;
	box.addEventListener('mouseover', () => {
		box.style.opacity = '10%';
	});
});

reset.addEventListener('click', () => {
	boxes.forEach((box) => {
		box.classList.remove('color');
	});
});

function rn() {
	return Math.floor(Math.random() * 256 + 1);
}
