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
