export class Bounds {
     height:number;
     width:number;

    constructor(height:number, width:number){
        this.height = height;
        this.width = width;
    }

    updateBounds(height:number, width:number){
        this.height = height;
        this.width = width;
    }

}