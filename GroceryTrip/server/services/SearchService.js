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
    let resArray = raw.map(r => JSON.parse(r.data).data).flat(1)
    // }))
    // });

    const mappedArray = resArray.map(item => new SearchItem(item))
    return mappedArray
  }
}


export const searchService = new SearchService()