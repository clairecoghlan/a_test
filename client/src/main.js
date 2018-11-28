// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from '@/store/Store.js'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyAx_hQgeWDJILn7Hy6FJ0rNrjtXfbQ-O0k'
  // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
})

Vue.use(Vuetify)
Vue.use(Vuetify, {
  iconfont: 'mdi' // use the material-design-icons
})
Vue.config.productionTip = false
// create a global state
// Vue.prototype.$test = '12345'
Vue.prototype.$state = store

const global = {
  getUser () {
    if (!this.isLoggedIn) return false
    let user = this.user
    console.log('System has Logged in User', user.email)
    return user
  },
  // isLoggedIn () {
  //   return this.$state.state.isLoggedIn
  // },
  isLoggedOut () {
    return !this.isLoggedIn
  },
  isDriver () {
    console.log(`IsDriver? ${!this.isPassenger()}`)
    return !this.isPassenger()
  },
  isPassenger () {
    let user = this.getUser()
    console.log(`IsPassenger? ${user && user.isPassenger}`)
    return user && user.isPassenger
  },
  isAdmin () {
    let user = this.getUser()
    return user && user.isAdmin
  }
}
Vue.prototype.$someStangeName = 'jim'

Vue.mixin({
  methods: global,
  data () {
    return {
      isLoggedIn: false,
      someStrangeVar: 'tom'
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mixins: [global] // may trash other mixins
})
