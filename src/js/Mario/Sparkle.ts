import * as Enjine from "../Enjine/index.js";
import { LevelState } from "./LevelState.js";
import { NotchSprite } from "./NotchSprite.js";

export class Sparkle extends NotchSprite {
	XPic = Math.random() * 2 | 0;
	YPic = 0;
	Life = 10 + (Math.random() * 5 | 0);
	YPicO = 4;
	XPicO = 4;
	PicHeight = 8;
	PicWidth = 8;
	XPicStart: number;
	constructor(public World: LevelState, public X: number, public Y: number, public Xa: number, public Ya: number) {
		super(Enjine.Resources.Images?.particles as HTMLImageElement);
		this.XPicStart = this.XPic;
	}
	Move() {
		this.XPic = this.Life > 10 ? 7 : this.XPicStart + (10 - this.Life) * .4 | 0;
		this.Life-- < 0 && this.World.RemoveSprite(this);
		this.X += this.Xa;
		this.Y += this.Ya;
	}
}
