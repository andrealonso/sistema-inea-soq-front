<template>
    <div>
        <v-card>
            <v-row dense>
                <v-col cols="12" sm="4" md="2">
                    <v-subheader>Documentos <span>
                            <v-btn @click.prevent.stop="novoItem" icon small color="success">
                                <v-icon>mdi-plus-circle-outline</v-icon>
                            </v-btn>
                        </span>
                    </v-subheader>
                </v-col>
                <v-col v-if="!isEdit" cols="12" md="10">
                    <v-subheader class="red--text">Salve o cadastro antes de adicionar um arquivo!</v-subheader>
                </v-col>
                <v-col cols="12" sm="4" md="2" class="pa-2" v-for="(doc, i) in listDocs" :key="i">
                    <DocumentoCard :item="doc" @atualizarListDocs="atualizarListDocs" />
                </v-col>
            </v-row>
        </v-card>
        <documentoCadastro v-if="exibCadastro" :destinatario="destinatario" :destId="destId" :open="exibCadastro"
            :item="payload" @close="exibCadastro = false" @atualizarListDocs="atualizarListDocs" />
    </div>
</template>

<script>
import { documentoModel } from '@/models/DocumentoModel'
export default {
    async asyncData({ $axios }) {
        try {
            let resposta = await $axios.$get(`/documentos/filtrar?${this.destinatario}=${this.destId}`)
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
    mounted() {
        this.atualizarListDocs()
    },
    props: ['destinatario', 'isEdit', 'destId'],
    data() {
        return {
            valid: true,
            listDocs: [],
            item: { id: 1 },
            deleteConfirme: false,
            exibCadastro: false,
            itemOld: { ...this.item },
            payload: documentoModel(),
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
        novoItem() {
            if (!this.isEdit) return
            this.payload = documentoModel()
            this.exibCadastro = true
        },
        async atualizarListDocs() {
            try {
                let resposta = await this.$axios.$get(`/documentos/filtrar?${this.destinatario}=${this.destId}`)
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

<style></style>