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
                                    outlined dense required validate-on-blur></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required]" validate-on-blur v-model="item.cnpj" label="CNPJ"
                                    outlined dense v-mask="['##.###.###/####-##']" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required]" validate-on-blur v-model="item.telefone"
                                    label="Telefone" outlined dense v-mask="['(##)#####-####']"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required, rules.email]" validate-on-blur type="email"
                                    v-model="item.email" label="Email" outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="item.contato_nome" label="Nome do contato" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-mask="['(##)#####-####']" v-model="item.contato_tel"
                                    label="Telefone do contato" outlined dense></v-text-field>
                            </v-col>

                            <!--         Cadastro de endereco          -->

                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-mask="['#####-###']" v-model="item.cep" label="CEP" outlined dense
                                    @blur="consultaCep"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="8">
                                <v-text-field :rules="[rules.required]" v-model="item.rua" label="Rua" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field :rules="[rules.required]" ref="inputNum" v-model="item.num" label="Núm."
                                    outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                                <v-text-field :rules="[rules.required]" v-model="item.bairro" label="Bairro" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                                <v-text-field :rules="[rules.required]" v-model="item.cidade" label="Cidade" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field :rules="[rules.required]" v-model="item.uf" label="UF" outlined
                                    dense></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="12">
                                <v-checkbox v-model="item.parceira_inea" label="Empresa parceira do INEA." color="success"
                                    hide-details></v-checkbox>
                                <span class="text-caption">Marque essa opção se a empresa for responsável pela abertura de
                                    ordem de queima de outras
                                    empresas.</span>
                            </v-col>
                            <!-- <pre>{{ item }}</pre> -->
                        </v-row>
                        <dialogConfirme @sim="deleteItem(item)" @nao="deleteConfirme = false" :dlg-confirme="deleteConfirme"
                            texto="Tem certeza que deseja excluir este registro?" cor="error" titulo="Confirme exclusão!" />
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvarItem(item)">Salvar
                </v-btn>
                <v-btn color="secondary" elevation="2" outlined dense @click.prevent.stop="cancelarRegistro">
                    Cancelar</v-btn>
                <v-btn color="error" elevation="2" outlined dense @click.prevent.stop="deleteConfirme = true"
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
            tituloPagina: 'Cadastro de Empresas',
            deleteConfirme: false,
            itemOld: { ...this.item },
            status: [
                { id: 1, descri: "ATIVO" },
                { id: 2, descri: "INATIVO" }
            ],
            rules: {
                required: value => !!value || 'Requerido!',
                counter: value => value.length >= 6 || 'Min. de 6 dígitos!',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Email inválido'
                },
                cnpjValido: value => this.$cnpjValido(value) || 'CNPJ inválido!',

            },

        }
    },
    computed: {

    },
    methods: {
        async consultaCep() {
            const result = await this.$buscaCep(this.item.cep)
            if (result) {
                this.item.rua = result?.logradouro || null
                this.item.bairro = result?.bairro || null
                this.item.cidade = result?.localidade || null
                this.item.uf = result?.uf || null
                this.$refs.inputNum.focus()
            } else {
                this.exibSnack('CEP inválido ou não encontrado!', 'error')
                this.limparEndereco()
            }

        },
        limparEndereco() {
            this.item.rua = null
            this.item.bairro = null
            this.item.cidade = null
            this.item.uf = null
        },
        async salvarItem(item) {
            if (!this.$refs.form.validate()) {
                return
            }
            if (this.foiAlterado()) {
                if (!this.isEdit) {
                    this.createItem(item)
                } else {
                    this.updateItem(item)
                }
            } else {
                this.$emit('close')
                this.exibSnack('Registro salvo com sucesso!', 'success')
            }

        },
        foiAlterado() {
            if (JSON.stringify(this.itemOld) === JSON.stringify(this.item))
                return false
            return true
        },
        async createItem(item) {
            try {
                delete item.id
                await this.$axios.$post(`/empresa`, item,)
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
                await this.$axios.$put(`/empresa/${item.id}`, item)
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
                await this.$axios.$delete(`/empresa/${item.id}`)
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