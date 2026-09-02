import{$t as e,An as t,Cn as n,Mn as r,Nn as i,Qn as a,Qt as o,Sn as s,Tn as c,Un as l,Zn as u,Zt as d,bn as f,cn as p,en as m,er as ee,f as h,gn as g,hn as _,in as v,kn as y,mn as b,n as x,nn as S,rn as C,sn as w,tn as T,tr as E,u as D}from"./vue-i18n-Dd-f5b4D.js";import{E as O,N as k,T as A,f as j,n as M}from"./index-DKsWvM-0.js";import{t as N}from"./phone.utils-D-e8CMam.js";var P=h.extend({name:`floatlabel`,style:`
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
`,classes:{root:function(e){var t=e.props;return[`p-floatlabel`,{"p-floatlabel-over":t.variant===`over`,"p-floatlabel-on":t.variant===`on`,"p-floatlabel-in":t.variant===`in`}]}}}),F={name:`FloatLabel`,extends:{name:`BaseFloatLabel`,extends:D,props:{variant:{type:String,default:`over`}},style:P,provide:function(){return{$pcFloatLabel:this,$parentInstance:this}}},inheritAttrs:!1};function I(e,t,r,i,a,o){return f(),v(`span`,_({class:e.cx(`root`)},e.ptmi(`root`)),[n(e.$slots,`default`)],16)}F.render=I;var L=M(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),R={for:`phone`},z=[`data-index`,`onClick`,`onMouseenter`],B={key:0,class:`text-xs text-gray-500`},V=p({__name:`inputPhone`,props:b({disabled:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},suggestions:{},tabindex:{}},{phone:{required:!0},phoneModifiers:{}}),emits:b([`select`,`search`],[`update:phone`]),setup(n,{emit:p}){let h=n,_=y(n,`phone`),b=p,{t:D}=x(),M={mask:`+99 9 99 99 99 99`,slotChar:` `},P=l(null),I=l(null),V=l(!1),H=l(-1),U=l({top:`0px`,left:`0px`,width:`0px`,position:`fixed`}),W=e=>(e??``).replace(/\D/g,``),G=e=>W(N(W(e)));function K(e){let t=G(e);return t.startsWith(`33`)&&t.length===11?`+33 ${t[2]} ${t.slice(3,5)} ${t.slice(5,7)} ${t.slice(7,9)} ${t.slice(9,11)}`:e}let q=m(()=>{if(!h.suggestions?.length)return[];let e=G(_.value);return e?h.suggestions.filter(t=>G(t.value).includes(e)):[...h.suggestions]}),J=W(_.value);function Y(){let e=P.value?.querySelector(`input`);if(!e)return;let t=e.getBoundingClientRect();U.value={top:`${t.bottom+4}px`,left:`${t.left}px`,width:`${t.width}px`,position:`fixed`}}let X,Z;t(V,e=>{e?(Y(),X=j(window,`scroll`,Y,!0),Z=j(window,`resize`,Y)):(X?.(),Z?.(),X=void 0,Z=void 0)});function Q(){g(()=>{if(H.value<0||!I.value)return;let e=I.value,t=e.querySelector(`[data-index="${H.value}"]`);t&&(t.offsetTop<e.scrollTop?e.scrollTop=t.offsetTop:t.offsetTop+t.offsetHeight>e.scrollTop+e.clientHeight&&(e.scrollTop=t.offsetTop-e.clientHeight+t.offsetHeight))})}function te(){V.value=!0,H.value=-1}function ne(){g(()=>{let e=P.value?.querySelector(`input`);if(!e)return;let t=e.value.replace(/[\s-]+$/,``);e.setSelectionRange(t.length,t.length)})}function re(e){let t=W(e.target.value);V.value=!0,H.value=-1;let n=t;if(t.startsWith(`0`)){let e=N(t);n=W(e),_.value=e,ne()}n!==J&&(J=n,b(`search`,n)),Y()}function ie(){let e=W(_.value);if(!e)return;let t=N(e);t!==_.value&&(_.value=t)}function ae(){V.value=!1,H.value=-1,ie()}function $(e){_.value=N(e.value),H.value=-1,V.value=!1,b(`select`,e.value)}function oe(e){let t=q.value,n=t.length>0;e.key===`ArrowDown`&&n?(e.preventDefault(),e.stopPropagation(),V.value=!0,H.value=H.value>=t.length-1?t.length-1:H.value+1,Q()):e.key===`ArrowUp`&&n?(e.preventDefault(),e.stopPropagation(),H.value=H.value<=0?0:H.value-1,Q()):e.key===`Enter`&&V.value&&n?(e.preventDefault(),e.stopPropagation(),$(t[H.value>=0?H.value:0])):e.key===`Escape`&&V.value&&(e.preventDefault(),e.stopPropagation(),V.value=!1,H.value=-1)}return t(q,e=>{H.value>=e.length&&(H.value=e.length-1)}),(t,n)=>{let l=c(`mask`);return f(),v(`div`,{ref_key:`rootEl`,ref:P,onKeydownCapture:oe},[w(u(F),{variant:`on`},{default:r(()=>[w(u(O),null,{default:r(()=>[w(u(A),null,{default:r(()=>[w(u(L),{size:15})]),_:1}),i(w(u(k),{type:`tel`,modelValue:_.value,"onUpdate:modelValue":n[0]||=e=>_.value=e,inputmode:`numeric`,disabled:h.disabled,invalid:h.invalid,tabindex:h.tabindex,fluid:``,onFocus:te,onInput:re,onBlur:ae},null,8,[`modelValue`,`disabled`,`invalid`,`tabindex`]),[[l,M]])]),_:1}),T(`label`,R,E(u(D)(`input.phone`)),1)]),_:1}),(f(),S(e,{to:`body`},[V.value&&q.value.length>0?(f(),v(`div`,{key:0,ref_key:`panelRef`,ref:I,style:ee(U.value),class:`z-50 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg`},[(f(!0),v(o,null,s(q.value,(e,t)=>(f(),v(`button`,{key:e.value,type:`button`,"data-index":t,class:a([`flex w-full cursor-pointer flex-col gap-0.5 px-3 py-2 text-left text-sm text-gray-800`,`hover:bg-gray-100`,H.value===t&&`bg-gray-100`]),onMousedown:n[1]||=d(()=>{},[`prevent`]),onClick:t=>$(e),onMouseenter:e=>H.value=t},[T(`span`,null,E(K(e.value)),1),e.detail?(f(),v(`span`,B,E(e.detail),1)):C(``,!0)],42,z))),128))],4)):C(``,!0)]))],544)}}});export{F as n,V as t};