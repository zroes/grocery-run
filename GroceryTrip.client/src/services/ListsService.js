import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

class ListsService {

  async createList(name) {
    const res = await api.post('api/lists', name)
    logger.log(res.data)
  }

  toggleForm() {
    AppState.toggle = !AppState.toggle
  }
}

export const listsService = new ListsService()