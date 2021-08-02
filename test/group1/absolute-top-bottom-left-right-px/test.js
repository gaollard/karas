let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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atoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAgJdatoiQIBAKCDQIaYpAgQIlAICXWraIkCAQCgg0CGmKQIECJQCAl1q2iJAgEAoINAhpikCBAiUAv8FbcOSr8wAw5gAAAAASUVORK5CYII=')
      .end();
  }
};