export class AnimationSequence {
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
