import{r as u,g as i,o as g,h as x,a as o,w as m,b as f,F as b,s as h,m as k,y as C,k as v,t as I,p as S,l as B}from"./index-BrLNn1aF.js";import{r as _}from"./index-BA-sX6zH.js";import{_ as P}from"./_plugin-vue_export-helper-DlAUqK2U.js";const N=l=>(S("data-v-2f45755b"),l=l(),B(),l),T={class:"main"},U=N(()=>f("h3",{style:{color:"var(--white-color)","text-align":"center"}},"重置密码",-1)),q={__name:"reSetPasswordView",setup(l){const s=u(),t=u(),n=u(),r=u(i.countdowns[5]);function w(){_.forgetPassword(t.value,n.value,s.value)}async function y(){if(document.querySelector(".get").innerText=="获取"){_.verification(t.value,"forgetPassword"),r.value=60,i.countdowns[5]=60;var d=setInterval(()=>{r.value--,i.countdowns[5]--},1e3);setTimeout(()=>{r.value="获取",i.countdowns[5]="获取",clearInterval(d)},6e4)}else h.warning("你想干什么？")}function V(d){location.hash=d}return(d,e)=>{const p=k,c=C;return g(),x(b,null,[o(p,{type:"primary",text:"",onClick:e[0]||(e[0]=a=>V("#/"))},{default:m(()=>[v("返回")]),_:1}),f("div",T,[U,o(c,{modelValue:t.value,"onUpdate:modelValue":e[1]||(e[1]=a=>t.value=a),placeholder:"邮箱"},null,8,["modelValue"]),o(c,{modelValue:n.value,"onUpdate:modelValue":e[2]||(e[2]=a=>n.value=a),placeholder:"新密码",type:"password"},null,8,["modelValue"]),o(c,{modelValue:s.value,"onUpdate:modelValue":e[3]||(e[3]=a=>s.value=a),placeholder:"验证码",style:{width:"320px",display:"inline-block"}},null,8,["modelValue"]),o(p,{type:"primary",onClick:y,class:"get",disabled:!t.value},{default:m(()=>[v(I(r.value),1)]),_:1},8,["disabled"]),o(p,{type:"primary",onClick:w,style:{"margin-left":"175px"},disabled:!s.value||!t.value||!n.value},{default:m(()=>[v("重置密码")]),_:1},8,["disabled"])])],64)}}},$=P(q,[["__scopeId","data-v-2f45755b"]]);export{$ as default};
