<template>
    <v-row justify="center" class="mb-4">
        <v-col cols="12" v-if="exibLista">
            <!-- Listagem -->
            <v-card class="p-3">
                <v-card-title class=" d-flex justify-center align-start">
                    <h4>Lista de Agendamentos</h4>
                    <v-spacer></v-spacer>
                    <!-- <v-text-field dense outlined v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line
                        hide-details>
                    </v-text-field> -->
                    <v-tooltip open-delay="500" bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon class="black--text"
                                @click="exibLista = false"><v-icon>mdi-table</v-icon></v-btn>
                        </template>
                        <span>Exibir Cartões</span>
                    </v-tooltip>

                    <v-tooltip open-delay="500" bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon class="black--text"
                                @click="cadFiltro"><v-icon>mdi-filter-variant</v-icon></v-btn>
                        </template>
                        <span>Filtros</span>
                    </v-tooltip>
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
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.data_inicio="{ item }">
                        {{ item.data_inicio | formatData }}
                    </template>
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.data_fim="{ item }">
                        {{ item.data_fim | formatData }}
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" v-if="!exibLista">

            <v-card class="">
                <v-card-title>
                    <h4>Lista de Agendamentos</h4>
                    <v-spacer></v-spacer>
                    <v-tooltip open-delay="500" bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon class="black--text"
                                @click="exibLista = true"><v-icon>mdi-playlist-minus</v-icon></v-btn>
                        </template>
                        <span>Exibir lista</span>
                    </v-tooltip>
                    <v-tooltip open-delay="500" bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon class="black--text"
                                @click="cadFiltro"><v-icon>mdi-filter-variant</v-icon></v-btn>
                        </template>
                        <span>Filtros</span>
                    </v-tooltip>

                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="4" v-for="itemCard in listagem" :key="itemCard.id">
                            <v-card rounded="xl" min-height="270" class="d-flex flex-column ">
                                <v-card-title class="d-flex justify-space-between py-1">
                                    <h5>10/10/2023</h5>
                                    <v-tooltip open-delay="500" bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn v-bind="attrs" v-on="on" icon color="success"
                                                large><v-icon>mdi-check-circle</v-icon></v-btn>
                                        </template>
                                        <span>Confirmar queima</span>
                                    </v-tooltip>

                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <div class="text-body-2"><strong>Código:</strong> {{ itemCard.id | zeroLeft }}</div>
                                    <div class="text-body-2"><strong>Propriedade:</strong> {{ itemCard.propriedades.nome }}
                                    </div>
                                    <div class="text-body-2"><strong>Área da queima:</strong> {{ itemCard.area_queima
                                    }}</div>
                                    <div class="text-body-2"><strong>Talhão:</strong> {{ itemCard.talhao }}</div>

                                    <div class="text-body-2"><strong>Proprietario:</strong> {{
                                        itemCard.propriedades.proprietarios.nome }}
                                    </div>
                                    <div class="text-body-2"><strong>Representante:</strong> {{
                                        itemCard.propriedades.representantes.nome }}
                                    </div>
                                </v-card-text>
                                <v-spacer></v-spacer>
                                <v-card-actions class="d-flex justify-space-around">
                                    <v-tooltip open-delay="500" bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="success" v-bind="attrs" v-on="on"
                                                @click="exibLista = true"><v-icon>mdi-alert-plus </v-icon></v-btn>
                                        </template>
                                        <span>Adicionar denúncia</span>
                                    </v-tooltip>
                                    <v-tooltip open-delay="500" bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="success" v-bind="attrs" v-on="on"
                                                @click="exibLista = true"><v-icon>mdi-eye </v-icon></v-btn>
                                        </template>
                                        <span>Visualizar ordem</span>
                                    </v-tooltip>
                                    <v-tooltip open-delay="500" bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="success" v-bind="attrs" v-on="on"
                                                :disabled="!itemCard.propriedades.geolocal"
                                                :href="itemCard.propriedades.geolocal"
                                                target="_blank"><v-icon>mdi-map-marker-radius-outline
                                                </v-icon></v-btn>
                                        </template>
                                        <span>Mostrar no mapa</span>
                                    </v-tooltip>
                                    <v-tooltip open-delay="500" bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="success" v-bind="attrs" v-on="on"
                                                @click.prevent="exibirItem(itemCard)"><v-icon>mdi-square-edit-outline
                                                </v-icon></v-btn>
                                        </template>
                                        <span>Editar</span>
                                    </v-tooltip>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card class="panel-bottom">
                <v-container>
                    <v-btn color="primary" elevation="2" outlined @click.prevent.stop="novoItem">Novo</v-btn>
                </v-container>
            </v-card>
        </v-col>

        <agendaCadastro v-if="exibCadastro" :open="exibCadastro" @close="exibCadastro = false" @cancelar="cancelar"
            @atualizarListagem="atualizarListagem" @exibSnack="exibSnack" :isEdit="isEdit" :item="payload"
            :lista-selecao="listaSelecao" />

        <filtrosAgenda v-if="exibFiltro" :open="exibFiltro" @close="exibFiltro = false"
            @atualizarListagem="atualizarListagem" :filtro="filtro" :lista-selecao="listaSelecao" />
        <DialogLoading v-if="isLoading" :is-loading="isLoading" :cor="'purple lighten-1'" :texto="'Atualizando dados...'" />
        <DialogConfirmacao v-if="dlgConfirme" :dlg-confirme="dlgConfirme" @nao="dlgConfirme = false" @sim="excluirItem"
            :cor="'red--text lighten-2'" titulo="Exclusão de registro."
            :texto="'Tem certeza que deseja excluir este registro?'" />

        <snackbar v-if="snack.active" :snack="snack" @close="snack.active = false" />

    </v-row>
</template>

<script>
import { agendaModel } from '~/models/AgendaModel'
import moment from 'moment'

export default {
    async asyncData({ $axios }) {
        let listagem = []
        try {
            const filtro = {
                aplicado: false,
                propriedades_id: null,
                empresas_id: null,
                data_inicio: moment.utc().startOf('month').format('YYYY-MM-DD'),
                data_fim: moment.utc().endOf('month').format('YYYY-MM-DD')
            }
            delete filtro.aplicado
            const resposta = await $axios.$post('/agendamentos/filtrar', { ...filtro })
            if (!resposta?.erro) {
                listagem = resposta.dados
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
    data() {
        return {
            filtro: {
                aplicado: false,
                propriedades_id: null,
                empresas_id: null,
                data_inicio: moment().startOf('month').format('YYYY-MM-DD'),
                data_fim: moment().endOf('month').format('YYYY-MM-DD')
            },
            itemSelect: null,
            dlgConfirme: false,
            exibCadastro: false,
            exibFiltro: false,
            isEdit: false,
            isLoading: false,
            search: '',
            listaSelecao: {},
            headers: [
                { text: 'Código', value: 'id', align: 'left', margin: '12px' },
                { text: 'Propriedade', value: 'propriedades.nome', align: 'left', margin: '12px' },
                { text: 'Área', value: 'area_queima', align: 'left' },
                { text: 'Talhão', value: 'talhao.nome', align: 'center' },
                { text: 'Data do início', value: 'data_inicio', align: 'center' },
                { text: 'Data do fim', value: 'data_fim', align: 'center' },
                { text: 'Empresa', value: 'empresas.nome', align: 'center' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' },
            ],
            exibLista: true,
            payload: agendaModel(),
            snack: {
                active: false,
                text: "teste",
                timeout: 2000,
                color: "primary"
            }
        }
    },
    computed: {
        computedDataInicio() {
            moment.locale('pt-br')
            return this.dataInicio ? moment(this.dataInicio).format('L') : ''
        },
        computedDataFim() {
            moment.locale('pt-br')
            return this.dataFim ? moment(this.dataFim).format('L') : ''
        }
    },
    filters: {
        zeroLeft(num) {
            return (num).toLocaleString('en-US', {
                minimumIntegerDigits: 6,
                useGrouping: false
            })
        },
        formatData(data) {
            return moment.utc(data).format('DD/MM/YYYY')
        }
    },
    methods: {
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },
        async novoItem() {
            const { empresas, propriedades } = await this.$axios.$get(`/agendamento/0`)
            this.listaSelecao = { empresas, propriedades }
            this.payload = agendaModel()
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
                let resposta
                const filtro = { ...this.filtro }
                delete filtro.aplicado
                resposta = await this.$axios.$post('/agendamentos/filtrar', { ...filtro })
                this.listagem = resposta.dados

                if (!resposta?.erro) {
                    this.listagem = resposta.dados
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
                const resposta = await this.$axios.$get(`/agendamento/${id}`)
                const { empresas, propriedades, agenda } = resposta
                this.listaSelecao = { empresas, propriedades }
                this.payload = agendaModel(agenda)
                this.exibCadastro = true
                this.isEdit = true
            } catch (error) {
                console.log(error);
            }
        },
        cancelar() {
            this.payload = agendaModel()
            this.exibCadastro = false
        },
        async cadFiltro() {
            const resposta = await this.$axios.$get(`/agendamento/0`)
            const { empresas, propriedades, agenda } = resposta
            this.listaSelecao = { empresas, propriedades }
            this.exibFiltro = true
        }
    }
}

</script>
