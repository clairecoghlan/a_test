import Api from '@/services/Api'

// these are all the exposed endpoints of the Authentication service
export default {
  register (credentials) {
    console.log('registering credentials via Api()')
    return Api().post('register', credentials)
  },
  login (credentials) {
    console.log('login credentials via Api()')
    return Api().post('login', credentials)
  }
}
