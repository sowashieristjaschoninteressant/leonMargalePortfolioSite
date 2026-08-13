import { MeshObject, point2D, System } from "@/src/engine/types";
import { createBird } from "@/src/shared/factories/birdFactory";
import { getRandomInt } from "@/src/shared/math";
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

        for(const bird of this.birds){

            if(bird.isFlying())
                continue;

            bird.nextMovementTimer -= dt;


            if( bird.nextMovementTimer <= 0){

                let goal = this.getRandomPoint();

                bird.flyTo(goal);
            }
        }


        return;
    }

    private getRandomSpawnY() {
        const height = this.canvas.height;

        return getRandomInt(0, height);
    }

    private getRandomSpawnX() {
        const width = this.canvas.width;
        let first = getRandomInt(-20, 0);
        let last = getRandomInt(width, width + 50);

        return Math.random() > 0.5 ? first : last;
    }

    private getRandomPoint(): point2D {

        return {
            x: getRandomInt(50, this.canvas.width - 50),
            y: getRandomInt(50, this.canvas.height - 100)
        };
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

            let xp = this.getRandomSpawnX();
            let yp = this.getRandomSpawnY();


            const bird = this.spawn(xp, yp, ctx);

            bird.flyTo({ x: this.canvas.width / 2, y: this.canvas.height / 2 });
            
        }, timeout)
    }

}