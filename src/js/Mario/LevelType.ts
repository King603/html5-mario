export interface LT {
	/** 在地面 */
	Overground: number;
	/** 在地下 */
	Underground: number;
	/** 城堡 */
	Castle: number;
}

/** 等级样式 */
export const LevelType: LT = {
	Overground: 0,
	Underground: 1,
	Castle: 2
};
