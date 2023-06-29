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
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field :rules="[rules.required, rules.counter]" v-model="item.nome" label="Nome"
                                    outlined dense required validate-on-blur></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="item.car" label="CAR" outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete label="Proprietario" outlined auto-select-first dense
                                    :items="listaSelecao.proprietarios" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="item.proprietario_id">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete label="Representante" outlined auto-select-first dense
                                    :items="listaSelecao.representantes" :item-text="item => item.nome"
                                    :item-value="item => item.id" v-model="item.representante_id">
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field validate-on-blur type="number" @blur="checkArea"
                                    :rules="[rules.required, rules.checkArea]" v-model="item.area" label="Area total"
                                    outlined dense hide-spin-buttons></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field validate-on-blur type="number" @blur="checkArea"
                                    :rules="[rules.required, rules.checkArea]" v-model="item.area_cana"
                                    label="Area com cana" outlined hide-spin-buttons dense></v-text-field>
                            </v-col>


                            <!--         Cadastro de endereco          -->
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-mask="['#####-###']" v-model="item.cep" label="CEP" outlined dense
                                    @blur="consultaCep"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="8">
                                <v-text-field :rules="[rules.required]" v-model="item.rua" label="Rua" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field :rules="[rules.required]" ref="inputNum" v-model="item.num" label="Núm."
                                    outlined dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                                <v-text-field :rules="[rules.required]" v-model="item.bairro" label="Bairro" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                                <v-text-field :rules="[rules.required]" v-model="item.cidade" label="Cidade" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field :rules="[rules.required]" v-model="item.uf" label="UF" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="5">
                                <v-text-field v-model="item.geolocal" label="Geolocalização - Link Google Maps" outlined
                                    dense></v-text-field>
                            </v-col>

                            <!-- <pre>{{ item }}</pre> -->
                        </v-row>

                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="2" outlined dense @click.prevent.stop="salvarItem(item)">Salvar
                </v-btn>
                <v-btn color="secondary" elevation="2" outlined dense @click.prevent.stop="cancelarRegistro">
                    Cancelar</v-btn>
                <v-btn color="error" elevation="2" outlined dense @click.prevent.stop="deleteItem(item)"
                    :disabled="!isEdit">Excluir
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
            <dialogConfirme @sim="deleteItem(item)" @nao="deleteConfirme = false" :dlg-confirme="deleteConfirme"
                texto="Tem certeza que deseja excluir este registro?" cor="error" titulo="Confirme exclusão!" />
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props: ['item', 'isEdit', 'open', 'listaSelecao'],
    data() {
        return {
            valid: true,
            tituloPagina: 'Cadastro de Propriedades',
            exibEndereco: true,
            deleteConfirme: false,
            itemOld: { ...this.item },
            status: [
                { id: 1, descri: "ATIVO" },
                { id: 2, descri: "INATIVO" }
            ],
            rules: {
                required: value => !!value || 'Requerido!',
                counter: value => value.length >= 6 || 'Min. de 6 dígitos!',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Email inválido'
                },
                cnpjValido: value => this.$cnpjValido(value) || 'CNPJ inválido!',
                senhaDiferente: value => this.comparaSenha(value) || 'Senha não confere! Repita a mesma senha.',
                checkArea: value => this.checkArea(value) || 'A área com cana é maior que área total! '
            },

        }
    },
    methods: {
        checkArea() {
            const total = Number(this.item.area)
            const cana = Number(this.item.area_cana)
            if (total < cana) return false
            return true

        },
        async consultaCep() {
            const result = await this.$buscaCep(this.item.cep)
            if (result) {
                this.item.rua = result?.logradouro || null
                this.item.bairro = result?.bairro || null
                this.item.cidade = result?.localidade || null
                this.item.uf = result?.uf || null
                this.$refs.inputNum.focus()
            } else {
                this.exibSnack('CEP inválido ou não encontrado!', 'error')
                this.limparEndereco()
            }

        },
        limparEndereco() {
            this.item.rua = null
            this.item.bairro = null
            this.item.cidade = null
            this.item.uf = null
        },
        corStatus(id) {
            if (id == 1) return 'green--text'
            if (id == 2) return 'red--text'
        },
        async salvarItem(item) {
            if (!this.$refs.form.validate()) {
                return
            }
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
                await this.$axios.$post(`/propriedade`, item,)
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
                await this.$axios.$put(`/propriedade/${item.id}`, item)
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
                await this.$axios.$delete(`/propriedade/${item.id}`)
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