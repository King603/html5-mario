import * as Enjine from "../Enjine/index.js";
import { Enemy } from "./Enemy.js";
import Mario from "./index.js";
import { Sparkle } from "./Sparkle.js";

export class FlowerEnemy extends Enemy {
	constructor(world, x, y) {
		super();
		this.Image = Enjine.Resources.Images.enemies;
		this.World = world;
		this.X = x;
		this.Y = y;
		this.Facing = 1;
		this.Type = Enemy.Spiky;
		this.NoFireballDeath = this.Winged = !1;
		this.XPic = 0;
		this.YPic = 6;
		this.YPicO = 24;
		this.Height = 12;
		this.Width = 2;
		this.YStart = y;
		this.Ya = -8;
		this.Y -= 1;
		for (let n = this.Tick = this.JumpTime = this.Layer = 0; n < 4; n++)
			this.Move();
	}
	Move() {
		if (this.DeadTime > 0) {
			if (--this.DeadTime === 0) {
				this.DeadTime = 1;
				for (let n = 0; n < 8; n++)
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
			this.Tick++;
			if (this.Y >= this.YStart) {
				this.YStart = this.Y;
				let a = Math.abs(Mario.MarioCharacter.X - this.X) | 0;
				this.JumpTime++;
				this.Ya = this.JumpTime > 40 && a > 24 ? -8 : 0;
			} else {
				this.JumpTime = 0;
				this.Y += this.Ya;
				this.Ya *= .9;
				this.Ya += .1;
				this.XPic = ((this.Tick / 2 | 0) & 1) * 2 + ((this.Tick / 6 | 0) & 1);
			}
		}
	}
}
