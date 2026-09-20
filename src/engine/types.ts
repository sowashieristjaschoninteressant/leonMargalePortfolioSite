export interface MeshObject {
    id:number;
    setCtx(ctx: CanvasRenderingContext2D): void;
    draw(dt:number): void;
    update(dt:number): void;
}

export interface System{
    update(dt:number):void;
}

export type point2D = {
    x:number;
    y:number;
    angle?:number;
}

