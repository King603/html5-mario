import { AnimationSequence } from "./AnimationSequence.js";
import { FrameSprite } from "./FrameSprite.js";

export class AnimatedSprite extends FrameSprite {
	constructor() {
		super();
		this.LastElapsed = 0;
		this.FramesPerSecond = .05;
		this.Looping = this.Playing = !1;
		this.Columns = this.Rows = 0;
		/** @type {{[key: string]: AnimationSequence}} */
		this.Sequences = {};
	}
	Update(a) {
		if (!this.CurrentSequence.SingleFrame && this.Playing && (this.LastElapsed -= a, !(this.LastElapsed > 0))) {
			this.LastElapsed = this.FramesPerSecond;
			this.FrameX += this.FrameWidth;
			if (this.FrameX > this.Image.width - this.FrameWidth) {
				this.FrameX = 0;
				this.FrameY += this.FrameHeight;
				if (this.FrameY > this.Image.height - this.FrameHeight)
					this.FrameY = 0;
			}
			let b = !1;
			if ((this.FrameX > this.CurrentSequence.EndColumn * this.FrameWidth && this.FrameY == this.CurrentSequence.EndRow * this.FrameHeight) || (this.FrameX == 0 && this.FrameY > this.CurrentSequence.EndRow * this.FrameHeight))
				b = !0;
			if (b)
				if (this.Looping) {
					this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
					this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
				} else
					this.Playing = !1;
		}
	}
	/**
	 *
	 * @param {string} name
	 * @param {boolean} Looping
	 */
	PlaySequence(name, Looping) {
		this.Playing = !0;
		this.Looping = Looping;
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
	/**
	 *
	 * @param {string} a
	 * @param {AnimationSequence} b
	 */
	AddExistingSequence(a, b) {
		this.Sequences["seq_" + a] = b;
	}
	AddNewSequence(a, b, c, d, e) {
		this.Sequences["seq_" + a] = new AnimationSequence(b, c, d, e);
	}
	DeleteSequence(a) {
		this.Sequences["seq_" + a] != null && delete this.Sequences["seq_" + a];
	}
	ClearSequences() {
		delete this.Sequences;
		this.Sequences = {};
	};
}
