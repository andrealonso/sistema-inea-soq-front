<template>
    <v-dialog v-model="open" persistent>

        <v-card>
            <v-toolbar flat>

                <v-tabs v-model="tabs">
                    <v-tab v-for="n in 3" :key="n">
                        Item {{ n }}
                    </v-tab>
                </v-tabs>

            </v-toolbar>

            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title class="text-h5">
                            An awesome title
                        </v-card-title>
                        <v-card-text>
                            <p>
                                Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum
                                facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in
                                dolor. Praesent congue erat at massa.
                            </p>

                            <p>
                                Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna
                                dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla
                                eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus
                                tincidunt. Donec sodales sagittis magna.
                            </p>

                            <p class="mb-0">
                                Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra
                                convallis urna.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title class="text-h5">
                            An even better title
                        </v-card-title>
                        <v-card-text>
                            <p>
                                Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra
                                felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at
                                ligula. Proin faucibus arcu quis ante.
                            </p>

                            <p class="mb-0">
                                Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu,
                                tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
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
            tabs: null,
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
        teste() {
            console.log('teste');
        },
        calcAreaCanaTotal(id) {
            if (this.item.propriedades_id > 0 && this.item.area_queima > 0) {
                const { propriedades } = this.listaSelecao
                const index = propriedades.findIndex(item => item.id === this.item.propriedades_id)
                const areComCana = parseFloat(propriedades[index].area_cana)
                const areaQuaima = parseFloat(this.item.area_queima)
                console.log(areComCana > areaQuaima)
                if (!(areComCana > areaQuaima))
                    alert('A área da queima não pode ser maior que a área com cana!')
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