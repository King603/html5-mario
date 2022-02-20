import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import Mario from "./index.js";

export class FireFlower extends NotchSprite {
	constructor(world, x, y) {
		super(Enjine.Resources.Images.items);
		this.Width = 4;
		this.Height = 24;
		this.World = world;
		this.X = x;
		this.Y = y;
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
		let x = Mario.MarioCharacter.X - this.X, y = Mario.MarioCharacter.Y - this.Y;
		if (x > -16 && x < 16 && y > -this.Height && y < Mario.MarioCharacter.Height) {
			Mario.MarioCharacter.GetFlower();
			this.World.RemoveSprite(this);
		}
	}
	Move() {
		if (this.Life < 9) {
			this.Layer = 0;
			this.Y--;
			this.Life++;
		}
	}
}
