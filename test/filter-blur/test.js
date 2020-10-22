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