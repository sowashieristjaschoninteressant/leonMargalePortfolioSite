
import { MeshObject } from "./types.js";
import { System } from "./types.js";

// this is a little render class well not really because here is also some logic for the frac tree but i think like this is kinda okay otherwise i also would have to write a class for the frac then, what idont intend to do rn maby if more functionality comes
export class Renderer {
    delay: number;
    ctx: CanvasRenderingContext2D;
    direction: boolean;
    before: number;
    meshObjects: MeshObject[];
    systems: System[];

    constructor(ctx: CanvasRenderingContext2D, meshObjects: MeshObject[], systems: System[]) {
        this.delay = 20;
        this.ctx = ctx;
        this.direction = true;

        this.before = performance.now();
        this.meshObjects = meshObjects;
        this.systems = systems;

        this.configureCtx();
    }

    getMeshObjects() {
        return this.meshObjects;
    }

    configureCtx() {

        for (let i = 0; i < this.meshObjects.length; i++) {
            this.meshObjects[i].setCtx(this.ctx);
        }
    }

    cleanup() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    render() {
        let now = performance.now();
        let dt = (now - this.before) / 1000;
        this.before = now;

        dt = Math.min(dt, 0.033);

        this.cleanup();

        for( const system of this.systems){
            system.update(dt);
        }

        for (const object of this.meshObjects) {
            object.update(dt)
            object.draw(dt);
        }

        requestAnimationFrame(() => this.render());
    }
}