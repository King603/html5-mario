export const Resources = {
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
        delete this.Images[key];
        return this;
    },
    AddSound(key, href, length = 3) {
        if (this.Sounds) {
            this.Sounds[key] = [];
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
        delete this.Sounds[key];
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
        for (let sound of this.Sounds[key])
            sound.paused || sound.pause();
        return this;
    },
    ResetChannel(key, i) {
        this.Sounds[key][i].currentTime = 0;
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
        this.Sounds[key][i].removeEventListener("ended", this.LoopCallback, !1);
    },
    LoopCallback() {
        this.currentTime = -1;
        this.play();
    }
};
//# sourceMappingURL=Resources.js.map