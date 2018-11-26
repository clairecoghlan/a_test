<template lang="pug">
  v-layout(column)
    v-flex(xs6 offset-xs3)
      .white.elevation-2
        v-toolbar(flat dense dark).cyan
          v-toolbar-title Profile
        .container.pl-4.pr-4.pt-2.pb-2
          v-tabs
            v-tab(ripple) Personal Details
            v-tab(ripple) Passenger Details
            v-tab(ripple) Driver Details

            v-tab-item
              v-card
                v-card-text
                  profile-personal

            v-tab-item
              v-card
                v-card-text
                  profile-passenger

            v-tab-item
              v-card
                v-card-text
                  This is some Driver text

</template>

<script>
import ProfilePersonal from './ProfilePersonal'
import ProfilePassenger from './ProfilePassenger'
export default {
  name: 'Profile',
  components: {
    ProfilePersonal,
    ProfilePassenger
  }
}
</script>

<style scoped>

</style>
