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
