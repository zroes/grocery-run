import { SearchItem } from "../models/SearchItem.js"
import { Kroger } from "./AxiosService.js"
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js"

class TestingSearchService {
  async testSearch(query, locations) {
    let token = await krogerAuthorizationService.getAuthorization()

    let promises0 = []
    let resArray = []
    let obj = {}
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
      promises0.push(prom)
      // promises.push(new Promise((resolve,reject)=> {
      //     const prom = 
      //     resolve();

      // }))
    })
    const raw0 = await Promise.all(promises0)
    const parsedRes0 = raw0.map(r => JSON.parse(r.data).data)
    // parsedRes0.flat(1)

    for (let i = 0; i < parsedRes0.length; i++) {
      obj[query[i]] = []
      for (let j = 0; j < parsedRes0[i].length; j++) {

        let item = parsedRes0[i][j]
        item.locationId = locations[0].locationId
        item.store = "FRED MEYER"
        obj[query[i]].push(new SearchItem(item))
        // resArray.push(item)
      }
    }

    // const parsedRes = raw.map(r => JSON.parse(r.results))
    // const test = 'hold please'

    let promises1 = []
    query.forEach(q => {
      const prom = Kroger.get('products', {
        headers:
        {
          'Authorization': `Bearer ${token}`
        },
        params:
        {
          'filter.locationId': locations[1].locationId,
          'filter.term': q,
        }
      })
      promises1.push(prom)
    })

    const raw1 = await Promise.all(promises1)

    const parsedRes1 = raw1.map(r => JSON.parse(r.data).data)
    // parsedRes0.flat(1)
    for (let i = 0; i < parsedRes1.length; i++) {
      // FIXME will error out if an item isn't at the first store but is at the second store

      for (let j = 0; j < parsedRes1[i].length; j++) {

        let item = parsedRes1[i][j]
        item.locationId = locations[1].locationId
        item.store = "FRED MEYER"
        obj[query[i]].push(new SearchItem(item))
        // resArray.push(item)
      }
    }


    return obj
  }

}


export const testingSearchService = new TestingSearchService()