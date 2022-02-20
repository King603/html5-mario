import { Drawable } from "./Drawable.js";

export class SpriteFont extends Drawable {
	/**
	 *
	 * @param {{String: string; X: number; Y: number;}[]} str
	 * @param {HTMLImageElement} image
	 * @param {number} width
	 * @param {number} height
	 * @param {{X: number; Y: number;}[]} Letters
	 */
	constructor(str, image, width, height, Letters) {
		super();
		this.Image = image;
		this.Letters = Letters;
		this.LetterWidth = width;
		this.LetterHeight = height;
		this.Strings = str;
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	Draw(ctx) {
		for (let str of this.Strings) {
			for (let index = 0; index < str.length; index++) {
				ctx.drawImage(
					this.Image,
					this.Letters[str.String.charCodeAt(index)].X,
					this.Letters[str.String.charCodeAt(index)].Y,
					this.LetterWidth,
					this.LetterHeight,
					str.X + this.LetterWidth * (index + 1),
					str.Y,
					this.LetterWidth,
					this.LetterHeight
				);
			}
		}
	}
}
