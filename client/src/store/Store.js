module.exports = {
  state: {
    user: {
      id: 1,
      email: 'autologin@hotmail.com'
    }
  },
  methods: {
    isLoggedIn () {
      // this causing errors
      return this.state.user !== null
    }
  }
}
