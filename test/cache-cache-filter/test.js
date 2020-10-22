let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};