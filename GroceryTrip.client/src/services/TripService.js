import { AppState } from "../AppState.js";
import { tripItem } from "../models/SearchResult.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TripService {
  async createTripItem(selectedSearchResult) {
    const res = await api.post(`api/tripItems`, selectedSearchResult)
    logger.log(res.data)
    if (selectedSearchResult.store?.includes('FRED MEYER')) {
      AppState.fredMeyerTripItems.push(new tripItem(res.data))
    } else {
      AppState.genericTripItems.push(new tripItem(res.data))
    }
  }

}

export const tripService = new TripService();