let o = karas.render(
  <canvas width="360" height="360" cache={true}>
    <div style={{position:'relative',background:'#F00',padding:10}}>
      <span style={{position:'relative',padding:10,background:'#0F0',rotate:45}}>123</span>
      <span style={{position:'relative',padding:10,background:'#00F',rotate:45}}>456</span>
    </div>
  </canvas>,
  '#test'
);