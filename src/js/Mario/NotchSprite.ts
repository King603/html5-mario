import * as Enjine from "../Enjine/index.js";
import { SpriteTemplate } from "./SpriteTemplate.js";

export class NotchSprite extends Enjine.Drawable {
	YPicO: number = 0;
	XPicO: number = 0;
	YPic: number = 0;
	XPic: number = 0;
	Ya: number = 0;
	Xa: number = 0;
	Y: number = 0;
	X: number = 0;
	YOld: number = 0;
	XOld: number = 0;
	PicHeight: number = 32;
	PicWidth: number = 32;
	YFlip: boolean = !1;
	XFlip: boolean = !1;
	Visible: boolean = !0;
	Delta: number = 0;
	SpriteTemplate: SpriteTemplate;
	Layer: number = 1;
	constructor(public Image: HTMLImageElement) {
		super();
		this.SpriteTemplate = null as unknown as SpriteTemplate;
	}
	Draw(ctx: CanvasRenderingContext2D) {
		if (this.Visible) {
			let b = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
			let c = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
			ctx.save();
			ctx.scale(
				this.XFlip ? -1 : 1,
				this.YFlip ? -1 : 1
			);
			ctx.translate(
				this.XFlip ? -320 : 0,
				this.YFlip ? -240 : 0
			);
			ctx.drawImage(
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
			ctx.restore();
		}
	}
	Update(delta: number) {
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
	GetX(x: number) {
		return (this.XOld + (this.X - this.XOld) * x | 0) - this.XPicO;
	}
	GetY(y: number) {
		return (this.YOld + (this.Y - this.YOld) * y | 0) - this.YPicO;
	}
	CollideCheck() { }
	Release() { }
}
