(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{628:function(e,t,n){var content=n(629);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(19).default)("1377ef10",content,!0,{sourceMap:!1})},629:function(e,t,n){var r=n(18)((function(i){return i[1]}));r.push([e.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""]),r.locals={},e.exports=r},641:function(e,t,n){"use strict";n(10),n(13),n(16),n(11),n(17);var r=n(3),o=(n(73),n(5),n(12),n(67),n(117),n(223),n(41),n(65),n(628),n(634)),l=n(636),c=n(89),h=n(0);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function m(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=m(m({},o.b),{},{offsetY:!0,offsetOverflow:!0,transition:!1});t.a=o.a.extend({name:"v-autocomplete",props:{autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(e,t,n){return n.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:o.a.options.props.menuProps.type,default:function(){return f}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return m(m({},o.a.options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var e=this;return this.selectedItems.map((function(t){return e.getValue(t)}))},hasDisplayedItems:function(){var e=this;return this.hideSelected?this.filteredItems.some((function(t){return!e.hasItem(t)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var e=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(t){var n=Object(h.r)(t,e.itemText),text=null!=n?String(n):"";return e.filter(t,String(e.internalSearch),text)}))},internalSearch:{get:function(){return this.lazySearch},set:function(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var e=o.a.options.computed.$_menuProps.call(this);return e.contentClass="v-autocomplete__content ".concat(e.contentClass||"").trim(),m(m({},f),e)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var e=this;return this.multiple?null:this.selectedItems.find((function(i){return e.valueComparator(e.getValue(i),e.getValue(e.internalValue))}))},listData:function(){var data=o.a.options.computed.listData.call(this);return data.props=m(m({},data.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive:function(e){!e&&this.hasSlot&&(this.lazySearch=null)},items:function(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput:function(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(e,t){var n=this;if(e!==t){if(!this.autoSelectFirst){var r=t[this.$refs.menu.listIndex];r?this.setMenuIndex(e.findIndex((function(i){return i===r}))):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick((function(){n.internalSearch&&(1===e.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.autoSelectFirst&&e.length&&(n.setMenuIndex(0),n.$emit("update:list-index",n.$refs.menu.listIndex)))}))}},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(e){this.searchIsDirty||(this.multiple&&e===h.x.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===h.x.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==h.x.backspace&&e!==h.x.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var e=this.selectedIndex,t=this.selectedItems[e];if(this.isInteractive&&!this.getDisabled(t)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var r=e!==this.selectedItems.length-1?e:e-1;this.selectedItems[r]?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=r}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=null,o.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=l.a.options.methods.genInput.call(this);return input.data=Object(c.a)(input.data,{attrs:{"aria-activedescendant":Object(h.p)(this.$refs.menu,"activeTile.id"),autocomplete:Object(h.p)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=o.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?o.a.options.methods.genSelections.call(this):[]},onClick:function(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput:function(e){if(!(this.selectedIndex>-1)&&e.target){var t=e.target,n=t.value;t.value&&this.activateMenu(),this.multiple||""!==n||this.deleteCurrentItem(),this.internalSearch=n,this.badInput=t.validity&&t.validity.badInput}},onKeyDown:function(e){var t=e.keyCode;!e.ctrlKey&&[h.x.home,h.x.end].includes(t)||o.a.options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown:function(e){},onTabDown:function(e){o.a.options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown:function(e){e.preventDefault(),this.activateMenu()},selectItem:function(e){o.a.options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems:function(){o.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var e=this;this.$nextTick((function(){e.multiple&&e.internalSearch&&e.isMenuActive||(e.internalSearch=!e.selectedItems.length||e.multiple||e.hasSlot?null:e.getText(e.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy:function(e){var t,n;if(-1!==this.selectedIndex){var r=this.selectedItems[this.selectedIndex],o=this.getText(r);null===(t=e.clipboardData)||void 0===t||t.setData("text/plain",o),null===(n=e.clipboardData)||void 0===n||n.setData("text/vnd.vuetify.autocomplete.item+plain",o),e.preventDefault()}}}})},667:function(e,t,n){var content=n(738);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(19).default)("ff9316b4",content,!0,{sourceMap:!1})},737:function(e,t,n){"use strict";n(667)},738:function(e,t,n){var r=n(18)((function(i){return i[1]}));r.push([e.i,".v-card--reveal{bottom:0;opacity:1!important;position:absolute;width:100%}",""]),r.locals={},e.exports=r},775:function(e,t,n){"use strict";n.r(t);var r=n(641),o=n(232),l=n(215),c=n(180),h=n(757),d=n(621),m=n(639),f=n(756),v=n(616),x=n(636),I=n(24),S=(n(79),n(1),{props:["item","isEditUser","open"],data:function(){return{senhaCompare:null,status:[{id:1,descri:"ATIVO"},{id:2,descri:"INATIVO"}],formErros:{login:null,senha:null,nivel:null}}},methods:{corStatus:function(e){return 1==e?"green--text":2==e?"red--text":void 0},formValido:function(){var e,t,n,r,o,l,c,h="Preencha este campo!",d="Preencha com o min. de ",m=null;return this.formErros.login="",this.formErros.senha="",null!==(e=this.item)&&void 0!==e&&e.login||(this.formErros.login=h,m++),""===this.item.senha&&(this.item.senha=null),null!==(t=this.item)&&void 0!==t&&t.senha||this.isEditUser||(this.formErros.senha=h,m++),(null===(n=this.item)||void 0===n||null===(r=n.login)||void 0===r?void 0:r.length)<6&&(this.formErros.login=d+"6 caracteres",m++),(null===(o=this.item)||void 0===o||null===(l=o.senha)||void 0===l?void 0:l.length)<6?(this.formErros.senha=d+"6 caracteres",m++):(null===(c=this.item)||void 0===c?void 0:c.senha)!==this.senhaCompare&&(this.formErros.senha="As senhas estão diferentes",m++),!m},salvarItem:function(e){var t=this;return Object(I.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,!t.formValido();case 2:if(!n.sent){n.next=4;break}return n.abrupt("return");case 4:t.isEditUser?t.updateItem(e):t.createItem(e);case 5:case"end":return n.stop()}}),n)})))()},createItem:function(e){var t=this;return Object(I.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,delete e.id,n.next=4,t.$axios.$post("/usuario",e);case 4:n.sent,t.exibSnack("Registro salvo com sucesso!","success"),t.$emit("atualizaUser",e),t.$emit("close"),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(0),t.exibSnack("Não foi possível salvar o registro! Verifique os dados e tente novamente","error"),console.log(n.t0);case 14:case"end":return n.stop()}}),n,null,[[0,10]])})))()},updateItem:function(e){var t=this;return Object(I.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$axios.$put("/usuario/".concat(e.id),e);case 3:n.sent,t.exibSnack("Registro salvo com sucesso!","success"),t.$emit("atualizaUser",e),t.$emit("close"),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),t.exibSnack("Não foi possível salvar o registro! Verifique os dados e tente novamente","error"),console.log(n.t0);case 13:case"end":return n.stop()}}),n,null,[[0,9]])})))()},cancelarRegistro:function(){this.$emit("close")},deleteItem:function(e){var t=this;return Object(I.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$axios.$delete("/pessoa/".concat(e.id));case 3:t.$emit("atualizarListagem"),t.$emit("close"),t.exibSnack("Registro exluído com sucesso!","success"),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),t.exibSnack("Não foi possível excluir o registro!","error"),console.log(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},exibSnack:function(e,t){this.$emit("exibSnack",e,t)}}}),y=(n(737),n(58)),component=Object(y.a)(S,(function(){var e=this,t=e._self._c;return t(m.a,{attrs:{persistent:""},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[t(l.a,[t(c.c,[e._v("Cadastro de endereços")]),e._v(" "),t(c.b,[t(d.a,[t(f.a,[t(h.a,{attrs:{cols:"12",sm:"4"}},[t(x.a,{attrs:{label:"Login",outlined:"",dense:"","error-messages":e.formErros.login,required:""},model:{value:e.item.login,callback:function(t){e.$set(e.item,"login",t)},expression:"item.login"}})],1),e._v(" "),t(h.a,{attrs:{cols:"12",sm:"4"}},[t(x.a,{attrs:{type:"password",label:"Senha",outlined:"",dense:"","error-messages":e.formErros.senha,required:""},model:{value:e.item.senha,callback:function(t){e.$set(e.item,"senha",t)},expression:"item.senha"}})],1),e._v(" "),t(h.a,{attrs:{cols:"12",sm:"4"}},[t(x.a,{attrs:{type:"password",label:"Repetir Senha",outlined:"",dense:"","error-messages":e.formErros.senha,required:""},model:{value:e.senhaCompare,callback:function(t){e.senhaCompare=t},expression:"senhaCompare"}})],1),e._v(" "),t(h.a,{attrs:{cols:"12",sm:"6",md:"3"}},[t(r.a,{attrs:{label:"Status",outlined:"","auto-select-first":"",dense:"",items:e.status,"item-text":function(e){return e.descri},"item-value":function(e){return e.id}},scopedSlots:e._u([{key:"item",fn:function(n){var r=n.item;return[t("span",{class:e.corStatus(r.id)},[e._v("\n                                    "+e._s(r.descri)+"\n                                ")])]}},{key:"selection",fn:function(n){var r=n.item;return[t("span",{class:e.corStatus(r.id)},[e._v("\n                                    "+e._s(r.descri)+"\n                                ")])]}}]),model:{value:e.item.ativo_status_id,callback:function(t){e.$set(e.item,"ativo_status_id",t)},expression:"item.ativo_status_id"}})],1)],1)],1),e._v(" "),t("pre",[e._v(e._s(e.item))])],1),e._v(" "),t(c.a,[t(v.a),e._v(" "),t(o.a,{attrs:{color:"success",elevation:"2",outlined:"",dense:""},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.salvarItem(e.item)}}},[e._v("Salvar\n            ")]),e._v(" "),t(o.a,{attrs:{color:"secondary",elevation:"2",outlined:"",dense:""},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.cancelarRegistro.apply(null,arguments)}}},[e._v("\n                Cancelar")]),e._v(" "),t(v.a)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);