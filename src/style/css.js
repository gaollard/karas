import unit from './unit';
import font from './font';
import reset from './reset';
import gradient from './gradient';
import util from '../util/util';

function parserOneBorder(style, direction) {
  let key = `border${direction}`;
  if(!style[key]) {
    return;
  }
  let w = /\b[\d.]+px\b/i.exec(style[key]);
  if(w) {
    style[key + 'Width'] = w[0];
  }
  let s = /\b(solid|dashed|dotted)\b/i.exec(style[key]);
  if(s) {
    style[key + 'Style'] = s[1];
  }
  let c = /#[0-9a-f]{3,6}/i.exec(style[key]);
  if(c && [4, 7].indexOf(c[0].length) > -1) {
    style[key + 'Color'] = c[0];
  }
  else if(/\btransparent\b/i.test(style[key])) {
    style[key + 'Color'] = 'transparent';
  }
  else {
    c = /rgba?\(.+\)/i.exec(style[key]);
    if(c) {
      style[key + 'Color'] = c[0];
    }
  }
}

function calUnit(obj, k, v) {
  if(v === 'auto') {
    obj[k] = {
      unit: unit.AUTO,
    };
  }
  else if(v === 'inherit') {
    obj[k] = {
      unit: unit.INHERIT,
    };
  }
  else if(/px$/.test(v)) {
    v = parseFloat(v) || 0;
    obj[k] = {
      value: v,
      unit: unit.PX,
    };
  }
  else if(/%$/.test(v)) {
    // border不支持百分比
    if(k.toString().indexOf('border') === 0) {
      obj[k] = {
        value: 0,
        unit: unit.PX,
      };
    }
    else {
      v = parseFloat(v) || 0;
      obj[k] = {
        value: v,
        unit: unit.PERCENT,
      };
    }
  }
  else {
    v = parseFloat(v) || 0;
    obj[k] = {
      value: v,
      unit: unit.PX,
    };
  }
  return obj;
}

function normalize(style, noReset) {
  // 默认reset
  if(!noReset) {
    reset.forEach(item => {
      if(!style.hasOwnProperty(item.k)) {
        style[item.k] = item.v;
      }
    });
  }
  let temp = style.background;
  // 处理渐变背景色
  if(temp) {
    // 优先gradient，没有再考虑颜色
    let gd = gradient.parseGradient(temp);
    if(gd) {
      style.backgroundGradient = gd;
    }
    else {
      let bgc = /#[0-9a-f]{3,6}/i.exec(temp);
      if(bgc && [4, 7].indexOf(bgc[0].length) > -1) {
        style.backgroundColor = bgc[0];
      }
      else {
        bgc = /rgba?\(.+\)/i.exec(temp);
        if(bgc) {
          style.backgroundColor = bgc[0];
        }
      }
    }
  }
  // 处理缩写
  temp = style.flex;
  if(temp) {
    if(temp === 'none') {
      style.flexGrow = 0;
      style.flexShrink = 0;
      style.flexBasis = 'auto';
    }
    else if(temp === 'auto') {
      style.flexGrow = 1;
      style.flexShrink = 1;
      style.flexBasis = 'auto';
    }
    else if(/^[\d.]+$/.test(temp)) {
      style.flexGrow = parseFloat(temp);
      style.flexShrink = 1;
      style.flexBasis = 0;
    }
    else if(/^[\d.]+px$/.test(temp)) {}
    else if(/^[\d.]+%$/.test(temp)) {}
    else {
      style.flexGrow = 0;
      style.flexShrink = 1;
      style.flexBasis = 'auto';
    }
  }
  temp = style.border;
  if(temp) {
    style.borderTop = style.borderRight = style.borderBottom = style.borderLeft = temp;
  }
  temp = style.margin;
  if(temp) {
    let match = temp.toString().match(/(-?[\d.]+(px|%)?)|(auto)/ig);
    if(match) {
      if(match.length === 1) {
        match[3] = match[2] = match[1] = match[0];
      }
      else if(match.length === 2) {
        match[2] = match[0];
        match[3] = match[1];
      }
      else if(match.length === 3) {
        match[3] = match[1];
      }
      style.marginTop = match[0];
      style.marginRight = match[1];
      style.marginBottom = match[2];
      style.marginLeft = match[3];
    }
  }
  temp = style.padding;
  if(temp) {
    let match = temp.toString().match(/(-?[\d.]+(px|%)?)|(auto)/ig);
    if(match) {
      if(match.length === 1) {
        match[3] = match[2] = match[1] = match[0];
      }
      else if(match.length === 2) {
        match[2] = match[0];
        match[3] = match[1];
      }
      else if(match.length === 3) {
        match[3] = match[1];
      }
      style.paddingTop = match[0];
      style.paddingRight = match[1];
      style.paddingBottom = match[2];
      style.paddingLeft = match[3];
    }
  }
  temp = style.transform;
  if(temp) {
    let match = temp.toString().match(/\w+\(.+?\)/g);
    if(match) {
      let transform = style.transform = [];
      match.forEach(item => {
        let i = item.indexOf('(');
        let k = item.slice(0, i);
        let v = item.slice(i + 1, item.length - 1);
        if(k === 'matrix') {
          let arr = v.split(/\s*,\s*/);
          arr = arr.map(item => parseFloat(item));
          if(arr.length > 6) {
            arr = arr.slice(0, 6);
          }
          if(arr.length === 6) {
            transform.push(['matrix', arr]);
          }
        }
        else if(k === 'translateX') {
          let arr = ['translateX', v];
          transform.push(calUnit(arr, 1, v));
        }
        else if(k === 'translateY') {
          let arr = ['translateY', v];
          transform.push(calUnit(arr, 1, v));
        }
        else if(k === 'translate') {
          let arr = v.split(/\s*,\s*/);
          let arr1 = ['translateX', arr[0]];
          let arr2 = ['translateY', arr[1] || arr[0]];
          transform.push(calUnit(arr1, 1, arr[0]));
          transform.push(calUnit(arr2, 1, arr[1] || arr[0]));
        }
        else if(k === 'scaleX') {
          transform.push(['scaleX', parseFloat(v) || 0]);
        }
        else if(k === 'scaleY') {
          transform.push(['scaleY', parseFloat(v) || 0]);
        }
        else if(k === 'scale') {
          let arr = v.split(/\s*,\s*/);
          let x = parseFloat(arr[0]) || 0;
          let y = parseFloat(arr[arr.length - 1]) || 0;
          transform.push(['scaleX', x]);
          transform.push(['scaleY', y]);
        }
        else if(k === 'rotateZ' || k === 'rotate') {
          transform.push(['rotateZ', parseFloat(v) || 0]);
        }
        else if(k === 'skewX') {
          transform.push(['skewX', parseFloat(v) || 0]);
        }
        else if(k === 'skewY') {
          transform.push(['skewY', parseFloat(v) || 0]);
        }
        else if(k === 'skew') {
          let arr = v.split(/\s*,\s*/);
          let x = parseFloat(arr[0]) || 0;
          let y = parseFloat(arr[arr.length - 1]) || 0;
          transform.push(['skewX', x]);
          transform.push(['skewY', y]);
        }
      });
    }
  }
  temp = style.transformOrigin;
  if(temp) {
    let match = temp.toString().match(/(-?[\d.]+(px|%)?)|(left|top|right|bottom|center)/ig);
    if(match) {
      if(match.length === 1) {
        match[1] = match[0];
      }
      let tfo = [];
      for(let i = 0; i < 2; i++) {
        let item = match[i];
        if(/px$/.test(item)) {
          tfo.push({
            value: parseFloat(item),
            unit: unit.PX,
          });
        }
        else if(/%$/.test(item)) {
          tfo.push({
            value: parseFloat(item),
            unit: unit.PERCENT,
          });
        }
        else {
          tfo.push({
            value: item,
            unit: unit.POSITION,
          });
        }
      }
      style.transformOrigin = tfo;
    }
  }
  parserOneBorder(style, 'Top');
  parserOneBorder(style, 'Right');
  parserOneBorder(style, 'Bottom');
  parserOneBorder(style, 'Left');
  // 转化不同单位值为对象标准化
  [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height',
    'flexBasis',
    'fontSize',
  ].forEach(k => {
    let v = style[k];
    if(!style.hasOwnProperty(k)) {
      return;
    }
    calUnit(style, k, v);
  });
  temp = style.fontWeight;
  if(temp || temp === 0) {
    if(temp === 'bold') {
      style.fontWeight = 700;
    }
    else if(temp === 'normal') {
      style.fontWeight = 400;
    }
    else if(temp === 'lighter') {
      style.fontWeight = 200;
    }
    else if(temp !== 'inherit') {
      style.fontWeight = parseInt(temp) || 400;
    }
  }
  temp = style.lineHeight;
  if(temp || temp === 0) {
    if(temp === 'inherit') {
      style.lineHeight = {
        unit: unit.INHERIT,
      };
    }
    if(temp === 'normal') {
      style.lineHeight = {
        unit: unit.AUTO,
      };
    }
    else if(/px$/.test(temp)) {
      style.lineHeight = {
        value: parseFloat(temp),
        unit: unit.PX,
      };
    }
    else {
      let n = parseFloat(temp) || 'normal';
      // 非法数字
      if(n === 'normal') {
        style.lineHeight = {
          unit: unit.AUTO,
        };
      }
      else {
        style.lineHeight = {
          value: n,
          unit: unit.NUMBER,
        };
      }
    }
  }
  return style;
}

function computedFontSize(computedStyle, fontSize, parentComputedStyle, isRoot) {
  if(fontSize.unit === unit.INHERIT) {
    computedStyle.fontSize = isRoot ? 16 : parentComputedStyle.fontSize;
  }
  else if(fontSize.unit === unit.PX) {
    computedStyle.fontSize = fontSize.value;
  }
  else if(fontSize.unit === unit.PERCENT) {
    computedStyle.fontSize = isRoot ? 16 * fontSize.value : parentComputedStyle.fontSize * fontSize.value;
  }
  else {
    computedStyle.fontSize = 16;
  }
}

function computed(xom, isRoot) {
  let { currentStyle } = xom;
  let { fontStyle, fontWeight, fontSize, fontFamily, color, lineHeight, textAlign } = currentStyle;
  let computedStyle = xom.__computedStyle = util.clone(currentStyle);
  let parent = xom.parent;
  let parentComputedStyle = parent && parent.computedStyle;
  // 处理继承的属性
  if(fontStyle === 'inherit') {
    computedStyle.fontStyle = isRoot ? 'normal' : parentComputedStyle.fontStyle;
  }
  if(fontWeight === 'inherit') {
    computedStyle.fontWeight = isRoot ? 400 : parentComputedStyle.fontWeight;
  }
  computedFontSize(computedStyle, fontSize, parentComputedStyle, isRoot);
  if(fontFamily === 'inherit') {
    computedStyle.fontFamily = isRoot ? 'arial' : parentComputedStyle.fontFamily;
  }
  if(color === 'inherit') {
    computedStyle.color = isRoot ? '#000' : parentComputedStyle.color;
  }
  calLineHeight(xom, lineHeight, computedStyle);
  if(textAlign === 'inherit') {
    computedStyle.textAlign = isRoot ? 'left' : parentComputedStyle.textAlign;
  }
  // 处理可提前计算的属性，如border百分比
  [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ].forEach(k => {
    let v = computedStyle[k];
    computedStyle[k] = v.value;
  });
}

function computedAnimate(xom, computedStyle, origin, isRoot) {
  let { fontSize, lineHeight, top, right, bottom, left, width, height } = computedStyle;
  let parent = xom.parent;
  let parentComputedStyle = parent && parent.computedStyle;
  if(fontSize) {
    computedFontSize(computedStyle, fontSize, parentComputedStyle, isRoot);
  }
  if(lineHeight) {
    if(!fontSize) {
      computedStyle.fontSize = origin.fontSize;
    }
    calLineHeight(xom, lineHeight, computedStyle);
    if(!fontSize) {
      delete computedStyle.fontSize;
    }
  }
  if(top) {
    calRelative(computedStyle, 'top', top, parent);
    delete computedStyle.bottom;
  }
  else if(bottom) {
    calRelative(computedStyle, 'bottom', bottom, parent);
    delete computedStyle.top;
  }
  if(left) {
    calRelative(computedStyle, 'left', left, parent, parentComputedStyle.width, true);
    delete computedStyle.right;
  }
  else if(right) {
    calRelative(computedStyle, 'right', right, parent, parentComputedStyle.width, true);
    delete computedStyle.left;
  }
  [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ].forEach(k => {
    if(computedStyle.hasOwnProperty(k)) {
      let v = computedStyle[k];
      computedStyle[k] = v.value;
    }
  });
  if(width) {
    let v = 0;
    if(width.unit === unit.PX) {
      v = width.value;
    }
    else if(width.unit === unit.PERCENT) {
      v = width.value * parentComputedStyle.width * 0.01;
    }
    computedStyle.width = v;
  }
  if(height) {
    let v = 0;
    if(height.unit === unit.PX) {
      v = height.value;
    }
    else if(height.unit === unit.PERCENT) {
      v = height.value * parentComputedStyle.height * 0.01;
    }
    computedStyle.height = v;
  }
}

function setFontStyle(style) {
  let { fontStyle, fontWeight, fontSize, fontFamily } = style;
  return `${fontStyle} ${fontWeight} ${fontSize}px/${fontSize}px ${fontFamily}`;
}

function getBaseLine(style) {
  let normal = style.fontSize * font.arial.lhr;
  return (style.lineHeight - normal) * 0.5 + style.fontSize * font.arial.blr;
}

function calLineHeight(xom, lineHeight, computedStyle) {
  if(util.isNumber(lineHeight)) {}
  if(lineHeight.unit === unit.INHERIT) {
    let parent = xom.parent;
    if(parent) {
      let pl = parent.style.lineHeight;
      // 一直继承向上查找直到root
      if(pl.unit === unit.INHERIT) {
        parent = parent.parent;
        while(parent) {
          pl = parent.style.lineHeight;
          if(pl.unit !== unit.INHERIT) {
            break;
          }
        }
      }
      let parentComputedStyle = parent.computedStyle;
      if(pl.unit === unit.PX) {
        computedStyle.lineHeight = parentComputedStyle.lineHeight;
      }
      else if(pl.unit === unit.NUMBER) {
        computedStyle.lineHeight = Math.max(pl.value, 0) * computedStyle.fontSize;
      }
      else {
        computedStyle.lineHeight = calNormalLineHeight(computedStyle);
      }
    }
    else {
      // root的继承强制为normal
      lineHeight.unit = unit.AUTO;
      computedStyle.lineHeight = calLineHeight(computedStyle);
    }
  }
  // 防止为0
  else if(lineHeight.unit === unit.PX) {
    computedStyle.lineHeight = Math.max(lineHeight.value, 0) || calNormalLineHeight(computedStyle);
  }
  else if(lineHeight.unit === unit.NUMBER) {
    computedStyle.lineHeight = Math.max(lineHeight.value, 0) * computedStyle.fontSize || calNormalLineHeight(computedStyle);
  }
  // normal
  else {
    computedStyle.lineHeight = calNormalLineHeight(computedStyle);
  }
}

function calNormalLineHeight(computedStyle) {
  return computedStyle.fontSize * font.arial.lhr;
}

function calRelativePercent(n, parent, k) {
  n *= 0.01;
  while(parent) {
    let style = parent.style[k];
    if(style.unit === unit.AUTO) {
      if(k === 'width') {
        parent = parent.parent;
      }
      else {
        break;
      }
    }
    else if(style.unit === unit.PX) {
      return n * style.value;
    }
    else if(style.unit === unit.PERCENT) {
      n *= style.value * 0.01;
      parent = parent.parent;
    }
  }
  return n;
}

function calRelative(computedStyle, k, v, parent, isWidth) {
  if(util.isNumber(v)) {}
  else if(v.unit === unit.AUTO) {
    v = 0;
  }
  else if(v.unit === unit.PX) {
    v = v.value;
  }
  else if(v.unit === unit.PERCENT) {
    if(isWidth) {
      v = calRelativePercent(v.value, parent, 'width');
    }
    else {
      v = calRelativePercent(v.value, parent, 'height');
    }
  }
  return computedStyle[k] = v;
}

function calAbsolute(computedStyle, k, v, size) {
  if(util.isNumber(v)) {}
  else if(v.unit === unit.AUTO) {
    v = 0;
  }
  else if(v.unit === unit.PX) {
    v = v.value;
  }
  else if(v.unit === unit.PERCENT) {
    v = v.value * size * 0.01;
  }
  return computedStyle[k] = v;
}

export default {
  normalize,
  computed,
  computedAnimate,
  setFontStyle,
  getBaseLine,
  calLineHeight,
  calRelative,
  calAbsolute,
};
