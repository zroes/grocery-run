import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GroceryListsSchema } from "../models/GroceryList.js"
import { GroceryListItemsSchema } from "../models/GroceryListItem.js"
import { StoreLocationSchema } from "../models/StoreLocation.js"

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  GroceryLists = mongoose.model('GroceryList', GroceryListsSchema);

  GroceryListItems = mongoose.model('GroceryListItem', GroceryListItemsSchema);

  StoreLocations = mongoose.model('StoreLocation', StoreLocationSchema);

}

export const dbContext = new DbContext()
