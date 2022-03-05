import { Drawable } from "./Drawable.js";

export class SpriteFont extends Drawable {
	constructor(Strings, Image, LetterWidth, LetterHeight, Letters) {
		super();
		this.Image = Image;
		this.Letters = Letters;
		this.LetterWidth = LetterWidth;
		this.LetterHeight = LetterHeight;
		/**@type {{String: string; X: number; Y: number;}[]} */
		this.Strings = Strings;
	}
	Draw(ctx) {
		for (let { String, X, Y } of this.Strings) {
			for (let d in String) {
				let { LetterWidth: lW, LetterHeight: lH, Image, Letters } = this;
				let { X: lX, Y: lY } = Letters[String.charCodeAt(d)];
				ctx.drawImage(Image, lX, lY, lW, lH, X + lW * (+d + 1), Y, lW, lH);
			}
		}
	}
}
