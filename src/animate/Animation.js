import css from '../style/css';
import unit from '../style/unit';
import util from '../util/util';
import inject from '../util/inject';
import Event from '../util/Event';
import frame from './frame';
import easing from './easing';
import level from './level';
import repaint from './repaint';

const KEY_COLOR = [
  'backgroundColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'color',
  'fill',
  'stroke'
];

const KEY_LENGTH = [
  'fontSize',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'bottom',
  'left',
  'right',
  'top',
  'flexBasis',
  'width',
  'height',
  'lineHeight',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'strokeWidth'
];

const KEY_GRADIENT = [
  'backgroundImage',
  'fill',
  'stroke'
];

const COLOR_HASH = {};
KEY_COLOR.forEach(k => {
  COLOR_HASH[k] = true;
});

const LENGTH_HASH = {};
KEY_LENGTH.forEach(k => {
  LENGTH_HASH[k] = true;
});

const GRADIENT_HASH = {};
KEY_GRADIENT.forEach(k => {
  GRADIENT_HASH[k] = true;
});

const GRADIENT_TYPE = {
  linear: true,
  radial: true,
};

const KEY_EXPAND = [
  'translateX',
  'translateY',
  'scaleX',
  'scaleY',
  'rotateZ',
  'skewX',
  'skewY'
];

const EXPAND_HASH = {};
KEY_EXPAND.forEach(k => {
  EXPAND_HASH[k] = true;
});

// css模式rgb和init的颜色转换为rgba数组，方便加减运算
function color2array(style) {
  KEY_COLOR.forEach(k => {
    if(!style.hasOwnProperty(k)) {
      return;
    }
    let v = style[k];
    if(GRADIENT_TYPE.hasOwnProperty(v.k)) {
      return;
    }
    style[k] = util.rgb2int(v);
  });
  KEY_GRADIENT.forEach(k => {
    if(!style.hasOwnProperty(k)) {
      return;
    }
    let v = style[k];
    if(GRADIENT_TYPE.hasOwnProperty(v.k)) {
      v.v.forEach(item => {
        item[0] = util.rgb2int(item[0]);
      });
    }
  });
}

// 对比两个样式的某个值是否相等
function equalStyle(k, a, b) {
  if(k === 'transform') {
    if(a.length !== b.length) {
      return false;
    }
    for(let i = 0, len = a.length; i < len; i++) {
      let k1 = a[i][0];
      let k2 = b[i][0];
      if(k1 !== k2) {
        return false;
      }
      else {
        let v1 = a[i][1];
        let v2 = b[i][1];
        if(k1 === 'matrix') {
          if(v1[0] !== v2[0]
            || v1[1] !== v2[1]
            || v1[2] !== v2[2]
            || v1[3] !== v2[3]
            || v1[4] !== v2[4]
            || v1[5] !== v2[5]) {
            return false;
          }
        }
        else if(v1.value !== v2.value || v1.unit !== v2.unit) {
          return false;
        }
      }
    }
    return true;
  }
  else if(k === 'transformOrigin' || k === 'backgroundSize') {
    return a[0].value === b[0].value && a[0].unit === b[0].unit
      && a[1].value === b[1].value && a[1].unit === b[1].unit;
  }
  else if(k === 'backgroundPositionX' || k === 'backgroundPositionY'
    || LENGTH_HASH.hasOwnProperty(k) || EXPAND_HASH.hasOwnProperty(k)) {
    return a.value === b.value && a.unit === b.unit;
  }
  else if(GRADIENT_HASH.hasOwnProperty(k) && a.k === b.k && GRADIENT_TYPE.hasOwnProperty(a.k)) {
    let av = a.v;
    let bv = b.v;
    if(a.d !== b.d || av.length !== bv.length) {
      return false;
    }
    for(let i = 0, len = av.length; i < len; i++) {
      let ai = av[i];
      let bi = bv[i];
      if(ai.length !== bi.length) {
        return false;
      }
      for(let j = 0; j < 4; j++) {
        if(ai[0][j] !== bi[0][j]) {
          return false;
        }
      }
      if(ai.length > 1) {
        if(ai[1].value !== bi[1].value || ai[1].unit !== bi[1].unit) {
          return false;
        }
      }
    }
    return true;
  }
  else if(repaint.GEOM.hasOwnProperty(k)) {
    if(k === 'points' || k === 'controls') {
      if(a.length !== b.length) {
        return false;
      }
      for(let i = 0, len = a.length; i < len; i++) {
        if(a[i] === b[i]) {
          continue;
        }
        if(a[i][0] !== b[i][0] || a[i][1] !== b[i][1]) {
          return false;
        }
      }
      return true;
    }
    else if(k === 'controlA' || k === 'controlB') {
      if(a.length !== b.length) {
        return false;
      }
      return a[0] === b[0] && a[1] === b[1];
    }
  }
  return a === b;
}

function isStyleReflow(k) {
  return !repaint.STYLE.hasOwnProperty(k) && !repaint.GEOM.hasOwnProperty(k);
}

// 反向将颜色数组转换为css模式，同时计算target的animateStyle改变，计算刷新等级
function calRefresh(frameStyle, lastStyle) {
  let res = false;
  let lv = level.REPAINT;
  for(let i in frameStyle) {
    if(frameStyle.hasOwnProperty(i)) {
      if(lastStyle.hasOwnProperty(i)) {
        if(!equalStyle(i, frameStyle[i], lastStyle[i])) {
          res = true;
          // 不相等且刷新等级是重新布局时可以提前跳出
          if(lv === level.REPAINT) {
            if(isStyleReflow(i)) {
              lv = level.REFLOW;
              break;
            }
          }
          else {
            break;
          }
        }
      }
      // 不同的属性判断是否重新布局提前跳出
      else {
        res = true;
        if(isStyleReflow(i)) {
          lv = level.REFLOW;
          break;
        }
      }
    }
  }
  // 防止last有style没有
  for(let i in lastStyle) {
    if(lastStyle.hasOwnProperty(i) && !frameStyle.hasOwnProperty(i)) {
      res = true;
      break;
    }
  }
  return [res, lv];
}

// 将当前frame的style赋值给动画style，xom绘制时获取
function genBeforeRefresh(frameStyle, animation, root, lv) {
  return function() {
    root.setRefreshLevel(lv);
    let style = {};
    let props = {};
    Object.keys(frameStyle).forEach(i => {
      let v = frameStyle[i];
      if(util.isNil(v)) {
        return;
      }
      // geom的属性变化
      if(repaint.GEOM.hasOwnProperty(i)) {
        props[i] = v;
      }
      else if(GRADIENT_HASH.hasOwnProperty(i) && GRADIENT_TYPE.hasOwnProperty(v.k)) {
        style[i] = {
          k: v.k,
          v: v.v.map(item => {
            let arr = [];
            let c = item[0];
            if(c[3] === 1) {
              arr.push(`rgb(${c[0]},${c[1]},${c[2]})`);
            }
            else {
              arr.push(`rgba(${c[0]},${c[1]},${c[2]},${c[3]})`);
            }
            if(item[1]) {
              arr.push(util.clone(item[1]));
            }
            return arr;
          }),
          d: v.d,
        };
      }
      else if(COLOR_HASH.hasOwnProperty(i)) {
        if(v[3] === 1) {
          style[i] = `rgb(${v[0]},${v[1]},${v[2]})`;
        }
        else {
          style[i] = `rgba(${v[0]},${v[1]},${v[2]},${v[3]})`;
        }
      }
      // geom属性先同普通样式直接赋值，渲染时各自动态获取
      else {
        style[i] = v;
      }
    });
    animation.__style = style;
    animation.__props = props;
  };
}

// 根据第一帧帧的样式，从当前样式取得同key的样式和帧对比，确认刷新等级；反过来最后一帧同
function getOriginStyleByFrame(frameStyle, target) {
  let res = {};
  let style = target.style;
  Object.keys(frameStyle).forEach(i => {
    let v = style[v];
    if(!util.isNil(v)) {
      res[i] = v;
    }
  });
  return res;
}

// 将变化的样式格式化，提取出offset属性并转化为时间
function framing(current, duration) {
  let keys = [];
  let style = {};
  Object.keys(current).forEach(i => {
    if(i === 'offset' || i === 'easing') {
      return;
    }
    let v = current[i];
    // 空的过滤掉
    if(!util.isNil(v)) {
      keys.push(i);
      style[i] = v;
    }
  });
  return {
    style,
    time: current.offset * duration,
    easing: current.easing,
    keys,
    transition: [],
  };
}

// 计算两帧之间的差，必须都含有某个属性，单位不同的以后面为准
function calDiff(prev, next, k, target) {
  if(!prev.hasOwnProperty(k) || !next.hasOwnProperty(k)) {
    return;
  }
  let res = {
    k,
  };
  let p = prev[k];
  let n = next[k];
  if(k === 'transform') {
    if(!prev[k] || !next[k]) {
      return;
    }
    // transform每项以[k,v]存在，新老可能每项不会都存在，顺序也未必一致，不存在的认为是0
    let pExist = {};
    p.forEach(item => {
      pExist[item[0]] = item[1];
    });
    let nExist = {};
    n.forEach(item => {
      nExist[item[0]] = item[1];
    });
    res.v = [];
    let key = k;
    n.forEach(item => {
      let [k, v] = item;
      // 都存在的计算差值
      if(pExist.hasOwnProperty(k)) {
        let p = pExist[k];
        let n = nExist[k];
        if(k === 'matrix') {
          let t = [];
          for(let i = 0; i < 6; i++) {
            t[i] = n[i] - p[i];
          }
          res.v.push({
            k,
            v: t,
          });
        }
        else if(p.unit === n.unit) {
          res.v.push({
            k,
            v: v.value - p.value,
          });
        }
        else if(p.unit === unit.PX && n.unit === unit.PERCENT) {
          let v = p.value * 100 / target[k === 'translateX' ? 'outerWidth' : 'outerHeight'];
          res.v.push({
            k,
            v: n.value - v,
          });
        }
        else if(p.unit === unit.PERCENT && n.unit === unit.PX) {
          let v = p.value * 0.01 / target[k === 'translateX' ? 'outerWidth' : 'outerHeight'];
          res.v.push({
            k,
            v: n.value - v,
          });
        }
      }
      // matrix老的不存在的项默认为单位矩阵
      else if(k === 'matrix') {
        let id = [1, 0, 0, 1, 0, 0];
        prev[key].push([k, id]);
        let t = [];
        for(let i = 0; i < 6; i++) {
          t[i] = v[i] - id[i];
        }
        res.v.push({
          k,
          v: t,
        });
      }
      // 老的不存在的项默认为0
      else {
        prev[key].push([k, {
          value: 0,
          unit: v.unit,
        }]);
        res.v.push({
          k,
          v: v.value,
        });
      }
    });
    p.forEach(item => {
      let [k, v] = item;
      // 新的不存在的项默认为0或单位矩阵
      if(!nExist.hasOwnProperty(k)) {
        if(k === 'matrix') {
          let id = [1, 0, 0, 1, 0, 0];
          next[key].push([k, id]);
          let t = [];
          for(let i = 0; i < 6; i++) {
            t[i] = id[i] - v[i];
          }
          res.v.push({
            k,
            v: t,
          });
        }
        else {
          next[key].push([k, {
            value: 0,
            unit: v.unit,
          }]);
          res.v.push({
            k,
            v: -v.value,
          });
        }
      }
    });
  }
  else if(k === 'transformOrigin') {
    res.v = [];
    for(let i = 0; i < 2; i++) {
      let pi = p[i];
      let ni = n[i];
      if(pi.unit === ni.unit) {
        res.v.push(ni.value - pi.value);
      }
      else if(pi.unit === unit.PX && ni.unit === unit.PERCENT) {
        let v = pi.value * 100 / target[i ? 'outerHeight' : 'outerWidth'];
        res.v.push(ni.value - v);
      }
      else if(pi.unit === unit.PERCENT && ni.unit === unit.PX) {
        let v = pi.value * 0.01 * target[i ? 'outerHeight' : 'outerWidth'];
        res.v.push(ni.value - v);
      }
      else {
        res.v.push(0);
      }
    }
  }
  else if(k === 'backgroundPositionX' || k === 'backgroundPositionY') {
    if(p.unit === n.unit && [unit.PX, unit.PERCENT].indexOf(p.unit) > -1) {
      res.v = n.value - p.value;
    }
    else {
      res.v = 0;
    }
  }
  else if(EXPAND_HASH.hasOwnProperty(k)) {
    if(p.unit === n.unit) {
      res.v = n.value - p.value;
    }
    else if(p.unit === unit.PX && n.unit === unit.PERCENT) {
      let v = p.value * 100 / target[k === 'translateX' ? 'outerWidth' : 'outerHeight'];
      res.v = n.value - v;
    }
    else if(p.unit === unit.PERCENT && n.unit === unit.PX) {
      let v = p.value * 0.01 / target[k === 'translateX' ? 'outerWidth' : 'outerHeight'];
      res.v = n.value - v;
    }
    else {
      res.v = 0;
    }
  }
  else if(k === 'backgroundSize') {
    res.v = [];
    for(let i = 0; i < 2; i++) {
      let pi = p[i];
      let ni = n[i];
      if(pi.unit === ni.unit && [unit.PX, unit.PERCENT].indexOf(pi.unit) > -1) {
        res.v.push(ni.value - pi.value);
      }
      else {
        res.v.push(0);
      }
    }
  }
  else if(GRADIENT_HASH.hasOwnProperty(k)
    && { 'linear': true, 'radial': true }.hasOwnProperty(p.k)
    && p.k === n.k
    && p.v.length
    && p.v.length) {
    let pv = p.v;
    let nv = n.v;
    res.v = [];
    for(let i = 0, len = Math.min(pv.length, nv.length); i < len; i++) {
      let a = pv[i];
      let b = nv[i];
      let t = [];
      t.push([
        b[0][0] - a[0][0],
        b[0][1] - a[0][1],
        b[0][2] - a[0][2],
        b[0][3] - a[0][3]
      ]);
      if(a[1] && b[1] && a[1].unit === b[1].unit) {
        t.push(b[1].value - a[1].value);
      }
      // 单位不同不做运算
      else {
        continue;
      }
      res.v.push(t);
    }
    if(p.k === 'linear' && p.d !== undefined && n.d !== undefined) {
      res.d = n.d - p.d;
    }
  }
  else if(COLOR_HASH.hasOwnProperty(k)) {
    // fill和stroke可能纯色和渐变不一致
    if(p.k !== n.k) {
      return;
    }
    res.v = [
      n[0] - p[0],
      n[1] - p[1],
      n[2] - p[2],
      n[3] - p[3]
    ];
  }
  else if(LENGTH_HASH.hasOwnProperty(k)) {
    // auto不做动画
    if(p.unit === unit.AUTO || n.unit === unit.AUTO) {
      return;
    }
    let parentComputedStyle = (target.parent || target).computedStyle;
    if(p.unit === n.unit) {
      res.v = n.value - p.value;
    }
    else if(p.unit === unit.PX && n.unit === unit.PERCENT) {
      let v = p.value * 100 / parentComputedStyle[k];
      res.v = n.value - v;
    }
    else if(p.unit === unit.PERCENT && n.unit === unit.PX) {
      let v = p.value * 0.01 * parentComputedStyle[k];
      res.v = n.value - v;
    }
    else {
      return;
    }
  }
  else if(repaint.GEOM.hasOwnProperty(k)) {
    if(k === 'points' || k === 'controls') {
      res.v = [];
      for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
        let pv = p[i];
        let nv = n[i];
        if(util.isNil(pv) || util.isNil(nv)) {
          res.v.push(pv);
        }
        else {
          let v = [];
          for(let j = 0, len2 = Math.max(pv.length, nv.length); j < len2; j++) {
            if(util.isNil(pv[j]) || util.isNil(nv[j])) {
              v.push(pv[j]);
            }
            else {
              v.push(nv[j] - pv[j]);
            }
          }
          res.v.push(v);
        }
      }
    }
    else if(k === 'controlA' || k === 'controlB') {
      res.v = [
        n[0] - p[0],
        n[1] - p[1]
      ];
    }
    else {
      res.v = n - p;
    }
  }
  else if(k === 'opacity') {
    res.v = n - p;
  }
  else {
    res.v = p;
  }
  return res;
}

function calFrame(prev, current, target, duration) {
  let next = framing(current, duration);
  next.keys.forEach(k => {
    let ts = calDiff(prev.style, next.style, k, target);
    // 可以形成过渡的才会产生结果返回
    if(ts) {
      prev.transition.push(ts);
    }
  });
  return next;
}

function binarySearch(i, j, time, frames) {
  if(i === j) {
    let frame = frames[i];
    if(frame.time > time) {
      return i - 1;
    }
    return i;
  }
  else {
    let middle = i + ((j - i) >> 1);
    let frame = frames[middle];
    if(frame.time === time) {
      return middle;
    }
    else if(frame.time > time) {
      return binarySearch(i, Math.max(middle - 1, i), time, frames);
    }
    else {
      return binarySearch(Math.min(middle + 1, j), j, time, frames);
    }
  }
}

// 根据百分比和缓动函数计算中间态样式
function calStyle(frame, percent) {
  let style = util.clone(frame.style);
  let timingFunction = easing[frame.easing] || easing.linear;
  if(timingFunction !== easing.linear) {
    percent = timingFunction(percent);
  }
  percent = Math.max(percent, 0);
  percent = Math.min(percent, 1);
  frame.transition.forEach(item => {
    let { k, v, d } = item;
    let st = style[k];
    if(k === 'transform') {
      let transform = style.transform;
      let hash = {};
      transform.forEach(item => {
        hash[item[0]] = item[1];
      });
      v.forEach(item => {
        let { k, v } = item;
        if(k === 'matrix') {
          for(let i = 0; i < 6; i++) {
            hash[k][i] += v[i] * percent;
          }
        }
        else {
          hash[k].value += v * percent;
        }
      });
    }
    else if(k === 'backgroundPositionX' || k === 'backgroundPositionY'
      || LENGTH_HASH.hasOwnProperty(k) || EXPAND_HASH.hasOwnProperty(k)) {
      if(v !== 0) {
        st.value += v * percent;
      }
    }
    else if(k === 'transformOrigin' || k === 'backgroundSize') {
      if(v[0] !== 0) {
        st[0].value += v[0] * percent;
      }
      if(v[1] !== 0) {
        st[1].value += v[1] * percent;
      }
    }
    else if(GRADIENT_HASH.hasOwnProperty(k) && GRADIENT_TYPE.hasOwnProperty(st.k)) {
      for(let i = 0, len = Math.min(st.v.length, v.length); i < len; i++) {
        let a = st.v[i];
        let b = v[i];
        a[0][0] += b[0][0] * percent;
        a[0][1] += b[0][1] * percent;
        a[0][2] += b[0][2] * percent;
        a[0][3] += b[0][3] * percent;
        if(a[1] && b[1]) {
          a[1].value += b[1] * percent;
        }
      }
      if(st.k === 'linear' && st.d !== undefined && d !== undefined) {
        st.d += d * percent;
      }
    }
    // color可能超限[0,255]，但浏览器已经做了限制，无需关心
    else if(COLOR_HASH.hasOwnProperty(k)) {
      st[0] += v[0] * percent;
      st[1] += v[1] * percent;
      st[2] += v[2] * percent;
      st[3] += v[3] * percent;
    }
    else if(repaint.GEOM.hasOwnProperty(k)) {
      let st = style[k];
      if(k === 'points' || k === 'controls') {
        for(let i = 0, len = Math.min(st.length, v.length); i < len; i++) {
          if(util.isNil(st[i]) || !st[i].length) {
            continue;
          }
          for(let j = 0, len2 = Math.min(st[i].length, v[i].length); j < len2; j++) {
            if(!util.isNil(st[i][j]) && !util.isNil(v[i][j])) {
              st[i][j] += v[i][j] * percent;
            }
          }
        }
      }
      else if(k === 'controlA' || k === 'controlB') {
        st[0] += v[0] * percent;
        st[1] += v[1] * percent;
      }
      else {
        style[k] += v * percent;
      }
    }
    else if(k === 'opacity') {
      style[k] += v * percent;
    }
    else {
      style[k] = v;
    }
  });
  return style;
}

function gotoOverload(isFrame, excludeDelay, cb) {
  if(util.isFunction(isFrame)) {
    cb = isFrame;
    isFrame = excludeDelay = false;
  }
  else if(util.isFunction(excludeDelay)) {
    cb = excludeDelay;
    excludeDelay = false;
  }
  return [isFrame, excludeDelay, cb];
}

let uuid = 0;

class Animation extends Event {
  constructor(target, list, options) {
    super();
    this.__id = uuid++;
    this.__target = target;
    this.__list = util.clone(list || []);
    // 动画过程另外一种形式，object描述k-v形式
    if(!Array.isArray(this.__list)) {
      let nl = [];
      let l = this.__list;
      Object.keys(l).forEach(k => {
        let v = l[k];
        if(Array.isArray(v)) {
          for(let i = 0, len = v.length; i < len; i++) {
            let o = nl[i] = nl[i] || {
              offset: i / (len - 1),
            };
            o[k] = v[i];
          }
        }
      });
      this.__list = nl;
    }
    if(util.isNumber(options)) {
      this.__options = {
        duration: options,
      };
      options = this.__options;
    }
    let op = this.__options = options || {};
    this.__duration = parseFloat(op.duration) || 0;
    this.__delay = Math.max(0, parseFloat(op.delay) || 0);
    this.__endDelay = Math.max(parseFloat(op.endDelay) || 0, 0);
    if(op.iterations === 'Infinity' || op.iterations === 'infinity' || op.iterations === Infinity) {
      this.__iterations = Infinity;
    }
    else {
      this.__iterations = parseInt(op.iterations);
      if(isNaN(this.__iterations)) {
        this.__iterations = 1;
      }
    }
    this.__fps = parseInt(op.fps) || 60;
    if(this.__fps < 0) {
      this.__fps = 60;
    }
    this.__fill = op.fill || 'none';
    this.__direction = op.direction || 'normal';
    this.__frames = [];
    this.__framesR = []; // 存储反向播放的数据
    this.__playbackRate = parseFloat(op.playbackRate) || 1;
    if(this.__playbackRate < 0) {
      this.__playbackRate = 1;
    }
    this.__startTime = 0;
    this.__offsetTime = 0; // 存储上次因暂停导致的时间偏移量长度
    this.__pauseTime = 0; // 上次暂停时刻的时间
    this.__playTime = 0; // 播放时间，不包括暂停时长，但包括delay、变速，以此定位动画处于何时
    this.__lastFpsTime = 0; // fps<60时跳帧使用，帧回调依旧运行，多次时间累加超过fps时才执行
    this.__deltaTime = 0; // gotoAndPlay使用，增加运行时间从而偏移帧数
    this.__playState = 'idle';
    this.__playCount = 0;
    this.__isDestroyed = false;
    this.__init();
  }

  __init() {
    let { target, iterations, frames, framesR, direction, duration } = this;
    // 执行次数小于1无需播放
    if(iterations < 1) {
      return;
    }
    target.__animateStyle.push(this.__style = {});
    if(target.isGeom) {
      target.__animateProps.push(this.__props = {});
    }
    // 过滤时间非法的，过滤后续offset<=前面的
    let list = this.list;
    let offset = -1;
    for(let i = 0, len = list.length; i < len; i++) {
      let current = list[i];
      if(current.hasOwnProperty('offset')) {
        current.offset = parseFloat(current.offset);
        // 超过区间[0,1]
        if(isNaN(current.offset) || current.offset < 0 || current.offset > 1) {
          list.splice(i, 1);
          i--;
          len--;
        }
        // <=前面的
        else if(current.offset <= offset) {
          list.splice(i, 1);
          i--;
          len--;
        }
        // 正常的标准化样式
        else {
          offset = current.offset;
          css.normalize(current);
          color2array(current);
        }
      }
      else {
        css.normalize(current);
        color2array(current);
      }
    }
    // 必须有1帧及以上描述
    if(list.length < 1) {
      return;
    }
    if(list.length === 1) {
      list.push(list[0]);
    }
    // 强制clone防止同引用
    list.forEach((item, i) => {
      list[i] = util.clone(item);
    });
    // 首尾时间偏移强制为[0, 1]
    let first = list[0];
    first.offset = 0;
    let last = list[list.length - 1];
    last.offset = 1;
    // 计算没有设置offset的时间
    for(let i = 1, len = list.length; i < len; i++) {
      let start = list[i];
      // 从i=1开始offset一定>0，找到下一个有offset的，均分中间无声明的
      if(!start.offset) {
        let end;
        let j = i + 1;
        for(; j < len; j++) {
          end = list[j];
          if(end.offset) {
            break;
          }
        }
        let num = j - i + 1;
        start = list[i - 1];
        let per = (end.offset - start.offset) / num;
        for(let k = i; k < j; k++) {
          let item = list[k];
          item.offset = start.offset + per * (k + 1 - i);
        }
        i = j;
      }
    }
    // 换算出60fps中每一帧，为防止空间过大，不存储每一帧的数据，只存储关键帧和增量
    let length = list.length;
    let prev;
    // 第一帧要特殊处理
    prev = framing(first, duration);
    frames.push(prev);
    for(let i = 1; i < length; i++) {
      let next = list[i];
      prev = calFrame(prev, next, target, duration);
      frames.push(prev);
    }
    // 反向存储帧的倒排结果
    if({ reverse: true, alternate: true, 'alternate-reverse': true }.hasOwnProperty(direction)) {
      let listR = util.clone(list).reverse();
      listR.forEach(item => {
        item.offset = 1 - item.offset;
        framesR.push(framing(item, duration));
      });
      prev = framing(listR[0], duration);
      framesR.push(prev);
      for(let i = 1; i < length; i++) {
        let next = listR[i];
        prev = calFrame(prev, next, target, duration);
        framesR.push(prev);
      }
    }
    // 生成finish的任务事件
    this.__fin = () => {
      this.emit(Event.KARAS_ANIMATION_FINISH);
    };
  }

  __calDiffTime(now) {
    let { playbackRate } = this;
    // 计算本帧和上帧时间差，累加到playTime上以便定位当前应该处于哪个时刻
    let diff = now - this.__lastTime - this.__offsetTime;
    diff = Math.max(diff, 0);
    if(playbackRate !== 1 && playbackRate > 0) {
      diff *= playbackRate;
    }
    // gotoAndPlay时手动累加的附加时间，以达到直接跳到后面某帧
    if(this.__deltaTime > 0) {
      diff = this.__deltaTime;
    }
    this.__deltaTime = 0;
    // 将此次增加的时间量加到播放时间上
    diff = this.__playTime += diff;
    this.__lastTime = now;
    // 每次清空偏移量防止下帧累加
    this.__offsetTime = 0;
    return diff;
  }

  play(cb) {
    if(this.isDestroyed || this.duration <= 0 || this.__playState === 'running') {
      return this;
    }
    this.__cancelTask();
    // 每次play调用标识第一次运行，需响应参数cb
    this.__firstPlay = true;
    // 从头播放还是暂停继续，第一次时虽然pending是true但还无__callback
    if(this.pending && this.__callback) {
      let diff = inject.now() - this.__pauseTime;
      // 在没有performance时，防止乱改系统时间导致偏移向前，但不能防止改时间导致的偏移向后
      diff = Math.max(diff, 0);
      this.__offsetTime = diff;
    }
    // 只有第一次调用会进初始化，另外finish/cancel视为销毁也会重新初始化
    else {
      let {
        frames,
        framesR,
        style,
        target,
        playCount,
        duration,
        direction,
        iterations,
        delay,
        endDelay,
        __fin,
      } = this;
      // 每次调用play都会从头开始，标识第一次callback运行初始化
      let init = true;
      // 是第一次运行强制不跳帧，由于设计delay和运行时独立跳帧逻辑，因此不能和firstPlay合并
      let first = true;
      let callback = this.__callback = cb => {
        let root = target.root;
        // 防止被回收没root，以及在帧回调中pause，此时frame中的callback还未回收
        if(!root || this.pending) {
          return;
        }
        let now = inject.now();
        if(init) {
          this.__startTime = this.__lastFpsTime = this.__lastTime = now;
          this.__playTime = 0;
        }
        // 计算本帧和上帧时间差，累加到playTime上以便定位当前应该处于哪个时刻
        let diff = this.__calDiffTime(now);
        // delay仅第一次生效
        if(playCount > 0) {
          delay = 0;
        }
        let needRefresh, lv;
        // 还没过前置delay
        if(diff < delay) {
          if(init && this.__stayBegin()) {
            let current = frames[0].style;
            // 对比第一帧，以及和第一帧同key的当前样式
            [needRefresh, lv] = calRefresh(current, getOriginStyleByFrame(current, target));
            if(needRefresh) {
              let task = this.__task = {
                before: genBeforeRefresh(current, this, root, lv),
                after: delta => {
                  if(util.isFunction(cb)) {
                    cb(delta);
                  }
                  this.__firstPlay = false;
                  this.emit(Event.KARAS_ANIMATION_FRAME);
                },
              };
              root.addRefreshTask(task);
            }
            else {
              frame.nextFrame(this.__task = delta => {
                if(util.isFunction(cb)) {
                  cb(delta);
                }
                this.__firstPlay = false;
                this.emit(Event.KARAS_ANIMATION_FRAME);
              });
            }
          }
          init = false;
          return;
        }
        init = false;
        // 增加的fps功能，当<60时计算跳帧
        let fps = this.fps;
        if(!util.isNumber(fps) || fps <= 0) {
          fps = 60;
        }
        // 第一帧强制不跳帧，其它未到fps时间限制不执行
        if(!first && fps < 60) {
          let time = now - this.__lastFpsTime;
          if(time < 1000 / fps) {
            return;
          }
          // 保存本帧时间供下次跳帧计算
          this.__lastFpsTime = now;
        }
        first = false;
        // 根据播放次数确定正反方向
        let currentFrames;
        if(direction === 'reverse') {
          currentFrames = framesR;
        }
        else if({ alternate: true, 'alternate-reverse': true }.hasOwnProperty(direction)) {
          let isEven = playCount % 2 === 0;
          if(direction === 'alternate') {
            currentFrames = isEven ? frames : framesR;
          }
          else {
            currentFrames = isEven ? framesR : frames;
          }
        }
        else {
          currentFrames = frames;
        }
        // 减去delay，计算在哪一帧
        diff -= delay;
        let length = currentFrames.length;
        let i = binarySearch(0, length - 1, diff, currentFrames);
        let current = currentFrames[i];
        // 最后一帧结束动画，两帧之间没有变化，不触发刷新仅触发frame事件
        if(i === length - 1) {
          current = current.style;
          [needRefresh, lv] = calRefresh(current, style);
          // 判断次数结束每帧callback调用
          if(playCount < iterations) {
            playCount = ++this.playCount;
            // 播放完一次，播放时间清零，下一次播放重计
            this.__playTime = 0;
          }
          if(playCount === iterations) {
            frame.offFrame(callback);
          }
        }
        // 否则根据目前到下一帧的时间差，计算百分比，再反馈到变化数值上
        else {
          let total = currentFrames[i + 1].time - current.time;
          let percent = (diff - current.time) / total;
          current = calStyle(current, percent);
          [needRefresh, lv] = calRefresh(current, style);
        }
        let task = delta => {
          // 最后一帧考虑后续反向播还是停留还是结束
          if(i === length - 1) {
            // 没到播放次数结束时继续
            if(iterations === Infinity || playCount < iterations) {
              if(this.__firstPlay && util.isFunction(cb)) {
                cb(delta);
              }
              this.__firstPlay = false;
              this.emit(Event.KARAS_ANIMATION_FRAME);
              return;
            }
            frame.offFrame(callback);
            // 不是停留在最后一帧还原
            let restore;
            if(this.__stayEnd()) {
              restore = __fin;
            }
            else {
              // 还原本来样式判断是否有变化刷新
              let origin = getOriginStyleByFrame(current, target);
              [needRefresh, lv] = calRefresh(current, origin);
              restore = needRefresh ? {
                before: genBeforeRefresh({}, this, root, lv),
                after: __fin,
              } : __fin;
            }
            // 如果有endDelay还要延迟执行
            let isFinished = diff >= duration + endDelay;
            if(isFinished) {
              this.__playState = 'finished';
              if(needRefresh) {
                root.addRefreshTask(this.__task = restore);
              }
              else {
                __fin();
              }
            }
            else {
              let task = this.__task = () => {
                // 这里只需要算结束后的累计时间，要考虑暂停，加到playTime上
                let diff = this.__calDiffTime(inject.now());
                let isFinished = diff >= duration + delay + endDelay;
                if(isFinished) {
                  this.__playState = 'finished';
                  if(needRefresh) {
                    root.addRefreshTask(this.__task = restore);
                  }
                  else {
                    __fin();
                  }
                  frame.offFrame(task);
                }
              };
              frame.onFrame(task);
            }
          }
          if(this.__firstPlay && util.isFunction(cb)) {
            cb(delta);
          }
          this.__firstPlay = false;
          this.emit(Event.KARAS_ANIMATION_FRAME);
        };
        if(needRefresh) {
          root.addRefreshTask(this.__task = {
            before: genBeforeRefresh(current, this, root, lv),
            after: task,
          });
        }
        else {
          frame.nextFrame(this.__task = task);
        }
      };
    }
    this.__playState = 'running';
    // 先执行，本次执行调用refreshTask也是下一帧再渲染，frame的每帧都是下一帧
    this.__callback(cb);
    frame.onFrame(this.__callback);
    return this;
  }

  pause() {
    this.__pauseTime = inject.now();
    this.__playState = 'paused';
    this.__cancelTask();
    this.emit(Event.KARAS_ANIMATION_PAUSE);
    return this;
  }

  finish(cb) {
    let { playState, style, __fin } = this;
    this.__cancelTask();
    if(playState === 'finished') {
      return this;
    }
    this.__playState = 'finished';
    this.__callback = null;
    let { target, frames } = this;
    let root = target.root;
    if(root) {
      let needRefresh, lv, current;
      // 停留在最后一帧
      if(this.__stayEnd()) {
        current = frames[frames.length - 1].style;
        [needRefresh, lv] = calRefresh(current, style);
      }
      else {
        let origin = getOriginStyleByFrame(style, target);
        [needRefresh, lv] = calRefresh(style, origin);
        current = {};
      }
      if(needRefresh) {
        root.addRefreshTask(this.__task = {
          before: genBeforeRefresh(current, this, root, lv),
          after: () => {
            if(util.isFunction(cb)) {
              cb();
            }
            __fin();
          },
        });
      }
      else {
        frame.nextFrame(this.__task = () => {
          if(util.isFunction(cb)) {
            cb();
          }
          __fin();
        });
      }
    }
    return this;
  }

  cancel(cb) {
    this.__cancelTask();
    if(this.__playState === 'idle') {
      return this;
    }
    this.__playState = 'idle';
    this.__callback = null;
    let { target, style } = this;
    let root = target.root;
    if(root) {
      let origin = getOriginStyleByFrame(style, target);
      let [needRefresh, lv] = calRefresh(style, origin);
      let task = this.__task = () => {
        if(util.isFunction(cb)) {
          cb();
        }
        this.emit(Event.KARAS_ANIMATION_CANCEL);
      };
      if(needRefresh) {
        root.addRefreshTask(this.__task = {
          before: genBeforeRefresh({}, this, root, lv),
          after: task,
        });
      }
      else {
        frame.nextFrame(this.__task = task);
      }
    }
    return this;
  }

  gotoAndPlay(v, isFrame, excludeDelay, cb) {
    let { isDestroyed, duration } = this;
    if(isDestroyed || duration <= 0) {
      return this;
    }
    [isFrame, excludeDelay, cb] = gotoOverload(isFrame, excludeDelay, cb);
    // 计算出时间点直接累加播放
    this.__goto(v, isFrame, excludeDelay);
    return this.play(cb);
  }

  gotoAndStop(v, isFrame, excludeDelay, cb) {
    let { isDestroyed, duration } = this;
    if(isDestroyed || duration <= 0) {
      return this;
    }
    [isFrame, excludeDelay, cb] = gotoOverload(isFrame, excludeDelay, cb);
    this.__goto(v, isFrame, excludeDelay);
    // 先play一帧，回调里模拟暂停
    return this.play(() => {
      this.__pauseTime = inject.now();
      this.__playState = 'paused';
      this.__cancelTask();
      if(util.isFunction(cb)) {
        cb();
      }
    });
  }

  __goto(v, isFrame, excludeDelay) {
    let { duration, iterations, delay } = this;
    this.__playState = 'paused';
    this.__cancelTask();
    if(isNaN(v) || v < 0) {
      throw new Error('Param of gotoAnd(Play/Stop) is illegal: ' + v);
    }
    if(isFrame) {
      v = (v - 1) / this.spf;
    }
    if(excludeDelay) {
      v += delay;
    }
    // 超过时间长度需要累加次数
    while(v > duration && this.playCount < iterations - 1) {
      this.__playCount++;
      v -= duration;
    }
    // 在时间范围内设置好时间，复用play直接跳到播放点
    this.__deltaTime = v;
    // this.__pauseTime = inject.now();
  }

  __stayBegin() {
    return {
      backwards: true,
      both: true,
    }.hasOwnProperty(this.fill);
  }

  __stayEnd() {
    return {
      forwards: true,
      both: true,
    }.hasOwnProperty(this.fill);
  }

  __cancelTask() {
    let { target, __task } = this;
    // 有可能使用了刷新，也有可能纯frame事件，都清除
    if(target.root) {
      target.root.delRefreshTask(__task);
    }
    frame.offFrame(__task);
    frame.offFrame(this.__callback);
  }

  __destroy() {
    frame.offFrame(this.__callback);
    this.__cancelTask();
    this.__callback = null;
    this.__playState = 'idle';
    this.__isDestroyed = true;
  }

  get id() {
    return this.__id;
  }
  get target() {
    return this.__target;
  }
  get style() {
    return this.__style;
  }
  get props() {
    return this.__props;
  }
  get list() {
    return this.__list;
  }
  get options() {
    return this.__options;
  }
  get duration() {
    return this.__duration;
  }
  get delay() {
    return this.__delay;
  }
  get endDelay() {
    return this.__endDelay;
  }
  get fps() {
    return this.__fps;
  }
  set fps(v) {
    v = parseInt(v) || 60;
    if(v < 0) {
      v = 60;
    }
    this.__fps = v;
  }
  get spf() {
    return 1 / this.fps;
  }
  get iterations() {
    return this.__iterations;
  }
  get fill() {
    return this.__fill;
  }
  get direction() {
    return this.__direction;
  }
  get frames() {
    return this.__frames;
  }
  get framesR() {
    return this.__framesR;
  }
  get playbackRate() {
    return this.__playbackRate;
  }
  set playbackRate(v) {
    v = parseFloat(v) || 0;
    if(v < 0) {
      v = 1;
    }
    this.__playbackRate = v;
  }
  get startTime() {
    return this.__startTime;
  }
  get pending() {
    return this.playState !== 'running';
  }
  get finished() {
    return this.playState === 'finished';
  }
  get playState() {
    return this.__playState;
  }
  get playCount() {
    return this.__playCount;
  }
  set playCount(v) {
    this.__playCount = v;
  }
  get isDestroyed() {
    return this.__isDestroyed;
  }
  get animating() {
    let { playState, options } = this;
    if(playState === 'idle') {
      return false;
    }
    return playState !== 'finished' || ['forwards', 'both'].indexOf(options.fill) > -1;
  }
}

export default Animation;
