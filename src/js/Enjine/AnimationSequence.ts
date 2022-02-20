export class AnimationSequence {
	SingleFrame = !1;
	constructor(public StartRow: number, public StartColumn: number, public EndRow: number, public EndColumn: number) {
		if (this.StartRow == this.EndRow && this.StartColumn == this.EndColumn)
			this.SingleFrame = !0;
	}
}
