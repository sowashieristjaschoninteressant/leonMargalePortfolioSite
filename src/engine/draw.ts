import { point2D } from "./types";

export function drawLine(ctx: CanvasRenderingContext2D, start:point2D, end:point2D) {

    ctx.beginPath();
    ctx.moveTo(Math.round(start.x) + 0.5, Math.round(start.y) + 0.5);
    ctx.lineTo(Math.round(end.x) + 0.5, Math.round(end.y) + 0.5);
    ctx.stroke();

    return;
}

// applys rotation to point and calculates also a new one :0
export function calculateNewPoint(start:point2D, angle:number, lineLength :number) {

    let dx = 0;
    let dy = -lineLength;

    let rotatedX = dx * Math.cos(angle) - dy * Math.sin(angle);
    let rotatedY = dx * Math.sin(angle) + dy * Math.cos(angle);

    let newX = start.x + rotatedX;
    let newY = start.y + rotatedY;

    let point:point2D = {
        x: newX,
        y: newY,
        angle:angle
    };

    return point;
}
