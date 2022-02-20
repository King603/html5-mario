import * as Enjine from "../Enjine/index.js";
import { Level } from "./Level.js";
import { SpriteCuts } from "./SpriteCuts.js";

export class BackgroundRenderer extends Enjine.Drawable {
	/**
	 * 背景渲染器
	 * @param {Level} level
	 * @param {number} width
	 * @param {number} y Y坐标
	 * @param {number} distance
	 */
	constructor(level, width, y, distance) {
		super();
		this.Level = level;
		this.Width = width;
		this.Distance = distance;
		this.TilesY = (y / 32 | 0) + 1;
		this.Background = SpriteCuts.GetBackgroundSheet();
	}
	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {{X: number}} block 
	 */
	Draw(ctx, block) {
		let c = block.X / this.Distance;
		for (let e = c / 32 | 0; e <= (c + this.Width) / 32 | 0; e++)
			for (let d = 0; d < this.TilesY; d++) {
				let block = this.Level.GetBlock(e, d) & 255;
				let bg = this.Background[block % 8][block / 8 | 0];
				ctx.drawImage(Enjine.Resources.Images.background, bg.X, bg.Y, bg.Width, bg.Height, (e << 5) - c | 0, d << 5 | 0, bg.Width, bg.Height);
			}
	}
}
