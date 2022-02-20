import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite";
import Mario from "./index.js";
import { Sparkle } from "./Sparkle.js";
import { LevelState } from "./LevelState.js";

export class BulletBill extends NotchSprite {
	XPicO = 8;
	YPicO = 31;
	Height = 12;
	Width = 4;
	PicWidth = 16;
	YPic = 5;
	XPic = 0;
	Xa = 0;
	Ya = -5;
	DeadTime = 0;
	Dead = !1;
	Anim = 0;
	XFlip = false;
	constructor(public World: LevelState, public X: number, public Y: number, public Facing: number) {
		super(Enjine.Resources.Images?.enemies as HTMLImageElement);
	}
	CollideCheck() {
		if (!this.Dead) {
			let x = Mario.MarioCharacter.X - this.X, y = Mario.MarioCharacter.Y - this.Y;
			if (x > -16 && x < 16 && y > -this.Height && y < this.World.Mario.Height)
				if (Mario.MarioCharacter.Y > 0 && y <= 0 && (!Mario.MarioCharacter.OnGround || !Mario.MarioCharacter.WasOnGround)) {
					Mario.MarioCharacter.Stomp(this);
					this.Dead = !0;
					this.Xa = 0;
					this.Ya = 1;
					this.DeadTime = 100;
				} else
					Mario.MarioCharacter.GetHurt();
		}
	}
	Move() {
		if (this.DeadTime > 0) {
			if (--this.DeadTime === 0) {
				this.DeadTime = 1;
				for (let i = 0; i < 8; i++)
					this.World.AddSprite(new Sparkle(
						this.World,
						(this.X + Math.random() * 16 - 8 | 0) + 4,
						(this.Y + Math.random() * 8 | 0) + 4,
						Math.random() * 2 - 1,
						Math.random() * -1
					));
				this.World.RemoveSprite(this);
			}
			this.X += this.Xa;
			this.Y += this.Ya;
			this.Ya *= .95;
			this.Ya += 1;
		} else {
			this.Xa = this.Facing * 4;
			this.XFlip = this.Facing === -1;
			this.Move();
		}
	}
	SubMove(a: any) {
		this.X += a;
		return !0;
	}
	FireballCollideCheck(a: { X: number; Y: number; Height: number; }) {
		if (this.DeadTime !== 0)
			return !1;
		let x = a.X - this.X, y = a.Y - this.Y;
		if (x > -16 && x < 16 && y > -this.Height && y < a.Height)
			return !0;
		return !1;
	}
	ShellCollideCheck(a: { X: number; Y: number; Height: number; }) {
		if (this.DeadTime !== 0)
			return !1;
		let x = a.X - this.X, y = a.Y - this.Y;
		if (x > -16 && x < 16 && y > -this.Height && y < a.Height) {
			Enjine.Resources.PlaySound("kick");
			this.Dead = !0;
			this.Xa = 0;
			this.Ya = 1;
			this.DeadTime = 100;
			return !0;
		}
		return !1;
	}
}
