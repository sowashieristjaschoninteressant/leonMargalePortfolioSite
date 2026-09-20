import { point2D } from "../engine/types";
import { Bounds } from "../engine/bounds";
export function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// linar interpolation
export function lerp(a:number, b:number, alpha:number) {
    return a + alpha * (b - a);
}

/** here vector math */
export function vec2scale(v:point2D, scale:number) {

    v.x = v.x * scale;
    v.y = v.y * scale;

    return v;
}

export function vec2Normalize(vec2:point2D) {


    let length = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);

    vec2.x = vec2.x / length;
    vec2.y = vec2.y / length;



    return vec2;

}

export function getExitPoint(bounds:Bounds):point2D{

    const first = getRandomInt(-40,0);
    const last = getRandomInt(bounds.width, bounds.width + 100);

    const x = Math.random() > 0.5 ? first : last;
    const y = getRandomInt(0, bounds.height);

    return {x: x, y: y};
}

export function getRandomSpawnY(bounds: Bounds) {
    const height = bounds.height;

    return getRandomInt(0, height);
}

export function getRandomSpawnX(bounds:Bounds) {
    const width = bounds.width;
    let first = getRandomInt(-20, 0);
    let last = getRandomInt(width, width + 50);

    return Math.random() > 0.5 ? first : last;
}

export function getRandomPoint(bounds:Bounds): point2D {

    return {
        x: getRandomInt(50, bounds.width - 50),
        y: getRandomInt(0, bounds.height - 50)
    };
}

