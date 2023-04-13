import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { groceryListsService } from "../services/groceryListsService.js"
export class GroceryListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }
  async create(req, res, next) {
    try {
      const listData = req.body
      listData.accountId = req.userInfo.id
      const newGroceryList = await groceryListsService.create(listData)
      res.send(newGroceryList)
    } catch (error) {
      next(error)
    }
  }
}