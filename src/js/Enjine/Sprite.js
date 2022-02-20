import { Drawable } from "./Drawable.js";
export class Sprite extends Drawable {
    Y = 0;
    X = 0;
    Image;
    constructor() {
        super();
    }
    Draw(ctx, block) {
        this.Image && ctx.drawImage(this.Image, this.X - block.X, this.Y - block.Y);
    }
}
//# sourceMappingURL=Sprite.js.map