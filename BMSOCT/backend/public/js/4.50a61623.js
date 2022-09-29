(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"246f":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-page",{attrs:{padding:""}},[t("q-dialog",{on:{hide:function(a){e.financialReport={}}},model:{value:e.addItemLayout,callback:function(a){e.addItemLayout=a},expression:"addItemLayout"}},[t("q-layout",{staticClass:"bg-white",attrs:{view:"Lhh lpR fff",container:""}},[t("q-header",{staticClass:"bg-primary"},[t("q-toolbar",[t("q-toolbar-title",["view"===e.action?t("span",[e._v("View")]):e._e(),"add"===e.action?t("span",[e._v("Add")]):e._e(),"edit"===e.action?t("span",[e._v("Edit")]):e._e(),e._v(" Financial Report\n          ")]),t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1)],1),t("q-footer",{staticClass:"bg-white"},[t("q-toolbar",[t("q-toolbar-title"),"add"===e.action||"edit"===e.action?t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"save",color:"primary",label:"Save"},on:{click:function(a){return e.addFinancialReport()}}}):e._e()],1)],1),t("q-page-container",[t("q-page",{attrs:{padding:""}},[t("div",{staticClass:"q-col-gutter-xl"},[t("q-input",{attrs:{readonly:"view"===e.action,label:"Name of Project"},model:{value:e.financialReport.nameOfProject,callback:function(a){e.$set(e.financialReport,"nameOfProject",a)},expression:"financialReport.nameOfProject"}}),t("q-input",{attrs:{readonly:"view"===e.action,type:"date","stack-label":"",label:"Date Published"},model:{value:e.financialReport.datePublished,callback:function(a){e.$set(e.financialReport,"datePublished",a)},expression:"financialReport.datePublished"}}),t("q-input",{attrs:{readonly:"view"===e.action,type:"number",label:"Allocated Budget"},model:{value:e.financialReport.allocatedBudget,callback:function(a){e.$set(e.financialReport,"allocatedBudget",a)},expression:"financialReport.allocatedBudget"}})],1)])],1)],1)],1)],1)},i=[],o=(t("c740"),t("a434"),t("7db0"),t("d3b7"),t("4de4"),{name:"PageIndex",data:function(){return{action:"",addItemLayout:!1,usersOptions:[],financialReport:{nameOfProject:"",datePublished:null,allocatedBudget:0},financialReports:{data:[],total:0},filter:"",loading:!1,rowsPerPageData:[],pagination:{sortBy:null,descending:!1,page:1,rowsPerPage:20,rowsNumber:0},columns:[{name:"_id",align:"left",label:"No.",field:"_id",sortable:!0},{name:"nameOfProject",align:"left",label:"Name of Project",field:"user",sortable:!0},{name:"datePublished",align:"left",label:"Date Published",field:"datePublished",sortable:!0},{name:"allocatedBudget",align:"left",label:"Allocated Budget",field:"allocatedBudget",sortable:!0},{name:"",align:"center",label:"Action",field:"",sortable:!0}]}},mounted:function(){this.queryDocument(),this.loadUsers("")},methods:{removeFinancialReport:function(e){var a=this;this.$q.dialog({title:"Confirm",position:"top",message:"Are you sure you want to delete?",persistent:!0,ok:{unelevated:!0,push:!1,color:"negative"},cancel:{flat:!0,color:"negative"}}).onOk((function(){a.$feathersClient.service("barangay-financial-reports").remove(e).then((function(t){var n=a.financialReports.data.findIndex((function(a){return a._id===e}));a.financialReports.data.splice(n,1),a.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully deleted."})}))})).onCancel((function(){})).onDismiss((function(){}))},filterFnUsers:function(e,a){this.loadUsers(e),a()},loadUsers:function(e){var a=this,t={$limit:50,role:{$ne:"Admin"}};""!==e&&(t.$search=e),this.$feathersClient.service("users").find({query:t}).then((function(e){a.usersOptions=e.data})).catch((function(e){console.log(e)}))},addFinancialReport:function(){var e=this;"add"===this.action?(this.financialReport.createdAt=Date.now(),this.$feathersClient.service("barangay-financial-reports").create(this.financialReport).then((function(a){e.financialReports.data.unshift(a),e.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully created."})}))):this.$feathersClient.service("barangay-financial-reports").patch(this.financialReport._id,this.financialReport).then((function(a){e.$q.notify({position:"top",color:"positive",timeout:2e3,icon:"check",message:"It has been successfully updated."})}))},queryDocument:function(){this.onRequest({pagination:this.pagination,filter:void 0})},onRequest:function(e){var a=this;this.loading=!0;var t=(e.pagination.page-1)*e.pagination.rowsPerPage;this.pagination=e.pagination;var n={$limit:e.pagination.rowsPerPage,$skip:t,role:{$ne:"Admin"},$sort:{createdAt:-1}};""!==this.filter&&(n.$search=this.filter),null!==e.pagination.sortBy&&(n.$sort={},n.$sort["".concat(e.pagination.sortBy)]=e.pagination.descending?1:-1),setTimeout((function(){a.$feathersClient.service("barangay-financial-reports").find({query:n}).then((function(e){a.financialReports=e,a.pagination.rowsNumber=e.total,a.loading=!1})).catch((function(e){console.error("Error",e),a.loading=!1}))}),300)}}}),l=o,s=t("2877"),r=t("9989"),c=t("eaac"),d=t("bd08"),u=t("db86"),p=t("9c40"),f=t("27f9"),g=t("0016"),h=t("24e8"),b=t("4d5a"),m=t("e359"),v=t("65c6"),y=t("6ac5"),q=t("7ff0"),P=t("09e3"),R=t("7f67"),w=t("eebe"),$=t.n(w),k=Object(s["a"])(l,n,i,!1,null,null,null);a["default"]=k.exports;$()(k,"components",{QPage:r["a"],QTable:c["a"],QTr:d["a"],QTd:u["a"],QBtn:p["a"],QInput:f["a"],QIcon:g["a"],QDialog:h["a"],QLayout:b["a"],QHeader:m["a"],QToolbar:v["a"],QToolbarTitle:y["a"],QFooter:q["a"],QPageContainer:P["a"]}),$()(k,"directives",{ClosePopup:R["a"]})}}]);