export function usuarioModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            nome: payload.nome || "",
            cpf: payload.cpf || null,
            tel: payload.tel || null,
            login: payload.login || null,
            ativo_status_id: Number(payload.ativo_status_id) || null,
            user_tipo_id: Number(payload.user_tipo_id) || null,
            empresas_id: payload.empresas_id || null,

        }
    } else {
        return {
            id: null,
            nome: "",
            cpf: null,
            tel: null,
            login: null,
            senha: null,
            ativo_status_id: 1,
            user_tipo_id: null,
            empresas_id: null,
        }
    }

}