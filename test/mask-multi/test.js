let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAUSElEQVR4Xu3caayt/TkG8OuEKGoeS8QHVTEGMUQRQc0h1DwGMTWmiBqD6DErLT6g5po+IHhJJJIiqZLUULMSQ8Ws5oixhiP3Oc/2Lufd5+y1z15772s9z299Oe8573+vdf9/972v9aznefa+EQ8CBAgQqBS4UVmVoggQIEAgJwH9t0m+PsmXMSFAgACBDgEB3dEHVRAgQOARAgLaUBAgQKBU4F4B/XZJvjLJWyb5nyS/mORzk/zSzj72WfNxSZ6c5LFJ/jnJTyb5zCQv3HmeQ6x51HJ65kOTvHqSv0zyfUm+OMl/La+1z5rXSvK0JO+a5NFJfi/JVy/PdVLyodbs47fPmkP4zd7Oep7p2Zcnee0k4/yySX42ySck+asF5zWTfGuSd07yj0m+LsnLJ3n/JG9Y+j2gLAK1AqcF9Osl+fUkDy0hPcV/aZJ3Wr7J/izJPms+Ksl3J/mCJD+c5DWSPCPJvyR5qyS3khxqzXckeb8kn5zkl5O8TZJvTvLtyxvC7OGsNS+x7Ps/knz6EvIfsYT8+yb58SSHWrOP3z5rDuW3z/NM3+fxRUm+N8ljljfumZNxn8dPJHmzJB+zvAlPoL9+kjF949rvAoURKBU4LaDnqOcjk8zR0H8udb9Mkr9ZjlLnm26fNb+a5I+X4DzZ/rskeVaSt0/y80kOseZ3lyO4z14udJ681lzw/Iwkr7Qc7c1R3v3WvOfypvTmSX5tp18/l+TflqPqCeoJpIuu2cdvnzWH8Nu3DxPQv7M4nPDMm96bJHnr5ZPLXyT5tCTftCyYo+w/SfLnAro0AZRVLXBaQM/H1n9N8h53VT6h9ftJPmj5aHu/NR+e5N+Xo+ev2nmeV0jyD0k+dfkofIg1Exo/neTxSZ6781pzRP2jSzDMaY+z1nxIks9aTm3M0f3JY+5umSPpV03yJQdac2zG35hkAvoHllNWJzZfm2TetB63vOk+ZzmCnk9gJ48fSvIGAro6BxRXKnBaQE8Qz7nXD76r5vnmm9MTE9xnrZlzlBPEn7JzNDVP92LLOeHPX053HGLNHEFPEL9Rkufv1PyEJD+1BPd8HD9rzdQ8byyvdte+5/TOHHm/5HKEfog1Z/m1Gc+b7AT0M5N84Y7PBPS8Eb7uEtTz6WKuN7xgZ82c1ppPTE5xlIaAsnoFTgvoZ99K3uHukp+evPDJybOTzJHm/Dkf++8+yp4jpwnMOUUy/3++mXePoF8xyd8v5yzn/PAh1szr/cwpR9BPTPIjy3nzCejba24lT7px5xzpPHbXTEB/TpKXXs6PnxB8w3JRbI7Cbx5ozVl+bcZzPv+sgH735SLwnPL4rZ35+cGlBwK6NwdUVipwWkA/7dadOy0e8XgoedYTk3db7nT46OU89YuWhXP6Yq70z0XBObJ6XpI5J/k+O0/0XsuFpLlIOBfzDrFmjtbmdT9vqevk5Z6a5BOTvEqSlztZc+tObc+8kXxskt01cw56LgTOnStT18lj7mD56yTvvezlEGvmTpGz/PZZcwi/fftwVkC/TpI/XO4G+c4Fb85Bz3WImQMBXRoCyuoVOC2gH3sr+YMp+b+XWxi+IsnTlytucxR5485V/N9c7s6YUwBzC9vcjjbBO7dTzQXFD0vy/cs527mLY76B5xasuWD0jgvJodZ8S5IPWMJhLpzN889R39ckecryWrfX3Epeef7+G8lz3jR5i501L75zF8cnJfm7JB+/BP9c3Jwj8EOtmdMAZ/nts+ZQfvs8z1kBPazzhjFv1PMJak5fzaenuRtlbtUU0L05oLJSgVPvg76V3Jobiee7dg4d58rgJN3cErE8JqTnbowJ5Qm5udd47naYi2y/vbPXubd2/m3CZu6L/bHlfO7898njEGvm9rd5H5mS5xzynyb5tiUgTi743V5z68592bcfz02e9/iHb/mbf5p7nOfuibkP+qWWj+pzYXDqPnkcas3c43yW3z5rDuE3ezvrefYJ6AnjubNj3qjnqHnu+JlPJPP3+dODAIFzCJz6y5ImoOc8wC8k+a7lHMEcCu0EdF6U3HzUw0en53jJ6106e7urgpPTHddb2Dpefc7fzxvh7hvw3D0z1x3m7h8PAgTOIXDPgJ7DpTlUnMfcvnB3QM9n1hckNx93ZCF9SkDPFoX0OYbmPkvnNNBcTJ1TRHNdYM7bz9mx+XN+iMWDAIFzCNwzoHef47SA3vn/c7rj5DzvOV76epbeI6CF9GHaMeE8p4jmnP38qPxcy5iAnp8o9SBA4JwChwjoecmjCen7BLSQPufwWE6AwOUKHCqg5zcp3XzqERxJnxHQQvpy582zEyBwDoELB/Sci54TjvMzwA8lN59QHtJ7BLSQPscAWUqAwOUJXDig52e5J5zn94gu91EdzemOy2P1zAQIELi4wIUC+nuSPGn5zUl33eQqpC/eG89AgMDGBe4Z0L+S5J8WnPnZ7vmZ6Q9c/j6/bHluJp6fSpjfMzm/X/Lux9se6X3SG58H2ydAoEjgngE9ITw/qHLa44+Wn0SYX4p8r8f8JOJjjujujqKeKIUAAQK3BfY6xXFBK6c7LgjoywkQ2KbAVQT0yArpbc6XXRMgcAGBqwpoIX2BJvlSAgS2KXCVAS2ktzljdk2AwAMKXHVAC+kHbJQvI0BgewLXEdBCentzZscECDyAwHUFtJB+gGb5EgIEtiVwnQEtpLc1a3ZLgMA5Ba47oIX0ORtmOQEC2xFoCGghvZ15s1MCBM4h0BLQQvocTbOUAIFtCDQFtJDexszZJQECewq0BbSQ3rNxlhEgsH6BxoAW0uufOzskQGAPgdaAFtJ7NM8SAgTWLdAc0EJ63bNndwQInCHQHtBC2ggTILBZgWMIaCG92fG0cQLbFjiWgBbS255TuyewSYFjCmghvckRtWkC2xU4toAW0tudVTsnsDmBYwxoIb25MbVhAtsUONaAFtLbnFe7JrApgWMOaCG9qVG1WQLbEzj2gBbS25tZOyawGYE1BLSQ3sy42iiBbQmsJaCF9Lbm1m4JbEJgTQEtpDcxsjZJYDsCawtoIb2d2bVTAqsXWGNAC+nVj60NEtiGwFoDWkhvY37tksCqBdYc0EJ61aNrcwTWL7D2gBbS659hOySwWoEtBLSQXu342hiBdQtsJaCF9Lrn2O4IrFJgSwEtpFc5wjZFYL0CWwtoIb3eWbYzAqsT2GJAC+nVjbENEVinwFYDWkivc57tisCqBLYc0EJ6VaNsMwTWJ7D1gBbS65tpOyKwGgEBfaeVN28kT1lNV22EAIFVCAjoh9sopFcx0jZBYD0CAvr/91JIr2e27YTA0QsI6Ee2UEgf/VjbAIF1CAjo0/sopNcx33ZB4KgFBPS92yekj3q0FU/g+AUE9P17KKSPf8btgMDRCgjos1snpM82soIAgUsQEND7oQrp/ZysIkDggAICen9MIb2/lZUECBxAQECfD1FIn8/LagIELiAgoM+PJ6TPb+YrCBB4AAEB/QBofnfHg6H5KgIEzicgoM/ntbvakfSD2/lKAgT2EBDQeyDdZ4mQvpifryZA4D4CAvri4yGkL27oGQgQOEVAQB9mLIT0YRw9CwECOwIC+nDjIKQPZ+mZCBBIIqAPOwZC+rCeno3ApgUE9OHbL6QPb+oZCWxSQEBfTtuF9OW4elYCmxIQ0JfXbiF9ebaemcAmBAT05bZZSF+ur2cnsGoBAX357RXSl2/sFQisUkBAX01bhfTVOHsVAqsSENBX104hfXXWXonAKgQE9NW2UUhfrbdXI3DUAgL66tsnpK/e3CsSOEoBAX09bRPS1+PuVQkclYCAvr52Cenrs/fKBI5CQEBfb5uE9PX6e3UC1QIC+vrbI6SvvwcqIFApIKA72iKkO/qgCgJVAgK6px1CuqcXKiFQISCgK9rwf0UI6a5+qIbAtQqcGtDXWpEXJ0CAAIHbAgLaIBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAgK6tDHKIkCAgIA2AwQIECgVENCljVEWAQIEBLQZIECAQKmAgC5tjLIIECAgoM0AAQIESgUEdGljlEWAAAEBbQYIECBQKiCgSxujLAIECAhoM0CAAIFSAQFd2hhlESBAQECbAQIECJQKCOjSxiiLAAECAtoMECBAoFRAQJc2RlkECBAQ0GaAAAECpQICurQxyiJAgICANgMECBAoFRDQpY1RFgECBAS0GSBAgECpgIAubYyyCBAgIKDNAAECBEoFBHRpY5RFgAABAW0GCBAgUCogoEsboywCBAgIaDNAgACBUgEBXdoYZREgQEBAmwECBAiUCgjo0sYoiwABAgLaDBAgQKBUQECXNkZZBAgQENBmgAABAqUCArq0McoiQICAgDYDBAgQKBUQ0KWNURYBAgQEtBkgQIBAqYCALm2MsggQICCgzQABAgRKBQR0aWOURYAAAQFtBggQIFAqIKBLG6MsAgQICGgzQIAAgVIBAV3aGGURIEBAQJsBAgQIlAoI6NLGKIsAAQIC2gwQIECgVEBAlzZGWQQIEBDQZoAAAQKlAv8Lz1GpltkokTIAAAAASUVORK5CYII=')
      .end();
  }
};
