import{An as e,Dr as t,H as n,Ir as r,K as i,Lr as a,Mn as o,Nn as s,P as c,Pr as l,Wi as u,Wt as d,c as f,ci as p,dn as m,ji as h,jn as g,kn as _,n as v,o as y,oi as b,pr as x,xt as S,zi as C}from"./spinner-L991b5nZ.js";import{d as w,n as T}from"./router-BonRCOY0.js";import{t as E}from"./chevron-down-_pZ1O-To.js";import{t as D}from"./chevron-up-CJ1Z6Gex.js";import{a as O}from"./dist-Wb047DbU.js";var k=f.extend({name:`accordion`,style:`
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
`,classes:{root:`p-accordion p-component`}}),A={name:`Accordion`,extends:{name:`BaseAccordion`,extends:y,props:{value:{type:[String,Number,Array],default:void 0},multiple:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},expandIcon:{type:String,default:void 0},collapseIcon:{type:String,default:void 0}},style:k,provide:function(){return{$pcAccordion:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{isItemActive:function(e){return this.multiple?this.d_value?.includes(e):this.d_value===e},updateValue:function(e){var t=this.isItemActive(e);this.multiple?t?this.d_value=this.d_value.filter(function(t){return t!==e}):this.d_value?this.d_value.push(e):this.d_value=[e]:this.d_value=t?null:e,this.$emit(`update:value`,this.d_value)}}};function j(e,n,r,i,a,o){return t(),s(`div`,x({class:e.cx(`root`)},e.ptmi(`root`)),[l(e.$slots,`default`)],16)}A.render=j;var M=f.extend({name:`accordioncontent`,classes:{root:`p-accordioncontent`,contentWrapper:`p-accordioncontent-wrapper`,content:`p-accordioncontent-content`}}),N={name:`AccordionContent`,extends:{name:`BaseAccordionContent`,extends:y,props:{as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1}},style:M,provide:function(){return{$pcAccordionContent:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcAccordion`,`$pcAccordionPanel`],computed:{id:function(){return`${this.$pcAccordion.$id}_accordioncontent_${this.$pcAccordionPanel.value}`},ariaLabelledby:function(){return`${this.$pcAccordion.$id}_accordionheader_${this.$pcAccordionPanel.value}`},attrs:function(){return x(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{id:this.id,role:`region`,"aria-labelledby":this.ariaLabelledby,"data-pc-name":`accordioncontent`,"data-p-active":this.$pcAccordionPanel.active}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}}}};function P(n,r,i,s,c,f){return n.asChild?l(n.$slots,`default`,{key:1,class:u(n.cx(`root`)),active:f.$pcAccordionPanel.active,a11yAttrs:f.a11yAttrs}):(t(),g(d,x({key:0,name:`p-collapsible`},n.ptm(`transition`,f.ptParams)),{default:b(function(){return[!f.$pcAccordion.lazy||f.$pcAccordionPanel.active?p((t(),g(a(n.as),x({key:0,class:n.cx(`root`)},f.attrs),{default:b(function(){return[e(`div`,x({class:n.cx(`contentWrapper`)},n.ptm(`contentWrapper`,f.ptParams)),[e(`div`,x({class:n.cx(`content`)},n.ptm(`content`,f.ptParams)),[l(n.$slots,`default`)],16)],16)]}),_:3},16,[`class`])),[[m,f.$pcAccordion.lazy?!0:f.$pcAccordionPanel.active]]):o(``,!0)]}),_:3},16))}N.render=P;var F=f.extend({name:`accordionheader`,classes:{root:`p-accordionheader`,toggleicon:`p-accordionheader-toggle-icon`}}),I={name:`AccordionHeader`,extends:{name:`BaseAccordionHeader`,extends:y,props:{as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1}},style:F,provide:function(){return{$pcAccordionHeader:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcAccordion`,`$pcAccordionPanel`],methods:{onFocus:function(){this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onClick:function(){!this.$pcAccordion.selectOnFocus&&this.changeActiveValue()},onKeydown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break}},onArrowDownKey:function(e){var t=this.findNextPanel(this.findPanel(e.currentTarget));t?this.changeFocusedPanel(e,t):this.onHomeKey(e),e.preventDefault()},onArrowUpKey:function(e){var t=this.findPrevPanel(this.findPanel(e.currentTarget));t?this.changeFocusedPanel(e,t):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var t=this.findFirstPanel();this.changeFocusedPanel(e,t),e.preventDefault()},onEndKey:function(e){var t=this.findLastPanel();this.changeFocusedPanel(e,t),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue(),e.preventDefault()},findPanel:function(e){return e?.closest(`[data-pc-name="accordionpanel"]`)},findHeader:function(e){return n(e,`[data-pc-name="accordionheader"]`)},findNextPanel:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?c(t,`data-p-disabled`)?this.findNextPanel(t):this.findHeader(t):null},findPrevPanel:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?c(t,`data-p-disabled`)?this.findPrevPanel(t):this.findHeader(t):null},findFirstPanel:function(){return this.findNextPanel(this.$pcAccordion.$el.firstElementChild,!0)},findLastPanel:function(){return this.findPrevPanel(this.$pcAccordion.$el.lastElementChild,!0)},changeActiveValue:function(){this.$pcAccordion.updateValue(this.$pcAccordionPanel.value)},changeFocusedPanel:function(e,t){i(this.findHeader(t))}},computed:{id:function(){return`${this.$pcAccordion.$id}_accordionheader_${this.$pcAccordionPanel.value}`},ariaControls:function(){return`${this.$pcAccordion.$id}_accordioncontent_${this.$pcAccordionPanel.value}`},attrs:function(){return x(this.asAttrs,this.a11yAttrs,this.ptmi(`root`,this.ptParams))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.$pcAccordionPanel.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcAccordion.tabindex,"aria-expanded":this.$pcAccordionPanel.active,"aria-controls":this.ariaControls,"data-pc-name":`accordionheader`,"data-p-disabled":this.$pcAccordionPanel.disabled,"data-p-active":this.$pcAccordionPanel.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.$pcAccordionPanel.active}}},dataP:function(){return S({active:this.$pcAccordionPanel.active})}},components:{ChevronUp:D,ChevronDown:E},directives:{ripple:v}};function L(e,n,i,o,s,c){var d=r(`ripple`);return e.asChild?l(e.$slots,`default`,{key:1,class:u(e.cx(`root`)),active:c.$pcAccordionPanel.active,a11yAttrs:c.a11yAttrs,onClick:c.onClick}):p((t(),g(a(e.as),x({key:0,"data-p":c.dataP,class:e.cx(`root`),onClick:c.onClick},c.attrs),{default:b(function(){return[l(e.$slots,`default`,{active:c.$pcAccordionPanel.active}),l(e.$slots,`toggleicon`,{active:c.$pcAccordionPanel.active,class:u(e.cx(`toggleicon`))},function(){return[c.$pcAccordionPanel.active?(t(),g(a(c.$pcAccordion.$slots.collapseicon?c.$pcAccordion.$slots.collapseicon:c.$pcAccordion.collapseIcon?`span`:`ChevronUp`),x({key:0,class:[c.$pcAccordion.collapseIcon,e.cx(`toggleicon`)],"aria-hidden":`true`},e.ptm(`toggleicon`,c.ptParams)),null,16,[`class`])):(t(),g(a(c.$pcAccordion.$slots.expandicon?c.$pcAccordion.$slots.expandicon:c.$pcAccordion.expandIcon?`span`:`ChevronDown`),x({key:1,class:[c.$pcAccordion.expandIcon,e.cx(`toggleicon`)],"aria-hidden":`true`},e.ptm(`toggleicon`,c.ptParams)),null,16,[`class`]))]})]}),_:3},16,[`data-p`,`class`,`onClick`])),[[d]])}I.render=L;var R=f.extend({name:`accordionpanel`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-accordionpanel`,{"p-accordionpanel-active":t.active,"p-disabled":n.disabled}]}}}),z={name:`AccordionPanel`,extends:{name:`BaseAccordionPanel`,extends:y,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1}},style:R,provide:function(){return{$pcAccordionPanel:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcAccordion`],computed:{active:function(){return this.$pcAccordion.isItemActive(this.value)},attrs:function(){return x(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{"data-pc-name":`accordionpanel`,"data-p-disabled":this.disabled,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function B(e,n,r,i,o,s){return e.asChild?l(e.$slots,`default`,{key:1,class:u(e.cx(`root`)),active:s.active,a11yAttrs:s.a11yAttrs}):(t(),g(a(e.as),x({key:0,class:e.cx(`root`)},s.attrs),{default:b(function(){return[l(e.$slots,`default`)]}),_:3},16,[`class`]))}z.render=B;var V=w(`earchCreditStore`,()=>{let e=h(0),t=h(0),n=h(0),r=h(0),i=h(0),a=h(new Date(0)),o=h(!1),s=h(!1);async function c(){if(!s.value){s.value=!0;try{let s=await T(`:area/contact/getCredit`);e.value=s.dayCredit??0,t.value=s.consumedCredit??0,n.value=s.acceptedExtraCredit??0,r.value=s.pendingExtraCredits??0,i.value=s.rejectedExtraCredits??0,a.value=new Date,o.value=!1}catch(e){console.error(`error during request contacts: `+e),o.value=!0,a.value=new Date}s.value=!1}}function l(){t.value++,(new Date().getTime()-a.value.getTime()>=36e5||t.value*4/3>=g.value)&&c()}let u=_(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),e.value)),d=_(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),t.value)),f=_(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),n.value)),p=_(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),r.value)),m=_(()=>(new Date().getTime()-a.value.getTime()>=36e5&&c(),i.value)),g=_(()=>u.value+f.value),v=_(()=>g.value-d.value);return c(),{loading:s,getDayCredit:u,getConsumedCredit:d,getAcceptedExtraCredit:f,getPendingExtraCredits:p,getRejectedExtraCredits:m,totalAvaibleCredit:g,totalRemaningCredit:v,fetchCredit:c,consumeNewCredit:l}});function H(...e){return _(()=>e.some(e=>C(e)))}var U=w(`StatsStore`,()=>{let e=O(`stats`,{nbUser:0,nbValue:0,fetchDate:new Date(0)}),t=h(!1),n=h(!1);async function r(){try{if(e.value)try{if(typeof e==`object`&&e){if(e.value.fetchDate){let t=String(e.value.fetchDate);e.value.fetchDate=new Date(t)}else e.value.fetchDate=new Date;if(e.value.nbUser=e.value.nbUser||0,e.value.nbValue=e.value.nbValue||0,new Date().getTime()-e.value.fetchDate.getTime()>=36e5)return i()}}catch(e){console.warn(`StatsStore: Could not parse stored stats data. Using defaults.`,e)}}catch(e){console.warn(e),await i()}}async function i(){if(!n.value){n.value=!0;try{let n=await T(`:area/stats/contactStats`);e.value.nbUser=n.contactCount,e.value.nbValue=n.totalValue,e.value.fetchDate=new Date,t.value=!1}catch(n){console.error(`error during request contacts: `+n),t.value=!0,e.value.fetchDate=new Date}n.value=!1}}let a=_(()=>(new Date().getTime()-e.value.fetchDate.getTime()>=36e5&&i(),e.value.nbUser)),o=_(()=>(new Date().getTime()-e.value.fetchDate.getTime()>=36e5&&i(),e.value.nbValue)),s=H(t,n);return r(),{getNbUser:a,getnbValue:o,errored:t,loading:n,isReady:s}});export{N as a,I as i,V as n,A as o,z as r,U as t};