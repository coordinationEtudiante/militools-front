import{An as e,Bn as t,Cn as n,Dr as r,Hn as i,Ir as a,Jr as o,Ki as s,Mn as c,Nn as l,Nr as u,Pr as d,Vi as f,Wi as p,c as m,ci as h,fr as g,ji as _,jn as ee,kn as v,mr as y,o as b,oi as x,pn as S,pr as C,qi as w,ti as T,yn as E}from"./spinner-L991b5nZ.js";import{n as te}from"./vue-i18n-DJKM_I7F.js";import{r as D}from"./dist-Wb047DbU.js";import{t as O}from"./inputtext-BVX2KqQg.js";import{t as k}from"./createLucideIcon-JAs-r5w4.js";import{f as A,p as j}from"./index-C027ASB8.js";import{t as M}from"./phone.utils-D-e8CMam.js";var N=m.extend({name:`floatlabel`,style:`
    .p-floatlabel {
        display: block;
        position: relative;
    }

    .p-floatlabel label {
        position: absolute;
        pointer-events: none;
        top: 50%;
        transform: translateY(-50%);
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
        font-size: dt('floatlabel.font.size');
        font-weight: dt('floatlabel.font.weight');
        inset-inline-start: dt('floatlabel.position.x');
        color: dt('floatlabel.color');
        transition-duration: dt('floatlabel.transition.duration');
    }

    .p-floatlabel:has(.p-textarea) label {
        top: dt('floatlabel.position.y');
        transform: translateY(0);
    }

    .p-floatlabel:has(.p-inputicon:first-child) label {
        inset-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label,
    .p-floatlabel:has(input[placeholder]) label,
    .p-floatlabel:has(textarea[placeholder]) label {
        top: dt('floatlabel.over.active.top');
        transform: translateY(0);
        font-size: dt('floatlabel.active.font.size');
        font-weight: dt('floatlabel.active.font.weight');
    }

    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label {
        color: dt('floatlabel.active.color');
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label {
        color: dt('floatlabel.focus.color');
    }

    .p-floatlabel-in .p-inputtext,
    .p-floatlabel-in .p-textarea,
    .p-floatlabel-in .p-select-label,
    .p-floatlabel-in .p-multiselect-label,
    .p-floatlabel-in .p-multiselect-label:has(.p-chip),
    .p-floatlabel-in .p-autocomplete-input-multiple,
    .p-floatlabel-in .p-cascadeselect-label,
    .p-floatlabel-in .p-treeselect-label {
        padding-block-start: dt('floatlabel.in.input.padding.top');
        padding-block-end: dt('floatlabel.in.input.padding.bottom');
    }

    .p-floatlabel-in:has(input:focus) label,
    .p-floatlabel-in:has(input.p-filled) label,
    .p-floatlabel-in:has(input:-webkit-autofill) label,
    .p-floatlabel-in:has(textarea:focus) label,
    .p-floatlabel-in:has(textarea.p-filled) label,
    .p-floatlabel-in:has(.p-inputwrapper-focus) label,
    .p-floatlabel-in:has(.p-inputwrapper-filled) label,
    .p-floatlabel-in:has(input[placeholder]) label,
    .p-floatlabel-in:has(textarea[placeholder]) label {
        top: dt('floatlabel.in.active.top');
    }

    .p-floatlabel-on:has(input:focus) label,
    .p-floatlabel-on:has(input.p-filled) label,
    .p-floatlabel-on:has(input:-webkit-autofill) label,
    .p-floatlabel-on:has(textarea:focus) label,
    .p-floatlabel-on:has(textarea.p-filled) label,
    .p-floatlabel-on:has(.p-inputwrapper-focus) label,
    .p-floatlabel-on:has(.p-inputwrapper-filled) label,
    .p-floatlabel-on:has(input[placeholder]) label,
    .p-floatlabel-on:has(textarea[placeholder]) label {
        top: 0;
        transform: translateY(-50%);
        border-radius: dt('floatlabel.on.border.radius');
        background: dt('floatlabel.on.active.background');
        padding: dt('floatlabel.on.active.padding');
    }

    .p-floatlabel:has([class^='p-'][class$='-fluid']) {
        width: 100%;
    }

    .p-floatlabel:has(.p-invalid) label {
        color: dt('floatlabel.invalid.color');
    }
`,classes:{root:function(e){var t=e.props;return[`p-floatlabel`,{"p-floatlabel-over":t.variant===`over`,"p-floatlabel-on":t.variant===`on`,"p-floatlabel-in":t.variant===`in`}]}}}),P={name:`FloatLabel`,extends:{name:`BaseFloatLabel`,extends:b,props:{variant:{type:String,default:`over`}},style:N,provide:function(){return{$pcFloatLabel:this,$parentInstance:this}}},inheritAttrs:!1};function F(e,t,n,i,a,o){return r(),l(`span`,C({class:e.cx(`root`)},e.ptmi(`root`)),[d(e.$slots,`default`)],16)}P.render=F;var I=k(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),L={for:`phone`},R=[`data-index`,`onClick`,`onMouseenter`],z={key:0,class:`text-xs text-gray-500`},B=i({__name:`inputPhone`,props:g({disabled:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},suggestions:{},tabindex:{}},{phone:{required:!0},phoneModifiers:{}}),emits:g([`select`,`search`],[`update:phone`]),setup(i,{emit:d}){let m=i,g=o(i,`phone`),b=d,{t:C}=te(),k={mask:`+99 9 99 99 99 99`,slotChar:` `},N=_(null),F=_(null),B=_(!1),V=_(-1),H=_({top:`0px`,left:`0px`,width:`0px`,position:`fixed`}),U=e=>(e??``).replace(/\D/g,``),W=e=>U(M(U(e)));function G(e){let t=W(e);return t.startsWith(`33`)&&t.length===11?`+33 ${t[2]} ${t.slice(3,5)} ${t.slice(5,7)} ${t.slice(7,9)} ${t.slice(9,11)}`:e}let K=v(()=>{if(!m.suggestions?.length)return[];let e=W(g.value);return e?m.suggestions.filter(t=>W(t.value).includes(e)):[...m.suggestions]}),q=U(g.value);function J(){let e=N.value?.querySelector(`input`);if(!e)return;let t=e.getBoundingClientRect();H.value={top:`${t.bottom+4}px`,left:`${t.left}px`,width:`${t.width}px`,position:`fixed`}}let Y,X;T(B,e=>{e?(J(),Y=D(window,`scroll`,J,!0),X=D(window,`resize`,J)):(Y?.(),X?.(),Y=void 0,X=void 0)});function Z(){y(()=>{if(V.value<0||!F.value)return;let e=F.value,t=e.querySelector(`[data-index="${V.value}"]`);t&&(t.offsetTop<e.scrollTop?e.scrollTop=t.offsetTop:t.offsetTop+t.offsetHeight>e.scrollTop+e.clientHeight&&(e.scrollTop=t.offsetTop-e.clientHeight+t.offsetHeight))})}function ne(){B.value=!0,V.value=-1}function re(){y(()=>{let e=N.value?.querySelector(`input`);if(!e)return;let t=e.value.replace(/[\s-]+$/,``);e.setSelectionRange(t.length,t.length)})}function Q(e){let t=U(e.target.value);B.value=!0,V.value=-1;let n=t;if(t.startsWith(`0`)){let e=M(t);n=U(e),g.value=e,re()}n!==q&&(q=n,b(`search`,n)),J()}function ie(){let e=U(g.value);if(!e)return;let t=M(e);t!==g.value&&(g.value=t)}function ae(){B.value=!1,V.value=-1,ie()}function $(e){g.value=M(e.value),V.value=-1,B.value=!1,b(`select`,e.value)}function oe(e){let t=K.value,n=t.length>0;e.key===`ArrowDown`&&n?(e.preventDefault(),e.stopPropagation(),B.value=!0,V.value=V.value>=t.length-1?t.length-1:V.value+1,Z()):e.key===`ArrowUp`&&n?(e.preventDefault(),e.stopPropagation(),V.value=V.value<=0?0:V.value-1,Z()):e.key===`Enter`&&B.value&&n?(e.preventDefault(),e.stopPropagation(),$(t[V.value>=0?V.value:0])):e.key===`Escape`&&B.value&&(e.preventDefault(),e.stopPropagation(),B.value=!1,V.value=-1)}return T(K,e=>{V.value>=e.length&&(V.value=e.length-1)}),(i,o)=>{let d=a(`mask`);return r(),l(`div`,{ref_key:`rootEl`,ref:N,onKeydownCapture:oe},[t(f(P),{variant:`on`},{default:x(()=>[t(f(j),null,{default:x(()=>[t(f(A),null,{default:x(()=>[t(f(I),{size:15})]),_:1}),h(t(f(O),{type:`tel`,modelValue:g.value,"onUpdate:modelValue":o[0]||=e=>g.value=e,inputmode:`numeric`,disabled:m.disabled,invalid:m.invalid,tabindex:m.tabindex,fluid:``,onFocus:ne,onInput:Q,onBlur:ae},null,8,[`modelValue`,`disabled`,`invalid`,`tabindex`]),[[d,k]])]),_:1}),e(`label`,L,w(f(C)(`input.phone`)),1)]),_:1}),(r(),ee(n,{to:`body`},[B.value&&K.value.length>0?(r(),l(`div`,{key:0,ref_key:`panelRef`,ref:F,style:s(H.value),class:`z-50 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg`},[(r(!0),l(E,null,u(K.value,(t,n)=>(r(),l(`button`,{key:t.value,type:`button`,"data-index":n,class:p([`flex w-full cursor-pointer flex-col gap-0.5 px-3 py-2 text-left text-sm text-gray-800`,`hover:bg-gray-100`,V.value===n&&`bg-gray-100`]),onMousedown:o[1]||=S(()=>{},[`prevent`]),onClick:e=>$(t),onMouseenter:e=>V.value=n},[e(`span`,null,w(G(t.value)),1),t.detail?(r(),l(`span`,z,w(t.detail),1)):c(``,!0)],42,R))),128))],4)):c(``,!0)]))],544)}}});export{P as n,B as t};