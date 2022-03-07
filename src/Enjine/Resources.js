export default {
	/**@type {{[key: string]: HTMLImageElement}} */
	Images: {},
	/**@type {{[key: string]: HTMLAudioElement[]}} */
	Sounds: {},
	Destroy() {
		delete this.Images;
		delete this.Sounds;
		return this;
	},
	/**
	 *
	 * @param {{ name: string; src: string; }}
	 * @returns
	 */
	AddImage({ name, src }) {
		this.Images[name] = new Image();
		this.Images[name].src = src;
		return this;
	},
	/**
	 *
	 * @param {{ name: string; src: string; }[]} imgs
	 * @returns
	 */
	AddImages(imgs) {
		imgs.forEach(img => this.AddImage(img));
		return this;
	},
	ClearImages() {
		this.Images = {};
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	RemoveImage(name) {
		delete this.Images[name];
		return this;
	},
	AddSound(name, src, count = 3) {
		let sounds = this.Sounds[name] = [];
		sounds.index = 0;
		for (let i = 0; i < count; i++)
			sounds[i] = new Audio(src);
		return this;
	},
	ClearSounds() {
		this.Sounds = {};
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	RemoveSound(name) {
		delete this.Sounds[name];
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @param {boolean} bool
	 * @returns
	 */
	PlaySound(name, bool) {
		let sounds = this.Sounds[name];
		if (sounds.index >= sounds.length)
			sounds.index = 0;
		if (bool) {
			sounds[sounds.index].addEventListener("ended", this.LoopCallback);
		}
		sounds[sounds.index++].play();
		return sounds.index;
	},
	/**
	 *
	 * @param {string} name
	 * @param {number} i
	 * @returns
	 */
	PauseChannel(name, i) {
		let sound = this.Sounds[name][i];
		sound.paused || sound.pause();
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	PauseSound(name) {
		this.Sounds[name].forEach((sound) => sound.paused || sound.pause());
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @param {number} i
	 * @returns
	 */
	ResetChannel(name, i) {
		this.Sounds[name][i].currentTime = 0;
		this.StopLoop(name, i);
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	ResetSound(name) {
		for (let i in this.Sounds[name]) {
			+i == NaN || this.ResetChannel(name, +i);
		}
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @param {number} i
	 */
	StopLoop(name, i) {
		this.Sounds[name][i].removeEventListener("ended", this.LoopCallback);
	},
	LoopCallback() {
		this.currentTime = -1;
		this.play();
	},
};
