/* 
take inputs from the user via the buttons 
user can press numbers or operators and press = to execute it 
can enter multiple numbers & operators (so something like 1 + 2 + 3 + 4)
can't enter two operators consecutively 
the input is displayed on the screen

HTML
create the layout for the calculator   

CSS
style the calculator using flexbox 
add buttons hover effect (darken)
add buttons click effect (darken * 2)

JS
create all the basic operations (+, -, *, /)
    take two numbers and output a value
    when maths errors occur alert them they are stupid
round the output before displaying on screen 

store three differne inputs, two are numbers one is the operator.
store num1 first, then operator, then num2 
    run the operation using the values, returned value becomes num1 
    now can take another operator and num2 and repeat the process

clear wipes out the 3 variables 
delete removes one value from the current input, if none, do nothing 

*/

// operations
function add(num1, num2) {return num1 + num2};

function minus(num1, num2) {return num1 - num2};

function times(num1, num2) {return num1 * num2};

function divide(num1, num2) {
    const result =  num1 / num2;
    // takes care of zero division error
    if (result === Infinity) {
        return "Error";
    } 
    return result;
};

// calculator operation variables
let operand1 = "0";
let operand2 = "";
let operator = "";

// execute operation based on the values
// round the values
function operate(operand1, operand2, operator) {
    let result;
    operand1 = parseFloat(operand1);
    operand2 = parseInt(operand2);

    switch (operator) {
        case "+":
            result = add(operand1, operand2);
            break;

        case "-":
            result = minus(operand1, operand2);
            break;

        case "*":
            result = times(operand1, operand2);
            break;
        
        case "/":
            result = divide(operand1, operand2);
            break;
    }
    // round to 3 decimal places
    result = Math.round(result * 1000) / 1000;
    return result;
}

// display values
const equation = document.querySelector(".equation");
const output = document.querySelector(".output");


// CSS STYLING
// add hover effect to all the buttons
// add event listeners to all the buttons
const buttons = document.querySelectorAll('button');

let numbers = ["."];
for (let i = 0; i < 10; i++) {
    numbers.push(i.toString());
};
const operators = ["+", "-", "x", "÷"];

buttons.forEach((button) => {
    const buttonText = button.textContent;

    if (numbers.includes(buttonText)) {
        button.classList.add("numbers");
        button.addEventListener("click", setEquation);
    } else if (operators.includes(buttonText)) {
        button.classList.add("operators");
        button.addEventListener("click", setEquation);
    } else if (buttonText === "Clear" || buttonText === "Delete") {
        button.classList.add("clear-delete");
        if (buttonText === "Clear") {
            button.addEventListener("click", clear);
        } else {
            button.addEventListener("click", deleteFromEquation);
        }
    } else {
        button.classList.add("equal");
        button.addEventListener("click", setEquation);
    }
})

function setEquation() {
    // if value is a number and operand1 is the default 0 replace the default operand1
    // if value is a number and operand1 is not 0 & operator is "", append to operand 1
    // if value is an operator set operator to it 
    // if value is a number and operator is not "", make it operand 2
        // append if more

    const currentValue = this.textContent;
    const action = determineVariableToModify(currentValue);

    switch (action) {
        case "operand1Replace":
            operand1 = currentValue;
            getOutput("operand1");
            break;

        case "operand1":
            operand1 += currentValue;
            getOutput("operand1");
            break;

        case "operand2":
            operand2 += currentValue;
            getOutput("operand2");
            break;

        case "operator":
            operator = currentValue;
            getOutput("normalOperator");
            break;

        case "getOuput(operator)":
            getOutput(operator);
            break;

        case "getOutput('=')":
            getOutput('=');
            break;
    }

    

    // store the equation as an array, turn it into string when needed 
    // output.textContent = 

    // operate needs to have different effect depending on if it is triggered by operator or by = 
    // if by operator, make operand1 the result, display e.g. operand 1 & operator 
    // if by =, make operand1 the result as well, but 
}

function determineVariableToModify (currentValue) {
    let variableToModify;

    if (numbers.includes(currentValue)) {
        if (operand1 === "0") {
            variableToModify = "operand1Replace";
        } else if (operand1 !== "0" && operator === "") {
            if (!operand1.includes(".")) variableToModify = "operand1";
        } else if (operator !== "") {
            if (!operand2.includes(".")) variableToModify = "operand2";
        }
    } else if (operators.includes(currentValue)) {
        // if no operator is declared
        if (!operators.includes(operator)) {
            variableToModify = "operator";
        } else if (operand2 !== "") {
            variableToModify = "getOuput(operator)";
        }// if operator is declared and operand2 is not null than operate 
    } else if (currentValue === "=") {
        variableToModify = "getOutput('=')";
    }

    return variableToModify;
}

function getOutput(execution_operator) {
    // if equation ends in operator, ignore that operator
    // if you encounter .1, treat it as normal number
    let result = operate(operand1, operand2, operator); // what to do if outputting with =
    if (execution_operator === "=") {
        equation.textContent = `${operand1} ${operator} ${operand2} =`;
        output.textContent = result;

        operand1 = result.toString();
        operand2 = "";
        operator = "";
    } else if (operators.includes(execution_operator)) { // what to output if outputting with operator
        operand1 = result.toString();
        operand2 = "";
        operator = "";

        equation.textContent = `${operand1} ${operator}`;
        output.textContent = result;
    } else if (execution_operator === "operand1") {
        equation.textContent = `${operand1} ${operator} ${operand2}`;
        output.textContent = `${operand1}`;
    } else if (execution_operator === "operand2") {
        equation.textContent = `${operand1} ${operator} ${operand2}`;
        output.textContent = `${operand1}`;
    } else if (execution_operator === "normalOperator") {
        equation.textContent = `${operand1} ${operator} ${operand2}`;
    }



}

// remove all the displayed values
function clear() {
    operand1 = "";
    operand2 = "";
    operator = "";
    updateDisplay();
}

// update the display
function updateDisplay() {
    equation.textContent = `${operand1} ${operator} ${operand2}`;
    output.textContent = "0";
}

// delete from the equation
function deleteFromEquation() {
    
}