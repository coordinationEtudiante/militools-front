import{Cn as e,D as t,En as n,F as r,K as i,Mn as a,Nn as o,Qn as s,Qt as c,R as l,Tn as u,Tt as d,X as f,Yt as p,bn as m,f as h,hn as g,in as _,nn as v,o as y,rn as b,tn as x,u as S,yt as C}from"./vue-i18n-Dd-f5b4D.js";import{t as w}from"./chevron-right-D0QEkxaR.js";import{t as T}from"./chevron-left-0_STxLNS.js";var E=h.extend({name:`tab`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-tab`,{"p-tab-active":t.active,"p-disabled":n.disabled}]}}}),D={name:`Tab`,extends:{name:`BaseTab`,extends:S,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1}},style:E,provide:function(){return{$pcTab:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`,`$pcTabList`],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(e){switch(e.code){case`ArrowRight`:this.onArrowRightKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break}},onArrowRightKey:function(e){var t=this.findNextTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onHomeKey(e),e.preventDefault()},onArrowLeftKey:function(e){var t=this.findPrevTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var t=this.findFirstTab();this.changeFocusedTab(e,t),e.preventDefault()},onEndKey:function(e){var t=this.findLastTab();this.changeFocusedTab(e,t),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.findLastTab()),e.preventDefault()},onPageUpKey:function(e){this.scrollInView(this.findFirstTab()),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue()},findNextTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?l(t,`data-p-disabled`)||l(t,`data-pc-section`)===`activebar`?this.findNextTab(t):i(t,`[data-pc-name="tab"]`):null},findPrevTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?l(t,`data-p-disabled`)||l(t,`data-pc-section`)===`activebar`?this.findPrevTab(t):i(t,`[data-pc-name="tab"]`):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(e,t){f(t),this.scrollInView(t)},scrollInView:function(e){var t;e==null||(t=e.scrollIntoView)==null||t.call(e,{block:`nearest`})}},computed:{active:function(){return C(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},ariaControls:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},attrs:function(){return g(this.asAttrs,this.a11yAttrs,this.ptmi(`root`,this.ptParams))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:`tab`,"aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":`tab`,"data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return d({active:this.active})}},directives:{ripple:y}};function O(t,r,i,c,l,d){var f=u(`ripple`);return t.asChild?e(t.$slots,`default`,{key:1,dataP:d.dataP,class:s(t.cx(`root`)),active:d.active,a11yAttrs:d.a11yAttrs,onClick:d.onClick}):o((m(),v(n(t.as),g({key:0,class:t.cx(`root`),"data-p":d.dataP,onClick:d.onClick},d.attrs),{default:a(function(){return[e(t.$slots,`default`)]}),_:3},16,[`class`,`data-p`,`onClick`])),[[f]])}D.render=O;var k={name:`TabList`,extends:{name:`BaseTabList`,extends:S,props:{},style:h.extend({name:`tablist`,classes:{root:`p-tablist`,content:`p-tablist-content`,activeBar:`p-tablist-active-bar`,prevButton:`p-tablist-prev-button p-tablist-nav-button`,nextButton:`p-tablist-next-button p-tablist-nav-button`}}),provide:function(){return{$pcTabList:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,inkBarObserver:void 0,mountTimer:null,watch:{showNavigators:function(e){e?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:`post`,handler:function(){this.updateInkBar(),this.bindInkBarObserver();var e=this.$refs.content,t=e?i(e,`[data-pc-name="tab"][data-p-active="true"]`):null;e&&t&&this.$pcTabs.scrollToActiveTab(e,t)}}},mounted:function(){var e=this;this.mountTimer=setTimeout(function(){e.mountTimer=null,e.updateInkBar(),e.bindInkBarObserver()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.mountTimer&&=(clearTimeout(this.mountTimer),null),this.unbindResizeObserver(),this.unbindInkBarObserver()},methods:{onScroll:function(e){this.showNavigators&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,n=this.getVisibleButtonWidths(),i=r(e)-n,a=Math.abs(e.scrollLeft)-i*.8,o=Math.max(a,0);e.scrollLeft=t(e)?-1*o:o},onNextButtonClick:function(){var e=this.$refs.content,n=this.getVisibleButtonWidths(),i=r(e)-n,a=Math.abs(e.scrollLeft)+i*.8,o=e.scrollWidth-i,s=Math.min(a,o);e.scrollLeft=t(e)?-1*s:s},bindResizeObserver:function(){var e=this;this.resizeObserver=new ResizeObserver(function(){return e.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var e;(e=this.resizeObserver)==null||e.unobserve(this.$refs.list),this.resizeObserver=void 0},bindInkBarObserver:function(){var e=this;this.unbindInkBarObserver();var t=this.$refs.content,n=i(t,`[data-pc-name="tab"][data-p-active="true"]`);n&&(this.inkBarObserver=new ResizeObserver(function(){return e.updateInkBar()}),this.inkBarObserver.observe(n))},unbindInkBarObserver:function(){var e;(e=this.inkBarObserver)==null||e.disconnect(),this.inkBarObserver=void 0},updateInkBar:function(){var e=this.$refs,t=e.content,n=e.inkbar;if(n){var r=i(t,`[data-pc-name="tab"][data-p-active="true"]`);r&&(n.style.setProperty(`--px-active-bar-width`,r.offsetWidth+`px`),n.style.setProperty(`--px-active-bar-height`,r.offsetHeight+`px`),n.style.setProperty(`--px-active-bar-left`,r.offsetLeft+`px`),n.style.setProperty(`--px-active-bar-top`,r.offsetTop+`px`))}},updateButtonState:function(){var e=this.$refs,t=e.list,n=e.content,i=n.scrollWidth,a=n.offsetWidth,o=Math.abs(n.scrollLeft),s=r(n);this.isPrevButtonEnabled=o!==0,this.isNextButtonEnabled=t.offsetWidth>=a&&parseInt(o)!==i-s},getVisibleButtonWidths:function(){var e=this.$refs,t=e.prevButton,n=e.nextButton,r=0;return this.showNavigators&&(r=(t?.offsetWidth||0)+(n?.offsetWidth||0)),r}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return d({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeft:T,ChevronRight:w},directives:{ripple:y}},A=[`data-p`],j=[`aria-label`,`tabindex`],M=[`aria-label`,`tabindex`];function N(t,r,i,a,s,c){var l=u(`ripple`);return m(),_(`div`,g({ref:`list`,class:t.cx(`root`),"data-p":c.dataP},t.ptmi(`root`)),[c.showNavigators&&s.isPrevButtonEnabled?o((m(),_(`button`,g({key:0,ref:`prevButton`,type:`button`,class:t.cx(`prevButton`),"aria-label":c.prevButtonAriaLabel,tabindex:c.$pcTabs.tabindex,onClick:r[0]||=function(){return c.onPrevButtonClick&&c.onPrevButtonClick.apply(c,arguments)}},t.ptm(`prevButton`),{"data-pc-group-section":`navigator`}),[(m(),v(n(c.templates.previcon||`ChevronLeft`),g({"aria-hidden":`true`},t.ptm(`prevIcon`)),null,16))],16,j)),[[l]]):b(``,!0),x(`div`,g({ref:`content`,class:t.cx(`content`),role:`tablist`,"aria-orientation":`horizontal`,onScroll:r[1]||=function(){return c.onScroll&&c.onScroll.apply(c,arguments)}},t.ptm(`content`)),[e(t.$slots,`default`),x(`span`,g({ref:`inkbar`,class:t.cx(`activeBar`),role:`presentation`,"aria-hidden":`true`},t.ptm(`activeBar`)),null,16)],16),c.showNavigators&&s.isNextButtonEnabled?o((m(),_(`button`,g({key:1,ref:`nextButton`,type:`button`,class:t.cx(`nextButton`),"aria-label":c.nextButtonAriaLabel,tabindex:c.$pcTabs.tabindex,onClick:r[2]||=function(){return c.onNextButtonClick&&c.onNextButtonClick.apply(c,arguments)}},t.ptm(`nextButton`),{"data-pc-group-section":`navigator`}),[(m(),v(n(c.templates.nexticon||`ChevronRight`),g({"aria-hidden":`true`},t.ptm(`nextIcon`)),null,16))],16,M)),[[l]]):b(``,!0)],16,A)}k.render=N;var P=h.extend({name:`tabpanel`,classes:{root:function(e){return[`p-tabpanel`,{"p-tabpanel-active":e.instance.active}]}}}),F={name:`TabPanel`,extends:{name:`BaseTabPanel`,extends:S,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1}},style:P,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],computed:{active:function(){return C(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},ariaLabelledby:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},attrs:function(){return g(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcTabs?.tabindex,role:`tabpanel`,"aria-labelledby":this.ariaLabelledby,"data-pc-name":`tabpanel`,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function I(t,r,i,l,u,d){var f,h;return d.$pcTabs?(m(),_(c,{key:1},[t.asChild?e(t.$slots,`default`,{key:1,class:s(t.cx(`root`)),active:d.active,a11yAttrs:d.a11yAttrs}):(m(),_(c,{key:0},[!((f=d.$pcTabs)!=null&&f.lazy)||d.active?o((m(),v(n(t.as),g({key:0,class:t.cx(`root`)},d.attrs),{default:a(function(){return[e(t.$slots,`default`)]}),_:3},16,[`class`])),[[p,(h=d.$pcTabs)!=null&&h.lazy?!0:d.active]]):b(``,!0)],64))],64)):e(t.$slots,`default`,{key:0})}F.render=I;var L={name:`TabPanels`,extends:{name:`BaseTabPanels`,extends:S,props:{},style:h.extend({name:`tabpanels`,classes:{root:`p-tabpanels`}}),provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},inheritAttrs:!1};function R(t,n,r,i,a,o){return m(),_(`div`,g({class:t.cx(`root`),role:`presentation`},t.ptmi(`root`)),[e(t.$slots,`default`)],16)}L.render=R;var z=h.extend({name:`tabs`,style:`
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
`,classes:{root:`p-tabs p-component`}}),B={name:`Tabs`,extends:{name:`BaseTabs`,extends:S,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},scrollStrategy:{type:[String,Function],default:`nearest`}},style:z,provide:function(){return{$pcTabs:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{updateValue:function(e){this.d_value!==e&&(this.d_value=e,this.$emit(`update:value`,e))},scrollToActiveTab:function(e,n){if(!(!e||!n||this.scrollStrategy===!1)){if(typeof this.scrollStrategy==`function`){this.scrollStrategy(e,n);return}var r=e.clientWidth,i=Math.abs(e.scrollLeft),a=n.offsetLeft,o=n.offsetWidth,s=a+o,c;if(this.scrollStrategy===`center`)c=a-(r-o)/2;else{var l=r*.1;if(a<i+l)c=a-l;else if(s>i+r-l)c=s-r+l;else return}var u=e.scrollWidth-r,d=Math.max(0,Math.min(c,u));e.scrollTo({left:t(e)?-d:d,behavior:`smooth`})}}}};function V(t,n,r,i,a,o){return m(),_(`div`,g({class:t.cx(`root`)},t.ptmi(`root`)),[e(t.$slots,`default`)],16)}B.render=V;export{D as a,k as i,L as n,F as r,B as t};