import Enemy from "./Enemy.js";
import FlowerEnemy from "./FlowerEnemy.js";

export default class {
	constructor(a, b) {
		this.Type = a;
		this.Winged = b;
		this.LastVisibleTick = -1;
		this.IsDead = !1;
		this.Sprite = undefined;
	}
	Spawn(a, b, c, e) {
		if (!this.IsDead) {
			this.Sprite =
				this.Type === Enemy.Flower
					? new FlowerEnemy(a, b * 16 + 15, c * 16 + 24)
					: new Enemy(
						a,
						b * 16 + 8,
						c * 16 + 15,
						e,
						this.Type,
						this.Winged
					);
			this.Sprite.SpriteTemplate = this;
			a.AddSprite(this.Sprite);
		}
	}
}
