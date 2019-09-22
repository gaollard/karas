import Geom from './Geom';
import mode from '../mode';

const OFFSET = Math.PI * 0.5;

function getCoordByDegree(x, y, r, d) {
  while(d > 360) {
    d -= 360;
  }
  while(d < 0) {
    d += 360;
  }
  if(d >= 0 && d < 90) {
    return [
      x + Math.sin(d * Math.PI / 180) * r,
      y - Math.cos(d * Math.PI / 180) * r
    ];
  }
  else if(d >= 90 && d < 180) {
    return [
      x + Math.cos((d - 90) * Math.PI / 180) * r,
      y + Math.sin((d - 90) * Math.PI / 180) * r,
    ];
  }
  else if(d >= 180 && d < 270) {
    return [
      x - Math.cos((270 - d) * Math.PI / 180) * r,
      y + Math.sin((270 - d) * Math.PI / 180) * r,
    ];
  }
  else {
    return [
      x - Math.sin((360 - d) * Math.PI / 180) * r,
      y - Math.cos((360 - d) * Math.PI / 180) * r,
    ];
  }
}

class Sector extends Geom {
  constructor(tagName, props) {
    super(tagName, props);
    // 角度
    this.__start = 0;
    this.__end = 0;
    if(this.props.start) {
      this.__start = parseFloat(this.props.start);
      if(isNaN(this.start)) {
        this.__start = 0;
      }
    }
    if(this.props.end) {
      this.__end = parseFloat(this.props.end);
      if(isNaN(this.end)) {
        this.__end = 0;
      }
    }
    // 半径0~1，默认1
    this.__r = 1;
    if(this.props.r) {
      this.__r = parseFloat(this.props.r);
      if(isNaN(this.r)) {
        this.__r = 1;
      }
    }
  }

  render(renderMode) {
    super.render(renderMode);
    let { rx: x, ry: y, width, height, mlw, mtw, plw, ptw, style, ctx, start, end, r, virtualDom } = this;
    if(start === end) {
      return;
    }
    let {
      display,
      borderTopWidth,
      borderLeftWidth,
      stroke,
      strokeWidth,
      strokeDasharray,
      fill,
    } = style;
    if(display === 'none') {
      return;
    }
    let originX = x + borderLeftWidth.value + mlw + plw;
    let originY = y + borderTopWidth.value + mtw + ptw;
    originX += width * 0.5;
    originY += height * 0.5;
    r *= Math.min(width, height) * 0.5;
    if(renderMode === mode.CANVAS) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth;
      ctx.fillStyle = fill;
      ctx.setLineDash(strokeDasharray);
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.arc(originX, originY, r, start * Math.PI / 180 - OFFSET, end * Math.PI / 180 - OFFSET);
      ctx.fill();
      if(strokeWidth && stroke !== 'transparent') {
        ctx.stroke();
      }
      ctx.closePath();
    }
    else if(renderMode === mode.SVG) {
      let x1, y1, x2, y2;
      [ x1, y1 ] = getCoordByDegree(originX, originY, r, start);
      [ x2, y2 ] = getCoordByDegree(originX, originY, r, end);
      let large = (end - start) > 180 ? 1 : 0;
      virtualDom.content.push({
        type: 'item',
        tagName: 'path',
        props: [
          ['d', `M${originX} ${originY} L${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2} z`],
          ['fill', fill],
          ['stroke', stroke],
          ['stroke-width', strokeWidth],
          ['stroke-dasharray', strokeDasharray]
        ],
      });
    }
  }

  get start() {
    return this.__start;
  }
  get end() {
    return this.__end;
  }
  get r() {
    return this.__r;
  }
}

export default Sector;
