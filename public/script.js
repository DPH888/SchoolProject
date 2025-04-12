let rows = 4;
let cols = 4;
let maxActive = 3;
let animFrames = 30;

let grid = [];
let active = [];
let gameState = { isGameOver: false, idleTime: 0 };

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
        }
    }
}

function resetGame() {
    gameState.isGameOver = false;
    gameState.idleTime = 0;
    active = [];
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
    }
}

function update() {
    if (gameState.isGameOver) return;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c].anim) grid[r][c].anim--;
        }
    }

    while (activeCells.length < maxActive) activateRandomCell();

    if (++gameState.idleTime > 120) gameState.isGameOver = true;
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

    let cell = grid[row][col];

    if (cell.active && !cell.clicked) {
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
    }
}

function mousedown() {
    handleClick(mouseX, mouseY);
}

resetGame();
