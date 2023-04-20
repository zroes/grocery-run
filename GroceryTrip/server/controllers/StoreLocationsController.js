import { storeLocationsService } from "../services/StoreLocationsService.js"
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from '@bcwdev/auth0provider'


export class StoreLocationsController extends BaseController {
  constructor() {
    super('api/location')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addLocations)
  }


  async addLocations(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const latLong = req.body
      const krogerLocations = await storeLocationsService.addKrogerLocations(latLong, accountId)
      const albertsonsLocations = await storeLocationsService.addAlbertsonsLocations(latLong, accountId)
      const locations = krogerLocations.concat(albertsonsLocations)
      return res.send(locations)
    }
    catch (error) {
      next(error)
    }
  }
}