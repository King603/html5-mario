import { Level } from "./Level.js";
import { LevelType } from "./LevelType.js";

export class BackgroundGenerator {
	constructor(public Width: number, public Height: number, public Distant: boolean, public Type: number) { }
	SetValues(Width: number, Height: number, Distant: boolean, Type: number) {
		this.Width = Width;
		this.Height = Height;
		this.Distant = Distant;
		this.Type = Type;
	}
	CreateLevel() {
		let level = new Level(this.Width, this.Height);
		let { Overground, Underground, Castle } = LevelType;
		switch (this.Type) {
			case Overground:
				this.GenerateOverground(level);
				break;
			case Underground:
				this.GenerateUnderground(level);
				break;
			case Castle:
				this.GenerateCastle(level);
				break;
		}
		return level;
	}
	GenerateOverground(level: Level) {
		let b = this.Distant ? 4 : 6, c = this.Distant ? 2 : 1, e = Math.floor(Math.random() * b) + c, d = Math.floor(Math.random() * b) + c;
		for (let x = 0; x < this.Width; x++) {
			for (e = d; e === d; d = Math.floor(Math.random() * b) + c)
				;
			for (let y = 0; y < this.Height; y++) {
				let h = Math.min(e, d);
				let i = Math.max(e, d);
				if (y < h) {
					if (this.Distant) {
						i = Math.min(2, y);
						level.SetBlock(x, y, 4 + i * 8);
					} else
						level.SetBlock(x, y, 5);
				} else
					switch (y) {
						case h:
							i = h === d ? 0 : 1;
							i += this.Distant ? 2 : 0;
							level.SetBlock(x, y, i);
							break;
						case i:
							i = h === d ? 0 : 1;
							i += this.Distant ? 2 : 0;
							level.SetBlock(x, y, i + 16);
							break;
						default:
							i = y > i ? 1 : 0;
							if (h === e)
								i = 1 - i;
							i += this.Distant ? 2 : 0;
							level.SetBlock(x, y, i + 8);
					}
			}
		}
	}
	GenerateUnderground(level: Level) {
		if (this.Distant) {
			let f = 0;
			for (let x = 0; x < this.Width; x++) {
				if (Math.random() < .75)
					f = 1 - f;
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
		}
		else
			for (let x = 0; x < this.Width; x++)
				for (let y = 0; y < this.Height; y++) {
					let e = x % 2;
					let d = y - 1;
					if (d < 0 || d > 7) {
						d = 7;
						e = 0;
					}
					if (e === 0 && d > 1 && d < 5) {
						e = -1;
						d = 0;
					}
					level.SetBlock(x, y, 6 + e + d * 8);
				}
	}
	GenerateCastle(level: Level) {
		for (let x = 0; x < this.Width; x++)
			for (let y = 0; y < this.Height; y++)
				if (this.Distant) {
					let e = x % 2;
					let d = y - 1;
					if (d > 2 && d < 5)
						d = 2;
					else if (d >= 5)
						d -= 2;
					if (d < 0) {
						e = 0;
						d = 5;
					} else if (d > 4) {
						e = 1;
						d = 5;
					} else if (e < 1) {
						e = 0;
						if (d === 3)
							d = 3;
						else if (d > 0 && d < 3)
							d = 2;
					}
					level.SetBlock(x, y, 1 + e + (d + 4) * 8);
				} else {
					let e = x % 3;
					let d = y - 1;
					if (d > 2)
						if (d < 5)
							d = 2;
						else
							d -= 2;
					if (d < 0) {
						e = 1;
						d = 5;
					} else if (d > 4) {
						e = 2;
						d = 5;
					} else if (e < 2) {
						if (d === 4) {
							e = 2;
							d = 4;
						} else if (d > 0 && d < 4) {
							e = 4;
							d = -3;
						}
					}
					level.SetBlock(x, y, 1 + e + (d + 3) * 8);
				}
	}
}
