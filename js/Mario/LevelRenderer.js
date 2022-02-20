import * as Enjine from "../Enjine/index.js";
import { SpriteCuts } from "./SpriteCuts.js";
import { Tile } from "./Tile.js";

export class LevelRenderer extends Enjine.Drawable {
	constructor(level, width, height) {
		super();
		this.Width = width;
		this.Height = height;
		this.Level = level;
		this.TilesY = (height / 16 | 0) + 1;
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
		for (let x = b.X / 16 | 0; x < ((b.X + this.Width) / 16 | 0) + 1; x++)
			for (let y = 0; y < this.TilesY; y++) {
				let level = this.Level.GetBlock(x, y) & 255;
				if ((Tile.Behaviors[level] & Tile.Animated) === 0) {
					level = this.Background[level % 16][level / 16 | 0];
					a.drawImage(Enjine.Resources.Images.map, level.X, level.Y, level.Width, level.Height, (x << 4) - b.X | 0, y << 4 | 0, level.Width, level.Height);
				}
			}
	}
	DrawDynamic(a, b) {
		for (let x = b.X / 16 | 0; x <= (b.X + this.Width) / 16 | 0; x++)
			for (let y = b.Y / 16 | 0; y <= (b.Y + this.Height) / 16 | 0; y++) {
				let level = this.Level.GetBlock(x, y);
				if ((Tile.Behaviors[level & 255] & Tile.Animated) > 0) {
					let bounce = (this.Bounce / 3 | 0) % 4;
					if ((level % 16 / 4 | 0) === 0 && (level / 16 | 0) === 1) {
						bounce = (this.Bounce / 2 + (x + y) / 8 | 0) % 20;
						if (bounce > 3)
							bounce = 0;
					}
					if ((level % 16 / 4 | 0) === 3 && (level / 16 | 0) === 0)
						bounce = 2;
					let g = 0;
					if (x >= 0 && y >= 0 && x < this.Level.Width && y < this.Level.Height)
						g = this.Level.Data[x][y];
					if (g > 0)
						g = Math.sin((g - this.Delta) / 4 * Math.PI) * 8 | 0;
					level = this.Background[(level % 16 / 4 | 0) * 4 + bounce][level / 16 | 0];
					a.drawImage(Enjine.Resources.Images.map, level.X, level.Y, level.Width, level.Height, (x << 4) - b.X, (y << 4) - b.Y - g, level.Width, level.Height);
				}
			}
	}
	DrawExit0(a, b, c) {
		for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
			let bgc = this.Background[12][y === this.Level.ExitY - 8 ? 4 : 5];
			a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X - 16, (y << 4) - b.Y, bgc.Width, bgc.Height);
		}
		if (c) {
			let y = this.Level.ExitY * 16 - 48 - Math.sin(this.AnimTime) * 48 - 8;
			let bgc = this.Background[12][3];
			a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X - 16, y - b.Y, bgc.Width, bgc.Height);
			bgc = this.Background[13][3];
			a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X, y - b.Y, bgc.Width, bgc.Height);
		}
	}
	DrawExit1(a, b) {
		for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
			let bgc = this.Background[13][y === this.Level.ExitY - 8 ? 4 : 5];
			a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X + 16, (y << 4) - b.Y, bgc.Width, bgc.Height);
		}
	};
}
