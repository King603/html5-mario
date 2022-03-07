import * as Enjine from "../Enjine/index.js";

export default class extends Enjine.Drawable {
	constructor() {
		super();
		this.YPicO =
			this.XPicO =
			this.YPic =
			this.XPic =
			this.Ya =
			this.Xa =
			this.Y =
			this.X =
			this.YOld =
			this.XOld =
			0;
		this.PicHeight = this.PicWidth = 32;
		this.YFlip = this.XFlip = !1;
		this.Visible = !0;
		this.Image = undefined;
		this.Delta = 0;
		this.SpriteTemplate = undefined;
		this.Layer = 1;
	}
	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	Draw(ctx) {
		if (this.Visible) {
			let w = ((this.XOld + (this.X - this.XOld) * this.Delta) | 0) - this.XPicO;
			let h = ((this.YOld + (this.Y - this.YOld) * this.Delta) | 0) - this.YPicO;
			ctx.save();
			ctx.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1);
			ctx.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0);
			ctx.drawImage(
				this.Image,
				this.XPic * this.PicWidth,
				this.YPic * this.PicHeight,
				this.PicWidth,
				this.PicHeight,
				this.XFlip ? 320 - w - this.PicWidth : w,
				this.YFlip ? 240 - h - this.PicHeight : h,
				this.PicWidth,
				this.PicHeight
			);
			ctx.restore();
		}
	}
	Update(a) {
		this.XOld = this.X;
		this.YOld = this.Y;
		this.Move();
		this.Delta = a;
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
	GetX(size) {
		return ((this.XOld + (this.X - this.XOld) * size) | 0) - this.XPicO;
	}
	GetY(size) {
		return ((this.YOld + (this.Y - this.YOld) * size) | 0) - this.YPicO;
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
