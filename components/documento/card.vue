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
            <v-btn class="" icon small @click.prevent.stop="excluir()">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-sheet>

    </div>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        async excluir(file) {
            if (await this.$confirmaExclusao()) {
                try {
                    const dados = await this.$axios.$delete(`/documento/${this.item.id}`)
                    this.$emit('atualizarListDocs')
                    this.$alertaSucesso('Documentos excluído com sucesso!')
                } catch (error) {
                    console.log(error);
                    this$alertaErro('Não foi possível excluir o documento!')
                }
            }
        },
        async download(file) {
            await this.$downloadFile(file)
        },

    }
}
</script>
