import { FrameSprite } from "./FrameSprite.js";
import { AnimationSequence } from "./AnimationSequence.js";

/**
 * 动画雪碧图
 * @extends FrameSprite
 */
export class AnimatedSprite extends FrameSprite {
  constructor() {
    super();
    this.LastElapsed = 0;
    this.FramesPerSecond = .05;
    this.Looping = this.Playing = !1;
    this.Columns = this.Rows = 0;
    /** @type {{[key: string]: AnimationSequence;}} */
    this.Sequences = {};
  }
  // 更新
  Update(sprite) {
    if (!this.CurrentSequence.SingleFrame && this.Playing && (this.LastElapsed -= sprite, !(this.LastElapsed > 0))) {
      this.LastElapsed = this.FramesPerSecond;
      this.FrameX += this.FrameWidth;
      if (this.FrameX > this.Image.width - this.FrameWidth) {
        this.FrameX = 0;
        this.FrameY += this.FrameHeight;
        if (this.FrameY > this.Image.height - this.FrameHeight)
          this.FrameY = 0;
      }
      sprite = !1;
      if ((this.FrameX > this.CurrentSequence.EndColumn * this.FrameWidth && this.FrameY == this.CurrentSequence.EndRow * this.FrameHeight) || (this.FrameX == 0 && this.FrameY > this.CurrentSequence.EndRow * this.FrameHeight))
        sprite = !0;
      if (sprite)
        if (this.Looping) {
          this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
          this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
        }
        else
          this.Playing = !1;
    }
  }
  /**
   * 运行顺序
   * @param {String} name
   * @param {Boolean} Looping
   */
  PlaySequence(name, Looping) {
    this.Playing = !0;
    this.Looping = Looping;
    this.CurrentSequence = this.Sequences["seq_" + name];
    this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
    this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
  }
  // 停止循环
  StopLooping() {
    this.Looping = !1;
  }
  // 停止运行
  StopPlaying() {
    this.Playing = !1;
  }
  /**
   * 设置框宽度
   * @param {Number} width
   */
  SetFrameWidth(width) {
    this.FrameWidth = width;
    this.Rows = this.Image.width / this.FrameWidth;
  }
  /**
   * 设置框高度
   * @param {Number} height
   */
  SetFrameHeight(height) {
    this.FrameHeight = height;
    this.Columns = this.Image.height / this.FrameHeight;
  }
  /**
   * 设置列数
   * @param {Number} col
   */
  SetColumnCount(col) {
    this.FrameWidth = this.Image.width / col;
    this.Columns = col;
  }
  /**
   * 设置行数
   * @param {Number} row
   */
  SetRowCount(row) {
    this.FrameHeight = this.Image.height / row;
    this.Rows = row;
  }
  /**
   * 添加已存在的序列
   * @param {String} name
   * @param {AnimationSequence} element
   */
  AddExistingSequence(name, element) {
    this.Sequences["seq_" + name] = element;
  }
  /**
   * 添加新序列
   * @param {String} name
   * @param {Number} startRow
   * @param {Number} startCol
   * @param {Number} endRow
   * @param {Number} endCol
   */
  AddNewSequence(name, startRow, startCol, endRow, endCol) {
    this.Sequences["seq_" + name] = new AnimationSequence(startRow, startCol, endRow, endCol);
  }
  /**
   * 删除序列
   * @param {String} name
   */
  DeleteSequence(name) {
    this.Sequences["seq_" + name] != null && delete this.Sequences["seq_" + name];
  }
  // 清除序列
  ClearSequences() {
    delete this.Sequences;
    this.Sequences = {};
  };
}
