import * as Enjine from "../Enjine/index.js";
import Drawable from "./Drawable.js";

export default class extends Drawable {
	/**
	 * 
	 * @param {{Strings?: { String: string; X: number; Y: number; }[]; Image?: HTMLImageElement; LetterWidth?: number; LetterHeight?: number; Letters: { X: number; Y: number; }[]; }}  
	 */
	constructor({ Strings = [], Image = Enjine.Resources.Images.font, LetterWidth = 8, LetterHeight = 8, Letters }) {
		super();
		this.Image = Image;
		this.Letters = Letters;
		this.LetterWidth = LetterWidth;
		this.LetterHeight = LetterHeight;
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
