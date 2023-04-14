
// compute the distance to user for each location id
// acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371

import { dbContext } from "../db/DbContext.js"
import { Kroger } from "./AxiosService.js"
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
  async addLocations(latLong, accountId) {
    let token = await krogerAuthorizationService.getAuthorization()

    const res = await Kroger.get('locations', {
      headers:
        { 'Authorization': `Bearer ${token}` },

      params: {
        'filter.latLong.near': `${latLong.lat},${latLong.long}`
      }
    })
    // return locations
    const parsedLocations = JSON.parse(res.data)
    let distance
    let savedLocations = []
    await dbContext.StoreLocations.deleteMany({ accountId: accountId })
    for (let i = 0; i < parsedLocations.data.length; i++) {
      const element = parsedLocations.data[i]
      distance = getDistance(
        element.geolocation.latitude, element.geolocation.longitude,
        latLong.lat, latLong.long)
      element.distance = distance
      element.accountId = accountId
      savedLocations.push(await dbContext.StoreLocations.create(element))
    }
    return savedLocations
  }

}


export const storeLocationsService = new StoreLocationsService()