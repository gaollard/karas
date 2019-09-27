var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"type":"dom","children":[{"bb":[{"type":"item","tagName":"rect","props":[["x",0],["y",0],["width",360],["height",50],["fill","url(#__karas-defs-1-0)"]]}],"type":"dom","children":[]},{"bb":[{"type":"item","tagName":"rect","props":[["x",0],["y",55],["width",360],["height",50],["fill","url(#__karas-defs-1-1)"]]}],"type":"dom","children":[]},{"bb":[{"type":"item","tagName":"rect","props":[["x",0],["y",110],["width",360],["height",50],["fill","url(#__karas-defs-1-2)"]]}],"type":"dom","children":[]},{"bb":[{"type":"item","tagName":"rect","props":[["x",0],["y",165],["width",360],["height",50],["fill","url(#__karas-defs-1-3)"]]}],"type":"dom","children":[]}],"defs":[{"k":"linearGradient","c":[180,-2.1316282072803006e-14,180,50.00000000000002],"v":[["rgba(0,170,85,1)",0],["rgba(0,84,170,1)",1]],"uuid":"__karas-defs-1-0"},{"k":"linearGradient","c":[1.152412337697399,48.46434486051366,358.8475876623026,111.53565513948634],"v":[["rgba(85,0,0,1)",0],["#000",0.5],["rgba(0,0,85,1)",1]],"uuid":"__karas-defs-1-1"},{"k":"linearGradient","c":[209.0908452403737,55.073559589224246,150.9091547596263,214.92644041077574],"v":[["rgba(170,0,85,1)",0],["rgba(84,0,170,1)",1]],"uuid":"__karas-defs-1-2"},{"k":"linearGradient","c":[325.8253175473055,274.1922863405995,34.174682452694526,105.8077136594005],"v":[["rgba(85,0,0,1)",0],["#000",0.5],["rgba(0,0,85,1)",1]],"uuid":"__karas-defs-1-3"}]}')
      .end();
  }
};