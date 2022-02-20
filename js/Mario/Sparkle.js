import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";

export class Sparkle extends NotchSprite {
	constructor(world, x, y, xa, ya) {
		super(Enjine.Resources.Images.particles);
		this.World = world;
		this.X = x;
		this.Y = y;
		this.Xa = xa;
		this.Ya = ya;
		this.XPic = Math.random() * 2 | 0;
		this.YPic = 0;
		this.Life = 10 + (Math.random() * 5 | 0);
		this.XPicStart = this.XPic;
		this.YPicO = this.XPicO = 4;
		this.PicHeight = this.PicWidth = 8;
	}
	Move() {
		this.XPic = this.Life > 10 ? 7 : this.XPicStart + (10 - this.Life) * .4 | 0;
		this.Life-- < 0 && this.World.RemoveSprite(this);
		this.X += this.Xa;
		this.Y += this.Ya;
	}
}
