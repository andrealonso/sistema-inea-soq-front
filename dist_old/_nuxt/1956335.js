(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{624:function(t,e,n){"use strict";n.r(e);var o=n(215),r=n(180),c=n(639),l=n(216),d={props:["isLoading","texto","cor"]},v=n(58),component=Object(v.a)(d,(function(){var t=this,e=t._self._c;return e(c.a,{attrs:{scrim:!1,persistent:"",width:"auto"},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[e(o.a,{attrs:{color:t.cor||"primary"}},[e(r.b,[e("span",{staticClass:"white--text"},[t._v(t._s(t.texto))]),t._v(" "),e(l.a,{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},685:function(t,e,n){var content=n(686);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("53887fd2",content,!0,{sourceMap:!1})},686:function(t,e,n){var o=n(18)((function(i){return i[1]}));o.push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);border-radius:4px;color:#fff;display:inline-block;font-size:14px;line-height:22px;opacity:0;padding:5px 16px;pointer-events:none;position:absolute;text-transform:none;width:auto}.v-tooltip__content.menuable__content__active{opacity:.9}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}",""]),o.locals={},t.exports=o},760:function(t,e,n){"use strict";n.r(e);var o=n(232),r=n(215),c=n(180),l=n(757),d=n(621),v=n(759),f=n(663),m=n(212),_=n(756),h=n(616),x=n(3),y=(n(20),n(685),n(119)),k=n(30),C=n(170),O=n(144),w=n(214),D=n(0),L=n(8),S=n(7),j=Object(S.a)(k.a,C.a,O.a,w.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||n?r=o+e.width/2-content.width/2:(this.left||this.right)&&(r=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=n+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),!1===this.attach&&(o+=this.pageYOffset),"".concat(this.calcYOverflow(o),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(D.h)(this.maxWidth),minWidth:Object(D.h)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(D.t)(this,"activator",!0)&&Object(L.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=y.a.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")}),e.keydown=function(e){e.keyCode===D.x.esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(x.a)(t,this.contentClass,!0),Object(x.a)(t,"menuable__content__active",this.isActive),Object(x.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}}),Y=(n(27),n(225),n(10),n(13),n(12),n(5),n(16),n(11),n(17),n(24));n(79),n(1);function A(t){return null!=t&&t.id?{id:t.id,data_inicio:t.data_inicio||null,data_fim:t.data_fim||null,talhao:t.talhao||null,area_queima:t.area_queima||null,ordem_corte_interna:t.ordem_corte_interna||null,obs:t.obs||null,propriedades_id:t.propriedades_id||null,empresas_id:t.empresas_id||!1,user_id:t.user_id||null}:{id:null,data_inicio:null,data_fim:null,talhao:null,area_queima:null,ordem_corte_interna:null,obs:null,propriedades_id:null,empresas_id:!1,user_id:null}}var I=n(1),F=n.n(I);function z(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function E(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?z(Object(source),!0).forEach((function(e){Object(x.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):z(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var M={asyncData:function(t){return Object(Y.a)(regeneratorRuntime.mark((function e(){var n,o,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$axios,o=[],e.prev=2,delete(r={aplicado:!1,propriedades_id:null,empresas_id:null,data_inicio:F.a.utc().startOf("month").format("YYYY-MM-DD"),data_fim:F.a.utc().endOf("month").format("YYYY-MM-DD")}).aplicado,e.next=7,n.$post("/agendamentos/filtrar",E({},r));case 7:return c=e.sent,o=null!=c&&c.erro?[]:c.dados,e.abrupt("return",{listagem:o});case 12:return e.prev=12,e.t0=e.catch(2),console.log(e.t0),e.abrupt("return",{listagem:o});case 16:case"end":return e.stop()}}),e,null,[[2,12]])})))()},name:"propriedades",data:function(){return{filtro:{aplicado:!1,propriedades_id:null,empresas_id:null,data_inicio:F()().startOf("month").format("YYYY-MM-DD"),data_fim:F()().endOf("month").format("YYYY-MM-DD")},itemSelect:null,dlgConfirme:!1,exibCadastro:!1,exibFiltro:!1,isEdit:!1,isLoading:!1,search:"",listaSelecao:{},headers:[{text:"Código",value:"id",align:"left",margin:"12px"},{text:"Propriedade",value:"propriedades.nome",align:"left",margin:"12px"},{text:"Área",value:"area_queima",align:"left"},{text:"Talhão",value:"talhao.nome",align:"center"},{text:"Data do início",value:"data_inicio",align:"center"},{text:"Data do fim",value:"data_fim",align:"center"},{text:"Empresa",value:"empresas.nome",align:"center"},{text:"Ações",value:"actions",sortable:!1,align:"right"}],exibLista:!0,payload:A(),snack:{active:!1,text:"teste",timeout:2e3,color:"primary"}}},computed:{computedDataInicio:function(){return F.a.locale("pt-br"),this.dataInicio?F()(this.dataInicio).format("L"):""},computedDataFim:function(){return F.a.locale("pt-br"),this.dataFim?F()(this.dataFim).format("L"):""}},filters:{zeroLeft:function(t){return t.toLocaleString("en-US",{minimumIntegerDigits:6,useGrouping:!1})},formatData:function(data){return F.a.utc(data).format("DD/MM/YYYY")}},methods:{corStatus:function(t){return 1==t?"green--text":2==t?"red--text":void 0},novoItem:function(){var t=this;return Object(Y.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("/agendamento/0");case 2:n=e.sent,o=n.empresas,r=n.propriedades,t.listaSelecao={empresas:o,propriedades:r},t.payload=A(),t.isEdit=!1,t.exibCadastro=!0;case 9:case"end":return e.stop()}}),e)})))()},exibSnack:function(t,e){this.snack.color=e||"",this.snack.text=t||"",this.snack.active=!0},confirmeExclusao:function(t){this.itemSelect=t,this.dlgConfirme=!0},atualizarListagem:function(){var t=this;return Object(Y.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,delete(r=E({},t.filtro)).aplicado,e.next=5,t.$axios.$post("/agendamentos/filtrar",E({},r));case 5:o=e.sent,t.listagem=o.dados,null!==(n=o)&&void 0!==n&&n.erro?t.listagem=[]:t.listagem=o.dados,e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),t.listagem=[],console.log({error:e.t0});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()},exibirItem:function(t){var e=this;return Object(Y.a)(regeneratorRuntime.mark((function n(){var o,r,c,l,d;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=t.id,n.prev=1,n.next=4,e.$axios.$get("/agendamento/".concat(o));case 4:r=n.sent,c=r.empresas,l=r.propriedades,d=r.agenda,e.listaSelecao={empresas:c,propriedades:l},e.payload=A(d),e.exibCadastro=!0,e.isEdit=!0,n.next=15;break;case 12:n.prev=12,n.t0=n.catch(1),console.log(n.t0);case 15:case"end":return n.stop()}}),n,null,[[1,12]])})))()},cancelar:function(){this.payload=A(),this.exibCadastro=!1},cadFiltro:function(){var t=this;return Object(Y.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("/agendamento/0");case 2:n=e.sent,o=n.empresas,r=n.propriedades,n.agenda,t.listaSelecao={empresas:o,propriedades:r},t.exibFiltro=!0;case 6:case"end":return e.stop()}}),e)})))()}}},T=n(58),component=Object(T.a)(M,(function(){var t=this,e=t._self._c;return e(_.a,{staticClass:"mb-4",attrs:{justify:"center"}},[t.exibLista?e(l.a,{attrs:{cols:"12"}},[e(r.a,{staticClass:"p-3"},[e(c.c,{staticClass:"d-flex justify-center align-start"},[e("h4",[t._v("Lista de Agendamentos")]),t._v(" "),e(h.a),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({staticClass:"black--text",attrs:{icon:""},on:{click:function(e){t.exibLista=!1}}},"v-btn",c,!1),r),[e(m.a,[t._v("mdi-table")])],1)]}}],null,!1,2294276668)},[t._v(" "),e("span",[t._v("Exibir Cartões")])]),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({staticClass:"black--text",attrs:{icon:""},on:{click:t.cadFiltro}},"v-btn",c,!1),r),[e(m.a,[t._v("mdi-filter-variant")])],1)]}}],null,!1,76628044)},[t._v(" "),e("span",[t._v("Filtros")])])],1),t._v(" "),e(v.a,{attrs:{headers:t.headers,items:t.listagem,search:t.search,dense:"","mobile-breakpoint":"400"},scopedSlots:t._u([{key:"item.actions",fn:function(n){var o=n.item;return[e(m.a,{on:{click:function(e){return e.preventDefault(),t.exibirItem(o)}}},[t._v("mdi-pencil")])]}},{key:"item.id",fn:function(e){var n=e.item;return[t._v("\n                    "+t._s(t._f("zeroLeft")(n.id))+"\n                ")]}},{key:"item.data_inicio",fn:function(e){var n=e.item;return[t._v("\n                    "+t._s(t._f("formatData")(n.data_inicio))+"\n                ")]}},{key:"item.data_fim",fn:function(e){var n=e.item;return[t._v("\n                    "+t._s(t._f("formatData")(n.data_fim))+"\n                ")]}}],null,!1,3943871124)})],1)],1):t._e(),t._v(" "),t.exibLista?t._e():e(l.a,{attrs:{cols:"12"}},[e(r.a,{},[e(c.c,[e("h4",[t._v("Lista de Agendamentos")]),t._v(" "),e(h.a),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({staticClass:"black--text",attrs:{icon:""},on:{click:function(e){t.exibLista=!0}}},"v-btn",c,!1),r),[e(m.a,[t._v("mdi-playlist-minus")])],1)]}}],null,!1,2288820750)},[t._v(" "),e("span",[t._v("Exibir lista")])]),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({staticClass:"black--text",attrs:{icon:""},on:{click:t.cadFiltro}},"v-btn",c,!1),r),[e(m.a,[t._v("mdi-filter-variant")])],1)]}}],null,!1,76628044)},[t._v(" "),e("span",[t._v("Filtros")])])],1),t._v(" "),e(c.b,[e(_.a,t._l(t.listagem,(function(n){return e(l.a,{key:n.id,attrs:{cols:"12",md:"4"}},[e(r.a,{staticClass:"d-flex flex-column",attrs:{rounded:"xl","min-height":"270"}},[e(c.c,{staticClass:"d-flex justify-space-between py-1"},[e("h5",[t._v("10/10/2023")]),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({attrs:{icon:"",color:"success",large:""}},"v-btn",c,!1),r),[e(m.a,[t._v("mdi-check-circle")])],1)]}}],null,!0)},[t._v(" "),e("span",[t._v("Confirmar queima")])])],1),t._v(" "),e(f.a),t._v(" "),e(c.b,[e("div",{staticClass:"text-body-2"},[e("strong",[t._v("Código:")]),t._v(" "+t._s(t._f("zeroLeft")(n.id)))]),t._v(" "),e("div",{staticClass:"text-body-2"},[e("strong",[t._v("Propriedade:")]),t._v(" "+t._s(n.propriedades.nome)+"\n                                ")]),t._v(" "),e("div",{staticClass:"text-body-2"},[e("strong",[t._v("Área da queima:")]),t._v(" "+t._s(n.area_queima))]),t._v(" "),e("div",{staticClass:"text-body-2"},[e("strong",[t._v("Talhão:")]),t._v(" "+t._s(n.talhao))]),t._v(" "),e("div",{staticClass:"text-body-2"},[e("strong",[t._v("Proprietario:")]),t._v(" "+t._s(n.propriedades.proprietarios.nome)+"\n                                ")]),t._v(" "),e("div",{staticClass:"text-body-2"},[e("strong",[t._v("Representante:")]),t._v(" "+t._s(n.propriedades.representantes.nome)+"\n                                ")])]),t._v(" "),e(h.a),t._v(" "),e(c.a,{staticClass:"d-flex justify-space-around"},[e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({attrs:{color:"success"},on:{click:function(e){t.exibLista=!0}}},"v-btn",c,!1),r),[e(m.a,[t._v("mdi-alert-plus ")])],1)]}}],null,!0)},[t._v(" "),e("span",[t._v("Adicionar denúncia")])]),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({attrs:{color:"success"},on:{click:function(e){t.exibLista=!0}}},"v-btn",c,!1),r),[e(m.a,[t._v("mdi-eye ")])],1)]}}],null,!0)},[t._v(" "),e("span",[t._v("Visualizar ordem")])]),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(r){var c=r.on,l=r.attrs;return[e(o.a,t._g(t._b({attrs:{color:"success",disabled:!n.propriedades.geolocal,href:n.propriedades.geolocal,target:"_blank"}},"v-btn",l,!1),c),[e(m.a,[t._v("mdi-map-marker-radius-outline\n                                            ")])],1)]}}],null,!0)},[t._v(" "),e("span",[t._v("Mostrar no mapa")])]),t._v(" "),e(j,{attrs:{"open-delay":"500",bottom:""},scopedSlots:t._u([{key:"activator",fn:function(r){var c=r.on,l=r.attrs;return[e(o.a,t._g(t._b({attrs:{color:"success"},on:{click:function(e){return e.preventDefault(),t.exibirItem(n)}}},"v-btn",l,!1),c),[e(m.a,[t._v("mdi-square-edit-outline\n                                            ")])],1)]}}],null,!0)},[t._v(" "),e("span",[t._v("Editar")])])],1)],1)],1)})),1)],1)],1)],1),t._v(" "),e(l.a,{attrs:{cols:"12"}},[e(r.a,{staticClass:"panel-bottom"},[e(d.a,[e(o.a,{attrs:{color:"primary",elevation:"2",outlined:""},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.novoItem.apply(null,arguments)}}},[t._v("Novo")])],1)],1)],1),t._v(" "),t.exibCadastro?e("agendaCadastro",{attrs:{open:t.exibCadastro,isEdit:t.isEdit,item:t.payload,"lista-selecao":t.listaSelecao},on:{close:function(e){t.exibCadastro=!1},cancelar:t.cancelar,atualizarListagem:t.atualizarListagem,exibSnack:t.exibSnack}}):t._e(),t._v(" "),t.exibFiltro?e("filtrosAgenda",{attrs:{open:t.exibFiltro,filtro:t.filtro,"lista-selecao":t.listaSelecao},on:{close:function(e){t.exibFiltro=!1},atualizarListagem:t.atualizarListagem}}):t._e(),t._v(" "),t.isLoading?e("DialogLoading",{attrs:{"is-loading":t.isLoading,cor:"purple lighten-1",texto:"Atualizando dados..."}}):t._e(),t._v(" "),t.dlgConfirme?e("DialogConfirmacao",{attrs:{"dlg-confirme":t.dlgConfirme,cor:"red--text lighten-2",titulo:"Exclusão de registro.",texto:"Tem certeza que deseja excluir este registro?"},on:{nao:function(e){t.dlgConfirme=!1},sim:t.excluirItem}}):t._e(),t._v(" "),t.snack.active?e("snackbar",{attrs:{snack:t.snack},on:{close:function(e){t.snack.active=!1}}}):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DialogLoading:n(624).default,Snackbar:n(448).default})}}]);