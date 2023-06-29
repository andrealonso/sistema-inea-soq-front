export function proprietarioModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            nome: payload.nome || '',
            cpf: payload.cpf || '',
            email: payload.email || null,
            telefone: payload.telefone || null,
            obs: payload.obs || null,
            cep: payload.cep || null,
            rua: payload.rua || null,
            num: payload.num || null,
            bairro: payload.bairro || null,
            cidade: payload.cidade || null,
            uf: payload.uf || null,

        }
    } else {
        return {
            id: null,
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            obs: null,
            cep: null,
            rua: null,
            num: null,
            bairro: null,
            cidade: null,
            uf: null
        }
    }

}