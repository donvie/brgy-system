<template>
  <q-page padding>
    <q-table
      :title='`Barangay Request List (${requestLists.total})`'
      title-class="q-mt-sm"
      :data="requestLists.data"
      :columns="columns"
      row-key="_id"
      :pagination.sync="pagination"
      :loading="loading"
      :rows-per-page-options="[5, 10, 20, 50, 100]"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props" @click.native="viewItemLayout = true; itemDetails = props.row">
          <q-td key="_id"  :props="props">
            {{props.rowIndex + 1}}.
          </q-td>
          <q-td key="user" :props="props">
            {{ props.row.user.firstName }} {{ props.row.user.lastName }}
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.type }}
          </q-td>
          <q-td key="dateNeeded" :props="props">
            {{ props.row.dateNeeded }}
          </q-td>
          <q-td key="status" :props="props">
            <q-badge :color="props.row.status === 'Pending' ? 'negative' : 'positive'">
              {{props.row.status}}
            </q-badge>
          </q-td>
          <q-td key="remarks" :props="props">
            {{ props.row.remarks }}
          </q-td>
          <q-td align="center">
            <div class="q-gutter-xs">
              <q-btn @click="addItemLayout = true; requestList = props.row; action = 'view'" dense icon="find_in_page" color="primary" />
              <q-btn :disable="props.row.status === 'Completed'" @click="requestList = props.row; tagAsCompleted()" v-if="$user.role === 'Admin'" dense icon="check" color="positive" />
              <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; requestList = props.row; action = 'edit'" dense icon="edit" color="secondary" />
              <q-btn v-if="$user.role === 'Admin'" @click="removerequestList(props.row._id)" dense icon="delete" color="negative" />
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-right class="items-center">
        <q-btn v-if="$user.role === 'User'" @click="addItemLayout = true; action = 'add'" color="secondary" icon="add" label="Add Request" class="q-mr-md" />
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="addItemLayout" @hide="requestList = {}">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>
              <span v-if="action === 'view'">View</span><span v-if="action === 'add'">Add</span><span v-if="action === 'edit'">Edit</span> Request
            </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <q-btn v-close-popup v-if="action === 'add' || action === 'edit'" @click="addrequestList()" icon="save" color="primary" label="Save" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <div class="q-col-gutter-xl">
              <q-input v-if="requestList.user" :value="requestList.user.firstName + ' ' + requestList.user.lastName" readonly label="Name" />
              <q-input v-if="requestList.user" :value="requestList.user.comepleteAddress" readonly label="Complete Address" />
              <q-input v-if="requestList.user" :value="requestList.user.contactNumber" readonly label="Contact No." />
              <q-select :readonly="action === 'view'" v-model="requestList.type" :options="typeOptions" label="Type" />
              <q-input :readonly="action === 'view'" type="date" v-model="requestList.dateNeeded" stack-label label="Date Needed" />
              <q-select :readonly="action === 'view'" v-if="action === 'view'" v-model="requestList.status" :options="typeOptions" label="Status" />
              <q-input :readonly="action === 'view'" v-model="requestList.remarks" type="textarea" label="Remarks" />
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      action: '',
      addItemLayout: false,
      usersOptions: [],
      typeOptions: [
        'Barangay Clearance',
        'Barangay Business Clearance',
        'Certificate of Indigency',
        'Barangay ID'
      ],
      requestList: {
        type: '',
        dateNeeded: null,
        remarks: ''
      },
      requestLists: {
        data: [],
        total: 0
      },
      filter: '',
      loading: false,
      rowsPerPageData: [],
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      columns: [
        { name: '_id', align: 'left', label: 'No.', field: '_id', sortable: true },
        { name: 'user', align: 'left', label: 'Name', field: 'user', sortable: true },
        { name: 'type', align: 'left', label: 'Type', field: 'type', sortable: true },
        { name: 'dateNeeded', align: 'left', label: 'Date needed', field: 'dateNeeded', sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
        { name: 'remarks', align: 'left', label: 'Remarks', field: 'remarks', sortable: true },
        { name: '', align: 'center', label: 'Action', field: '', sortable: true }
      ]
    }
  },
  mounted () {
    this.queryDocument()
    this.loadUsers('')
  },
  methods: {
    tagAsCompleted () {
      this.$q.dialog({
        title: 'Confirm',
        position: 'top',
        message: 'Are you sure you want to tag as completed?',
        persistent: true,
        ok: {
          unelevated: true,
          push: false,
          color: 'primary'
        },
        cancel: {
          flat: true,
          color: 'primary'
        }
      }).onOk(() => {
        this.requestList.status = 'Completed'
        this.$feathersClient.service('barangay-request-lists').patch(this.requestList._id, this.requestList).then(data => {
          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'Success!.'
          })
          this.$forceUpdate()
        })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    removerequestList (id) {
      this.$q.dialog({
        title: 'Confirm',
        position: 'top',
        message: 'Are you sure you want to delete?',
        persistent: true,
        ok: {
          unelevated: true,
          push: false,
          color: 'negative'
        },
        cancel: {
          flat: true,
          color: 'negative'
        }
      }).onOk(() => {
        this.$feathersClient.service('barangay-request-lists').remove(id).then(data => {
          const index = this.requestLists.data.findIndex(x => x._id === id)
          this.requestLists.data.splice(index, 1)

          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'It has been successfully deleted.'
          })
        })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    filterFnUsers (val, update) {
      this.loadUsers(val)
      update()
    },
    loadUsers (val) {
      let query = {
        $limit: 50,
        role: {
          $ne: 'Admin'
        },
      }

      if (val !== '') {
        query.$search = val
      }

      this.$feathersClient.service('users').find({
        query
      }).then((response) => {
        this.usersOptions = response.data
      }).catch((e) => {
        console.log(e)
      })
    },
    addrequestList () {
      if (this.action === 'add') {
        this.requestList.createdAt = Date.now()
        this.requestList.user = this.$user
        this.requestList.status = 'Pending'
        this.$feathersClient.service('barangay-request-lists').create(this.requestList).then(data => {
          this.requestLists.data.unshift(data)
          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'It has been successfully saved.'
          })
        })
      } else {
        this.$feathersClient.service('barangay-request-lists').patch(this.requestList._id, this.requestList).then(data => {
          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'It has been successfully updated.'
          })
        })
      }
    },
    queryDocument () {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    onRequest (props) {
      this.loading = true

      const skip = (props.pagination.page - 1) * props.pagination.rowsPerPage
      this.pagination = props.pagination

      const query = {
        $limit: props.pagination.rowsPerPage,
        $skip: skip,
        $sort: {
          createdAt: -1,
          status: -1
        }
      }

      if (this.$user.role === 'User') {
        query['user._id'] = this.$user._id
      }

      if (this.filter !== '') {
        query.$search = this.filter
      }

      if (props.pagination.sortBy !== null) {
        query.$sort = {}
        query.$sort[`${props.pagination.sortBy}`] = props.pagination.descending ? 1 : -1
      }

      setTimeout(() => {
        this.$feathersClient.service('barangay-request-lists').find({
          query
        }).then(response => {
          this.requestLists = response
          this.pagination.rowsNumber = response.total
          this.loading = false
        }).catch(error => {
          console.error('Error', error)
          this.loading = false
        })
      }, 300)
    }
  }
}
</script>

<style lang="sass">
</style>
