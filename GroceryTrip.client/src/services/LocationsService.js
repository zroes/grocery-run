import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"

class LocationsService {
  async sendLatLong(coords) {
    logger.log(coords)
    const res = await api.post('/location', coords)
    AppState.locations = res.data.map(l => new StoreLocation(l))
    logger.log(AppState.locations)
  }
}

export const locationsService = new LocationsService()