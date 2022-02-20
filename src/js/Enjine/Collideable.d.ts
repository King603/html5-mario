export declare class Collideable {
    Base: {
        X: number;
        Y: number;
    };
    Width: number;
    Height: number;
    CollisionEvent: (ctx: Collideable) => void;
    X: number;
    Y: number;
    constructor(Base: {
        X: number;
        Y: number;
    }, Width: number, Height: number, CollisionEvent?: (ctx: Collideable) => void);
    Update(): void;
    CheckCollision(ctx: Collideable): void;
}
