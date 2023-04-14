import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('/location', this.addLocations)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async addLocations(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const latLong = req.body
      const locations = await accountService.addLocations(latLong, accountId)
      return res.send(locations)
    }
    catch (error) {
      next(error)
    }
  }
}
