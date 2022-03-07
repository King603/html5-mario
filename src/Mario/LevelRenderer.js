import * as Enjine from "../Enjine/index.js";
import SpriteCuts from "./SpriteCuts.js";
import Tile from "./Tile.js";

export default class extends Enjine.Drawable {
	constructor(a, b, c) {
		super();
		this.Width = b;
		this.Height = c;
		this.Level = a;
		this.TilesY = ((c / 16) | 0) + 1;
		this.AnimTime = this.Bounce = this.Tick = this.Delta = 0;
		this.Background = SpriteCuts.GetLevelSheet();
	}
	Update(a) {
		this.AnimTime += a;
		this.Tick = this.AnimTime | 0;
		this.Bounce += a * 30;
		this.Delta = a;
	}
	Draw(a, b) {
		this.DrawStatic(a, b);
		this.DrawDynamic(a, b);
	}
	DrawStatic(a, b) {
		for (var c = 0, e = 0, d = 0, d = undefined, f = ((b.X + this.Width) / 16) | 0, c = (b.X / 16) | 0; c < f + 1; c++)
			for (e = 0; e < this.TilesY; e++)
				(d = this.Level.GetBlock(c, e) & 255),
					(Tile.Behaviors[d] & Tile.Animated) === 0 &&
					((d = this.Background[d % 16][(d / 16) | 0]),
						a.drawImage(
							Enjine.Resources.Images.map,
							d.X,
							d.Y,
							d.Width,
							d.Height,
							((c << 4) - b.X) | 0,
							(e << 4) | 0,
							d.Width,
							d.Height
						));
	}
	DrawDynamic(a, b) {
		for (var c = 0, e = 0, d = 0, f = 0, g = 0, d = undefined, c = (b.X / 16) | 0; (c <= (b.X + this.Width) / 16) | 0; c++)
			for (e = (b.Y / 16) | 0; (e <= (b.Y + this.Height) / 16) | 0; e++)
				(d = this.Level.GetBlock(c, e)),
					(Tile.Behaviors[d & 255] & Tile.Animated) > 0 &&
					((f = ((this.Bounce / 3) | 0) % 4),
						(((d % 16) / 4) | 0) === 0 &&
						((d / 16) | 0) === 1 &&
						((f = ((this.Bounce / 2 + (c + e) / 8) | 0) % 20),
							f > 3 && (f = 0)),
						(((d % 16) / 4) | 0) === 3 && ((d / 16) | 0) === 0 && (f = 2),
						(g = 0),
						c >= 0 &&
						e >= 0 &&
						c < this.Level.Width &&
						e < this.Level.Height &&
						(g = this.Level.Data[c][e]),
						g > 0 &&
						(g = (Math.sin(((g - this.Delta) / 4) * Math.PI) * 8) | 0),
						(d =
							this.Background[(((d % 16) / 4) | 0) * 4 + f][(d / 16) | 0]),
						a.drawImage(
							Enjine.Resources.Images.map,
							d.X,
							d.Y,
							d.Width,
							d.Height,
							(c << 4) - b.X,
							(e << 4) - b.Y - g,
							d.Width,
							d.Height
						));
	}
	DrawExit0(a, b, c) {
		for (var e = 0, e = 0, d = undefined, e = this.Level.ExitY - 8; e < this.Level.ExitY; e++)
			(d = this.Background[12][e === this.Level.ExitY - 8 ? 4 : 5]),
				a.drawImage(
					Enjine.Resources.Images.map,
					d.X,
					d.Y,
					d.Width,
					d.Height,
					(this.Level.ExitX << 4) - b.X - 16,
					(e << 4) - b.Y,
					d.Width,
					d.Height
				);
		c &&
			((e = this.Level.ExitY * 16 - 48 - Math.sin(this.AnimTime) * 48 - 8),
				(d = this.Background[12][3]),
				a.drawImage(
					Enjine.Resources.Images.map,
					d.X,
					d.Y,
					d.Width,
					d.Height,
					(this.Level.ExitX << 4) - b.X - 16,
					e - b.Y,
					d.Width,
					d.Height
				),
				(d = this.Background[13][3]),
				a.drawImage(
					Enjine.Resources.Images.map,
					d.X,
					d.Y,
					d.Width,
					d.Height,
					(this.Level.ExitX << 4) - b.X,
					e - b.Y,
					d.Width,
					d.Height
				));
	}
	DrawExit1(a, b) {
		for (var c = 0, e = undefined, c = this.Level.ExitY - 8; c < this.Level.ExitY; c++)
			(e = this.Background[13][c === this.Level.ExitY - 8 ? 4 : 5]),
				a.drawImage(
					Enjine.Resources.Images.map,
					e.X,
					e.Y,
					e.Width,
					e.Height,
					(this.Level.ExitX << 4) - b.X + 16,
					(c << 4) - b.Y,
					e.Width,
					e.Height
				);
	}
}
