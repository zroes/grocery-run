import { AppState } from "../AppState.js"
import { SearchResult } from "../models/SearchResult.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SearchesService {
  async getSearchResults(search) {
    // logger.log(search)
    const res = await api.post('api/search', search)
    logger.log(res.data.flat(1))
    return res.data.flat(1)

  }
  async sortSearchResults(searchData, sortType) {
    let unsortedSearchResults = searchData.map(s => new SearchResult(s))
    let newUnsortedSearchResults = unsortedSearchResults.filter(r => r.price != null)

    if (sortType == 'price') {
      AppState.searchResults = newUnsortedSearchResults.sort((a, b) => a.price - b.price)
      // logger.log(AppState.searchResults)
    } else {
      AppState.searchResults = newUnsortedSearchResults.sort((a, b) => a.distance - b.distance)
      // logger.log(AppState.searchResults)
    }
  }

}

export const searchesService = new SearchesService()