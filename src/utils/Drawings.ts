export interface Point {
    x: number,
    y: number
}
export function drawLine(p1: Point, p2: Point, color: string, lineWidth: number, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    ctx.restore();
}

export const toDrawablePoint = (p: Point, canv: HTMLCanvasElement) => ({ x: canv.width / 2 + p.x, y: canv.height / 2 - p.y })

export const CONSTANTS = {
    WINDOW_SIZE: 720
}