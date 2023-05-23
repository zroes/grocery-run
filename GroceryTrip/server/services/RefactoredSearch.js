import { SearchItem } from "../models/SearchItem.js"
import { Albertsons, Kroger } from "./AxiosService.js"
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js"

class RefactoredSearchService {
  async search(query, locations) {

    const kRes = await getKrogerResults(query, locations)
    const aRes = await getAlbertsonsResults(query, locations)
    let res = {}
    if (kRes) {
      kRes.forEach(k => {
        res.push(k)
      })
    }
    if (aRes) {
      aRes.forEach(a => {
        res.push(a)
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
          'filter.locationId': locations[0].locationId,
          // 'filter.term': q
          'filter.term': q,
          // 'filter.fulfillment': 'ais',
          // 'filter.limit': '1'
        }

      })
      promises.push(prom)
      locationIds.push(locations[i])


    })
  }
  const raw = await Promise.all(promises)
  if (raw[0] == undefined) {
    return null
  }
  const parsedRes = raw.map(r => JSON.parse(r.data))
  for (let i = 0; i < parsedRes.length; i++) {
    let r = parsedRes[i]
    const res = r
    res.locationId = locationIds[i]
    res.locationId = locations[0].locationId
    res.store = "FRED MEYER"
    res.query = query[i]
    item[query[i]].push(new SearchItem(res))
  }
  return item
}
async function getAlbertsonsResults(query, locations) {
  let promises = []
  let locationIds = []
  let item = {}
  query.forEach(q => {
    const prom = Albertsons.get('/pgmsearch/v1/search/products', {
      headers: { "ocp-apim-subscription-key": "5e790236c84e46338f4290aa1050cdd4" },
      params: {
        "request-id": "3301683914897406610",   //FIXME replace request id manually
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
        "banner": "albertsons"
      }
    })
    promises.push(prom)
    locationIds.push(locations[3])
  })

  const raw = await Promise.all(promises)
  if (raw[0] == undefined) {
    return null
  }
  const parsedRes = raw.map(r => JSON.parse(r.data))
  const mappedRes = []
  for (let i = 0; i < parsedRes.length; i++) {
    let r = parsedRes[i]
    const res = { item: r.primaryProducts.response.docs }
    res.size = `${res.item.unitQuantity}`
    res.image = `//images.albertsons-media.com/is/image/ABS/${res.item.pid}?$ecom-product-card-mobile-jpg$&defaultImage=Not_Available`
    res.locationId = locationIds[i].locationId
    res.store = 'Albertsons'
    res.distance = locationIds[i].distance
    res.query = query[i]
    item[query[i]].push(new SearchItem(res))
  }
  return item
}


