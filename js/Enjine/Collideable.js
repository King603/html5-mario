export class Collideable {
	/**
	 *
	 * @param {{X: number; Y: number}} base
	 * @param {number} width
	 * @param {number} height
	 * @param {(ctx: CanvasRenderingContext2D) => void} key
	 */
	constructor(base, width, height, key = () => { }) {
		this.Base = base;
		this.X = base.X;
		this.Y = base.Y;
		this.Width = width;
		this.Height = height;
		this.CollisionEvent = key;
	}
	Update() {
		this.X = this.Base.X;
		this.Y = this.Base.Y;
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	CheckCollision(ctx) {
		if (!(this.Y + this.Height < ctx.Y) && !(this.Y > ctx.Y + ctx.Height) && !(this.X + this.Width < ctx.X) && !(this.X > ctx.X + ctx.Width)) {
			this.CollisionEvent(ctx);
			ctx.CollisionEvent(this);
		}
	}
}
