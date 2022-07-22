let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(20)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};