import { AppState } from "../AppState.js";
import { SearchResult } from "../models/SearchResult.js";

class SearchesService {
  // async getSearchResults(search) {
  //   const res = await api.get(`/api/search`, search)
  //   return res.data

  // }
  // async sortSearchResults(searchData, sortType) {
  //   let unsortedSearchResults = searchData.map(s => new SearchResult(s))
  //   if (sortType == 'price') {
  //     AppState.searchResults = unsortedSearchResults.sort((a, b) => a.price - b.price)
  //   } else {
  //     AppState.searchResults = unsortedSearchResults.sort((a, b) => a.distance - b.distance)
  //   }
  // }

}

export const searchesService = new SearchesService();