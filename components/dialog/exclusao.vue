<template></template>

<script>
import Swal from 'sweetalert2';
export default {
    props: ['titulo', 'texto'],
    mounted() {
        this.exibConfirme()
    },
    methods: {
        exibConfirme() {
            Swal.fire({
                title: "Confirme exclusão!",
                text: this.texto ? this.texto : "Tem ceteza que deseja excluir este registro",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, excluir!",
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$emit('Sim')
                }
            });
        },
        fnNao() {
            this.$emit('nao')
        },
        fnSim() {
            this.$emit('sim')
        },
    }
}
</script>

