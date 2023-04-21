import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { locationsService } from "./LocationsService.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      AppState.loading = true
      const res = await api.get('/account')
      AppState.loading = false
      AppState.account = new Account(res.data)
      if (AppState.account.locations.length == 0) {
        async function success(pos) {
          const crd = pos.coords
          logger.log(crd.latitude, crd.longitude)
          const coords = {
            lat: crd.latitude,
            long: crd.longitude
          }
          await locationsService.sendLatLong(coords)
        }
        navigator.geolocation.getCurrentPosition(success)
      }
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

}

export const accountService = new AccountService()
