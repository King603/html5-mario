import { SpriteTemplate } from "./SpriteTemplate.js";
import { Tile } from "./Tile.js";

export class Level {
	ExitY: number = 10;
	ExitX: number = 10;
	Map: number[][];
	Data: number[][];
	SpriteTemplates: (number | SpriteTemplate)[][];
	constructor(public Width: number, public Height: number) {// 关卡界面大小
		this.Map = [];
		this.Data = [];
		this.SpriteTemplates = [];
		for (let x = 0; x < this.Width; x++) {
			this.Map[x] = [];
			this.Data[x] = [];
			this.SpriteTemplates[x] = [];
			for (let y = 0; y < this.Height; y++) {
				this.Map[x][y] = 0;
				this.Data[x][y] = 0;
				this.SpriteTemplates[x][y] = null as unknown as number;
			}
		}
	}
	Update() {
		for (let x = 0; x < this.Width; x++)
			for (let y = 0; y < this.Height; y++)
				if (this.Data[x][y] > 0)
					this.Data[x][y]--;
	}
	GetBlockCapped(x: number, y: number) {
		x = Math.max(x, 0);
		y = Math.max(y, 0);
		x >= this.Width && (x = this.Width - 1);
		y >= this.Height && (y = this.Height - 1);
		return this.Map[x][y];
	}
	GetBlock(x: number, y: number) {
		x < 0 && (x = 0);
		x = Math.max(x, 0);
		if (y < 0)
			return 0;
		x >= this.Width && (x = this.Width - 1);
		y >= this.Height && (y = this.Height - 1);
		return this.Map[x][y];
	}
	SetBlock(x: number, y: number, ele: number) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Map[x][y] = ele);
	}
	SetBlockData(x: number, y: number, ele: number) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Data[x][y] = ele);
	}
	IsBlocking(x: number, y: number, ele: number) {
		x = this.GetBlock(x, y);
		y = +((Tile.Behaviors[x & 255] & Tile.BlockAll) > 0);
		y |= +(ele > 0 && (Tile.Behaviors[x & 255] & Tile.BlockUpper) > 0);
		y |= +(ele < 0 && (Tile.Behaviors[x & 255] & Tile.BlockLower) > 0);
		return y;
	}
	GetSpriteTemplate(x: number, y: number) {
		return x < 0 || y < 0 || x >= this.Width || y >= this.Height ? null : this.SpriteTemplates[x][y];
	}
	SetSpriteTemplate(x: number, y: number, ele: SpriteTemplate) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.SpriteTemplates[x][y] = ele);
	}
}
