import Level from "./Level.js";
import LevelType from "./LevelType.js";

export default class {
	constructor(a, b, c, e) {
		this.Width = a;
		this.Height = b;
		this.Distant = c;
		this.Type = e;
	} 
	SetValues(a, b, c, e) {
		this.Width = a;
		this.Height = b;
		this.Distant = c;
		this.Type = e;
	}
	CreateLevel() {
		let level = new Level(this.Width, this.Height);
		switch (this.Type) {
			case LevelType.Overground:
				this.GenerateOverground(level);
				break;
			case LevelType.Underground:
				this.GenerateUnderground(level);
				break;
			case LevelType.Castle:
				this.GenerateCastle(level);
				break;
		}
		return level;
	}
	GenerateOverground(level) {
		let b = this.Distant ? 4 : 6, c = this.Distant ? 2 : 1, e = Math.floor(Math.random() * b) + c, d = Math.floor(Math.random() * b) + c;
		for (let f = 0; f < this.Width; f++) {
			for (let e = d; e === d;) {
				d = Math.floor(Math.random() * b) + c;
			}
			for (let g = 0; g < this.Height; g++) {
				let h = e < d ? e : d;
				let i = e < d ? d : e;
				if (g < h) {
					if (this.Distant) {
						i = 2;
						g < 2 && (i = g);
						level.SetBlock(f, g, 4 + i * 8);
					} else {
						level.SetBlock(f, g, 5);
					}
				} else {
					switch (g) {
						case h: i = h === d ? 0 : 1;
							i += this.Distant ? 2 : 0;
							level.SetBlock(f, g, i);
							break;
						case i: i = h === d ? 0 : 1;
							i += this.Distant ? 2 : 0;
							level.SetBlock(f, g, i + 16);
							break;
						default: i = g > i ? 1 : 0;
							h === e && (i = 1 - i);
							i += this.Distant ? 2 : 0;
							level.SetBlock(f, g, i + 8);
							break;
					}
				}
			}
		}
	}
	GenerateUnderground(level) {
		if (this.Distant) {
			for (let f = 0, x = 0; x < this.Width; x++) {
				Math.random() < 0.75 && (f = 1 - f);
				for (let y = 0; y < this.Height; y++) {
					let e = f;
					let d = y - 2;
					if (d < 0 || d > 4) {
						d = 2;
						e = 0;
					}
					level.SetBlock(x, y, 4 + e + (3 + d) * 8);
				}
			}
		} else {
			for (let x = 0; x < this.Width; x++) {
				for (let y = 0; y < this.Height; y++) {
					let e = x % 2;
					let d = y - 1;
					if (d < 0 || d > 7) {
						d = 7;
						e = 0;
					} if (e === 0 && d > 1 && d < 5) {
						e = -1;
						d = 0;
					}
					level.SetBlock(x, y, 6 + e + d * 8);
				}
			}
		}
	}
	GenerateCastle(level) {
		if (this.Distant) {
			for (let b = 0; b < this.Width; b++) {
				for (let c = 0; c < this.Height; c++) {
					let e = b % 2;
					let d = c - 1;
					if (d > 2 && d < 5) {
						d = 2;
					} else if (d >= 5) {
						d -= 2;
					} if (d < 0) {
						e = 0;
						d = 5;
					} else if (d > 4) {
						e = 1;
						d = 5;
					} else if (e < 1 && d === 3) {
						e = 0;
						d = 3;
					} else if (e < 1 && d > 0 && d < 3) {
						e = 0;
						d = 2;
					}
					level.SetBlock(b, c, 1 + e + (d + 4) * 8);
				}
			}
		} else {
			for (let b = 0; b < this.Width; b++) {
				for (let c = 0; c < this.Height; c++) {
					let e = b % 3;
					let d = c - 1;
					if (d > 2 && d < 5) {
						d = 2;
					} else if (d >= 5) {
						d -= 2;
					} if (d < 0) {
						e = 1;
						d = 5;
					} else if (d > 4) {
						e = 2;
						d = 5;
					} else if (e < 2 && d === 4) {
						e = 2;
						d = 4;
					} else if (e < 2 && d > 0 && d < 4) {
						e = 4;
						d = -3;
					}
					level.SetBlock(b, c, 1 + e + (d + 3) * 8);
				}
			}
		}
	}
}
