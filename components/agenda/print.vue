<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <pre>
            {{ agenda }}
        </pre>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['open', 'agenda'],

    data() {
        return {

        }
    }

}
</script>

<style></style>