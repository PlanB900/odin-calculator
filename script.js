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
let equalsBtn = document.getElementById('equalsBtn');
let decimalBtn = document.getElementById('decimalBtn');
let numberBtn = Array.from(document.getElementsByClassName('numberBtn'));
let clearBtn = document.getElementById('clearBtn');
let allClearBtn = document.getElementById('allClearBtn');
let operandBtn = Array.from(document.getElementsByClassName('operandBtn'));
let currentDisplay = document.getElementById('screen2');
let pastDisplay = document.getElementById('screen1');

let total;
let operation = ["","",""];
let value1 = "";
let value2 = "";

//Button is clicked, currentDisplay updated with its value
//Conditions check to know whether to update first or second value 
//in the equation with digits
numberBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        if(operation[1] == "chain"){
            operation[0] = "";
            operation[1] = "";
            pastDisplay.textContent = "";
        }
        if(operation[1] == "" && operation[2] == ""){
            currentDisplay.textContent = "";
            // value1 = value1.concat(btn.textContent);
            operation[0] = operation[0].concat(btn.textContent);
            currentDisplay.textContent = operation[0];
            console.log(operation);
        };

        if(operation[0] !== "" && operation[1]!== ""){
            operation[2] = operation[2].concat(btn.textContent);
            currentDisplay.textContent = operation[2];
            console.log(operation);
        };
    });
});

//C is clicked
clearBtn.addEventListener('click',()=>{

    //Removes 'chain' from operation, in case wrong calculation was made
    if(operation[1] == "chain"){
        operation[1] = "";
    };

    //Clear when only the first element of operation is present
    if(operation[0] !== "" && operation[1] == "" && operation[2] == ""){
        if(pastDisplay.textContent.length > 0){
            pastDisplay.textContent = pastDisplay.textContent.slice(0,-1);
        };
        if(operation[0].length > 0){
            operation[0] = operation[0].slice(0,-1);
        };
        if(currentDisplay.textContent.length > 0){
            currentDisplay.textContent = currentDisplay.textContent.slice(0,-1);
        };
    };

    //Clear when third element of operation is empty, like if wrong operand is clicked
    if(operation[0] !== "" && operation[1] !== "" && operation[2] == ""){
        pastDisplay.textContent = pastDisplay.textContent.slice(0,-1);
        operation[1] = "";
    }

    //Clear when all three spots in operation are full, equation ready to be calculated
    if(operation[2] !== ""){
        currentDisplay.textContent = currentDisplay.textContent.slice(0,-1);
        operation[2] = operation[2].slice(0,-1);
    };

    console.log(operation);
});

//AC is clicked
allClearBtn.addEventListener('click',()=>{
    pastDisplay.textContent = "";
    currentDisplay.textContent = "";
    operation[0] = "";
    operation[1] = "";
    operation[2] = "";
});

//Equals is clicked
equalsBtn.addEventListener('click',()=>{
    //Full equation is present
    if(operation[0] !== "" && operation[1] !== "" && operation[2] !== ""){
        pastDisplay.textContent = (expressionEval(operation));
        currentDisplay.textContent = "";
        operation[0] = expressionEval(operation).toString();
        operation[1] = "chain";
        operation[2] = "";
        console.log(operation);
    }
});

// . is clicked
decimalBtn.addEventListener('click',()=>{
    if(operation[2] == "" && operation[1] == "" && !operation[0].includes(".")){
        operation[0] = operation[0].concat(".");
        currentDisplay.textContent = operation[0];
    }
    if(operation[1] !== "" && !operation[2].includes(".")){
        operation[2] = operation[2].concat(".");
        currentDisplay.textContent = operation[2];
    }
});


//Operand is clicked
operandBtn.forEach(btn=>{
    btn.addEventListener('click',(e)=>{

        console.log(operation)
        pastDisplay.textContent = operation[0];

        //Overwrites current operand if second number hasn't been inputted
        if(operation[0] !== "" && operation[1] !== "" && operation[2] == ""){
            operation[1] = "";
        };
        
        //Evaluates expression, moves result to operation[0]
        if(operation[0] !== "" && operation[1] !== "" && operation[2] !== ""){
            pastDisplay.textContent = (expressionEval(operation));
            operation[0] = expressionEval(operation).toString();
            operation[1] = "";
            operation[2] = "";
            console.log(operation);
        };

        if(e.target.textContent === "+" && operation[0] !== ""){
            if(operation[1] == "" || operation[1]=='chain'){
                currentDisplay.textContent = "";
                pastDisplay.textContent = pastDisplay.textContent.concat("+");
                operation[1] = '+';
                console.log(operation);
            };
        };

        if(e.target.textContent === "-" && operation[0] !== ""){
            if(operation[1] == "" || operation[1]=='chain'){
                currentDisplay.textContent = "";
                pastDisplay.textContent = pastDisplay.textContent.concat("-");
                operation[1] = '-';
                console.log(operation);
            };
        };

        if(e.target.textContent === "*" && operation[0] !== ""){
            if(operation[1] == "" || operation[1]=='chain'){
                currentDisplay.textContent = "";
                pastDisplay.textContent = pastDisplay.textContent.concat(" x");
                operation[1] = '*';
                console.log(operation);
            };
        };
        
        if(e.target.textContent === "/" && operation[0] !== ""){
            if(operation[1] == "" || operation[1]=='chain'){
                currentDisplay.textContent = "";
                pastDisplay.textContent = pastDisplay.textContent.concat("/");

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

