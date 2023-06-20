<template>
    <v-snackbar v-model="snack.active" :color="snack.color" :timeout="snack.timeout" class="snack">
        {{ snack.text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="close">
                X
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    props: ['snack'],
    methods: {
        close() {
            this.$emit('close')
        }
    }

}
</script>

<style scoped>
.snack {
    bottom: 6vh;
}
</style>