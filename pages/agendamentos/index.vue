<template>
    <v-row class="mb-4 d-print-block">
        <v-col cols="12">
            <!-- Listagem -->
            <v-card class="p-3">
                <v-card-title>
                    <div>
                        <h4>Lista de Agendamentos</h4>
                        <p class="text-body-2">Preíodo: {{ filtro.data_inicio | formatData }} á {{ filtro.data_fim |
                            formatData }}</p>
                    </div>
                    <v-spacer></v-spacer>
                    <v-tooltip open-delay="500" bottom v-if="exibLista">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon class="black--text"
                                @click="exibLista = false"><v-icon>mdi-table</v-icon></v-btn>
                        </template>
                        <span>Exibir Cartões</span>
                    </v-tooltip>
                    <v-tooltip open-delay="500" bottom v-if="!exibLista">
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
                <template v-if="exibLista">
                    <v-data-table :footer-props="listFooterOpcoes" :headers="headers" :items="listagem" :search="search"
                        dense mobile-breakpoint="400">
                        <!-- eslint-disable-next-line -->
                        <template v-slot:item.actions="{ item }">
                            <v-icon @click.prevent="print(item.id)">mdi-eye</v-icon>
                            <v-icon :disabled="bloquearUsers(fiscais)"
                                @click.prevent="exibirItem(item)">mdi-pencil</v-icon>
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
                </template>
                <template v-else>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="4" v-for="itemCard in listagem" :key="itemCard.id">
                                <v-card rounded="xl" height="300" min class="d-flex flex-column ">
                                    <v-card-title class="d-flex justify-space-between py-1">
                                        <h5>{{ itemCard.data_inicio | formatData }} - {{ itemCard.data_fim | formatData
                                        }}
                                        </h5>
                                        <v-menu bottom origin="center center" transition="scale-transition">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="success" dark v-bind="attrs" v-on="on" icon>
                                                    <v-icon
                                                        :color="listaStatus[itemCard.agenda_Status_id - 1]?.color || 'secondary'">{{
                                                            listaStatus[itemCard.agenda_Status_id - 1]?.icon ||
                                                            'mdi-calendar-clock'
                                                        }}</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list v-if="!bloquearUsers(fiscais)">
                                                <v-list-item v-for="(item, i) in listaStatus" :key="i" link>
                                                    <v-list-item-title @click="alterarStatus(item, itemCard)">
                                                        <v-icon :color="item.color || 'secondary'">{{ item?.icon }}
                                                        </v-icon> {{
                                                            item.descri
                                                        }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>

                                        <div class="text-body-2"><strong>Código:</strong> {{ itemCard.id | zeroLeft }}
                                        </div>
                                        <div class="text-body-2"><strong>Propriedade:</strong> {{
                                            itemCard.propriedades?.nome }}
                                        </div>
                                        <div class="text-body-2"><strong>Área da queima:</strong> {{
                                            itemCard.area_queima
                                        }}</div>
                                        <div class="text-body-2"><strong>Talhão:</strong> {{ itemCard?.talhao }}</div>

                                        <div class="text-body-2"><strong>Proprietario:</strong> {{
                                            itemCard.propriedades?.proprietarios?.nome }}
                                        </div>
                                        <div class="text-body-2"><strong>Representante:</strong> {{
                                            itemCard.propriedades?.representantes?.nome }}
                                        </div>
                                    </v-card-text>
                                    <v-spacer></v-spacer>
                                    <v-card-actions class="d-flex justify-space-around">
                                        <v-tooltip open-delay="500" bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn :disabled="bloquearUsers(fiscais)" color="success" v-bind="attrs"
                                                    v-on="on" @click="novaDenuncia(itemCard)"><v-icon>mdi-alert-plus
                                                    </v-icon></v-btn>
                                            </template>
                                            <span>Adicionar denúncia</span>
                                        </v-tooltip>
                                        <v-tooltip open-delay="500" bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="success" v-bind="attrs" v-on="on"
                                                    @click="print(itemCard.id)"><v-icon>mdi-eye
                                                    </v-icon></v-btn>
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
                                                <v-btn :disabled="bloquearUsers(fiscais)" color="success" v-bind="attrs"
                                                    v-on="on"
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
                </template>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card class="panel-bottom">
                <v-container>
                    <v-btn v-if="!bloquearUsers(fiscais)" color="primary" elevation="2" outlined
                        @click.prevent.stop="novoItem">Novo</v-btn>
                    <v-btn v-if="!bloquearUsers(fiscais)" color="primary" elevation="2" outlined
                        @click.prevent.stop="atualizarListagem">Atualizar</v-btn>
                </v-container>
            </v-card>
        </v-col>

        <agendaCadastro v-if="exibCadastro" :open="exibCadastro" @close="exibCadastro = false" @cancelar="cancelar"
            @atualizarListagem="atualizarListagem" :isEdit="isEdit" :item="payload" :lista-selecao="listaSelecao" />
        <!-- <agendaTeste v-if="exibCadastro" :open="exibCadastro" @close="exibCadastro = false" @cancelar="cancelar"
            @atualizarListagem="atualizarListagem" @exibSnack="exibSnack" :isEdit="isEdit" :item="payload"
            :lista-selecao="listaSelecao" /> -->
        <denunciaCadastro v-if="exibCadDenuncia" :open="exibCadDenuncia" :item="denuncia"
            @close="exibCadDenuncia = false" />

        <filtrosAgenda v-if="exibFiltro" :open="exibFiltro" @close="exibFiltro = false"
            @atualizarListagem="atualizarListagem" :filtroCad="filtro" :lista-selecao="listaSelecao" />
        <DialogLoading v-if="isLoading" :is-loading="isLoading" :cor="'purple lighten-1'"
            :texto="'Atualizando dados... '" />

    </v-row>
</template>

<script>
import { agendaModel } from '~/models/AgendaModel'
import { denunciaModel } from '~/models/DenunciaModel'
import moment from 'moment'

export default {
    async asyncData({ $axios, route }) {
        // console.log(route.query);
        let listagem = []
        try {
            let filtro
            const { query } = route
            if (Object.keys(query).length) {
                filtro = route.query
            } else {
                filtro = {
                    data_inicio: moment.utc().startOf('month').format('YYYY-MM-DD'),
                    data_fim: moment.utc().endOf('month').format('YYYY-MM-DD')
                }
            }
            const resposta = await $axios.$post('/agendamentos/filtrar', { ...filtro })
            if (!resposta?.erro) {
                listagem = resposta.dados
            } else {
                listagem = []
            }
            return { listagem, filtro }
        } catch (error) {
            console.log(error);
            return { listagem }
        }
    },
    name: 'propriedades',
    data() {
        return {
            fiscais: [2, 4],
            listFooterOpcoes: {
                itemsPerPageOptions: [25, 50, 100, -1],
            },
            exibCadDenuncia: false,
            denuncia: {},
            exibTeste: false,
            user: JSON.parse(sessionStorage.getItem('user')),
            filtroZerado: {
                propriedades_id: null,
                proprietarios_id: null,
                representantes_id: null,
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
                { text: 'Talhão', value: 'talhao', align: 'center' },
                { text: 'Data do início', value: 'data_inicio', align: 'center' },
                { text: 'Data do fim', value: 'data_fim', align: 'center' },
                { text: 'Empresa', value: 'empresas.nome', align: 'center' },
                { text: 'Ações', value: 'actions', sortable: false, align: 'right' },
            ],
            exibLista: false,
            payload: agendaModel(),
            listaStatus: [
                { id: 1, descri: 'Queima agendada', icon: 'mdi-calendar-clock', color: 'secondary' },
                { id: 2, descri: 'Queima realizada', icon: 'mdi-check-circle', color: 'success' },
                { id: 3, descri: 'Queima não programada', icon: 'mdi-alert-circle', color: 'warning' },
                { id: 4, descri: 'Queima cancelada', icon: 'mdi-close-circle', color: 'secondary' },
            ],

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
        },

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
        bloquearUsers(lista) {
            return lista.some(item => item == this.user.user_tipo_id)
        },
        print(agendaId) {
            this.$router.push({
                path: '/print/agendamento',
                query: { id: agendaId.toString() }
            })
        },
        novaDenuncia(agenda) {
            this.denuncia = denunciaModel()
            this.denuncia.agenda_id = agenda.id
            this.denuncia.data = moment().format('YYYY-MM-DD')
            this.exibCadDenuncia = true
        },
        async alterarStatus(status, itemCard) {
            try {
                if (status.id === itemCard.agenda_Status_id) return
                if (await this.$alertaConfirmacao(`Tem certeza de deseja alterar o Status para "${status?.descri}"?`, 'Alterar Status')) {
                    const resp = await this.$axios.$put(`/agendamento/${itemCard.id}`, { agenda_Status_id: status.id })
                    itemCard.agenda_Status_id = status.id
                }
            } catch (error) {
                console.log(error);
            }
        },
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
        confirmeExclusao(item) {
            this.itemSelect = item
            this.dlgConfirme = true
        },
        async atualizarListagem(filtro) {
            try {
                // if (!filtro.data_inicio) {
                // } else {
                //     this.filtro = { ...filtro }
                // }

                if (filtro.data_inicio) {
                    this.filtro = { ...filtro }
                }
                console.log(filtro);
                const resposta = await this.$axios.$post('/agendamentos/filtrar', this.filtro)
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
                const denuncias = await this.$axios.$get(`/denuncias/filtrar?agenda_id=${resposta.agenda.id}`)
                const { empresas, agenda, propriedades } = resposta
                this.listaSelecao = { empresas, propriedades, denuncias: denuncias.dados }
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
            const { empresas, propriedades, proprietarios, representantes } = await this.$axios.$get(`/agendamentos/getfiltros`)
            this.listaSelecao = { empresas, propriedades, proprietarios, representantes }
            this.exibFiltro = true
        }

    }
}

</script>
