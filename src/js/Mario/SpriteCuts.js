import * as Enjine from "../Enjine/index.js";
const font = Enjine.Resources.Images?.font;
/** 裁剪精灵图 */
export const SpriteCuts = {
    CreateBlackFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(0));
    },
    CreateRedFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(8));
    },
    CreateGreenFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(16));
    },
    CreateBlueFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(24));
    },
    CreateYellowFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(32));
    },
    CreatePinkFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(40));
    },
    CreateCyanFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(48));
    },
    CreateWhiteFont() {
        return new Enjine.SpriteFont([], font, 8, 8, this.GetCharArray(56));
    },
    GetCharArray(y) {
        let b = [];
        for (let c = 32; c < 127; c++)
            b[c] = { X: (c - 32) * 8, Y: y };
        return b;
    },
    GetBackgroundSheet() {
        let { width, height } = Enjine.Resources.Images?.background;
        /**@type {{X: number; Y: number; Width: number; Height: number;}[][]} */
        let arr = [];
        for (let x = 0; x < width / 32; x++) {
            arr[x] = [];
            for (let y = 0; y < height / 32; y++) {
                arr[x][y] = { X: x * 32, Y: y * 32, Width: 32, Height: 32 };
            }
        }
        return arr;
    },
    GetLevelSheet() {
        let { width, height } = Enjine.Resources.Images?.map;
        let a = [];
        for (let x = 0; x < width / 16; x++) {
            a[x] = [];
            for (let y = 0; y < height / 16; y++)
                a[x][y] = { X: x * 16, Y: y * 16, Width: 16, Height: 16 };
        }
        return a;
    }
};
//# sourceMappingURL=SpriteCuts.js.map