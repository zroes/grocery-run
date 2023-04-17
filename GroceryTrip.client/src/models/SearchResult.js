import { AppState } from "../AppState.js"

export class SearchResult {
  constructor(data) {
    this.brand = data.brand
    this.name = data.name
    this.price = data.price
    this.size = data.size
    this.distance = data.distance || AppState.account.krogerLocations.find(l => l.locationId == data.locationId).distance
    this.store = data.store
    this.image = data.image
  }
}

export class tripItem extends SearchResult {
  constructor(data) {
    super(data)
    this.id = data.id
    this.accountId = data.accountId
    this.quantity = data.quantity
  }
}