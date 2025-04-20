let rows = 4;
let cols = 4;
let maxActive = 3;
let animFrames = 30;

let grid = [];
let active = [];
let gameState = { isGameOver: false, idleTime: 0 };

// Добавяме променливи за проследяване
let clickedSquares = 0; // Брой кликнати квадратчета
let reactionTimes = []; // Масив за времената на реакция
let startTime; // Време на активиране на клетка

function initGrid() {
    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
            grid[r][c] = { active: false, clicked: false, anim: 0 };
        }
    }
}

function activateRandomCell() {
    if (active.length < maxActive) {
        let options = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!grid[r][c].active && grid[r][c].anim === 0) {
                    options.push({ r, c });
                }
            }
        }

        if (options.length) {
            let pick = options[Math.floor(Math.random() * options.length)];
            grid[pick.r][pick.c].active = true;
            grid[pick.r][pick.c].clicked = false;
            active.push(pick);
            startTime = Date.now(); // Записваме времето, когато клетката става активна
        }
    }
}

function resetGame() {
    gameState.isGameOver = false;
    gameState.idleTime = 0;
    active = [];
    clickedSquares = 0; // Нулираме броя на кликванията
    reactionTimes = []; // Нулираме времената за реакция
    initGrid();
    while (active.length < maxActive) activateRandomCell();
}

function draw() {
    let size = Math.min(canvas.width, canvas.height) / rows * 0.7;
    let offsetX = (canvas.width - cols * size) / 2;
    let offsetY = (canvas.height - rows * size) / 2;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let x = offsetX + c * size;
            let y = offsetY + r * size;
            let cell = grid[r][c];

            if (cell.active && !cell.clicked) {
                drawImage(black_tile, x, y, size, size);
            } else if (cell.anim > 0 && !gameState.isGameOver) {
                context.globalAlpha = cell.anim / animFrames;
                drawImage(green_tile, x + 0.01, y + 0.01, size - 0.02, size - 0.02);
                context.globalAlpha = 1;
            }
            context.strokeRect(x, y, size, size);
        }
    }

    if (gameState.isGameOver) {
        context.fillStyle = "red";
        context.font = "40px Arial";
        context.fillText("Game Over!", canvas.width / 2 - 100, 50);
        // Показваме резултатите на екрана
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText(`Clicked Squares: ${clickedSquares}`, canvas.width / 2 - 80, 80);
        context.fillText(`Avg Reaction Time: ${calculateAverageReactionTime()}ms`, canvas.width / 2 - 80, 110);
    }
}

function calculateAverageReactionTime() {
    if (reactionTimes.length === 0) return 0;
    let total = reactionTimes.reduce((sum, time) => sum + time, 0);
    return Math.round(total / reactionTimes.length); // Средно време в милисекунди
}

function update() {
    if (gameState.isGameOver) return;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c].anim) grid[r][c].anim--;
        }
    }

    while (active.length < maxActive) activateRandomCell();

    if (++gameState.idleTime > 120) {
        gameState.isGameOver = true;
        // Когато играта свърши, изпращаме резултатите към сървъра
        saveScore(calculateAverageReactionTime(), clickedSquares);
    }
}

function handleClick(x, y) {
    if (gameState.isGameOver) {
        resetGame();
        return;
    }

    let size = Math.min(canvas.width, canvas.height) / rows * 0.7;
    let offsetX = (canvas.width - cols * size) / 2;
    let offsetY = (canvas.height - rows * size) / 2;
    let row = Math.floor((y - offsetY) / size);
    let col = Math.floor((x - offsetX) / size);

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        let cell = grid[row][col];

        if (cell.active && !cell.clicked) {
            let clickTime = Date.now() - startTime; // Изчисляваме времето за реакция
            reactionTimes.push(clickTime); // Добавяме времето към масива
            clickedSquares++; // Увеличаваме броя на кликнатите квадратчета

            cell.clicked = true;
            cell.active = false;
            cell.anim = animFrames;

            for (let i = active.length - 1; i >= 0; i--) {
                if (active[i].r === row && active[i].c === col) {
                    active.splice(i, 1);
                }
            }
            activateRandomCell();
            gameState.idleTime = 0;
        } else {
            gameState.isGameOver = true;
            saveScore(calculateAverageReactionTime(), clickedSquares); // Изпращаме резултатите
        }
    }
}

function mousedown() {
    handleClick(mouseX, mouseY);
}

// Функция за изпращане на данни към сървъра
function saveScore(reactionTime, clickedSquares) {
    fetch('http://localhost:3000/save-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reactionTime: reactionTime,
            clickedSquares: clickedSquares
        })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error saving score:', error));
}

resetGame();