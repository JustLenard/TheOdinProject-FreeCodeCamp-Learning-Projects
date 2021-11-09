const numbers = '1234567890.';
const operations = '+-*/^()';

let passive = document.querySelectorAll('.passive');
let active = document.querySelectorAll('.active');

const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');
const toSolve = document.querySelector('.to-solve');
const resultScreen = document.querySelector('.result');

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
	console.log(expression);
	console.log(expression.slice(0, -1));
	expression = expression.slice(0, -1);
	toSolve.textContent = expression;
	resultScreen.textContent = expression;
});

//Making the rest of the buttons clickable
passive.forEach(button => {
	button.addEventListener('click', () => {
		if (numbers.includes(button.textContent)) {
			expression += button.textContent;
		} else if (operations.includes(button.textContent)) {
			expression += ` ${button.textContent} `;
		} else if (button.textContent === '* / X^') {
			expression += ' * ';
		}
		expression = expression.replace('*  *', '^');
		console.log(`Expression: ${expression}`);
		// console.log(expression.split(' '));
		// console.log(expression.split(' ').length);
		calculateThis(expression);
		// result = calculateThis();
		toSolve.textContent = expression;
		resultScreen.textContent = result.join();
	});
});
// result = result.filter(el => el !== null && el !== '');

//Calculating
function calculateThis(expression) {
	result = expression.split(' ');
	result = result.filter(el => el !== null && el !== '');

	console.log(result);
	// console.log(`Expression before power: ${result}`);
	paranthesis(result);
	power(result);
	// console.log(`Expression after power: ${result}`);
	// console.log(`Expression before multiply: ${result}`);
	multiply(result);
	// console.log(`Expression after multiply: ${result}`);
	division(result);
	subtraction(result);
	addition(result);

	console.log(result);
}

function paranthesis(result) {
	if (result.includes('(') && result.includes(')')) {
		let paranthesisIndex = [0, 0];
		for (let i = 0; i < result.length; i++) {
			// console.log(paranthesisIndex);
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
		console.log(`In paranthesis: ${slicedResult}`);

		power(slicedResult);
		multiply(slicedResult);
		division(slicedResult);
		subtraction(slicedResult);
		addition(slicedResult);
		console.log(`In paranthesis: ${slicedResult}`);
		console.log(`This is after all the function: ${result}`);
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

//Negative nummbers cause problems. Both for power and div/mult. power has
//another glitch whatsoever
