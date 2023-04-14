import { AppState } from "../AppState.js";
import { tripItem } from "../models/SearchResult.js";

class TripService {
  createTripItem(selectedSearchResult) {
    const res = api.post(`api/tripItems`, selectedSearchResult)
    if (selectedSearchResult.store?.includes('FRED MEYER')) {
      AppState.fredMeyerTripItems.push(new tripItem(res.data))
    } else {
      AppState.genericTripItems.push(new tripItem(res.data))
    }
  }

}

export const tripService = new TripService();