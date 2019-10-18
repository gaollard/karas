var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};