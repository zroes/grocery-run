import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get(`/:accountId/tripItems`, this.getAllTripItems)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAllTripItems(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const tripItems = await accountService.getAllTripItems(accountId)
      return res.send(tripItems)
    } catch (error) {
      next(error)
    }
  }
}
