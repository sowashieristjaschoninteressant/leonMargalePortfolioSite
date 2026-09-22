import { MeshObject, point2D } from "@/src/engine/types";
import { drawLine } from "@/src/engine/draw";
import { getRandomInt, lerp, vec2Normalize, vec2scale } from "@/src/shared/math";
import { Drop } from "./types";

export class Rain implements MeshObject {

    id: number = Math.random();
    ctx: CanvasRenderingContext2D | null;
    drops: Array<Drop>;
    DROP_COUNT: number;
    WIND_VELOCITY: number;
    DROP_MIN_VELOCITY: number;
    DROP_MAX_VELOCITY: number;
    DROP_MIN_LENGTH: number;
    DROP_MAX_LENGTH: number;
    DROP_MIN_ALPHA: number;
    DROP_MAX_ALPHA: number;

    constructor(count: number){ 
        this.ctx = null;
        this.drops = [];
        this.DROP_COUNT = count;
        
        this.WIND_VELOCITY = 12;
        this.DROP_MIN_VELOCITY = 9.8;
        this.DROP_MAX_VELOCITY = 14.2;

        this.DROP_MIN_LENGTH = 20;
        this.DROP_MAX_LENGTH = 40;
        this.DROP_MIN_ALPHA = 0.3;
        this.DROP_MAX_ALPHA = 1;

        this.initializeDrops();
    }

    createDrop(): Drop {
        return {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            l: 0,
            a: 0,
        };
    }

    setCtx(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    initializeDrops(){
        for(let i = 0; i < this.DROP_COUNT; i++){
            let drop:Drop = this.createDrop();

            this.resetDrop(drop);
            drop.y = getRandomInt(0, window.innerHeight);

            this.drops.push(drop);
        }

    }

    resetDrop(drop:Drop): void {
        let scale = Math.random();

        drop.x = getRandomInt(-(window.innerWidth / 2), window.innerWidth);
        drop.vx = this.WIND_VELOCITY;
        drop.vy = lerp(this.DROP_MIN_VELOCITY, this.DROP_MAX_VELOCITY, scale);
        drop.l = lerp(this.DROP_MIN_LENGTH, this.DROP_MAX_LENGTH, scale);
        drop.a = lerp(this.DROP_MIN_ALPHA, this.DROP_MAX_ALPHA, scale);
        drop.y = getRandomInt(-drop.l, 0);

    }
    update(dt:number){
        return;
    }

    updateInner( drop: Drop ,dt:number){
      
            drop.x += drop.vx * dt;
            drop.y += drop.vy * dt;

            if(drop.y > window.innerHeight + drop.l || drop.x > window.innerWidth){
              this.resetDrop(drop)
            }

            return 
    }

    setupCTX(){
       
        this.ctx!.save();

        this.ctx!.strokeStyle = "lightblue";
        this.ctx!.lineWidth = 0.5;
        this.ctx!.globalCompositeOperation = "source-over"; 
    
        return;
    }



    draw(dt:number){
        if(!this.ctx)
            return
        
        this.setupCTX();
        
        for(let i = 0; i < this.drops.length; i++){

            var drop = this.drops[i];

            this.updateInner(drop,1);

            let x1 = Math.round(this.drops[i].x);
            let y1 = Math.round(this.drops[i].y);

            var v = {x: drop.vx, y : drop.vy };


            v = vec2Normalize(v);
            v = vec2scale(v, -drop.l);

            let x2 = Math.round(x1 + v.x);
            let y2 = Math.round(y1 + v.y);

            this.ctx.globalAlpha = drop.a;

            let start:point2D = {x:x1,y: y1, angle : 0};
            let end:point2D = {x:x2,y: y2, angle : 0};
            drawLine(this.ctx, start, end );

        }
        
        this.ctx.restore();

    }


}