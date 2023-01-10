export class Layer {
    constructor(width, height, imgSrc){
        this.name = 'test';
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imgSrc
    }

    draw(ctx, targetWidth, targetHeight) {
        ctx.drawImage(
            this.image,
            0, 0, this.width, this.height,
            0, 0, targetWidth, targetHeight
        );
    }
}