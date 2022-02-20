import { Enemy } from "./Enemy.js";
import { FlowerEnemy } from "./FlowerEnemy.js";
import { LevelState } from "./LevelState.js";

export class SpriteTemplate {
	LastVisibleTick = -1;
	IsDead = !1;
	Sprite!: FlowerEnemy | Enemy;
	constructor(public Type: number, public Winged: boolean) { }
	Spawn(state: LevelState, x: number, y: number, e: number) {
		if (!this.IsDead) {
			this.Sprite = this.Type === Enemy.Flower
				? new FlowerEnemy(state, x * 16 + 15, y * 16 + 24)
				: new Enemy(state, x * 16 + 8, y * 16 + 15, e, this.Type, this.Winged);
			this.Sprite.SpriteTemplate = this;
			state.AddSprite(this.Sprite);
		}
	}
}
