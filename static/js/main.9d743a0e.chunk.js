(this["webpackJsonpcomputational-intelligence"]=this["webpackJsonpcomputational-intelligence"]||[]).push([[0],{101:function(t,e,i){},247:function(t,e,i){},255:function(t,e){},256:function(t,e,i){"use strict";i.r(e);var n=i(4),s=i(5),r=i.n(s),c=i(85),a=i.n(c),o=(i(101),i(86)),h=i(9),u=i(87),l=i(258);function d(t,e){for(var i="",n=0;n<t.length;n++){var s=Number.parseInt(t[n]),r=function(t){return-1==="()/*+-^".indexOf(t)};isNaN(s)&&r(t[n])&&r(t[n-1])?i+="*"+t[n]:i+=t[n]}return i.replace(/x/g,e)}var f=function(t,e){for(var i=[],n=0,s="",r=0;r<t.length;++r){var c=t[r];"("===c?(n++,isNaN(t[r-1])||(s+="*")):")"===c&&n--,0===n&&e===c?(i.push(s),s=""):s+=c}return""!==s&&i.push(s),0===i[0].length&&"-"===e&&(i[0]="0"),i},v=function(t){var e=f(t,"/").map((function(t){return function(t){var e=f(t,"^").map((function(t){if("("==t[0]){var e=t.substr(1,t.length-2);return x(e)}return+t})),i=e[0];return e.slice(1).reduce((function(t,e){return Math.pow(t,e)}),i)}(t)})),i=e[0];return e.slice(1).reduce((function(t,e){return t/e}),i)},m=function(t){var e=f(t,"-").map((function(t){return function(t){return f(t,"*").map((function(t){return v(t)})).reduce((function(t,e){return t*e}),1)}(t)})),i=e[0];return e.slice(1).reduce((function(t,e){return t-e}),i)},x=function(t){return f(t,"+").map((function(t){return m(t)})).reduce((function(t,e){return t+e}),0)},g=function(t){return x(t,"+")},p=(i(247),i(93)),b=i(94);var j=function(t){var e=t.isRendering,i=t.plotGraph,r=Object(b.a)(t,["isRendering","plotGraph"]),c=Object(s.useRef)(null);return Object(s.useEffect)((function(){function t(t){this.canvas=c.current,this.minX=t.minX,this.minY=t.minY,this.maxX=t.maxX,this.maxY=t.maxY,this.unitsPerTick=t.unitsPerTick,this.axisColor="#000000",this.cellColor="#ececec",this.gCellColor="#dbdbdb",this.font="12pt Calibri",this.tickSize=10,this.context=this.canvas.getContext("2d"),this.rangeX=this.maxX-this.minX,this.rangeY=this.maxY-this.minY,this.unitX=this.canvas.width/this.rangeX,this.unitY=this.canvas.height/this.rangeY,this.centerY=Math.round(Math.abs(this.minY/this.rangeY)*this.canvas.height),this.centerX=Math.round(Math.abs(this.minX/this.rangeX)*this.canvas.width),this.iteration=(this.maxX-this.minX)/1e3,this.scaleX=this.canvas.width/this.rangeX,this.scaleY=this.canvas.height/this.rangeY,this.drawXAxis(),this.drawYAxis(),this.drawGrid(this.cellColor),this.drawGrid(this.gCellColor,5)}t.prototype.drawXAxis=function(){var t=this.context;t.save(),t.beginPath(),t.moveTo(0,this.centerY),t.lineTo(this.canvas.width,this.centerY),t.strokeStyle=this.axisColor,t.lineWidth=2,t.stroke();var e,i,n=this.unitsPerTick*this.unitX;for(t.font=this.font,t.textAlign="center",t.textBaseline="top",e=this.centerX-n,i=-1*this.unitsPerTick;e>0;)t.moveTo(e,this.centerY-this.tickSize/2),t.lineTo(e,this.centerY+this.tickSize/2),t.stroke(),t.fillText(i,e,this.centerY+this.tickSize/2+3),i-=this.unitsPerTick,e=Math.round(e-n);for(e=this.centerX+n,i=this.unitsPerTick;e<this.canvas.width;)t.moveTo(e,this.centerY-this.tickSize/2),t.lineTo(e,this.centerY+this.tickSize/2),t.stroke(),t.fillText(i,e,this.centerY+this.tickSize/2+3),i+=this.unitsPerTick,e=Math.round(e+n);t.restore()},t.prototype.drawGrid=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=this.context,n=10*e,s=10*e,r=10*e,c=this.canvas.height,a=this.canvas.width;for(i.beginPath(),i.strokeStyle=t;n<c;)i.moveTo(0,n),i.lineTo(a,n),n+=r;for(;s<a;)i.moveTo(s,0),i.lineTo(s,c),s+=r;i.stroke()},t.prototype.drawYAxis=function(){var t=this.context;t.save(),t.beginPath(),t.moveTo(this.centerX,0),t.lineTo(this.centerX,this.canvas.height),t.strokeStyle=this.axisColor,t.lineWidth=2,t.stroke();var e,i,n=this.unitsPerTick*this.unitY;for(t.font=this.font,t.textAlign="right",t.textBaseline="middle",e=this.centerY-n,i=this.unitsPerTick;e>0;)t.moveTo(this.centerX-this.tickSize/2,e),t.lineTo(this.centerX+this.tickSize/2,e),t.stroke(),t.fillText(i,this.centerX-this.tickSize/2-3,e),i+=this.unitsPerTick,e=Math.round(e-n);for(e=this.centerY+n,i=-1*this.unitsPerTick;e<this.canvas.height;)t.moveTo(this.centerX-this.tickSize/2,e),t.lineTo(this.centerX+this.tickSize/2,e),t.stroke(),t.fillText(i,this.centerX-this.tickSize/2-3,e),i-=this.unitsPerTick,e=Math.round(e+n);t.restore()},t.prototype.drawEquation=function(t,e,i){var n=this.context;n.clearRect(0,0,this.canvas.width,this.canvas.height),n.save(),n.save(),this.transformContext(),n.beginPath(),n.moveTo(this.minX,t(this.minX));for(var s=this.minX+this.iteration;s<=this.maxX;s+=this.iteration)n.lineTo(s,t(s));n.restore(),n.lineJoin="round",n.lineWidth=i,n.strokeStyle=e,n.stroke(),n.restore()},t.prototype.transformContext=function(){var t=this.context;this.context.translate(this.centerX,this.centerY),t.scale(this.scaleX,-this.scaleY)};var e=new t({canvasId:"myCanvas",minX:-10,minY:-10,maxX:10,maxY:10,unitsPerTick:1});i(e)}),[e,i]),Object(n.jsx)("canvas",Object(p.a)({ref:c},r))};function k(){var t=Object(o.a)(["",""]);return k=function(){return t},t}var T=function(){var t=Object(s.useState)("3x^2"),e=Object(h.a)(t,2),i=e[0],r=e[1],c=Object(s.useState)(""),a=Object(h.a)(c,2),o=a[0],f=a[1],v=Object(s.useState)(null),m=Object(h.a)(v,2),x=m[0],p=m[1],b=Object(s.useState)(!1),T=Object(h.a)(b,2),X=T[0],O=T[1],Y=Object(s.useState)("native"),S=Object(h.a)(Y,2),w=S[0];return S[1],console.log("expression :",i),Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)("div",{className:"input-container",children:Object(n.jsxs)("div",{className:"form-input-group",children:[Object(n.jsx)("input",{className:"form-control",type:"text",placeholder:"Enter a mathematical expression",onChange:function(t){return r(t.target.value)}}),Object(n.jsx)("button",{onClick:function(t){f(i),O(!0),x.drawEquation((function(t){return"wolfram"===w?function(t){try{var e=d(i,t),n=Object(l.a)(i),s=Object(l.b)(n);console.log("x :",t,s.toString());var r=s.evaluate({x:t});return console.log("result :<<<<<=====>>>>>",n,e,r,t),r}catch(c){console.log("error :",c)}}(t):function(t){var e=d(i,t),n=g(e);return console.log("expr :",e,n,t),g(e)}(t)}),"green",3),console.log("isLoading :",X),O(!1)},className:"plot-btn",children:"Plot graph"})]})}),Object(n.jsxs)("div",{className:"content-container",children:[Object(n.jsx)("div",{className:"input-expression",children:o&&Object(n.jsxs)(n.Fragment,{children:["Input: ",Object(n.jsx)(u.a,{tex:String.raw(k(),o)})]})}),X?Object(n.jsx)("div",{children:"rendering graph..."}):Object(n.jsx)(j,{width:"1000",height:"1000",plotGraph:p,isRendering:o})]})]})})},X=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,259)).then((function(e){var i=e.getCLS,n=e.getFID,s=e.getFCP,r=e.getLCP,c=e.getTTFB;i(t),n(t),s(t),r(t),c(t)}))};a.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(T,{})}),document.getElementById("root")),X()}},[[256,1,2]]]);
//# sourceMappingURL=main.9d743a0e.chunk.js.map