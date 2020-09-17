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
