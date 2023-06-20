<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title>Perfil de Acesso</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field v-model="item.login" label="Login" outlined dense
                                :error-messages="formErros.login" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field type="password" v-model="item.senha" label="Senha" outlined dense
                                :error-messages="formErros.senha" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field type="password" v-model="senhaCompare" label="Repetir Senha" outlined dense
                                :error-messages="formErros.senha" required></v-text-field>
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
                <pre>{{ item }}</pre>
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
    props: ['item', 'isEditUser', 'open'],
    data() {
        return {
            senhaCompare: null,
            status: [
                { id: 1, descri: "ATIVO" },
                { id: 2, descri: "INATIVO" }
            ],
            formErros: {
                login: null,
                senha: null,
                nivel: null
            }
        }
    },
    methods: {
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },
        formValido() {
            const campoVazio = 'Preencha este campo!'
            const minCaractere = 'Preencha com o min. de '
            let qtdErros = null
            this.formErros.login = ''
            this.formErros.senha = ''
            if (!this.item?.login) {
                this.formErros.login = campoVazio
                qtdErros++
            }
            if (this.item.senha === '') this.item.senha = null
            if (!this.item?.senha && !this.isEditUser) {
                this.formErros.senha = campoVazio
                qtdErros++
            }

            if (this.item?.login?.length < 6) {
                this.formErros.login = minCaractere + '6 caracteres'
                qtdErros++
            }
            if (this.item?.senha?.length < 6) {
                this.formErros.senha = minCaractere + '6 caracteres'
                qtdErros++
            } else if (this.item?.senha !== this.senhaCompare) {
                this.formErros.senha = "As senhas estão diferentes"
                qtdErros++
            }
            return !qtdErros

        },

        async salvarItem(item) {
            if (await !this.formValido()) {
                return
            }

            if (!this.isEditUser) {
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
                this.$emit('atualizaUser', item)
                this.$emit('close')
            } catch (error) {
                this.exibSnack('Não foi possível salvar o registro! Verifique os dados e tente novamente', 'error')
                console.log(error);
            }
        },
        async updateItem(item) {
            try {
                const user = await this.$axios.$put(`/usuario/${item.id}`, item)
                this.exibSnack('Registro salvo com sucesso!', 'success')
                this.$emit('atualizaUser', item)
                this.$emit('close')
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