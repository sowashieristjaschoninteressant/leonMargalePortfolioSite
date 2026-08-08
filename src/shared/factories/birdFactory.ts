'use client'
import { Bird, birdProps  } from "@/src/features/birds/Bird";
import { Sprite } from "@/src/engine/sprite";
import { loadImage } from "@/src/utils/loader";
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
export function createBird(ctx:CanvasRenderingContext2D, xp:number, yp:number, assetImg:HTMLImageElement):Bird{


    const animations:animationProps[] =[
        {with: 16, height: 16, x : 0, y :48, frameCount : 4, timeDelta:0.15},
        {with: 16, height: 16, x : 0, y :0, frameCount : 4, timeDelta:0.25}
    ];

    const sprite = new Sprite(0.1, assetImg, ctx);
    sprite.add_animation(animations[0], "RUN");
    sprite.add_animation(animations[1], "IDLE");
    const birdConf:birdProps  = {
        x: xp,
        y:yp,
        ctx: ctx,
        velocity: 200,
        sprite: sprite,
    }

    const bird:Bird = new Bird(birdConf);

    return bird;
}