export class Projectile {
    constructor ({x, y, velocity, canvasCtx, data}){
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.canvasCtx = canvasCtx;

        this.radius = data.radius;
        this.color = data.color;
        this.damage = data.damage;

        this.velocityMultiplier = data.velocityMultiplier;
        this.type = data.type;
        this.isSlash = data.isSlash;
        this.sound = new Audio();
    }

    drawCollisionCircle(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x = this.x + this.velocity.x * this.velocityMultiplier;
        this.y = this.y + this.velocity.y * this.velocityMultiplier;
    }

    playSound() {
        this.sound.play();
    }
}

export class Bullet extends Projectile {
    constructor({x, y, angle, velocity, canvasCtx, data}){
        super({x, y, velocity, canvasCtx, data});
        
        this.spriteWidth = data.spriteWidth;
        this.spriteHeight = data.spriteHeight;
        this.sizeModifier = data.sizeModifier;
        this.angle = angle;
        this.isDepleted = false;
        this.image = new Image();
        this.image.src = data.imgSrc;
        this.sound.src = data.soundSrc;
        this.timer = 0;
    }

    draw_bullet(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image, 
            0 - this.spriteWidth * this.sizeModifier / 2, 
            0 - this.spriteHeight * this.sizeModifier / 2, 
            this.spriteWidth * this.sizeModifier, this.spriteHeight * this.sizeModifier
        );
        ctx.restore();
        // this.drawCollisionCircle(ctx);
    }

    update() {
        this.x = this.x + this.velocity.x * this.velocityMultiplier;
        this.y = this.y + this.velocity.y * this.velocityMultiplier;
    }
}

export class AnimatedBullet extends Bullet {
    constructor({x, y, angle, velocity, canvasCtx, data}){
        super({x, y, angle, velocity, canvasCtx, data});
        this.totalFrames = data.frames;
        this.frameSpeed = data.frameSpeed;
        this.timer = 0;
        this.frame = 0;
        this.radius *= data.sizeModifier;
        if (this.isSlash) {
            this.radius = this.radius * 0.9
        }
        this.slashX = this.x + Math.cos(this.angle - Math.PI / 6) * this.radius / 2;
        this.slashY = this.y + Math.sin(this.angle - Math.PI / 6) * this.radius / 2;
    }

    update() {
        this.timer++;
        if (this.timer % this.frameSpeed === 0){
            this.frame++;
        }
        this.x = this.x + this.velocity.x * this.velocityMultiplier;
        this.y = this.y + this.velocity.y * this.velocityMultiplier;
        if (this.frame == this.totalFrames - 1){
            this.frame = 0;
            if (this.type == "slash") {
                this.isDepleted = true;
            }
        }
    }

    drawSlashCollisionCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.slashX, this.slashY, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    draw_bullet(ctx) {
        ctx.save();
        if (this.isSlash) {ctx.globalAlpha = 0.8;}
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image, 
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            0 - this.spriteWidth * this.sizeModifier / 2, 
            0 - this.spriteHeight * this.sizeModifier / 2, 
            this.spriteWidth * this.sizeModifier, this.spriteHeight * this.sizeModifier
        );
        ctx.restore();
        //this.drawCollisionCircle(ctx);
        // this.drawSlashCollisionCircle(ctx);
    }
}