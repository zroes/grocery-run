import { searchService } from "../services/SearchService.js";
import BaseController from "../utils/BaseController.js";

export class SearchController extends BaseController {
    constructor() {
        super('api/search')
        this.router
            .get('', this.getKrogerSearch)
    }
    async getKrogerSearch(req, res, next) {
        try {
            const query = req.body.query
            let searchResults = await searchService.getKrogerSearch(query)

            return res.send(searchResults)
        }
        catch (error) {
            next(error)
        }
    }


}