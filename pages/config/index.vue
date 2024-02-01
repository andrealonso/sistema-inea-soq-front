<template>
    <v-card id="print">
        <v-card-title>
            Configurações do Sistema
            <v-spacer></v-spacer>
            <v-btn icon large @click.prevent.stop="cancelarRegistro" color="white">X</v-btn>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container class="print">
                    <v-row dense>
                        <v-col cols="12">
                            <h3>Envio de e-mails</h3>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field :rules="[rules.required]" v-model="item.mail_user" label="Usuário do email"
                                outlined dense required validate-on-blur></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="item.mail_pass" label="Senha do email" outlined dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="item.mail_smtp" label="Endereço SMTP" outlined dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field hide-spin-buttons type="number" v-model="item.port" label="Porta SMTP" outlined
                                dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field :rules="[rules.email, rules.required]" v-model="item.mail_from"
                                label="Email de remetente" outlined dense></v-text-field>
                        </v-col>

                        <v-col cols="12" md="12">
                            <v-checkbox v-model="item.ativar_envio"
                                label="Ativar envio de e-mails automáticos."></v-checkbox>
                        </v-col>
                        <v-col cols="12">
                            <h3>Prazos</h3>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field type="number" hide-spin-buttons v-model="item.prazo_alteracao_ordem"
                                label="Prazo mínimo para alterar uma ordem. (Dias)" outlined dense></v-text-field>
                        </v-col>

                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvar">Salvar
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script>
import Impressao from '~/layouts/print.vue'
import { configModel } from '@/models/ConfigModel'

export default {
    async asyncData({ $axios }) {
        let item = {}
        try {
            const { dados } = await $axios.$get('/config/1')
            item = { ...dados }
        } catch (error) {
            console.log(error);
        }
        return { item }
    },
    data() {
        return {
            valid: true,
            item: {},
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
            },
        }
    },
    methods: {
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },

        async salvar() {
            if (!this.$refs.form.validate()) {
                return
            }
            await this.updateItem(this.item)
        },
        async updateItem(item) {
            try {
                const { dados } = await this.$axios.$put(`/config`, item)
                this.$alertaSucesso()
            } catch (error) {
                this.$alertaErro()
                console.log(error);
            }
        },
        cancelarRegistro() {
            this.$emit('close')
        },
    }
}
</script>

<style></style>