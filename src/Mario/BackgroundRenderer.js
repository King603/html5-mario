import * as Enjine from "../Enjine/index.js";
import SpriteCuts from "./SpriteCuts.js";

export default class extends Enjine.Drawable {
	constructor(a, b, c, e) {
		super();
		this.Level = a;
		this.Width = b;
		this.Distance = e;
		this.TilesY = ((c / 32) | 0) + 1;
		this.Background = SpriteCuts.GetBackgroundSheet();
	}
	Draw(ctx, b) {
		let c = b.X / this.Distance;
		for (let e = (c / 32) | 0; e <= (((c + this.Width) / 32) | 0); e++) {
			for (let d = 0; d < this.TilesY; d++) {
				let f = this.Level.GetBlock(e, d) & 255;
				let { X, Y, Width, Height } = this.Background[f % 8][(f / 8) | 0];
				ctx.drawImage(
					Enjine.Resources.Images.background,
					X,
					Y,
					Width,
					Height,
					((e << 5) - c) | 0,
					(d << 5) | 0,
					Width,
					Height
				);
			}
		}
	}
}
