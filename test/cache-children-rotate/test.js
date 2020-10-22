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