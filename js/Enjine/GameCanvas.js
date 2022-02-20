export class GameCanvas {
	/**
	 *
	 * @param {string} id
	 * @param {number} width
	 * @param {number} height
	 */
	Initialize(id, width, height) {
		/**@type {HTMLCanvasElement} */
		this.Canvas = document.getElementById(id);
		this.Context2D = this.Canvas.getContext("2d");
		this.BackBuffer = document.createElement("canvas");
		this.BackBuffer.width = width;
		this.BackBuffer.height = height;
		this.BackBufferContext2D = this.BackBuffer.getContext("2d");
	}
	BeginDraw() {
		this.BackBufferContext2D.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
		this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
	}
	EndDraw() {
		this.Context2D.drawImage(this.BackBuffer, 0, 0, this.BackBuffer.width, this.BackBuffer.height, 0, 0, this.Canvas.width, this.Canvas.height);
	}
}
