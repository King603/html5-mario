import * as Enjine from "../Enjine/index.js";
import { ImprovedNoise } from "./ImprovedNoise.js";
import Mario from "./index.js";
import { LevelState } from "./LevelState.js";
import { LevelType } from "./LevelType.js";
import { MapTile } from "./MapTile.js";
import { SpriteCuts } from "./SpriteCuts.js";
import { WinState } from "./WinState.js";

export class MapState extends Enjine.GameState {
	constructor() {
		super();
		this.camera = new Enjine.Camera();
		this.Level = [];
		this.Data = [];
		this.YFarthestCap = this.XFarthestCap = this.Farthest = this.LevelId = this.MoveTime = this.YMarioA = this.XMarioA = this.YMario = this.XMario = 0;
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
		this.HelpSprite.FramesPerSecond = .5;
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
		this.DecoSprite.PlaySequence("world" + this.WorldNumber % 4, !0);
		this.LargeMario.PlaySequence(Mario.MarioCharacter.Fire ? "fire" : "large", !0);
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
		let a = !1;
		if (++this.WorldNumber !== 8) {
			for (this.YFarthestCap = this.XFarthestCap = this.Farthest = this.LevelId = this.MoveTime = 0; !a;)
				a = this.GenerateLevel();
			this.RenderStatic();
		}
	}
	GenerateLevel() {
		let num = 9223372036854775E3,
			d = new ImprovedNoise(Math.random() * num | 0),
			f = new ImprovedNoise(Math.random() * num | 0),
			g = new ImprovedNoise(Math.random() * num | 0);
		this.Level = [];
		this.Data = [];
		let h = Math.random() * 512, i = Math.random() * 512, j = Math.random() * 512, k = Math.random() * 512;
		for (let i = 0; i < 21; i++) {
			this.Level[i] = [];
			this.Data[i] = [];
			for (let b = 0; b < 16; b++) {
				let c = d.PerlinNoise(i * 10 + h, b * 10 + i);
				let e = f.PerlinNoise(i * 10 + j, b * 10 + k);
				c -= e;
				c *= 2;
				this.Level[i][b] = c > 0 ? MapTile.Water : MapTile.Grass;
			}
		}
		f = d = 9999;
		for (let c = 0, j = 0; j < 100 && c < 12; j++) {
			let a = (Math.random() * (20 / 3 | 0) | 0) * 3 + 2;
			let b = (Math.random() * 5 | 0) * 3 + 1;
			if (this.Level[a][b] === MapTile.Grass) {
				a < d && (d = a, f = b);
				this.Level[a][b] = MapTile.Level;
				this.Data[a][b] = -1;
				c++;
			}
		}
		this.Data[d][f] = -2;
		for (let bool = !0; bool;)
			bool = this.FindConnection(21, 16);
		this.FindCaps(21, 16);
		if (this.XFarthestCap === 0)
			return !1;
		this.Data[this.XFarthestCap][this.YFarthestCap] = -2;
		this.Data[this.XMario / 16 | 0][this.YMario / 16 | 0] = -11;
		for (let x = 0; x < 21; x++)
			for (let y = 0; y < 16; y++)
				if (this.Level[x][y] === MapTile.Grass && (x !== this.XFarthestCap || y !== this.YFarthestCap - 1)) {
					let c = g.PerlinNoise(x * 10 + h, y * 10 + i);
					if (c > 0)
						this.Level[x][y] = MapTile.Decoration;
				}
		return !0;
	}
	FindConnection(width, height) {
		for (let x = 0; x < width; x++)
			for (let y = 0; y < height; y++)
				if (this.Level[x][y] === MapTile.Level && this.Data[x][y] === -1) {
					this.Connect(x, y, width, height);
					return !0;
				}
		return !1;
	}
	Connect(X, Y, width, height) {
		let d = 1E4, x1 = 0, y1 = 0;
		for (let x = 0; x < width; x++)
			for (let y = 0; y < height; y++)
				if (this.Level[x][y] === MapTile.Level && this.Data[x][y] === -2) {
					let j = Math.abs(X - x) | 0;
					let k = Math.abs(Y - y) | 0;
					j = j * j + k * k;
					if (j < d) {
						x1 = x;
						y1 = y;
						d = j;
					}
				}
		this.DrawRoad(X, Y, x1, y1);
		this.Level[X][Y] = MapTile.Level;
		this.Data[X][Y] = -2;
	}
	DrawRoad(x1, y1, x2, y2) {
		let d = !1;
		Math.random() > .5 && (d = !0);
		if (d) {
			while (x1 > x2) {
				this.Data[x1][y1] = 0;
				this.Level[x1--][y1] = MapTile.Road;
			}
			while (x1 < x2) {
				this.Data[x1][y1] = 0;
				this.Level[x1++][y1] = MapTile.Road;
			}
		}
		while (y1 > y2) {
			this.Data[x1][y1] = 0;
			this.Level[x1][y1--] = MapTile.Road;
		}
		while (y1 < y2) {
			this.Data[x1][y1] = 0;
			this.Level[x1][y1++] = MapTile.Road;
		}
		if (!d) {
			while (x1 > x2) {
				this.Data[x1][y1] = 0;
				this.Level[x1--][y1] = MapTile.Road;
			}
			while (x1 < x2) {
				this.Data[x1][y1] = 0;
				this.Level[x1++][y1] = MapTile.Road;
			}
		}
	}
	FindCaps(width, height) {
		let d = -1, f = -1;
		for (let x = 0; x < width; x++)
			for (let y = 0; y < height; y++)
				if (this.Level[x][y] === MapTile.Level) {
					let g = 0;
					for (let sizeX = x - 1; sizeX <= x + 1; sizeX++)
						for (let sizeY = y - 1; sizeY <= y + 1; sizeY++)
							if (this.Level[sizeX][sizeY] === MapTile.Road)
								g++;
					if (g === 1) {
						if (d === -1) {
							d = x;
							f = y;
						}
						this.Data[x][y] = 0;
					} else
						this.Data[x][y] = 1;
				} this.XMario = d * 16;
		this.YMario = f * 16;
		this.Travel(d, f, -1, 0);
	}
	Travel(x, y, c, e) {
		if (!(this.Level[x][y] !== MapTile.Road && this.Level[x][y] !== MapTile.Level)) {
			if (this.Level[x][y] === MapTile.Road)
				if (this.Data[x][y] === 1)
					return;

				else
					this.Data[x][y] = 1;
			if (this.Level[x][y] === MapTile.Level)
				if (this.Data[x][y] > 0)
					this.Data[x][y] = this.LevelId !== 0 && (Math.random() * 4 | 0) === 0 ? -3 : ++this.LevelId;
				else if (e > 0 && (this.Data[x][y] = -1, e > this.Farthest)) {
					this.Farthest = e;
					this.XFarthestCap = x;
					this.YFarthestCap = y;
				}
			c !== 2 && this.Travel(x - 1, y, 0, e++);
			c !== 3 && this.Travel(x, y - 1, 1, e++);
			c !== 0 && this.Travel(x + 1, y, 2, e++);
			c !== 1 && this.Travel(x, y + 1, 3, e++);
		}
	}
	RenderStatic() {
		let map = Enjine.Resources.Images.worldMap;
		let { Level, Road, Water } = MapTile;
		for (let x = 0; x < 20; x++)
			for (let y = 0; y < 15; y++) {
				this.MapContext.drawImage(map, (this.WorldNumber / 4 | 0) * 16, 0, 16, 16, x * 16, y * 16, 16, 16);
				switch (this.Level[x][y]) {
					case Level:
						let g = this.Data[x][y];
						switch (g) {
							case 0:
								this.MapContext.drawImage(map, 0, 112, 16, 16, x * 16, y * 16, 16, 16);
								break;
							case -1:
								this.MapContext.drawImage(map, 48, 128, 16, 16, x * 16, y * 16, 16, 16);
								break;
							case -3:
								this.MapContext.drawImage(map, 0, 128, 16, 16, x * 16, y * 16, 16, 16);
								break;
							case -10:
								this.MapContext.drawImage(map, 16, 128, 16, 16, x * 16, y * 16, 16, 16);
								break;
							case -11:
								this.MapContext.drawImage(map, 16, 112, 16, 16, x * 16, y * 16, 16, 16);
								break;
							case -2:
								this.MapContext.drawImage(map, 32, 112, 16, 16, x * 16, (y - 1) * 16, 16, 16);
								this.MapContext.drawImage(map, 32, 128, 16, 16, x * 16, y * 16, 16, 16);
								break;
							default: this.MapContext.drawImage(map, (g - 1) * 16, 96, 16, 16, x * 16, y * 16, 16, 16);
						}
						break;
					case Road:
						let c = this.IsRoad(x - 1, y) ? 1 : 0;
						c += (this.IsRoad(x, y - 1) ? 1 : 0) * 2 + (this.IsRoad(x + 1, y) ? 1 : 0) * 4 + (this.IsRoad(x, y + 1) ? 1 : 0) * 8;
						this.MapContext.drawImage(map, c * 16, 32, 16, 16, x * 16, y * 16, 16, 16);
						break;
					case Water:
						for (let g = 0; g < 2; g++)
							for (let h = 0; h < 2; h++) {
								let c = this.IsWater(x * 2 + (g - 1), y * 2 + (h - 1)) ? 0 : 1;
								c += (this.IsWater(x * 2 + g, y * 2 + (h - 1)) ? 0 : 1) * 2 + (this.IsWater(x * 2 + (g - 1), y * 2 + h) ? 0 : 1) * 4 + (this.IsWater(x * 2 + g, y * 2 + h) ? 0 : 1) * 8 - 1;
								c >= 0 && c <= 14 && this.MapContext.drawImage(map, c * 16, (4 + (g + h & 1)) * 16, 16, 16, x * 16 + g * 8, y * 16 + h * 8, 16, 16);
							}
						break;
				}
			}
	}
	IsRoad(x, y) {
		x = Math.max(x, 0);
		y = Math.max(y, 0);
		return this.Level[x][y] === MapTile.Road || this.Level[x][y] === MapTile.Level;
	}
	IsWater(x, y) {
		x = Math.max(x, 0);
		y = Math.max(y, 0);
		for (let i = 0; i < 2; i++)
			for (let j = 0; j < 2; j++)
				if (this.Level[(x + i) / 2 | 0][(y + j) / 2 | 0] !== MapTile.Water)
					return !1;
		return !0;
	}
	Update(sprite) {
		if (this.WorldNumber !== 8) {
			this.XMario += this.XMarioA;
			this.YMario += this.YMarioA;
			let x = this.XMario / 16 | 0;
			let y = this.YMario / 16 | 0;
			this.Level[x][y] === MapTile.Road && (this.Data[x][y] = 0);
			if (this.MoveTime > 0)
				this.MoveTime--;
			else {
				this.YMarioA = this.XMarioA = 0;
				if (this.CanEnterLevel && Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) && this.Level[x][y] === MapTile.Level && this.Data[x][y] !== -11 && this.Level[x][y] === MapTile.Level && this.Data[x][y] !== 0 && this.Data[x][y] > -10) {
					let difficulty = this.WorldNumber + 1;
					Mario.MarioCharacter.LevelString = difficulty + "-";
					let type = LevelType.Overground;
					if (this.Data[x][y] > 1 && (Math.random() * 3 | 0) === 0)
						type = LevelType.Underground;
					this.Data[x][y] < 0 ? (this.Data[x][y] === -2 ? (Mario.MarioCharacter.LevelString += "X", difficulty += 2) : this.Data[x][y] === -1 ? Mario.MarioCharacter.LevelString += "?" : (Mario.MarioCharacter.LevelString += "#", difficulty += 1), type = LevelType.Castle) : Mario.MarioCharacter.LevelString += this.Data[x][y];
					this.EnterLevel = !0;
					this.LevelDifficulty = difficulty;
					this.LevelType = type;
				}
				this.CanEnterLevel = !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Left) && this.TryWalking(-1, 0);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Right) && this.TryWalking(1, 0);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Up) && this.TryWalking(0, -1);
				Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Down) && this.TryWalking(0, 1);
			}
			this.WaterSprite.Update(sprite);
			this.DecoSprite.Update(sprite);
			this.HelpSprite.Update(sprite);
			let mario = `${Mario.MarioCharacter.Large ? "Large" : "Small"}Mario`;
			this[mario].X = this.XMario + this.XMarioA * sprite | 0;
			this[mario].Y = this.YMario + (this.YMarioA * sprite | 0) - (Mario.MarioCharacter.Large ? 22 : 6);
			this[mario].Update(sprite);
		}
	}
	TryWalking(moveX, moveY) {
		let x = this.XMario / 16 | 0, y = this.YMario / 16 | 0, toX = x + moveX, toY = y + moveY;
		if ((this.Level[toX][toY] === MapTile.Road || this.Level[toX][toY] === MapTile.Level) && !(this.Level[toX][toY] === MapTile.Road && this.Data[toX][toY] !== 0 && this.Data[x][y] !== 0 && this.Data[x][y] > -10)) {
			this.XMarioA = moveX * 8;
			this.YMarioA = moveY * 8;
			this.MoveTime = this.CalcDistance(x, y, moveX, moveY) * 2 + 1;
		}
	}
	CalcDistance(x, y, moveX, moveY) {
		for (let d = 0; true; d++) {
			x += moveX;
			y += moveY;
			if (this.Level[x][y] !== MapTile.Road ||
				this.Level[x - moveY][y + moveX] === MapTile.Road ||
				this.Level[x + moveY][y - moveX] === MapTile.Road)
				return d;
		}
	}
	Draw(a) {
		if (this.WorldNumber !== 8) {
			a.drawImage(this.MapImage, 0, 0);
			for (let c = 0; c <= 15; c++)
				for (let b = 20; b >= 0; b--) {
					let { Water, Decoration, Level } = MapTile;
					switch (this.Level[b][c]) {
						case Water:
							if (this.IsWater(b * 2 - 1, c * 2 - 1))
								setSprite(this.WaterSprite, -8, -8, this.camera);
							break;
						case Decoration:
							setSprite(this.DecoSprite, 0, 0, this.camera);
							break;
						case Level:
							if (this.Data[b][c] === -2)
								setSprite(this.HelpSprite, 16, -16, this.camera);
							break;
					}
					function setSprite(sprite, n1, n2, camera) {
						sprite.X = b * 16 + n1;
						sprite.Y = c * 16 + n2;
						sprite.Draw(a, camera);
					}
				}
			Mario.MarioCharacter.Large ? this.LargeMario.Draw(a, this.camera) : this.SmallMario.Draw(a, this.camera);
			this.FontShadow.Strings[0] = { String: "MARIO " + Mario.MarioCharacter.Lives, X: 5, Y: 5 };
			this.FontShadow.Strings[1] = { String: "WORLD " + (this.WorldNumber + 1), X: 257, Y: 5 };
			this.FontShadow.Draw(a, this.camera);
			this.Font.Strings[0] = { String: "MARIO " + Mario.MarioCharacter.Lives, X: 4, Y: 4 };
			this.Font.Strings[1] = { String: "WORLD " + (this.WorldNumber + 1), X: 256, Y: 4 };
			this.Font.Draw(a, this.camera);
		}
	}
	LevelWon() {
		let a = this.XMario / 16, b = this.YMario / 16;
		if (this.Data[a][b] === -2)
			this.NextWorld();
		else {
			this.Data[a][b] = this.Data[a][b] !== -3 ? 0 : -10;
			this.RenderStatic();
		}
	}
	GetX() {
		return 160;
	}
	GetY() {
		return 120;
	}
	CheckForChange(a) {
		if (this.WorldNumber === 8)
			a.ChangeState(new WinState());
		if (this.EnterLevel)
			a.ChangeState(new LevelState(this.LevelDifficulty, this.LevelType));
	}
}
