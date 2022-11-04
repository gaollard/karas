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
