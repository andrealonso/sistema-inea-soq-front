(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{624:function(e,t,r){"use strict";r.r(t);var n=r(215),o=r(180),l=r(639),c=r(216),d={props:["isLoading","texto","cor"]},m=r(58),component=Object(m.a)(d,(function(){var e=this,t=e._self._c;return t(l.a,{attrs:{scrim:!1,persistent:"",width:"auto"},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[t(n.a,{attrs:{color:e.cor||"primary"}},[t(o.b,[t("span",{staticClass:"white--text"},[e._v(e._s(e.texto))]),e._v(" "),t(c.a,{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports},764:function(e,t,r){"use strict";r.r(t);var n=r(232),o=r(215),l=r(180),c=r(757),d=r(621),m=r(759),f=r(212),v=r(756),x=r(616),h=r(636),_=(r(27),r(225),r(24));r(79),r(20);function k(e){return null!=e&&e.id?{id:e.id,nome:e.nome||"",car:e.car||null,area:e.area||null,area_cana:e.area_cana||null,geolocal:e.geolocal||null,representante_id:Number(e.representante_id)||null,proprietario_id:Number(e.proprietario_id)||null,obs:e.obs||null,cep:e.cep||null,rua:e.rua||null,num:e.num||null,bairro:e.bairro||null,cidade:e.cidade||null,uf:e.uf||null}:{id:null,nome:"",car:null,area:null,area_cana:null,geolocal:null,representante_id:null,proprietario_id:null,obs:null,cep:null,rua:null,num:null,bairro:null,cidade:null,uf:null}}var C={asyncData:function(e){return Object(_.a)(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.$axios,n=[],t.prev=2,t.next=5,r.$get("/propriedades");case 5:return o=t.sent,n=null!=o&&o.erro?[]:o.dados.registros,t.abrupt("return",{listagem:n});case 10:return t.prev=10,t.t0=t.catch(2),console.log(t.t0),t.abrupt("return",{listagem:n});case 14:case"end":return t.stop()}}),t,null,[[2,10]])})))()},name:"propriedades",data:function(){return{itemSelect:null,dlgConfirme:!1,exibCadastro:!1,isEdit:!1,isLoading:!1,search:"",listaSelecao:{},headers:[{text:"Código",value:"id",align:"left",margin:"12px"},{text:"Nome",value:"nome",align:"left"},{text:"Proprietário",value:"proprietarios.nome",align:"center"},{text:"Representante",value:"representante.nome",align:"center"},{text:"Bairro",value:"bairro",align:"center"},{text:"Cidade",value:"cidade",align:"center"},{text:"Ações",value:"actions",sortable:!1,align:"right"}],exibLista:!1,payload:k(),snack:{active:!1,text:"teste",timeout:2e3,color:"primary"}}},filters:{zeroLeft:function(e){return e.toLocaleString("en-US",{minimumIntegerDigits:6,useGrouping:!1})}},methods:{corStatus:function(e){return 1==e?"green--text":2==e?"red--text":void 0},novoItem:function(){var e=this;return Object(_.a)(regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("/propriedade/0");case 2:r=t.sent,n=r.representantes,o=r.proprietarios,e.listaSelecao={representantes:n,proprietarios:o},e.payload=k(),e.isEdit=!1,e.exibCadastro=!0;case 9:case"end":return t.stop()}}),t)})))()},exibSnack:function(e,t){this.snack.color=t||"",this.snack.text=e||"",this.snack.active=!0},confirmeExclusao:function(e){this.itemSelect=e,this.dlgConfirme=!0},atualizarListagem:function(){var e=this;return Object(_.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.$get("/propriedades/");case 3:null!=(r=t.sent)&&r.erro?e.listagem=[]:e.listagem=r.dados.registros,t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),e.listagem=[],console.log({error:t.t0});case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))()},exibirItem:function(e){var t=this;return Object(_.a)(regeneratorRuntime.mark((function r(){var n,o,l,c,d;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.id,r.prev=1,r.next=4,t.$axios.$get("/propriedade/".concat(n));case 4:o=r.sent,l=o.representantes,c=o.proprietarios,d=o.propriedade,t.listaSelecao={representantes:l,proprietarios:c},t.payload=k(d),t.exibCadastro=!0,t.isEdit=!0,r.next=15;break;case 12:r.prev=12,r.t0=r.catch(1),console.log(r.t0);case 15:case"end":return r.stop()}}),r,null,[[1,12]])})))()},cancelar:function(){this.payload=k(),this.exibCadastro=!1}}},w=r(58),component=Object(w.a)(C,(function(){var e=this,t=e._self._c;return t(v.a,{staticClass:"mb-4",attrs:{justify:"center"}},[t(c.a,{attrs:{cols:"12"}},[t(o.a,{staticClass:"p-3"},[t(l.c,[t("h4",[e._v("Lista de Propriedades")]),e._v(" "),t(x.a),e._v(" "),t(h.a,{attrs:{dense:"",outlined:"","append-icon":"mdi-magnify",label:"Pesquisar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),t(m.a,{attrs:{headers:e.headers,items:e.listagem,search:e.search,dense:"","mobile-breakpoint":"400"},scopedSlots:e._u([{key:"item.actions",fn:function(r){var n=r.item;return[t(f.a,{on:{click:function(t){return t.preventDefault(),e.exibirItem(n)}}},[e._v("mdi-pencil")])]}},{key:"item.id",fn:function(t){var r=t.item;return[e._v("\n                    "+e._s(e._f("zeroLeft")(r.id))+"\n                ")]}}])})],1)],1),e._v(" "),t(c.a,{attrs:{cols:"12"}},[t(o.a,{staticClass:"panel-bottom"},[t(d.a,[t(n.a,{attrs:{color:"primary",elevation:"2",outlined:""},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.novoItem.apply(null,arguments)}}},[e._v("Novo")])],1)],1)],1),e._v(" "),e.exibCadastro?t("propriedadesCadastro",{attrs:{open:e.exibCadastro,isEdit:e.isEdit,item:e.payload,"lista-selecao":e.listaSelecao},on:{close:function(t){e.exibCadastro=!1},cancelar:e.cancelar,atualizarListagem:e.atualizarListagem,exibSnack:e.exibSnack}}):e._e(),e._v(" "),e.isLoading?t("DialogLoading",{attrs:{"is-loading":e.isLoading,cor:"purple lighten-1",texto:"Atualizando dados..."}}):e._e(),e._v(" "),e.dlgConfirme?t("DialogConfirmacao",{attrs:{"dlg-confirme":e.dlgConfirme,cor:"red--text lighten-2",titulo:"Exclusão de registro.",texto:"Tem certeza que deseja excluir este registro?"},on:{nao:function(t){e.dlgConfirme=!1},sim:e.excluirItem}}):e._e(),e._v(" "),e.snack.active?t("snackbar",{attrs:{snack:e.snack},on:{close:function(t){e.snack.active=!1}}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{DialogLoading:r(624).default,Snackbar:r(448).default})}}]);