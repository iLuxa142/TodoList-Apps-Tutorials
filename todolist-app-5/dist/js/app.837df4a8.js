(function(e){function t(t){for(var r,a,s=t[0],u=t[1],i=t[2],d=0,l=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(l.length)l.shift()();return c.push.apply(c,i||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},c=[];function s(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-29f35da7":"79533093","chunk-2d0b64c8":"6fb1002c","chunk-2d21ef2c":"019d4337"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-29f35da7":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-29f35da7":"1bbede14","chunk-2d0b64c8":"31d6cfe0","chunk-2d21ef2c":"31d6cfe0"}[e]+".css",o=u.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var i=c[s],d=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(d===r||d===o))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){i=l[s],d=i.getAttribute("data-href");if(d===r||d===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],f.parentNode.removeChild(f),n(c)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=c);var i,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=s(e);var l=new Error;i=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:d})}),12e4);d.onerror=d.onload=i,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var f=d;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0a94":function(e,t,n){},"116a":function(e,t,n){"use strict";n("0a94")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),a={id:"app"},o={class:"container"};function c(e,t,n,c,s,u){var i=Object(r["u"])("Navbar"),d=Object(r["u"])("router-view");return Object(r["p"])(),Object(r["d"])("div",a,[Object(r["g"])(i),Object(r["g"])("div",o,[Object(r["g"])(d)])])}var s={class:"blue darken-3"},u={class:"nav-wrapper"},i=Object(r["f"])("Tasks"),d={class:"right"},l=Object(r["g"])("a",{href:"#"},"Create",-1),f=Object(r["g"])("a",{href:"#"},"List",-1);function p(e,t,n,a,o,c){var p=Object(r["u"])("router-link");return Object(r["p"])(),Object(r["d"])("nav",s,[Object(r["g"])("div",u,[Object(r["g"])(p,{to:"/",class:"brand-logo"},{default:Object(r["B"])((function(){return[i]})),_:1}),Object(r["g"])("ul",d,[Object(r["g"])("li",null,[Object(r["g"])(p,{to:"/",exact:"","active-class":"active"},{default:Object(r["B"])((function(){return[l]})),_:1})]),Object(r["g"])("li",null,[Object(r["g"])(p,{to:"/list","active-class":"active"},{default:Object(r["B"])((function(){return[f]})),_:1})])])])])}var b={};n("116a");b.render=p;var g=b,h={components:{Navbar:g}};n("d89b");h.render=c;var v=h,m=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),k=[{path:"/",name:"create",component:function(){return n.e("chunk-2d21ef2c").then(n.bind(null,"d879"))}},{path:"/list",name:"list",component:function(){return n.e("chunk-29f35da7").then(n.bind(null,"1a33"))}},{path:"/task/:id",name:"task",component:function(){return n.e("chunk-2d0b64c8").then(n.bind(null,"1d21"))}}],O=Object(m["a"])({history:Object(m["b"])(""),routes:k}),j=O,y=n("5530"),w=(n("d81d"),n("99af"),n("c740"),n("7db0"),n("5502")),S=Object(w["a"])({state:{tasks:JSON.parse(localStorage.getItem("tasks")||"[]").map((function(e){return new Date(e.date)<new Date&&(e.status="outdated"),e}))},mutations:{createTask:function(e,t){e.tasks.push(t),localStorage.setItem("tasks",JSON.stringify(e.tasks))},updateTask:function(e,t){var n=t.id,r=t.desc,a=t.date,o=e.tasks.concat(),c=o.findIndex((function(e){return e.id===n})),s=o[c],u=new Date(a)>new Date?"active":"outdated";o[c]=Object(y["a"])(Object(y["a"])({},s),{},{date:a,desc:r,status:u}),e.tasks=o,localStorage.setItem("tasks",JSON.stringify(e.tasks))},completeTask:function(e,t){var n=e.tasks.findIndex((function(e){return e.id===t}));e.tasks[n].status="completed",localStorage.setItem("tasks",JSON.stringify(e.tasks))}},actions:{createTask:function(e,t){var n=e.commit;n("createTask",t)},updateTask:function(e,t){var n=e.commit;n("updateTask",t)},completeTask:function(e,t){var n=e.commit;n("completeTask",t)}},getters:{tasks:function(e){return e.tasks},taskById:function(e){return function(t){return e.tasks.find((function(e){return e.id===t}))}}}}),T=(n("6885"),n("9483"));Object(T["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),Object(r["c"])(v).use(S).use(j).mount("#app")},a156:function(e,t,n){},d89b:function(e,t,n){"use strict";n("a156")}});
//# sourceMappingURL=app.837df4a8.js.map