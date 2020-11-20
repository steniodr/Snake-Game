let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}
let points = 0;

function createBG(color) {
    context.fillStyle = color;
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake(color) {
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = color;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(color) {
    context.fillStyle = color;
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event) {
    if ((event.keyCode == 37 || event.keyCode == 65) && direction != 'right')    direction = 'left'; 
    if ((event.keyCode == 38 || event.keyCode == 87) && direction != 'down')     direction = 'up'; 
    if ((event.keyCode == 39 || event.keyCode == 68) && direction != 'left')     direction = 'right'; 
    if ((event.keyCode == 40 || event.keyCode == 83) && direction != 'up')       direction = 'down'; 
}

function startGame() {

    if(snake[0].x > 15*box && direction == "right")     snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left')           snake[0].x = 15 * box;
    if(snake[0].y > 15*box && direction == "down")      snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up')             snake[0].y = 15 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over !\nPontuação final: ' + points);
        }
    }
    
    //Game Modes
    if (points < 10){
        createBG('lightgreen');
        createSnake('green');
        drawFood('red');
    } else if (points >= 10 && points < 20){
        let mode = document.getElementById('game-mode')
        mode.innerHTML = "Deserto";
        mode.style.color = "#DE681F";
        document.getElementById('points').style.color = "#DE681F";

        createBG('#DE681F');
        createSnake('#EB9F15');
        drawFood('#EB2915');
    } else if (points >= 20 && points < 30){
        let mode = document.getElementById('game-mode')
        mode.innerHTML = "Pôr do Sol";
        mode.style.color = "#FF761A";
        document.getElementById('points').style.color = "#FF761A";

        createBG('#FF761A');
        createSnake('#D1201C');
        drawFood('#711BF5');
    } else if (points >= 30 && points < 50){
        let mode = document.getElementById('game-mode')
        mode.innerHTML = "Espaço";
        mode.style.color = "#000000";
        document.getElementById('points').style.color = "#000000";
        document.getElementById('snake').style.borderColor = "#FFFFFF";

        createBG('#000000');
        createSnake('#575757');
        drawFood('#FFFFFF');
    } else if (points >= 50){
        let mode = document.getElementById('game-mode')
        mode.innerHTML = "Além";
        mode.style.color = "#1764FF";
        document.getElementById('points').style.color = "#1764FF";
        document.getElementById('snake').style.borderColor = "#000000";

        createBG('#1764FF');
        createSnake('#FFFFFF');
        drawFood('#E65CC9');
    }

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if (direction == 'right')    snakeX += box;    
    if (direction == 'left')     snakeX -= box;    
    if (direction == 'up')       snakeY -= box;    
    if (direction == 'down')     snakeY += box;  
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
    }else{
        points++;
        document.getElementById('points').innerHTML = `Sua Pontuação ( ${points} )`
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);
}

function start(){
    document.getElementById('instructions').style.display = "none";
    document.getElementById('game').style.display = "flex";
    document.getElementById('points').style.display = "block";
    document.getElementById('game-mode').style.display = "block";
}
let jogo = setInterval(startGame, 100);

function reload(){
    document.location.reload();
}

