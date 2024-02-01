<template>
    <div>
        <v-dialog v-model="open" persistent id="card">
            <v-card class="d-print-none">
                <v-card-title class="green lighten-1 white--text">
                    Cadastro de ordem de queima
                    <v-spacer></v-spacer>
                    <v-btn icon large @click.prevent.stop="cancelarRegistro" color="white">X</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-tabs v-model="tabs" slider-color="green" fixed-tabs>
                        <v-tabs-slider></v-tabs-slider>
                        <v-tab href="#agenda">
                            Agenda
                        </v-tab>
                        <v-tab href="#denuncia" :disabled="!isEdit">
                            Denuncias
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item value="agenda">
                            <v-card>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="8">
                                                <v-autocomplete :rules="[rules.required]" label="Propriedades" outlined
                                                    auto-select-first dense :items="listaSelecao.propriedades"
                                                    :item-text="propriedade => `${propriedade.nome} - ${propriedade.proprietarios?.nome}`"
                                                    :item-value="propriedade => propriedade.id"
                                                    v-model="item.propriedades_id" @change="calcAreaCanaTotal">
                                                </v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="2">
                                                <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field :value="computedDataInicio" :rules="[rules.dataRetro]"
                                                            :error-messages="msgErroDatas" label="Data do início" readonly
                                                            v-bind="attrs" v-on="on" outlined dense></v-text-field>
                                                    </template>
                                                    <v-date-picker v-if="!isEdit" v-model="item.data_inicio"
                                                        @input="menu1 = false"></v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="2">
                                                <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field :value="computedDataFim" :rules="[rules.dataRetro]"
                                                            :error-messages="msgErroDatas" label="Data do fim" readonly
                                                            v-bind="attrs" v-on="on" @click:clear="item.data_fim = null"
                                                            outlined dense></v-text-field>
                                                    </template>
                                                    <v-date-picker v-if="!isEdit" v-model="item.data_fim"
                                                        @change="menu2 = false"></v-date-picker>
                                                </v-menu>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="2">
                                                <v-text-field type="number" :rules="[rules.required, rules.calcAreaQueima]"
                                                    v-model="item.area_queima" label="Área queima" outlined dense
                                                    hide-spin-buttons></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="2">
                                                <v-text-field :rules="[rules.required]" v-model="item.talhao" label="Talhão"
                                                    outlined dense></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="8">
                                                <v-autocomplete :rules="[rules.required]" label="Empresas" outlined
                                                    auto-select-first dense :items="listaSelecao.empresas"
                                                    :item-text="item => item.nome" :item-value="item => item.id"
                                                    v-model="item.empresas_id" :disabled="desativarCampoEmpresas">
                                                </v-autocomplete>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-textarea outlined dense v-model="item.obs"
                                                    label="Obsevações"></v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" elevation="2" outlined dense
                                        @click.prevent.stop="salvarItem(item)">Salvar
                                    </v-btn>
                                    <v-btn color="secondary" elevation="2" outlined dense
                                        @click.prevent.stop="cancelarRegistro">
                                        Cancelar</v-btn>
                                    <v-btn color="error" elevation="2" outlined dense @click.prevent.stop="deleteItem"
                                        :disabled="!isEdit">Excluir
                                    </v-btn>
                                    <v-btn color="secondary" elevation="2" outlined dense
                                        @click.prevent.stop="print(item.id)" :disabled="!isEdit">
                                        Imprimir</v-btn>
                                    <v-btn color="secondary" elevation="2" outlined dense
                                        @click.prevent.stop="dataRetroativa" :disabled="!isEdit">
                                        TESTE</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item value="denuncia">
                            <br>
                            <DenunciaLista :listagem="listaSelecao.denuncias" :agendaId="item.id" />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card-text>
            </v-card>
            <agendaPrint open="true" :agenda="item" />
        </v-dialog>
    </div>
</template>

<script>
import moment from 'moment'
moment.locale('pt-br')
export default {
    props: ['item', 'isEdit', 'open', 'listaSelecao'],
    beforeMount() {
        !this.item.empresas_id ? this.item.empresas_id = this.$store.state.user.empresas_id : null
    },
    data() {
        return {
            tabs: null,
            teste: 'teste',
            exibListDocs: true,
            exibConfirme: false,
            areCanaTotal: null,
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
            rules: {
                required: value => !!value || 'Requerido!',
                cnpjValido: value => this.$cnpjValido(value) || 'CNPJ inválido!',
                dataInicioMenor: value => !this.dataInicioMenor(value) || 'A data final precisa ser igual ou maior!',
                dataFimMaior: value => !this.dataFimMaior(value) || 'A data final precisa ser igual ou maior!',
                calcAreaQueima: value => !this.calcAreaCanaTotal() || 'A área da qiema não pode ser maior que a área total!',
                dataRetro: value => this.dataRetroativa(value) || 'A data selecionada não pode ser retroativa'
            },

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
            return this.item.data_inicio ? moment.utc(this.item.data_inicio).format('L') : ''
        },
        computedDataFim() {
            moment.locale('pt-br')
            return this.item.data_fim ? moment.utc(this.item.data_fim).format('L') : ''
        }
    },
    methods: {
        imprimir() {
            this.$router.push({
                path: '/print/agendamento'

            })
        },
        calcAreaCanaTotal() {
            if (this.item.propriedades_id > 0 && this.item.area_queima > 0) {
                const { propriedades } = this.listaSelecao
                const index = propriedades.findIndex(item => item.id === this.item.propriedades_id)
                const areComCana = parseFloat(propriedades[index].area_cana)
                const areaQuaima = parseFloat(this.item.area_queima)
                if (!(areComCana > areaQuaima)) {
                    //this.$alertaErro('A área da queima não pode ser maior que a área com cana!')
                    return true
                }
                return false
            }

        },
        dataRetroativa(value) {
            if (value) {
                const hoje = moment().format('YYYY-MM-DD')
                const strData = value.split('/').reverse().join('-')
                const data = moment(strData)
                return moment(hoje).isSameOrBefore(data)
            }
        },
        dataInicioMenor(data) {
            // console.log('Inicio ', moment(data, 'DD-MM-YYYY').format('L'));
            // console.log('Inicio ', this.item.data_inicio);
            // console.log('Fim ', this.item.data_fim);
            // console.log(moment(data, 'DD-MM-YYYY').isBefore(this.item.data_fim));
        },
        dataFimMaior(data) {
            // console.log(moment(data, 'DD-MM-YYYY').isAfter(this.item.data_inicio));
        },
        checkDatas(dataInicio, dataFim) {
            if (!moment(dataInicio).isSameOrBefore(dataFim)) {
                this.msgErroDatas = 'Data inicial precisa ser menor!'
                return false
            } else {
                this.msgErroDatas = ''
                return true
            }

        },

        async salvarItem(item) {
            if (!this.checkDatas(this.item.data_inicio, this.item.data_fim))
                return
            if (!this.$refs.form.validate())
                return

            if (this.foiAlterado()) {
                if (!this.isEdit) {
                    this.createItem(item)
                } else {
                    this.updateItem(item)
                }
            } else {
                this.$emit('close')
                this.$alertaSucesso()
            }

        },
        foiAlterado() {
            if (JSON.stringify(this.itemOld) === JSON.stringify(this.item))
                return false
            return true
        },
        async createItem(item) {
            try {
                delete item.id
                await this.$axios.$post(`/agendamento`, item,)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.$alertaSucesso()
            } catch (error) {
                this.$alertaErro()
                console.log(error);
            }
        },
        async updateItem(item) {
            try {
                await this.$axios.$put(`/agendamento/${item.id}`, item)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.$alertaSucesso()
            } catch (error) {
                this.$alertaErro()
                console.log(error);
            }
        },
        cancelarRegistro() {
            this.$emit('close')
        },

        async deleteItem() {
            if (await this.$confirmaExclusao()) {
                try {
                    await this.$axios.$delete(`/agendamento/${this.item.id}`)
                    this.$emit('atualizarListagem')
                    this.$emit('close')
                    this.$alertaSucesso('Registro exluído com sucesso!')
                } catch (error) {
                    this.$alertaErro('Não foi possível excluir este registro!')
                    console.log(error);
                }
            }
        },

        exibSnack(texto, cor) {
            this.$emit('exibSnack', texto, cor)
        },
        print(agendaId) {
            this.$router.push({
                path: '/print/agendamento',
                query: { id: agendaId.toString() }
            })
        },

    }
}
</script>

<style scoped></style>