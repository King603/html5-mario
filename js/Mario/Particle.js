import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";

export class Particle extends NotchSprite {
	constructor(world, x, y, Xa, Ya) {
		super(Enjine.Resources.Images.particles);
		this.World = world;
		this.X = x;
		this.Y = y;
		this.Xa = Xa;
		this.Ya = Ya;
		this.XPic = Math.random() * 2 | 0;
		this.YPic = 0;
		this.YPicO = this.XPicO = 4;
		this.PicHeight = this.PicWidth = 8;
		this.Life = 10;
	}
	Move() {
		if (this.Life - this.Delta < 0)
			this.World.RemoveSprite(this);
		this.Life -= this.Delta;
		this.X += this.Xa;
		this.Y += this.Ya;
		this.Ya *= .95;
		this.Ya += 3;
	}
}
