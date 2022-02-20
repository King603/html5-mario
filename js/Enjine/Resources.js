export const Resources = {
	/**
	 * @type {{background: HTMLImageElement; endScene: HTMLImageElement; enemies: HTMLImageElement; fireMario: HTMLImageElement; font: HTMLImageElement; gameOverGhost: HTMLImageElement; items: HTMLImageElement; logo: HTMLImageElement; map: HTMLImageElement; mario: HTMLImageElement; particles: HTMLImageElement; racoonMario: HTMLImageElement; smallMario: HTMLImageElement; title: HTMLImageElement; worldMap: HTMLImageElement;}}
	 */
	Images: {},
	/**
	 * @type {{[key: string]: HTMLAudioElement[]}}
	 */
	Sounds: {},
	Destroy() {
		delete this.Images;
		delete this.Sounds;
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @param {string} src
	 * @returns
	 */
	AddImage(key, src) {
		let img = new Image();
		img.src = src;
		this.Images[key] = img;
		return this;
	},
	/**
	 *
	 * @param {{name: string; src: string;}[]} images
	 * @returns
	 */
	AddImages(images) {
		for (let image of images) {
			let img = new Image();
			img.src = image.src;
			this.Images[image.name] = img;
		}
		return this;
	},
	ClearImages() {
		this.Images = {};
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @returns
	 */
	RemoveImage(key) {
		delete this.Images[key];
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @param {string} href
	 * @param {number} length
	 * @returns
	 */
	AddSound(key, href, length = 3) {
		this.Sounds[key] = [];
		this.Sounds[key].index = 0;
		for (let i = 0; i < length; i++)
			this.Sounds[key][i] = new Audio(href);
		return this;
	},
	ClearSounds() {
		this.Sounds = {};
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @returns
	 */
	RemoveSound(key) {
		delete this.Sounds[key];
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @param {boolean} b
	 * @returns
	 */
	PlaySound(key, b) {
		if (this.Sounds[key].index >= this.Sounds[key].length)
			this.Sounds[key].index = 0;
		b && this.Sounds[key][this.Sounds[key].index].addEventListener("ended", this.LoopCallback, !1);
		this.Sounds[key][this.Sounds[key].index++].play();
		return this.Sounds[key].index;
	},
	/**
	 *
	 * @param {string} key
	 * @param {number} i
	 * @returns
	 */
	PauseChannel(key, i) {
		this.Sounds[key][i].paused || this.Sounds[key][i].pause();
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @returns
	 */
	PauseSound(key) {
		for (let sound of this.Sounds[key])
			sound.paused || sound.pause();
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @param {number} i
	 * @returns
	 */
	ResetChannel(key, i) {
		this.Sounds[key][i].currentTime = 0;
		this.StopLoop(key, i);
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @returns
	 */
	ResetSound(key) {
		for (let i = 0; i < this.Sounds[key].length; i++) {
			this.Sounds[key].currentTime = 0;
			this.StopLoop(key, i);
		}
		return this;
	},
	/**
	 *
	 * @param {string} key
	 * @param {number} i
	 */
	StopLoop(key, i) {
		this.Sounds[key][i].removeEventListener("ended", this.LoopCallback, !1);
	},
	LoopCallback() {
		this.currentTime = -1;
		this.play();
	}
};
