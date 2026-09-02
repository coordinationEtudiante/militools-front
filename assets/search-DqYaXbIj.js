import{An as e,Cn as t,Mn as n,Qn as r,Qt as i,Sn as a,Un as o,Vn as s,Zn as c,bn as l,cn as u,en as d,er as f,f as p,hn as m,in as h,n as g,nn as _,on as v,r as y,rn as b,sn as x,tn as S,tr as C,u as w,wn as T}from"./vue-i18n-Dd-f5b4D.js";import{a as E,i as D,n as O,o as k,r as A,t as j}from"./stats.store-CErYRsA5.js";import{t as M}from"./message-DVkvcBSz.js";import{t as N}from"./rotate-cw-vQInsb4E.js";import{N as P,d as F,h as I,i as L,o as R,r as z}from"./index-Dj5pYV-5.js";import{t as B}from"./MCard-BflvL0tF.js";var V={name:`IftaLabel`,extends:{name:`BaseIftaLabel`,extends:w,style:p.extend({name:`iftalabel`,style:`
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
`,classes:{root:`p-iftalabel`}}),provide:function(){return{$pcIftaLabel:this,$parentInstance:this}}},inheritAttrs:!1};function H(e,n,r,i,a,o){return l(),h(`span`,m({class:e.cx(`root`)},e.ptmi(`root`)),[t(e.$slots,`default`)],16)}V.render=H;var U={class:`mb-2 tracking-tighter text-balance text-gray-950`},W={class:`flex justify-between text-2xl`},G={class:`text-xl`},K={class:`flex h-4 w-full rounded-md`},q=u({__name:`CreditStakedBar`,setup(e){let{t}=g(),i=O(),a=d(()=>i.totalAvaibleCredit),o=d(()=>i.getConsumedCredit),s=d(()=>`${Math.min(i.getDayCredit,i.getConsumedCredit)/a.value*100}%`),u=d(()=>`${Math.max(i.getConsumedCredit-i.getDayCredit,0)/a.value*100}%`);return(e,d)=>{let p=T(`Message`);return l(),_(B,{class:`flex flex-col gap-1`},{header:n(()=>[S(`header`,U,[S(`div`,W,[v(C(c(t)(`remaning-credit`))+` `,1),x(c(y),{severity:`contrast`,variant:`text`},{default:n(()=>[x(c(N),{class:r({"animate-spin":c(i).loading}),size:12},null,8,[`class`])]),_:1})]),S(`div`,G,C(c(t)(`consumed-credit`,{total:a.value,consumed:o.value})),1)])]),default:n(()=>[S(`div`,K,[S(`div`,{class:`h-full rounded-l-md bg-red-700`,style:f({width:s.value})},null,4),S(`div`,{class:r([`h-full bg-yellow-700`,{"rounded-l-md":s.value==`0%`,"rounded-r-md":o.value==a.value}]),style:f({width:u.value})},null,6),S(`div`,{class:r([`h-full flex-1 rounded-r-md bg-green-700`,{"rounded-md":s.value==`0%`&&u.value==`0%`}])},null,2)]),o.value>=a.value?(l(),_(c(y),{key:0,disabled:``,class:`w-fit`},{default:n(()=>[x(p,{severity:`info`},{default:n(()=>[...d[0]||=[v(C(`not implemented yet`),-1)]]),_:1}),v(` `+C(c(t)(`get-more-credit`)),1)]),_:1})):b(``,!0)]),_:1})}}}),J=[`for`],Y=u({__name:`fieldInput`,props:{field:{},validation:{type:Boolean,default:!0}},emits:[`update:modelValue`],setup(t,{emit:r}){let i=r,{t:a}=g(),s=F(),u=d(()=>s.contactTypeValidator.get(t.field.type)??/.*/),f=d(()=>u.value.toString()),p=o(``),m=d(()=>t.validation==1&&p.value!==``&&!u.value.test(p.value));return e(p,e=>{m.value||i(`update:modelValue`,e)},{immediate:!0}),(e,r)=>(l(),_(c(V),null,{default:n(()=>[x(c(P),{id:String(t.field.id),modelValue:p.value,"onUpdate:modelValue":r[0]||=e=>p.value=e,placeholder:t.field.type,invalid:m.value},null,8,[`id`,`modelValue`,`placeholder`,`invalid`]),S(`label`,{for:String(t.field.id)},C(t.field.name),9,J),m.value?(l(),_(c(M),{key:0,size:`small`,severity:`error`,variant:`simple`},{default:n(()=>[v(C(c(a)(`type-error`,{type:t.field.type,validator:f.value})),1)]),_:1})):b(``,!0)]),_:1}))}}),X={class:`h-full w-full`},Z={class:`flex flex-col justify-center gap-2`},Q={class:`flex flex-wrap gap-1`},$={class:`flex flex-wrap gap-1`},ee={class:`flex flex-wrap gap-1`},te={class:`text-gray-950`},ne=u({__name:`search`,setup(e){let{t}=g(),r=F(),u=j(),f=z(),p=O(),m=f.getPerm(`:area/contact/getContacts`)===`admin`,w=o(),T=o(200),N=o(),P=s(new Map),V=d(()=>{let e=!1;return P.forEach(t=>{t.trim()!=``&&t.trim().length<3&&(e=!0)}),e}),H=d(()=>{let e=0;return P.forEach(t=>{t.trim()!=``&&t.trim().length>2&&e++}),e});function U(e){let t;for(let n of r.indexedFields){if(t)continue;let r=e.fields.find(e=>e.name===n.name);r&&(t=r.value)}if(!t)for(let n of r.primaryFields){if(t)continue;let r=e.fields.find(e=>e.name===n.name);r&&(t=r.value)}return t||=e.fields[0]?.value??``,t}async function W(){let e=Array.from(P).map(([e,t])=>[e.trim(),t.trim()]).filter(([,e])=>e.length>=3);try{let t=await R(`:area/contact/getContacts`,{query:{filters:e.map(e=>e.join(`:`)).join(`,`)}});N.value=t.fields.filter((e,t,n)=>t===n.findIndex(t=>t.name===e.name&&t.name===e.name)),w.value=t.value,p.consumeNewCredit()}catch(e){T.value=e instanceof I?e.status:400}}function G(){w.value=void 0,N.value=void 0,T.value=200}return(e,o)=>(l(),h(`div`,X,[m?(l(),_(c(M),{key:0,severity:`success`,class:`m-2`},{default:n(()=>[v(C(c(t)(`serach-admin`)),1)]),_:1})):(l(),_(q,{key:1})),x(c(M),{severity:`warn`,class:`m-2`},{default:n(()=>[v(C(c(t)(`search-log-warn`,{credit:c(r).getArea().searchCredit})),1)]),_:1}),w.value===void 0?(l(),_(B,{key:2,title:c(t)(`seach-in-nb-field`,{nb:c(u).isReady?`...`:c(u).getnbValue}),class:`m-2 flex flex-col justify-center gap-2`},{default:n(()=>[S(`form`,Z,[x(c(k),{value:`primary-field`},{default:n(()=>[x(c(A),{value:`primary-field`,disabled:c(r).primaryFields.length==0},{default:n(()=>[x(c(D),null,{default:n(()=>[v(C(c(t)(`primary-field`)),1)]),_:1}),x(c(E),null,{default:n(()=>[S(`div`,Q,[(l(!0),h(i,null,a(c(r).primaryFields,e=>(l(),_(Y,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>P.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`]),x(c(A),{value:`indexed-field`,disabled:c(r).indexedFields.length==0},{default:n(()=>[x(c(D),null,{default:n(()=>[v(C(c(t)(`indexed-field`)),1)]),_:1}),x(c(E),null,{default:n(()=>[S(`div`,$,[(l(!0),h(i,null,a(c(r).indexedFields,e=>(l(),_(Y,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>P.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`]),x(c(A),{value:`other-field`,disabled:c(r).otherFields.length==0},{default:n(()=>[x(c(D),null,{default:n(()=>[v(C(c(t)(`other-field`)),1)]),_:1}),x(c(E),null,{default:n(()=>[S(`div`,ee,[(l(!0),h(i,null,a(c(r).otherFields,e=>(l(),_(Y,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>P.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`])]),_:1}),V.value?(l(),_(c(M),{key:0,severity:`info`},{default:n(()=>[v(C(c(t)(`search-min-3-lenght`)),1)]),_:1})):b(``,!0),T.value==404?(l(),_(c(M),{key:1,severity:`error`},{default:n(()=>[v(C(c(t)(`search-error-404`)),1)]),_:1})):T.value==200?b(``,!0):(l(),_(c(M),{key:2,severity:`error`},{default:n(()=>[v(C(c(t)(`search-error`,{code:T.value})),1)]),_:1})),x(c(y),{disabled:H.value==0,onClick:W},{default:n(()=>[v(C(c(t)(`search-on-nb-fields`,{nb:H.value})),1)]),_:1},8,[`disabled`])])]),_:1},8,[`title`])):(l(),_(B,{key:3,title:c(t)(`search-result`,{nb:w.value.length}),class:`m-2 flex flex-col justify-center gap-2`},{default:n(()=>[x(c(k),{class:`Accordion`},{default:n(()=>[(l(!0),h(i,null,a(w.value,e=>(l(),_(c(A),{value:e.id,key:e.id},{default:n(()=>[x(c(D),null,{default:n(()=>[x(L,{size:32,seed:String(e.id)},null,8,[`seed`]),v(` `+C(U(e)),1)]),_:2},1024),x(c(E),null,{default:n(()=>[(l(!0),h(i,null,a(e.fields,e=>(l(),h(`div`,{class:`flex justify-between gap-1`,key:e.name},[S(`span`,te,C(e.name),1),S(`span`,null,C(e.value),1)]))),128))]),_:2},1024)]),_:2},1032,[`value`]))),128))]),_:1}),x(c(y),{onClick:G},{default:n(()=>[v(C(c(t)(`new-search`)),1)]),_:1})]),_:1},8,[`title`]))]))}});export{ne as default};