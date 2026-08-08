import { drawLine, calculateNewPoint } from "@/src/engine/draw";
import { MeshObject, point2D } from "@/src/engine/types";
import { TreePoint } from "./types";

export class FracTree implements MeshObject {

    ctx: CanvasRenderingContext2D | null = null;

    xPos: number;
    yPos: number;
    baseangle: number;

    bend: number = 0.1;
    direction: boolean = true;

    firstLineL: number = 10;

    currentLineLength: number[] = [];
    allPoints: TreePoint[] = [];

    constructor(baseangle:number, xPos:number, yPos:number) {
       
        this.bend = 0.1;
        this.ctx;
        this.xPos = xPos;
        this.yPos = yPos;
        this.baseangle = baseangle;
        this.direction = true;
        this.firstLineL = 10;
        this.currentLineLength = [];
        for (let i = 0; i < 12; i++) {
            this.currentLineLength[i] = 0;
        }
        this.allPoints = [];
    }

    setCtx(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    incAngle(angle:number, baseangle:number, bend:number) { return angle + baseangle + bend };
    decAngle(angle:number, baseangle:number, bend:number) { return angle - baseangle - bend };

   allLinesDone() {
    for (let i = 0; i < this.currentLineLength.length; i++) {
        if (this.currentLineLength[i] < this.getTargetLength(i)) {
            return false; 
        }
    }
    return true;
}

    getTargetLength(level:number){

        let baselength = 150;
        for(let i = 0; i < level; i++){
            baselength *= 0.7;
        }
        return baselength;

    }

    update(dt:number){
        
    }


    checkAngle() {
        if (this.baseangle > Math.PI / 2 - 0.1) {
            (window as any)._stopped = true;
            this.direction = false;
            this.baseangle -= 0.01;
        };

        if (this.baseangle < 0.0) {
            this.direction = true
        };
    }

    checkDirection() {
        if (this.direction) {
            this.baseangle += 0.01;
        }

        if (!this.direction) {
            this.baseangle -= 0.01;
        }
    }


    drawTree(baseangle:number) {

        const start:point2D = {x: this.xPos, y : this.yPos, angle : 0};
        const root = calculateNewPoint(start, 0, this.firstLineL);
        const allPoints = [];
        let lineLength = 150;
        let endPoints;

        endPoints = [root];

        drawLine(this.ctx!, start, root);

        if (this.firstLineL < 300) {
            this.firstLineL = this.firstLineL + 5;
            return;
        }

        for (let i = 0; i < 12; i++) {

            let temp = [];

            for (let point of endPoints) {

                let p1, p2;
              
                let leftAngle = this.decAngle(point.angle!, baseangle, this.bend);
                let rightAngle = this.incAngle(point.angle!, baseangle, this.bend);


                p1 = calculateNewPoint(point, leftAngle, this.currentLineLength[i]);
                p2 = calculateNewPoint(point, rightAngle, this.currentLineLength[i]);


                drawLine(this.ctx!, point, p1);
                drawLine(this.ctx!, point, p2);

                temp.push(p1, p2);
                allPoints.push(p1, p2);
            }

            if (this.currentLineLength[i] < lineLength) {
                this.currentLineLength[i] = this.currentLineLength[i] + 4;
                endPoints = temp;
                break;
            }

            lineLength *= 0.7;
            endPoints = temp;
        }

    }

    draw(dt:number) {
        if(!this.ctx)
            return;
        
       
        this.ctx.fillText(`Angle: ${this.baseangle}`, 20, 20, 500);
        this.drawTree(this.baseangle);


    }


}

