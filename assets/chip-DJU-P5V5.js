import{Cn as e,En as t,Tt as n,bn as r,f as i,hn as a,in as o,nn as s,rn as c,tr as l,u}from"./vue-i18n-Dd-f5b4D.js";import{t as d}from"./times-circle-C2qDb05o.js";var f=i.extend({name:`chip`,style:`
    .p-chip {
        display: inline-flex;
        align-items: center;
        background: dt('chip.background');
        color: dt('chip.color');
        border-radius: dt('chip.border.radius');
        padding-block: dt('chip.padding.y');
        padding-inline: dt('chip.padding.x');
        gap: dt('chip.gap');
    }
    
    .p-chip.p-focus {
        background: dt('chip.focus.background');
    }

    .p-chip-icon {
        color: dt('chip.icon.color');
        font-size: dt('chip.icon.size');
        width: dt('chip.icon.size');
        height: dt('chip.icon.size');
        flex-shrink: 0;
    }

    .p-chip-image {
        border-radius: 50%;
        width: dt('chip.image.width');
        height: dt('chip.image.height');
        margin-inline-start: calc(-1 * dt('chip.padding.y'));
        flex-shrink: 0;
    }

    .p-chip-label {
        font-weight: dt('chip.label.font.weight');
        font-size: dt('chip.label.font.size');
    }

    .p-chip:has(.p-chip-remove-icon) {
        padding-inline-end: dt('chip.padding.y');
    }

    .p-chip:has(.p-chip-image) {
        padding-block-start: calc(dt('chip.padding.y') / 2);
        padding-block-end: calc(dt('chip.padding.y') / 2);
    }

    .p-chip-remove-icon {
        cursor: pointer;
        font-size: dt('chip.remove.icon.size');
        width: dt('chip.remove.icon.size');
        height: dt('chip.remove.icon.size');
        color: dt('chip.remove.icon.color');
        border-radius: 50%;
        transition:
            outline-color dt('chip.transition.duration'),
            box-shadow dt('chip.transition.duration');
        outline-color: transparent;
    }

    .p-chip-remove-icon:focus-visible {
        box-shadow: dt('chip.remove.icon.focus.ring.shadow');
        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');
        outline-offset: dt('chip.remove.icon.focus.ring.offset');
    }
`,classes:{root:`p-chip p-component`,image:`p-chip-image`,icon:`p-chip-icon`,label:`p-chip-label`,removeIcon:`p-chip-remove-icon`}}),p={name:`Chip`,extends:{name:`BaseChip`,extends:u,props:{label:{type:[String,Number],default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:void 0}},style:f,provide:function(){return{$pcChip:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`remove`],data:function(){return{visible:!0}},methods:{onKeydown:function(e){(e.key===`Enter`||e.key===`Backspace`)&&this.close(e)},close:function(e){this.visible=!1,this.$emit(`remove`,e)}},computed:{dataP:function(){return n({removable:this.removable})}},components:{TimesCircle:d}},m=[`data-p`],h=[`src`];function g(n,i,u,d,f,p){return f.visible?(r(),o(`div`,a({key:0,class:n.cx(`root`)},n.ptmi(`root`),{"data-p":p.dataP}),[e(n.$slots,`default`,{},function(){return[n.image?(r(),o(`img`,a({key:0,src:n.image},n.ptm(`image`),{class:n.cx(`image`)}),null,16,h)):n.$slots.icon?(r(),s(t(n.$slots.icon),a({key:1,class:n.cx(`icon`)},n.ptm(`icon`)),null,16,[`class`])):n.icon?(r(),o(`span`,a({key:2,class:[n.cx(`icon`),n.icon]},n.ptm(`icon`)),null,16)):c(``,!0),n.label===null?c(``,!0):(r(),o(`div`,a({key:3,class:n.cx(`label`)},n.ptm(`label`)),l(n.label),17))]}),n.removable?e(n.$slots,`removeicon`,{key:0,removeCallback:p.close,keydownCallback:p.onKeydown},function(){return[(r(),s(t(n.removeIcon?`span`:`TimesCircle`),a({class:[n.cx(`removeIcon`),n.removeIcon],onClick:p.close,onKeydown:p.onKeydown},n.ptm(`removeIcon`)),null,16,[`class`,`onClick`,`onKeydown`]))]}):c(``,!0)],16,m)):c(``,!0)}p.render=g;export{p as t};