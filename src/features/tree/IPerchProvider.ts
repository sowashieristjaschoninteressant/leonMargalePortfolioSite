import { point2D } from "@/src/engine/types";


type Perchstatus = "FREE" | "RESERVED" | "OCCUPIED"

export type Perch = {
    id:number;
    birdID:number | null;
    branchIndex:number;
    position:point2D;
    status: Perchstatus;
   
}; 


export interface IPerchProvider{
    pendingimpact:number;
    updatePerchPosition(
    branchIndex: number,
    position: point2D
    ): void;
    consumeLandingImpact(): number;
    reserveRandomPearch(birdID:number, ):number | null;
    getPerchPosition(id:number): Readonly<point2D> | null;
    occupiePerch(perchId:number, birdID:number,impact:number): boolean;
    releasePerch(perchId:number, birdId:number): void;
    createPerch(position:point2D, branchIndex:number):void;
}