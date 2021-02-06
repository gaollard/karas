import Geom from './Geom';
import util from "../util/util";
import enums from '../util/enums';
import geom from '../math/geom';

const { STYLE_KEY: {
  STROKE_WIDTH,
  BOX_SHADOW,
  FILTER,
} } = enums;
const { isNil } = util;

function genVertex(x, y, width, height, rx = 0, ry = 0) {
  if(rx === 0 || ry === 0) {
    return [
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height],
      [x, y],
    ];
  }
  let ox = rx * geom.H;
  let oy = ry * geom.H;
  return [
    [x + rx, y],
    [x + width - rx, y],
    [x + width + ox - rx, y, x + width, y + ry - oy, x + width, y + ry],
    [x + width, y + height - ry],
    [x + width, y + height + oy - ry, x + width + ox - rx, y + height, x + width - rx, y + height],
    [x + rx, y + height],
    [x + rx - ox, y + height, x, y + height + oy - ry, x, y + height - ry],
    [x, y + ry],
    [x, y + ry - oy, x + rx - ox, y, x + rx, y]
  ];
}


function getR(v) {
  v = parseFloat(v);
  if(isNaN(v)) {
    v = 0;
  }
  return v;
}

class Rect extends Geom {
  constructor(tagName, props) {
    super(tagName, props);
    // 圆角
    if(this.isMulti) {
      this.__rx = [0];
      this.__ry = [0];
      if(Array.isArray(props.rx)) {
        this.__rx = props.rx.map(i => getR(i));
      }
      if(Array.isArray(props.ry)) {
        this.__ry = props.ry.map(i => getR(i));
      }
    }
    else {
      this.__rx = this.__ry = 0;
      if(!isNil(props.rx)) {
        this.__rx = getR(props.rx);
      }
      if(!isNil(props.ry)) {
        this.__ry = getR(props.ry);
      }
    }
  }

  buildCache(originX, originY) {
    let { width, height, rx, ry, __cacheProps, isMulti } = this;
    let rebuild;
    if(isNil(__cacheProps.rx)) {
      rebuild = true;
      if(isMulti) {
        __cacheProps.rx = rx.map(rx => Math.min(rx, 0.5) * width);
      }
      else {
        __cacheProps.rx = Math.min(rx, 0.5) * width;
      }
    }
    if(isNil(__cacheProps.ry)) {
      rebuild = true;
      if(isMulti) {
        __cacheProps.ry = rx.map(ry => Math.min(ry, 0.5) * height);
      }
      else {
        __cacheProps.ry = Math.min(ry, 0.5) * height;
      }
    }
    if(rebuild) {
      let { rx, ry } = __cacheProps;
      if(isMulti) {
        __cacheProps.list = rx.map((rx, i) => genVertex(originX, originY, width, height, rx, ry[i]));
      }
      else {
        __cacheProps.list = genVertex(originX, originY, width, height, rx, ry);
      }
    }
    return rebuild;
  }

  render(renderMode, lv, ctx, defs, cache) {
    let res = super.render(renderMode, lv, ctx, defs, cache);
    if(res.break) {
      return res;
    }
    this.buildCache(res.originX, res.originY);
    this.__renderPolygon(renderMode, ctx, defs, res);
    return res;
  }

  get rx() {
    return this.getProps('rx');
  }

  get ry() {
    return this.getProps('ry');
  }

  get bbox() {
    let {
      __sx2: originX, __sy2: originY, width, height,
      currentStyle: {
        [STROKE_WIDTH]: strokeWidth,
        [BOX_SHADOW]: boxShadow,
        [FILTER]: filter,
      } } = this;
    this.buildCache(originX, originY);
    let bbox = super.bbox;
    let half = 0;
    strokeWidth.forEach(item => {
      half = Math.max(item[0], half);
    });
    let [ox, oy] = this.__spreadByBoxShadowAndFilter(boxShadow, filter);
    ox += half;
    oy += half;
    bbox[0] = Math.min(bbox[0], originX - ox);
    bbox[1] = Math.min(bbox[1], originY - oy);
    bbox[2] = Math.max(bbox[2], originX + width + ox);
    bbox[3] = Math.max(bbox[3], originY + height + oy);
    return bbox;
  }
}

export default Rect;
