(this["webpackJsonpmof-viewer"]=this["webpackJsonpmof-viewer"]||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),s=n(4),i=n.n(s),a=(n(9),n(2)),d=n(0);var j=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)([]),i=Object(a.a)(s,2),j=i[0],l=i[1],u=Object(r.useState)(""),h=Object(a.a)(u,2),o=h[0],b=h[1];return Object(r.useEffect)((function(){fetch("https://api.obis.org/facet?facets=measurementTypeCombination&dropped=include&absence=include&size=10000").then((function(e){return e.json()})).then((function(e){return c(function(e){return e.map((function(e){var t=e.key.split("|");return 1===t.length&&(t=t[0].startsWith("http")?[null,t[0]]:[t[0],null]),{measurementType:t[0],measurementTypeID:t[1],records:e.records}}))}(e.results.measurementTypeCombination))}))}),[]),Object(r.useEffect)((function(){var e=n.map((function(e){return e.measurementType&&e.measurementType.toLowerCase().includes(o)?e.hide=!1:e.hide=!0,e}));console.log(e),c(e)}),[o]),Object(d.jsx)("div",{className:"App container-fluid",children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)("h1",{children:"MoF viewer"}),Object(d.jsx)("div",{className:"pt-2 pb-2",children:Object(d.jsx)("input",{placeholder:"search",type:"text",value:o,onChange:function(e){return b(e.target.value)}})}),j&&j.length>0&&Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Datasets"}),Object(d.jsxs)("table",{className:"table table-sm",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"title"}),Object(d.jsx)("th",{children:"records"})]})}),Object(d.jsx)("tbody",{children:j.map((function(e,t){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:Object(d.jsx)("a",{href:"https://obis.org/dataset/"+e.id,target:"_blank",children:e.title})}),Object(d.jsx)("td",{children:e.records})]},t)}))})]})]}),Object(d.jsx)("h2",{children:"Measurement types"}),n&&n.length>0?Object(d.jsxs)("table",{Name:"table table-sm",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"measurementType"}),Object(d.jsx)("th",{children:"measurementTypeID"}),Object(d.jsx)("th",{children:"records"})]})}),Object(d.jsx)("tbody",{children:n.filter((function(e){return!e.hide})).map((function(e,t){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:e.measurementType}),Object(d.jsx)("td",{children:e.measurementTypeID}),Object(d.jsx)("td",{className:"text-primary cursor-pointer",onClick:function(){return function(e){window.scrollTo(0,0),l([]);var t="https://api.obis.org/dataset?dropped=include&absence=include&";e.measurementType&&(t=t+"measurementtype="+e.measurementType+"&"),e.measurementTypeID&&(t=t+"measurementtypeid"+e.measurementTypeID+"&"),fetch(t).then((function(e){return e.json()})).then((function(e){return l(e.results)}))}(e)},children:e.records})]},t)}))})]}):Object(d.jsx)("p",{children:"Loading..."})]})})};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(j,{})}),document.getElementById("root"))},9:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.0c972b79.chunk.js.map