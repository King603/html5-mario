import Mario from "../Mario/index.js"

export class GameStateContext {
	/**
	 *
	 * @param {Mario.LoadingState} state
	 */
	constructor(state) {
		if (state != null) {
			/**@type {Mario.LoadingState} */
			this.State = state;
			this.State.Enter();
		}
	}
	/**
	 *
	 * @param {Mario.LoadingState} state
	 */
	ChangeState(state) {
		this.State != null && this.State.Exit();
		this.State = state;
		this.State.Enter();
	}
	Update(a) {
		this.State.CheckForChange(this);
		this.State.Update(a);
	}
	Draw(a) {
		this.State.Draw(a);
	}
}
