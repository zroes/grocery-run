import { AppState } from "../AppState.js"

export class SearchResult {
  constructor(data) {
    this.name = data.name
    this.price = data.price
    this.size = data.size
    this.locationId = data.locationId
    this.distance = data.distance || AppState.account.locations.find(l => l.locationId == data.locationId).distance
    this.store = data.store
    this.image = data.image
    this.query = data.query
  }
}

export class tripItem extends SearchResult {
  constructor(data) {
    super(data)
    this.id = data.id
    this.accountId = data.accountId
    this.quantity = data.quantity
    this.included = data.included
  }
}