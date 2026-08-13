import { Sprite } from "@/src/engine/sprite";
import { MeshObject, point2D } from "@/src/engine/types";
import { getRandomInt } from "@/src/shared/math";
import { loadImage } from "@/src/utils/loader";

export type birdProps = {
    y:number;
    x:number;
    velocity:number;
    sprite:Sprite;
}

export type MotionState  = {
    hasGoal:boolean;
    goalPoint:point2D | null;
}

type moveState = "FLYING" | "STILL";

export class Bird implements MeshObject{

    ctx: CanvasRenderingContext2D | null = null;
    x: number;
    y: number;
    velocity: number;
    epsilon: number = 2;
    sprite?: Sprite;
    moveState: moveState = "STILL";
    maxMotion: number = 0;
    nextMovementTimer: number = 0;
    motionState: MotionState = {
        hasGoal: false,
        goalPoint : {x: 0, y:0},
    };
    
    constructor(birdConf:birdProps){
        this.x = birdConf.x;
        this.y = birdConf.y;
        this.velocity = birdConf.velocity;
        this.sprite = birdConf.sprite;

    }

    isFlying(){
        return this.moveState == "FLYING";
    }

    update(dt:number){

        if(!this.motionState.hasGoal) 
            return
            
        let targetPos:point2D = this.motionState.goalPoint!;
        let currentPos:point2D = {x: this.x, y: this.y};
        
        const dx = targetPos.x - currentPos.x;
        const dy = targetPos.y - currentPos.y;

        const Dlen = Math.sqrt((dx * dx) + (dy * dy));
        
        dx < 0 ? this.sprite?.setReverse(true) : this.sprite?.setReverse(false);

        if(Dlen < this.epsilon){
            this.motionState.hasGoal = false;
            this.motionState.goalPoint = {x: 0, y: 0};
            this.moveState = "STILL";
            this.nextMovementTimer = 5;
            return;
        }

        const norm:point2D =  {x: dx / Dlen, y: dy / Dlen};
        
        this.x += norm.x * this.velocity * dt;
        this.y += norm.y * this.velocity * dt;
        

    }


    flyTo(pos:point2D){
       this.motionState.hasGoal = true;
       this.motionState.goalPoint = pos;
       this.moveState = "FLYING";
    }

    setCtx(ctx:CanvasRenderingContext2D){
        this.ctx = ctx;
    }

    draw(dt:number){

        this.moveState == "FLYING" ? this.sprite?.setState("RUN") : this.sprite?.setState("IDLE");
        this.sprite?.draw(this.ctx!,this.x, this.y,dt);
    }

}