(this["webpackJsonpmof-viewer"]=this["webpackJsonpmof-viewer"]||[]).push([[0],{13:function(e,t,r){},27:function(e,t,r){"use strict";r.r(t);var n=r(1),c=r.n(n),s=r(6),a=r.n(s),i=(r(13),r(8)),o=r(2),l=r(7),j=r.n(l),u=r(0);var m=new Intl.NumberFormat,d=function(e,t,r){return Object(u.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",children:t},r)};var b=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),r=t[0],c=t[1],s=Object(n.useState)(null),a=Object(o.a)(s,2),l=a[0],b=a[1],h=Object(n.useState)([]),p=Object(o.a)(h,2),f=p[0],O=p[1],x=Object(n.useState)(""),v=Object(o.a)(x,2),y=v[0],T=v[1],g=Object(n.useState)("records"),w=Object(o.a)(g,2),N=w[0],I=w[1],k=Object(n.useState)(!1),D=Object(o.a)(k,2),C=D[0],L=D[1],S=Object(n.useRef)("records");return function(e,t,r){var c=Object(n.useCallback)(e,r);Object(n.useEffect)((function(){var e=setTimeout((function(){c()}),t);return function(){clearTimeout(e)}}),[c,t])}((function(){if(r&&r.length>0){var e=r.map((function(e){return e.measurementType&&e.measurementType.toLowerCase().includes(y.toLowerCase())?e.hide=!1:e.hide=!0,e}));c(e)}}),500,[y]),Object(n.useEffect)((function(){fetch("https://api.obis.org/facet?facets=measurementTypeCombination&dropped=include&absence=include&size=10000").then((function(e){return e.json()})).then((function(e){return c(function(e){return e.map((function(e){var t=e.key.split("|");return 1===t.length&&(t=t[0].startsWith("http")?[null,t[0]]:[t[0],null]),{measurementType:t[0],measurementTypeID:t[1],records:e.records}}))}(e.results.measurementTypeCombination))}))}),[]),Object(n.useEffect)((function(){if(r&&r.length>0&&N!==S.current){S.current=N;var e=Object(i.a)(r),t="records"===N?-1:1;e.sort((function(e,r){return e[N]?r[N]?"records"===N?null===e||""===e||e[N]>r[N]?t:-t:null===e||""===e||e[N].toLowerCase()>r[N].toLowerCase()?t:-t:-t:t})),c(e)}}),[N,r]),Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("nav",{className:"navbar navbar-light bg-light px-4 py-3",children:Object(u.jsx)("a",{className:"text-xl navbar-brand",href:"/",children:"OBIS Measurement Types"})}),Object(u.jsxs)("div",{className:"container-fluid pt-3",children:[Object(u.jsx)("div",{className:"row",children:Object(u.jsxs)("div",{className:"col-xl-6 col-md-8 col-sm-12",children:[Object(u.jsx)("p",{children:"This is an overview of all measurementType(ID) combinations in the OBIS database. Click the number of records in the last column to see the datasets containing a specific measurementType(ID) combination."}),Object(u.jsxs)("p",{children:["Issues at ",Object(u.jsx)("a",{href:"https://github.com/iobis/mof-viewer",target:"_blank",rel:"noopener noreferrer",children:"https://github.com/iobis/mof-viewer"}),"."]})]})}),Object(u.jsx)("div",{className:"row",children:Object(u.jsxs)("div",{className:"col-md-12",children:[Object(u.jsx)("h3",{children:"Datasets"}),C&&Object(u.jsx)("p",{className:"loading",children:"Loading datasets..."}),f&&f.length>0&&Object(u.jsxs)("div",{children:[Object(u.jsxs)("p",{children:["Datasets for ",Object(u.jsxs)("b",{children:[l.measurementType," ",l.measurementTypeID]})]}),Object(u.jsxs)("table",{className:"table table-sm table-hover",children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{children:"title"}),Object(u.jsx)("th",{children:"node"}),Object(u.jsx)("th",{children:"records"})]})}),Object(u.jsx)("tbody",{children:f.map((function(e,t){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:Object(u.jsx)("a",{href:"https://obis.org/dataset/"+e.id,target:"_blank",rel:"noreferrer noopener",children:e.title})}),Object(u.jsx)("td",{children:e.nodes.map((function(e){return e.name})).join(", ")}),Object(u.jsx)("td",{children:m.format(e.records)})]},t)}))})]})]}),!C&&f&&0===f.length&&Object(u.jsx)("p",{children:"No datasets selected."}),Object(u.jsx)("h3",{children:"Measurement types"}),Object(u.jsx)("div",{className:"pt-2 pb-2",children:Object(u.jsxs)("div",{className:"form-group row",children:[Object(u.jsx)("label",{className:"col-sm-1 col-form-label",htmlFor:"search",children:"Search"}),Object(u.jsx)("div",{className:"col-sm-4",children:Object(u.jsx)("input",{className:"form-control form-control-md",id:"search",type:"text",value:y,onChange:function(e){return T(e.target.value)}})})]})}),r&&r.length>0?Object(u.jsxs)("table",{className:"table table-sm table-hover",children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsxs)("th",{className:"cursor-pointer text-nowrap",onClick:function(){return I("measurementType")},children:["measurementType ","measurementType"===N&&Object(u.jsx)("span",{className:"ml-1",children:"\u2193"})]}),Object(u.jsxs)("th",{className:"cursor-pointer text-nowrap",onClick:function(){return I("measurementTypeID")},children:["measurementTypeID ","measurementTypeID"===N&&Object(u.jsx)("span",{className:"ml-1",children:"\u2193"})]}),Object(u.jsx)("th",{className:"cursor-pointer text-nowrap",children:"prefLabel"}),Object(u.jsxs)("th",{className:"cursor-pointer text-nowrap",onClick:function(){return I("records")},children:["records ","records"===N&&Object(u.jsx)("span",{className:"ml-1",children:"\u2193"})]})]})}),Object(u.jsx)("tbody",{children:r.filter((function(e){return!e.hide})).map((function(e,t){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:e.measurementType}),Object(u.jsx)("td",{children:Object(u.jsx)(j.a,{componentDecorator:d,children:e.measurementTypeID})}),Object(u.jsx)("td",{children:e.prefLabel?e.prefLabel:e.measurementTypeID?Object(u.jsx)("span",{className:"actionbutton cursor-pointer",onClick:function(){return function(e){if(e&&e.startsWith("http://vocab.nerc.ac.uk/collection")){var t=e+"?_profile=skos&_mediatype=application/json";t=t.replace("http://","https://"),fetch(t).then((function(e){return e.json()})).then((function(t){if(t&&t.length>0&&"http://www.w3.org/2004/02/skos/core#prefLabel"in t[0]){var n=t[0]["http://www.w3.org/2004/02/skos/core#prefLabel"][0]["@value"],s=r.map((function(t){return t.measurementTypeID===e&&(t.prefLabel=n),t}));c(s)}}))}}(e.measurementTypeID)},children:"find"}):""}),Object(u.jsx)("td",{className:"text-primary cursor-pointer",onClick:function(){return function(e){window.scrollTo(0,0),b(e),O([]),L(!0);var t="https://api.obis.org/dataset?dropped=include&absence=include&";e.measurementType&&(t=t+"measurementtype="+e.measurementType+"&"),e.measurementTypeID&&(t=t+"measurementtypeid"+e.measurementTypeID+"&"),fetch(t).then((function(e){return e.json()})).then((function(e){O(e.results),L(!1)}))}(e)},children:m.format(e.records)})]},t)}))})]}):Object(u.jsx)("p",{className:"loading",children:"Loading measurement types..."})]})})]})]})};a.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(b,{})}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.b7358fd7.chunk.js.map