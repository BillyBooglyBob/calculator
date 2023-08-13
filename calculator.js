/* 
PSEUDOCODE
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
round the output before displaying on screen 

store three different inputs, two are numbers and one is the operator.
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
function operate(operand1, operand2, operator) {
    let result;
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    switch (operator) {
        case "+":
            result = add(operand1, operand2);
            break;

        case "-":
            result = minus(operand1, operand2);
            break;

        case "x":
            result = times(operand1, operand2);
            break;
        
        case "÷":
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


// add hover effect to all the buttons
// add event listeners to all the buttons
const buttons = document.querySelectorAll('button');

// create a list of numbers as strings, used as the textContent of number 
// buttons are strings 
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

// Add in keyboard support
document.addEventListener("keydown", (e) => {
    if (numbers.includes(e.key)) {
        setEquation(e.key);
    } else if (operators.includes(e.key)) {
            setEquation(e.key);
    } else if (e.key === '*') {
        setEquation("x");
        console.log("MULTIPLY")
    } else if (e.key === "/") {
        setEquation("÷");
    } else if (e.key === "Enter" || e.key === "=") {
        setEquation("=");
    } else if (e.key === "Escape") {
        clear();
    } else if (e.key === "Backspace") {
        deleteFromEquation();
    }
})


// decide what action to take for each button press
function setEquation(value) {
    let currentValue;

    // section added for keyboard support
    if (this.textContent === undefined) {
        currentValue = value;
    } else {
        currentValue = this.textContent;
    }    
    const action = determineVariableToModify(currentValue);

    switch (action) {
        case "operand1Replace":
            operand1 = currentValue;
            getOutput("operand1");
            break;

        case "operand1":
            if (operand1.length < 22) {
                operand1 += currentValue;
                getOutput("operand1");
            }
            break;

        case "operand2":
            if (operand2.length < 22) {
                operand2 += currentValue;
                getOutput("operand2");
            }
            break;

        case "operator":
            operator = currentValue;
            getOutput("normalOperator");
            break;

        case "getOuput(operator)":
            getOutput(operator, currentValue);
            break;

        case "getOutput('=')":
            getOutput('=');
            break;
    }
}

// determine which variable to modify based on the button pressed
function determineVariableToModify (currentValue) {
    let variableToModify;
    
    // what to do if the value entered is a number
    if (numbers.includes(currentValue)) { 
        if (operator !== "") {  // if operator is present, only allowed to modify operand2
            if (!operand2.includes(".") || currentValue !== ".") variableToModify = "operand2"
        } else {  // if operator not present, modify operand1, replace 0 if it is present 
            if (operand1 === "0") {
                variableToModify = "operand1Replace";
            } else {
                if (!operand1.includes(".") || currentValue !== ".") variableToModify = "operand1"
            }
        }
    // what to do if the value entered is an operator
    } else if (operators.includes(currentValue)) {
        // store the current operator
        if (!operators.includes(operator)) {
            variableToModify = "operator";
        // allows for consecutive operation with only operators,
        // without needing to press = each time
        } else if (operand2 !== "") {  
            variableToModify = "getOuput(operator)";
        }
    // what to do if the value entered is =
    } else if (currentValue === "=") {
        const currentOutput = equation.textContent;

        // get the last character of the output
        const currentOutputArray = Array.from(currentOutput);
        const lastChar = currentOutputArray[currentOutputArray.length - 1];
        // only execute operation if operands are not empty and there isn't an = 
        if (lastChar !== "=" && (operator !== "" && operand2 !== "")) {
            variableToModify = "getOutput('=')"; 
        }
    }

    return variableToModify;
}

// used for deciding which variable to delete from
let numberEditing = "operand1";   

// update the outputs in the display of the calculator
function getOutput(execution_operator, next_operator) {
    let result = operate(operand1, operand2, operator);

    // update output when = is used
    if (execution_operator === "=") {
        equation.textContent = `${operand1} ${operator} ${operand2} =`;
        output.textContent = result;

        operand1 = result.toString();
        operand2 = "";
        operator = "";

    // update output when doing consecutive operations with operators
    } else if (operators.includes(execution_operator)) { 
        operand1 = result.toString();
        operand2 = "";
        operator = next_operator;

        updateEquation()
        output.textContent = result;
    
    // update screen when numbers are entered
    } else if (execution_operator === "operand1" || execution_operator === "operand2") {
        if (execution_operator === "operand1") {
            updateEquation()
            output.textContent = `${operand1}`;
            numberEditing = "operand1"; 
    
        } else if (execution_operator === "operand2") {
            updateEquation()
            output.textContent = `${operand2}`;
            numberEditing = "operand2";
        }
    // adding operator to the equation
    } else if (execution_operator === "normalOperator") {
        updateEquation()
    }

}

// remove all the displayed values
function clear() {
    operand1 = "0";  // provide a default value of 0
    operand2 = "";
    operator = "";
    output.textContent = "0";
    equation.textContent = "";
}

// update the equation with current values
function updateEquation() {
    equation.textContent = `${operand1} ${operator} ${operand2}`;
}

// delete from the equation
function deleteFromEquation() {
    // delete from the numbers
    if (numberEditing === "operand1" && operand1 !== "0") {
        operand1 = operand1.slice(0, -1);
        output.textContent = operand1;
        updateEquation()
    } else if (numberEditing === "operand2") {
        operand2 = operand2.slice(0, -1);
        output.textContent = operand2;
        updateEquation()
    }
}
