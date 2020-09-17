let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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DRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcgGBzkkNEiBAoBEQ6MbRCgECBHIBgc5JDRIgQKAREOjG0QoBAgRyAYHOSQ0SIECgERDoxtEKAQIEcoH/AteZ0WnLOTHZAAAAAElFTkSuQmCC')
      .end();
  }
};
