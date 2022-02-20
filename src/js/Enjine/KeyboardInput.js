export const KeyboardInput = {
    Pressed: [],
    Initialize() {
        document.onkeydown = event => this.KeyDownEvent(event);
        document.onkeyup = event => this.KeyUpEvent(event);
    },
    IsKeyDown(index) {
        if (this.Pressed[index] != null)
            return this.Pressed[index];
        return !1;
    },
    KeyDownEvent(event) {
        this.Pressed[event.keyCode] = !0;
        this.PreventScrolling(event);
    },
    KeyUpEvent(event) {
        this.Pressed[event.keyCode] = !1;
        this.PreventScrolling(event);
    },
    PreventScrolling(event) {
        if (event.keyCode >= 37 && event.keyCode <= 40)
            event.preventDefault();
    }
};
//# sourceMappingURL=KeyboardInput.js.map