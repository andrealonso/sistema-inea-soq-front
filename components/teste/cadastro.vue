<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title class="green lighten-1 white--text">
                {{ tituloPagina }}
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-card>
                        <v-row dense>
                            <v-col cols="12" class="d-flex align-center">
                                <v-subheader>Documentos</v-subheader>
                                <v-btn class="" icon small color="success">
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                </v-btn>
                            </v-col>

                            <v-col cols="12" sm="4" md="4" lg="2" class="pa-2" v-for="(doc, i) in listDocs" :key="i">
                                <DocumentoCard :item="doc" :tipo="doc.ext" @excluirDoc="excluirDoc"
                                    @downloadDoc="downloadDoc" />
                            </v-col>
                        </v-row>

                        <!-- <pre>
                            {{ lista }}
                        </pre> -->
                    </v-card>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="atualizarListDocs">Atualizar
                </v-btn>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvarItem(item)">Salvar
                </v-btn>
                <v-btn color="secondary" elevation="2" outlined dense @click.prevent.stop="cancelarRegistro">
                    Cancelar</v-btn>
                <v-btn color="error" elevation="2" outlined dense @click.prevent.stop="deleteItem(item)"
                    :disabled="!isEdit">Excluir
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
            <dialogConfirme @sim="deleteItem(item)" @nao="deleteConfirme = false" :dlg-confirme="deleteConfirme"
                texto="Tem certeza que deseja excluir este registro?" cor="error" titulo="Confirme exclusão!" />
        </v-card>
        <DocumentoCadastro v-if="exibCadastro" :open="exibCadastro" @close="exibCadastro = false"
            @cancelar="exibCadastro = false" @atualizarListagem="atualizarListDocs" :item="payload" />
    </v-dialog>
</template>

<script>

export default {
    props: ['destinatario'],
    data() {
        return {
            valid: true,
            listDocs: [],
            item: { id: 1 },
            deleteConfirme: false,
            exibCadastro: false,
            itemOld: { ...this.item },
            status: [
                { id: 1, descri: "ATIVO" },
                { id: 2, descri: "INATIVO" }
            ],
            rules: {
                required: value => !!value || 'Requerido!',
            },

        }
    },
    methods: {
        async atualizarListDocs() {
            try {
                let resposta = await this.$axios.$get(`/documentos/filtrar?${this.destinatario}`)
                this.listDocs = resposta.dados
                if (!resposta?.erro) {
                    this.listDocs = resposta.dados
                } else {
                    this.listDocs = []
                }
            } catch (error) {
                this.listDocs = []
                console.log({ error });
            }
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