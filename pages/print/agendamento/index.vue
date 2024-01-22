<template>
    <v-card flat rounded="1" outlined>
        <v-container>
            <v-row dense no-gutters>
                <v-col cols="12" md="12">
                    <v-card flat class="pa-2">
                        <div class="text-h6">
                            Ordem de Queima - {{ ordem.id | zeroLeft }}
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" md="12">
                    <v-card flat class="pa-2 ">
                        <span class="text-body-1 font-weight-bold">Data de início: <span class="text-body-1">{{
                            ordem.data_inicio
                            | formatData }}</span>
                        </span>&nbsp;&nbsp;&nbsp;

                        <span class="text-body-1 font-weight-bold">Data do fim: <span
                                class="text-body-1 font-weight-bold2">{{ ordem.data_fim | formatData
                                }}</span></span>
                    </v-card>
                </v-col>

                <v-col cols="12" md="12">
                    <v-card flat class="pa-2 d-flex">
                        <div class="text-body-1 font-weight-bold">Proprietário: <span class="text-body-1">{{
                            ordem.propriedades.proprietarios?.nome
                        }}</span></div><span>&nbsp;&nbsp;&nbsp;</span>
                        <div class="text-body-1 font-weight-bold">Representante: <span class="text-body-1">{{
                            ordem.propriedades.representantes?.nome
                        }}</span></div>

                    </v-card>
                </v-col>

                <v-col cols="12" md="12">
                    <v-card flat class="pa-2 d-flex">
                        <div class="text-body-1 font-weight-bold">Propriedade: <span class="text-body-1">{{
                            ordem.propriedades?.nome
                        }}</span></div><span>&nbsp;&nbsp;&nbsp;</span>
                        <div class="text-body-1 font-weight-bold">Área da queima (Ha): <span class="text-body-1">{{
                            ordem?.area_queima
                        }}</span></div><span>&nbsp;&nbsp;&nbsp;</span>
                        <div class="text-body-1 font-weight-bold">Talhão: <span class="text-body-1">{{ ordem?.talhao
                        }}</span></div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="12">
                    <v-card flat class="pa-2 ">
                        <span class="text-body-1 font-weight-bold">CAR: <span class="text-body-1">{{ propriedade?.car
                        }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                        <span class="text-body-1 font-weight-bold">Endereço: <span class="text-body-1">{{ propriedade?.rua
                        }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                        <span class="text-body-1 font-weight-bold">num: <span class="text-body-1">{{ propriedade?.num
                        }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                        <span class="text-body-1 font-weight-bold">Cidade: <span class="text-body-1">{{
                            propriedade?.cidade
                        }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                        <span class="text-body-1 font-weight-bold">UF: <span class="text-body-1">{{ propriedade?.uf
                        }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                        <span class="text-body-1 font-weight-bold">CEP: <span class="text-body-1">{{ propriedade?.cep
                        }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                    </v-card>
                </v-col>

                <v-col cols="12" md="12">
                    <v-card flat class="pa-2 d-flex">
                        <span class="text-body-1 font-weight-bold">Observações: <span class="text-body-1">{{
                            ordem?.obs
                        }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                    </v-card>
                </v-col>
                <v-col cols="12" md="12">
                    <v-card flat class="pa-2">
                        <div class="text-body-1 font-weight-bold">Denúncias</div>
                        <div v-for="item in denuncias" :key="item.id">
                            <span class="text-body-1 font-weight-bold">Data: <span class="text-body-1">{{
                                item?.data | formatData
                            }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                            <span class="text-body-1 font-weight-bold">Descrição<span data="" type=""></span>: <span
                                    class="text-body-1">{{ item?.descricao
                                    }}</span></span><span>&nbsp;&nbsp;&nbsp;</span>
                            <span class="text-body-1 font-weight-bold">Num. B.O.: <span class="text-body-1">{{ item?.num_bo
                            }}</span></span>
                        </div>

                    </v-card>
                </v-col>

            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import moment from 'moment'
export default {
    layout: 'print',
    async asyncData({ query, $axios }) {
        let ordem = {}
        let propriedade = {}
        let denuncias = []
        try {
            const { id } = query
            const { agenda } = await $axios.$get(`agendamento/print/${id}`)
            ordem = agenda
            propriedade = agenda.propriedades
            denuncias = agenda.denuncias
            // resp = await $axios.$get(`agendamento/${id}`)
            // resp = await $axios.$get(`propriedade/${ordem.propriedades_id}`)
        } catch (error) {
            console.log(error);
        }
        return { ordem, propriedade, denuncias }
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

    }
}
</script>

<style scoped></style>