import { dbContext } from "../db/DbContext.js"

class GroceryListItemsService {
  async getAllItems(listId) {
    const groceryItems = await dbContext.GroceryListItems.find({ listId: listId })
    return groceryItems
  }
  async addItem(itemDetails) {
    const newItem = await dbContext.GroceryListItems.create(itemDetails)
    return newItem
  }

  async deleteItem(itemId) {
    const itemToDelete = await dbContext.GroceryListItems.findById(itemId)
    itemToDelete.remove()
  }

}

export const groceryListItemsService = new GroceryListItemsService()