import { Application } from "./Application.js";
export declare class GameTimer {
    FramesPerSecond: number;
    LastTime: number;
    UpdateObject: Application;
    IntervalFunc?: number;
    constructor();
    Start(): void;
    Tick(): void;
    Stop(): void;
}
