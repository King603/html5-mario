export class GameStateContext {
    State;
    constructor(state) {
        if (state != null) {
            /**@type {Mario.LoadingState} */
            this.State = state;
            this.State.Enter();
        }
    }
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
//# sourceMappingURL=GameStateContext.js.map