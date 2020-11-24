window.onload=function(){
    canvas = document.getElementById("gameboard");
    ctx = canvas.getContext("2d");
    mainfunction = setInterval(game, 1000/10);
    document.addEventListener("keydown", dir);
}

let vx = 1, vy = 0;
let key = 39;

let snake = [[5, 5]];
let food = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];

function move() {
    if (key == 37) {
        vx = -1;
        vy = 0;
    }
    if (key == 38) {
        vx = 0;
        vy = -1;
    }
    if (key == 39) {
        vx = 1;
        vy = 0;
    }
    if (key == 40) {
        vx = 0;
        vy = 1;
    }
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i][0] = snake[i - 1][0];
        snake[i][1] = snake[i - 1][1];
    }
    snake[0][0] = (snake[0][0] + vx + 20) % 20;
    snake[0][1] = (snake[0][1] + vy + 20) % 20;
}

function foodeat() {
    if (snake[0][0] == food[0] && snake[0][1] == food[1])
        return 1;
    return 0;
}

function death() {
    for (let i = 1; i < snake.length; i++) 
        if (snake[i][0] == snake[0][0] && snake[i][1] == snake[0][1]) {
            while (i <= snake.length) {
                console.log("gegeg000");
                snake.pop();
            }
        }
}

function draw() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = "#000000";
    snake.forEach(body => {
        ctx.fillRect(body[0] * 20, body[1] * 20, 20, 20);    
    });
    ctx.fillStyle = "#00ffd5";
    ctx.fillRect(food[0] * 20, food[1] * 20, 20, 20);
}

function game() {
    move();
    death();

    if (foodeat()) {
        console.log("before", snake)
        snake.push([-1, -1]);
        console.log(snake)
        food = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
    }
    draw();
}

function dir(e) {
    key = e.which;
}