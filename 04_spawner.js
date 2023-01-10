import { GameData } from "./game_data.js";

export class Spawner {
    constructor(Creature, canvasCtx, canvasWidth, canvasHeight, objectArray, intervalLen){
        this.Creature = Creature;
        this.canvasCtx = canvasCtx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.objectArray = objectArray;
        this.intervalLen = intervalLen;
        this.gameData = new GameData();
        this.currentSpawnProbMap = {};
    }

    setCurrentLevel(level) {
        let cumProb = 0;
        for (let creature in this.gameData.levelsData.spawnProb[level]) {
            this.currentSpawnProbMap[creature] = [cumProb, cumProb + this.gameData.levelsData.spawnProb[level][creature]];
            cumProb += this.gameData.levelsData.spawnProb[level][creature];
        }
    }

    randomizeProperties() {
        const x = Math.random() * this.canvasWidth + 180;
        const y = 0;
        const radius = Math.round(Math.random() * 10) + 40;
        const color = 'green';
        const velocity = {
            x: 0,
            y: 1
        }
        return [x, y, radius, color, velocity];
    }

    spawnCreatures(objectArray) {
        setInterval(() => {
            const results = this.randomizeProperties();
            const x = results[0], y = results[1], radius = results[2], color = results[3], velocity = results[4];

            this.setCurrentLevel("level1");
            let roll = Math.random();
            for (let creature in this.currentSpawnProbMap) {
                // console.log(roll, '__', this.currentSpawnProbMap[creature][0], '__', this.currentSpawnProbMap[creature][1]);
                if (this.currentSpawnProbMap[creature][0] < roll && roll < this.currentSpawnProbMap[creature][1]) {
                    // console.log('spawning:', creature)
                    const entity = new this.Creature({
                        x: x, 
                        y: y, 
                        canvasWidth: this.canvasWidth, 
                        canvasHeight: this.canvasHeight,
                        cc: this.canvasCtx,
                        velocity: this.gameData.creatures[creature].velocity,
                        creatureData: this.gameData.creatures[creature]
                    });
                    this.objectArray.push(entity);
                }
            }
            // console.log('hello', this.objectArray);
            // console.log(projectiles);
            // console.log(explosions);
        }, this.intervalLen)
    }

    getObjectArray(){
        return this.objectArray;
    }
}