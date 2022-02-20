export class GameCanvas {
	Canvas: HTMLCanvasElement;
	Context2D: CanvasRenderingContext2D;
	BackBuffer: HTMLCanvasElement;
	BackBufferContext2D: CanvasRenderingContext2D;
	constructor(id: string, width: number, height: number) {
		this.Canvas = document.getElementById(id) as HTMLCanvasElement;
		this.Context2D = this.Canvas.getContext("2d") as CanvasRenderingContext2D;
		this.BackBuffer = document.createElement("canvas");
		this.BackBuffer.width = width;
		this.BackBuffer.height = height;
		this.BackBufferContext2D = this.BackBuffer.getContext("2d") as CanvasRenderingContext2D;
	}
	BeginDraw() {
		this.BackBuffer && this.BackBufferContext2D?.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
		this.Canvas && this.Context2D?.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
	}
	EndDraw() {
		this.Canvas && this.BackBuffer && this.Context2D?.drawImage(this.BackBuffer, 0, 0, this.BackBuffer.width, this.BackBuffer.height, 0, 0, this.Canvas.width, this.Canvas.height);
	}
}
