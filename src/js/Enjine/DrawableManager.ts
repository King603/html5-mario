import { BackgroundRenderer } from "../Mario/BackgroundRenderer.js";
import { BulletBill } from "../Mario/BulletBill.js";
import { Character } from "../Mario/Character.js";
import { CoinAnim } from "../Mario/CoinAnim.js";
import { Enemy } from "../Mario/Enemy.js";
import { Fireball } from "../Mario/Fireball.js";
import { Mushroom } from "../Mario/Mushroom.js";
import { Shell } from "../Mario/Shell.js";
import { Sparkle } from "../Mario/Sparkle.js";
import { AnimatedSprite } from "./AnimatedSprite.js";
import { Camera } from "./Camera.js";
import { SpriteFont } from "./SpriteFont.js";

export type ELE = Fireball | Character | Enemy | Sparkle | CoinAnim | Mushroom | BulletBill | Shell;

export class DrawableManager {
	Unsorted = !0;
	Objects: (ELE | any)[] = [];
	Add(element: ELE | SpriteFont | BackgroundRenderer | AnimatedSprite) {
		this.Objects.push(element);
		this.Unsorted = !0;
	}
	AddRange(element: ELE[]) {
		this.Objects = this.Objects.concat(element);
		this.Unsorted = !0;
	}
	Clear() {
		this.Objects.splice(0, this.Objects.length);
	}
	Contains(element: ELE) {
		for (let index = this.Objects.length; index--;)
			if (this.Objects[index] === element)
				return !0;
		return !1;
	}
	Remove(element: ELE) {
		this.Objects.splice(this.Objects.indexOf(element), 1);
	}
	RemoveAt(start: number) {
		this.Objects.splice(start, 1);
	}
	RemoveRange(start: number, deleteCount: number) {
		this.Objects.splice(start, deleteCount);
	}
	RemoveList(arr: ELE[]) {
		for (let i = 0; i < arr.length;) {
			this.Objects.forEach((obj, j) => {
				if (obj === arr[i]) {
					this.Objects.splice(j, 1);
					arr.splice(i--, 1);
					return;
				}
			});
		}
	}
	Update(element: number) {
		this.Objects.forEach(Obj => (Obj as ELE).Update && (Obj as ELE).Update(element));
	}
	Draw(a: CanvasRenderingContext2D, b: Camera) {
		if (this.Unsorted) {
			this.Unsorted = !1;
			this.Objects.sort((a, b) => a.ZOrder - b.ZOrder);
		}
		this.Objects.forEach(Obj => Obj.Draw && Obj.Draw(a, b));
	}
}
