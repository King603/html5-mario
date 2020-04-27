let Enjine = {
  Keys: {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 80,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40
  },
  KeyboardInput: {
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
      if (event.keyCode >= 37 && event.keyCode <= 40) event.preventDefault();
    }
  },
  Resources: {
    Images: {},
    Sounds: {},
    Destroy() {
      delete this.Images;
      delete this.Sounds;
      return this;
    },
    AddImage(key, src) {
      let img = new Image;
      this.Images[key] = img;
      img.src = src;
      return this;
    },
    AddImages(images) {
      for (let image of images) {
        let img = new Image;
        this.Images[image.name] = img;
        img.src = image.src;
      }
      return this;
    },
    ClearImages() {
      delete this.Images;
      this.Images = {};
      return this;
    },
    RemoveImage(key) {
      delete this.Images[key];
      return this;
    },
    AddSound(i, href, c = 3) {
      this.Sounds[i] = [];
      this.Sounds[i].index = 0;
      for (let j = 0; j < c; j++)
        this.Sounds[i][j] = new Audio(href);
      return this;
    },
    ClearSounds() {
      delete this.Sounds;
      this.Sounds = {};
      return this;
    },
    RemoveSound(key) {
      delete this.Sounds[key];
      return this;
    },
    PlaySound(i, b) {
      if (this.Sounds[i].index >= this.Sounds[i].length)
        this.Sounds[i].index = 0;
      b && this.Sounds[i][this.Sounds[i].index].addEventListener("ended", this.LoopCallback, !1);
      this.Sounds[i][this.Sounds[i].index++].play();
      return this.Sounds[i].index;
    },
    PauseChannel(x, y) {
      this.Sounds[x][y].paused || this.Sounds[x][y].pause();
      return this;
    },
    PauseSound(index) {
      for (let sound of this.Sounds[index])
        sound.paused || sound.pause();
      return this;
    },
    ResetChannel(x, y) {
      this.Sounds[x][y].currentTime = 0;
      this.StopLoop(x, y);
      return this;
    },
    ResetSound(x) {
      for (let y = 0; y < this.Sounds[x].length; y++) {
        this.Sounds[x].currentTime = 0;
        this.StopLoop(x, y);
      }
      return this;
    },
    StopLoop(x, y) {
      this.Sounds[x][y].removeEventListener("ended", this.LoopCallback, !1);
    },
    LoopCallback() {
      this.currentTime = -1;
      this.play();
    }
  }
};

Enjine.GameCanvas = (() => class {
  Initialize(id, width, height) {
    this.Context2D = (this.Canvas = document.getElementById(id)).getContext("2d");
    this.BackBuffer = document.createElement("canvas");
    this.BackBuffer.width = width;
    this.BackBuffer.height = height;
    this.BackBufferContext2D = this.BackBuffer.getContext("2d");
  }
  BeginDraw() {
    this.BackBufferContext2D.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
    this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
  }
  EndDraw() {
    this.Context2D.drawImage(this.BackBuffer, 0, 0, this.BackBuffer.width, this.BackBuffer.height, 0, 0, this.Canvas.width, this.Canvas.height);
  }
})();

Enjine.Drawable = (() => class {
  ZOrder = 0;
  Draw() { }
})();

Enjine.GameStateContext = (() => class {
  constructor(state) {
    if (state != null) {
      this.State = state;
      this.State.Enter();
    }
  }
  ChangeState(state) {
    this.State != null && this.State.Exit();
    this.State = state;
    this.State.Enter();
  }
  Update(a) {
    this.State.CheckForChange(this);
    this.State.Update(a);
  }
  Draw(a) {
    this.State.Draw(a);
  }
})();

Enjine.GameState = (() => class {
  Enter() { }
  Exit() { }
  Update() { }
  Draw() { }
  CheckForChange() { }
})();

Enjine.GameTimer = (() => class {
  constructor() {
    this.FramesPerSecond = 1E3 / 30;
    this.LastTime = 0;
    this.UpdateObject = null;
  }
  Start() {
    this.LastTime = new Date().getTime();
    this.IntervalFunc = setInterval(() => this.Tick(), this.FramesPerSecond);
  }
  Tick() {
    if (this.UpdateObject != null) {
      let date = new Date().getTime();
      this.LastTime = date;
      this.UpdateObject.Update((date - this.LastTime) / 1E3);
    }
  }
  Stop() {
    clearInterval(this.IntervalFunc);
  }
})();

Enjine.Camera = (() => class {
  constructor() {
    this.Y = this.X = 0;
  }
})();

Enjine.DrawableManager = (() => class {
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
  RemoveAt(a) {
    this.Objects.splice(a, 1);
  }
  RemoveRange(a, b) {
    this.Objects.splice(a, b);
  }
  RemoveList(a) {
    for (let i = 0; i < a.length;) {
      this.Objects.forEach((obj, j) => {
        if (obj === a[i]) {
          this.Objects.splice(j, 1);
          a.splice(i--, 1);
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
})();

Enjine.Sprite = (() => class extends Enjine.Drawable {
  constructor() {
    super();
    this.Y = this.X = 0;
    this.Image = null;
  }
  Draw(a, b) {
    a.drawImage(this.Image, this.X - b.X, this.Y - b.Y);
  }
})();

Enjine.SpriteFont = (() => class extends Enjine.Drawable {
  constructor(str, image, width, height, Letters) {
    super();
    this.Image = image;
    this.Letters = Letters;
    this.LetterWidth = width;
    this.LetterHeight = height;
    this.Strings = str;
  }
  Draw(element) {
    for (let str of this.Strings) {
      for (let index = 0; index < str.length; index++) {
        element.drawImage(
          this.Image,
          this.Letters[str.String.charCodeAt(index)].X,
          this.Letters[str.String.charCodeAt(index)].Y,
          this.LetterWidth,
          this.LetterHeight,
          str.X + this.LetterWidth * (index + 1),
          str.Y,
          this.LetterWidth,
          this.LetterHeight
        );
      }
    }
  }
})();

Enjine.FrameSprite = (() => class extends Enjine.Sprite {
  constructor() {
    super();
    this.FrameHeight = this.FrameWidth = this.FrameY = this.FrameX = 0;
  }
  Draw(a, b) {
    a.drawImage(
      this.Image,
      this.FrameX,
      this.FrameY,
      this.FrameWidth,
      this.FrameHeight,
      this.X - b.X,
      this.Y - b.Y,
      this.FrameWidth,
      this.FrameHeight
    );
  }
})();

Enjine.AnimationSequence = (() => class {
  constructor(startRow, startCol, endRow, endCol) {
    this.StartRow = startRow;
    this.StartColumn = startCol;
    this.EndRow = endRow;
    this.EndColumn = endCol;
    this.SingleFrame = !1;
    if (this.StartRow == this.EndRow && this.StartColumn == this.EndColumn)
      this.SingleFrame = !0;
  }
})();

Enjine.AnimatedSprite = (() => class extends Enjine.FrameSprite {
  constructor() {
    super();
    this.LastElapsed = 0;
    this.FramesPerSecond = .05;
    this.Looping = this.Playing = !1;
    this.Columns = this.Rows = 0;
    this.Sequences = {};
  }
  Update(a) {
    if (!this.CurrentSequence.SingleFrame && this.Playing && (this.LastElapsed -= a, !(this.LastElapsed > 0))) {
      this.LastElapsed = this.FramesPerSecond;
      this.FrameX += this.FrameWidth;
      if (this.FrameX > this.Image.width - this.FrameWidth) {
        this.FrameX = 0;
        this.FrameY += this.FrameHeight;
        if (this.FrameY > this.Image.height - this.FrameHeight) this.FrameY = 0;
      }
      a = !1;
      if ((this.FrameX > this.CurrentSequence.EndColumn * this.FrameWidth && this.FrameY == this.CurrentSequence.EndRow * this.FrameHeight) || (this.FrameX == 0 && this.FrameY > this.CurrentSequence.EndRow * this.FrameHeight)) a = !0;
      if (a)
        if (this.Looping) {
          this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
          this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
        } else this.Playing = !1;
    }
  }
  PlaySequence(a, b) {
    this.Playing = !0;
    this.Looping = b;
    this.CurrentSequence = this.Sequences["seq_" + a];
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
  AddExistingSequence(a, b) {
    this.Sequences["seq_" + a] = b;
  }
  AddNewSequence(a, b, c, d, e) {
    this.Sequences["seq_" + a] = new Enjine.AnimationSequence(b, c, d, e);
  }
  DeleteSequence(a) {
    this.Sequences["seq_" + a] != null && delete this.Sequences["seq_" + a];
  }
  ClearSequences() {
    delete this.Sequences;
    this.Sequences = {};
  };
})();

Enjine.Collideable = (() => class {
  constructor(base, width, height, key) {
    this.Base = base;
    this.X = base.X;
    this.Y = base.Y;
    this.Width = width;
    this.Height = height;
    this.CollisionEvent = key != null ? key : function () { };
  }
  Update() {
    this.X = this.Base.X;
    this.Y = this.Base.Y;
  }
  CheckCollision(a) {
    if (!(this.Y + this.Height < a.Y) && !(this.Y > a.Y + a.Height) && !(this.X + this.Width < a.X) && !(this.X > a.X + a.Width)) {
      this.CollisionEvent(a);
      a.CollisionEvent(this);
    }
  }
})();

Enjine.Application = (() => class {
  Update(element) {
    this.stateContext.Update(element);
    this.canvas.BeginDraw();
    this.stateContext.Draw(this.canvas.BackBufferContext2D);
    this.canvas.EndDraw();
  }
  Initialize(ctx, b, c) {
    this.canvas = new Enjine.GameCanvas;
    this.timer = new Enjine.GameTimer;
    Enjine.KeyboardInput.Initialize();
    this.canvas.Initialize("canvas", b, c);
    this.timer.UpdateObject = this;
    this.stateContext = new Enjine.GameStateContext(ctx);
    this.timer.Start();
  }
})();
