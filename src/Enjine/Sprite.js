import { Drawable } from "./Drawable.js";

export function Sprite() {
	this.Y = this.X = 0;
	this.Image = undefined;
}
Sprite.prototype = new Drawable();
Sprite.prototype.Draw = function (a, b) {
	a.drawImage(this.Image, this.X - b.X, this.Y - b.Y);
};
