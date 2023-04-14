import { Kroger } from "./AxiosService.js";
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js";

class SearchService {
    async getKrogerSearch(query) {
        // let res = []
        let token = await krogerAuthorizationService.getAuthorization()
        // query.queries.forEach(async q => {
        // q = q.replace(/\s+/g, '')
        // res.push(await Kroger.get(`products`, {
        const res = await Kroger.get('products', {
            headers:
                { 'Authorization': `Bearer ${token}` },

            params:
            {
                'filter.locationId': '70100449',
                // 'filter.term': q
                'filter.term': query,
                // 'filter.limit': '1'
            }
        });
        // }))
        // });
        const parsedRes = JSON.parse(res.data)
        return parsedRes
    }
}


export const searchService = new SearchService()