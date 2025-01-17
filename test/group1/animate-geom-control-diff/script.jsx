let o = karas.render(
  <canvas width="360" height="360">
    <$line ref="t" xa="0" ya="0" xb="1" yb="1" style={{width:100,height:100}}/>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    controlA: [0.2, 0],
    controlB: [0.4, 0.6],
  },
  {
    controlA: [0.8, 0],
  }
], {
  duration: 200,
  fill: 'forwards',
});
let input = document.querySelector('input');
let n = 0;
animation.on(karas.Event.FRAME, () => {
  if(n++ === 0) {
    input.value = t.controlA + ':' + t.controlB;
  }
});
animation.on(karas.Event.FINISH, () => {
  input.value += '/' + t.controlA + ':' + t.controlB;
});
