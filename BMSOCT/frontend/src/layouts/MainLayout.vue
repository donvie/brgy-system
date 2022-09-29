<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Barangay Management System with Contact Tracing
        </q-toolbar-title>

        <q-btn-dropdown
          split
          flat
          icon="person"
          :label="$user.email"
        >
          <q-list>
            <q-item @click="logOut()" clickable v-close-popup>
              <q-item-section side>
                <q-icon name="exit_to_app"  />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-footer bordered>
      <q-toolbar class="toolbar">
        <q-toolbar-title class="text-body1 text-center">
          © 2021 Barangay Management System with Contact Tracing, Brgy. Calulut San Fernando City
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="255"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menus
        </q-item-label>

        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>

          <q-item-section>
            {{$user.role === 'Admin' ? 'List of Barangay Residents' : 'List of Barangay Official'}}
          </q-item-section>
        </q-item>

        <q-item to="/blotter-records" exact>
          <q-item-section avatar>
            <q-icon name="block" />
          </q-item-section>

          <q-item-section>
            Blotter Records
          </q-item-section>
        </q-item>

        <q-item to="/barangay-revenues" exact>
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" />
          </q-item-section>

          <q-item-section>
            Barangay Revenues
          </q-item-section>
        </q-item>

        <q-item to="/barangay-financial-report" exact v-if="$user.role === 'Admin'">
          <q-item-section avatar>
            <q-icon name="receipt_long" />
          </q-item-section>

          <q-item-section>
            Barangay Financial Report
          </q-item-section>
        </q-item>

        <q-item to="/covid19-contact-tracing" exact>
          <q-item-section avatar>
            <q-icon name="person_search" />
          </q-item-section>

          <q-item-section>
            Covid19 Contact Tracing
          </q-item-section>
        </q-item>

        <q-item to="/brgy-request-list" exact>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>

          <q-item-section>
            Barangay Request List
          </q-item-section>
        </q-item>

        <q-item to="/transparency-board" exact>
          <q-item-section avatar>
            <q-icon name="fact_check" />
          </q-item-section>

          <q-item-section>
            Transparency Board
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logOut () {
      this.$feathersClient.logout().then(() => {
        this.$user = null
        this.$router.push('/login')
      })
    }
  }
}
</script>
