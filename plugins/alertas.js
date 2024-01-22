import Swal from 'sweetalert2'

export default (context, inject) => {
    const timer = '2000'
    const animation = false
    inject('alertaSucesso', (texto) => {
        Swal.fire({
            titleText: texto ? texto : 'Registro salvo com sucesso!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            timer,
            toast: true,
            animation,
            showConfirmButton: false,
            showCloseButton: true,

        })
    })
    inject('alertaErro', (texto) => {
        Swal.fire({
            titleText: texto ? texto : 'Ocorreu um erro ao tentar salvar o registro!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            timer,
            toast: true,
            animation,
            showConfirmButton: false,
            showCloseButton: true,

        })
    })
    inject('confirmaExclusao', async (texto, titulo) => {
        const resp = await Swal.fire({
            title: titulo ? titulo : "Tem ceteza que deseja excluir este registro?",
            text: texto ? texto : "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: 'Cancelar',
        })
        return resp.isConfirmed;
    })
    inject('alertaConfirmacao', async (texto, titulo) => {
        const resp = await Swal.fire({
            title: titulo ? titulo : "Tem ceteza...?",
            text: texto ? texto : "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText: 'Cancelar',
        })
        return resp.isConfirmed;
    })

}