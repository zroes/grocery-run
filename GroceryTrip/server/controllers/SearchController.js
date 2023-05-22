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
      const albertsonsResults = await listSearchService.getAlbertsonsItems(query, locations[3])
      const results = {}
      if (albertsonsResults[0] == undefined)
        query.forEach(q => {
          results[q] = krogerResults[q]
          for (let i = 0; i < albertsonsResults[q].length; i++) {
            results[q].push(albertsonsResults[q][i])
          }

        })
      return res.send(results)
    }
    catch (error) {
      next(error)
    }
  }

  async manySearchRefactored(req, res, next) {
    try {
      const query = req.body.query
      const kLocations = req.body.locations.slice(0, 2)
      const krogerResults = await listSearchService.getItemsFromListForTrip(query, kLocations)
      const albertsonsResults = await listSearchService.getAlbertsonsItems(query, req.body.locations[3])
      const results = {}
      if (albertsonsResults[0] == undefined)
        query.forEach(q => {
          results[q] = krogerResults[q]
          for (let i = 0; i < albertsonsResults[q].length; i++) {
            results[q].push(albertsonsResults[q][i])
          }

        })
      return res.send(results)
    }
    catch (error) {
      next(error)
    }
  }
}