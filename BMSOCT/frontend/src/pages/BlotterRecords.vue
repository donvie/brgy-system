<template>
  <q-page padding>
    <q-table
      :title='`Blotter Records (${blotterRecords.total})`'
      title-class="q-mt-sm"
      :data="blotterRecords.data"
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
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="offense" :props="props">
            {{ props.row.offense }}
          </q-td>
          <q-td key="completeAddress" :props="props">
            {{ props.row.completeAddress }}
          </q-td>
          <q-td align="center">
            <div class="q-gutter-xs">
              <q-btn @click="addItemLayout = true; blotter = props.row; action = 'view'" dense icon="find_in_page" color="primary" />
              <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; blotter = props.row; action = 'edit'" dense icon="edit" color="secondary" />
              <q-btn v-if="$user.role === 'Admin'" @click="removeBlotter(props.row._id)" dense icon="delete" color="negative" />
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-right class="items-center">
        <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; action = 'add'" color="secondary" icon="add" label="Add Blotter" class="q-mr-md" />
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="addItemLayout" @hide="blotter = {}">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>
              <span v-if="action === 'view'">View</span><span v-if="action === 'add'">Add</span><span v-if="action === 'edit'">Edit</span> Blotter
            </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <q-btn v-close-popup v-if="action === 'add' || action === 'edit'" @click="addBlotter()" icon="save" color="primary" label="Save" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <div class="q-col-gutter-xl">
              <q-select
                label="Name"
                v-model="blotter.user"
                use-input
                emit-value
                map-options
                input-debounce="600"
                :readonly="action === 'view'"
                use-chips
                :options="usersOptions"
                :option-label="opt => opt === null ? '' : opt.firstName + ' ' + opt.lastName"
                @filter="filterFnUsers"
                behavior="dialog"
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label v-html="scope.opt.label" />
                      <q-item-label caption>{{ scope.opt.firstName }} {{ scope.opt.lastName }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input :readonly="action === 'view'" type="date" v-model="blotter.date" stack-label label="Date" />
              <q-input :readonly="action === 'view'" v-model="blotter.offense" type="textarea" label="Offense" />
              <q-input :readonly="action === 'view'" v-model="blotter.completeAddress" label="Complete Address" placeholder="Street/House No./Brgy./City/Province" />
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
      blotter: {
        user: null,
        date: null,
        offense: '',
        completeAddress: ''
      },
      blotterRecords: {
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
        { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
        { name: 'offense', align: 'left', label: 'Offense', field: 'offense', sortable: true },
        { name: 'completeAddress', align: 'left', label: 'Complete Address', field: 'completeAddress', sortable: true },
        { name: '', align: 'center', label: 'Action', field: '', sortable: true }
      ]
    }
  },
  mounted () {
    this.queryDocument()
    this.loadUsers('')
  },
  methods: {
    removeBlotter (id) {
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
        this.$feathersClient.service('blotter-records').remove(id).then(data => {
          const index = this.blotterRecords.data.findIndex(x => x._id === id)
          this.blotterRecords.data.splice(index, 1)

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
          $ne: 'admin'
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
    addBlotter () {
      if (this.action === 'add') {
        this.blotter.createdAt = Date.now()

        this.$feathersClient.service('blotter-records').create(this.blotter).then(data => {
          this.blotterRecords.data.unshift(data)
          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'It has been successfully created.'
          })
        })
      } else {
        this.$feathersClient.service('blotter-records').patch(this.blotter._id, this.blotter).then(data => {
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
        role: {
          $ne: 'admin'
        },
        $sort: {
          createdAt: -1
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
        this.$feathersClient.service('blotter-records').find({
          query
        }).then(response => {
          this.blotterRecords = response
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
