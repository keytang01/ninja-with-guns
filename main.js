// creating a canvas variable that references the html canvas

import { Player } from './01_player.js';
import { Effect } from './02_animation_effects.js';
import { Projectile, Bullet, AnimatedBullet } from './03_projectiles.js';
import { Spawner } from './04_spawner.js';
import { Creature } from './05_creatures.js';
import { Guns } from './06_guns.js';
import { InputHandler } from './07_input.js';
import { GameData } from './game_data.js';
import { BulletController } from './08_bullet_controller.js';
import { Layer } from './09_layer.js';
import { GameStatus } from './10_game_status.js';
import { Game } from './00_game.js';

// const Player = require('./player.js');
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = "none";
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    console.log(canvas)
    console.log(`window width: ${canvas.width}, window height: ${canvas.height}`)

    const game = new Game(canvas.width, canvas.height, ctx);
    console.log(game);

    let lastTime = 0;

    // MAIN ANIMATION GAME LOOP:
    function animate(){ 

        let animationId = 0;
        let stoppedAt = 0;
        let animationStartTime = 0;
        // const deltaTime = timeStamp - lastTime;
        // lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.layer.draw(ctx, canvas.width, canvas.height);
        game.filterBullets();
        game.filterCreatures();
        game.filterExplosions();

        // drawing all entities and performing collision detection:
        game.detectCollision(animationId);
        game.player.draw(ctx);
        game.drawBullets();
        game.drawExplosions();
        game.gameStatus.drawStatusBox(ctx, game.player.score, game.player.health, canvas.width, canvas.height);

        // how do you continue from last animation frame from a paused state?
        if (game.player.gameStatus == "paused") {
            window.cancelAnimationFrame(animationId);
        } else if (game.player.gameStatus == "unpaused") {
            animationId = requestAnimationFrame(animate); 
        }
        
        // death = game over
        if (game.player.health <= 0) {
            game.gameStatus.drawGameOver(ctx, game.player.score, canvas.width, canvas.height);
            window.cancelAnimationFrame(animationId);
        }
    }
    animate();
    game.spawner.spawnCreatures();
});