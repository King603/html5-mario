import Tile from "./Tile.js";

export default class {
	/**
	 * 
	 * @param {number} Width 
	 * @param {number} Height 
	 */
	constructor(Width, Height) {
		this.Width = Width;
		this.Height = Height;
		this.ExitY = this.ExitX = 10;
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
				this.SpriteTemplates[x][y] = undefined;
			}
		}
	}
	Update() {
		for (let x = 0; x < this.Width; x++)
			for (let y = 0; y < this.Height; y++)
				this.Data[x][y] > 0 && this.Data[x][y]--;
	}
	GetBlockCapped(x, y) {
		x < 0 && (x = 0);
		y < 0 && (y = 0);
		x >= this.Width && (x = this.Width - 1);
		y >= this.Height && (y = this.Height - 1);
		return this.Map[x][y];
	}
	GetBlock(x, y) {
		x < 0 && (x = 0);
		if (y < 0)
			return 0;
		x >= this.Width && (x = this.Width - 1);
		y >= this.Height && (y = this.Height - 1);
		return this.Map[x][y];
	}
	SetBlock(x, y, value) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Map[x][y] = value);
	}
	SetBlockData(x, y, value) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Data[x][y] = value);
	}
	IsBlocking(x, y, c, e) {
		x = this.GetBlock(x, y);
		y = (Tile.Behaviors[x & 255] & Tile.BlockAll) > 0;
		y |= e > 0 && (Tile.Behaviors[x & 255] & Tile.BlockUpper) > 0;
		y |= e < 0 && (Tile.Behaviors[x & 255] & Tile.BlockLower) > 0;
		return y;
	}
	GetSpriteTemplate(a, b) {
		if (a < 0 || b < 0 || a >= this.Width || b >= this.Height) return;
		return this.SpriteTemplates[a][b];
	}
	SetSpriteTemplate(x, y, value) {
		x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.SpriteTemplates[x][y] = value);
	}
}
