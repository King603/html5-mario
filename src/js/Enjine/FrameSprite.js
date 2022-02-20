import { Sprite } from "./Sprite.js";
export class FrameSprite extends Sprite {
    FrameHeight = 0;
    FrameWidth = 0;
    FrameY = 0;
    FrameX = 0;
    constructor() {
        super();
    }
    Draw(ctx, str) {
        this.Image &&
            ctx.drawImage(this.Image, this.FrameX, this.FrameY, this.FrameWidth, this.FrameHeight, this.X - str.X, this.Y - str.Y, this.FrameWidth, this.FrameHeight);
    }
}
//# sourceMappingURL=FrameSprite.js.map