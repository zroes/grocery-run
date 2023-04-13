import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class GroceryListsService {
  async create(name) {
    const newGroceryList = await dbContext.GroceryLists.create(name)
    return newGroceryList
  }

  async getAll(accountId) {
    const lists = await dbContext.GroceryLists.find({ accountId: accountId })
    return lists
  }

  async getOne(listId) {
    const groceryList = await dbContext.GroceryLists.findById(listId)
    if (groceryList == null) {
      throw new BadRequest('This event does not exist.')
    }
    return groceryList
  }

}

export const groceryListsService = new GroceryListsService()