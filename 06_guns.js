export class Guns {
    constructor(
        Bullet,
        fireRate, 
        shotsFired
        // ammoType, ammoRounds, 
    )
    {
        //this.name = name;
        this.Bullet = Bullet;
        //this.ammoType = name;
        //this.ammoRounds = name;
        this.fireRate = fireRate;
        this.shotsFired = shotsFired;
        this.frame = 0;
        this.frameInterval = 500;
        this.frameTimer = 0;
        this.start = 1;
        this.end = 10;
        this.bulletAngle = 0
    }

    testTimer({bulletAngle, frameData, bulletData, bulletsArray, deltaTime}){
        // console.log('starting test firing:', deltaTime);
        this.bulletAngle = bulletAngle;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            // this.bulletAngle = this.bulletAngle - Math.PI / 10;
            this.fireRound({frameData: frameData, bulletData: bulletData, bulletsArray: bulletsArray});
            // this.bulletAngle = this.bulletAngle + Math.PI / 40;
            console.log(' ');
            this.start++;
        } else if (this.start === this.end) {
            this.start = 0;
            return;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    fireSpreadRounds({frameData, bulletData, bulletsArray, deltaTime}){
        // window.requestAnimationFrame(fireSpreadRounds({frameData, bulletData, bulletsArray, animationId}));
        let currentAngle = frameData.bulletAngle - Math.PI / 10;
        for (let i = 0; i < 10; i++){
            // console.log(animationId);
            bulletsArray.push(
                new this.Bullet({
                    x: frameData.x,
                    y: frameData.y,
                    angle: currentAngle,
                    velocity: {
                        x: Math.cos(currentAngle),
                        y: Math.sin(currentAngle)
                    },
                    canvasCtx: frameData.canvasCtx,
                    data: bulletData,
                })
            );
            currentAngle = currentAngle + Math.PI / 40;
        }
    }

    fireScatterRounds({frameData, bulletData, bulletsArray, deltaTime}){
        let currentAngle = frameData.bulletAngle - Math.PI / 10;
        let i = 0;
        while (i < 10){
            if (this.frameTimer > this.frameInterval){
                console.log('hit delta');
                this.frameTimer = 0;
                bulletsArray.push(
                    new this.Bullet({
                        x: frameData.x,
                        y: frameData.y,
                        angle: currentAngle,
                        velocity: {
                            x: Math.cos(currentAngle),
                            y: Math.sin(currentAngle)
                        },
                        canvasCtx: frameData.canvasCtx,
                        data: bulletData,
                    })
                );
                currentAngle = currentAngle + Math.PI / 40;
                i++;
                console.log(i, bulletsArray);
            } else {
                console.log('else');
                this.frameTimer += deltaTime;
            }
        }
    }

    fireRound({frameData, bulletData, bulletsArray}){
        // console.log('frame data:', frameData);
        // console.log('frame angle:', frameData.bulletAngle);
        // let currentAngle = frameData.bulletAngle - Math.PI / 10;
        bulletsArray.push(
            new this.Bullet({
                x: frameData.x,
                y: frameData.y,
                angle: this.bulletAngle,
                velocity: {
                    x: Math.cos(this.bulletAngle),
                    y: Math.sin(this.bulletAngle)
                },
                canvasCtx: frameData.canvasCtx,
                data: bulletData,
            })
        );
        // console.log(bulletsArray);
        // currentAngle = currentAngle + Math.PI / 40;
    }
}