export const KeyboardInput = {
	/**@type {boolean[]} */
	Pressed: [],
	Initialize: function () {
		document.onkeydown = (e) => this.KeyDownEvent(e);
		document.onkeyup = (e) => this.KeyUpEvent(e);
	},
	/**
	 *
	 * @param {number} i
	 * @returns
	 */
	IsKeyDown: function (i) {
		return this.Pressed[i] || !1;
	},
	/**
	 *
	 * @param {KeyboardEvent} e
	 */
	KeyDownEvent: function (e) {
		this.Pressed[e.keyCode] = !0;
		this.PreventScrolling(e);
	},
	/**
	 *
	 * @param {KeyboardEvent} e
	 */
	KeyUpEvent: function (e) {
		this.Pressed[e.keyCode] = !1;
		this.PreventScrolling(e);
	},
	/**
	 *
	 * @param {KeyboardEvent} e
	 */
	PreventScrolling: function (e) {
		e.keyCode >= 37 && e.keyCode <= 40 && e.preventDefault();
	},
};
