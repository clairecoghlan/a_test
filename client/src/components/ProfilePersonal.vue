<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    v-text-field(
      type="email"
      v-model="user.email"
      label="Email"
    )
    br
    // name="password" - stop autocomplete
    v-text-field(
      type="password"
      v-model="user.password"
      label="Password"
    )
    br
    v-container(fluid)
      v-layout(row wrap dark).dark--text

        <!--v-on:change="toggleIsPassenger"-->
        v-switch(
        v-on:change="toggleIsDriver"
          v-model="dataIsDriver"
          label="Driver Profile"
        )
        <!--span.v-input__control Driver Profile-->
        v-switch(
          v-on:change="toggleIsDriverOnly"
          v-model="user.isPassenger"
          label="Passenger Profile"
        )
        vuetify-google-autocomplete(
          id="map"
          label="Location"
          append-icon="search"
          placeholder="Start typing"
          v-on:placechanged="getAddressData"
        )
      br
      .error(v-html="error")
      .success(v-html="success")
      <!--br-->
      <!--v-btn(@click="" dark).cyan Save-->

</template>

<script>
import Vue from 'vue'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyAx_hQgeWDJILn7Hy6FJ0rNrjtXfbQ-O0k'
  // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
})

export default {
  name: 'ProfilePersonal',
  data () {
    return {
      // user: {},
      dataIsDriver: !this.user.isPassenger,
      success: '',
      error: ''
    }
  },
  mounted () {
    dataIsDriver = !this.user.isPassenger
  },
  props: [
    'user'
  ],
  computed: {
  },
  methods: {
    toggleIsDriverOnly () {
      this.dataIsDriver = !this.dataIsDriver
    },
    toggleIsDriver () {
      console.log(`driver: switching driver to ${!this.dataIsDriver}`)
      this.dataIsDriver = this.user.isPassenger
      this.toggleIsPassenger()
    },
    toggleIsPassenger () {
      console.log(`pass: switching passenger to ${!this.user.isPassenger}`)
      this.user.isPassenger = !this.user.isPassenger
    },
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function (addressData, placeResultData, id) {
      console.log(addressData, placeResultData, id)
      this.address = addressData
    }

  }
}
</script>

<style scoped>

</style>
