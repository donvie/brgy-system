(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{dce5:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-page",{attrs:{padding:""}},[o("q-dialog",{on:{hide:function(t){e.blotter={}}},model:{value:e.addItemLayout,callback:function(t){e.addItemLayout=t},expression:"addItemLayout"}},[o("q-layout",{staticClass:"bg-white",attrs:{view:"Lhh lpR fff",container:""}},[o("q-header",{staticClass:"bg-primary"},[o("q-toolbar",[o("q-toolbar-title",["view"===e.action?o("span",[e._v("View")]):e._e(),"add"===e.action?o("span",[e._v("Add")]):e._e(),"edit"===e.action?o("span",[e._v("Edit")]):e._e(),e._v(" Blotter\n          ")]),o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1)],1),o("q-footer",{staticClass:"bg-white"},[o("q-toolbar",[o("q-toolbar-title"),"add"===e.action||"edit"===e.action?o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"save",color:"primary",label:"Save"},on:{click:function(t){return e.addBlotter()}}}):e._e()],1)],1),o("q-page-container",[o("q-page",{attrs:{padding:""}},[o("div",{staticClass:"q-col-gutter-xl"},[o("q-select",{attrs:{label:"Name","use-input":"","emit-value":"","map-options":"","input-debounce":"600",readonly:"view"===e.action,"use-chips":"",options:e.usersOptions,"option-label":function(e){return null===e?"":e.firstName+" "+e.lastName},behavior:"dialog"},on:{filter:e.filterFnUsers},scopedSlots:e._u([{key:"option",fn:function(t){return[o("q-item",e._g(e._b({},"q-item",t.itemProps,!1),t.itemEvents),[o("q-item-section",[o("q-item-label",{domProps:{innerHTML:e._s(t.opt.label)}}),o("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.opt.firstName)+" "+e._s(t.opt.lastName))])],1)],1)]}}]),model:{value:e.blotter.user,callback:function(t){e.$set(e.blotter,"user",t)},expression:"blotter.user"}}),o("q-input",{attrs:{readonly:"view"===e.action,type:"date","stack-label":"",label:"Date"},model:{value:e.blotter.date,callback:function(t){e.$set(e.blotter,"date",t)},expression:"blotter.date"}}),o("q-input",{attrs:{readonly:"view"===e.action,type:"textarea",label:"Offense"},model:{value:e.blotter.offense,callback:function(t){e.$set(e.blotter,"offense",t)},expression:"blotter.offense"}}),o("q-input",{attrs:{readonly:"view"===e.action,label:"Complete Address",placeholder:"Street/House No./Brgy./City/Province"},model:{value:e.blotter.completeAddress,callback:function(t){e.$set(e.blotter,"completeAddress",t)},expression:"blotter.completeAddress"}})],1)])],1)],1)],1)],1)},n=[],i=(o("c740"),o("a434"),o("7db0"),o("d3b7"),o("4de4"),{name:"PageIndex",data:function(){return{action:"",addItemLayout:!1,usersOptions:[],blotter:{user:null,date:null,offense:"",completeAddress:""},blotterRecords:{data:[],total:0},filter:"",loading:!1,rowsPerPageData:[],pagination:{sortBy:null,descending:!1,page:1,rowsPerPage:20,rowsNumber:0},columns:[{name:"_id",align:"left",label:"No.",field:"_id",sortable:!0},{name:"user",align:"left",label:"Name",field:"user",sortable:!0},{name:"date",align:"left",label:"Date",field:"date",sortable:!0},{name:"offense",align:"left",label:"Offense",field:"offense",sortable:!0},{name:"completeAddress",align:"left",label:"Complete Address",field:"completeAddress",sortable:!0},{name:"",align:"center",label:"Action",field:"",sortable:!0}]}},mounted:function(){this.queryDocument(),this.loadUsers("")},methods:{removeBlotter:function(e){var t=this;this.$q.dialog({title:"Confirm",position:"top",message:"Are you sure you want to delete?",persistent:!0,ok:{unelevated:!0,push:!1,color:"negative"},cancel:{flat:!0,color:"negative"}}).onOk((function(){t.$feathersClient.service("blotter-records").remove(e).then((function(o){var a=t.blotterRecords.data.findIndex((function(t){return t._id===e}));t.blotterRecords.data.splice(a,1),t.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully deleted."})}))})).onCancel((function(){})).onDismiss((function(){}))},filterFnUsers:function(e,t){this.loadUsers(e),t()},loadUsers:function(e){var t=this,o={$limit:50,role:{$ne:"admin"}};""!==e&&(o.$search=e),this.$feathersClient.service("users").find({query:o}).then((function(e){t.usersOptions=e.data})).catch((function(e){console.log(e)}))},addBlotter:function(){var e=this;"add"===this.action?(this.blotter.createdAt=Date.now(),this.$feathersClient.service("blotter-records").create(this.blotter).then((function(t){e.blotterRecords.data.unshift(t),e.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully created."})}))):this.$feathersClient.service("blotter-records").patch(this.blotter._id,this.blotter).then((function(t){e.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully updated."})}))},queryDocument:function(){this.onRequest({pagination:this.pagination,filter:void 0})},onRequest:function(e){var t=this;this.loading=!0;var o=(e.pagination.page-1)*e.pagination.rowsPerPage;this.pagination=e.pagination;var a={$limit:e.pagination.rowsPerPage,$skip:o,role:{$ne:"admin"},$sort:{createdAt:-1}};"User"===this.$user.role&&(a["user._id"]=this.$user._id),""!==this.filter&&(a.$search=this.filter),null!==e.pagination.sortBy&&(a.$sort={},a.$sort["".concat(e.pagination.sortBy)]=e.pagination.descending?1:-1),setTimeout((function(){t.$feathersClient.service("blotter-records").find({query:a}).then((function(e){t.blotterRecords=e,t.pagination.rowsNumber=e.total,t.loading=!1})).catch((function(e){console.error("Error",e),t.loading=!1}))}),300)}}}),s=i,l=o("2877"),r=o("9989"),c=o("eaac"),d=o("bd08"),u=o("db86"),p=o("9c40"),f=o("27f9"),b=o("0016"),m=o("24e8"),h=o("4d5a"),g=o("e359"),v=o("65c6"),q=o("6ac5"),y=o("7ff0"),$=o("09e3"),w=o("ddd8"),_=o("66e5"),Q=o("4074"),k=o("0170"),C=o("7f67"),P=o("eebe"),I=o.n(P),A=Object(l["a"])(s,a,n,!1,null,null,null);t["default"]=A.exports;I()(A,"components",{QPage:r["a"],QTable:c["a"],QTr:d["a"],QTd:u["a"],QBtn:p["a"],QInput:f["a"],QIcon:b["a"],QDialog:m["a"],QLayout:h["a"],QHeader:g["a"],QToolbar:v["a"],QToolbarTitle:q["a"],QFooter:y["a"],QPageContainer:$["a"],QSelect:w["a"],QItem:_["a"],QItemSection:Q["a"],QItemLabel:k["a"]}),I()(A,"directives",{ClosePopup:C["a"]})}}]);