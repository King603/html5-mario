export function DrawableManager() {
	this.Unsorted = !0;
	this.Objects = [];
}
DrawableManager.prototype = {
	Add: function (a) {
		this.Objects.push(a);
		this.Unsorted = !0;
	},
	AddRange: function (a) {
		this.Objects = this.Objects.concat(a);
		this.Unsorted = !0;
	},
	Clear: function () {
		this.Objects = [];
	},
	/**
	 *
	 * @param {Object} obj
	 * @returns
	 */
	Contains: function (obj) {
		for (let OBJ of this.Objects) {
			if (OBJ === obj) {
				return !0;
			}
		}
		return !1;
	},
	/**
	 *
	 * @param {Object} obj
	 * @returns
	 */
	Remove: function (obj) {
		this.Objects.splice(this.Objects.indexOf(obj), 1);
	},
	/**
	 *
	 * @param {number} i
	 */
	RemoveAt: function (i) {
		this.Objects.splice(i, 1);
	},
	/**
	 *
	 * @param {number} i
	 * @param {number} count
	 */
	RemoveRange: function (i, count) {
		this.Objects.splice(i, count);
	},
	/**
	 *
	 * @param {Object[]} objs
	 */
	RemoveList: function (objs) {
		for (let c = 0; c < objs.length;) {
			for (let b = 0; b < this.Objects.length; b++) {
				if (this.Objects[b] === objs[c]) {
					this.Objects.splice(b, 1);
					objs.splice(c--, 1);
					break;
				}
			}
		}
	},
	/**
	 *
	 * @param {number} value
	 */
	Update: function (value) {
		this.Objects.forEach(obj => obj.Update && obj.Update(value));
	},
	Draw: function (ctx, b) {
		if (this.Unsorted) {
			this.Unsorted = !1;
			this.Objects.sort((a, b) => a.ZOrder - b.ZOrder);
		}
		this.Objects.forEach(obj => obj.Draw && obj.Draw(ctx, b));
	},
};
