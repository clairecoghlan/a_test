<template lang="pug">
    v-toolbar(fixed dark).cyan
      v-toolbar-title
        span(@click="routeTo ('home')").clickable Car Share
      v-toolbar-items
        v-btn(flat dark) Browse
      v-spacer
      v-toolbar-items
        // router-link(to="register")
        //  v-btn(flat dark) Sign Up
        v-btn(flat dark @click="routeTo ('login')") Login
        v-btn(flat dark @click="routeTo ('register')") Sign Up

</template>

<script>
export default {
  name: 'PageHeader',
  methods: {
    routeTo (route) {
      this.$router.push(route)
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
