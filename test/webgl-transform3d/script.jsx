let o = karas.render(
  <webgl width="360" height="360">
    <div style={{position:'absolute',left:50,top:50,width:100,height:100,
      background:'linear-gradient(#F00,#00F)',transform:'perspective(500)rotateY(45)'}}/>
    <div style={{position:'absolute',left:50,top:200,width:100,height:100,
      background:'linear-gradient(#F00,#00F)',transform:'rotateY(45)'}}/>
    <div style={{position:'absolute',left:200,top:50,width:100,height:100,background:'#999',
      perspective:500}}>
      <div style={{width:100,height:100,
        background:'linear-gradient(#F00,#00F)',transform:'rotateY(45)'}}/>
    </div>
    <div style={{position:'absolute',left:200,top:200,width:100,height:100,background:'#999',
      perspective:500}}>
      <div style={{width:100,height:100,
        background:'linear-gradient(#F00,#00F)',transform:'perspective(200)rotateY(45)'}}/>
    </div>
  </webgl>,
  '#test'
);