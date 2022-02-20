export class Collideable {
	X: number;
	Y: number;
	constructor(
		public Base: { X: number; Y: number },
		public Width: number,
		public Height: number,
		public CollisionEvent = (ctx: Collideable) => { }
	) {
		this.X = Base.X;
		this.Y = Base.Y;
	}
	Update() {
		this.X = this.Base.X;
		this.Y = this.Base.Y;
	}
	CheckCollision(ctx: Collideable) {
		if (!(this.Y + this.Height < ctx.Y) && !(this.Y > ctx.Y + ctx.Height) && !(this.X + this.Width < ctx.X) && !(this.X > ctx.X + ctx.Width)) {
			this.CollisionEvent(ctx);
			ctx.CollisionEvent(this);
		}
	}
}
