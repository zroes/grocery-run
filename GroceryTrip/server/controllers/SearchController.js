import { SearchItem } from "../models/SearchItem.js";
import { searchService } from "../services/SearchService.js";
import BaseController from "../utils/BaseController.js";

export class SearchController extends BaseController {
  constructor() {
    super('api/search')
    this.router
      .post('', this.getKrogerSearch)
  }
  async getKrogerSearch(req, res, next) {
    try {
      const query = req.body.query
      let searchResults = await searchService.getKrogerSearch(query)
      // let modeledSearchResults = searchResults.data.map(s => new SearchItem(s))
      return res.send(searchResults.data)
    }
    catch (error) {
      next(error)
    }
  }


}