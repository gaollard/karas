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
