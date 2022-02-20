import { AnimationSequence } from "./AnimationSequence.js";
import { FrameSprite } from "./FrameSprite.js";
export declare class AnimatedSprite extends FrameSprite {
    LastElapsed: number;
    FramesPerSecond: number;
    Looping: boolean;
    Playing: boolean;
    Columns: number;
    Rows: number;
    Sequences: {
        [key: string]: AnimationSequence;
    };
    CurrentSequence?: AnimationSequence;
    constructor();
    Update(a: number): void;
    PlaySequence(name: string, Looping: boolean): void;
    StopLooping(): void;
    StopPlaying(): void;
    SetFrameWidth(width: number): void;
    SetFrameHeight(height: number): void;
    SetColumnCount(col: number): void;
    SetRowCount(row: number): void;
    AddExistingSequence(name: string, Sequence: AnimationSequence): void;
    AddNewSequence(name: string, startRow: number, startCol: number, endRow: number, endCol: number): void;
    DeleteSequence(name: string): void;
    ClearSequences(): void;
}
