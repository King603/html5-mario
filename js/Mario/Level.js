import { Tile } from "./Tile.js";

export class Level {
	/**
	 * 关卡类
	 * @param {number} width 宽
	 * @param {number} height 高
	 */
	constructor(width, height) {
		// 关卡界面大小
		this.Width = width;
		this.Height = height;
		// 出口位置
		this.ExitY = this.ExitX = 10;
		// 界面
		this.Map = [];
		// 数据
		this.Data = [];
		// 精灵图模板
		this.SpriteTemplates = [];
		// 添加界面信息
		for (let x = 0; x < this.Width; x++) {
			this.Map[x] = [];
			this.Data[x] = [];
			this.SpriteTemplates[x] = [];
			for (let y = 0; y < this.Height; y++) {
				this.Map[x][y] = 0;
				this.Data[x][y] = 0;
				this.SpriteTemplates[x][y] = null;
			}
		}
	}
	// 更新数据
	Update() {
		for (let x = 0; x < this.Width; x++)
			for (let y = 0; y < this.Height; y++)
				if (this.Data[x][y] > 0)
					this.Data[x][y]--;
	}
	/**
	 * 获取方块顶部
	 * @param {number} x X坐标
	 * @param {number} y Y坐标
	 */
	GetBlockCapped(x, y) {
		x = Math.max(x, 0);
		y = Math.max(y, 0);
		x >= this.Width && (x = this.Width - 1);
		y >= this.Height && (y = this.Height - 1);
		return this.Map[x][y];
	}
	/**
	 * 获取方块
	 * @param {number} x X坐标
	 * @param {number} y Y坐标
	 */
	GetBlock(x, y) {
		x < 0 && (x = 0);
		x = Math.max(x, 0);
		if (y < 0)
			return 0;
		x >= this.Width && (x = this.Width - 1);
		y >= this.Height && (y = this.Height - 1);
		return this.Map[x][y];
	}
	/**
	 * 设置方块
	 * @param {number} x X坐标
	 * @param {number} y Y坐标
	 * @param {number} ele 元素
	 */
	SetBlock(x, y, ele) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Map[x][y] = ele);
	}
	/**
	 * 设置方块数据
	 * @param {number} x X坐标
	 * @param {number} y Y坐标
	 * @param {number} ele 元素
	 */
	SetBlockData(x, y, ele) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Data[x][y] = ele);
	}
	/**
	 * 判断阻塞
	 * @param {number} x X坐标
	 * @param {number} y Y坐标
	 * @param {number} ele 元素
	 */
	IsBlocking(x, y, ele) {
		x = this.GetBlock(x, y);
		y = (Tile.Behaviors[x & 255] & Tile.BlockAll) > 0;
		y |= ele > 0 && (Tile.Behaviors[x & 255] & Tile.BlockUpper) > 0;
		y |= ele < 0 && (Tile.Behaviors[x & 255] & Tile.BlockLower) > 0;
		return y;
	}
	/**
	 * 获取Sprite模板
	 * @param {number} x X坐标
	 * @param {number} y Y坐标
	 */
	GetSpriteTemplate(x, y) {
		return x < 0 || y < 0 || x >= this.Width || y >= this.Height ? null : this.SpriteTemplates[x][y];
	}
	/**
	 * 设置Sprite模板
	 * @param {number} x X坐标
	 * @param {number} y Y坐标
	 * @param {number} ele 元素
	 */
	SetSpriteTemplate(x, y, ele) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.SpriteTemplates[x][y] = ele);
	}
}
