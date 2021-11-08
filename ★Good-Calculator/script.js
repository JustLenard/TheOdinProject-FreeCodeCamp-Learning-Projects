const numbers = '1234567890.';
const operations = '+-*/^';

let passive = document.querySelectorAll('.passive');
let active = document.querySelectorAll('.active');

const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');

let toCalculate = 0;
let expression = '';
var result;

clearBtn.addEventListener('click', () => {
	expression = '';
});

passive.forEach(button => {
	button.addEventListener('click', () => {
		if (numbers.includes(button.textContent)) {
			expression += button.textContent;
		} else if (operations.includes(button.textContent)) {
			expression += ` ${button.textContent} `;
		}
		expression = expression.replace('*  *', '^');
		console.log(`Expression: ${expression}`);
		// console.log(expression.split(' '));
		// console.log(expression.split(' ').length);
		calculateThis(expression);
		// result = calculateThis();
	});
});

function calculateThis(expression) {
	result = expression.split(' ');
	console.log(`This is before power: ${result}`);
	power(result);
	console.log(`This is after power: ${result}`);
	result = result.filter(el => el !== null && el !== '');
	// var f = result.filter(el => el);
	console.log(result);
	// console.log(typeof result);
	// console.log(`This is before multiply: ${result}`);
	// multiply(result);
	// console.log(`This is after multiply: ${result}`);

	// while (
	// 	expression.split(' ').length !== 1 &&
	// 	expression.split(' ').length !== 0
	// ) {
	// }

	// for (i = 0; i < result.length; i++) {
	// 	if (result[i] === '^') {
	// 		// console.log(expression.indexOf('^'));
	// 		i = result.indexOf('^');
	// 		let toReplaceWith = result[i - 1] ** result[i + 1];
	// 		result[i + 1] = toReplaceWith;
	// 		result.splice(i - 1, i + 1);
	// 		console.log(`result in for loop: ${result}`);
	// 		console.log(toReplaceWith);
	// 	}
	// 	// console.log(`result after if: ${result}`);
	// }
}

function power(result) {
	if (result.indexOf('^') !== -1 && result.length > result.indexOf('^')) {
		i = result.indexOf('^');
		let toReplaceWith = result[i - 1] ** result[i + 1];
		result[i] = toReplaceWith.toString();
		// result.splice(i - 1, i + 1);
		result[i + 1] = '';
		result[i - 1] = '';
		if (result.indexOf('^') !== -1) {
			power(result);
		}
	}
}

function multiply(result) {
	if (result.indexOf('*') !== -1) {
		i = result.indexOf('^');
		let toReplaceWith = result[i - 1] * result[i + 1];
		result[i] = toReplaceWith;
		result.splice(i - 1);
		if (result.indexOf('*') !== -1) {
			multiply(result);
		}
	}
}

// function remove
