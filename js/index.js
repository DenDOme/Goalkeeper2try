import Goalkeeper from "./goalkeeper.js"
window.checkName = checkName
window.startGame = startGame

let userInput
function checkName(){
    let startButton = document.getElementById('startGame');
    if(document.getElementById('userName').value == ''){
        startButton.disabled = true;
    } 
    else{
        startButton.disabled = false;
    }
}
function startGame(){
    userInput = document.getElementById('userName').value;
    new Goalkeeper(userInput);
    console.log(userInput)
}


