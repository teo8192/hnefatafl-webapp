import { Hnefatafl, CellType } from "hnefatafl-webapp";
// Import the WebAssembly memory at the top of the file.
import { memory } from "hnefatafl-webapp/hnefatafl_webapp_bg";

let CELL_SIZE = 50;
const GRID_COLOR = "#CCCCCC";
const EMPTY_COLOR = "#BBBBBB";
const FORTRESS_COLOR = "#888888";
const ATTACKER_COLOR = "#000000";
const DEFENDER_COLOR = "#FFFFFF";
const KING_COLOR = "#FFFF00";

const game = Hnefatafl.new();
const width = game.width();
const height = game.height();

console.log(game.get_board())

const canvas = document.getElementById("hnefatafl-canvas");
canvas.width = width * (CELL_SIZE + 1) + 1;
canvas.height = height * (CELL_SIZE + 1) + 1;

const ctx = canvas.getContext("2d");

const renderLoop = () => {
    // logic?
    //universe.tick();

    drawGrid();

    game.copy_board_to_local();
    drawPieces();

    //requestAnimationFrame(renderLoop);
};

const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
        for (let i = 0; i <= width; i++) {
            ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
            ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
        }

    // Horizontal lines.
        for (let j = 0; j <= height; j++) {
            ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
            ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
        }

    ctx.stroke();
};

const getIndex = (x, y) => {
    return x + y * width;
};

const drawPieces = () => {
    const cellsPtr = game.tiles();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            console.log(idx);
            console.log(cells[idx]);

            switch (cells[idx]) {
                case CellType.Empty:
                    console.log("Empty at", row, col)
                    ctx.fillStyle = EMPTY_COLOR;
                    break;
                case CellType.Attacker:
                    console.log("Attacker at", row, col)
                    ctx.fillStyle = ATTACKER_COLOR;
                    break;
                case CellType.Defender:
                    console.log("Defender at", row, col)
                    ctx.fillStyle = DEFENDER_COLOR;
                    break;
                case CellType.King:
                    console.log("king at", row, col)
                    ctx.fillStyle = KING_COLOR;
                    break;
            }

            if (cells[idx] === CellType.Empty && (
                (row === 0 && col === 0) ||
                (row === 0 && col === 10) ||
                (row === 10 && col === 0) ||
                (row === 10 && col === 10) ||
                (row === 5 && col === 5))) {
                ctx.fillStyle = FORTRESS_COLOR;
            }

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.stroke();
};

requestAnimationFrame(renderLoop);
