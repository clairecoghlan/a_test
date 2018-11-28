<template lang="pug">
    v-toolbar(:key="someStrangeVar" fixed dark).cyan
      v-toolbar-title
        span(@click="routeTo ('/')").clickable Car Share
      v-toolbar-items
        <!--v-btn(flat dark) Browse-->
      v-spacer
      v-toolbar-items
        // router-link(to="register")
        //  v-btn(flat dark) Sign Up
        v-btn(flat dark @click="daysOfWeek") WeekDays
        v-btn(flat dark @click="routeTo ('profile')") Profile
        v-btn(flat dark @click="logout") Logout
        v-btn(flat dark @click="routeTo ('login')") Login
        v-btn(flat dark @click="routeTo ('register')") Sign Up
        <!--span(v-if="isLoggedIn") {{user.email}}-->
        <!--span {{isLoggedIn}}-->
        <!--span {{this.$someStrangeName}}-->

</template>

<script>
import UtilServices from '@/services/UtilServices'
export default {
  name: 'PageHeader',
  methods: {
    routeTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.user = null
      this.isLoggedIn = false
      this.routeTo('home')
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
