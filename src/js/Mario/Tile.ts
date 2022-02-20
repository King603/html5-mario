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
export const Tile: TILE = {
	BlockUpper: 1,
	BlockAll: 2,
	BlockLower: 4,
	Special: 8,
	Bumpable: 16,
	Breakable: 32,
	PickUpable: 64,
	Animated: 128,
	Behaviors: [],
	LoadBehaviors() {
		let a = [0, 20, 28, 0, 130, 130, 130, 130, 2, 2, 2, 2, 2, 0, 138, 0, 162, 146, 154, 162, 146, 146, 154, 146, 2, 0, 2, 2, 2, 0, 2, 0, 192, 192, 192, 192, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2];
		for (let b = 58; b < 128; b++)
			a[b] = 0;
		a[128] = 2;
		a[129] = 2;
		a[130] = 2;
		a[131] = 0;
		a[132] = 1;
		a[133] = 1;
		a[134] = 1;
		a[135] = 0;
		a[136] = 2;
		a[137] = 2;
		a[138] = 2;
		a[139] = 0;
		a[140] = 2;
		a[141] = 2;
		a[142] = 2;
		a[143] = 0;
		a[144] = 2;
		a[145] = 0;
		a[146] = 2;
		a[147] = 0;
		a[148] = 0;
		a[149] = 0;
		a[150] = 0;
		a[151] = 0;
		a[152] = 2;
		a[153] = 2;
		a[154] = 2;
		a[155] = 0;
		a[156] = 2;
		a[157] = 2;
		a[158] = 2;
		a[159] = 0;
		a[160] = 2;
		a[161] = 2;
		a[162] = 2;
		a[163] = 0;
		a[164] = 0;
		a[165] = 0;
		a[166] = 0;
		a[167] = 0;
		a[168] = 2;
		a[169] = 2;
		a[170] = 2;
		a[171] = 0;
		a[172] = 2;
		a[173] = 2;
		a[174] = 2;
		a[175] = 0;
		a[176] = 2;
		a[177] = 2;
		a[178] = 2;
		a[179] = 0;
		a[180] = 1;
		a[181] = 1;
		a[182] = 1;
		for (let b = 183; b < 224; b++)
			a[b] = 0;
		a[224] = 1;
		a[225] = 1;
		a[226] = 1;
		for (let b = 227; b < 256; b++)
			a[b] = 0;
		this.Behaviors = a;
	}
};
