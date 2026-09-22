import { drawLine, calculateNewPoint } from "@/src/engine/draw";
import { MeshObject, point2D } from "@/src/engine/types";

import { IPerchProvider, Perch } from "./IPerchProvider";
import { Bounds } from "@/src/engine/bounds";

type Branch = {
    start: point2D;
    end: point2D;
    level: number;
}

export class FracTree implements MeshObject {

    id: number = Math.random();
    ctx: CanvasRenderingContext2D | null = null;
    xPos: number;
    yPos: number;
    baseangle: number;
    bend: number = 0.1;
    direction: boolean = true;
    firstLineL: number = 10;
    private currentLineLength: number[] = [];
    private branches: Branch[] = [];
    private allPoints: point2D[] = [];
    private perchRegistry: IPerchProvider;
    private perchesRegistered: boolean = false;
    private treescale: number = 1;
    // tree stuff fck
    private LEVEL_COUNT = 12;
    private MAX_TRUNK_LENGTH = 300;
    private INITIAL_BRANCH_LENGTH = 150;
    private BRANCH_SCALE = 0.7;
    private TRUNK_GROTH_STEP = 5;
    private BRANCH_GROWTH_STEP = 4;

    private compression = 0;
    private compressionVelocity = 0;

    private readonly SPRING_STRENGTH = 90;
    private readonly SPRING_DAMPING = 10;
    private readonly IMPACT_STRENGTH = 0.12;


    constructor(baseangle: number, xPos: number, yPos: number, perchRegistry: IPerchProvider) {
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
        this.perchRegistry = perchRegistry;
    }

    setCtx(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    private incAngle(angle: number, baseangle: number, bend: number) { return angle + baseangle + bend };
    private decAngle(angle: number, baseangle: number, bend: number) { return angle - baseangle - bend };

    allLinesDone() {
        for (let i = 0; i < this.currentLineLength.length; i++) {
            if (this.currentLineLength[i] < this.getTargetLength(i)) {
                return false;
            }
        }
        return true;

    }

    getTargetLength(level: number) {
        return this.INITIAL_BRANCH_LENGTH * Math.pow(this.BRANCH_SCALE, level);
    }

    isfullyGrown(): boolean {
        if (this.firstLineL < this.MAX_TRUNK_LENGTH) {
            return false;
        }

        return this.currentLineLength.every(
            (length, level) => length >= this.getTargetLength(level)
        );
    }

    private updateReaction(dt: number): void {
        // Große Framedrops abfangen
        dt = Math.min(dt, 0.05);

        const landingImpact =
            this.perchRegistry.consumeLandingImpact();

        if (landingImpact > 0) {
            this.compressionVelocity +=
                landingImpact * this.IMPACT_STRENGTH;
        }

        const acceleration =
            -this.SPRING_STRENGTH * this.compression
            - this.SPRING_DAMPING * this.compressionVelocity;

        this.compressionVelocity += acceleration * dt;
        this.compression += this.compressionVelocity * dt;

        // Verhindert extreme Verformungen
        this.compression = Math.max(
            -0.02,
            Math.min(this.compression, 0.08)
        );
    }

    private updateGrowth(): void {
        if (this.firstLineL < this.MAX_TRUNK_LENGTH) {
            this.firstLineL = Math.min(
                this.firstLineL + this.TRUNK_GROTH_STEP,
                this.MAX_TRUNK_LENGTH
            );

            return;
        }

        for (let level = 0; level < this.LEVEL_COUNT; level++) {
            const targetLength = this.getTargetLength(level);

            if (this.currentLineLength[level] < targetLength) {
                this.currentLineLength[level] = Math.min(
                    this.currentLineLength[level] + this.BRANCH_GROWTH_STEP,
                    targetLength
                );

                // Nur eine Ebene pro Frame wachsen lassen
                return;
            }
        }
    }

    private registerPerches() {

        if (this.perchesRegistered || !this.isfullyGrown()) {
            return;
        }
        const maximumPerches = Math.min(20, this.branches.length);

        for (let branchIndex = 0; branchIndex < maximumPerches; branchIndex++) {

            const branch = this.branches[branchIndex];
            this.perchRegistry.createPerch(branch.end, branchIndex);
        }

        this.perchesRegistered = true;
    }

    private rebuildGeometry(baseangle: number): void {
        this.branches.length = 0;
        this.allPoints.length = 0;

        const start: point2D = {
            x: this.xPos,
            y: this.yPos,
            angle: 0
        };

        const root = calculateNewPoint(
            start,
            0,
            this.firstLineL
        );

        this.branches.push({
            start,
            end: root,
            level: -1
        });

        if (this.firstLineL < this.MAX_TRUNK_LENGTH) {
            return;
        }

        let parentPoints: point2D[] = [root];

        for (let level = 0; level < this.LEVEL_COUNT; level++) {
            const branchLength = this.currentLineLength[level];

            // Diese Ebene wächst noch nicht
            if (branchLength <= 0) {
                break;
            }

            const nextPoints: point2D[] = [];

            for (const parent of parentPoints) {
                const leftAngle = this.decAngle(
                    parent.angle!,
                    baseangle,
                    this.bend
                );

                const rightAngle = this.incAngle(
                    parent.angle!,
                    baseangle,
                    this.bend
                );

                const leftPoint = calculateNewPoint(
                    parent,
                    leftAngle,
                    branchLength
                );

                const rightPoint = calculateNewPoint(
                    parent,
                    rightAngle,
                    branchLength
                );

                this.branches.push(
                    {
                        start: parent,
                        end: leftPoint,
                        level
                    },
                    {
                        start: parent,
                        end: rightPoint,
                        level
                    }
                );

                nextPoints.push(leftPoint, rightPoint);
                this.allPoints.push(leftPoint, rightPoint);
            }

            parentPoints = nextPoints;

            // Tiefere Ebenen existieren erst, wenn diese fertig ist
            if (branchLength < this.getTargetLength(level)) {
                break;
            }
        }
    }

    resize(bounds: Bounds) {
        this.xPos = bounds.width / 2;
        this.yPos = bounds.height;

        const widthScale = bounds.width / 900;
        const heightScale = bounds.height / 800;

        this.treescale = Math.max(
            0.4,
            Math.min(1, widthScale, heightScale)
        );

    }

    private scalePointFromTreeRoot(
        point: point2D
    ): point2D {
        const verticalScale =
        this.treescale * (1 - this.compression);

    return {
        ...point,

        x:
            this.xPos +
            (point.x - this.xPos) * this.treescale,

        y:
            this.yPos +
            (point.y - this.yPos) * verticalScale,
    };
    }


    private drawGeometry(): void {
        if (!this.ctx) {
            return;
        }

        const verticalScale =
            this.treescale * (1 - this.compression);

        this.ctx.save();

        this.ctx.translate(this.xPos, this.yPos);

        this.ctx.scale(
            this.treescale,
            verticalScale
        );

        this.ctx.translate(-this.xPos, -this.yPos);

        for (const branch of this.branches) {
            drawLine(
                this.ctx,
                branch.start,
                branch.end
            );
        }

        this.ctx.restore();
    }

    private updatePerchPositions(): void {
        const verticalScale = 1 - this.compression;

        for (let branchIndex = 0; branchIndex < 20; branchIndex++) {
            const branch = this.branches[branchIndex];

            if (!branch) {
                break;
            }

            const scaledPosition =
                this.scalePointFromTreeRoot(branch.end);

            this.perchRegistry.updatePerchPosition(
                branchIndex,
                scaledPosition
            );
        }
    }

    update(dt: number) {
        this.updateGrowth();
        this.updateReaction(dt);
        this.rebuildGeometry(this.baseangle);

        if (this.isfullyGrown() && !this.perchesRegistered) {
            this.registerPerches();
        }

        this.updatePerchPositions();
    }

    draw(dt: number) {
        if (!this.ctx)
            return;
        
        this.drawGeometry();
    }

}

