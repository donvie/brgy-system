<template>
  <q-page padding>
    <q-table
      :title='`Barangay Revenues (${revenues.total})`'
      title-class="q-mt-sm"
      :data="revenues.data"
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
          <q-td key="business" :props="props">
            {{ props.row.business }}
          </q-td>
          <q-td key="tax" :props="props">
            {{ props.row.tax }}
          </q-td>
          <q-td align="center">
            <div class="q-gutter-xs">
              <q-btn @click="addItemLayout = true; revenue = props.row; action = 'view'" dense icon="find_in_page" color="primary" />
              <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; revenue = props.row; action = 'edit'" dense icon="edit" color="secondary" />
              <q-btn v-if="$user.role === 'Admin'" @click="removeBarangayRevenue(props.row._id)" dense icon="delete" color="negative" />
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-right class="items-center">
        <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; action = 'add'" color="secondary" icon="add" label="Add Revenue" class="q-mr-md" />
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="addItemLayout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Add Revenue</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <q-btn v-if="action === 'add' || action === 'edit'" v-close-popup @click="addResident()" icon="save" color="primary" label="Save" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <div class="q-col-gutter-xl">
              <q-input v-model="revenue.business" label="Business" />
              <q-input v-model="revenue.tax" label="Tax" type="number" />
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
      revenue: {
        business: '',
        tax: 0
      },
      revenues: {
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
        { name: 'business', align: 'left', label: 'Business', field: 'user', sortable: true },
        { name: 'tax', align: 'left', label: 'Tax(%)', field: 'tax', sortable: true },
        { name: '', align: 'center', label: 'Action', field: '', sortable: true }
      ]
    }
  },
  mounted () {
    this.queryDocument()
    this.loadUsers('')
  },
  methods: {
    removeBarangayRevenue (id) {
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
        this.$feathersClient.service('barangay-revenues').remove(id).then(data => {
          const index = this.revenues.data.findIndex(x => x._id === id)
          this.revenues.data.splice(index, 1)

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
    // addResident () {
    //   this.$feathersClient.service('barangay-revenues').create(
    //     this.revenue
    //   ).then(data => {
    //     this.revenues.data.unshift(data)
    //     this.$q.notify({
    //       position: 'top',
    //       color: 'positive',
    //       timeout: 2000,
    //       icon: 'check',
    //       message: 'Has been successfully created.'
    //     })
    //   })
    // },
    addResident () {
      if (this.action === 'add') {
        this.revenue.createdAt = Date.now()
        this.$feathersClient.service('barangay-revenues').create(this.revenue).then(data => {
          this.revenues.data.unshift(data)
          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'It has been successfully created.'
          })
        })
      } else {
        this.$feathersClient.service('barangay-revenues').patch(this.revenue._id, this.revenue).then(data => {
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
          $ne: 'Admin'
        },
        $sort: {
          createdAt: -1
        }
      }

      if (this.filter !== '') {
        query.$search = this.filter
      }

      if (props.pagination.sortBy !== null) {
        query.$sort = {}
        query.$sort[`${props.pagination.sortBy}`] = props.pagination.descending ? 1 : -1
      }

      setTimeout(() => {
        this.$feathersClient.service('barangay-revenues').find({
          query
        }).then(response => {
          this.revenues = response
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
