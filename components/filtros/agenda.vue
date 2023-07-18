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
                                <v-autocomplete label="Propriedades" outlined auto-select-first dense clearable
                                    :items="listaSelecao.propriedades" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="filtro.propriedades_id">
                                </v-autocomplete>
                            </v-col>


                            <v-col cols="12">
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
    props: ['filtro', 'open', 'listaSelecao'],

    data() {
        return {

            parceiraInea: null,
            menu1: false,
            menu2: false,
            dataInicio: null,
            dataFim: null,
            valid: true,
            msgErroDatas: '',
            tituloPagina: 'Cadastro de Agendamento',
            deleteConfirme: false,
            itemOld: { ...this.item },
            status: [
                { id: 1, descri: "ATIVO" },
                { id: 2, descri: "INATIVO" }
            ],


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
    methods: {
        aplicar() {
            delete this.filtro.aplicado
            this.filtro.aplicado = Object.values(this.filtro).some(val => val)

            this.$emit('atualizarListagem')
            this.$emit('close')
        },
        limparFiltro() {
            this.filtro.aplicado = false
            this.filtro.data_inicio = null
            this.filtro.data_fim = null
            this.filtro.empresas_id = null
            this.filtro.propriedades_id = null
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