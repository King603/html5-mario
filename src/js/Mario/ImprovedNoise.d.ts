export declare class ImprovedNoise {
    P: number[];
    constructor();
    Shuffle(): void;
    PerlinNoise(a: number, b: number): number;
    Noise(a: number, b: number, c: number): number;
    Fade(a: number): number;
    Lerp(a: number, b: number, c: number): number;
    Grad(a: number, b: number, c: number, e: number): number;
}
