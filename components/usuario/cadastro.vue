<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title class="green lighten-1 white--text">
                Cadastro de usuário
                <v-spacer></v-spacer>
                <v-btn icon large @click.prevent.stop="cancelarRegistro" color="white">X</v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required, rules.counter]" v-model="item.nome" label="Nome"
                                    outlined dense required validate-on-blur></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required, rules.cpfValido]" validate-on-blur v-model="item.cpf"
                                    label="CPF" outlined dense v-mask="['###.###.###-##']" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field :rules="[rules.required]" validate-on-blur v-model="item.tel" label="Telefone"
                                    outlined dense v-mask="['(##)#####-####']"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="3">
                                <v-autocomplete :rules="[rules.required]" label="Tipo de usuário" outlined auto-select-first
                                    dense :items="tiposUser" :item-text="item => item.descri" :item-value="item => item.id"
                                    v-model="item.user_tipo_id" :disabled="desativarCampoTipo" @change="alterandoTipoUser">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete label="Empresa" outlined auto-select-first dense :items="listaEmpresas"
                                    :item-text="item => item.nome" :item-value="item => item.id" v-model="item.empresas_id"
                                    :disabled="desativarCampoEmpresa" :error-messages="formErros.empresaReqerida">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field type="email" :rules="[rules.email, rules.required]" v-model="item.login"
                                    label="Login" outlined dense></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field type="password" v-model="item.senha" label="Senha" outlined dense
                                    :error-messages="formErros.senha" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field type="password" v-model="senhaCompare" label="Repetir Senha" outlined dense
                                    required :error-messages="formErros.senha"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-autocomplete label="Status" outlined auto-select-first dense :items="status"
                                    :item-text="item => item.descri" :item-value="item => item.id"
                                    v-model="item.ativo_status_id">
                                    <template v-slot:item="{ item }">
                                        <span :class="corStatus(item.id)">
                                            {{ item.descri }}
                                        </span>
                                    </template>
                                    <template v-slot:selection="{ item }">
                                        <span :class="corStatus(item.id)">
                                            {{ item.descri }}
                                        </span>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvarItem(item)">Salvar
                </v-btn>
                <v-btn color="secondary" elevation="2" outlined dense @click.prevent.stop="cancelarRegistro">
                    Cancelar</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
    props: ['item', 'isEdit', 'open'],
    async mounted() {
        this.configTipoUser(this.$store.state.user)
        this.alterandoTipoUser()
        const { dados } = await this.$axios.$get('/empresas')
        this.listaEmpresas = dados.registros
    },
    data() {
        return {
            valid: true,
            senhaCompare: null,
            desativarCampoTipo: false,
            desativarCampoEmpresa: false,
            listaEmpresas: [],
            status: [
                { id: 1, descri: "ATIVO" },
                { id: 2, descri: "INATIVO" }
            ],
            formErros: {
                login: null,
                senha: null,
                nivel: null,
                empresaReqerida: null
            },
            rules: {
                required: value => !!value || 'Requerido!',
                counter: value => value.length >= 6 || 'Min. de 6 dígitos!',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Email inválido'
                },
                cpfValido: value => this.$cpfValido(value) || 'CPF inválido!',
                senhaDiferente: value => this.checkSenha(value) || 'Senha não confere! Repita a mesma senha.'
            },
            tiposUser: []
        }
    },
    methods: {
        alterandoTipoUser() {
            if (this.$store.state.user.user_tipo_id > 2) {
                this.desativarCampoEmpresa = true
                return
            }
            if (this.item.user_tipo_id === 4 || this.item.user_tipo_id === 2) {
                this.desativarCampoEmpresa = true
                this.item.empresas_id = null
            } else {
                this.desativarCampoEmpresa = false
            }
        },
        async configTipoUser(user) {
            let lista = [
                { id: 1, descri: "ADM ROOT" },
                { id: 2, descri: "ADM INEA" },
                { id: 3, descri: "ADM EMPRESA" },
                { id: 4, descri: "FISCAL INEA" },
                { id: 5, descri: "FUNCIONÁRIO" }
            ]

            // ADM ROOT
            if (this.$store.state.user.user_tipo_id === 1) {
                this.tiposUser = lista
                return false
            }

            // ADM FISCAL
            if (this.$store.state.user.user_tipo_id === 2) {
                this.tiposUser = [
                    { id: 2, descri: "ADM INEA" },
                    { id: 3, descri: "ADM EMPRESA" },
                    { id: 4, descri: "FISCAL INEA" }
                ]

                return false
            }

            //ADM EMPRESAS
            if (user.user_tipo_id === 3) {
                this.tiposUser = [
                    { id: 3, descri: "ADM EMPRESA" },
                    { id: 5, descri: "FUNCIONÁRIO" }
                ]
                this.desativarCampoEmpresa = true
                this.item.empresas_id = user.empresas_id
                return false
            }
            return true
        },
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },
        formValido() {
            const campoVazio = 'Preencha este campo!'
            const minCaractere = 'Preencha com o min. de '
            let qtdErros = null
            this.formErros.senha = ''
            return !qtdErros

        },
        checkSenha() {
            let qtdErros = null
            this.formErros.senha = ''
            if (!this.item.senha && !this.isEdit) {
                qtdErros++
                this.formErros.senha = 'Cadastre uma senha!'
                console.log(this.item?.senha?.length);
            } else {
                if (this.item.senha && this.item.senha.length < 6) {
                    qtdErros++
                    this.formErros.senha = 'Deve conter no mín. 6 caracteres!'
                } else {
                    if (this.item.senha && this.item.senha !== this.senhaCompare) {
                        qtdErros++
                        this.formErros.senha = 'As senha não conferem!'
                    }
                }
            }

            return !qtdErros
        },

        async salvarItem(item) {
            if (!this.checkSenha()) {
                return
            }
            if (!this.$refs.form.validate()) {
                return
            }
            if (this.item.user_tipo_id === 3 || this.item.user_tipo_id === 5) {
                if (!this.item.empresas_id) {
                    this.formErros.empresaReqerida = 'Selecione a empresa!'
                    return
                }
            }

            if (!this.isEdit) {
                this.createItem(item)
            } else {

                this.updateItem(item)
            }

        },
        async createItem(item) {
            try {
                delete item.id
                const user = await this.$axios.$post(`/usuario`, item)
                this.exibSnack('Registro salvo com sucesso!', 'success')
                this.$emit('atualizarListagem')
                this.$emit('close')
            } catch (erro) {
                this.exibSnack('Não foi possível salvar o registro! Verifique os dados e tente novamente', 'error')
                console.log(erro);
            }
        },
        async updateItem(item) {
            try {
                const user = await this.$axios.$put(`/usuario/${item.id}`, item)
                this.exibSnack('Registro salvo com sucesso!', 'success')
                this.$emit('atualizarListagem')
                this.$emit('close')
            } catch (erro) {
                this.exibSnack('Não foi possível salvar o registro! Verifique os dados estão corretos ou já poussua outro usuário com esses dados!', 'error')
                console.log(erro);
            }
        },
        cancelarRegistro() {
            this.$emit('close')
        },
        async deleteItem(item) {
            try {
                await this.$axios.$delete(`/usuario/${item.id}`)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.exibSnack('Registro exluído com sucesso!', 'success')
            } catch (erro) {

                this.exibSnack('Não foi possível excluir o registro!', 'error')
                console.log(erro);
            }
        },
        exibSnack(texto, cor) {
            this.$emit('exibSnack', texto, cor)
        },



    }
}
</script>

<style>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>