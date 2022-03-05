export class GameStateContext {
	constructor(a) {
		this.State = undefined;
		if (a != undefined) {
			this.State = a;
			this.State.Enter();
		}
	}
	ChangeState(a) {
		this.State != undefined && this.State.Exit();
		this.State = a;
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
