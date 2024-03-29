import * as Enjine from "../Enjine/index.js";
import Character from "./Character.js";
import LevelType from "./LevelType.js";
import SpriteCuts from "./SpriteCuts.js";
import Mario from "./index.js";
import MapState from "./MapState.js";

export default class extends Enjine.GameState {
	constructor() {
		super();
		this.font =
			this.bounce =
			this.logoY =
			this.camera =
			this.drawManager =
			undefined;
	}
	Enter() {
		this.drawManager = new Enjine.DrawableManager();
		this.camera = new Enjine.Camera();
		var a = new Mario.BackgroundGenerator(
			2048,
			15,
			!0,
			LevelType.Overground
		), b = new Mario.BackgroundRenderer(a.CreateLevel(), 320, 240, 2);
		a.SetValues(2048, 15, !1, LevelType.Overground);
		a = new Mario.BackgroundRenderer(a.CreateLevel(), 320, 240, 1);
		this.title = new Enjine.Sprite();
		this.title.Image = Enjine.Resources.Images.title;
		this.title.X = 0;
		this.title.Y = 120;
		this.logo = new Enjine.Sprite();
		this.logo.Image = Enjine.Resources.Images.logo;
		this.logo.X = 0;
		this.logo.Y = 0;
		this.font = SpriteCuts.CreateRedFont();
		this.font.Strings[0] = { String: "Press S to Start", X: 96, Y: 120 };
		this.logoY = 20;
		this.drawManager.Add(b);
		this.drawManager.Add(a);
		this.bounce = 0;
		Mario.GlobalMapState = new MapState();
		Mario.MarioCharacter = new Character(Enjine.Resources.Images.smallMario);
	}
	Exit() {
		this.drawManager.Clear();
		delete this.drawManager;
		delete this.camera;
		delete this.font;
	}
	Update(a) {
		this.bounce += a * 2;
		this.logoY = 20 + Math.sin(this.bounce) * 10;
		this.camera.X += a * 25;
		this.drawManager.Update(a);
	}
	Draw(a) {
		this.drawManager.Draw(a, this.camera);
		a.drawImage(Enjine.Resources.Images.title, 0, 120);
		a.drawImage(Enjine.Resources.Images.logo, 0, this.logoY);
		this.font.Draw(a, this.Camera);
	}
	CheckForChange(a) {
		Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) &&
			a.ChangeState(Mario.GlobalMapState);
	}
}
