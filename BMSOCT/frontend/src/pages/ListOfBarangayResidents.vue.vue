<template>
  <q-page padding>
    <q-table
      :title='`${filterTitle} (${residents.total})`'
      title-class="q-mt-sm"
      :data="residents.data"
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
          <q-td key="firstName" :props="props">
            {{ props.row.firstName }}
          </q-td>
          <q-td key="middleName" :props="props">
            {{ props.row.middleName }}
          </q-td>
          <q-td key="lastName" :props="props">
            {{ props.row.lastName }}
          </q-td>
          <q-td key="age" :props="props">
            {{ props.row.age }}
          </q-td>
          <q-td key="gender" :props="props">
            {{ props.row.gender }}
          </q-td>
          <q-td align="center">
            <div class="q-gutter-xs">
              <q-btn @click="printReport(props.row)" dense icon="print" color="purple" />
              <q-btn @click="addItemLayout = true; resident = props.row; action = 'view'" dense icon="find_in_page" color="primary" />
              <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; resident = props.row; action = 'edit'" dense icon="edit" color="secondary" />
              <q-btn :disable="props.row.firstName === 'admin'" v-if="$user.role === 'Admin'" @click="removeResident(props.row._id)" dense icon="delete" color="negative" />
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-right class="items-center">
        <q-btn v-if="$user.role === 'Admin'" @click="addItemLayout = true; action = 'add'" color="secondary" icon="add" label="Add Resident" class="q-mr-md" />
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="addItemLayout" @hide="resident = {}">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>
              <span v-if="action === 'view'">View</span><span v-if="action === 'add'">Add</span><span v-if="action === 'edit'">Edit</span> Resident
            </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-white">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <q-btn v-if="action === 'add' || action === 'edit'" @click="addResident()" v-close-popup icon="save" color="primary" label="Save" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <div class="q-col-gutter-xl">
              <q-input :readonly="action === 'view'" v-model="resident.firstName" label="First Name" />
              <q-input :readonly="action === 'view'" v-model="resident.middleName" label="Middel Name" />
              <q-input :readonly="action === 'view'" v-model="resident.lastName" label="Last Name" />
              <q-input :readonly="action === 'view'" v-model="resident.email" label="Username" />
              <q-input v-if="action === 'add'" :readonly="action === 'view'"  :type="isPwd ? 'password' : 'text'" v-model="resident.password" label="Password" :rules="[val => !!val || 'Password is required']">
                <template v-slot:append v-if="resident.password && resident.password.length > 0">
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input :readonly="action === 'view'" type="textarea" v-model="resident.completeAddress" label="Complete Address" placeholder="Street/House No./Brgy./City/Province" />
              <q-input :readonly="action === 'view'" v-model="resident.age" type="number" label="Age" />
              <q-select :readonly="action === 'view'" v-model="resident.gender" :options="genderOptions" label="Gender" />
              <q-input :readonly="action === 'view'" v-model="resident.contactNumber" label="Contact Number" />
              <q-select :readonly="action === 'view'" v-model="resident.position" :options="positionOptions" label="Position" />
              <q-select :readonly="action === 'view'" v-model="resident.role" :options="roleOptions" label="Role" />
            </div>

            <q-markup-table flat bordered class="q-mt-xl" v-if="action === 'view' && $user.role === 'Admin'">
              <thead>
                <tr>
                  <th colspan="5">
                    <div class="row no-wrap items-center">
                      <div class="text-h6">Blotter Records</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th class="text-left">Date</th>
                  <th class="text-left">Offense</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(blotter, index) in blotterRecords" :key="index">
                  <td class="text-left">{{blotter.date}}</td>
                  <td class="text-left">{{blotter.offense}}</td>
                </tr>
                <tr>
                  <td class="text-center text-h6" colspan="2">No Blotter</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-page>
</template>

<script>
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: 'PageIndex',
  data () {
    return {
      blotterRecords: [],
      isPwd: true,
      action: '',
      addItemLayout: false,
      genderOptions: ['Male', 'Female'],
      positionOptions: ['Brgy. Chairman', 'Kagawad', 'Brgy. Treasurer', 'Brgy. Secretary', 'Brgy. Member'],
      roleOptions: ['Admin', 'User'],
      resident: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        completeAddress: '',
        age: '',
        gender: null,
        contactNumber: '',
        position: '',
        role: 'User'
      },
      residents: {
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
        { name: 'firstName', align: 'left', label: 'First Name', field: 'firstName', sortable: true },
        { name: 'middleName', align: 'left', label: 'Middle Name', field: 'middleName', sortable: true },
        { name: 'lastName', align: 'left', label: 'Last Name', field: 'lastName', sortable: true },
        { name: 'age', align: 'left', label: 'Age', field: 'age', sortable: true },
        { name: 'gender', align: 'left', label: 'Gender', field: 'gender', sortable: true },
        { name: '', align: 'center', label: 'Action', field: '', sortable: true }
      ]
    }
  },
  mounted () {
    this.queryDocument()

    const query = {
      $limit: 100,
      'user._id': this.$user._id
    }

    this.$feathersClient.service('blotter-records').find({
      query
    }).then(response => {
      this.blotterRecords = response.data
    }).catch(error => {
    })
  },
  computed: {
    filterTitle () {
      return this.$user.role === 'Admin' ? 'List of Barangay Residents' : 'List of Barangay Official'
    }
  },
  methods: {
    printReport (user) {
      var docDefinition = {
        content: [
		      {text: 'Brgy. Calulut, City of San Fernando, Pampanga \n\n\n', alignment: 'center', style: 'header'},
          {
            text: 'Name',
            style: 'subheader'
          },
          `${user.firstName} ${user.middleName} ${user.lastName}\n\n`,
          {
            text: 'Username',
            style: 'subheader'
          },
          `${user.email} \n\n`,
          {
            text: 'Complete Address',
            style: 'subheader'
          },
          `${user.completeAddress} \n\n`,
          {
            text: 'Age',
            style: 'subheader'
          },
          `${user.age} \n\n`,
          {
            text: 'Gender',
            style: 'subheader'
          },
          `${user.gender} \n\n`,
          {
            text: 'Contact Number',
            style: 'subheader'
          },
          `${user.contactNumber} \n\n`,
          {
            text: 'Position',
            style: 'subheader'
          },
          `${user.position} \n\n`,
        ],
        styles: {
          header: {
            fontSize: 17,
          },
          subheader: {
            fontSize: 14
          }
        }
      }
      pdfMake.createPdf(docDefinition).open();
    },
    removeResident (id) {
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
        this.$feathersClient.service('users').remove(id).then(data => {
          const index = this.residents.data.findIndex(x => x._id === id)
          this.residents.data.splice(index, 1)

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
    addResident () {
      const residentData = this.resident
  
      if (this.action === 'add') {
        residentData.createdAt = Date.now()
        residentData.email = this.resident.email
        residentData.password = this.resident.password

        this.$feathersClient.service('users').create(residentData).then(data => {
          this.residents.data.unshift(data)
          this.$q.notify({
            position: 'top',
            color: 'positive',
            timeout: 2000,
            icon: 'check',
            message: 'It has been successfully created.'
          })
        })
      } else {
        this.$feathersClient.service('users').patch(this.resident._id, residentData).then(data => {
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

      if (this.$user.role === 'User') {
        query.role = {
          $ne: 'Admin'
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
        this.$feathersClient.service('users').find({
          query
        }).then(response => {
          this.residents = response
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
