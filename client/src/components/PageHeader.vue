<template lang="pug">
    v-toolbar(fixed dark).cyan
      v-toolbar-title
        span(@click="routeTo ('/')").clickable Car Share
      v-toolbar-items
        v-btn(flat dark) Browse
      v-spacer
      v-toolbar-items
        // router-link(to="register")
        //  v-btn(flat dark) Sign Up
        v-btn(flat dark @click="daysOfWeek") WeekDays
        v-btn(flat dark @click="routeTo ('profile')") Profile
        v-btn(flat dark @click="routeTo ('login')") Login
        v-btn(flat dark @click="routeTo ('register')") Sign Up

</template>

<script>
import UtilServices from '@/services/UtilServices'
export default {
  name: 'PageHeader',
  methods: {
    routeTo (route) {
      this.$router.push(route)
    },
    daysOfWeek () {
      console.log('creating days of week')
      UtilServices.setDaysOfWeek()
    }
  }

}
</script>

<style scoped>
.clickable {
  cursor: pointer
}
.clickable:hover {
  color: black;
}
</style>
