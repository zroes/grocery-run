import { query } from "express"
import { SearchItem } from "../models/SearchItem.js"
import { searchService } from "../services/SearchService.js"
import { listSearchService } from "../services/ListSearchService.js"
import BaseController from "../utils/BaseController.js"

export class SearchController extends BaseController {
  constructor() {
    super('api/search')
    this.router
      .post('', this.getKrogerSearch)
      .post('/trips', this.manySearch)
  }
  async getKrogerSearch(req, res, next) {
    try {
      const query = req.body.query
      const locations = req.body.locations
      let searchResults = await searchService.getKrogerSearch(query, locations)
      // let modeledSearchResults = searchResults.data.map(s => new SearchItem(s))
      return res.send(searchResults)
    }
    catch (error) {
      next(error)
    }
  }

  async manySearch(req, res, next) {
    try {
      const query = req.body.query
      const locations = req.body.locations
      const results = await listSearchService.getItemsFromListForTrip(query, locations)

      return res.send(results)
    }
    catch (error) {
      next(error)
    }
  }


}