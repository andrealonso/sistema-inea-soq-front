export default (context, inject) => {
    inject('downloadFile', async (file) => {
        const dados = await context.$axios.$get(`documento/download/${file.id}`, {
            responseType: 'blob'
        })
        const fileUrl = window.URL.createObjectURL(new Blob([dados]))
        let fileLink = document.createElement('a');
        fileLink.href = fileUrl;
        fileLink.setAttribute('download', `${file.descricao}${file.ext}`);
        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);
    }),
        inject('uploadFile', async (descricao, destinatario, destId, file) => {
            try {
                let formData = new FormData()
                formData.append(destinatario, destId)
                formData.append("descricao", descricao)
                formData.append("file", file)
                const dados = await context.$axios.$post('documento', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        })
}

