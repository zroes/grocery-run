import { AppState } from "../AppState.js"
import { tripItem } from "../models/SearchResult.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripService {
  async createTripItem(selectedSearchResult) {
    let res
    const foundItems = AppState.tripItems.filter(item => item.name == selectedSearchResult.name)
    const foundItem = foundItems.find(item => item.locationId == selectedSearchResult.locationId)
    if (foundItem) {
      foundItem.quantity++
      res = await api.put('api/tripItems', foundItem)
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

  async deleteTripItem(item) {
    await api.delete(`api/tripItems/${item.id}`)
    AppState.tripItems = AppState.tripItems.filter(t => t.id != item.id)
  }

  async increaseQuantity(item) {
    item.quantity++
    const res = await api.put(`api/tripItems`, item)
  }

  async decreaseQuantity(item) {
    item.quantity--
    const res = await api.put(`api/tripItems`, item)
  }

  async toggleInclude(item) {
    item.included = !item.included
    const res = await api.put('api/tripItems', item)
  }
}



export const tripService = new TripService()