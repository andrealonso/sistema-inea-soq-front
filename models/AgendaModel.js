const moment = require('moment')
export function agendaModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            data_inicio: payload.data_inicio || null,
            data_fim: payload.data_fim || null,
            talhao: payload.talhao || null,
            area_queima: payload.area_queima || null,
            ordem_corte_interna: payload.ordem_corte_interna || null,
            obs: payload.obs || null,
            propriedades_id: payload.propriedades_id || null,
            empresas_id: payload.empresas_id || false,
            user_id: payload.user_id || null,
        }
    } else {
        return {
            id: null,
            data_inicio: null,
            data_fim: null,
            talhao: null,
            area_queima: null,
            ordem_corte_interna: null,
            obs: null,
            propriedades_id: null,
            empresas_id: false,
            user_id: null,
        }
    }

}