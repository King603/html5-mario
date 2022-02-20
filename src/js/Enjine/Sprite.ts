import { Drawable } from "./Drawable.js";

export class Sprite extends Drawable {
	Y: number = 0;
	X: number = 0;
	Image?: HTMLImageElement;
	constructor() {
		super();
	}
	Draw(ctx: CanvasRenderingContext2D, block: { X: number; Y: number; }) {
		this.Image && ctx.drawImage(this.Image, this.X - block.X, this.Y - block.Y);
	}
}
