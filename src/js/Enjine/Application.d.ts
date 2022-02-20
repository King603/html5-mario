import { LoadingState } from "../Mario/LoadingState.js";
import { GameCanvas } from "./GameCanvas.js";
import { GameStateContext } from "./GameStateContext.js";
import { GameTimer } from "./GameTimer.js";
export declare class Application {
    stateContext: GameStateContext;
    canvas: GameCanvas;
    timer: GameTimer;
    constructor(ctx: LoadingState, width: number, height: number);
    Update(element: number): void;
}
