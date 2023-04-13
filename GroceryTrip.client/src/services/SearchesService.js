import { AppState } from "../AppState.js";
import { SearchResult } from "../models/SearchResult.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class SearchesService {
  async getSearchResults(search) {
    logger.log(search)
    const res = await api.post('api/search', search)
    return res.data

  }
  async sortSearchResults(searchData, sortType) {
    let unsortedSearchResults = searchData.map(s => new SearchResult(s))
    if (sortType == 'price') {
      AppState.searchResults = unsortedSearchResults.sort((a, b) => a.price - b.price)
      logger.log(AppState.searchResults)
    } else {
      AppState.searchResults = unsortedSearchResults.sort((a, b) => a.distance - b.distance)
      logger.log(AppState.searchResults)
    }
  }

}

export const searchesService = new SearchesService();