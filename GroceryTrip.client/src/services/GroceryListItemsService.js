import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
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
    const res = await api.put('api/groceryItems/' + itemId)
    logger.log(res.data)
    const itemToToggle = AppState.activeGroceryListItems.find(item => item.id == itemId)
    itemToToggle.included = !itemToToggle.included
  }

}

export const groceryListItemsService = new GroceryListsItemsService()