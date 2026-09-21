import { MeshObject, point2D, System } from "@/src/engine/types";
import { createBird } from "@/src/shared/factories/birdFactory";
import { getRandomSpawnX, getRandomSpawnY, getRandomPoint } from "@/src/shared/math";
import { Bird } from "./Bird";
import { Bounds } from "@/src/engine/bounds";
import { kill } from "process";
import { IPerchProvider } from "../tree/IPerchProvider";
export class RavenSystem implements System {
    private ravens: Bird[] = [];

    constructor(
        private world: MeshObject[],
        private ravenImage: HTMLImageElement,
        private bounds: Bounds,
        private perchRegistry:IPerchProvider
    ) { }
    
    private killRavens(){

        for(let i = this.ravens.length - 1; i >= 0; i-- ){

            const raven = this.ravens[i];

            if(raven.birdState != "DEATH")
                continue;

            this.ravens.splice(i, 1);
            let worldIndex = this.world.indexOf(raven);

            if(worldIndex !== -1 ){
                this.world.splice(worldIndex, 1);
            }
        }

    }

    private spawn(xp: number, yp: number, ctx: CanvasRenderingContext2D) {
        const bird = createBird(xp, yp, this.ravenImage, this.bounds, this.perchRegistry);
        bird.setCtx(ctx);
        this.world.push(bird);
        this.ravens.push(bird);
        return bird;
    }

    update(dt: number) {
        
        this.killRavens();
        return;
    }

    registerSpawn(ctx: CanvasRenderingContext2D) {

        const timeout = 10000;
        setInterval(() => {

            if (this.ravens.length >= 3) {
                return;
            }

            let xp = getRandomSpawnX(this.bounds);
            let yp = getRandomSpawnY(this.bounds);

            const bird = this.spawn(xp, yp, ctx);

            bird.flyTo(getRandomPoint(this.bounds));
            
        }, timeout)
    }

}