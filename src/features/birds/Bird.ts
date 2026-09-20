import { Sprite } from "@/src/engine/sprite";
import { MeshObject, point2D } from "@/src/engine/types";
import { getRandomInt, getRandomPoint, getExitPoint} from "@/src/shared/math";
import { Bounds } from "@/src/engine/bounds";
import { randomUUID } from "crypto";

export type birdProps = {
    y: number;
    x: number;
    velocity: number;
    sprite: Sprite;
    maxMovements: number;
}

export type MotionState = {
    hasGoal: boolean;
    goalPoint: point2D | null;
}

type BirdState = "FLYING_TO_POINT" | "PERCHING" | "DEATH" | "EXITING";

export class Bird implements MeshObject {

    id:number = Math.random();
    ctx: CanvasRenderingContext2D | null = null;
    x: number;
    y: number;
    bounds: Bounds;
    velocity: number;
    epsilon: number = 2;
    sprite?: Sprite;
    birdState: BirdState = "PERCHING";
    maxMotion: number = 0;
    currentMotion: number = 0;
    nextMovementTimer: number = 0;
    motionState: MotionState = {
        hasGoal: false,
        goalPoint: { x: 0, y: 0 },
    };

    constructor(birdConf: birdProps, bounds:Bounds) {
        this.x = birdConf.x;
        this.y = birdConf.y;
        this.velocity = birdConf.velocity;
        this.sprite = birdConf.sprite;
        this.maxMotion = birdConf.maxMovements;
        this.bounds = bounds;
    }


    private moveTowardsGoal(dt: number) {

        if (!this.motionState.hasGoal)
            return

        let targetPos: point2D = this.motionState.goalPoint!;
        let currentPos: point2D = { x: this.x, y: this.y };

        const dx = targetPos.x - currentPos.x;
        const dy = targetPos.y - currentPos.y;

        const Dlen = Math.sqrt((dx * dx) + (dy * dy));

        dx < 0 ? this.sprite?.setReverse(true) : this.sprite?.setReverse(false);

        if (Dlen < this.epsilon) {
            this.motionState.hasGoal = false;
            this.motionState.goalPoint = { x: 0, y: 0 };
            return;
        }

        const norm: point2D = { x: dx / Dlen, y: dy / Dlen };

        this.x += norm.x * this.velocity * dt;
        this.y += norm.y * this.velocity * dt;

    }

    update(dt: number) {

        switch (this.birdState) {
            case "EXITING":
               
                this.moveTowardsGoal(dt);
                if(!this.motionState.hasGoal){
                    this.birdState = "DEATH";
                }

                break;
            case "PERCHING":
                this.nextMovementTimer -= dt;

                if (this.nextMovementTimer <= 0) {
                    let goal:point2D;
                   
                    if (this.maxMotion <= this.currentMotion){
                        this.birdState = "EXITING";
                        goal = getExitPoint(this.bounds);
                    }else{
                        goal = getRandomPoint(this.bounds);
                        this.birdState = "FLYING_TO_POINT";
                    }

                    this.flyTo(goal);
                    this.currentMotion++;

                }
                break;
            case "FLYING_TO_POINT":
                this.moveTowardsGoal(dt);
                if (!this.motionState.hasGoal) {
                    this.birdState = "PERCHING";
                    this.nextMovementTimer = getRandomInt(5, 10);
                }

                break;
        }
    }

    flyTo(pos: point2D) {
        this.motionState.hasGoal = true;
        this.motionState.goalPoint = pos;
    }

    setCtx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    draw(dt: number) {
        this.birdState == "FLYING_TO_POINT" || this.birdState == "EXITING" ? this.sprite?.setState("RUN") : this.sprite?.setState("IDLE");
        this.sprite?.draw(this.ctx!, this.x, this.y, dt);
    }

}