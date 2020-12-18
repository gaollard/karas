let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M25,0C29.388416586246528,0 33.69951975392152,1.1551566122657704 37.5,3.349364905389031"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M25,50C38.807118745769834,50 50,61.192881254230166 50,75C50,88.80711874576983 38.807118745769834,100 25.000000000000004,100C22.08371121580253,100 19.189911467449356,99.48974502759796 16.44949641685828,98.49231551964772"],["fill","none"],["stroke","url(#karas-defs-0-0)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M25,125L49.6201938253052,129.34120444167326C47.513434895127475,141.28922806070744 37.132341142206755,150 25.000000000000004,150C22.08371121580253,150 19.189911467449356,149.48974502759796 16.44949641685828,148.49231551964772L25,125"],["fill","url(#karas-defs-0-1)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M49.6201938253052,129.34120444167326C47.513434895127475,141.28922806070744 37.132341142206755,150 25.000000000000004,150C22.08371121580253,150 19.189911467449356,149.48974502759796 16.44949641685828,148.49231551964772"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M25,175L16.44949641685828,198.49231551964772C6.57336490844779,194.89769762088773 7.105427357601002e-15,185.50995962929946 0,175C-3.552713678800501e-15,170.6115834137535 1.1551566122657775,166.30048024607845 3.3493649053890344,162.5L25,175"],["fill","url(#karas-defs-0-2)"],["stroke-width",0]]},{"type":"item","tagName":"path","props":[["d","M16.44949641685828,198.49231551964772C6.57336490844779,194.89769762088773 7.105427357601002e-15,185.50995962929946 0,175C-3.552713678800501e-15,170.6115834137535 1.1551566122657775,166.30048024607845 3.3493649053890344,162.5"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M37.3100969126526,227.17060222083663C36.25671744756374,233.14461403035372 31.066170571103378,237.5 25,237.5C18.096440627115086,237.5 12.5,231.90355937288493 12.5,225C12.499999999999998,222.80579170687673 13.077578306132889,220.65024012303923 14.174682452694517,218.75"],["fill","none"],["stroke","rgba(0,0,0,1)"],["stroke-width",1]]}],"visibility":"visible","type":"geom"}],"visibility":"visible","type":"dom","defs":[{"tagName":"linearGradient","props":[["x1",25],["y1",50],["x2",25],["y2",100]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-0","index":0},{"tagName":"linearGradient","props":[["x1",25],["y1",100],["x2",25],["y2",150]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-1","index":1},{"tagName":"radialGradient","props":[["cx",25],["cy",175],["r",35.35533905932738]],"children":[{"tagName":"stop","props":[["stop-color","rgba(255,0,0,1)"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","rgba(0,0,255,1)"],["offset","100%"]]}],"uuid":"karas-defs-0-2","index":2}]}')
      .end();
  }
};
