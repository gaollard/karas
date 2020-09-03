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
