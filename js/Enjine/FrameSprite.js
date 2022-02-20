import { Sprite } from "./Sprite.js";

export class FrameSprite extends Sprite {
	constructor() {
		super();
		this.FrameHeight = this.FrameWidth = this.FrameY = this.FrameX = 0;
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {{X: number; Y: number;}} str
	 */
	Draw(ctx, str) {
		ctx.drawImage(
			this.Image,
			this.FrameX,
			this.FrameY,
			this.FrameWidth,
			this.FrameHeight,
			this.X - str.X,
			this.Y - str.Y,
			this.FrameWidth,
			this.FrameHeight
		);
	}
}
