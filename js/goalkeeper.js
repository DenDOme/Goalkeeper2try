export default class Goalkeeper{
    constructor(){
        this.initGame();
        this.name;
    }
    gameOptions = {
        gkSpeed : 1000,
        forgeSpeed: 300,
        gkCurr : 400,
        timer : 5 * 60,
        timerMode : 'limited',
        xDir : 1,
        lineCur:14,
        lDir : 1,
    }
    startGame(){
        if(this.gameOptions.timerMode !== 'unlimited'){
            this.countdownTimer();
        }
        this.gkMovement();
        this.initGC();
    }
    stopGame(){

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
                this.startGame();
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
                this.stopGame();
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
            this.timer();
            this.removeStartDisp();
            this.addGameDisp();
            this.addName();
        })
    }
    gkMovement(){
        let gameDisp = document.getElementById('gate');
        let gk = document.createElement('div');
        gk.classList.add('goalkeeper')
        gk.id = 'goalkeeper';
        gk.style.transform = "translateX(-50%)"
        gameDisp.appendChild(gk);
        this.gameOptions.gkMove = setInterval(() => {
            let gk = document.getElementById('goalkeeper')
            this.gameOptions.gkCurr += this.gameOptions.xDir;
            gk.style.left = this.gameOptions.gkCurr + 'px';
            if(this.gameOptions.gkCurr >= 800-55){
                this.changeDir()
            }
            if(this.gameOptions.gkCurr <= 45){
                this.changeDir();
            }
        },this.gameOptions.gkSpeed/70);
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
    moveGC(event){
        document.getElementById('cursor').style.display = 'block';
        document.getElementById('cursor').style.transform = 'translateY('+(event.clientY-640)+'px)';
        document.getElementById('cursor').style.transform += 'translateX('+(event.clientX-30)+'px)';  
    }
    forgeBar(pChance){
        let createForgeBar = document.getElementById('forge');
        let createForgeLine = document.createElement('div');
        let allLines = document.querySelectorAll('.line');
        if(allLines.length >= 1){
            createForgeBar.removeChild(allLines[0]);
        }
        createForgeLine.classList.add('line');
        createForgeBar.appendChild(createForgeLine);
        let lineCurr = 14; 
        this.gameOptions.fBar = setInterval(() => {
            lineCurr += this.gameOptions.lDir;
            createForgeLine.style.left = lineCurr + 'px';
            if(lineCurr >= 476){
                this.changeDirL();
            }
            if(lineCurr <= 14){
                this.changeDirL();
            }
        }, this.gameOptions.forgeSpeed/70);
    }
    initGC(){
        let flag = true;
        let pointChance = 0;
        let getGameDisp = document.getElementById('game-screen');
        getGameDisp.addEventListener('mousemove',this.moveGC,false);
        getGameDisp.addEventListener('click', ()=>{
            if(flag == true){
                getGameDisp.removeEventListener('mousemove',this.moveGC,false);
                let createForceBar = document.getElementById('forge');
                createForceBar.style.display = 'flex';
                this.forgeBar(pointChance);
                flag = false
            }
            else if(flag == false){
                clearInterval(this.gameOptions.fBar);
                this.checkGoal();
                flag = true;
            }
        })
    }
    changeDirL(){
        if(this.gameOptions.lDir == 1){
            this.gameOptions.lDir = -1;
            return
        }
        if(this.gameOptions.lDir == -1){
            this.gameOptions.lDir = 1;
            return
        }
    }
    checkGoal(){
        
    }
}
