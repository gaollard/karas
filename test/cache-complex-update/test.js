let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAARuUlEQVR4Xu3de6jeBR3H8c+zXJvb0uV1XldaNKNS06x1ES0qCosIqUjqj6Qo6PZH9EcSRPVHN4IuUFGR0B0iCsIuRLc/vFaaXaWl5pxO0+V1yzPd4nfOcU7POW66Ped8xl4H+ie35/k+r++XN4dnz9lG25P/JlmZ3q+Vo+TO3vFMRoAAgfEIjAR6PLAelQABAnsqMGegbzw2uf3Q5OQ/7elT7PHv9x30HhN6AAIE9kWBGYHevCz59dnJFc+bejnv/XxyyKYFfWkCvaD8npwAgYUSeFigL35h8puzkoknPjTOc65OXv/DhRpv8nkFekH5PTkBAgslMBnof6zJyiHMG1fNPsZbvpmc+K+FGlGgF0zeExMgsKACo2+dl3v++fQsf7QpjlufnP/1BZvTd9ALRu+JCRBYSIHRBR/PlgPuz9JdDXHOT5LTf7+rXzWW/y7QY2H1oAQItAvsdqBX3JO873PJ4q3z/pIEet7JPSEBAg0Ck4HetjlLr746WbYsOf74ZMWK2Ud74cXJK34x72ML9LyTe0ICBBoEdnwHPTGRbNgw9b/DDkvWrJl9vHd9KTnylnkdXaDnlduTESDQIrAj0Fu3Jtdfn9x0U7JkSXLaacnixTPHPOnvyRu/P6/jC/S8cnsyAgRaBEYf+li23HpDll53XbJ9+9RbHMcdlyxaNPeIb/pesuYf8/YSBHreqD0RAQJNAqNXnJOJ++7J4iOPTE44Yeq75119rdqYvPPLu/pVe+2/C/Reo/RABAjsSwKjV70uE2tOyOKDDnpsY7/y58naSx7b73mcv1qgHyec30aAwL4tMPkWx+IHdv056Ee+zCX3TX3sbtnmsQMI9NiJPQEBAo0Cc34OevjDwrvvnvrI3VFHzf6e9BmXJ6++aOwvS6DHTuwJCBBoFJgz0OvXJ7femmzZkixfnpx88uyRfvtXk2M2jPWlCfRYeT04AQKtArv8ScLh43dXXpkMf4i4evXMl/H0fybnfXusL0+gx8rrwQkQaBXYZaCHwTduTIaP4a1dO/vLOPcHybP+MraXKNBjo/XABAg0C4xeeU4mljxh6lMcT37y1P9Go4ePfPPNyTXXJGeeOfvbHIfdlrz7i2N7mQI9NloPTIBAs8DorJdn61OOzQH33pts2jQV4COOSA49NFm6NLnrrmTduqm/p+PUU+d+KS/9VXLm78byUgV6LKwelACBdoHR016bdavXZtMhJ2bztvszuuO6LNt0bZbfe0uWbnsgkz9PuPzw/G/1WfnPkhV5YK4XtGhbtn/2A7n06Btz315+0Z8YJf/by4/p4QgQIFAvMMrX8o1cmlX5Qq7I0mzbMfH9GeWGLM2BeSBHZWI3X8mVGeXHu/lr/TICBAgQeBSBUbbko3lPzsgLcnPOz7/n/LVXZ0U+nVOyLFvzkmzIm3Pj1PfXM74uzCjXUydAgACBPRMYZXs+kp/l8Hwza/KZXDbnd8vD99bfzrHZmkX5bY7Li7Ih75g1xNdnlAv3bCy/mwABAgSmAj18XZBn52W5KS/N7Rne3jgg2+fk+WMOyqdyaj6Ry/KUWd8f/nFGuRIvAQIECDx+gYcC/eBjbM6iXJBTcl7W5fTcNfl/X5KVOSGbc+RO70W/K8/L2mzMW7N+lqe/M8nnMtrpPe3HP6PfSYAAgf1SYGagv5ej86M8LR/MVXnudKDfl9NySLbkw/nb5PvOt2dx3p/n5+zckLflhlnktiT5ZUb5w36p6kUTIEBgLwjMDPTnc2LW50n5dK7a8fgX5fB8Kyfl+NyRE3NnLs+qbMnifCpX5OiHfazu/sl8Jzcn+UtGWbcXZvQQBAgQ2C8FZgb6uzkmv8kx+Uou3yFybQ7MJ/OcnJ31uSyr8qRM5M25Lmty705qm5LcluSv03Ge8zPT+6W0F02AAIHHKDAz0HfmgLw7L8hrcm3ekJsmH+87OSa/yOpcmItnefy7p8M8fLc8fNc8vP/siwABAgT2UGBmoIcHHN7SuDDPzFNzRyayKBtycF6c9Xlv/rXT8w0/3Te8nTG8Bz2Eebx/6egevlC/nQABAvuawBDoC5LM/Pe7f5tD8tPpzz2fmtt2+sGU4a2LIcy3TIf5mn3tRZuXAAEC+4LAEOhzkzxrN4f973Sc/57kzxnt9o+A7+bD+2UECBAg8KDAEOiTk5ydZOWjsNwzHeZrp8M8/IGgLwIECBAYo8AQ6COSnJ7kjFmeZ/hLkoZPZtw4/XbGbJ95HuN4HpoAAQL7r8DUX82/PWuSnJnk6GmK4ce8hzD/ZzrMf9t/ibxyAgQILIzAg4E+OMkp0291DB+TG+I8/OHf8D7z8FOBvggQIEBgngUe+settmf4J2GfkWT4acAhzMN3z74IECBAYIEEdg708FG7AzOa/vs3FmggT0uAAAECUwKP+OdhsRAgQIBAi4BAt2zCHAQIEHiEgEA7CQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUCAl26GGMRIEBAoN0AAQIESgUEunQxxiJAgIBAuwECBAiUCgh06WKMRYAAAYF2AwQIECgVEOjSxRiLAAECAu0GCBAgUCog0KWLMRYBAgQE2g0QIECgVECgSxdjLAIECAi0GyBAgECpgECXLsZYBAgQEGg3QIAAgVIBgS5djLEIECAg0G6AAAECpQICXboYYxEgQECg3QABAgRKBQS6dDHGIkCAgEC7AQIECJQKCHTpYoxFgAABgXYDBAgQKBUQ6NLFGIsAAQIC7QYIECBQKiDQpYsxFgECBATaDRAgQKBUQKBLF2MsAgQICLQbIECAQKmAQJcuxlgECBAQaDdAgACBUgGBLl2MsQgQICDQboAAAQKlAgJduhhjESBAQKDdAAECBEoFBLp0McYiQICAQLsBAgQIlAoIdOlijEWAAAGBdgMECBAoFRDo0sUYiwABAgLtBggQIFAqINClizEWAQIEBNoNECBAoFRAoEsXYywCBAgItBsgQIBAqYBAly7GWAQIEBBoN0CAAIFSAYEuXYyxCBAgINBugAABAqUC/wfOXoR4VSjDnAAAAABJRU5ErkJggg==')
      .end();
  }
};
