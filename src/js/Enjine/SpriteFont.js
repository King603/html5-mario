import { Drawable } from "./Drawable.js";
/**
 * 精灵图字体
 * @extends Drawable
 */

export class SpriteFont extends Drawable {
  /**
   * @param {{ String: String; X: Number; Y: Number; }[]} str
   * @param {HTMLImageElement} image
   * @param {Number} width
   * @param {Number} height
   * @param {{ X: Number; Y: Number; }[]} Letters
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
   * 布局
   * @param {CanvasRenderingContext2D} ctx
   */
  Draw(ctx) {
    this.Strings.forEach(
      camera => {
        for (let index = 0; index < camera.length; index++) {
          ctx.drawImage(
            this.Image,
            this.Letters[camera.String.charCodeAt(index)].X,
            this.Letters[camera.String.charCodeAt(index)].Y,
            this.LetterWidth,
            this.LetterHeight,
            camera.X + this.LetterWidth * (index + 1),
            camera.Y,
            this.LetterWidth,
            this.LetterHeight
          );
        }
      }
    );
  }
}
