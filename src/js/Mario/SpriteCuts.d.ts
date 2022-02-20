import * as Enjine from "../Enjine/index.js";
export interface Sheet {
    X: number;
    Y: number;
    Width: number;
    Height: number;
}
export interface SC {
    /** 创建黑色字体 */
    CreateBlackFont(): Enjine.SpriteFont;
    /** 创建红色字体 */
    CreateRedFont(): Enjine.SpriteFont;
    /** 创造绿色字体 */
    CreateGreenFont(): Enjine.SpriteFont;
    /** 创建蓝色字体 */
    CreateBlueFont(): Enjine.SpriteFont;
    /** 创建黄色字体 */
    CreateYellowFont(): Enjine.SpriteFont;
    /** 创建粉红色字体 */
    CreatePinkFont(): Enjine.SpriteFont;
    /** 创建青色字体 */
    CreateCyanFont(): Enjine.SpriteFont;
    /** 创建白色字体 */
    CreateWhiteFont(): Enjine.SpriteFont;
    /** 获取字符数组 */
    GetCharArray(y: number): {
        X: number;
        Y: number;
    }[];
    /** 获取背景页 */
    GetBackgroundSheet(): Sheet[][];
    /** 获取关卡表 */
    GetLevelSheet(): Sheet[][];
}
/** 裁剪精灵图 */
export declare const SpriteCuts: SC;
