import * as Enjine from "../Enjine/index.js";
import { LevelState } from "./LevelState.js";
import { NotchSprite } from "./NotchSprite.js";

export class Particle extends NotchSprite {
	XPic = Math.random() * 2 | 0;
	YPic = 0;
	YPicO = 4;
	XPicO = 4;
	PicHeight = 8;
	PicWidth = 8;
	Life = 10;
	constructor(public World: LevelState, public X: number, public Y: number, public Xa: number, public Ya: number) {
		super(Enjine.Resources.Images?.particles as HTMLImageElement);
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
