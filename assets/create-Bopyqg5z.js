import{An as e,B as t,C as n,Cn as r,En as i,G as a,H as o,K as s,Kt as c,Mn as l,Nn as u,Qn as d,Qt as f,Sn as p,Tn as m,Tt as h,Un as g,X as _,Xt as v,Zn as y,Zt as b,_t as x,an as S,bn as C,bt as w,cn as T,en as E,f as D,hn as O,ht as k,in as A,mt as ee,n as j,nn as M,o as te,on as N,q as ne,qn as re,r as P,rn as F,sn as I,tn as L,tr as R,u as z,wn as B,wt as V,xt as H}from"./vue-i18n-Dd-f5b4D.js";import{n as ie,r as U}from"./check-014UZMK0.js";import{n as W,r as G,t as ae}from"./CreateField-C5KVfXvb.js";import{t as oe}from"./autocomplete-XXTCTDaY.js";import{t as se}from"./angle-right-Bsw8p702.js";import{t as ce}from"./message-BuOkPGkY.js";import{t as le}from"./inputPhone-C_0qxPOX.js";import{t as ue}from"./toast-BdsSYcrJ.js";import{B as de,C as K,F as fe,M as pe,P as me,a as he,c as q,d as J,j as ge,r as _e,z as ve}from"./index-DjQFLVon.js";import{t as ye}from"./MCard-BflvL0tF.js";var be=D.extend({name:`tieredmenu`,style:`
    .p-tieredmenu {
        background: dt('tieredmenu.background');
        color: dt('tieredmenu.color');
        border: 1px solid dt('tieredmenu.border.color');
        border-radius: dt('tieredmenu.border.radius');
        min-width: 12.5rem;
    }
    

    .p-tieredmenu-root-list,
    .p-tieredmenu-submenu {
        margin: 0;
        padding: dt('tieredmenu.list.padding');
        list-style: none;
        outline: 0 none;
        display: flex;
        flex-direction: column;
        gap: dt('tieredmenu.list.gap');
    }

    .p-tieredmenu-submenu {
        position: absolute;
        min-width: 100%;
        z-index: 1;
        background: dt('tieredmenu.background');
        color: dt('tieredmenu.color');
        border: 1px solid dt('tieredmenu.border.color');
        border-radius: dt('tieredmenu.border.radius');
        box-shadow: dt('tieredmenu.shadow');
    }

    .p-tieredmenu-item {
        position: relative;
    }

    .p-tieredmenu-item-content {
        transition:
            background dt('tieredmenu.transition.duration'),
            color dt('tieredmenu.transition.duration');
        border-radius: dt('tieredmenu.item.border.radius');
        color: dt('tieredmenu.item.color');
    }

    .p-tieredmenu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('tieredmenu.item.padding');
        gap: dt('tieredmenu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-tieredmenu-item-label {
        font-weight: dt('tieredmenu.item.label.font.weight');
        font-size: dt('tieredmenu.item.label.font.size');
    }

    .p-tieredmenu-item-icon {
        color: dt('tieredmenu.item.icon.color');
        font-size: dt('tieredmenu.item.icon.size');
        width: dt('tieredmenu.item.icon.size');
        height: dt('tieredmenu.item.icon.size');
    }

    .p-tieredmenu-submenu-icon {
        color: dt('tieredmenu.submenu.icon.color');
        margin-left: auto;
        font-size: dt('tieredmenu.submenu.icon.size');
        width: dt('tieredmenu.submenu.icon.size');
        height: dt('tieredmenu.submenu.icon.size');
    }

    .p-tieredmenu-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-tieredmenu-item.p-focus > .p-tieredmenu-item-content {
        color: dt('tieredmenu.item.focus.color');
        background: dt('tieredmenu.item.focus.background');
    }

    .p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
        color: dt('tieredmenu.item.icon.focus.color');
    }

    .p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
        color: dt('tieredmenu.submenu.icon.focus.color');
    }

    .p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover {
        color: dt('tieredmenu.item.focus.color');
        background: dt('tieredmenu.item.focus.background');
    }

    .p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-item-icon {
        color: dt('tieredmenu.item.icon.focus.color');
    }

    .p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-submenu-icon {
        color: dt('tieredmenu.submenu.icon.focus.color');
    }

    .p-tieredmenu-item-active > .p-tieredmenu-item-content {
        color: dt('tieredmenu.item.active.color');
        background: dt('tieredmenu.item.active.background');
    }

    .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
        color: dt('tieredmenu.item.icon.active.color');
    }

    .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
        color: dt('tieredmenu.submenu.icon.active.color');
    }

    .p-tieredmenu-separator {
        border-block-start: 1px solid dt('tieredmenu.separator.border.color');
    }

    .p-tieredmenu-overlay {
        box-shadow: dt('tieredmenu.shadow');
        will-change: transform;
    }

    .p-tieredmenu-mobile .p-tieredmenu-submenu {
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('tieredmenu.submenu.mobile.indent');
        padding-inline-end: 0;
    }

    .p-tieredmenu-mobile .p-tieredmenu-submenu:dir(rtl) {
        padding-inline-start: 0;
        padding-inline-end: dt('tieredmenu.submenu.mobile.indent');
    }

    .p-tieredmenu-mobile .p-tieredmenu-submenu-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-tieredmenu-mobile .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
        transform: rotate(-90deg);
    }
`,classes:{root:function(e){var t=e.props,n=e.instance;return[`p-tieredmenu p-component`,{"p-tieredmenu-overlay":t.popup,"p-tieredmenu-mobile":n.queryMatches}]},start:`p-tieredmenu-start`,rootList:`p-tieredmenu-root-list`,item:function(e){var t=e.instance,n=e.processedItem;return[`p-tieredmenu-item`,{"p-tieredmenu-item-active":t.isItemActive(n),"p-focus":t.isItemFocused(n),"p-disabled":t.isItemDisabled(n)}]},itemContent:`p-tieredmenu-item-content`,itemLink:`p-tieredmenu-item-link`,itemIcon:`p-tieredmenu-item-icon`,itemLabel:`p-tieredmenu-item-label`,submenuIcon:`p-tieredmenu-submenu-icon`,submenu:`p-tieredmenu-submenu`,separator:`p-tieredmenu-separator`,end:`p-tieredmenu-end`},inlineStyles:{submenu:function(e){var t=e.instance,n=e.processedItem;return{display:t.isItemActive(n)?`flex`:`none`}}}}),xe={name:`BaseTieredMenu`,extends:z,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},breakpoint:{type:String,default:`960px`},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:be,provide:function(){return{$pcTieredMenu:this,$parentInstance:this}}},Y={name:`TieredMenuSub`,hostName:`TieredMenu`,extends:z,emits:[`item-click`,`item-mouseenter`,`item-mousemove`],container:null,inject:{$pcTieredMenu:{default:null}},props:{menuId:{type:String,default:null},focusedItemId:{type:String,default:null},items:{type:Array,default:null},visible:{type:Boolean,default:!1},level:{type:Number,default:0},templates:{type:Object,default:null},activeItemPath:{type:Object,default:null},tabindex:{type:Number,default:0}},methods:{getItemId:function(e){return`${this.menuId}_${e.key}`},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,n){return e&&e.item?H(e.item[t],n):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},getItemLabelId:function(e){return`${this.menuId}_${e.key}_label`},getPTOptions:function(e,t,n){return this.ptm(n,{context:{item:e.item,index:t,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e)}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return V(e.items)},onEnter:function(){this.mobileActive||ne(this.container,this.level)},onItemClick:function(e,t){this.getItemProp(t,`command`,{originalEvent:e,item:t.item}),this.$emit(`item-click`,{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit(`item-mouseenter`,{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit(`item-mousemove`,{originalEvent:e,processedItem:t})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,`separator`)}).length},getAriaPosInset:function(e){var t=this;return e-this.items.slice(0,e).filter(function(e){return t.isItemVisible(e)&&t.getItemProp(e,`separator`)}).length+1},getMenuItemProps:function(e,t){return{action:O({class:this.cx(`itemLink`),tabindex:-1},this.getPTOptions(e,t,`itemLink`)),icon:O({class:[this.cx(`itemIcon`),x(this.getItemProp(e,`icon`))?this.getItemProp(e,`icon`):void 0]},this.getPTOptions(e,t,`itemIcon`)),label:O({class:this.cx(`itemLabel`)},this.getPTOptions(e,t,`itemLabel`)),submenuicon:O({class:this.cx(`submenuIcon`)},this.getPTOptions(e,t,`submenuIcon`))}},containerRef:function(e){this.container=e},resolveIcon:function(e){return x(e)?e:re(e)},isComponentIcon:function(e){return!!e&&!x(e)}},computed:{mobileActive:function(){var e;return!!((e=this.$pcTieredMenu)!=null&&e.queryMatches)}},components:{AngleRight:se},directives:{ripple:te}},Se=[`tabindex`],Ce=[`id`,`aria-label`,`aria-disabled`,`aria-expanded`,`aria-haspopup`,`aria-level`,`aria-setsize`,`aria-posinset`,`data-p-active`,`data-p-focused`,`data-p-disabled`],we=[`onClick`,`onMouseenter`,`onMousemove`],Te=[`href`,`target`],Ee=[`id`],De=[`id`];function Oe(e,t,n,r,a,o){var s=B(`AngleRight`),h=B(`TieredMenuSub`,!0),g=m(`ripple`);return C(),M(c,O({name:`p-anchored-overlay`,css:!o.mobileActive,onEnter:o.onEnter},e.ptm(`menu.transition`)),{default:l(function(){return[n.level===0||n.visible?(C(),A(`ul`,{key:0,ref:o.containerRef,tabindex:n.tabindex},[(C(!0),A(f,null,p(n.items,function(r,a){return C(),A(f,{key:o.getItemKey(r)},[o.isItemVisible(r)&&!o.getItemProp(r,`separator`)?(C(),A(`li`,O({key:0,id:o.getItemId(r),style:o.getItemProp(r,`style`),class:[e.cx(`item`,{processedItem:r}),o.getItemProp(r,`class`)],role:`menuitem`,"aria-label":o.getItemLabel(r),"aria-disabled":o.isItemDisabled(r)||void 0,"aria-expanded":o.isItemGroup(r)?o.isItemActive(r):void 0,"aria-haspopup":o.isItemGroup(r)&&!o.getItemProp(r,`to`)?`menu`:void 0,"aria-level":n.level+1,"aria-setsize":o.getAriaSetSize(),"aria-posinset":o.getAriaPosInset(a)},{ref_for:!0},o.getPTOptions(r,a,`item`),{"data-p-active":o.isItemActive(r),"data-p-focused":o.isItemFocused(r),"data-p-disabled":o.isItemDisabled(r)}),[L(`div`,O({class:e.cx(`itemContent`),onClick:function(e){return o.onItemClick(e,r)},onMouseenter:function(e){return o.onItemMouseEnter(e,r)},onMousemove:function(e){return o.onItemMouseMove(e,r)}},{ref_for:!0},o.getPTOptions(r,a,`itemContent`)),[n.templates.item?(C(),M(i(n.templates.item),{key:1,item:r.item,hasSubmenu:!!o.getItemProp(r,`items`),label:o.getItemLabel(r),icon:o.getItemProp(r,`icon`)?o.resolveIcon(o.getItemProp(r,`icon`)):void 0,props:o.getMenuItemProps(r,a)},null,8,[`item`,`hasSubmenu`,`label`,`icon`,`props`])):u((C(),A(`a`,O({key:0,href:o.getItemProp(r,`url`),class:e.cx(`itemLink`),target:o.getItemProp(r,`target`),tabindex:`-1`},{ref_for:!0},o.getPTOptions(r,a,`itemLink`)),[n.templates.itemicon?(C(),M(i(n.templates.itemicon),{key:0,item:r.item,class:d(e.cx(`itemIcon`))},null,8,[`item`,`class`])):o.isComponentIcon(o.getItemProp(r,`icon`))?(C(),M(i(o.resolveIcon(o.getItemProp(r,`icon`))),O({key:1,class:e.cx(`itemIcon`)},{ref_for:!0},o.getPTOptions(r,a,`itemIcon`)),null,16,[`class`])):o.getItemProp(r,`icon`)?(C(),A(`span`,O({key:2,class:[e.cx(`itemIcon`),o.getItemProp(r,`icon`)]},{ref_for:!0},o.getPTOptions(r,a,`itemIcon`)),null,16)):F(``,!0),L(`span`,O({id:o.getItemLabelId(r),class:e.cx(`itemLabel`)},{ref_for:!0},o.getPTOptions(r,a,`itemLabel`)),R(o.getItemLabel(r)),17,Ee),o.getItemProp(r,`items`)?(C(),A(f,{key:3},[n.templates.submenuicon?(C(),M(i(n.templates.submenuicon),O({key:0,class:e.cx(`submenuIcon`),active:o.isItemActive(r)},{ref_for:!0},o.getPTOptions(r,a,`submenuIcon`)),null,16,[`class`,`active`])):(C(),M(s,O({key:1,class:e.cx(`submenuIcon`)},{ref_for:!0},o.getPTOptions(r,a,`submenuIcon`)),null,16,[`class`]))],64)):F(``,!0)],16,Te)),[[g]])],16,we),o.isItemVisible(r)&&o.isItemGroup(r)?(C(),M(h,O({key:0,id:o.getItemId(r)+`_list`,class:e.cx(`submenu`),style:e.sx(`submenu`,!0,{processedItem:r}),"aria-labelledby":o.getItemLabelId(r),role:`menu`,menuId:n.menuId,focusedItemId:n.focusedItemId,items:r.items,templates:n.templates,activeItemPath:n.activeItemPath,level:n.level+1,visible:o.isItemActive(r)&&o.isItemGroup(r),pt:e.pt,unstyled:e.unstyled,onItemClick:t[0]||=function(t){return e.$emit(`item-click`,t)},onItemMouseenter:t[1]||=function(t){return e.$emit(`item-mouseenter`,t)},onItemMousemove:t[2]||=function(t){return e.$emit(`item-mousemove`,t)}},{ref_for:!0},e.ptm(`submenu`)),null,16,[`id`,`class`,`style`,`aria-labelledby`,`menuId`,`focusedItemId`,`items`,`templates`,`activeItemPath`,`level`,`visible`,`pt`,`unstyled`])):F(``,!0)],16,Ce)):F(``,!0),o.isItemVisible(r)&&o.getItemProp(r,`separator`)?(C(),A(`li`,O({key:1,id:o.getItemId(r),style:o.getItemProp(r,`style`),class:[e.cx(`separator`),o.getItemProp(r,`class`)],role:`separator`},{ref_for:!0},e.ptm(`separator`)),null,16,De)):F(``,!0)],64)}),128))],8,Se)):F(``,!0)]}),_:1},16,[`css`,`onEnter`])}Y.render=Oe;var X={name:`TieredMenu`,extends:xe,inheritAttrs:!1,emits:[`focus`,`blur`,`before-show`,`before-hide`,`hide`,`show`],outsideClickListener:null,matchMediaListener:null,scrollHandler:null,resizeListener:null,target:null,container:null,menubar:null,searchTimeout:null,searchValue:null,data:function(){return{focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:``},activeItemPath:[],visible:!this.popup,submenuVisible:!1,dirty:!1,query:null,queryMatches:!1}},watch:{activeItemPath:function(e){this.popup||(V(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener()))}},mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.container&&this.autoZIndex&&U.clear(this.container),this.target=null,this.container=null},methods:{getItemProp:function(e,t){return e?H(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,`label`)},isItemDisabled:function(e){return this.getItemProp(e,`disabled`)},isItemVisible:function(e){return this.getItemProp(e,`visible`)!==!1},isItemGroup:function(e){return V(this.getItemProp(e,`items`))},isItemSeparator:function(e){return this.getItemProp(e,`separator`)},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&V(e.items)},toggle:function(e){this.visible?this.hide(e,!0):this.show(e)},show:function(e,t){this.popup&&(this.$emit(`before-show`),this.visible=!0,this.target=e.currentTarget,this.relatedTarget=e.relatedTarget||null),t&&_(this.menubar)},hide:function(e,t){this.popup&&(this.$emit(`before-hide`),this.visible=!1),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:``},t&&_(this.relatedTarget||this.target||this.menubar),this.dirty=!1,this.target=null},onFocus:function(e){this.focused=!0,this.popup||(this.focusedItemInfo=this.focusedItemInfo.index===-1?{index:this.findFirstFocusedItemIndex(),level:0,parentKey:``}:this.focusedItemInfo),this.$emit(`focus`,e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:``},this.searchValue=``,this.dirty=!1,this.$emit(`blur`,e)},onKeyDown:function(e){if(this.disabled){e.preventDefault();return}var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&ee(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e,t){var n=e.processedItem,r=e.isFocus;if(!w(n)){var i=n.index,a=n.key,o=n.level,s=n.parentKey,c=n.items,l=V(c),u=this.activeItemPath.filter(function(e){return e.parentKey!==s&&e.parentKey!==a});l&&(u.push(n),this.submenuVisible=!0),this.focusedItemInfo={index:i,level:o,parentKey:s},l&&(this.dirty=!0),r&&_(this.menubar),!(t===`hover`&&this.queryMatches)&&(this.activeItemPath=u)}},onOverlayClick:function(e){ge.emit(`overlay-click`,{originalEvent:e,target:this.target})},onItemClick:function(e){var t=e.originalEvent,n=e.processedItem,r=this.isProccessedItemGroup(n),i=w(n.parent);if(this.isSelected(n)){var a=n.index,o=n.key,s=n.level,c=n.parentKey;this.activeItemPath=this.activeItemPath.filter(function(e){return o!==e.key&&o.startsWith(e.key)}),this.focusedItemInfo={index:a,level:s,parentKey:c},this.dirty=!i,_(this.menubar)}else if(r)this.onItemChange(e);else{var l=i?n:this.activeItemPath.find(function(e){return e.parentKey===``});this.hide(t),this.changeFocusedItemIndex(t,l?l.index:-1),_(this.menubar)}},onItemMouseEnter:function(e){this.dirty&&this.onItemChange(e,`hover`)},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},onArrowDownKey:function(e){var t=this.focusedItemInfo.index===-1?this.findFirstFocusedItemIndex():this.findNextItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,t),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.popup&&this.hide(e,!0),e.preventDefault()}else{var n=this.focusedItemInfo.index===-1?this.findLastFocusedItemIndex():this.findPrevItemIndex(this.focusedItemInfo.index);this.changeFocusedItemIndex(e,n),e.preventDefault()}},onArrowLeftKey:function(e){var t=this,n=this.visibleItems[this.focusedItemInfo.index],r=this.activeItemPath.find(function(e){return e.key===n.parentKey});w(n.parent)||(this.focusedItemInfo={index:-1,parentKey:r?r.parentKey:``},this.searchValue=``,this.onArrowDownKey(e)),this.activeItemPath=this.activeItemPath.filter(function(e){return e.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault()},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index];this.isProccessedItemGroup(t)&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.searchValue=``,this.onArrowDownKey(e)),e.preventDefault()},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=s(this.menubar,`li[id="${`${this.focusedItemId}`}"]`),n=t&&s(t,`[data-pc-section="itemlink"]`);if(n?n.click():t&&t.click(),!this.popup){var r=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(r)&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){if(this.popup||this.focusedItemInfo.level!==0){var t=this.focusedItemInfo;this.hide(e,!1),this.focusedItemInfo={index:Number(t.parentKey.split(`_`)[0]),level:0,parentKey:``},this.popup&&_(this.target)}e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index];!this.isProccessedItemGroup(t)&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},onEnter:function(e){this.autoZIndex&&U.set(`menu`,e,this.baseZIndex||this.$primevue.config.zIndex.menu),t(e,{position:`absolute`,top:`0`}),this.alignOverlay(),_(this.menubar),this.scrollInView()},onAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit(`hide`),this.container=null,this.dirty=!1},onAfterLeave:function(e){this.autoZIndex&&U.clear(e)},alignOverlay:function(){o(this.container,this.target),n(this.target)>n(this.container)&&(this.container.style.minWidth=n(this.target)+`px`)},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!e.popup||!(e.target&&(e.target===t.target||e.target.contains(t.target)));n&&r&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new fe(this.target,function(t){e.hide(t,!0)}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(t){a()||e.hide(t,!0)},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)},isItemMatched:function(e){return this.isValidItem(e)&&this.getProccessedItemLabel(e)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return k(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,n=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(e){return t.isValidItem(e)}):-1;return n>-1?n+e+1:e},findPrevItemIndex:function(e){var t=this,n=e>0?k(this.visibleItems.slice(0,e),function(e){return t.isValidItem(e)}):-1;return n>-1?n:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return this.focusedItemInfo.index===-1?r=this.visibleItems.findIndex(function(e){return n.isItemMatched(e)}):(r=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}),r=r===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(e){return n.isItemMatched(e)}):r+this.focusedItemInfo.index),r!==-1&&(i=!0),r===-1&&this.focusedItemInfo.index===-1&&(r=this.findFirstFocusedItemIndex()),r!==-1&&this.changeFocusedItemIndex(e,r),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e===-1?this.focusedItemId:`${this.$id}_${e}`,n=s(this.menubar,`li[id="${t}"]`);n&&n.scrollIntoView&&n.scrollIntoView({block:`nearest`,inline:`start`})},createProcessedItems:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=[];return e&&e.forEach(function(e,o){var s=(i===``?``:i+`_`)+o,c={item:e,index:o,level:n,key:s,parent:r,parentKey:i};c.items=t.createProcessedItems(e.items,n+1,c,s),a.push(c)}),a},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(t){return t.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemId:function(){return this.focusedItemInfo.index===-1?null:`${this.$id}${V(this.focusedItemInfo.parentKey)?`_`+this.focusedItemInfo.parentKey:``}_${this.focusedItemInfo.index}`}},components:{TieredMenuSub:Y,Portal:ie}},ke=[`id`];function Ae(e,t,n,i,a,o){var s=B(`TieredMenuSub`),u=B(`Portal`);return C(),M(u,{appendTo:e.appendTo,disabled:!e.popup},{default:l(function(){return[I(c,O({name:`p-anchored-overlay`,onEnter:o.onEnter,onAfterEnter:o.onAfterEnter,onLeave:o.onLeave,onAfterLeave:o.onAfterLeave},e.ptm(`transition`)),{default:l(function(){return[a.visible?(C(),A(`div`,O({key:0,ref:o.containerRef,id:e.$id,class:e.cx(`root`),onClick:t[0]||=function(){return o.onOverlayClick&&o.onOverlayClick.apply(o,arguments)}},e.ptmi(`root`)),[e.$slots.start?(C(),A(`div`,O({key:0,class:e.cx(`start`)},e.ptm(`start`)),[r(e.$slots,`start`)],16)):F(``,!0),I(s,O({ref:o.menubarRef,id:e.$id+`_list`,class:e.cx(`rootList`),tabindex:e.disabled?-1:e.tabindex,role:`menubar`,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-disabled":e.disabled||void 0,"aria-orientation":`vertical`,"aria-activedescendant":a.focused?o.focusedItemId:void 0,menuId:e.$id,focusedItemId:a.focused?o.focusedItemId:void 0,items:o.processedItems,templates:e.$slots,activeItemPath:a.activeItemPath,level:0,visible:a.submenuVisible,pt:e.pt,unstyled:e.unstyled,onFocus:o.onFocus,onBlur:o.onBlur,onKeydown:o.onKeyDown,onItemClick:o.onItemClick,onItemMouseenter:o.onItemMouseEnter,onItemMousemove:o.onItemMouseMove},e.ptm(`rootList`)),null,16,[`id`,`class`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-disabled`,`aria-activedescendant`,`menuId`,`focusedItemId`,`items`,`templates`,`activeItemPath`,`visible`,`pt`,`unstyled`,`onFocus`,`onBlur`,`onKeydown`,`onItemClick`,`onItemMouseenter`,`onItemMousemove`]),e.$slots.end?(C(),A(`div`,O({key:1,class:e.cx(`end`)},e.ptm(`end`)),[r(e.$slots,`end`)],16)):F(``,!0)],16,ke)):F(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`,`disabled`])}X.render=Ae;var je=D.extend({name:`splitbutton`,style:`
    .p-splitbutton {
        display: inline-flex;
        position: relative;
        border-radius: dt('splitbutton.border.radius');
    }

    .p-splitbutton-button.p-button {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
        border-inline-end: 0 none;
    }

    .p-splitbutton-button.p-button:focus-visible,
    .p-splitbutton-dropdown.p-button:focus-visible {
        z-index: 1;
    }

    .p-splitbutton-button.p-button:not(:disabled):hover,
    .p-splitbutton-button.p-button:not(:disabled):active {
        border-inline-end: 0 none;
    }

    .p-splitbutton-dropdown.p-button {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-splitbutton .p-menu {
        min-width: 100%;
    }

    .p-splitbutton-fluid {
        display: flex;
    }

    .p-splitbutton-rounded .p-splitbutton-dropdown.p-button {
        border-start-end-radius: dt('splitbutton.rounded.border.radius');
        border-end-end-radius: dt('splitbutton.rounded.border.radius');
    }

    .p-splitbutton-rounded .p-splitbutton-button.p-button {
        border-start-start-radius: dt('splitbutton.rounded.border.radius');
        border-end-start-radius: dt('splitbutton.rounded.border.radius');
    }

    .p-splitbutton-raised {
        box-shadow: dt('splitbutton.raised.shadow');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-splitbutton p-component`,{"p-splitbutton-raised":n.raised,"p-splitbutton-rounded":n.rounded,"p-splitbutton-fluid":t.hasFluid}]},pcButton:`p-splitbutton-button`,pcDropdown:`p-splitbutton-dropdown`}}),Z={name:`SplitButton`,extends:{name:`BaseSplitButton`,extends:z,props:{label:{type:String,default:null},icon:{type:String,default:null},model:{type:Array,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:`body`},disabled:{type:Boolean,default:!1},fluid:{type:Boolean,default:null},class:{type:null,default:null},style:{type:null,default:null},buttonProps:{type:null,default:null},menuButtonProps:{type:null,default:null},menuButtonIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1}},style:je,provide:function(){return{$pcSplitButton:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`click`],inject:{$pcFluid:{default:null}},data:function(){return{isExpanded:!1}},mounted:function(){var e=this;this.$watch(`$refs.menu.visible`,function(t){e.isExpanded=t})},methods:{onDropdownButtonClick:function(e){e&&e.preventDefault(),this.$refs.menu.toggle({currentTarget:this.$el,relatedTarget:this.$refs.button.$el}),this.isExpanded=this.$refs.menu.visible},onDropdownKeydown:function(e){(e.code===`ArrowDown`||e.code===`ArrowUp`)&&(this.onDropdownButtonClick(),e.preventDefault())},onDefaultButtonClick:function(e){this.isExpanded&&this.$refs.menu.hide(e),this.$emit(`click`,e)}},computed:{containerClass:function(){return[this.cx(`root`),this.class]},hasFluid:function(){return w(this.fluid)?!!this.$pcFluid:this.fluid}},components:{PVSButton:P,PVSMenu:X,ChevronDown:ve}},Me=[`data-p-severity`];function Ne(e,t,n,a,o,s){var c=B(`PVSButton`),u=B(`PVSMenu`);return C(),A(`div`,O({class:s.containerClass,style:e.style},e.ptmi(`root`),{"data-p-severity":e.severity}),[I(c,O({type:`button`,class:e.cx(`pcButton`),disabled:e.disabled,severity:e.severity,text:e.text,outlined:e.outlined,size:e.size,fluid:e.fluid,"aria-label":e.label,onClick:s.onDefaultButtonClick},e.buttonProps,{pt:e.ptm(`pcButton`),unstyled:e.unstyled}),{default:l(function(){return[r(e.$slots,`icon`,{},function(){return[e.icon?(C(),A(`span`,O({key:0,class:e.icon},e.ptm(`pcButton`).icon,{"data-pc-section":`buttonicon`}),null,16)):F(``,!0)]}),r(e.$slots,`default`,{},function(){return[N(R(e.label),1)]})]}),_:3},16,[`class`,`disabled`,`severity`,`text`,`outlined`,`size`,`fluid`,`aria-label`,`onClick`,`pt`,`unstyled`]),I(c,O({ref:`button`,type:`button`,iconOnly:``,class:e.cx(`pcDropdown`),disabled:e.disabled,"aria-haspopup":`true`,"aria-expanded":o.isExpanded,"aria-controls":o.isExpanded?e.$id+`_overlay`:void 0,onClick:s.onDropdownButtonClick,onKeydown:s.onDropdownKeydown,severity:e.severity,text:e.text,outlined:e.outlined,size:e.size,unstyled:e.unstyled},e.menuButtonProps,{pt:e.ptm(`pcDropdown`)}),{default:l(function(){return[r(e.$slots,`dropdownicon`,{},function(){return[(C(),M(i(e.menuButtonIcon||e.dropdownIcon?`span`:`ChevronDown`),O({class:e.dropdownIcon||e.menuButtonIcon},e.ptm(`pcDropdown`).icon,{"data-pc-section":`menubuttonicon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`disabled`,`aria-expanded`,`aria-controls`,`onClick`,`onKeydown`,`severity`,`text`,`outlined`,`size`,`unstyled`,`pt`]),I(u,{ref:`menu`,id:e.$id+`_overlay`,model:e.model,popup:!0,autoZIndex:e.autoZIndex,baseZIndex:e.baseZIndex,appendTo:e.appendTo,unstyled:e.unstyled,pt:e.ptm(`pcMenu`)},S({_:2},[e.$slots.menuitemicon?{name:`itemicon`,fn:l(function(t){return[r(e.$slots,`menuitemicon`,{item:t.item,class:d(t.class)})]}),key:`0`}:void 0,e.$slots.item?{name:`item`,fn:l(function(t){return[r(e.$slots,`item`,{item:t.item,hasSubmenu:t.hasSubmenu,label:t.label,props:t.props})]}),key:`1`}:void 0]),1032,[`id`,`model`,`autoZIndex`,`baseZIndex`,`appendTo`,`unstyled`,`pt`])],16,Me)}Z.render=Ne;var Pe=D.extend({name:`toggleswitch`,style:`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-toggleswitch p-component`,{"p-toggleswitch-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$invalid}]},input:`p-toggleswitch-input`,slider:`p-toggleswitch-slider`,handle:`p-toggleswitch-handle`},inlineStyles:{root:{position:`relative`}}}),Q={name:`ToggleSwitch`,extends:{name:`BaseToggleSwitch`,extends:me,props:{trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Pe,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`change`,`focus`,`blur`],methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(e){if(!this.disabled&&!this.readonly){var t=this.checked?this.falseValue:this.trueValue;this.writeValue(t,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)}},computed:{checked:function(){return this.d_value===this.trueValue},dataP:function(){return h({checked:this.checked,disabled:this.disabled,invalid:this.$invalid})}}},Fe=[`data-p-checked`,`data-p-disabled`,`data-p`],Ie=[`id`,`checked`,`tabindex`,`disabled`,`readonly`,`aria-checked`,`aria-labelledby`,`aria-label`,`aria-invalid`],Le=[`data-p`],Re=[`data-p`];function ze(e,t,n,i,a,o){return C(),A(`div`,O({class:e.cx(`root`),style:e.sx(`root`)},o.getPTOptions(`root`),{"data-p-checked":o.checked,"data-p-disabled":e.disabled,"data-p":o.dataP}),[L(`input`,O({id:e.inputId,type:`checkbox`,role:`switch`,class:[e.cx(`input`),e.inputClass],style:e.inputStyle,checked:o.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,"aria-checked":o.checked,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:t[0]||=function(){return o.onFocus&&o.onFocus.apply(o,arguments)},onBlur:t[1]||=function(){return o.onBlur&&o.onBlur.apply(o,arguments)},onChange:t[2]||=function(){return o.onChange&&o.onChange.apply(o,arguments)}},o.getPTOptions(`input`)),null,16,Ie),L(`div`,O({class:e.cx(`slider`)},o.getPTOptions(`slider`),{"data-p":o.dataP}),[L(`div`,O({class:e.cx(`handle`)},o.getPTOptions(`handle`),{"data-p":o.dataP}),[r(e.$slots,`handle`,{checked:o.checked})],16,Re)],16,Le)],16,Fe)}Q.render=ze;function Be(e,t=!0){return q(`:area/contact/create`,{body:{data:e},method:`POST`,immediate:t})}function Ve(e){return q(`:area/contact/getAutocompleteFields`,{query:e,method:`GET`})}function He(e){return q(`:area/contact/getContactById`,{query:e,method:`GET`})}var Ue={class:`flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3`},We={class:`flex flex-1 flex-col gap-1`},Ge={class:`mb-1 flex items-center gap-2`},Ke={class:`text-sm font-medium text-gray-700`},qe={key:0,class:`pi pi-id-card text-xs text-gray-400`},Je={key:1,class:`pi pi-bolt text-xs text-gray-400`},Ye={key:2,class:`pi pi-tag text-xs text-gray-400`},Xe=[`aria-checked`,`aria-label`,`onKeydown`],Ze={class:`flex flex-col gap-1 text-sm`},Qe={class:`font-medium`},$e={key:0,class:`text-xs text-gray-500`},et={key:0,class:`pi pi-question-circle mt-2 cursor-help text-gray-400`},$=T({__name:`ContactCreationInput`,props:{id:{},name:{},type:{},description:{},defaultValue:{},primary:{type:Boolean},indexed:{type:Boolean},significance:{},modelValue:{}},emits:[`update:modelValue`,`error`,`update:providedField`],setup(t,{emit:n}){let r=t,i=n,{t:a}=j(),o=J(),s=E(()=>o.contactTypeValidator.get(r.type)??/.*/),c=E(()=>r.significance),d=E(()=>{if(r.type==`email`)return{type:`email`,inputmode:`email`};if(r.type==`integer`)return{type:`text`,inputmode:`numeric`};if(r.type==`number`)return{type:`text`,inputmode:`decimal`}}),f=g(r.modelValue??r.defaultValue??``),p=E({get:()=>[`true`,`1`].includes(String(f.value)),set:e=>{f.value=e?`true`:`false`}}),h=E({get:()=>String(f.value??``),set:e=>{f.value=e}});function _(){p.value=!p.value}let x=g([]);e(()=>r.modelValue,e=>{e!==void 0&&typeof f.value==`string`&&f.value!==e&&(f.value=e)});let S=!1;e(f,e=>{typeof e==`object`&&e?O(e):typeof e==`string`&&!S&&i(`update:modelValue`,e)});let w=E({get:()=>typeof f.value==`object`?f.value.output:f.value,set:e=>{f.value=e}}),T=E(()=>{if(!w.value)return!1;let e=r.type==`phone`?w.value.replace(/\s/g,``):w.value;return!s.value.test(e.trim())});e(T,e=>i(`error`,e),{immediate:!0});async function D(e){if(e.query.length<2){x.value=[];return}let t=Ve({field:String(r.id),partial:e.query});await t.doFetch(),x.value=t.data.value?.proposals??[]}async function O(e){if(S=!0,f.value=e.output,i(`update:modelValue`,e.output),c.value===`other`){S=!1;return}let t=He({id:String(e.contactId),fields:`*`});await t.doFetch();let n=t.data.value;if(!n){S=!1;return}i(`update:providedField`,n.fields.map(e=>({field:e.id,value:e.value}))),S=!1}return(e,n)=>{let i=m(`tooltip`);return C(),A(`div`,Ue,[L(`div`,We,[L(`div`,Ge,[L(`span`,Ke,R(t.name),1),c.value===`primary`?u((C(),A(`i`,qe,null,512)),[[i,y(a)(`primary.description`)]]):c.value===`recomended`?u((C(),A(`i`,Je,null,512)),[[i,y(a)(`recomended.description`)]]):u((C(),A(`i`,Ye,null,512)),[[i,y(a)(`other.description`)]])]),r.type==`boolean`?(C(),A(`div`,{key:0,role:`switch`,"aria-checked":p.value,"aria-label":t.name,tabindex:`0`,class:`flex w-fit cursor-pointer items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color)`,onKeydown:[v(b(_,[`prevent`]),[`space`]),v(b(_,[`prevent`]),[`enter`])]},[I(y(Q),{modelValue:p.value,"onUpdate:modelValue":n[0]||=e=>p.value=e,variant:`filled`,inputId:String(t.id),tabindex:-1},null,8,[`modelValue`,`inputId`])],40,Xe)):r.type==`phone`?(C(),M(le,{key:1,phone:h.value,"onUpdate:phone":n[1]||=e=>h.value=e,disabled:!1,invalid:T.value},null,8,[`phone`,`invalid`])):c.value===`other`?(C(),M(y(pe),{key:2,id:String(t.id),modelValue:w.value,"onUpdate:modelValue":n[2]||=e=>w.value=e,invalid:T.value,"input-props":d.value,fluid:``},null,8,[`id`,`modelValue`,`invalid`,`input-props`])):(C(),M(y(oe),{key:3,modelValue:f.value,"onUpdate:modelValue":n[3]||=e=>f.value=e,inputId:String(t.id),suggestions:x.value,optionLabel:`output`,onComplete:D,invalid:T.value,"input-props":d.value,fluid:``},{option:l(e=>[L(`div`,Ze,[L(`span`,Qe,R(e.option.output),1),t.significance!==`primary`&&e.option.primaryFields?.length?(C(),A(`span`,$e,R(e.option.primaryFields.map(e=>`${e.name}: ${e.value}`).join(` · `)),1)):F(``,!0)])]),_:1},8,[`modelValue`,`inputId`,`suggestions`,`invalid`,`input-props`])),T.value?(C(),M(y(ce),{key:4,severity:`error`,size:`small`,variant:`simple`},{default:l(()=>[N(R(y(a)(`validation.error`)),1)]),_:1})):F(``,!0)]),t.description?u((C(),A(`i`,et,null,512)),[[i,t.description]]):F(``,!0)])}}}),tt={class:`text-2xl tracking-tighter text-balance text-gray-950`},nt={class:`flex flex-col gap-4`},rt={class:`text-sm text-gray-600`},it={key:0,class:`py-4`},at={class:`order-2 flex flex-col flex-wrap gap-4 md:flex-row`},ot={class:`order-4 flex flex-col flex-wrap gap-4 md:flex-row`},st={class:`order-6 flex flex-col flex-wrap gap-4 md:flex-row`},ct={class:`order-7 flex flex-col items-center gap-4 pt-8`},lt={class:`flex items-center gap-2`},ut={class:`flex items-center gap-2`},dt={class:`flex items-center gap-2`},ft=T({__name:`create`,setup(t){let{t:n}=j(),r=de(),i=J(),{getPerms:a}=_e();a([`:area/contact/creates`,`:area/contact/edits`,`:area/contact/getContactFields`,`:area/contact/getDuplicate`]);let o=E(()=>i.fields),s=g({}),c=g({}),u=g(!1),d=g([]),m=g([]),h=g([]),_=g(!1),v=g(`one`),b=g(!1),x=E(()=>Object.values(s.value).every(e=>!e)||Object.values(c.value).some(e=>e));e(()=>i.fields,e=>{let t={...s.value},n={...c.value};e.forEach(e=>{e.id in t||(t[e.id]=``),e.id in n||(n[e.id]=!1)}),s.value=t,c.value=n},{immediate:!0});let S=E(()=>[{label:n(`create-contact`),command:()=>{v.value=`one`}},{label:n(`create-contacts`),command:()=>{v.value=`many`}}]);function w(){_.value=!0}async function T(){b.value=!0;let e=Object.entries(s.value).filter(([,e])=>e!==``).map(([e,t])=>({id:Number(e),value:t}));try{let t=Be(e,!1);if(await t.doFetch(),t.errorCode.value&&t.errorCode.value!==200){r.add({severity:`error`,summary:n(`contact.create.error`),life:3e3});return}r.add({severity:`success`,summary:n(`contact.create.success`),life:3e3}),await he.push(`/user/contact`)}catch{r.add({severity:`error`,summary:n(`contact.create.error`),life:3e3})}finally{b.value=!1}}function D(e,t){s.value={...s.value,[e]:t}}function k(e){let t={...s.value};u.value=!0,e.forEach(({field:e,value:n})=>{t[e]=n}),s.value=t}return e(()=>i.primaryFields,e=>{d.value=[...e]},{immediate:!0}),e(()=>i.indexedFields,e=>{m.value=[...e]},{immediate:!0}),e(()=>i.otherFields,e=>{h.value=[...e]},{immediate:!0}),(e,t)=>(C(),A(f,null,[I(y(ue)),I(ye,{class:`w-full`},{header:l(()=>[L(`h2`,tt,R(y(n)(`create-contact.title`)),1)]),default:l(()=>[L(`div`,nt,[L(`p`,rt,R(y(n)(`contact.creation.summary`)),1),I(ae,{visible:_.value,"onUpdate:visible":t[0]||=e=>_.value=e},null,8,[`visible`]),o.value.length===0?(C(),A(`div`,it,[I(y(P),{onClick:w},{default:l(()=>[N(R(y(n)(`no-fields-open-modal`)),1)]),_:1})])):F(``,!0),L(`div`,at,[(C(!0),A(f,null,p(d.value,e=>(C(),M($,O({key:e.id},{ref_for:!0},e,{significance:`primary`,modelValue:s.value[e.id]??``,"onUpdate:modelValue":t=>D(e.id,t),onError:t=>c.value[e.id]=t,"onUpdate:providedField":k}),null,16,[`modelValue`,`onUpdate:modelValue`,`onError`]))),128))]),L(`div`,ot,[(C(!0),A(f,null,p(m.value,e=>(C(),M($,O({key:e.id},{ref_for:!0},e,{significance:`recomended`,modelValue:s.value[e.id]??``,"onUpdate:modelValue":t=>D(e.id,t),onError:t=>c.value[e.id]=t,"onUpdate:providedField":k}),null,16,[`modelValue`,`onUpdate:modelValue`,`onError`]))),128))]),L(`div`,st,[(C(!0),A(f,null,p(h.value,e=>(C(),M($,O({significance:`other`,key:e.id},{ref_for:!0},e,{modelValue:s.value[e.id]??``,onError:t=>c.value[e.id]=t}),null,16,[`modelValue`,`onError`]))),128))]),L(`div`,ct,[I(y(Z),{label:v.value===`one`?y(n)(`create-contact`):y(n)(`create-contacts`),onClick:T,model:S.value,disabled:x.value||b.value},null,8,[`label`,`model`,`disabled`])]),I(y(G),{class:`order-1`,align:`left`,type:`solid`},{default:l(()=>[L(`div`,lt,[L(`span`,null,R(y(n)(`primary.description`)),1),I(y(K),{multiple:``,modelValue:d.value,"onUpdate:modelValue":t[1]||=e=>d.value=e,options:y(i).primaryFields,optionLabel:`name`,filter:``,maxSelectedLabels:3,class:`min-w-48`},null,8,[`modelValue`,`options`]),I(y(P),{severity:`secondary`,text:``,onClick:w},{default:l(()=>[I(y(W))]),_:1})])]),_:1}),I(y(G),{class:`order-3`,align:`left`,type:`solid`},{default:l(()=>[L(`div`,ut,[L(`span`,null,R(y(n)(`recomended.description`)),1),I(y(K),{multiple:``,modelValue:m.value,"onUpdate:modelValue":t[2]||=e=>m.value=e,options:y(i).indexedFields,optionLabel:`name`,filter:``,maxSelectedLabels:3,class:`min-w-48`},null,8,[`modelValue`,`options`]),I(y(P),{severity:`secondary`,text:``,onClick:w},{default:l(()=>[I(y(W))]),_:1})])]),_:1}),I(y(G),{class:`order-5`,align:`left`,type:`solid`},{default:l(()=>[L(`div`,dt,[L(`span`,null,R(y(n)(`other.description`)),1),I(y(K),{multiple:``,modelValue:h.value,"onUpdate:modelValue":t[3]||=e=>h.value=e,options:y(i).otherFields,optionLabel:`name`,filter:``,maxSelectedLabels:3,class:`min-w-48`},null,8,[`modelValue`,`options`]),I(y(P),{severity:`secondary`,text:``,onClick:w},{default:l(()=>[I(y(W))]),_:1})])]),_:1})])]),_:1})],64))}});export{ft as default};