export class SearchResult {
  constructor(data) {
    this.name = data.name
    this.quantity = data.quantity || 0
    this.price = data.price
    this.size = data.size
    this.distance = data.distance
    this.store = data.store
    this.image = data.image
  }
}

export class tripItem extends SearchResult {
  constructor(data) {
    super(data)
    this.id = data.id
    this.tripId = data.tripId
  }
}