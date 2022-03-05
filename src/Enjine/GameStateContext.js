export function GameStateContext(a) {
	this.State = undefined;
	if (a != undefined) {
		this.State = a;
		this.State.Enter();
	}
}
GameStateContext.prototype = {
	ChangeState: function (a) {
		this.State != undefined && this.State.Exit();
		this.State = a;
		this.State.Enter();
	},
	Update: function (a) {
		this.State.CheckForChange(this);
		this.State.Update(a);
	},
	Draw: function (a) {
		this.State.Draw(a);
	},
};
