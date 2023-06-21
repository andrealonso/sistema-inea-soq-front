export function proprietarioModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            nome: payload.nome || "",
            cpf_cnpj: payload.cpf_cnpj || null,
            email: payload.email || null,
            telefone: payload.telefone || null,
            obs: payload.obs || null,
            empresas_id: payload.empresas_id || null,
            pessoas_tipo_id: payload.pessoas_tipo_id || null,
            enderecos: {
                id: payload.enderecos?.id || null,
                cep: payload.enderecos?.cep || null,
                rua: payload.enderecos?.rua || null,
                num: payload.enderecos?.num || null,
                bairro: payload.enderecos?.bairro || null,
                cidade: payload.enderecos?.cidade || null,
                uf: payload.enderecos?.uf || null,
                pessoas_id: payload.enderecos?.pessoas_id || null
            }

        }
    } else {
        return {
            id: null,
            nome: 'Proprietario ',
            cpf_cnpj: '09043261793',
            email: 'propri@gmail.com',
            telefone: '22999090311',
            obs: null,
            empresas_id: null,
            pessoas_tipo_id: 6,
            enderecos: {
                cep: '28055290',
                rua: 'Rua',
                num: '18',
                bairro: 'Caju',
                cidade: 'Campos',
                uf: 'RJ',
            }
        }
    }

}