import { SearchItem } from "../models/SearchItem.js"
import { Kroger } from "./AxiosService.js"
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js"

class SearchService {
  async getKrogerSearch(query, locations) {
    // let res = []
    let token = await krogerAuthorizationService.getAuthorization()
    // query.queries.forEach(async q => {
    // q = q.replace(/\s+/g, '')
    // res.push(await Kroger.get(`products`, {
    let resArray = []
    let promises = []
    locations.forEach(location => {
      const prom = Kroger.get('products', {
        headers:
          { 'Authorization': `Bearer ${token}` },
        params:
        {
          'filter.locationId': location.locationId,
          // 'filter.term': q
          'filter.term': query,
          // 'filter.limit': '1'
        }
      })
      // const parsedRes = JSON.parse(res.data)
      promises.push(prom)
      // resArray.push(parsedRes.data)
    })
    const raw = await Promise.all(promises)
    resArray = raw.map(r => JSON.parse(r.data).data)
    // }))
    // });
    return resArray
  }
}


export const searchService = new SearchService()