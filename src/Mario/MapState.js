import * as Enjine from "../Enjine/index.js";
import LevelType from "./LevelType.js";
import MapTile from "./MapTile.js";
import SpriteCuts from "./SpriteCuts.js";
import WinState from "./WinState.js";
import Mario from "./index.js";
import LevelState from "./LevelState.js";

export default class extends Enjine.GameState {
	constructor() {
		super();
		this.camera = new Enjine.Camera();
		this.Level = [];
		this.Data = [];
		this.YFarthestCap =
			this.XFarthestCap =
			this.Farthest =
			this.LevelId =
			this.MoveTime =
			this.YMarioA =
			this.XMarioA =
			this.YMario =
			this.XMario =
			0;
		this.MapImage = document.createElement("canvas");
		this.MapImage.width = 320;
		this.MapImage.height = 240;
		this.MapContext = this.MapImage.getContext("2d");
		this.EnterLevel = this.CanEnterLevel = !1;
		this.LevelType = this.LevelDifficulty = 0;
		this.WorldNumber = -1;
		this.NextWorld();
	}
	Enter() {
		this.WaterSprite = new Enjine.AnimatedSprite();
		this.WaterSprite.Image = Enjine.Resources.Images.worldMap;
		this.WaterSprite.SetColumnCount(16);
		this.WaterSprite.SetRowCount(16);
		this.WaterSprite.AddNewSequence("loop", 14, 0, 14, 3);
		this.WaterSprite.FramesPerSecond = 1 / 3;
		this.WaterSprite.PlaySequence("loop", !0);
		this.WaterSprite.X = 0;
		this.WaterSprite.Y = 0;
		this.DecoSprite = new Enjine.AnimatedSprite();
		this.DecoSprite.Image = Enjine.Resources.Images.worldMap;
		this.DecoSprite.SetColumnCount(16);
		this.DecoSprite.SetRowCount(16);
		this.DecoSprite.AddNewSequence("world0", 10, 0, 10, 3);
		this.DecoSprite.AddNewSequence("world1", 11, 0, 11, 3);
		this.DecoSprite.AddNewSequence("world2", 12, 0, 12, 3);
		this.DecoSprite.AddNewSequence("world3", 13, 0, 13, 3);
		this.DecoSprite.FramesPerSecond = 1 / 3;
		this.DecoSprite.PlaySequence("world0", !0);
		this.DecoSprite.X = 0;
		this.DecoSprite.Y = 0;
		this.HelpSprite = new Enjine.AnimatedSprite();
		this.HelpSprite.Image = Enjine.Resources.Images.worldMap;
		this.HelpSprite.SetColumnCount(16);
		this.HelpSprite.SetRowCount(16);
		this.HelpSprite.AddNewSequence("help", 7, 3, 7, 5);
		this.HelpSprite.FramesPerSecond = 0.5;
		this.HelpSprite.PlaySequence("help", !0);
		this.HelpSprite.X = 0;
		this.HelpSprite.Y = 0;
		this.SmallMario = new Enjine.AnimatedSprite();
		this.SmallMario.Image = Enjine.Resources.Images.worldMap;
		this.SmallMario.SetColumnCount(16);
		this.SmallMario.SetRowCount(16);
		this.SmallMario.AddNewSequence("small", 1, 0, 1, 1);
		this.SmallMario.FramesPerSecond = 1 / 3;
		this.SmallMario.PlaySequence("small", !0);
		this.SmallMario.X = 0;
		this.SmallMario.Y = 0;
		this.LargeMario = new Enjine.AnimatedSprite();
		this.LargeMario.Image = Enjine.Resources.Images.worldMap;
		this.LargeMario.SetColumnCount(16);
		this.LargeMario.SetRowCount(8);
		this.LargeMario.AddNewSequence("large", 0, 2, 0, 3);
		this.LargeMario.AddNewSequence("fire", 0, 4, 0, 5);
		this.LargeMario.FramesPerSecond = 1 / 3;
		this.LargeMario.PlaySequence("large", !0);
		this.LargeMario.X = 0;
		this.LargeMario.Y = 0;
		this.FontShadow = SpriteCuts.CreateBlackFont();
		this.Font = SpriteCuts.CreateWhiteFont();
		this.DecoSprite.PlaySequence("world" + (this.WorldNumber % 4), !0);
		Mario.MarioCharacter.Fire
			? this.LargeMario.PlaySequence("fire", !0)
			: this.LargeMario.PlaySequence("large", !0);
		this.EnterLevel = !1;
		this.LevelType = this.LevelDifficulty = 0;
	}
	Exit() {
		delete this.WaterSprite;
		delete this.DecoSprite;
		delete this.HelpSprite;
		delete this.SmallMario;
		delete this.LargeMario;
		delete this.FontShadow;
		delete this.Font;
	}
	NextWorld() {
		var a = !1;
		this.WorldNumber++;
		if (this.WorldNumber !== 8) {
			for (this.YFarthestCap =
				this.XFarthestCap =
				this.Farthest =
				this.LevelId =
				this.MoveTime =
				0; !a;)
				a = this.GenerateLevel();
			this.RenderStatic();
		}
	}
	GenerateLevel() {
		var a = 0, b = 0, c = 0, e = 0, c = (c = 0), d = new Mario.ImprovedNoise((Math.random() * 9223372036854775e3) | 0), f = new Mario.ImprovedNoise((Math.random() * 9223372036854775e3) | 0), g = new Mario.ImprovedNoise((Math.random() * 9223372036854775e3) | 0);
		this.Level = [];
		this.Data = [];
		for (var h = Math.random() * 512, i = Math.random() * 512, j = Math.random() * 512, k = Math.random() * 512, a = 0; a < 21; a++) {
			this.Level[a] = [];
			this.Data[a] = [];
			for (b = 0; b < 16; b++)
				(c = d.PerlinNoise(a * 10 + h, b * 10 + i)),
					(e = f.PerlinNoise(a * 10 + j, b * 10 + k)),
					(c -= e),
					(c *= 2),
					(this.Level[a][b] =
						c > 0 ? MapTile.Water : MapTile.Grass);
		}
		f = d = 9999;
		for (j = c = j = 0; j < 100 && c < 12; j++)
			if (((a = ((Math.random() * ((20 / 3) | 0)) | 0) * 3 + 2),
				(b = ((Math.random() * 5) | 0) * 3 + 1),
				this.Level[a][b] === MapTile.Grass))
				a < d && ((d = a), (f = b)),
					(this.Level[a][b] = MapTile.Level),
					(this.Data[a][b] = -1),
					c++;
		this.Data[d][f] = -2;
		for (a = !0; a;)
			a = this.FindConnection(21, 16);
		this.FindCaps(21, 16);
		if (this.XFarthestCap === 0)
			return !1;
		this.Data[this.XFarthestCap][this.YFarthestCap] = -2;
		this.Data[(this.XMario / 16) | 0][(this.YMario / 16) | 0] = -11;
		for (a = 0; a < 21; a++)
			for (b = 0; b < 16; b++)
				if (this.Level[a][b] === MapTile.Grass &&
					(a !== this.XFarthestCap || b !== this.YFarthestCap - 1))
					if (((c = g.PerlinNoise(a * 10 + h, b * 10 + i)), c > 0))
						this.Level[a][b] = MapTile.Decoration;
		return !0;
	}
	FindConnection(a, b) {
		for (var c = 0, e = 0, c = 0; c < a; c++)
			for (e = 0; e < b; e++)
				if (this.Level[c][e] === MapTile.Level &&
					this.Data[c][e] === -1)
					return this.Connect(c, e, a, b), !0;
		return !1;
	}
	Connect(a, b, c, e) {
		for (var d = 1e4, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, h = (j = 0); h < c; h++)
			for (i = 0; i < e; i++)
				this.Level[h][i] === MapTile.Level &&
					this.Data[h][i] === -2 &&
					((j = Math.abs(a - h) | 0),
						(k = Math.abs(b - i) | 0),
						(j = j * j + k * k),
						j < d && ((f = h), (g = i), (d = j)));
		this.DrawRoad(a, b, f, g);
		this.Level[a][b] = MapTile.Level;
		this.Data[a][b] = -2;
	}
	DrawRoad(a, b, c, e) {
		var d = !1;
		Math.random() > 0.5 && (d = !0);
		if (d) {
			for (; a > c;)
				(this.Data[a][b] = 0), (this.Level[a--][b] = MapTile.Road);
			for (; a < c;)
				(this.Data[a][b] = 0), (this.Level[a++][b] = MapTile.Road);
		}
		for (; b > e;)
			(this.Data[a][b] = 0), (this.Level[a][b--] = MapTile.Road);
		for (; b < e;)
			(this.Data[a][b] = 0), (this.Level[a][b++] = MapTile.Road);
		if (!d) {
			for (; a > c;)
				(this.Data[a][b] = 0), (this.Level[a--][b] = MapTile.Road);
			for (; a < c;)
				(this.Data[a][b] = 0), (this.Level[a++][b] = MapTile.Road);
		}
	}
	FindCaps(a, b) {
		for (var c = 0, e = 0, d = -1, f = -1, g = 0, h = 0, i = 0, c = 0; c < a; c++)
			for (e = 0; e < b; e++)
				if (this.Level[c][e] === MapTile.Level) {
					g = 0;
					for (h = c - 1; h <= c + 1; h++)
						for (i = e - 1; i <= e + 1; i++)
							this.Level[h][i] === MapTile.Road && g++;
					g === 1
						? (d === -1 && ((d = c), (f = e)), (this.Data[c][e] = 0))
						: (this.Data[c][e] = 1);
				}
		this.XMario = d * 16;
		this.YMario = f * 16;
		this.Travel(d, f, -1, 0);
	}
	Travel(a, b, c, e) {
		if (!(
			this.Level[a][b] !== MapTile.Road &&
			this.Level[a][b] !== MapTile.Level
		)) {
			if (this.Level[a][b] === MapTile.Road)
				if (this.Data[a][b] === 1)
					return;

				else
					this.Data[a][b] = 1;
			if (this.Level[a][b] === MapTile.Level)
				if (this.Data[a][b] > 0)
					this.Data[a][b] =
						this.LevelId !== 0 && ((Math.random() * 4) | 0) === 0
							? -3
							: ++this.LevelId;
				else if (e > 0 && ((this.Data[a][b] = -1), e > this.Farthest))
					(this.Farthest = e),
						(this.XFarthestCap = a),
						(this.YFarthestCap = b);
			c !== 2 && this.Travel(a - 1, b, 0, e++);
			c !== 3 && this.Travel(a, b - 1, 1, e++);
			c !== 0 && this.Travel(a + 1, b, 2, e++);
			c !== 1 && this.Travel(a, b + 1, 3, e++);
		}
	}
	RenderStatic() {
		for (var a = 0, b = 0, c = 0, e = 0, d = 0, f = 0, g = (c = 0), h = 0, i = Enjine.Resources.Images.worldMap, a = (g = 0); a < 20; a++)
			for (b = 0; b < 15; b++)
				if ((this.MapContext.drawImage(
					i,
					((this.WorldNumber / 4) | 0) * 16,
					0,
					16,
					16,
					a * 16,
					b * 16,
					16,
					16
				),
					this.Level[a][b] === MapTile.Level))
					(g = this.Data[a][b]),
						g === 0
							? this.MapContext.drawImage(
								i,
								0,
								112,
								16,
								16,
								a * 16,
								b * 16,
								16,
								16
							)
							: g === -1
								? this.MapContext.drawImage(
									i,
									48,
									128,
									16,
									16,
									a * 16,
									b * 16,
									16,
									16
								)
								: g === -3
									? this.MapContext.drawImage(
										i,
										0,
										128,
										16,
										16,
										a * 16,
										b * 16,
										16,
										16
									)
									: g === -10
										? this.MapContext.drawImage(
											i,
											16,
											128,
											16,
											16,
											a * 16,
											b * 16,
											16,
											16
										)
										: g === -11
											? this.MapContext.drawImage(
												i,
												16,
												112,
												16,
												16,
												a * 16,
												b * 16,
												16,
												16
											)
											: g === -2
												? (this.MapContext.drawImage(
													i,
													32,
													112,
													16,
													16,
													a * 16,
													(b - 1) * 16,
													16,
													16
												),
													this.MapContext.drawImage(
														i,
														32,
														128,
														16,
														16,
														a * 16,
														b * 16,
														16,
														16
													))
												: this.MapContext.drawImage(
													i,
													(g - 1) * 16,
													96,
													16,
													16,
													a * 16,
													b * 16,
													16,
													16
												);
				else if (this.Level[a][b] === MapTile.Road)
					(c = this.IsRoad(a - 1, b) ? 1 : 0),
						(e = this.IsRoad(a, b - 1) ? 1 : 0),
						(d = this.IsRoad(a + 1, b) ? 1 : 0),
						(f = this.IsRoad(a, b + 1) ? 1 : 0),
						(c = c + e * 2 + d * 4 + f * 8),
						this.MapContext.drawImage(
							i,
							c * 16,
							32,
							16,
							16,
							a * 16,
							b * 16,
							16,
							16
						);
				else if (this.Level[a][b] === MapTile.Water)
					for (g = 0; g < 2; g++)
						for (h = 0; h < 2; h++)
							(c = this.IsWater(a * 2 + (g - 1), b * 2 + (h - 1)) ? 0 : 1),
								(e = this.IsWater(a * 2 + g, b * 2 + (h - 1)) ? 0 : 1),
								(d = this.IsWater(a * 2 + (g - 1), b * 2 + h) ? 0 : 1),
								(f = this.IsWater(a * 2 + g, b * 2 + h) ? 0 : 1),
								(c = c + e * 2 + d * 4 + f * 8 - 1),
								c >= 0 &&
								c <= 14 &&
								this.MapContext.drawImage(
									i,
									c * 16,
									(4 + ((g + h) & 1)) * 16,
									16,
									16,
									a * 16 + g * 8,
									b * 16 + h * 8,
									16,
									16
								);
	}
	IsRoad(a, b) {
		a < 0 && (a = 0);
		b < 0 && (b = 0);
		if (this.Level[a][b] === MapTile.Road)
			return !0;
		if (this.Level[a][b] === MapTile.Level)
			return !0;
		return !1;
	}
	IsWater(a, b) {
		var c = 0, e = 0;
		a < 0 && (a = 0);
		b < 0 && (b = 0);
		for (c = 0; c < 2; c++)
			for (e = 0; e < 2; e++)
				if (this.Level[((a + c) / 2) | 0][((b + e) / 2) | 0] !==
					MapTile.Water)
					return !1;
		return !0;
	}
	Update(a) {
		var b = 0, c = 0, e = 0, d = 0;
		if (this.WorldNumber !== 8) {
			this.XMario += this.XMarioA;
			this.YMario += this.YMarioA;
			b = (this.XMario / 16) | 0;
			c = (this.YMario / 16) | 0;
			this.Level[b][c] === MapTile.Road && (this.Data[b][c] = 0);
			if (this.MoveTime > 0)
				this.MoveTime--;
			else {
				this.YMarioA = this.XMarioA = 0;
				if (this.CanEnterLevel &&
					Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) &&
					this.Level[b][c] === MapTile.Level &&
					this.Data[b][c] !== -11 &&
					this.Level[b][c] === MapTile.Level &&
					this.Data[b][c] !== 0 &&
					this.Data[b][c] > -10) {
					e = this.WorldNumber + 1;
					Mario.MarioCharacter.LevelString = e + "-";
					d = LevelType.Overground;
					if (this.Data[b][c] > 1 && ((Math.random() * 3) | 0) === 0)
						d = LevelType.Underground;
					this.Data[b][c] < 0
						? (this.Data[b][c] === -2
							? ((Mario.MarioCharacter.LevelString += "X"), (e += 2))
							: this.Data[b][c] === -1
								? (Mario.MarioCharacter.LevelString += "?")
								: ((Mario.MarioCharacter.LevelString += "#"), (e += 1)),
							(d = LevelType.Castle))
						: (Mario.MarioCharacter.LevelString += this.Data[b][c]);
					this.EnterLevel = !0;
					this.LevelDifficulty = e;
					this.LevelType = d;
				}
				this.CanEnterLevel = !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Left) &&
					this.TryWalking(-1, 0);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Right) &&
					this.TryWalking(1, 0);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Up) &&
					this.TryWalking(0, -1);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Down) &&
					this.TryWalking(0, 1);
			}
			this.WaterSprite.Update(a);
			this.DecoSprite.Update(a);
			this.HelpSprite.Update(a);
			Mario.MarioCharacter.Large
				? ((this.LargeMario.X = (this.XMario + this.XMarioA * a) | 0),
					(this.LargeMario.Y = this.YMario + ((this.YMarioA * a) | 0) - 22),
					this.LargeMario.Update(a))
				: ((this.SmallMario.X = (this.XMario + this.XMarioA * a) | 0),
					(this.SmallMario.Y = this.YMario + ((this.YMarioA * a) | 0) - 6),
					this.SmallMario.Update(a));
		}
	}
	TryWalking(a, b) {
		var c = (this.XMario / 16) | 0, e = (this.YMario / 16) | 0, d = c + a, f = e + b;
		if ((this.Level[d][f] === MapTile.Road ||
			this.Level[d][f] === MapTile.Level) &&
			!(
				this.Level[d][f] === MapTile.Road &&
				this.Data[d][f] !== 0 &&
				this.Data[c][e] !== 0 &&
				this.Data[c][e] > -10
			))
			(this.XMarioA = a * 8),
				(this.YMarioA = b * 8),
				(this.MoveTime = this.CalcDistance(c, e, a, b) * 2 + 1);
	}
	CalcDistance(a, b, c, e) {
		for (var d = 0; ;) {
			a += c;
			b += e;
			if (this.Level[a][b] !== MapTile.Road)
				return d;
			if (this.Level[a - e][b + c] === MapTile.Road)
				return d;
			if (this.Level[a + e][b - c] === MapTile.Road)
				return d;
			d++;
		}
	}
	Draw(a) {
		var b = 0, c = 0;
		if (this.WorldNumber !== 8) {
			a.drawImage(this.MapImage, 0, 0);
			for (c = 0; c <= 15; c++)
				for (b = 20; b >= 0; b--)
					if (this.Level[b][c] === MapTile.Water) {
						if (this.IsWater(b * 2 - 1, c * 2 - 1))
							(this.WaterSprite.X = b * 16 - 8),
								(this.WaterSprite.Y = c * 16 - 8),
								this.WaterSprite.Draw(a, this.camera);
					} else if (this.Level[b][c] === MapTile.Decoration)
						(this.DecoSprite.X = b * 16),
							(this.DecoSprite.Y = c * 16),
							this.DecoSprite.Draw(a, this.camera);
					else if (this.Level[b][c] === MapTile.Level &&
						this.Data[b][c] === -2)
						(this.HelpSprite.X = b * 16 + 16),
							(this.HelpSprite.Y = c * 16 - 16),
							this.HelpSprite.Draw(a, this.camera);
			Mario.MarioCharacter.Large
				? this.LargeMario.Draw(a, this.camera)
				: this.SmallMario.Draw(a, this.camera);
			this.Font.Strings[0] = {
				String: "MARIO " + Mario.MarioCharacter.Lives,
				X: 4,
				Y: 4,
			};
			this.FontShadow.Strings[0] = {
				String: "MARIO " + Mario.MarioCharacter.Lives,
				X: 5,
				Y: 5,
			};
			this.Font.Strings[1] = {
				String: "WORLD " + (this.WorldNumber + 1),
				X: 256,
				Y: 4,
			};
			this.FontShadow.Strings[1] = {
				String: "WORLD " + (this.WorldNumber + 1),
				X: 257,
				Y: 5,
			};
			this.FontShadow.Draw(a, this.camera);
			this.Font.Draw(a, this.camera);
		}
	}
	LevelWon() {
		var a = this.XMario / 16, b = this.YMario / 16;
		this.Data[a][b] === -2
			? this.NextWorld()
			: ((this.Data[a][b] = this.Data[a][b] !== -3 ? 0 : -10),
				this.RenderStatic());
	}
	GetX() {
		return 160;
	}
	GetY() {
		return 120;
	}
	CheckForChange(a) {
		this.WorldNumber === 8 && a.ChangeState(new WinState());
		this.EnterLevel &&
			a.ChangeState(
				new LevelState(this.LevelDifficulty, this.LevelType)
			);
	}
}
