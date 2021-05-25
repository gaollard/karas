let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[{"type":"item","tagName":"path","props":[["d","M0,0L90,0L90,80L0,80L0,0"],["fill","rgba(255,0,0,1)"]]}],"children":[],"visibility":"visible","filter":"hue-rotate(30deg)","type":"dom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
