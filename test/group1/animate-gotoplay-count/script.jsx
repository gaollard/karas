let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t" style={{display:'inlineBlock',background:'#F00'}}>123</span>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    height: 100,
  },
  {
    height: 200,
  }
], {
  duration: 200,
  iterations: 2,
  fill: 'forwards',
});
let input = document.querySelector('input');
let n = 0;
animation.gotoAndPlay(200);
animation.on(karas.Event.FRAME, () => {
  if(n === 0) {
    input.value = t.getComputedStyle().height;
  }
  else if(n === 2) {
    input.value += '/' + (t.getComputedStyle().height > 100);
  }
  n++;
});
animation.on(karas.Event.FINISH, () => {
  input.value += '/' + t.getComputedStyle().height;
});
