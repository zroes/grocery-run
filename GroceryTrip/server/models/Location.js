import mongoose from "mongoose"
const Schema = mongoose.Schema

export const LocationSchema = new Schema({
    locationId: { type: String },
    name: { type: String },
    distance: { type: Number },
    accountId: { type: Schema.Types.ObjectId }
}, { timestamps: true, toJSON: { virtuals: true } })