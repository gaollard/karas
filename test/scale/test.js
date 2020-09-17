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
