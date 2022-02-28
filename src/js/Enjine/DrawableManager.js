import { Drawable } from "./Drawable.js";
import { GameState } from "./GameState.js";
import { Camera } from "./Camera.js";

/** 画图功能管理 */
export class DrawableManager {
  Unsorted = !0;
  /** @type {Drawable[]} */
  Objects = [];
  /**
   * 添加
   * @param {HTMLImageElement} element
   */
  Add(element) {
    this.Objects.push(element);
    this.Unsorted = !0;
  }
  /**
   * 添加范围
   * @param {HTMLImageElement} element
   */
  AddRange(element) {
    this.Objects = this.Objects.concat(element);
    this.Unsorted = !0;
  }
  /** 清除 */
  Clear() {
    this.Objects.splice(0, this.Objects.length);
  }
  /**
   * 包含
   * @param {HTMLImageElement} element
   * @returns {Boolean}
   */
  Contains(element) {
    for (let index = this.Objects.length; index--;)
      if (this.Objects[index] === element)
        return !0;
    return !1;
  }
  /**
   * 移除
   * @param {HTMLImageElement} element
   */
  Remove(element) {
    this.Objects.splice(this.Objects.indexOf(element), 1);
  }
  /**
   * 移除元素
   * @param {Number} n
   */
  RemoveAt(n) {
    this.Objects.splice(n, 1);
  }
  /**
   * 移除范围
   * @param {Number} n
   */
  RemoveRange(n, index) {
    this.Objects.splice(n, index);
  }
  /**
   * 移除列表
   * @param {GameState[]} arr
   */
  RemoveList(arr) {
    for (let i = 0; i < arr.length;) {
      this.Objects.forEach((obj, j) => {
        if (obj === arr[i]) {
          this.Objects.splice(j, 1);
          arr.splice(i--, 1);
          return;
        }
      });
    }
  }
  /**
   * 更新
   * @param {HTMLImageElement} element
   */
  Update(element) {
    this.Objects.forEach(state => state.Update && state.Update(element));
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx
   * @param {Camera} Camera
   */
  Draw(ctx, Camera) {
    if (this.Unsorted) {
      this.Unsorted = !1;
      // 大到小排序
      this.Objects.sort((a, b) => a.ZOrder - b.ZOrder);
    }
    // 遍历布局
    this.Objects.forEach(
      Obj => Obj.Draw && Obj.Draw(ctx, Camera)
    );
  }
}
