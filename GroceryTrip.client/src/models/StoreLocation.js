export class StoreLocation {
  constructor(data) {
    this.locationId = data.locationId
    this.distance = data.distance
    this.accountId = data.accountId
    this.name = data.name
    // FIXME this might not be good
    this.logo = data.logo || data.name.includes('Fred Meyer') ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Fred_Meyer_logo.svg/2560px-Fred_Meyer_logo.svg.png" : "../assets/img/GenericCompanyPic.png"
  }
}


