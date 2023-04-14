import { AppState } from "../AppState.js"
import { SearchResult } from "../models/SearchResult.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SearchesService {
  async getSearchResults(search) {
    // logger.log(search)
    const res = await api.post('api/search', search)
    let rawSearchResults = res.data.map(s => new SearchResult(s))
    AppState.unsortedSearchResults = rawSearchResults.filter(r => r.price != null)
  }
  async sortSearchResults(sortType) {

    if (AppState.unsortedSearchResults) {
      if (sortType == 'price') {
        AppState.searchResults = AppState.unsortedSearchResults.sort((a, b) => a.price - b.price)
        // logger.log(AppState.searchResults)
      } else {
        AppState.searchResults = AppState.unsortedSearchResults.sort((a, b) => a.distance - b.distance)
        // logger.log(AppState.searchResults)
      }
    }
  }

}

export const searchesService = new SearchesService()