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
		this.Life = 10 + ((Math.random() * 5) | 0);
		this.XPicStart = this.XPic;
		this.YPicO = this.XPicO = 4;
		this.PicHeight = this.PicWidth = 8;
		this.Image = Enjine.Resources.Images.particles;
	}
	Move() {
		this.XPic =
			this.Life > 10 ? 7 : (this.XPicStart + (10 - this.Life) * 0.4) | 0;
		this.Life-- < 0 && this.World.RemoveSprite(this);
		this.X += this.Xa;
		this.Y += this.Ya;
	}
}
