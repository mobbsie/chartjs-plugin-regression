!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MetaDataSet=void 0;var r=n(1),i=function(){function t(t,e){var n=this;this.getXY=void 0;var i=e.regressions;this.chart=t,this.dataset=e,this.sections=(i.sections||[{startIndex:0,endIndex:e.data.length-1}]).map((function(t){return new r.MetaSection(t,n)})),this.points=e.data.map((function(t,e){return[e,e&&t||null]})),this.sections.forEach((function(t){return t.calculate(e,n)}))}return t.prototype.adjustScales=function(){if(void 0===this.topY){var t,e,n=this.chart.scales;Object.keys(n).forEach((function(r){return"x"==r[0]&&(t=n[r])||(e=n[r])})),this.topY=e.top,this.bottomY=e.bottom,this.getXY=function(n,r){return{x:t.getPixelForValue(void 0,n,void 0,!0),y:e.getPixelForValue(r)}}}},t.prototype.draw=function(){var t=this.chart.chart.ctx,e=this;t.save();try{this.dataset.regressions.extendPredictions&&function(){t.setLineDash([5,5]);for(var n=1;n<e.sections.length;n++)for(var i=e.sections[n],o=function(n){t.beginPath(),r(e.sections[n].line);var o=e.sections[n].result.predict,a=function(t){return e.getXY(t,o(t)[1])},s=a(i.startIndex);t.moveTo(s.x,s.y);for(var c=i.startIndex+1;c<i.endIndex+1;c++)s=a(c),t.lineTo(s.x,s.y);t.stroke()},a=0;a<n;a++)o(a)}();for(var n=0;n<this.sections.length;n++){this.sections[n].drawRegression(t)}}finally{t.restore()}return;function r(e){e.width&&(t.lineWidth=e.width),e.color&&(t.strokeStyle=e.color)}},t}();e.MetaDataSet=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MetaSection=void 0;var r=n(4),i={type:"linear",calculation:{precision:2,order:2},line:{width:2,color:"#000",dash:[]},extendPredictions:!1,copy:{overwriteData:"none"}},o=function(){function t(t,e){this._meta=e;var n,r,o,a,s=e.chart,c=e.dataset,u=(n=["type","calculation","line","extendPredictions","copy"],a=(r=s.config.options)&&(o=r.plugins)&&o.regressions||{},function t(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i={};return e.forEach((function(e){n.forEach((function(n){var r=n[e],o=typeof r;"undefined"!=o&&(Array.isArray(r)||"object"!=o||null==r?i[e]=r:i[e]=Object.assign({},i[e],t(Object.keys(r),r)))}))})),i}(n,i,a,c.regressions,t));this.startIndex=t.startIndex||0,this.endIndex=t.endIndex||c.data.length-1,this.type=Array.isArray(u.type)?u.type:[u.type],this.line=u.line,this.calculation=u.calculation,this.extendPredictions=u.extendPredictions,this.copy=u.copy,function(t){if(t.length>1&&t.includes("copy"))throw Error("Invalid regression type:"+u.type+'. "none" cannot be combined with other type!')}(this.type)}return t.prototype.calculate=function(t,e){var n=this,i=e.points.slice(this.startIndex,this.endIndex+1);if("copy"!=this.type[0])this.result=this.type.reduce((function(t,e){var o=r[e](i,n.calculation);return o.type=e,!t||t.r2<o.r2?o:t}),null);else if(this.copy.fromSectionIndex){var o=e.sections[this.copy.fromSectionIndex],a=this.result=Object.assign({},o.result),s=this.copy.overwriteData,c=t.data;a.points=i.map((function(t){return a.predict(t[0])})),delete a.r2,"none"!=s&&a.points.forEach((function(t){var e=t[0],r=t[1];(e<o.startIndex||e>o.endIndex)&&("all"==s||"last"==s&&e==n.endIndex||"empty"==s&&!c[e])&&(n.copy.maxValue&&(r=Math.min(n.copy.maxValue,r)),"number"==typeof n.copy.minValue&&(r=Math.max(n.copy.minValue,r)),c[e]=r)}))}},t.prototype.drawVerticalLine=function(t){t.beginPath(),this._setLineAttrs(t),t.setLineDash([10,2]),t.lineWidth=2;var e=this._meta.getXY(this.endIndex,0);t.moveTo(e.x,this._meta.topY),t.lineTo(e.x,this._meta.bottomY),t.fillText(this._meta.chart.data.labels[this.endIndex],e.x,this._meta.topY),t.stroke()},t.prototype.drawRegression=function(t){t.beginPath(),this._setLineAttrs(t);var e=this.result.points;if(e.length){var n=this._meta.getXY(this.startIndex,e[0][1]);t.moveTo(n.x,n.y);for(var r=1,i=this.startIndex+1;i<=this.endIndex;i++,r++){var o=(r<e.length?e[r]:this.result.predict(i))[1];n=this._meta.getXY(i,o),t.lineTo(n.x,n.y)}t.stroke()}},t.prototype._setLineAttrs=function(t){this.line.width&&(t.lineWidth=this.line.width),this.line.color&&(t.strokeStyle=this.line.color),this.line.dash&&t.setLineDash(this.line.dash)},t}();e.MetaSection=o},function(t,e,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(t,e,n,r){void 0===r&&(r=n),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}),i=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||e.hasOwnProperty(n)||r(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),i(n(3),e),i(n(0),e),i(n(1),e),i(n(5),e)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},function(t,e,n){var r,i,o;i=[t],void 0===(o="function"==typeof(r=function(t){"use strict";var e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var r={order:2,precision:2,period:null};function i(t,e){var n=[],r=[];t.forEach((function(t,i){null!==t[1]&&(r.push(t),n.push(e[i]))}));var i=r.reduce((function(t,e){return t+e[1]}),0)/r.length,o=r.reduce((function(t,e){var n=e[1]-i;return t+n*n}),0);return 1-r.reduce((function(t,e,r){var i=n[r],o=e[1]-i[1];return t+o*o}),0)/o}function o(t,e){var n=Math.pow(10,e);return Math.round(t*n)/n}var a={linear:function(t,e){for(var n=[0,0,0,0,0],r=0,a=0;a<t.length;a++)null!==t[a][1]&&(r++,n[0]+=t[a][0],n[1]+=t[a][1],n[2]+=t[a][0]*t[a][0],n[3]+=t[a][0]*t[a][1],n[4]+=t[a][1]*t[a][1]);var s=r*n[2]-n[0]*n[0],c=r*n[3]-n[0]*n[1],u=0===s?0:o(c/s,e.precision),l=o(n[1]/r-u*n[0]/r,e.precision),f=function(t){return[o(t,e.precision),o(u*t+l,e.precision)]},p=t.map((function(t){return f(t[0])}));return{points:p,predict:f,equation:[u,l],r2:o(i(t,p),e.precision),string:0===l?"y = "+u+"x":"y = "+u+"x + "+l}},exponential:function(t,e){for(var n=[0,0,0,0,0,0],r=0;r<t.length;r++)null!==t[r][1]&&(n[0]+=t[r][0],n[1]+=t[r][1],n[2]+=t[r][0]*t[r][0]*t[r][1],n[3]+=t[r][1]*Math.log(t[r][1]),n[4]+=t[r][0]*t[r][1]*Math.log(t[r][1]),n[5]+=t[r][0]*t[r][1]);var a=n[1]*n[2]-n[5]*n[5],s=Math.exp((n[2]*n[3]-n[5]*n[4])/a),c=(n[1]*n[4]-n[5]*n[3])/a,u=o(s,e.precision),l=o(c,e.precision),f=function(t){return[o(t,e.precision),o(u*Math.exp(l*t),e.precision)]},p=t.map((function(t){return f(t[0])}));return{points:p,predict:f,equation:[u,l],string:"y = "+u+"e^("+l+"x)",r2:o(i(t,p),e.precision)}},logarithmic:function(t,e){for(var n=[0,0,0,0],r=t.length,a=0;a<r;a++)null!==t[a][1]&&(n[0]+=Math.log(t[a][0]),n[1]+=t[a][1]*Math.log(t[a][0]),n[2]+=t[a][1],n[3]+=Math.pow(Math.log(t[a][0]),2));var s=o((r*n[1]-n[2]*n[0])/(r*n[3]-n[0]*n[0]),e.precision),c=o((n[2]-s*n[0])/r,e.precision),u=function(t){return[o(t,e.precision),o(o(c+s*Math.log(t),e.precision),e.precision)]},l=t.map((function(t){return u(t[0])}));return{points:l,predict:u,equation:[c,s],string:"y = "+c+" + "+s+" ln(x)",r2:o(i(t,l),e.precision)}},power:function(t,e){for(var n=[0,0,0,0,0],r=t.length,a=0;a<r;a++)null!==t[a][1]&&(n[0]+=Math.log(t[a][0]),n[1]+=Math.log(t[a][1])*Math.log(t[a][0]),n[2]+=Math.log(t[a][1]),n[3]+=Math.pow(Math.log(t[a][0]),2));var s=(r*n[1]-n[0]*n[2])/(r*n[3]-Math.pow(n[0],2)),c=(n[2]-s*n[0])/r,u=o(Math.exp(c),e.precision),l=o(s,e.precision),f=function(t){return[o(t,e.precision),o(o(u*Math.pow(t,l),e.precision),e.precision)]},p=t.map((function(t){return f(t[0])}));return{points:p,predict:f,equation:[u,l],string:"y = "+u+"x^"+l,r2:o(i(t,p),e.precision)}},polynomial:function(t,e){for(var r=[],a=[],s=0,c=0,u=t.length,l=e.order+1,f=0;f<l;f++){for(var p=0;p<u;p++)null!==t[p][1]&&(s+=Math.pow(t[p][0],f)*t[p][1]);r.push(s),s=0;for(var h=[],d=0;d<l;d++){for(var v=0;v<u;v++)null!==t[v][1]&&(c+=Math.pow(t[v][0],f+d));h.push(c),c=0}a.push(h)}a.push(r);for(var y=function(t,e){for(var n=t,r=t.length-1,i=[e],o=0;o<r;o++){for(var a=o,s=o+1;s<r;s++)Math.abs(n[o][s])>Math.abs(n[o][a])&&(a=s);for(var c=o;c<r+1;c++){var u=n[c][o];n[c][o]=n[c][a],n[c][a]=u}for(var l=o+1;l<r;l++)for(var f=r;f>=o;f--)n[f][l]-=n[f][o]*n[o][l]/n[o][o]}for(var p=r-1;p>=0;p--){for(var h=0,d=p+1;d<r;d++)h+=n[d][p]*i[d];i[p]=(n[r][p]-h)/n[p][p]}return i}(a,l).map((function(t){return o(t,e.precision)})),g=function(t){return[o(t,e.precision),o(y.reduce((function(e,n,r){return e+n*Math.pow(t,r)}),0),e.precision)]},x=t.map((function(t){return g(t[0])})),b="y = ",m=y.length-1;m>=0;m--)b+=m>1?y[m]+"x^"+m+" + ":1===m?y[m]+"x + ":y[m];return{string:b,points:x,predict:g,equation:[].concat(n(y)).reverse(),r2:o(i(t,x),e.precision)}}};t.exports=Object.keys(a).reduce((function(t,n){return e({_round:o},t,(c=function(t,i){return a[n](t,e({},r,i))},(s=n)in(i={})?Object.defineProperty(i,s,{value:c,enumerable:!0,configurable:!0,writable:!0}):i[s]=c,i));var i,s,c}),{})})?r.apply(e,i):r)||(t.exports=o)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ChartRegressions=void 0;var r=n(0),i={},o=0,a=function(){function t(){this.id="regressions"}return t.prototype.beforeInit=function(t){t.$$id=++o},t.prototype.beforeUpdate=function(t,e){var n,o,a,c=(n=t.config.options)&&(o=n.plugins)&&(a=o.regressions)&&a.onCompleteCalculation;s(t,(function(e,n,o){n=new r.MetaDataSet(t,e);var a=1e3*t.$$id+o;i[a]=n})),c&&c(t)},t.prototype.beforeRender=function(t,e){s(t,(function(t,e){return e.adjustScales()}))},t.prototype.beforeDatasetsDraw=function(t,e,n){s(t,(function(e,n){var r=t.ctx;r.save();try{for(var i=0;i<n.sections.length-1;i++)n.sections[i].drawVerticalLine(r)}finally{r.restore()}}))},t.prototype.afterDatasetsDraw=function(t,e,n){s(t,(function(t,e){return e.draw()}))},t.prototype.destroy=function(t){Object.keys(i).filter((function(e){return e/1e3>>0==t.$$id})).forEach((function(t){return delete i[t]}))},t.prototype.getDataset=function(t,e){var n=1e3*t.$$id+e;return i[n]},t.prototype.getSections=function(t,e){var n=this.getDataset(t,e);return n&&n.sections},t}();function s(t,n){t.data.datasets.forEach((function(r,i){if(r.regressions&&t.isDatasetVisible(i)){var o=e.ChartRegressions.getDataset(t,i);n(r,o,i)}}))}e.ChartRegressions=new a,window.ChartRegressions=e.ChartRegressions}]);
//# sourceMappingURL=chartjs-plugin-regression.js.map