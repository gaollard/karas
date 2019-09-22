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
