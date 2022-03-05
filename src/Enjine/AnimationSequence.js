export function AnimationSequence(startRow, startCol, endRow, endCol) {
	this.StartRow = startRow;
	this.StartColumn = startCol;
	this.EndRow = endRow;
	this.EndColumn = endCol;
	this.SingleFrame = this.StartRow == this.EndRow && this.StartColumn == this.EndColumn;
}
