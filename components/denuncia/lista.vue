<template>
    <v-card flat>
        <v-data-table :headers="headers" :items="lista" dense mobile-breakpoint="400">

            <!-- eslint-disable-next-line -->
            <template v-slot:item.actions="{ item }">
                <v-icon v-if="item.documentos.length" @click.prevent="download(item)">mdi-file</v-icon>
                <span>
                    <v-icon @click.prevent="deleteItem(item)">mdi-delete</v-icon>
                </span>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.data="{ item }">
                {{ item.data | formatData }}
            </template>

        </v-data-table>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" elevation="2" outlined dense @click.prevent.stop="novaDenuncia(agendaId)">Nova
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
        <denunciaCadastro :item="denuncia" v-if="exibCadDenuncia" :open="exibCadDenuncia" destinatario="agenda_id"
            :destId="agendaId" @close="exibCadDenuncia = false" @atualizarLista="atualizarListaDenuncias" />
    </v-card>
</template>

<script>
import moment from 'moment'
import { denunciaModel } from '../../models/DenunciaModel'
export default {
    props: ['listagem', 'agendaId'],
    data() {
        return {
            lista: this.listagem || [],
            denuncia: {},
            exibCadDenuncia: false,
            headers: [
                { text: 'Data', value: 'data', align: 'left', margin: '12px' },
                { text: 'Descrição', value: 'descricao', align: 'left', margin: '12px' },
                { text: 'Num. B.O.', value: 'num_bo', align: 'left' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' },
            ],
        }
    },
    filters: {
        formatData(data) {
            return moment.utc(data).format('DD/MM/YYYY')
        }
    },
    methods: {
        novaDenuncia(agenda) {
            this.denuncia = denunciaModel()
            this.denuncia.agenda_id = this.agendaId
            this.denuncia.data = moment().format('YYYY-MM-DD')
            this.exibCadDenuncia = true
        },
        async atualizarListaDenuncias() {
            try {
                this.lista = []
                const lista = await this.$axios.$get(`denuncias/filtrar?agenda_id=${this.agendaId}`)
                this.lista = lista.dados
            } catch (error) {
                console.log(error);
            }

        },
        teste() {
            console.log(this.agendaId);
        },
        async deleteItem(item) {
            if (await this.$confirmaExclusao()) {
                try {
                    const resp = await this.$axios.$delete(`denuncia/${item.id}`)
                    this.atualizarListaDenuncias()
                    this.$alertaSucesso('Registro excuído com sucesso!')
                } catch (error) {
                    console.log(error);
                    this.$alertaErro('Ocorreu um erro ao tentar excluir o registro!')
                }
            }
        },
        async download(item) {

            if (item.documentos.length)
                this.$downloadFile(item.documentos[0])

        }

    }
}
</script>

<style></style>