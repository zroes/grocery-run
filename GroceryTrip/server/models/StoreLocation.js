import mongoose from "mongoose"
const Schema = mongoose.Schema

export const StoreLocationSchema = new Schema({
  locationId: { type: String },
  name: { type: String },
  distance: { type: Number },
  accountId: { type: Schema.Types.ObjectId },
  logo: { type: String }
}, { timestamps: true, toJSON: { virtuals: true } })