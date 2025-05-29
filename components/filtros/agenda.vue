<template>
    <v-dialog v-model="open" persistent max-width="600">
        <v-card>
            <v-card-title class="green lighten-1 white--text">
                Filtros
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :value="computedDataInicio" :error-messages="msgErroDatas"
                                            label="Data do início" readonly v-bind="attrs" v-on="on" outlined
                                            dense></v-text-field>
                                    </template>
                                    <v-date-picker v-model="filtro.data_inicio" @input="menu1 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :value="computedDataFim" :error-messages="msgErroDatas"
                                            label="Data do fim" readonly v-bind="attrs" v-on="on"
                                            @click:clear="filtro.data_fim = null" outlined dense></v-text-field>
                                    </template>
                                    <v-date-picker v-model="filtro.data_fim" @change="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete label="Propriedade" outlined auto-select-first dense clearable
                                    :items="listaSelecao.propriedades" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="filtro.propriedades_id">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete label="Proprietário" outlined auto-select-first dense clearable
                                    :items="listaSelecao.proprietarios" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="filtro.proprietario_id"
                                    no-data-text="Sem informações." hide-no-data>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete label="Representante" outlined auto-select-first dense clearable
                                    :items="listaSelecao.representantes" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="filtro.representante_id"
                                    no-data-text="Sem informações." hide-no-data>
                                </v-autocomplete>
                            </v-col>


                            <v-col cols="12" v-if="false">
                                <v-autocomplete label="Empresas" outlined auto-select-first dense clearable
                                    :items="listaSelecao.empresas" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="filtro.empresas_id"
                                    :disabled="desativarCampoEmpresas">
                                </v-autocomplete>
                            </v-col>
                            <!-- <pre>{{ item }}</pre> -->
                        </v-row>

                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="aplicar">Aplicar
                </v-btn>
                <v-btn color="error" elevation="2" outlined dense @click.prevent.stop="limparFiltro">Limpar
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
moment.locale('pt-br')
export default {
    props: ['filtroCad', 'open', 'listaSelecao'],

    data() {
        return {
            parceiraInea: null,
            menu1: false,
            menu2: false,
            dataInicio: null,
            dataFim: null,
            valid: true,
            msgErroDatas: '',
            filtro: { ...this.filtroCad }
        }
    },
    computed: {
        desativarCampoEmpresas() {
            if (this.$store.state.user.user_tipo_id === 1 || this.$store.state.user.parceira_inea)
                return false
            return true
        },
        computedDataInicio() {
            moment.locale('pt-br')
            return this.filtro.data_inicio ? moment.utc(this.filtro.data_inicio).format('L') : ''
        },
        computedDataFim() {
            moment.locale('pt-br')
            return this.filtro.data_fim ? moment.utc(this.filtro.data_fim).format('L') : ''
        }
    },
    activated() {
        console.log(this.$router.query);
    },
    mounted() {
    },
    methods: {
        limparParametrosNulos() {
            Object.keys(this.filtro).forEach(key => {
                if (!this.filtro[key])
                    delete this.filtro[key]
            })

        },
        aplicar() {
            this.limparParametrosNulos()
            // this.$router.push({ path: '/agendamentos', query: this.filtro, })
            this.$emit('atualizarListagem', this.filtro)
            this.$emit('close')
        },
        limparFiltro() {
            Object.keys(this.filtro).forEach(item => {
                if (this.filtro[item])
                    this.filtro[item] = null
            })
            this.filtro.data_inicio = moment().startOf('month').format('YYYY-MM-DD')
            this.filtro.data_fim = moment().endOf('month').format('YYYY-MM-DD')
        },
        cancelar() {
            this.$emit('close')
        },
        checkDatas(dataInicio, dataFim) {
            if (!moment(dataInicio).isSameOrBefore(dataFim)) {
                this.msgErroDatas = 'A data inicial precisa ser menor!'
                return false
            } else {
                this.msgErroDatas = ''
                return true
            }

        },
        async buscarListaPropriedades() {
            if (this.listaCampos.propriedades.length)
                return
            try {
                this.isLoading1 = true
                this.listaCampos.propriedades = []
                const { dados } = await this.$axios.$get('/propriedades')
                this.listaCampos.propriedades = dados.registros
                this.isLoading1 = false
            } catch (error) {
                this.isLoading1 = false
                console.log(error);
            }
        },
        async buscarListaProprietarios() {
            if (this.listaCampos.proprietarios.length)
                return
            try {
                this.isLoading2 = true
                this.listaCampos.proprietarios = []
                const { dados } = await this.$axios.$get('/proprietarios')
                this.listaCampos.proprietarios = dados.registros
                this.isLoading2 = false
            } catch (error) {
                this.isLoading2 = false
                console.log(error);
            }
        },
        async buscarListaRepresentantes() {
            if (this.listaCampos.representantes.length)
                return
            try {
                this.isLoading3 = true
                this.listaCampos.representantes = []
                const { dados } = await this.$axios.$get('/representantes')
                this.listaCampos.representantes = dados.registros
                this.isLoading3 = false
            } catch (error) {
                this.isLoading3 = false
                console.log(error);
            }
        },
    }
}
</script>

<style></style>