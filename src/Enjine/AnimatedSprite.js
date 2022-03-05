import { AnimationSequence } from "./AnimationSequence.js";
import { FrameSprite } from "./FrameSprite.js";

export class AnimatedSprite extends FrameSprite {
	constructor() {
		super();
		this.LastElapsed = 0;
		this.FramesPerSecond = 0.05;
		this.CurrentSequence = undefined;
		this.Looping = this.Playing = !1;
		this.Columns = this.Rows = 0;
		this.Sequences = {};
	}
	Update(a) {
		if (!this.CurrentSequence.SingleFrame && this.Playing) {
			this.LastElapsed -= a;
			if (!(this.LastElapsed > 0)) {
				this.LastElapsed = this.FramesPerSecond;
				this.FrameX += this.FrameWidth;
				if (this.FrameX > this.Image.width - this.FrameWidth) {
					this.FrameX = 0;
					this.FrameY += this.FrameHeight;
					if (this.FrameY > this.Image.height - this.FrameHeight)
						this.FrameY = 0;
				}
				let { EndColumn, EndRow, StartColumn, StartRow } = this.CurrentSequence;
				if ((this.FrameX > EndColumn * this.FrameWidth && this.FrameY == EndRow * this.FrameHeight) || (this.FrameX == 0 && this.FrameY > EndRow * this.FrameHeight)) {
					if (this.Looping) {
						this.FrameX = StartColumn * this.FrameWidth;
						this.FrameY = StartRow * this.FrameHeight;
					} else {
						this.Playing = !1;
					}
				}
			}
		}
	}
	PlaySequence(name, isloop) {
		this.Playing = !0;
		this.Looping = isloop;
		this.CurrentSequence = this.Sequences["seq_" + name];
		this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
		this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
	}
	StopLooping() {
		this.Looping = !1;
	}
	StopPlaying() {
		this.Playing = !1;
	}
	SetFrameWidth(width) {
		this.FrameWidth = width;
		this.Rows = this.Image.width / this.FrameWidth;
	}
	SetFrameHeight(height) {
		this.FrameHeight = height;
		this.Columns = this.Image.height / this.FrameHeight;
	}
	SetColumnCount(col) {
		this.FrameWidth = this.Image.width / col;
		this.Columns = col;
	}
	SetRowCount(row) {
		this.FrameHeight = this.Image.height / row;
		this.Rows = row;
	}
	AddExistingSequence(name, animationSequence) {
		this.Sequences["seq_" + name] = animationSequence;
	}
	AddNewSequence(name, startRow, startCol, endRow, endCol) {
		this.Sequences["seq_" + name] = new AnimationSequence(startRow, startCol, endRow, endCol);
	}
	DeleteSequence(name) {
		this.Sequences["seq_" + name] != undefined && delete this.Sequences["seq_" + name];
	}
	ClearSequences() {
		this.Sequences = {};
	}
}
