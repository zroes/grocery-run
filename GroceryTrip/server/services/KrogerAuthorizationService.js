import { Kroger } from "./AxiosService.js"


class KrogerAuthorizationService {
    async getAuthorization() {
        const res = await Kroger.post('connect/oauth2/token?grant_type=client_credentials&scope=product.compact')
        // krogerToken.token = res.data.access_token
        // krogerToken.CreatedAt = Date.now()
        const token = JSON.parse(res.data)
        return token.access_token
    }
    // TODO send token back
}


export const krogerAuthorizationService = new KrogerAuthorizationService()