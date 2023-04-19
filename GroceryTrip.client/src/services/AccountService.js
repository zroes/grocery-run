import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { StoreLocation } from "../models/StoreLocation.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      AppState.loading = true
      const res = await api.get('/account')
      AppState.loading = false
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

}

export const accountService = new AccountService()
