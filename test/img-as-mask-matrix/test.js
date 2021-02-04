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