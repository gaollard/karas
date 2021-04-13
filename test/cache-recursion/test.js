let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAgq6R06mJEBgoICCHhi6lQkQ6CGgoHvkZEoCBAYKKOiBoVuZAIEeAv8HH4Gxh6jGni8AAAAASUVORK5CYII=')
      .end();
  }
};
