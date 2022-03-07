export default class {
	constructor(a) {
		this.P = [];
		this.Shuffle(a);
	}
	Shuffle() {
		let arr = [];
		for (let i = 0; i < 256; i++) {
			arr[i] = i;
		}
		for (let i = 0; i < 256; i++) {
			let c = ((Math.random() * 255) | 0) + i;
			[arr[i], arr[c]] = [arr[c], arr[i]];
			this.P[i + 256] = this.P[i] = arr[i];
		}
	}
	PerlinNoise(a, b) {
		let e = 0;
		for (let c = 0; c < 8; c++) {
			let d = 64 / (1 << c);
			e += this.Noise(a / d, b / d, 128) / (1 << c);
		}
		return e;
	}
	Noise(a, b, c) {
		let e = (a | 0) & 255;
		let d = (b | 0) & 255;
		let f = (c | 0) & 255;
		let g = this.Fade(a -= a | 0);
		let h = this.Fade(b -= b | 0);
		let i = this.Fade(c -= c | 0);
		let j = this.P[e] + d;
		let k = this.P[j] + f;
		j = this.P[j + 1] + f;
		d = this.P[e + 1] + d;
		e = this.P[d] + f;
		f = this.P[d + 1] + f;
		return this.Lerp(
			i,
			this.Lerp(
				h,
				this.Lerp(
					g,
					this.Grad(this.P[k + 0], a - 0, b - 0, c - 0),
					this.Grad(this.P[e + 0], a - 1, b - 0, c - 0)
				),
				this.Lerp(
					g,
					this.Grad(this.P[j + 0], a - 0, b - 1, c - 0),
					this.Grad(this.P[f + 0], a - 1, b - 1, c - 0)
				)
			),
			this.Lerp(
				h,
				this.Lerp(
					g,
					this.Grad(this.P[k + 1], a - 0, b - 0, c - 1),
					this.Grad(this.P[e + 1], a - 1, b - 0, c - 1)
				),
				this.Lerp(
					g,
					this.Grad(this.P[j + 1], a - 0, b - 1, c - 1),
					this.Grad(this.P[f + 1], a - 1, b - 1, c - 1)
				)
			)
		);
	}
	Fade(a) {
		return a * a * a * (a * (a * 6 - 15) + 10);
	}
	Lerp(a, b, c) {
		return b + a * (c - b);
	}
	Grad(a, b, c, e) {
		a &= 15;
		let d = a < 8 ? b : c;
		b = a < 4 ? c : a === 12 || a === 14 ? b : e;
		return ((a & 1) === 0 ? d : -d) + ((a & 2) === 0 ? b : -b);
	}
}
