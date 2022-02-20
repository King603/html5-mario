import * as Enjine from "../Enjine/index.js";
import { SpriteCuts } from "./SpriteCuts.js";
import { Tile } from "./Tile.js";
const MAP = Enjine.Resources.Images?.map;
export class LevelRenderer extends Enjine.Drawable {
    Level;
    Width;
    Height;
    AnimTime = 0;
    Bounce = 0;
    Tick = 0;
    Delta = 0;
    Background = SpriteCuts.GetLevelSheet();
    TilesY;
    constructor(Level, Width, Height) {
        super();
        this.Level = Level;
        this.Width = Width;
        this.Height = Height;
        this.TilesY = (Height / 16 | 0) + 1;
    }
    Update(time) {
        this.AnimTime += time;
        this.Tick = this.AnimTime | 0;
        this.Bounce += time * 30;
        this.Delta = time;
    }
    Draw(a, b) {
        this.DrawStatic(a, b);
        this.DrawDynamic(a, b);
    }
    DrawStatic(ctx, size) {
        for (let x = size.X / 16 | 0; x < ((size.X + this.Width) / 16 | 0) + 1; x++)
            for (let y = 0; y < this.TilesY; y++) {
                let block = this.Level.GetBlock(x, y) & 255;
                if ((Tile.Behaviors[block] & Tile.Animated) === 0) {
                    let sheet = this.Background[block % 16][block / 16 | 0];
                    ctx.drawImage(MAP, sheet.X, sheet.Y, sheet.Width, sheet.Height, (x << 4) - size.X | 0, y << 4 | 0, sheet.Width, sheet.Height);
                }
            }
    }
    DrawDynamic(ctx, size) {
        for (let x = size.X / 16 | 0; x <= ((size.X + this.Width) / 16 | 0); x++)
            for (let y = size.Y / 16 | 0; y <= ((size.Y + this.Height) / 16 | 0); y++) {
                let block = this.Level.GetBlock(x, y);
                if ((Tile.Behaviors[block & 255] & Tile.Animated) > 0) {
                    let bounce = (this.Bounce / 3 | 0) % 4;
                    if ((block % 16 / 4 | 0) === 0 && (block / 16 | 0) === 1) {
                        bounce = (this.Bounce / 2 + (x + y) / 8 | 0) % 20;
                        if (bounce > 3)
                            bounce = 0;
                    }
                    if ((block % 16 / 4 | 0) === 3 && (block / 16 | 0) === 0)
                        bounce = 2;
                    let g = 0;
                    if (x >= 0 && y >= 0 && x < this.Level.Width && y < this.Level.Height)
                        g = this.Level.Data[x][y];
                    if (g > 0)
                        g = Math.sin((g - this.Delta) / 4 * Math.PI) * 8 | 0;
                    let sheet = this.Background[(block % 16 / 4 | 0) * 4 + bounce][block / 16 | 0];
                    ctx.drawImage(MAP, sheet.X, sheet.Y, sheet.Width, sheet.Height, (x << 4) - size.X, (y << 4) - size.Y - g, sheet.Width, sheet.Height);
                }
            }
    }
    DrawExit0(ctx, size, bool) {
        for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
            let bgc = this.Background[12][y === this.Level.ExitY - 8 ? 4 : 5];
            ctx.drawImage(MAP, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - size.X - 16, (y << 4) - size.Y, bgc.Width, bgc.Height);
        }
        if (bool) {
            let y = this.Level.ExitY * 16 - 48 - Math.sin(this.AnimTime) * 48 - 8;
            let bgc = this.Background[12][3];
            ctx.drawImage(MAP, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - size.X - 16, y - size.Y, bgc.Width, bgc.Height);
            bgc = this.Background[13][3];
            ctx.drawImage(MAP, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - size.X, y - size.Y, bgc.Width, bgc.Height);
        }
    }
    DrawExit1(ctx, size) {
        for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
            let bgc = this.Background[13][y === this.Level.ExitY - 8 ? 4 : 5];
            ctx.drawImage(MAP, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - size.X + 16, (y << 4) - size.Y, bgc.Width, bgc.Height);
        }
    }
    ;
}
//# sourceMappingURL=LevelRenderer.js.map