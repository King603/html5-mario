import * as Enjine from "../Enjine/index.js";
import Mario from "./index.js";
import { MapState } from "./MapState.js";
import { Tile } from "./Tile.js";
import { TitleState } from "./TitleState.js";
export class LoadingState extends Enjine.GameState {
    Images = [];
    ImagesLoaded = !1;
    ScreenColor = 0;
    ColorDirection = 1;
    SoundIndex = 0;
    ImageIndex = 0;
    constructor() {
        super();
    }
    Enter() {
        for (let i = 0; i < 15; i++) {
            this.Images[i] = {
                name: [
                    "background",
                    "endScene",
                    "enemies",
                    "fireMario",
                    "font",
                    "gameOverGhost",
                    "items",
                    "logo",
                    "map",
                    "mario",
                    "particles",
                    "racoonMario",
                    "smallMario",
                    "title",
                    "worldMap"
                ][i],
                src: `public/images/${[
                    "bgsheet.png",
                    "endscene.gif",
                    "enemysheet.png",
                    "firemariosheet.png",
                    "font.gif",
                    "gameovergost.gif",
                    "itemsheet.png",
                    "logo.gif",
                    "mapsheet.png",
                    "mariosheet.png",
                    "particlesheet.png",
                    "racoonmariosheet.png",
                    "smallmariosheet.png",
                    "title.gif",
                    "worldmap.png"
                ][i]}`
            };
        }
        Enjine.Resources.AddImages(this.Images);
        new Audio().canPlayType("audio/mp3")
            ? Enjine.Resources.AddSound("1up", "sounds/1-up.mp3", 1).AddSound("breakblock", "sounds/breakblock.mp3").AddSound("bump", "sounds/bump.mp3", 4).AddSound("cannon", "sounds/cannon.mp3").AddSound("coin", "sounds/coin.mp3", 5).AddSound("death", "sounds/death.mp3", 1).AddSound("exit", "sounds/exit.mp3", 1).AddSound("fireball", "sounds/fireball.mp3", 1).AddSound("jump", "sounds/jump.mp3").AddSound("kick", "sounds/kick.mp3").AddSound("pipe", "sounds/pipe.mp3", 1).AddSound("powerdown", "sounds/powerdown.mp3", 1).AddSound("powerup", "sounds/powerup.mp3", 1).AddSound("sprout", "sounds/sprout.mp3", 1).AddSound("stagestart", "sounds/stagestart.mp3", 1).AddSound("stomp", "sounds/stomp.mp3", 2)
            : Enjine.Resources.AddSound("1up", "sounds/1-up.wav", 1).AddSound("breakblock", "sounds/breakblock.wav").AddSound("bump", "sounds/bump.wav", 2).AddSound("cannon", "sounds/cannon.wav").AddSound("coin", "sounds/coin.wav", 5).AddSound("death", "sounds/death.wav", 1).AddSound("exit", "sounds/exit.wav", 1).AddSound("fireball", "sounds/fireball.wav", 1).AddSound("jump", "sounds/jump.wav", 1).AddSound("kick", "sounds/kick.wav", 1).AddSound("message", "sounds/message.wav", 1).AddSound("pipe", "sounds/pipe.wav", 1).AddSound("powerdown", "sounds/powerdown.wav", 1).AddSound("powerup", "sounds/powerup.wav", 1).AddSound("sprout", "sounds/sprout.wav", 1).AddSound("stagestart", "sounds/stagestart.wav", 1).AddSound("stomp", "sounds/stomp.wav", 1);
        Tile.LoadBehaviors();
    }
    Exit() {
        delete this.Images;
    }
    Update(a) {
        if (!this.ImagesLoaded) {
            this.ImagesLoaded = !0;
            for (let image of this.Images)
                if (Enjine.Resources.Images[image.name].complete !== !0) {
                    this.ImagesLoaded = !1;
                    break;
                }
        }
        this.ScreenColor += this.ColorDirection * 255 * a;
        if (this.ScreenColor > 255) {
            this.ScreenColor = 255;
            this.ColorDirection = -1;
        }
        else if (this.ScreenColor < 0) {
            this.ScreenColor = 0;
            this.ColorDirection = 1;
        }
    }
    Draw(ctx) {
        if (this.ImagesLoaded)
            ctx.fillStyle = "rgb(0, 0, 0)";
        else {
            let color = parseInt(this.ScreenColor, 10);
            ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
        }
        ctx.fillRect(0, 0, 640, 480);
    }
    CheckForChange(title) {
        if (this.ImagesLoaded) {
            Mario.GlobalMapState = new MapState();
            title.ChangeState(new TitleState());
        }
    }
}
//# sourceMappingURL=LoadingState.js.map