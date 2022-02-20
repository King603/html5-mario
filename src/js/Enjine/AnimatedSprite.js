import { AnimationSequence } from "./AnimationSequence.js";
import { FrameSprite } from "./FrameSprite.js";
export class AnimatedSprite extends FrameSprite {
    LastElapsed;
    FramesPerSecond;
    Looping;
    Playing;
    Columns;
    Rows;
    Sequences;
    CurrentSequence;
    constructor() {
        super();
        this.LastElapsed = 0;
        this.FramesPerSecond = .05;
        this.Looping = this.Playing = !1;
        this.Columns = this.Rows = 0;
        this.Sequences = {};
    }
    Update(a) {
        if (this.CurrentSequence && !this.CurrentSequence.SingleFrame && this.Playing && (this.LastElapsed -= a, !(this.LastElapsed > 0))) {
            this.LastElapsed = this.FramesPerSecond;
            this.FrameX += this.FrameWidth;
            if (this.Image && this.FrameX > this.Image.width - this.FrameWidth) {
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
                }
                else
                    this.Playing = !1;
        }
    }
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
        this.Image && (this.Rows = this.Image.width / this.FrameWidth);
    }
    SetFrameHeight(height) {
        this.FrameHeight = height;
        this.Image && (this.Columns = this.Image.height / this.FrameHeight);
    }
    SetColumnCount(col) {
        this.Image && (this.FrameWidth = this.Image.width / col);
        this.Columns = col;
    }
    SetRowCount(row) {
        this.Image && (this.FrameHeight = this.Image.height / row);
        this.Rows = row;
    }
    AddExistingSequence(name, Sequence) {
        this.Sequences["seq_" + name] = Sequence;
    }
    AddNewSequence(name, startRow, startCol, endRow, endCol) {
        this.Sequences["seq_" + name] = new AnimationSequence(startRow, startCol, endRow, endCol);
    }
    DeleteSequence(name) {
        this.Sequences["seq_" + name] != null && delete this.Sequences["seq_" + name];
    }
    ClearSequences() {
        this.Sequences = {};
    }
    ;
}
//# sourceMappingURL=AnimatedSprite.js.map