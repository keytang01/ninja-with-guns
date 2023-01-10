
export class GameStatus {
    constructor(gameData, playerData) {
        this.test = 0;
    }

    drawStatusBox(ctx, score, health, canvasWidth, canvasHeight) {
        ctx.fillStyle = "tomato";
        ctx.font = '20px Helvetica';
        ctx.fillText(" SCORE: " + score, 30, canvasHeight - 40);
        ctx.fillText("HEALTH: " + health, 30, canvasHeight - 70);
        // ctx.fillText("TESTING ", )
    }

    drawGameOver(ctx, score, canvasWidth, canvasHeight) {
        ctx.fillStyle = "red";
        ctx.font = '50px Helvetica';
        ctx.fillText("GAME OVER: " + score, canvasWidth / 2 - 200, canvasHeight / 2);
        // ctx.fillText("HEALTH: " + health, 30, canvasHeight - 70);
        // ctx.fillText("TESTING ", )
    }
}