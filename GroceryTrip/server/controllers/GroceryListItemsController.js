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
      .put('/:itemId', this.toggleInclude)
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
      // Ensure req userinfo id is correct
      await groceryListItemsService.deleteItem(itemId)
      res.send('item deleted')
    } catch (error) {
      next(error)
    }
  }

  async toggleInclude(req, res, next) {
    try {
      const itemId = req.params.itemId
      // const accountId = req.userInfo.id
      const itemToToggle = await groceryListItemsService.toggleInclude(itemId)
      res.send(itemToToggle)
    } catch (error) {
      next(error)
    }
  }


}