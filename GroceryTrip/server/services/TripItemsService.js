import { dbContext } from "../db/DbContext.js";

class TripItemsService {
  async getAll() {
    const tripItems = await dbContext.TripItems.find();
    return tripItems
  }
  async create(tripItemData) {
    const tripItem = await dbContext.TripItems.create(tripItemData);
    return tripItem
  }

}

export const tripItemsService = new TripItemsService();