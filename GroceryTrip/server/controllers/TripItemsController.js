import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"



export class TripItemsController extends BaseController {
  constructor() {
    super(`api/tripItems`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // .post(``, this.create)
  }
  // create(req, res, next) {
  //   try {
  //     const tripItemData = req.body
  //     const tripItem = await
  //     return res.send(tripItem)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}