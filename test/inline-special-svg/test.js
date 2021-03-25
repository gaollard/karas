let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(50)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M20,20L70,20L70,136.796875L20,136.796875L20,20"],["fill","rgba(204,204,204,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M30,10L88.90625,10L88.90625,127.875L30,127.875L30,10"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"use","props":[["xlink:href","#karas-defs-0-0"],["x",30],["y",10],["clip-path","url(#karas-defs-0-1)"]]},{"type":"item","tagName":"path","props":[["d","M20,28.3984375L78.90625,28.3984375L78.90625,146.2734375L20,146.2734375L20,28.3984375"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"use","props":[["xlink:href","#karas-defs-0-0"],["x",-38.90625],["y",28.3984375],["clip-path","url(#karas-defs-0-2)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",80],["y",74.484375],["fill","rgba(0,255,255,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"},{"type":"item","tagName":"text","props":[["x",20],["y",92.8828125],["fill","rgba(0,255,255,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"3"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","lv":0},{"bb":[{"type":"item","tagName":"path","props":[["d","M20,156.796875L70,156.796875L70,291.9921875L20,291.9921875L20,156.796875"],["fill","rgba(204,204,204,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M30,146.796875L88.90625,146.796875L88.90625,264.671875L30,264.671875L30,146.796875"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"use","props":[["xlink:href","#karas-defs-0-3"],["x",30],["y",146.796875],["clip-path","url(#karas-defs-0-4)"]]},{"type":"item","tagName":"path","props":[["d","M20,165.1953125L28.90625,165.1953125L28.90625,283.0703125L20,283.0703125L20,165.1953125"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"use","props":[["xlink:href","#karas-defs-0-3"],["x",-38.90625],["y",165.1953125],["clip-path","url(#karas-defs-0-5)"]]},{"type":"item","tagName":"path","props":[["d","M20,183.59375L78.90625,183.59375L78.90625,301.46875L20,301.46875L20,183.59375"],["fill","rgba(255,0,0,1)"]]},{"type":"item","tagName":"use","props":[["xlink:href","#karas-defs-0-3"],["x",-47.8125],["y",183.59375],["clip-path","url(#karas-defs-0-6)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",80],["y",211.28125],["fill","rgba(0,255,255,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"2"},{"type":"item","tagName":"text","props":[["x",20],["y",229.6796875],["fill","rgba(0,255,255,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"3"},{"type":"item","tagName":"text","props":[["x",20],["y",248.078125],["fill","rgba(0,255,255,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"3"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","lv":0}],"visibility":"visible","type":"dom","defs":[{"tagName":"symbol","props":[],"children":[{"type":"img","tagName":"image","props":[["xlink:href","../image.png"],["x",8.90625],["y",9.19921875],["width",100],["height",100]]}],"id":0,"uuid":"karas-defs-0-0","index":0},{"tagName":"clipPath","props":[],"children":[{"tagName":"path","props":[["d","M0,0L58.90625,0L58.90625,118.3984375L0,118.3984375,L0,0"]]}],"id":1,"uuid":"karas-defs-0-1","index":1},{"tagName":"clipPath","props":[],"children":[{"tagName":"path","props":[["d","M58.90625,0L117.8125,0L117.8125,118.3984375L58.90625,118.3984375,L58.90625,0"]]}],"id":2,"uuid":"karas-defs-0-2","index":2},{"tagName":"symbol","props":[],"children":[{"type":"img","tagName":"image","props":[["xlink:href","../image.png"],["x",13.359375],["y",9.19921875],["width",100],["height",100]]}],"id":3,"uuid":"karas-defs-0-3","index":3},{"tagName":"clipPath","props":[],"children":[{"tagName":"path","props":[["d","M0,0L58.90625,0L58.90625,118.3984375L0,118.3984375,L0,0"]]}],"id":4,"uuid":"karas-defs-0-4","index":4},{"tagName":"clipPath","props":[],"children":[{"tagName":"path","props":[["d","M58.90625,0L67.8125,0L67.8125,118.3984375L58.90625,118.3984375,L58.90625,0"]]}],"id":5,"uuid":"karas-defs-0-5","index":5},{"tagName":"clipPath","props":[],"children":[{"tagName":"path","props":[["d","M67.8125,0L126.71875,0L126.71875,118.3984375L67.8125,118.3984375,L67.8125,0"]]}],"id":6,"uuid":"karas-defs-0-6","index":6}],"lv":0}')
      .end();
  }
};
