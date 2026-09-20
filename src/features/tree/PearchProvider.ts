import { IPerchProvider, Perch } from "./IpearchProvider";
import { point2D } from "@/src/engine/types";

export class PerchRegistry implements IPerchProvider{

    private Perches:Perch[] = [];

    constructor(){
    }

    addPerches(perch:Perch[]){
        this.Perches = this.Perches.concat(perch);
    }

    reserveRandomPearch(birdID:number ):number | null{
        const freePerches = this.Perches.filter(p => p.status == "FREE");

        if(freePerches.length === 0 )
            return null;

        const chosenPerch = freePerches[Math.random() % freePerches.length];
        
        chosenPerch.status = "RESERVED";
        chosenPerch.birdID = birdID;

        return chosenPerch.id;
    }

    getPerchPosition(id:number): Readonly<point2D> | null{
        const perch = this.Perches.find(p => { p.id === id});

        return perch?.position ?? null;
    };

    occupiePerch(perchId:number, birdID:number,impact:number): boolean{
        let perch = this.Perches.find(p => p.birdID == birdID && p.id == perchId);

        if(!perch)
            return false;

        perch.status = "OCCUPIED";
        return true;
    };

    releasePerch(perchId:number, birdId:number): void{
        let perch  = this.Perches.find(p => p.birdID == birdId && p.id == perchId);
        
        if(!perch)
            return;

        perch.birdID = 0;
        perch.status = "FREE";
        return;
    }

}