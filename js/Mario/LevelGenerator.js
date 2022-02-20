import { Enemy } from "./Enemy.js";
import { Level } from "./Level.js";
import { LevelType } from "./LevelType.js";
import { Odds } from "./Odds.js";
import { SpriteTemplate } from "./SpriteTemplate.js";

export class LevelGenerator {
	constructor(width, height) {
		this.Width = width;
		this.Height = height;
		this.Odds = [];
		this.Type = this.Difficulty = this.TotalOdds = 0;
	}
	CreateLevel(a, b) {
		this.Type = a;
		this.Difficulty = b;
		this.Odds[Odds.Straight] = 20;
		this.Odds[Odds.HillStraight] = 10;
		this.Odds[Odds.Tubes] = 2 + b;
		this.Odds[Odds.Jump] = 2 * b;
		this.Odds[Odds.Cannon] = -10 + 5 * b;
		this.Type !== LevelType.Overground && (this.Odds[Odds.HillStraight] = 0);
		for (let odd of this.Odds) {
			odd = Math.max(odd, 0);
			this.TotalOdds += odd;
			odd = this.TotalOdds - odd;
		}
		let level = new Level(this.Width, this.Height);
		let e = this.BuildStraight(level, 0, level.Width, !0);
		while (e < level.Width - 64)
			e += this.BuildZone(level, e, level.Width - e);
		let c = this.Height - 1 - Math.random() * 4 | 0;
		level.ExitX = e + 8;
		level.ExitY = c;
		for (let x = e; x < level.Width; x++)
			for (let y = 0; y < this.Height; y++)
				if (y >= c)
					level.SetBlock(x, y, 145);
		if (a === LevelType.Castle || a === LevelType.Underground) {
			let g = 0, h = 0;
			for (let d = 0; d < level.Width; d++) {
				if (h-- <= 0 && d > 4) {
					g = Math.random() * 4 | 0;
					h = (Math.random() * 4 | 0) + 4;
				}
				for (let h = 0; h < level.Height; h++)
					if (d > 4 && h <= g || d < 1)
						level.SetBlock(d, h, 145);
			}
		}
		this.FixWalls(level);
		return level;
	}
	BuildZone(a, b, c) {
		let e = Math.random() * this.TotalOdds | 0, d = 0;
		this.Odds.forEach((odd, index) => odd <= e && (d = index));
		let { Straight, HillStraight, Tubes, Jump, Cannons } = Odds;
		switch (d) {
			case Straight: return this.BuildStraight(a, b, c, !1);
			case HillStraight: return this.BuildHillStraight(a, b, c);
			case Tubes: return this.BuildTubes(a, b, c);
			case Jump: return this.BuildJump(a, b, c);
			case Cannons: return this.BuildCannons(a, b, c);
		}return 0;
	}
	BuildJump(a, b) {
		let c = (Math.random() * 4 | 0) + 2, e = c * 2 + ((Math.random() * 2 | 0) + 2), h = this.Height - 1 - (Math.random() * 4 | 0);
		for (let d = b; d < b + e; d++)
			if (d < b + c || d > b + e - c - 1)
				for (let f = 0; f < this.Height; f++)
					if (f >= h)
						a.SetBlock(d, f, 145);
					else if ((Math.random() * 3 | 0) === 0 && f >= h - (d < b + c ? d - b : b + e - d) + 1)
						a.SetBlock(d, f, 9);
		return e;
	}
	BuildCannons(a, b, c) {
		alert("cannons");
		let e = (Math.random() * 10 | 0) + 2, d = this.Height - 1 - Math.random() * 4 | 0, f = b + 1 + Math.random() * 4 | 0;
		e = Math.min(e, c);
		for (let g = b; g < b + e; g++) {
			g > f && (f += 2 * Math.random() * 4 | 0);
			f === b + e - 1 && (f += 10);
			let i = d - (Math.random() * 4 | 0) - 1;
			for (let h = 0; h < this.Height; h++)
				if (h >= d)
					a.SetBlock(g, h, 145);
				else if (g === f && h >= i)
					a.SetBlock(g, h, h === i ? 14 : h === i + 1 ? 30 : 46);
		}
		return e;
	}
	BuildHillStraight(a, b, c) {
		let e = (Math.random() * 10 | 0) + 10, d = this.Height - 1 - Math.random() * 4 | 0, h = d, i = !0, l = [];
		e = Math.min(e, c);
		for (let x = b; x < b + e; x++)
			for (let y = 0; y < this.Height; y++)
				y >= d && a.SetBlock(x, y, 145);
		for (this.AddEnemyLine(a, b + 1, b + e - 1, d - 1); i;) {
			h = h - 2 - Math.random() * 3 | 0;
			if (h <= 0)
				i = !1;
			else {
				let j = (Math.random() * 5 | 0) + 3;
				let k = (Math.random() * (e - j - 2) | 0) + b + 1;
				if (l[k - b] || l[k - b + j] || l[k - b - 1] || l[k - b + j + 1])
					i = !1;
				else {
					l[k - b] = !0;
					l[k - b + j] = !0;
					this.AddEnemyLine(a, k, k + j, h - 1);
					if ((Math.random() * 4 | 0) === 0) {
						this.Decorate(a, k - 1, k + j + 1, h);
						i = !1;
					}
					for (let x = k; x < k + j; x++)
						for (let y = h; y < d; y++) {
							let m = 5;
							let n = 9;
							if (x === k)
								m = 4;
							else if (x === k + j - 1)
								m = 6;
							if (y === h)
								n = 8;
							switch (a.GetBlock(x, y)) {
								case 0: a.SetBlock(x, y, m + n * 16); break;
								case 132: a.SetBlock(x, y, 180); break;
								case 134: a.SetBlock(x, y, 182); break;
							}
						}
				}
			}
		}
		return e;
	}
	AddEnemyLine(a, b, c, e) {
		for (let d = b; d < c; d++)
			if ((Math.random() * 35 | 0) < this.Difficulty + 1) {
				let f = Math.random() * 4 | 0;
				if (this.Difficulty < 1)
					f = Enemy.Goomba;
				else if (this.Difficulty < 3)
					f = Math.random() * 3 | 0;
				a.SetSpriteTemplate(d, e, new SpriteTemplate(f, (Math.random() * 35 | 0) < this.Difficulty));
			}
	}
	BuildTubes(a, b, c) {
		let e = (Math.random() * 10 | 0) + 5, d = this.Height - 1 - Math.random() * 4 | 0, f = b + 1 + Math.random() * 4 | 0, g = d - (Math.random() * 2 | 0) - 2;
		e = Math.min(e, c);
		for (let h = b; h < b + e; h++) {
			if (h > f + 1) {
				f += 3 + (Math.random() * 4 | 0);
				g = d - (Math.random() * 2 | 0) - 2;
			}
			if (f >= b + e - 2)
				f += 10;
			if (h === f && (Math.random() * 11 | 0) < this.Difficulty + 1)
				a.SetSpriteTemplate(h, g, new SpriteTemplate(Enemy.Flower, !1));
			for (let i = 0; i < this.Height; i++)
				if (i >= d)
					a.SetBlock(h, i, 145);
				else if ((h === f || h === f + 1) && i >= g) {
					let j = 10 + h - f;
					a.SetBlock(h, i, j + (i === g ? 0 : 16));
				}
		}
		return e;
	}
	BuildStraight(a, b, c, e) {
		let d = (Math.random() * 10 | 0) + 2, f = this.Height - 1 - (Math.random() * 4 | 0);
		if (e)
			d = 10 + (Math.random() * 5 | 0);
		d = Math.min(d, c);
		for (let g = b; g < b + d; g++)
			for (let h = 0; h < this.Height; h++)
				if (h >= f)
					a.SetBlock(g, h, 145);
		if (e || d > 5)
			this.Decorate(a, b, b + d, f);
		return d;
	}
	Decorate(a, b, c, e) {
		if (!(e < 1)) {
			let d = Math.random() * 4 | 0, f = Math.random() * 4 | 0;
			this.AddEnemyLine(a, b + 1, c - 1, e - 1);
			if (e - 2 > 0 && c - 1 - f - (b + 1 + d) > 1)
				for (let g = b + 1 + d; g < c - 1 - f; g++)
					a.SetBlock(g, e - 2, 34);
			d = Math.random() * 4 | 0;
			f = Math.random() * 4 | 0;
			if (e - 4 > 0 && c - 1 - f - (b + 1 + d) > 2)
				for (let g = b + 1 + d; g < c - 1 - f; g++)
					a.SetBlock(g, e - 4, g !== b + 1 && g !== c - 2 && (Math.random() * 3 | 0) === 0
						? (Math.random() * 4 | 0) === 0
							? 22
							: 21
						: (Math.random() * 4 | 0) === 0
							? (Math.random() * 4 | 0) === 0
								? 18
								: 17
							: 16
					);
		}
	}
	FixWalls(a) {
		let b = [];
		for (let x = 0; x < this.Width + 1; x++) {
			b[x] = [];
			for (let y = 0; y < this.Height + 1; y++) {
				let key = 0;
				for (let w = x - 1; w < x + 1; w++)
					for (let h = y - 1; h < y + 1; h++)
						if (a.GetBlockCapped(w, h) === 145)
							key++;
				b[x][y] = key === 4;
			}
		}
		this.Blockify(a, b, this.Width + 1, this.Height + 1);
	}
	Blockify(a, b, c, e) {
		let d = 0, f = [];
		for (let i = 0; i < 2; i++)
			f[i] = [];
		if (this.Type === LevelType.Castle)
			d = 8;
		else if (this.Type === LevelType.Underground)
			d = 12;
		for (let g = 0; g < c; g++)
			for (let h = 0; h < e; h++) {
				for (let i = g; i <= g + 1; i++)
					for (let j = h; j <= h + 1; j++) {
						let k = i;
						let l = j;
						if (k < 0)
							k = 0;
						if (l < 0)
							l = 0;
						if (k > c - 1)
							k = c - 1;
						if (l > e - 1)
							l = e - 1;
						f[i - g][j - h] = b[k][l];
					}
				switch (f[0][0]) {
					case f[1][0]:
						if (f[0][1] === f[1][1]) {
							if (f[0][0] === f[0][1]) {
								if (f[0][0])
									a.SetBlock(g, h, 145 + d);
							} else {
								a.SetBlock(g, h, (f[0][0] ? 161 : 129) + d);
							}
						} else
							a.SetBlock(g, h, (f[0][0] ? f[0][1] ? 163 : 179 : f[0][1] ? 130 : 128) + d);
						break;
					case f[0][1]: if (f[1][0] === f[1][1])
						a.SetBlock(g, h, (f[0][0] ? 146 : 144) + d); break;
					case f[1][1]: if (f[0][1] === f[1][0])
						a.SetBlock(g, h, 145 + d); break;
					default:
						a.SetBlock(g, h, f[0][1] === f[1][1] ? (f[0][1] ? f[0][0] ? 147 : 131 : f[0][0] ? 162 : 160) + d : 1 + 16 * d);
				}
			}
	}
}
