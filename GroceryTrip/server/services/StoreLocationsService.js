
// compute the distance to user for each location id
// acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371

import { dbContext } from "../db/DbContext.js"
import { Kroger } from "./AxiosService.js"
import { Albertsons } from "./AxiosService.js"
import { krogerAuthorizationService } from "./KrogerAuthorizationService.js"

// stack overflow special
function getDistance(lat1, lon1, lat2, lon2) {
  const radius = 3963 // mi
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  let lat1Rad = toRad(lat1)
  let lat2Rad = toRad(lat2)

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = radius * c
  return d.toFixed(2)
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180
}


// let x = point1.latitude - point2.lat
// let y = point1.longitude - point2.long
// return Math.sqrt(x * x + y * y)


class StoreLocationsService {
  async addAlbertsonsLocations(latLong, accountId) {
    const res = await Albertsons.get('/storeresolver/v2/all', {
      params: {
        'latitude': latLong.lat,
        'longitude': latLong.long,
        'excludeBanners': 'none'
      }
    })
    const savedLocations = []
    const parsedLocations = JSON.parse(res.data).instore.stores
    for (let i = 0; i < 2; i++) {
      const elem = parsedLocations[i]
      elem.name = `${elem.domainName} - ${elem.address.line1}`
      elem.logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Albertsons_logo.svg/2560px-Albertsons_logo.svg.png'
      elem.accountId = accountId
      elem.store = 'Albertsons'
      savedLocations.push(await dbContext.StoreLocations.create(elem))
    }
    return savedLocations
  }


  async addKrogerLocations(latLong, accountId) {
    let token = await krogerAuthorizationService.getAuthorization()

    const res = await Kroger.get('locations', {
      headers:
        { 'Authorization': `Bearer ${token} ` },

      params: {
        'filter.latLong.near': `${latLong.lat},${latLong.long} `
      }
    })
    // return locations
    const parsedLocations = JSON.parse(res.data)
    let distance
    let savedLocations = []
    await dbContext.StoreLocations.deleteMany({ accountId: accountId })
    // NOTE this is how we would grab more than 2 locations
    for (let i = 0; i < 2; i++) {
      const element = parsedLocations.data[i]
      distance = getDistance(
        element.geolocation.latitude, element.geolocation.longitude,
        latLong.lat, latLong.long)
      element.distance = distance
      element.accountId = accountId
      element.logo = element.name.includes('Fred Meyer') ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Fred_Meyer_logo.svg/2560px-Fred_Meyer_logo.svg.png" : "../assets/img/GenericCompanyPic.png"
      element.name = 'Kroger:' + element.name
      element.store = 'Kroger'
      savedLocations.push(await dbContext.StoreLocations.create(element))
    }
    return savedLocations
  }

}


export const storeLocationsService = new StoreLocationsService()