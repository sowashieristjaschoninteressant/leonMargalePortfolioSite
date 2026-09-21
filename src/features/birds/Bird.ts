import { Sprite } from "@/src/engine/sprite";
import { MeshObject, point2D } from "@/src/engine/types";
import { getRandomInt, getRandomPoint, getExitPoint } from "@/src/shared/math";
import { Bounds } from "@/src/engine/bounds";
import { IPerchProvider } from "../tree/IPerchProvider";

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

type BirdState =
    "FLYING_TO_POINT" |
    "FLYING_TO_PERCH" |
    "PERCHING" |
    "DEATH" |
    "EXITING" |
    "WAITING";

export class Bird implements MeshObject {

    id: number = Math.random();
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
    private targetPerchID: number | null = null;
    private currentPerchID: number | null = null;


    constructor(birdConf: birdProps,
        bounds: Bounds,
        private readonly perchRegistry: IPerchProvider
    ) {
        this.x = birdConf.x;
        this.y = birdConf.y;
        this.velocity = birdConf.velocity;
        this.sprite = birdConf.sprite;
        this.maxMotion = birdConf.maxMovements;
        this.bounds = bounds;
        this.perchRegistry = perchRegistry;
    }

    private tryFlyingToPerch(): boolean {
        const perchId = this.perchRegistry.reserveRandomPearch(this.id);

        if (perchId === null) {
            return false;
        }

        const pos = this.perchRegistry.getPerchPosition(perchId);

        if (!pos) {
            this.perchRegistry.releasePerch(perchId, this.id);
            return false;
        }

        this.targetPerchID = perchId;
        this.birdState = "FLYING_TO_PERCH";
        this.flyTo(pos);

        return true;
    }

    private cancelPerchTarget() {


        if (this.targetPerchID !== null) {
            this.perchRegistry.releasePerch(this.targetPerchID, this.id);
        };

        this.targetPerchID = null;
        this.motionState.goalPoint = null;
        this.motionState.hasGoal = false;
        this.birdState = "WAITING";
    }

    private updateFlyingToPerch(dt: number): void {
        if (this.targetPerchID === null) {
            this.birdState = "WAITING";
            return;
        }

        const perchPosition =
            this.perchRegistry.getPerchPosition(
                this.targetPerchID
            );

        if (!perchPosition) {
            this.cancelPerchTarget();
            return;
        }

        this.motionState.goalPoint = { ...perchPosition };
        this.moveTowardsGoal(dt);

        if (this.motionState.hasGoal) {
            return;
        }

        const occupied = this.perchRegistry.occupiePerch(this.targetPerchID, this.id, 1);

        if (!occupied) {
            this.cancelPerchTarget();
            return;
        }

        this.currentPerchID = this.targetPerchID;
        this.targetPerchID = null;
        this.birdState = "PERCHING";
        this.nextMovementTimer = getRandomInt(5, 10);
    }

    private updatePerched(dt: number): void {
        if (this.currentPerchID === null) {
            this.birdState = "WAITING";
            return;
        }

        const perchPos = this.perchRegistry.getPerchPosition(this.currentPerchID);

        if (!perchPos) {
            this.releaseCurrentPerch();
            this.birdState = "WAITING";
            return;
        }

        this.x = perchPos.x;
        this.y = perchPos.y;

        this.nextMovementTimer -= dt;

        if (this.nextMovementTimer > 0) {
            return;
        }

        this.releaseCurrentPerch();
        this.chooseNextMovement();

    }

    private releaseCurrentPerch(): void {
        if (this.currentPerchID !== null) {
            this.perchRegistry.releasePerch(this.currentPerchID, this.id);
        }

        this.currentPerchID = null;
        this.motionState.goalPoint = null;
        this.motionState.hasGoal = false;
        this.birdState = "WAITING";
    }

    private chooseNextMovement() {

        if (this.currentMotion >= this.maxMotion) {
            this.releaseCurrentPerch();
            this.birdState = "EXITING";
            this.flyTo(getExitPoint(this.bounds));
            return;
        }

        const foundPerch = this.tryFlyingToPerch();

        if (!foundPerch) {
            this.birdState = "WAITING";
            this.nextMovementTimer = 1;
            return;
        }

        this.currentMotion++;
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
            case "WAITING":
                this.nextMovementTimer -= dt;

                if (this.nextMovementTimer <= 0) {
                    this.chooseNextMovement();
                }

                break;

            case "FLYING_TO_POINT":
                this.moveTowardsGoal(dt);

                if (!this.motionState.hasGoal) {
                    this.birdState = "WAITING";
                    this.nextMovementTimer = getRandomInt(5, 10);
                }

                break;

            case "FLYING_TO_PERCH":
                this.updateFlyingToPerch(dt);
                break;

            case "PERCHING":
                this.updatePerched(dt);
                break;

            case "EXITING":
                this.moveTowardsGoal(dt);

                if (!this.motionState.hasGoal) {
                    this.birdState = "DEATH";
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
        this.birdState == "FLYING_TO_POINT" || this.birdState == "EXITING" || this.birdState == "FLYING_TO_PERCH" ? this.sprite?.setState("RUN") : this.sprite?.setState("IDLE");
        this.sprite?.draw(this.ctx!, this.x, this.y, dt);
    }

}