import * as Enjine from "../Enjine/index.js";
import { Level } from "./Level.js";
import { Sheet, SpriteCuts } from "./SpriteCuts.js";

export class BackgroundRenderer extends Enjine.Drawable {
	TilesY: number;
	Background: Sheet[][];
	constructor(public Level: Level, public Width: number, y: number, public Distance: number) {
		super();
		this.TilesY = (y / 32 | 0) + 1;
		this.Background = SpriteCuts.GetBackgroundSheet();
	}
	Draw(ctx: CanvasRenderingContext2D, block: { X: number; }) {
		let c = block.X / this.Distance;
		for (let e = c / 32 | 0; e <= ((c + this.Width) / 32 | 0); e++)
			for (let d = 0; d < this.TilesY; d++) {
				let block = this.Level.GetBlock(e, d) & 255;
				let bg = this.Background[block % 8][block / 8 | 0];
				ctx.drawImage(Enjine.Resources.Images?.background as HTMLImageElement, bg.X, bg.Y, bg.Width, bg.Height, (e << 5) - c | 0, d << 5 | 0, bg.Width, bg.Height);
			}
	}
}
