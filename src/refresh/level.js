import change from './change';

const ENUM = {
  // 低4位表示repaint级别
  NONE: 0, // 完全没有变化
  TRANSFORM: 1, // 仅matrix变化 1
  OPACITY: 2, // 仅透明度变化 10
  FILTER: 4, // 仅滤镜变化 100
  TRANSFORM_OPACITY: 3, // 11
  TRANSFORM_FILTER: 5, // 101
  OPACITY_FILTER: 6, // 110
  TRANSFORM_OPACITY_FILTER: 7, // 111
  REPAINT: 8, // 整体需要重绘 1000

  // 高位表示reflow
  XY: 16, // 仅自身位置变化 10000
  SIZE: 32, // 仅自身尺寸变化 100000
  REFLOW: 64, // 整体需要重排 1000000
};

let hash = {
  transform: ENUM.TRANSFORM,
  opacity: ENUM.OPACITY,
  filter: ENUM.FILTER,
  left: ENUM.XY,
  top: ENUM.XY,
  right: ENUM.XY,
  bottom: ENUM.XY,
  width: ENUM.SIZE,
  height: ENUM.SIZE,
  marginLeft: ENUM.XY,
  marginTop: ENUM.XY,
  marginRight: ENUM.XY,
  marginBottom: ENUM.XY,
  paddingLeft: ENUM.SIZE,
  paddingTop: ENUM.SIZE,
  paddingRight: ENUM.SIZE,
  paddingBottom: ENUM.SIZE,
  fontSize: ENUM.SIZE,
  fontWeight: ENUM.SIZE,
  fontFamily: ENUM.SIZE,
  lineHeight: ENUM.SIZE,
  borderLeftWidth: ENUM.SIZE,
  borderTopWidth: ENUM.SIZE,
  borderRightWidth: ENUM.SIZE,
  borderBottomWidth: ENUM.SIZE,
  justifyContent: ENUM.XY,
  alignItems: ENUM.XY,
  textAlign: ENUM.XY,
};

const TRANSFORM = {
  translateX: true,
  translateY: true,
  scaleX: true,
  scaleY: true,
  rotateZ: true,
};

let o = Object.assign({
  /**
   * 仅得出大概等级none/repaint/reflow
   * @param k
   * @returns {number|*}
   */
  getLevel(k) {
    if(change.isIgnore(k)) {
      return ENUM.NONE;
    }
    if(change.isRepaint(k)) {
      return ENUM.REPAINT;
    }
    return ENUM.REFLOW;
  },
  /**
   * 根据大概等级细化repaint分级
   * @param style
   * @param lv
   */
  getDetailLevel(style, lv) {
    if(o.eq(lv, ENUM.NONE)) {
      return ENUM.NONE;
    }
    if(o.eq(lv, ENUM.REPAINT)) {
      let lv = ENUM.NONE;
      for(let i in style) {
        if(style.hasOwnProperty(i)) {
          if(TRANSFORM.hasOwnProperty(i)) {
            lv |= ENUM.TRANSFORM;
          }
          else if(i === 'opacity') {
            lv |= ENUM.OPACITY;
          }
          else if(i === 'filter') {
            lv |= ENUM.FILTER;
          }
          else {
            lv |= ENUM.REPAINT;
          }
        }
      }
      return lv;
    }
    else {
      return ENUM.REFLOW;
    }
  },
  eq(lv, value) {
    return (lv & value) === value;
  },
  gt(lv, value) {
    return (lv & value) > value;
  },
  gte(lv, value) {
    return (lv & value) >= value;
  },
  lt(lv, value) {
    return (lv & value) < value;
  },
  lte(lv, value) {
    return (lv & value) <= value;
  },
  isReflow(lv) {
    return !this.isRepaint(lv);
  },
  isRepaint(lv) {
    return lv < ENUM.XY;
  },
}, ENUM);

export default o;
