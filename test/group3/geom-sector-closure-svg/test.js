let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M27,27L27,2C40.807118745769834,2 52,13.192881254230164 52,27C52,40.80711874576983 40.807118745769834,52 27.000000000000004,52C13.192881254230175,52.00000000000001 2,40.807118745769834 2,27.000000000000004C2,24.083711215802523 2.5102549724020236,21.189911467449377 3.5076844803522853,18.449496416858295L27,27"],["fill","rgba(255,0,0,1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M27,2C40.807118745769834,2 52,13.192881254230164 52,27C52,40.80711874576983 40.807118745769834,52 27.000000000000004,52C13.192881254230175,52.00000000000001 2,40.807118745769834 2,27.000000000000004C2,24.083711215802523 2.5102549724020236,21.189911467449377 3.5076844803522853,18.449496416858295"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M27,79L27,54C40.807118745769834,54 52,65.19288125423016 52,79C52,92.80711874576983 40.807118745769834,104 27.000000000000004,104C13.192881254230175,104 2,92.80711874576983 2,79C2,76.08371121580252 2.5102549724020236,73.18991146744938 3.5076844803522853,70.4494964168583L27,79"],["fill","rgba(255,0,0,1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M27,79L27,54C40.807118745769834,54 52,65.19288125423016 52,79C52,92.80711874576983 40.807118745769834,104 27.000000000000004,104C13.192881254230175,104 2,92.80711874576983 2,79C2,76.08371121580252 2.5102549724020236,73.18991146744938 3.5076844803522853,70.4494964168583L27,79"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M27,106C40.807118745769834,106 52,117.19288125423016 52,131C52,144.80711874576983 40.807118745769834,156 27.000000000000004,156C13.192881254230175,156 2,144.80711874576983 2,131C2,128.0837112158025 2.5102549724020236,125.18991146744938 3.5076844803522853,122.4494964168583L27,106"],["fill","rgba(255,0,0,1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M27,106C40.807118745769834,106 52,117.19288125423016 52,131C52,144.80711874576983 40.807118745769834,156 27.000000000000004,156C13.192881254230175,156 2,144.80711874576983 2,131C2,128.0837112158025 2.5102549724020236,125.18991146744938 3.5076844803522853,122.4494964168583L27,106"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M27,158C40.807118745769834,158 52,169.19288125423017 52,183C52,196.80711874576983 40.807118745769834,208 27.000000000000004,208C13.192881254230175,208 2,196.80711874576983 2,183C2,180.0837112158025 2.5102549724020236,177.18991146744938 3.5076844803522853,174.4494964168583L27,158"],["fill","rgba(255,0,0,1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M27,158C40.807118745769834,158 52,169.19288125423017 52,183C52,196.80711874576983 40.807118745769834,208 27.000000000000004,208C13.192881254230175,208 2,196.80711874576983 2,183C2,180.0837112158025 2.5102549724020236,177.18991146744938 3.5076844803522853,174.4494964168583"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M27,235L27,210C40.807118745769834,210 52,221.19288125423017 52,235L27,235"],["fill","rgba(255,0,0,1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M27,210C40.807118745769834,210 52,221.19288125423017 52,235"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M150,10C171.01991925859892,10 189.79539524177545,23.146729816895572 196.9846310392954,42.89899283371656L150,10"],["fill","rgba(255,0,0,1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M150,10C171.01991925859892,10 189.79539524177545,23.146729816895572 196.9846310392954,42.89899283371656"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M150,110C177.61423749153965,110 200,132.38576250846032 200,160C200,177.86327949540816 190.47005383792515,194.36963044151787 175,203.30127018922195L150,110"],["fill","rgba(255,0,0,1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M150,110C177.61423749153965,110 200,132.38576250846032 200,160C200,177.86327949540816 190.47005383792515,194.36963044151787 175,203.30127018922195"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[]}')
      .end();
  }
};