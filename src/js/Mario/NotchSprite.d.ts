import * as Enjine from "../Enjine/index.js";
import { SpriteTemplate } from "./SpriteTemplate.js";
export declare class NotchSprite extends Enjine.Drawable {
    Image: HTMLImageElement;
    YPicO: number;
    XPicO: number;
    YPic: number;
    XPic: number;
    Ya: number;
    Xa: number;
    Y: number;
    X: number;
    YOld: number;
    XOld: number;
    PicHeight: number;
    PicWidth: number;
    YFlip: boolean;
    XFlip: boolean;
    Visible: boolean;
    Delta: number;
    SpriteTemplate: SpriteTemplate;
    Layer: number;
    constructor(Image: HTMLImageElement);
    Draw(ctx: CanvasRenderingContext2D): void;
    Update(delta: number): void;
    UpdateNoMove(): void;
    Move(): void;
    GetX(x: number): number;
    GetY(y: number): number;
    CollideCheck(): void;
    Release(): void;
}
