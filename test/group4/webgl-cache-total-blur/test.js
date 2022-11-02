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
