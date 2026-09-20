import{An as e,Bn as t,Dr as n,Fr as r,Hn as i,Ki as a,Mn as o,Nn as s,Nr as c,Pr as l,Vi as u,Wi as d,c as f,ji as p,jn as m,ki as h,kn as g,o as _,oi as v,pr as y,qi as b,ti as x,yn as S,zn as C}from"./spinner-L991b5nZ.js";import{n as w,r as T}from"./vue-i18n-DJKM_I7F.js";import{c as E,n as D,s as O}from"./router-CELK1Zfh.js";import{a as k,i as A,n as j,o as M,r as N,t as P}from"./stats.store-BWKwBmKI.js";import{t as F}from"./inputtext-BVX2KqQg.js";import{t as I}from"./message-Cigbm0i_.js";import{t as L}from"./rotate-cw-B9PBFg1m.js";import{a as R,o as z}from"./index-C027ASB8.js";import{t as B}from"./MCard-aTD6TGdJ.js";var V={name:`IftaLabel`,extends:{name:`BaseIftaLabel`,extends:_,style:f.extend({name:`iftalabel`,style:`
    .p-iftalabel {
        display: block;
        position: relative;
    }

    .p-iftalabel label {
        position: absolute;
        pointer-events: none;
        top: dt('iftalabel.top');
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
        font-size: dt('iftalabel.font.size');
        font-weight: dt('iftalabel.font.weight');
        inset-inline-start: dt('iftalabel.position.x');
        color: dt('iftalabel.color');
        transition-duration: dt('iftalabel.transition.duration');
    }

    .p-iftalabel .p-inputtext,
    .p-iftalabel .p-textarea,
    .p-iftalabel .p-select-label,
    .p-iftalabel .p-multiselect-label,
    .p-iftalabel .p-multiselect-label:has(.p-chip),
    .p-iftalabel .p-autocomplete-input-multiple,
    .p-iftalabel .p-inputtags,
    .p-iftalabel .p-cascadeselect-label,
    .p-iftalabel .p-treeselect-label {
        padding-block-start: dt('iftalabel.input.padding.top');
        padding-block-end: dt('iftalabel.input.padding.bottom');
    }

    .p-iftalabel:has(.p-invalid) label {
        color: dt('iftalabel.invalid.color');
    }

    .p-iftalabel:has(input:focus) label,
    .p-iftalabel:has(input:-webkit-autofill) label,
    .p-iftalabel:has(textarea:focus) label,
    .p-iftalabel:has(.p-inputwrapper-focus) label {
        color: dt('iftalabel.focus.color');
    }

    .p-iftalabel .p-inputicon {
        top: dt('iftalabel.input.padding.top');
        transform: translateY(25%);
        margin-top: 0;
    }
`,classes:{root:`p-iftalabel`}}),provide:function(){return{$pcIftaLabel:this,$parentInstance:this}}},inheritAttrs:!1};function H(e,t,r,i,a,o){return n(),s(`span`,y({class:e.cx(`root`)},e.ptmi(`root`)),[l(e.$slots,`default`)],16)}V.render=H;var U={class:`mb-2 tracking-tighter text-balance text-gray-950`},W={class:`flex justify-between text-2xl`},G={class:`text-xl`},K={class:`flex h-4 w-full rounded-md`},q=i({__name:`CreditStakedBar`,setup(i){let{t:s}=w(),c=j(),l=g(()=>c.totalAvaibleCredit),f=g(()=>c.getConsumedCredit),p=g(()=>`${Math.min(c.getDayCredit,c.getConsumedCredit)/l.value*100}%`),h=g(()=>`${Math.max(c.getConsumedCredit-c.getDayCredit,0)/l.value*100}%`);return(i,g)=>{let _=r(`Message`);return n(),m(B,{class:`flex flex-col gap-1`},{header:v(()=>[e(`header`,U,[e(`div`,W,[C(b(u(s)(`remaning-credit`))+` `,1),t(u(T),{severity:`contrast`,variant:`text`},{default:v(()=>[t(u(L),{class:d({"animate-spin":u(c).loading}),size:12},null,8,[`class`])]),_:1})]),e(`div`,G,b(u(s)(`consumed-credit`,{total:l.value,consumed:f.value})),1)])]),default:v(()=>[e(`div`,K,[e(`div`,{class:`h-full rounded-l-md bg-red-700`,style:a({width:p.value})},null,4),e(`div`,{class:d([`h-full bg-yellow-700`,{"rounded-l-md":p.value==`0%`,"rounded-r-md":f.value==l.value}]),style:a({width:h.value})},null,6),e(`div`,{class:d([`h-full flex-1 rounded-r-md bg-green-700`,{"rounded-md":p.value==`0%`&&h.value==`0%`}])},null,2)]),f.value>=l.value?(n(),m(u(T),{key:0,disabled:``,class:`w-fit`},{default:v(()=>[t(_,{severity:`info`},{default:v(()=>[...g[0]||=[C(b(`not implemented yet`),-1)]]),_:1}),C(` `+b(u(s)(`get-more-credit`)),1)]),_:1})):o(``,!0)]),_:1})}}}),J=[`for`],Y=i({__name:`fieldInput`,props:{field:{},validation:{type:Boolean,default:!0}},emits:[`update:modelValue`],setup(r,{emit:i}){let a=i,{t:s}=w(),c=O(),l=g(()=>c.contactTypeValidator.get(r.field.type)??/.*/),d=g(()=>l.value.toString()),f=p(``),h=g(()=>r.validation==1&&f.value!==``&&!l.value.test(f.value));return x(f,e=>{h.value||a(`update:modelValue`,e)},{immediate:!0}),(i,a)=>(n(),m(u(V),null,{default:v(()=>[t(u(F),{id:String(r.field.id),modelValue:f.value,"onUpdate:modelValue":a[0]||=e=>f.value=e,placeholder:r.field.type,invalid:h.value},null,8,[`id`,`modelValue`,`placeholder`,`invalid`]),e(`label`,{for:String(r.field.id)},b(r.field.name),9,J),h.value?(n(),m(u(I),{key:0,size:`small`,severity:`error`,variant:`simple`},{default:v(()=>[C(b(u(s)(`type-error`,{type:r.field.type,validator:d.value})),1)]),_:1})):o(``,!0)]),_:1}))}}),X={class:`h-full w-full`},Z={class:`flex flex-col justify-center gap-2`},Q={class:`flex flex-wrap gap-1`},$={class:`flex flex-wrap gap-1`},ee={class:`flex flex-wrap gap-1`},te={class:`text-gray-950`},ne=i({__name:`search`,setup(r){let{t:i}=w(),a=O(),l=P(),d=R(),f=j(),_=d.getPerm(`:area/contact/getContacts`)===`admin`,y=p(),x=p(200),F=p(),L=h(new Map),V=g(()=>{let e=!1;return L.forEach(t=>{t.trim()!=``&&t.trim().length<3&&(e=!0)}),e}),H=g(()=>{let e=0;return L.forEach(t=>{t.trim()!=``&&t.trim().length>2&&e++}),e});function U(e){let t;for(let n of a.indexedFields){if(t)continue;let r=e.fields.find(e=>e.name===n.name);r&&(t=r.value)}if(!t)for(let n of a.primaryFields){if(t)continue;let r=e.fields.find(e=>e.name===n.name);r&&(t=r.value)}return t||=e.fields[0]?.value??``,t}async function W(){let e=Array.from(L).map(([e,t])=>[e.trim(),t.trim()]).filter(([,e])=>e.length>=3);try{let t=await D(`:area/contact/getContacts`,{query:{filters:e.map(e=>e.join(`:`)).join(`,`)}});F.value=t.fields.filter((e,t,n)=>t===n.findIndex(t=>t.name===e.name&&t.name===e.name)),y.value=t.value,f.consumeNewCredit()}catch(e){x.value=e instanceof E?e.status:400}}function G(){y.value=void 0,F.value=void 0,x.value=200}return(r,d)=>(n(),s(`div`,X,[_?(n(),m(u(I),{key:0,severity:`success`,class:`m-2`},{default:v(()=>[C(b(u(i)(`serach-admin`)),1)]),_:1})):(n(),m(q,{key:1})),t(u(I),{severity:`warn`,class:`m-2`},{default:v(()=>[C(b(u(i)(`search-log-warn`,{credit:u(a).getArea().searchCredit})),1)]),_:1}),y.value===void 0?(n(),m(B,{key:2,title:u(i)(`seach-in-nb-field`,{nb:u(l).isReady?`...`:u(l).getnbValue}),class:`m-2 flex flex-col justify-center gap-2`},{default:v(()=>[e(`form`,Z,[t(u(M),{value:`primary-field`},{default:v(()=>[t(u(N),{value:`primary-field`,disabled:u(a).primaryFields.length==0},{default:v(()=>[t(u(A),null,{default:v(()=>[C(b(u(i)(`primary-field`)),1)]),_:1}),t(u(k),null,{default:v(()=>[e(`div`,Q,[(n(!0),s(S,null,c(u(a).primaryFields,e=>(n(),m(Y,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>L.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`]),t(u(N),{value:`indexed-field`,disabled:u(a).indexedFields.length==0},{default:v(()=>[t(u(A),null,{default:v(()=>[C(b(u(i)(`indexed-field`)),1)]),_:1}),t(u(k),null,{default:v(()=>[e(`div`,$,[(n(!0),s(S,null,c(u(a).indexedFields,e=>(n(),m(Y,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>L.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`]),t(u(N),{value:`other-field`,disabled:u(a).otherFields.length==0},{default:v(()=>[t(u(A),null,{default:v(()=>[C(b(u(i)(`other-field`)),1)]),_:1}),t(u(k),null,{default:v(()=>[e(`div`,ee,[(n(!0),s(S,null,c(u(a).otherFields,e=>(n(),m(Y,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>L.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`])]),_:1}),V.value?(n(),m(u(I),{key:0,severity:`info`},{default:v(()=>[C(b(u(i)(`search-min-3-lenght`)),1)]),_:1})):o(``,!0),x.value==404?(n(),m(u(I),{key:1,severity:`error`},{default:v(()=>[C(b(u(i)(`search-error-404`)),1)]),_:1})):x.value==200?o(``,!0):(n(),m(u(I),{key:2,severity:`error`},{default:v(()=>[C(b(u(i)(`search-error`,{code:x.value})),1)]),_:1})),t(u(T),{disabled:H.value==0,onClick:W},{default:v(()=>[C(b(u(i)(`search-on-nb-fields`,{nb:H.value})),1)]),_:1},8,[`disabled`])])]),_:1},8,[`title`])):(n(),m(B,{key:3,title:u(i)(`search-result`,{nb:y.value.length}),class:`m-2 flex flex-col justify-center gap-2`},{default:v(()=>[t(u(M),{class:`Accordion`},{default:v(()=>[(n(!0),s(S,null,c(y.value,r=>(n(),m(u(N),{value:r.id,key:r.id},{default:v(()=>[t(u(A),null,{default:v(()=>[t(z,{size:32,seed:String(r.id)},null,8,[`seed`]),C(` `+b(U(r)),1)]),_:2},1024),t(u(k),null,{default:v(()=>[(n(!0),s(S,null,c(r.fields,t=>(n(),s(`div`,{class:`flex justify-between gap-1`,key:t.name},[e(`span`,te,b(t.name),1),e(`span`,null,b(t.value),1)]))),128))]),_:2},1024)]),_:2},1032,[`value`]))),128))]),_:1}),t(u(T),{onClick:G},{default:v(()=>[C(b(u(i)(`new-search`)),1)]),_:1})]),_:1},8,[`title`]))]))}});export{ne as default};