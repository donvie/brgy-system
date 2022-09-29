<template>
  <q-page padding>
    <div class="text-h4 items-center q-mb-lg full-width row">
      <div class="col-12" >Dashboard</div>
    </div>

    <q-card class="bg-transparent no-shadow no-border q-mb-xl">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
            <q-item @click="viewDocument(item)" :style="`background-color: ${item.color1}`" class="q-pa-none q-ml-xs" v-ripple clickable>
              <q-item-section side :style="`background-color: ${item.color2}`" class=" q-pa-lg q-mr-none text-white">
                <q-icon :name="item.icon" color="white" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
                <q-item-label>{{ item.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-table
      v-if="$user.role === 'Admin'"
      :title='`Covid19 Contract Tracing (${contactTracings.total})`'
      title-class="q-mt-sm"
      :data="contactTracings.data"
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
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="conducted" :props="props">
            {{ props.row.conducted }}
          </q-td>
          <q-td align="center">
            <div class="q-gutter-xs">
              <q-btn @click="addItemLayout = true; contactTracing = props.row; action = 'view'" dense icon="find_in_page" color="primary" />
              <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; contactTracing = props.row; action = 'edit'" dense icon="edit" color="secondary" />
              <q-btn v-if="$user.role === 'Admin'" @click="removeContactTracing(props.row._id)" dense icon="delete" color="negative" />
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-right class="items-center">
        <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; action = 'add'" color="secondary" icon="add" label="Add Contact Tracing" class="q-mr-md" />
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="addItemLayout" @hide="contactTracing = {}">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>
              <span v-if="action === 'view'">View</span><span v-if="action === 'add'">Add</span><span v-if="action === 'edit'">Edit</span> Contact Tracing
            </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <q-btn v-close-popup v-if="action === 'add' || action === 'edit'" @click="addContactTracing()" icon="save" color="primary" label="Save" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <div class="q-col-gutter-xl">
              <q-select
                label="Name"
                :readonly="action === 'view'"
                v-model="contactTracing.user"
                use-input
                emit-value
                map-options
                input-debounce="600"
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
              <q-input :readonly="action === 'view'" type="date" v-model="contactTracing.date" stack-label label="Date" />
              <q-select :readonly="action === 'view'" v-model="contactTracing.status" :options="statusOptions" label="Status" />
              <q-select :readonly="action === 'view'" v-model="contactTracing.conducted" :options="conductedOptions" label="Conducted" />
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
      items: [
        {
          title: "Suspected",
          icon: "warning",
          value: "0",
          color1: "#d900ff",
          color2: "#9c27b0"
        },
        {
          title: "Confirmed",
          icon: "thumb_up",
          value: "0",
          color1: "#ffd663",
          color2: "#f2c037"
        },
        {
          title: "Death",
          icon: "close",
          value: "0",
          color1: "#ff001e",
          color2: "#c10015"
        },
        {
          title: "Recovery",
          icon: "check",
          value: "0",
          color1: "#00d632",
          color2: "#21ba45"
        }
      ],
      action: '',
      addItemLayout: false,
      usersOptions: [],
      statusOptions: ['Suspected', 'Confirmed', 'Death', 'Recovery'],
      conductedOptions: ['Hospital', 'LGU'],
      contactTracing: {
        user: null,
        date: null,
        status: null,
        conducted: null
      },
      contactTracings: {
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
        { name: 'user', align: 'left', label: 'User', field: 'user', sortable: true },
        { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
        { name: 'conducted', align: 'left', label: 'Conducted', field: 'conducted', sortable: true },
        { name: '', align: 'center', label: 'Action', field: '', sortable: true }
      ]
    }
  },
  mounted () {
    this.queryDocument()
    this.loadUsers('')

    this.items.forEach(element => {
      let query = {
        status: element.title
      }

      this.$feathersClient.service('covid-19-contact-tracing').find({
        query
      }).then(response => {
        console.log(response)
        element.value = response.total
      }).catch(error => {
        console.error('Error', error)
      })
    })
  },
  methods: {
    removeContactTracing (id) {
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
        this.$feathersClient.service('covid-19-contact-tracing').remove(id).then(data => {
          const index = this.contactTracings.data.findIndex(x => x._id === id)
          this.contactTracings.data.splice(index, 1)

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
        $limit: 50
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
    addContactTracing () {
      if (this.action === 'add') {
        this.contactTracing.createdAt = Date.now()

        this.$feathersClient.service('covid-19-contact-tracing').create(this.contactTracing).then(data => {
          this.contactTracings.data.unshift(data)
          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'It has been successfully created.'
          })
        })
      } else {
        this.$feathersClient.service('covid-19-contact-tracing').patch(this.contactTracing._id, this.contactTracing).then(data => {
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
        this.$feathersClient.service('covid-19-contact-tracing').find({
          query
        }).then(response => {
          this.contactTracings = response
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
