import { MeshObject, point2D } from "@/src/engine/types";
import { drawLine } from "@/src/engine/draw";
import { getRandomInt, lerp, vec2Normalize, vec2scale } from "@/src/shared/math";
import { Drop } from "./types";
import { Bounds } from "@/src/engine/bounds";

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
    private readonly HORIZONTAL_DRIFT = 0.33;
    private bounds:Bounds;

    constructor(count: number, bounds:Bounds){ 
        this.ctx = null;
        this.drops = [];
        this.DROP_COUNT = count;
        
        this.WIND_VELOCITY = 5;
        this.DROP_MIN_VELOCITY = 9;
        this.DROP_MAX_VELOCITY = 15;

        this.DROP_MIN_LENGTH = 20;
        this.DROP_MAX_LENGTH = 40;
        this.DROP_MIN_ALPHA = 0.3;
        this.DROP_MAX_ALPHA = 1;
        this.bounds = bounds;
        this.initializeDrops();
    }

    createDrop(): Drop {
        return {
            x: 0,
            y: 0,
            vx:0,
            vy:0,
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
            drop.y = getRandomInt(0, this.bounds.height);

            this.drops.push(drop);
        }
    }

    private getHorizontalTail(drop:Drop){
        const directionLength = Math.hypot(drop.vx, drop.vy);

        return Math.abs(drop.vx / directionLength) * drop.l;;
    }

    resetDrop(drop:Drop): void {
        const scale = Math.random();

        drop.vy = lerp(this.DROP_MIN_VELOCITY, this.DROP_MAX_VELOCITY, scale);
        drop.vx = drop.vy * (this.bounds.width / this.bounds.height) * this.HORIZONTAL_DRIFT;
        drop.l = lerp(this.DROP_MIN_LENGTH, this.DROP_MAX_LENGTH, scale);
        drop.a = lerp(this.DROP_MIN_ALPHA, this.DROP_MAX_ALPHA, scale);
        
        const horizontalTail = this.getHorizontalTail(drop);
        const paddingScaling = 0.3;
        drop.x = getRandomInt(-horizontalTail - (paddingScaling * this.bounds.width), this.bounds.width + horizontalTail);
        drop.y = getRandomInt(-drop.l, 0);

    }

    update(dt:number){
        return;
    }

    updateInner( drop: Drop ,dt:number){
      
            drop.x += drop.vx * dt;
            drop.y += drop.vy * dt;

            if(drop.y > this.bounds.height + drop.l || drop.x > this.bounds.width){
              this.resetDrop(drop)
            }
            return;
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

          let start:point2D = {x:0,y: 0, angle : 0};
          let end:point2D = {x:0,y: 0, angle : 0};
        
          for(let i = 0; i < this.drops.length; i++){

            const drop = this.drops[i];

            this.updateInner(drop, dt * 60);

            let x1 = Math.round(this.drops[i].x);
            let y1 = Math.round(this.drops[i].y);

            var v = {x: drop.vx, y : drop.vy };


            v = vec2Normalize(v);
            v = vec2scale(v, -drop.l);

            let x2 = Math.round(x1 + v.x);
            let y2 = Math.round(y1 + v.y);

            this.ctx.globalAlpha = drop.a;

             start.x = x1;
             start.y = y1;
             
             end.x = x2;
             end.y = y2;
             


            drawLine(this.ctx, start, end );
        }
        
        this.ctx.restore();

    }


}