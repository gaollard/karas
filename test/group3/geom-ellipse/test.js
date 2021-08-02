let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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ekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQUBBNyCKIECAwISAgp5QlUmAAIEGAQXdgCiCAAECEwIKekJVJgECBBoEFHQDoggCBAhMCCjoCVWZBAgQaBBQ0A2IIggQIDAhoKAnVGUSIECgQeB/AEo8hniX6J5/AAAAAElFTkSuQmCC')
      .end();
  }
};