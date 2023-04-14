import { tripItemsService } from "../services/TripItemsService.js"
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"



export class TripItemsController extends BaseController {
  constructor() {
    super(`api/tripItems`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.create)
      .get(``, this.getAll)
  }
  async getAll(req, res, next) {
    try {
      const tripItems = await tripItemsService.getAll()
      return res.send(tripItems)
    } catch (error) {
      next(error)
    }
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
}