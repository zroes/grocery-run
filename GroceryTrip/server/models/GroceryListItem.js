import mongoose from "mongoose"
const Schema = mongoose.Schema

export const GroceryListItemsSchema = new Schema(
  {
    listId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    included: { type: Boolean, required: true, default: true },
  }, { timestamps: true, toJSON: { virtuals: true } }
)