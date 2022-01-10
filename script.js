/* 
A button is clicked, and the currentDisplay is updated with its value.
as long as numbers are inputted, the currentDisplay is appended.

When an operand is clicked, pastDisplay takes the number that was in currentDisplay.
a function is run, and within the function it checks which button was clicked,
and runs the function for the respective operation.

When an operand function is called, the currentDisplay becomes empty.
Current display can then be updated with another number, UNTIL = or
another operand is selected.
*/

let allBtn = Array.from(document.getElementsByTagName('button'));
let numberBtn = Array.from(document.getElementsByClassName('numberBtn'));
let operandBtn = Array.from(document.getElementsByClassName('operandBtn'));
let currentDisplay = document.getElementById('screen2');
let pastDisplay = document.getElementById('screen1');

let total;
let operation = ["","",""];
let value1 = "";
let value2 = "";

//Button is clicked, currentDisplay updated with its value
numberBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        if(operation[1] == "" && operation[2] == ""){
            currentDisplay.textContent = "";
            // value1 = value1.concat(btn.textContent);
            operation[0] = operation[0].concat(btn.textContent);
            currentDisplay.textContent = operation[0];
            console.log(operation);
        };

        // if(operation.length == 1){
        //     currentDisplay.textContent = "";
        //     value2 = value2.concat(btn.textContent);
        //     currentDisplay.textContent = value2;
        //     console.log(operation);
        // };

        if(operation[0] !== "" && operation[1]!== ""){
            operation[2] = operation[2].concat(btn.textContent);
            currentDisplay.textContent = operation[2];
            console.log(operation);
        };
        
    });
});


//Operand is clicked
operandBtn.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        console.log(operation)
        pastDisplay.textContent = operation[0];
        if(operation[0] !== "" && operation[1] !== "" && operation[2] !== ""){
            // operation.push(value2);
            pastDisplay.textContent = (expressionEval(operation));
            operation[0] = expressionEval(operation).toString();
            operation[1] = "";
            operation[2] = "";
            console.log(operation);
        };

        if(e.target.textContent === "+"){

            if(operation[1] == "" && operation[2] == ""){
                currentDisplay.textContent = "";
                operation[1] = '+';
                console.log(operation);
            };
        };

        if(e.target.textContent === "-"){
            if(operation[1] == "" && operation[2] == ""){
                currentDisplay.textContent = "";
                operation[1] = '-';
                console.log(operation);
            };
        };

        if(e.target.textContent === "*"){
            if(operation[1] == "" && operation[2] == ""){
                currentDisplay.textContent = "";
                operation[1] = '*';
                console.log(operation);
            };
        };
        
        if(e.target.textContent === "/"){
            if(operation[1] == "" && operation[2] == ""){
                currentDisplay.textContent = "";
                operation[1] = '/';
                console.log(operation);
            };
        };
    });
});


//Expression evaluator
function expressionEval(expression){
    if(expression[1]==='+'){
        return Number(expression[0]) + Number(expression[2]);
    };
    if(expression[1]==='-'){
        return Number(expression[0]) - Number(expression[2]);
    };
    if(expression[1]==='*'){
        return Number(expression[0]) * Number(expression[2]);
    };
    if(expression[1]==='/'){
        return Number(expression[0])/Number(expression[2]);
    };

};

