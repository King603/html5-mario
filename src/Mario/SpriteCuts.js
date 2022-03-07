import * as Enjine from "../Enjine/index.js";

export default {
	CreateBlackFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 0) });
	},
	CreateRedFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 1) });
	},
	CreateGreenFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 2) });
	},
	CreateBlueFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 3) });
	},
	CreateYellowFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 4) });
	},
	CreatePinkFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 5) });
	},
	CreateCyanFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 6) });
	},
	CreateWhiteFont() {
		return new Enjine.SpriteFont({ Letters: this.GetCharArray(8 * 7) });
	},
	/**
	 *
	 * @param {number} y
	 * @returns
	 */
	GetCharArray(y) {
		// 遍历ASCⅡ码表
		let arr = [];
		for (let i = 32; i < 127; i++) {
			arr[i] = { X: (i - 32) * 8, Y: y };
		}
		return arr;
	},
	GetBackgroundSheet() {
		/**@type {{ X: number; Y: number; Width: number; Height: number; }[][]} */
		let arr = [];
		let { width, height } = Enjine.Resources.Images.background;
		for (let w = 0; w < width / 32; w++) {
			arr[w] = [];
			for (let h = 0; h < height / 32; h++) {
				arr[w][h] = { X: w * 32, Y: h * 32, Width: 32, Height: 32 };
			}
		}
		return arr;
	},
	GetLevelSheet() {
		/**@type {{ X: number; Y: number; Width: number; Height: number; }[][]} */
		let arr = [];
		let { width, height } = Enjine.Resources.Images.map;
		for (let w = 0; w < width / 16; w++) {
			arr[w] = [];
			for (let h = 0; h < height / 16; h++) {
				arr[w][h] = { X: w * 16, Y: h * 16, Width: 16, Height: 16 };
			}
		}
		return arr;
	},
};
