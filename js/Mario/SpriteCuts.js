import * as Enjine from "../Enjine/index.js";

// 裁剪精灵图
export const SpriteCuts = {
	// 创建黑色字体
	CreateBlackFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(0));
	},
	// 创建红色字体
	CreateRedFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(8));
	},
	// 创造绿色字体
	CreateGreenFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(16));
	},
	// 创建蓝色字体
	CreateBlueFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(24));
	},
	// 创建黄色字体
	CreateYellowFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(32));
	},
	// 创建粉红色字体
	CreatePinkFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(40));
	},
	// 创建青色字体
	CreateCyanFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(48));
	},
	// 创建白色字体
	CreateWhiteFont() {
		return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(56));
	},
	/**
	 * 获取字符数组
	 * @param {number} y
	 * @returns
	 */
	GetCharArray(y) {
		let b = [];
		for (let c = 32; c < 127; c++)
			b[c] = { X: (c - 32) * 8, Y: y };
		return b;
	},
	// 获取背景页
	GetBackgroundSheet() {
		let { width, height } = Enjine.Resources.Images.background;
		/**@type {{X: number; Y: number; Width: number; Height: number;}[][]} */
		let arr = [];
		for (let x = 0; x < width / 32; x++) {
			arr[x] = [];
			for (let y = 0; y < height / 32; y++) {
				arr[x][y] = {
					X: x * 32,
					Y: y * 32,
					Width: 32,
					Height: 32
				};
			}
		}
		return arr;
	},
	// 获取关卡表
	GetLevelSheet() {
		let { width, height } = Enjine.Resources.Images.map;
		let a = [];
		for (let b = 0; b < width / 16; b++) {
			a[b] = [];
			for (let c = 0; c < height / 16; c++)
				a[b][c] = { X: b * 16, Y: c * 16, Width: 16, Height: 16 };
		} return a;
	}
};
