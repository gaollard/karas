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