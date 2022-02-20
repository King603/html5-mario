import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import { Sparkle } from "./Sparkle.js";
export class CoinAnim extends NotchSprite {
    World;
    Life = 10;
    constructor(World, x, y) {
        super(Enjine.Resources.Images?.map);
        this.World = World;
        this.PicWidth = this.PicHeight = 16;
        this.X = x * 16;
        this.Y = y * 16 - 16;
        this.Xa = 0;
        this.Ya = -6;
        this.XPic = 0;
        this.YPic = 2;
    }
    Move() {
        if (this.Life-- < 0) {
            this.World.RemoveSprite(this);
            for (let x = 0; x < 2; x++)
                for (let y = 0; y < 2; y++)
                    this.World.AddSprite(new Sparkle(this.World, this.X + x * 8 + Math.random() * 8 | 0, this.Y + y * 8 + Math.random() * 8 | 0, 0, 0));
        }
        this.XPic = this.Life & 3;
        this.X += this.Xa;
        this.Y += this.Ya;
        this.Ya += 1;
    }
}
//# sourceMappingURL=CoinAnim.js.map