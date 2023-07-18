<template>
  <h1>HOME - SOQ</h1>
</template> 

<script>
export default {
  name: 'home',
  async asyncData({ $axios }) {
    try {
      const resposta = await $axios.$get('/login/getuser')
    } catch (error) {
      console.log(error);
    }
  },
  // beforeCreate() {
  //   const sessionUser = this.$store.state.user
  //   console.log('session user', sessionUser);
  //   if (!sessionUser.token)
  //     this.$router.push({ path: '/login' })
  // }

}
</script>

<style></style>