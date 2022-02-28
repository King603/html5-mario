import { Keys } from "./Keyboard.js"

export let Enjine = {
  Keys,
  KeyboardInput: {
    /** @type {Boolean[]} */
    Pressed: [],
    /** 初始化 */
    Initialize() {
      document.onkeydown = event => this.KeyDownEvent(event);
      document.onkeyup = event => this.KeyUpEvent(event);
    },
    /**
     * 判断是否按键
     * @param {Number} index 键位
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
    /** @type {{[key: string]: HTMLImageElement;}} */
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
};

