import util from '../util/util';
import unit from './unit';
import reg from './reg';
import geom from '../math/geom';
import vector from '../math/vector';

const { rgba2int, int2rgba, isNil } = util;
const { PX, PERCENT } = unit;
const { d2r } = geom;

function getLinearDeg(v) {
  let deg = 180;
  if(v === 'to top') {
    deg = 0;
  }
  else if(v === 'to top right') {
    deg = 45;
  }
  else if(v === 'to right') {
    deg = 90;
  }
  else if(v === 'to bottom right') {
    deg = 135;
  }
  else if(v === 'to bottom') {
  }
  else if(v === 'to bottom left') {
    deg = 225;
  }
  else if(v === 'to left') {
    deg = 270;
  }
  else if(v === 'to top left') {
    deg = 315;
  }
  // 数字角度，没有的话取默认角度
  else {
    let match = /(-?[\d.]+)deg/.exec(v);
    if(match) {
      deg = parseFloat(match[1]);
    }
  }
  return deg % 360;
}

function getRadialPosition(data) {
  if(/%$/.test(data) || /px$/.test(data) || /^-?[\d.]+$/.test(data)) {
    return [
      parseFloat(data),
      /%/.test(data) ? PERCENT : PX,
    ];
  }
  else {
    let res = [
      {
        top: 0,
        left: 0,
        center: 50,
        right: 100,
        bottom: 100,
      }[data],
      PERCENT,
    ];
    if(isNil(res[0])) {
      res[0] = 50;
    }
    return res;
  }
}

// 获取color-stop区间范围，去除无用值
function getColorStop(v, length) {
  let list = [];
  // 先把已经声明距离的换算成[0,1]以数组形式存入，未声明的原样存入
  for(let i = 0, len = v.length; i < len; i++) {
    let item = v[i];
    // 考虑是否声明了位置
    if(item.length > 1) {
      let p = item[1];
      if(p[1] === PERCENT) {
        list.push([item[0], p[0] * 0.01]);
      }
      else {
        list.push([item[0], p[0] / length]);
      }
    }
    else {
      list.push([item[0]]);
    }
  }
  if(list.length === 1) {
    list.push(util.clone(list[0]));
  }
  // 首尾不声明默认为[0, 1]
  if(list[0].length === 1) {
    list[0].push(0);
  }
  if(list.length > 1) {
    let i = list.length - 1;
    if(list[i].length === 1) {
      list[i].push(1);
    }
  }
  // 找到未声明位置的，需区间计算，找到连续的未声明的，前后的区间平分
  let start = list[0][1];
  for(let i = 1, len = list.length; i < len - 1; i++) {
    let item = list[i];
    if(item.length > 1) {
      start = item[1];
    }
    else {
      let j = i + 1;
      let end = list[list.length - 1][1];
      for(; j < len - 1; j++) {
        let item = list[j];
        if(item.length > 1) {
          end = item[1];
          break;
        }
      }
      let num = j - i + 1;
      let per = (end - start) / num;
      for(let k = i; k < j; k++) {
        let item = list[k];
        item.push(start + per * (k + 1 - i));
      }
      i = j;
    }
  }
  // 每个不能小于前面的，canvas/svg不能兼容这种情况，需处理
  for(let i = 1, len = list.length; i < len; i++) {
    let item = list[i];
    let prev = list[i - 1];
    if(item[1] < prev[1]) {
      item[1] = prev[1];
    }
  }
  // 0之前的和1之后的要过滤掉
  for(let i = 0, len = list.length; i < len; i++) {
    let item = list[i];
    if(item[1] > 1) {
      list.splice(i);
      let prev = list[i - 1];
      if(prev && prev[1] < 1) {
        let dr = item[0][0] - prev[0][0];
        let dg = item[0][1] - prev[0][1];
        let db = item[0][2] - prev[0][2];
        let da = item[0][3] - prev[0][3];
        let p = (1 - prev[1]) / (item[1] - prev[1]);
        list.push([
          [
            item[0][0] + dr * p,
            item[0][1] + dg * p,
            item[0][2] + db * p,
            item[0][3] + da * p,
          ],
          1],
        );
      }
      break;
    }
  }
  for(let i = list.length - 1; i >= 0; i--) {
    let item = list[i];
    if(item[1] < 0) {
      list.splice(0, i + 1);
      let next = list[i];
      if(next && next[1] > 0) {
        let dr = next[0][0] - item[0][0];
        let dg = next[0][1] - item[0][1];
        let db = next[0][2] - item[0][2];
        let da = next[0][3] - item[0][3];
        let p = (-item[1]) / (next[1] - item[1]);
        list.unshift([
          [
            item[0][0] + dr * p,
            item[0][1] + dg * p,
            item[0][2] + db * p,
            item[0][3] + da * p,
          ],
          0],
        );
      }
      break;
    }
  }
  // 可能存在超限情况，如在使用px单位超过len或<len时，canvas会报错超过[0,1]区间，需手动换算至区间内
  list.forEach(item => {
    item[0] = int2rgba(item[0]);
    if(item[1] < 0) {
      item[1] = 0;
    }
    else if(item[1] > 1) {
      item[1] = 1;
    }
  });
  return list;
}

// 根据角度和圆心获取渐变的4个点坐标
function calLinearCoords(deg, length, cx, cy) {
  let x0;
  let y0;
  let x1;
  let y1;
  if(deg >= 270) {
    let r = d2r(360 - deg);
    x0 = cx + Math.sin(r) * length;
    y0 = cy + Math.cos(r) * length;
    x1 = cx - Math.sin(r) * length;
    y1 = cy - Math.cos(r) * length;
  }
  else if(deg >= 180) {
    let r = d2r(deg - 180);
    x0 = cx + Math.sin(r) * length;
    y0 = cy - Math.cos(r) * length;
    x1 = cx - Math.sin(r) * length;
    y1 = cy + Math.cos(r) * length;
  }
  else if(deg >= 90) {
    let r = d2r(180 - deg);
    x0 = cx - Math.sin(r) * length;
    y0 = cy - Math.cos(r) * length;
    x1 = cx + Math.sin(r) * length;
    y1 = cy + Math.cos(r) * length;
  }
  else {
    let r = d2r(deg);
    x0 = cx - Math.sin(r) * length;
    y0 = cy + Math.cos(r) * length;
    x1 = cx + Math.sin(r) * length;
    y1 = cy - Math.cos(r) * length;
  }
  return [x0, y0, x1, y1];
}

// 获取径向渐变圆心半径
function calRadialRadius(shape, size, position, iw, ih, x1, y1, x2, y2) {
  // 默认椭圆a是水平轴，b是垂直轴
  let cx, cy, ax, ay, bx, by;
  if(position[0][1] === PX) {
    cx = x1 + position[0][0];
  }
  else {
    cx = x1 + position[0][0] * iw * 0.01;
  }
  if(position[1][1] === PX) {
    cy = y1 + position[1][0];
  }
  else {
    cy = y1 + position[1][0] * ih * 0.01;
  }
  let xl, yl, r, ratio = 1;
  if(size === 'closest-side' || size === 'closest-corner') {
    // 在边外特殊情况只有end颜色填充
    if(cx <= x1 || cx >= x2 || cy <= y1 || cy >= y2) {
      r = 0;
      ax = bx = cx;
      ay = by = cy;
    }
    else {
      let ratio = 1;
      if(cx < x1 + iw * 0.5) {
        xl = cx - x1;
      }
      else {
        xl = x2 - cx;
      }
      if(cy < y1 + ih * 0.5) {
        yl = cy - y1;
      }
      else {
        yl = y2 - cy;
      }
      r = Math.min(xl, yl);
      // css的角和边有对应关系，即边扩展倍数，计算为固定值
      if(size === 'closest-corner') {
        ratio = Math.sqrt(2);
      }
      xl *= ratio;
      yl *= ratio;
      if(shape === 'circle') {
        ax = cx + r;
        ay = cy;
        bx = cx;
        by = cy + r;
      }
      else {
        r *= ratio;
        ax = cx + xl * ratio;
        ay = cy;
        bx = cx;
        by = cy + yl * ratio;
      }
    }
  }
  else {
    if(cx <= x1) {
      xl = x1 - cx + iw;
    }
    else if(cx >= x2) {
      xl = cx - x2 + iw;
    }
    else if(cx < x1 + iw * 0.5) {
      xl = x2 - cx;
    }
    else {
      xl = cx - x1;
    }
    if(cy <= y1) {
      yl = y1 - cy + ih;
    }
    else if(cy >= y2) {
      yl = cy - y2 + ih;
    }
    else if(cy < y1 + ih * 0.5) {
      yl = y2 - cy;
    }
    else {
      yl = cy - y1;
    }
    r = Math.max(xl, yl);
    if(size !== 'farthest-side') {
      ratio = Math.sqrt(2);
    }
    if(shape === 'circle') {
      ax = cx + r;
      ay = cy;
      bx = cx;
      by = cy + r;
    }
    else {
      r *= ratio;
      ax = cx + xl * ratio;
      ay = cy;
      bx = cx;
      by = cy + yl * ratio;
    }
  }
  return [cx, cy, r, xl, yl, ax, ay, bx, by];
}

function parseGradient(s) {
  let gradient = reg.gradient.exec(s);
  if(gradient) {
    let o = {
      k: gradient[1],
    };
    if(o.k === 'linear') {
      let deg = /(-?[\d.]+deg)|(to\s+[toprighbml]+)/i.exec(gradient[2]);
      if(deg) {
        o.d = getLinearDeg(deg[0].toLowerCase());
      }
      // 扩展支持从a点到b点相对坐标，而不是css角度，sketch等ui软件中用此格式
      else {
        let points = /([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)/.exec(gradient[2]);
        if(points) {
          o.d = [parseFloat(points[1]), parseFloat(points[2]), parseFloat(points[3]), parseFloat(points[4])];
        }
        else {
          o.d = 180;
        }
      }
    }
    else if(o.k === 'radial') {
      o.s = gradient[2].indexOf('ellipse') > -1 ? 'ellipse' : 'circle';
      let size = /(closest|farthest)-(side|corner)/i.exec(gradient[2]);
      if(size) {
        o.z = size[0].toLowerCase();
      }
      else {
        o.z = 'farthest-corner';
      }
      let position = /at\s+((?:-?[\d.]+(?:px|%)?)|(?:left|top|right|bottom|center))(?:\s+((?:-?[\d.]+(?:px|%)?)|(?:left|top|right|bottom|center)))?/i.exec(gradient[2]);
      if(position) {
        let x = getRadialPosition(position[1]);
        let y = position[2] ? getRadialPosition(position[2]) : x;
        o.p = [x, y];
      }
      else {
        o.p = [[50, PERCENT], [50, PERCENT]];
      }
    }
    let v = gradient[2].match(/((#[0-9a-f]{3,6})|(rgba?\s*\(.+?\)))\s*(-?[\d.]+(px|%))?/ig);
    o.v = v.map(item => {
      let res = /((?:#[0-9a-f]{3,6})|(?:rgba?\s*\(.+?\)))\s*(-?[\d.]+(?:px|%))?/i.exec(item);
      let arr = [rgba2int(res[1])];
      if(res[2]) {
        arr[1] = [parseFloat(res[2])];
        if(/%$/.test(res[2])) {
          arr[1][1] = PERCENT;
        }
        else {
          arr[1][1] = PX;
        }
      }
      return arr;
    });
    return o;
  }
}

function getLinear(v, d, ox, oy, cx, cy, w, h) {
  // d为数组是2个坐标点，数字是css标准角度
  let x1, y1, x2, y2, stop;
  if(Array.isArray(d)) {
    x1 = ox + d[0] * w;
    y1 = oy + d[1] * h;
    x2 = ox + d[2] * w;
    y2 = oy + d[3] * h;
    let total = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    stop = getColorStop(v, total);
  }
  else {
    while(d >= 360) {
      d -= 360;
    }
    while(d < 0) {
      d += 360;
    }
    // 根据角度求直线上2点，设置半径为长宽最大值，这样一定在矩形外，看做一个向量A
    let len = Math.max(w, h);
    let coords = calLinearCoords(d, len, cx, cy, w, h);
    len *= 2;
    // start和4个顶点的向量在A上的投影长度
    let l1 = vector.dotProduct(ox - coords[0], oy - coords[1], coords[2] - coords[0], coords[3] - coords[1]) / len;
    let l2 = vector.dotProduct(ox + w - coords[0], oy - coords[1], coords[2] - coords[0], coords[3] - coords[1]) / len;
    let l3 = vector.dotProduct(ox + w - coords[0], oy + h - coords[1], coords[2] - coords[0], coords[3] - coords[1]) / len;
    let l4 = vector.dotProduct(ox - coords[0], oy + h - coords[1], coords[2] - coords[0], coords[3] - coords[1]) / len;
    // 最小和最大值为0~100%
    let min = l1, max = l1;
    min = Math.min(min, Math.min(l2, Math.min(l3, l4)));
    max = Math.max(max, Math.max(l2, Math.max(l3, l4)));
    // 求得0和100%的长度和坐标
    let total = max - min;
    let r1 = min / len;
    let dx = coords[2] - coords[0];
    let dy = coords[3] - coords[1];
    x1 = coords[0] + dx * r1;
    y1 = coords[1] + dy * r1;
    x2 = coords[2] - dx * r1;
    y2 = coords[3] - dy * r1;
    stop = getColorStop(v, total);
  }
  return {
    x1,
    y1,
    x2,
    y2,
    stop,
  };
}

function getRadial(v, shape, size, position, x1, y1, x2, y2) {
  let w = x2 - x1;
  let h = y2 - y1;
  let [cx, cy, r, xl, yl] = calRadialRadius(shape, size, position, w, h, x1, y1, x2, y2);
  // closest在矩形外时无效
  if(r === 0) {
    return;
  }
  // 圆形取最小值，椭圆根据最小圆进行transform，椭圆其中一边轴和r一样，另一边则大小缩放可能
  let matrix;
  if(xl !== yl) {
    matrix = [1, 0, 0, 1, 0, 0];
    if(xl !== r) {
      let p = xl / r;
      let d = cx - x1;
      cx = x1 + d / p;
      matrix[0] = p;
    }
    if(yl !== r) {
      let p = yl / r;
      let d = cy - y1;
      cy = y1 + d / p;
      matrix[3] = p;
    }
  }
  let stop = getColorStop(v, r);
  return {
    cx,
    cy,
    r,
    stop,
    matrix,
  };
}

export default {
  parseGradient,
  getLinear,
  getRadial,
};
