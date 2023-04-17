import { Kroger } from "./AxiosService.js"
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js"

class TestingSearchService {
    async testSearch(query, locations) {
        let token = await krogerAuthorizationService.getAuthorization()

        let promises = []
        let res = []
        query.forEach(q => {
            const prom = Kroger.get('products', {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                },
                params:
                {
                    'filter.locationId': locations[0].locationId,
                    // 'filter.term': q
                    'filter.term': q,
                    // 'filter.limit': '1'
                }
            })

            promises.push(prom)
        })
        const raw = await Promise.all(promises)
        const parsedRes = raw.map(r => JSON.parse(r.data))

        return parsedRes
    }

}


export const testingSearchService = new TestingSearchService()