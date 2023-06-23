export function empresaModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            nome: payload.nome || "",
            cnpj: payload.cpf_cnpj || null,
            email: payload.email || null,
            telefone: payload.telefone || null,
            obs: payload.obs || null,
            contato_nome: payload.contato_nome || false,
            contato_tel: payload.contato_tel || null,
            parceira_inea: payload.parceira_inea || null,
            enderecos: {
                cep: payload.enderecos?.cep || null,
                rua: payload.enderecos?.rua || null,
                num: payload.enderecos?.num || null,
                bairro: payload.enderecos?.bairro || null,
                cidade: payload.enderecos?.cidade || null,
                uf: payload.enderecos?.uf || null,
            }

        }
    } else {
        return {
            id: null,
            nome: null,
            cpf_cnpj: null,
            email: null,
            telefone: null,
            obs: null,
            parceira_inea: false,
            contato_nome: null,
            contato_tel: null,
            enderecos: {
                cep: null,
                rua: null,
                num: null,
                bairro: null,
                cidade: null,
                uf: null,
            }
        }
    }

}