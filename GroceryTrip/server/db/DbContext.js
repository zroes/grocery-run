import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GroceryListaScema } from "../models/GroceryList.js"

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  GroceryLists = mongoose.model('GroceryList', GroceryListaScema);
}

export const dbContext = new DbContext()
