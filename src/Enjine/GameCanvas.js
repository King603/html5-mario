export function GameCanvas() {
	/**@type {CanvasRenderingContext2D} */
	this.BackBufferContext2D = undefined;
	/**@type {HTMLCanvasElement} */
	this.BackBuffer = undefined;
	/**@type {CanvasRenderingContext2D} */
	this.Context2D = undefined;
	/**@type {HTMLCanvasElement} */
	this.Canvas = undefined;
}
GameCanvas.prototype = {
	/**
	 *
	 * @param {string} id
	 * @param {number} width
	 * @param {number} height
	 */
	Initialize: function (id, width, height) {
		this.Canvas = document.getElementById(id);
		this.Context2D = this.Canvas.getContext("2d");
		this.BackBuffer = document.createElement("canvas");
		this.BackBuffer.width = width;
		this.BackBuffer.height = height;
		this.BackBufferContext2D = this.BackBuffer.getContext("2d");
	},
	BeginDraw: function () {
		let { width: bW, height: bH } = this.BackBuffer;
		this.BackBufferContext2D.clearRect(0, 0, bW, bH);
		let { width: cW, height: cH } = this.Canvas;
		this.Context2D.clearRect(0, 0, cW, cH);
	},
	EndDraw: function () {
		let { width: bW, height: bH } = this.BackBuffer;
		let { width: cW, height: cH } = this.Canvas;
		this.Context2D.drawImage(this.BackBuffer, 0, 0, bW, bH, 0, 0, cW, cH);
	},
};
