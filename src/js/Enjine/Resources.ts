interface Sounds extends Array<HTMLAudioElement> {
	index: number;
}

interface RESOURCES {
	Images?: { [key: string]: HTMLImageElement; };
	Sounds?: { [key: string]: Sounds; };
	Destroy(): RESOURCES;
	AddImage(key: string, src: string): RESOURCES;
	AddImages(images: { name: string; src: string; }[]): RESOURCES;
	ClearImages(): RESOURCES;
	RemoveImage(key: string): RESOURCES;
	AddSound(key: string, href: string, length?: number): RESOURCES;
	ClearSounds(): RESOURCES;
	RemoveSound(key: string): RESOURCES;
	PlaySound(key: string, b?: boolean): number;
	PauseChannel(key: string, i: number): RESOURCES;
	PauseSound(key: string): RESOURCES;
	ResetChannel(key: string, i: number): RESOURCES;
	ResetSound(key: string): RESOURCES;
	StopLoop(key: string, i: number): void;
	LoopCallback(): void;
}

export const Resources: RESOURCES = {
	Images: {},
	Sounds: {},
	Destroy() {
		delete this.Images;
		delete this.Sounds;
		return this;
	},
	AddImage(key, src) {
		let img = new Image();
		img.src = src;
		this.Images && (this.Images[key] = img);
		return this;
	},
	AddImages(images) {
		for (let image of images) {
			let img = new Image();
			img.src = image.src;
			this.Images && (this.Images[image.name] = img);
		}
		return this;
	},
	ClearImages() {
		this.Images = {};
		return this;
	},
	RemoveImage(key) {
		delete (this.Images as { [key: string]: HTMLImageElement; })[key];
		return this;
	},
	AddSound(key, href, length = 3) {
		if (this.Sounds) {
			this.Sounds[key] = [] as unknown as Sounds;
			this.Sounds[key].index = 0;
			for (let i = 0; i < length; i++)
				this.Sounds[key][i] = new Audio(href);
		}
		return this;
	},
	ClearSounds() {
		this.Sounds = {};
		return this;
	},
	RemoveSound(key) {
		delete (this.Sounds as { [key: string]: Sounds; })[key];
		return this;
	},
	PlaySound(key, b) {
		if (this.Sounds) {
			if (this.Sounds[key].index >= this.Sounds[key].length)
				this.Sounds[key].index = 0;
			b && this.Sounds[key][this.Sounds[key].index].addEventListener("ended", this.LoopCallback, !1);
			this.Sounds[key][this.Sounds[key].index++].play();
			return this.Sounds[key].index;
		}
		return 0;
	},
	PauseChannel(key, i) {
		this.Sounds && (this.Sounds[key][i].paused || this.Sounds[key][i].pause());
		return this;
	},
	PauseSound(key) {
		for (let sound of (this.Sounds as { [key: string]: Sounds; })[key])
			sound.paused || sound.pause();
		return this;
	},
	ResetChannel(key, i) {
		(this.Sounds as { [key: string]: Sounds; })[key][i].currentTime = 0;
		this.StopLoop(key, i);
		return this;
	},
	ResetSound(key) {
		for (let i = 0; this.Sounds && i < this.Sounds[key].length; i++) {
			this.Sounds[key][i].currentTime = 0;
			this.StopLoop(key, i);
		}
		return this;
	},
	StopLoop(key, i) {
		(this.Sounds as { [key: string]: Sounds; })[key][i].removeEventListener("ended", this.LoopCallback, !1);
	},
	LoopCallback(this: HTMLAudioElement) {
		this.currentTime = -1;
		this.play();
	}
};
