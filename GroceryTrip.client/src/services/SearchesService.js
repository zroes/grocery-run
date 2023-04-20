import { AppState } from "../AppState.js"
import { SearchResult } from "../models/SearchResult.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SearchesService {
  async getSearchResults(search) {
    AppState.searchResults = null
    // logger.log(search)
    AppState.loading = true
    const res = await api.post('api/search', search)
    AppState.loading = false
    const query = search.query[0]
    let rawSearchResults = res.data[query].map(s => new SearchResult(s))
    logger.log(rawSearchResults)
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

  async searchList(body) {
    const res = await api.post('api/search', body)
    return res.data
  }

}

export const searchesService = new SearchesService()