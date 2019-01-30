import Api from '@/services/Api'

// these are all the exposed endpoints of the Authentication service
export default {
  getProfile (user) {
    console.log('get User Profile  via Api()', user)
    return Api().get(`profile/${user.id}`, user)
  },
  saveProfile (user) {
    console.log('save User Profile  via Api()', user)
    return Api().post(`profile/${user}`, user)
  },
  getPassSchedule (user) {
    console.log('get Pass Schedule via Api()', user.PassProfile.id)
    return Api().get(`pass_schedule/${user.PassProfile.id}`, user)
  },
  getPassDrivers (user) {
    console.log('get Pass Drivers via Api()', user.id)
    return Api().get(`pass_drivers/${user.id}`, user)
  },
  getLocation (location) {

  },
  getLocations () {
    console.log('get Locations via Api()')
    return Api().get(`locations/`)
  }
}
