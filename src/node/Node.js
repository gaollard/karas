class Node {
  constructor() {
    this.__x = 0;
    this.__y = 0;
    this.__ox = 0; // relative造成的偏移量
    this.__oy = 0;
    this.__width = 0;
    this.__height = 0;
    this.__baseLine = 0;
    // 默认undefined
    // this.__prev = null;
    // this.__next = null;
    // this.__parent = null;
    // this.__root = null;
    // this.__host = null;
  }

  __structure(i, lv, j) {
    let res = this.__struct = {
      node: this,
      index: i,
      childIndex: j,
      lv,
    };
    if(this.__hasMask) {
      res.hasMask = this.__hasMask;
    }
    if(this.__hasClip) {
      res.hasClip = this.__hasClip;
    }
    return res;
  }

  __modifyStruct(root, offset = 0) {
    let struct = this.__struct;
    return [struct, 1];
  }

  __offsetX(diff, isLayout) {
    if(isLayout) {
      this.__x += diff;
    }
    else {
      this.__ox += diff;
    }
    this.__sx += diff;
  }

  __offsetY(diff, isLayout) {
    if(isLayout) {
      this.__y += diff;
    }
    else {
      this.__oy += diff;
    }
    this.__sy += diff;
  }

  __destroy() {
    this.__isDestroyed = true;
    // this.__parent = null;
  }

  get x() {
    return this.__x;
  }

  get y() {
    return this.__y;
  }

  get ox() {
    return this.__ox;
  }

  get oy() {
    return this.__oy;
  }

  get sx() {
    return this.x + this.ox;
  }

  get sy() {
    return this.y + this.oy;
  }

  get width() {
    return this.__width;
  }

  get height() {
    return this.__height;
  }

  get outerWidth() {
    return this.__width;
  }

  get outerHeight() {
    return this.__height;
  }

  get prev() {
    return this.__prev;
  }

  get next() {
    return this.__next;
  }

  get parent() {
    return this.__parent;
  }

  get domParent() {
    if(this.__domParent !== undefined) {
      return this.__domParent;
    }
    let p = this;
    let root = this.root;
    while(p) {
      if(p === root) {
        p = undefined;
        break;
      }
      if(p.parent) {
        p = p.parent;
        break;
      }
      if(p.host) {
        p = p.host;
      }
    }
    return this.__domParent = p || null;
  }

  // canvas/svg根节点
  get root() {
    return this.__root;
  }

  // component根节点
  get host() {
    return this.__host;
  }

  get baseLine() {
    return this.__baseLine;
  }

  get virtualDom() {
    return this.__virtualDom;
  }

  get isDestroyed() {
    return this.__isDestroyed;
  }
}

export default Node;
