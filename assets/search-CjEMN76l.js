import{An as e,Cn as t,En as n,K as r,Kt as i,Mn as a,Nn as o,Qn as s,Qt as c,R as l,Sn as u,Tn as d,Tt as f,Un as p,Vn as m,X as h,Xn as g,Yt as _,Zn as v,bn as y,cn as b,en as x,er as S,f as C,hn as w,in as T,n as E,nn as D,o as ee,on as O,r as k,rn as A,sn as j,tn as M,tr as N,u as P,wn as F}from"./vue-i18n-Dd-f5b4D.js";import{t as te}from"./chevron-up-laW26pJY.js";import{t as I}from"./message-DbDUstUO.js";import{t as L}from"./rotate-cw-D6ZWf3So.js";import{M as R,V as z,d as B,i as ne,m as re,o as V,p as ie,r as ae,z as oe}from"./index-C9KQR3Je.js";import{t as H}from"./MCard-BflvL0tF.js";var U=C.extend({name:`accordion`,style:`
    .p-accordionpanel {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: dt('accordion.panel.border.width');
        border-color: dt('accordion.panel.border.color');
    }

    .p-accordionheader {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('accordion.header.padding');
        color: dt('accordion.header.color');
        background: dt('accordion.header.background');
        border-style: solid;
        border-width: dt('accordion.header.border.width');
        border-color: dt('accordion.header.border.color');
        font-weight: dt('accordion.header.font.weight');
        font-size: dt('accordion.header.font.size');
        border-radius: dt('accordion.header.border.radius');
        transition:
            background dt('accordion.transition.duration'),
            color dt('accordion.transition.duration'),
            outline-color dt('accordion.transition.duration'),
            box-shadow dt('accordion.transition.duration');
        outline-color: transparent;
    }

    .p-accordionpanel:first-child > .p-accordionheader {
        border-width: dt('accordion.header.first.border.width');
        border-start-start-radius: dt('accordion.header.first.top.border.radius');
        border-start-end-radius: dt('accordion.header.first.top.border.radius');
    }

    .p-accordionpanel:last-child > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.bottom.border.radius');
    }

    .p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.active.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.active.bottom.border.radius');
    }

    .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.color');
    }

    .p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
        box-shadow: dt('accordion.header.focus.ring.shadow');
        outline: dt('accordion.header.focus.ring.width') dt('accordion.header.focus.ring.style') dt('accordion.header.focus.ring.color');
        outline-offset: dt('accordion.header.focus.ring.offset');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
        background: dt('accordion.header.hover.background');
        color: dt('accordion.header.hover.color');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
        background: dt('accordion.header.active.background');
        color: dt('accordion.header.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {
        background: dt('accordion.header.active.hover.background');
        color: dt('accordion.header.active.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.hover.color');
    }

    .p-accordioncontent {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-accordioncontent-wrapper {
        min-height: 0;
    }

    .p-accordioncontent-content {
        border-style: solid;
        border-width: dt('accordion.content.border.width');
        border-color: dt('accordion.content.border.color');
        background-color: dt('accordion.content.background');
        color: dt('accordion.content.color');
        padding: dt('accordion.content.padding');
    }
`,classes:{root:`p-accordion p-component`}}),W={name:`Accordion`,extends:{name:`BaseAccordion`,extends:P,props:{value:{type:[String,Number,Array],default:void 0},multiple:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0}},style:U,provide:function(){return{$pcAccordion:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{isItemActive:function(e){return this.multiple?this.d_value?.includes(e):this.d_value===e},updateValue:function(e){var t=this.isItemActive(e);this.multiple?t?this.d_value=this.d_value.filter(function(t){return t!==e}):this.d_value?this.d_value.push(e):this.d_value=[e]:this.d_value=t?null:e,this.$emit(`update:value`,this.d_value)}}};function G(e,n,r,i,a,o){return y(),T(`div`,w({class:e.cx(`root`)},e.ptmi(`root`)),[t(e.$slots,`default`)],16)}W.render=G;var K=C.extend({name:`accordioncontent`,classes:{root:`p-accordioncontent`,contentWrapper:`p-accordioncontent-wrapper`,content:`p-accordioncontent-content`}}),q={name:`AccordionContent`,extends:{name:`BaseAccordionContent`,extends:P,props:{as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1}},style:K,provide:function(){return{$pcAccordionContent:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcAccordion`,`$pcAccordionPanel`],computed:{id:function(){return`${this.$pcAccordion.$id}_accordioncontent_${this.$pcAccordionPanel.value}`},ariaLabelledby:function(){return`${this.$pcAccordion.$id}_accordionheader_${this.$pcAccordionPanel.value}`},attrs:function(){return w(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{id:this.id,role:`region`,"aria-labelledby":this.ariaLabelledby,"data-pc-name":`accordioncontent`,"data-p-active":this.$pcAccordionPanel.active}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}}}};function se(e,r,c,l,u,d){return e.asChild?t(e.$slots,`default`,{key:1,class:s(e.cx(`root`)),active:d.$pcAccordionPanel.active,a11yAttrs:d.a11yAttrs}):(y(),D(i,w({key:0,name:`p-collapsible`},e.ptm(`transition`,d.ptParams)),{default:a(function(){return[!d.$pcAccordion.lazy||d.$pcAccordionPanel.active?o((y(),D(n(e.as),w({key:0,class:e.cx(`root`)},d.attrs),{default:a(function(){return[M(`div`,w({class:e.cx(`contentWrapper`)},e.ptm(`contentWrapper`,d.ptParams)),[M(`div`,w({class:e.cx(`content`)},e.ptm(`content`,d.ptParams)),[t(e.$slots,`default`)],16)],16)]}),_:3},16,[`class`])),[[_,d.$pcAccordion.lazy?!0:d.$pcAccordionPanel.active]]):A(``,!0)]}),_:3},16))}q.render=se;var ce=C.extend({name:`accordionheader`,classes:{root:`p-accordionheader`,toggleicon:`p-accordionheader-toggle-icon`}}),J={name:`AccordionHeader`,extends:{name:`BaseAccordionHeader`,extends:P,props:{as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1}},style:ce,provide:function(){return{$pcAccordionHeader:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcAccordion`,`$pcAccordionPanel`],methods:{onFocus:function(){this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onClick:function(){!this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onKeydown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break}},onArrowDownKey:function(e){var t=this.findNextPanel(this.findPanel(e.currentTarget));t?this.changeFocusedPanel(e,t):this.onHomeKey(e),e.preventDefault()},onArrowUpKey:function(e){var t=this.findPrevPanel(this.findPanel(e.currentTarget));t?this.changeFocusedPanel(e,t):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var t=this.findFirstPanel();this.changeFocusedPanel(e,t),e.preventDefault()},onEndKey:function(e){var t=this.findLastPanel();this.changeFocusedPanel(e,t),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue(),e.preventDefault()},findPanel:function(e){return e?.closest(`[data-pc-name="accordionpanel"]`)},findHeader:function(e){return r(e,`[data-pc-name="accordionheader"]`)},findNextPanel:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?l(t,`data-p-disabled`)?this.findNextPanel(t):this.findHeader(t):null},findPrevPanel:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?l(t,`data-p-disabled`)?this.findPrevPanel(t):this.findHeader(t):null},findFirstPanel:function(){return this.findNextPanel(this.$pcAccordion.$el.firstElementChild,!0)},findLastPanel:function(){return this.findPrevPanel(this.$pcAccordion.$el.lastElementChild,!0)},changeActiveValue:function(){this.$pcAccordion.updateValue(this.$pcAccordionPanel.value)},changeFocusedPanel:function(e,t){h(this.findHeader(t))}},computed:{id:function(){return`${this.$pcAccordion.$id}_accordionheader_${this.$pcAccordionPanel.value}`},ariaControls:function(){return`${this.$pcAccordion.$id}_accordioncontent_${this.$pcAccordionPanel.value}`},attrs:function(){return w(this.asAttrs,this.a11yAttrs,this.ptmi(`root`,this.ptParams))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.$pcAccordionPanel.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcAccordion.tabindex,"aria-expanded":this.$pcAccordionPanel.active,"aria-controls":this.ariaControls,"data-pc-name":`accordionheader`,"data-p-disabled":this.$pcAccordionPanel.disabled,"data-p-active":this.$pcAccordionPanel.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}},dataP:function(){return f({active:this.$pcAccordionPanel.active})}},components:{ChevronUp:te,ChevronDown:oe},directives:{ripple:ee}};function le(e,r,i,c,l,u){var f=d(`ripple`);return e.asChild?t(e.$slots,`default`,{key:1,class:s(e.cx(`root`)),active:u.$pcAccordionPanel.active,a11yAttrs:u.a11yAttrs,onClick:u.onClick}):o((y(),D(n(e.as),w({key:0,"data-p":u.dataP,class:e.cx(`root`),onClick:u.onClick},u.attrs),{default:a(function(){return[t(e.$slots,`default`,{active:u.$pcAccordionPanel.active}),t(e.$slots,`toggleicon`,{active:u.$pcAccordionPanel.active,class:s(e.cx(`toggleicon`))},function(){return[u.$pcAccordionPanel.active?(y(),D(n(u.$pcAccordion.$slots.collapseicon?u.$pcAccordion.$slots.collapseicon:u.$pcAccordion.collapseIcon?`span`:`ChevronUp`),w({key:0,class:[u.$pcAccordion.collapseIcon,e.cx(`toggleicon`)],"aria-hidden":`true`},e.ptm(`toggleicon`,u.ptParams)),null,16,[`class`])):(y(),D(n(u.$pcAccordion.$slots.expandicon?u.$pcAccordion.$slots.expandicon:u.$pcAccordion.expandIcon?`span`:`ChevronDown`),w({key:1,class:[u.$pcAccordion.expandIcon,e.cx(`toggleicon`)],"aria-hidden":`true`},e.ptm(`toggleicon`,u.ptParams)),null,16,[`class`]))]})]}),_:3},16,[`data-p`,`class`,`onClick`])),[[f]])}J.render=le;var ue=C.extend({name:`accordionpanel`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-accordionpanel`,{"p-accordionpanel-active":t.active,"p-disabled":n.disabled}]}}}),Y={name:`AccordionPanel`,extends:{name:`BaseAccordionPanel`,extends:P,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1}},style:ue,provide:function(){return{$pcAccordionPanel:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcAccordion`],computed:{active:function(){return this.$pcAccordion.isItemActive(this.value)},attrs:function(){return w(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{"data-pc-name":`accordionpanel`,"data-p-disabled":this.disabled,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function de(e,r,i,o,c,l){return e.asChild?t(e.$slots,`default`,{key:1,class:s(e.cx(`root`)),active:l.active,a11yAttrs:l.a11yAttrs}):(y(),D(n(e.as),w({key:0,class:e.cx(`root`)},l.attrs),{default:a(function(){return[t(e.$slots,`default`)]}),_:3},16,[`class`]))}Y.render=de;var X={name:`IftaLabel`,extends:{name:`BaseIftaLabel`,extends:P,style:C.extend({name:`iftalabel`,style:`
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
`,classes:{root:`p-iftalabel`}}),provide:function(){return{$pcIftaLabel:this,$parentInstance:this}}},inheritAttrs:!1};function fe(e,n,r,i,a,o){return y(),T(`span`,w({class:e.cx(`root`)},e.ptmi(`root`)),[t(e.$slots,`default`)],16)}X.render=fe;var Z=z(`earchCreditStore`,()=>{let e=p(0),t=p(0),n=p(0),r=p(0),i=p(0),a=p(new Date(0)),o=p(!1),s=p(!1);async function c(){if(!s.value){s.value=!0;try{let s=await V(`:area/contact/getCredit`);e.value=s.dayCredit??0,t.value=s.consumedCredit??0,n.value=s.acceptedExtraCredit??0,r.value=s.pendingExtraCredits??0,i.value=s.rejectedExtraCredits??0,a.value=new Date,o.value=!1}catch(e){console.error(`error during request contacts: `+e),o.value=!0,a.value=new Date}s.value=!1}}function l(){t.value++,(new Date().getTime()-a.value.getTime()>=36e5||t.value*4/3>=g.value)&&c()}let u=x(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),e.value)),d=x(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),t.value)),f=x(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),n.value)),m=x(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),r.value)),h=x(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),i.value)),g=x(()=>u.value+f.value),_=x(()=>g.value-d.value);return c(),{loading:s,getDayCredit:u,getConsumedCredit:d,getAcceptedExtraCredit:f,getPendingExtraCredits:m,getRejectedExtraCredits:h,totalAvaibleCredit:g,totalRemaningCredit:_,fetchCredit:c,consumeNewCredit:l}}),pe={class:`mb-2 tracking-tighter text-balance text-gray-950`},me={class:`flex justify-between text-2xl`},he={class:`text-xl`},ge={class:`flex h-4 w-full rounded-md`},_e=b({__name:`CreditStakedBar`,setup(e){let{t}=E(),n=Z(),r=x(()=>n.totalAvaibleCredit),i=x(()=>n.getConsumedCredit),o=x(()=>`${Math.min(n.getDayCredit,n.getConsumedCredit)/r.value*100}%`),c=x(()=>`${Math.max(n.getConsumedCredit-n.getDayCredit,0)/r.value*100}%`);return(e,l)=>{let u=F(`Message`);return y(),D(H,{class:`flex flex-col gap-1`},{header:a(()=>[M(`header`,pe,[M(`div`,me,[O(N(v(t)(`remaning-credit`))+` `,1),j(v(k),{severity:`contrast`,variant:`text`},{default:a(()=>[j(v(L),{class:s({"animate-spin":v(n).loading}),size:12},null,8,[`class`])]),_:1})]),M(`div`,he,N(v(t)(`consumed-credit`,{total:r.value,consumed:i.value})),1)])]),default:a(()=>[M(`div`,ge,[M(`div`,{class:`h-full rounded-l-md bg-red-700`,style:S({width:o.value})},null,4),M(`div`,{class:s([`h-full bg-yellow-700`,{"rounded-l-md":o.value==`0%`,"rounded-r-md":i.value==r.value}]),style:S({width:c.value})},null,6),M(`div`,{class:s([`h-full flex-1 rounded-r-md bg-green-700`,{"rounded-md":o.value==`0%`&&c.value==`0%`}])},null,2)]),i.value>=r.value?(y(),D(v(k),{key:0,disabled:``,class:`w-fit`},{default:a(()=>[j(u,{severity:`info`},{default:a(()=>[...l[0]||=[O(N(`not implemented yet`),-1)]]),_:1}),O(` `+N(v(t)(`get-more-credit`)),1)]),_:1})):A(``,!0)]),_:1})}}}),ve=[`for`],Q=b({__name:`fieldInput`,props:{field:{},validation:{type:Boolean,default:!0}},emits:[`update:modelValue`],setup(t,{emit:n}){let r=n,{t:i}=E(),o=B(),s=x(()=>o.contactTypeValidator.get(t.field.type)??/.*/),c=x(()=>s.value.toString()),l=p(``),u=x(()=>t.validation==1&&l.value!==``&&!s.value.test(l.value));return e(l,e=>{u.value||r(`update:modelValue`,e)},{immediate:!0}),(e,n)=>(y(),D(v(X),null,{default:a(()=>[j(v(R),{id:String(t.field.id),modelValue:l.value,"onUpdate:modelValue":n[0]||=e=>l.value=e,placeholder:t.field.type,invalid:u.value},null,8,[`id`,`modelValue`,`placeholder`,`invalid`]),M(`label`,{for:String(t.field.id)},N(t.field.name),9,ve),u.value?(y(),D(v(I),{key:0,size:`small`,severity:`error`,variant:`simple`},{default:a(()=>[O(N(v(i)(`type-error`,{type:t.field.type,validator:c.value})),1)]),_:1})):A(``,!0)]),_:1}))}});function ye(...e){return x(()=>e.some(e=>g(e)))}var be=z(`StatsStore`,()=>{let e=ie(`stats`,{nbUser:0,nbValue:0,fetchDate:new Date(0)}),t=p(!1),n=p(!1);async function r(){try{if(e.value)try{if(typeof e==`object`&&e){if(e.value.fetchDate){let t=String(e.value.fetchDate);e.value.fetchDate=new Date(t)}else e.value.fetchDate=new Date;if(e.value.nbUser=e.value.nbUser||0,e.value.nbValue=e.value.nbValue||0,new Date().getTime()-e.value.fetchDate.getTime()>=36e5)return i()}}catch(e){console.warn(`StatsStore: Could not parse stored stats data. Using defaults.`,e)}}catch(e){console.warn(e),await i()}}async function i(){if(!n.value){n.value=!0;try{let n=await V(`:area/stats/contactStats`);e.value.nbUser=n.contactCount,e.value.nbValue=n.totalValue,e.value.fetchDate=new Date,t.value=!1}catch(n){console.error(`error during request contacts: `+n),t.value=!0,e.value.fetchDate=new Date}n.value=!1}}let a=x(()=>(new Date().getTime()-e.value.fetchDate.getTime()>=36e5&&i(),e.value.nbUser)),o=x(()=>(new Date().getTime()-e.value.fetchDate.getTime()>=36e5&&i(),e.value.nbValue)),s=ye(t,n);return r(),{getNbUser:a,getnbValue:o,errored:t,loading:n,isReady:s}}),$={class:`h-full w-full`},xe={class:`flex flex-col justify-center gap-2`},Se={class:`flex flex-wrap gap-1`},Ce={class:`flex flex-wrap gap-1`},we={class:`flex flex-wrap gap-1`},Te={class:`text-gray-950`},Ee=b({__name:`search`,setup(e){let{t}=E(),n=B(),r=be(),i=ae(),o=Z(),s=i.getPerm(`:area/contact/getContacts`)===`admin`,l=p(),d=p(200),f=p(),h=m(new Map),g=x(()=>{let e=!1;return h.forEach(t=>{t.trim()!=``&&t.trim().length<3&&(e=!0)}),e}),_=x(()=>{let e=0;return h.forEach(t=>{t.trim()!=``&&t.trim().length>2&&e++}),e});function b(e){let t;for(let r of n.indexedFields){if(t)continue;let n=e.fields.find(e=>e.name===r.name);n&&(t=n.value)}if(!t)for(let r of n.primaryFields){if(t)continue;let n=e.fields.find(e=>e.name===r.name);n&&(t=n.value)}return t||=e.fields[0]?.value??``,t}async function S(){let e=Array.from(h).map(([e,t])=>[e.trim(),t.trim()]).filter(([,e])=>e.length>=3);try{let t=await V(`:area/contact/getContacts`,{query:{filters:e.map(e=>e.join(`:`)).join(`,`)}});f.value=t.fields.filter((e,t,n)=>t===n.findIndex(t=>t.name===e.name&&t.name===e.name)),l.value=t.value,o.consumeNewCredit()}catch(e){d.value=e instanceof re?e.status:400}}function C(){l.value=void 0,f.value=void 0,d.value=200}return(e,i)=>(y(),T(`div`,$,[s?(y(),D(v(I),{key:0,severity:`success`,class:`m-2`},{default:a(()=>[O(N(v(t)(`serach-admin`)),1)]),_:1})):(y(),D(_e,{key:1})),j(v(I),{severity:`warn`,class:`m-2`},{default:a(()=>[O(N(v(t)(`search-log-warn`,{credit:v(n).getArea().searchCredit})),1)]),_:1}),l.value===void 0?(y(),D(H,{key:2,title:v(t)(`seach-in-nb-field`,{nb:v(r).isReady?`...`:v(r).getnbValue}),class:`m-2 flex flex-col justify-center gap-2`},{default:a(()=>[M(`form`,xe,[j(v(W),{value:`primary-field`},{default:a(()=>[j(v(Y),{value:`primary-field`,disabled:v(n).primaryFields.length==0},{default:a(()=>[j(v(J),null,{default:a(()=>[O(N(v(t)(`primary-field`)),1)]),_:1}),j(v(q),null,{default:a(()=>[M(`div`,Se,[(y(!0),T(c,null,u(v(n).primaryFields,e=>(y(),D(Q,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>h.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`]),j(v(Y),{value:`indexed-field`,disabled:v(n).indexedFields.length==0},{default:a(()=>[j(v(J),null,{default:a(()=>[O(N(v(t)(`indexed-field`)),1)]),_:1}),j(v(q),null,{default:a(()=>[M(`div`,Ce,[(y(!0),T(c,null,u(v(n).indexedFields,e=>(y(),D(Q,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>h.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`]),j(v(Y),{value:`other-field`,disabled:v(n).otherFields.length==0},{default:a(()=>[j(v(J),null,{default:a(()=>[O(N(v(t)(`other-field`)),1)]),_:1}),j(v(q),null,{default:a(()=>[M(`div`,we,[(y(!0),T(c,null,u(v(n).otherFields,e=>(y(),D(Q,{field:e,key:e.id,validation:!1,"onUpdate:modelValue":t=>h.set(e.name,t)},null,8,[`field`,`onUpdate:modelValue`]))),128))])]),_:1})]),_:1},8,[`disabled`])]),_:1}),g.value?(y(),D(v(I),{key:0,severity:`info`},{default:a(()=>[O(N(v(t)(`search-min-3-lenght`)),1)]),_:1})):A(``,!0),d.value==404?(y(),D(v(I),{key:1,severity:`error`},{default:a(()=>[O(N(v(t)(`search-error-404`)),1)]),_:1})):d.value==200?A(``,!0):(y(),D(v(I),{key:2,severity:`error`},{default:a(()=>[O(N(v(t)(`search-error`,{code:d.value})),1)]),_:1})),j(v(k),{disabled:_.value==0,onClick:S},{default:a(()=>[O(N(v(t)(`search-on-nb-fields`,{nb:_.value})),1)]),_:1},8,[`disabled`])])]),_:1},8,[`title`])):(y(),D(H,{key:3,title:v(t)(`search-result`,{nb:l.value.length}),class:`m-2 flex flex-col justify-center gap-2`},{default:a(()=>[j(v(W),{class:`Accordion`},{default:a(()=>[(y(!0),T(c,null,u(l.value,e=>(y(),D(v(Y),{value:e.id,key:e.id},{default:a(()=>[j(v(J),null,{default:a(()=>[j(ne,{size:32,seed:String(e.id)},null,8,[`seed`]),O(` `+N(b(e)),1)]),_:2},1024),j(v(q),null,{default:a(()=>[(y(!0),T(c,null,u(e.fields,e=>(y(),T(`div`,{class:`flex justify-between gap-1`,key:e.name},[M(`span`,Te,N(e.name),1),M(`span`,null,N(e.value),1)]))),128))]),_:2},1024)]),_:2},1032,[`value`]))),128))]),_:1}),j(v(k),{onClick:C},{default:a(()=>[O(N(v(t)(`new-search`)),1)]),_:1})]),_:1},8,[`title`]))]))}});export{Ee as default};