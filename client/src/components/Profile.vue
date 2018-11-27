<template lang="pug">
  v-layout(column)
    v-flex(xs6 offset-xs3)
      .white.elevation-2
        v-toolbar(flat dense dark).cyan
          v-toolbar-title Profile
        .container.pl-4.pr-4.pt-2.pb-2
          v-tabs
            v-tab(ripple) Personal Details
            v-tab(ripple) Passenger Details
            v-tab(ripple) Driver Details

            v-tab-item
              v-card
                v-card-text
                  profile-personal(v-bind:user="user")

            v-tab-item
              v-card
                v-card-text
                  profile-passenger(v-bind:user="user",schedule="passSchedule")

            v-tab-item
              v-card
                v-card-text
                  profile-driver(v-bind:user="user",schedule="driverSchedule")

        br
        .error(v-html="error")
        .success(v-html="success")
        br
      br
      v-btn(@click="save" dark).cyan Save

</template>

<script>
import ProfilePersonal from './ProfilePersonal'
import ProfilePassenger from './ProfilePassenger'
import ProfileDriver from './ProfileDriver'
import ProfileService from '@/services/ProfileService'

export default {
  name: 'Profile',
  components: {
    ProfilePersonal,
    ProfilePassenger,
    ProfileDriver
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        isDriver: false,
        isPassenger: true,
        PassProfile: {
          PassSchedules: []
        },
        DriverProfile: {
          DriverSchedules: []
        },
        passSchedule: [],
        driverSchedule: []
      },
      success: '',
      error: ''
    }
  },
  mounted () {
    console.log('Profile View mounted, getting passenger profile')
    this.getPassengerProfile() // .then(() => this.getPassSchedule())

    console.log('User', this.user)
  },
  methods: {
    async getPassengerProfile () {
      try {
        console.log('Getting profile')
        this.error = this.success = null // reset the feedback
        const user = this.$state.state.user
        console.log('pre profile this.$state.state', this.$state.state)
        const res = await ProfileService.getProfile(user)
        this.user = res.data.user
        console.log('user', this.user,
          'user profile', this.user.PassProfile,
          'user.profile.id', this.user.PassProfile.id,
          'user.profile.schedules', this.user.PassProfile.PassSchedules)

        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async getDriverProfile () {
      try {
        console.log('Getting driver profile')
        this.error = this.success = null // reset the feedback
        const user = this.$state.state.user
        console.log('pre profile this.$state.state', this.$state.state)
        const res = await ProfileService.getProfile(user)
        this.user = res.data.user
        console.log('user', this.user,
          'user profile', this.user.DriverProfile,
          'user.profile.id', this.user.DriverProfile.id,
          'user.profile.schedules', this.user.DriverProfile.DriverSchedules)

        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async getPassSchedule () {
      try {
        console.log('Getting Schedule')
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.getPassSchedule(this.user)
        this.schedule = res.data.schedule
        console.log('Schedule', this.schedule)
        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async save () {
      try {
        console.log('Saving Profile')
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.saveProfile(this.user)
        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
        console.log(`client: Error saving profile ${this.error}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
