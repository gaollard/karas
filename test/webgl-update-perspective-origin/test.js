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