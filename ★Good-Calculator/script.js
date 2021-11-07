let passive = document.querySelectorAll('.passive');
let active = document.querySelectorAll('.active');

let result = '';
let toCalculate = 0;

passive.forEach(button => {
	button.addEventListener('click', () => {
		toCalculate += button.textContent;
		console.log(toCalculate);
		console.log('f');
		calculateThis();
		result = calculateThis();
		console.log(four);
	});
});

console.log(2 + (2 * 3) / 4);

function calculateThis(toCalculate, x) {
	console.log('result');
	return 4;
}
