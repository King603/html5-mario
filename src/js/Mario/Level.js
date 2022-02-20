import { Tile } from "./Tile.js";
export class Level {
    Width;
    Height;
    ExitY = 10;
    ExitX = 10;
    Map;
    Data;
    SpriteTemplates;
    constructor(Width, Height) {
        this.Width = Width;
        this.Height = Height;
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
                this.SpriteTemplates[x][y] = null;
            }
        }
    }
    Update() {
        for (let x = 0; x < this.Width; x++)
            for (let y = 0; y < this.Height; y++)
                if (this.Data[x][y] > 0)
                    this.Data[x][y]--;
    }
    GetBlockCapped(x, y) {
        x = Math.max(x, 0);
        y = Math.max(y, 0);
        x >= this.Width && (x = this.Width - 1);
        y >= this.Height && (y = this.Height - 1);
        return this.Map[x][y];
    }
    GetBlock(x, y) {
        x < 0 && (x = 0);
        x = Math.max(x, 0);
        if (y < 0)
            return 0;
        x >= this.Width && (x = this.Width - 1);
        y >= this.Height && (y = this.Height - 1);
        return this.Map[x][y];
    }
    SetBlock(x, y, ele) {
        x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Map[x][y] = ele);
    }
    SetBlockData(x, y, ele) {
        x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Data[x][y] = ele);
    }
    IsBlocking(x, y, ele) {
        x = this.GetBlock(x, y);
        y = +((Tile.Behaviors[x & 255] & Tile.BlockAll) > 0);
        y |= +(ele > 0 && (Tile.Behaviors[x & 255] & Tile.BlockUpper) > 0);
        y |= +(ele < 0 && (Tile.Behaviors[x & 255] & Tile.BlockLower) > 0);
        return y;
    }
    GetSpriteTemplate(x, y) {
        return x < 0 || y < 0 || x >= this.Width || y >= this.Height ? null : this.SpriteTemplates[x][y];
    }
    SetSpriteTemplate(x, y, ele) {
        x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.SpriteTemplates[x][y] = ele);
    }
}
//# sourceMappingURL=Level.js.map