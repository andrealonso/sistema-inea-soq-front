export function fiscalModel(payload) {

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
            usuario: {
                id: payload.usuario?.id || null,
                login: payload.usuario?.login || null,
                senha: null,
                pessoas_id: payload.id,
                pessoas_tipo_id: payload.usuario?.pessoas_tipo_id || 4,
                ativo_status_id: payload.usuario?.ativo_status_id || 2,
            },
        }
    } else {
        return {
            id: null,
            nome: '',
            cpf_cnpj: '',
            email: '',
            telefone: '',
            obs: null,
            empresas_id: null,
            pessoas_tipo_id: 4,
            usuario: {
                login: null,
                senha: null,
                pessoas_tipo_id: 4,
                ativo_status_id: 1
            }
        }
    }

}