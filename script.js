const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 100;
const paddleWidth = 10;
const ballSize = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;

let keyUp = false;
let keyDown = false;

function draw() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
}

function move() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY - ballSize / 2 <= 0 || ballY + ballSize / 2 >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if ((ballX - ballSize / 2 <= paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
        (ballX + ballSize / 2 >= canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight)) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with left and right walls (score)
    if (ballX - ballSize / 2 <= 0 || ballX + ballSize / 2 >= canvas.width) {
        // Reset ball to the center
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }

    // Move left paddle (CPU) with a delay
    const cpuDelay = 0.1; // You can adjust this value to make the CPU easier or harder
    paddle1Y += (ballY - (paddle1Y + paddleHeight / 2)) * cpuDelay;

    // Clamp the paddle's Y position within the canvas boundaries
    paddle1Y = Math.max(0, Math.min(canvas.height - paddleHeight, paddle1Y));

    // Move right paddle based on keyboard input
    if (keyUp) {
        paddle2Y -= 5;
    }
    if (keyDown) {
        paddle2Y += 5;
    }

    // Clamp the paddle's Y position within the canvas boundaries
    paddle2Y = Math.max(0, Math.min(canvas.height - paddleHeight, paddle2Y));
}

function gameLoop() {
    move();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', function (event) {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseY = event.clientY - canvasRect.top;
    paddle2Y = mouseY - paddleHeight / 2;
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        keyUp = true;
    } else if (event.key === 'ArrowDown') {
        keyDown = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowUp') {
        keyUp = false;
    } else if (event.key === 'ArrowDown') {
        keyDown = false;
    }
});

gameLoop();

function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles with gradient
    const gradient1 = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient1.addColorStop(0, '#ff9a9e');
    gradient1.addColorStop(1, '#fad0c4');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);

    const gradient2 = ctx.createLinearGradient(canvas.width - paddleWidth, 0, canvas.width, canvas.height);
    gradient2.addColorStop(0, '#a1c4fd');
    gradient2.addColorStop(1, '#c2e9fb');
    ctx.fillStyle = gradient2;
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball with gradient
    const gradient3 = ctx.createRadialGradient(ballX, ballY, 1, ballX, ballY, ballSize);
    gradient3.addColorStop(0, 'white');
    gradient3.addColorStop(1, '#84fab0');
    ctx.fillStyle = gradient3;
    ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
}

