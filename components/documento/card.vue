<template>
    <div>
        <v-sheet outlined class="d-flex align-center" max-width="300">
            <iconeDocs :tipo="item.ext" width="34px" height="34px" />
            <v-tooltip bottom color="grey lighten-5">
                <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="text-caption text-truncate ml-1">{{
                        item.descricao }}</span>
                </template>
                <span class="black--text">{{ item.descricao }}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn class="" icon small @click.prevent.stop="download(item)">
                <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn class="" icon small @click.prevent.stop="deleteConfirme = true">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-sheet>
        <dialogConfirme @sim="excluir(item)" @nao="deleteConfirme = false" :dlg-confirme="deleteConfirme"
            texto="Tem certeza que deseja excluir este arquivo?" cor="error" titulo="Confirme exclusão!" />
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            deleteConfirme: false
        }
    },
    methods: {
        async excluir(file) {
            const dados = await this.$axios.$delete(`/documento/${file.id}`)
            this.$emit('atualizarListDocs')
            this.deleteConfirme = false
        },
        async download(file) {
            await this.$downloadFile(file)
        },

    }
}
</script>
