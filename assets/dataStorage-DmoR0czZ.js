import{An as e,Dr as t,Ii as n,Mn as r,Nn as i,Pr as a,c as o,o as s,pr as c}from"./spinner-L991b5nZ.js";var l={name:`Card`,extends:{name:`BaseCard`,extends:s,style:o.extend({name:`card`,style:`
    .p-card {
        display: block;
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
        font-size: dt('card.subtitle.font.size');
        font-weight: dt('card.subtitle.font.weight');
    }
`,classes:{root:`p-card p-component`,header:`p-card-header`,body:`p-card-body`,caption:`p-card-caption`,title:`p-card-title`,subtitle:`p-card-subtitle`,content:`p-card-content`,footer:`p-card-footer`}}),provide:function(){return{$pcCard:this,$parentInstance:this}}},inheritAttrs:!1};function u(n,o,s,l,u,d){return t(),i(`div`,c({class:n.cx(`root`)},n.ptmi(`root`)),[n.$slots.header?(t(),i(`div`,c({key:0,class:n.cx(`header`)},n.ptm(`header`)),[a(n.$slots,`header`)],16)):r(``,!0),e(`div`,c({class:n.cx(`body`)},n.ptm(`body`)),[n.$slots.title||n.$slots.subtitle?(t(),i(`div`,c({key:0,class:n.cx(`caption`)},n.ptm(`caption`)),[n.$slots.title?(t(),i(`div`,c({key:0,class:n.cx(`title`)},n.ptm(`title`)),[a(n.$slots,`title`)],16)):r(``,!0),n.$slots.subtitle?(t(),i(`div`,c({key:1,class:n.cx(`subtitle`)},n.ptm(`subtitle`)),[a(n.$slots,`subtitle`)],16)):r(``,!0)],16)):r(``,!0),e(`div`,c({class:n.cx(`content`)},n.ptm(`content`)),[a(n.$slots,`content`)],16),n.$slots.footer?(t(),i(`div`,c({key:1,class:n.cx(`footer`)},n.ptm(`footer`)),[a(n.$slots,`footer`)],16)):r(``,!0)],16)],16)}l.render=u;var d=[],f=[],p=[];function m(e){let t=n(e);if(Array.isArray(t))return t.map(e=>m(e));if(typeof t==`object`&&t){let e={};for(let n of Object.keys(t))e[n]=m(t[n]);return e}return t}var h={setArray(e,t){if(!Array.isArray(e)||!Array.isArray(t)){console.error(`Invalid data format: newData and newType must be arrays.`,{newData:e,newType:t});return}d=m(e),f=m(t)},setEdit(e){p=m(e)},getValue(){return d},getType(){return f},clear(){d=[],f=[],p=[]},getEdit(){return p}};export{l as n,h as t};