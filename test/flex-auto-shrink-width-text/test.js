let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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RAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgK/AM06MppOOybvQAAAABJRU5ErkJggg==')
      .end();
  }
};
