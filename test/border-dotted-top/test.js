let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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AAECBE4v8DyBPnyK4xDnj2373elH8owECBAg8Dw/QX9q2w8uPv8szm6IAAECdyhwm5+g37ntj9t+u+1718z0q23/ucNZPTUBAgQelcBtAv2hi4/TPQ3opW1/e1R6XiwBAgTuUOA2gb7DMTw1AQIECDwpINBuggABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICog0NHFGIsAAQIC7QYIECAQFRDo6GKMRYAAAYF2AwQIEIgKCHR0McYiQICAQLsBAgQIRAUEOroYYxEgQECg3QABAgSiAgIdXYyxCBAgINBugAABAlEBgY4uxlgECBAQaDdAgACBqIBARxdjLAIECAi0GyBAgEBUQKCjizEWAQIEBNoNECBAICrwP1eTtGn1f4BdAAAAAElFTkSuQmCC')
      .end();
  }
};
