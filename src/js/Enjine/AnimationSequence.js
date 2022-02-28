/** 动画序列 */
export class AnimationSequence {
  /**
   * @param {Number} startRow 行的起始位置
   * @param {Number} startCol 列的起始位置
   * @param {Number} endRow 行的末尾
   * @param {Number} endCol 列的末尾
   */
  constructor(startRow, startCol, endRow, endCol) {
    this.StartRow = startRow;
    this.StartColumn = startCol;
    this.EndRow = endRow;
    this.EndColumn = endCol;
    this.SingleFrame = !1;
    if (this.StartRow == this.EndRow && this.StartColumn == this.EndColumn)
      this.SingleFrame = !0;
  }
}
