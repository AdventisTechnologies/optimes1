import './polyfills.server.mjs';
var x=Object.create;var m=Object.defineProperty,y=Object.defineProperties,z=Object.getOwnPropertyDescriptor,A=Object.getOwnPropertyDescriptors,B=Object.getOwnPropertyNames,n=Object.getOwnPropertySymbols,s=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,C=Reflect.get;var l=(a,b)=>(b=Symbol[a])?b:Symbol.for("Symbol."+a),D=a=>{throw TypeError(a)};var r=(a,b,c)=>b in a?m(a,b,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[b]=c,E=(a,b)=>{for(var c in b||={})o.call(b,c)&&r(a,c,b[c]);if(n)for(var c of n(b))t.call(b,c)&&r(a,c,b[c]);return a},F=(a,b)=>y(a,A(b));var G=(a=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(a,{get:(b,c)=>(typeof require<"u"?require:b)[c]}):a)(function(a){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+a+'" is not supported')});var H=(a,b)=>{var c={};for(var d in a)o.call(a,d)&&b.indexOf(d)<0&&(c[d]=a[d]);if(a!=null&&n)for(var d of n(a))b.indexOf(d)<0&&t.call(a,d)&&(c[d]=a[d]);return c};var I=(a,b)=>()=>(a&&(b=a(a=0)),b);var J=(a,b)=>()=>(b||a((b={exports:{}}).exports,b),b.exports),K=(a,b)=>{for(var c in b)m(a,c,{get:b[c],enumerable:!0})},u=(a,b,c,d)=>{if(b&&typeof b=="object"||typeof b=="function")for(let e of B(b))!o.call(a,e)&&e!==c&&m(a,e,{get:()=>b[e],enumerable:!(d=z(b,e))||d.enumerable});return a};var L=(a,b,c)=>(c=a!=null?x(s(a)):{},u(b||!a||!a.__esModule?m(c,"default",{value:a,enumerable:!0}):c,a)),M=a=>u(m({},"__esModule",{value:!0}),a);var N=(a,b,c)=>C(s(a),c,b);var O=(a,b,c)=>new Promise((d,e)=>{var f=g=>{try{i(c.next(g))}catch(j){e(j)}},h=g=>{try{i(c.throw(g))}catch(j){e(j)}},i=g=>g.done?d(g.value):Promise.resolve(g.value).then(f,h);i((c=c.apply(a,b)).next())}),v=function(a,b){this[0]=a,this[1]=b},P=(a,b,c)=>{var d=(h,i,g,j)=>{try{var p=c[h](i),q=(i=p.value)instanceof v,w=p.done;Promise.resolve(q?i[0]:i).then(k=>q?d(h==="return"?h:"next",i[1]?{done:k.done,value:k.value}:k,g,j):g({value:k,done:w})).catch(k=>d("throw",k,g,j))}catch(k){j(k)}},e=h=>f[h]=i=>new Promise((g,j)=>d(h,i,g,j)),f={};return c=c.apply(a,b),f[l("asyncIterator")]=()=>f,e("next"),e("throw"),e("return"),f},Q=a=>{var b=a[l("asyncIterator")],c=!1,d,e={};return b==null?(b=a[l("iterator")](),d=f=>e[f]=h=>b[f](h)):(b=b.call(a),d=f=>e[f]=h=>{if(c){if(c=!1,f==="throw")throw h;return h}return c=!0,{done:!1,value:new v(new Promise(i=>{var g=b[f](h);g instanceof Object||D("Object expected"),i(g)}),1)}}),e[l("iterator")]=()=>e,d("next"),"throw"in b?d("throw"):e.throw=f=>{throw f},"return"in b&&d("return"),e},R=(a,b,c)=>(b=a[l("asyncIterator")])?b.call(a):(a=a[l("iterator")](),b={},c=(d,e)=>(e=a[d])&&(b[d]=f=>new Promise((h,i,g)=>(f=e.call(a,f),g=f.done,Promise.resolve(f.value).then(j=>h({value:j,done:g}),i)))),c("next"),c("return"),b);export{E as a,F as b,G as c,H as d,I as e,J as f,K as g,L as h,M as i,N as j,O as k,v as l,P as m,Q as n,R as o};
