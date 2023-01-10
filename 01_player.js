// ---------------------------
// Creating Player class

import { BulletController } from "./08_bullet_controller.js";
import { GameData } from "./game_data.js";

// ---------------------------
export class Player {
    constructor (name, x, y, canvasWidth, canvasHeight, playerData, gun) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spriteWidth = playerData.spriteWidth;
        this.spriteHeight = playerData.spriteHeight;
        this.radius = playerData.radius;
        this.color = playerData.color;
        this.health = playerData.health;

        this.gunAngle = playerData.gunAngle;
        this.crosshairImage = new Image();
        this.crosshairImage.src = "./sprites/player/crosshair.png"
        this.image = new Image();
        this.image.src = playerData.imgSrc;
        this.sizeMultiplier = playerData.sizeMultiplier;

        this.velocity = playerData.velocity;
        this.velocityMultiplier = playerData.velocityMultiplier;
        this.totalFrames = playerData.totalFrames;
        this.frameSpeed = playerData.frameSpeed;
        this.imageOffsets = playerData.imageOffsets;
        
        // this.gun = new BulletController(); // revert to gun parameter to make this in main game?
        this.gun = gun; // revert to gun parameter to make this in main game?
        this.gameData = new GameData();
        this.mouseX = 0;
        this.mouseY = 0;

        // player state
        this.state = "idleDown";
        this.gameStatus = "unpaused";

        // image mapping
        this.imageMap = {
            idleDown: playerData.stateImageMap.idleDown,
            idleRight: playerData.stateImageMap.idleRight * playerData.spriteHeight,
            idleUp: playerData.stateImageMap.idleUp * playerData.spriteHeight,
            idleLeft: playerData.stateImageMap.idleLeft * playerData.spriteHeight,
            walkDown: playerData.stateImageMap.walkDown * playerData.spriteHeight,
            walkRight: playerData.stateImageMap.walkRight * playerData.spriteHeight,
            walkUp: playerData.stateImageMap.walkUp * playerData.spriteHeight,
            walkLeft: playerData.stateImageMap.walkLeft * playerData.spriteHeight,
            attackDown: playerData.stateImageMap.attackDown * playerData.spriteHeight,
            attackRight: playerData.stateImageMap.attackRight * playerData.spriteHeight,
            attackUp: playerData.stateImageMap.attackUp * playerData.spriteHeight,
            attackLeft: playerData.stateImageMap.attackLeft * playerData.spriteHeight,
            hitDown: playerData.stateImageMap.hitDown * playerData.spriteHeight,
            hitRight: playerData.stateImageMap.hitRight * playerData.spriteHeight,
            hitUp: playerData.stateImageMap.hitUp * playerData.spriteHeight,
            hitLeft: playerData.stateImageMap.hitLeft * playerData.spriteHeight,
            death: playerData.stateImageMap.death * playerData.spriteHeight
        }

        this.sound = new Audio();
        this.sound.src = this.gameData.bullets.pistol.soundSrc;

        // directions to hit mapping
        this.hitMap = {
            "idleDown": "hitDown",
            "idleRight": "hitRight",
            "idleUp": "hitUp",
            "idleLeft": "hitLeft",
            "walkDown": "hitDown",
            "walkRight": "hitRight",
            "walkUp": "hitUp",
            "walkLeft": "hitLeft",
            "hitDown": "hitDown",
            "hitRight": "hitRight",
            "hitUp": "hitUp",
            "hitLeft": "hitLeft",
        }

        this.hitToIdleMap = {
            "hitDown": "idleDown",
            "hitRight": "idleRight",
            "hitUp": "idleUp",
            "hitLeft": "idleLeft"
        }

        this.timer = 0;
        this.stateFrames = {
            idleDown: 0,
            idleRight: 0,
            idleUp: 0,
            idleLeft: 0,
            walkDown: 0,
            walkRight: 0,
            walkUp: 0,
            walkLeft: 0,
            attackDown: 0,
            attackRight: 0,
            attackUp: 0,
            attackLeft: 0,
            hitDown: 0,
            hitRight: 0,
            hitUp: 0,
            hitLeft: 0,
            death: 0
        }

        // weapons mapping
        this.weapons = {
            pistol: {
                state: "dude"
            }
        }

        this.keyWeaponMap = {
            "1": "pistol",
            "2": "shotgun",
            "3": "boltActionRifle",
            "4": "autoRifle",
            "5": "machinegun",
            "6": "rocketlauncher",
            "7": "chemrail",
            "8": "alienblaster",
            "9": "fatlady"
        };

        this.weaponRectangleMap = {
            1: [10, 20, 136, 40],
            2: [10, 60, 136, 40],
            3: [10, 100, 136, 40],
            4: [10, 140, 136, 40],
            5: [10, 180, 136, 40],
            6: [10, 220, 136, 40],
            7: [10, 260, 136, 40],
            8: [10, 300, 136, 40],
            9: [10, 340, 136, 40],
            // "7": "flamer",
        };

        this.currentWeapon = "pistol";

        this.weaponListImage = new Image();
        this.weaponListImage.src = "./sprites/gun_list.png";
        this.weaponRectangle = [10, 20, 136, 40]

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
        document.addEventListener("keypress", this.onKeyPress);
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault()
        });

        this.score = 0;
    }

    setGunAngle(angle) {
        this.gunAngle = angle;
    }

    draw_circle(ctx) {
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y, 
            this.radius, 
            0, 
            Math.PI * 2, 
            false
        );
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    drawGunRect(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.rect(this.weaponRectangle[0], this.weaponRectangle[1], this.weaponRectangle[2], this.weaponRectangle[3]);
        ctx.stroke();
    }

    drawCrosshair(ctx) {
        ctx.drawImage(
            this.crosshairImage,
            0, 0, 33, 33,
            this.mouseX - 16.5, this.mouseY - 16.5, 33, 33
        )
    }

    drawState(ctx) {
        ctx.drawImage(
            this.image, 
            this.stateFrames[this.state] * this.spriteWidth, 0 + this.imageMap[this.state], 
            this.spriteWidth, this.spriteHeight, 
            this.x - this.spriteWidth * this.sizeMultiplier / 2 + this.imageOffsets.x, 
            this.y - this.spriteHeight * this.sizeMultiplier / 2 + this.imageOffsets.y, 
            this.spriteWidth * this.sizeMultiplier, 
            this.spriteHeight * this.sizeMultiplier
        );
    }

    draw(ctx) {
        this.update();
        const frame = this.gameData.player.default.stateImageMap[this.state];

        // draw player
        this.drawState(ctx, this.stateFrames[this.state]);

        this.shoot();
        // draw weapons list
        ctx.drawImage(
            this.weaponListImage,
            0, 0, 136, 400,
            10, 20, 136, 400
        );
        this.drawGunRect(ctx);
        // this.draw_circle(ctx);
        this.drawCrosshair(ctx);
    }

    shoot() {
        if (this.shootPressed || this.slashPressed) {
            // console.log("shooting! bullets:", this.gun.bullets);
            const delay = 1;
            let angle = this.getAngle(this.mouseX, this.mouseY, this.x, this.y);
            this.gunAngle = angle;
            this.setGunAngle(angle);

            let frameData = {
                x: this.x,
                y: this.y,
                bulletAngle: angle,
                velocity: {
                    x: Math.cos(angle), 
                    y: Math.sin(angle)
                }
            }
            if (this.shootPressed) {
                this.gun.shoot(
                    frameData, 
                    this.gameData.bullets[this.currentWeapon], 
                    this.gameData.bullets[this.currentWeapon].fireRate
                );
            } else if (this.slashPressed) {
                this.gun.shoot(
                    frameData, 
                    this.gameData.bullets["sword"], 
                    this.gameData.bullets["sword"].fireRate
                );
            }
        }
        if (!this.shootPressed) {
            this.gun.advanceRoundTimer();
        }
        if (!this.slashPressed) {
            this.gun.advanceSlashTimer();
        }
    }

    update() {
        // updating frames data
        this.timer++;
        // console.log(this.frameSpeed)
        if (this.timer % this.frameSpeed[this.state] === 0){
            // console.log("timer reached frame speed")
            this.stateFrames[this.state]++;
            // console.log(this.stateFrames[this.state])
        }

        if (this.stateFrames[this.state] === this.totalFrames[this.state] - 1) {
            if (this.state == 'hitUp') {
                // console.log('reached state max frame after being hit:', this.state)
            }
            this.stateFrames[this.state] = 0;
            if (['hitUp', 'hitDown', 'hitLeft', 'hitRight'].includes(this.state)) {
                // console.log("hit, resetting state to idle")
                this.state = this.hitToIdleMap[this.state];
                // console.log("current state:", this.state)
            }
        }
        // add something after hit to go back to idle

        // updating location based directional key press
        if (this.leftPressed && this.x > 0 + this.radius){
            this.x = this.x - this.velocity * this.velocityMultiplier;
        }
        if (this.rightPressed && this.x < this.canvasWidth - this.radius){
            this.x = this.x + this.velocity * this.velocityMultiplier;
        }
        if (this.upPressed && this.y > 0 + this.radius){
            this.y = this.y - this.velocity * this.velocityMultiplier;
        }
        if (this.downPressed && this.y < this.canvasHeight - this.radius){
            this.y = this.y + this.velocity * this.velocityMultiplier;
        }
    }

    getAngle(xTarget, yTarget, xSource, ySource){
        const xDelta = xTarget - xSource;
        const yDelta = yTarget - ySource;
        const angle = Math.atan2(yDelta, xDelta);
        return angle;
    }

    adjustBulletStart(x, y, radius, angle){
        let xStart = radius * Math.cos(angle);
        let yStart = radius * Math.sin(angle);
        return [xStart, yStart];
    }

    keydown = (event) => {
        // console.log(this.state)
        if (event.code === "ArrowUp" || event.code === "KeyW") {
            this.upPressed = true;
            this.state = "walkUp";
        }
        if (event.code === "ArrowDown" || event.code === "KeyS") {
            this.downPressed = true;
            this.state = "walkDown";
        }
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
            this.leftPressed = true;
            this.state = "walkLeft";
        }
        if (event.code === "ArrowRight" || event.code === "KeyD") {
            this.rightPressed = true;
            this.state = "walkRight";
        }
    }

    keyup = (event) => {
        if (event.code === "ArrowUp" || event.code === "KeyW") {
            this.upPressed = false;
            this.state = "idleUp";
        }
        if (event.code === "ArrowDown" || event.code === "KeyS") {
            this.downPressed = false;
            this.state = "idleDown";
        }
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
            this.leftPressed = false;
            this.state = "idleLeft";
        }
        if (event.code === "ArrowRight" || event.code === "KeyD") {
            this.rightPressed = false;
            this.state = "idleRight";
        }
    }

    onMouseDown = (event) => {
        if (event.type === "mousedown" && event.button == 0) {
            this.shootPressed = true;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        }
        if (event.type === "mousedown" && event.button == 2) {
            this.slashPressed = true;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        }
    }
    onMouseUp = (event) => {
        if (event.type === "mouseup" && event.button == 0) {
            // console.log("mouse up button 0:", this.shootPressed)
            this.shootPressed = false;
            // console.log("mouse pressed up!  shot pressed:", this.shootPressed, "mouse:", this.mouseX, this.mouseY);
        }
        if (event.type === "mouseup" && event.button == 2) {
            //console.log("mouse up button 2:", this.shootPressed)
            this.slashPressed = false;
            //console.log("mouse pressed up! slash lifted:", this.slashPressed);
        }
    }
    onMouseMove = (event) => {
        if (event.type === "mousemove") {
            // this.shootPressed = true;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
            // console.log("mouse moved:", event);
        }
    }

    // weapon changes
    onKeyPress = (event) => {
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
            this.currentWeapon = this.keyWeaponMap[event.key];
            this.weaponRectangle = this.weaponRectangleMap[event.key];
            // console.log(event);
            // console.log('current weapon:', this.currentWeapon);
            // console.log('bullets:', this.gun.bullets[0]);
        }
        if (['KeyR'].includes(event.code)) {
            //console.log("   ")
            //console.log("R button activated, state:", this.gameStatus);
            if (this.gameStatus == "unpaused") {
                //console.log("game status changed to paused")
                this.gameStatus = "paused";
            } 
            else {
                console.log("game status changed to unpaused")
                this.gameStatus = "unpaused";
            }

        }
    }
}