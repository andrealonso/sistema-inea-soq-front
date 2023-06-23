export default async (context, inject) => {
    inject('buscaCep', async (cep) => {
        if (!cep) return null
        cep = cep.replace(/\D/g, '')
        const validaCep = /^[0-9]{8}$/
        if (!cep || !validaCep.test(cep)) {
            return null
        }
        try {
            const reponse = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
            const result = await reponse.json()
            if (result?.erro) {
                return null
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    })
}