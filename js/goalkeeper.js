export default class Goalkeeper{
    constructor(){
        this.initGame();
    }
    gameOptions = {
        nickName : '',
        gkSpeed : 1000,
        forgeSpeed: 300,
        gkCurr : 400,
        timer : 1 * 60,
        timerMode : 'limited',
        xDir : 1,
        lDir : 1,
        plScore : 0,
        plStreak : 0,
    }
    startGame(){
        if(this.gameOptions.timerMode !== 'unlimited'){
            this.countdownTimer();
        }
        this.gkMovement();
        this.initGC();
    }
    stopGame(){
        let getGameDisp = document.getElementById('game-screen');
        let getEndDisp = document.getElementById('end-screen');
        let getNameDisp = document.getElementById('playerName');
        let getPointDisp = document.getElementById('endScore');
        getGameDisp.style.display = 'none';
        getEndDisp.style.display = 'flex';
        getNameDisp.innerText = this.gameOptions.nickName;
        getPointDisp.innerHTML = this.gameOptions.plScore;
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
            if(this.gameOptions.timer == -1){
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
            this.gameOptions.nickName = userInputText.value;
            this.timer();
            this.removeStartDisp();
            this.addGameDisp();
            this.addName();
        })
    }
    gkMovement(){
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
        let personName = this.gameOptions.nickName;
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
        document.getElementById('cursor').style.transform = 'translateY('+(event.clientY-615)+'px)';
        document.getElementById('cursor').style.transform += 'translateX('+(event.clientX-30)+'px)';
    }
    forgeBar(){
        let createForgeBar = document.getElementById('forge');
        let createForgeLine = document.createElement('div');
        let allLines = document.querySelectorAll('.line');
        if(allLines.length >= 1){
            createForgeBar.removeChild(allLines[0]);
        }
        createForgeLine.classList.add('line');
        createForgeBar.appendChild(createForgeLine);
        let lineCurr = 15; 
        this.gameOptions.pChance = 1;
        this.gameOptions.fBar = setInterval(() => {
            lineCurr += this.gameOptions.lDir;
            createForgeLine.style.left = lineCurr + 'px';
            if(lineCurr >= 476){
                this.changeDirL();
            }
            if(lineCurr <= 14){
                this.changeDirL();
            }
            if(lineCurr >= 14 && lineCurr <= 93){
                this.gameOptions.pChance = 1
            }
            else if(lineCurr >= 94 && lineCurr <= 187){
                this.gameOptions.pChance = 2
            }
            else if(lineCurr >= 188 && lineCurr <= 281){
                this.gameOptions.pChance = 3
            }
            else if(lineCurr >= 282 && lineCurr <= 375){
                this.gameOptions.pChance = 4
            }
            else if(lineCurr >= 376 && lineCurr <= 476){
                this.gameOptions.pChance = 5
            }
        }, this.gameOptions.forgeSpeed/70);
    }
    initGC(){
        let createForceBar = document.getElementById('forge');
        createForceBar.style.display = 'none';
        let flag = true;
        let pointChance = 0;
        let getGameDisp = document.getElementById('game-screen');
        const clickListener = () => {
            if(flag == true){
                getGameDisp.removeEventListener('mousemove',this.moveGC,false);
                let createForceBar = document.getElementById('forge');
                createForceBar.style.display = 'flex';
                this.forgeBar(pointChance);
                flag = false
            }
            else if(flag == false){
                clearInterval(this.gameOptions.fBar);
                clearInterval(this.gameOptions.gkMove)
                this.checkGoal();
                flag = true;
                getGameDisp.removeEventListener('click' , clickListener);
            }
        }
        getGameDisp.addEventListener('mousemove',this.moveGC,false);
        getGameDisp.addEventListener('click', clickListener)
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
        let getScoreDisp = document.getElementById('score');
        let dispRect = document.getElementById('game-screen').getBoundingClientRect()
        let gateRect = document.getElementById('gate').getBoundingClientRect()
        let cursorRect = document.getElementById('cursor').getBoundingClientRect()
        let gkRect = document.getElementById('goalkeeper').getBoundingClientRect()
        let getActionDisp = document.getElementById('action');
        let CursorX = cursorRect.left+30;
        let CursorY = cursorRect.top+30;
        if(((CursorX >= dispRect.left && CursorX <= gateRect.left)||(CursorX >= gateRect.right && CursorX <= dispRect.right))||((CursorY >= dispRect.top && CursorY <= gateRect.top)||(CursorY >= gateRect.bottom && CursorY <= dispRect.bottom))){
            getActionDisp.innerHTML = 'out';
            this.gameOptions.plStreak = 0;
        }
        else if((CursorX >= (gkRect.left - 50)&& CursorX <= (gkRect.right+50))&&(CursorY >= (gkRect.top-50)&&(CursorY <= (gkRect.bottom)))){
            getActionDisp.innerHTML = 'gk catch'
            this.gameOptions.plStreak = 0;
        }
        else{
            let min = 1;
            let max = 100;
            let randomInt = this.getRandomIntInclusive(min,max);
            let answ = false
            if(this.gameOptions.plStreak >= 3){
                this.gameOptions.pChance += 1;
            }
            if(randomInt <= (this.gameOptions.pChance * 10)){
                answ = true
            }
            if(answ == true){
                getActionDisp.innerHTML = 'goal';
                this.gameOptions.plScore++;
                this.gameOptions.plStreak++;
                this.gameOptions.gkSpeed -= 10;
                getScoreDisp.innerHTML = this.gameOptions.plScore;
            }
            else{
                getActionDisp.innerHTML = 'catch';
                this.gameOptions.plStreak = 0;
            }
        }
        this.gameOptions.tempTimer = setTimeout(() => {
            this.initGC();
            this.gkMovement();
        }, 1000);
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); 
      }
}
