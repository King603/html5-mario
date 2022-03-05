import { Sprite } from "./Sprite.js";

export function FrameSprite() {
	this.FrameHeight = this.FrameWidth = this.FrameY = this.FrameX = 0;
}
;
FrameSprite.prototype = new Sprite();
FrameSprite.prototype.Draw = function (a, { X, Y }) {
	let { Image, FrameX: fx, FrameY: fy, FrameWidth: fw, FrameHeight: fh, X: x, Y: y } = this;
	a.drawImage(Image, fx, fy, fw, fh, x - X, y - Y, fw, fh);
};
