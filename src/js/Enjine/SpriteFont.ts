import { Drawable } from "./Drawable.js";

interface LETTERS { X: number; Y: number; }
interface STRINGS extends LETTERS { String: string; length?: number; }

export class SpriteFont extends Drawable {
	constructor(public Strings: STRINGS[], public Image: HTMLImageElement, public LetterWidth: number, public LetterHeight: number, public Letters: LETTERS[]) {
		super();
	}
	Draw(ctx: CanvasRenderingContext2D) {
		for (let str of this.Strings) {
			for (let index = 0; str.length && index < str.length; index++) {
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
