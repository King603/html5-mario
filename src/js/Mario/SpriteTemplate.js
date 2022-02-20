import { Enemy } from "./Enemy.js";
import { FlowerEnemy } from "./FlowerEnemy.js";
export class SpriteTemplate {
    Type;
    Winged;
    LastVisibleTick = -1;
    IsDead = !1;
    Sprite;
    constructor(Type, Winged) {
        this.Type = Type;
        this.Winged = Winged;
    }
    Spawn(state, x, y, e) {
        if (!this.IsDead) {
            this.Sprite = this.Type === Enemy.Flower
                ? new FlowerEnemy(state, x * 16 + 15, y * 16 + 24)
                : new Enemy(state, x * 16 + 8, y * 16 + 15, e, this.Type, this.Winged);
            this.Sprite.SpriteTemplate = this;
            state.AddSprite(this.Sprite);
        }
    }
}
//# sourceMappingURL=SpriteTemplate.js.map