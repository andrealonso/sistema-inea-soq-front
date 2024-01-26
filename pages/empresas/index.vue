<template>
    <v-row justify="center" class="mb-4">
        <v-col cols="12">
            <v-card class="p-3">
                <v-card-title>
                    <h4>Lista de Empresas</h4>
                    <v-spacer></v-spacer>
                    <v-text-field dense outlined v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line
                        hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table :footer-props="listFooterOpcoes" :headers="headers" :items="listagem" :search="search" dense
                    mobile-breakpoint="400">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.actions="{ item }">
                        <v-icon @click.prevent="exibirItem(item)">mdi-pencil</v-icon>
                        <!-- <span>
                            <v-icon @click.prevent="confirmeExclusao(item)">mdi-delete</v-icon>
                        </span> -->
                    </template>
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.id="{ item }">
                        {{ item.id | zeroLeft }}
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="panel-bottom">
                <v-container>
                    <v-btn color="primary" elevation="2" outlined @click.prevent.stop="novoItem">Novo</v-btn>
                </v-container>
            </v-card>
        </v-col>
        <empresaCadastro v-if="exibCadastro" :open="exibCadastro" @close="exibCadastro = false" @cancelar="cancelar"
            @atualizarListagem="atualizarListagem" :isEdit="isEdit" :item="payload" />
        <DialogLoading v-if="isLoading" :is-loading="isLoading" :cor="'purple lighten-1'" :texto="'Atualizando dados...'" />

    </v-row>
</template>

<script>
import { empresaModel } from '~/models/EmpresaModel'
export default {
    async asyncData({ $axios }) {
        let listagem = []
        try {
            const resposta = await $axios.$get('/empresas')
            if (!resposta?.erro) {
                listagem = resposta.dados.registros
            } else {
                listagem = []
            }
            return { listagem }
        } catch (error) {
            console.log(error);
            return { listagem }
        }
    },
    name: 'proprietarios',
    data() {
        return {
            listFooterOpcoes: {
                itemsPerPageOptions: [25, 50, 100, -1],
            },
            itemSelect: null,
            dlgConfirme: false,
            exibCadastro: false,
            isEdit: false,
            isLoading: false,
            search: '',
            headers: [
                { text: 'Código', value: 'id', align: 'left', margin: '12px' },
                { text: 'Nome', value: 'nome', align: 'left' },
                { text: 'Telefone', value: 'telefone', align: 'center' },
                { text: 'Email', value: 'email', align: 'center' },
                { text: 'Contato', value: 'contato_nome', align: 'center' },
                { text: 'Tel. Contato', value: 'contato_tel', align: 'center' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' },
            ],
            exibLista: false,
            payload: empresaModel(),

        }
    },
    filters: {
        zeroLeft(num) {
            return (num).toLocaleString('en-US', {
                minimumIntegerDigits: 6,
                useGrouping: false
            })
        }
    },
    methods: {
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },
        novoItem() {
            this.payload = empresaModel()
            this.isEdit = false
            this.exibCadastro = true
        },

        async atualizarListagem() {
            try {
                const resposta = await this.$axios.$get('/empresas/')
                console.log('atualizar', resposta);
                if (!resposta?.erro) {
                    this.listagem = resposta.dados.registros
                } else {
                    this.listagem = []
                }
            } catch (error) {
                this.listagem = []
                console.log({ error });
            }
        },
        async exibirItem(item) {
            const { id } = item
            try {
                const empresa = await this.$axios.$get(`/empresa/${id}`)
                this.payload = empresaModel(empresa)
                this.exibCadastro = true
                this.isEdit = true
            } catch (error) {
                console.log(error);
            }
        },
        cancelar() {
            this.payload = empresaModel()
            this.exibCadastro = false
        }
    }
}

</script>
