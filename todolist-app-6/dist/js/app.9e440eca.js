(function(t){function o(o){for(var n,c,l=o[0],s=o[1],i=o[2],a=0,p=[];a<l.length;a++)c=l[a],Object.prototype.hasOwnProperty.call(d,c)&&d[c]&&p.push(d[c][0]),d[c]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);u&&u(o);while(p.length)p.shift()();return r.push.apply(r,i||[]),e()}function e(){for(var t,o=0;o<r.length;o++){for(var e=r[o],n=!0,l=1;l<e.length;l++){var s=e[l];0!==d[s]&&(n=!1)}n&&(r.splice(o--,1),t=c(c.s=e[0]))}return t}var n={},d={app:0},r=[];function c(o){if(n[o])return n[o].exports;var e=n[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,c),e.l=!0,e.exports}c.m=t,c.c=n,c.d=function(t,o,e){c.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:e})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,o){if(1&o&&(t=c(t)),8&o)return t;if(4&o&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(c.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var n in t)c.d(e,n,function(o){return t[o]}.bind(null,n));return e},c.n=function(t){var o=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(o,"a",o),o},c.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},c.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=o,l=l.slice();for(var i=0;i<l.length;i++)o(l[i]);var u=s;r.push([0,"chunk-vendors"]),e()})({0:function(t,o,e){t.exports=e("56d7")},"56d7":function(t,o,e){"use strict";e.r(o);var n=e("7a23");const d={class:"title"},r={class:"todo"},c=Object(n["d"])("hr",null,null,-1);function l(t,o,e,l,s,i){const u=Object(n["g"])("todo-list"),a=Object(n["g"])("todo-total");return Object(n["e"])(),Object(n["c"])("div",null,[Object(n["d"])("h1",d,Object(n["h"])(s.title),1),Object(n["d"])("div",r,[Object(n["k"])(Object(n["d"])("input",{"onUpdate:modelValue":o[1]||(o[1]=t=>s.todo=t),type:"text",placeholder:"Enter todo title"},null,512),[[n["j"],s.todo,void 0,{trim:!0}]]),Object(n["d"])("button",{onClick:o[2]||(o[2]=(...t)=>i.addTodo&&i.addTodo(...t))},"add"),Object(n["d"])(u,{todos:s.todos,onRemoveTodo:i.removeTodo},null,8,["todos","onRemoveTodo"]),c,Object(n["d"])(a,{todosCount:s.todos.length},null,8,["todosCount"])])])}const s={class:"todo__id"};function i(t,o,e,d,r,c){return Object(n["e"])(),Object(n["c"])("div",null,[(Object(n["e"])(!0),Object(n["c"])(n["a"],null,Object(n["f"])(e.todos,(t,o)=>(Object(n["e"])(),Object(n["c"])("div",{key:t.id},[Object(n["d"])("p",null,[Object(n["d"])("span",s,Object(n["h"])(o+1)+" ",1),Object(n["d"])("span",{class:["todo__text",{todo__text_isShow:t.isDone}],onDblclick:t=>c.removeItem(o)},Object(n["h"])(t.text),43,["onDblclick"]),Object(n["k"])(Object(n["d"])("input",{"onUpdate:modelValue":o=>t.isDone=o,type:"checkbox",class:"todo__check"},null,8,["onUpdate:modelValue"]),[[n["i"],t.isDone]])])]))),128))])}var u={props:{todos:{type:[Object],required:!0}},methods:{removeItem(t){this.$emit("removeTodo",t)}}};u.render=i;var a=u;function p(t,o,e,d,r,c){return Object(n["e"])(),Object(n["c"])("div",null,[Object(n["d"])("p",null,"Список задач ("+Object(n["h"])(this.todosCount)+")",1)])}var b={props:["todosCount"]};b.render=p;var O=b,f={components:{todoList:a,todoTotal:O},name:"App",data(){return{title:"Todo App",todo:"",todos:[],id:0}},mounted(){const t=localStorage.getItem("todos");t&&(this.todos=JSON.parse(t))},methods:{addTodo(){""!=this.todo&&(this.todos.push({id:this.id++,text:this.todo,isDone:!1}),localStorage.setItem("todos",JSON.stringify(this.todos)),this.todo="")},removeTodo(t){this.todos.splice(t,1),localStorage.setItem("todos",JSON.stringify(this.todos))}}};e("5dd0");f.render=l;var j=f;Object(n["b"])(j).mount("#app")},"5dd0":function(t,o,e){"use strict";e("e7cd")},e7cd:function(t,o,e){}});
//# sourceMappingURL=app.9e440eca.js.map