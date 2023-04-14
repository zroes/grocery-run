import mongoose from "mongoose"
const Schema = mongoose.Schema

export const TripSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })