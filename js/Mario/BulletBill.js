import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite";
import Mario from "./index.js";
import { Sparkle } from "./Sparkle.js";

export class BulletBill extends NotchSprite {
	constructor(world, x, y, facing) {
		super(Enjine.Resources.Images.enemies);
		this.World = world;
		this.X = x;
		this.Y = y;
		this.Facing = facing;
		this.XPicO = 8;
		this.YPicO = 31;
		this.Height = 12;
		this.Width = 4;
		this.PicWidth = 16;
		this.YPic = 5;
		this.XPic = 0;
		this.Ya = -5;
		this.DeadTime = 0;
		this.Dead = !1;
		this.Anim = 0;
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
						(this.X + Math.random() * 16 - 8 | 0) + 4,
						(this.Y + Math.random() * 8 | 0) + 4,
						Math.random() * 2 - 1,
						Math.random() * -1,
						0,
						1,
						5
					));
				this.World.RemoveSprite(this);
			}
			this.X += this.Xa;
			this.Y += this.Ya;
			this.Ya *= .95;
			this.Ya += 1;
		}
		else {
			this.Xa = this.Facing * 4;
			this.XFlip = this.Facing === -1;
			this.Move(this.Xa, 0);
		}
	}
	SubMove(a) {
		this.X += a;
		return !0;
	}
	FireballCollideCheck(a) {
		if (this.DeadTime !== 0)
			return !1;
		let x = a.X - this.X, y = a.Y - this.Y;
		if (x > -16 && x < 16 && y > -this.Height && y < a.Height)
			return !0;
		return !1;
	}
	ShellCollideCheck(a) {
		if (this.DeadTime !== 0)
			return !1;
		let x = a.X - this.X, y = a.Y - this.Y;
		if (x > -16 && x < 16 && y > -this.Height && y < a.Height)
			return Enjine.Resources.PlaySound("kick"), this.Dead = !0, this.Xa = 0, this.Ya = 1, this.DeadTime = 100, !0;
		return !1;
	};
}
