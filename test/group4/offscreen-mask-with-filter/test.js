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