<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title class="green lighten-1 white--text">
                {{ tituloPagina }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">

                                <v-text-field :rules="[rules.required, rules.counter]" v-model="item.nome" label="Nome"
                                    outlined dense :error-messages="formErros.nome" required
                                    validate-on-blur></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required, rules.cpfValido]" validate-on-blur
                                    v-model="item.cpf_cnpj" label="CPF" outlined dense v-mask="['###.###.###-##']" required
                                    :error-messages="formErros.cpf"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required]" validate-on-blur v-model="item.telefone"
                                    label="Telefone" outlined dense v-mask="['(##)#####-####']"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required, rules.email]" validate-on-blur type="email"
                                    v-model="item.email" label="Email" outlined dense></v-text-field>
                            </v-col>
                            <!--         Cadastro de Usuário          -->
                            <template v-if="exibUsuario">
                                <template v-if="!isEdit">
                                    <v-col cols="12" sm="12" md="12">
                                        <h4>Login de acesso:</h4>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field type="email" @focus="copiaEmail" :rules="[rules.required]"
                                            validate-on-blur v-model="item.usuario.login" label="Login (Email)" outlined
                                            dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-autocomplete label="Status" :rules="[rules.required]" validate-on-blur outlined
                                            auto-select-first dense :items="status" :item-text="item => item.descri"
                                            :item-value="item => item.id" v-model="item.usuario.ativo_status_id">
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
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field type="password" :rules="[rules.required]" validate-on-blur
                                            v-model="item.usuario.senha" label="Senha" outlined dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field type="password" :rules="[rules.required, rules.senhaDiferente]"
                                            validate-on-blur v-model="senhaRepetida" label="Repetir senha" outlined
                                            dense></v-text-field>
                                    </v-col>
                                </template>
                            </template>
                            <v-col cols="12" sm="12" md="12" class="border p-2" v-if="isEdit">
                                <v-card elevation="1" class="pa-2">
                                    <div class="w-100 d-flex align-center">
                                        <strong>Perfil de acesso: </strong>
                                        <v-btn @click.prevent="configUsuario(item.usuario)" small
                                            class="ml-2"><v-icon>mdi-pencil</v-icon></v-btn>
                                    </div><br>
                                    <strong>Status: </strong> <span
                                        :class="item.usuario.ativo_status_id == 1 ? 'green--text' : 'red--text'">{{
                                            item.usuario.ativo_status_id == 1 ? ' Ativo' : ' Inativo'
                                        }}</span><br>
                                    <strong>Login: </strong> <span>{{ item.usuario.login ? item.usuario.login : ''
                                    }}</span><br>
                                </v-card>
                            </v-col>

                            <!--         Cadastro de endereco          -->
                            <template v-if="exibEndereco">
                                <v-col cols="12" sm="6" md="3">
                                    <v-text-field v-model="item.cep" label="CEP" outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="item.endereco" label="Endereço" outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="item.bairro" label="Bairro" outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="item.cidade" label="Cidade" outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="2">
                                    <v-text-field v-model="item.uf" label="UF" outlined dense></v-text-field>
                                </v-col>
                            </template>
                            <!-- <pre>{{ item }}</pre> -->
                        </v-row>
                        <usuarioCadastro @close="exibCadUser = false" :isEditUser="isEditUser" @atualizaUser="atualizaUser"
                            :open="exibCadUser" :item="usuario" />
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvarItem(item)">Salvar
                </v-btn>
                <v-btn color="secondary" elevation="2" outlined dense @click.prevent.stop="cancelarRegistro">
                    Cancelar</v-btn>
                <v-btn color="error" elevation="2" outlined dense @click.prevent.stop="deleteItem(item)"
                    :disabled="!isEdit">Excluir
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
    props: ['item', 'isEdit', 'open'],
    data() {
        return {
            valid: true,
            tituloPagina: 'Cadastro de Fiscais',
            exibSenha: false,
            exibExpand: false,
            dialogUser: false,
            exibEndereco: false,
            exibUsuario: true,
            exibCadUser: false,
            endereco: {
                cep: null,
                rua: null,
                num: null,
                bairro: null,
                cidade: null,
                uf: null
            },
            usuario: {},
            senhaRepetida: '',
            isEditUser: false,
            status: [
                { id: 1, descri: "ATIVO" },
                { id: 2, descri: "INATIVO" }
            ],
            formErros: {
                nome: null,
                cpf: null,
                telefone: null,
                senha: null,
                senhaDiferente: null,
            },
            rules: {
                required: value => !!value || 'Requerido!',
                counter: value => value.length >= 6 || 'Min. de 6 dígitos!',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Email inválido'
                },
                cpfValido: value => this.$cpfValido(value) || 'CPF inválido!',
                senhaDiferente: value => this.comparaSenha(value) || 'Senha não confere! Repita a mesma senha.'
            },

        }
    },
    computed: {

    },
    methods: {
        copiaEmail() {
            if (!this.item.usuario.login && this.item.email) {
                this.item.usuario.login = this.item.email
            }
        },
        formValido() {
            this.formErros.nome = ''
            this.formErros.cpf = ''
            const campoVazio = 'Preencha este campo!'
            const minCaractere = 'Prrencha com o min. de '
            let qtdErros = 0
            if (!this.item?.nome) {
                this.formErros.nome = campoVazio
                qtdErros++
            }
            if (this.item?.nome?.length < 6) {
                this.formErros.nome = minCaractere + '6 caracteres'
                qtdErros++
            }
            if (!this.item?.cpf) {
                this.formErros.cpf = campoVazio
                qtdErros++
            }

            if (qtdErros > 0) {
                return false
            } else {
                return true
            }

        },
        comparaSenha(senhaRepetida) {
            if (this.item.usuario.senha !== senhaRepetida)
                return false

            return true
        },
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },
        async salvarItem(item) {
            if (!this.$refs.form.validate()) {
                return
            }
            // if (await !this.formValido()) {
            //     return
            // }
            if (!this.isEdit) {
                this.createItem(item)
            } else {
                this.updateItem(item)
            }

        },
        async createItem(item) {
            try {
                delete item.id
                await this.$axios.$post(`/pessoa`, item,)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.exibSnack('Registro salvo com sucesso!', 'success')
            } catch (error) {
                this.exibSnack('Não foi possível salvar o registro! Verifique os dados e tente novamente', 'error')
                console.log(error);
            }
        },
        async updateItem(item) {
            try {
                delete item.usuario
                await this.$axios.$put(`/pessoa/${item.id}`, item)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.exibSnack('Registro salvo com sucesso!', 'success')
            } catch (error) {
                this.exibSnack('Não foi possível salvar o registro! Verifique os dados e tente novamente', 'error')
                console.log(error);
            }
        },
        cancelarRegistro() {
            this.$emit('close')
        },
        async deleteItem(item) {
            try {
                await this.$axios.$delete(`/pessoa/${item.id}`)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.exibSnack('Registro exluído com sucesso!', 'success')
            } catch (error) {
                this.exibSnack('Não foi possível excluir o registro!', 'error')
                console.log(error);
            }
        },

        configUsuario(user) {
            if (user?.id) {
                this.isEditUser = true
            } else {
                this.isEditUser = false
            }
            this.usuario = { ...user }
            this.exibCadUser = true
        },
        atualizaUser(user) {
            this.item.usuario = { ...user }
        },
        exibSnack(texto, cor) {
            this.$emit('exibSnack', texto, cor)
        }


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