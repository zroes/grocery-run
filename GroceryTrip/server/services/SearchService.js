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

    const res0 = await Kroger.get('products', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        'filter.locationId': locations[0].locationId,
        // 'filter.term': q
        'filter.term': query,
        // 'filter.limit': '1'
      }
    })
    // return res0.data
    const parsedRes = JSON.parse(res0.data)
    const mappedRes = parsedRes.data.map(item => new SearchItem(item))
    mappedRes.forEach(item => item.locationId = locations[0].locationId)
    return mappedRes
    // resArray.push(mappedRes)  // r.data

    // const res1 = await Kroger.get('products', {
    //   headers: { 'Authorization': `Bearer ${token}` },
    //   params: {
    //     'filter.locationId': locations[1],
    //     // 'filter.term': q
    //     'filter.term': query,
    //     // 'filter.limit': '1'
    //   }
    // })

    // res1.data.forEach(item => item.locationId = locations[1].locationId)

    // resArray.push(res1.data.map(r => JSON.parse(r)))
    // // resArray.push(parsedRes.data)

    // resArray.flat(1)
    // const len = resArray.length
    // for (let i = 0; i < len; i++) {
    //   resArray[i].store = "FRED MEYER"
    // }

    // // }))
    // // });

    // const mappedArray = resArray.map(item => new SearchItem(item))
    // return mappedArray
  }
}


export const searchService = new SearchService()