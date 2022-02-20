/** 瓷砖 */
export interface TILE {
    /** 方块上方 */
    BlockUpper: number;
    /** 所有方块 */
    BlockAll: number;
    /** 方块下方 */
    BlockLower: number;
    /** 特殊的 */
    Special: number;
    /** 可碰撞的 */
    Bumpable: number;
    /** 可断开的 */
    Breakable: number;
    /** 拾取能力 */
    PickUpable: number;
    /** 动画 */
    Animated: number;
    /** 行为 */
    Behaviors: number[];
    /** 负载行为 */
    LoadBehaviors(): void;
}
/** 瓷砖 */
export declare const Tile: TILE;
