let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M185,150L185.0297265160523,148.27586206896552L185.11890606420928,146.55172413793105L185.26753864447087,144.82758620689657L185.4756242568371,143.10344827586206L185.74316290130798,141.3793103448276L186.07015457788347,139.6551724137931L186.45659928656357,137.93103448275863L186.90249702734837,136.20689655172416L187.40784780023782,134.48275862068965L187.97265160523187,132.75862068965517L188.59690844233057,131.03448275862067L189.28061831153389,129.31034482758622L190.02378121284187,127.58620689655172L190.82639714625446,125.86206896551724L191.68846611177167,124.13793103448276L192.6099881093936,122.41379310344828L193.59096313912008,120.68965517241378L194.6313912009512,118.96551724137932L195.73127229488705,117.24137931034483L196.8906064209275,115.51724137931033L198.1093935790725,113.79310344827587L199.38763376932224,112.0689655172414L200,111.27969348659005L200,188.72030651340998L199.38763376932224,187.9310344827586L198.1093935790725,186.20689655172413L196.8906064209275,184.48275862068965L195.73127229488705,182.75862068965517L194.6313912009512,181.03448275862064L193.5909631391201,179.31034482758622L192.60998810939358,177.58620689655174L191.68846611177167,175.8620689655172L190.8263971462545,174.1379310344828L190.02378121284187,172.41379310344828L189.28061831153386,170.68965517241378L188.59690844233057,168.96551724137933L187.97265160523185,167.24137931034483L187.40784780023782,165.51724137931035L186.9024970273484,163.79310344827587L186.45659928656363,162.0689655172414L186.07015457788347,160.34482758620692L185.74316290130798,158.62068965517244L185.47562425683708,156.89655172413796L185.26753864447087,155.17241379310343L185.11890606420928,153.44827586206898L185.02972651605234,151.72413793103448L185,150"],["fill","rgba(255,0,0,1)"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};
