let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L360,0L360,50L0,50L0,0"],["fill","url(#karas-defs-0-0)"]]}],"children":[],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,55L360,55L360,105L0,105L0,55"],["fill","url(#karas-defs-0-1)"]]}],"children":[],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,110L360,110L360,160L0,160L0,110"],["fill","url(#karas-defs-0-2)"]]}],"children":[],"visibility":"visible","type":"dom"},{"bb":[{"type":"item","tagName":"path","props":[["d","M0,165L360,165L360,215L0,215L0,165"],["fill","url(#karas-defs-0-3)"]]}],"children":[],"visibility":"visible","type":"dom"}],"visibility":"visible","type":"dom","defs":[{"tagName":"linearGradient","props":[["x1",180],["y1",0],["x2",180],["y2",50]],"children":[{"tagName":"stop","props":[["stop-color","rgba(0,42,212,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,425,1)"],["offset","100%"]]}],"id":0,"uuid":"karas-defs-0-0","index":0},{"tagName":"linearGradient","props":[["x1",1.152412337697399],["y1",48.46434486051365],["x2",358.8475876623026],["y2",111.53565513948634]],"children":[{"tagName":"stop","props":[["stop-color","rgba(85,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,0,1)"],["offset","50%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,340,1)"],["offset","100%"]]}],"id":1,"uuid":"karas-defs-0-1","index":1},{"tagName":"linearGradient","props":[["x1",209.0908452403737],["y1",55.07355958922426],["x2",150.9091547596263],["y2",214.92644041077574]],"children":[{"tagName":"stop","props":[["stop-color","rgba(42,0,212,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,425,1)"],["offset","100%"]]}],"id":2,"uuid":"karas-defs-0-2","index":2},{"tagName":"linearGradient","props":[["x1",325.8253175473055],["y1",274.1922863405995],["x2",34.174682452694526],["y2",105.8077136594005]],"children":[{"tagName":"stop","props":[["stop-color","rgba(85,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,0,1)"],["offset","50%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,340,1)"],["offset","100%"]]}],"id":3,"uuid":"karas-defs-0-3","index":3}]}')
      .end();
  }
};
