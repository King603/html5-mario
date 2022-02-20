import * as Enjine from "../Enjine/index.js";
export class NotchSprite extends Enjine.Drawable {
    Image;
    YPicO = 0;
    XPicO = 0;
    YPic = 0;
    XPic = 0;
    Ya = 0;
    Xa = 0;
    Y = 0;
    X = 0;
    YOld = 0;
    XOld = 0;
    PicHeight = 32;
    PicWidth = 32;
    YFlip = !1;
    XFlip = !1;
    Visible = !0;
    Delta = 0;
    SpriteTemplate;
    Layer = 1;
    constructor(Image) {
        super();
        this.Image = Image;
        this.SpriteTemplate = null;
    }
    Draw(ctx) {
        if (this.Visible) {
            let b = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
            let c = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
            ctx.save();
            ctx.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1);
            ctx.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0);
            ctx.drawImage(this.Image, this.XPic * this.PicWidth, this.YPic * this.PicHeight, this.PicWidth, this.PicHeight, this.XFlip ? 320 - b - this.PicWidth : b, this.YFlip ? 240 - c - this.PicHeight : c, this.PicWidth, this.PicHeight);
            ctx.restore();
        }
    }
    Update(delta) {
        this.XOld = this.X;
        this.YOld = this.Y;
        this.Move();
        this.Delta = delta;
    }
    UpdateNoMove() {
        this.XOld = this.X;
        this.YOld = this.Y;
        this.Delta = 0;
    }
    Move() {
        this.X += this.Xa;
        this.Y += this.Ya;
    }
    GetX(x) {
        return (this.XOld + (this.X - this.XOld) * x | 0) - this.XPicO;
    }
    GetY(y) {
        return (this.YOld + (this.Y - this.YOld) * y | 0) - this.YPicO;
    }
    CollideCheck() { }
    Release() { }
}
//# sourceMappingURL=NotchSprite.js.map