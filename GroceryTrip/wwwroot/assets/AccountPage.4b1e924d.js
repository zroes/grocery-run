import{_ as p,c as s,A as c,l as r,P as i,a as m,L as f,b as l,d as n,t as d,e as L,f as y,F as v,o as u,r as x}from"./index.ca740b63.js";const b={setup(){return{account:s(()=>c.account),loading:s(()=>c.loading),async promptLocation(){c.loading=!0;try{async function t(e){const a=e.coords;r.log(a.latitude,a.longitude);const o={lat:a.latitude,long:a.longitude};i.toast("Location got!","success","top",1200),c.loading=!1,await m.sendLatLong(o)}navigator.geolocation.getCurrentPosition(t)}catch(t){r.error(t),i.error(t.message)}}}},components:{Loading:f}},h={class:"about text-center text-light"},P=["src"],k={key:0};function A(t,e,a,o,C,B){const g=x("Loading");return u(),l(v,null,[n("div",h,[n("h1",null,"Welcome "+d(o.account.name),1),n("img",{class:"rounded",src:o.account.picture,alt:""},null,8,P),n("p",null,d(o.account.email),1),n("button",{onClick:e[0]||(e[0]=(..._)=>o.promptLocation&&o.promptLocation(..._)),class:"btn btn-primary"},"Get my Location")]),o.loading?(u(),l("div",k,[L(g)])):y("",!0)],64)}const S=p(b,[["render",A],["__scopeId","data-v-f21dfcc0"]]);export{S as default};
