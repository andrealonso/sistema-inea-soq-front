export function propriedadeModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            nome: payload.nome || "",
            car: payload.car || null,
            area: payload.area || null,
            area_cana: payload.area_cana || null,
            geolocal: payload.geolocal || null,
            representante_id: Number(payload.representante_id) || null,
            proprietario_id: Number(payload.proprietario_id) || null,
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
            nome: "",
            car: null,
            area: null,
            area_cana: null,
            geolocal: null,
            representante_id: null,
            proprietario_id: null,
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