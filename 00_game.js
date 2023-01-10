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


export class Game {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.gameStatus = new GameStatus();
        this.gameData = new GameData();
        this.layer = new Layer(1026, 768, './sprites/background/environment_forest_evening.png');
        this.bulletController = new BulletController();
        this.player = new Player(
            'Ke', this.width / 2, this.height - 100,
            this.width, this.height,
            this.gameData.player.default, this.bulletController
        );
        this.gun = new Guns(Bullet, 6, 10);

        this.creatures = [];
        this.spawner = new Spawner(Creature, ctx, this.width, this.height, this.creatures, 500);

        this.explosions = [];
        this.bullets = [];
        this.scatters = [];
        this.angle = 0;
        this.bulletCoords = [];

        this.start = 0;
        this.end = 10;
        this.frameTimer = 0;
    }

    filterBullets() {
        this.player.gun.bullets = this.player.gun.bullets.filter(
            bullet =>
                ((bullet.y < this.height && bullet.y > 0) && (bullet.x < this.width && bullet.x > 0))
                && bullet.isDepleted === false
        );
    }

    filterExplosions() {
        this.explosions.forEach((explosion, indexE) => {
            if (explosion.frame === 24) {
                this.explosions.splice(indexE, 1);
            }
        })
    }

    filterCreatures() {
        this.spawner.objectArray = this.spawner.objectArray.filter(
            creature => creature.y < this.height
                && creature.state != "dead"
        );
    }

    drawBullets() {
        this.player.gun.bullets.forEach((bullet) => {
            bullet.draw_bullet(this.ctx);
            bullet.update();
        })
    }

    drawExplosions() {
        for (let i = 0; i < this.explosions.length; i++) {
            this.explosions[i].drawUpdate(this.ctx);
        }
    }

    detectCollision(animationId) {
        // draw all creatures
        this.spawner.objectArray.forEach((creature, indexC) => {
            creature.drawAnimation(this.player.x, this.player.y);
            creature.update();

            // remove dead creature and add to player score
            if (creature.state == "dead") {
                this.player.score += creature.score; 6
                this.spawner.objectArray.splice(indexC, 1);
            }

            // collision between creatures and player:
            const dist = Math.hypot(creature.x - this.player.x, creature.y - this.player.y);
            if (dist <= this.player.radius + creature.radius) {

                // creature will attack player unless dying
                if (creature.state != "dying") {
                    creature.state = "attack";
                    if (creature.attackFrame == creature.totalFrames.attack - 2) {
                        this.player.health -= creature.damage / creature.frameSpeed.attack;
                        this.player.state = this.player.hitMap[this.player.state];
                    }
                }
            }

            // between creatures and projectiles:
            this.player.gun.bullets.forEach((bullet, indexP) => {
                let dist;
                if (bullet.isSlash) {
                    dist = Math.hypot(bullet.slashX - creature.x, bullet.slashY - creature.y);
                } else {
                    dist = Math.hypot(bullet.x - creature.x, bullet.y - creature.y);
                }
                if (dist <= bullet.radius + creature.radius && creature.state !== "dying") {
                    // remove projectile and creature?
                    setTimeout(() => {
                        if (creature.canBeHit) {
                            creature.state = "hit";
                            if (bullet.isSlash) {
                                creature.health -= bullet.damage / bullet.frameSpeed;
                                creature.canBeHit = false;
                            } else {
                                creature.health -= bullet.damage;
                            }
                        }
                        if (creature.health <= 0) {
                            creature.state = "dying";
                            creature.canBeHit = false;
                            creature.soundDeath.volume = 0.6;
                            creature.soundDeath.play();
                        } else {
                            // creature.soundInjured.play();
                        }

                        // remove bullet
                        if (bullet.type == "rocket" || bullet.type == "nuke") {
                            this.explosions.push(new Effect({
                                x: bullet.x,
                                y: bullet.y,
                                effectData: this.gameData.effects[bullet.type]
                            }));
                        }
                        if (!bullet.isSlash) {
                            bullet.isDepleted = true;
                        }
                    }, 0);
                }
            })

        })

        // between creature and explosions:
        this.explosions.forEach((explosion) => {
            this.spawner.objectArray.forEach((creature, indexC) => {
                const dist = Math.hypot(creature.x - explosion.x, creature.y - explosion.y);
                if (
                    dist <= creature.radius + explosion.radius
                    && creature.state !== "dying"
                    && creature.health > 0
                    && explosion.state == "unexploded"
                ) {
                    try {
                        explosion.playSound();
                        creature.state = "hit";
                        creature.health -= explosion.damage;
                        if (creature.health <= 0) {
                            creature.state = "dying";
                            creature.soundDeath.volume = 0.1;
                            creature.soundDeath.play();
                            this.player.score += creature.score;
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            });
            explosion.state = "exploded";
        });
    }
}