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
    v-text-field(
      list="locations"
      v-model="locations"
      label="Pickup Locations"
    )
    datalist#locations(v-for="location in allLocations")
      option {{location}}

    br
    .error(v-html="error")
    .success(v-html="success")
    br
    v-btn(@click="" dark).cyan Save

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
      user: {},
      allLocations: ['Aghada', 'Midleton', 'Tivoli', 'Lower Rd', 'Town Centre'],
      locations: '',
      passProfile: {
        location: ''
      },
      driverProfile: {},
      success: '',
      error: ''
    }
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
