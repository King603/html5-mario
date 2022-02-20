interface KEY {
	Pressed: boolean[];
	Initialize(): void;
	IsKeyDown(index: number): boolean;
	KeyDownEvent(event: KeyboardEvent): void;
	KeyUpEvent(event: KeyboardEvent): void;
	PreventScrolling(event: KeyboardEvent): void;
}

export const KeyboardInput: KEY = {
	Pressed: [],
	Initialize() {
		document.onkeydown = event => this.KeyDownEvent(event);
		document.onkeyup = event => this.KeyUpEvent(event);
	},
	IsKeyDown(index) {
		if (this.Pressed[index] != null)
			return this.Pressed[index];
		return !1;
	},
	KeyDownEvent(event) {
		this.Pressed[event.keyCode] = !0;
		this.PreventScrolling(event);
	},
	KeyUpEvent(event) {
		this.Pressed[event.keyCode] = !1;
		this.PreventScrolling(event);
	},
	PreventScrolling(event) {
		if (event.keyCode >= 37 && event.keyCode <= 40)
			event.preventDefault();
	}
};