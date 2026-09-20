import { point2D } from "@/src/engine/types";


type Perchstatus = "FREE" | "RESERVED" | "OCCUPIED"

export type Perch = {
    id:number;
    birdID:number;
    branchIndex:number;
    position:point2D;
    status: Perchstatus;
}; 


export interface IPerchProvider{

    reserveRandomPearch(birdID:number, ):number | null;
    getPerchPosition(id:number): Readonly<point2D> | null;
    occupiePerch(perchId:number, birdID:number,impact:number): boolean;
    releasePerch(perchId:number, birdId:number): void;
}