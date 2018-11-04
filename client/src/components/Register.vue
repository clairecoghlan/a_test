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
    .error(v-html="error")
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
      msg: 'This is the Register Component',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red
  }
</style>
