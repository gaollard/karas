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
