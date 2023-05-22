import { SearchItem } from "../models/SearchItem.js"
import { Albertsons, Kroger } from "./AxiosService.js"
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js"

class ListSearchService {
  async getItemsFromListForTrip(query, locations) {
    let token = await krogerAuthorizationService.getAuthorization()

    let promises0 = []
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
          // 'filter.fulfillment': 'ais',
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
        item.query = query[i]
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
          // 'filter.fulfillment': 'ais',
        }
      })
      promises1.push(prom)
    })

    const raw1 = await Promise.all(promises1)

    const parsedRes1 = raw1.map(r => JSON.parse(r.data).data)
    // parsedRes0.flat(1)
    for (let i = 0; i < parsedRes1.length; i++) {

      for (let j = 0; j < parsedRes1[i].length; j++) {

        let item = parsedRes1[i][j]
        item.locationId = locations[1].locationId
        item.store = "FRED MEYER"
        item.query = query[i]
        obj[query[i]].push(new SearchItem(item))
        // resArray.push(item)
      }
    }


    return obj
  }


  async getAlbertsonsItems(query, locations) {
    let promises0 = []
    let obj = {}
    query.forEach(q => {
      const prom = Albertsons.get('/pgmsearch/v1/search/products', {
        headers:
        {
          "ocp-apim-subscription-key": "5e790236c84e46338f4290aa1050cdd4"
        },
        params:
        {
          "request-id": "6861684783004706419",   //FIXME replace request id manually
          "url": "https://www.albertsons.com",
          "pageurl": "https://www.albertsons.com",
          "pagename": "search",
          "rows": "30",
          "start": "0",
          "search-type": "keyword",
          "storeid": locations[3].locationId,
          "featured": "true",
          "search-uid": "",
          "q": q,
          "sort": "",
          //featuredsessionid:
          //screenwidth:734
          "dvid": "web-4.1search",
          "channel": "instore",
          "banner": "albertsons",
        }
      })
      promises0.push(prom)
    })
    const raw0 = await Promise.all(promises0)
    const parsedRes0 = raw0.map(r => JSON.parse(r.data))
    const mappedRes0 = []
    parsedRes0.forEach(r => {
      const res = r.primaryProducts.response.docs
      mappedRes0.push(res)
    })




    for (let i = 0; i < query.length; i++) {
      obj[query[i]] = []
      if (mappedRes0[0] == undefined) {
        return obj
      }
      for (let j = 0; j < mappedRes0[i].length; j++) {

        // for (let j = 0; j < parsedRes0[i].length; j++) {
        let item = mappedRes0[i][j]
        item.image = `//images.albertsons-media.com/is/image/ABS/${item.pid}?$ecom-product-card-mobile-jpg$&defaultImage=Not_Available`
        item.size = `${item.unitQuantity}`
        item.locationId = locations[3].locationId
        item.store = "Albertsons"
        item.distance = locations[3].distance
        item.query = query[i]
        obj[query[i]].push(item)
      }
    }

    return obj

    // parsedRes0.flat(1)

    // for (let i = 0; i < parsedRes0.length; i++) {
    //   obj[query[i]] = []
    //   for (let j = 0; j < parsedRes0[i].length; j++) {

    //     let item = parsedRes0[i][j]
    //     item.locationId = locations[0].locationId
    //     item.store = "FRED MEYER"
    //     item.query = query[i]
    //     obj[query[i]].push(new SearchItem(item))
    //     // resArray.push(item)
    //   }

    // }
  }
}


export const listSearchService = new ListSearchService()