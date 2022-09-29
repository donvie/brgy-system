import { LocalStorage } from 'quasar'
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')
const auth = require('@feathersjs/authentication-client')

const socket = io('http://localhost:3030')
const app = feathers();

app.configure(socketio(socket))
app.configure(auth())

export default async ({ Vue, router }) => {
  Vue.prototype.$feathersClient = app

  Vue.prototype.$user = null
  if (LocalStorage.getItem('feathers-jwt')) {
    const data = await app.reAuthenticate()
    Vue.prototype.$user = data.user
  }

  router.beforeEach((to, from, next) => {
    let currentUser = LocalStorage.getItem('feathers-jwt')
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) {
      next('/login')
    } else if (!requiresAuth && currentUser) {
      next('/')
    } else {
      next()
    }
  })
}