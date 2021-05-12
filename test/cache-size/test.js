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
