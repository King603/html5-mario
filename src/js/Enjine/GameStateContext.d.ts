import { LevelState } from "../Mario/LevelState.js";
import { LoadingState } from "../Mario/LoadingState.js";
import { LoseState } from "../Mario/LoseState.js";
import { MapState } from "../Mario/MapState.js";
import { TitleState } from "../Mario/TitleState.js";
import { WinState } from "../Mario/WinState.js";
declare type State = LoadingState | TitleState | MapState | WinState | LevelState | LoseState;
export declare class GameStateContext {
    State: State;
    constructor(state: State);
    ChangeState(state: State): void;
    Update(a: number): void;
    Draw(a: CanvasRenderingContext2D): void;
}
export {};
