export class Collideable {
    Base;
    Width;
    Height;
    CollisionEvent;
    X;
    Y;
    constructor(Base, Width, Height, CollisionEvent = (ctx) => { }) {
        this.Base = Base;
        this.Width = Width;
        this.Height = Height;
        this.CollisionEvent = CollisionEvent;
        this.X = Base.X;
        this.Y = Base.Y;
    }
    Update() {
        this.X = this.Base.X;
        this.Y = this.Base.Y;
    }
    CheckCollision(ctx) {
        if (!(this.Y + this.Height < ctx.Y) && !(this.Y > ctx.Y + ctx.Height) && !(this.X + this.Width < ctx.X) && !(this.X > ctx.X + ctx.Width)) {
            this.CollisionEvent(ctx);
            ctx.CollisionEvent(this);
        }
    }
}
//# sourceMappingURL=Collideable.js.map