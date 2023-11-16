<template>
    <v-dialog v-model="dlgConfirme" max-width="320" persistent>
        <v-card>
            <v-card-title :class="['text-center', cor || 'primary']">
                <span class="text-subtitle-2">{{ titulo }}</span>
            </v-card-title>

            <v-card-text class="text-body-2">
                {{ texto }}
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="grey darken-4" text @click="fnNao">
                    Não
                </v-btn>

                <v-btn color="grey darken-4" text @click="fnSim">
                    Sim
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['dlgConfirme', 'titulo', 'texto', 'cor'],
    methods: {
        fnNao() {
            this.$emit('nao')
        },
        fnSim() {
            this.$emit('sim')
        },

    }
}
</script>

