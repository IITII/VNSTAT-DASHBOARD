(function(e){function t(t){for(var n,i,u=t[0],c=t[1],l=t[2],s=0,p=[];s<u.length;s++)i=u[s],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);f&&f(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],n=!0,i=1;i<o.length;i++){var c=o[i];0!==r[c]&&(n=!1)}n&&(a.splice(t--,1),e=u(u.s=o[0]))}return e}var n={},r={1:0},a=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{2:"99e45b59",3:"aa521fe1",4:"ce9f7509"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,u),o.l=!0,o.exports}u.e=function(e){var t=[],o=r[e];if(0!==o)if(o)t.push(o[2]);else{var n=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=n);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=i(e);var l=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(s);var o=r[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",l.name="ChunkLoadError",l.type=n,l.request=a,o[1](l)}r[e]=void 0}};var s=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,o){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(u.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(o,n,function(t){return e[t]}.bind(null,n));return o},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/VNSTAT-DASHBOARD/",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var f=l;a.push([0,0]),o()})({0:function(e,t,o){e.exports=o("2f39")},"2f39":function(e,t,o){"use strict";o.r(t);o("7d6e"),o("e54f"),o("985d"),o("31cd");var n=o("2b0e"),r=o("bf69"),a=o("42d2"),i=o("b05d"),u=o("18d6"),c=o("2a19"),l=o("436b"),s=o("f508");n["a"].use(i["a"],{config:{notify:{html:!1,position:"top-right",timeout:2500,closeBtn:"×"}},lang:r["a"],iconSet:a["a"],plugins:{LocalStorage:u["a"],Notify:c["a"],Dialog:l["a"],Loading:s["a"]}});var f=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"q-app"}},[t("router-view")],1)},p=[],d={name:"App"},h=d,v=o("2877"),b=Object(v["a"])(h,f,p,!1,null,null,null),w=b.exports,g=o("2f62");n["a"].use(g["a"]);var m=function(){const e=new g["a"].Store({modules:{},strict:!1});return e},y=o("8c4f");const O=[{path:"/",component:()=>Promise.all([o.e(0),o.e(2)]).then(o.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([o.e(0),o.e(4)]).then(o.bind(null,"8b24"))}]},{path:"*",component:()=>Promise.all([o.e(0),o.e(3)]).then(o.bind(null,"e51e"))}];var P=O;n["a"].use(y["a"]);var S=function(){const e=new y["a"]({scrollBehavior:()=>({x:0,y:0}),routes:P,mode:"hash",base:"/VNSTAT-DASHBOARD/"});return e},A=async function(){const e="function"===typeof m?await m({Vue:n["a"]}):m,t="function"===typeof S?await S({Vue:n["a"],store:e}):S;e.$router=t;const o={router:t,store:e,render:e=>e(w),el:"#q-app"};return{app:o,store:e,router:t}},j=o("85ff"),x=o.n(j);const T=!0,L={isEnabled:!0,logLevel:T?"error":"debug",stringifyArguments:!1,showLogLevel:!0,showMethodName:!0,separator:"|",showConsoleColors:!0};n["a"].use(x.a,L);var _=o("a925"),D={failed:"Action failed",success:"Action was successful"},V={"en-US":D};n["a"].use(_["a"]);const k=new _["a"]({locale:"en-us",fallbackLocale:"en-us",messages:V});var B=({app:e})=>{e.i18n=k},C=o("bc3a"),M=o.n(C);n["a"].prototype.$axios=M.a;const N="/VNSTAT-DASHBOARD/",E=/\/\//,q=e=>(N+e).replace(E,"/");async function H(){const{app:e,store:t,router:o}=await A();let r=!1;const a=e=>{r=!0;const t=Object(e)===e?q(o.resolve(e).route.fullPath):e;window.location.href=t},i=window.location.href.replace(window.location.origin,""),u=[void 0,B,void 0];for(let l=0;!1===r&&l<u.length;l++)if("function"===typeof u[l])try{await u[l]({app:e,router:o,store:t,Vue:n["a"],ssrContext:null,redirect:a,urlPath:i,publicPath:N})}catch(c){return c&&c.url?void(window.location.href=c.url):void console.error("[Quasar] boot error:",c)}!0!==r&&new n["a"](e)}H()},"31cd":function(e,t,o){}});