<template>
    <v-app>
        <v-toolbar class="green d-print-none" height="50">
            <v-toolbar-title>
                <span> INEA - Sistema de Ordem de queima</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="imprimir">Imprimir</v-btn>
        </v-toolbar>
        <v-main class="pagina">
            <v-container class="white mt-1">
                <v-row>
                    <v-col cols="12">
                        <Nuxt />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    methods: {
        imprimir() {
            window.print()

        }
    }
}
</script>
<style>
.pagina {
    height: 100%;
    background-color: #616161;
}

@media print {
    .pagina {
        background-color: transparent;

    }
}
</style>