<template></template>

<script>
  export default {
    name: 'home',
    layout: 'vazio',
    // async asyncData({ $axios }) {
    //   try {
    //     const resposta = await $axios.$get('/login/getuser')
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // beforeCreate() {
    //   const sessionUser = this.$store.state.user
    //   console.log('session user', sessionUser);
    //   if (!sessionUser.token)
    //     this.$router.push({ path: '/login' })
    //  }
    beforeCreate() {
      this.$nuxt.$router.push({ path: '/autenticar' })
      return
    }

  }
</script>

<style></style>