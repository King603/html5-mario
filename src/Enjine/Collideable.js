export function Collideable(base, w, h, d) {
	this.Base = base;
	this.X = base.X;
	this.Y = base.Y;
	this.Width = w;
	this.Height = h;
	this.CollisionEvent = d != undefined ? d : function () { };
}
Collideable.prototype = {
	Update: function () {
		this.X = this.Base.X;
		this.Y = this.Base.Y;
	},
	CheckCollision: function (a) {
		if (!(this.Y + this.Height < a.Y) && !(this.Y > a.Y + a.Height) && !(this.X + this.Width < a.X) && !(this.X > a.X + a.Width)) {
			this.CollisionEvent(a);
			a.CollisionEvent(this);
		}
	},
};
