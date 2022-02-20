export const KeyboardInput = {
	/**@type {boolean[]} */
	Pressed: [],
	Initialize() {
		document.onkeydown = event => this.KeyDownEvent(event);
		document.onkeyup = event => this.KeyUpEvent(event);
	},
	/**
	 *
	 * @param {number} index
	 * @returns
	 */
	IsKeyDown(index) {
		if (this.Pressed[index] != null)
			return this.Pressed[index];
		return !1;
	},
	/**
	 *
	 * @param {KeyboardEvent} event
	 */
	KeyDownEvent(event) {
		this.Pressed[event.keyCode] = !0;
		this.PreventScrolling(event);
	},
	/**
	 *
	 * @param {KeyboardEvent} event
	 */
	KeyUpEvent(event) {
		this.Pressed[event.keyCode] = !1;
		this.PreventScrolling(event);
	},
	/**
	 *
	 * @param {KeyboardEvent} event
	 */
	PreventScrolling(event) {
		if (event.keyCode >= 37 && event.keyCode <= 40)
			event.preventDefault();
	}
};
