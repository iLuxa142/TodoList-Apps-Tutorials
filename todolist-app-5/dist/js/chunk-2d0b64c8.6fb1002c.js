(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b64c8"],{"1d21":function(t,e,s){"use strict";s.r(e);var i=s("7a23"),a={class:"row"},c={key:0,class:"col s6 offset-s3"},n={class:"chips",ref:"chips"},d={class:"input-field"},r=Object(i["g"])("label",{for:"desc"},"Description",-1),o={class:"character-counter",style:{float:"right","font-size":"12px"}},u={type:"text",ref:"datepicker"},l={key:0},p=Object(i["g"])("button",{class:"btn",type:"submit",style:{"margin-right":"1rem"}},"Update",-1),h={key:1};function b(t,e,s,b,f,k){return Object(i["p"])(),Object(i["d"])("div",a,[k.task?(Object(i["p"])(),Object(i["d"])("div",c,[Object(i["g"])("h1",null,Object(i["w"])(k.task.title),1),Object(i["g"])("form",{onSubmit:e[3]||(e[3]=Object(i["D"])((function(){return k.submitHandler&&k.submitHandler.apply(k,arguments)}),["prevent"]))},[Object(i["g"])("div",n,null,512),Object(i["g"])("div",d,[Object(i["C"])(Object(i["g"])("textarea",{style:{"min-height":"150px"},"onUpdate:modelValue":e[1]||(e[1]=function(e){return t.desc=e}),id:"desc",class:"materialize-textarea"},null,512),[[i["z"],t.desc]]),r,Object(i["g"])("span",o,Object(i["w"])(t.desc.length)+"/1024",1)]),Object(i["g"])("input",u,null,512),"completed"!==k.task.status?(Object(i["p"])(),Object(i["d"])("div",l,[p,Object(i["g"])("button",{class:"btn blue",type:"button",onClick:e[2]||(e[2]=function(){return k.completeTask&&k.completeTask.apply(k,arguments)})},"Complete task")])):Object(i["e"])("",!0)],32)])):(Object(i["p"])(),Object(i["d"])("h5",h,"Task not found!"))])}var f={computed:{task:function(){return this.$store.getters.taskById(+this.$route.params.id)}},data:function(){return{desc:"",chips:null,date:null}},mounted:function(){this.desc=this.task.desc,this.chips=M.Chips.init(this.$refs.chips,{placeholder:"Task tags",data:this.task.tags}),this.date=M.Datepicker.init(this.$refs.datepicker,{format:"dd.mm.yyyy",defaultDate:new Date(this.task.date),setDefaultDate:!0}),setTimeout((function(){M.updateTextFields()}),0)},methods:{submitHandler:function(){this.$store.dispatch("updateTask",{id:this.task.id,desc:this.desc,date:this.date.date}),this.$router.push("/list")},completeTask:function(){this.$store.dispatch("completeTask",this.task.id),this.$router.push("/list")}},unmounted:function(){this.date&&this.date.destroy&&this.date.destroy,this.chips&&this.chips.destroy&&this.chips.destroy}};f.render=b;e["default"]=f}}]);
//# sourceMappingURL=chunk-2d0b64c8.6fb1002c.js.map