import { NotchSprite } from "./NotchSprite.js";
import { Shell } from "./Shell.js";
import { Enemy } from "./Enemy.js";
import { BulletBill } from "./BulletBill.js";
import { LevelState } from "./LevelState.js";
export declare class Character extends NotchSprite {
    Fire: boolean;
    Large: boolean;
    Coins: number;
    Lives: number;
    LevelString: string;
    AirInertia: number;
    GroundInertia: number;
    RunTime: number;
    Sliding: boolean;
    Ducking: boolean;
    MayJump: boolean;
    OnGround: boolean;
    WasOnGround: boolean;
    YJumpSpeed: number;
    XJumpSpeed: number;
    JumpTime: number;
    CanShoot: boolean;
    Width: number;
    Height: number;
    World: LevelState;
    InvulnerableTime: number;
    WinTime: number;
    DeathTime: number;
    YDeathPos: number;
    XDeathPos: number;
    PowerUpTime: number;
    Facing: number;
    Carried: Shell;
    NewFire: boolean;
    NewLarge: boolean;
    LastFire: boolean;
    LastLarge: boolean;
    InvulerableTime: number;
    constructor(img: HTMLImageElement);
    Initialize(world: LevelState): void;
    SetLarge(Large: boolean, Fire: boolean): void;
    Blink(a: boolean): void;
    Move(): void;
    CalcPic(): void;
    SubMove(a: number, b: number): boolean;
    IsBlocking(a: number, b: number, c: any, e: number): number | false;
    Stomp(a: Shell | Enemy | BulletBill): void;
    GetHurt(): void;
    Win(): void;
    Die(): void;
    GetFlower(): void;
    GetMushroom(): void;
    Kick(a: Shell): void;
    Get1Up(): void;
    GetCoin(): void;
}