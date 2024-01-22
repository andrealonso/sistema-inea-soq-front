export function denunciaModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            descricao: payload.descricao || '',
            data: payload.data || null,
            num_bo: payload.propriedades_id || null,
            agenda_id: payload.agenda_id || null,
            user_id: payload.user_id || null
        }
    } else {
        return {
            id: null,
            descricao: '',
            data: null,
            num_bo: null,
            agenda_id: null,
            user_id: null
        }
    }

}