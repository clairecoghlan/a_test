module.exports = {
  state: {
    user: null
  },
  isLoggedIn () {
    // this causing errors
    return this // .state.user // .state.user == null
  }
}
