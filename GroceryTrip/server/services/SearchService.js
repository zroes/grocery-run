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
    const parsedRes0 = JSON.parse(res0.data)
    for (let i = 0; i < parsedRes0.data.length; i++) {
      let item = parsedRes0.data[i]
      item.locationId = locations[0].locationId
      item.store = "FRED MEYER"
      resArray.push(new SearchItem(item))
    }
    // const mappedRes0 = parsedRes0.data.map(item => new SearchItem(item))
    // mappedRes0.forEach(item => item.locationId = locations[0].locationId)
    // return mappedRes0

    // FIXME dont forget to uncooment
    const res1 = await Kroger.get('products', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        'filter.locationId': locations[1].locationId,
        // 'filter.term': q
        'filter.term': query,
        // 'filter.limit': '1'
      }
    })

    const parsedRes1 = JSON.parse(res1.data)
    for (let i = 0; i < parsedRes1.data.length; i++) {
      let item = parsedRes0.data[i]
      item.locationId = locations[1].locationId
      item.store = "FRED MEYER"
      resArray.push(new SearchItem(item))
    }

    return resArray


    // const mappedRes1 = parsedRes1.data.map(item => new SearchItem(item))
    // mappedRes1.forEach(item => item.locationId = locations[1].locationId)
    // resArray.push(mappedRes1)
    // return resArray.flat(1)
    // FIXME the end of comment to be added




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