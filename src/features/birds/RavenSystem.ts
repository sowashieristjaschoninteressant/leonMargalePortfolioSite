import { MeshObject, point2D, System } from "@/src/engine/types";
import { createBird } from "@/src/shared/factories/birdFactory";
import { getRandomSpawnX, getRandomSpawnY, getRandomPoint } from "@/src/shared/math";
import { time } from "console";
import { Bird } from "./Bird";

export class RavenSystem implements System {
    private birdCount: number = 0;
    private birds: Bird[] = [];

    constructor(
        private world: MeshObject[],
        private ravenImage: HTMLImageElement,
        private canvas: HTMLCanvasElement,
    ) { }

    update(dt: number) {

        this.birds.map(bird => bird.update(dt));
        this.birds = this.birds.filter(b => b.birdState != "DEATH");

        return;
    }

    private spawn(xp: number, yp: number, ctx: CanvasRenderingContext2D) {
        const bird = createBird(xp, yp, this.ravenImage);
        bird.setCtx(ctx);
        this.world.push(bird);
        this.birds.push(bird);
        this.birdCount++;
        return bird;
    }

    registerSpawn(ctx: CanvasRenderingContext2D) {

        const timeout = 3000;
        setInterval(() => {

            if (this.birdCount >= 10) {
                return;
            }

            let xp = getRandomSpawnX(this.canvas);
            let yp = getRandomSpawnY(this.canvas);


            const bird = this.spawn(xp, yp, ctx);

            bird.flyTo(getRandomPoint(this.canvas));
            
        }, timeout)
    }

}