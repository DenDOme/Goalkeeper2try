export default class Goalkeeper{
    constructor(){
        this.initGame();
        this.name;
    }
    gameOptions = {
        gkSpeed : 1000,
        gkCurr : 400,
        timer : 5 * 60,
        timerMode : 'limited',
        xDir : 1,
    }
    startGame(){
        // this.clearAll();
        this.removeStartDisp();
        this.addGameDisp();
        this.addName();
        this.timer();
        this.gkMovement();
    }
    timer(){
        let gameDisp = document.getElementById('body')
        let createEll = document.createElement('div');
        createEll.classList.add('countdown__number');
        let count = 3;
        let preTimer = setInterval(() => {
            gameDisp.removeChild(gameDisp.lastChild)
            createEll.innerHTML = count;
            count--;
            gameDisp.appendChild(createEll);
            if(count == -1){
                gameDisp.removeChild(gameDisp.lastChild)
                clearInterval(preTimer)
                this.countdownTimer();
            }
        }, 1000)
    }

    countdownTimer(){
        let realTimer = setInterval(() => {
            let timerDisp = document.getElementById('timer');
            let minutes = Math.floor(this.gameOptions.timer/60);
            let seconds = this.gameOptions.timer % 60;
    
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerDisp.innerHTML = `${minutes}: ${seconds}`;
            this.gameOptions.timer--;
            if(this.gameOptions.timer === -1){
                timerDisp.innerHTML = ''
                clearInterval(realTimer);
            }
        }, 1000)      
    }
    initGame(){
        let userInputText = document.getElementById('userName');
        let startGameBtn = document.getElementById('startGame');

        userInputText.addEventListener('keyup', () => {
            if(userInputText.value == ''){
                startGameBtn.disabled = true;
            } 
            else{
                startGameBtn.disabled = false;
            }
        })

        startGameBtn.addEventListener('click', () => {
            this.checkName(userInputText.value);
            this.name = userInputText.value;
            this.startGame()
        })
    }

    gkMovement(){
        let gameDisp = document.getElementById('gate');
        let gk = document.createElement('div');
        gk.classList.add('goalkeeper')
        gk.id = 'goalkeeper';
        gk.style.transform = "translateX(-50%)"
        gameDisp.appendChild(gk);
        let tempCurr = this.gameOptions.gkCurr;
        let gkMoveId = setInterval(() => {
            let gk = document.getElementById('goalkeeper')
            tempCurr += this.gameOptions.xDir;
            gk.style.left = tempCurr + 'px';
            if(tempCurr >= 800-55){
                this.changeDir()
            }
            if(tempCurr <= 45){
                this.changeDir();
            }
        }, this.gameOptions.gkSpeed/45);
    }
    checkName(name){
        if(name == 'tester'){
            this.gameOptions.timerMode = 'unlimited';
        }
        else{
            this.gameOptions.timerMode = 'limited';
        }
    }
    clearAll(){
        this.gameOptions.timer = 5 * 60;
        this.gameOptions.timerMode = 'limited';
        this.gameOptions.xDir = 1;

    }
    removeStartDisp(){
        let getStartDisp = document.getElementById('start-screen');
        getStartDisp.style.display = 'none';
    }
    addGameDisp(){
        let getGameDisp = document.getElementById('game-screen');
        getGameDisp.style.display = 'block';
    }
    addName(){
        let personName = this.name;
        let getUsernameDiv = document.getElementById('player');
        getUsernameDiv.innerHTML = personName;
    }
    changeDir(){
        if(this.gameOptions.xDir == 1){
            this.gameOptions.xDir = -1;
            return
        }
        if(this.gameOptions.xDir == -1){
            this.gameOptions.xDir = 1;
            return
        }
    }
}
