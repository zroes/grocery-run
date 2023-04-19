import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TripItemsService {
  async getAllTripItems(accountId) {
    const tripItems = await dbContext.TripItems.find({ accountId })

    if (tripItems == null) {
      throw new BadRequest("This Account does not have any TripItems")
    }

    return tripItems
  }

  async edit(tripItemEdits, tripItemId, userId) {
    const tripItem = await dbContext.TripItems.findById(tripItemId)
    if (tripItem == null) {
      throw new BadRequest("That TripItem does not exist")
    }

    if (tripItem.accountId != userId) {
      throw new Forbidden(`You are not authorized to edit this TripItem`)
    }

    const oldQuantity = tripItem.quantity

    tripItem.quantity = tripItemEdits.quantity || tripItem.quantity

    if (tripItem.quantity == oldQuantity) {
      throw new BadRequest("The Edit has failed, The Item's Quantity did not change")
    } else {
      await tripItem.save()
    }

    return tripItem
  }
  async delete(userId, tripItemId) {
    const tripItem = await dbContext.TripItems.findById(tripItemId)
    if (tripItem == null) {
      throw new BadRequest("That TripItem does not exist")
    }

    if (tripItem.accountId != userId) {
      throw new Forbidden(`You are not authorized to delete this TripItem`)
    }

    if (tripItem.quantity > 0) {
      tripItem.quantity--
    } else {
      throw new BadRequest("The TripItem you are trying to delete, already has a quantity of Zero")
    }

    if (tripItem.quantity <= 0) {
      await tripItem.delete()
      return `Your ${tripItem.name} has been deleted`
    } else {
      await tripItem.save()
      return `Your ${tripItem.name} las been decreased to a quantity of ${tripItem.quantity}`
    }
  }
  async create(tripItemData) {
    const tripItem = await dbContext.TripItems.create(tripItemData)
    return tripItem
  }

  async clearTrip(accountId) {
    await dbContext.TripItems.deleteMany({ accountId: accountId })
  }

}

export const tripItemsService = new TripItemsService()