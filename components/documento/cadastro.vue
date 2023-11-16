<template>
    <v-dialog v-model="open" persistent max-width="500">
        <v-card>
            <v-card-title class="green lighten-1 white--text">
                Cadastro de documentos
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="[rules.required]" v-model="item.descricao" label="Descrição" outlined
                                    dense hide-spin-buttons></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-file-input v-model="arquivoSelecionado" show-size outlined dense
                                    :rules="[rules.required]" label="Selecionar o arquivo."></v-file-input>
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

export default {
    props: ['item', 'open', 'destinatario', 'destId'],
    data() {
        return {
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
            const resp = await this.$uploadFile(this.item.descricao, this.destinatario, this.destId, this.arquivoSelecionado)
            if (!resp) {
                this.exibAlert('Não foi possível salvar o arquivo. Verifique o tamanho e o tipo de arquivo.')
            } else {
                this.arquivoSelecionado = null
                this.$emit('atualizarListDocs')
                this.$emit('close')
            }
        },
        cancelar() {
            this.$emit('close')
        },

    }
}
</script>

