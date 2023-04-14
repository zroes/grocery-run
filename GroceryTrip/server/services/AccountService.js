import { dbContext } from '../db/DbContext'
import { Kroger } from './AxiosService.js'
import { krogerAuthorizationService } from './KrogerAuthorizationService.js'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    if (typeof user.name == 'string' && user.name.includes('@')) {
      user.name = user.nickname
    }
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

// compute the distance to user for each location id
// acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371

// stack overflow special
function getDistance(lat1, lon1, lat2, lon2) {
  const radius = 3963 // mi
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  let lat1Rad = toRad(lat1)
  let lat2Rad = toRad(lat2)

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = radius * c
  return d.toFixed(2)
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180
}


// let x = point1.latitude - point2.lat
// let y = point1.longitude - point2.long
// return Math.sqrt(x * x + y * y)


class AccountService {
  async addLocations(latLong, accountId) {
    let token = await krogerAuthorizationService.getAuthorization()

    const res = await Kroger.get('locations', {
      headers:
        { 'Authorization': `Bearer ${token}` },

      params: {
        'filter.latLong.near': `${latLong.lat},${latLong.long}`
      }
    })
    // return locations
    const parsedLocations = JSON.parse(res.data)
    let distance
    for (let i = 0; i < parsedLocations.data.length; i++) {
      const element = parsedLocations.data[i]
      distance = getDistance(
        element.geolocation.latitude, element.geolocation.longitude,
        latLong.lat, latLong.long)
      parsedLocations.data[i].distance = distance
      parsedLocations.data[i].accountId = accountId

    }
    return parsedLocations.data
  }
  // 
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }
}
export const accountService = new AccountService()
