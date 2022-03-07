import Sprite from "./Sprite.js";

export default class extends Sprite {
	constructor() {
		super();
		this.FrameHeight = this.FrameWidth = this.FrameY = this.FrameX = 0;
	}
	Draw(a, { X, Y }) {
		let { Image, FrameX: fx, FrameY: fy, FrameWidth: fw, FrameHeight: fh, X: x, Y: y } = this;
		a.drawImage(Image, fx, fy, fw, fh, x - X, y - Y, fw, fh);
	}
}
