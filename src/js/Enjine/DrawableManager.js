export class DrawableManager {
    Unsorted = !0;
    Objects = [];
    Add(element) {
        this.Objects.push(element);
        this.Unsorted = !0;
    }
    AddRange(element) {
        this.Objects = this.Objects.concat(element);
        this.Unsorted = !0;
    }
    Clear() {
        this.Objects.splice(0, this.Objects.length);
    }
    Contains(element) {
        for (let index = this.Objects.length; index--;)
            if (this.Objects[index] === element)
                return !0;
        return !1;
    }
    Remove(element) {
        this.Objects.splice(this.Objects.indexOf(element), 1);
    }
    RemoveAt(start) {
        this.Objects.splice(start, 1);
    }
    RemoveRange(start, deleteCount) {
        this.Objects.splice(start, deleteCount);
    }
    RemoveList(arr) {
        for (let i = 0; i < arr.length;) {
            this.Objects.forEach((obj, j) => {
                if (obj === arr[i]) {
                    this.Objects.splice(j, 1);
                    arr.splice(i--, 1);
                    return;
                }
            });
        }
    }
    Update(element) {
        this.Objects.forEach(Obj => Obj.Update && Obj.Update(element));
    }
    Draw(a, b) {
        if (this.Unsorted) {
            this.Unsorted = !1;
            this.Objects.sort((a, b) => a.ZOrder - b.ZOrder);
        }
        this.Objects.forEach(Obj => Obj.Draw && Obj.Draw(a, b));
    }
}
//# sourceMappingURL=DrawableManager.js.map