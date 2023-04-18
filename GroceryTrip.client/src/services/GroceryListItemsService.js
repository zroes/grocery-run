import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { searchesService } from "./SearchesService.js"
import { tripService } from "./TripService.js"
class GroceryListsItemsService {


  async addItem(itemData) {
    const res = await api.post('api/groceryItems', itemData)
    logger.log(res.data)
    AppState.activeGroceryListItems.push(res.data)
  }

  async deleteItem(itemId) {
    await api.delete('api/groceryItems/' + itemId)
    logger.log('deleting item', itemId)
    AppState.activeGroceryListItems = AppState.activeGroceryListItems
      .filter(item => item.id != itemId)
  }

  async getItemsOnList(listId) {
    const res = await api.get('api/lists/' + listId + '/items')
    logger.log(res.data)
    AppState.activeGroceryListItems = res.data
  }

  async toggleInclude(itemId) {
    const itemToToggle = AppState.activeGroceryListItems.find(item => item.id == itemId)
    itemToToggle.included = !itemToToggle.included
    const res = await api.put('api/groceryItems/' + itemId)
    logger.log(res.data)
  }

  async sortListResults(body, sortType) {
    const results = await searchesService.searchList(body)

    let pickedItems = []

    let resultKeys = body.query

    for (let i = 0; i < resultKeys.length; i++) {

      let unsortedResults = results[resultKeys[i]].filter(r => r.price != null)

      if (sortType == "price") {
        const sortedResults = unsortedResults.sort((a, b) => a.price - b.price)
        pickedItems.push(sortedResults[0])
      } else {
        const sortedResults = unsortedResults.sort((a, b) => a.distance - b.distance)
        pickedItems.push(sortedResults[0])
      }
    }

    await tripService.addListToTrip(pickedItems)

  }
}

export const groceryListItemsService = new GroceryListsItemsService()