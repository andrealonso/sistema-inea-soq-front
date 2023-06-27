export function propriedadeModel(payload) {

    if (payload?.id) {
        return {
            id: payload.id,
            nome: payload.nome || "",
            car: payload.car || null,
            area: payload.area || null,
            area_cana: payload.area_cana || null,
            geolocal: payload.geolocal || null,
            empresas_id: payload.empresas_id || null,
            obs: payload.obs || null,
            enderecos: {
                id: payload.enderecos?.id || null,
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
            nome: "",
            car: null,
            area: null,
            area_cana: null,
            geolocal: null,
            empresas_id: null,
            obs: null,
            enderecos: {
                id: null,
                cep: null,
                rua: null,
                num: null,
                bairro: null,
                cidade: null,
                uf: null
            }
        }
    }

}