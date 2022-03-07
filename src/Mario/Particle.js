import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";

export default class extends NotchSprite {
	constructor(a, b, c, e, d) {
		super();
		this.World = a;
		this.X = b;
		this.Y = c;
		this.Xa = e;
		this.Ya = d;
		this.XPic = (Math.random() * 2) | 0;
		this.YPic = 0;
		this.YPicO = this.XPicO = 4;
		this.PicHeight = this.PicWidth = 8;
		this.Life = 10;
		this.Image = Enjine.Resources.Images.particles;
	}
	Move() {
		this.Life - this.Delta < 0 && this.World.RemoveSprite(this);
		this.Life -= this.Delta;
		this.X += this.Xa;
		this.Y += this.Ya;
		this.Ya *= 0.95;
		this.Ya += 3;
	}
}
