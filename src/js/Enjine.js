/** 画图功能 */
class Drawable {
  ZOrder = 0;
  Draw() { }
}
/** 游戏状态 */
class GameState {
  /** 进入 */
  Enter() { }
  /** 退出 */
  Exit() { }
  /** 更新 */
  Update() { }
  /** 布局 */
  Draw() { }
  /** 检查变化 */
  CheckForChange() { }
}
/** 界面 */
class Camera {
  constructor() {
    this.Y = this.X = 0;
  }
}
/** 
 * 利用精灵图设计各个部件元素
 * 继承 Drawable 类
 */
class Sprite extends Drawable {
  constructor() {
    super();
    this.Y = this.X = 0;
    this.Image = null;
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Camera} camera 
   */
  Draw(ctx, camera) {
    ctx.drawImage(this.Image, this.X - camera.X, this.Y - camera.Y);
  }
}
/**
 * 精灵图帧数设置
 * 继承 Sprite 类
 */
class FrameSprite extends Sprite {
  constructor() {
    super();
    this.FrameHeight = this.FrameWidth = this.FrameY = this.FrameX = 0;
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Camera} camera 
   */
  Draw(ctx, camera) {
    ctx.drawImage(
      this.Image,
      this.FrameX,
      this.FrameY,
      this.FrameWidth,
      this.FrameHeight,
      this.X - camera.X,
      this.Y - camera.Y,
      this.FrameWidth,
      this.FrameHeight
    );
  }
}

export let Enjine = {
  Keys: new Keyboard(),
  KeyboardInput: {
    Pressed: [],
    /** 初始化 */
    Initialize() {
      document.onkeydown = event => this.KeyDownEvent(event);
      document.onkeyup = event => this.KeyUpEvent(event);
    },
    /**
     * 判断是否按键
     * @param {Number} index 键位
     * @returns {Boolean}
     */
    IsKeyDown(index) {
      if (this.Pressed[index] != null)
        return this.Pressed[index];
      return !1;
    },
    /**
     * 按键按下后启动的事件
     * @param {KeyboardEvent} event 事件
     */
    KeyDownEvent(event) {
      this.Pressed[event.keyCode] = !0;
      this.PreventScrolling(event);
    },
    /**
     * 按键脱离后启动的事件
     * @param {KeyboardEvent} event 事件
     */
    KeyUpEvent(event) {
      this.Pressed[event.keyCode] = !1;
      this.PreventScrolling(event);
    },
    /**
     * 防止滚动
     * @param {KeyboardEvent} event 事件
     */
    PreventScrolling(event) {
      // 按下方向键后启动事件的preventDefault方法
      if (event.keyCode >= 37 && event.keyCode <= 40) event.preventDefault();
    }
  },
  Resources: {
    Images: {},
    Sounds: {},
    /**
     * 摧毁
     * @returns {Element}
     */
    Destroy() {
      delete this.Images;
      delete this.Sounds;
      return this;
    },
    /**
     * 添加图片
     * @param {String} key 属性
     * @param {String} src 图片路径
     * @returns {Element}
     */
    AddImage(key, src) {
      let img = new Image;
      this.Images[key] = img;
      img.src = src;
      return this;
    },
    /**
     * 添加图片组
     * @param {Image[]} images 图片组
     * @returns {Element}
     */
    AddImages(images) {
      for (let image of images) {
        let img = new Image;
        this.Images[image.name] = img;
        img.src = image.src;
      }
      return this;
    },
    /**
     * 清除图片组
     * @returns {Element}
     */
    ClearImages() {
      delete this.Images;
      this.Images = {};
      return this;
    },
    /**
     * 移除图片
     * @param {String} key 属性
     * @returns {Element}
     */
    RemoveImage(key) {
      delete this.Images[key];
      return this;
    },
    /**
     * 添加声音
     * @param {String} key 属性
     * @param {String} src 声音路径
     * @param {Number} [num = 3] 个数
     * @returns {Element}
     */
    AddSound(key, src, num = 3) {
      this.Sounds[key] = [];
      this.Sounds[key].index = 0;
      for (let i = 0; i < num; i++)
        this.Sounds[key][i] = new Audio(src);
      return this;
    },
    /**
     * 清除声音
     * @returns {Element}
     */
    ClearSounds() {
      delete this.Sounds;
      this.Sounds = {};
      return this;
    },
    /**
     * 移除声音
     * @param {String} key 属性
     * @returns {Element}
     */
    RemoveSound(key) {
      delete this.Sounds[key];
      return this;
    },
    /**
     * 运行声音
     * @param {String} key 属性
     * @param {Boolean} bool 判断条件
     * @returns {Number}
     */
    PlaySound(key, bool) {
      if (this.Sounds[key].index >= this.Sounds[key].length)
        this.Sounds[key].index = 0;
      bool && this.Sounds[key][this.Sounds[key].index].addEventListener("ended", this.LoopCallback, !1);
      this.Sounds[key][this.Sounds[key].index++].play();
      return this.Sounds[key].index;
    },
    /**
     * 暂停通道
     * @param {String} x 属性对象
     * @param {Number} y 属性
     * @returns {Element}
     */
    PauseChannel(x, y) {
      this.Sounds[x][y].paused || this.Sounds[x][y].pause();
      return this;
    },
    /**
     * 暂停声音
     * @param {String} key 属性
     * @returns {Element}
     */
    PauseSound(key) {
      for (let sound of this.Sounds[key])
        sound.paused || sound.pause();
      return this;
    },
    /**
     * 重置通道
     * @param {String} x 属性对象
     * @param {Number} y 属性
     * @returns {Element}
     */
    ResetChannel(x, y) {
      this.Sounds[x][y].currentTime = 0;
      this.StopLoop(x, y);
      return this;
    },
    /**
     * 重置声音
     * @param {String} key 属性
     * @returns {Element}
     */
    ResetSound(key) {
      for (let i = 0; i < this.Sounds[key].length; i++) {
        this.Sounds[key].currentTime = 0;
        this.StopLoop(key, i);
      }
      return this;
    },
    /**
     * 停止循环
     * @param {String} x 属性对象
     * @param {String} y 属性
     */
    StopLoop(x, y) {
      this.Sounds[x][y].removeEventListener("ended", this.LoopCallback, !1);
    },
    /** 循环函数 */
    LoopCallback() {
      this.currentTime = -1;
      this.play();
    }
  },
  GameCanvas: class {// 游戏画布
    /**
     * 初始化
     * @param {String} elementId 画布ID
     * @param {Number} width 画布宽度
     * @param {Number} height 画布高度
     */
    Initialize(elementId, width, height) {
      this.Context2D = (this.Canvas = document.getElementById(elementId)).getContext("2d");
      this.BackBuffer = document.createElement("canvas");
      this.BackBuffer.width = width;
      this.BackBuffer.height = height;
      this.BackBufferContext2D = this.BackBuffer.getContext("2d");
    }
    /** 布局界面 */
    BeginDraw() {
      this.BackBufferContext2D.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
      this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    }
    /** 结束布局 */
    EndDraw() {
      this.Context2D.drawImage(this.BackBuffer, 0, 0, this.BackBuffer.width, this.BackBuffer.height, 0, 0, this.Canvas.width, this.Canvas.height);
    }
  },
  Drawable,
  GameStateContext: class {
    /**
     * 游戏状态结构
     * @param {GameState} state 状态
     */
    constructor(state) {
      if (state != null) {
        this.State = state;
        this.State.Enter();
      }
    }
    /**
     * 改变状态
     * @param {GameState} state 状态
     */
    ChangeState(state) {
      this.State != null && this.State.Exit();
      this.State = state;
      this.State.Enter();
    }
    /**
     * 更新
     * @param {GameState} state 状态
     */
    Update(state) {
      this.State.CheckForChange(this);
      this.State.Update(state);
    }
    /**
     * 画图
     * @param {GameState} state 状态
     */
    Draw(state) {
      this.State.Draw(state);
    }
  },
  GameState,
  GameTimer: class {// 游戏计时器
    FramesPerSecond = 1E3 / 30;
    LastTime = 0;
    UpdateObject = null;
    /** 开始 */
    Start() {
      this.LastTime = new Date().getTime();
      this.IntervalFunc = setInterval(() => this.Tick(), this.FramesPerSecond);
    }
    /** 记号 */
    Tick() {
      if (this.UpdateObject != null) {
        let date = new Date().getTime();
        this.LastTime = date;
        this.UpdateObject.Update((date - this.LastTime) / 1E3);
      }
    }
    /** 停止 */
    Stop() {
      clearInterval(this.IntervalFunc);
    }
  },
  Camera,
  DrawableManager: class {// 画图功能管理
    Unsorted = !0;
    Objects = [];
    /**
     * 添加
     * @param {Element} element 
     */
    Add(element) {
      this.Objects.push(element);
      this.Unsorted = !0;
    }
    /**
     * 添加范围
     * @param {Element} element 
     */
    AddRange(element) {
      this.Objects = this.Objects.concat(element);
      this.Unsorted = !0;
    }
    /** 清除 */
    Clear() {
      this.Objects.splice(0, this.Objects.length);
    }
    /**
     * 包含
     * @param {Element} element 
     * @returns {Boolean}
     */
    Contains(element) {
      for (let index = this.Objects.length; index--;)
        if (this.Objects[index] === element)
          return !0;
      return !1;
    }
    /**
     * 移除
     * @param {Element} element 
     */
    Remove(element) {
      this.Objects.splice(this.Objects.indexOf(element), 1);
    }
    /**
     * 移除元素
     * @param {Element} element 
     */
    RemoveAt(element) {
      this.Objects.splice(element, 1);
    }
    /**
     * 移除范围
     * @param {Element} element 
     */
    RemoveRange(element, index) {
      this.Objects.splice(element, index);
    }
    /**
     * 移除列表
     * @param {[]} arr 
     * @returns 
     */
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
    /**
     * 更新
     * @param {Element} element 
     */
    Update(element) {
      this.Objects.forEach(
        /**
         * @param {GameState} state
         */
        state => state.Update && state.Update(element)
      );
    }
    // 布局
    Draw(a, Camera) {
      if (this.Unsorted) {
        this.Unsorted = !1;
        this.Objects.sort(
          /**
           * 大到小排序
           * @param {Drawable} a Drawable的属性
           * @param {Drawable} b Drawable的属性
           */
          (a, b) => a.ZOrder - b.ZOrder
        );
      }
      this.Objects.forEach(
        /**
         * 遍历布局
         * @param {GameState} Obj 
         */
        Obj => Obj.Draw && Obj.Draw(a, Camera)
      );
    }
  },
  Sprite,
  SpriteFont: class extends Drawable {
    /**
     * 精灵图字体
     * @param {String[]} str 
     * @param {Element} image 
     * @param {Number} width 
     * @param {Number} height 
     * @param {String[]} Letters 
     */
    constructor(str, image, width, height, Letters) {
      super();
      this.Image = image;
      this.Letters = Letters;
      this.LetterWidth = width;
      this.LetterHeight = height;
      this.Strings = str;
    }
    /**
     * 布局
     * @param {CanvasRenderingContext2D} ctx 
     */
    Draw(ctx) {
      this.Strings.forEach(
        /**
         * @param {Camera} camera
         */
        camera => {
          for (let index = 0; index < camera.length; index++) {
            ctx.drawImage(
              this.Image,
              this.Letters[camera.String.charCodeAt(index)].X,
              this.Letters[camera.String.charCodeAt(index)].Y,
              this.LetterWidth,
              this.LetterHeight,
              camera.X + this.LetterWidth * (index + 1),
              camera.Y,
              this.LetterWidth,
              this.LetterHeight
            );
          }
        }
      );
    }
  },
  FrameSprite,
  AnimationSequence: class {
    /**
     * 动画序列
     * @param {Number} startRow 行的起始位置
     * @param {Number} startCol 列的起始位置
     * @param {Number} endRow 行的末尾
     * @param {Number} endCol 列的末尾
     */
    constructor(startRow, startCol, endRow, endCol) {
      this.StartRow = startRow;
      this.StartColumn = startCol;
      this.EndRow = endRow;
      this.EndColumn = endCol;
      this.SingleFrame = !1;
      if (this.StartRow == this.EndRow && this.StartColumn == this.EndColumn)
        this.SingleFrame = !0;
    }
  },
  AnimatedSprite: class extends FrameSprite {
    // 动画雪碧图
    constructor() {
      super();
      this.LastElapsed = 0;
      this.FramesPerSecond = .05;
      this.Looping = this.Playing = !1;
      this.Columns = this.Rows = 0;
      this.Sequences = {};
    }
    // 更新
    Update(sprite) {
      if (!this.CurrentSequence.SingleFrame && this.Playing && (this.LastElapsed -= sprite, !(this.LastElapsed > 0))) {
        this.LastElapsed = this.FramesPerSecond;
        this.FrameX += this.FrameWidth;
        if (this.FrameX > this.Image.width - this.FrameWidth) {
          this.FrameX = 0;
          this.FrameY += this.FrameHeight;
          if (this.FrameY > this.Image.height - this.FrameHeight) this.FrameY = 0;
        }
        sprite = !1;
        if ((this.FrameX > this.CurrentSequence.EndColumn * this.FrameWidth && this.FrameY == this.CurrentSequence.EndRow * this.FrameHeight) || (this.FrameX == 0 && this.FrameY > this.CurrentSequence.EndRow * this.FrameHeight)) sprite = !0;
        if (sprite)
          if (this.Looping) {
            this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
            this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
          } else this.Playing = !1;
      }
    }
    /**
     * 运行顺序
     * @param {String} name 
     * @param {Boolean} Looping 
     */
    PlaySequence(name, Looping) {
      this.Playing = !0;
      this.Looping = Looping;
      this.CurrentSequence = this.Sequences["seq_" + name];
      this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
      this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
    }
    // 停止循环
    StopLooping() {
      this.Looping = !1;
    }
    // 停止运行
    StopPlaying() {
      this.Playing = !1;
    }
    /**
     * 设置框宽度
     * @param {Number} width 
     */
    SetFrameWidth(width) {
      this.FrameWidth = width;
      this.Rows = this.Image.width / this.FrameWidth;
    }
    /**
     * 设置框高度
     * @param {Number} height 
     */
    SetFrameHeight(height) {
      this.FrameHeight = height;
      this.Columns = this.Image.height / this.FrameHeight;
    }
    /**
     * 设置列数
     * @param {Number} col 
     */
    SetColumnCount(col) {
      this.FrameWidth = this.Image.width / col;
      this.Columns = col;
    }
    /**
     * 设置行数
     * @param {Number} row 
     */
    SetRowCount(row) {
      this.FrameHeight = this.Image.height / row;
      this.Rows = row;
    }
    /**
     * 添加已存在的序列
     * @param {String} name 
     * @param {Element} element 
     */
    AddExistingSequence(name, element) {
      this.Sequences["seq_" + name] = element;
    }
    /**
     * 添加新序列
     * @param {String} name 
     * @param {Number} startRow 
     * @param {Number} startCol 
     * @param {Number} endRow 
     * @param {Number} endCol 
     */
    AddNewSequence(name, startRow, startCol, endRow, endCol) {
      this.Sequences["seq_" + name] = new Enjine.AnimationSequence(startRow, startCol, endRow, endCol);
    }
    /**
     * 删除序列
     * @param {String} name 
     */
    DeleteSequence(name) {
      this.Sequences["seq_" + name] != null && delete this.Sequences["seq_" + name];
    }
    // 清除序列
    ClearSequences() {
      delete this.Sequences;
      this.Sequences = {};
    };
  },
  Collideable: class {
    /**
     * 碰撞功能
     * @param {Camera} base 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Element} key 
     */
    constructor(base, width, height, key) {
      this.Base = base;
      this.X = base.X;
      this.Y = base.Y;
      this.Width = width;
      this.Height = height;
      this.CollisionEvent = key != null ? key : function () { };
    }
    // 更新
    Update() {
      this.X = this.Base.X;
      this.Y = this.Base.Y;
    }
    /**
     * 检查碰撞
     * @param {Camera} camera 
     */
    CheckCollision(camera) {
      if (!(this.Y + this.Height < camera.Y) && !(this.Y > camera.Y + camera.Height) && !(this.X + this.Width < camera.X) && !(this.X > camera.X + camera.Width)) {
        this.CollisionEvent(camera);
        camera.CollisionEvent(this);
      }
    }
  },
  Application: class {
    /**
     * 应用程序
     * @param {Element} element 
     */
    Update(element) {
      this.stateContext.Update(element);
      this.canvas.BeginDraw();
      this.stateContext.Draw(this.canvas.BackBufferContext2D);
      this.canvas.EndDraw();
    }
    /**
     * 初始化
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} width 
     * @param {Number} height 
     */
    Initialize(ctx, width, height) {
      this.canvas = new Enjine.GameCanvas;
      this.timer = new Enjine.GameTimer;
      Enjine.KeyboardInput.Initialize();
      this.canvas.Initialize("canvas", width, height);
      this.timer.UpdateObject = this;
      this.stateContext = new Enjine.GameStateContext(ctx);
      this.timer.Start();
    }
  },
};

