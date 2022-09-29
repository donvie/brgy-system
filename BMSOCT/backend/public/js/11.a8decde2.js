(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{7769:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-page",{attrs:{padding:""}},[t("q-table",{attrs:{title:"Transparency Board ("+e.transparencyBoards.total+")","title-class":"q-mt-sm",data:e.transparencyBoards.data,columns:e.columns,"row-key":"_id",pagination:e.pagination,loading:e.loading,"rows-per-page-options":[5,10,20,50,100],filter:e.filter,"binary-state-sort":""},on:{"update:pagination":function(a){e.pagination=a},request:e.onRequest},scopedSlots:e._u([{key:"body",fn:function(a){return[t("q-tr",{attrs:{props:a},nativeOn:{click:function(t){e.viewItemLayout=!0,e.itemDetails=a.row}}},[t("q-td",{key:"_id",attrs:{props:a}},[e._v("\n          "+e._s(a.rowIndex+1)+".\n        ")]),t("q-td",{key:"nameOfProject",attrs:{props:a}},[e._v("\n          "+e._s(a.row.nameOfProject)+"\n        ")]),t("q-td",{key:"allocatedBudget",attrs:{props:a}},[e._v("\n          "+e._s(a.row.allocatedBudget)+"\n        ")]),t("q-td",{attrs:{align:"center"}},[t("div",{staticClass:"q-gutter-xs"},[t("q-btn",{attrs:{dense:"",icon:"find_in_page",color:"primary"},on:{click:function(t){e.addItemLayout=!0,e.transparencyBoard=a.row,e.action="view"}}}),"Admin"===e.$user.role?t("q-btn",{attrs:{dense:"",icon:"edit",color:"secondary"},on:{click:function(t){e.addItemLayout=!0,e.transparencyBoard=a.row,e.action="edit"}}}):e._e(),"Admin"===e.$user.role?t("q-btn",{attrs:{dense:"",icon:"delete",color:"negative"},on:{click:function(t){return e.removeTransparencyBoard(a.row._id)}}}):e._e()],1)])],1)]}},{key:"top-right",fn:function(){return["Admin"===e.$user.role?t("q-btn",{staticClass:"q-mr-md",attrs:{color:"secondary",icon:"add",label:"Add Transparency Board"},on:{click:function(a){e.addItemLayout=!0,e.action="add"}}}):e._e(),t("q-input",{attrs:{dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(a){e.filter=a},expression:"filter"}})]},proxy:!0}])}),t("q-dialog",{on:{hide:function(a){e.transparencyBoard={}}},model:{value:e.addItemLayout,callback:function(a){e.addItemLayout=a},expression:"addItemLayout"}},[t("q-layout",{staticClass:"bg-white",attrs:{view:"Lhh lpR fff",container:""}},[t("q-header",{staticClass:"bg-primary"},[t("q-toolbar",[t("q-toolbar-title",["view"===e.action?t("span",[e._v("View")]):e._e(),"add"===e.action?t("span",[e._v("Add")]):e._e(),"edit"===e.action?t("span",[e._v("Edit")]):e._e(),e._v(" Transparency Board\n          ")]),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1)],1),t("q-footer",{staticClass:"bg-white"},[t("q-toolbar",[t("q-toolbar-title"),"add"===e.action||"edit"===e.action?t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"save",color:"primary",label:"Save"},on:{click:function(a){return e.addTransparencyBoard()}}}):e._e()],1)],1),t("q-page-container",[t("q-page",{attrs:{padding:""}},[t("div",{staticClass:"q-col-gutter-xl"},[t("q-input",{attrs:{readonly:"view"===e.action,label:"Name of Project"},model:{value:e.transparencyBoard.nameOfProject,callback:function(a){e.$set(e.transparencyBoard,"nameOfProject",a)},expression:"transparencyBoard.nameOfProject"}}),t("q-input",{attrs:{readonly:"view"===e.action,type:"number",label:"Allocated Budget"},model:{value:e.transparencyBoard.allocatedBudget,callback:function(a){e.$set(e.transparencyBoard,"allocatedBudget",a)},expression:"transparencyBoard.allocatedBudget"}})],1)])],1)],1)],1)],1)},o=[],r=(t("c740"),t("a434"),t("7db0"),t("d3b7"),t("4de4"),{name:"PageIndex",data:function(){return{action:"",addItemLayout:!1,usersOptions:[],transparencyBoard:{nameOfProject:"",allocatedBudget:0},transparencyBoards:{data:[],total:0},filter:"",loading:!1,rowsPerPageData:[],pagination:{sortBy:null,descending:!1,page:1,rowsPerPage:20,rowsNumber:0},columns:[{name:"_id",align:"left",label:"No.",field:"_id",sortable:!0},{name:"nameOfProject",align:"left",label:"Name of Project",field:"user",sortable:!0},{name:"allocatedBudget",align:"left",label:"Allocated Budget",field:"allocatedBudget",sortable:!0},{name:"",align:"center",label:"Action",field:"",sortable:!0}]}},mounted:function(){this.queryDocument(),this.loadUsers("")},methods:{removeTransparencyBoard:function(e){var a=this;this.$q.dialog({title:"Confirm",position:"top",message:"Are you sure you want to delete?",persistent:!0,ok:{unelevated:!0,push:!1,color:"negative"},cancel:{flat:!0,color:"negative"}}).onOk((function(){a.$feathersClient.service("transparency-board").remove(e).then((function(t){var n=a.transparencyBoards.data.findIndex((function(a){return a._id===e}));a.transparencyBoards.data.splice(n,1),a.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully deleted."})}))})).onCancel((function(){})).onDismiss((function(){}))},filterFnUsers:function(e,a){this.loadUsers(e),a()},loadUsers:function(e){var a=this,t={$limit:50,role:{$ne:"Admin"}};""!==e&&(t.$search=e),this.$feathersClient.service("users").find({query:t}).then((function(e){a.usersOptions=e.data})).catch((function(e){console.log(e)}))},addTransparencyBoard:function(){var e=this;"add"===this.action?(this.transparencyBoard.createdAt=Date.now(),this.$feathersClient.service("transparency-board").create(this.transparencyBoard).then((function(a){e.transparencyBoards.data.unshift(a),e.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully created."})}))):this.$feathersClient.service("transparency-board").patch(this.transparencyBoard._id,this.transparencyBoard).then((function(a){e.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully updated."})}))},queryDocument:function(){this.onRequest({pagination:this.pagination,filter:void 0})},onRequest:function(e){var a=this;this.loading=!0;var t=(e.pagination.page-1)*e.pagination.rowsPerPage;this.pagination=e.pagination;var n={$limit:e.pagination.rowsPerPage,$skip:t,role:{$ne:"Admin"},$sort:{createdAt:-1}};""!==this.filter&&(n.$search=this.filter),null!==e.pagination.sortBy&&(n.$sort={},n.$sort["".concat(e.pagination.sortBy)]=e.pagination.descending?1:-1),setTimeout((function(){a.$feathersClient.service("transparency-board").find({query:n}).then((function(e){a.transparencyBoards=e,a.pagination.rowsNumber=e.total,a.loading=!1})).catch((function(e){console.error("Error",e),a.loading=!1}))}),300)}}}),i=r,s=t("2877"),c=t("9989"),d=t("eaac"),l=t("bd08"),u=t("db86"),p=t("9c40"),f=t("27f9"),y=t("0016"),g=t("24e8"),m=t("4d5a"),h=t("e359"),b=t("65c6"),v=t("6ac5"),q=t("7ff0"),B=t("09e3"),w=t("7f67"),_=t("eebe"),k=t.n(_),$=Object(s["a"])(i,n,o,!1,null,null,null);a["default"]=$.exports;k()($,"components",{QPage:c["a"],QTable:d["a"],QTr:l["a"],QTd:u["a"],QBtn:p["a"],QInput:f["a"],QIcon:y["a"],QDialog:g["a"],QLayout:m["a"],QHeader:h["a"],QToolbar:b["a"],QToolbarTitle:v["a"],QFooter:q["a"],QPageContainer:B["a"]}),k()($,"directives",{ClosePopup:w["a"]})}}]);