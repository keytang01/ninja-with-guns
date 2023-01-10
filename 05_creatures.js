export class Creature {
    constructor (
        {
            x, y, canvasWidth, canvasHeight, frameSpeed, cc, velocity,
            creatureData
        }
    ) {
        this.name = creatureData.name;
        this.x = x;
        this.y = y;
        this.velocity = velocity;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight
        this.spriteWidth = creatureData.spriteWidth;
        this.spriteHeight = creatureData.spriteHeight;
        this.radius = creatureData.radius;
        this.health = creatureData.health;
        this.damage = creatureData.damage;
        this.score = creatureData.score;
        this.sizeMultiplier = creatureData.sizeMultiplier;
        this.frameSpeed = creatureData.frameSpeed;
        this.totalFrames = creatureData.totalFrames;


        this.facing = "neutral"
        this.state = "walk";

        this.frame = 0;
        this.idleFrame = 0;
        this.walkFrame = 0;
        this.hitFrame = 0;
        this.attackFrame = 0;
        this.deathFrame = 0;
        this.timer = 0;
        this.canBeHit = true;

        this.cc = cc;

        this.soundDeath = new Audio();
        this.soundDeath.src = "./sfx/gore.wav";
        this.soundInjured = new Audio();
        // this.soundInjured.src = "./sfx/doom_demon_injured.wav";

        this.image = new Image();
        this.image.src = creatureData.imageSrc;
        this.imageMap = {
            idle: creatureData.stateImageMap.idle,
            walk: creatureData.stateImageMap.walk * creatureData.spriteHeight,
            attack: creatureData.stateImageMap.attack * creatureData.spriteHeight,
            hit: creatureData.stateImageMap.hit * creatureData.spriteHeight,
            dying: creatureData.stateImageMap.death * creatureData.spriteHeight
        }

        this.stateFrameMap = {
            "idle": 0,
            "walk": 0,
            "attack": 0,
            "hit": 0,
            "dying": 0
        }

        this.stateImageMap = {
            "idle": this.imageMap.idle,
            "walk": this.imageMap.walk,
            "attack": this.imageMap.attack,
            "hit": this.imageMap.hit,
            "dying": this.imageMap.dying
        }


        // console.log('source offset', creatureData.imageOffsets)
        this.imageOffsets = creatureData.imageOffsets
        // console.log('class offset', this.imageOffsets)
    }

    checkPlayerLocation(playerX, playerY) {
        if (this.x <= playerX ) {

        }
    }

    updateCoords(playerX, playerY) {
        if (this.state !== "dying" && this.state !== "hit") {
            if (this.x < playerX - 5) {
                this.x +=this.velocity.x;
            } else if (this.x > playerX + 5) {
                this.x -= this.velocity.x;
            } else {
                //
            }
            if (this.y < playerY - 5) {
                this.y +=this.velocity.y;
            } else if (this.y > playerY + 5) {
                this.y -= this.velocity.y;
            } else {
                //
            }
        }
    }

    // updating action stateframes --> will condense code
    update() {
        this.timer++;
        if (this.timer % this.frameSpeed.walk === 0 && this.state == "walk"){
            //this.stateFrameMap["walk"] = 0;
            this.stateFrameMap["walk"]++;
            this.walkFrame++;
        }
        if (this.timer % this.frameSpeed.hit === 0 && this.state == "hit" ) {
            this.stateFrameMap["walk"] = 0;
            this.walkFrame = 0;
            this.stateFrameMap["hit"]++;
            this.hitFrame++;
        }
        if (this.timer % this.frameSpeed.attack === 0 && this.state == "attack") {
            this.stateFrameMap["attack"]++;
            this.attackFrame++;
        }
        if (this.timer % this.frameSpeed.death === 0 && this.state == "dying") {
            this.stateFrameMap["dying"]++;
            this.deathFrame++;
        }

        if (this.walkFrame == this.totalFrames.walk - 1){
            this.stateFrameMap["walk"] = 0;
            this.walkFrame = 0;
        }
        if (this.hitFrame == this.totalFrames.hit - 1){
            this.stateFrameMap["hit"] = 0;
            this.hitFrame = 0;
            this.state = "walk";
        }
        if (this.attackFrame == this.totalFrames.attack - 1){
            this.stateFrameMap["attack"] = 0;
            this.attackFrame = 0;
            this.state = "walk";
        }
        if (this.deathFrame == this.totalFrames.death - 1){
            this.state = "dead";
        }
        // slash reset:
        if (this.timer % this.frameSpeed.hit === 0 && !this.canBeHit) {
            // console.log("hit reset!")
            this.canBeHit = true;
            this.stateFrameMap["hit"] = 0;
            this.hitFrame = 0
        }
    }

    getAngle(x, y) {
        return Math.atan2(y, x);
    }

    checkFacing(playerX) {
        if (this.x <= playerX) {
            this.facing = 'right';
        } else {
            this.facing = 'left';
        }
    }

    draw_circle(){
        this.cc.beginPath();
        this.cc.arc(
            this.x,
            this.y, 
            this.radius, 
            0, 
            Math.PI * 2, 
            false
        );
        this.cc.strokeStyle = 'red';
        this.cc.stroke();
    }

    draw_line() {
        this.cc.lineWidth = 2;
        this.cc.beginPath();
        const angle = this.getAngle(this.velocity.x, this.velocity.y)
        const targetX = this.x + this.radius * Math.cos(angle);
        const targetY = this.y + this.radius * Math.sin(angle);
        // console.log(angle);
        // console.log(targetX, targetY);
        this.cc.moveTo(this.x, this.y)
        this.cc.lineTo(targetX, targetY)
        this.cc.strokeStyle = "blue";
        this.cc.stroke();
    }

    
    drawAnimation(playerX, playerY) {
        this.checkFacing(playerX);
        this.updateCoords(playerX, playerY)
        // this.draw_circle();
        if (this.facing == "left") {
            // console.log("drawing left:", playerX)
            this.cc.save();
            this.cc.translate(
                this.x,
                this.y
            );
            this.cc.scale(-1, 1);
            this.cc.drawImage(
                this.image, 
                this.stateFrameMap[this.state] * this.spriteWidth, 0 + this.stateImageMap[this.state],
                this.spriteWidth, 
                this.spriteHeight, 
                -this.spriteWidth * this.sizeMultiplier / 2 + this.imageOffsets.x, 
                -this.spriteHeight * this.sizeMultiplier / 2 + this.imageOffsets.y, 
                this.spriteWidth * this.sizeMultiplier, 
                this.spriteHeight * this.sizeMultiplier
            );
            this.cc.restore();
        } else {
            // console.log("drawing right:", playerX)
            this.cc.drawImage(
                this.image, 
                this.stateFrameMap[this.state] * this.spriteWidth, 0 + this.stateImageMap[this.state], // 
                this.spriteWidth, 
                this.spriteHeight, 
                this.x - this.spriteWidth * this.sizeMultiplier / 2 + this.imageOffsets.x, 
                this.y - this.spriteHeight * this.sizeMultiplier / 2 + this.imageOffsets.y, 
                this.spriteWidth * this.sizeMultiplier, 
                this.spriteHeight * this.sizeMultiplier
            );
        }
    }
}