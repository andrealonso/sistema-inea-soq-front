<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title class="green lighten-1 white--text">
                {{ tituloPagina }}
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="8">
                                <v-autocomplete :rules="[rules.required]" label="Propriedades" outlined auto-select-first
                                    dense :items="listaSelecao.propriedades" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="item.propriedades_id">
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="6" md="2">
                                <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :value="computedDataInicio" :error-messages="msgErroDatas"
                                            label="Data do início" readonly v-bind="attrs" v-on="on" outlined
                                            dense></v-text-field>
                                    </template>
                                    <v-date-picker v-model="item.data_inicio" @input="menu1 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field :value="computedDataFim" :error-messages="msgErroDatas"
                                            label="Data do fim" readonly v-bind="attrs" v-on="on"
                                            @click:clear="item.data_fim = null" outlined dense></v-text-field>
                                    </template>
                                    <v-date-picker v-model="item.data_fim" @change="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" sm="6" md="2">
                                <v-text-field type="number" :rules="[rules.required]" v-model="item.area_queima"
                                    label="Área queima" outlined dense hide-spin-buttons></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field :rules="[rules.required]" v-model="item.talhao" label="Talhão" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="8">
                                <v-autocomplete label="Empresas" outlined auto-select-first dense
                                    :items="listaSelecao.empresas" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="item.empresas_id"
                                    :disabled="desativarCampoEmpresas">
                                </v-autocomplete>
                            </v-col>



                            <!-- <pre>{{ item }}</pre> -->
                        </v-row>
                        <dialogConfirme @sim="deleteItem(item)" @nao="deleteConfirme = false" :dlg-confirme="deleteConfirme"
                            texto="Tem certeza que deseja excluir este registro?" cor="error" titulo="Confirme exclusão!" />
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvarItem(item)">Salvar
                </v-btn>
                <v-btn color="secondary" elevation="2" outlined dense @click.prevent.stop="cancelarRegistro">
                    Cancelar</v-btn>
                <v-btn color="error" elevation="2" outlined dense @click.prevent.stop="deleteConfirme = true"
                    :disabled="!isEdit">Excluir
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

        </v-card>
    </v-dialog>
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
                dataFimMaior: value => !this.dataFimMaior(value) || 'A data final precisa ser igual ou maior!'
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
                this.exibSnack('Registro salvo com sucesso!', 'success')
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
                this.exibSnack('Registro salvo com sucesso!', 'success')
            } catch (error) {
                this.exibSnack('Não foi possível salvar o registro! Verifique os dados e tente novamente', 'error')
                console.log(error);
            }
        },
        async updateItem(item) {
            try {
                await this.$axios.$put(`/agendamento/${item.id}`, item)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.exibSnack('Registro salvo com sucesso!', 'success')
            } catch (error) {
                this.exibSnack('Não foi possível salvar o registro! Verifique os dados e tente novamente', 'error')
                console.log(error);
            }
        },
        cancelarRegistro() {
            this.$emit('close')
        },
        async deleteItem(item) {
            try {
                await this.$axios.$delete(`/agendamento/${item.id}`)
                this.$emit('atualizarListagem')
                this.$emit('close')
                this.exibSnack('Registro exluído com sucesso!', 'success')
            } catch (error) {
                this.exibSnack('Não foi possível excluir o registro!', 'error')
                console.log(error);
            }
        },

        exibSnack(texto, cor) {
            this.$emit('exibSnack', texto, cor)
        }


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