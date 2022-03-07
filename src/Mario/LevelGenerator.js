import Level from "./Level.js";
import LevelType from "./LevelType.js";
import Odds from "./Odds.js";
import Enemy from "./Enemy.js";
import SpriteTemplate from "./SpriteTemplate.js";

export default class {
	constructor(a, b) {
		this.Width = a;
		this.Height = b;
		this.Odds = [];
		this.Type = this.Difficulty = this.TotalOdds = 0;
	}
	CreateLevel(a, b) {
		var c = 0, e = 0, d = (c = 0), f = 0, g = 0, h = 0, i = undefined;
		this.Type = a;
		this.Difficulty = b;
		this.Odds[Odds.Straight] = 20;
		this.Odds[Odds.HillStraight] = 10;
		this.Odds[Odds.Tubes] = 2 + b;
		this.Odds[Odds.Jump] = 2 * b;
		this.Odds[Odds.Cannons] = -10 + 5 * b;
		this.Type !== LevelType.Overground &&
			(this.Odds[Odds.HillStraight] = 0);
		for (c = 0; c < this.Odds.length; c++)
			this.Odds[c] < 0 && (this.Odds[c] = 0),
				(this.TotalOdds += this.Odds[c]),
				(this.Odds[c] = this.TotalOdds - this.Odds[c]);
		i = new Level(this.Width, this.Height);
		for (e += this.BuildStraight(i, 0, i.Width, !0); e < i.Width - 64;)
			e += this.BuildZone(i, e, i.Width - e);
		c = (this.Height - 1 - Math.random() * 4) | 0;
		i.ExitX = e + 8;
		i.ExitY = c;
		for (d = e; d < i.Width; d++)
			for (f = 0; f < this.Height; f++)
				f >= c && i.SetBlock(d, f, 145);
		if (a === LevelType.Castle || a === LevelType.Underground)
			for (d = 0; d < i.Width; d++) {
				h-- <= 0 &&
					d > 4 &&
					((g = (Math.random() * 4) | 0),
						(h = ((Math.random() * 4) | 0) + 4));
				for (f = 0; f < i.Height; f++)
					((d > 4 && f <= g) || d < 1) && i.SetBlock(d, f, 145);
			}
		this.FixWalls(i);
		return i;
	}
	BuildZone(a, b, c) {
		for (var e = (Math.random() * this.TotalOdds) | 0, d = 0, f = 0, f = 0; f < this.Odds.length; f++)
			this.Odds[f] <= e && (d = f);
		switch (d) {
			case Odds.Straight:
				return this.BuildStraight(a, b, c, !1);
			case Odds.HillStraight:
				return this.BuildHillStraight(a, b, c);
			case Odds.Tubes:
				return this.BuildTubes(a, b, c);
			case Odds.Jump:
				return this.BuildJump(a, b, c);
			case Odds.Cannons:
				return this.BuildCannons(a, b, c);
		}
		return 0;
	}
	BuildJump(a, b) {
		for (var c = ((Math.random() * 4) | 0) + 2, e = c * 2 + (((Math.random() * 2) | 0) + 2), d = 0, f = 0, g = ((Math.random() * 3) | 0) === 0, h = this.Height - 1 - ((Math.random() * 4) | 0), d = b; d < b + e; d++)
			if (d < b + c || d > b + e - c - 1)
				for (f = 0; f < this.Height; f++)
					f >= h
						? a.SetBlock(d, f, 145)
						: g &&
						(d < b + c
							? f >= h - (d - b) + 1 && a.SetBlock(d, f, 9)
							: f >= h - (b + e - d) + 2 && a.SetBlock(d, f, 9));
		return e;
	}
	BuildCannons(a, b, c) {
		alert("cannons");
		var e = ((Math.random() * 10) | 0) + 2, d = (this.Height - 1 - Math.random() * 4) | 0, f = (b + 1 + Math.random() * 4) | 0, g = 0, h = 0, i = 0;
		e > c && (e = c);
		for (g = b; g < b + e; g++) {
			g > f && (f += (2 * Math.random() * 4) | 0);
			f === b + e - 1 && (f += 10);
			i = d - ((Math.random() * 4) | 0) - 1;
			for (h = 0; h < this.Height; h++)
				h >= d
					? a.SetBlock(g, h, 145)
					: g === f &&
					h >= i &&
					(h === i
						? a.SetBlock(g, h, 14)
						: h === i + 1
							? a.SetBlock(g, h, 30)
							: a.SetBlock(g, h, 46));
		}
		return e;
	}
	BuildHillStraight(a, b, c) {
		var e = ((Math.random() * 10) | 0) + 10, d = (this.Height - 1 - Math.random() * 4) | 0, f = 0, g = 0, h = d, i = !0, j = 0, k = 0, l = [], m = 0, n = 0;
		e > c && (e = c);
		for (f = b; f < b + e; f++)
			for (g = 0; g < this.Height; g++)
				g >= d && a.SetBlock(f, g, 145);
		for (this.AddEnemyLine(a, b + 1, b + e - 1, d - 1); i;)
			if (((h = (h - 2 - Math.random() * 3) | 0), h <= 0))
				i = !1;
			else if (((j = ((Math.random() * 5) | 0) + 3),
				(k = ((Math.random() * (e - j - 2)) | 0) + b + 1),
				l[k - b] || l[k - b + j] || l[k - b - 1] || l[k - b + j + 1]))
				i = !1;
			else {
				l[k - b] = !0;
				l[k - b + j] = !0;
				this.AddEnemyLine(a, k, k + j, h - 1);
				((Math.random() * 4) | 0) === 0 &&
					(this.Decorate(a, k - 1, k + j + 1, h), (i = !1));
				for (f = k; f < k + j; f++)
					for (g = h; g < d; g++)
						(m = 5),
							(n = 9),
							f === k && (m = 4),
							f === k + j - 1 && (m = 6),
							g === h && (n = 8),
							a.GetBlock(f, g) === 0
								? a.SetBlock(f, g, m + n * 16)
								: (a.GetBlock(f, g) === 132 && a.SetBlock(f, g, 180),
									a.GetBlock(f, g) === 134 && a.SetBlock(f, g, 182));
			}
		return e;
	}
	AddEnemyLine(a, b, c, e) {
		for (let d = b; d < c; d++) {
			if (((Math.random() * 35) | 0) < this.Difficulty + 1) {
				let f = (Math.random() * 4) | 0;
				this.Difficulty < 1
					? f = Enemy.Goomba
					: this.Difficulty < 3 && (f = (Math.random() * 3) | 0);
				a.SetSpriteTemplate(
					d,
					e,
					new SpriteTemplate(
						f,
						((Math.random() * 35) | 0) < this.Difficulty
					)
				);
			}
		}
	}
	BuildTubes(a, b, c) {
		var e = ((Math.random() * 10) | 0) + 5, d = (this.Height - 1 - Math.random() * 4) | 0, f = (b + 1 + Math.random() * 4) | 0, g = d - ((Math.random() * 2) | 0) - 2, h = 0, i = 0, j = 0;
		e > c && (e = c);
		for (h = b; h < b + e; h++) {
			h > f + 1 &&
				((f += 3 + ((Math.random() * 4) | 0)),
					(g = d - ((Math.random() * 2) | 0) - 2));
			f >= b + e - 2 && (f += 10);
			h === f &&
				((Math.random() * 11) | 0) < this.Difficulty + 1 &&
				a.SetSpriteTemplate(
					h,
					g,
					new SpriteTemplate(Enemy.Flower, !1)
				);
			for (i = 0; i < this.Height; i++)
				if (i >= d)
					a.SetBlock(h, i, 145);
				else if ((h === f || h === f + 1) && i >= g)
					(j = 10 + h - f),
						i === g ? a.SetBlock(h, i, j) : a.SetBlock(h, i, j + 16);
		}
		return e;
	}
	BuildStraight(a, b, c, e) {
		var d = ((Math.random() * 10) | 0) + 2, f = this.Height - 1 - ((Math.random() * 4) | 0), g = 0, h = 0;
		e && (d = 10 + ((Math.random() * 5) | 0));
		d > c && (d = c);
		for (g = b; g < b + d; g++)
			for (h = 0; h < this.Height; h++)
				h >= f && a.SetBlock(g, h, 145);
		e || (d > 5 && this.Decorate(a, b, b + d, f));
		return d;
	}
	Decorate(a, b, c, e) {
		if (!(e < 1)) {
			var d = (Math.random() * 4) | 0, f = (Math.random() * 4) | 0, g = 0;
			this.AddEnemyLine(a, b + 1, c - 1, e - 1);
			if (e - 2 > 0 && c - 1 - f - (b + 1 + d) > 1)
				for (g = b + 1 + d; g < c - 1 - f; g++)
					a.SetBlock(g, e - 2, 34);
			d = (Math.random() * 4) | 0;
			f = (Math.random() * 4) | 0;
			if (e - 4 > 0 && c - 1 - f - (b + 1 + d) > 2)
				for (g = b + 1 + d; g < c - 1 - f; g++)
					g !== b + 1 && g !== c - 2 && ((Math.random() * 3) | 0) === 0
						? ((Math.random() * 4) | 0) === 0
							? a.SetBlock(g, e - 4, 22)
							: a.SetBlock(g, e - 4, 21)
						: ((Math.random() * 4) | 0) === 0
							? ((Math.random() * 4) | 0) === 0
								? a.SetBlock(g, e - 4, 18)
								: a.SetBlock(g, e - 4, 17)
							: a.SetBlock(g, e - 4, 16);
		}
	}
	FixWalls(a) {
		for (var b = [], c = 0, e = 0, d = 0, f = 0, g = 0, c = 0; c < this.Width + 1; c++) {
			b[c] = [];
			for (e = 0; e < this.Height + 1; e++) {
				g = 0;
				for (d = c - 1; d < c + 1; d++)
					for (f = e - 1; f < e + 1; f++)
						a.GetBlockCapped(d, f) === 145 && g++;
				b[c][e] = g === 4;
			}
		}
		this.Blockify(a, b, this.Width + 1, this.Height + 1);
	}
	Blockify(a, b, c, e) {
		for (var d = 0, f = [], g = 0, h = 0, i = 0, j = 0, k = (g = 0), l = 0, g = 0; g < 2; g++)
			f[g] = [];
		this.Type === LevelType.Castle
			? (d = 8)
			: this.Type === LevelType.Underground && (d = 12);
		for (g = 0; g < c; g++)
			for (h = 0; h < e; h++) {
				for (i = g; i <= g + 1; i++)
					for (j = h; j <= h + 1; j++)
						(k = i),
							(l = j),
							k < 0 && (k = 0),
							l < 0 && (l = 0),
							k > c - 1 && (k = c - 1),
							l > e - 1 && (l = e - 1),
							(f[i - g][j - h] = b[k][l]);
				f[0][0] === f[1][0] && f[0][1] === f[1][1]
					? f[0][0] === f[0][1]
						? f[0][0] && a.SetBlock(g, h, 145 + d)
						: f[0][0]
							? a.SetBlock(g, h, 161 + d)
							: a.SetBlock(g, h, 129 + d)
					: f[0][0] === f[0][1] && f[1][0] === f[1][1]
						? f[0][0]
							? a.SetBlock(g, h, 146 + d)
							: a.SetBlock(g, h, 144 + d)
						: f[0][0] === f[1][1] && f[0][1] === f[1][0]
							? a.SetBlock(g, h, 145 + d)
							: f[0][0] === f[1][0]
								? f[0][0]
									? f[0][1]
										? a.SetBlock(g, h, 163 + d)
										: a.SetBlock(g, h, 179 + d)
									: f[0][1]
										? a.SetBlock(g, h, 130 + d)
										: a.SetBlock(g, h, 128 + d)
								: f[0][1] === f[1][1]
									? f[0][1]
										? f[0][0]
											? a.SetBlock(g, h, 147 + d)
											: a.SetBlock(g, h, 131 + d)
										: f[0][0]
											? a.SetBlock(g, h, 162 + d)
											: a.SetBlock(g, h, 160 + d)
									: a.SetBlock(g, h, 1 + 16 * d);
			}
	}
}
