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

                            <!--         Cadastro de endereco          -->
                            <template v-if="exibEndereco">

                                <v-col cols="12" sm="6" md="2">
                                    <v-text-field v-mask="['#####-###']" v-model="item.enderecos.cep" label="CEP" outlined
                                        dense @blur="consultaCep"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field :rules="[rules.required]" v-model="item.enderecos.rua" label="Rua"
                                        outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="2">
                                    <v-text-field :rules="[rules.required]" ref="inputNum" v-model="item.enderecos.num"
                                        label="Núm." outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="5">
                                    <v-text-field :rules="[rules.required]" v-model="item.enderecos.bairro" label="Bairro"
                                        outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="5">
                                    <v-text-field :rules="[rules.required]" v-model="item.enderecos.cidade" label="Cidade"
                                        outlined dense></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="2">
                                    <v-text-field :rules="[rules.required]" v-model="item.enderecos.uf" label="UF" outlined
                                        dense></v-text-field>
                                </v-col>

                            </template>
                            <!-- <pre>{{ item }}</pre> -->
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
            tituloPagina: 'Cadastro de Representantes',
            exibSenha: false,
            dialogUser: false,
            exibEndereco: true,
            exibUsuario: true,
            exibCadUser: false,
            endereco: {},
            usuario: {},
            senhaRepetida: '',
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
        async consultaCep() {
            const cep = this.item.enderecos.cep.replace(/\D/g, '')
            const validaCep = /^[0-9]{8}$/
            if (!cep || !validaCep.test(cep)) {
                this.exibSnack('CEP inválida ou não encontrado!', 'error')
                this.limparEndereco()
                return
            }
            try {
                const result = await this.$axios.$get(`http://viacep.com.br/ws/${cep}/json/`)
                this.item.enderecos.rua = result?.logradouro || null
                this.item.enderecos.bairro = result?.bairro || null
                this.item.enderecos.cidade = result?.localidade || null
                this.item.enderecos.uf = result?.uf || null
                this.$refs.inputNum.focus()
                if (result?.erro) {
                    this.exibSnack('CEP inválida ou não encontrado!', 'error')
                    this.limparEndereco()
                    return
                }
            } catch (error) {
                this.exibSnack('CEP inválida ou não encontrado!', 'error')
                this.limparEndereco()
            }
        },
        limparEndereco() {
            this.item.enderecos.rua = null
            this.item.enderecos.bairro = null
            this.item.enderecos.cidade = null
            this.item.enderecos.uf = null
        },
        formValido() {
        },
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },
        async salvarItem(item) {
            if (!this.$refs.form.validate()) {
                return
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