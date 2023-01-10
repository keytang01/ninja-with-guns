export class InputHandler {
    constructor(){
        this.coordinates = [];
        this.keys = [];
        this.x = 0;
        this.y = 0;

        // window.addEventListener('click', event => {
        //     this.coordinates.push([event.clientX, event.clientY]);
        //     this.x = event.clientX;
        //     this.y = event.clientY;
        //     console.log('mouse coords:', event.clientX, event.clientY);
        //     console.log(event);
        // });

        // window.addEventListener('mousedown', event => {
        //     this.coordinates.push([event.clientX, event.clientY]);
        //     this.x = event.clientX;
        //     this.y = event.clientY;
        //     console.log('mouse coords:', event.clientX, event.clientY);
        //     console.log(event);
        // });
        // window.addEventListener('mouseup', event => {
        //     this.coordinates.push([event.clientX, event.clientY]);
        //     this.x = event.clientX;
        //     this.y = event.clientY;
        //     console.log('mouse coords:', event.clientX, event.clientY);
        //     console.log(event);
        // });

        
    }
}