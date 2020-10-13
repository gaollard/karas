let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAWLUlEQVR4Xu3dDazeZXnH8R+dw9WiGdhJTGqWkUxljEpsZTrkRV2kOsHBMDLmWBG2ONnA6OTFGB0wuoFMp45IUND4ioRgFjdkIkh4kchAmU7mZLiBRAgwdQ5qNbVd7vNS7eG0nHouHi7Y50lMQM+5nruf++43//zP/zzuFC8CBAgQaCmwU8tVWRQBAgQIRKAdAgIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGeAAAECTQUEuunGWBYBAgQE2hkgQIBAUwGBbroxlkWAAAGBdgYIECDQVECgm26MZREgQECgnQECBAg0FRDophtjWQQIEBBoZ4AAAQJNBQS66cZYFgECBATaGSBAgEBTAYFuujGWRYAAAYF2BggQINBUQKCbboxlESBAQKCdAQIECDQVEOimG2NZBAgQEGhngAABAk0FBLrpxlgWAQIEBNoZIECAQFMBgW66MZZFgAABgXYGCBAg0FRAoJtujGURIEBAoJ0BAgQINBUQ6KYbY1kECBAQaGfgcSVw0003bX5c/YEm/4f53urVq3ed/Nt6x/kEBNq5eFwJCPSit1Og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')
      .end();
  }
};
