const moment = require('moment')
export function configModel(payload) {
    if (payload?.id) {
        return {
            id: payload.id,
            ativar_envio: payload.ativar_envio || null,
            mail_user: payload.mail_user || null,
            mail_pass: payload.mail_pass || null,
            mail_smtp: payload.mail_smtp || null,
            mail_port: payload.mail_port || null,
            mail_ssl: payload.mail_ssl || null,
            mail_from: payload.mail_from || null,
            prazo_alteracao_ordem: payload.prazo_alteracao_ordem || null,
        }
    }

}