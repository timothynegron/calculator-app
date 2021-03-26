// ┌─────────────────────────────────┐
// │   Initialize Global Variables   │	
// └─────────────────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operator = "";
let buttonClickedValue = "";
let result = "";
let pointNotClicked = true;
let resultDoesNotExist = true;
let operatorNotClickedPreviously = true;

const displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");

const buttonPoint = ".";
const buttonEquals = "=";
const buttonAllClear = "AC";
const buttonPlus = "+";
const buttonSubtract = "-";
const buttonMultiply = document.querySelector("#button-multiply").innerText;
const buttonDivide = document.querySelector("#button-divide").innerText;

// ┌─────────────────────────┐
// │   Set Event Listeners   │	
// └─────────────────────────┘
setEventListeners();

// ┌─────────────────────────────┐
// │   Event Listener Function   │	
// └─────────────────────────────┘
function setEventListeners(){

    // Get all Buttons
    const allButtons = document.querySelectorAll(".calc-button");

    // Set all Buttons
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].addEventListener("click", buttonClickedReadValue);
    }
}

// ┌───────────────────────────────────────────────┐
// │   Read The Button That Was Clicked Function   │	
// └───────────────────────────────────────────────┘
function buttonClickedReadValue(){
    
    buttonClickedValue = event.target.innerText;

    switch(buttonClickedValue){

        case buttonPlus:
        case buttonSubtract:
        case buttonMultiply:
        case buttonDivide:
        case buttonEquals:
            operatorClicked();
            break;

        case buttonPoint:
            pointClicked();
            break;

        case buttonAllClear:
            allClearClicked();
            break;

        default:
            numberClicked();
            break;
    }
}

// ┌──────────────────────────────┐
// │   Button Clicked Functions   │	
// └──────────────────────────────┘

function operatorClicked(){

    // Check if equals button was Clicked
    if(buttonClickedValue === buttonEquals){
        operatorEqualsClicked();
    }

    // If equals button not clicked, do something only if there is NOT a first number
    else if(firstNumber !== ""){
        operatorEqualsNotClicked();
    }
}

function operatorEqualsClicked(){

    // Only calculate only if there is an existing value for each variable
    if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
        if(isValidResult()){
            updateBottomDisplayWithResult();
            resetVariablesEqualsClicked();
        }
    }
}

function operatorEqualsNotClicked(){

    // If operators [ + || - || * || / ] was NOT Clicked previously
    if(operatorNotClickedPreviously){
        operatorEqualsNotClickedSetOperator();
    }

    // Operators [ + || - || * || / ] was Clicked previously
    else{
        operatorEqualsNotClickedAgain();
    }
}

function operatorEqualsNotClickedSetOperator(){

    operatorNotClickedPreviously = false;

    buildStringOperator();
    updateBottomDisplayWithCurrentExpression();
    resetPointNotClicked();
}

function operatorEqualsNotClickedAgain(){

    // If there is not a second number update the operator
    if(secondNumber === ""){
        buildStringOperator();
        updateBottomDisplayWithCurrentExpression();
    }

    // If there is a second number and valid result
    if(secondNumber !== "" && isValidResult()){
        setFirstNumberWithResult();
        buildStringOperator();
        resetSecondNumber();
        updateBottomDisplayWithCurrentExpression();
    }
}

function pointClicked(){

    // If point was NOT Clicked previously AND operator was not
    if(pointNotClicked && operatorNotClickedPreviously === true){

        pointNotClicked = false;

        // Add the point to First Number
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // If point was NOT Clicked previously AND operator was
    if(pointNotClicked && operatorNotClickedPreviously === false){

        pointNotClicked = false;

        // Add the point to Second Number
        buildStringSecondNumber();
        updateBottomDisplayWithCurrentExpression();
    }
}

function allClearClicked(){

    updateTopAndBottomDisplayAllClear();
    resetVariablesAllClearClicked();
}

function numberClicked(){

    // If a operator was NOT Clicked previously
    if(operatorNotClickedPreviously){
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // Operator Clicked previously AND a first number exist
    else{
        buildStringSecondNumber();
        updateBottomDisplayWithCurrentExpression();
    }
}

// ┌────────────────────┐
// │   Math Functions   │	
// └────────────────────┘

function isValidResult(){

    result = calculate();

    updateTopDisplayWithPreviousExpression();
    
    if(isNaN(result)){
        updateBottomDisplayWithErrorMessage();
        resetVariablesAllClearClicked();
        return false;
    }

    return true;
}

function calculate(){

    if(operator === buttonPlus){
        return Number(firstNumber) + Number(secondNumber);
    }

    if(operator === buttonSubtract){
        return Number(firstNumber) - Number(secondNumber);
    }

    if(operator === buttonMultiply){
        return Number(firstNumber) * Number(secondNumber);
    }

    if(operator === buttonDivide){
        return Number(firstNumber) / Number(secondNumber);
    }
}

// ┌──────────────────────┐
// │   Helper Functions   │	
// └──────────────────────┘

function buildStringFirstNumber(){

    // If no result from a previous equation exist, build the first number
    if(resultDoesNotExist){
        firstNumber += buttonClickedValue;
    }
}

function buildStringSecondNumber(){
    secondNumber += buttonClickedValue;
}

function buildStringOperator(){
    operator = buttonClickedValue;
}

function updateBottomDisplayWithCurrentExpression(){
    displayBottom.innerText = firstNumber + operator + secondNumber;
}

function updateBottomDisplayWithResult(){
    displayBottom.innerText = result; 
}

function updateBottomDisplayWithErrorMessage(){
    displayBottom.innerText = "Not a Number";
}

function updateTopDisplayWithPreviousExpression(){
    displayTop.innerText = firstNumber + operator + secondNumber;
}

function updateTopAndBottomDisplayAllClear() {
    displayBottom.innerHTML = "";
    displayTop.innerHTML = "";
}

function resetVariablesAllClearClicked(){
    resetFirstNumber();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    resetPointNotClicked();
    resetResultDoesNotExist();
}

function resetVariablesEqualsClicked(){
    setFirstNumberWithResult();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    pointNotClicked = false;
    resultDoesNotExist = false;
}

function resetFirstNumber(){
    firstNumber = "";
}

function resetSecondNumber(){
    secondNumber = "";
}

function resetOperator(){
    operator = "";
}

function resetOperatorNotClickedPreviously(){
    operatorNotClickedPreviously = true;
}

function resetPointNotClicked(){
    pointNotClicked = true;
}

function resetResultDoesNotExist(){
    resultDoesNotExist = true;
}

function setFirstNumberWithResult(){
    firstNumber = result;
}
