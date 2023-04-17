import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class GroceryListItemsService {
  async getAllItems(listId) {
    const groceryItems = await dbContext.GroceryListItems.find({ listId: listId })
    return groceryItems
  }
  async addItem(itemDetails) {
    const newItem = await dbContext.GroceryListItems.create(itemDetails)
    return newItem
  }
  // TODO refactor to make more reusable code
  async deleteItem(itemId) {
    const itemToDelete = await dbContext.GroceryListItems.findById(itemId)
    itemToDelete.remove()
  }

  async toggleInclude(itemId) {
    const itemToToggle = await dbContext.GroceryListItems.findById(itemId)
    // if (accountId != itemToToggle.accountId)
    // throw new Forbidden("You don't have permission to edit this item")
    itemToToggle.included = !itemToToggle.included
    itemToToggle.save()
    return itemToToggle
  }

}

export const groceryListItemsService = new GroceryListItemsService()