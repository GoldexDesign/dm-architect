"use strict";(()=>{var e={};e.id=0,e.ids=[0],e.modules={3480:(e,t,r)=>{e.exports=r(5600)},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6091:(e,t,r)=>{r.r(t),r.d(t,{config:()=>p,default:()=>l,routeModule:()=>c});var o={};r.r(o),r.d(o,{default:()=>s});var n=r(3480),a=r(8667),i=r(6435);async function s(e,t){let r="https://dm-architect.vercel.app",o=["","projects","projects/retail","projects/residential","projects/hotels","about/info","about/press"].map(e=>`
      <url>
        <loc>${r}/${e}</loc>
      </url>
    `).join(""),n="";try{let e=await fetch(`${r}/projects/all-projects.jsonld`);n=(await e.json()).projects.map(e=>{let t=e.category?.toLowerCase()||"projects";return`
          <url>
            <loc>${r}/projects/${t}/${e.id}</loc>
          </url>`}).join("")}catch(e){console.error("Failed to fetch project data for sitemap",e)}let a=`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${o}
      ${n}
    </urlset>`;t.setHeader("Content-Type","application/xml"),t.write(a),t.end()}let l=(0,i.M)(o,"default"),p=(0,i.M)(o,"config"),c=new n.PagesAPIRouteModule({definition:{kind:a.A.PAGES_API,page:"/api/sitemap",pathname:"/api/sitemap",bundlePath:"",filename:""},userland:o})},6435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=6091);module.exports=r})();