import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { StoreLocation } from "../models/StoreLocation.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async sendLatLong(coords) {
    logger.log(coords)
    const res = await api.put('/account/location', coords)
    AppState.locations = res.data.map(l => new StoreLocation(l))
    logger.log(AppState.locations)
  }
}

export const accountService = new AccountService()
