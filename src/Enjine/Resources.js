export const Resources = {
	/**@type {{[key: string]: HTMLImageElement}} */
	Images: {},
	/**@type {{[key: string]: HTMLAudioElement[]}} */
	Sounds: {},
	Destroy: function () {
		delete this.Images;
		delete this.Sounds;
		return this;
	},
	/**
	 *
	 * @param {{ name: string; src: string; }}
	 * @returns
	 */
	AddImage: function ({ name, src }) {
		this.Images[name] = new Image();
		this.Images[name].src = src;
		return this;
	},
	/**
	 *
	 * @param {{ name: string; src: string; }[]} imgs
	 * @returns
	 */
	AddImages: function (imgs) {
		imgs.forEach(img => this.AddImage(img));
		return this;
	},
	ClearImages: function () {
		this.Images = {};
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	RemoveImage: function (name) {
		delete this.Images[name];
		return this;
	},
	AddSound: function (name, src, count = 3) {
		let sounds = this.Sounds[name] = [];
		sounds.index = 0;
		for (let i = 0; i < count; i++)
			sounds[i] = new Audio(src);
		return this;
	},
	ClearSounds: function () {
		this.Sounds = {};
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	RemoveSound: function (name) {
		delete this.Sounds[name];
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @param {boolean} bool
	 * @returns
	 */
	PlaySound: function (name, bool) {
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
	PauseChannel: function (name, i) {
		let sound = this.Sounds[name][i];
		sound.paused || sound.pause();
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	PauseSound: function (name) {
		this.Sounds[name].forEach((sound) => sound.paused || sound.pause());
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @param {number} i
	 * @returns
	 */
	ResetChannel: function (name, i) {
		this.Sounds[name][i].currentTime = 0;
		this.StopLoop(name, i);
		return this;
	},
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	ResetSound: function (name) {
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
	StopLoop: function (name, i) {
		this.Sounds[name][i].removeEventListener("ended", this.LoopCallback);
	},
	LoopCallback: function () {
		this.currentTime = -1;
		this.play();
	},
};
