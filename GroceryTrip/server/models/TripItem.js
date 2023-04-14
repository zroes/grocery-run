import mongoose from "mongoose"
const Schema = mongoose.Schema

export const TripItemSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  image: { type: String, required: true, minLength: 3, maxLength: 500 },
  tripId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

