<template lang="pug">
  .container
    h2 Register
    p= {msg}
    label
      span Email
      input(
        name="email"
        type="email"
        v-model="email"
      placeholder="email")
    br
    label
      span Password
      input(
        name="password"
        type="password"
        v-model="password"
      placeholder="password")
    br
    button(@click="register") Register
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      msg: 'This is the Register Component'
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
