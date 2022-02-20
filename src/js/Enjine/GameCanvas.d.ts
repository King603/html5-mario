export declare class GameCanvas {
    Canvas: HTMLCanvasElement;
    Context2D: CanvasRenderingContext2D;
    BackBuffer: HTMLCanvasElement;
    BackBufferContext2D: CanvasRenderingContext2D;
    constructor(id: string, width: number, height: number);
    BeginDraw(): void;
    EndDraw(): void;
}
