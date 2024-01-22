<template>
    <v-dialog v-model="open" persistent max-width="500">
        <v-card>
            <v-card-title class="green lighten-1 white--text">
                Nova denúncia.
                <v-spacer></v-spacer>
                <v-btn icon large @click.prevent.stop="cancelar" color="white">X</v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field label="Data" :value="computedData" readonly v-bind="attrs" v-on="on"
                                            outlined dense></v-text-field>
                                    </template>
                                    <v-date-picker v-model="item.data" @input="menu1 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field :rules="[rules.required]" v-model="item.descricao" label="Descrição" outlined
                                    dense hide-spin-buttons></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field :rules="[rules.required]" v-model="item.num_bo" label="Número do B.O."
                                    outlined dense hide-spin-buttons></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-file-input v-model="arquivoSelecionado" show-size outlined dense
                                    prepend-inner-icon="mdi-paperclip" clearable label="Selecionar o arquivo."
                                    prepend-icon="" :value="computedData"></v-file-input>
                                <input type="file" name="file" id="file" hidden>

                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-alert v-if="alertObj.active" dense outlined :type="alertObj.type">
                    {{ alertObj.text }}
                </v-alert>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvarItem">Salvar
                </v-btn>
                <v-btn color="secondary" elevation="2" outlined dense @click.prevent.stop="cancelar">
                    Cancelar</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
    props: ['item', 'open', 'destinatario', 'destId'],
    data() {
        return {
            menu1: false,
            data: null,
            valid: true,
            arquivoSelecionado: null,
            rules: {
                required: value => !!value || 'Requerido!'
            },
            alertObj: {
                active: false,
                type: 'error',
                text: 'Texto'
            }

        }
    },
    computed: {
        computedData() {
            moment.locale('pt-br')
            return this.item.data ? moment(this.item.data).format('L') : ''
        },
    },
    methods: {
        exibSnack(texto, cor) {
            this.snack.color = cor || ''
            this.snack.text = texto || ''
            this.snack.active = true
        },
        exibAlert(texto, type) {
            this.alertObj.type = type || 'error'
            this.alertObj.text = texto || ''
            this.alertObj.active = true
        },
        async salvarItem() {
            if (!this.$refs.form.validate())
                return
            delete this.item.id
            const { dados } = await this.$axios.$post(`/denuncia`, this.item,)
            this.$alertaSucesso()

            if (!dados) {
                this.$alertaErro('Não foi possível salvar o registro.')
            } else {
                if (this.arquivoSelecionado) {
                    this.salvarDocumento(dados)
                } else {
                    this.$emit('atualizarLista')
                    this.$emit('close')
                }
            }
        },
        async salvarDocumento(denuncia) {
            if (!this.$refs.form.validate())
                return
            console.log(denuncia);
            const resp = await this.$uploadFile(`ordem-${denuncia.agenda_id}-${denuncia.descricao}`, 'denuncia_id', denuncia.id, this.arquivoSelecionado)
            if (!resp) {
                this.exibAlert('Não foi possível salvar o arquivo. Verifique o tamanho e o tipo de arquivo.')
            } else {
                this.arquivoSelecionado = null
                this.$emit('atualizarLista')
                this.$emit('close')
            }
        },
        cancelar() {
            this.$emit('close')
        },

    }
}
</script>

