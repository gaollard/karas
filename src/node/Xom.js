import Node from './Node';
import mode from './mode';

function arr2hash(arr) {
  let hash = {};
  for(let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if(Array.isArray(item)) {
      hash[item[0]] = item[1];
    }
    else {
      for(let list = Object.keys(item), j = list.length - 1; j >= 0; j--) {
        let k = list[j];
        hash[k] = item[k];
      }
    }
  }
  return hash;
}

function hash2arr(hash) {
  let arr = [];
  for(let list = Object.keys(hash), i = 0, len = list.length; i < len; i++) {
    let k = list[i];
    arr.push([k, hash[k]]);
  }
  return arr;
}

function spread(arr) {
  for(let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if(!Array.isArray(item)) {
      let temp = [];
      for(let list = Object.keys(item), j = 0, len = list.length; j < len; j++) {
        let k = list[j];
        temp.push([k, item[k]]);
      }
      arr.splice(i, 1, ...temp);
    }
  }
  return arr;
}

class Xom extends Node {
  constructor(tagName, props) {
    super();
    props = props || [];
    // 构建工具中都是arr，手写可能出现hash情况
    if(Array.isArray(props)) {
      this.props = arr2hash(props);
      this.__props = spread(props);
    }
    else {
      this.props = props;
      this.__props = hash2arr(props);
    }
    this.__tagName = tagName;
    this.__style = this.props.style || {}; // style被解析后的k-v形式
  }

  __preLay(data) {
    let { style } = this;
    if(style.position === 'absolute') {
      let raParent = this.raParent;
    }
    if(style.display === 'block') {
      this.__preLayBlock(data);
    }
    else if(style.display === 'flex') {
      this.__preLayFlex(data);
    }
    else {
      this.__preLayInline(data);
    }
  }

  render() {
    let { ctx, style, x, y, width, height, outerWidth, outerHeight } = this;
    let {
      backgroundColor,
      borderTopWidth,
      borderTopColor,
      borderRightWidth,
      borderRightColor,
      borderBottomWidth,
      borderBottomColor,
      borderLeftWidth,
      borderLeftColor,
      marginTop,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    } = style;
    if(marginLeft) {
      x += marginLeft.value;
    }
    if(marginTop) {
      y += marginTop.value;
    }
    if(backgroundColor) {
      let x1 = x;
      if(borderLeftWidth) {
        x1 += borderLeftWidth.value;
      }
      let y1 = y;
      if(borderTopWidth) {
        y1 += borderTopWidth.value;
      }
      let w = width + paddingLeft.value + paddingRight.value;
      let h = height + paddingTop.value + paddingBottom.value;
      if(this.mode === mode.CANVAS) {
        ctx.beginPath();
        ctx.fillStyle = backgroundColor;
        ctx.rect(x1, y1, w, h);
        ctx.fill();
        ctx.closePath();
      }
      else if(this.mode === mode.SVG) {
        mode.appendHtml(`<rect x="${x1}" y="${y1}" width="${w}" height="${h}" fill="${backgroundColor}"/>`);
      }
    }
    if(borderTopWidth.value) {
      let x1 = x + borderLeftWidth.value;
      let y1 = y + borderTopWidth.value * 0.5;
      let x2 = x1 + width;
      if(paddingLeft) {
        x2 += paddingLeft.value;
      }
      if(paddingRight) {
        x2 += paddingRight.value;
      }
      if(this.mode === mode.CANVAS) {
        ctx.beginPath();
        ctx.lineWidth = borderTopWidth.value;
        ctx.strokeStyle = borderTopColor;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y1);
        ctx.stroke();
        ctx.closePath();
      }
      else if(this.mode === mode.SVG) {
        mode.appendHtml(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke-width="${borderTopWidth.value}" stroke="${borderTopColor}"/>`);
      }
    }
    if(borderRightWidth.value) {
      let x1 = x + width + borderLeftWidth.value + borderRightWidth.value * 0.5;
      let y1 = y;
      let y2 = y1 + height + borderTopWidth.value + borderBottomWidth.value;
      if(paddingLeft) {
        x1 += paddingLeft.value;
      }
      if(paddingRight) {
        x1 += paddingRight.value;
      }
      if(paddingTop) {
        y2 += paddingTop.value;
      }
      if(paddingBottom) {
        y2 += paddingBottom.value;
      }
      if(this.mode === mode.CANVAS) {
        ctx.beginPath();
        ctx.lineWidth = borderRightWidth.value;
        ctx.strokeStyle = borderRightColor;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.stroke();
        ctx.closePath();
      }
      else if(this.mode === mode.SVG) {
        mode.appendHtml(`<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2}" stroke-width="${borderRightWidth.value}" stroke="${borderRightColor}"/>`);
      }
    }
    if(borderBottomWidth.value) {
      let x1 = x + borderLeftWidth.value;
      let y1 = y + height + borderTopWidth.value + borderBottomWidth.value * 0.5;
      let x2 = x1 + width;
      if(paddingLeft) {
        x2 += paddingLeft.value;
      }
      if(paddingRight) {
        x2 += paddingRight.value;
      }
      if(paddingTop) {
        y1 += paddingTop.value;
      }
      if(paddingBottom) {
        y1 += paddingBottom.value;
      }
      if(this.mode === mode.CANVAS) {
        ctx.beginPath();
        ctx.lineWidth = borderBottomWidth.value;
        ctx.strokeStyle = borderBottomColor;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y1);
        ctx.stroke();
        ctx.closePath();
      }
      else if(this.mode === mode.SVG) {
        mode.appendHtml(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke-width="${borderBottomWidth.value}" stroke="${borderBottomColor}"/>`);
      }
    }
    if(borderLeftWidth.value) {
      let x1 = x + borderLeftWidth.value * 0.5;
      let y1 = y;
      let y2 = y1 + height + borderTopWidth.value + borderBottomWidth.value;
      if(paddingTop) {
        y2 += paddingTop.value;
      }
      if(paddingBottom) {
        y2 += paddingBottom.value;
      }
      if(this.mode === mode.CANVAS) {
        ctx.beginPath();
        ctx.lineWidth = borderLeftWidth.value;
        ctx.strokeStyle = borderLeftColor;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.stroke();
        ctx.closePath();
      }
      else if(this.mode === mode.SVG) {
        mode.appendHtml(`<line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y2}" stroke-width="${borderLeftWidth.value}" stroke="${borderLeftColor}"/>`);
      }
    }
  }

  get tagName() {
    return this.__tagName;
  }
  get outerWidth() {
    let { style: {
      borderLeftWidth,
      borderRightWidth,
      marginLeft,
      marginRight,
      paddingLeft,
      paddingRight,
    } } = this;
    return this.width
      + borderLeftWidth.value
      + borderRightWidth.value
      + marginLeft.value
      + marginRight.value
      + paddingLeft.value
      + paddingRight.value;
  }
  get outerHeight() {
    let { style: {
      borderTopWidth,
      borderBottomWidth,
      marginTop,
      marginBottom,
      paddingTop,
      paddingBottom,
    } } = this;
    return this.height
      + borderTopWidth.value
      + borderBottomWidth.value
      + marginTop.value
      + marginBottom.value
      + paddingTop.value
      + paddingBottom.value;
  }
  get raParent() {
    let dom = this.parent;
    while(dom.parent) {
      if(['relative', 'absolute'].indexOf(dom.style.position) > -1) {
        break;
      }
      dom = dom.parent;
    }
    return dom;
  }
}

export default Xom;