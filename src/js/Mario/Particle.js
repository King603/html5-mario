import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
export class Particle extends NotchSprite {
    World;
    X;
    Y;
    Xa;
    Ya;
    XPic = Math.random() * 2 | 0;
    YPic = 0;
    YPicO = 4;
    XPicO = 4;
    PicHeight = 8;
    PicWidth = 8;
    Life = 10;
    constructor(World, X, Y, Xa, Ya) {
        super(Enjine.Resources.Images?.particles);
        this.World = World;
        this.X = X;
        this.Y = Y;
        this.Xa = Xa;
        this.Ya = Ya;
    }
    Move() {
        if (this.Life - this.Delta < 0)
            this.World.RemoveSprite(this);
        this.Life -= this.Delta;
        this.X += this.Xa;
        this.Y += this.Ya;
        this.Ya *= .95;
        this.Ya += 3;
    }
}
//# sourceMappingURL=Particle.js.map