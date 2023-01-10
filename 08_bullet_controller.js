import { Bullet, AnimatedBullet } from "./03_projectiles.js";

export class BulletController {

    constructor(){
        // this.canvas = canvas;
        this.bullets = [];
        this.timeToNextRound = 0;
        this.timeToNextSlash = 0;

        this.gunSoundMap = {
            pistol: new Audio(),
            shotgun: new Audio(),
            rifle: new Audio(),
            autorifle: new Audio(),
            machinegun: new Audio(),
            rocket: new Audio(),
            chemrail: new Audio(),
            alien: new Audio(),
            nuke: new Audio(),
            sword: new Audio()
        }; 

        // this.sound.src = "./sfx/light_machinegun.mp3"
        this.gunSoundMap.pistol.src = "./sfx/guns/pistol.wav";
        this.gunSoundMap.shotgun.src = "./sfx/guns/shotgun.mp3";
        this.gunSoundMap.rifle.src = "./sfx/guns/rifle.wav";
        this.gunSoundMap.autorifle.src = "./sfx/guns/autorifle.wav";
        this.gunSoundMap.machinegun.src = "./sfx/guns/machinegun.wav";
        this.gunSoundMap.rocket.src = "./sfx/guns/rocket.wav";
        this.gunSoundMap.chemrail.src = "./sfx//guns/chemrail.mp3";
        this.gunSoundMap.alien.src = "./sfx/guns/green_stuff.wav";
        this.gunSoundMap.nuke.src = "./sfx/guns/nuke.wav";
        this.gunSoundMap.sword.src = "./sfx/guns/sword.mp3";
    }


    shoot(frameData, projectileData, delay){
        if (this.timeToNextRound <= 0) {
            const bulletData = {
                x: frameData.x,
                y: frameData.y,
                angle: frameData.bulletAngle,
                velocity: {
                    x: Math.cos(frameData.bulletAngle),
                    y: Math.sin(frameData.bulletAngle)
                },
                data: projectileData,
            }

            switch(projectileData.type, projectileData.gun) {
                case "directional", "pistol": 
                    this.bullets.push(new Bullet(bulletData));
                    this.gunSoundMap.pistol.cloneNode().play();
                    break;
                case "directional", "rifle": 
                    this.bullets.push(new Bullet(bulletData));
                    this.gunSoundMap.rifle.cloneNode().play();
                    break;
                case "directional", "autorifle": 
                    this.bullets.push(new Bullet(bulletData));
                    this.gunSoundMap.rifle.cloneNode().play();
                    break;
                case "rotating", "machinegun": 
                    this.bullets.push(new AnimatedBullet(bulletData));
                    this.gunSoundMap.machinegun.cloneNode().play();
                    break;
                case "rocket", "rocketlauncher":
                    this.bullets.push(new AnimatedBullet(bulletData));
                    this.gunSoundMap.rocket.play();
                    break;
                case "chemrail", "chemrail": 
                    this.bullets.push(new AnimatedBullet(bulletData));
                    this.gunSoundMap.chemrail.play();
                    break;
                case "nuke":
                    this.bullets.push(new AnimatedBullet(bulletData));
                    this.gunSoundMap.nuke.volume = 0.4;
                    this.gunSoundMap.nuke.play();
                    break;
                case "alien": 
                    this.bullets.push(new AnimatedBullet(bulletData));
                    this.gunSoundMap.alien.cloneNode().play();
                    break;
                case "scatter", "shotgun": 
                    let currentAngle = frameData.bulletAngle - Math.PI / 16;
                    for (let i = 0; i < projectileData.pellets; i++){
                        bulletData.angle = currentAngle;
                        bulletData.velocity = {x: Math.cos(currentAngle), y: Math.sin(currentAngle)}
                        this.bullets.push(new Bullet(bulletData));
                        currentAngle += Math.PI / 60;
                    };
                    this.gunSoundMap.shotgun.cloneNode().play();
                    break;
                case "slash", "sword": 
                    bulletData.angle += Math.PI / 6 // adjust slightly for more accurate sword angle
                    this.bullets.push(new AnimatedBullet(bulletData));
                    this.gunSoundMap.sword.cloneNode().play();
                    break;
                }
            this.timeToNextRound = delay;
            this.timeToNextSlash = delay;
        }
        this.timeToNextRound--;
        this.timeToNextSlash--;
    }

    advanceRoundTimer() {
        this.timeToNextRound--;
    }
    advanceSlashTimer() {
        this.timeToNextSlash--;
    }
}