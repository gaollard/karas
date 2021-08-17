let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .pause(20)
      .assert.value('input', '<defs></defs><g></g><g><g visibility="visible"><g><path d="M0,0L100,0L100,100L0,100L0,0" fill="rgba(255,0,0,1)"></path></g><g><g><text x="0" y="14.484375" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">3</text></g></g></g><g visibility="visible"><g></g><g><g><text x="0" y="114.484375" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">1</text></g></g></g><g visibility="visible"><g><path d="M0,118.3984375L100,118.3984375L100,218.3984375L0,218.3984375L0,118.3984375" fill="rgba(255,0,0,1)"></path></g><g><g><text x="0" y="132.8828125" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">3</text></g></g></g><g visibility="visible"><g></g><g><g><text x="0" y="232.8828125" fill="rgba(0,0,0,1)" font-family="arial" font-weight="400" font-style="normal" font-size="16px">2</text></g></g></g></g>')
      .end();
  }
};
