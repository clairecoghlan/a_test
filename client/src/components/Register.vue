input(
name="email"
type="email"
v-model="email"
placeholder="email")
<template lang="pug">
    v-layout(column)
      v-flex(xs6 offset-xs3)
        .white.elevation-2
          v-toolbar(flat dense dark).cyan
            v-toolbar-title Register
          .container.pl-4.pr-4.pt-2.pb-2
            // name="email" - stop autocomplete
            v-text-field(
              type="email"
              v-model="email"
              label="Email"
            )
            br
            // name="password" - stop autocomplete
            v-text-field(
              type="password"
              v-model="password"
              label="Password"
            )
            br
            .error(v-html="error")
            br
            v-btn(@click="register" dark).cyan Register

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
