let rowsValue = document.querySelector('.height-value').value;
let columnsValue = document.querySelector('.width-value').value;
currentColor = '#000';

const playingField = document.querySelector('.playing-field');
const reset = document.querySelector('.reset-btn');
const penColor = document.querySelector('.pen-color');
const pen = document.querySelector('.pen');
const rainbow = document.querySelector('.rainbow');
const fill = document.querySelector('.fill');
const shadder = document.querySelector('.shadder');
const rowsArea = document.querySelector('.height-value');
const columnsArea = document.querySelector('.width-value');
var boxes;

// 'Tool' selection.
[(pen, rainbow, fill, shadder)].forEach(tool =>
	tool.addEventListener('click', () => {
		[pen, rainbow, fill, shadder].forEach(tool => {
			tool.classList.remove('active');
		});
		tool.classList.add('active');
	})
);

// Listens and recreates the 'playingField' based on the desired size
[rowsArea, columnsArea].forEach(area =>
	area.addEventListener('change', e => {
		rowsValue = rowsArea.value;
		columnsValue = columnsArea.value;
		console.log(rowsValue);
		console.log(columnsValue);
		playingField.innerHTML = '';
		createBoxes(rowsValue, columnsValue);
		painting();
	})
);

function setPenColor(newColor) {
	currentColor = newColor;
}

penColor.onchange = e => setPenColor(e.target.value);

function createBoxes(rows, columns) {
	for (let i = 1; i <= rows * columns; i++) {
		playingField.insertAdjacentHTML('beforeend', `<div class="box"></div>`);
	}
	const boxWidth = 100 / columnsValue;
	const boxHeight = 100 / rowsValue;
	boxes = document.querySelectorAll('.box');

	boxes.forEach(box => {
		box.style.width = `${boxWidth}%`;
		box.style.height = `${boxHeight}%`;
	});
}

createBoxes(rowsValue, columnsValue);
painting();

function painting() {
	boxes.forEach(box => {
		box.addEventListener('mouseover', () => {
			if (pen.classList.contains('active')) {
				box.style.backgroundColor = `${currentColor}`;
			} else if (rainbow.classList.contains('active')) {
				box.style.backgroundColor = `rgb(${rn()},${rn()},${rn()})`;
			} else if (fill.classList.contains('active')) {
				playingField.style.backgroundColor = `${currentColor}`;
			} else if (shadder.classList.contains('active')) {
				style = window.getComputedStyle(box);
				br = style.getPropertyValue('filter');
				console.log(br);
				console.log(typeof br);

				box.style.filter = 'brightness(0.8)';
			}
		});
	});
}
reset.addEventListener('click', () => {
	boxes.forEach(box => {
		box.classList.remove('color');
		box.style.backgroundColor = 'white';
	});
});

function rn() {
	return Math.floor(Math.random() * 256 + 1);
}
