import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import Mario from "./index.js";
export class FireFlower extends NotchSprite {
    World;
    X;
    Y;
    Width = 4;
    Height = 12;
    Facing = 1;
    Life = 0;
    constructor(World, X, Y) {
        super(Enjine.Resources.Images?.items);
        this.World = World;
        this.X = X;
        this.Y = Y;
        this.XPicO = 8;
        this.YPicO = 15;
        this.XPic = 1;
        this.YPic = 0;
        this.PicWidth = this.PicHeight = 16;
    }
    CollideCheck() {
        let x = Mario.MarioCharacter.X - this.X, y = Mario.MarioCharacter.Y - this.Y;
        if (x > -16 && x < 16 && y > -this.Height && y < Mario.MarioCharacter.Height) {
            Mario.MarioCharacter.GetFlower();
            this.World.RemoveSprite(this);
        }
    }
    Move() {
        if (this.Life < 9) {
            this.Layer = 0;
            this.Y--;
            this.Life++;
        }
    }
}
//# sourceMappingURL=FireFlower.js.map