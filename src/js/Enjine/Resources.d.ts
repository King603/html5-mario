interface Sounds extends Array<HTMLAudioElement> {
    index: number;
}
interface RESOURCES {
    Images?: {
        [key: string]: HTMLImageElement;
    };
    Sounds?: {
        [key: string]: Sounds;
    };
    Destroy(): RESOURCES;
    AddImage(key: string, src: string): RESOURCES;
    AddImages(images: {
        name: string;
        src: string;
    }[]): RESOURCES;
    ClearImages(): RESOURCES;
    RemoveImage(key: string): RESOURCES;
    AddSound(key: string, href: string, length?: number): RESOURCES;
    ClearSounds(): RESOURCES;
    RemoveSound(key: string): RESOURCES;
    PlaySound(key: string, b?: boolean): number;
    PauseChannel(key: string, i: number): RESOURCES;
    PauseSound(key: string): RESOURCES;
    ResetChannel(key: string, i: number): RESOURCES;
    ResetSound(key: string): RESOURCES;
    StopLoop(key: string, i: number): void;
    LoopCallback(): void;
}
export declare const Resources: RESOURCES;
export {};
