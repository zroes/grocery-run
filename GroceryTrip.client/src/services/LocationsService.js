import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { StoreLocation } from "../models/StoreLocation.js"

class LocationsService {
  async sendLatLong(coords) {
    logger.log(coords)
    const res = await api.post('api/location', coords)
    logger.log(res.data)
    // NOTE we want to add something to differentiate between fred meyer and other kroger stores
    // const albertsonsLocations = res.data.filter(store => store.name.includes('Albertsons'))
    // const krogerLocations = res.data.filter(store => store.name.includes('Kroger'))
    AppState.account.locations = res.data.map(l => new StoreLocation(l))
  }
}

export const locationsService = new LocationsService()