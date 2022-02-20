import { BackgroundGenerator } from "./BackgroundGenerator.js";
import { BackgroundRenderer } from "./BackgroundRenderer.js";
import { BulletBill } from "./BulletBill.js";
import { Character } from "./Character.js";
import { CoinAnim } from "./CoinAnim.js";
import { Enemy } from "./Enemy.js";
import { Fireball } from "./Fireball.js";
import { FireFlower } from "./FireFlower.js";
import { FlowerEnemy } from "./FlowerEnemy.js";
import { ImprovedNoise } from "./ImprovedNoise.js";
import { Level } from "./Level.js";
import { LevelGenerator } from "./LevelGenerator.js";
import { LevelRenderer } from "./LevelRenderer.js";
import { LevelState } from "./LevelState.js";
import { LevelType, LT } from "./LevelType.js";
import { LoadingState } from "./LoadingState.js";
import { LoseState } from "./LoseState.js";
import { MapState } from "./MapState.js";
import { MapTile, MT } from "./MapTile.js";
import { Mushroom } from "./Mushroom.js";
import { NotchSprite } from "./NotchSprite.js";
import { ODDS, Odds } from "./Odds.js";
import { Particle } from "./Particle.js";
import { Shell } from "./Shell.js";
import { Sparkle } from "./Sparkle.js";
import { SC, SpriteCuts } from "./SpriteCuts.js";
import { SpriteTemplate } from "./SpriteTemplate.js";
import { TILE, Tile } from "./Tile.js";
import { TitleState } from "./TitleState.js";
import { WinState } from "./WinState.js";

interface MARIO {
  SpriteCuts: SC;
  Tile: TILE;
  LevelType: LT;
  Odds: ODDS;
  MapTile: MT;
  Level: typeof Level;
  BackgroundGenerator: typeof BackgroundGenerator;
  BackgroundRenderer: typeof BackgroundRenderer;
  ImprovedNoise: typeof ImprovedNoise;
  NotchSprite: typeof NotchSprite;
  Character: typeof Character;
  LevelRenderer: typeof LevelRenderer;
  LevelGenerator: typeof LevelGenerator;
  SpriteTemplate: typeof SpriteTemplate;
  Enemy: typeof Enemy;
  Fireball: typeof Fireball;
  Sparkle: typeof Sparkle;
  CoinAnim: typeof CoinAnim;
  Mushroom: typeof Mushroom;
  Particle: typeof Particle;
  FireFlower: typeof FireFlower;
  BulletBill: typeof BulletBill;
  FlowerEnemy: typeof FlowerEnemy;
  Shell: typeof Shell;
  TitleState: typeof TitleState;
  LoadingState: typeof LoadingState;
  LoseState: typeof LoseState;
  WinState: typeof WinState;
  MapState: typeof MapState;
  LevelState: typeof LevelState;
  GlobalMapState: MapState;
  MarioCharacter: Character;
}

const Mario: MARIO = {} as MARIO;
Mario.SpriteCuts = SpriteCuts;
Mario.Tile = Tile;
Mario.LevelType = LevelType;
Mario.Odds = Odds;
Mario.MapTile = MapTile;
Mario.Level = Level;
Mario.BackgroundGenerator = BackgroundGenerator;
Mario.BackgroundRenderer = BackgroundRenderer;
Mario.ImprovedNoise = ImprovedNoise;
Mario.NotchSprite = NotchSprite;
Mario.Character = Character;
Mario.LevelRenderer = LevelRenderer;
Mario.LevelGenerator = LevelGenerator;
Mario.SpriteTemplate = SpriteTemplate;
Mario.Enemy = Enemy;
Mario.Fireball = Fireball;
Mario.Sparkle = Sparkle;
Mario.CoinAnim = CoinAnim;
Mario.Mushroom = Mushroom;
Mario.Particle = Particle;
Mario.FireFlower = FireFlower;
Mario.BulletBill = BulletBill;
Mario.FlowerEnemy = FlowerEnemy;
Mario.Shell = Shell;
Mario.TitleState = TitleState;
Mario.LoadingState = LoadingState;
Mario.LoseState = LoseState;
Mario.WinState = WinState;
Mario.MapState = MapState;
Mario.LevelState = LevelState;
Mario.GlobalMapState = null as unknown as MapState;
Mario.MarioCharacter = null as unknown as Character;

export default Mario;
