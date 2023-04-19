import { AppState } from "../AppState.js"
import { tripItem } from "../models/SearchResult.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripService {
  async createTripItem(selectedSearchResult) {
    let res
    const foundItem = AppState.tripItems.find(item => item.name == selectedSearchResult.name)
    if (foundItem) {
      res = await api.put('api/tripItems/' + foundItem.id)
      foundItem.quantity++
    }
    else {
      res = await api.post(`api/tripItems`, selectedSearchResult)
      AppState.tripItems.push(res.data)
    }
    // logger.log(res.data)
    // if (selectedSearchResult.store?.includes('FRED MEYER')) {
    //   AppState.fredMeyerTripItems.push(new tripItem(res.data))
    // } else {
    //   AppState.genericTripItems.push(new tripItem(res.data))
    // }
  }

  async getMyTripItems() {
    const res = await api.get('account/tripItems')
    logger.log('Getting trip items', res.data)
    AppState.tripItems = res.data.map(item => new tripItem(item))
  }
  async addListToTrip(pickedItems) {
    pickedItems.forEach(async p => {
      const res = await api.post(`api/tripItems`, p)
      AppState.tripItems.push(new tripItem(res.data))
    })
  }

  async clearTrip() {
    const res = await api.delete('api/tripItems')
    AppState.tripItems = []
    logger.log(AppState.tripItems, res.data)
  }
}


export const tripService = new TripService()