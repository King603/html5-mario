import * as Enjine from "../Enjine/index.js";
import { SpriteCuts } from "./SpriteCuts.js";
import { TitleState } from "./TitleState.js";

export class WinState extends Enjine.GameState {
	waitTime = 0;
	wasKeyDown = !1;
	drawManager?: Enjine.DrawableManager;
	camera?: Enjine.Camera;
	font?: Enjine.SpriteFont;
	kissing?: Enjine.AnimatedSprite;
	constructor() {
		super();
	}
	Enter() {
		this.drawManager = new Enjine.DrawableManager();
		this.camera = new Enjine.Camera();
		this.font = SpriteCuts.CreateBlackFont();
		this.font.Strings[0] = { String: "Thank you for saving me, Mario!", X: 36, Y: 160 };
		this.kissing = new Enjine.AnimatedSprite();
		this.kissing.Image = Enjine.Resources.Images?.endScene;
		this.kissing.X = 112;
		this.kissing.Y = 52;
		this.kissing.SetColumnCount(2);
		this.kissing.SetRowCount(1);
		this.kissing.AddNewSequence("loop", 0, 0, 0, 1);
		this.kissing.PlaySequence("loop", !0);
		this.kissing.FramesPerSecond = .5;
		this.waitTime = 2;
		this.drawManager.Add(this.font);
		this.drawManager.Add(this.kissing);
	}
	Exit() {
		this.drawManager?.Clear();
		delete this.drawManager;
		delete this.camera;
	}
	Update(a: number) {
		this.drawManager?.Update(a);
		if (this.waitTime > 0)
			this.waitTime -= a;
		else if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S))
			this.wasKeyDown = !0;
	}
	Draw(ctx: CanvasRenderingContext2D) {
		this.drawManager?.Draw(ctx, this.camera as Enjine.Camera);
	}
	CheckForChange(ctx: Enjine.GameStateContext) {
		this.waitTime <= 0 && this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) &&
			ctx.ChangeState(new TitleState());
	};
}
