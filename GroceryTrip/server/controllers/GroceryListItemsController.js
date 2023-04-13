import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { groceryListItemsService } from "../services/GroceryListItemsService.js"
export class GroceryListItemsController extends BaseController {
  constructor() {
    super('api/groceryItems')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addItem)
      .delete('/:itemId', this.deleteItem)
  }
  async addItem(req, res, next) {
    try {
      const itemDetails = req.body
      itemDetails.included = true // add this to model / schema
      const newItem = await groceryListItemsService.addItem(itemDetails)
      res.send(newItem)
    } catch (error) {
      next(error)
    }
  }

  async deleteItem(req, res, next) {
    try {
      const itemId = req.params.itemId
      await groceryListItemsService.deleteItem(itemId)
      res.send('item deleted')
    } catch (error) {
      next(error)
    }
  }


}