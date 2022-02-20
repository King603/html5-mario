import { BackgroundRenderer } from "../Mario/BackgroundRenderer.js";
import { BulletBill } from "../Mario/BulletBill.js";
import { Character } from "../Mario/Character.js";
import { CoinAnim } from "../Mario/CoinAnim.js";
import { Enemy } from "../Mario/Enemy.js";
import { Fireball } from "../Mario/Fireball.js";
import { Mushroom } from "../Mario/Mushroom.js";
import { Shell } from "../Mario/Shell.js";
import { Sparkle } from "../Mario/Sparkle.js";
import { AnimatedSprite } from "./AnimatedSprite.js";
import { Camera } from "./Camera.js";
import { SpriteFont } from "./SpriteFont.js";
export declare type ELE = Fireball | Character | Enemy | Sparkle | CoinAnim | Mushroom | BulletBill | Shell;
export declare class DrawableManager {
    Unsorted: boolean;
    Objects: (ELE | any)[];
    Add(element: ELE | SpriteFont | BackgroundRenderer | AnimatedSprite): void;
    AddRange(element: ELE[]): void;
    Clear(): void;
    Contains(element: ELE): boolean;
    Remove(element: ELE): void;
    RemoveAt(start: number): void;
    RemoveRange(start: number, deleteCount: number): void;
    RemoveList(arr: ELE[]): void;
    Update(element: number): void;
    Draw(a: CanvasRenderingContext2D, b: Camera): void;
}
