<template>
    <v-row justify="center" class="mb-4">
        <v-col cols="12">
            <v-card class="p-3">
                <v-card-title>
                    <h4>Logs do sistema</h4>
                    <v-spacer></v-spacer>
                    <v-text-field dense outlined v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line
                        hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table :footer-props="listFooterOpcoes" :headers="headers" :items="listagem" :search="search" dense
                    mobile-breakpoint="400">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.data_hora="{ item }">
                        {{ item.data_hora | formatData }}
                    </template>
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.registro_id="{ item }">
                        {{ item.registro_id | zeroLeft }}
                    </template>

                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card class="panel-bottom">
                <v-container>
                    <v-btn :disabled="!listagem.length > 0" color="secondary" elevation="2" outlined
                        @click.prevent.stop="limparLogs">Limpar Logs</v-btn>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import moment from 'moment'
export default {
    async asyncData({ $axios }) {
        let listagem = []
        try {
            const { dados } = await $axios.$get('/logs')
            if (!dados?.erro) {
                listagem = dados.dados
            } else {
                listagem = []
            }
            return { listagem }
        } catch (error) {
            console.log(error);
            return { listagem }
        }
    },
    name: 'logs',
    data() {
        return {
            listFooterOpcoes: {
                itemsPerPageOptions: [25, 50, 100, -1],
            },
            isLoading: false,
            search: '',
            headers: [
                { text: 'Data', value: 'data_hora', align: 'center' },
                { text: 'Usuário', value: 'user.nome', align: 'center' },
                { text: 'Ação', value: 'acao', align: 'center' },
                { text: 'Entidade', value: 'entidade', align: 'center' },
                { text: 'Registro', value: 'registro_id', align: 'center' },
            ],


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
            return moment.utc(data).format('DD/MM/YYYY HH:mm')
        }
    },
    methods: {
        async atualizarListagem() {
            try {
                const { dados } = await this.$axios.$get('/logs/')
                if (!dados?.erro) {
                    this.listagem = dados.dados
                } else {
                    this.listagem = []
                }
            } catch (error) {
                this.listagem = []
                console.log({ error });
            }
        },
        async limparLogs() {
            try {
                if (!this.listagem.length > 0)
                    return

                if (!await this.$alertaConfirmacao('Tem certeza que deseja limpar todos os logs do sistema?', 'Limpar logs'))
                    return

                const { dados } = await this.$axios.$post('/logs/limpar')
                this.atualizarListagem()
                this.$alertaSucesso('Limpeza realizada com sucesso!')
            } catch (error) {
                this.$alertaErro('Erro ao tentar limpar os logs!')
                console.log(error);

            }
        }

    }
}
</script>
