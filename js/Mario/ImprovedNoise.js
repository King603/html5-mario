export class ImprovedNoise {
	constructor(a) {
		this.P = [];
		this.Shuffle(a);
	}
	Shuffle() {
		let a = [];
		for (let i = 0; i < 256; i++)
			a[i] = i;
		for (let i = 0; i < 256; i++) {
			let random = (Math.random() * 255 | 0) + i;
			let amount = a[i];
			a[i] = a[random];
			a[random] = amount;
			this.P[i + 256] = this.P[i] = a[i];
		}
	}
	PerlinNoise(a, b) {
		let e = 0;
		for (let i = 0; i < 8; i++) {
			let d = 64 / (1 << i);
			e += this.Noise(a / d, b / d, 128) / (1 << i);
		}
		return e;
	}
	Noise(a, b, c) {
		let e = (a | 0) & 255, d = (b | 0) & 255, f = (c | 0) & 255;
		a -= a | 0;
		b -= b | 0;
		c -= c | 0;
		let g = this.Fade(a), h = this.Fade(b), i = this.Fade(c), j = this.P[e] + d, k = this.P[j] + f;
		j = this.P[j + 1] + f;
		d = this.P[e + 1] + d;
		e = this.P[d] + f;
		f = this.P[d + 1] + f;
		return this.Lerp(i, this.Lerp(h, this.Lerp(g, this.Grad(this.P[k], a, b, c), this.Grad(this.P[e], a - 1, b, c)), this.Lerp(g, this.Grad(this.P[j], a, b - 1, c), this.Grad(this.P[f], a - 1, b - 1, c))), this.Lerp(h, this.Lerp(g, this.Grad(this.P[k + 1], a, b, c - 1), this.Grad(this.P[e + 1], a - 1, b, c - 1)), this.Lerp(g, this.Grad(this.P[j + 1], a, b - 1, c - 1), this.Grad(this.P[f + 1], a - 1, b - 1, c - 1))));
	}
	Fade(a) {
		return a * a * a * (a * (a * 6 - 15) + 10);
	}
	Lerp(a, b, c) {
		return b + a * (c - b);
	}
	Grad(a, b, c, e) {
		a &= 15;
		return ((a & 1) === 0 ? 1 : -1) * (a < 8 ? b : c) + ((a & 2) === 0 ? 1 : -1) * (a < 4 ? c : a === 12 || a === 14 ? b : e);
	}
}
