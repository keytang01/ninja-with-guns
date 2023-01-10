export class Effect {
    constructor({x, y, effectData}){
        this.x = x;
        this.y = y;
        this.spriteWidth = effectData.spriteWidth;
        this.spriteHeight = effectData.spriteHeight;
        this.radius = effectData.radius;
        this.sizeModifier = effectData.sizeModifier;
        this.damage = effectData.damage;
        this.state = "unexploded"

        this.image = new Image();
        this.image.src = effectData.imageSrc;
        this.imageOffsets = effectData.imageOffsets;
        this.sound = new Audio();
        this.sound.src = effectData.soundSrc;

        this.frame = 0;
        this.timer = 0;
        this.frameSpeed = effectData.frameSpeed;
    }
    update(){
        this.timer++;
        if (this.timer % this.frameSpeed === 0){
            this.frame++;
        }
    }

    drawCollisionCircle(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.lineWidth = "2";
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
            ctx.stroke();
    }

    drawUpdate(ctx){
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.drawImage(
            this.image, 
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x - this.spriteWidth * this.sizeModifier / 2 + this.imageOffsets.x, 
            this.y - this.spriteWidth * this.sizeModifier / 2 + this.imageOffsets.y, 
            this.spriteWidth * this.sizeModifier, 
            this.spriteHeight * this.sizeModifier
        );
        ctx.restore();
        // this.drawCollisionCircle(ctx);
        this.update();
    }

    drawUpdateAngled(ctx, angle) {
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);
        ctx.drawImage(
            this.image, 
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x - this.spriteWidth * this.sizeModifier / 2, 
            this.y - this.spriteWidth * this.sizeModifier / 2, 
            this.spriteWidth * this.sizeModifier, 
            this.spriteHeight * this.sizeModifier
        );
        ctx.restore();
        // this.drawCollisionCircle(ctx);
        this.update();
    }

    playSound() {
        this.sound.play();
    }
}