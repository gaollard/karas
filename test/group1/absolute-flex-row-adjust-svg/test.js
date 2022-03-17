let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L1,0L1,1L0,0M1,0L359,0L359,1L1,1M359,0L360,0L360,0L359,1"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M360,0L360,0L360,1L359,1M359,1L360,1L360,92.9921875L359,92.9921875M359,92.9921875L360,92.9921875L360,93.9921875L360,93.9921875"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,93.9921875L1,92.9921875L1,93.9921875L0,93.9921875M1,92.9921875L359,92.9921875L359,93.9921875L1,93.9921875M359,92.9921875L360,93.9921875L360,93.9921875L359,93.9921875"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,0L0,0L1,1L0,1M0,1L1,1L1,92.9921875L0,92.9921875M0,92.9921875L1,92.9921875L0,93.9921875L0,93.9921875"],["fill","rgba(0,0,0,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M1,1L359,1L359,92.9921875L1,92.9921875L1,1"],["fill","rgba(255,0,0,1)"]]}],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",1],["y",37.2109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","40px"]],"content":"AAAAAAAAAAAAA"},{"type":"item","tagName":"text","props":[["x",1],["y",83.20703125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","40px"]],"content":"A"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,120L1,120L1,121L0,120M1,120L359,120L359,121L1,121M359,120L360,120L360,120L359,121"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M360,120L360,120L360,121L359,121M359,121L360,121L360,212.9921875L359,212.9921875M359,212.9921875L360,212.9921875L360,213.9921875L360,213.9921875"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,213.9921875L1,212.9921875L1,213.9921875L0,213.9921875M1,212.9921875L359,212.9921875L359,213.9921875L1,213.9921875M359,212.9921875L360,213.9921875L360,213.9921875L359,213.9921875"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,120L0,120L1,121L0,121M0,121L1,121L1,212.9921875L0,212.9921875M0,212.9921875L1,212.9921875L0,213.9921875L0,213.9921875"],["fill","rgba(0,0,0,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M1,121L359,121L359,212.9921875L1,212.9921875L1,121"],["fill","rgba(255,0,0,1)"]]}],"children":[{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",1],["y",157.2109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"AAAAAAAAAAAA"},{"type":"item","tagName":"text","props":[["x",1],["y",203.20703125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"AA"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,240L1,240L1,241L0,240M1,240L201,240L201,241L1,241M201,240L202,240L202,240L201,241"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M202,240L202,240L202,241L201,241M201,241L202,241L202,332.9921875L201,332.9921875M201,332.9921875L202,332.9921875L202,333.9921875L202,333.9921875"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,333.9921875L1,332.9921875L1,333.9921875L0,333.9921875M1,332.9921875L201,332.9921875L201,333.9921875L1,333.9921875M201,332.9921875L202,333.9921875L202,333.9921875L201,333.9921875"],["fill","rgba(0,0,0,1)"]]},{"type":"item","tagName":"path","props":[["d","M0,240L0,240L1,241L0,241M0,241L1,241L1,332.9921875L0,332.9921875M0,332.9921875L1,332.9921875L0,333.9921875L0,333.9921875"],["fill","rgba(0,0,0,1)"]]}],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M1,241L201,241L201,332.9921875L1,332.9921875L1,241"],["fill","rgba(255,0,0,1)"]]}],"children":[{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",1],["y",277.2109375],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"AAAAAA"},{"type":"item","tagName":"text","props":[["x",1],["y",323.20703125],["fill","rgba(0,0,0,1)"],["font-family","arial"],["font-weight",700],["font-style","normal"],["font-size","40px"]],"content":"AAAA"}]}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};