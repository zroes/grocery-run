import { tripItemsService } from "../services/TripItemsService.js"
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"



export class TripItemsController extends BaseController {
  constructor() {
    super(`api/tripItems`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.create)
      .delete(`/:tripItemId/decrease`, this.decreaseThenDelete)
      .delete(`/:tripItemId`, this.delete)
      .delete('', this.clearTrip)
      .put(`/:tripItemId`, this.edit)
  }

  async create(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const tripItemData = req.body
      tripItemData.accountId = accountId
      const tripItem = await tripItemsService.create(tripItemData)
      return res.send(tripItem)
    } catch (error) {
      next(error)
    }
  }

  async decreaseThenDelete(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tripItemId = req.params.tripItemId
      const message = await tripItemsService.decreaseThenDelete(userId, tripItemId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tripItemId = req.params.tripItemId
      const tripItem = await tripItemsService.edit(tripItemId, userId)
      return res.send(tripItem)
    } catch (error) {
      next(error)
    }
  }

  async clearTrip(req, res, next) {
    try {
      const accountId = req.userInfo.id
      await tripItemsService.clearTrip(accountId)
      res.send()
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tripItemId = req.params.tripItemId
      const message = await tripItemsService.delete(userId, tripItemId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

}