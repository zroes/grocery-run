import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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
      throw new BadRequest('This list does not exist.')
    }
    return groceryList
  }

  async delete(listId, accountId) {
    const listToDelete = await this.getOne(listId)
    if (listToDelete.accountId != accountId)
      throw new Forbidden("You don't have permission to delete this list")
    listToDelete.remove()
  }

}

export const groceryListsService = new GroceryListsService()
