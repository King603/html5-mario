import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Sparkle from "./Sparkle.js";

export default class extends NotchSprite {
	constructor(a, b, c) {
		super();
		this.World = a;
		this.Life = 10;
		this.Image = Enjine.Resources.Images.map;
		this.PicWidth = this.PicHeight = 16;
		this.X = b * 16;
		this.Y = c * 16 - 16;
		this.Xa = 0;
		this.Ya = -6;
		this.XPic = 0;
		this.YPic = 2;
	}
	Move() {
		if (this.Life-- < 0) {
			this.World.RemoveSprite(this);
			for (let a = 0; a < 2; a++)
				for (let b = 0; b < 2; b++)
					this.World.AddSprite(
						new Sparkle(
							this.World,
							(this.X + a * 8 + Math.random() * 8) | 0,
							(this.Y + b * 8 + Math.random() * 8) | 0,
							0,
							0,
							0,
							2,
							5
						)
					);
		}
		this.XPic = this.Life & 3;
		this.X += this.Xa;
		this.Y += this.Ya;
		this.Ya += 1;
	}
}
