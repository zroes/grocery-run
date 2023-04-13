export class SearchResult {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.quantity = data.quantity || 0
    this.price = data.price
    this.size = data.size
    this.distance = data.distance
    this.store = data.store
  }
}