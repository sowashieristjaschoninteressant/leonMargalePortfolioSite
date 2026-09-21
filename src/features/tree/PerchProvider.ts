import { IPerchProvider, Perch } from "./IPerchProvider";
import { point2D } from "@/src/engine/types";

export class PerchRegistry implements IPerchProvider {

    private Perches: Perch[] = [];
    private nextPerchID = 0;
    pendingimpact: number = 0;
    constructor() {
    }

    createPerch(position: point2D, branchIndex: number): void {
        const perch: Perch = {
            id: this.nextPerchID++,
            birdID: null,
            branchIndex: branchIndex,
            position: position,
            status: "FREE"
        };

        this.Perches.push(perch);
    }

    reserveRandomPearch(birdID: number): number | null {
        const freePerches = this.Perches.filter(p => p.status == "FREE");

        if (freePerches.length === 0)
            return null;

        const chosenPerch = freePerches[Math.floor(Math.random() * freePerches.length)];

        chosenPerch.status = "RESERVED";
        chosenPerch.birdID = birdID;

        return chosenPerch.id;
    }

    getPerchPosition(id: number): Readonly<point2D> | null {
        const perch = this.Perches.find(p => p.id === id);

        return perch?.position ?? null;
    };

    updatePerchPosition(
        branchIndex: number,
        position: point2D
    ): void {
        const perch = this.Perches.find(
            p => p.branchIndex === branchIndex
        );

        if (!perch) {
            return;
        }

        perch.position = { ...position };
    }

    occupiePerch(perchId: number, birdID: number, impact: number): boolean {
        let perch = this.Perches.find(p => p.birdID == birdID && p.id == perchId);

        if (!perch)
            return false;

        perch.status = "OCCUPIED";
        this.pendingimpact += impact;
        return true;
    };

    consumeLandingImpact(): number {
        const impact = this.pendingimpact;
        this.pendingimpact = 0;

        return impact;
    }

    releasePerch(perchId: number, birdId: number): void {
        let perch = this.Perches.find(p => p.birdID == birdId && p.id == perchId);

        if (!perch)
            return;

        perch.birdID = null;
        perch.status = "FREE";
        return;
    }

}