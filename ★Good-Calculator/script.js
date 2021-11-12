const numbers = '1234567890.';
const operations = '+-*/^()';

const passive = document.querySelectorAll('.passive');
const active = document.querySelectorAll('.active');
const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');
const toSolve = document.querySelector('.to-solve');
const resultScreen = document.querySelector('.result');
const equal = document.querySelector('.equal');

let toCalculate = 0;
let expression = '';
var result;

// Clear 'screen'
clearBtn.addEventListener('click', () => {
	expression = '';
	toSolve.textContent = '';
	resultScreen.textContent = '';
});

// Delete last character
deleteBtn.addEventListener('click', () => {
	expression = expression.slice(0, -1);
	toSolve.textContent = expression;
	resultScreen.textContent = expression;
});

//Equal
equal.addEventListener('click', () => {
	toSolve.textContent = result;
	resultScreen.textContent = undefined;
	expression = result;
});

//Making the rest of the buttons clickable
passive.forEach(button => {
	button.addEventListener('click', () => {
		if (numbers.includes(button.textContent)) {
			expression += button.textContent;
		} else if (operations.includes(button.textContent)) {
			expression += ` ${button.textContent} `;
		} else if (button.textContent === '* & ^') {
			expression += ' * ';
		}
		expression = expression.replace('*  *', '^');

		calculateThis(expression);

		toSolve.textContent = expression;
		if (typeof Number(result) === 'number' && result.length === 1) {
			resultScreen.textContent = result;
		} else {
			resultScreen.textContent = 'Nan';
		}
	});
});

//Calculating
function calculateThis(expression) {
	result = expression.split(' ');
	result = result.filter(el => el !== null && el !== '');

	isNegative(result);
	paranthesis(result);
	power(result);
	multiply(result);
	division(result);
	subtraction(result);
	addition(result);
}

function paranthesis(result) {
	if (result.includes('(') && result.includes(')')) {
		let paranthesisIndex = [0, 0];
		for (let i = 0; i < result.length; i++) {
			if (result[i] === '(') {
				paranthesisIndex[0] = i;
			} else if (result[i] === ')') {
				paranthesisIndex[1] = i;
				break;
			}
		}
		let slicedResult = result.slice(
			paranthesisIndex[0] + 1,
			paranthesisIndex[1]
		);
		power(slicedResult);
		multiply(slicedResult);
		division(slicedResult);
		subtraction(slicedResult);
		addition(slicedResult);
		result.splice(
			paranthesisIndex[0],
			paranthesisIndex[1] - paranthesisIndex[0] + 1,
			slicedResult
		);
		paranthesis(result);
	}
}

function power(result) {
	if (result.includes('^')) {
		i = result.indexOf('^');
		let toReplaceWith = result[i - 1] ** result[i + 1];
		result.splice(i - 1, 3, toReplaceWith);
		power(result);
	}
}

function multiply(result) {
	if (result.includes('*')) {
		i = result.indexOf('*');
		let toReplaceWith = result[i - 1] * result[i + 1];
		result.splice(i - 1, 3, toReplaceWith);
		multiply(result);
	}
}

function division(result) {
	if (result.includes('/')) {
		i = result.indexOf('/');
		let toReplaceWith = result[i - 1] / result[i + 1];
		result.splice(i - 1, 3, toReplaceWith);
		division(result);
	}
}

function addition(result) {
	if (result.indexOf('+') !== -1 && result.indexOf('') === -1) {
		i = result.indexOf('+');
		let toReplaceWith = Number(result[i - 1]) + Number(result[i + 1]);
		result.splice(i - 1, 3, toReplaceWith);
		addition(result);
	}
}

function subtraction(result) {
	if (result.includes('-')) {
		i = result.indexOf('-');
		let toReplaceWith = result[i - 1] - result[i + 1];
		result.splice(i - 1, 3, toReplaceWith);
		subtraction(result);
	}
}

function isNegative(result) {
	for (let i = 0; i < result.length; i++) {
		if (result[i] === '-' && result[i - 1] === '(') {
			result.splice(i, 2, `${'-' + result[i + 1]}`);
		} else if (result[i] === '-' && i !== 0) {
			result[i] = '+';
			result[i + 1] = '-' + result[i + 1];
		} else if (result[i] === '-' && i === 0) {
			result.splice(i, 2, `${'-' + result[i + 1]}`);
		}
	}
}

function intoNum(result) {
	result.forEach(elem => {
		if (!operations.includes(elem)) {
			result[elem] = Number(elem);
		}
	});
}
