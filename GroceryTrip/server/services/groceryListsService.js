import { dbContext } from "../db/DbContext.js"

class GroceryListsService {
  async create(name) {
    const newGroceryList = await dbContext.GroceryLists.create(name)
    return newGroceryList
  }

}

export const groceryListsService = new GroceryListsService()