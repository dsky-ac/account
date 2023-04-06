(function(){"use strict";var e={4880:function(e,l,a){var t=a(9242),n=a(3716),o=(a(4415),a(3396));function r(e,l,a,t,n,r){const u=(0,o.up)("Table");return(0,o.wg)(),(0,o.j4)(u,{msg:"Welcome to Your Vue.js App"})}const u={class:"table-style"},s={class:"align"},i={key:0},c={key:1};function d(e,l,a,t,n,r){const d=(0,o.up)("el-option"),p=(0,o.up)("el-select"),m=(0,o.up)("el-input-number"),b=(0,o.up)("el-form-item"),v=(0,o.up)("el-button"),f=(0,o.up)("el-form"),g=(0,o.up)("TablePage"),h=(0,o.Q2)("loading");return(0,o.wg)(),(0,o.iD)("div",u,[(0,o._)("div",s,[(0,o._)("div",null,[(0,o.Uk)(" Type: "),(0,o.Wm)(p,{modelValue:e.selectType,"onUpdate:modelValue":l[0]||(l[0]=l=>e.selectType=l),placeholder:"Select",disabled:e.btnDisabled,onChange:l[1]||(l[1]=l=>e.typeChange(!1)),class:"input-style"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,{label:"Token",value:"Token"}),(0,o.Wm)(d,{label:"LP",value:"LP"})])),_:1},8,["modelValue","disabled"])]),(0,o._)("div",null,[(0,o.Uk)(" Network: "),(0,o.Wm)(p,{modelValue:e.chainId,"onUpdate:modelValue":l[2]||(l[2]=l=>e.chainId=l),placeholder:"Select",disabled:e.btnDisabled,onChange:l[3]||(l[3]=l=>e.networkChange()),class:"input-style"},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.networkList,(e=>((0,o.wg)(),(0,o.j4)(d,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue","disabled"])])]),(0,o.Wm)(f,{model:e.form,inline:!0,"label-width":"74px"},{default:(0,o.w5)((()=>[(0,o.Wm)(b,{label:"price ≥"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{modelValue:e.form.price,"onUpdate:modelValue":l[4]||(l[4]=l=>e.form.price=l),min:0,controls:!1},null,8,["modelValue"])])),_:1}),(0,o.Wm)(b,{label:"tvl ≥"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{modelValue:e.form.tvl,"onUpdate:modelValue":l[5]||(l[5]=l=>e.form.tvl=l),min:0,controls:!1},null,8,["modelValue"])])),_:1}),(0,o.Wm)(b,{label:"balance ≥"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{modelValue:e.form.balance,"onUpdate:modelValue":l[6]||(l[6]=l=>e.form.balance=l),min:0,controls:!1},null,8,["modelValue"])])),_:1}),(0,o.Wm)(b,{label:"usd ≥"},{default:(0,o.w5)((()=>[(0,o.Wm)(m,{modelValue:e.form.usd,"onUpdate:modelValue":l[7]||(l[7]=l=>e.form.usd=l),min:0,controls:!1},null,8,["modelValue"])])),_:1}),(0,o.Wm)(b,null,{default:(0,o.w5)((()=>[(0,o.Wm)(v,{type:"primary",onClick:l[8]||(l[8]=l=>e.typeChange(!0)),disabled:e.btnDisabled},{default:(0,o.w5)((()=>[(0,o.Uk)("search for")])),_:1},8,["disabled"])])),_:1})])),_:1},8,["model"]),"Token"===e.selectType?((0,o.wg)(),(0,o.iD)("div",i,[(0,o.wy)((0,o.Wm)(g,{column:e.tableColumn,tableData:e.balanceData},null,8,["column","tableData"]),[[h,e.loading]])])):((0,o.wg)(),(0,o.iD)("div",c,[(0,o.wy)((0,o.Wm)(g,{column:e.tableColumn,tableData:e.lpData},null,8,["column","tableData"]),[[h,e.lploading]])]))])}a(7658);var p=a(4870),m=a(4161);const b="https://dsky-ac.github.io/",v=m.Z.create({baseURL:b,timeout:3e4});v.interceptors.request.use((e=>e),(e=>(console.log(e),Promise.reject(e)))),v.interceptors.response.use((e=>{const l=e.data;return l}),(e=>(console.log("请求错误",e.message),Promise.reject(e))));var f=v;const g={getAllToken(e){return f({url:`account/data/${e}/token.json`,method:"get"})},getAllLP(e){return f({url:`account/data/${e}/lps.json`,method:"get"})}};var h=g;function w(e,l,a,t,n,r){const u=(0,o.up)("el-table-column"),s=(0,o.up)("el-table"),i=(0,o.up)("el-pagination");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(s,{data:e.data,border:"",onSortChange:e.changeTableSort,style:{width:"100%"}},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.column,((e,l)=>((0,o.wg)(),(0,o.j4)(u,{key:l,"show-overflow-tooltip":e.showOverflowTooltip,align:e.align||"center",prop:e.prop,width:e.width,label:e.label,"sort-method":(e,l)=>e.usd-l.usd,sortable:e.sortable,formatter:e.formatter},null,8,["show-overflow-tooltip","align","prop","width","label","sort-method","sortable","formatter"])))),128))])),_:1},8,["data","onSortChange"]),(0,o.Wm)(i,{onSizeChange:e.handleSizeChange,onCurrentChange:e.handleCurrentChange,"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])}var y=(0,o.aZ)({name:"thisTable",props:{column:{type:[Object,Array]},tableData:{type:[Object,Array],default:()=>[]}},setup(e){const l=(0,p.iH)(0),a=(0,p.iH)(1),t=(0,p.iH)(10),n=(0,p.iH)([]),r=e=>{t.value=e},u=e=>{a.value=e};(0,o.m0)((()=>{if(l.value=Number(e.tableData.length),0!==l.value){const l=(a.value-1)*t.value,o=a.value*t.value;n.value=e.tableData.slice(l,o)}else n.value=[]}));const s=l=>{if(console.log(l),"ascending"==l.order){const l=e.tableData;let a=l.sort(((e,l)=>e.usd-l.usd));a.value=a}else if("descending"==l.order){const l=e.tableData;let a=l.sort(((e,l)=>l.usd-e.usd));a.value=a}};return{total:l,currentPage:a,pageSize:t,data:n,handleSizeChange:r,handleCurrentChange:u,changeTableSort:s}}}),k=a(89);const C=(0,k.Z)(y,[["render",w],["__scopeId","data-v-2153a575"]]);var T=C;const D={128:{label:"Heco",value:"128",url:"https://http-mainnet.hecochain.com"},56:{label:"BSC",value:"56",url:"http://bsc.mezz.fi/"}},W=[{prop:"name",label:"name",formatter:e=>e.name||e.symbol||""},{prop:"address",label:"address",formatter:e=>e.tokenAddress||e.address},{prop:"price",label:"price"},{prop:"tvl",label:"tvl"},{prop:"balance",label:"balance"},{prop:"usd",label:"usd",sortable:!0}];var j=(0,o.aZ)({name:"MyTable",components:{TablePage:T},props:{msg:String},setup(){const e=(0,p.iH)("Token"),l=(0,p.iH)("56"),a=(0,p.qj)({price:0,tvl:0,balance:0,usd:0}),t=(0,p.qj)({56:{lp:[],token:[]},128:{lp:[],token:[]}}),n=async()=>{a.price=0,a.tvl=0,a.balance=0,a.usd=0,m(!1)},o=(0,p.iH)([]),r=(0,p.iH)(!1),u=(0,p.iH)(!1),s=(0,p.iH)([]),i=(0,p.iH)(!1),c=async(e,l,a)=>{if(r.value=!0,u.value=!0,0===t[e].lp.length){const l=await h.getAllToken(e);t[e].token=l}if(o.value=[],l){let l=[];for(const n of t[e].token){let{price:e,usd:t}=n,o=Number(n.balance),r=Number(n.tvl);e>=a.price&&r>=a.tvl&&o>=a.balance&&t>=a.usd&&l.push(n)}o.value=l}else o.value=t[e].token;r.value=!1,u.value=!1},d=async(e,l,a)=>{if(i.value=!0,u.value=!0,0===t[e].lp.length){const l=await h.getAllLP(e);t[e].lp=l}if(l){let l=[];for(const n of t[e].lp){let{price:e,usd:t}=n,o=Number(n.balance),r=Number(n.tvl);e>=a.price&&r>=a.tvl&&o>=a.balance&&t>=a.usd&&l.push(n)}s.value=l,console.log(l,s.value)}else s.value=t[e].lp;i.value=!1,u.value=!1},m=async t=>{"Token"===e.value?c(l.value,t,a):d(l.value,t,a)};return m(!1),{balanceData:o,lpData:s,loading:r,lploading:i,btnDisabled:u,selectType:e,form:a,chainId:l,tableColumn:W,networkList:D,networkChange:n,getTokenlist:c,typeChange:m}}});const V=(0,k.Z)(j,[["render",d],["__scopeId","data-v-78d14a73"]]);var _=V,H={name:"App",components:{Table:_}};const O=(0,k.Z)(H,[["render",r]]);var S=O;const z=(0,t.ri)(S);z.use(n.Z),z.mount("#app")}},l={};function a(t){var n=l[t];if(void 0!==n)return n.exports;var o=l[t]={exports:{}};return e[t].call(o.exports,o,o.exports,a),o.exports}a.m=e,function(){var e=[];a.O=function(l,t,n,o){if(!t){var r=1/0;for(c=0;c<e.length;c++){t=e[c][0],n=e[c][1],o=e[c][2];for(var u=!0,s=0;s<t.length;s++)(!1&o||r>=o)&&Object.keys(a.O).every((function(e){return a.O[e](t[s])}))?t.splice(s--,1):(u=!1,o<r&&(r=o));if(u){e.splice(c--,1);var i=n();void 0!==i&&(l=i)}}return l}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[t,n,o]}}(),function(){a.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(l,{a:l}),l}}(),function(){a.d=function(e,l){for(var t in l)a.o(l,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:l[t]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){var e={143:0};a.O.j=function(l){return 0===e[l]};var l=function(l,t){var n,o,r=t[0],u=t[1],s=t[2],i=0;if(r.some((function(l){return 0!==e[l]}))){for(n in u)a.o(u,n)&&(a.m[n]=u[n]);if(s)var c=s(a)}for(l&&l(t);i<r.length;i++)o=r[i],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(c)},t=self["webpackChunkalltest"]=self["webpackChunkalltest"]||[];t.forEach(l.bind(null,0)),t.push=l.bind(null,t.push.bind(t))}();var t=a.O(void 0,[998],(function(){return a(4880)}));t=a.O(t)})();