<template>
    <v-row justify="center" class="mb-4">
        <v-col cols="12">
            <v-card class="p-3">
                <v-card-title>
                    <h4>Lista de Propriedades</h4>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="listagem" :search="search" dense mobile-breakpoint="400">
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

        <propriedadesCadastro v-if="exibCadastro" :open="exibCadastro" @close="exibCadastro = false" @cancelar="cancelar"
            @atualizarListagem="atualizarListagem" @exibSnack="exibSnack" :isEdit="isEdit" :item="payload"
            :lista-selecao="listaSelecao" />


        <DialogLoading v-if="isLoading" :is-loading="isLoading" :cor="'purple lighten-1'" :texto="'Atualizando dados...'" />
        <DialogConfirmacao v-if="dlgConfirme" :dlg-confirme="dlgConfirme" @nao="dlgConfirme = false" @sim="excluirItem"
            :cor="'red--text lighten-2'" titulo="Exclusão de registro."
            :texto="'Tem certeza que deseja excluir este registro?'" />

        <snackbar v-if="snack.active" :snack="snack" @close="snack.active = false" />

    </v-row>
</template>

<script>
import { propriedadeModel } from '~/models/PropriedadeModel'
export default {
    async asyncData({ $axios }) {
        let listagem = []
        try {
            const resposta = await $axios.$get('/propriedades')
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
    name: 'propriedades',
    middleware: 'auth',
    data() {
        return {
            itemSelect: null,
            dlgConfirme: false,
            exibCadastro: false,
            isEdit: false,
            isLoading: false,
            search: '',
            listaSelecao: {},
            headers: [
                { text: 'Código', value: 'id', align: 'left', margin: '12px' },
                { text: 'Nome', value: 'nome', align: 'left' },
                { text: 'Proprietário', value: 'proprietarios.nome', align: 'center' },
                { text: 'Representante', value: 'representante.nome', align: 'center' },
                { text: 'Bairro', value: 'bairro', align: 'center' },
                { text: 'Cidade', value: 'cidade', align: 'center' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' },
            ],
            exibLista: false,
            payload: propriedadeModel(),
            snack: {
                active: false,
                text: "teste",
                timeout: 2000,
                color: "primary"
            }
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
        async novoItem() {
            const { representantes, proprietarios } = await this.$axios.$get(`/propriedade/0`)
            this.listaSelecao = { representantes, proprietarios }
            this.payload = propriedadeModel()
            this.isEdit = false
            this.exibCadastro = true
        },
        exibSnack(texto, cor) {
            this.snack.color = cor || ''
            this.snack.text = texto || ''
            this.snack.active = true
        },
        confirmeExclusao(item) {
            this.itemSelect = item
            this.dlgConfirme = true
        },
        async atualizarListagem() {
            try {
                const resposta = await this.$axios.$get('/propriedades/')
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
                const resposta = await this.$axios.$get(`/propriedade/${id}`)
                const { representantes, proprietarios, propriedade } = resposta
                this.listaSelecao = { representantes, proprietarios }
                this.payload = propriedadeModel(propriedade)
                this.exibCadastro = true
                this.isEdit = true
            } catch (error) {
                console.log(error);
            }
        },
        cancelar() {
            this.payload = propriedadeModel()
            this.exibCadastro = false
        }
    }
}

</script>
