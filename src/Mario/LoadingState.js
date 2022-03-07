import * as Enjine from "../Enjine/index.js";
import Tile from "./Tile.js";
import TitleState from "./TitleState.js";
import Mario from "./index.js";
import MapState from "./MapState.js";

export default class extends Enjine.GameState {
	constructor() {
		super();
		this.Images = [];
		this.ImagesLoaded = !1;
		this.ScreenColor = 0;
		this.ColorDirection = 1;
		this.SoundIndex = this.ImageIndex = 0;
	}
	Enter() {
		Enjine.Resources.AddImages(this.Images = [
			{ name: "background", src: "public/images/bgsheet.png" },
			{ name: "endScene", src: "public/images/endscene.gif" },
			{ name: "enemies", src: "public/images/enemysheet.png" },
			{ name: "fireMario", src: "public/images/firemariosheet.png" },
			{ name: "font", src: "public/images/font.gif" },
			{ name: "gameOverGhost", src: "public/images/gameovergost.gif" },
			{ name: "items", src: "public/images/itemsheet.png" },
			{ name: "logo", src: "public/images/logo.gif" },
			{ name: "map", src: "public/images/mapsheet.png" },
			{ name: "mario", src: "public/images/mariosheet.png" },
			{ name: "particles", src: "public/images/particlesheet.png" },
			{ name: "racoonMario", src: "public/images/racoonmariosheet.png" },
			{ name: "smallMario", src: "public/images/smallmariosheet.png" },
			{ name: "title", src: "public/images/title.gif" },
			{ name: "worldMap", src: "public/images/worldmap.png" }
		]);
		new Audio().canPlayType("audio/mp3")
			? Enjine.Resources.AddSound("1up", "sounds/1-up.mp3", 1)
				.AddSound("breakblock", "sounds/breakblock.mp3")
				.AddSound("bump", "sounds/bump.mp3", 4)
				.AddSound("cannon", "sounds/cannon.mp3")
				.AddSound("coin", "sounds/coin.mp3", 5)
				.AddSound("death", "sounds/death.mp3", 1)
				.AddSound("exit", "sounds/exit.mp3", 1)
				.AddSound("fireball", "sounds/fireball.mp3", 1)
				.AddSound("jump", "sounds/jump.mp3")
				.AddSound("kick", "sounds/kick.mp3")
				.AddSound("pipe", "sounds/pipe.mp3", 1)
				.AddSound("powerdown", "sounds/powerdown.mp3", 1)
				.AddSound("powerup", "sounds/powerup.mp3", 1)
				.AddSound("sprout", "sounds/sprout.mp3", 1)
				.AddSound("stagestart", "sounds/stagestart.mp3", 1)
				.AddSound("stomp", "sounds/stomp.mp3", 2)
			: Enjine.Resources.AddSound("1up", "sounds/1-up.wav", 1)
				.AddSound("breakblock", "sounds/breakblock.wav")
				.AddSound("bump", "sounds/bump.wav", 2)
				.AddSound("cannon", "sounds/cannon.wav")
				.AddSound("coin", "sounds/coin.wav", 5)
				.AddSound("death", "sounds/death.wav", 1)
				.AddSound("exit", "sounds/exit.wav", 1)
				.AddSound("fireball", "sounds/fireball.wav", 1)
				.AddSound("jump", "sounds/jump.wav", 1)
				.AddSound("kick", "sounds/kick.wav", 1)
				.AddSound("message", "sounds/message.wav", 1)
				.AddSound("pipe", "sounds/pipe.wav", 1)
				.AddSound("powerdown", "sounds/powerdown.wav", 1)
				.AddSound("powerup", "sounds/powerup.wav", 1)
				.AddSound("sprout", "sounds/sprout.wav", 1)
				.AddSound("stagestart", "sounds/stagestart.wav", 1)
				.AddSound("stomp", "sounds/stomp.wav", 1);
		Tile.LoadBehaviors();
	}
	Exit() {
		delete this.Images;
	}
	Update(a) {
		if (!this.ImagesLoaded) {
			this.ImagesLoaded = !0;
			for (var b = 0, b = 0; b < this.Images.length; b++)
				if (Enjine.Resources.Images[this.Images[b].name].complete !== !0) {
					this.ImagesLoaded = !1;
					break;
				}
		}
		this.ScreenColor += this.ColorDirection * 255 * a;
		if (this.ScreenColor > 255)
			(this.ScreenColor = 255), (this.ColorDirection = -1);
		else if (this.ScreenColor < 0)
			(this.ScreenColor = 0), (this.ColorDirection = 1);
	}
	Draw(a) {
		if (this.ImagesLoaded)
			a.fillStyle = "rgb(0, 0, 0)";
		else {
			var b = parseInt(this.ScreenColor, 10);
			a.fillStyle = "rgb(" + b + "," + b + "," + b + ")";
		}
		a.fillRect(0, 0, 640, 480);
	}
	CheckForChange(a) {
		if (this.ImagesLoaded)
			(Mario.GlobalMapState = new MapState()),
				a.ChangeState(new TitleState());
	}
}
