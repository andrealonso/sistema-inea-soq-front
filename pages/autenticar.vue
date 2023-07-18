<template>
    <v-container fluid class="fill-height justify-center align-center">
        <v-progress-circular :size="70" :width="7" color="success" indeterminate></v-progress-circular>
    </v-container>
</template>

<script>
export default {
    layout: 'vazio',
    async beforeMount() {
        try {
            const sessionUser = JSON.parse(sessionStorage.getItem('user'))
            if (sessionUser && !this.$store.state.user.user_tipo_id) {
                const responseUser = await this.getUser(sessionUser.token)
                if (responseUser) {
                    this.$store.commit('user/STORE_USER', responseUser)
                    this.$router.push({ path: '/agendamentos' })
                } else { this.$router.push({ path: '/login' }) }
            } else { this.$router.push({ path: '/login' }) }

        } catch (error) {
            console.log(error);
            this.$router.push({ path: '/login' })
        }
    },
    methods: {
        async getUser(token) {
            try {
                const { usuario } = await this.$axios.$get('/login/getuser', { headers: { 'Authorization': token } })
                return usuario
            } catch (erro) {
                console.log(erro);
                return null
            }
        },
    }
}
</script>

<style></style>