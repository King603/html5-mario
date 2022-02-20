import * as Enjine from "../Enjine/index.js";

export class NotchSprite extends Enjine.Drawable {
	/**
	 * 
	 * @param {HTMLImageElement} Image 
	 */
	constructor(Image) {
		super();
		this.YPicO = this.XPicO = this.YPic = this.XPic = this.Ya = this.Xa = this.Y = this.X = this.YOld = this.XOld = 0;
		this.PicHeight = this.PicWidth = 32;
		this.YFlip = this.XFlip = !1;
		this.Visible = !0;
		this.Image = Image;
		this.Delta = 0;
		this.SpriteTemplate = null;
		this.Layer = 1;
	}
	Draw(a) {
		if (this.Visible) {
			let b = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
			let c = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
			a.save();
			a.scale(
				this.XFlip ? -1 : 1,
				this.YFlip ? -1 : 1
			);
			a.translate(
				this.XFlip ? -320 : 0,
				this.YFlip ? -240 : 0
			);
			a.drawImage(
				this.Image,
				this.XPic * this.PicWidth,
				this.YPic * this.PicHeight,
				this.PicWidth,
				this.PicHeight,
				this.XFlip ? 320 - b - this.PicWidth : b,
				this.YFlip ? 240 - c - this.PicHeight : c,
				this.PicWidth,
				this.PicHeight
			);
			a.restore();
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
	BumpCheck() { }
	Release() { }
	ShellCollideCheck() {
		return !1;
	}
	FireballCollideCheck() {
		return !1;
	}
}
