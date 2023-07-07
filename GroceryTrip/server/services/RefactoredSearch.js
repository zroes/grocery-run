import { SearchItem } from "../models/SearchItem.js"
import { Albertsons, Kroger } from "./AxiosService.js"
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js"

class RefactoredSearchService {
  async search(query, locations) {

    const kLocations = locations.filter(l => l.store == 'Kroger')
    const aLocations = locations.filter(l => l.store == 'Albertsons')
    const kRes = await getKrogerResults(query, kLocations)
    const aRes = await getAlbertsonsResults(query, aLocations)
    let res = {}
    if (kRes) {
      const keys = Object.keys(kRes)
      keys.forEach(k => {
        res[k] = kRes[k]
      })
    }
    if (aRes) {
      const aKeys = Object.keys(aRes)
      aKeys.forEach(k => {
        aRes[k].forEach(r => {
          res[k].push(r)
        })
      })
    }
    return res
  }
}


export const refactoredSearchService = new RefactoredSearchService()

async function getKrogerResults(query, locations) {
  let promises = []
  let locationIds = []
  let item = {}
  let queryArray = []
  const token = await krogerAuthorizationService.getAuthorization()

  for (let i = 0; i < locations.length; i++) {
    let l = locations[i]
    query.forEach(q => {
      const prom = Kroger.get('products', {
        headers:
        {
          'Authorization': `Bearer ${token}`
        },
        params:
        {
          'filter.locationId': locations[i].locationId,
          // 'filter.term': q
          'filter.term': q,
          // 'filter.fulfillment': 'ais',
          // 'filter.limit': '1'
        }

      })
      promises.push(prom)
      locationIds.push(locations[i])
      queryArray.push(q)


    })
  }
  const raw = await Promise.all(promises)
  if (raw[0] == undefined) {
    return null
  }
  const parsedRes = raw.map(r => JSON.parse(r.data))
  for (let i = 0; i < parsedRes.length; i++) {
    let r = parsedRes[i]
    if (!item[queryArray[i]]) {
      item[queryArray[i]] = []
    }
    r.data.forEach(res => {
      res.locationId = locationIds[i].locationId
      res.distance = locations[i].distance
      res.store = "FRED MEYER"
      res.query = queryArray[i]
      item[queryArray[i]].push(new SearchItem(res))
    });
  }
  return item
}
async function getAlbertsonsResults(query, locations) {
  let promises = []
  let locationIds = []
  let queryArray = []
  let item = {}
  for (let i = 0; i < locations.length; i++) {
    query.forEach(q => {
      const prom = Albertsons.get('/pgmsearch/v1/search/products', {
        headers: { "ocp-apim-subscription-key": "5e790236c84e46338f4290aa1050cdd4" },
        params: {
          "request-id": "7391685155999553124",   //FIXME replace request id manually
          "url": "https://www.albertsons.com",
          "pageurl": "https://www.albertsons.com",
          "pagename": "search",
          "rows": "30",
          "start": "0",
          "search-type": "keyword",
          "storeid": locations[i].locationId,
          "featured": "true",
          "search-uid": "",
          "q": q,
          "sort": "",
          //featuredsessionid:
          //screenwidth:734
          "dvid": "web-4.1search",
          "channel": "instore",
          "banner": "albertsons"
        }
      })
      promises.push(prom)
      locationIds.push(locations[i])
      queryArray.push(q)
    })
  }

  const raw = await Promise.all(promises)
  if (raw[0].status != 200) {
    return null
  }
  const parsedRes = raw.map(r => JSON.parse(r.data))
  for (let i = 0; i < parsedRes.length; i++) {
    let r = parsedRes[i]
    if (!item[queryArray[i]]) {
      item[queryArray[i]] = []
    }
    if (r.primaryProducts.appCode == "400") {
      return
    }
    r.primaryProducts.response.docs.forEach(resItem => {
      const res = resItem
      res.size = `${res.unitQuantity}`
      res.images = `//images.albertsons-media.com/is/image/ABS/${res.pid}?$ecom-product-card-mobile-jpg$&defaultImage=Not_Available`
      res.locationId = locationIds[i].locationId
      res.store = 'Albertsons'
      res.distance = locationIds[i].distance
      res.query = queryArray[i]
      item[queryArray[i]].push(new SearchItem(res))
    });
  }
  return item
}


