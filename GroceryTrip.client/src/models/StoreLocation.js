export class StoreLocation {
  constructor(data) {
    this.locationId = data.locationId
    this.distance = data.distance
    this.accountId = data.accountId
    this.name = data.name
    // FIXME this might not be good
    this.logo = data.logo
  }
}



