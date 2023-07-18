export default {
    STORE_USER(state, payload) {
        if (payload) {
            state.nome = payload.nome || null
            state.user_id = payload.id || null
            state.user_tipo_id = payload.user_tipo_id || null
            state.empresas_id = payload.empresas_id || null
            state.parceira_inea = payload.empresas?.parceira_inea || false
            state.token = payload.token || null
        }

    },
    STORE_PERFIL(state, payload) {
        state.nome = payload.nome
    }
}