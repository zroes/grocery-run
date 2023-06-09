import mongoose from "mongoose"
const Schema = mongoose.Schema

export const TripItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  image: { type: String, required: true, minLength: 3, maxLength: 500 },
  quantity: { type: Number, required: true, min: 0, max: 1000, default: 1 },
  price: { type: Number, required: true, min: 0.01, max: 1000000 },
  size: { type: String, required: true },
  // NOTE other stores might not use 8 digit location ids
  locationId: { type: String, required: true },
  query: { type: String, required: true },
  store: { type: String, required: true, minLength: 3, maxLength: 100 },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  included: { type: Boolean, required: true, default: true },
}, { timestamps: true, toJSON: { virtuals: true } })

