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