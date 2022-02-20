import { LevelState } from "../Mario/LevelState.js";
import { LoadingState } from "../Mario/LoadingState.js";
import { LoseState } from "../Mario/LoseState.js";
import { MapState } from "../Mario/MapState.js";
import { TitleState } from "../Mario/TitleState.js";
import { WinState } from "../Mario/WinState.js";

type State = LoadingState | TitleState | MapState | WinState | LevelState | LoseState;

export class GameStateContext {
	State!: State;
	constructor(state: State) {
		if (state != null) {
			/**@type {Mario.LoadingState} */
			this.State = state;
			this.State.Enter();
		}
	}
	ChangeState(state: State) {
		this.State != null && this.State.Exit();
		this.State = state;
		this.State.Enter();
	}
	Update(a: number) {
		this.State.CheckForChange(this);
		this.State.Update(a);
	}
	Draw(a: CanvasRenderingContext2D) {
		this.State.Draw(a);
	}
}
