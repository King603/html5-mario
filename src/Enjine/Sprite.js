import Drawable from "./Drawable.js";

export default class extends Drawable {
	constructor() {
		super();
		this.Y = this.X = 0;
		this.Image = undefined;
	}
	Draw(a, b) {
		a.drawImage(this.Image, this.X - b.X, this.Y - b.Y);
	}
}
