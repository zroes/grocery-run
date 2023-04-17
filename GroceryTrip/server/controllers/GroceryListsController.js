import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { groceryListsService } from "../services/GroceryListsService.js"
import { groceryListItemsService } from "../services/GroceryListItemsService.js"
export class GroceryListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getAll)
      .get('/:listId', this.getOne)
      .get('/:listId/items', this.getAllItems)
      .delete('/:listId', this.deleteList)
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

  async getAll(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const lists = await groceryListsService.getAll(accountId)
      res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const listId = req.params.listId
      const groceryList = await groceryListsService.getOne(listId)
      res.send(groceryList)
    } catch (error) {
      next(error)
    }
  }

  async getAllItems(req, res, next) {
    try {
      const listId = req.params.listId
      const groceryItems = await groceryListItemsService.getAllItems(listId)
      res.send(groceryItems)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const listId = req.params.listId
      // confirm that the creator of the list is the one sending this request
      const accountId = req.userInfo.id
      await groceryListsService.delete(listId, accountId)
      res.send('list was deleted')
    } catch (error) {
      next(error)
    }
  }
}