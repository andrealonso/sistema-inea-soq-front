<template>
    <v-container fluid class="fill-height">
        <v-row class="justify-center ">
            <v-col cols="12" md="4">

                <v-card v-if="!logado">
                    <v-card-title class="justify-center">
                        Sistema de Ordem de Queima
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-col cols="12" class="mt-7">
                                <v-text-field validate-on-blur :rules="[rules.required, rules.email]" type="email"
                                    v-model="userData.login" @keypress.enter="efetuarLogin" label="Login - Email" outlined
                                    dense required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field validate-on-blur :rules="[rules.required]" type="password"
                                    v-model="userData.senha" @keypress.enter="efetuarLogin" ref="senha" label="Senha"
                                    outlined dense required></v-text-field>
                            </v-col>
                        </v-form>
                        <snack-login v-if="snack.active" :snack="snack" @close="snack.active = false" />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="efetuarLogin">Login</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>

                </v-card>
                <v-card v-if="logado">
                    <v-card-text class="p-4 text-center">

                    </v-card-text>
                </v-card>
                <pre>{{ }}</pre>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    layout: 'login',
    data() {
        return {
            valid: true,
            logado: false,
            userData: {
                login: '',
                senha: ''
            },
            snack: {
                active: false,
                text: "teste",
                timeout: 3000,
                color: "primary"
            },
            rules: {
                required: value => !!value || 'Requerido!',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Digite o email corretamente!'
                },
            },
        }
    },
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
        exibSnack(texto, cor) {
            this.snack.color = cor || ''
            this.snack.text = texto || ''
            this.snack.active = true
        },
        async efetuarLogin(context) {
            try {
                if (!this.$refs.form.validate()) {
                    return
                }
                const dados = await this.$axios.$post(`/login`, this.userData)
                if (!dados.erro) {
                    const { usuario } = dados
                    sessionStorage.setItem('user', JSON.stringify(usuario))
                    this.$store.commit('user/STORE_USER', usuario)
                    this.$router.push({ path: '/agendamentos' })
                }
            } catch (error) {
                this.exibSnack('Login ou senha inválida!', 'error')
                sessionStorage.removeItem('userToken')
                console.log(error);
            }
        }
    }

}
</script>

