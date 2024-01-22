const moment = require('moment')
export function documentoModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            nome: payload.nome || '',
            ext: payload.ext || null,
            propriedades_id: payload.propriedades_id || null,
            representantes_id: payload.representantes_id || null,
            representantes_id: payload.representantes_id || null,
            agenda_id: payload.agenda_id || null,
            denuncia_id: payload.agenda_id || null
        }
    } else {
        return {
            id: null,
            nome: '',
            ext: null,
            propriedades_id: null,
            representantes_id: null,
            representantes_id: null,
            agenda_id: null,
            denuncia_id: null
        }
    }

}