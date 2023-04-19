import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class ListsService {

  async createList(name) {
    const res = await api.post('api/lists', name)
    logger.log(res.data)
    return res.data
  }

  async getMyLists() {
    const res = await api.get('api/lists')
    logger.log(res.data)
    AppState.groceryLists = res.data
  }

  async getListById(listId) {
    AppState.activeGroceryList = null
    AppState.loading = true
    const res = await api.get('api/lists/' + listId)
    AppState.activeGroceryList = res.data
  }

  toggleForm() {
    AppState.toggle = !AppState.toggle
  }

  async deleteList(listId) {
    const res = await api.delete('api/lists/' + listId)
    logger.log(res.data)
  }

}

export const listsService = new ListsService()