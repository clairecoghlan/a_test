<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    vuetify-google-autocomplete(
      id="pass-location-map"
      label="Location"
      append-icon="search"
      placeholder="Start typing"
      v-on:placechanged="getAddressData"
    )
    br
    v-layout(horizontal)
      v-text-field(
        v-model="user.DriverProfile.carReg"
        label="Car Reg"
      )
      br
      v-text-field(
        v-model="user.DriverProfile.capacity"
        label="Capacity"
      )
    br
    v-text-field(
      list="locations"
      v-model="locations"
      label="Waypoint Locations"
    )
    datalist#locations(v-for="location in allLocations")
      option {{location}}

    driver-schedule(v-if="user.DriverProfile" v-bind:schedule="user.DriverProfile.DriverSchedules")

    br
    .error(v-html="error")
    .success(v-html="success")

</template>

<script>
// import Vue from 'vue'
// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import DriverSchedule from './DriverSchedule'

export default {
  name: 'ProfileDriver',
  components: {
    DriverSchedule
  },
  data () {
    return {
      // user: {},
      allLocations: ['Aghada', 'Midleton', 'Tivoli', 'Lower Rd', 'Town Centre'],
      locations: '',
      success: '',
      error: ''
    }
  },
  props: {
    user: {
      // default: {
      //   DriverProfile: {
      //     location: '',
      //     carReg: '',
      //     capacity: 4
      //   }
      // }
    }
    // schedule: Array
  },
  methods: {
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
