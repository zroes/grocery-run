import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GroceryListsScema } from "../models/GroceryList.js"
import { GroceryListItemsScema } from "../models/GroceryListItem.js"

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  GroceryLists = mongoose.model('GroceryList', GroceryListsScema);

  GroceryListItems = mongoose.model('GroceryListItem', GroceryListItemsScema);
}

export const dbContext = new DbContext()
