export interface ODDS {
	/** 直的 */
	Straight: number;
	/** 直丘 */
	HillStraight: number;
	/** 管子 */
	Tubes: number;
	/** 跳跃 */
	Jump: number;
	/** 大炮 */
	Cannons: number;
}

/** 几率 */
export const Odds: ODDS = {
	Straight: 0,
	HillStraight: 1,
	Tubes: 2,
	Jump: 3,
	Cannons: 4
};
