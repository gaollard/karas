let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPAQXdIydTEiAwUEBBDwzdygQI9BBQ0D1yMiUBAgMFFPTA0K1MgEAPgf8CT8yOh6LDk0AAAAAASUVORK5CYII=')
      .end();
  }
};