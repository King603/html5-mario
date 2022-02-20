interface KEY {
    Pressed: boolean[];
    Initialize(): void;
    IsKeyDown(index: number): boolean;
    KeyDownEvent(event: KeyboardEvent): void;
    KeyUpEvent(event: KeyboardEvent): void;
    PreventScrolling(event: KeyboardEvent): void;
}
export declare const KeyboardInput: KEY;
export {};
