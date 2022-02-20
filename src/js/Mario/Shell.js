import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import Mario from "./index.js";
import { Sparkle } from "./Sparkle.js";
export class Shell extends NotchSprite {
    World;
    X;
    Y;
    Ypic;
    Xpic;
    XPicO = 8;
    YPicO = 31;
    Width = 4;
    Height = 12;
    Facing = 0;
    PicWidth = 16;
    Ya = -5;
    Dead = !1;
    DeadTime = 0;
    Carried = !1;
    AirInertia = .89;
    GroundInertia = .89;
    OnGround = !1;
    Anim = 0;
    constructor(World, X, Y, Ypic, Xpic = 4) {
        super(Enjine.Resources.Images?.enemies);
        this.World = World;
        this.X = X;
        this.Y = Y;
        this.Ypic = Ypic;
        this.Xpic = Xpic;
    }
    FireballCollideCheck(a) {
        if (this.DeadTime !== 0)
            return !1;
        let x = a.X - this.X, y = a.Y - this.Y;
        if (x > -16 && x < 16 && y > -this.Height && y < a.Height) {
            if (this.Facing !== 0)
                return !0;
            Enjine.Resources.PlaySound("kick");
            this.Xa = a.Facing * 2;
            this.Ya = -5;
            if (this.SpriteTemplate !== null)
                this.SpriteTemplate.IsDead = !0;
            this.DeadTime = 100;
            return this.YFlip = !0;
        }
        return !1;
    }
    CollideCheck() {
        if (!this.Carried && !(this.Dead || this.DeadTime > 0)) {
            let a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
            if (a > -16 && a < 16 && b > -this.Height && b < Mario.MarioCharacter.Height) {
                if (Mario.MarioCharacter.Ya > 0 && b <= 0 && (!Mario.MarioCharacter.OnGround || !Mario.MarioCharacter.WasOnGround)) {
                    Mario.MarioCharacter.Stomp(this);
                    if (this.Facing !== 0)
                        this.Xa = 0;
                    else
                        Mario.MarioCharacter.Facing;
                }
                else if (this.Facing !== 0) {
                    Mario.MarioCharacter.GetHurt();
                }
                else {
                    Mario.MarioCharacter.Kick(this);
                    this.Facing = Mario.MarioCharacter.Facing;
                }
            }
        }
    }
    Move() {
        if (this.Carried)
            this.World.CheckShellCollide(this);
        else if (this.DeadTime > 0) {
            if (--this.DeadTime === 0) {
                this.DeadTime = 1;
                for (let n = 0; n < 8; n++)
                    this.World.AddSprite(new Sparkle(this.World, (this.X + Math.random() * 16 - 8 | 0) + 4, (this.Y + Math.random() * 8 | 0) + 4, Math.random() * 2 - 1, Math.random() * -1));
                this.World.RemoveSprite(this);
            }
            this.X += this.Xa;
            this.Y += this.Ya;
            this.Ya *= .95;
            this.Ya += 1;
        }
        else {
            this.Facing !== 0 && this.Anim++;
            if (this.Xa > 2)
                this.Facing = 1;
            if (this.Xa < -2)
                this.Facing = -1;
            this.Xa = this.Facing * 11;
            this.Facing !== 0 && this.World.CheckShellCollide(this);
            this.XFlip = this.Facing === -1;
            this.XPic = (this.Anim / 2 | 0) % 4 + 3;
            if (!this.SubMove(this.Xa, 0)) {
                Enjine.Resources.PlaySound("bump");
                this.Facing = -this.Facing;
            }
            this.OnGround = !1;
            this.SubMove(0, this.Ya);
            this.Ya *= .85;
            this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
            this.OnGround || (this.Ya += 2);
        }
    }
    SubMove(a, b) {
        let c = !1;
        while (a > 8) {
            if (!this.SubMove(8, 0))
                return !1;
            a -= 8;
        }
        while (a < -8) {
            if (!this.SubMove(-8, 0))
                return !1;
            a += 8;
        }
        while (b > 8) {
            if (!this.SubMove(0, 8))
                return !1;
            b -= 8;
        }
        while (b < -8) {
            if (!this.SubMove(0, -8))
                return !1;
            b += 8;
        }
        let x = this.X + a;
        let y = this.Y + b;
        if (b > 0 && (this.IsBlocking(x - this.Width, y + b, a, 0) ||
            this.IsBlocking(x + this.Width, y + b, a, 0) ||
            this.IsBlocking(x - this.Width, y + b + 1, a, b) ||
            this.IsBlocking(x + this.Width, y + b + 1, a, b)))
            c = !0;
        if (b < 0 && (this.IsBlocking(x, y + b - this.Height, a, b) || c ||
            this.IsBlocking(x - this.Width, y + b - this.Height, a, b) || c ||
            this.IsBlocking(x + this.Width, y + b - this.Height, a, b)))
            c = !0;
        if (a > 0 && (this.IsBlocking(x + this.Width, y + b - this.Height, a, b) ||
            this.IsBlocking(x + this.Width, y + b - (this.Height / 2 | 0), a, b) ||
            this.IsBlocking(x + this.Width, y + b, a, b)))
            c = !0;
        if (a < 0 && (this.IsBlocking(x - this.Width, y + b - this.Height, a, b) ||
            this.IsBlocking(x - this.Width, y + b - (this.Height / 2 | 0), a, b) ||
            this.IsBlocking(x - this.Width, y + b, a, b)))
            c = !0;
        if (c) {
            if (a < 0) {
                this.X = ((this.X - this.Width) / 16 | 0) * 16 + this.Width;
                this.Xa = 0;
            }
            else if (a > 0) {
                this.X = ((this.X + this.Width) / 16 + 1 | 0) * 16 - this.Width - 1;
                this.Xa = 0;
            }
            if (b < 0) {
                this.Y = ((this.Y - this.Height) / 16 | 0) * 16 + this.Height;
                this.Ya = 0;
            }
            else if (b > 0) {
                this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1;
                this.OnGround = !0;
            }
            return !1;
        }
        else {
            this.X += a;
            this.Y += b;
            return !0;
        }
    }
    IsBlocking(a, b, c, e) {
        a = a / 16 | 0;
        b = b / 16 | 0;
        if (a === (this.X / 16 | 0) && b === (this.Y / 16 | 0))
            return !1;
        let d = this.World.Level?.IsBlocking(a, b, c);
        if (d && e === 0 && c !== 0)
            this.World.Bump(a, b, !0);
        return d;
    }
    BumpCheck(a, b) {
        if (this.X + this.Width > a * 16 && this.X - this.Width < a * 16 + 16 && b === ((this.Y - 1) / 16 | 0)) {
            this.Facing = -Mario.MarioCharacter.Facing;
            this.Ya = -10;
        }
    }
    Die() {
        this.Dead = !0;
        this.Carried = !1;
        this.Xa = -this.Facing * 2;
        this.Ya = -5;
        this.DeadTime = 100;
    }
    ShellCollideCheck(a) {
        if (this.DeadTime !== 0)
            return !1;
        let x = a.X - this.X, y = a.Y - this.Y;
        if (x > -16 && x < 16 && y > -this.Height && y < a.Height) {
            Enjine.Resources.PlaySound("kick");
            if (Mario.MarioCharacter.Carried === a || Mario.MarioCharacter.Carried === this)
                Mario.MarioCharacter.Carried = null;
            this.Die();
            a.Die();
            return !0;
        }
        return !1;
    }
    Release() {
        this.Carried = !1;
        this.Facing = Mario.MarioCharacter.Facing;
        this.X += this.Facing * 8;
    }
}
//# sourceMappingURL=Shell.js.map