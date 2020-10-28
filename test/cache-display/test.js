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
