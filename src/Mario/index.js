import BackgroundGenerator from "./BackgroundGenerator.js";
import BackgroundRenderer from "./BackgroundRenderer.js";
import BulletBill from "./BulletBill.js";
import Character from "./Character.js";
import CoinAnim from "./CoinAnim.js";
import Enemy from "./Enemy.js";
import Fireball from "./Fireball.js";
import FireFlower from "./FireFlower.js";
import FlowerEnemy from "./FlowerEnemy.js";
import ImprovedNoise from "./ImprovedNoise.js";
import Level from "./Level.js";
import LevelGenerator from "./LevelGenerator.js";
import LevelRenderer from "./LevelRenderer.js";
import LevelState from "./LevelState.js";
import LevelType from "./LevelType.js";
import LoadingState from "./LoadingState.js";
import LoseState from "./LoseState.js";
import MapState from "./MapState.js";
import MapTile from "./MapTile.js";
import Mushroom from "./Mushroom.js";
import NotchSprite from "./NotchSprite.js";
import Odds from "./Odds.js";
import Particle from "./Particle.js";
import Shell from "./Shell.js";
import Sparkle from "./Sparkle.js";
import SpriteCuts from "./SpriteCuts.js";
import SpriteTemplate from "./SpriteTemplate.js";
import Tile from "./Tile.js";
import TitleState from "./TitleState.js";
import WinState from "./WinState.js";

export default new class {
	SpriteCuts = SpriteCuts;
	Tile = Tile;
	LevelType = LevelType;
	Odds = Odds;
	Level = Level;
	BackgroundGenerator = BackgroundGenerator;
	BackgroundRenderer = BackgroundRenderer;
	ImprovedNoise = ImprovedNoise;
	NotchSprite = NotchSprite;
	Character = Character;
	LevelRenderer = LevelRenderer;
	LevelGenerator = LevelGenerator;
	SpriteTemplate = SpriteTemplate;
	Enemy = Enemy;
	Fireball = Fireball;
	Sparkle = Sparkle;
	CoinAnim = CoinAnim;
	Mushroom = Mushroom;
	Particle = Particle;
	FireFlower = FireFlower;
	BulletBill = BulletBill;
	FlowerEnemy = FlowerEnemy;
	Shell = Shell;
	TitleState = TitleState;
	LoadingState = LoadingState;
	LoseState = LoseState;
	WinState = WinState;
	MapTile = MapTile;
	MapState = MapState;
	LevelState = LevelState;
	/**@type {Character} */
	MarioCharacter = null;
	/**@type {MapState} */
	GlobalMapState = null;
}();