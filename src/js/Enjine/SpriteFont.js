import { Drawable } from "./Drawable.js";
export class SpriteFont extends Drawable {
    Strings;
    Image;
    LetterWidth;
    LetterHeight;
    Letters;
    constructor(Strings, Image, LetterWidth, LetterHeight, Letters) {
        super();
        this.Strings = Strings;
        this.Image = Image;
        this.LetterWidth = LetterWidth;
        this.LetterHeight = LetterHeight;
        this.Letters = Letters;
    }
    Draw(ctx) {
        for (let str of this.Strings) {
            for (let index = 0; str.length && index < str.length; index++) {
                ctx.drawImage(this.Image, this.Letters[str.String.charCodeAt(index)].X, this.Letters[str.String.charCodeAt(index)].Y, this.LetterWidth, this.LetterHeight, str.X + this.LetterWidth * (index + 1), str.Y, this.LetterWidth, this.LetterHeight);
            }
        }
    }
}
//# sourceMappingURL=SpriteFont.js.map