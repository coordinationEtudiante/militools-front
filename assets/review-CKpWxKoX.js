import{Cn as e,D as t,En as n,F as r,K as i,Mn as a,Nn as o,Qn as s,Qt as c,R as l,Sn as u,Tn as d,Tt as f,Un as p,X as m,Xt as h,Yt as g,Zn as _,bn as v,cn as y,en as b,f as x,hn as S,in as C,n as w,nn as T,o as E,on as D,r as ee,rn as O,sn as k,tn as A,tr as j,u as M,vn as te,wn as ne,yt as N}from"./vue-i18n-Dd-f5b4D.js";import{t as re}from"./toast-CESdGrJe.js";import{t as ie}from"./autocomplete-CfDJ3J6u.js";import{t as P}from"./chevron-right-D0QEkxaR.js";import{n as ae,t as F}from"./dataStorage-CqdutfaG.js";import{t as oe}from"./chevron-left-0_STxLNS.js";import{t as se}from"./message-DySsZfYe.js";import{t as I}from"./circle-check-DUc2b1A7.js";import{B as ce,M as le,S as L,d as R,n as ue,o as z,r as B,t as V,v as H}from"./index-B_BbMyRW.js";var U=x.extend({name:`tab`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-tab`,{"p-tab-active":t.active,"p-disabled":n.disabled}]}}}),W={name:`Tab`,extends:{name:`BaseTab`,extends:M,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1}},style:U,provide:function(){return{$pcTab:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`,`$pcTabList`],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(e){switch(e.code){case`ArrowRight`:this.onArrowRightKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break}},onArrowRightKey:function(e){var t=this.findNextTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onHomeKey(e),e.preventDefault()},onArrowLeftKey:function(e){var t=this.findPrevTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var t=this.findFirstTab();this.changeFocusedTab(e,t),e.preventDefault()},onEndKey:function(e){var t=this.findLastTab();this.changeFocusedTab(e,t),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.findLastTab()),e.preventDefault()},onPageUpKey:function(e){this.scrollInView(this.findFirstTab()),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue()},findNextTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?l(t,`data-p-disabled`)||l(t,`data-pc-section`)===`activebar`?this.findNextTab(t):i(t,`[data-pc-name="tab"]`):null},findPrevTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?l(t,`data-p-disabled`)||l(t,`data-pc-section`)===`activebar`?this.findPrevTab(t):i(t,`[data-pc-name="tab"]`):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(e,t){m(t),this.scrollInView(t)},scrollInView:function(e){var t;e==null||(t=e.scrollIntoView)==null||t.call(e,{block:`nearest`})}},computed:{active:function(){return N(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},ariaControls:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},attrs:function(){return S(this.asAttrs,this.a11yAttrs,this.ptmi(`root`,this.ptParams))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:`tab`,"aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":`tab`,"data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return f({active:this.active})}},directives:{ripple:E}};function de(t,r,i,c,l,u){var f=d(`ripple`);return t.asChild?e(t.$slots,`default`,{key:1,dataP:u.dataP,class:s(t.cx(`root`)),active:u.active,a11yAttrs:u.a11yAttrs,onClick:u.onClick}):o((v(),T(n(t.as),S({key:0,class:t.cx(`root`),"data-p":u.dataP,onClick:u.onClick},u.attrs),{default:a(function(){return[e(t.$slots,`default`)]}),_:3},16,[`class`,`data-p`,`onClick`])),[[f]])}W.render=de;var G={name:`TabList`,extends:{name:`BaseTabList`,extends:M,props:{},style:x.extend({name:`tablist`,classes:{root:`p-tablist`,content:`p-tablist-content`,activeBar:`p-tablist-active-bar`,prevButton:`p-tablist-prev-button p-tablist-nav-button`,nextButton:`p-tablist-next-button p-tablist-nav-button`}}),provide:function(){return{$pcTabList:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,inkBarObserver:void 0,mountTimer:null,watch:{showNavigators:function(e){e?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:`post`,handler:function(){this.updateInkBar(),this.bindInkBarObserver();var e=this.$refs.content,t=e?i(e,`[data-pc-name="tab"][data-p-active="true"]`):null;e&&t&&this.$pcTabs.scrollToActiveTab(e,t)}}},mounted:function(){var e=this;this.mountTimer=setTimeout(function(){e.mountTimer=null,e.updateInkBar(),e.bindInkBarObserver()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.mountTimer&&=(clearTimeout(this.mountTimer),null),this.unbindResizeObserver(),this.unbindInkBarObserver()},methods:{onScroll:function(e){this.showNavigators&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,n=this.getVisibleButtonWidths(),i=r(e)-n,a=Math.abs(e.scrollLeft)-i*.8,o=Math.max(a,0);e.scrollLeft=t(e)?-1*o:o},onNextButtonClick:function(){var e=this.$refs.content,n=this.getVisibleButtonWidths(),i=r(e)-n,a=Math.abs(e.scrollLeft)+i*.8,o=e.scrollWidth-i,s=Math.min(a,o);e.scrollLeft=t(e)?-1*s:s},bindResizeObserver:function(){var e=this;this.resizeObserver=new ResizeObserver(function(){return e.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var e;(e=this.resizeObserver)==null||e.unobserve(this.$refs.list),this.resizeObserver=void 0},bindInkBarObserver:function(){var e=this;this.unbindInkBarObserver();var t=this.$refs.content,n=i(t,`[data-pc-name="tab"][data-p-active="true"]`);n&&(this.inkBarObserver=new ResizeObserver(function(){return e.updateInkBar()}),this.inkBarObserver.observe(n))},unbindInkBarObserver:function(){var e;(e=this.inkBarObserver)==null||e.disconnect(),this.inkBarObserver=void 0},updateInkBar:function(){var e=this.$refs,t=e.content,n=e.inkbar;if(n){var r=i(t,`[data-pc-name="tab"][data-p-active="true"]`);r&&(n.style.setProperty(`--px-active-bar-width`,r.offsetWidth+`px`),n.style.setProperty(`--px-active-bar-height`,r.offsetHeight+`px`),n.style.setProperty(`--px-active-bar-left`,r.offsetLeft+`px`),n.style.setProperty(`--px-active-bar-top`,r.offsetTop+`px`))}},updateButtonState:function(){var e=this.$refs,t=e.list,n=e.content,i=n.scrollWidth,a=n.offsetWidth,o=Math.abs(n.scrollLeft),s=r(n);this.isPrevButtonEnabled=o!==0,this.isNextButtonEnabled=t.offsetWidth>=a&&parseInt(o)!==i-s},getVisibleButtonWidths:function(){var e=this.$refs,t=e.prevButton,n=e.nextButton,r=0;return this.showNavigators&&(r=(t?.offsetWidth||0)+(n?.offsetWidth||0)),r}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return f({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeft:oe,ChevronRight:P},directives:{ripple:E}},fe=[`data-p`],pe=[`aria-label`,`tabindex`],me=[`aria-label`,`tabindex`];function he(t,r,i,a,s,c){var l=d(`ripple`);return v(),C(`div`,S({ref:`list`,class:t.cx(`root`),"data-p":c.dataP},t.ptmi(`root`)),[c.showNavigators&&s.isPrevButtonEnabled?o((v(),C(`button`,S({key:0,ref:`prevButton`,type:`button`,class:t.cx(`prevButton`),"aria-label":c.prevButtonAriaLabel,tabindex:c.$pcTabs.tabindex,onClick:r[0]||=function(){return c.onPrevButtonClick&&c.onPrevButtonClick.apply(c,arguments)}},t.ptm(`prevButton`),{"data-pc-group-section":`navigator`}),[(v(),T(n(c.templates.previcon||`ChevronLeft`),S({"aria-hidden":`true`},t.ptm(`prevIcon`)),null,16))],16,pe)),[[l]]):O(``,!0),A(`div`,S({ref:`content`,class:t.cx(`content`),role:`tablist`,"aria-orientation":`horizontal`,onScroll:r[1]||=function(){return c.onScroll&&c.onScroll.apply(c,arguments)}},t.ptm(`content`)),[e(t.$slots,`default`),A(`span`,S({ref:`inkbar`,class:t.cx(`activeBar`),role:`presentation`,"aria-hidden":`true`},t.ptm(`activeBar`)),null,16)],16),c.showNavigators&&s.isNextButtonEnabled?o((v(),C(`button`,S({key:1,ref:`nextButton`,type:`button`,class:t.cx(`nextButton`),"aria-label":c.nextButtonAriaLabel,tabindex:c.$pcTabs.tabindex,onClick:r[2]||=function(){return c.onNextButtonClick&&c.onNextButtonClick.apply(c,arguments)}},t.ptm(`nextButton`),{"data-pc-group-section":`navigator`}),[(v(),T(n(c.templates.nexticon||`ChevronRight`),S({"aria-hidden":`true`},t.ptm(`nextIcon`)),null,16))],16,me)),[[l]]):O(``,!0)],16,fe)}G.render=he;var ge=x.extend({name:`tabpanel`,classes:{root:function(e){return[`p-tabpanel`,{"p-tabpanel-active":e.instance.active}]}}}),K={name:`TabPanel`,extends:{name:`BaseTabPanel`,extends:M,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1}},style:ge,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],computed:{active:function(){return N(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},ariaLabelledby:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},attrs:function(){return S(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcTabs?.tabindex,role:`tabpanel`,"aria-labelledby":this.ariaLabelledby,"data-pc-name":`tabpanel`,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function _e(t,r,i,l,u,d){var f,p;return d.$pcTabs?(v(),C(c,{key:1},[t.asChild?e(t.$slots,`default`,{key:1,class:s(t.cx(`root`)),active:d.active,a11yAttrs:d.a11yAttrs}):(v(),C(c,{key:0},[!((f=d.$pcTabs)!=null&&f.lazy)||d.active?o((v(),T(n(t.as),S({key:0,class:t.cx(`root`)},d.attrs),{default:a(function(){return[e(t.$slots,`default`)]}),_:3},16,[`class`])),[[g,(p=d.$pcTabs)!=null&&p.lazy?!0:d.active]]):O(``,!0)],64))],64)):e(t.$slots,`default`,{key:0})}K.render=_e;var q={name:`TabPanels`,extends:{name:`BaseTabPanels`,extends:M,props:{},style:x.extend({name:`tabpanels`,classes:{root:`p-tabpanels`}}),provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},inheritAttrs:!1};function ve(t,n,r,i,a,o){return v(),C(`div`,S({class:t.cx(`root`),role:`presentation`},t.ptmi(`root`)),[e(t.$slots,`default`)],16)}q.render=ve;var ye=x.extend({name:`tabs`,style:`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        overflow: hidden;
        display: flex;
        position: relative;
        background: dt('tabs.tablist.background');
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        position: relative;
        display: flex;
        flex-grow: 1;
        min-height: 0;
        overflow-x: auto;
        overflow-y: clip;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-content::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        font-size: dt('tabs.tab.font.size');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        background: dt('tabs.active.bar.background');
        transition: width 250ms cubic-bezier(0.35, 0, 0.25, 1), inset-inline-start 250ms cubic-bezier(0.35, 0, 0.25, 1);
        inset-inline-start: var(--px-active-bar-left);
        inset-block-end: dt('tabs.active.bar.bottom');
        width: var(--px-active-bar-width);
        height: dt('tabs.active.bar.height');
    }
`,classes:{root:`p-tabs p-component`}}),J={name:`Tabs`,extends:{name:`BaseTabs`,extends:M,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},scrollStrategy:{type:[String,Function],default:`nearest`}},style:ye,provide:function(){return{$pcTabs:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{updateValue:function(e){this.d_value!==e&&(this.d_value=e,this.$emit(`update:value`,e))},scrollToActiveTab:function(e,n){if(!(!e||!n||this.scrollStrategy===!1)){if(typeof this.scrollStrategy==`function`){this.scrollStrategy(e,n);return}var r=e.clientWidth,i=Math.abs(e.scrollLeft),a=n.offsetLeft,o=n.offsetWidth,s=a+o,c;if(this.scrollStrategy===`center`)c=a-(r-o)/2;else{var l=r*.1;if(a<i+l)c=a-l;else if(s>i+r-l)c=s-r+l;else return}var u=e.scrollWidth-r,d=Math.max(0,Math.min(c,u));e.scrollTo({left:t(e)?-d:d,behavior:`smooth`})}}}};function be(t,n,r,i,a,o){return v(),C(`div`,S({class:t.cx(`root`)},t.ptmi(`root`)),[e(t.$slots,`default`)],16)}J.render=be;var Y=ue(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),xe=y({__name:`ContactListInput`,props:{name:{},type:{},modelValue:{}},emits:[`update:modelValue`,`update:providedField`,`error`,`commit`],setup(e,{emit:t}){let n=e,r=t,{t:i}=w(),a=R(),s=p([]),c=b(()=>{let e=a.fields?.find(e=>e.name==n.name);return e?e.indexed?`indexed`:e.primary?`primary`:`other`:`other`}),l=b({get:()=>n.modelValue??``,set:e=>{u.value=!1,r(`update:modelValue`,e)}}),u=p(!1),f=b(()=>a.contactTypeValidator?.get(n.type)),m=b(()=>f.value??/.*/),g=b(()=>!u.value||l.value==``?!1:!m.value.test(l.value));function y(){u.value=!0,r(`commit`)}let x=e=>`${e.output} -> ${e.primaryFields.map(({name:e,value:t})=>`${e}: ${t}`).join(` `)??` 🤷‍♂️ `}`;async function S(e){let t=e.value.split(` -> `).at(0)??``;if(r(`update:modelValue`,t),y(),c.value===`other`)return;let n=s.value.find(t=>t.output==e.value.split(` -> `).at(0))?.contactId;if(!n)return;let i=await z(`:area/contact/getContactById`,{query:{id:n,fields:`*`}});i&&r(`update:providedField`,i.fields.map(e=>({field:e.id,value:e.value})))}async function C(e){if(s.value.findIndex(t=>t.output===e.query)===-1){if(e.query.length>=2){let t=await z(`:area/contact/getAutocompleteFields`,{query:{field:n.name,partial:e.query}});if(!t||t.proposals.length===0){s.value=[];return}s.value=t.proposals;return}s.value=[]}}return(e,t)=>{let n=d(`tooltip`);return c.value==`other`?(v(),T(_(le),{key:0,modelValue:l.value,"onUpdate:modelValue":t[0]||=e=>l.value=e,fluid:``,inputProps:{autocomplete:!0},invalid:g.value,onKeydown:h(y,[`enter`]),onBlur:y},null,8,[`modelValue`,`invalid`])):o((v(),T(_(ie),{key:1,modelValue:l.value,"onUpdate:modelValue":t[1]||=e=>l.value=e,fluid:``,onComplete:C,onOptionSelect:S,onKeydown:h(y,[`enter`]),onBlur:y,suggestions:s.value.map(x),invalid:g.value},null,8,[`modelValue`,`suggestions`,`invalid`])),[[n,g.value?_(i)(`validation.explanation`,{validator:m.value}):!1]])}}});function X(e,t){if(t==null||t===``)return!0;let n=R().contactTypeValidator.get(e.type);return!n||n.test(t)}function Se(e,t){return e.filter(e=>!X(e,t[e.name])).map(e=>e.name)}function Z(e,t){return Se(e,t).length===0}var Ce={class:`flex items-center justify-between gap-2`},we={class:`flex min-w-0 items-center gap-2`},Te={class:`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100`},Ee={class:`truncate text-sm font-semibold text-gray-700`},De={class:`grid grid-cols-1 gap-2 md:grid-cols-2`},Oe={class:`flex items-center justify-between gap-1 text-xs font-medium text-gray-500`},ke={class:`truncate`},Ae={key:0,class:`flex shrink-0 items-center gap-1 font-semibold text-red-500`},Q=y({__name:`ContactReviewCard`,props:{index:{},errored:{type:Boolean},fields:{},contact:{}},emits:[`update:value`],setup(e,{emit:t}){let n=e,r=t,{t:i}=w(),o=p({}),l=e=>!X(e,n.contact[e.name]),d=e=>o.value[e.name]??n.contact[e.name]??``;function f(e,t){o.value[e]=t}function m(e){o.value[e]!==void 0&&r(`update:value`,e,o.value[e])}return(t,n)=>{let r=ne(`CircleCheck`);return v(),C(`div`,{class:s([`flex flex-col gap-3 rounded-xl border-2 p-3 transition-colors`,e.errored?`border-red-300 bg-red-50/60`:`border-gray-200 bg-white`])},[A(`div`,Ce,[A(`div`,we,[A(`span`,Te,[k(_(V),{class:`h-4 w-4 text-gray-500`})]),A(`span`,Ee,j(_(i)(`create-contacts.review-contact`,{index:e.index})),1)]),k(_(L),{severity:e.errored?`danger`:`success`,value:e.errored?_(i)(`error`):_(i)(`create-contacts.valid`),icon:e.errored?`pi pi-exclamation-triangle`:`pi pi-check`},{icon:a(()=>[e.errored?(v(),T(_(Y),{key:0})):(v(),T(r,{key:1}))]),_:1},8,[`severity`,`value`,`icon`])]),A(`div`,De,[(v(!0),C(c,null,u(e.fields,e=>(v(),C(`div`,{key:e.name,class:s([`flex flex-col gap-1 rounded-lg p-1.5 transition-colors`,l(e)?`bg-white/70 ring-1 ring-red-400`:``])},[A(`label`,Oe,[A(`span`,ke,j(e.name),1),l(e)?(v(),C(`span`,Ae,[k(_(Y),{class:`h-3 w-3`}),D(` `+j(_(i)(`validation.error`)),1)])):O(``,!0)]),k(xe,{name:e.name,type:e.type,modelValue:d(e),"onUpdate:modelValue":t=>f(e.name,t),onCommit:t=>m(e.name)},null,8,[`name`,`type`,`modelValue`,`onUpdate:modelValue`,`onCommit`])],2))),128))])],2)}}}),je={class:`flex h-full min-h-0 flex-col gap-3 overflow-auto`},Me={key:0,class:`flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500`},Ne={class:`grid grid-cols-1 gap-3 sm:grid-cols-3`},Pe={class:`flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3`},Fe={class:`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600`},Ie={class:`min-w-0`},Le={class:`text-2xl font-bold text-gray-900`},Re={class:`truncate text-sm text-gray-500`},ze={class:`flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3`},Be={class:`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600`},Ve={class:`min-w-0`},$={class:`text-2xl font-bold text-red-600`},He={class:`truncate text-sm text-red-500`},Ue={class:`flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3`},We={class:`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600`},Ge={class:`min-w-0`},Ke={class:`text-2xl font-bold text-emerald-600`},qe={class:`truncate text-sm text-emerald-500`},Je={class:`flex items-center gap-2`},Ye={class:`flex items-center gap-2`},Xe={key:0,class:`flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500`},Ze={key:1,class:`grid grid-cols-1 gap-3 xl:grid-cols-2`},Qe={key:0,class:`flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500`},$e={key:1,class:`grid grid-cols-1 gap-3 xl:grid-cols-2`},et={class:`flex w-full items-center justify-between gap-2`},tt={key:1},nt=y({__name:`review`,setup(e){let{t}=w(),n=ce(),r=H(),{getPerms:i}=B();i([`:area/contact/creates`,`:area/contact/edits`,`:area/contact/getContactFields`,`:area/contact/getDuplicate`]);let o=p([]),s=p([]),l=p(`error`),d=b(()=>s.value.filter(e=>!e.valid)),f=b(()=>s.value.filter(e=>e.valid)),m=b(()=>s.value.length),h=b(()=>d.value.length),g=b(()=>f.value.length);te(()=>{o.value=F.getType(),s.value=F.getValue().map((e,t)=>({rowId:t,data:{...e},valid:Z(o.value,e)})),h.value===0&&(l.value=`valid`)});function y(e,r,i){let a=e.valid;e.data[r]=i,e.valid=Z(o.value,e.data),a!==e.valid&&n.add({severity:e.valid?`success`:`error`,summary:e.valid?t(`create-contacts.moved-valid`):t(`create-contacts.moved-error`),life:3e3})}function x(){F.setArray(s.value.map(e=>e.data),F.getType()),r.push({name:`/user/contact/creates/merge`})}return(e,n)=>(v(),C(c,null,[k(_(re)),k(_(ae),{class:`h-full w-full overflow-hidden`,pt:{body:{class:`h-full flex flex-col min-h-0`},content:{class:`h-full flex flex-col min-h-0 overflow-hidden`}}},{title:a(()=>[D(j(_(t)(`create-contacts.review`)),1)]),header:a(()=>[...n[1]||=[A(`div`,{class:`row flex h-2 w-full gap-4 p-2`},[A(`div`,{class:`h-2 w-full rounded-full bg-sky-500`}),A(`div`,{class:`h-2 w-full rounded-full bg-sky-500`}),A(`div`,{class:`h-2 w-full rounded-full bg-sky-50`})],-1)]]),content:a(()=>[A(`div`,je,[m.value===0?(v(),C(`div`,Me,[k(_(V),{class:`h-5 w-5`}),D(` `+j(_(t)(`create-contacts.no-contact`)),1)])):(v(),C(c,{key:1},[A(`div`,Ne,[A(`div`,Pe,[A(`span`,Fe,[k(_(V),{class:`h-5 w-5`})]),A(`div`,Ie,[A(`div`,Le,j(m.value),1),A(`div`,Re,j(_(t)(`create-contacts.review-total`)),1)])]),A(`div`,ze,[A(`span`,Be,[k(_(Y),{class:`h-5 w-5`})]),A(`div`,Ve,[A(`div`,$,j(h.value),1),A(`div`,He,j(_(t)(`create-contacts.review-error`)),1)])]),A(`div`,Ue,[A(`span`,We,[k(_(I),{class:`h-5 w-5`})]),A(`div`,Ge,[A(`div`,Ke,j(g.value),1),A(`div`,qe,j(_(t)(`create-contacts.review-valid`)),1)])])]),k(_(J),{lazy:``,value:l.value,"onUpdate:value":n[0]||=e=>l.value=e},{default:a(()=>[k(_(G),{class:`shrink-0`},{default:a(()=>[k(_(W),{value:`error`},{default:a(()=>[A(`span`,Je,[k(_(Y),{class:`h-4 w-4`}),D(` `+j(_(t)(`create-contacts.review-error`))+` `,1),k(_(L),{severity:`danger`,value:h.value},null,8,[`value`])])]),_:1}),k(_(W),{value:`valid`},{default:a(()=>[A(`span`,Ye,[k(_(I),{class:`h-4 w-4`}),D(` `+j(_(t)(`create-contacts.review-valid`))+` `,1),k(_(L),{severity:`success`,value:g.value},null,8,[`value`])])]),_:1})]),_:1}),k(_(q),null,{default:a(()=>[k(_(K),{value:`error`},{default:a(()=>[h.value===0?(v(),C(`div`,Xe,[k(_(I),{class:`h-5 w-5 text-emerald-500`}),D(` `+j(_(t)(`create-contacts.review-error-empty`)),1)])):(v(),C(`div`,Ze,[(v(!0),C(c,null,u(d.value,e=>(v(),T(Q,{key:e.rowId,index:e.rowId,errored:!0,fields:o.value,contact:e.data,"onUpdate:value":(t,n)=>y(e,t,n)},null,8,[`index`,`fields`,`contact`,`onUpdate:value`]))),128))]))]),_:1}),k(_(K),{value:`valid`},{default:a(()=>[g.value===0?(v(),C(`div`,Qe,[k(_(V),{class:`h-5 w-5`}),D(` `+j(_(t)(`create-contacts.review-valid-empty`)),1)])):(v(),C(`div`,$e,[(v(!0),C(c,null,u(f.value,e=>(v(),T(Q,{key:e.rowId,index:e.rowId,errored:!1,fields:o.value,contact:e.data,"onUpdate:value":(t,n)=>y(e,t,n)},null,8,[`index`,`fields`,`contact`,`onUpdate:value`]))),128))]))]),_:1})]),_:1})]),_:1},8,[`value`])],64))])]),footer:a(()=>[A(`div`,et,[h.value>0?(v(),T(_(se),{key:0,severity:`warn`,variant:`simple`,size:`small`,class:`min-w-0`},{default:a(()=>[D(j(_(t)(`create-contacts.review-remaining-error`,{nb:h.value})),1)]),_:1})):(v(),C(`span`,tt)),k(_(ee),{severity:`success`,onClick:x},{default:a(()=>[D(j(_(t)(`next`)),1)]),_:1})])]),_:1})],64))}});export{nt as default};