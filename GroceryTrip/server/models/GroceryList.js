import mongoose from "mongoose"
const Schema = mongoose.Schema

export const GroceryListsSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minLength: 3, maxLength: 50 }
  }, { timestamps: true, toJSON: { virtuals: true } }
)