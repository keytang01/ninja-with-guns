export class GameData {
    constructor(){
        this.player = {
            default: {
                spriteWidth: 64,
                spriteHeight: 64,
                radius: 20,
                color: "blue",
                health: 100,
                name: "Test",
                gunAngle: 1.57,
                imgSrc: "./sprites/player/ninja_moves.png",
                sizeMultiplier: 1.2,
                velocity: 2.5,
                velocityMultiplier: 1,
                imageOffsets: {
                    x: 0,
                    y: 0
                },
                stateImageMap: {
                    idleDown: 0,
                    idleRight: 1,
                    idleUp: 2,
                    idleLeft: 3,
                    walkDown: 4,
                    walkRight: 5,
                    walkUp: 6,
                    walkLeft: 7,
                    attackDown: 8,
                    attackRight: 9,
                    attackUp: 10,
                    attackLeft: 11,
                    hitDown: 12,
                    hitRight: 13,
                    hitUp: 14,
                    hitLeft: 15,
                    death: 16
                },
                frameSpeed: {
                    idleDown: 5,
                    idleRight: 5,
                    idleUp: 5,
                    idleLeft: 5,
                    walkDown: 5,
                    walkRight: 5,
                    walkUp: 5,
                    walkLeft: 5,
                    attackDown: 5,
                    attackRight: 5,
                    attackUp: 5,
                    attackLeft: 5,
                    hitDown: 5,
                    hitRight: 5,
                    hitUp: 5,
                    hitLeft: 5,
                    death: 5
                },
                totalFrames: {
                    idleDown: 8,
                    idleRight: 8,
                    idleUp: 8,
                    idleLeft: 8,
                    walkDown: 8,
                    walkRight: 8,
                    walkUp: 8,
                    walkLeft: 8,
                    attackDown: 6,
                    attackRight: 6,
                    attackUp: 6,
                    attackLeft: 6,
                    hitDown: 3,
                    hitRight: 3,
                    hitUp: 3,
                    hitLeft: 3,
                    death: 5
                },
            }
        }
        this.bullets = {
            "rotating": {
                gun: "machinegun",
                spriteWidth: 24,
                spriteHeight: 24,
                sizeModifier: 1.2,
                radius: 10,
                color: "red",
                damage: 40,
                imgSrc: "./sprites/bullets/rotating_bullet.png",
                frames: 15,
                frameSpeed: 1,
                velocityMultiplier: 5,
                fireRate: 2,
                type: "rotating",
                soundSrc: "./sfx/guns/machinegun.wav"
            },
            "pistol": {
                gun: "pistol",
                spriteWidth: 24,
                spriteHeight: 24,
                sizeModifier: 0.8,
                radius: 6,
                color: "red",
                damage: 30,
                imgSrc: "./sprites/bullets/pistol_bullet.png",
                frames: 0,
                frameSpeed: 2,
                velocityMultiplier: 10,
                fireRate: 20,
                type: "directional",
                soundSrc: "./sfx/guns/pistol.wav"
            },
            "shotgun": {
                gun: "shotgun",
                spriteWidth: 16,
                spriteHeight: 16,
                sizeModifier: 0.8,
                radius: 8,
                color: "red",
                damage: 20,
                imgSrc: "./sprites/bullets/shotgun_pellet.png",
                frames: 0,
                frameSpeed: 1,
                velocityMultiplier: 12,
                fireRate: 60,
                type: "scatter",
                pellets: 12,
                soundSrc: "./sfx/guns/shotgun.mp3"
            },
            "boltActionRifle": {
                gun: "rifle",
                spriteWidth: 30,
                spriteHeight: 5,
                sizeModifier: 1.2,
                radius: 8,
                color: "red",
                damage: 120,
                imgSrc: "./sprites/bullets/machinegun_bullet.png",
                frames: 0,
                frameSpeed: 1,
                velocityMultiplier: 25,
                fireRate: 60,
                type: "directional",
                pellets: 8,
                soundSrc: "./sfx/guns/shotgun.mp3"
            },
            "autoRifle": {
                gun: "autorifle",
                spriteWidth: 30,
                spriteHeight: 5,
                sizeModifier: 1.2,
                radius: 8,
                color: "red",
                damage: 60,
                imgSrc: "./sprites/bullets/machinegun_bullet.png",
                frames: 0,
                frameSpeed: 1,
                velocityMultiplier: 20,
                fireRate: 7,
                type: "directional",
                pellets: 8,
                soundSrc: "./sfx/guns/shotgun.mp3"
            },
            "machinegun": {
                gun: "machinegun",
                spriteWidth: 24,
                spriteHeight: 24,
                sizeModifier: 0.8,
                radius: 8,
                color: "red",
                damage: 40,
                imgSrc: "./sprites/bullets/rotating_bullet.png",
                frames: 15,
                frameSpeed: 1,
                velocityMultiplier: 15,
                fireRate: 5,
                type: "rotating",
                soundSrc: "./sfx/guns/machinegun.wav"
            },
            "chemrail": {
                gun: "chemrail",
                spriteWidth: 120,
                spriteHeight: 18,
                sizeModifier: 1,
                radius: 3,
                color: "red",
                damage: 50,
                imgSrc: "./sprites/bullets/chemrail_bullet.png",
                frames: 5,
                frameSpeed: 5,
                velocityMultiplier: 50,
                fireRate: 2,
                type: "chemrail",
                soundSrc: "./sfx/guns/chemrail.mp3"
            },
            "rocketlauncher": {
                gun: "rocketlauncher",
                spriteWidth: 58,
                spriteHeight: 34,
                sizeModifier: 0.8,
                radius: 20,
                color: "red",
                damage: 0,
                imgSrc: "./sprites/bullets/red_missile.png",
                frames: 3,
                frameSpeed: 5,
                velocityMultiplier: 8,
                fireRate: 70,
                type: "rocket",
                soundSrc: "./sfx/guns/rocket.wav"
            },
            "alienblaster": {
                gun: "alien",
                spriteWidth: 128,
                spriteHeight: 128,
                sizeModifier: 1,
                radius: 30,
                color: "red",
                damage: 500,
                imgSrc: "./sprites/bullets/green_shiz.png",
                frames: 3,
                frameSpeed: 5,
                velocityMultiplier: 10,
                fireRate: 5,
                type: "alien",
                soundSrc: "./sfx/guns/green_stuff.wav"
            },
            "fatlady": {
                gun: "nuke",
                spriteWidth: 66,
                spriteHeight: 68,
                sizeModifier: 1.4,
                radius: 30,
                color: "red",
                damage: 500,
                imgSrc: "./sprites/bullets/flame_bullet.png",
                frames: 12,
                frameSpeed: 5,
                velocityMultiplier: 4,
                fireRate: 300,
                type: "nuke",
                soundSrc: "./sfx/guns/nuke.wav"
            },
            "sword": {
                gun: "sword",
                spriteWidth: 96,
                spriteHeight: 96,
                sizeModifier: 2,
                radius: 30,
                color: "blue",
                damage: 80,
                imgSrc: "./sprites/bullets/sword_slash.png",
                frames: 4,
                frameSpeed: 5,
                velocityMultiplier: 0,
                fireRate: 120,
                type: "slash",
                isSlash: true,
                soundSrc: "./sfx/guns/sword.mp3"
            }
        };
        this.guns = {
            shotgun: {
                ammoRounds: 12,
                fireRate: 10,
                shotsFired: 10
            }
        };
        this.creatures = {
            // "bat": {
            //     name: "bat",
            //     spriteWidth: 48,
            //     spriteHeight: 40,
            //     radius: 35,
            //     health: 100,
            //     sizeMultiplier: 1.5,
            //     frameSpeed: 10,
            //     totalFrames: 8,
            //     totalHitFrames: 4,
            //     imgMoveRightSrc: "./sprites/flying_eye_move_right.png",
            //     imgMoveLeftSrc: "./sprites/flying_eye_move_left.png",
            //     imgDeathRightSrc: "./sprites/flying_eye_death_right.png",
            //     imgDeathLeftSrc: "./sprites/flying_eye_death_left.png",
            //     imgHitRightSrc: "./sprites/flying_eye_hit_right.png",
            //     imgHitLeftSrc: "./sprites/flying_eye_hit_left.png",
            //     soundDeathSrc: "./sfx/gore.wav",
            //     soundInjuredSrc: "./sfx/doom_demon_injured.wav"
            // },
            "bat": {
                name: "bat",
                spriteWidth: 96,
                spriteHeight: 96,
                radius: 20,
                health: 80,
                damage: 5,
                score: 5,
                sizeMultiplier: 1,
                velocity: {
                    x: 0.8,
                    y: 0.8
                },
                imageOffsets: {
                    x: 0,
                    y: 4
                },
                stateImageMap: {
                    idle: 0,
                    idle2: 0,
                    walk: 1,
                    attack: 2,
                    hit: 5,
                    death: 6
                },
                frameSpeed: {
                    idle: 10,
                    walk: 10,
                    attack: 4,
                    hit: 3,
                    death: 8,
                },
                totalFrames: {
                    idle: 8,
                    walk: 8,
                    attack: 7,
                    hit: 9,
                    death: 14,
                },
                totalHitFrames: 4,
                imageSrc: "./sprites/creatures/Bat-96x96-Idle-walk_walk_atk_transition-atk_instance-atk_hurt_death.png",
                soundDeathSrc: "./sfx/gore.wav",
                soundInjuredSrc: "./sfx/doom_demon_injured.wav"
            },
            "skeleton": {
                name: "skeleton",
                spriteWidth: 128,
                spriteHeight: 128,
                radius: 20,
                health: 150,
                damage: 10,
                score: 10,
                sizeMultiplier: 1,
                velocity: {
                    x: 0.6,
                    y: 0.6
                },
                imageOffsets: {
                    x: 0,
                    y: -8
                },
                stateImageMap: {
                    idle: 0,
                    idle2: 0,
                    walk: 1,
                    attack: 2,
                    hit: 3,
                    death: 4
                },
                frameSpeed: {
                    idle: 10,
                    walk: 10,
                    attack: 2,
                    hit: 3,
                    death: 8,
                },
                totalFrames: {
                    idle: 7,
                    walk: 8,
                    attack: 15,
                    hit: 11,
                    death: 13,
                },
                totalHitFrames: 4,
                imageSrc: "./sprites/creatures/Skeleton-128x128-Idle-walk-atk-hurt-death.png",
                soundDeathSrc: "./sfx/gore.wav",
                soundInjuredSrc: "./sfx/doom_demon_injured.wav"
            },
            "zombie": {
                name: "zombie",
                spriteWidth: 96,
                spriteHeight: 96,
                radius: 20,
                health: 200,
                damage: 15,
                score: 20,
                sizeMultiplier: 1.2,
                imageOffsets: {
                    x: 0,
                    y: 4
                },
                velocity: {
                    x: 0.4,
                    y: 0.4
                },
                stateImageMap: {
                    idle: 0,
                    idle2: 1,
                    walk: 2,
                    attack: 3,
                    hit: 4,
                    death: 5
                },
                frameSpeed: {
                    idle: 10,
                    walk: 10,
                    attack: 5,
                    hit: 3,
                    death: 8,
                },
                totalFrames: {
                    idle: 8,
                    walk: 8,
                    attack: 15,
                    hit: 11,
                    death: 13,
                },
                totalHitFrames: 4,
                imageSrc: "./sprites/creatures/Undead-96x96-Idle-Idle2-walk-atk-hurt-death.png",
                soundDeathSrc: "./sfx/gore.wav",
                soundInjuredSrc: "./sfx/doom_demon_injured.wav"
            },
            "zombieBoss": {
                name: "zombieBoss",
                spriteWidth: 96,
                spriteHeight: 96,
                radius: 60,
                health: 20000,
                sizeMultiplier: 5,
                imageOffsets: {
                    x: 0,
                    y: 4
                },
                velocity: {
                    x: 0,
                    y: 0.2
                },
                stateImageMap: {
                    idle: 0,
                    idle2: 1,
                    walk: 2,
                    attack: 3,
                    hit: 4,
                    death: 5
                },
                frameSpeed: {
                    idle: 10,
                    walk: 10,
                    attack: 5,
                    hit: 5,
                    death: 8,
                },
                totalFrames: {
                    idle: 8,
                    walk: 8,
                    attack: 15,
                    hit: 11,
                    death: 13,
                },
                totalHitFrames: 4,
                imageSrc: "./sprites/creatures/Undead-96x96-Idle-Idle2-walk-atk-hurt-death.png",
                soundDeathSrc: "./sfx/gore.wav",
                soundInjuredSrc: "./sfx/doom_demon_injured.wav"
            },
            "ufo": {
                name: "bat",
                spriteWidth: 48,
                spriteHeight: 40,
                radius: 35,
                health: 100,
                sizeMultiplier: 1.5,
                totalFrames: 8,
                totalHitFrames: 4,
                imgMoveRightSrc: "./sprites/flying_eye_move_right.png",
                imgMoveLeftSrc: "./sprites/flying_eye_move_left.png",
                imgDeathRightSrc: "./sprites/flying_eye_death_right.png",
                imgDeathLeftSrc: "./sprites/flying_eye_death_left.png",
                imgHitRightSrc: "./sprites/flying_eye_hit_right.png",
                imgHitLeftSrc: "./sprites/flying_eye_hit_left.png",
                soundDeathSrc: "./sfx/gore.wav",
                soundInjuredSrc: "./sfx/doom_demon_injured.wav"
            }
        }
        this.levelsData = {
            spawnProb: {
                level1 : {
                    "bat": 0.4,
                    "skeleton": 0.4,
                    "zombie": 0.2,
                    // "zombieBoss": 0.7,
                }
            }
        }
        this.effects = {
            "rocket": {
                spriteWidth: 48,
                spriteHeight: 54,
                radius: 60,
                damage: 100,
                sizeModifier: 2.5,
                totalFrames: 15,
                frameSpeed: 6,
                imageOffsets: {
                    x: 0,
                    y: -10
                },
                imageSrc: "./sprites/effects/medium_explosion.png",
                soundSrc: "./sfx/explosions/rocket.wav"
            },
            "big_explosion": {
                spriteWidth: 112,
                spriteHeight: 124,
                radius: 80,
                damage: 100,
                sizeModifier: 1.2,
                totalFrames: 22,
                frameSpeed: 5,
                imageOffsets: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./sprites/effects/big_explosion.png",
                soundSrc: "./sfx/explosions/rocket.wav"
            },
            "nuke": {
                spriteWidth: 450,
                spriteHeight: 450,
                radius: 240,
                damage: 500,
                sizeModifier: 1.4,
                totalFrames: 15,
                frameSpeed: 8,
                imageOffsets: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./sprites/effects/spinning_explosion.png",
                soundSrc: "./sfx/explosions/nuke.wav"
            }
        }
        this.background = {
            "desert": {
                imgSrc: "./sprites/background/desert1/png"
            }
        }
    }
}