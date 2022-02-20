import * as Enjine from "../Enjine/index.js";
import { BackgroundGenerator } from "./BackgroundGenerator.js";
import { BackgroundRenderer } from "./BackgroundRenderer.js";
import { Character } from "./Character.js";
import Mario from "./index.js";
import { LevelType } from "./LevelType.js";
import { MapState } from "./MapState.js";
import { SpriteCuts } from "./SpriteCuts.js";

export class TitleState extends Enjine.GameState {
	drawManager?: Enjine.DrawableManager;
	camera?: Enjine.Camera;
	title?: Enjine.Sprite;
	logo?: Enjine.Sprite;
	font?: Enjine.SpriteFont;
	logoY: number = 0;
	bounce: number = 0;
	constructor() {
		super();
	}
	Enter() {
		this.drawManager = new Enjine.DrawableManager();
		this.camera = new Enjine.Camera();
		let a = new BackgroundGenerator(2048, 15, !0, LevelType.Overground);
		this.title = new Enjine.Sprite();
		this.title.Image = Enjine.Resources.Images?.title;
		this.title.X = 0;
		this.title.Y = 120;
		this.logo = new Enjine.Sprite();
		this.logo.Image = Enjine.Resources.Images?.logo;
		this.logo.X = 0;
		this.logo.Y = 0;
		this.font = SpriteCuts.CreateRedFont();
		this.font.Strings[0] = { String: "Press S to Start", X: 96, Y: 120 };
		this.logoY = 20;
		this.drawManager.Add(new BackgroundRenderer(a.CreateLevel(), 320, 240, 2));
		a.SetValues(2048, 15, !1, LevelType.Overground);
		this.drawManager.Add(new BackgroundRenderer(a.CreateLevel(), 320, 240, 1));
		this.bounce = 0;
		Mario.GlobalMapState = new MapState();
		Mario.MarioCharacter = new Character(Enjine.Resources.Images?.smallMario as HTMLImageElement);
	}
	Exit() {
		this.drawManager?.Clear();
		delete this.drawManager;
		delete this.camera;
		delete this.font;
	}
	Update(a: number) {
		this.bounce += a * 2;
		this.logoY = 20 + Math.sin(this.bounce) * 10;
		this.camera && (this.camera.X += a * 25);
		this.drawManager?.Update(a);
	}
	Draw(ctx: CanvasRenderingContext2D) {
		this.drawManager?.Draw(ctx, this.camera as Enjine.Camera);
		ctx.drawImage(Enjine.Resources.Images?.title as HTMLImageElement, 0, 120);
		ctx.drawImage(Enjine.Resources.Images?.logo as HTMLImageElement, 0, this.logoY);
		this.font?.Draw(ctx);
	}
	CheckForChange(a: Enjine.GameStateContext) {
		Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) && a.ChangeState(Mario.GlobalMapState);
	}
}
