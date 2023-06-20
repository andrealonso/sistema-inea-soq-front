<template>
    <v-dialog v-model="isLoading" :scrim="false" persistent width="auto">
        <v-card :color="cor || 'primary'">
            <v-card-text>
                <span class="white--text">{{ texto }}</span>
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['isLoading', 'texto', 'cor']
}
</script>
<style></style>
