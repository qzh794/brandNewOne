var r=Object.defineProperty,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,a=(t,o,d)=>o in t?r(t,o,{enumerable:!0,configurable:!0,writable:!0,value:d}):t[o]=d,e=(r,e)=>{for(var u in e||(e={}))o.call(e,u)&&a(r,u,e[u]);if(t)for(var u of t(e))d.call(e,u)&&a(r,u,e[u]);return r},u=(r,a)=>{var e={};for(var u in r)o.call(r,u)&&a.indexOf(u)<0&&(e[u]=r[u]);if(null!=r&&t)for(var u of t(r))a.indexOf(u)<0&&d.call(r,u)&&(e[u]=r[u]);return e};import{i as p}from"./index.1dd724be.js";const c=r=>{const t=r,{product_id:o}=t,d=u(t,["product_id"]);return p({url:"/pro/createProduct",method:"POST",data:e({product_id:o},d)})},l=r=>p({url:"/pro/deleteProduct",method:"POST",data:{id:r}}),i=r=>{const t=r,{id:o}=t,d=u(t,["id"]);return p({url:"/pro/editProduct",method:"POST",data:e({id:o},d)})},P=r=>{const t=r,{id:o}=t,d=u(t,["id"]);return p({url:"/pro/applyOutProduct",method:"POST",data:e({id:o},d)})},s=r=>p({url:"/pro/withdrawApplyProduct",method:"POST",data:{id:r}}),n=r=>{const t=r,{id:o}=t,d=u(t,["id"]);return p({url:"/pro/auditProduct",method:"POST",data:e({id:o},d)})},O=r=>p({url:"/pro/searchProductForId",method:"POST",data:{product_id:r}}),h=r=>p({url:"/pro/searchProductForApplyId",method:"POST",data:{product_out_id:r}}),m=r=>p({url:"/pro/searchProductForOutId",method:"POST",data:{product_out_id:r}}),S=()=>p({url:"/pro/getProductLength",method:"POST"}),T=()=>p({url:"/pro/getApplyProdcutLength",method:"POST"}),f=()=>p({url:"/pro/getOutProductLength",method:"POST"}),g=r=>p({url:"/pro/returnProductListData",method:"POST",data:{pager:r}}),y=r=>p({url:"/pro/returnApplyProductListData",method:"POST",data:{pager:r}}),b=r=>p({url:"/pro/returnOutProductListData",method:"POST",data:{pager:r}});export{P as a,n as b,c,l as d,i as e,T as f,S as g,y as h,h as i,f as j,b as k,m as l,g as r,O as s,s as w};