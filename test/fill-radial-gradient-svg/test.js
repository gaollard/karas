let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M10,10L110,10L110,60L10,60L10,10"],["fill","url(#karas-defs-0-0)"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M150,-15L250,-15L250,85L150,85L150,-15"],["fill","url(#karas-defs-0-1)"],["strokeWidth",0],["transform","matrix(1,0,0,0.5,0,17.5)"]]},{"type":"item","tagName":"path","props":[["d","M150,10L250,10L250,60L150,60L150,10"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M10,80L110,80L110,130L10,130L10,80"],["fill","url(#karas-defs-0-2)"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M150,80L250,80L250,130L150,130L150,80"],["fill","url(#karas-defs-0-3)"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M10,160L110,160L110,210L10,210L10,160"],["fill","url(#karas-defs-0-4)"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M150,160L250,160L250,210L150,210L150,160"],["fill","url(#karas-defs-0-5)"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[{"tagName":"radialGradient","props":[["cx",60],["cy",35],["r",70.71067811865476]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-0","index":0},{"tagName":"radialGradient","props":[["cx",200],["cy",35],["r",70.71067811865476]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-1","index":1},{"tagName":"radialGradient","props":[["cx",60],["cy",105],["r",25]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-2","index":2},{"tagName":"radialGradient","props":[["cx",200],["cy",105],["r",55.90169943749474]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-3","index":3},{"tagName":"radialGradient","props":[["cx",60],["cy",185],["r",50]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-4","index":4},{"tagName":"radialGradient","props":[["cx",230],["cy",185],["r",32.01562118716424]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-5","index":5}]}')
      .end();
  }
};
