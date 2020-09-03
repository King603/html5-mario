import { Mario } from "./index.js";

/** 关卡类 */
export class Level {
  /**
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  constructor(width, height) {
    // 关卡界面大小
    this.Width = width;
    this.Height = height;
    // 出口位置
    this.ExitY = this.ExitX = 10;
    /** 界面 */
    this.Map = setMap(this.Width, this.Height);
    /** 数据 */
    this.Data = setMap(this.Width, this.Height);
    /** 精灵图模板 */
    this.SpriteTemplates = setMap(this.Width, this.Height);
    /**
     * 添加界面信息
     * @param {Number} width 
     * @param {Number} height 
     */
    function setMap(width, height) {
      /** @type {Number[][]} */
      let map = [];
      for (let x = 0; x < width; x++) {
        map[x] = [];
        for (let y = 0; y < height; y++) {
          map[x][y] = 0;
        }
      }
      return map;
    }
  }
  /** 更新数据 */
  Update() {
    for (let x = 0; x < this.Width; x++)
      for (let y = 0; y < this.Height; y++)
        if (this.Data[x][y] > 0)
          this.Data[x][y]--;
  }
  /**
   * 获取方块顶部
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   */
  GetBlockCapped(x, y) {
    (x = Math.max(x, 0)) >= this.Width && (x = this.Width - 1);
    (y = Math.max(y, 0)) >= this.Height && (y = this.Height - 1);
    return this.Map[x][y];
  }
  /**
   * 获取方块
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   */
  GetBlock(x, y) {
    x = Math.max(x, 0);
    if (y < 0)
      return 0;
    x >= this.Width && (x = this.Width - 1);
    y >= this.Height && (y = this.Height - 1);
    return this.Map[x][y];
  }
  /**
   * 设置方块
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素
   */
  SetBlock(x, y, ele) {
    x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Map[x][y] = ele);
  }
  /**
   * 设置方块数据
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素
   */
  SetBlockData(x, y, ele) {
    x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Data[x][y] = ele);
  }
  /**
   * 判断阻塞
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素
   */
  IsBlocking(x, y, ele) {
    x = this.GetBlock(x, y);
    y = (Mario.Tile.Behaviors[x & 255] & Mario.Tile.BlockAll) > 0;
    y |= ele > 0 && (Mario.Tile.Behaviors[x & 255] & Mario.Tile.BlockUpper) > 0;
    y |= ele < 0 && (Mario.Tile.Behaviors[x & 255] & Mario.Tile.BlockLower) > 0;
    return y;
  }
  /**
   * 获取Sprite模板
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @returns {Number[][]}
   */
  GetSpriteTemplate(x, y) {
    return x < 0 || y < 0 || x >= this.Width || y >= this.Height ? null : this.SpriteTemplates[x][y];
  }
  /**
   * 设置Sprite模板
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素
   */
  SetSpriteTemplate(x, y, ele) {
    x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.SpriteTemplates[x][y] = ele);
  }
}
