import { query } from "express"
import { SearchItem } from "../models/SearchItem.js"
import { searchService } from "../services/SearchService.js"
import { listSearchService } from "../services/ListSearchService.js"
import BaseController from "../utils/BaseController.js"

export class SearchController extends BaseController {
  constructor() {
    super('api/search')
    this.router
      // .post('', this.getSearchResults)
      .post('', this.manySearch)
  }
  async getSearchResults(req, res, next) {
    try {
      const query = req.body.query
      const locations = req.body.locations
      let krogerResults = await searchService.getKrogerSearch(query, locations)
      // let albertsonsResults = await searchService.getAlbertsonsSearch(query, locations)
      // let modeledSearchResults = searchResults.data.map(s => new SearchItem(s))
      // let searchResults = krogerResults.concat(albertsonsResults)
      res.send(krogerResults)
    }
    catch (error) {
      next(error)
    }
  }

  async manySearch(req, res, next) {
    try {
      const query = req.body.query
      const locations = req.body.locations
      const krogerResults = await listSearchService.getItemsFromListForTrip(query, locations)
      const albertsonsResults = await listSearchService.getAlbertsonsItems(query, locations)
      const results = {}
      query.forEach(q => {
        results[q] = albertsonsResults[q]
        results[q].concat(krogerResults[q]) // not working
      })
      // TODO combine results from these two apis
      // const results = krogerResults.concat(albertsonsResults)
      return res.send(results)
    }
    catch (error) {
      next(error)
    }
  }


}