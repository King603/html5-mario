export default {
	/**@type {boolean[]} */
	Pressed: [],
	Initialize() {
		document.onkeydown = (e) => this.KeyDownEvent(e);
		document.onkeyup = (e) => this.KeyUpEvent(e);
	},
	/**
	 *
	 * @param {number} i
	 * @returns
	 */
	IsKeyDown(i) {
		return this.Pressed[i] || !1;
	},
	/**
	 *
	 * @param {KeyboardEvent} e
	 */
	KeyDownEvent(e) {
		this.Pressed[e.keyCode] = !0;
		this.PreventScrolling(e);
	},
	/**
	 *
	 * @param {KeyboardEvent} e
	 */
	KeyUpEvent(e) {
		this.Pressed[e.keyCode] = !1;
		this.PreventScrolling(e);
	},
	/**
	 *
	 * @param {KeyboardEvent} e
	 */
	PreventScrolling(e) {
		e.keyCode >= 37 && e.keyCode <= 40 && e.preventDefault();
	},
};
