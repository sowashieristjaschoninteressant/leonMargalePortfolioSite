'use client'
import { Bird, birdProps  } from "@/src/features/birds/Bird";
import { Sprite } from "@/src/engine/sprite";
import { Bounds } from "@/src/engine/bounds";
import { animationProps } from "@/src/engine/animation";
/**
 *
 * @returns (alias) type birdProps = {
    ctx: CanvasRenderingContext2D;
    y: number;
    x: number;
    velocity: number;
    sprite: Sprite;
}
 */
export function createBird(xp:number, yp:number, assetImg:HTMLImageElement, bounds:Bounds):Bird{


    const animations:animationProps[] =[
        {with: 16, height: 16, x : 0, y :48, frameCount : 4, timeDelta:0.15},
        {with: 16, height: 16, x : 0, y :0, frameCount : 4, timeDelta:0.25}
    ];

    const sprite = new Sprite(0.1, assetImg);
    sprite.add_animation(animations[0], "RUN");
    sprite.add_animation(animations[1], "IDLE");
    const birdConf:birdProps  = {
        x: xp,
        y:yp,
        velocity: 200,
        sprite: sprite,
        maxMovements: 2,
    };

    const bird:Bird = new Bird(birdConf, bounds);

    return bird;
}