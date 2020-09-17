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
