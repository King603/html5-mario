import * as Enjine from "../Enjine/index.js";
import Enemy from "./Enemy.js";
import Sparkle from "./Sparkle.js";
import Mario from "./index.js";

export default class extends Enemy {
	constructor(a, b, c) {
		super();
		this.Image = Enjine.Resources.Images.enemies;
		this.World = a;
		this.X = b;
		this.Y = c;
		this.Facing = 1;
		this.Type = Enemy.Spiky;
		this.NoFireballDeath = this.Winged = !1;
		this.XPic = 0;
		this.YPic = 6;
		this.YPicO = 24;
		this.Height = 12;
		this.Width = 2;
		this.YStart = c;
		this.Ya = -8;
		this.Y -= 1;
		this.Tick = this.JumpTime = this.Layer = 0;
		for (let i = 0; i < 4; i++)
			this.Move();
	}
	Move() {
		var a = 0, a = 0;
		if (this.DeadTime > 0) {
			this.DeadTime--;
			if (this.DeadTime === 0) {
				this.DeadTime = 1;
				for (a = 0; a < 8; a++)
					this.World.AddSprite(
						new Sparkle(
							((this.X + Math.random() * 16 - 8) | 0) + 4,
							((this.Y + Math.random() * 8) | 0) + 4,
							Math.random() * 2 - 1,
							Math.random() * -1,
							0,
							1,
							5
						)
					);
				this.World.RemoveSprite(this);
			}
			this.X += this.Xa;
			this.Y += this.Ya;
			this.Ya *= 0.95;
			this.Ya += 1;
		}

		else
			this.Tick++,
				this.Y >= this.YStart
					? ((this.YStart = this.Y),
						(a = Math.abs(Mario.MarioCharacter.X - this.X) | 0),
						this.JumpTime++,
						(this.Ya = this.JumpTime > 40 && a > 24 ? -8 : 0))
					: (this.JumpTime = 0),
				(this.Y += this.Ya),
				(this.Ya *= 0.9),
				(this.Ya += 0.1),
				(this.XPic =
					(((this.Tick / 2) | 0) & 1) * 2 + (((this.Tick / 6) | 0) & 1));
	}
}
