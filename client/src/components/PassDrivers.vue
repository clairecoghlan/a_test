<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    v-btn(@click="getPassDrivers" dark).cyan Search

    table(striped)
      thead
        tr
          td(colspan="1") Driver
          td(colspan="1") Pick up Location
      tbody

        tr(v-for="driver in drivers")
          td {{driver.driverEmail}}
          td {{driver.location}}
</template>

<script>
import ProfileService from '@/services/ProfileService'
export default {
  name: 'Drivers',
  data () {
    return {
      drivers: []
    }
  },
  props: {
  },
  mounted () {
    console.log('Drivers mounted')
    // this.getPassSchedule()
  },
  methods: {
    async getPassDrivers () {
      try {
        console.log('****** getPassDrivers?', this.user())
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.getPassDrivers(this.user())
        this.drivers = res.data.driverWaypoints
        // console.log('Schedule', this.schedule)
        // this.success = res.data.success
      } catch (err) {
        console.log('error?')
        this.error = err.response.data.error
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped>
table {
  width: 100%;
}

table,tr,td {
  border: 1px cyan solid;
  border-collapse: collapse;
}
td.time {
  text-align:right;
}
</style>
