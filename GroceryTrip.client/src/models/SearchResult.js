export class SearchResult {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.quantity = data.quantity
    this.price = data.price
    this.distance = data.distance
  }
}