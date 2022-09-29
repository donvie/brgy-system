<template>
  <q-layout class="bg-grey-2">
    <q-footer bordered>
      <q-toolbar class="toolbar">
        <q-toolbar-title class="text-body1 text-center">
          © 2021 Barangay Management System with Contact Tracing, Brgy. Calulut San Fernando City
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <q-page class="flex flex-center">
        <q-card bordered class="my-login no-shadow q-pa-lg">
          <q-item class="q-mt-md">
            <q-item-section>
              <q-item-label class="text-h4">Sign in</q-item-label>
              <q-item-label class="text-subtitle1">
                Barangay Management System with Contact Tracing
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-card-section class="q-mt-sm">
            <q-input ref="email" class="q-mb-sm" v-model="email" label="Username" :rules="[val => !!val || 'Username is required']">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input ref="password" class="q-mb-sm" :type="isPwd ? 'password' : 'text'" v-model="password" label="Password" :rules="[val => !!val || 'Password is required']">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append v-if="password && password.length > 0">
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn @click="login()" :loading="isLoading" :disable="isLoading" unelevated color="primary">Login</q-btn>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      isLoading: false,
      isPwd: true
    }
  },
  methods: {
    // createAccount () {
    //   this.$feathersClient.service('users').create({
    //     email: this.email,
    //     password: this.password,
    //     role: 'Admin'
    //   }).then(data => {
    //     this.$q.notify({
    //       position: 'top',
    //       color: 'positive',
    //       timeout: 2000,
    //       icon: 'check',
    //       message: 'Account has been successfully created.'
    //     })
    //   })
    // },
    login () {
      this.isLoading = true
      this.$refs.email.validate()
      this.$refs.password.validate()

      this.$feathersClient.authenticate({
        strategy: 'local',
        email: this.email,
        password: this.password
      }).then((data) => {
        Vue.prototype.$user = data.user
        this.$q.notify({
          position: 'top',
          color: 'positive',
          timeout: 2000,
          icon: 'check',
          message: 'You have successfully logged in.'
        })
        this.$router.push('/')
        this.isLoading = false
      }).catch(e => {
        console.error('Authentication error', e)
        this.$q.notify({
          position: 'top',
          color: 'negative',
          timeout: 2000,
          icon: 'error',
          message: 'Error!'
        })
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.toolbar
  min-height: 36px
.my-login
  width: 100%
  max-width: 450px
  height: 460px
</style>
