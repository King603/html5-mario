import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Mario from "./index.js";

export default class extends NotchSprite {
	constructor(a, b, c) {
		super();
		this.Width = 4;
		this.Height = 24;
		this.World = a;
		this.X = b;
		this.Y = c;
		this.Image = Enjine.Resources.Images.items;
		this.XPicO = 8;
		this.YPicO = 15;
		this.XPic = 1;
		this.YPic = 0;
		this.Height = 12;
		this.Facing = 1;
		this.PicWidth = this.PicHeight = 16;
		this.Life = 0;
	}
	CollideCheck() {
		var a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
		a > -16 &&
			a < 16 &&
			b > -this.Height &&
			b < Mario.MarioCharacter.Height &&
			(Mario.MarioCharacter.GetFlower(), this.World.RemoveSprite(this));
	}
	Move() {
		if (this.Life < 9) {
			this.Layer = 0;
			this.Y--;
			this.Life++;
		}
	}
}
