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
