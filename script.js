function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function round(number, precision) {
    const multiplier = Math.pow(10, precision);
    return Math.round(number * multiplier) / multiplier;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}

let numberArray = [];
let storedArray = [];
let storedOperator = '';

const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const equalButton = document.querySelector('#equal-btn');
const dotButton = document.querySelector('#dot-btn');
const clearButton = document.querySelector('#AC-btn');
const delButton = document.querySelector('#DEL-btn');
const mainDisplay = document.querySelector('.main-display');
const topDisplay = document.querySelector('.top-display');

numberButtons.forEach(numberButton => numberButton.addEventListener('click', updateNumber));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', updateOperator));
equalButton.addEventListener('click', updateEqual);
dotButton.addEventListener('click', updateNumber);
clearButton.addEventListener('click', clearData);
delButton.addEventListener('click', deleteNumber);

function updateNumber(e) {
    if (e.target.textContent === '.' && numberArray.includes('.')) return;
    numberArray.push(e.target.textContent);
    updateDisplay();
}

function updateOperator(e) {
    if (storedOperator === '') {
        storedOperator = e.target.textContent;
        storedArray = numberArray;
    }
    else if (numberArray.length === 0) {
        storedOperator = e.target.textContent;
    }
    else if (storedOperator === '÷' && numberArray.length === 1 && numberArray[0] == 0) {
        alert('Dividing by Zero is undefined.');
    }
    else {
        const result = round(operate(storedOperator, +storedArray.join(''), +numberArray.join('')), 8);
        storedOperator = e.target.textContent;
        storedArray = result.toString().split('');
    }
    numberArray = [];
    updateDisplay();
}

function updateEqual(e) {

    if (storedOperator === '' || storedArray.length === 0 || numberArray.length === 0) return;

    if (storedOperator === '÷' && numberArray.length === 1 && numberArray[0] == 0) {
        alert('Dividing by Zero is undefined.')
        numberArray = [];
    }
    else {
        const result = round(operate(storedOperator, +storedArray.join(''), +numberArray.join('')), 8);
        storedOperator = '';
        storedArray = [];
        numberArray = result.toString().split('');
    }
    updateDisplay();
}

function clearData(e) {
    storedOperator = '';
    storedArray = [];
    numberArray = [];
    topDisplay.textContent = '';
    mainDisplay.textContent = '0';
}

function deleteNumber(e) {
    numberArray.pop();
    updateDisplay();
}

function updateDisplay() {
    topDisplay.textContent = storedArray.join('') + ' ' + storedOperator;
    mainDisplay.textContent = numberArray.join('');
}
