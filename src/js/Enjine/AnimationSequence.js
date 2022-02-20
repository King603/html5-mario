export class AnimationSequence {
    StartRow;
    StartColumn;
    EndRow;
    EndColumn;
    SingleFrame = !1;
    constructor(StartRow, StartColumn, EndRow, EndColumn) {
        this.StartRow = StartRow;
        this.StartColumn = StartColumn;
        this.EndRow = EndRow;
        this.EndColumn = EndColumn;
        if (this.StartRow == this.EndRow && this.StartColumn == this.EndColumn)
            this.SingleFrame = !0;
    }
}
//# sourceMappingURL=AnimationSequence.js.map